import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { sendAdminBusinessInterestEmail } from "../../../../lib/wmcEmails";

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

function clean(value) {
  return String(value || "").trim();
}

export async function POST(request) {
  try {
    const body = await request.json();
    const email = clean(body.email).toLowerCase();
    const phone = normalisePhone(body.phone);
    const jobId = clean(body.jobId);
    const cleanerName = clean(body.cleanerName);
    const cleanerPhone = clean(body.cleanerPhone);
    const businessMessage = clean(body.businessMessage);

    if (!email || !phone || !jobId || !cleanerName || !cleanerPhone) {
      return NextResponse.json(
        { error: "Please enter business login details, booking reference, cleaner name and cleaner phone." },
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
        { error: "Business access denied. Only approved WMC business partners can accept booking opportunities." },
        { status: 401 }
      );
    }

    const { data: job, error: jobError } = await supabaseAdmin
      .from("cleaning_jobs")
      .select("id, quote_reference, service_type, preferred_date, preferred_time, area_town, postcode, cleaner_payout, business_payout, job_status, assigned_business_partner_id")
      .eq("id", jobId)
      .single();

    if (jobError || !job) {
      return NextResponse.json({ error: "This booking opportunity could not be found." }, { status: 404 });
    }

    if (job.assigned_business_partner_id) {
      return NextResponse.json({ error: "This booking opportunity has already been assigned." }, { status: 400 });
    }

    if (!["available_to_cleaners", "cleaner_interested"].includes(job.job_status)) {
      return NextResponse.json({ error: "This booking opportunity is no longer available." }, { status: 400 });
    }

    const { data: interest, error: interestError } = await supabaseAdmin
      .from("business_job_interests")
      .upsert(
        {
          job_id: jobId,
          business_partner_id: business.id,
          interest_status: "interested",
          cleaner_name: cleanerName,
          cleaner_phone: cleanerPhone,
          business_message: businessMessage || null
        },
        { onConflict: "job_id,business_partner_id" }
      )
      .select()
      .single();

    if (interestError) {
      return NextResponse.json(
        { error: `Could not submit acceptance request: ${interestError.message}` },
        { status: 500 }
      );
    }

    await supabaseAdmin.from("cleaning_jobs").update({ job_status: "cleaner_interested" }).eq("id", jobId);

    const emailResult = await sendAdminBusinessInterestEmail({
      job,
      business,
      interest
    }).catch((emailError) => ({
      sent: false,
      error: emailError?.message || "Admin business interest email failed."
    }));

    return NextResponse.json({ success: true, interest, email_result: emailResult });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to submit business acceptance request." },
      { status: 500 }
    );
  }
}
