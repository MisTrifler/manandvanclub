import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

function isAdmin(request) {
  const adminPassword = process.env.WMC_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || process.env.ADMIN_SECRET;
  const requestPassword =
    request.headers.get("x-wmc-admin-password") ||
    request.headers.get("x-admin-password") ||
    request.headers.get("x-admin-secret");

  return Boolean(adminPassword && requestPassword && requestPassword === adminPassword);
}

function displayName(providerType, provider) {
  if (providerType === "business") {
    return provider.trading_name || provider.business_name || provider.contact_name || "Business partner";
  }

  return provider.full_name || provider.business_name || "Cleaner partner";
}

function providerKey(type, id) {
  return `${type}:${id}`;
}

function round(value, decimals = 1) {
  const number = Number(value || 0);
  const power = 10 ** decimals;
  return Math.round(number * power) / power;
}

function buildProviderRows({ cleaners, businesses, quotes, reviews, issues }) {
  const providers = [];

  for (const business of businesses || []) {
    providers.push({
      id: business.id,
      provider_type: "business",
      provider_type_label: "Business partner",
      display_name: displayName("business", business),
      email: business.email || "",
      phone: business.phone || "",
      status: business.status || "unknown",
      active: business.is_active === true,
      insurance_checked: business.insurance_status === "verified" ||
        business.insurance_status === "approved" ||
        Boolean(business.insurance_provider || business.insurance_policy_number),
      services: business.services_offered || null,
      areas: business.areas_covered || null,
      created_at: business.created_at
    });
  }

  for (const cleaner of cleaners || []) {
    providers.push({
      id: cleaner.id,
      provider_type: "cleaner",
      provider_type_label: "Self-employed cleaner partner",
      display_name: displayName("cleaner", cleaner),
      email: cleaner.email || "",
      phone: cleaner.phone || "",
      status: cleaner.status || "unknown",
      active: cleaner.status === "approved",
      insurance_checked: cleaner.has_public_liability_insurance === true ||
        Boolean(cleaner.insurance_provider || cleaner.insurance_policy_number),
      services: cleaner.services_offered || null,
      areas: cleaner.areas_covered || cleaner.base_area || null,
      created_at: cleaner.created_at
    });
  }

  return providers.map((provider) => {
    const key = providerKey(provider.provider_type, provider.id);

    const providerQuotes = (quotes || []).filter((quote) => {
      if (provider.provider_type === "business") return quote.business_partner_id === provider.id;
      return quote.cleaner_partner_id === provider.id;
    });

    const providerReviews = (reviews || []).filter((review) => {
      if (provider.provider_type === "business") return review.business_partner_id === provider.id;
      return review.cleaner_partner_id === provider.id;
    });

    const providerIssues = (issues || []).filter((issue) => {
      if (issue.provider_key) return issue.provider_key === key;
      return String(issue.provider_display_name || "").toLowerCase() === String(provider.display_name || "").toLowerCase();
    });

    const approvedReviews = providerReviews.filter((review) => review.status === "approved");
    const allRatings = approvedReviews.map((review) => Number(review.rating || 0)).filter((rating) => rating > 0);
    const averageRating = allRatings.length
      ? round(allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length, 1)
      : null;

    const submittedQuotes = providerQuotes.length;
    const selectedQuotes = providerQuotes.filter((quote) => quote.quote_status === "customer_selected").length;
    const openIssues = providerIssues.filter((issue) => issue.issue_status === "open").length;
    const resolvedIssues = providerIssues.filter((issue) => issue.issue_status === "resolved").length;
    const hiddenReviews = providerReviews.filter((review) => review.status === "hidden").length;
    const lowReviews = approvedReviews.filter((review) => Number(review.rating || 0) <= 3).length;

    const conversionRate = submittedQuotes ? round((selectedQuotes / submittedQuotes) * 100, 1) : 0;

    let qualityStatus = "New / building history";
    if (openIssues > 0) qualityStatus = "Needs attention";
    else if (averageRating && averageRating >= 4.5 && approvedReviews.length >= 3) qualityStatus = "Strong performer";
    else if (averageRating && averageRating >= 4) qualityStatus = "Good";
    else if (averageRating && averageRating < 4) qualityStatus = "Monitor";

    return {
      ...provider,
      submitted_quotes: submittedQuotes,
      selected_quotes: selectedQuotes,
      quote_conversion_rate: conversionRate,
      approved_review_count: approvedReviews.length,
      hidden_review_count: hiddenReviews,
      low_review_count: lowReviews,
      average_rating: averageRating,
      open_issue_count: openIssues,
      resolved_issue_count: resolvedIssues,
      quality_status: qualityStatus,
      provider_profile_url: `/providers/${provider.provider_type}/${provider.id}`
    };
  }).sort((a, b) => {
    if (b.open_issue_count !== a.open_issue_count) return b.open_issue_count - a.open_issue_count;
    if ((b.average_rating || 0) !== (a.average_rating || 0)) return (b.average_rating || 0) - (a.average_rating || 0);
    return b.selected_quotes - a.selected_quotes;
  });
}

export async function GET(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  try {
    const [
      cleanerResult,
      businessResult,
      quoteResult,
      reviewResult,
      issueResult
    ] = await Promise.all([
      supabaseAdmin.from("cleaner_partners").select("*").limit(500),
      supabaseAdmin.from("business_partners").select("*").limit(500),
      supabaseAdmin.from("provider_quotes").select("*").limit(1000),
      supabaseAdmin.from("provider_reviews").select("*").limit(1000),
      supabaseAdmin.from("job_issues").select("*").limit(1000)
    ]);

    if (cleanerResult.error) throw new Error(`Cleaner partners: ${cleanerResult.error.message}`);
    if (businessResult.error) throw new Error(`Business partners: ${businessResult.error.message}`);
    if (quoteResult.error) throw new Error(`Provider quotes: ${quoteResult.error.message}`);
    if (reviewResult.error) throw new Error(`Provider reviews: ${reviewResult.error.message}`);

    const providers = buildProviderRows({
      cleaners: cleanerResult.data || [],
      businesses: businessResult.data || [],
      quotes: quoteResult.data || [],
      reviews: reviewResult.data || [],
      issues: issueResult.data || []
    });

    const summary = {
      total_providers: providers.length,
      approved_active_providers: providers.filter((provider) => provider.active && provider.status === "approved").length,
      providers_with_reviews: providers.filter((provider) => provider.approved_review_count > 0).length,
      providers_with_open_issues: providers.filter((provider) => provider.open_issue_count > 0).length,
      average_rating:
        providers.filter((provider) => provider.average_rating).length > 0
          ? round(
              providers
                .filter((provider) => provider.average_rating)
                .reduce((sum, provider) => sum + Number(provider.average_rating || 0), 0) /
                providers.filter((provider) => provider.average_rating).length,
              1
            )
          : null
    };

    return NextResponse.json({ success: true, summary, providers });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to load provider performance." },
      { status: 500 }
    );
  }
}
