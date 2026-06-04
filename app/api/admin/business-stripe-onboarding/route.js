import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { sendWmcEmail } from "../../../../lib/wmcEmails";

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
  return Boolean(realPassword && submittedPassword && submittedPassword === realPassword);
}

function getSiteOrigin(request) {
  const origin = request.headers.get("origin");
  if (origin) return origin;

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.WMC_SITE_URL ||
    "https://www.westmidlandscleaner.co.uk";

  return String(siteUrl).replace(/\/$/, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getStripeOnboardingStatus(account) {
  if (!account) return "not_started";
  if (account.payouts_enabled && account.details_submitted) return "complete";
  if (account.details_submitted) return "submitted";
  if (account.requirements?.currently_due?.length > 0) return "requirements_due";
  if (account.requirements?.eventually_due?.length > 0) return "pending";
  return "pending";
}

async function updateBusinessStripeStatus(businessPartnerId, stripeAccount) {
  const updatePayload = {
    stripe_account_id: stripeAccount.id,
    stripe_charges_enabled: Boolean(stripeAccount.charges_enabled),
    stripe_payouts_enabled: Boolean(stripeAccount.payouts_enabled),
    stripe_details_submitted: Boolean(stripeAccount.details_submitted),
    stripe_onboarding_status: getStripeOnboardingStatus(stripeAccount)
  };

  if (stripeAccount.details_submitted && stripeAccount.payouts_enabled) {
    updatePayload.stripe_onboarded_at = new Date().toISOString();
  }

  const { data, error } = await supabaseAdmin
    .from("business_partners")
    .update(updatePayload)
    .eq("id", businessPartnerId)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message || "Could not update business partner Stripe status.");
  }

  return data;
}

function createStripeExpressAccount(stripe, businessPartner) {
  return stripe.accounts.create({
    type: "express",
    country: "GB",
    email: businessPartner.email || undefined,
    business_type: "company",
    capabilities: {
      transfers: {
        requested: true
      }
    },
    business_profile: {
      name:
        businessPartner.trading_name ||
        businessPartner.business_name ||
        "WMC business partner",
      product_description:
        "Approved cleaning business partner receiving cleaning booking payouts from West Midlands Cleaner."
    },
    metadata: {
      business_partner_id: businessPartner.id,
      business_name: businessPartner.business_name || "",
      platform: "West Midlands Cleaner"
    }
  });
}

function buildBusinessStripeOnboardingEmail({ businessPartner, onboardingUrl }) {
  const businessName =
    businessPartner?.trading_name ||
    businessPartner?.business_name ||
    "your business";

  return `
    <div style="margin:0;padding:0;background:#f4f8fa;font-family:Arial,sans-serif;color:#071733;">
      <div style="max-width:760px;margin:0 auto;padding:28px 16px;">
        <div style="background:#ffffff;border:1px solid #dbe7ef;border-radius:24px;padding:28px;box-shadow:0 18px 45px rgba(7,23,51,0.08);">
          <p style="margin:0 0 12px;color:#0f8276;font-size:12px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;">West Midlands Cleaner</p>
          <h1 style="margin:0 0 16px;color:#071733;font-size:28px;line-height:1.05;">Complete your business payout setup</h1>

          <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
            Hi ${escapeHtml(businessName)}, WMC has created a secure Stripe Express onboarding link for your business payout setup.
          </p>

          <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
            <strong>Important:</strong> Completing Stripe onboarding does not guarantee paid work. WMC only releases business payouts manually after the customer has paid, the job has been completed, and WMC has checked the booking.
          </div>

          <p style="margin:22px 0;">
            <a href="${onboardingUrl}" style="display:inline-block;background:#071733;color:#ffffff;text-decoration:none;padding:14px 20px;border-radius:14px;font-weight:800;">
              Complete Stripe payout setup
            </a>
          </p>

          <p style="margin:18px 0;color:#33445f;font-size:14px;line-height:1.65;">
            If the button does not work, copy and paste this secure link into your browser:<br>
            <a href="${onboardingUrl}" style="color:#0f8276;">${onboardingUrl}</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

async function sendBusinessStripeOnboardingEmail({ businessPartner, onboardingUrl }) {
  const businessEmail = cleanEmail(businessPartner?.email);

  if (!businessEmail) {
    return {
      sent: false,
      skipped: true,
      error: "Business email not provided."
    };
  }

  return sendWmcEmail({
    to: [businessEmail],
    subject: "Complete your West Midlands Cleaner business payout setup",
    html: buildBusinessStripeOnboardingEmail({ businessPartner, onboardingUrl }),
    replyTo: process.env.WMC_REPLY_TO_EMAIL || "info@westmidlandscleaner.co.uk"
  });
}

export async function POST(request) {
  try {
    if (!isAuthorised(request)) {
      return NextResponse.json({ error: "Not authorised" }, { status: 401 });
    }

    const stripe = getStripe();
    const body = await request.json();
    const businessPartnerId = cleanText(body.businessPartnerId);

    if (!businessPartnerId) {
      return NextResponse.json({ error: "Business partner ID is required." }, { status: 400 });
    }

    const { data: businessPartner, error } = await supabaseAdmin
      .from("business_partners")
      .select("*")
      .eq("id", businessPartnerId)
      .maybeSingle();

    if (error || !businessPartner) {
      return NextResponse.json(
        { error: error?.message || "Business partner was not found." },
        { status: 404 }
      );
    }

    if (businessPartner.status !== "approved" || businessPartner.is_active !== true) {
      return NextResponse.json(
        { error: "Business partner must be approved and active before Stripe onboarding can be started." },
        { status: 400 }
      );
    }

    let stripeAccountId = businessPartner.stripe_account_id;
    let stripeAccount = null;

    if (stripeAccountId) {
      stripeAccount = await stripe.accounts.retrieve(stripeAccountId);
    } else {
      stripeAccount = await createStripeExpressAccount(stripe, businessPartner);
      stripeAccountId = stripeAccount.id;
    }

    const updatedBusinessPartner = await updateBusinessStripeStatus(
      businessPartner.id,
      stripeAccount
    );

    const siteOrigin = getSiteOrigin(request);

    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${siteOrigin}/business/onboarding-success?status=refresh`,
      return_url: `${siteOrigin}/business/onboarding-success?status=return`,
      type: "account_onboarding"
    });

    const emailResult = await sendBusinessStripeOnboardingEmail({
      businessPartner: updatedBusinessPartner,
      onboardingUrl: accountLink.url
    });

    return NextResponse.json({
      success: true,
      onboardingUrl: accountLink.url,
      businessPartner: updatedBusinessPartner,
      stripeAccountId,
      email: emailResult,
      emailSent: Boolean(emailResult?.sent),
      emailError: emailResult?.error || null
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Could not create business Stripe onboarding link." },
      { status: 500 }
    );
  }
}
