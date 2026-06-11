import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { cookies } from "next/headers";
import { DRIVER_COOKIE_NAME, isValidDriverSession } from "@/lib/driver-auth";
import { resend } from "@/lib/resend";
import { calculateBookingDeposit, calculateRemainingMoverBalance, formatPounds, normaliseQuoteAmount } from "@/lib/booking-fee";
import { generateCustomerQuoteToken } from "@/lib/customer-token";
import { escapeHtml, escapeHtmlWithLineBreaks } from "@/lib/html";
import {
  formatUKPostcode,
  formatDisplayDate,
  formatMoveType,
} from "@/lib/formatting";

const SENDER_ADDRESS = "Man and Van Club <support@manandvanclub.co.uk>";
const QUOTE_EXPIRY_HOURS = 24;
const ALLOWED_QUOTE_STATUSES = new Set(["available", "verified", "active"]);

async function generateUniqueCustomerQuoteToken(supabaseAdmin: ReturnType<typeof getSupabaseAdmin>) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const token = generateCustomerQuoteToken();
    const { data, error } = await supabaseAdmin
      .from("move_requests")
      .select("id")
      .eq("customer_quote_token", token)
      .maybeSingle();

    if (error) throw error;
    if (!data) return token;
  }
  throw new Error("Could not generate a unique customer quote token.");
}

