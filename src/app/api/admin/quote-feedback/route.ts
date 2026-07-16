import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { QUOTE_CLEAR_FIELDS } from "@/lib/quote-feedback";
import { resend, SENDER_ADDRESS, REPLY_TO_ADDRESS } from "@/lib/resend";
import { escapeHtml } from "@/lib/html";
// Admin decision on customer quote feedback.
// Actions: release_to_pool | close_request | contact_customer

export async function POST(req: Request) {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidAdminSession(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const requestId = String(body.requestId || "").trim();
    const action = String(body.action || "").trim();
    const adminNote = String(body.adminNote || "").trim().slice(0, 2000);

    if (!requestId || !["release_to_pool", "close_request", "contact_customer"].includes(action)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { data: lead } = await supabaseAdmin
      .from("move_requests")
      .select("*")
      .eq("id", requestId)
      .single();
    if (!lead) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    const reviewableStatuses = ["quote_feedback_pending", "quote_feedback_received", "declined", "expired"];
    if (!reviewableStatuses.includes(String(lead.status || ""))) {
      return NextResponse.json({ error: "This request is not awaiting feedback review." }, { status: 409 });
    }
    if (lead.status === "booked" || lead.booking_fee_paid === true || lead.customer_details_released_at) {
      return NextResponse.json({ error: "This request has already been booked." }, { status: 409 });
    }

    const nowIso = new Date().toISOString();

    if (action === "release_to_pool") {
      const { error } = await supabaseAdmin
        .from("move_requests")
        .update({
          status: "available",
          ...QUOTE_CLEAR_FIELDS,
          quote_feedback_admin_decision: "release_to_pool",
          quote_feedback_admin_reviewed_at: nowIso,
          quote_feedback_released_at: nowIso,
          quote_feedback_admin_notes: adminNote || lead.quote_feedback_admin_notes,
        })
        .eq("id", requestId)
        .or("booking_fee_paid.is.null,booking_fee_paid.eq.false");
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });

      // Notify ALL approved drivers when a request is released back
      if (process.env.RESEND_API_KEY && lead.quote_feedback_still_needs_help !== false) {
        try {
          const { data: approvedDrivers } = await supabaseAdmin
            .from("driver_applications")
            .select("*")
            .eq("status", "approved");
          // Send to every approved driver — no area filtering on notifications
          const notifyDrivers = (approvedDrivers || []).filter((driver: any) => driver.email);

          const budgetLine = Number(lead.quote_feedback_budget_max) > 0
            ? `<p><strong>Preferred budget range:</strong> ${Number(lead.quote_feedback_budget_min) > 0 ? `£${Math.round(lead.quote_feedback_budget_min)}–` : "up to "}£${Math.round(lead.quote_feedback_budget_max)}</p>`
            : "";
          const reasonLine = lead.quote_feedback_reason
            ? `<p><strong>Customer feedback:</strong> ${escapeHtml(lead.quote_feedback_reason)}</p>`
            : "";

          for (const driver of notifyDrivers) {
            try {
              await resend.emails.send({
                from: SENDER_ADDRESS,
                to: [driver.email],
                replyTo: REPLY_TO_ADDRESS,
                subject: "Customer request available again",
                html: `
                  <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
                    <h2 style="color: #0F172A;">Customer Request Available Again</h2>
                    <p>Hi ${escapeHtml(driver.contact_name || "there")},</p>
                    <p>A customer request is available again after review.</p>
                    <div style="background: #F8FAFC; padding: 20px; border-radius: 10px; margin: 20px 0;">
                      <p><strong>Move:</strong> ${escapeHtml(lead.move_type || "Move")}</p>
                      <p><strong>Route:</strong> ${escapeHtml(lead.collection_postcode || "—")} → ${escapeHtml(lead.delivery_postcode || "—")}</p>
                      <p><strong>Date:</strong> ${escapeHtml(lead.move_date || "—")}</p>
                      ${reasonLine}
                      ${budgetLine}
                    </div>
                    <p>Review the move details in your driver portal and submit quote options if you can help.</p>
                    <a href="https://www.manandvanclub.co.uk/marketplace" style="display: block; background: #F97316; color: white; padding: 15px; text-align: center; text-decoration: none; font-weight: bold; border-radius: 8px;">View Request in Marketplace</a>
                    <p style="font-size: 12px; color: #94A3B8; margin-top: 20px;">© 2026 Man and Van Club</p>
                  </div>
                `,
              });
            } catch { /* per-driver email failure is non-blocking */ }
          }
        } catch { /* notification failure must not fail the release */ }
      }

      return NextResponse.json({ success: true, status: "available" });
    }

    if (action === "close_request") {
      const { error } = await supabaseAdmin
        .from("move_requests")
        .update({
          status: "closed",
          quote_feedback_admin_decision: "close_request",
          quote_feedback_admin_reviewed_at: nowIso,
          quote_feedback_admin_notes: adminNote || lead.quote_feedback_admin_notes,
        })
        .eq("id", requestId);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true, status: "closed" });
    }

    // contact_customer
    const { error } = await supabaseAdmin
      .from("move_requests")
      .update({
        quote_feedback_admin_decision: "contact_customer",
        quote_feedback_admin_reviewed_at: nowIso,
        quote_feedback_admin_notes: adminNote || lead.quote_feedback_admin_notes,
      })
      .eq("id", requestId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, decision: "contact_customer" });
  } catch (error: any) {
    console.error("[admin/quote-feedback] error:", error?.message || "unknown");
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
