import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

function clean(value) {
  return String(value || "").trim();
}

function normaliseUkPhone(value) {
  let phone = String(value || "").trim();
  phone = phone.replace(/\s+/g, "");
  phone = phone.replace(/-/g, "");
  phone = phone.replace(/\(/g, "");
  phone = phone.replace(/\)/g, "");

  if (phone.startsWith("+")) phone = phone.slice(1);
  if (phone.startsWith("0044")) phone = `0${phone.slice(4)}`;
  if (phone.startsWith("44")) phone = `0${phone.slice(2)}`;

  return phone.replace(/\D/g, "");
}

function phoneMatches(savedPhoneValue, enteredPhoneValue) {
  const savedPhone = normaliseUkPhone(savedPhoneValue);
  const enteredPhone = normaliseUkPhone(enteredPhoneValue);

  if (!savedPhone || !enteredPhone) return false;
  if (savedPhone === enteredPhone) return true;

  return savedPhone.slice(-10) === enteredPhone.slice(-10);
}

function safePostcodeArea(postcode) {
  const cleanPostcode = String(postcode || "").trim().toUpperCase();
  if (!cleanPostcode) return "Postcode area not provided";
  return cleanPostcode.split(" ")[0];
}

function publicProviderType(value) {
  if (value === "business") return "Cleaning business partner";
  return "Independent self-employed cleaner partner";
}

function asArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return String(value)
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}


function looksLikePostcode(value) {
  const text = String(value || "").trim().toUpperCase();
  if (!text) return false;
  return /^([A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}|[A-Z]{1,2}\d[A-Z\d]?)$/.test(text);
}

function stripPostcodes(value) {
  return String(value || "")
    .replace(/\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b/gi, "")
    .replace(/\b[A-Z]{1,2}\d[A-Z\d]?\b/gi, "")
    .replace(/[,;]+/g, ",")
    .replace(/\s{2,}/g, " ")
    .trim()
    .replace(/^,|,$/g, "")
    .trim();
}

function looksLikeTestText(value) {
  const text = String(value || "").trim().toLowerCase();
  if (!text) return true;
  if (["test", "testing", "asdf", "asd", "adasd", "n/a", "na", "none", "null", "undefined"].includes(text)) return true;
  if (/^(a+d+s+d*|a+s+d+|x+)$/.test(text)) return true;
  return false;
}

function publicAreaValues(values) {
  return unique((values || [])
    .flatMap((value) => asArray(value))
    .map(stripPostcodes)
    .map((value) => value.replace(/^[,\s]+|[,\s]+$/g, "").trim())
    .filter((value) => value && !looksLikePostcode(value) && !looksLikeTestText(value))
  ).slice(0, 6);
}

function unique(values) {
  return Array.from(new Set((values || []).filter(Boolean)));
}

function round(value, decimals = 1) {
  const number = Number(value || 0);
  const power = 10 ** decimals;
  return Math.round(number * power) / power;
}

function displayDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

function providerKey(quote) {
  return quote.provider_type === "business"
    ? `business:${quote.business_partner_id || ""}`
    : `cleaner:${quote.cleaner_partner_id || ""}`;
}

function buildReviewSummary(quote, approvedReviews) {
  const matchingReviews = (approvedReviews || []).filter((review) => {
    if (quote.provider_type === "business") {
      return review.business_partner_id && review.business_partner_id === quote.business_partner_id;
    }

    return review.cleaner_partner_id && review.cleaner_partner_id === quote.cleaner_partner_id;
  });

  const reviewCount = matchingReviews.length;
  const averageRating = reviewCount
    ? round(matchingReviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviewCount, 1)
    : null;

  const latestReview = matchingReviews
    .slice()
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))[0];

  return {
    averageRating,
    reviewCount,
    latestReviewText: latestReview?.review_text || null,
    latestReviewService: latestReview?.service_type || null,
    latestReviewArea: latestReview?.area_town || null
  };
}

