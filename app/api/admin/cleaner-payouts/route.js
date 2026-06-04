import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

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

  if (!realPassword) {
    return false;
  }

  return submittedPassword === realPassword;
}

function getCleanerIdFromJob(job) {
  return (
    job.cleaner_id ||
    job.assigned_cleaner_id ||
    job.cleaner_partner_id ||
    job.assigned_cleaner_partner_id ||
    null
  );
}

function getJobReference(job) {
  return job.booking_reference || job.reference || job.job_reference || job.id;
}

function getCustomerName(job) {
  return job.customer_name || job.name || job.full_name || "Customer";
}

function getServiceName(job) {
  return job.service || job.service_type || job.cleaning_type || "Cleaning job";
}

function getCustomerPrice(job) {
  const value =
    job.customer_price ??
    job.customer_total ??
    job.quote_amount ??
    job.price ??
    job.total_price ??
    0;

  return Number(value || 0);
}

function getCleanerPayout(job) {
  const value =
    job.cleaner_payout ??
    job.cleaner_fee ??
    job.cleaner_partner_payout ??
    job.payout_amount ??
    job.cleaner_payout_gbp ??
    0;

  return Number(value || 0);
}

function isPaidJob(job) {
  const paymentStatus = cleanText(job.payment_status).toLowerCase();
  const status = cleanText(job.status).toLowerCase();
  const jobStatus = cleanText(job.job_status).toLowerCase();

  return (
    paymentStatus === "paid" ||
    paymentStatus === "payment_received" ||
    status === "paid" ||
    jobStatus === "paid"
  );
}

function isCleanerAssigned(job) {
  const cleanerId = getCleanerIdFromJob(job);
  const status = cleanText(job.status).toLowerCase();
  const jobStatus = cleanText(job.job_status).toLowerCase();

  return (
    Boolean(cleanerId) ||
    status === "cleaner_assigned" ||
    jobStatus === "cleaner_assigned" ||
    status === "assigned" ||
    jobStatus === "assigned" ||
    status === "accepted" ||
    jobStatus === "accepted" ||
    status === "completed" ||
    jobStatus === "completed" ||
    status === "payout_ready" ||
    jobStatus === "payout_ready"
  );
}

function isCompletedJob(job) {
  const status = cleanText(job.status).toLowerCase();
  const jobStatus = cleanText(job.job_status).toLowerCase();

  return (
    status === "completed" ||
    jobStatus === "completed" ||
    status === "payout_ready" ||
    jobStatus === "payout_ready" ||
    Boolean(job.completed_at)
  );
}

function isPayoutReadyJob(job) {
  const status = cleanText(job.status).toLowerCase();
  const jobStatus = cleanText(job.job_status).toLowerCase();
  const payoutStatus = cleanText(job.payout_status).toLowerCase();
  const cleanerPayoutStatus = cleanText(job.cleaner_payout_status).toLowerCase();

  return (
    status === "payout_ready" ||
    jobStatus === "payout_ready" ||
    payoutStatus === "ready" ||
    payoutStatus === "payout_ready" ||
    cleanerPayoutStatus === "ready" ||
    cleanerPayoutStatus === "payout_ready" ||
    Boolean(job.payout_ready_at)
  );
}

function isAlreadyPaid(job) {
  const payoutStatus = cleanText(job.cleaner_payout_status).toLowerCase();
  const generalPayoutStatus = cleanText(job.payout_status).toLowerCase();

  return (
    payoutStatus === "paid" ||
    generalPayoutStatus === "paid" ||
    Boolean(job.cleaner_stripe_transfer_id)
  );
}

function toPence(amountGbp) {
  return Math.round(Number(amountGbp || 0) * 100);
}

function formatDateForResponse(value) {
  if (!value) {
    return null;
  }

  try {
    return new Date(value).toISOString();
  } catch {
    return null;
  }
}

function getPayoutReadyAgeDays(job) {
  if (!job.payout_ready_at) {
    return null;
  }

  const payoutReadyTime = new Date(job.payout_ready_at).getTime();

  if (!Number.isFinite(payoutReadyTime)) {
    return null;
  }

  const ageMs = Date.now() - payoutReadyTime;
  const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));

  return Math.max(0, ageDays);
}

async function getCleanerPartner(cleanerId) {
  if (!cleanerId) {
    return null;
  }

  const { data, error } = await supabaseAdmin
    .from("cleaner_partners")
    .select("*")
    .eq("id", cleanerId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message || "Could not load cleaner partner.");
  }

  return data;
}

async function buildJobWithCleaner(job) {
  const cleanerId = getCleanerIdFromJob(job);
  const cleaner = await getCleanerPartner(cleanerId);

  return {
    id: job.id,
    reference: getJobReference(job),
    service: getServiceName(job),
    customerName: getCustomerName(job),
    customerPhone: job.customer_phone || job.phone || "",
    customerEmail: job.customer_email || job.email || "",
    date: job.date || job.booking_date || job.preferred_date || "",
    time: job.time || job.booking_time || job.preferred_time || "",
    area: job.area || job.postcode || job.address || job.area_postcode || "",
    customerPrice: getCustomerPrice(job),
    cleanerPayout: getCleanerPayout(job),
    paymentStatus: job.payment_status || "unknown",
    jobStatus: job.job_status || job.status || "unknown",
    status: job.status || "unknown",
    payoutStatus: job.payout_status || "not_ready",
    cleanerPayoutStatus: job.cleaner_payout_status || "not_paid",
    completedAt: formatDateForResponse(job.completed_at),
    payoutReadyAt: formatDateForResponse(job.payout_ready_at),
    payoutReadyAgeDays: getPayoutReadyAgeDays(job),
    cleanerPaidAt: job.cleaner_paid_at || null,
    cleanerStripeTransferId: job.cleaner_stripe_transfer_id || null,
    cleanerId,
    cleaner: cleaner
      ? {
          id: cleaner.id,
          fullName: cleaner.full_name,
          businessName: cleaner.business_name,
          phone: cleaner.phone,
          email: cleaner.email,
          stripeAccountId: cleaner.stripe_account_id,
          stripeOnboardingStatus: cleaner.stripe_onboarding_status,
          stripePayoutsEnabled: cleaner.stripe_payouts_enabled,
          stripeDetailsSubmitted: cleaner.stripe_details_submitted
        }
      : null,
    rawJob: job
  };
}

