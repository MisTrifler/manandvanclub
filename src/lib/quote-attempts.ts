// ─────────────────────────────────────────────────────────────────────
// Quote attempt archive + auto-return-to-pool helpers (server-side).
//
// Simplified launch model: one active quote locks a request for
// 6 hours. Declined (customer still needs help) and expired quotes
// return to the available pool automatically — no admin bottleneck.
//
// THIS MODULE NEVER MOVES MONEY. Stripe, deposits, webhook validation
// and customer detail release are untouched.
// ─────────────────────────────────────────────────────────────────────

import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { QUOTE_CLEAR_FIELDS } from "@/lib/quote-feedback";
import { sendQuoteExpiredEmail } from "@/lib/quote-feedback-email";

export const QUOTE_LOCK_HOURS = 6;

type AttemptOutcome = "declined" | "expired" | "accepted";

interface FeedbackFields {
  customerDeclineReason?: string | null;
  customerBudgetMin?: number | null;
  customerBudgetMax?: number | null;
  customerStillNeedsHelp?: boolean | null;
  customerFeedbackNotes?: string | null;
}

/** Archive the request's current active quote into the attempts table. Best-effort. */
export async function archiveCurrentQuoteAttempt(args: {
  request: any;
  outcome: AttemptOutcome;
} & FeedbackFields): Promise<void> {
  const { request, outcome } = args;
  if (!request?.id || !request?.quoted_by) return;
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.from("move_request_quote_attempts").insert([{
      request_id: request.id,
      driver_email: request.quoted_by,
      quote_options: Array.isArray(request.quote_options) ? request.quote_options : [],
      quote_amount: request.quote_amount ?? null,
      quoted_at: request.quoted_at ?? null,
      quote_expires_at: request.quote_expires_at ?? null,
      outcome,
      outcome_at: new Date().toISOString(),
      customer_decline_reason: args.customerDeclineReason ?? null,
      customer_budget_min: args.customerBudgetMin ?? null,
      customer_budget_max: args.customerBudgetMax ?? null,
      customer_still_needs_help: args.customerStillNeedsHelp ?? null,
      customer_feedback_notes: args.customerFeedbackNotes ?? null,
    }]);
    if (error && error.code !== "42P01") {
      console.warn("[quote-attempts] archive failed:", error.code);
    }
  } catch {
    // archive failure must never block the customer flow
  }
}

/**
 * Release a request back to the available pool, clearing the quote lock
 * and storing a safe feedback summary for driver display. Identity of
 * the previous driver is never exposed (it lives only in the archive).
 */
export async function releaseQuoteBackToPool(args: {
  requestId: string;
  outcome: "declined" | "expired";
} & FeedbackFields): Promise<boolean> {
  const supabaseAdmin = getSupabaseAdmin();
  const nowIso = new Date().toISOString();

  const updatePayload: Record<string, any> = {
    status: "available",
    ...QUOTE_CLEAR_FIELDS,
    quote_message: null,
    quote_feedback_last_outcome: args.outcome,
    quote_feedback_released_at: nowIso,
    quote_feedback_reason: args.customerDeclineReason ?? null,
    quote_feedback_budget_min: args.customerBudgetMin ?? null,
    quote_feedback_budget_max: args.customerBudgetMax ?? null,
    quote_feedback_still_needs_help: args.customerStillNeedsHelp ?? null,
    quote_feedback_notes: args.customerFeedbackNotes ?? null,
  };
  if (args.outcome === "declined") {
    updatePayload.customer_declined_quote_at = nowIso;
    updatePayload.declined_reason = args.customerDeclineReason ?? null;
  }

  let { error } = await supabaseAdmin
    .from("move_requests")
    .update(updatePayload)
    .eq("id", args.requestId)
    .or("booking_fee_paid.is.null,booking_fee_paid.eq.false")
    .is("customer_details_released_at", null);

  // Fallback when feedback columns are missing (migration not applied)
  if (error && (error.code === "42703" || error.code === "PGRST204")) {
    ({ error } = await supabaseAdmin
      .from("move_requests")
      .update({
        status: "available",
        ...QUOTE_CLEAR_FIELDS,
        quote_message: null,
        ...(args.outcome === "declined" ? { customer_declined_quote_at: nowIso, declined_reason: args.customerDeclineReason ?? null } : {}),
      })
      .eq("id", args.requestId)
      .or("booking_fee_paid.is.null,booking_fee_paid.eq.false")
      .is("customer_details_released_at", null));
  }

  if (error) {
    console.warn("[quote-attempts] release failed:", error.code);
    return false;
  }
  return true;
}

