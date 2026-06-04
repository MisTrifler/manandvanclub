import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

function normalisePhone(value) {
  const digits = String(value || "").replace(/\D/g, "");

  if (!digits) return "";

  if (digits.startsWith("0044")) {
    return `0${digits.slice(4)}`;
  }

  if (digits.startsWith("44")) {
    return `0${digits.slice(2)}`;
  }

  return digits;
}

function safePostcodeArea(postcode) {
  const clean = String(postcode || "").trim().toUpperCase();
  if (!clean) return "Postcode area not provided";
  return clean.split(" ")[0];
}

function protectJobDetails(job) {
  const detailsUnlocked = job.payment_status === "paid" && Boolean(job.assigned_business_partner_id);

  return {
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
    area_town: detailsUnlocked ? job.area_town : null,
    postcode: detailsUnlocked ? job.postcode : null,
    condition_level: job.condition_level,
    pets_at_property: job.pets_at_property,
    preferred_date: job.preferred_date,
    preferred_time: job.preferred_time,
    is_flexible: job.is_flexible,
    is_urgent: job.is_urgent,
    extras: job.extras,
    customer_total_price: job.customer_total_price,
    business_payout: job.business_payout ?? job.cleaner_payout,
    estimated_hours: job.estimated_hours,
    payment_status: job.payment_status,
    job_status: job.job_status,
    customer_details_unlocked: detailsUnlocked,
    customer_name: detailsUnlocked ? job.customer_name : null,
    customer_phone: detailsUnlocked ? job.customer_phone : null,
    customer_email: detailsUnlocked ? job.customer_email : null,
    notes: detailsUnlocked ? job.notes : null,
    access_notes: detailsUnlocked ? job.access_notes : null,
    parking_notes: detailsUnlocked ? job.parking_notes : null,
    business_team_lead_name: job.business_team_lead_name,
    business_team_lead_phone: job.business_team_lead_phone
  };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = normalisePhone(body.phone);

    if (!email || !phone) {
      return NextResponse.json(
        { error: "Please enter your approved business email and phone number." },
        { status: 400 }
      );
    }

    const { data: businesses, error: businessError } = await supabaseAdmin
      .from("business_partners")
      .select("*")
      .ilike("email", email)
      .eq("status", "approved")
      .eq("is_active", true)
      .limit(5);

    if (businessError) {
      return NextResponse.json(
        { error: `Business lookup failed: ${businessError.message}` },
        { status: 500 }
      );
    }

    const business = (businesses || []).find((item) => normalisePhone(item.phone) === phone);

    if (!business) {
      return NextResponse.json(
        { error: "Business access denied. Only approved WMC business partners can view assigned bookings." },
        { status: 401 }
      );
    }

    const { data: jobs, error: jobsError } = await supabaseAdmin
      .from("cleaning_jobs")
      .select("*")
      .eq("assigned_business_partner_id", business.id)
      .in("job_status", ["cleaner_assigned", "awaiting_payment", "paid", "in_progress", "completed", "payout_ready", "cancelled", "dispute"])
      .order("preferred_date", { ascending: true });

    if (jobsError) {
      return NextResponse.json(
        { error: `Assigned business jobs lookup failed: ${jobsError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      business: {
        id: business.id,
        business_name: business.business_name,
        trading_name: business.trading_name,
        contact_name: business.contact_name,
        email: business.email,
        phone: business.phone,
        status: business.status
      },
      jobs: (jobs || []).map(protectJobDetails)
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to load assigned business jobs." },
      { status: 500 }
    );
  }
}
