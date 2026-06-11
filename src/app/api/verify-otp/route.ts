import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

const SENDER_ADDRESS = 'Man and Van Club <support@manandvanclub.co.uk>';

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
    const { requestId, otp } = await req.json();

    if (!requestId || !otp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Check if OTP matches — select all fields needed for confirmation email
    const { data: request, error: fetchError } = await supabase
      .from('move_requests')
      .select('id, first_name, email, move_type, collection_postcode, delivery_postcode, move_date, estimated_price, otp_code, is_verified')
      .eq('id', requestId)
      .single();

    if (fetchError || !request) {
      console.error('Verify OTP fetch error:', fetchError);
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    if (request.is_verified) {
      return NextResponse.json({ message: 'Already verified' });
    }

    if (request.otp_code !== otp) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    // 2. Update status to active and is_verified to true
    const { error: updateError } = await supabase
      .from('move_requests')
      .update({
        is_verified: true,
        status: 'active',
        verified_at: new Date().toISOString()
      })
      .eq('id', requestId);

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
          replyTo: 'support@manandvanclub.co.uk',
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
                            <strong>No spam. No multiple sales calls. Just one trusted local mover.</strong>
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