/** Close a request (customer no longer needs help). */
export async function closeRequest(requestId: string, reason?: string | null): Promise<boolean> {
  const supabaseAdmin = getSupabaseAdmin();
  const nowIso = new Date().toISOString();
  let { error } = await supabaseAdmin
    .from("move_requests")
    .update({
      status: "closed",
      customer_declined_quote_at: nowIso,
      declined_reason: reason ?? null,
      quote_feedback_still_needs_help: false,
      ...QUOTE_CLEAR_FIELDS,
      quote_message: null,
    })
    .eq("id", requestId)
    .or("booking_fee_paid.is.null,booking_fee_paid.eq.false")
    .is("customer_details_released_at", null);
  if (error && (error.code === "42703" || error.code === "PGRST204")) {
    ({ error } = await supabaseAdmin
      .from("move_requests")
      .update({ status: "closed", customer_declined_quote_at: nowIso, declined_reason: reason ?? null, ...QUOTE_CLEAR_FIELDS, quote_message: null })
      .eq("id", requestId)
      .or("booking_fee_paid.is.null,booking_fee_paid.eq.false")
      .is("customer_details_released_at", null));
  }
  return !error;
}

/**
 * Expire all stale quote locks: archive each as expired, release back
 * to the pool, email the customer once. Idempotent — once released the
 * row is no longer status=quoted, so repeat runs cannot re-process or
 * re-email.
 */
export async function expireOldQuotes(): Promise<number> {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const nowIso = new Date().toISOString();
    const { data: expired, error } = await supabaseAdmin
      .from("move_requests")
      .select("*")
      .eq("status", "quoted")
      .not("quoted_by", "is", null)
      .not("quote_expires_at", "is", null)
      .lt("quote_expires_at", nowIso)
      .or("booking_fee_paid.is.null,booking_fee_paid.eq.false")
      .is("customer_details_released_at", null);

    if (error || !expired || expired.length === 0) return 0;

    let count = 0;
    for (const request of expired) {
      await archiveCurrentQuoteAttempt({ request, outcome: "expired" });
      const released = await releaseQuoteBackToPool({ requestId: request.id, outcome: "expired" });
      if (released) {
        count += 1;
        await sendQuoteExpiredEmail(request); // once per expiry (release flips status)
      }
    }
    return count;
  } catch {
    return 0;
  }
}

/** Safe per-request history for driver display. Never includes driver identity. */
export async function getPreviousQuoteSummaries(requestIds: string[]): Promise<Map<string, {
  attemptCount: number;
  lastOutcome: string;
  previousOptionMin: number | null;
  previousOptionMax: number | null;
}>> {
  const map = new Map();
  if (requestIds.length === 0) return map;
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("move_request_quote_attempts")
      .select("request_id, outcome, outcome_at, quote_options, quote_amount")
      .in("request_id", requestIds)
      .order("outcome_at", { ascending: true });
    if (error || !data) return map;

    for (const attempt of data) {
      const prices: number[] = Array.isArray(attempt.quote_options)
        ? attempt.quote_options.map((o: any) => Number(o?.totalPrice)).filter((n: number) => Number.isFinite(n) && n > 0)
        : [];
      if (Number.isFinite(Number(attempt.quote_amount)) && Number(attempt.quote_amount) > 0) prices.push(Number(attempt.quote_amount));

      const existing = map.get(attempt.request_id) || { attemptCount: 0, lastOutcome: "", previousOptionMin: null, previousOptionMax: null };
      existing.attemptCount += 1;
      existing.lastOutcome = attempt.outcome;
      if (prices.length > 0) {
        const lo = Math.min(...prices);
        const hi = Math.max(...prices);
        existing.previousOptionMin = existing.previousOptionMin === null ? lo : Math.min(existing.previousOptionMin, lo);
        existing.previousOptionMax = existing.previousOptionMax === null ? hi : Math.max(existing.previousOptionMax, hi);
      }
      map.set(attempt.request_id, existing);
    }
  } catch {
    // table missing or query failed — history is optional
  }
  return map;
}

export { getBudgetReasonablenessLabel, budgetLabelText, type BudgetLabel } from "@/lib/quote-attempts-shared";
