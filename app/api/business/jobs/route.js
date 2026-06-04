import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

function normalisePhone(value) {
  const digits = String(value || "").replace(/\D/g, "");

  if (!digits) return "";
  if (digits.startsWith("0044")) return `0${digits.slice(4)}`;
  if (digits.startsWith("44")) return `0${digits.slice(2)}`;

  return digits;
}

function safePostcodeArea(postcode) {
  const clean = String(postcode || "").trim().toUpperCase();
  if (!clean) return "Postcode area not provided";
  return clean.split(" ")[0];
}

function protectAvailableJob(job, existingQuote) {
  return {
    id: job.id,
    created_at: job.created_at,
    quote_reference: job.quote_reference,
    service_type: job.service_type,
    frequency: job.frequency,
    property_type: job.property_type,
    bedrooms: job.bedrooms,
    bathrooms: job.bathrooms,
    postcode_area: safePostcodeArea(job.postcode),
    preferred_date: job.preferred_date,
    preferred_time: job.preferred_time,
    is_flexible: job.is_flexible,
    is_urgent: job.is_urgent,
    condition_level: job.condition_level,
    extras: job.extras,
    estimated_hours: job.estimated_hours,
    customer_total_price: job.customer_total_price,
    wmc_fee_percent: job.wmc_fee_percent || 15,
    wmc_fee_amount: job.wmc_fee_amount,
    business_payout: job.business_payout ?? job.cleaner_payout,
    provider_preference: job.provider_preference || "no_preference",
    provider_preference_label: job.provider_preference_label || "No preference",
    job_status: job.job_status,
    payment_status: job.payment_status,
    existing_quote: existingQuote || null
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = normalisePhone(body.phone);

    if (!email || !phone) {
      return NextResponse.json(
        { error: "Please enter your approved business email and phone number." },
        { status: 400 }
      );
    }

    const { data: businesses, error: businessError } = await supabaseAdmin
      .from("business_partners")
      .select("*")
      .ilike("email", email)
      .eq("status", "approved")
      .eq("is_active", true)
      .limit(5);

    if (businessError) {
      return NextResponse.json(
        { error: `Business lookup failed: ${businessError.message}` },
        { status: 500 }
      );
    }

    const business = (businesses || []).find((item) => normalisePhone(item.phone) === phone);

    if (!business) {
      return NextResponse.json(
        { error: "Business access denied. Only approved WMC business partners can view available booking opportunities." },
        { status: 401 }
      );
    }

    const { data: jobs, error: jobsError } = await supabaseAdmin
      .from("cleaning_jobs")
      .select("id, created_at, quote_reference, service_type, frequency, property_type, bedrooms, bathrooms, postcode, condition_level, preferred_date, preferred_time, is_flexible, is_urgent, extras, customer_total_price, wmc_fee_percent, wmc_fee_amount, cleaner_payout, business_payout, estimated_hours, job_status, payment_status, assigned_business_partner_id, provider_preference, provider_preference_label")
      .in("job_status", ["available_to_cleaners", "cleaner_interested", "submitted", "needs_review"])
      .neq("payment_status", "paid")
      .order("preferred_date", { ascending: true });

    if (jobsError) {
      return NextResponse.json(
        { error: `Available jobs lookup failed: ${jobsError.message}` },
        { status: 500 }
      );
    }

    const jobIds = (jobs || []).map((job) => job.id);

    let existingQuotes = [];

    if (jobIds.length > 0) {
      const { data: quotes, error: quotesError } = await supabaseAdmin
        .from("provider_quotes")
        .select("*")
        .eq("business_partner_id", business.id)
        .in("job_id", jobIds);

      if (quotesError) {
        return NextResponse.json(
          { error: `Business quote lookup failed: ${quotesError.message}` },
          { status: 500 }
        );
      }

      existingQuotes = quotes || [];
    }

    const quoteByJob = new Map(existingQuotes.map((quote) => [quote.job_id, quote]));

    return NextResponse.json({
      success: true,
      business: {
        id: business.id,
        business_name: business.business_name,
        trading_name: business.trading_name,
        contact_name: business.contact_name,
        email: business.email,
        phone: business.phone,
        status: business.status
      },
      jobs: (jobs || []).map((job) => protectAvailableJob(job, quoteByJob.get(job.id)))
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to load business jobs." },
      { status: 500 }
    );
  }
}
