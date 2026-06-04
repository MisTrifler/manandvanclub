import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { sendBusinessPayoutSentEmail } from "../../../../lib/wmcEmails";

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

function getAdminPasswordFromRequest(request) {
  return (
    request.headers.get("x-wmc-admin-password") ||
    request.headers.get("x-admin-password") ||
    ""
  );
}

function isAuthorised(request) {
  const submittedPassword = getAdminPasswordFromRequest(request);
  const realPassword = process.env.WMC_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
  return Boolean(realPassword && submittedPassword && submittedPassword === realPassword);
}

function getJobReference(job) {
  return job.quote_reference || job.booking_reference || job.reference || job.job_reference || job.id;
}

function getCustomerName(job) {
  return job.customer_name || job.name || job.full_name || "Customer";
}

function getServiceName(job) {
  return job.service_type || job.service || job.cleaning_type || "Cleaning job";
}

function getCustomerPrice(job) {
  return Number(
    job.customer_total_price ??
      job.customer_price ??
      job.customer_total ??
      job.quote_amount ??
      job.price ??
      job.total_price ??
      0
  );
}

function getBusinessPayout(job) {
  return Number(
    job.business_payout ??
      job.cleaner_payout ??
      job.payout_amount ??
      0
  );
}

function isPaidJob(job) {
  const paymentStatus = cleanText(job.payment_status).toLowerCase();
  const status = cleanText(job.status).toLowerCase();
  return paymentStatus === "paid" || status === "paid" || Boolean(job.stripe_payment_intent_id);
}

function isBusinessAssigned(job) {
  return Boolean(job.assigned_business_partner_id);
}

function isCompletedJob(job) {
  const jobStatus = cleanText(job.job_status).toLowerCase();
  const status = cleanText(job.status).toLowerCase();
  return jobStatus === "completed" || status === "completed" || Boolean(job.completed_at);
}

function isPayoutReadyJob(job) {
  const payoutStatus = cleanText(job.payout_status).toLowerCase();
  const jobStatus = cleanText(job.job_status).toLowerCase();
  return payoutStatus === "ready" || payoutStatus === "payout_ready" || jobStatus === "payout_ready";
}

function isAlreadyPaid(job) {
  const businessPayoutStatus = cleanText(job.business_payout_status).toLowerCase();
  return (
    businessPayoutStatus === "paid" ||
    Boolean(job.business_paid_at) ||
    Boolean(job.business_stripe_transfer_id)
  );
}

function toPence(value) {
  return Math.round(Number(value || 0) * 100);
}

function formatDateForResponse(value) {
  return value || null;
}

function getPayoutReadyAgeDays(job) {
  if (!job.payout_ready_at) return null;
  const payoutReadyDate = new Date(job.payout_ready_at);
  if (Number.isNaN(payoutReadyDate.getTime())) return null;
  return Math.max(0, Math.floor((Date.now() - payoutReadyDate.getTime()) / (1000 * 60 * 60 * 24)));
}

async function getBusinessPartner(businessPartnerId) {
  if (!businessPartnerId) return null;

  const { data, error } = await supabaseAdmin
    .from("business_partners")
    .select("*")
    .eq("id", businessPartnerId)
    .maybeSingle();

  if (error) throw new Error(error.message || "Could not load business partner.");

  return data;
}

async function buildJobWithBusiness(job) {
  const business = await getBusinessPartner(job.assigned_business_partner_id);

  return {
    id: job.id,
    reference: getJobReference(job),
    service: getServiceName(job),
    customerName: getCustomerName(job),
    customerPhone: job.customer_phone || job.phone || "",
    customerEmail: job.customer_email || job.email || "",
    date: job.preferred_date || job.date || job.booking_date || "",
    time: job.preferred_time || job.time || job.booking_time || "",
    area: job.area_town || job.postcode || job.address || job.area_postcode || "",
    customerPrice: getCustomerPrice(job),
    businessPayout: getBusinessPayout(job),
    paymentStatus: job.payment_status || "unknown",
    jobStatus: job.job_status || job.status || "unknown",
    payoutStatus: job.payout_status || "not_ready",
    businessPayoutStatus: job.business_payout_status || "not_paid",
    completedAt: formatDateForResponse(job.completed_at),
    payoutReadyAt: formatDateForResponse(job.payout_ready_at),
    payoutReadyAgeDays: getPayoutReadyAgeDays(job),
    businessPaidAt: job.business_paid_at || null,
    businessStripeTransferId: job.business_stripe_transfer_id || null,
    business: business
      ? {
          id: business.id,
          businessName: business.business_name,
          tradingName: business.trading_name,
          contactName: business.contact_name,
          phone: business.phone,
          email: business.email,
          stripeAccountId: business.stripe_account_id,
          stripeOnboardingStatus: business.stripe_onboarding_status,
          stripePayoutsEnabled: business.stripe_payouts_enabled,
          stripeDetailsSubmitted: business.stripe_details_submitted
        }
      : null,
    rawJob: job
  };
}

function getPayoutReadinessProblem(job) {
  if (!isPaidJob(job)) return "Customer payment is not marked as paid.";
  if (!isBusinessAssigned(job)) return "No business partner is assigned to this job.";
  if (!isCompletedJob(job)) return "Job is not marked as completed yet.";
  if (!isPayoutReadyJob(job)) return "Job is not marked as payout ready yet.";
  if (isAlreadyPaid(job)) return "Business payout already appears to be paid.";
  if (getBusinessPayout(job) <= 0) return "Business payout amount is missing or zero.";
  return "";
}

