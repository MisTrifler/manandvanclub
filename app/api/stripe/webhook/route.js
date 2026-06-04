import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { sendMarketplacePaymentConfirmedEmails } from "../../../../lib/wmcEmails";

export const runtime = "nodejs";

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY in Vercel environment variables.");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

function getAmountInPounds(amountTotal) {
  const amount = Number(amountTotal || 0);

  if (!amount) return 0;

  return Number((amount / 100).toFixed(2));
}

function getPaymentIntentId(session) {
  if (!session.payment_intent) {
    return null;
  }

  if (typeof session.payment_intent === "string") {
    return session.payment_intent;
  }

  return session.payment_intent.id || null;
}

async function updateJobPaymentRecord({
  stripeSessionId,
  stripePaymentIntentId,
  amountPaid,
  currency
}) {
  const { error } = await supabaseAdmin
    .from("job_payments")
    .update({
      status: "paid",
      stripe_payment_intent_id: stripePaymentIntentId,
      amount_paid: amountPaid,
      currency,
      notes: "Payment confirmed automatically by Stripe webhook."
    })
    .eq("stripe_payment_id", stripeSessionId);

  /*
    Do not throw here. Some payments may not have a row in job_payments yet.
    The important part is marking the cleaning job as paid.
  */
  if (error) {
    console.error("job_payments update failed:", error.message);
  }
}

async function markBookingAsPaid(session) {
  const jobId = session.metadata?.job_id || null;
  const quoteReference =
    session.metadata?.quote_reference ||
    session.metadata?.job_reference ||
    null;

  const stripeSessionId = session.id;
  const stripePaymentIntentId = getPaymentIntentId(session);
  const amountPaid = getAmountInPounds(session.amount_total);
  const amountPence = Number(session.amount_total || 0);
  const currency = String(session.currency || "gbp").toLowerCase();

  if (!jobId && !quoteReference) {
    throw new Error("Stripe session metadata is missing job_id and quote_reference/job_reference.");
  }

  let jobQuery = supabaseAdmin.from("cleaning_jobs").select("*");

  if (jobId) {
    jobQuery = jobQuery.eq("id", jobId);
  } else {
    jobQuery = jobQuery.or(
      `quote_reference.eq.${quoteReference},booking_reference.eq.${quoteReference},reference.eq.${quoteReference},job_reference.eq.${quoteReference}`
    );
  }

  const { data: job, error: jobLookupError } = await jobQuery.maybeSingle();

  if (jobLookupError || !job) {
    throw new Error(`Could not find cleaning job for Stripe session ${stripeSessionId}.`);
  }

  const wasAlreadyPaid = String(job.payment_status || "").toLowerCase() === "paid";

  await updateJobPaymentRecord({
    stripeSessionId,
    stripePaymentIntentId,
    amountPaid,
    currency
  });

  const statusBeforePayment = String(job.job_status || "").toLowerCase();
  const keepExistingStatus = ["in_progress", "completed", "payout_ready", "cancelled", "refunded", "dispute"].includes(statusBeforePayment);
  const nextJobStatus = keepExistingStatus
    ? job.job_status
    : job.selected_provider_quote_id
      ? "cleaner_assigned"
      : statusBeforePayment === "cleaner_assigned" || statusBeforePayment === "confirmed"
        ? "cleaner_assigned"
        : "paid";

  const updatePayload = {
    payment_status: "paid",
    job_status: nextJobStatus,
    stripe_checkout_session_id: stripeSessionId,
    stripe_payment_intent_id: stripePaymentIntentId,
    paid_at: new Date().toISOString(),
    payment_amount_pence: amountPence,
    payment_currency: currency
  };

  if (!job.customer_price && amountPaid > 0) {
    updatePayload.customer_price = amountPaid;
  }

  const { data: updatedJob, error: jobUpdateError } = await supabaseAdmin
    .from("cleaning_jobs")
    .update(updatePayload)
    .eq("id", job.id)
    .select("*")
    .single();

  if (jobUpdateError) {
    throw new Error(jobUpdateError.message || "Could not mark cleaning job as paid.");
  }

  let emailResults = null;

  if (!wasAlreadyPaid && updatedJob.selected_provider_quote_id) {
    const { data: selectedQuote, error: quoteError } = await supabaseAdmin
      .from("provider_quotes")
      .select("*")
      .eq("id", updatedJob.selected_provider_quote_id)
      .maybeSingle();

    if (!quoteError && selectedQuote) {
      emailResults = await sendMarketplacePaymentConfirmedEmails({
        job: updatedJob,
        quote: selectedQuote
      }).catch((emailError) => ({
        error: emailError?.message || "Marketplace payment confirmation emails failed."
      }));
    }
  }

  return {
    jobId: updatedJob.id,
    quoteReference:
      updatedJob.quote_reference ||
      updatedJob.booking_reference ||
      updatedJob.reference ||
      updatedJob.job_reference ||
      quoteReference,
    amountPaid,
    amountPence,
    currency,
    stripeSessionId,
    stripePaymentIntentId,
    emailResults
  };
}

export async function POST(request) {
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return NextResponse.json(
        { error: "Missing STRIPE_WEBHOOK_SECRET in Vercel environment variables." },
        { status: 500 }
      );
    }

    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing Stripe signature header." },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const rawBody = await request.text();

    let event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (error) {
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${error.message}` },
        { status: 400 }
      );
    }

    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        if (session.payment_status === "paid") {
          await markBookingAsPaid(session);
        }
      }

      if (event.type === "checkout.session.async_payment_succeeded") {
        const session = event.data.object;
        await markBookingAsPaid(session);
      }

      return NextResponse.json({
        received: true
      });
    } catch (error) {
      return NextResponse.json(
        { error: error?.message || "Webhook processing failed." },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Stripe webhook failed." },
      { status: 500 }
    );
  }
}
