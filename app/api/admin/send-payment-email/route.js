import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { sendSelectedProviderPaymentEmail } from "../../../../lib/wmcEmails";

function isAdmin(request) {
  const adminPassword = process.env.WMC_ADMIN_PASSWORD;
  const requestPassword = request.headers.get("x-wmc-admin-password");

  return Boolean(adminPassword && requestPassword && requestPassword === adminPassword);
}

export async function POST(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const jobId = body?.id;

    if (!jobId) {
      return NextResponse.json({ error: "Missing job id" }, { status: 400 });
    }

    const { data: job, error: jobError } = await supabaseAdmin
      .from("cleaning_jobs")
      .select("*")
      .eq("id", jobId)
      .single();

    if (jobError || !job) {
      return NextResponse.json(
        { error: jobError?.message || "Booking could not be found." },
        { status: 404 }
      );
    }

    if (!job.customer_email) {
      return NextResponse.json(
        { error: "This booking does not have a customer email address." },
        { status: 400 }
      );
    }

    const amount = Number(job.customer_total_price || 0);

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "This booking does not have a valid selected provider price yet." },
        { status: 400 }
      );
    }

    if (job.payment_status === "paid") {
      return NextResponse.json(
        { error: "This booking is already marked as paid." },
        { status: 400 }
      );
    }

    const emailResult = await sendSelectedProviderPaymentEmail(job);

    const { data: updatedJob, error: updateError } = await supabaseAdmin
      .from("cleaning_jobs")
      .update({ job_status: "awaiting_payment" })
      .eq("id", job.id)
      .select(
        `
        *,
        cleaner_job_interests (
          id,
          created_at,
          interest_status,
          cleaner_message,
          cleaner_partners (
            id,
            full_name,
            business_name,
            phone,
            email,
            status
          )
        )
      `
      )
      .single();

    if (updateError) {
      return NextResponse.json(
        {
          success: false,
          error: updateError.message,
          email_result: emailResult
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      job: updatedJob,
      email_result: emailResult
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to send selected-provider payment email." },
      { status: 500 }
    );
  }
}
