import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import {
  sendBusinessAssignmentApprovedEmail,
  sendCleanerAssignmentEmails,
  sendNewJobOpportunityEmails
} from "../../../../lib/wmcEmails";

function isAdmin(request) {
  const adminPassword = process.env.WMC_ADMIN_PASSWORD;
  const requestPassword = request.headers.get("x-wmc-admin-password");

  return Boolean(adminPassword && requestPassword && requestPassword === adminPassword);
}

function cleanNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return null;
  }

  return Math.round(number * 100) / 100;
}

export async function GET(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  const { data: jobs, error: jobsError } = await supabaseAdmin
    .from("cleaning_jobs")
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
      ),
      business_job_interests!business_job_interests_job_id_fkey (
        id,
        created_at,
        interest_status,
        cleaner_name,
        cleaner_phone,
        business_message,
        business_partners (
          id,
          business_name,
          trading_name,
          contact_name,
          phone,
          email,
          status
        )
      )
    `
    )
    .order("created_at", { ascending: false });

  if (jobsError) {
    return NextResponse.json({ error: jobsError.message }, { status: 500 });
  }

  const { data: cleaners, error: cleanersError } = await supabaseAdmin
    .from("cleaner_partners")
    .select("id, full_name, business_name, phone, email, status")
    .eq("status", "approved")
    .order("full_name", { ascending: true });

  if (cleanersError) {
    return NextResponse.json({ error: cleanersError.message }, { status: 500 });
  }

  const { data: businesses, error: businessesError } = await supabaseAdmin
    .from("business_partners")
    .select("id, business_name, trading_name, contact_name, phone, email, status")
    .eq("status", "approved")
    .eq("is_active", true)
    .order("business_name", { ascending: true });

  if (businessesError) {
    return NextResponse.json({ error: businessesError.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    jobs: jobs || [],
    cleaners: cleaners || [],
    businesses: businesses || []
  });
}

export async function PATCH(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: "Missing job id" }, { status: 400 });
    }

    const allowedUpdates = {};

    const textFields = [
      "job_status",
      "payment_status",
      "assigned_cleaner_id",
      "assigned_business_partner_id",
      "assigned_business_interest_id",
      "business_team_lead_name",
      "business_team_lead_phone",
      "business_assignment_notes",
      "admin_notes"
    ];

    const numberFields = [
      "customer_total_price",
      "wmc_fee_percent",
      "wmc_fee_amount",
      "cleaner_payout",
      "estimated_hours",
      "business_payout"
    ];

    for (const field of textFields) {
      if (Object.prototype.hasOwnProperty.call(body, field)) {
        if (["assigned_cleaner_id", "assigned_business_partner_id", "assigned_business_interest_id"].includes(field)) {
          allowedUpdates[field] = body[field] || null;
        } else {
          allowedUpdates[field] = body[field];
        }
      }
    }

    for (const field of numberFields) {
      if (Object.prototype.hasOwnProperty.call(body, field)) {
        allowedUpdates[field] = cleanNumber(body[field]);
      }
    }

    if (Object.keys(allowedUpdates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const shouldCheckBusinessAssignment =
      Object.prototype.hasOwnProperty.call(allowedUpdates, "assigned_business_partner_id") ||
      Object.prototype.hasOwnProperty.call(allowedUpdates, "assigned_business_interest_id");

    const shouldCheckJobStatus = Object.prototype.hasOwnProperty.call(allowedUpdates, "job_status");

    let existingJob = null;

    if (shouldCheckBusinessAssignment || shouldCheckJobStatus) {
      const { data: previousJob, error: previousJobError } = await supabaseAdmin
        .from("cleaning_jobs")
        .select("id, assigned_business_partner_id, assigned_business_interest_id, job_status")
        .eq("id", body.id)
        .maybeSingle();

      if (previousJobError || !previousJob) {
        return NextResponse.json(
          { error: previousJobError?.message || "Existing job was not found." },
          { status: 404 }
        );
      }

      existingJob = previousJob;
    }

    const { data, error } = await supabaseAdmin
      .from("cleaning_jobs")
      .update(allowedUpdates)
      .eq("id", body.id)
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
        ),
        business_job_interests!business_job_interests_job_id_fkey (
          id,
          created_at,
          interest_status,
          cleaner_name,
          cleaner_phone,
          business_message,
          business_partners (
            id,
            business_name,
            trading_name,
            contact_name,
            phone,
            email,
            status
          )
        )
      `
      )
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (
      Object.prototype.hasOwnProperty.call(allowedUpdates, "assigned_business_interest_id") &&
      allowedUpdates.assigned_business_interest_id
    ) {
      await supabaseAdmin
        .from("business_job_interests")
        .update({ interest_status: "assigned" })
        .eq("id", allowedUpdates.assigned_business_interest_id);

      await supabaseAdmin
        .from("business_job_interests")
        .update({ interest_status: "not_selected" })
        .eq("job_id", body.id)
        .neq("id", allowedUpdates.assigned_business_interest_id);
    }

    let emailResults = null;
    let businessEmailResults = null;
    let opportunityEmailResults = null;

    const jobBecameAvailable =
      shouldCheckJobStatus &&
      allowedUpdates.job_status === "available_to_cleaners" &&
      existingJob?.job_status !== "available_to_cleaners";

    if (jobBecameAvailable) {
      opportunityEmailResults = await sendNewJobOpportunityEmails({ job: data }).catch(
        (emailError) => ({
          sent: false,
          error: emailError?.message || "Provider opportunity emails failed."
        })
      );
    }

    if (
      Object.prototype.hasOwnProperty.call(allowedUpdates, "assigned_cleaner_id") &&
      allowedUpdates.assigned_cleaner_id
    ) {
      const { data: cleaner, error: cleanerError } = await supabaseAdmin
        .from("cleaner_partners")
        .select("id, full_name, business_name, phone, email, status")
        .eq("id", allowedUpdates.assigned_cleaner_id)
        .maybeSingle();

      if (cleanerError) {
        emailResults = {
          cleaner: { sent: false, error: cleanerError.message },
          customer: { sent: false, error: "Cleaner lookup failed." }
        };
      } else {
        emailResults = await sendCleanerAssignmentEmails({ job: data, cleaner }).catch(
          (emailError) => ({
            cleaner: {
              sent: false,
              error: emailError?.message || "Cleaner assignment email failed."
            },
            customer: {
              sent: false,
              error: emailError?.message || "Customer assignment update email failed."
            }
          })
        );
      }
    }

    const businessAssignmentChanged =
      shouldCheckBusinessAssignment &&
      data.assigned_business_partner_id &&
      existingJob?.assigned_business_partner_id !== data.assigned_business_partner_id;

    if (businessAssignmentChanged) {
      const { data: business, error: businessError } = await supabaseAdmin
        .from("business_partners")
        .select("*")
        .eq("id", data.assigned_business_partner_id)
        .maybeSingle();

      let interest = null;

      if (data.assigned_business_interest_id) {
        const { data: interestData } = await supabaseAdmin
          .from("business_job_interests")
          .select("*")
          .eq("id", data.assigned_business_interest_id)
          .maybeSingle();

        interest = interestData;
      }

      if (businessError || !business) {
        businessEmailResults = {
          business: { sent: false, error: businessError?.message || "Business lookup failed." }
        };
      } else {
        businessEmailResults = {
          business: await sendBusinessAssignmentApprovedEmail({
            job: data,
            business,
            interest
          }).catch((emailError) => ({
            sent: false,
            error: emailError?.message || "Business assignment approval email failed."
          }))
        };
      }
    }

    return NextResponse.json({
      success: true,
      job: data,
      email_results: emailResults,
      business_email_results: businessEmailResults,
      opportunity_email_results: opportunityEmailResults
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to update job" },
      { status: 500 }
    );
  }
}
