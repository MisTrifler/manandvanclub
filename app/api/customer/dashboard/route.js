import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

function clean(value) {
  return String(value || "").trim();
}

function isToken(value) {
  return /^[a-f0-9]{64}$/i.test(clean(value));
}

function normaliseEmail(value) {
  return clean(value).toLowerCase();
}

function providerDisplayName(quote) {
  return quote?.provider_display_name || quote?.business_name || quote?.cleaner_name || "Selected provider";
}

async function fetchProviderQuotes(jobIds) {
  if (!jobIds.length) return [];

  const { data, error } = await supabaseAdmin
    .from("provider_quotes")
    .select("*")
    .in("job_id", jobIds)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Customer dashboard provider quote fetch error:", error);
    return [];
  }

  return data || [];
}

async function fetchIssues(jobIds) {
  if (!jobIds.length) return [];

  const { data, error } = await supabaseAdmin
    .from("job_issues")
    .select("*")
    .in("job_id", jobIds)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data || [];
}

async function fetchReviews(jobIds) {
  if (!jobIds.length) return [];

  const { data, error } = await supabaseAdmin
    .from("provider_reviews")
    .select("*")
    .in("job_id", jobIds)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data || [];
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const token = clean(body.token);

    if (!isToken(token)) {
      return NextResponse.json({ ok: false, error: "Please log in again using your email link." }, { status: 401 });
    }

    const { data: tokenRow, error: tokenError } = await supabaseAdmin
      .from("customer_login_tokens")
      .select("*")
      .eq("token", token)
      .maybeSingle();

    if (tokenError || !tokenRow) {
      return NextResponse.json({ ok: false, error: "This login link is invalid. Please request a new login link." }, { status: 401 });
    }


    if (tokenRow.expires_at && new Date(tokenRow.expires_at).getTime() < Date.now()) {
      return NextResponse.json({ ok: false, error: "This login link has expired. Please request a new login link." }, { status: 401 });
    }

    const email = normaliseEmail(tokenRow.customer_email);

    await supabaseAdmin
      .from("customer_login_tokens")
      .update({ last_used_at: new Date().toISOString() })
      .eq("id", tokenRow.id);

    const { data: jobs, error: jobsError } = await supabaseAdmin
      .from("cleaning_jobs")
      .select("*")
      .ilike("customer_email", email)
      .order("created_at", { ascending: false });

    if (jobsError) {
      console.error("Customer dashboard jobs fetch error:", jobsError);
      return NextResponse.json({ ok: false, error: "Could not load your bookings." }, { status: 500 });
    }

    const jobList = jobs || [];
    const jobIds = jobList.map((job) => job.id).filter(Boolean);
    const [quotes, issues, reviews] = await Promise.all([
      fetchProviderQuotes(jobIds),
      fetchIssues(jobIds),
      fetchReviews(jobIds)
    ]);

    const jobsWithSummary = jobList.map((job) => {
      const jobQuotes = quotes.filter((quote) => quote.job_id === job.id);
      const selectedQuote = jobQuotes.find((quote) => quote.id === job.selected_provider_quote_id) ||
        jobQuotes.find((quote) => quote.quote_status === "customer_selected") ||
        null;
      const openIssue = issues.find((issue) => issue.job_id === job.id && issue.issue_status === "open") || null;
      const jobReviews = reviews.filter((review) => review.job_id === job.id);

      return {
        ...job,
        quote_count: jobQuotes.length,
        selected_provider_name: selectedQuote ? providerDisplayName(selectedQuote) : null,
        selected_customer_price: selectedQuote?.customer_quote_amount || job.customer_total || null,
        selected_provider_quote_status: selectedQuote?.quote_status || null,
        has_open_issue: Boolean(job.has_open_issue || openIssue),
        issue_status: openIssue?.issue_status || job.issue_status || null,
        review_count: jobReviews.length
      };
    });

    return NextResponse.json({ ok: true, email, jobs: jobsWithSummary });
  } catch (error) {
    console.error("Customer dashboard error:", error);
    return NextResponse.json({ ok: false, error: "Could not load your customer dashboard." }, { status: 500 });
  }
}
