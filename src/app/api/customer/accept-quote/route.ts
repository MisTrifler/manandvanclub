import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { calculateBookingFee } from "@/lib/booking-fee";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // 1. Fetch request by secure token
    const { data: lead } = await supabaseAdmin
      .from("move_requests")
      .select("*")
      .eq("customer_quote_token", token)
      .single();

    if (!lead) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    // 2. Guard: must be quoted, not already booked, not declined
    if (lead.status !== "quoted") {
      return NextResponse.json(
        { error: "Quote is no longer available" },
        { status: 409 }
      );
    }

    if (lead.booking_fee_paid) {
      return NextResponse.json(
        { error: "Booking fee has already been paid" },
        { status: 409 }
      );
    }

    if (!lead.quote_amount || lead.quote_amount <= 0) {
      return NextResponse.json(
        { error: "Invalid quote amount" },
        { status: 400 }
      );
    }

    // 3. Calculate booking fee server-side
    const bookingFee = calculateBookingFee(lead.quote_amount);

    // 4. Create Stripe Checkout session for the CUSTOMER booking fee
    const siteUrl = process.env.NEXT_PUBLIC_URL || "https://www.manandvanclub.co.uk";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Booking Fee",
              description: `Accept your mover quote and release your details to the mover. The remaining move cost is paid directly to the mover.`,
            },
            unit_amount: Math.round(bookingFee * 100), // pence
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${siteUrl}/booking-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/quote-cancelled?token=${token}`,
      metadata: {
        paymentType: "customer_booking_fee",
        requestId: lead.id,
        token: lead.customer_quote_token,
        quoteAmount: lead.quote_amount.toString(),
        bookingFee: bookingFee.toString(),
        quotedBy: lead.quoted_by || "",
        customerEmail: lead.email || "",
      },
    });

    // 5. Store Stripe session ID so the webhook can match it
    await supabaseAdmin
      .from("move_requests")
      .update({
        booking_fee_stripe_session_id: session.id,
      })
      .eq("id", lead.id);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("[customer/accept-quote] Error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Internal error" },
      { status: 500 }
    );
  }
}