function buildPartnerProfile({ quote, cleaner, business, override, reviewSummary, completedJobs, selectedJobs }) {
  const isBusiness = quote.provider_type === "business";
  const partner = isBusiness ? business : cleaner;

  const displayName =
    override?.display_name ||
    quote.provider_display_name ||
    (isBusiness
      ? partner?.trading_name || partner?.business_name || partner?.contact_name
      : partner?.full_name || partner?.business_name) ||
    "Approved provider";

  const services = unique([
    ...asArray(partner?.services_offered),
    ...asArray(override?.services_highlight)
  ]).slice(0, 6);

  const areas = publicAreaValues([
    partner?.areas_covered,
    partner?.base_area,
    override?.areas_highlight
  ]);

  const productsEquipment = isBusiness
    ? partner?.products_equipment
    : partner?.has_own_products_equipment === true
      ? "Can bring own products/equipment where agreed"
      : partner?.has_own_products_equipment === false
        ? "Products/equipment to be agreed"
        : null;

  const insuranceChecked =
    override?.insurance_checked === true ||
    partner?.insurance_status === "verified" ||
    partner?.insurance_status === "approved" ||
    partner?.has_public_liability_insurance === true ||
    Boolean(partner?.insurance_provider || partner?.insurance_policy_number);

  const approvedBadge = isBusiness
    ? partner?.status === "approved" && partner?.is_active === true
    : partner?.status === "approved";

  const headline =
    override?.profile_headline ||
    (isBusiness
      ? partner?.message || `${displayName} is an approved WMC cleaning business partner.`
      : partner?.experience || `${displayName} is an approved independent self-employed cleaner partner.`);

  const reviewCount = Number(reviewSummary.reviewCount || 0);
  const averageRating = reviewSummary.averageRating;
  const completedCount = Math.max(Number(completedJobs || 0), reviewCount);
  const selectedCount = Number(selectedJobs || 0);

  let trustLabel = "New WMC provider";
  if (averageRating && reviewCount > 0) {
    trustLabel = `${averageRating}/5 from ${reviewCount} verified WMC review${reviewCount === 1 ? "" : "s"}`;
  } else if (completedCount > 0) {
    trustLabel = `${completedCount} WMC booking${completedCount === 1 ? "" : "s"} completed`;
  }

  const badges = [
    approvedBadge ? "Approved WMC provider" : null,
    insuranceChecked ? "Insurance details checked" : null,
    reviewCount > 0 ? "WMC reviewed" : "New to WMC reviews",
    completedCount > 0 ? `${completedCount} completed WMC booking${completedCount === 1 ? "" : "s"}` : null
  ].filter(Boolean);

  return {
    display_name: displayName,
    type_label: publicProviderType(quote.provider_type),
    headline,
    services,
    areas,
    products_equipment: productsEquipment,
    team_size: isBusiness ? partner?.team_size || null : null,
    insurance_checked: insuranceChecked,
    insurance_status: partner?.insurance_status || (insuranceChecked ? "checked" : null),
    insurance_expiry_date: partner?.insurance_expiry_date ? displayDate(partner.insurance_expiry_date) : null,
    approved_badge: approvedBadge,
    trust_label: trustLabel,
    average_rating: averageRating,
    review_count: reviewCount,
    completed_count: completedCount,
    selected_count: selectedCount,
    latest_review_text: reviewSummary.latestReviewText,
    latest_review_service: reviewSummary.latestReviewService,
    latest_review_area: reviewSummary.latestReviewArea,
    badges
  };
}

function providerPreferenceMatches(job, quote) {
  const preference = String(job?.provider_preference || "no_preference");
  if (preference === "business") return quote.provider_type === "business";
  if (preference === "self_employed_cleaner" || preference === "cleaner") return quote.provider_type === "cleaner";
  return true;
}

