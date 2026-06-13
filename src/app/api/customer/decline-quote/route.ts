import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { archiveCurrentQuoteAttempt, releaseQuoteBackToPool, closeRequest } from "@/lib/quote-attempts";
import { isClosingReason } from "@/lib/quote-attempts-shared";

// Customer declines a quote (simplified launch model):
// - attempt archived as declined (with optional feedback/budget)
// - still needs help -> AUTO-released back to the available pool
// - no longer needs help -> request closed
// No admin review required. No money moves here.

const DECLINE_REASONS = [
  "Price was too high",
  "I need a different service option",
  "Date or time no longer works",
  "I found another mover",
  "I no longer need to move",
  "I missed the quote before it expired",
  "Other",
  // Legacy labels accepted for old links/bundles
  "I no longer need help",
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = typeof body.token === "string" ? body.token.trim() : "";
    const reason = String(body.reason || "").trim().slice(0, 200);
    const requestedStillNeedsHelp = body.stillNeedsHelp;
    const closingReason = isClosingReason(reason);
    const stillNeedsHelp = closingReason ? false : requestedStillNeedsHelp;
    const notes = String(body.notes || "").trim().slice(0, 1000);
    const budgetAllowed = stillNeedsHelp === true && reason === "Price was too high";
    const budgetMin = budgetAllowed && body.budgetMin !== null && body.budgetMin !== undefined && body.budgetMin !== "" ? Number(body.budgetMin) : null;
    const budgetMax = budgetAllowed && body.budgetMax !== null && body.budgetMax !== undefined && body.budgetMax !== "" ? Number(body.budgetMax) : null;

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }
    if (!reason || !DECLINE_REASONS.includes(reason)) {
      return NextResponse.json({ error: "Please choose a reason." }, { status: 400 });
    }
    if (typeof requestedStillNeedsHelp !== "boolean") {
      return NextResponse.json({ error: "Please tell us whether you still need help." }, { status: 400 });
    }
    if (budgetMin !== null && (!Number.isFinite(budgetMin) || budgetMin < 0 || budgetMin > 100000)) {
      return NextResponse.json({ error: "Budget values must be positive numbers." }, { status: 400 });
    }
    if (budgetMax !== null && (!Number.isFinite(budgetMax) || budgetMax < 0 || budgetMax > 100000)) {
      return NextResponse.json({ error: "Budget values must be positive numbers." }, { status: 400 });
    }
    if (budgetMin !== null && budgetMax !== null && budgetMax < budgetMin) {
      return NextResponse.json({ error: "Maximum budget must be at least the minimum budget." }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { data: lead } = await supabaseAdmin
      .from("move_requests")
      .select("*")
      .eq("customer_quote_token", token)
      .single();

    if (!lead) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }
    if (lead.booking_fee_paid === true || lead.status === "booked") {
      return NextResponse.json({ error: "This quote has already been accepted" }, { status: 409 });
    }
    if (lead.status !== "quoted") {
      return NextResponse.json({ error: "There is no active quote to decline." }, { status: 409 });
    }

    // 1. Archive attempt as declined (incl. optional feedback)
    await archiveCurrentQuoteAttempt({
      request: lead,
      outcome: "declined",
      customerDeclineReason: reason,
      customerBudgetMin: budgetMin,
      customerBudgetMax: budgetMax,
      customerStillNeedsHelp: stillNeedsHelp,
      customerFeedbackNotes: notes || null,
    });

    // 2. Auto-return or close
    if (stillNeedsHelp) {
      const released = await releaseQuoteBackToPool({
        requestId: lead.id,
        outcome: "declined",
        customerDeclineReason: reason,
        customerBudgetMin: budgetMin,
        customerBudgetMax: budgetMax,
        customerStillNeedsHelp: true,
        customerFeedbackNotes: notes || null,
      });
      if (!released) {
        return NextResponse.json({ error: "Could not process the decline. Please try again." }, { status: 500 });
      }
      return NextResponse.json({
        success: true,
        outcome: "released",
        message: "Thanks — this quote has been declined. We've made your request available again so another approved mover can review it.",
      });
    }

    const closed = await closeRequest(lead.id, reason);
    if (!closed) {
      return NextResponse.json({ error: "Could not process the decline. Please try again." }, { status: 500 });
    }
    return NextResponse.json({
      success: true,
      outcome: "closed",
      message: "Thanks — we've closed your request.",
    });
  } catch (error: any) {
    console.error("[customer/decline-quote] Error:", error?.message || error);
    return NextResponse.json({ error: error?.message || "Internal error" }, { status: 500 });
  }
}