function getPayoutReadinessProblem(job) {
  if (!isPaidJob(job)) {
    return "Customer payment is not marked as paid.";
  }

  if (!isCleanerAssigned(job)) {
    return "No cleaner partner is assigned to this job.";
  }

  if (!isCompletedJob(job)) {
    return "Job is not marked as completed yet.";
  }

  if (!isPayoutReadyJob(job)) {
    return "Job is not marked as payout ready yet. Mark the job completed, then mark payout ready before paying the cleaner.";
  }

  if (isAlreadyPaid(job)) {
    return "Cleaner payout already appears to be paid.";
  }

  if (getCleanerPayout(job) <= 0) {
    return "Cleaner payout amount is missing or zero.";
  }

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

    const jobs = data || [];

    const payoutReadyJobs = jobs.filter((job) => {
      return !getPayoutReadinessProblem(job);
    });

    const jobsWithCleaners = await Promise.all(payoutReadyJobs.map(buildJobWithCleaner));

    return NextResponse.json({
      success: true,
      manualBackup: true,
      rule:
        "Cleaner payout jobs appear here after customer payment, cleaner assignment, completion, payout-ready marking, and before any previous cleaner payout. Automatic payouts use the 48-hour issue window; this endpoint remains a manual backup.",
      jobs: jobsWithCleaners
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Could not load cleaner payout jobs." },
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

    const payoutReadinessProblem = getPayoutReadinessProblem(job);

    if (payoutReadinessProblem) {
      return NextResponse.json({ error: payoutReadinessProblem }, { status: 400 });
    }

    const cleanerId = getCleanerIdFromJob(job);

    if (!cleanerId) {
      return NextResponse.json(
        { error: "No cleaner partner is assigned to this job." },
        { status: 400 }
      );
    }

    const cleaner = await getCleanerPartner(cleanerId);

    if (!cleaner) {
      return NextResponse.json(
        { error: "Assigned cleaner partner was not found." },
        { status: 404 }
      );
    }

    if (!cleaner.stripe_account_id) {
      return NextResponse.json(
        { error: "Cleaner does not have a Stripe connected account yet." },
        { status: 400 }
      );
    }

    if (!cleaner.stripe_details_submitted) {
      return NextResponse.json(
        { error: "Cleaner Stripe details are not submitted yet. Refresh Stripe status first." },
        { status: 400 }
      );
    }

    if (!cleaner.stripe_payouts_enabled) {
      return NextResponse.json(
        { error: "Cleaner Stripe payouts are not enabled yet. Refresh Stripe status first." },
        { status: 400 }
      );
    }

    const cleanerPayoutGbp = getCleanerPayout(job);
    const amountPence = toPence(cleanerPayoutGbp);

    if (!amountPence || amountPence < 50) {
      return NextResponse.json(
        { error: "Cleaner payout amount must be at least £0.50." },
        { status: 400 }
      );
    }

    const transfer = await stripe.transfers.create(
      {
        amount: amountPence,
        currency: "gbp",
        destination: cleaner.stripe_account_id,
        description: `WMC manual cleaner payout for ${getJobReference(job)}`,
        metadata: {
          platform: "West Midlands Cleaner",
          payout_type: "manual_admin_backup_release",
          job_id: job.id,
          job_reference: getJobReference(job),
          cleaner_id: cleaner.id,
          cleaner_name: cleaner.full_name || "",
          customer_name: getCustomerName(job)
        }
      },
      {
        idempotencyKey: `wmc-manual-cleaner-payout-${job.id}-${cleaner.id}-${amountPence}`
      }
    );

    const paidAt = new Date().toISOString();

    const payoutRecord = {
      job_id: job.id,
      cleaner_id: cleaner.id,
      amount_gbp: cleanerPayoutGbp,
      amount_pence: amountPence,
      currency: "gbp",
      status: "paid",
      stripe_transfer_id: transfer.id,
      stripe_account_id: cleaner.stripe_account_id,
      paid_at: paidAt,
      admin_notes:
        adminNotes ||
        `Manual backup cleaner payout released by WMC admin for ${getJobReference(job)}.`,
      created_by: "WMC admin"
    };

    const { data: payout, error: payoutError } = await supabaseAdmin
      .from("cleaner_payouts")
      .insert(payoutRecord)
      .select("*")
      .single();

    if (payoutError) {
      return NextResponse.json(
        {
          error:
            "Stripe transfer was created, but payout record failed to save: " +
            (payoutError.message || "Unknown database error."),
          stripeTransferId: transfer.id
        },
        { status: 500 }
      );
    }

    await supabaseAdmin
      .from("cleaning_jobs")
      .update({
        cleaner_payout_status: "paid",
        payout_status: "paid",
        cleaner_paid_at: paidAt,
        cleaner_stripe_transfer_id: transfer.id,
        updated_at: paidAt
      })
      .eq("id", job.id);

    return NextResponse.json({
      success: true,
      manualBackup: true,
      message: "Manual backup cleaner payout sent successfully.",
      payout,
      stripeTransferId: transfer.id
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Could not pay cleaner partner." },
      { status: 500 }
    );
  }
}
