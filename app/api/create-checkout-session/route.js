import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function normaliseUkPhone(value) {
  let phone = String(value || "").trim();

  phone = phone.replace(/\s+/g, "");
  phone = phone.replace(/-/g, "");
  phone = phone.replace(/\(/g, "");
  phone = phone.replace(/\)/g, "");

  if (phone.startsWith("+")) {
    phone = phone.slice(1);
  }

  if (phone.startsWith("0044")) {
    phone = `0${phone.slice(4)}`;
  }

  if (phone.startsWith("44")) {
    phone = `0${phone.slice(2)}`;
  }

  phone = phone.replace(/\D/g, "");

  return phone;
}

function phoneMatches(savedPhoneValue, enteredPhoneValue) {
  const savedPhone = normaliseUkPhone(savedPhoneValue);
  const enteredPhone = normaliseUkPhone(enteredPhoneValue);

  if (!savedPhone || !enteredPhone) return false;

  if (savedPhone === enteredPhone) return true;

  const savedLastTen = savedPhone.slice(-10);
  const enteredLastTen = enteredPhone.slice(-10);

  return savedLastTen === enteredLastTen;
}

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.westmidlandscleaner.co.uk"
  ).replace(/\/$/, "");
}

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe secret key is missing in Vercel environment variables." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const quoteReference = String(body.quoteReference || "").trim().toUpperCase();
    const phone = String(body.phone || "").trim();

    if (!quoteReference) {
      return NextResponse.json(
        { error: "Please enter your WMC booking reference." },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        { error: "Please enter the phone number used on the booking request." },
        { status: 400 }
      );
    }

    const { data: job, error: jobError } = await supabaseAdmin
      .from("cleaning_jobs")
      .select("*")
      .eq("quote_reference", quoteReference)
      .single();

    if (jobError || !job) {
      return NextResponse.json(
        { error: "No booking request was found for that reference." },
        { status: 404 }
      );
    }

    if (!phoneMatches(job.customer_phone, phone)) {
      return NextResponse.json(
        {
          error:
            "The phone number does not match this booking reference. You can use either 07 or +44 format. Please check the details or contact WMC."
        },
        { status: 401 }
      );
    }

    if (job.payment_status === "paid") {
      return NextResponse.json(
        { error: "This booking has already been marked as paid." },
        { status: 400 }
      );
    }

    const amount = Number(job.customer_total_price || 0);

    if (!amount || amount <= 0) {
      return NextResponse.json(
        {
          error:
            "This booking does not have a valid selected provider payment amount yet. Please choose an available provider quote before paying WMC securely."
        },
        { status: 400 }
      );
    }

    const siteUrl = getSiteUrl();
    const amountInPence = Math.round(amount * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: job.customer_email || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            unit_amount: amountInPence,
            product_data: {
              name: `West Midlands Cleaner booking ${job.quote_reference}`,
              description: `${job.service_type || "Cleaning booking"} - selected provider quote`
            }
          }
        }
      ],
      metadata: {
        job_id: job.id,
        quote_reference: job.quote_reference,
        customer_name: job.customer_name || "",
        customer_phone: job.customer_phone || ""
      },
      success_url: `${siteUrl}/pay/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pay/cancel?reference=${encodeURIComponent(job.quote_reference)}`
    });

    await supabaseAdmin.from("job_payments").insert({
      job_id: job.id,
      quote_reference: job.quote_reference,
      stripe_payment_id: session.id,
      amount_paid: amount,
      currency: "gbp",
      status: "pending",
      notes: "Stripe Checkout session created. Payment confirmation should be handled by webhook."
    });

    await supabaseAdmin
      .from("cleaning_jobs")
      .update({ payment_status: "payment_pending" })
      .eq("id", job.id);

    return NextResponse.json({
      success: true,
      url: session.url
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to create checkout session." },
      { status: 500 }
    );
  }
}
