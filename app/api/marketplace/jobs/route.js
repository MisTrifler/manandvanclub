import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { sendBookingEmails, sendNewJobOpportunityEmails } from "../../../../lib/wmcEmails";

function cleanText(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function cleanOptionalText(value) {
  const text = cleanText(value);

  return text || null;
}

function cleanNumber(value, fallback = 0) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return Math.round(number * 100) / 100;
}

function cleanInteger(value, fallback = 0) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return Math.round(number);
}

function cleanBoolean(value) {
  return value === true || value === "true" || value === 1 || value === "1";
}

function createQuoteReference() {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);

  return `WMC-${year}-${random}`;
}

function calculateFeePercent(customerTotal, estimatedHours) {
  const total = Number(customerTotal || 0);

  if (!Number.isFinite(total) || total <= 0) {
    return 0;
  }

  return 15;
}

function calculateJobSize(customerTotal, estimatedHours) {
  const total = Number(customerTotal || 0);
  const hours = Number(estimatedHours || 0);

  if (total >= 220 || hours >= 5) {
    return "large";
  }

  if (total >= 100 || hours >= 3) {
    return "medium";
  }

  return "small";
}

function pickFirstValidNumber(values, fallback = 0) {
  for (const value of values) {
    const number = Number(value);

    if (Number.isFinite(number)) {
      return Math.round(number * 100) / 100;
    }
  }

  return fallback;
}

