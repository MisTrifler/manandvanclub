import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

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
    ...job,
    postcode_area: safePostcodeArea(job.postcode),
    postcode: undefined,
    provider_preference: job.provider_preference || "no_preference",
    provider_preference_label: job.provider_preference_label || "No preference",
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
        { error: "Please enter your approved cleaner email and phone number." },
        { status: 400 }
      );
    }

    const { data: cleaners, error: cleanerError } = await supabaseAdmin
      .from("cleaner_partners")
      .select("*")
      .ilike("email", email)
      .eq("status", "approved")
      .limit(5);

    if (cleanerError) {
      return NextResponse.json(
        { error: `Cleaner lookup failed: ${cleanerError.message}` },
        { status: 500 }
      );
    }

    const cleaner = (cleaners || []).find((item) => normalisePhone(item.phone) === phone);

    if (!cleaner) {
      return NextResponse.json(
        {
          error:
            "Cleaner access denied. Only approved independent cleaner partners can view available booking opportunities."
        },
        { status: 401 }
      );
    }

    const { data: jobs, error: jobsError } = await supabaseAdmin
      .from("cleaning_jobs")
      .select(
        "id, created_at, quote_reference, service_type, frequency, property_type, bedrooms, bathrooms, postcode, area_town, condition_level, preferred_date, preferred_time, is_flexible, is_urgent, extras, customer_total_price, wmc_fee_percent, wmc_fee_amount, cleaner_payout, price_band, estimated_hours, job_status, payment_status, provider_preference, provider_preference_label"
      )
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
        .eq("cleaner_partner_id", cleaner.id)
        .in("job_id", jobIds);

      if (quotesError) {
        return NextResponse.json(
          { error: `Cleaner quote lookup failed: ${quotesError.message}` },
          { status: 500 }
        );
      }

      existingQuotes = quotes || [];
    }

    const quoteByJob = new Map(existingQuotes.map((quote) => [quote.job_id, quote]));

    return NextResponse.json({
      success: true,
      cleaner: {
        id: cleaner.id,
        full_name: cleaner.full_name,
        business_name: cleaner.business_name,
        email: cleaner.email,
        phone: cleaner.phone,
        status: cleaner.status
      },
      jobs: (jobs || []).map((job) => protectAvailableJob(job, quoteByJob.get(job.id)))
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to load cleaner jobs." },
      { status: 500 }
    );
  }
}
