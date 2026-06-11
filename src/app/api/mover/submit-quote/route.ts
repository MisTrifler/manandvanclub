import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { cookies } from "next/headers";
import { DRIVER_COOKIE_NAME, isValidDriverSession } from "@/lib/driver-auth";
import { resend } from "@/lib/resend";
import { calculateBookingFee } from "@/lib/booking-fee";
import {
  formatUKPostcode,
  formatDisplayDate,
  formatMoveType,
} from "@/lib/formatting";

const SENDER_ADDRESS = "Man and Van Club <support@manandvanclub.co.uk>";

export async function POST(req: Request) {
  try {
    // 1. Authenticate driver
    const cookieStore = cookies();
    const token = cookieStore.get(DRIVER_COOKIE_NAME)?.value;
    const driverEmail = isValidDriverSession(token);

    if (!driverEmail) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // 2. Verify driver is approved
    const { data: driver } = await supabaseAdmin
      .from("driver_applications")
      .select("id, email, contact_name, status")
      .eq("email", driverEmail)
      .single();

    if (!driver || driver.status !== "approved") {
      return NextResponse.json({ error: "Driver not approved" }, { status: 403 });
    }

    // 3. Parse body
    const body = await req.json();
    const { requestId, quoteAmount, quoteMessage } = body;

    if (!requestId || typeof quoteAmount !== "number" || quoteAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid requestId or quote amount" },
        { status: 400 }
      );
    }

    // 4. Fetch move request
    const { data: lead } = await supabaseAdmin
      .from("move_requests")
      .select("*")
      .eq("id", requestId)
      .single();

    if (!lead) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    // 5. Guard: must be verified and not already booked/quoted/declined
    if (!lead.is_verified) {
      return NextResponse.json({ error: "Request not verified" }, { status: 400 });
    }

    const blockedStatuses = ["booked", "locked", "declined"];
    if (lead.status && blockedStatuses.includes(lead.status)) {
      return NextResponse.json(
        { error: "This request is no longer available for quoting" },
        { status: 409 }
      );
    }

    // Exclusive quoting: another mover's quote blocks this one
    if (
      lead.status === "quoted" &&
      lead.quoted_by &&
      lead.quoted_by.toLowerCase() !== driverEmail.toLowerCase()
    ) {
      return NextResponse.json(
        { error: "Another mover has already submitted a quote for this request" },
        { status: 409 }
      );
    }

    // 6. Calculate booking fee server-side
    const bookingFee = calculateBookingFee(quoteAmount);

    // 7. Save quote with an optimistic lock:
    //    - never overwrite booked / locked / declined requests
    //    - never overwrite another mover's quote (same mover may re-send)
    const { data: updatedRows, error: updateError } = await supabaseAdmin
      .from("move_requests")
      .update({
        quote_amount: quoteAmount,
        quote_message: quoteMessage || null,
        quoted_by: driverEmail,
        quoted_at: new Date().toISOString(),
        booking_fee: bookingFee,
        status: "quoted",
      })
      .eq("id", requestId)
      .not("status", "in", "(booked,locked,declined)")
      .or(`status.is.null,status.neq.quoted,quoted_by.eq."${driverEmail.replace(/"/g, "")}"`)
      .select("id");

    if (updateError) {
      console.error("[submit-quote] Update error:", updateError);
      return NextResponse.json(
        { error: "Failed to submit quote. Please try again." },
        { status: 500 }
      );
    }

    if (!updatedRows || updatedRows.length === 0) {
      return NextResponse.json(
        { error: "This request is no longer available. It may have been taken by another mover." },
        { status: 409 }
      );
    }

    // 8. Send quote email to customer
    if (process.env.RESEND_API_KEY && lead.email) {
      const moveType = formatMoveType(lead.move_type);
      const colPostcode = formatUKPostcode(lead.collection_postcode);
      const delPostcode = formatUKPostcode(lead.delivery_postcode);
      const moveDate = formatDisplayDate(lead.move_date);
      const reviewUrl = `${process.env.NEXT_PUBLIC_URL || "https://www.manandvanclub.co.uk"}/quote-review/${lead.customer_quote_token}`;

      const { error: emailError } = await resend.emails.send({
        from: SENDER_ADDRESS,
        to: [lead.email],
        subject: "Your Man and Van Club quote is ready",
        replyTo: "support@manandvanclub.co.uk",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin:0;padding:0;background:#F9F9F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background:#F9F9F7;padding:40px 20px;">
              <tr><td align="center">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.05);border:1px solid #E2E8F0;">
                  <tr>
                    <td style="padding:40px 40px 20px;text-align:center;">
                      <div style="background:#0F172A;display:inline-block;padding:12px 20px;border-radius:12px;margin-bottom:24px;">
                        <span style="color:#fff;font-weight:900;font-size:24px;letter-spacing:-1px;">M&amp;V</span>
                      </div>
                      <h1 style="margin:0;color:#0F172A;font-size:28px;font-weight:900;letter-spacing:-0.5px;">Your Quote Is Ready</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 40px 40px;text-align:center;">
                      <p style="margin:0 0 24px;color:#475569;font-size:18px;line-height:1.6;">Hi ${lead.first_name || "there"},</p>
                      <p style="margin:0 0 24px;color:#475569;font-size:16px;line-height:1.6;">A vetted local mover has reviewed your request and provided a quote.</p>

                      <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:16px;padding:24px;margin-bottom:32px;text-align:left;">
                        <p style="margin:0 0 12px;color:#0F172A;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Mover quote</p>
                        <p style="margin:0 0 24px;color:#0F172A;font-size:32px;font-weight:900;">£${quoteAmount.toFixed(2)}</p>

                        ${quoteMessage ? `<p style="margin:0 0 12px;color:#0F172A;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Mover message</p><p style="margin:0 0 24px;color:#475569;font-size:16px;line-height:1.6;font-style:italic;">${quoteMessage.replace(/</g, "&lt;").replace(/"/g, "&quot;")}</p>` : ""}

                        <p style="margin:0 0 12px;color:#0F172A;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Move details</p>
                        <p style="margin:0 0 8px;color:#475569;font-size:16px;font-weight:500;">${moveType}</p>
                        <p style="margin:0 0 8px;color:#475569;font-size:16px;font-weight:500;">${colPostcode || "—"} to ${delPostcode || "—"}</p>
                        <p style="margin:0;color:#475569;font-size:16px;font-weight:500;">${moveDate || "—"}</p>
                      </div>

                      <p style="margin:0 0 24px;color:#475569;font-size:16px;line-height:1.6;">To accept this quote and release your details to the mover, pay the booking fee.</p>

                      <div style="background:#F0FDF4;border-left:4px solid #22C55E;padding:16px;margin-bottom:32px;text-align:left;">
                        <p style="margin:0;color:#166534;font-size:15px;line-height:1.6;"><strong>Booking fee:</strong> £${bookingFee.toFixed(2)}</p>
                        <p style="margin:8px 0 0;color:#166534;font-size:14px;line-height:1.6;">The remaining move cost is paid directly to the mover.</p>
                      </div>

                      <a href="${reviewUrl}" style="display:inline-block;background:#F97316;color:#fff;padding:16px 32px;text-align:center;text-decoration:none;font-weight:900;border-radius:12px;font-size:16px;">Accept Quote</a>

                      <p style="margin:24px 0 0;color:#94A3B8;font-size:12px;line-height:1.6;">If you do not want to proceed, you do not need to do anything.</p>
                    </td>
                  </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;">
                  <tr><td style="padding:32px;text-align:center;">
                    <p style="margin:0;color:#94A3B8;font-size:12px;font-weight:600;">Man and Van Club</p>
                    <p style="margin:0;color:#CBD5E1;font-size:11px;">support@manandvanclub.co.uk</p>
                  </td></tr>
                </table>
              </td></tr>
            </table>
          </body>
          </html>
        `,
      });

      if (emailError) {
        console.error("[submit-quote] Customer email error:", emailError);
      } else {
        console.log("[submit-quote] Quote email sent to", lead.email);
      }
    }

    return NextResponse.json({ success: true, bookingFee });
  } catch (error: any) {
    console.error("[submit-quote] Unhandled error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 }
    );
  }
}
