import { notFound } from "next/navigation";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const dynamic = "force-dynamic";

function clean(value) {
  return String(value || "").trim();
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
  ).slice(0, 10);
}

function unique(values) {
  return Array.from(new Set((values || []).map((value) => clean(value)).filter(Boolean)));
}

function round(value, decimals = 1) {
  const number = Number(value || 0);
  const power = 10 ** decimals;
  return Math.round(number * power) / power;
}

function safeCleanerDisplayName(provider) {
  const fullName = clean(provider?.full_name || provider?.name || provider?.business_name || "Independent cleaner partner");
  const parts = fullName.split(/\s+/).filter(Boolean);

  if (parts.length <= 1) return parts[0] || "Independent cleaner partner";

  return `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`;
}

function providerDisplayName(providerType, provider, override) {
  if (clean(override?.display_name)) return clean(override.display_name);

  if (providerType === "business") {
    return (
      clean(provider?.trading_name) ||
      clean(provider?.business_name) ||
      clean(provider?.company_name) ||
      "Cleaning business partner"
    );
  }

  return safeCleanerDisplayName(provider);
}

function providerTypeLabel(providerType) {
  return providerType === "business"
    ? "Approved cleaning business partner"
    : "Approved independent self-employed cleaner partner";
}

function servicesForProvider(providerType, provider, override) {
  const overrideServices = asArray(override?.services_highlight);

  if (overrideServices.length) return unique(overrideServices).slice(0, 8);

  return unique([
    ...asArray(provider?.services_offered),
    ...asArray(provider?.services),
    ...asArray(provider?.service_types)
  ]).slice(0, 8);
}

function areasForProvider(provider, override) {
  const overrideAreas = publicAreaValues([override?.areas_highlight]);

  if (overrideAreas.length) return overrideAreas;

  return publicAreaValues([
    provider?.areas_covered,
    provider?.coverage_areas,
    provider?.base_area,
    provider?.area_town
  ]);
}

function productsText(providerType, provider) {
  if (providerType === "business") {
    return clean(provider?.products_equipment) || clean(provider?.products_and_equipment) || "Products/equipment are confirmed in each quote.";
  }

  if (provider?.has_own_products_equipment === true) {
    return "Can bring suitable products/equipment where agreed in the quote.";
  }

  if (provider?.has_own_products_equipment === false) {
    return "Products/equipment are confirmed in each quote.";
  }

  return "Products/equipment are confirmed in each quote.";
}

function insuranceChecked(providerType, provider, override) {
  return (
    override?.insurance_checked === true ||
    provider?.insurance_status === "verified" ||
    provider?.insurance_status === "approved" ||
    provider?.has_public_liability_insurance === true ||
    Boolean(clean(provider?.insurance_provider) || clean(provider?.insurance_policy_number))
  );
}

function latestApprovedReview(reviews) {
  return (reviews || [])
    .slice()
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))[0] || null;
}

async function maybeLoadOverride(providerType, id) {
  try {
    const column = providerType === "business" ? "business_partner_id" : "cleaner_partner_id";
    const { data } = await supabaseAdmin
      .from("provider_profile_overrides")
      .select("*")
      .eq("provider_type", providerType)
      .eq(column, id)
      .eq("show_on_quotes", true)
      .maybeSingle();

    return data || null;
  } catch {
    return null;
  }
}

async function loadProvider(providerType, id) {
  if (providerType === "business") {
    const { data, error } = await supabaseAdmin
      .from("business_partners")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    return data || null;
  }

  const { data, error } = await supabaseAdmin
    .from("cleaner_partners")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data || null;
}

async function loadApprovedReviews(providerType, id) {
  const column = providerType === "business" ? "business_partner_id" : "cleaner_partner_id";

  const { data, error } = await supabaseAdmin
    .from("provider_reviews")
    .select("rating, review_text, service_type, area_town, created_at, would_recommend")
    .eq(column, id)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) return [];
  return data || [];
}

async function loadProviderQuoteHistory(providerType, id) {
  const column = providerType === "business" ? "business_partner_id" : "cleaner_partner_id";

  const { data, error } = await supabaseAdmin
    .from("provider_quotes")
    .select("id, quote_status, created_at")
    .eq(column, id);

  if (error) return [];
  return data || [];
}

async function countCompletedJobsForQuotes(quoteIds) {
  if (!quoteIds.length) return 0;

  const { data, error } = await supabaseAdmin
    .from("cleaning_jobs")
    .select("id, selected_provider_quote_id, job_status, status, completed_at, customer_confirmed_completed_at")
    .in("selected_provider_quote_id", quoteIds);

  if (error) return 0;

  return (data || []).filter((job) => {
    const status = String(job.status || "").toLowerCase();
    const jobStatus = String(job.job_status || "").toLowerCase();

    return Boolean(job.completed_at || job.customer_confirmed_completed_at) ||
      ["completed", "payout_ready", "cleaner_paid", "business_paid", "provider_paid"].includes(status) ||
      ["completed", "payout_ready", "cleaner_paid", "business_paid", "provider_paid"].includes(jobStatus);
  }).length;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const providerType = clean(resolvedParams?.providerType);
  const id = clean(resolvedParams?.id);

  if (!["business", "cleaner"].includes(providerType) || !id) {
    return {
      title: "Provider profile | West Midlands Cleaner"
    };
  }

  try {
    const provider = await loadProvider(providerType, id);
    const override = await maybeLoadOverride(providerType, id);
    const name = providerDisplayName(providerType, provider, override);

    return {
      title: `${name} | WMC provider profile`,
      description: `View WMC verified provider details, services, areas and reviews for ${name}.`
    };
  } catch {
    return {
      title: "Provider profile | West Midlands Cleaner"
    };
  }
}

