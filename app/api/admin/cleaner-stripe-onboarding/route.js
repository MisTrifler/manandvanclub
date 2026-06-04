import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { sendWmcEmail } from "../../../../lib/wmcEmails";

export const runtime = "nodejs";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

function cleanText(value) {
  return String(value || "").trim();
}

function cleanEmail(value) {
  return String(value || "").trim().toLowerCase();
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

function getSiteOrigin(request) {
  const origin = request.headers.get("origin");

  if (origin) {
    return origin;
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  return "https://www.westmidlandscleaner.co.uk";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildCleanerStripeOnboardingEmail({ cleanerPartner, onboardingUrl }) {
  const cleanerName = cleanerPartner?.full_name || "there";

  return `
    <div style="margin:0;padding:0;background:#f4f8fa;font-family:Arial,sans-serif;color:#071733;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
        Complete your West Midlands Cleaner payout setup.
      </div>

      <div style="max-width:760px;margin:0 auto;padding:28px 16px;">
        <div style="background:#ffffff;border:1px solid #dbe7ef;border-radius:24px;padding:28px;box-shadow:0 18px 45px rgba(7,23,51,0.08);">
          <p style="margin:0 0 12px;color:#0f8276;font-size:12px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;">
            West Midlands Cleaner
          </p>

          <h1 style="margin:0 0 16px;color:#071733;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">
            Complete your payout setup
          </h1>

          <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
            Hi ${escapeHtml(cleanerName)},
          </p>

          <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
            Your West Midlands Cleaner partner application has been approved for the next step.
          </p>

          <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
            Please complete your secure Stripe Express onboarding using the button below. Stripe will collect your payout and verification details securely.
          </p>

          <p style="margin:24px 0;text-align:center;">
            <a href="${escapeHtml(onboardingUrl)}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:16px;font-weight:800;">
              Complete Stripe payout setup
            </a>
          </p>

          <div style="background:#eef6ff;border:1px solid #bfd9ff;border-radius:18px;padding:18px;margin:18px 0;color:#173f91;line-height:1.65;font-size:15px;">
            <strong>Important:</strong><br>
            We can only offer paid cleaning bookings once your onboarding, document checks and approval checks are complete.
          </div>

          <p style="margin:18px 0;color:#33445f;font-size:15px;line-height:1.65;">
            If the button does not work, copy and paste this link into your browser:<br>
            <a href="${escapeHtml(onboardingUrl)}" style="color:#0f8276;font-weight:700;word-break:break-word;">${escapeHtml(onboardingUrl)}</a>
          </p>

          <div style="margin-top:26px;padding-top:18px;border-top:1px solid #e5edf3;color:#40516b;font-size:14px;line-height:1.6;">
            <strong>West Midlands Cleaner</strong><br>
            Phone / WhatsApp: 07943 617386<br>
            Email: info@westmidlandscleaner.co.uk<br>
            Website: <a href="https://www.westmidlandscleaner.co.uk" style="color:#0f8276;">https://www.westmidlandscleaner.co.uk</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function sendCleanerStripeOnboardingEmail({ cleanerPartner, onboardingUrl }) {
  const cleanerEmail = cleanEmail(cleanerPartner?.email);

  if (!cleanerEmail) {
    return {
      sent: false,
      skipped: true,
      error: "Cleaner email not provided."
    };
  }

  return sendWmcEmail({
    to: [cleanerEmail],
    subject: "Complete your West Midlands Cleaner payout setup",
    html: buildCleanerStripeOnboardingEmail({
      cleanerPartner,
      onboardingUrl
    }),
    replyTo: process.env.WMC_REPLY_TO_EMAIL || "info@westmidlandscleaner.co.uk"
  });
}

async function findCleanerPartnerFromApplication(application) {
  const email = cleanEmail(application.email);
  const phone = cleanText(application.phone);

  if (email) {
    const { data } = await supabaseAdmin
      .from("cleaner_partners")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (data) {
      return data;
    }
  }

  if (phone) {
    const { data } = await supabaseAdmin
      .from("cleaner_partners")
      .select("*")
      .eq("phone", phone)
      .maybeSingle();

    if (data) {
      return data;
    }
  }

  return null;
}

async function createStripeExpressAccount(cleanerPartner) {
  const account = await stripe.accounts.create({
    type: "express",
    country: "GB",
    email: cleanerPartner.email || undefined,
    business_type: "individual",
    capabilities: {
      transfers: {
        requested: true
      }
    },
    business_profile: {
      name: cleanerPartner.business_name || cleanerPartner.full_name || "WMC cleaner partner",
      product_description:
        "Independent self-employed cleaner partner receiving cleaning booking payouts from West Midlands Cleaner."
    },
    metadata: {
      cleaner_partner_id: cleanerPartner.id,
      cleaner_name: cleanerPartner.full_name || "",
      platform: "West Midlands Cleaner"
    }
  });

  return account;
}

async function updateCleanerPartnerStripeStatus(cleanerPartnerId, stripeAccount) {
  const updatePayload = {
    stripe_account_id: stripeAccount.id,
    stripe_charges_enabled: Boolean(stripeAccount.charges_enabled),
    stripe_payouts_enabled: Boolean(stripeAccount.payouts_enabled),
    stripe_details_submitted: Boolean(stripeAccount.details_submitted),
    stripe_onboarding_status: stripeAccount.details_submitted ? "submitted" : "pending"
  };

  if (stripeAccount.details_submitted && stripeAccount.payouts_enabled) {
    updatePayload.stripe_onboarding_status = "complete";
    updatePayload.stripe_onboarded_at = new Date().toISOString();
  }

  const { data, error } = await supabaseAdmin
    .from("cleaner_partners")
    .update(updatePayload)
    .eq("id", cleanerPartnerId)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message || "Could not update cleaner partner Stripe status.");
  }

  return data;
}

export async function POST(request) {
  try {
    if (!isAuthorised(request)) {
      return NextResponse.json(
        {
          error: "Not authorised"
        },
        { status: 401 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          error: "STRIPE_SECRET_KEY is missing in Vercel environment variables."
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const applicationId = cleanText(body.applicationId);
    const cleanerPartnerId = cleanText(body.cleanerPartnerId);

    if (!applicationId && !cleanerPartnerId) {
      return NextResponse.json(
        {
          error: "Application ID or cleaner partner ID is required."
        },
        { status: 400 }
      );
    }

    let cleanerPartner = null;
    let application = null;

    if (cleanerPartnerId) {
      const { data, error } = await supabaseAdmin
        .from("cleaner_partners")
        .select("*")
        .eq("id", cleanerPartnerId)
        .maybeSingle();

      if (error) {
        return NextResponse.json(
          {
            error: error.message || "Could not find cleaner partner."
          },
          { status: 500 }
        );
      }

      cleanerPartner = data;
    }

    if (!cleanerPartner && applicationId) {
      const { data, error } = await supabaseAdmin
        .from("cleaner_applications")
        .select("*")
        .eq("id", applicationId)
        .maybeSingle();

      if (error) {
        return NextResponse.json(
          {
            error: error.message || "Could not find cleaner application."
          },
          { status: 500 }
        );
      }

      application = data;
    }

    if (!cleanerPartner && application) {
      cleanerPartner = await findCleanerPartnerFromApplication(application);
    }

    if (!cleanerPartner) {
      return NextResponse.json(
        {
          error:
            "Approved cleaner partner was not found. Approve the cleaner application first, then try again."
        },
        { status: 404 }
      );
    }

    if (cleanerPartner.status !== "approved" && cleanerPartner.is_active !== true) {
      return NextResponse.json(
        {
          error: "Cleaner partner must be approved before Stripe onboarding can be started."
        },
        { status: 400 }
      );
    }

    let stripeAccountId = cleanerPartner.stripe_account_id;
    let stripeAccount = null;

    if (stripeAccountId) {
      stripeAccount = await stripe.accounts.retrieve(stripeAccountId);
    } else {
      stripeAccount = await createStripeExpressAccount(cleanerPartner);
      stripeAccountId = stripeAccount.id;
    }

    const updatedCleanerPartner = await updateCleanerPartnerStripeStatus(
      cleanerPartner.id,
      stripeAccount
    );

    const siteOrigin = getSiteOrigin(request);

    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${siteOrigin}/cleaner/onboarding-success?status=refresh`,
      return_url: `${siteOrigin}/cleaner/onboarding-success?status=return`,
      type: "account_onboarding"
    });

    const emailResult = await sendCleanerStripeOnboardingEmail({
      cleanerPartner: updatedCleanerPartner,
      onboardingUrl: accountLink.url
    });

    return NextResponse.json({
      success: true,
      onboardingUrl: accountLink.url,
      cleanerPartner: updatedCleanerPartner,
      stripeAccountId,
      email: emailResult,
      emailSent: Boolean(emailResult?.sent),
      emailError: emailResult?.error || null
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error?.message || "Could not create Stripe onboarding link."
      },
      { status: 500 }
    );
  }
}
