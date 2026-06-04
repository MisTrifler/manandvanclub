import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { sendBusinessApprovedEmail } from "../../../../lib/wmcEmails";

export const runtime = "nodejs";

function isAdmin(request) {
  const adminPassword = process.env.WMC_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
  const requestPassword = request.headers.get("x-wmc-admin-password") || request.headers.get("x-admin-password");
  return Boolean(adminPassword && requestPassword && requestPassword === adminPassword);
}

function clean(value) {
  return String(value || "").trim();
}

export async function GET(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("business_partners")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, businesses: data || [] });
}

export async function PATCH(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = clean(body.id);

    if (!id) {
      return NextResponse.json({ error: "Missing business id" }, { status: 400 });
    }

    const allowedUpdates = {};
    const fields = ["status", "admin_notes", "is_active"];

    for (const field of fields) {
      if (Object.prototype.hasOwnProperty.call(body, field)) {
        allowedUpdates[field] = body[field];
      }
    }

    if (Object.keys(allowedUpdates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const { data: existingBusiness, error: existingError } = await supabaseAdmin
      .from("business_partners")
      .select("id, status, is_active, email")
      .eq("id", id)
      .maybeSingle();

    if (existingError || !existingBusiness) {
      return NextResponse.json(
        { error: existingError?.message || "Business partner was not found." },
        { status: 404 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("business_partners")
      .update(allowedUpdates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    let emailResult = null;

    const wasAlreadyApproved = existingBusiness.status === "approved" && existingBusiness.is_active === true;
    const isNowApproved = data.status === "approved" && data.is_active === true;

    if (!wasAlreadyApproved && isNowApproved) {
      emailResult = await sendBusinessApprovedEmail({ business: data }).catch((emailError) => ({
        sent: false,
        error: emailError?.message || "Business approval email failed."
      }));
    }

    return NextResponse.json({ success: true, business: data, email_result: emailResult });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to update business partner." },
      { status: 500 }
    );
  }
}
