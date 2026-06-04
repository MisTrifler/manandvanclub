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
  return Boolean(realPassword && submittedPassword && submittedPassword === realPassword);
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

    if (!businessPartner.stripe_account_id) {
      return NextResponse.json(
        { error: "This business partner does not have a Stripe account yet. Create a Stripe onboarding link first." },
        { status: 400 }
      );
    }

    const stripeAccount = await stripe.accounts.retrieve(businessPartner.stripe_account_id);
    const updatedBusinessPartner = await updateBusinessStripeStatus(
      businessPartner.id,
      stripeAccount
    );

    return NextResponse.json({
      success: true,
      businessPartner: updatedBusinessPartner,
      stripeStatus: {
        accountId: stripeAccount.id,
        onboardingStatus: updatedBusinessPartner.stripe_onboarding_status,
        chargesEnabled: Boolean(stripeAccount.charges_enabled),
        payoutsEnabled: Boolean(stripeAccount.payouts_enabled),
        detailsSubmitted: Boolean(stripeAccount.details_submitted),
        currentlyDue: stripeAccount.requirements?.currently_due || [],
        eventuallyDue: stripeAccount.requirements?.eventually_due || [],
        disabledReason: stripeAccount.requirements?.disabled_reason || null
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Could not refresh business Stripe status." },
      { status: 500 }
    );
  }
}
