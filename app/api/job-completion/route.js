import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import {
  sendAdminIssueReportedEmail,
  sendCustomerCompletionReviewEmail,
  sendProviderCompletionConfirmedEmail,
  sendProviderIssueReportedEmail
} from "../../../lib/wmcEmails";

export const runtime = "nodejs";

function clean(value) {
  return String(value || "").trim();
}

function normaliseUkPhone(value) {
  let phone = String(value || "").trim();
  phone = phone.replace(/\s+/g, "").replace(/-/g, "").replace(/\(/g, "").replace(/\)/g, "");
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

function getReference(job) {
  return job?.quote_reference || job?.booking_reference || job?.reference || job?.job_reference || job?.id;
}

async function loadContext(reference) {
  const { data: job, error: jobError } = await supabaseAdmin
    .from("cleaning_jobs")
    .select("*")
    .eq("quote_reference", reference)
    .maybeSingle();

  if (jobError || !job) return { error: "No WMC booking was found for that reference.", status: 404 };
  if (!job.selected_provider_quote_id) return { error: "A provider has not been selected for this booking yet.", status: 400 };

  const { data: quote, error: quoteError } = await supabaseAdmin
    .from("provider_quotes")
    .select("*")
    .eq("id", job.selected_provider_quote_id)
    .maybeSingle();

  if (quoteError || !quote) return { error: "The selected provider could not be found for this booking.", status: 404 };
  return { job, quote };
}

function authoriseProvider({ quote, email, phone, providerType }) {
  const selectedProviderType = clean(quote.provider_type).toLowerCase();
  const requestedProviderType = clean(providerType).toLowerCase();
  if (requestedProviderType && selectedProviderType && requestedProviderType !== selectedProviderType) return false;
  if (email && clean(quote.provider_email).toLowerCase() !== clean(email).toLowerCase()) return false;
  return phoneMatches(quote.provider_phone, phone);
}

async function addSystemMessage({ job, text }) {
  await supabaseAdmin.from("job_messages").insert({
    job_id: job.id,
    booking_reference: getReference(job),
    sender_role: "wmc_admin",
    sender_name: "WMC system",
    message_text: text,
    message_status: "visible"
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const action = clean(body.action).toLowerCase();
    const reference = clean(body.reference || body.quoteReference || body.quote_reference).toUpperCase();
    const phone = clean(body.phone);
    const email = clean(body.email).toLowerCase();
    const providerType = clean(body.providerType || body.provider_type);

    if (!reference || !action || !phone) {
      return NextResponse.json({ error: "Please enter the booking reference, action and phone number." }, { status: 400 });
    }

    const context = await loadContext(reference);
    if (context.error) return NextResponse.json({ error: context.error }, { status: context.status || 400 });
    const { job, quote } = context;

    if (action === "provider_mark_completed") {
      if (!authoriseProvider({ quote, email, phone, providerType })) {
        return NextResponse.json({ error: "The provider details do not match this booking." }, { status: 401 });
      }

      if (clean(job.payment_status).toLowerCase() !== "paid") {
        return NextResponse.json({ error: "This booking is not marked as paid yet." }, { status: 400 });
      }

      const now = new Date().toISOString();
      const { data: updatedJob, error: updateError } = await supabaseAdmin
        .from("cleaning_jobs")
        .update({
          job_status: "completed",
          completed_at: job.completed_at || now,
          provider_marked_completed_at: now,
          payout_ready_at: job.payout_ready_at || now,
          issue_status: job.issue_status || "none",
          has_open_issue: job.has_open_issue === true ? true : false,
          payout_on_hold: job.payout_on_hold === true ? true : false
        })
        .eq("id", job.id)
        .select("*")
        .single();

      if (updateError) return NextResponse.json({ error: `Could not mark completed: ${updateError.message}` }, { status: 500 });

      await addSystemMessage({
        job: updatedJob,
        text: "Provider marked the booking as completed. The customer can confirm completion, leave a review or report an issue. The 48-hour issue window now applies."
      }).catch(() => null);

      const emailResult = await sendCustomerCompletionReviewEmail({ job: updatedJob, quote }).catch((error) => ({
        sent: false,
        error: error?.message || "Customer completion email failed."
      }));

      return NextResponse.json({ success: true, job: updatedJob, email_result: emailResult });
    }

    if (action === "customer_confirm_completed") {
      if (!phoneMatches(job.customer_phone, phone)) {
        return NextResponse.json({ error: "The phone number does not match this booking reference." }, { status: 401 });
      }

      const now = new Date().toISOString();
      const { data: updatedJob, error: updateError } = await supabaseAdmin
        .from("cleaning_jobs")
        .update({
          customer_confirmed_completed_at: now,
          completed_at: job.completed_at || now,
          payout_ready_at: job.payout_ready_at || now,
          job_status: "payout_ready",
          issue_status: "none",
          has_open_issue: false,
          payout_on_hold: false,
          payout_hold_reason: null
        })
        .eq("id", job.id)
        .select("*")
        .single();

      if (updateError) return NextResponse.json({ error: `Could not confirm completion: ${updateError.message}` }, { status: 500 });

      await addSystemMessage({ job: updatedJob, text: "Customer confirmed the booking as completed with no issue reported." }).catch(() => null);
      await sendProviderCompletionConfirmedEmail({ job: updatedJob, quote }).catch(() => null);

      return NextResponse.json({ success: true, job: updatedJob });
    }

    if (action === "customer_report_issue") {
      if (!phoneMatches(job.customer_phone, phone)) {
        return NextResponse.json({ error: "The phone number does not match this booking reference." }, { status: 401 });
      }

      const issueType = clean(body.issueType || body.issue_type || "Customer issue");
      const issueDetails = clean(body.issueDetails || body.issue_details);

      if (issueDetails.length < 10) {
        return NextResponse.json({ error: "Please explain the issue in at least 10 characters." }, { status: 400 });
      }

      const now = new Date().toISOString();
      const { data: issue, error: issueError } = await supabaseAdmin
        .from("job_issues")
        .insert({
          job_id: job.id,
          booking_reference: getReference(job),
          issue_status: "open",
          issue_type: issueType || "Customer issue",
          issue_details: issueDetails,
          reported_by: "customer",
          reporter_name: job.customer_name,
          reporter_email: job.customer_email,
          reporter_phone: job.customer_phone,
          provider_type: quote.provider_type,
          provider_display_name: quote.provider_display_name
        })
        .select("*")
        .single();

      if (issueError) return NextResponse.json({ error: `Could not report issue: ${issueError.message}` }, { status: 500 });

      const { data: updatedJob, error: updateError } = await supabaseAdmin
        .from("cleaning_jobs")
        .update({
          job_status: "dispute",
          issue_status: "open",
          issue_reported_at: now,
          issue_details: issueDetails,
          has_open_issue: true,
          payout_on_hold: true,
          payout_hold_reason: `Customer issue reported: ${issueType || "Issue"}`
        })
        .eq("id", job.id)
        .select("*")
        .single();

      if (updateError) return NextResponse.json({ error: `Issue saved, but job could not be updated: ${updateError.message}` }, { status: 500 });

      await addSystemMessage({ job: updatedJob, text: `Customer reported an issue: ${issueType || "Issue"}. Provider payout is paused while this is reviewed.` }).catch(() => null);
      await sendProviderIssueReportedEmail({ job: updatedJob, quote, issue }).catch(() => null);
      await sendAdminIssueReportedEmail({ job: updatedJob, quote, issue }).catch(() => null);

      return NextResponse.json({ success: true, job: updatedJob, issue });
    }

    return NextResponse.json({ error: "Unknown completion action." }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error?.message || "Unable to update booking completion." }, { status: 500 });
  }
}
