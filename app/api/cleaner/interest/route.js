import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

function normalisePhone(value) {
  return String(value || "")
    .replace(/\s+/g, "")
    .replace(/-/g, "")
    .trim();
}

export async function POST(request) {
  try {
    const body = await request.json();

    const email = String(body.email || "").trim().toLowerCase();
    const phone = normalisePhone(body.phone);
    const jobId = String(body.jobId || "").trim();
    const cleanerMessage = String(body.cleanerMessage || "").trim();

    if (!email || !phone || !jobId) {
      return NextResponse.json(
        { error: "Missing cleaner login details or job reference." },
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
            "Cleaner access denied. Only approved independent cleaner partners can show interest in booking opportunities."
        },
        { status: 401 }
      );
    }

    const { data: job, error: jobError } = await supabaseAdmin
      .from("cleaning_jobs")
      .select("id, job_status")
      .eq("id", jobId)
      .single();

    if (jobError || !job) {
      return NextResponse.json(
        { error: "This booking opportunity could not be found." },
        { status: 404 }
      );
    }

    if (!["available_to_cleaners", "cleaner_interested"].includes(job.job_status)) {
      return NextResponse.json(
        { error: "This booking opportunity is no longer available." },
        { status: 400 }
      );
    }

    const { data: interest, error: interestError } = await supabaseAdmin
      .from("cleaner_job_interests")
      .upsert(
        {
          job_id: jobId,
          cleaner_id: cleaner.id,
          interest_status: "interested",
          cleaner_message: cleanerMessage || null
        },
        {
          onConflict: "job_id,cleaner_id"
        }
      )
      .select()
      .single();

    if (interestError) {
      return NextResponse.json(
        { error: `Could not register interest: ${interestError.message}` },
        { status: 500 }
      );
    }

    await supabaseAdmin
      .from("cleaning_jobs")
      .update({ job_status: "cleaner_interested" })
      .eq("id", jobId);

    return NextResponse.json({
      success: true,
      interest
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to register interest." },
      { status: 500 }
    );
  }
}
