import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { FEEDBACK_REASONS } from "@/lib/quote-feedback";

// Customer submits feedback after a declined/expired quote.
// The request stays OUT of the driver pool until admin reviews it.

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = typeof body.token === "string" ? body.token.trim() : "";
    const stillNeedsHelp = body.stillNeedsHelp === true;
    const reason = String(body.reason || "").trim().slice(0, 200);
    const notes = String(body.notes || "").trim().slice(0, 1000);
    const budgetMin = body.budgetMin === null || body.budgetMin === undefined ? null : Number(body.budgetMin);
    const budgetMax = body.budgetMax === null || body.budgetMax === undefined ? null : Number(body.budgetMax);

    if (!token || token.length < 16) {
      return NextResponse.json({ error: "Invalid link" }, { status: 400 });
    }
    if (typeof body.stillNeedsHelp !== "boolean") {
      return NextResponse.json({ error: "Please tell us whether you still need help." }, { status: 400 });
    }
    if (!reason || !(FEEDBACK_REASONS as readonly string[]).includes(reason)) {
      return NextResponse.json({ error: "Please choose a valid reason." }, { status: 400 });
    }
    if (stillNeedsHelp && (!Number.isFinite(budgetMax as number) || (budgetMax as number) <= 0)) {
      return NextResponse.json({ error: "Please provide your maximum budget." }, { status: 400 });
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
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }
    if (lead.status === "booked" || lead.booking_fee_paid === true || lead.customer_details_released_at) {
      return NextResponse.json({ error: "This booking has already been confirmed." }, { status: 409 });
    }
    const allowedStatuses = ["quote_feedback_pending", "quote_feedback_received", "declined", "expired", "available", "closed"];
    if (!allowedStatuses.includes(String(lead.status || ""))) {
      return NextResponse.json({ error: "There is no quote feedback needed for this request right now." }, { status: 409 });
    }

    const { error: updateError } = await supabaseAdmin
      .from("move_requests")
      .update({
        // Simplified model: still-needs-help keeps/returns the request to
        // the available pool automatically; otherwise it is closed.
        status: stillNeedsHelp ? "available" : "closed",
        quote_feedback_received_at: new Date().toISOString(),
        quote_feedback_released_at: stillNeedsHelp ? new Date().toISOString() : null,
        quote_feedback_still_needs_help: stillNeedsHelp,
        quote_feedback_reason: reason,
        quote_feedback_budget_min: budgetMin,
        quote_feedback_budget_max: budgetMax,
        quote_feedback_notes: notes || null,
      })
      .eq("id", lead.id)
      .or("booking_fee_paid.is.null,booking_fee_paid.eq.false");

    if (updateError) {
      if (updateError.code === "42703" || updateError.code === "PGRST204") {
        return NextResponse.json({ error: "Feedback is not enabled yet. Please contact support." }, { status: 503 });
      }
      return NextResponse.json({ error: "Could not save feedback. Please try again." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: stillNeedsHelp
        ? "Thanks — we've received your feedback and your request is available for approved movers to review."
        : "Thanks — we've closed your request.",
    });
  } catch (error: any) {
    console.error("[quote-feedback] error:", error?.message || "unknown");
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
