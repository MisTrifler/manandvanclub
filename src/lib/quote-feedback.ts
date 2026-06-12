// ─────────────────────────────────────────────────────────────────────
// Quote feedback + budget review helpers.
// Used after a quote is declined or expires: the request is held out
// of the driver pool until admin reviews customer feedback.
// ─────────────────────────────────────────────────────────────────────

export const FEEDBACK_REASONS = [
  "Price was too high",
  "Move date or time no longer works",
  "I wanted a different service option",
  "I found another mover",
  "I no longer need to move",
  "I missed the quote before it expired",
  "Other",
] as const;

export type AdminFeedbackDecision = "release_to_pool" | "close_request" | "contact_customer";

/** Fields cleared when a quote attempt ends (decline/expiry/release). */
export const QUOTE_CLEAR_FIELDS = {
  quoted_by: null,
  quote_amount: null,
  quote_options: [],
  selected_quote_option_id: null,
  selected_quote_option: null,
  selected_quote_option_at: null,
  quoted_at: null,
  quote_expires_at: null,
} as const;

export interface BudgetReasonablenessInput {
  budgetMax?: number | null;
  guidePriceMin?: number | null;
  guidePriceMax?: number | null;
  previousQuoteMin?: number | null;
  previousQuoteMax?: number | null;
}

export type BudgetVerdict = "reasonable" | "may_be_low" | "manual_review";

/**
 * Guidance only — never auto-releases or auto-closes.
 * - no budget -> manual review
 * - budgetMax >= 75% of guidePriceMin -> possibly reasonable
 * - budgetMax < 60% of guidePriceMin -> likely low
 * - budget close to previous quote min (>= 90%) -> potentially viable
 */
export function isCustomerBudgetReasonable(input: BudgetReasonablenessInput): {
  verdict: BudgetVerdict;
  label: string;
} {
  const budgetMax = Number(input.budgetMax);
  if (!Number.isFinite(budgetMax) || budgetMax <= 0) {
    return { verdict: "manual_review", label: "Manual review needed — no budget provided" };
  }

  const prevMin = Number(input.previousQuoteMin);
  if (Number.isFinite(prevMin) && prevMin > 0 && budgetMax >= prevMin * 0.9) {
    return { verdict: "reasonable", label: "Budget looks reasonable — close to previous quote" };
  }

  const guideMin = Number(input.guidePriceMin);
  if (Number.isFinite(guideMin) && guideMin > 0) {
    if (budgetMax >= guideMin * 0.75) {
      return { verdict: "reasonable", label: "Budget looks reasonable" };
    }
    if (budgetMax < guideMin * 0.6) {
      return { verdict: "may_be_low", label: "Budget may be low" };
    }
    return { verdict: "manual_review", label: "Manual review needed" };
  }

  return { verdict: "manual_review", label: "Manual review needed" };
}

/** Safe driver-facing feedback summary. Never includes previous mover identity or customer PII. */
export function buildDriverFeedbackSummary(lead: {
  quote_feedback_last_outcome?: string | null;
  quote_feedback_reason?: string | null;
  quote_feedback_budget_min?: number | null;
  quote_feedback_budget_max?: number | null;
  quote_feedback_released_at?: string | null;
}): { outcome: string; reason: string; budgetRange: string } | null {
  if (!lead.quote_feedback_released_at) return null;
  const outcome = lead.quote_feedback_last_outcome === "expired"
    ? "Previous quote expired."
    : lead.quote_feedback_last_outcome === "declined"
      ? "Previous quote was declined."
      : "";
  if (!outcome) return null;

  const reason = lead.quote_feedback_reason ? String(lead.quote_feedback_reason).slice(0, 120) : "";
  const min = Number(lead.quote_feedback_budget_min);
  const max = Number(lead.quote_feedback_budget_max);
  let budgetRange = "Budget range not provided.";
  if (Number.isFinite(max) && max > 0) {
    budgetRange = Number.isFinite(min) && min > 0
      ? `Customer preferred budget range: £${Math.round(min)}–£${Math.round(max)}`
      : `Customer preferred budget range: up to £${Math.round(max)}`;
  }
  return { outcome, reason, budgetRange };
}
