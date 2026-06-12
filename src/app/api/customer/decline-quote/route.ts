import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { QUOTE_CLEAR_FIELDS } from "@/lib/quote-feedback";
import { sendQuoteFeedbackEmail } from "@/lib/quote-feedback-email";

// Customer declines a quote. The request is archived as declined and
// held in quote_feedback_pending — it does NOT return to the driver
// pool until admin reviews customer feedback.

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = typeof body.token === "string" ? body.token.trim() : "";
    const reason = typeof body.reason === "string" ? body.reason.slice(0, 200) : null;

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
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

    const now = new Date().toISOString();

    // Archive attempt + hold for feedback review (quote lock cleared)
    let { error: updateError } = await supabaseAdmin
      .from("move_requests")
      .update({
        status: "quote_feedback_pending",
        customer_declined_quote_at: now,
        declined_reason: reason,
        quote_feedback_requested_at: now,
        quote_feedback_last_outcome: "declined",
        ...QUOTE_CLEAR_FIELDS,
      })
      .eq("id", lead.id)
      .or("booking_fee_paid.is.null,booking_fee_paid.eq.false");

    // Fallback if feedback migration not applied yet: keep legacy behaviour
    if (updateError && (updateError.code === "42703" || updateError.code === "PGRST204")) {
      console.warn("[decline-quote] feedback columns missing — apply migration 20260612_quote_feedback.sql. Using legacy declined status.");
      ({ error: updateError } = await supabaseAdmin
        .from("move_requests")
        .update({
          status: "declined",
          customer_declined_quote_at: now,
          declined_reason: reason,
        })
        .eq("id", lead.id)
        .or("booking_fee_paid.is.null,booking_fee_paid.eq.false"));
    }

    if (updateError) {
      return NextResponse.json({ error: "Could not decline the quote. Please try again." }, { status: 500 });
    }

    await sendQuoteFeedbackEmail(lead);

    return NextResponse.json({
      success: true,
      message: "Thanks — this quote has been declined. If you still need help, tell us what would work better and we'll review whether your request should go back to approved movers.",
    });
  } catch (error: any) {
    console.error("[customer/decline-quote] Error:", error?.message || error);
    return NextResponse.json({ error: error?.message || "Internal error" }, { status: 500 });
  }
}