function calculateRecommendation({ job, quote, profile, cheapestAmount }) {
  const price = Number(quote.customer_quote_amount || 0);
  const rating = Number(profile.average_rating || 0);
  const reviews = Number(profile.review_count || 0);
  const completed = Number(profile.completed_count || 0);

  let score = 0;
  const reasons = [];

  if (providerPreferenceMatches(job, quote)) {
    score += 30;
    if (job?.provider_preference && job.provider_preference !== "no_preference") {
      reasons.push("Matches your provider preference");
    }
  }

  if (rating > 0) {
    score += rating * 8;
    reasons.push(`${rating}/5 WMC verified rating`);
  }

  if (reviews > 0) {
    score += Math.min(reviews, 20) * 2;
    reasons.push(`${reviews} verified WMC review${reviews === 1 ? "" : "s"}`);
  }

  if (completed > 0) {
    score += Math.min(completed, 50);
    reasons.push(`${completed} completed WMC booking${completed === 1 ? "" : "s"}`);
  }

  if (profile.insurance_checked) {
    score += 10;
    reasons.push("Insurance details checked");
  }

  if (cheapestAmount && price === cheapestAmount) {
    score += 12;
    reasons.push("Lowest current quote");
  } else if (cheapestAmount && price <= cheapestAmount * 1.1) {
    score += 6;
    reasons.push("Competitively priced");
  }

  if (quote.available_date) {
    score += 3;
  }

  const fallback = reasons.length
    ? reasons.slice(0, 3).join(" • ")
    : "Approved WMC provider with quote details available";

  return {
    score: Math.round(score * 10) / 10,
    reason: fallback
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const reference = clean(body.reference || body.quoteReference || body.quote_reference).toUpperCase();
    const phone = clean(body.phone);

    if (!reference || !phone) {
      return NextResponse.json(
        { error: "Please enter your booking reference and phone number." },
        { status: 400 }
      );
    }

    const { data: job, error: jobError } = await supabaseAdmin
      .from("cleaning_jobs")
      .select("*")
      .eq("quote_reference", reference)
      .maybeSingle();

    if (jobError || !job) {
      return NextResponse.json({ error: "No booking request was found for that reference." }, { status: 404 });
    }

    if (!phoneMatches(job.customer_phone, phone)) {
      return NextResponse.json(
        { error: "The phone number does not match this booking reference." },
        { status: 401 }
      );
    }

    const { data: quotes, error: quotesError } = await supabaseAdmin
      .from("provider_quotes")
      .select("*")
      .eq("job_id", job.id)
      .in("quote_status", ["submitted", "customer_selected"])
      .order("customer_quote_amount", { ascending: true });

    if (quotesError) {
      return NextResponse.json({ error: `Could not load provider quotes: ${quotesError.message}` }, { status: 500 });
    }

    const quoteList = quotes || [];

    const cleanerIds = unique(
      quoteList
        .filter((quote) => quote.provider_type === "cleaner" && quote.cleaner_partner_id)
        .map((quote) => quote.cleaner_partner_id)
    );

    const businessIds = unique(
      quoteList
        .filter((quote) => quote.provider_type === "business" && quote.business_partner_id)
        .map((quote) => quote.business_partner_id)
    );

    let approvedReviews = [];
    let cleaners = [];
    let businesses = [];
    let allProviderQuotes = [];
    let selectedJobRows = [];
    let profileOverrides = [];

    if (cleanerIds.length || businessIds.length) {
      const reviewFilters = [];

      if (cleanerIds.length) {
        reviewFilters.push(`cleaner_partner_id.in.(${cleanerIds.join(",")})`);
      }

      if (businessIds.length) {
        reviewFilters.push(`business_partner_id.in.(${businessIds.join(",")})`);
      }

      const { data: reviews } = await supabaseAdmin
        .from("provider_reviews")
        .select("provider_type, cleaner_partner_id, business_partner_id, rating, review_text, service_type, area_town, created_at")
        .eq("status", "approved")
        .or(reviewFilters.join(","));

      approvedReviews = reviews || [];
    }

    if (cleanerIds.length) {
      const { data } = await supabaseAdmin
        .from("cleaner_partners")
        .select("*")
        .in("id", cleanerIds);
      cleaners = data || [];
    }

    if (businessIds.length) {
      const { data } = await supabaseAdmin
        .from("business_partners")
        .select("*")
        .in("id", businessIds);
      businesses = data || [];
    }

    if (cleanerIds.length || businessIds.length) {
      const providerQuoteFilters = [];

      if (cleanerIds.length) {
        providerQuoteFilters.push(`cleaner_partner_id.in.(${cleanerIds.join(",")})`);
      }

      if (businessIds.length) {
        providerQuoteFilters.push(`business_partner_id.in.(${businessIds.join(",")})`);
      }

      const { data } = await supabaseAdmin
        .from("provider_quotes")
        .select("id, provider_type, cleaner_partner_id, business_partner_id, quote_status")
        .or(providerQuoteFilters.join(","));

      allProviderQuotes = data || [];
    }

    const providerQuoteIds = (allProviderQuotes || []).map((quote) => quote.id);

    if (providerQuoteIds.length) {
      const { data } = await supabaseAdmin
        .from("cleaning_jobs")
        .select("id, selected_provider_quote_id, payment_status, job_status, completed_at, customer_confirmed_completed_at")
        .in("selected_provider_quote_id", providerQuoteIds);

      selectedJobRows = data || [];
    }

    if (cleanerIds.length || businessIds.length) {
      const overrideFilters = [];

      if (cleanerIds.length) {
        overrideFilters.push(`cleaner_partner_id.in.(${cleanerIds.join(",")})`);
      }

      if (businessIds.length) {
        overrideFilters.push(`business_partner_id.in.(${businessIds.join(",")})`);
      }

      try {
        const { data } = await supabaseAdmin
          .from("provider_profile_overrides")
          .select("*")
          .eq("show_on_quotes", true)
          .or(overrideFilters.join(","));

        profileOverrides = data || [];
      } catch {
        profileOverrides = [];
      }
    }

    function findCleaner(id) {
      return cleaners.find((cleaner) => cleaner.id === id) || null;
    }

    function findBusiness(id) {
      return businesses.find((business) => business.id === id) || null;
    }

    function findOverride(quote) {
      return (
        profileOverrides.find((override) => {
          if (quote.provider_type === "business") {
            return override.provider_type === "business" && override.business_partner_id === quote.business_partner_id;
          }

          return override.provider_type === "cleaner" && override.cleaner_partner_id === quote.cleaner_partner_id;
        }) || null
      );
    }

    function providerQuoteHistory(quote) {
      return allProviderQuotes.filter((historyQuote) => providerKey(historyQuote) === providerKey(quote));
    }

    function providerSelectedJobs(quote) {
      const quoteIds = providerQuoteHistory(quote).map((historyQuote) => historyQuote.id);
      return selectedJobRows.filter((row) => quoteIds.includes(row.selected_provider_quote_id));
    }

    function selectedCountForQuote(quote) {
      return providerSelectedJobs(quote).length;
    }

    function completedCountForQuote(quote) {
      return providerSelectedJobs(quote).filter((row) => {
        const status = String(row.job_status || "").toLowerCase();
        return Boolean(row.completed_at || row.customer_confirmed_completed_at) ||
          ["completed", "payout_ready", "cleaner_paid", "business_paid", "provider_paid"].includes(status);
      }).length;
    }

    const cheapestAmount = quoteList.length
      ? Math.min(...quoteList.map((quote) => Number(quote.customer_quote_amount || 0)).filter((amount) => amount > 0))
      : null;

    const decoratedQuotes = quoteList.map((quote) => {
      const reviewSummary = buildReviewSummary(quote, approvedReviews);
      const profile = buildPartnerProfile({
        quote,
        cleaner: findCleaner(quote.cleaner_partner_id),
        business: findBusiness(quote.business_partner_id),
        override: findOverride(quote),
        reviewSummary,
        completedJobs: completedCountForQuote(quote),
        selectedJobs: selectedCountForQuote(quote)
      });
      const recommendation = calculateRecommendation({ job, quote, profile, cheapestAmount });

      return {
        id: quote.id,
provider_type: quote.provider_type,
        provider_type_label: publicProviderType(quote.provider_type),
        provider_display_name: profile.display_name || quote.provider_display_name,
        cleaner_partner_id: quote.provider_type === "cleaner" ? quote.cleaner_partner_id : null,
        business_partner_id: quote.provider_type === "business" ? quote.business_partner_id : null,
        provider_profile_url:
          quote.provider_type === "business" && quote.business_partner_id
            ? `/providers/business/${quote.business_partner_id}`
            : quote.provider_type === "cleaner" && quote.cleaner_partner_id
              ? `/providers/cleaner/${quote.cleaner_partner_id}`
              : null,
        customer_quote_amount: quote.customer_quote_amount,
        wmc_fee_percent: quote.wmc_fee_percent,
        wmc_fee_amount: quote.wmc_fee_amount,
        provider_payout_amount: quote.provider_payout_amount,
        available_date: quote.available_date,
        available_time: quote.available_time,
        estimated_hours: quote.estimated_hours,
        products_included: quote.products_included,
        provider_message: quote.provider_message,
        provider_email:
          job.payment_status === "paid" && job.selected_provider_quote_id === quote.id
            ? quote.provider_email
            : null,
        provider_phone:
          job.payment_status === "paid" && job.selected_provider_quote_id === quote.id
            ? quote.provider_phone
            : null,
        wmc_review_average: profile.average_rating,
        wmc_review_count: profile.review_count,
        completed_wmc_jobs: profile.completed_count,
        selected_wmc_jobs: profile.selected_count,
        provider_profile: profile,
        recommendation_score: recommendation.score,
        recommendation_reason: recommendation.reason,
        quote_status: quote.quote_status,
        created_at: quote.created_at
      };
    });

    decoratedQuotes.sort((a, b) => {
      const aSelected = a.quote_status === "customer_selected" || job.selected_provider_quote_id === a.id;
      const bSelected = b.quote_status === "customer_selected" || job.selected_provider_quote_id === b.id;
      if (aSelected !== bSelected) return aSelected ? -1 : 1;

      if (b.recommendation_score !== a.recommendation_score) {
        return b.recommendation_score - a.recommendation_score;
      }

      return Number(a.customer_quote_amount || 0) - Number(b.customer_quote_amount || 0);
    });

    return NextResponse.json({
      success: true,
      job: {
        id: job.id,
        quote_reference: job.quote_reference,
        service_type: job.service_type,
        property_type: job.property_type,
        bedrooms: job.bedrooms,
        bathrooms: job.bathrooms,
        postcode_area: safePostcodeArea(job.postcode),
        area_town: job.area_town,
        preferred_date: job.preferred_date,
        preferred_time: job.preferred_time,
        provider_preference: job.provider_preference || "no_preference",
        provider_preference_label: job.provider_preference_label || "No preference",
        customer_guide_price: job.customer_total_price,
        payment_status: job.payment_status,
        job_status: job.job_status,
        selected_provider_quote_id: job.selected_provider_quote_id
      },
      quotes: decoratedQuotes
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to load provider quotes." },
      { status: 500 }
    );
  }
}
