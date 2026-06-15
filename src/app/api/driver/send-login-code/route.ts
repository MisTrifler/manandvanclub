import { NextResponse } from "next/server";
import { randomInt } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { resend, SENDER_ADDRESS, REPLY_TO_ADDRESS } from "@/lib/resend";
import { hashLoginCode } from "@/lib/driver-auth";


const RATE_LIMIT_EMAIL = 3; // max code requests per email per 15 min
const RATE_LIMIT_IP = 10; // max code requests per IP per 15 min

const GENERIC_RESPONSE = {
  success: true,
  message: "If this email belongs to an approved mover account, we have sent a login code.",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "").toLowerCase().trim();

    console.log("[send-login-code] Request received for:", email);

    if (!email || !email.includes("@")) {
      console.log("[send-login-code] Invalid email, returning generic response");
      return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // 1. Check if driver exists and is approved
    const { data: driver, error: driverError } = await supabaseAdmin
      .from("driver_applications")
      .select("id, contact_name, email, status")
      .eq("email", email)
      .single();

    if (driverError) {
      console.log("[send-login-code] Driver lookup error:", driverError.message, "| email:", email);
    }

    if (driverError || !driver || driver.status !== "approved") {
      console.log("[send-login-code] Driver not found or not approved. email:", email, "status:", driver?.status);
      return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
    }

    console.log("[send-login-code] Driver approved:", driver.email, "id:", driver.id);

    // 2. Rate limiting: check email rate
    const sinceEmail = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count: emailCount, error: emailCountError } = await supabaseAdmin
      .from("driver_login_codes")
      .select("*", { count: "exact", head: true })
      .eq("email", email)
      .gte("created_at", sinceEmail);

    if (emailCountError) {
      console.error("[send-login-code] Email rate limit query error:", emailCountError);
    }

    if (emailCount && emailCount >= RATE_LIMIT_EMAIL) {
      console.warn("[send-login-code] Rate limit exceeded for email:", email, "count:", emailCount);
      return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
    }

    // 3. Rate limiting: check IP rate
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const sinceIp = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count: ipCount, error: ipCountError } = await supabaseAdmin
      .from("driver_login_codes")
      .select("*", { count: "exact", head: true })
      .eq("request_ip", ip)
      .gte("created_at", sinceIp);

    if (ipCountError) {
      console.error("[send-login-code] IP rate limit query error:", ipCountError);
    }

    if (ipCount && ipCount >= RATE_LIMIT_IP) {
      console.warn("[send-login-code] Rate limit exceeded for IP:", ip, "count:", ipCount);
      return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
    }

    // 4. Invalidate any existing unused codes for this driver
    const now = new Date().toISOString();
    const { error: invalidateError } = await supabaseAdmin
      .from("driver_login_codes")
      .update({ used_at: now })
      .eq("driver_id", driver.id)
      .is("used_at", null)
      .gt("expires_at", now);

    if (invalidateError) {
      console.error("[send-login-code] Failed to invalidate old codes:", invalidateError);
      // Non-blocking: continue anyway
    }

    // 5. Generate 6-digit code and hash it
    const code = String(randomInt(100000, 1000000));
    const codeHash = hashLoginCode(code, email);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 min

    const userAgent = req.headers.get("user-agent") || "";

    // Truncate to safe lengths in case DB columns are limited
    const safeIp = ip.slice(0, 255);
    const safeUserAgent = userAgent.slice(0, 500);

    const insertPayload: Record<string, any> = {
      driver_id: driver.id,
      email: email,
      code_hash: codeHash,
      expires_at: expiresAt,
      used_at: null,
      attempt_count: 0,
      request_ip: safeIp,
      user_agent: safeUserAgent,
    };

    let { error: insertError } = await supabaseAdmin
      .from("driver_login_codes")
      .insert(insertPayload);

    // If insert failed because of missing columns (e.g. request_ip / user_agent),
    // retry without the optional fields.
    if (insertError && insertError.code === "42703") {
      console.warn("[send-login-code] Missing column on insert (42703), retrying without optional fields:", insertError.message);
      delete insertPayload.request_ip;
      delete insertPayload.user_agent;
      const retry = await supabaseAdmin.from("driver_login_codes").insert(insertPayload);
      insertError = retry.error;
    }

    if (insertError) {
      console.error("[send-login-code] driver_login_codes insert error:", insertError);
      return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
    }

    console.log("[send-login-code] Code stored in DB for", email);

    // 6. Send email via Resend
    if (!process.env.RESEND_API_KEY) {
      console.warn("[send-login-code] RESEND_API_KEY missing — driver login code not sent");
      return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
    }

    const driverName = driver.contact_name || "Driver";

    console.log("[send-login-code] Sending email to", email, "via Resend...");

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: SENDER_ADDRESS,
      to: [email],
      subject: "Your Man and Van Club login code",
      replyTo: REPLY_TO_ADDRESS,
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
                      <span style="color:#fff;font-weight:900;font-size:24px;letter-spacing:-1px;">M<span style="color:#F5781E;">&amp;</span>V</span>
                    </div>
                    <h1 style="margin:0;color:#0F172A;font-size:28px;font-weight:900;letter-spacing:-0.5px;">Your Login Code</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 40px 40px;text-align:center;">
                    <p style="margin:0 0 24px;color:#475569;font-size:18px;line-height:1.6;">Hi ${driverName},</p>
                    <p style="margin:0 0 24px;color:#475569;font-size:16px;line-height:1.6;">Your Man and Van Club login code is:</p>
                    <div style="background:#F8FAFC;border:2px dashed #E2E8F0;border-radius:16px;padding:32px;margin-bottom:32px;">
                      <span style="color:#F97316;font-size:56px;font-weight:900;letter-spacing:12px;font-family:'Courier New',Courier,monospace;">${code}</span>
                    </div>
                    <p style="margin:0 0 32px;color:#64748B;font-size:14px;line-height:1.6;">This code expires in <strong>10 minutes</strong>.</p>
                    <p style="margin:0;color:#94A3B8;font-size:12px;line-height:1.6;">
                      If you did not request this code, you can ignore this email.
                    </p>
                  </td>
                </tr>
              </table>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px;">
                <tr>
                  <td style="padding:32px;text-align:center;">
                    <p style="margin:0;color:#94A3B8;font-size:12px;font-weight:600;">Man and Van Club</p>
                    <p style="margin:0;color:#CBD5E1;font-size:11px;">support@manandvanclub.co.uk</p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    if (emailError) {
      console.error("[send-login-code] Resend email error:", emailError);
    } else {
      console.log("[send-login-code] Resend email sent successfully. ID:", emailData?.id);
    }

    return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
  } catch (error: any) {
    console.error("[send-login-code] Unhandled error:", error?.message || error);
    return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
  }
}
