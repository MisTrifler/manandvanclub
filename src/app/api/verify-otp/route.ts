import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { supabase } from '@/lib/supabase';
import { resend, SENDER_ADDRESS, REPLY_TO_ADDRESS } from '@/lib/resend';

// ── OTP hardening ─────────────────────────────────────────
const MAX_OTP_ATTEMPTS = 5;

// Simple in-memory IP rate limiter (best-effort per serverless instance;
// the DB-backed attempt counter is the authoritative limit).
const ipHits = new Map<string, { count: number; resetAt: number }>();
const IP_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const IP_MAX_REQUESTS = 30;

function ipRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + IP_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  if (ipHits.size > 5000) ipHits.clear(); // memory guard
  return entry.count > IP_MAX_REQUESTS;
}

function safeCodeCompare(stored: string, provided: string): boolean {
  const a = Buffer.from(String(stored));
  const b = Buffer.from(String(provided));
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

const GENERIC_INVALID = 'Invalid or expired verification code.';
const GENERIC_LOCKED = 'Too many incorrect attempts. Please request a new verification code.';

// ── Helpers ───────────────────────────────────────────────

function formatMoveDate(dateString: string | null | undefined): string {
  if (!dateString) return 'To be confirmed';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatServiceName(raw: string | null | undefined): string {
  if (!raw) return 'Move';
  const map: Record<string, string> = {
    'Office Move': 'Office move',
    'Home Move': 'Home move',
    'Student Move': 'Student move',
    'Furniture Delivery': 'Furniture delivery',
    'Man & Van Service': 'Man and van service',
    'Storage Collection': 'Storage collection',
  };
  return map[raw] || raw.toLowerCase();
}

function formatEstimate(raw: string | null | undefined): string | null {
  if (!raw || raw.trim() === '' || raw === 'null' || raw === 'undefined') return null;
  return raw;
}

// ── Route ─────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    // IP rate limit (generic response, no information disclosure)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
    if (ipRateLimited(ip)) {
      console.warn('[verify-otp] IP rate limit exceeded:', ip);
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const { requestId, otp } = await req.json();

    if (!requestId || !otp) {
      return NextResponse.json({ error: GENERIC_INVALID }, { status: 400 });
    }

    // 1. Fetch request — select all fields needed for confirmation email
    const { data: request, error: fetchError } = await supabase
      .from('move_requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (fetchError || !request) {
      // Generic error: do not reveal whether the requestId exists
      return NextResponse.json({ error: GENERIC_INVALID }, { status: 400 });
    }

    if (request.is_verified) {
      return NextResponse.json({ message: 'Already verified' });
    }

    // 2. Lockout check (otp_locked_at set after MAX_OTP_ATTEMPTS failures)
    if (request.otp_locked_at) {
      return NextResponse.json({ error: GENERIC_LOCKED }, { status: 429 });
    }

    const attempts = Number(request.otp_attempts || 0);
    if (attempts >= MAX_OTP_ATTEMPTS) {
      await supabase
        .from('move_requests')
        .update({ otp_locked_at: new Date().toISOString() })
        .eq('id', requestId);
      return NextResponse.json({ error: GENERIC_LOCKED }, { status: 429 });
    }

    // 3. Expiry check (15 minutes from issue; column may be null on
    //    legacy rows created before the hardening migration)
    if (request.otp_expires_at) {
      const expiry = new Date(request.otp_expires_at).getTime();
      if (Number.isFinite(expiry) && expiry <= Date.now()) {
        return NextResponse.json({ error: GENERIC_INVALID }, { status: 400 });
      }
    }

    // 4. Timing-safe code comparison
    if (!request.otp_code || !safeCodeCompare(request.otp_code, otp)) {
      // Increment attempt counter; lock if this was the final allowed attempt
      const newAttempts = attempts + 1;
      const failUpdate: Record<string, any> = { otp_attempts: newAttempts };
      if (newAttempts >= MAX_OTP_ATTEMPTS) {
        failUpdate.otp_locked_at = new Date().toISOString();
      }
      const { error: failError } = await supabase
        .from('move_requests')
        .update(failUpdate)
        .eq('id', requestId);
      if (failError && (failError.code === '42703' || failError.code === 'PGRST204')) {
        console.warn('[verify-otp] otp hardening columns missing — apply migration 20260612_otp_hardening.sql');
      }
      return NextResponse.json(
        { error: newAttempts >= MAX_OTP_ATTEMPTS ? GENERIC_LOCKED : GENERIC_INVALID },
        { status: newAttempts >= MAX_OTP_ATTEMPTS ? 429 : 400 }
      );
    }

    // 5. Success: mark verified and clear the OTP so it cannot be reused
    let { error: updateError } = await supabase
      .from('move_requests')
      .update({
        is_verified: true,
        status: 'active',
        verified_at: new Date().toISOString(),
        otp_code: null,
        otp_attempts: 0,
        otp_locked_at: null
      })
      .eq('id', requestId);

    // Fallback for environments where the otp hardening migration has not
    // been applied yet
    if (updateError && (updateError.code === '42703' || updateError.code === 'PGRST204')) {
      console.warn('[verify-otp] otp hardening columns missing — apply migration 20260612_otp_hardening.sql');
      ({ error: updateError } = await supabase
        .from('move_requests')
        .update({
          is_verified: true,
          status: 'active',
          verified_at: new Date().toISOString(),
          otp_code: null
        })
        .eq('id', requestId));
    }

    if (updateError) {
      console.error('Verify OTP update error:', updateError);
      throw updateError;
    }

    // 3. Send customer confirmation email after successful verification
    try {
      if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY missing — customer confirmation email not sent');
      } else {
        console.log('Sending customer confirmation email to:', request.email);

        const firstName = request.first_name || 'there';
        const serviceName = formatServiceName(request.move_type);
        const collection = request.collection_postcode || 'your collection address';
        const delivery = request.delivery_postcode || 'your delivery address';
        const moveDate = formatMoveDate(request.move_date);
        const estimatedPrice = formatEstimate(request.estimated_price);

        // Build price section if estimate exists
        const priceSection = estimatedPrice
          ? `<p style="margin: 0 0 12px 0; color: #0F172A; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Estimated guide price</p>
             <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; font-weight: 500;">${estimatedPrice}</p>
             <p style="margin: 0 0 24px 0; color: #64748B; font-size: 12px; line-height: 1.6; font-style: italic;">
               This estimate is based on the details provided and is not a confirmed quote. Your matched mover will confirm the final price before booking.
             </p>`
          : '';

        const { data: confirmResponse, error: confirmError } = await resend.emails.send({
          from: SENDER_ADDRESS,
          to: [request.email],
          subject: 'Your Man and Van Club request is confirmed',
          replyTo: REPLY_TO_ADDRESS,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Request Confirmed</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #F9F9F7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F9F9F7; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                      <!-- Header -->
                      <tr>
                        <td style="padding: 40px 40px 20px 40px; text-align: center;">
                          <div style="background-color: #0F172A; display: inline-block; padding: 12px 20px; border-radius: 12px; margin-bottom: 24px;">
                            <span style="color: #ffffff; font-weight: 900; font-size: 24px; letter-spacing: -1px;">M&amp;V</span>
                          </div>
                          <h1 style="margin: 0; color: #0F172A; font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px;">Request Confirmed</h1>
                        </td>
                      </tr>

                      <!-- Body -->
                      <tr>
                        <td style="padding: 0 40px 40px 40px; text-align: center;">
                          <p style="margin: 0 0 24px 0; color: #475569; font-size: 18px; line-height: 1.6; font-weight: 500;">
                            Hi ${firstName},
                          </p>

                          <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; line-height: 1.6;">
                            Your request has been received. A vetted local mover will review the details and provide a quote if they can help.
                          </p>

                          <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; line-height: 1.6;">
                            You will receive an email when a mover sends a quote. There is no obligation to accept.
                          </p>

                          <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 16px; padding: 24px; margin-bottom: 32px; text-align: left;">
                            <p style="margin: 0 0 12px 0; color: #0F172A; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Service</p>
                            <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; font-weight: 500;">${serviceName}</p>

                            <p style="margin: 0 0 12px 0; color: #0F172A; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Route</p>
                            <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; font-weight: 500;">${collection} to ${delivery}</p>

                            <p style="margin: 0 0 12px 0; color: #0F172A; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Move date</p>
                            <p style="margin: 0 0 24px 0; color: #475569; font-size: 16px; font-weight: 500;">${moveDate}</p>

                            ${priceSection}
                          </div>

                          <p style="margin: 0 0 32px 0; color: #64748B; font-size: 14px; line-height: 1.6;">
                            <strong>No spam. No endless calls. Just one verified local mover.</strong>
                          </p>

                          <p style="margin: 0 0 32px 0; color: #64748B; font-size: 14px; line-height: 1.6;">
                            Need to update your request? Reply to this email or contact <a href="mailto:support@manandvanclub.co.uk" style="color: #F97316; text-decoration: none;">support@manandvanclub.co.uk</a>.
                          </p>

                          <div style="border-top: 1px solid #E2E8F0; padding-top: 32px;">
                            <p style="margin: 0; color: #94A3B8; font-size: 12px; line-height: 1.6; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">
                              Verified Mover Network &bull; Secure Connection
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Footer -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px;">
                      <tr>
                        <td style="padding: 32px; text-align: center;">
                          <p style="margin: 0 0 8px 0; color: #94A3B8; font-size: 12px; font-weight: 600;">
                            Man and Van Club
                          </p>
                          <p style="margin: 0; color: #CBD5E1; font-size: 11px;">
                            support@manandvanclub.co.uk
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        });

        if (confirmError) {
          console.error('Customer confirmation email error — name:', confirmError.name);
          console.error('Customer confirmation email error — message:', confirmError.message);
          console.error('Customer confirmation email error — full object:', JSON.stringify(confirmError, null, 2));
        } else {
          console.log('Customer confirmation email sent! ID:', confirmResponse?.id);
        }
      }
    } catch (confirmEmailError: any) {
      console.error('Unexpected error in customer confirmation email — name:', confirmEmailError.name);
      console.error('Unexpected error in customer confirmation email — message:', confirmEmailError.message);
      console.error('Unexpected error in customer confirmation email — full object:', confirmEmailError);
    }

    // 4. Send driver notification emails after verification
    try {
      if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY missing — driver notifications not sent');
      } else {
        const { data: moveRequest } = await supabase
          .from('move_requests')
          .select('*')
          .eq('id', requestId)
          .single();

        if (moveRequest) {
          const { data: matchingDrivers } = await supabase
            .from('driver_applications')
            .select('email, contact_name')
            .eq('status', 'approved');

          if (matchingDrivers && matchingDrivers.length > 0) {
            for (const driver of matchingDrivers) {
              try {
                const { data: driverResponse, error: driverError } = await resend.emails.send({
                  from: SENDER_ADDRESS,
                  to: [driver.email],
                  subject: `New Move Request: ${moveRequest.move_type} in ${moveRequest.collection_postcode}`,
                  html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
                      <h2 style="color: #0F172A;">NEW JOB ALERT</h2>
                      <p>Hi ${driver.contact_name},</p>
                      <p>A new verified move request has just been submitted in your area:</p>
                      <div style="background: #F8FAFC; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <p><strong>Route:</strong> ${moveRequest.collection_postcode} → ${moveRequest.delivery_postcode}</p>
                        <p><strong>Date:</strong> ${moveRequest.move_date}</p>
                        <p><strong>Type:</strong> ${moveRequest.move_type}</p>
                      </div>
                      <p>A verified mover can submit a free quote for this request. Customer details are only released after the customer accepts a quote and pays the booking deposit.</p>
                      <a href="https://www.manandvanclub.co.uk/marketplace"
                         style="display: block; background: #F97316; color: white; padding: 15px; text-align: center; text-decoration: none; font-weight: bold; border-radius: 8px;">
                        View Request in Marketplace
                      </a>
                      <p style="font-size: 12px; color: #94A3B8; margin-top: 20px;">© 2026 Man and Van Club</p>
                    </div>
                  `
                });

                if (driverError) {
                  console.error('Driver notification error — name:', driverError.name);
                  console.error('Driver notification error — message:', driverError.message);
                  console.error('Driver notification error — full object:', JSON.stringify(driverError, null, 2));
                } else {
                  console.log('Driver notification sent to', driver.email, 'ID:', driverResponse?.id);
                }
              } catch (driverSendError: any) {
                console.error('Unexpected error sending to driver', driver.email, '— name:', driverSendError.name);
                console.error('Unexpected error sending to driver', driver.email, '— message:', driverSendError.message);
              }
            }
          }
        }
      }
    } catch (notifyError: any) {
      console.error('Notification engine error — name:', notifyError.name);
      console.error('Notification engine error — message:', notifyError.message);
      console.error('Notification engine error — full object:', notifyError);
      // Non-blocking: we still return success to the customer
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Verification Error — name:', error.name);
    console.error('Verification Error — message:', error.message);
    console.error('Verification Error — full object:', error);
    return NextResponse.json({ error: 'Server Error', message: error.message }, { status: 500 });
  }
}
