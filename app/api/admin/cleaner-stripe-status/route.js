import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

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

function getStripeOnboardingStatus(account) {
  if (!account) {
    return "not_started";
  }

  if (account.payouts_enabled && account.details_submitted) {
    return "complete";
  }

  if (account.details_submitted) {
    return "submitted";
  }

  if (account.requirements?.currently_due?.length > 0) {
    return "requirements_due";
  }

  if (account.requirements?.eventually_due?.length > 0) {
    return "pending";
  }

  return "pending";
}

async function updateCleanerPartnerStripeStatus(cleanerPartnerId, stripeAccount) {
  const onboardingStatus = getStripeOnboardingStatus(stripeAccount);

  const updatePayload = {
    stripe_account_id: stripeAccount.id,
    stripe_charges_enabled: Boolean(stripeAccount.charges_enabled),
    stripe_payouts_enabled: Boolean(stripeAccount.payouts_enabled),
    stripe_details_submitted: Boolean(stripeAccount.details_submitted),
    stripe_onboarding_status: onboardingStatus
  };

  if (onboardingStatus === "complete") {
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
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 503 });
  }

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
            "Cleaner partner was not found. Approve the cleaner application first, then try again."
        },
        { status: 404 }
      );
    }

    if (!cleanerPartner.stripe_account_id) {
      return NextResponse.json(
        {
          error:
            "This cleaner partner does not have a Stripe account yet. Create a Stripe onboarding link first."
        },
        { status: 400 }
      );
    }

    const stripeAccount = await stripe.accounts.retrieve(cleanerPartner.stripe_account_id);
    const updatedCleanerPartner = await updateCleanerPartnerStripeStatus(
      cleanerPartner.id,
      stripeAccount
    );

    return NextResponse.json({
      success: true,
      cleanerPartner: updatedCleanerPartner,
      stripeStatus: {
        accountId: stripeAccount.id,
        onboardingStatus: updatedCleanerPartner.stripe_onboarding_status,
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
      {
        error: error?.message || "Could not refresh Stripe status."
      },
      { status: 500 }
    );
  }
}
