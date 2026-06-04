import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { sendAdminProviderReviewReceivedEmail } from "../../../lib/wmcEmails";

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

function publicProviderType(value) {
  if (value === "business") return "Cleaning business partner";
  if (value === "cleaner") return "Independent self-employed cleaner partner";
  return "Approved provider";
}

function isReviewableJob(job) {
  const status = String(job?.status || "").toLowerCase();
  const jobStatus = String(job?.job_status || "").toLowerCase();

  return (
    ["completed", "payout_ready", "cleaner_paid", "business_paid", "provider_paid"].includes(status) ||
    ["completed", "payout_ready", "cleaner_paid", "business_paid", "provider_paid"].includes(jobStatus) ||
    Boolean(job?.completed_at)
  );
}

function getReference(job) {
  return (
    job?.quote_reference ||
    job?.booking_reference ||
    job?.reference ||
    job?.job_reference ||
    job?.id ||
    "WMC booking"
  );
}

async function loadReviewContext({ reference, phone }) {
  const { data: job, error: jobError } = await supabaseAdmin
    .from("cleaning_jobs")
    .select("*")
    .eq("quote_reference", reference)
    .maybeSingle();

  if (jobError || !job) {
    return { error: "No completed WMC booking was found for that reference.", status: 404 };
  }

  if (!phoneMatches(job.customer_phone, phone)) {
    return { error: "The phone number does not match this booking reference.", status: 401 };
  }

  if (!job.selected_provider_quote_id) {
    return { error: "A provider has not been selected for this booking yet.", status: 400 };
  }

  if (!isReviewableJob(job)) {
    return {
      error: "This booking is not marked as completed yet. Reviews can be submitted after the job is completed.",
      status: 400
    };
  }

  const { data: quote, error: quoteError } = await supabaseAdmin
    .from("provider_quotes")
    .select("*")
    .eq("id", job.selected_provider_quote_id)
    .maybeSingle();

  if (quoteError || !quote) {
    return { error: "The selected provider quote could not be found for this booking.", status: 404 };
  }

  const { data: review, error: reviewError } = await supabaseAdmin
    .from("provider_reviews")
    .select("*")
    .eq("job_id", job.id)
    .maybeSingle();

  if (reviewError) {
    return { error: `Could not check existing review: ${reviewError.message}`, status: 500 };
  }

  return { job, quote, review: review || null };
}

function publicJob(job, quote) {
  return {
    id: job.id,
    quote_reference: getReference(job),
    service_type: job.service_type,
    area_town: job.area_town,
    preferred_date: job.preferred_date,
    preferred_time: job.preferred_time,
    provider_display_name: quote.provider_display_name,
    provider_type: quote.provider_type,
    provider_type_label: publicProviderType(quote.provider_type)
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const action = clean(body.action || "load");
    const reference = clean(body.reference || body.quoteReference || body.quote_reference).toUpperCase();
    const phone = clean(body.phone);

    if (!reference || !phone) {
      return NextResponse.json(
        { error: "Please enter your booking reference and phone number." },
        { status: 400 }
      );
    }

    const context = await loadReviewContext({ reference, phone });

    if (context.error) {
      return NextResponse.json({ error: context.error }, { status: context.status || 400 });
    }

    const { job, quote, review } = context;

    if (action === "load") {
      return NextResponse.json({
        success: true,
        job: publicJob(job, quote),
        review
      });
    }

    if (action !== "submit") {
      return NextResponse.json({ error: "Unknown review action." }, { status: 400 });
    }

    if (review) {
      return NextResponse.json(
        { error: "A WMC verified review has already been submitted for this booking." },
        { status: 409 }
      );
    }

    const rating = Number(body.rating);
    const reviewText = clean(body.reviewText || body.review_text);
    const wouldRecommendValue = clean(body.wouldRecommend || body.would_recommend).toLowerCase();
    const issueRaised = Boolean(body.issueRaised || body.issue_raised);
    const issueDetails = clean(body.issueDetails || body.issue_details);

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Please choose a rating from 1 to 5." }, { status: 400 });
    }

    if (reviewText.length < 10) {
      return NextResponse.json({ error: "Please write a short review of at least 10 characters." }, { status: 400 });
    }

    if (!['yes', 'no'].includes(wouldRecommendValue)) {
      return NextResponse.json({ error: "Please say whether you would recommend this provider." }, { status: 400 });
    }

    if (issueRaised && issueDetails.length < 10) {
      return NextResponse.json({ error: "Please add a short explanation of the unresolved issue." }, { status: 400 });
    }

    const payload = {
      job_id: job.id,
      booking_reference: getReference(job),
      provider_quote_id: quote.id,
      provider_type: quote.provider_type,
      cleaner_partner_id: quote.provider_type === "cleaner" ? quote.cleaner_partner_id : null,
      business_partner_id: quote.provider_type === "business" ? quote.business_partner_id : null,
      provider_display_name: quote.provider_display_name,
      provider_email: quote.provider_email,
      provider_phone: quote.provider_phone,
      customer_name: job.customer_name,
      customer_email: job.customer_email,
      customer_phone: job.customer_phone,
      service_type: job.service_type,
      area_town: job.area_town,
      rating,
      review_text: reviewText,
      would_recommend: wouldRecommendValue === "yes",
      issue_raised: issueRaised,
      issue_details: issueRaised ? issueDetails : null,
      status: "pending"
    };

    const { data: insertedReview, error: insertError } = await supabaseAdmin
      .from("provider_reviews")
      .insert(payload)
      .select("*")
      .single();

    if (insertError) {
      return NextResponse.json({ error: `Could not submit review: ${insertError.message}` }, { status: 500 });
    }

    await supabaseAdmin
      .from("cleaning_jobs")
      .update({ review_received_at: new Date().toISOString() })
      .eq("id", job.id);

    const emailResult = await sendAdminProviderReviewReceivedEmail({ job, quote, review: insertedReview }).catch((error) => ({
      sent: false,
      error: error?.message || "Admin review notification email failed."
    }));

    return NextResponse.json({
      success: true,
      review: insertedReview,
      email_result: emailResult
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to process review." },
      { status: 500 }
    );
  }
}
