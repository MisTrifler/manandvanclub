import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

function clean(value) {
  return String(value || "").trim();
}

function isAuthorised(request) {
  const submitted = request.headers.get("x-wmc-admin-password") || request.headers.get("x-admin-password") || "";
  const expected = process.env.WMC_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";
  return Boolean(expected && submitted && submitted === expected);
}

export async function GET(request) {
  if (!isAuthorised(request)) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  const status = clean(request.nextUrl.searchParams.get("status"));
  let query = supabaseAdmin.from("job_issues").select("*").order("created_at", { ascending: false });
  if (status) query = query.eq("issue_status", status);

  const { data, error } = await query.limit(100);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, issues: data || [] });
}

export async function PATCH(request) {
  if (!isAuthorised(request)) {
    return NextResponse.json({ error: "Not authorised." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = clean(body.id);
    const status = clean(body.status || body.issue_status);
    const adminNotes = clean(body.adminNotes || body.admin_notes);

    if (!id || !["open", "resolved", "closed"].includes(status)) {
      return NextResponse.json({ error: "Please provide an issue ID and valid status." }, { status: 400 });
    }

    const payload = {
      issue_status: status,
      admin_notes: adminNotes || null,
      resolved_at: status === "resolved" || status === "closed" ? new Date().toISOString() : null
    };

    const { data: issue, error: issueError } = await supabaseAdmin
      .from("job_issues")
      .update(payload)
      .eq("id", id)
      .select("*")
      .single();

    if (issueError) return NextResponse.json({ error: issueError.message }, { status: 500 });

    if (issue.job_id) {
      const jobUpdate =
        status === "open"
          ? {
              issue_status: "open",
              has_open_issue: true,
              payout_on_hold: true,
              payout_hold_reason: issue.issue_type || "Open customer issue"
            }
          : {
              issue_status: "resolved",
              issue_resolved_at: new Date().toISOString(),
              has_open_issue: false,
              payout_on_hold: false,
              payout_hold_reason: null,
              job_status: "payout_ready"
            };

      await supabaseAdmin.from("cleaning_jobs").update(jobUpdate).eq("id", issue.job_id);
    }

    return NextResponse.json({ success: true, issue });
  } catch (error) {
    return NextResponse.json({ error: error?.message || "Unable to update issue." }, { status: 500 });
  }
}
