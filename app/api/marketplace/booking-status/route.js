import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

function normaliseUkPhone(value) {
  let phone = String(value || "").trim();

  phone = phone.replace(/\s+/g, "");
  phone = phone.replace(/-/g, "");
  phone = phone.replace(/\(/g, "");
  phone = phone.replace(/\)/g, "");

  if (phone.startsWith("+")) {
    phone = phone.slice(1);
  }

  if (phone.startsWith("0044")) {
    phone = `0${phone.slice(4)}`;
  }

  if (phone.startsWith("44")) {
    phone = `0${phone.slice(2)}`;
  }

  phone = phone.replace(/\D/g, "");

  return phone;
}

function phoneMatches(savedPhoneValue, enteredPhoneValue) {
  const savedPhone = normaliseUkPhone(savedPhoneValue);
  const enteredPhone = normaliseUkPhone(enteredPhoneValue);

  if (!savedPhone || !enteredPhone) return false;
  if (savedPhone === enteredPhone) return true;

  return savedPhone.slice(-10) === enteredPhone.slice(-10);
}

function formatStatus(value) {
  return String(value || "not_set").replaceAll("_", " ");
}

function getCustomerStage(job) {
  if (job.job_status === "completed") {
    return "Completed";
  }

  if (job.job_status === "cancelled") {
    return "Cancelled";
  }

  if (job.job_status === "dispute") {
    return "Issue being reviewed";
  }

  if (job.payment_status === "paid" && job.assigned_cleaner_id) {
    return "Booking confirmed";
  }

  if (job.assigned_cleaner_id && job.payment_status !== "paid") {
    return "Cleaner assigned, awaiting payment";
  }

  if (["available_to_cleaners", "cleaner_interested"].includes(job.job_status)) {
    return "Checking cleaner availability";
  }

  if (["quote_sent", "customer_accepted", "awaiting_payment"].includes(job.job_status)) {
    return "Quote confirmed, awaiting payment";
  }

  return "Request received";
}

export async function POST(request) {
  try {
    const body = await request.json();

    const quoteReference = String(body.quoteReference || "").trim().toUpperCase();
    const phone = String(body.phone || "").trim();

    if (!quoteReference) {
      return NextResponse.json(
        { error: "Please enter your WMC booking reference." },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        { error: "Please enter the phone number used on the booking request." },
        { status: 400 }
      );
    }

    const { data: job, error } = await supabaseAdmin
      .from("cleaning_jobs")
      .select(
        `
        id,
        created_at,
        quote_reference,
        customer_name,
        customer_phone,
        customer_email,
        service_type,
        frequency,
        property_type,
        bedrooms,
        bathrooms,
        postcode,
        area_town,
        condition_level,
        preferred_date,
        preferred_time,
        is_flexible,
        is_urgent,
        extras,
        customer_total_price,
        payment_status,
        job_status,
        assigned_cleaner_id,
        estimated_hours
        `
      )
      .eq("quote_reference", quoteReference)
      .single();

    if (error || !job) {
      return NextResponse.json(
        { error: "No booking request was found for that reference." },
        { status: 404 }
      );
    }

    if (!phoneMatches(job.customer_phone, phone)) {
      return NextResponse.json(
        {
          error:
            "The phone number does not match this booking reference. You can use either 07 or +44 format."
        },
        { status: 401 }
      );
    }

    const cleanerAssigned = Boolean(job.assigned_cleaner_id);
    const paymentPaid = job.payment_status === "paid";
    const amountAvailable = Number(job.customer_total_price || 0) > 0;
    const paymentReadyStatuses = ["quote_sent", "customer_accepted", "awaiting_payment"];

    const canPay =
      !paymentPaid && amountAvailable && paymentReadyStatuses.includes(job.job_status);

    return NextResponse.json({
      success: true,
      booking: {
        id: job.id,
        created_at: job.created_at,
        quote_reference: job.quote_reference,
        customer_name: job.customer_name,
        customer_email: job.customer_email,
        service_type: job.service_type,
        frequency: job.frequency,
        property_type: job.property_type,
        bedrooms: job.bedrooms,
        bathrooms: job.bathrooms,
        postcode: job.postcode,
        area_town: job.area_town,
        condition_level: job.condition_level,
        preferred_date: job.preferred_date,
        preferred_time: job.preferred_time,
        is_flexible: job.is_flexible,
        is_urgent: job.is_urgent,
        extras: job.extras,
        customer_total_price: job.customer_total_price,
        payment_status: job.payment_status,
        payment_status_label: formatStatus(job.payment_status),
        job_status: job.job_status,
        job_status_label: formatStatus(job.job_status),
        cleaner_assigned: cleanerAssigned,
        payment_paid: paymentPaid,
        estimated_hours: job.estimated_hours,
        customer_stage: getCustomerStage(job),
        can_pay: canPay
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to check booking status." },
      { status: 500 }
    );
  }
}