export default async function ProviderProfilePage({ params }) {
  const resolvedParams = await params;
  const providerType = clean(resolvedParams?.providerType);
  const id = clean(resolvedParams?.id);

  if (!["business", "cleaner"].includes(providerType) || !id) {
    notFound();
  }

  const provider = await loadProvider(providerType, id);

  if (!provider) {
    notFound();
  }

  const [override, reviews, quotes] = await Promise.all([
    maybeLoadOverride(providerType, id),
    loadApprovedReviews(providerType, id),
    loadProviderQuoteHistory(providerType, id)
  ]);

  const displayName = providerDisplayName(providerType, provider, override);
  const services = servicesForProvider(providerType, provider, override);
  const areas = areasForProvider(provider, override);
  const reviewCount = reviews.length;
  const averageRating = reviewCount
    ? round(reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviewCount, 1)
    : null;
  const latestReview = latestApprovedReview(reviews);
  const completedCount = await countCompletedJobsForQuotes(quotes.map((quote) => quote.id));
  const checkedInsurance = insuranceChecked(providerType, provider, override);
  const approved =
    providerType === "business"
      ? provider.status === "approved" && provider.is_active === true
      : provider.status === "approved";

  const headline =
    clean(override?.profile_headline) ||
    (providerType === "business"
      ? `${displayName} is an approved WMC cleaning business partner.`
      : `${displayName} is an approved independent self-employed cleaner partner.`);

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">WMC provider profile</p>
          <h1>{displayName}</h1>
          <p>
            {providerTypeLabel(providerType)}. This profile shows WMC verified information only, including completed WMC bookings and approved WMC customer reviews.
          </p>
        </div>

        <div className="quoteGrid">
          <div className="card formCard">
            <div className="actionRow" style={{ marginBottom: 16 }}>
              {approved && <span className="pill">Approved WMC provider</span>}
              {checkedInsurance && <span className="pill">Insurance details checked</span>}
              <span className="pill">{providerType === "business" ? "Business partner" : "Independent cleaner partner"}</span>
            </div>

            <h2>About this provider</h2>
            <p>{headline}</p>

            <div className="guideBox">
              WMC is a cleaning marketplace. Cleaning work is carried out by the independent provider selected by the customer. WMC verified reviews only relate to bookings completed through West Midlands Cleaner.
            </div>

            <h2>Services</h2>
            {services.length ? (
              <div className="actionRow">
                {services.map((service) => (
                  <span className="pill" key={service}>{service}</span>
                ))}
              </div>
            ) : (
              <p>Services are confirmed in each provider quote.</p>
            )}

            <h2>Areas covered</h2>
            {areas.length ? (
              <div className="actionRow">
                {areas.map((area) => (
                  <span className="pill" key={area}>{area}</span>
                ))}
              </div>
            ) : (
              <p>Area coverage is checked when the provider submits a quote.</p>
            )}

            <h2>Products and equipment</h2>
            <p>{productsText(providerType, provider)}</p>
          </div>

          <aside className="card sideCard">
            <h2>Trust summary</h2>

            <div className="statusList">
              <div className="statusRow">
                <strong>{averageRating ? `${averageRating}/5` : "New"}</strong>
                <span>{reviewCount ? `Average from ${reviewCount} WMC verified review${reviewCount === 1 ? "" : "s"}` : "No verified WMC reviews yet"}</span>
              </div>

              <div className="statusRow">
                <strong>{completedCount}</strong>
                <span>Completed WMC booking{completedCount === 1 ? "" : "s"}</span>
              </div>

              <div className="statusRow">
                <strong>{checkedInsurance ? "Checked" : "Pending"}</strong>
                <span>Insurance details status</span>
              </div>
            </div>

            <a className="btn btnPrimary" href="/book">Post a cleaning request</a>
          </aside>
        </div>
      </section>

      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">WMC verified reviews</p>
          <h2>Customer feedback from WMC bookings</h2>
          <p>
            Reviews are only shown after WMC customer bookings and admin approval. External reviews are not imported.
          </p>
        </div>

        {reviews.length ? (
          <div className="statusList">
            {reviews.map((review, index) => (
              <article className="card infoCard" key={`${review.created_at || index}-${index}`}>
                <div className="actionRow">
                  <span className="pill">{Number(review.rating || 0)}/5</span>
                  {review.would_recommend && <span className="pill">Would recommend</span>}
                  <span className="pill">Verified WMC booking</span>
                </div>

                <p style={{ marginTop: 14 }}>“{review.review_text}”</p>

                <p className="notice">
                  {review.service_type || "Cleaning service"}
                  {review.area_town ? ` • ${review.area_town}` : ""}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="card infoCard">
            <h3>New WMC provider</h3>
            <p>
              This provider does not have WMC verified reviews yet. They can still be approved by WMC and submit quotes, but reviews will appear here after completed WMC bookings.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