export async function GET(request) {
  try {
    if (!isAuthorised(request)) {
      return NextResponse.json({ error: "Not authorised" }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from("cleaning_jobs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      return NextResponse.json(
        { error: error.message || "Could not load cleaning jobs." },
        { status: 500 }
      );
    }

    const payoutReadyJobs = (data || []).filter((job) => !getPayoutReadinessProblem(job));
    const jobsWithBusinesses = await Promise.all(payoutReadyJobs.map(buildJobWithBusiness));

    return NextResponse.json({
      success: true,
      manualBackup: true,
      rule:
        "Business payout jobs appear here after customer payment, business assignment, completion, payout-ready marking, and before any previous business payout. Automatic payouts use the 48-hour issue window; this endpoint remains a manual backup.",
      jobs: jobsWithBusinesses
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Could not load business payout jobs." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    if (!isAuthorised(request)) {
      return NextResponse.json({ error: "Not authorised" }, { status: 401 });
    }

    const stripe = getStripe();
    const body = await request.json();
    const jobId = cleanText(body.jobId);
    const adminNotes = cleanText(body.adminNotes);

    if (!jobId) {
      return NextResponse.json({ error: "Job ID is required." }, { status: 400 });
    }

    const { data: job, error: jobError } = await supabaseAdmin
      .from("cleaning_jobs")
      .select("*")
      .eq("id", jobId)
      .maybeSingle();

    if (jobError || !job) {
      return NextResponse.json(
        { error: jobError?.message || "Cleaning job was not found." },
        { status: 404 }
      );
    }

    const readinessProblem = getPayoutReadinessProblem(job);
    if (readinessProblem) {
      return NextResponse.json({ error: readinessProblem }, { status: 400 });
    }

    const business = await getBusinessPartner(job.assigned_business_partner_id);

    if (!business) {
      return NextResponse.json({ error: "Assigned business partner was not found." }, { status: 404 });
    }

    if (!business.stripe_account_id) {
      return NextResponse.json({ error: "Business does not have a Stripe connected account yet." }, { status: 400 });
    }

    if (!business.stripe_details_submitted) {
      return NextResponse.json({ error: "Business Stripe details are not submitted yet. Refresh Stripe status first." }, { status: 400 });
    }

    if (!business.stripe_payouts_enabled) {
      return NextResponse.json({ error: "Business Stripe payouts are not enabled yet. Refresh Stripe status first." }, { status: 400 });
    }

    const businessPayoutGbp = getBusinessPayout(job);
    const amountPence = toPence(businessPayoutGbp);

    if (!amountPence || amountPence < 50) {
      return NextResponse.json({ error: "Business payout amount must be at least £0.50." }, { status: 400 });
    }

    const transfer = await stripe.transfers.create(
      {
        amount: amountPence,
        currency: "gbp",
        destination: business.stripe_account_id,
        description: `WMC manual business payout for ${getJobReference(job)}`,
        metadata: {
          platform: "West Midlands Cleaner",
          payout_type: "manual_business_backup_release",
          job_id: job.id,
          job_reference: getJobReference(job),
          business_partner_id: business.id,
          business_name: business.business_name || "",
          customer_name: getCustomerName(job)
        }
      },
      {
        idempotencyKey: `wmc-manual-business-payout-${job.id}-${business.id}-${amountPence}`
      }
    );

    const paidAt = new Date().toISOString();

    const payoutRecord = {
      job_id: job.id,
      business_partner_id: business.id,
      amount_gbp: businessPayoutGbp,
      amount_pence: amountPence,
      currency: "gbp",
      status: "paid",
      stripe_transfer_id: transfer.id,
      stripe_account_id: business.stripe_account_id,
      paid_at: paidAt,
      admin_notes:
        adminNotes ||
        `Manual backup business payout released by WMC admin for ${getJobReference(job)}.`,
      created_by: "WMC admin"
    };

    const { data: payout, error: payoutError } = await supabaseAdmin
      .from("business_payouts")
      .insert(payoutRecord)
      .select("*")
      .single();

    if (payoutError) {
      return NextResponse.json(
        {
          error:
            "Stripe transfer was created, but business payout record failed to save: " +
            (payoutError.message || "Unknown database error."),
          stripeTransferId: transfer.id
        },
        { status: 500 }
      );
    }

    await supabaseAdmin
      .from("cleaning_jobs")
      .update({
        business_payout_status: "paid",
        business_paid_at: paidAt,
        business_stripe_transfer_id: transfer.id,
        updated_at: paidAt
      })
      .eq("id", job.id);

    const emailResult = await sendBusinessPayoutSentEmail({
      job,
      business,
      payout,
      transferId: transfer.id
    }).catch((emailError) => ({
      sent: false,
      error: emailError?.message || "Business payout confirmation email failed."
    }));

    return NextResponse.json({
      success: true,
      manualBackup: true,
      message: "Manual backup business payout sent successfully.",
      payout,
      stripeTransferId: transfer.id,
      email_result: emailResult
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Could not pay business partner." },
      { status: 500 }
    );
  }
}
