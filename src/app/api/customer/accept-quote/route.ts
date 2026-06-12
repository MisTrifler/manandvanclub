import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { calculateBookingDeposit, calculateRemainingMoverBalance, normaliseQuoteAmount, toStripePence } from "@/lib/booking-fee";
import { parseStoredQuoteOptions } from "@/lib/quote-options";
import { QUOTE_CLEAR_FIELDS } from "@/lib/quote-feedback";
import { sendQuoteFeedbackEmail } from "@/lib/quote-feedback-email";

function isExpired(expiresAt?: string | null) {
  if (!expiresAt) return false;
  const expiry = new Date(expiresAt).getTime();
  return Number.isFinite(expiry) && expiry <= Date.now();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = typeof body.token === "string" ? body.token.trim() : "";

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data: lead, error: fetchError } = await supabaseAdmin
      .from("move_requests")
      .select("*")
      .eq("customer_quote_token", token)
      .single();

    if (fetchError || !lead) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    if (lead.status !== "quoted") {
      return NextResponse.json({ error: "Quote is no longer available" }, { status: 409 });
    }

    if (!lead.quoted_by) {
      return NextResponse.json({ error: "Quote is incomplete" }, { status: 400 });
    }

    // ── Resolve the quote amount from the selected structured option ──
    // The frontend only sends an option id; the price always comes from
    // the server-stored quote_options. Legacy single-amount quotes
    // (no quote_options) fall back to lead.quote_amount.
    const storedOptions = parseStoredQuoteOptions(lead.quote_options);
    const selectedQuoteOptionId = typeof body.selectedQuoteOptionId === "string" ? body.selectedQuoteOptionId.trim() : "";
    let selectedOption = null;

    if (storedOptions.length > 0) {
      if (!selectedQuoteOptionId) {
        return NextResponse.json({ error: "Please choose a quote option" }, { status: 400 });
      }
      selectedOption = storedOptions.find((o) => o.id === selectedQuoteOptionId) || null;
      if (!selectedOption) {
        return NextResponse.json({ error: "Selected quote option not found" }, { status: 400 });
      }
    } else if (!lead.quote_amount) {
      return NextResponse.json({ error: "Quote is incomplete" }, { status: 400 });
    }

    if (lead.booking_fee_paid === true) {
      return NextResponse.json({ error: "Booking deposit has already been paid" }, { status: 409 });
    }

    if (isExpired(lead.quote_expires_at)) {
      // Archive as expired and hold for customer feedback — the request
      // does NOT return to the driver pool until admin releases it.
      const nowIso = new Date().toISOString();
      const { error: expireError } = await supabaseAdmin
        .from("move_requests")
        .update({
          status: "quote_feedback_pending",
          quote_feedback_requested_at: nowIso,
          quote_feedback_last_outcome: "expired",
          ...QUOTE_CLEAR_FIELDS,
        })
        .eq("id", lead.id)
        .eq("status", "quoted")
        .or("booking_fee_paid.is.null,booking_fee_paid.eq.false");

      // Fallback if feedback migration not applied yet
      if (expireError && (expireError.code === "42703" || expireError.code === "PGRST204")) {
        await supabaseAdmin
          .from("move_requests")
          .update({ status: "expired" })
          .eq("id", lead.id)
          .eq("status", "quoted")
          .or("booking_fee_paid.is.null,booking_fee_paid.eq.false");
      } else if (!expireError) {
        await sendQuoteFeedbackEmail(lead);
      }
      return NextResponse.json({ error: "This quote has expired" }, { status: 409 });
    }

    const quoteAmount = normaliseQuoteAmount(selectedOption ? selectedOption.totalPrice : lead.quote_amount);
    const bookingDeposit = calculateBookingDeposit(quoteAmount);
    const remainingMoverBalance = calculateRemainingMoverBalance(quoteAmount, bookingDeposit);
    const siteUrl = process.env.NEXT_PUBLIC_URL || "https://www.manandvanclub.co.uk";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Booking Deposit",
              description:
                "Secure your accepted mover quote. This deposit is deducted from the mover’s total quote, and you pay the remaining balance directly to the mover on moving day.",
            },
            unit_amount: toStripePence(bookingDeposit),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${siteUrl}/booking-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/quote-review/${token}`,
      customer_email: lead.email || undefined,
      metadata: {
        paymentType: "customer_booking_deposit",
        requestId: lead.id,
        quoteToken: token,
        selectedQuoteOptionId: selectedOption ? selectedOption.id : "",
        quoteAmount: quoteAmount.toString(),
        bookingDeposit: bookingDeposit.toString(),
        bookingFee: bookingDeposit.toString(), // legacy compatibility
        remainingMoverBalance: remainingMoverBalance.toString(),
      },
    });

    const acceptedAt = new Date().toISOString();
    const updatePayload: Record<string, any> = {
      quote_amount: quoteAmount,
      booking_fee: bookingDeposit,
      booking_fee_stripe_session_id: session.id,
    };
    if (selectedOption) {
      updatePayload.selected_quote_option_id = selectedOption.id;
      updatePayload.selected_quote_option = selectedOption;
      updatePayload.selected_quote_option_at = acceptedAt;
      updatePayload.customer_accepted_quote_at = acceptedAt;
    }

    let { error: updateError } = await supabaseAdmin
      .from("move_requests")
      .update(updatePayload)
      .eq("id", lead.id)
      .eq("status", "quoted")
      .or("booking_fee_paid.is.null,booking_fee_paid.eq.false");

    // Fallback when the quote_options migration has not been applied yet.
    if (updateError && (updateError.code === "42703" || updateError.code === "PGRST204")) {
      console.warn("[customer/accept-quote] selected_quote_option columns missing; applying legacy update. Apply migration 20260612_quote_options.sql.");
      ({ error: updateError } = await supabaseAdmin
        .from("move_requests")
        .update({
          quote_amount: quoteAmount,
          booking_fee: bookingDeposit,
          booking_fee_stripe_session_id: session.id,
        })
        .eq("id", lead.id)
        .eq("status", "quoted")
        .or("booking_fee_paid.is.null,booking_fee_paid.eq.false"));
    }

    if (updateError) {
      console.error("[customer/accept-quote] Failed to record selected option:", updateError.message);
      return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("[customer/accept-quote] Error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Internal error" },
      { status: 500 },
    );
  }
}
