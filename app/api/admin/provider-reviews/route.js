import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const runtime = "nodejs";

function isAdmin(request) {
  const adminPassword = process.env.WMC_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || process.env.ADMIN_SECRET;
  const requestPassword =
    request.headers.get("x-wmc-admin-password") ||
    request.headers.get("x-admin-password") ||
    request.headers.get("x-admin-secret");

  return Boolean(adminPassword && requestPassword && requestPassword === adminPassword);
}

function clean(value) {
  return String(value || "").trim();
}

function reviewStatus(value) {
  const status = clean(value).toLowerCase();
  return ["pending", "approved", "hidden"].includes(status) ? status : null;
}

export async function GET(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = reviewStatus(searchParams.get("status")) || null;

  let query = supabaseAdmin
    .from("provider_reviews")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, reviews: data || [] });
}

export async function PATCH(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = clean(body.id);
    const status = reviewStatus(body.status);
    const adminNotes = clean(body.adminNotes || body.admin_notes);

    if (!id) {
      return NextResponse.json({ error: "Missing review id." }, { status: 400 });
    }

    if (!status) {
      return NextResponse.json({ error: "Review status must be pending, approved or hidden." }, { status: 400 });
    }

    const updatePayload = {
      status,
      updated_at: new Date().toISOString(),
      admin_notes: adminNotes || null
    };

    if (status === "approved") {
      updatePayload.approved_at = new Date().toISOString();
      updatePayload.hidden_at = null;
    }

    if (status === "hidden") {
      updatePayload.hidden_at = new Date().toISOString();
    }

    if (status === "pending") {
      updatePayload.approved_at = null;
      updatePayload.hidden_at = null;
    }

    const { data, error } = await supabaseAdmin
      .from("provider_reviews")
      .update(updatePayload)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, review: data });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to update review." },
      { status: 500 }
    );
  }
}
