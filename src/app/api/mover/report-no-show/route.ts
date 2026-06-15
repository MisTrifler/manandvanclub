import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DRIVER_COOKIE_NAME, isValidDriverSession } from "@/lib/driver-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { resend, SENDER_ADDRESS, REPLY_TO_ADDRESS } from "@/lib/resend";
import { escapeHtml } from "@/lib/html";
import { NO_SHOW_MIN_WAIT_MINUTES, NO_SHOW_MIN_CONTACT_ATTEMPTS } from "@/lib/no-show";

// Mover reports a customer no-show on their own booked job.
// NO automatic payout, NO automatic refund — admin reviews manually.

export async function POST(req: Request) {
  try {
    const token = cookies().get(DRIVER_COOKIE_NAME)?.value;
    const driverEmail = isValidDriverSession(token);
    if (!driverEmail) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { data: driver } = await supabaseAdmin
      .from("driver_applications")
      .select("email, contact_name, status")
      .eq("email", driverEmail)
      .single();
    if (!driver || driver.status !== "approved") {
      return NextResponse.json({ error: "Mover not approved" }, { status: 403 });
    }

    const body = await req.json();
    const requestId = String(body.requestId || "").trim();
    const waitMinutes = Number(body.waitMinutes);
    const contactAttempts = Number(body.contactAttempts);
    const messageSent = body.messageSent === true;
    const notes = String(body.notes || "").trim().slice(0, 2000);
    const arrivalTime = String(body.arrivalTime || "").trim().slice(0, 50);

    if (!requestId) {
      return NextResponse.json({ error: "Missing requestId" }, { status: 400 });
    }
    if (!Number.isFinite(waitMinutes) || waitMinutes < NO_SHOW_MIN_WAIT_MINUTES) {
      return NextResponse.json({ error: `You must wait at least ${NO_SHOW_MIN_WAIT_MINUTES} minutes before reporting a no-show.` }, { status: 400 });
    }
    if (!Number.isFinite(contactAttempts) || contactAttempts < NO_SHOW_MIN_CONTACT_ATTEMPTS) {
      return NextResponse.json({ error: `At least ${NO_SHOW_MIN_CONTACT_ATTEMPTS} phone call attempts are required.` }, { status: 400 });
    }
    if (!messageSent) {
      return NextResponse.json({ error: "You must send at least one text or WhatsApp message before reporting a no-show." }, { status: 400 });
    }
    if (notes.length < 20) {
      return NextResponse.json({ error: "Please describe what happened (at least 20 characters)." }, { status: 400 });
    }

    const { data: lead, error: fetchError } = await supabaseAdmin
      .from("move_requests")
      .select("*")
      .eq("id", requestId)
      .single();
    if (fetchError || !lead) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Only the assigned mover, only on a paid booked job
    const isOwner = String(lead.quoted_by || "").toLowerCase().trim() === String(driverEmail).toLowerCase().trim();
    if (!isOwner) {
      return NextResponse.json({ error: "This booking is not assigned to you." }, { status: 403 });
    }
    if (lead.status !== "booked" || lead.booking_fee_paid !== true || !lead.customer_details_released_at) {
      return NextResponse.json({ error: "No-show reports are only available for confirmed bookings." }, { status: 409 });
    }
    if (lead.customer_no_show_status && lead.customer_no_show_status !== "rejected") {
      return NextResponse.json({ error: "A no-show report already exists for this booking." }, { status: 409 });
    }

    // Move date must be today or in the past
    if (lead.move_date) {
      const moveDay = new Date(lead.move_date);
      if (!Number.isNaN(moveDay.getTime())) {
        const today = new Date().toISOString().slice(0, 10);
        if (moveDay.toISOString().slice(0, 10) > today) {
          return NextResponse.json({ error: "You can only report a no-show on or after the move date." }, { status: 409 });
        }
      }
    }

    const now = new Date().toISOString();
    const evidenceNotes = arrivalTime ? `Arrival time: ${arrivalTime}. ${notes}` : notes;

    const { error: updateError } = await supabaseAdmin
      .from("move_requests")
      .update({
        customer_no_show_status: "reported",
        customer_no_show_reported_at: now,
        customer_no_show_reported_by: driverEmail,
        customer_no_show_wait_minutes: Math.round(waitMinutes),
        customer_no_show_contact_attempts: Math.round(contactAttempts),
        customer_no_show_message_sent: true,
        customer_no_show_evidence_notes: evidenceNotes,
      })
      .eq("id", requestId)
      .eq("status", "booked")
      .ilike("quoted_by", driverEmail);

    if (updateError) {
      if (updateError.code === "42703" || updateError.code === "PGRST204") {
        return NextResponse.json({ error: "No-show reporting is not enabled yet. Please contact support." }, { status: 503 });
      }
      return NextResponse.json({ error: "Could not save the report. Please try again." }, { status: 500 });
    }

    // Mover confirmation email (no automatic payout implied)
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: SENDER_ADDRESS,
          to: [driverEmail],
          replyTo: REPLY_TO_ADDRESS,
          subject: "Customer no-show report received",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
              <div style="text-align: center; margin-bottom: 30px;"><span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M<span style="color:#F5781E;">&amp;</span>V</span></div>
              <h2 style="color: #0F172A; font-size: 24px; margin: 0 0 20px 0;">Customer No-Show Report Received</h2>
              <p style="color: #475569; font-size: 16px;">Hi ${escapeHtml(driver.contact_name || "there")},</p>
              <p style="color: #475569; font-size: 16px;">We have received your customer no-show report.</p>
              <p style="color: #475569; font-size: 16px;">Our team will review the report. If approved, you may receive no-show compensation from the retained customer deposit.</p>
              <p style="color: #475569; font-size: 16px;">For launch, no-show compensation is handled manually by Man and Van Club.</p>
              <p style="color: #475569; font-size: 16px;">Please keep any call logs, messages or arrival evidence in case our team needs further information.</p>
              <p style="color: #64748B; font-size: 14px; margin-top: 30px;">Man and Van Club<br />support@manandvanclub.co.uk</p>
            </div>
          `,
        });
      } catch {
        // email failure must not fail the report
      }
    }

    return NextResponse.json({ success: true, status: "reported" });
  } catch (error: any) {
    console.error("[report-no-show] error:", error?.message || "unknown");
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
