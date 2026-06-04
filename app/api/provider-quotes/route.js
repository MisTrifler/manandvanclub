import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { sendCustomerProviderQuoteReceivedEmail } from "../../../lib/wmcEmails";

export const runtime = "nodejs";

function clean(value) {
  return String(value || "").trim();
}

function normalisePhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("0044")) return `0${digits.slice(4)}`;
  if (digits.startsWith("44")) return `0${digits.slice(2)}`;
  return digits;
}

function isValidUkContactNumber(value) {
  const phone = normalisePhone(value);
  return /^0\d{9,10}$/.test(phone);
}

function roundMoney(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.round(number * 100) / 100;
}

function calculateAmounts(customerQuoteAmount) {
  const customerQuote = roundMoney(customerQuoteAmount);
  const wmcFeePercent = 15;
  const wmcFeeAmount = roundMoney((customerQuote * wmcFeePercent) / 100);
  const providerPayoutAmount = roundMoney(customerQuote - wmcFeeAmount);

  return {
    customerQuote,
    wmcFeePercent,
    wmcFeeAmount,
    providerPayoutAmount
  };
}

async function findApprovedCleaner({ email, phone }) {
  const { data, error } = await supabaseAdmin
    .from("cleaner_partners")
    .select("*")
    .ilike("email", email)
    .eq("status", "approved")
    .limit(10);

  if (error) {
    throw new Error(`Cleaner lookup failed: ${error.message}`);
  }

  return (data || []).find((cleaner) => normalisePhone(cleaner.phone) === phone) || null;
}

async function findApprovedBusiness({ email, phone }) {
  const { data, error } = await supabaseAdmin
    .from("business_partners")
    .select("*")
    .ilike("email", email)
    .eq("status", "approved")
    .eq("is_active", true)
    .limit(10);

  if (error) {
    throw new Error(`Business lookup failed: ${error.message}`);
  }

  return (data || []).find((business) => normalisePhone(business.phone) === phone) || null;
}

function providerName(providerType, provider) {
  if (providerType === "business") {
    return provider.trading_name || provider.business_name || provider.contact_name || "Approved business partner";
  }

  return provider.full_name || provider.business_name || "Approved independent cleaner partner";
}

