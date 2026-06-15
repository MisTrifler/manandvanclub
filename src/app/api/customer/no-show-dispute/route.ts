import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { resend, SENDER_ADDRESS, REPLY_TO_ADDRESS } from "@/lib/resend";
import { escapeHtml } from "@/lib/html";

// Customer disputes a reported no-show using their secure quote token.
// No automatic refund — admin reviews manually.

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = typeof body.token === "string" ? body.token.trim() : "";
    const reason = String(body.reason || "").trim().slice(0, 2000);

    if (!token || token.length < 16) {
      return NextResponse.json({ error: "Invalid link" }, { status: 400 });
    }
    if (reason.length < 20) {
      return NextResponse.json({ error: "Please describe what happened (at least 20 characters)." }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { data: lead, error: fetchError } = await supabaseAdmin
      .from("move_requests")
      .select("*")
      .eq("customer_quote_token", token)
      .single();
    if (fetchError || !lead) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (lead.customer_no_show_status !== "customer_notified") {
      return NextResponse.json({ error: "There is no open no-show report to dispute on this booking." }, { status: 409 });
    }

    const disputeUntil = lead.customer_no_show_customer_dispute_until
      ? new Date(lead.customer_no_show_customer_dispute_until)
      : null;
    if (!disputeUntil || Number.isNaN(disputeUntil.getTime()) || new Date() > disputeUntil) {
      return NextResponse.json(
        { error: "The dispute window has now closed. Please contact support if you believe there has been a serious error." },
        { status: 409 }
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from("move_requests")
      .update({
        customer_no_show_status: "disputed",
        customer_no_show_customer_disputed_at: new Date().toISOString(),
        customer_no_show_customer_dispute_reason: reason,
      })
      .eq("id", lead.id)
      .eq("customer_no_show_status", "customer_notified");
    if (updateError) {
      return NextResponse.json({ error: "Could not submit dispute. Please try again." }, { status: 500 });
    }

    if (process.env.RESEND_API_KEY && lead.email) {
      try {
        await resend.emails.send({
          from: SENDER_ADDRESS,
          to: [lead.email],
          replyTo: REPLY_TO_ADDRESS,
          subject: "We received your no-show dispute",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
              <div style="text-align: center; margin-bottom: 30px;"><span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M<span style="color:#F5781E;">&amp;</span>V</span></div>
              <h2 style="color: #0F172A; font-size: 24px; margin: 0 0 20px 0;">Dispute Received</h2>
              <p style="color: #475569; font-size: 16px;">Hi ${escapeHtml(lead.first_name || "there")},</p>
              <p style="color: #475569; font-size: 16px;">We have received your dispute about the reported customer no-show.</p>
              <p style="color: #475569; font-size: 16px;">Our team will review the information from you and the mover before making a decision. No further action is needed right now unless we contact you for more information.</p>
              <p style="color: #64748B; font-size: 14px; margin-top: 30px;">Man and Van Club<br />support@manandvanclub.co.uk</p>
            </div>
          `,
        });
      } catch {
        // non-blocking
      }
    }

    return NextResponse.json({ success: true, status: "disputed" });
  } catch (error: any) {
    console.error("[no-show-dispute] error:", error?.message || "unknown");
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