export async function POST(request) {
  try {
    const body = await request.json();

    const quoteReference =
      cleanText(body.quote_reference) ||
      cleanText(body.quoteReference) ||
      createQuoteReference();

    const serviceType = cleanText(body.service_type) || cleanText(body.serviceType);
    const propertyType = cleanText(body.property_type) || cleanText(body.propertyType);
    const customerName = cleanText(body.customer_name) || cleanText(body.customerName);
    const customerPhone =
      cleanText(body.customer_phone) ||
      cleanText(body.customerPhone) ||
      cleanText(body.phone);
    const postcode = cleanText(body.postcode).toUpperCase();
    const areaTown = cleanText(body.area_town) || cleanText(body.areaTown);
    const preferredDate = cleanText(body.preferred_date) || cleanText(body.preferredDate);
    const preferredTime = cleanText(body.preferred_time) || cleanText(body.preferredTime);
    const customerEmail = cleanText(body.customer_email) || cleanText(body.customerEmail);

    if (!serviceType) {
      return NextResponse.json({ error: "Missing service type." }, { status: 400 });
    }

    if (!propertyType) {
      return NextResponse.json({ error: "Missing property type." }, { status: 400 });
    }

    if (!customerName) {
      return NextResponse.json({ error: "Missing customer name." }, { status: 400 });
    }

    if (!customerPhone) {
      return NextResponse.json({ error: "Missing customer phone number." }, { status: 400 });
    }

    if (!customerEmail) {
      return NextResponse.json({ error: "Missing customer email address." }, { status: 400 });
    }

    if (!postcode) {
      return NextResponse.json({ error: "Missing postcode." }, { status: 400 });
    }

    if (!areaTown) {
      return NextResponse.json({ error: "Missing area or town." }, { status: 400 });
    }

    if (!preferredDate) {
      return NextResponse.json({ error: "Missing preferred date." }, { status: 400 });
    }

    if (!preferredTime) {
      return NextResponse.json({ error: "Missing preferred time." }, { status: 400 });
    }

    const bedrooms = cleanInteger(body.bedrooms, 1);
    const bathrooms = cleanInteger(body.bathrooms, 1);

    const frequency = cleanText(body.frequency) || "One-off";
    const conditionLevel =
      cleanText(body.condition_level) ||
      cleanText(body.conditionLevel) ||
      "Standard";

    const estimatedHours = pickFirstValidNumber(
      [body.estimated_hours, body.estimatedHours],
      2
    );

    const customerTotalPrice = pickFirstValidNumber(
      [body.customer_total_price, body.customerTotalPrice],
      0
    );

    if (customerTotalPrice <= 0) {
      return NextResponse.json(
        { error: "Missing customer estimate. Please refresh the booking page and try again." },
        { status: 400 }
      );
    }

    const jobSize =
      cleanText(body.job_size) ||
      cleanText(body.jobSize) ||
      calculateJobSize(customerTotalPrice, estimatedHours);

    const wmcFeePercent = pickFirstValidNumber(
      [body.wmc_fee_percent, body.wmcFeePercent],
      calculateFeePercent(customerTotalPrice, estimatedHours)
    );

    const wmcFeeAmount = pickFirstValidNumber(
      [body.wmc_fee_amount, body.wmcFeeAmount],
      cleanNumber((customerTotalPrice * wmcFeePercent) / 100)
    );

    const cleanerPayout = pickFirstValidNumber(
      [body.cleaner_payout, body.cleanerPayout],
      cleanNumber(customerTotalPrice - wmcFeeAmount)
    );

    const insertPayload = {
      quote_reference: quoteReference,

      service_type: serviceType,
      property_type: propertyType,
      bedrooms,
      bathrooms,
      frequency,
      condition_level: conditionLevel,

      preferred_date: preferredDate,
      preferred_time: preferredTime,
      is_flexible: cleanBoolean(body.is_flexible ?? body.isFlexible),
      is_urgent: cleanBoolean(body.is_urgent ?? body.isUrgent),

      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,

      postcode,
      area_town: areaTown,

      extras: cleanText(body.extras) || "None selected",
      notes: cleanOptionalText(body.notes),
      access_notes: cleanOptionalText(body.access_notes || body.accessNotes),
      parking_notes: cleanOptionalText(body.parking_notes || body.parkingNotes),

      customer_total_price: customerTotalPrice,
      wmc_fee_percent: wmcFeePercent,
      wmc_fee_amount: wmcFeeAmount,
      cleaner_payout: cleanerPayout,
      estimated_hours: estimatedHours,
      job_size: jobSize,

      provider_preference:
        cleanText(body.provider_preference) ||
        cleanText(body.providerPreference) ||
        "no_preference",
      provider_preference_label:
        cleanText(body.provider_preference_label) ||
        cleanText(body.providerPreferenceLabel) ||
        "No preference — match me with the best available approved provider",
      quote_selection_status: "awaiting_quotes",

      /*
        Marketplace automation:
        New customer requests are posted to approved providers immediately.
        No payment is taken at this stage and full customer address/access details remain hidden.
      */
      job_status: cleanText(body.job_status) || cleanText(body.jobStatus) || "available_to_cleaners",
      payment_status:
        cleanText(body.payment_status) || cleanText(body.paymentStatus) || "not_paid"
    };

    const { data, error } = await supabaseAdmin
      .from("cleaning_jobs")
      .insert(insertPayload)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const providerPreference =
      cleanText(body.provider_preference) ||
      cleanText(body.providerPreference) ||
      "no_preference";

    const providerPreferenceLabel =
      cleanText(body.provider_preference_label) ||
      cleanText(body.providerPreferenceLabel) ||
      "No preference — match me with the best available approved provider";

    const emailJob = {
      ...data,
      provider_preference: providerPreference,
      provider_preference_label: providerPreferenceLabel
    };

    const emailResults = await sendBookingEmails(emailJob).catch((emailError) => ({
      customer: {
        sent: false,
        error: emailError?.message || "Customer booking email failed."
      },
      admin: {
        sent: false,
        error: emailError?.message || "Admin booking email failed."
      }
    }));

    let provider_notification_results = null;

    if (data.job_status === "available_to_cleaners") {
      provider_notification_results = await sendNewJobOpportunityEmails({ job: emailJob }).catch(
        (emailError) => ({
          sent: false,
          error: emailError?.message || "Provider opportunity email failed."
        })
      );
    }

    return NextResponse.json({
      success: true,
      job: data,
      quote_reference: data.quote_reference,
      customer_total_price: data.customer_total_price,
      email_results: emailResults,
      provider_notification_results
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to submit booking request." },
      { status: 500 }
    );
  }
}