export async function POST(request) {
  try {
    const body = await request.json();

    const providerType = clean(body.providerType || body.provider_type);
    const email = clean(body.email).toLowerCase();
    const phone = normalisePhone(body.phone);
    const jobId = clean(body.jobId || body.job_id);
    const quoteAmount = roundMoney(body.customerQuoteAmount || body.customer_quote_amount);
    const availableDate = clean(body.availableDate || body.available_date);
    const availableTime = clean(body.availableTime || body.available_time);
    const estimatedHours = body.estimatedHours || body.estimated_hours;
    const productsIncluded = clean(body.productsIncluded || body.products_included);
    const providerMessage = clean(body.providerMessage || body.provider_message);
    const cleanerName = clean(body.cleanerName || body.cleaner_name);
    const cleanerPhone = clean(body.cleanerPhone || body.cleaner_phone);

    if (!["cleaner", "business"].includes(providerType)) {
      return NextResponse.json({ error: "Missing or invalid provider type." }, { status: 400 });
    }

    if (!email || !phone || !jobId) {
      return NextResponse.json({ error: "Missing provider login details or booking reference." }, { status: 400 });
    }

    if (!quoteAmount || quoteAmount < 0.5) {
      return NextResponse.json({ error: "Please enter a valid customer quote amount." }, { status: 400 });
    }

    if (!availableDate || !availableTime) {
      return NextResponse.json({ error: "Please enter your available date and time." }, { status: 400 });
    }

    if (providerType === "business" && (!cleanerName || !cleanerPhone)) {
      return NextResponse.json(
        { error: "Please enter the cleaner/team lead name and phone for this business quote." },
        { status: 400 }
      );
    }

    if (providerType === "business" && !isValidUkContactNumber(cleanerPhone)) {
      return NextResponse.json(
        { error: "Please enter a valid cleaner/team lead phone number using 07, +44 or 0044 format." },
        { status: 400 }
      );
    }

    const provider =
      providerType === "business"
        ? await findApprovedBusiness({ email, phone })
        : await findApprovedCleaner({ email, phone });

    if (!provider) {
      return NextResponse.json(
        { error: "Access denied. Only approved WMC providers can submit quotes." },
        { status: 401 }
      );
    }

    const { data: job, error: jobError } = await supabaseAdmin
      .from("cleaning_jobs")
      .select("*")
      .eq("id", jobId)
      .maybeSingle();

    if (jobError || !job) {
      return NextResponse.json({ error: "This booking opportunity could not be found." }, { status: 404 });
    }

    if (job.payment_status === "paid") {
      return NextResponse.json({ error: "This booking has already been paid and is no longer open for quotes." }, { status: 400 });
    }

    if (!["available_to_cleaners", "cleaner_interested", "submitted", "needs_review"].includes(job.job_status)) {
      return NextResponse.json({ error: "This booking opportunity is no longer open for provider quotes." }, { status: 400 });
    }

    const amounts = calculateAmounts(quoteAmount);
    const providerDisplayName = providerName(providerType, provider);

    const payload = {
      job_id: jobId,
      provider_type: providerType,
      cleaner_partner_id: providerType === "cleaner" ? provider.id : null,
      business_partner_id: providerType === "business" ? provider.id : null,
      provider_display_name: providerDisplayName,
      provider_email: provider.email || email,
      provider_phone: provider.phone || phone,
      customer_quote_amount: amounts.customerQuote,
      wmc_fee_percent: amounts.wmcFeePercent,
      wmc_fee_amount: amounts.wmcFeeAmount,
      provider_payout_amount: amounts.providerPayoutAmount,
      available_date: availableDate,
      available_time: availableTime,
      estimated_hours: estimatedHours ? roundMoney(estimatedHours) : null,
      products_included: productsIncluded || null,
      provider_message:
        providerType === "business"
          ? [
              `Cleaner/team lead: ${cleanerName}`,
              `Cleaner/team phone: ${normalisePhone(cleanerPhone)}`,
              providerMessage ? `Provider message: ${providerMessage}` : ""
            ]
              .filter(Boolean)
              .join("\n")
          : providerMessage || null,
      quote_status: "submitted"
    };

    let existingQuoteQuery = supabaseAdmin
      .from("provider_quotes")
      .select("id")
      .eq("job_id", jobId);

    if (providerType === "business") {
      existingQuoteQuery = existingQuoteQuery.eq("business_partner_id", provider.id);
    } else {
      existingQuoteQuery = existingQuoteQuery.eq("cleaner_partner_id", provider.id);
    }

    const { data: existingQuote } = await existingQuoteQuery.maybeSingle();

    let quote;
    let quoteError;

    if (existingQuote?.id) {
      const result = await supabaseAdmin
        .from("provider_quotes")
        .update(payload)
        .eq("id", existingQuote.id)
        .select("*")
        .single();

      quote = result.data;
      quoteError = result.error;
    } else {
      const result = await supabaseAdmin
        .from("provider_quotes")
        .insert(payload)
        .select("*")
        .single();

      quote = result.data;
      quoteError = result.error;
    }

    if (quoteError) {
      return NextResponse.json({ error: `Could not submit quote: ${quoteError.message}` }, { status: 500 });
    }

    await supabaseAdmin
      .from("cleaning_jobs")
      .update({
        job_status: "cleaner_interested",
        quote_selection_status: "quotes_received"
      })
      .eq("id", jobId);

    const emailResult = await sendCustomerProviderQuoteReceivedEmail({ job, quote }).catch((emailError) => ({
      sent: false,
      error: emailError?.message || "Customer quote notification email failed."
    }));

    return NextResponse.json({
      success: true,
      quote,
      email_result: emailResult,
      message:
        "Your quote has been sent to the customer. The customer can compare provider quotes and choose who they want to book."
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to submit provider quote." },
      { status: 500 }
    );
  }
}
