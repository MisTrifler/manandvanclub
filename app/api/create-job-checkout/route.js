import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const runtime = "nodejs";

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is missing in Vercel environment variables.");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

function cleanText(value) {
  return String(value || "").trim();
}

function cleanPhone(value) {
  return String(value || "")
    .replace(/\s+/g, "")
    .replace(/^0044/, "+44")
    .replace(/^44/, "+44")
    .trim();
}

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.westmidlandscleaner.co.uk").replace(
    /\/$/,
    ""
  );
}

function getJobReference(job) {
  return job.booking_reference || job.reference || job.job_reference || job.id;
}

function getCustomerName(job) {
  return job.customer_name || job.name || job.full_name || "WMC customer";
}

function getCustomerEmail(job) {
  return job.customer_email || job.email || "";
}

function getServiceName(job) {
  return job.service || job.service_type || job.cleaning_type || "Cleaning booking";
}

function getCustomerPrice(job) {
  const value =
    job.customer_price ??
    job.customer_total ??
    job.customer_total_price ??
    job.customer_estimated_total ??
    job.quote_amount ??
    job.quote_total ??
    job.price ??
    job.total_price ??
    job.amount ??
    0;

  return Number(value || 0);
}

function toPence(amountGbp) {
  return Math.round(Number(amountGbp || 0) * 100);
}

function isPhoneMatch(submittedPhone, job) {
  const submitted = cleanPhone(submittedPhone);
  const jobPhones = [job.customer_phone, job.phone, job.mobile, job.telephone]
    .filter(Boolean)
    .map(cleanPhone);

  if (!submitted || jobPhones.length === 0) {
    return false;
  }

  return jobPhones.some((phone) => {
    return phone === submitted || phone.endsWith(submitted.replace("+44", "0"));
  });
}

export async function POST(request) {
  try {
    const stripe = getStripe();
    const body = await request.json();

    const reference = cleanText(body.reference || body.bookingReference);
    const phone = cleanText(body.phone);

    if (!reference) {
      return NextResponse.json({ error: "Booking reference is required." }, { status: 400 });
    }

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
    }

    const { data: job, error: jobError } = await supabaseAdmin
      .from("cleaning_jobs")
      .select("*")
      .or(`booking_reference.eq.${reference},reference.eq.${reference},job_reference.eq.${reference},id.eq.${reference}`)
      .maybeSingle();

    if (jobError || !job) {
      return NextResponse.json(
        { error: "Booking was not found. Please check the reference and phone number." },
        { status: 404 }
      );
    }

    if (!isPhoneMatch(phone, job)) {
      return NextResponse.json(
        { error: "The phone number does not match this booking." },
        { status: 403 }
      );
    }

    const paymentStatus = cleanText(job.payment_status).toLowerCase();

    if (paymentStatus === "paid") {
      return NextResponse.json(
        { error: "This booking is already marked as paid." },
        { status: 400 }
      );
    }

    const customerPriceGbp = getCustomerPrice(job);
    const amountPence = toPence(customerPriceGbp);

    if (!amountPence || amountPence < 50) {
      return NextResponse.json(
        {
          error:
            "This booking does not have a valid confirmed customer price yet. Please contact WMC."
        },
        { status: 400 }
      );
    }

    const siteUrl = getSiteUrl();
    const jobReference = getJobReference(job);

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: getCustomerEmail(job) || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            unit_amount: amountPence,
            product_data: {
              name: `West Midlands Cleaner - ${getServiceName(job)}`,
              description: `Booking reference: ${jobReference}`
            }
          }
        }
      ],
      success_url: `${siteUrl}/booking-status?reference=${encodeURIComponent(
        jobReference
      )}&phone=${encodeURIComponent(phone)}&payment=success`,
      cancel_url: `${siteUrl}/booking-status?reference=${encodeURIComponent(
        jobReference
      )}&phone=${encodeURIComponent(phone)}&payment=cancelled`,
      payment_intent_data: {
        transfer_group: `wmc_job_${job.id}`,
        metadata: {
          platform: "West Midlands Cleaner",
          job_id: job.id,
          job_reference: jobReference,
          customer_name: getCustomerName(job)
        }
      },
      metadata: {
        platform: "West Midlands Cleaner",
        job_id: job.id,
        job_reference: jobReference,
        customer_name: getCustomerName(job)
      }
    });

    const { error: updateError } = await supabaseAdmin
      .from("cleaning_jobs")
      .update({
        stripe_checkout_session_id: checkoutSession.id,
        payment_status: "checkout_started",
        payment_amount_pence: amountPence,
        payment_currency: "gbp"
      })
      .eq("id", job.id);

    if (updateError) {
      return NextResponse.json(
        {
          error:
            "Stripe Checkout was created, but the booking could not be updated: " +
            updateError.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: checkoutSession.url,
      checkoutSessionId: checkoutSession.id
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Could not create Stripe checkout." },
      { status: 500 }
    );
  }
}
