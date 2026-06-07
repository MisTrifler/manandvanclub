import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // 2. Save move request to Supabase
    const { data: request, error } = await supabase
      .from('move_requests')
      .insert([
        {
          first_name: data.firstName,
          email: data.email,
          phone: data.phone,
          collection_postcode: data.collectionPostcode,
          delivery_postcode: data.deliveryPostcode,
          move_date: data.moveDate,
          move_type: data.moveType,
          status: 'pending',
          otp_code: otp,
          is_verified: false
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: 'Database Error', details: error.message }, { status: 500 });
    }

    // 3. Send Email with OTP
    try {
      if (process.env.RESEND_API_KEY) {
        console.log('Attempting to send OTP email to:', data.email);
        
        const { data: emailResponse, error: emailError } = await resend.emails.send({
          from: 'Man and Van Club <no-reply@manandvanclub.co.uk>',
          to: [data.email],
          subject: `${otp} is your Man and Van Club verification code`,
          replyTo: 'support@manandvanclub.co.uk',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Verify your move</title>
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
                            <span style="color: #ffffff; font-weight: 900; font-size: 24px; letter-spacing: -1px;">M&V</span>
                          </div>
                          <h1 style="margin: 0; color: #0F172A; font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px;">Verify Your Move</h1>
                        </td>
                      </tr>
                      
                      <!-- Body -->
                      <tr>
                        <td style="padding: 0 40px 40px 40px; text-align: center;">
                          <p style="margin: 0 0 24px 0; color: #475569; font-size: 18px; line-height: 1.6; font-weight: 500;">
                            Hi ${data.firstName},<br>
                            To protect your move request and ensure exclusive matching, please enter the following 4-digit code:
                          </p>
                          
                          <div style="background-color: #F8FAFC; border: 2px dashed #E2E8F0; border-radius: 16px; padding: 32px; margin-bottom: 32px;">
                            <span style="color: #F97316; font-size: 56px; font-weight: 900; letter-spacing: 12px; font-family: 'Courier New', Courier, monospace;">${otp}</span>
                          </div>
                          
                          <p style="margin: 0 0 32px 0; color: #64748B; font-size: 14px; line-height: 1.6;">
                            This code is for your move from <strong>${data.collectionPostcode}</strong> to <strong>${data.deliveryPostcode}</strong> on ${data.moveDate}.
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
                            &copy; 2026 Man and Van Club. All rights reserved.
                          </p>
                          <p style="margin: 0; color: #CBD5E1; font-size: 11px;">
                            You received this email because a move request was started with this address. 
                            If you didn't request this, you can ignore this email.
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

        if (emailError) {
          console.error('Resend API returned an error:', emailError);
        } else {
          console.log('Email successfully sent! ID:', emailResponse?.id);
        }
      }
    } catch (emailError: any) {
      console.error('Unexpected error in email logic:', emailError);
    }

    return NextResponse.json({ id: request.id });
  } catch (error: any) {
    console.error('General API Error:', error);
    return NextResponse.json({ error: 'Server Error', message: error.message }, { status: 500 });
  }
}
