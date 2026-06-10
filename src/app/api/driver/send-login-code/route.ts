import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { hashLoginCode } from "@/lib/driver-auth";

const SENDER_ADDRESS = "Man and Van Club <support@manandvanclub.co.uk>";

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

    if (!email || !email.includes("@")) {
      return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
    }

    // 1. Check if driver exists and is approved
    const { data: driver, error: driverError } = await supabase
      .from("driver_applications")
      .select("id, contact_name, email, status")
      .eq("email", email)
      .single();

    if (driverError || !driver || driver.status !== "approved") {
      // Always return generic response — do not reveal account status
      return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
    }

    // 2. Rate limiting: check email rate
    const sinceEmail = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count: emailCount } = await supabase
      .from("driver_login_codes")
      .select("*", { count: "exact", head: true })
      .eq("email", email)
      .gte("created_at", sinceEmail);

    if (emailCount && emailCount >= RATE_LIMIT_EMAIL) {
      console.warn("Rate limit exceeded for email:", email);
      return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
    }

    // 3. Rate limiting: check IP rate
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const sinceIp = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count: ipCount } = await supabase
      .from("driver_login_codes")
      .select("*", { count: "exact", head: true })
      .eq("request_ip", ip)
      .gte("created_at", sinceIp);

    if (ipCount && ipCount >= RATE_LIMIT_IP) {
      console.warn("Rate limit exceeded for IP:", ip);
      return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
    }

    // 4. Invalidate any existing unused codes for this driver
    const now = new Date().toISOString();
    await supabase
      .from("driver_login_codes")
      .update({ used_at: now })
      .eq("driver_id", driver.id)
      .is("used_at", null)
      .gt("expires_at", now);

    // 5. Generate 6-digit code and hash it
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeHash = hashLoginCode(code, email);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 min

    const userAgent = req.headers.get("user-agent") || "";

    const { error: insertError } = await supabase
      .from("driver_login_codes")
      .insert({
        driver_id: driver.id,
        email: email,
        code_hash: codeHash,
        expires_at: expiresAt,
        used_at: null,
        attempt_count: 0,
        request_ip: ip,
        user_agent: userAgent,
      });

    if (insertError) {
      console.error("Driver login code insert error:", insertError);
      return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
    }

    // 6. Send email via Resend
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY missing — driver login code not sent");
      return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
    }

    const driverName = driver.contact_name || "Driver";

    const { error: emailError } = await resend.emails.send({
      from: SENDER_ADDRESS,
      to: [email],
      subject: "Your Man and Van Club login code",
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
      console.error("Driver login code email error:", emailError);
    } else {
      console.log("Driver login code sent to", email);
    }

    return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
  } catch (error: any) {
    console.error("Send login code error:", error);
    return NextResponse.json(GENERIC_RESPONSE, { status: 200 });
  }
}
