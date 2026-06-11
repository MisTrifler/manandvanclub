import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { calculateBookingFee, normaliseQuoteAmount, toStripePence } from "@/lib/booking-fee";

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

    if (!lead.quote_amount || !lead.quoted_by) {
      return NextResponse.json({ error: "Quote is incomplete" }, { status: 400 });
    }

    if (lead.booking_fee_paid === true) {
      return NextResponse.json({ error: "Booking fee has already been paid" }, { status: 409 });
    }

    if (isExpired(lead.quote_expires_at)) {
      await supabaseAdmin
        .from("move_requests")
        .update({ status: "expired" })
        .eq("id", lead.id)
        .eq("status", "quoted")
        .or("booking_fee_paid.is.null,booking_fee_paid.eq.false");
      return NextResponse.json({ error: "This quote has expired" }, { status: 409 });
    }

    const quoteAmount = normaliseQuoteAmount(lead.quote_amount);
    const bookingFee = calculateBookingFee(quoteAmount);
    const siteUrl = process.env.NEXT_PUBLIC_URL || "https://www.manandvanclub.co.uk";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Booking Fee",
              description:
                "Accept your mover quote and release your details to the mover. The remaining move cost is paid directly to the mover.",
            },
            unit_amount: toStripePence(bookingFee),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${siteUrl}/booking-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/quote-review/${token}`,
      customer_email: lead.email || undefined,
      metadata: {
        paymentType: "customer_booking_fee",
        requestId: lead.id,
        quoteAmount: quoteAmount.toString(),
        bookingFee: bookingFee.toString(),
        quotedBy: lead.quoted_by || "",
        customerEmail: lead.email || "",
      },
    });

    await supabaseAdmin
      .from("move_requests")
      .update({
        booking_fee: bookingFee,
        booking_fee_stripe_session_id: session.id,
      })
      .eq("id", lead.id)
      .eq("status", "quoted")
      .or("booking_fee_paid.is.null,booking_fee_paid.eq.false");

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("[customer/accept-quote] Error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Internal error" },
      { status: 500 },
    );
  }
}