function cleanQuoteMessage(value: unknown): string | null {
  const message = String(value || "").trim();
  if (!message) return null;
  return message.slice(0, 1000);
}

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(DRIVER_COOKIE_NAME)?.value;
    const driverEmail = isValidDriverSession(token);

    if (!driverEmail) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data: driver } = await supabaseAdmin
      .from("driver_applications")
      .select("id, email, contact_name, status")
      .eq("email", driverEmail)
      .single();

    if (!driver || driver.status !== "approved") {
      return NextResponse.json({ error: "Mover not approved" }, { status: 403 });
    }

    const body = await req.json();
    const requestId = String(body.requestId || "").trim();
    const quoteAmount = normaliseQuoteAmount(body.quoteAmount);
    const quoteMessage = cleanQuoteMessage(body.quoteMessage);

    if (!requestId) {
      return NextResponse.json({ error: "Missing requestId" }, { status: 400 });
    }

    const { data: lead, error: fetchError } = await supabaseAdmin
      .from("move_requests")
      .select("*")
      .eq("id", requestId)
      .single();

    if (fetchError || !lead) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    if (!lead.is_verified) {
      return NextResponse.json({ error: "Request is not verified yet." }, { status: 409 });
    }

    if (lead.booking_fee_paid === true || lead.status === "booked" || lead.status === "locked") {
      return NextResponse.json({ error: "This request is no longer available." }, { status: 409 });
    }

    if (lead.status === "quoted" || lead.quoted_by || lead.quote_amount) {
      return NextResponse.json({ error: "A mover has already submitted a quote for this request." }, { status: 409 });
    }

    const status = lead.status || "";
    if (status && !ALLOWED_QUOTE_STATUSES.has(status)) {
      return NextResponse.json({ error: "This request is not available for quoting." }, { status: 409 });
    }

    const bookingDeposit = calculateBookingDeposit(quoteAmount);
    const remainingMoverBalance = calculateRemainingMoverBalance(quoteAmount, bookingDeposit);
    const quoteToken = await generateUniqueCustomerQuoteToken(supabaseAdmin);
    const now = new Date();
    const quotedAt = now.toISOString();
    const quoteExpiresAt = new Date(now.getTime() + QUOTE_EXPIRY_HOURS * 60 * 60 * 1000).toISOString();

    const { data: updatedLead, error: updateError } = await supabaseAdmin
      .from("move_requests")
      .update({
        quote_amount: quoteAmount,
        quote_message: quoteMessage,
        quoted_by: driverEmail,
        quoted_at: quotedAt,
        quote_expires_at: quoteExpiresAt,
        booking_fee: bookingDeposit,
        customer_quote_token: quoteToken,
        customer_quote_token_created_at: quotedAt,
        booking_fee_paid: false,
        status: "quoted",
      })
      .eq("id", requestId)
      .eq("is_verified", true)
      .in("status", ["available", "verified", "active"])
      .is("quoted_by", null)
      .is("quote_amount", null)
      .or("booking_fee_paid.is.null,booking_fee_paid.eq.false")
      .select("*")
      .single();

    if (updateError || !updatedLead) {
      console.error("[submit-quote] Quote update failed or request changed state.");
      return NextResponse.json(
        { error: "Failed to submit quote. Another mover may have quoted this request first." },
        { status: 409 },
      );
    }

    if (process.env.RESEND_API_KEY && updatedLead.email) {
      const moveType = formatMoveType(updatedLead.move_type);
      const colPostcode = formatUKPostcode(updatedLead.collection_postcode);
      const delPostcode = formatUKPostcode(updatedLead.delivery_postcode);
      const moveDate = formatDisplayDate(updatedLead.move_date);
      const reviewUrl = `${process.env.NEXT_PUBLIC_URL || "https://www.manandvanclub.co.uk"}/quote-review/${quoteToken}`;
      const messageHtml = quoteMessage
        ? `<p style="margin:0 0 12px;color:#0F172A;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Mover message</p>
           <p style="margin:0 0 24px;color:#475569;font-size:16px;line-height:1.6;font-style:italic;">${escapeHtmlWithLineBreaks(quoteMessage)}</p>`
        : "";

      const { error: emailError } = await resend.emails.send({
        from: SENDER_ADDRESS,
        to: [updatedLead.email],
        subject: "Your Man and Van Club quote is ready",
        replyTo: "support@manandvanclub.co.uk",
        html: `
          <!DOCTYPE html>
          <html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="margin:0;padding:0;background:#F9F9F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background:#F9F9F7;padding:40px 20px;"><tr><td align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.05);border:1px solid #E2E8F0;">
                <tr><td style="padding:40px 40px 20px;text-align:center;">
                  <div style="background:#0F172A;display:inline-block;padding:12px 20px;border-radius:12px;margin-bottom:24px;"><span style="color:#fff;font-weight:900;font-size:24px;letter-spacing:-1px;">M&amp;V</span></div>
                  <h1 style="margin:0;color:#0F172A;font-size:28px;font-weight:900;letter-spacing:-0.5px;">Your Man and Van Club Quote Is Ready</h1>
                </td></tr>
                <tr><td style="padding:0 40px 40px;text-align:center;">
                  <p style="margin:0 0 24px;color:#475569;font-size:18px;line-height:1.6;">Hi ${escapeHtml(updatedLead.first_name || "there")},</p>
                  <p style="margin:0 0 24px;color:#475569;font-size:16px;line-height:1.6;">A vetted local mover has reviewed your request and provided a quote.</p>
                  <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:16px;padding:24px;margin-bottom:32px;text-align:left;">
                    <p style="margin:0 0 12px;color:#0F172A;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Mover total quote</p>
                    <p style="margin:0 0 16px;color:#0F172A;font-size:32px;font-weight:900;">${formatPounds(quoteAmount)}</p>
                    <p style="margin:0 0 8px;color:#475569;font-size:15px;line-height:1.6;"><strong>Booking deposit to secure quote:</strong> ${formatPounds(bookingDeposit)}</p>
                    <p style="margin:0 0 8px;color:#475569;font-size:15px;line-height:1.6;"><strong>Pay mover on moving day:</strong> ${formatPounds(remainingMoverBalance)}</p>
                    <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.6;"><strong>Total move cost:</strong> ${formatPounds(quoteAmount)}</p>
                    ${messageHtml}
                    <p style="margin:0 0 12px;color:#0F172A;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Move details</p>
                    <p style="margin:0 0 8px;color:#475569;font-size:16px;font-weight:500;">${escapeHtml(moveType)}</p>
                    <p style="margin:0 0 8px;color:#475569;font-size:16px;font-weight:500;">${escapeHtml(colPostcode || "—")} to ${escapeHtml(delPostcode || "—")}</p>
                    <p style="margin:0;color:#475569;font-size:16px;font-weight:500;">${escapeHtml(moveDate || "—")}</p>
                  </div>
                  <div style="background:#F0FDF4;border-left:4px solid #22C55E;padding:16px;margin-bottom:32px;text-align:left;">
                    <p style="margin:0;color:#166534;font-size:15px;line-height:1.6;"><strong>Booking deposit:</strong> ${formatPounds(bookingDeposit)}</p>
                    <p style="margin:8px 0 0;color:#166534;font-size:14px;line-height:1.6;">Pay the booking deposit today to secure this quote and release your details to the mover.</p>
                    <p style="margin:8px 0 0;color:#166534;font-size:14px;line-height:1.6;">Your booking deposit is deducted from the mover’s quote, so your total move cost stays at ${formatPounds(quoteAmount)}. You pay the remaining balance directly to the mover on moving day.</p>
                  </div>
                  <p style="margin:0 0 24px;color:#64748B;font-size:14px;line-height:1.6;">This quote is based on the details provided. It may only change if the move details were incomplete, inaccurate or later changed.</p>
                  <a href="${reviewUrl}" style="display:inline-block;background:#F97316;color:#fff;padding:16px 32px;text-align:center;text-decoration:none;font-weight:900;border-radius:12px;font-size:16px;">Review Your Quote</a>
                  <p style="margin:24px 0 0;color:#94A3B8;font-size:12px;line-height:1.6;">If you do not want to proceed, you can decline the quote on the review page.</p>
                </td></tr>
              </table>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;"><tr><td style="padding:32px;text-align:center;"><p style="margin:0;color:#94A3B8;font-size:12px;font-weight:600;">Man and Van Club</p><p style="margin:0;color:#CBD5E1;font-size:11px;">support@manandvanclub.co.uk</p></td></tr></table>
            </td></tr></table>
          </body></html>
        `,
      });

      if (emailError) {
        console.error("[submit-quote] Customer quote email failed:", emailError.message);
      }
    }

    return NextResponse.json({ success: true, bookingDeposit, remainingMoverBalance, quoteExpiresAt });
  } catch (error: any) {
    console.error("[submit-quote] Server error:", error?.message || "Unknown error");
    return NextResponse.json({ error: error?.message || "Server error" }, { status: 500 });
  }
}
