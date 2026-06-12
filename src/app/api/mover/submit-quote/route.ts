import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { cookies } from "next/headers";
import { DRIVER_COOKIE_NAME, isValidDriverSession } from "@/lib/driver-auth";
import { resend, SENDER_ADDRESS, REPLY_TO_ADDRESS } from "@/lib/resend";
import { calculateBookingDeposit, calculateRemainingMoverBalance, formatPounds } from "@/lib/booking-fee";
import { generateCustomerQuoteToken } from "@/lib/customer-token";
import { leadIsAvailable, leadMatchesDriverArea } from "@/lib/marketplace-matching";
import { isLaunchPoolEnabled, leadIsVisibleInLaunchPool } from "@/lib/launch-lead-pool";
import { validateQuoteOptions, STANDARD_QUOTE_ASSUMPTION, type QuoteOption } from "@/lib/quote-options";
import { getRouteEstimateFromDetails } from "@/lib/route-estimate";
import { escapeHtml } from "@/lib/html";
import {
  formatUKPostcode,
  formatDisplayDate,
  formatMoveType,
} from "@/lib/formatting";

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
      .select("*")
      .eq("email", driverEmail)
      .single();

    if (!driver || driver.status !== "approved") {
      return NextResponse.json({ error: "Mover not approved" }, { status: 403 });
    }

    const body = await req.json();
    const requestId = String(body.requestId || "").trim();

    // Free-text driver messages are no longer allowed: they could contain
    // phone numbers, emails or company names before the deposit is paid.
    const rawMessage = String(body.quoteMessage || "").trim();
    if (rawMessage) {
      return NextResponse.json(
        { error: "Free-text quote messages are not allowed. Please use the structured quote options." },
        { status: 400 }
      );
    }

    let quoteOptions;
    try {
      // Legacy single-amount payloads (quoteAmount only) are mapped to one
      // structured option so an out-of-date client doesn't hard-fail.
      const rawOptions = Array.isArray(body.quoteOptions) && body.quoteOptions.length > 0
        ? body.quoteOptions
        : body.quoteAmount != null
          ? [{ serviceLevel: "one_man_loading", vanSize: "suitable_van", totalPrice: Number(body.quoteAmount) }]
          : [];
      quoteOptions = validateQuoteOptions(rawOptions);
    } catch (validationError: any) {
      return NextResponse.json({ error: validationError?.message || "Invalid quote options." }, { status: 400 });
    }

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

    // Full server-side availability check: verified, available, unquoted,
    // unpaid, future move date — cannot be bypassed by sending a raw requestId.
    if (!leadIsAvailable(lead)) {
      return NextResponse.json({ error: "This request is no longer available for quoting." }, { status: 409 });
    }

    // Area permission must mirror marketplace visibility exactly:
    // - launch pool mode: any approved launch-region mover may quote
    //   launch-pool leads (service flags never block)
    // - strict mode: per-driver area matching
    const areaAllowed = isLaunchPoolEnabled()
      ? leadIsVisibleInLaunchPool(lead, driver)
      : leadMatchesDriverArea(lead, driver);
    if (!areaAllowed) {
      return NextResponse.json(
        { error: "This enquiry is not available for your approved service area." },
        { status: 403 }
      );
    }

    const quoteToken = await generateUniqueCustomerQuoteToken(supabaseAdmin);
    const now = new Date();
    const quotedAt = now.toISOString();
    const quoteExpiresAt = new Date(now.getTime() + QUOTE_EXPIRY_HOURS * 60 * 60 * 1000).toISOString();

    const updatePayload: Record<string, any> = {
      quote_options: quoteOptions,
      quote_message: null,
      quoted_by: driverEmail,
      quoted_at: quotedAt,
      quote_expires_at: quoteExpiresAt,
      customer_quote_token: quoteToken,
      customer_quote_token_created_at: quotedAt,
      booking_fee_paid: false,
      status: "quoted",
    };

    let { data: updatedLead, error: updateError } = await supabaseAdmin
      .from("move_requests")
      .update(updatePayload)
      .eq("id", requestId)
      .eq("is_verified", true)
      .in("status", ["available", "verified", "active"])
      .is("quoted_by", null)
      .is("quote_amount", null)
      .or("booking_fee_paid.is.null,booking_fee_paid.eq.false")
      .select("*")
      .single();

    // Fallback for environments where the quote_options migration has not
    // been applied yet: store the first option as a legacy single quote.
    if (updateError && (updateError.code === "42703" || updateError.code === "PGRST204")) {
      console.warn("[submit-quote] quote_options columns missing; falling back to legacy single quote. Apply migration 20260612_quote_options.sql.");
      const first = quoteOptions[0];
      const legacyDeposit = calculateBookingDeposit(first.totalPrice);
      ({ data: updatedLead, error: updateError } = await supabaseAdmin
        .from("move_requests")
        .update({
          quote_amount: first.totalPrice,
          quote_message: null,
          quoted_by: driverEmail,
          quoted_at: quotedAt,
          quote_expires_at: quoteExpiresAt,
          booking_fee: legacyDeposit,
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
        .single());
    }

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

      // Route estimate line (guide only, postcodes-derived — no PII)
      const routeEstimate = getRouteEstimateFromDetails(updatedLead.details);
      const routeEstimateLine = routeEstimate && routeEstimate.distanceMeters > 0
        ? `<p style="margin:8px 0 0;color:#475569;font-size:14px;">Estimated route: ${escapeHtml(routeEstimate.distanceText)} · ${escapeHtml(routeEstimate.durationText)} <span style="color:#94A3B8;font-size:12px;">(guide only)</span></p>`
        : "";

      // Platform-generated option cards. No driver-written text is included.
      const optionsHtml = quoteOptions
        .map((option: QuoteOption, index: number) => {
          const deposit = calculateBookingDeposit(option.totalPrice);
          const balance = calculateRemainingMoverBalance(option.totalPrice, deposit);
          return `
            <div style="background:#fff;border:1px solid #E2E8F0;border-radius:12px;padding:18px;margin-bottom:12px;text-align:left;">
              <p style="margin:0 0 4px;color:#0F172A;font-size:15px;font-weight:900;">Option ${index + 1}: ${escapeHtml(option.serviceLabel)}</p>
              <p style="margin:0 0 10px;color:#64748B;font-size:13px;line-height:1.5;">${escapeHtml(option.serviceDescription)}</p>
              <p style="margin:0 0 4px;color:#475569;font-size:14px;"><strong>Van:</strong> ${escapeHtml(option.vanLabel)}</p>
              <p style="margin:0 0 4px;color:#475569;font-size:14px;"><strong>Deposit:</strong> ${formatPounds(deposit)}</p>
              <p style="margin:0 0 4px;color:#475569;font-size:14px;"><strong>Pay on moving day:</strong> ${formatPounds(balance)}</p>
              <p style="margin:0;color:#0F172A;font-size:14px;font-weight:700;"><strong>Total quote:</strong> ${formatPounds(option.totalPrice)}</p>
            </div>`;
        })
        .join("");

      const { error: emailError } = await resend.emails.send({
        from: SENDER_ADDRESS,
        to: [updatedLead.email],
        subject: "Your Man and Van Club quote is ready",
        replyTo: REPLY_TO_ADDRESS,
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
                  <p style="margin:0 0 24px;color:#475569;font-size:16px;line-height:1.6;">Your mover has provided quote options. Choose the one that suits your move best.</p>
                  <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:16px;padding:18px;margin-bottom:24px;text-align:left;">
                    ${optionsHtml}
                    <p style="margin:12px 0 0;color:#94A3B8;font-size:12px;line-height:1.6;">${escapeHtml(STANDARD_QUOTE_ASSUMPTION)}</p>
                  </div>
                  <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:16px;padding:18px;margin-bottom:24px;text-align:left;">
                    <p style="margin:0 0 12px;color:#0F172A;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Move details</p>
                    <p style="margin:0 0 8px;color:#475569;font-size:16px;font-weight:500;">${escapeHtml(moveType)}</p>
                    <p style="margin:0 0 8px;color:#475569;font-size:16px;font-weight:500;">${escapeHtml(colPostcode || "—")} to ${escapeHtml(delPostcode || "—")}</p>
                    <p style="margin:0;color:#475569;font-size:16px;font-weight:500;">${escapeHtml(moveDate || "—")}</p>
                    ${routeEstimateLine}
                  </div>
                  <div style="background:#F0FDF4;border-left:4px solid #22C55E;padding:16px;margin-bottom:32px;text-align:left;">
                    <p style="margin:0;color:#166534;font-size:14px;line-height:1.6;">Pay the deposit on the option you choose to secure your booking and release your details to the mover. The deposit is deducted from that option's quote, so your total move cost stays the same. You pay the remaining balance directly to the mover on moving day.</p>
                  </div>
                  <a href="${reviewUrl}" style="display:inline-block;background:#F97316;color:#fff;padding:16px 32px;text-align:center;text-decoration:none;font-weight:900;border-radius:12px;font-size:16px;">Review Your Quote Options</a>
                  <p style="margin:24px 0 0;color:#94A3B8;font-size:12px;line-height:1.6;">If you do not want to proceed, you can decline on the review page.</p>
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

    return NextResponse.json({ success: true, quoteOptions, quoteExpiresAt });
  } catch (error: any) {
    console.error("[submit-quote] Server error:", error?.message || "Unknown error");
    return NextResponse.json({ error: error?.message || "Server error" }, { status: 500 });
  }
}
