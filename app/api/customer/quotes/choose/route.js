import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import {
  sendCustomerQuoteSelectedEmail,
  sendProviderQuoteNotSelectedEmail,
  sendSelectedProviderAwaitingPaymentEmail
} from "../../../../../lib/wmcEmails";

export const runtime = "nodejs";

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is missing in Vercel environment variables.");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

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

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://www.westmidlandscleaner.co.uk"
  ).replace(/\/$/, "");
}

function toPence(amountGbp) {
  return Math.round(Number(amountGbp || 0) * 100);
}

function parseBusinessTeamLead(providerMessage) {
  const text = String(providerMessage || "");
  const nameMatch = text.match(/Cleaner\/team lead:\s*(.+)/i);
  const phoneMatch = text.match(/Cleaner\/team phone:\s*(.+)/i);

  return {
    name: nameMatch?.[1]?.trim() || null,
    phone: phoneMatch?.[1]?.trim() || null
  };
}

function getCustomerName(job) {
  return job.customer_name || job.name || job.full_name || "WMC customer";
}

async function safeSendEmail(label, callback) {
  try {
    return await callback();
  } catch (error) {
    return {
      sent: false,
      label,
      error: error?.message || "Email failed."
    };
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const reference = clean(body.reference || body.quoteReference || body.quote_reference).toUpperCase();
    const phone = clean(body.phone);
    const quoteId = clean(body.quoteId || body.quote_id);

    if (!reference || !phone || !quoteId) {
      return NextResponse.json(
        { error: "Please provide the booking reference, phone number and selected quote." },
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

    if (job.payment_status === "paid") {
      return NextResponse.json({ error: "This booking has already been paid." }, { status: 400 });
    }

    const { data: quote, error: quoteError } = await supabaseAdmin
      .from("provider_quotes")
      .select("*")
      .eq("id", quoteId)
      .eq("job_id", job.id)
      .maybeSingle();

    if (quoteError || !quote) {
      return NextResponse.json({ error: "This provider quote could not be found." }, { status: 404 });
    }

    if (!["submitted", "customer_selected"].includes(quote.quote_status)) {
      return NextResponse.json({ error: "This provider quote is no longer available." }, { status: 400 });
    }

    const amountPence = toPence(quote.customer_quote_amount);

    if (!amountPence || amountPence < 50) {
      return NextResponse.json({ error: "This quote does not have a valid payment amount." }, { status: 400 });
    }

    const { data: otherQuotes } = await supabaseAdmin
      .from("provider_quotes")
      .select("*")
      .eq("job_id", job.id)
      .neq("id", quote.id)
      .eq("quote_status", "submitted");

    const updatePayload = {
      selected_provider_quote_id: quote.id,
      selected_provider_type: quote.provider_type,
      quote_selection_status: "customer_selected",
      quote_selected_at: new Date().toISOString(),
      customer_total_price: quote.customer_quote_amount,
      wmc_fee_percent: quote.wmc_fee_percent,
      wmc_fee_amount: quote.wmc_fee_amount,
      cleaner_payout: quote.provider_payout_amount,
      business_payout: quote.provider_type === "business" ? quote.provider_payout_amount : null,
      job_status: "awaiting_payment",
      payment_status: "payment_pending"
    };

    if (quote.provider_type === "business") {
      const teamLead = parseBusinessTeamLead(quote.provider_message);
      updatePayload.assigned_business_partner_id = quote.business_partner_id;
      updatePayload.assigned_cleaner_id = null;
      updatePayload.business_team_lead_name = teamLead.name;
      updatePayload.business_team_lead_phone = teamLead.phone;
    } else {
      updatePayload.assigned_cleaner_id = quote.cleaner_partner_id;
      updatePayload.assigned_business_partner_id = null;
      updatePayload.business_team_lead_name = null;
      updatePayload.business_team_lead_phone = null;
    }

    const { data: updatedJob, error: jobUpdateError } = await supabaseAdmin
      .from("cleaning_jobs")
      .update(updatePayload)
      .eq("id", job.id)
      .select("*")
      .single();

    if (jobUpdateError) {
      return NextResponse.json({ error: `Could not select provider quote: ${jobUpdateError.message}` }, { status: 500 });
    }

    await supabaseAdmin
      .from("provider_quotes")
      .update({ quote_status: "closed" })
      .eq("job_id", job.id)
      .neq("id", quote.id);

    const { data: selectedQuote, error: selectedQuoteError } = await supabaseAdmin
      .from("provider_quotes")
      .update({ quote_status: "customer_selected", selected_at: new Date().toISOString() })
      .eq("id", quote.id)
      .select("*")
      .single();

    if (selectedQuoteError) {
      return NextResponse.json(
        { error: `Provider was selected, but the quote status could not be updated: ${selectedQuoteError.message}` },
        { status: 500 }
      );
    }

    const stripe = getStripe();
    const siteUrl = getSiteUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: updatedJob.customer_email || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            unit_amount: amountPence,
            product_data: {
              name: `West Midlands Cleaner booking ${updatedJob.quote_reference}`,
              description: `${updatedJob.service_type || "Cleaning booking"} - selected provider quote`
            }
          }
        }
      ],
      payment_intent_data: {
        transfer_group: `wmc_job_${updatedJob.id}`,
        metadata: {
          platform: "West Midlands Cleaner",
          job_id: updatedJob.id,
          quote_reference: updatedJob.quote_reference,
          provider_quote_id: selectedQuote.id,
          selected_provider_type: selectedQuote.provider_type,
          customer_name: getCustomerName(updatedJob)
        }
      },
      metadata: {
        platform: "West Midlands Cleaner",
        job_id: updatedJob.id,
        quote_reference: updatedJob.quote_reference,
        provider_quote_id: selectedQuote.id,
        selected_provider_type: selectedQuote.provider_type,
        customer_name: getCustomerName(updatedJob),
        customer_phone: updatedJob.customer_phone || ""
      },
      success_url: `${siteUrl}/pay/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/quotes/${encodeURIComponent(updatedJob.quote_reference)}?cancelled=1`
    });

    await supabaseAdmin.from("job_payments").insert({
      job_id: updatedJob.id,
      quote_reference: updatedJob.quote_reference,
      stripe_payment_id: session.id,
      amount_paid: selectedQuote.customer_quote_amount,
      currency: "gbp",
      status: "pending",
      notes: `Customer selected provider quote ${selectedQuote.id}. Payment confirmation should be handled by webhook.`
    });

    const emailResults = {
      customer_selected: await safeSendEmail("customer_selected", () =>
        sendCustomerQuoteSelectedEmail({ job: updatedJob, quote: selectedQuote, checkoutUrl: session.url })
      ),
      selected_provider: await safeSendEmail("selected_provider", () =>
        sendSelectedProviderAwaitingPaymentEmail({ job: updatedJob, quote: selectedQuote })
      ),
      non_selected_providers: []
    };

    for (const otherQuote of otherQuotes || []) {
      const result = await safeSendEmail("non_selected_provider", () =>
        sendProviderQuoteNotSelectedEmail({ job: updatedJob, quote: otherQuote })
      );
      emailResults.non_selected_providers.push({ quote_id: otherQuote.id, ...result });
    }

    return NextResponse.json({
      success: true,
      url: session.url,
      selected_quote_id: selectedQuote.id,
      email_results: emailResults
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to choose provider quote." },
      { status: 500 }
    );
  }
}
