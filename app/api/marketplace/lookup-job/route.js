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

  const savedLastTen = savedPhone.slice(-10);
  const enteredLastTen = enteredPhone.slice(-10);

  return savedLastTen === enteredLastTen;
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
      .select("*")
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
            "The phone number does not match this booking reference. You can use either 07 or +44 format. Please check the details or contact WMC."
        },
        { status: 401 }
      );
    }

    if (!job.customer_total_price || Number(job.customer_total_price) <= 0) {
      return NextResponse.json(
        {
          error:
            "This booking does not have a valid selected provider payment amount yet. Please choose an available provider quote before paying WMC securely."
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      job: {
        id: job.id,
        quote_reference: job.quote_reference,
        customer_name: job.customer_name,
        customer_email: job.customer_email,
        customer_phone: job.customer_phone,
        service_type: job.service_type,
        postcode: job.postcode,
        preferred_date: job.preferred_date,
        preferred_time: job.preferred_time,
        customer_total_price: job.customer_total_price,
        wmc_fee_amount: job.wmc_fee_amount,
        cleaner_payout: job.cleaner_payout,
        payment_status: job.payment_status,
        job_status: job.job_status
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to look up booking request." },
      { status: 500 }
    );
  }
}
