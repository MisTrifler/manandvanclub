import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { resend, SENDER_ADDRESS, REPLY_TO_ADDRESS } from "@/lib/resend";
import { escapeHtml } from "@/lib/html";
import { calculateCustomerNoShowCompensation, NO_SHOW_DISPUTE_WINDOW_HOURS } from "@/lib/no-show";
import { formatPounds } from "@/lib/booking-fee";

// Admin no-show review actions. NO automatic payouts or refunds —
// approval records suggested amounts for MANUAL handling only.
// Actions: notify_customer | approve | reject | mark_paid

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
    const payoutReference = String(body.payoutReference || "").trim().slice(0, 200);

    if (!requestId || !["notify_customer", "approve", "reject", "mark_paid"].includes(action)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { data: lead, error: fetchError } = await supabaseAdmin
      .from("move_requests")
      .select("*")
      .eq("id", requestId)
      .single();
    if (fetchError || !lead) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const now = new Date();
    const nowIso = now.toISOString();
    const status = lead.customer_no_show_status;

    // ── A. Notify customer / open 48h dispute window ─────────────────
    if (action === "notify_customer") {
      if (status !== "reported") {
        return NextResponse.json({ error: "Report must be in 'reported' state to notify the customer." }, { status: 409 });
      }
      const disputeUntil = new Date(now.getTime() + NO_SHOW_DISPUTE_WINDOW_HOURS * 3600 * 1000).toISOString();

      const { error } = await supabaseAdmin
        .from("move_requests")
        .update({
          customer_no_show_status: "customer_notified",
          customer_no_show_customer_dispute_until: disputeUntil,
          customer_no_show_admin_notes: adminNote || lead.customer_no_show_admin_notes,
        })
        .eq("id", requestId)
        .eq("customer_no_show_status", "reported");
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });

      if (process.env.RESEND_API_KEY && lead.email) {
        const siteUrl = process.env.NEXT_PUBLIC_URL || "https://www.manandvanclub.co.uk";
        const disputeUrl = `${siteUrl}/no-show-dispute/${lead.customer_quote_token || ""}`;
        await resend.emails.send({
          from: SENDER_ADDRESS,
          to: [lead.email],
          replyTo: REPLY_TO_ADDRESS,
          subject: "Customer no-show reported for your booking",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
              <div style="text-align: center; margin-bottom: 30px;"><span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M&amp;V</span></div>
              <h2 style="color: #0F172A; font-size: 24px; margin: 0 0 20px 0;">Customer No-Show Reported</h2>
              <p style="color: #475569; font-size: 16px;">Hi ${escapeHtml(lead.first_name || "there")},</p>
              <p style="color: #475569; font-size: 16px;">Your mover has reported that they attended the agreed collection postcode for your booking but could not reach you or complete the move.</p>
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <p style="margin: 0 0 8px 0;"><strong>Move:</strong> ${escapeHtml(lead.move_type || "Move")}</p>
                <p style="margin: 0 0 8px 0;"><strong>Route:</strong> ${escapeHtml(lead.collection_postcode || "—")} to ${escapeHtml(lead.delivery_postcode || "—")}</p>
                <p style="margin: 0 0 8px 0;"><strong>Move date:</strong> ${escapeHtml(lead.move_date || "—")}</p>
                <p style="margin: 0 0 8px 0;"><strong>Mover wait time:</strong> ${escapeHtml(String(lead.customer_no_show_wait_minutes || "—"))} minutes</p>
                <p style="margin: 0;"><strong>Contact attempts:</strong> ${escapeHtml(String(lead.customer_no_show_contact_attempts || "—"))} calls plus text/WhatsApp</p>
              </div>
              <p style="color: #475569; font-size: 16px;">Your deposit may be retained after review to cover reasonable attendance, travel, waiting time, reserved slot and admin costs. If approved, part of the retained deposit may be paid to the mover as no-show compensation.</p>
              <p style="color: #475569; font-size: 16px;">If this is incorrect, you can dispute the report within 48 hours using the link below.</p>
              <a href="${disputeUrl}" style="display: inline-block; background: #F97316; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;">Dispute No-Show Report</a>
              <p style="color: #64748B; font-size: 14px;">If you do not dispute within 48 hours, Man and Van Club may approve the no-show report based on the information available.</p>
              <p style="color: #64748B; font-size: 14px; margin-top: 30px;">Man and Van Club<br />support@manandvanclub.co.uk</p>
            </div>
          `,
        });
      }
      return NextResponse.json({ success: true, status: "customer_notified", disputeUntil });
    }

    // ── B. Approve (suggested amounts recorded for MANUAL payout) ────
    if (action === "approve") {
      const disputeUntil = lead.customer_no_show_customer_dispute_until
        ? new Date(lead.customer_no_show_customer_dispute_until)
        : null;
      const windowPassed = disputeUntil ? now > disputeUntil : false;

      const allowed =
        (status === "customer_notified" && windowPassed) ||
        status === "disputed";
      if (!allowed) {
        return NextResponse.json(
          { error: "Approval requires the dispute window to have passed (or a reviewed dispute)." },
          { status: 409 }
        );
      }

      const deposit = Number(lead.booking_fee || 0);
      const comp = calculateCustomerNoShowCompensation(deposit);

      const { error } = await supabaseAdmin
        .from("move_requests")
        .update({
          customer_no_show_status: "approved",
          customer_no_show_admin_decision_at: nowIso,
          customer_no_show_admin_decision_by: "admin",
          customer_no_show_mover_compensation_amount: comp.moverCompensationAmount,
          customer_no_show_platform_retained_amount: comp.platformRetainedAmount,
          customer_no_show_payout_status: "pending_manual_payout",
          customer_no_show_admin_notes: adminNote || lead.customer_no_show_admin_notes,
        })
        .eq("id", requestId);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });

      if (process.env.RESEND_API_KEY && lead.quoted_by) {
        const { data: driver } = await supabaseAdmin
          .from("driver_applications").select("contact_name").eq("email", lead.quoted_by).single();
        await resend.emails.send({
          from: SENDER_ADDRESS,
          to: [lead.quoted_by],
          replyTo: REPLY_TO_ADDRESS,
          subject: "Customer no-show approved",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
              <div style="text-align: center; margin-bottom: 30px;"><span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M&amp;V</span></div>
              <h2 style="color: #0F172A; font-size: 24px; margin: 0 0 20px 0;">Customer No-Show Approved</h2>
              <p style="color: #475569; font-size: 16px;">Hi ${escapeHtml(driver?.contact_name || "there")},</p>
              <p style="color: #475569; font-size: 16px;">Your customer no-show report has been approved.</p>
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin: 24px 0;">
                <p style="margin: 0 0 8px 0;"><strong>Deposit paid by customer:</strong> ${formatPounds(comp.depositAmount)}</p>
                <p style="margin: 0 0 8px 0;"><strong>No-show compensation due to you:</strong> ${formatPounds(comp.moverCompensationAmount)}</p>
                <p style="margin: 0;"><strong>Platform retained amount:</strong> ${formatPounds(comp.platformRetainedAmount)}</p>
              </div>
              <p style="color: #475569; font-size: 16px;">This compensation is handled manually by Man and Van Club. We will arrange payment using your saved payout details or contact you if anything else is needed.</p>
              <p style="color: #64748B; font-size: 14px; margin-top: 30px;">Man and Van Club<br />support@manandvanclub.co.uk</p>
            </div>
          `,
        });
      }
      return NextResponse.json({ success: true, status: "approved", ...comp });
    }

    // ── C. Reject ─────────────────────────────────────────────────────
    if (action === "reject") {
      if (!status || ["approved", "rejected", "resolved"].includes(status)) {
        return NextResponse.json({ error: "This report cannot be rejected in its current state." }, { status: 409 });
      }
      const { error } = await supabaseAdmin
        .from("move_requests")
        .update({
          customer_no_show_status: "rejected",
          customer_no_show_admin_decision_at: nowIso,
          customer_no_show_admin_decision_by: "admin",
          customer_no_show_payout_status: "not_applicable",
          customer_no_show_admin_notes: adminNote || lead.customer_no_show_admin_notes,
        })
        .eq("id", requestId);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });

      if (process.env.RESEND_API_KEY && lead.quoted_by) {
        const { data: driver } = await supabaseAdmin
          .from("driver_applications").select("contact_name").eq("email", lead.quoted_by).single();
        await resend.emails.send({
          from: SENDER_ADDRESS,
          to: [lead.quoted_by],
          replyTo: REPLY_TO_ADDRESS,
          subject: "Customer no-show report reviewed",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
              <div style="text-align: center; margin-bottom: 30px;"><span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M&amp;V</span></div>
              <h2 style="color: #0F172A; font-size: 24px; margin: 0 0 20px 0;">No-Show Report Reviewed</h2>
              <p style="color: #475569; font-size: 16px;">Hi ${escapeHtml(driver?.contact_name || "there")},</p>
              <p style="color: #475569; font-size: 16px;">We have reviewed your customer no-show report. Based on the information available, it has not been approved.</p>
              ${adminNote ? `<div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; margin: 24px 0;"><p style="margin: 0;"><strong>Reason / admin note:</strong> ${escapeHtml(adminNote)}</p></div>` : ""}
              <p style="color: #475569; font-size: 16px;">If you believe important information is missing, please contact support.</p>
              <p style="color: #64748B; font-size: 14px; margin-top: 30px;">Man and Van Club<br />support@manandvanclub.co.uk</p>
            </div>
          `,
        });
      }
      return NextResponse.json({ success: true, status: "rejected" });
    }

    // ── D. Mark manual payout paid ────────────────────────────────────
    if (action === "mark_paid") {
      if (status !== "approved" || lead.customer_no_show_payout_status !== "pending_manual_payout") {
        return NextResponse.json({ error: "Payout can only be marked paid for approved reports pending manual payout." }, { status: 409 });
      }
      if (!payoutReference) {
        return NextResponse.json({ error: "A payout reference is required." }, { status: 400 });
      }
      const { error } = await supabaseAdmin
        .from("move_requests")
        .update({
          customer_no_show_payout_status: "paid_manually",
          customer_no_show_payout_reference: payoutReference,
        })
        .eq("id", requestId)
        .eq("customer_no_show_payout_status", "pending_manual_payout");
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true, payoutStatus: "paid_manually" });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error: any) {
    console.error("[admin/no-show] error:", error?.message || "unknown");
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
