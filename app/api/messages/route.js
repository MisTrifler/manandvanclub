import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { sendMessageNotificationEmail } from "../../../lib/wmcEmails";

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

function getReference(job) {
  return job?.quote_reference || job?.booking_reference || job?.reference || job?.job_reference || job?.id;
}

function safeJob(job, quote) {
  return {
    id: job.id,
    quote_reference: getReference(job),
    service_type: job.service_type,
    area_town: job.area_town,
    postcode_area: job.postcode_area,
    preferred_date: job.preferred_date,
    preferred_time: job.preferred_time,
    payment_status: job.payment_status,
    job_status: job.job_status,
    issue_status: job.issue_status,
    has_open_issue: job.has_open_issue === true,
    provider_marked_completed_at: job.provider_marked_completed_at,
    customer_confirmed_completed_at: job.customer_confirmed_completed_at,
    provider_display_name: quote?.provider_display_name || "Selected provider",
    provider_type: quote?.provider_type || job.selected_provider_type || "provider",
    provider_email: quote?.provider_email || "",
    provider_phone: quote?.provider_phone || "",
    customer_name: job.customer_name,
    customer_email: job.customer_email,
    customer_phone: job.customer_phone
  };
}

function publicMessage(message) {
  return {
    id: message.id,
    sender_role: message.sender_role,
    sender_name: message.sender_name || (message.sender_role === "customer" ? "Customer" : "Provider"),
    message_text: message.message_text,
    created_at: message.created_at
  };
}

async function loadContext({ reference }) {
  const { data: job, error: jobError } = await supabaseAdmin
    .from("cleaning_jobs")
    .select("*")
    .eq("quote_reference", reference)
    .maybeSingle();

  if (jobError || !job) {
    return { error: "No WMC booking was found for that reference.", status: 404 };
  }

  if (!job.selected_provider_quote_id) {
    return { error: "A provider has not been selected for this booking yet.", status: 400 };
  }

  const { data: quote, error: quoteError } = await supabaseAdmin
    .from("provider_quotes")
    .select("*")
    .eq("id", job.selected_provider_quote_id)
    .maybeSingle();

  if (quoteError || !quote) {
    return { error: "The selected provider could not be found for this booking.", status: 404 };
  }

  return { job, quote };
}

function authorise({ role, job, quote, phone, email, providerType }) {
  if (role === "customer") {
    if (!phoneMatches(job.customer_phone, phone)) {
      return { ok: false, error: "The phone number does not match this booking reference." };
    }

    return {
      ok: true,
      senderName: job.customer_name || "Customer",
      senderEmail: job.customer_email || "",
      senderPhone: job.customer_phone || phone,
      recipientRole: "provider"
    };
  }

  if (role === "provider") {
    const selectedProviderType = clean(quote.provider_type).toLowerCase();
    const requestedProviderType = clean(providerType).toLowerCase();
    if (requestedProviderType && selectedProviderType && requestedProviderType !== selectedProviderType) {
      return { ok: false, error: "These provider details do not match the selected provider." };
    }

    if (email && clean(quote.provider_email).toLowerCase() !== clean(email).toLowerCase()) {
      return { ok: false, error: "The email does not match the selected provider." };
    }

    if (!phoneMatches(quote.provider_phone, phone)) {
      return { ok: false, error: "The phone number does not match the selected provider." };
    }

    return {
      ok: true,
      senderName: quote.provider_display_name || "Selected provider",
      senderEmail: quote.provider_email || email || "",
      senderPhone: quote.provider_phone || phone,
      recipientRole: "customer"
    };
  }

  return { ok: false, error: "Choose whether you are the customer or selected provider." };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const action = clean(body.action || "load").toLowerCase();
    const reference = clean(body.reference || body.quoteReference || body.quote_reference).toUpperCase();
    const role = clean(body.role).toLowerCase();
    const phone = clean(body.phone);
    const email = clean(body.email).toLowerCase();
    const providerType = clean(body.providerType || body.provider_type);

    if (!reference || !role || !phone) {
      return NextResponse.json({ error: "Please enter the booking reference, role and phone number." }, { status: 400 });
    }

    const context = await loadContext({ reference });
    if (context.error) {
      return NextResponse.json({ error: context.error }, { status: context.status || 400 });
    }

    const { job, quote } = context;
    const auth = authorise({ role, job, quote, phone, email, providerType });
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    if (action === "send") {
      const messageText = clean(body.messageText || body.message_text);
      if (messageText.length < 2) {
        return NextResponse.json({ error: "Please write a message before sending." }, { status: 400 });
      }
      if (messageText.length > 2000) {
        return NextResponse.json({ error: "Please keep messages under 2,000 characters." }, { status: 400 });
      }

      const { error: insertError } = await supabaseAdmin.from("job_messages").insert({
        job_id: job.id,
        booking_reference: getReference(job),
        sender_role: role,
        sender_name: auth.senderName,
        sender_email: auth.senderEmail,
        sender_phone: auth.senderPhone,
        message_text: messageText,
        message_status: "visible"
      });

      if (insertError) {
        return NextResponse.json({ error: `Could not send message: ${insertError.message}` }, { status: 500 });
      }

      await sendMessageNotificationEmail({ job, quote, senderRole: role, messageText }).catch(() => null);
    } else if (action !== "load") {
      return NextResponse.json({ error: "Unknown message action." }, { status: 400 });
    }

    const { data: messages, error: messagesError } = await supabaseAdmin
      .from("job_messages")
      .select("*")
      .eq("job_id", job.id)
      .eq("message_status", "visible")
      .order("created_at", { ascending: true });

    if (messagesError) {
      return NextResponse.json({ error: `Could not load messages: ${messagesError.message}` }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      job: safeJob(job, quote),
      quote,
      messages: (messages || []).map(publicMessage)
    });
  } catch (error) {
    return NextResponse.json({ error: error?.message || "Unable to process messages." }, { status: 500 });
  }
}
