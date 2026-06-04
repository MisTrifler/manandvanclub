import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

function normalisePhone(value) {
  return String(value || "")
    .replace(/\s+/g, "")
    .replace(/-/g, "")
    .trim();
}

function safePostcodeArea(postcode) {
  const clean = String(postcode || "").trim().toUpperCase();

  if (!clean) return "Postcode area not provided";

  return clean.split(" ")[0];
}

function protectJobDetails(job) {
  const isPaid = job.payment_status === "paid";

  const safeJob = {
    id: job.id,
    created_at: job.created_at,
    quote_reference: job.quote_reference,

    service_type: job.service_type,
    frequency: job.frequency,

    property_type: job.property_type,
    bedrooms: job.bedrooms,
    bathrooms: job.bathrooms,
    property_size: job.property_size,

    furnished_status: job.furnished_status,
    occupancy_status: job.occupancy_status,

    postcode_area: safePostcodeArea(job.postcode),
    area_town: isPaid ? job.area_town : null,
    postcode: isPaid ? job.postcode : null,

    condition_level: job.condition_level,
    pets_at_property: job.pets_at_property,

    preferred_date: job.preferred_date,
    preferred_time: job.preferred_time,
    is_flexible: job.is_flexible,
    is_urgent: job.is_urgent,

    extras: job.extras,

    customer_total_price: job.customer_total_price,
    wmc_fee_percent: job.wmc_fee_percent,
    wmc_fee_amount: job.wmc_fee_amount,
    cleaner_payout: job.cleaner_payout,
    price_band: job.price_band,
    estimated_hours: job.estimated_hours,

    payment_status: job.payment_status,
    job_status: job.job_status,

    customer_details_unlocked: isPaid,

    customer_name: isPaid ? job.customer_name : null,
    customer_phone: isPaid ? job.customer_phone : null,
    customer_email: isPaid ? job.customer_email : null,

    notes: isPaid ? job.notes : null,
    access_notes: isPaid ? job.access_notes : null,
    parking_notes: isPaid ? job.parking_notes : null
  };

  return safeJob;
}

export async function POST(request) {
  try {
    const body = await request.json();

    const email = String(body.email || "").trim().toLowerCase();
    const phone = normalisePhone(body.phone);

    if (!email || !phone) {
      return NextResponse.json(
        { error: "Please enter your approved cleaner email and phone number." },
        { status: 400 }
      );
    }

    const { data: cleaners, error: cleanerError } = await supabaseAdmin
      .from("cleaner_partners")
      .select("*")
      .ilike("email", email)
      .eq("status", "approved")
      .limit(5);

    if (cleanerError) {
      return NextResponse.json(
        { error: `Cleaner lookup failed: ${cleanerError.message}` },
        { status: 500 }
      );
    }

    const cleaner = (cleaners || []).find(
      (item) => normalisePhone(item.phone) === phone
    );

    if (!cleaner) {
      return NextResponse.json(
        {
          error:
            "Cleaner access denied. Only approved independent cleaner partners can view assigned bookings."
        },
        { status: 401 }
      );
    }

    const { data: jobs, error: jobsError } = await supabaseAdmin
      .from("cleaning_jobs")
      .select("*")
      .eq("assigned_cleaner_id", cleaner.id)
      .in("job_status", [
        "cleaner_assigned",
        "awaiting_payment",
        "paid",
        "in_progress",
        "completed",
        "cancelled",
        "dispute"
      ])
      .order("preferred_date", { ascending: true });

    if (jobsError) {
      return NextResponse.json(
        { error: `Assigned jobs lookup failed: ${jobsError.message}` },
        { status: 500 }
      );
    }

    const protectedJobs = (jobs || []).map(protectJobDetails);

    return NextResponse.json({
      success: true,
      cleaner: {
        id: cleaner.id,
        full_name: cleaner.full_name,
        business_name: cleaner.business_name,
        email: cleaner.email,
        phone: cleaner.phone,
        status: cleaner.status
      },
      jobs: protectedJobs
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to load assigned cleaner jobs." },
      { status: 500 }
    );
  }
}
