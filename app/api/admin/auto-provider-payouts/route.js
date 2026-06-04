import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import {
  sendBusinessPayoutSentEmail,
  sendCleanerPayoutSentEmail
} from "../../../../lib/wmcEmails";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ISSUE_WINDOW_HOURS = 48;
const MAX_JOBS_PER_RUN = 25;

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is missing in Vercel environment variables.");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

function cleanText(value) {
  return String(value || "").trim();
}

function toPence(value) {
  return Math.round(Number(value || 0) * 100);
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

  if (realPassword && submittedPassword && submittedPassword === realPassword) {
    return true;
  }

  const cronSecret = process.env.WMC_CRON_SECRET || process.env.CRON_SECRET || "";
  const authHeader = request.headers.get("authorization") || "";
  const submittedCronSecret = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : request.nextUrl?.searchParams?.get("secret") || "";

  return Boolean(cronSecret && submittedCronSecret && submittedCronSecret === cronSecret);
}

function getJobReference(job) {
  return job.quote_reference || job.booking_reference || job.reference || job.job_reference || job.id;
}

function getCustomerName(job) {
  return job.customer_name || job.name || job.full_name || "Customer";
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

function getBusinessIdFromJob(job) {
  return job.assigned_business_partner_id || job.business_partner_id || null;
}

function getCleanerPayout(job) {
  return Number(
    job.cleaner_payout ??
      job.cleaner_fee ??
      job.cleaner_partner_payout ??
      job.payout_amount ??
      job.cleaner_payout_gbp ??
      0
  );
}

function getBusinessPayout(job) {
  return Number(job.business_payout ?? job.cleaner_payout ?? job.payout_amount ?? 0);
}

function isPaidJob(job) {
  const paymentStatus = cleanText(job.payment_status).toLowerCase();
  const status = cleanText(job.status).toLowerCase();
  const jobStatus = cleanText(job.job_status).toLowerCase();

  return (
    paymentStatus === "paid" ||
    paymentStatus === "payment_received" ||
    status === "paid" ||
    jobStatus === "paid" ||
    Boolean(job.stripe_payment_intent_id)
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
  const businessPayoutStatus = cleanText(job.business_payout_status).toLowerCase();

  return (
    status === "payout_ready" ||
    jobStatus === "payout_ready" ||
    payoutStatus === "ready" ||
    payoutStatus === "payout_ready" ||
    cleanerPayoutStatus === "ready" ||
    cleanerPayoutStatus === "payout_ready" ||
    businessPayoutStatus === "ready" ||
    businessPayoutStatus === "payout_ready" ||
    Boolean(job.payout_ready_at)
  );
}

function isAlreadyPaid(job) {
  const cleanerPayoutStatus = cleanText(job.cleaner_payout_status).toLowerCase();
  const businessPayoutStatus = cleanText(job.business_payout_status).toLowerCase();
  const generalPayoutStatus = cleanText(job.payout_status).toLowerCase();

  return (
    cleanerPayoutStatus === "paid" ||
    businessPayoutStatus === "paid" ||
    generalPayoutStatus === "paid" ||
    Boolean(job.cleaner_paid_at) ||
    Boolean(job.business_paid_at) ||
    Boolean(job.cleaner_stripe_transfer_id) ||
    Boolean(job.business_stripe_transfer_id)
  );
}

function hasUnresolvedIssue(job) {
  const issueFields = [
    job.issue_status,
    job.customer_issue_status,
    job.complaint_status,
    job.dispute_status,
    job.refund_status,
    job.payout_hold_reason,
    job.hold_reason,
    job.admin_hold_reason
  ]
    .map((value) => cleanText(value).toLowerCase())
    .filter(Boolean);

  if (job.payout_on_hold === true || job.hold_payout === true || job.has_open_issue === true || job.has_complaint === true) {
    return true;
  }

  return issueFields.some((value) => {
    if (["none", "no", "false", "resolved", "closed", "complete", "completed", "not_applicable", "n/a"].includes(value)) {
      return false;
    }

    return (
      value.includes("complaint") ||
      value.includes("dispute") ||
      value.includes("refund") ||
      value.includes("hold") ||
      value.includes("issue") ||
      value.includes("problem") ||
      value.includes("cancel") ||
      value.includes("failed")
    );
  });
}

function getIssueWindowStartedAt(job) {
  return job.payout_ready_at || job.completed_at || null;
}

function getIssueWindowAgeHours(job) {
  const startedAt = getIssueWindowStartedAt(job);

  if (!startedAt) {
    return null;
  }

  const startedTime = new Date(startedAt).getTime();

  if (!Number.isFinite(startedTime)) {
    return null;
  }

  return Math.max(0, Math.floor((Date.now() - startedTime) / (1000 * 60 * 60)));
}

function getProviderType(job) {
  if (getBusinessIdFromJob(job)) return "business";
  if (getCleanerIdFromJob(job)) return "cleaner";
  return "unknown";
}

function getPayoutReadinessProblem(job) {
  if (!isPaidJob(job)) return "Customer payment is not marked as paid.";
  if (!isCompletedJob(job)) return "Job is not marked as completed yet.";
  if (!isPayoutReadyJob(job)) return "Job is not marked as payout ready yet.";
  if (isAlreadyPaid(job)) return "Provider payout already appears to be paid.";
  if (hasUnresolvedIssue(job)) return "Job has an unresolved issue, complaint, refund matter or payout hold.";

  const ageHours = getIssueWindowAgeHours(job);
  if (ageHours === null) return "No completion/payout-ready timestamp is available for the 48-hour issue window.";
  if (ageHours < ISSUE_WINDOW_HOURS) {
    return `48-hour issue window has not passed yet. Current age: ${ageHours} hour(s).`;
  }

  const providerType = getProviderType(job);
  if (providerType === "business" && getBusinessPayout(job) <= 0) return "Business payout amount is missing or zero.";
  if (providerType === "cleaner" && getCleanerPayout(job) <= 0) return "Cleaner payout amount is missing or zero.";
  if (providerType === "unknown") return "No approved provider is assigned to this job.";

  return "";
}

async function getCleanerPartner(cleanerId) {
  if (!cleanerId) return null;

  const { data, error } = await supabaseAdmin
    .from("cleaner_partners")
    .select("*")
    .eq("id", cleanerId)
    .maybeSingle();

  if (error) throw new Error(error.message || "Could not load cleaner partner.");
  return data;
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

function validateStripeAccount(provider, providerLabel) {
  if (!provider?.stripe_account_id) return `${providerLabel} does not have a Stripe connected account yet.`;
  if (!provider.stripe_details_submitted) return `${providerLabel} Stripe details are not submitted yet.`;
  if (!provider.stripe_payouts_enabled) return `${providerLabel} Stripe payouts are not enabled yet.`;
  return "";
}

async function payCleanerJob({ stripe, job }) {
  const cleanerId = getCleanerIdFromJob(job);
  const cleaner = await getCleanerPartner(cleanerId);

  if (!cleaner) throw new Error("Assigned cleaner partner was not found.");

  const stripeProblem = validateStripeAccount(cleaner, "Cleaner");
  if (stripeProblem) throw new Error(stripeProblem);

  const cleanerPayoutGbp = getCleanerPayout(job);
  const amountPence = toPence(cleanerPayoutGbp);

  if (!amountPence || amountPence < 50) {
    throw new Error("Cleaner payout amount must be at least £0.50.");
  }

  const transfer = await stripe.transfers.create(
    {
      amount: amountPence,
      currency: "gbp",
      destination: cleaner.stripe_account_id,
      description: `WMC automatic cleaner payout for ${getJobReference(job)}`,
      metadata: {
        platform: "West Midlands Cleaner",
        payout_type: "automatic_48_hour_issue_window",
        provider_type: "self_employed_cleaner",
        job_id: job.id,
        job_reference: getJobReference(job),
        cleaner_id: cleaner.id,
        cleaner_name: cleaner.full_name || "",
        customer_name: getCustomerName(job)
      }
    },
    {
      idempotencyKey: `wmc-auto-cleaner-payout-48h-${job.id}-${cleaner.id}-${amountPence}`
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
    admin_notes: `Automatic cleaner payout released after the 48-hour issue window for ${getJobReference(job)}.`,
    created_by: "WMC automatic payout"
  };

  const { data: payout, error: payoutError } = await supabaseAdmin
    .from("cleaner_payouts")
    .insert(payoutRecord)
    .select("*")
    .single();

  if (payoutError) {
    throw new Error(
      `Stripe transfer was created, but cleaner payout record failed to save: ${payoutError.message || "Unknown database error."}`
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

  const emailResult = await sendCleanerPayoutSentEmail({
    job,
    cleaner,
    payout,
    transferId: transfer.id
  }).catch((emailError) => ({
    sent: false,
    error: emailError?.message || "Cleaner payout confirmation email failed."
  }));

  return {
    providerType: "cleaner",
    providerId: cleaner.id,
    providerName: cleaner.full_name || cleaner.business_name || "Cleaner partner",
    payout,
    stripeTransferId: transfer.id,
    emailResult
  };
}

async function payBusinessJob({ stripe, job }) {
  const businessPartnerId = getBusinessIdFromJob(job);
  const business = await getBusinessPartner(businessPartnerId);

  if (!business) throw new Error("Assigned business partner was not found.");

  const stripeProblem = validateStripeAccount(business, "Business");
  if (stripeProblem) throw new Error(stripeProblem);

  const businessPayoutGbp = getBusinessPayout(job);
  const amountPence = toPence(businessPayoutGbp);

  if (!amountPence || amountPence < 50) {
    throw new Error("Business payout amount must be at least £0.50.");
  }

  const transfer = await stripe.transfers.create(
    {
      amount: amountPence,
      currency: "gbp",
      destination: business.stripe_account_id,
      description: `WMC automatic business payout for ${getJobReference(job)}`,
      metadata: {
        platform: "West Midlands Cleaner",
        payout_type: "automatic_48_hour_issue_window",
        provider_type: "business_partner",
        job_id: job.id,
        job_reference: getJobReference(job),
        business_partner_id: business.id,
        business_name: business.business_name || "",
        customer_name: getCustomerName(job)
      }
    },
    {
      idempotencyKey: `wmc-auto-business-payout-48h-${job.id}-${business.id}-${amountPence}`
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
    admin_notes: `Automatic business payout released after the 48-hour issue window for ${getJobReference(job)}.`,
    created_by: "WMC automatic payout"
  };

  const { data: payout, error: payoutError } = await supabaseAdmin
    .from("business_payouts")
    .insert(payoutRecord)
    .select("*")
    .single();

  if (payoutError) {
    throw new Error(
      `Stripe transfer was created, but business payout record failed to save: ${payoutError.message || "Unknown database error."}`
    );
  }

  await supabaseAdmin
    .from("cleaning_jobs")
    .update({
      business_payout_status: "paid",
      payout_status: "paid",
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

  return {
    providerType: "business",
    providerId: business.id,
    providerName: business.business_name || business.trading_name || "Business partner",
    payout,
    stripeTransferId: transfer.id,
    emailResult
  };
}

async function runAutomaticProviderPayouts({ dryRun = false } = {}) {
  const { data, error } = await supabaseAdmin
    .from("cleaning_jobs")
    .select("*")
    .order("payout_ready_at", { ascending: true, nullsFirst: false })
    .limit(200);

  if (error) {
    throw new Error(error.message || "Could not load cleaning jobs for automatic payouts.");
  }

  const jobs = data || [];
  const eligible = [];
  const skipped = [];

  for (const job of jobs) {
    const problem = getPayoutReadinessProblem(job);
    const summary = {
      jobId: job.id,
      reference: getJobReference(job),
      providerType: getProviderType(job),
      issueWindowAgeHours: getIssueWindowAgeHours(job),
      problem
    };

    if (problem) {
      skipped.push(summary);
    } else {
      eligible.push({ job, summary });
    }
  }

  const jobsToProcess = eligible.slice(0, MAX_JOBS_PER_RUN);

  if (dryRun) {
    return {
      dryRun: true,
      eligible_count: eligible.length,
      process_limit: MAX_JOBS_PER_RUN,
      would_process: jobsToProcess.map((item) => item.summary),
      skipped_count: skipped.length
    };
  }

  const stripe = getStripe();
  const processed = [];
  const failed = [];

  for (const item of jobsToProcess) {
    try {
      const job = item.job;
      const providerType = getProviderType(job);
      const result = providerType === "business"
        ? await payBusinessJob({ stripe, job })
        : await payCleanerJob({ stripe, job });

      processed.push({
        jobId: job.id,
        reference: getJobReference(job),
        issueWindowAgeHours: getIssueWindowAgeHours(job),
        ...result
      });
    } catch (error) {
      failed.push({
        jobId: item.job.id,
        reference: getJobReference(item.job),
        providerType: getProviderType(item.job),
        error: error?.message || "Automatic payout failed."
      });
    }
  }

  return {
    dryRun: false,
    eligible_count: eligible.length,
    process_limit: MAX_JOBS_PER_RUN,
    processed_count: processed.length,
    failed_count: failed.length,
    processed,
    failed,
    skipped_count: skipped.length
  };
}

export async function GET(request) {
  try {
    if (!isAuthorised(request)) {
      return NextResponse.json({ error: "Not authorised" }, { status: 401 });
    }

    const dryRun = request.nextUrl?.searchParams?.get("dryRun") === "1";
    const result = await runAutomaticProviderPayouts({ dryRun });

    return NextResponse.json({
      success: true,
      rule:
        "Automatic provider payouts release only after customer payment, provider assignment, job completion, payout-ready marking, no unresolved issue, and a 48-hour issue window.",
      ...result
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Could not run automatic provider payouts." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    if (!isAuthorised(request)) {
      return NextResponse.json({ error: "Not authorised" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const result = await runAutomaticProviderPayouts({ dryRun: body?.dryRun === true });

    return NextResponse.json({
      success: true,
      rule:
        "Automatic provider payouts release only after customer payment, provider assignment, job completion, payout-ready marking, no unresolved issue, and a 48-hour issue window.",
      ...result
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Could not run automatic provider payouts." },
      { status: 500 }
    );
  }
}
