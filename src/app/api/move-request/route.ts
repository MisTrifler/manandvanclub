import { NextResponse } from 'next/server';
import { randomInt } from 'crypto';
import { supabase } from '@/lib/supabase';
import { resend, SENDER_ADDRESS, REPLY_TO_ADDRESS, SITE_URL } from '@/lib/resend';
import { generateCustomerQuoteToken } from '@/lib/customer-token';
import { escapeHtml } from '@/lib/html';
import { computeRouteEstimate, sanitizeRouteEstimate, buildGoogleMapsDirectionsUrl, isLikelyUKPostcode, normalisePostcodeForRoute } from '@/lib/route-estimate';
import { calculateGuidePrice } from '@/lib/guide-price';

const OTP_VALIDITY_MINUTES = 15;

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const collectionPostcode = normalisePostcodeForRoute(data.collectionPostcode);
    const deliveryPostcode = normalisePostcodeForRoute(data.deliveryPostcode);

    if (!isLikelyUKPostcode(collectionPostcode) || !isLikelyUKPostcode(deliveryPostcode)) {
      return NextResponse.json(
        {
          error: 'Invalid postcode',
          details: 'Enter full UK postcodes for collection and delivery, e.g. SW1A 1AA.',
        },
        { status: 400 }
      );
    }

    if (collectionPostcode === deliveryPostcode) {
      return NextResponse.json(
        {
          error: 'Invalid route',
          details: 'Collection and delivery postcodes must be different.',
        },
        { status: 400 }
      );
    }

    data.collectionPostcode = collectionPostcode;
    data.deliveryPostcode = deliveryPostcode;

    const moveType = String(data.moveType || '');
    const numberOfItems = Number(data.details?.numberOfItems ?? data.numberOfItems);
    if (/man\s*&?\s*van|general|same day|long distance/i.test(moveType) && (!Number.isFinite(numberOfItems) || numberOfItems < 1)) {
      return NextResponse.json(
        {
          error: 'Invalid move details',
          details: 'Enter at least 1 item for a man and van request.',
        },
        { status: 400 }
      );
    }

    // 1. Generate crypto-secure 6-digit OTP, valid for 15 minutes
    const otp = String(randomInt(100000, 1000000));
    const otpExpiresAt = new Date(Date.now() + OTP_VALIDITY_MINUTES * 60 * 1000).toISOString();

    // 2. Save move request to Supabase
    const quoteToken = generateCustomerQuoteToken();

    const insertPayload: Record<string, any> = {
      first_name: data.firstName,
      email: data.email,
      phone: data.phone,
      collection_postcode: data.collectionPostcode,
      delivery_postcode: data.deliveryPostcode,
      move_date: data.moveDate,
      move_type: data.moveType,
      source_page: data.sourcePage || '',
      estimated_price: data.estimatedPrice || null,
      customer_quote_token: quoteToken,
      status: 'pending',
      otp_code: otp,
      otp_attempts: 0,
      otp_expires_at: otpExpiresAt,
      otp_locked_at: null,
      is_verified: false
    };

    // Only include details if the migration has been applied.
    // If the column is missing, the insert will be retried without it.
    if (data.details != null) {
      insertPayload.details = data.details;
    }

    // ── Route estimate (informational only) ──────────────────────────
    // Recalculate server-side when possible; otherwise sanitize the
    // client value (which itself came from our /api/route-estimate).
    // Never blocks submission; never affects pricing or deposits.
    try {
      if (data.collectionPostcode && data.deliveryPostcode) {
        const serverEstimate = await computeRouteEstimate(data.collectionPostcode, data.deliveryPostcode);
        const finalEstimate = serverEstimate
          || sanitizeRouteEstimate(data.details?.routeEstimate, data.collectionPostcode, data.deliveryPostcode);
        if (finalEstimate) {
          insertPayload.details = { ...(insertPayload.details || {}), routeEstimate: finalEstimate };
        } else if (isLikelyUKPostcode(data.collectionPostcode) && isLikelyUKPostcode(data.deliveryPostcode)) {
          // Distance lookup unavailable: keep a safe postcode-only
          // fallback map link so movers/customers can still view the route.
          insertPayload.details = {
            ...(insertPayload.details || {}),
            routeEstimate: {
              mapUrl: buildGoogleMapsDirectionsUrl(data.collectionPostcode, data.deliveryPostcode),
              provider: "fallback",
              calculatedAt: new Date().toISOString(),
            },
          };
        } else if (insertPayload.details?.routeEstimate) {
          delete insertPayload.details.routeEstimate; // drop unusable client value
        }
      }
    } catch {
      // non-blocking
    }

    // ── Guide price (display-only, server-authoritative) ─────────────
    // Recomputed here from validated inputs + the stored route estimate.
    // Never affects Stripe, deposits, quote options or detail release.
    try {
      const guide = calculateGuidePrice({
        intent: null,
        moveType: data.moveType,
        routeEstimate: insertPayload.details?.routeEstimate || null,
        bedrooms: data.details?.bedrooms,
        propertyType: data.details?.propertyType,
        officeSize: data.details?.officeSize,
        numberOfDesks: data.details?.numberOfDesks,
        itemType: data.details?.itemType,
        numberOfItems: data.details?.numberOfItems,
        storageUnitSize: data.details?.storageUnitSize,
        storageDirection: data.details?.storageDirection,
        numberOfBoxes: data.details?.numberOfBoxes,
        suitcases: data.details?.suitcases,
        smallFurnitureItems: data.details?.smallFurnitureItems,
        loadingHelp: data.details?.loadingHelp,
        helperPreference: data.details?.helperPreference,
        accessType: data.details?.accessType,
        parkingAvailable: data.details?.parkingAvailable,
        heavyItems: data.details?.heavyItems,
        heavyItemsDescription: data.details?.heavyItemsDescription,
        dismantlingRequired: data.details?.dismantlingRequired,
        collectionPostcode: data.collectionPostcode,
        deliveryPostcode: data.deliveryPostcode,
      });
      // estimated_price stays the display string (backwards compatible);
      // structured detail goes into details.guidePrice.
      insertPayload.estimated_price = guide.display;
      insertPayload.details = {
        ...(insertPayload.details || {}),
        guidePrice: { ...guide, calculatedAt: new Date().toISOString() },
      };
    } catch {
      // non-blocking: keep client-supplied estimated_price as-is
    }

    let request: any;
    let error: any;

    const insertResult = await supabase
      .from('move_requests')
      .insert([insertPayload])
      .select()
      .single();

    request = insertResult.data;
    error = insertResult.error;

    // Retry without optional columns if a migration has not been applied yet
    // (PostgreSQL code 42703 = undefined_column, PostgREST PGRST204 = missing column)
    if (error && (error.code === '42703' || error.code === 'PGRST204')) {
      console.warn('Optional column missing, retrying insert without details/otp-hardening columns. Apply latest migrations.');
      delete insertPayload.details;
      delete insertPayload.otp_attempts;
      delete insertPayload.otp_expires_at;
      delete insertPayload.otp_locked_at;
      const retryResult = await supabase
        .from('move_requests')
        .insert([insertPayload])
        .select()
        .single();
      request = retryResult.data;
      error = retryResult.error;
    }

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ error: 'Database Error', details: error.message }, { status: 500 });
    }

    // 3. Send Email with OTP
    try {
      if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY missing — email not sent');
      } else {
        console.log('Attempting to send OTP email to:', data.email);

        const otpEmailText = `Here is your Man and Van Club verification code: ${otp}\n\nThis code helps us confirm your request is genuine and expires after 15 minutes.\n\nMan and Van Club\nsupport@manandvanclub.co.uk\n${SITE_URL}\nYou are receiving this email because you requested a quote through Man and Van Club.`;

        const { data: emailResponse, error: emailError } = await resend.emails.send({
          from: SENDER_ADDRESS,
          to: [data.email],
          subject: `${otp} is your Man and Van Club verification code`,
          replyTo: REPLY_TO_ADDRESS,
          text: otpEmailText,
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
                            <span style="color: #ffffff; font-weight: 900; font-size: 24px; letter-spacing: -1px;">M<span style="color:#F5781E;">&amp;</span>V</span>
                          </div>
                          <h1 style="margin: 0; color: #0F172A; font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px;">Verify your move</h1>
                        </td>
                      </tr>

                      <!-- Body -->
                      <tr>
                        <td style="padding: 0 40px 40px 40px; text-align: center;">
                          <p style="margin: 0 0 24px 0; color: #475569; font-size: 18px; line-height: 1.6; font-weight: 500;">
                            Hi ${escapeHtml(data.firstName)},<br>
                            Here is your 6-digit verification code. This code helps us confirm your request is genuine and expires after 15 minutes:
                          </p>

                          <div style="background-color: #F8FAFC; border: 2px dashed #E2E8F0; border-radius: 16px; padding: 32px; margin-bottom: 32px;">
                            <span style="color: #F97316; font-size: 56px; font-weight: 900; letter-spacing: 12px; font-family: 'Courier New', Courier, monospace;">${otp}</span>
                          </div>

                          <p style="margin: 0 0 32px 0; color: #64748B; font-size: 14px; line-height: 1.6;">
                            This code is for your move from <strong>${escapeHtml(data.collectionPostcode)}</strong> to <strong>${escapeHtml(data.deliveryPostcode)}</strong> on ${escapeHtml(data.moveDate)}.
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
          console.error('Resend API Error — name:', emailError.name);
          console.error('Resend API Error — message:', emailError.message);
          console.error('Resend API Error — full object:', JSON.stringify(emailError, null, 2));
        } else {
          console.log('Email successfully sent! ID:', emailResponse?.id);
        }
      }
    } catch (emailError: any) {
      console.error('Unexpected error in email logic — name:', emailError.name);
      console.error('Unexpected error in email logic — message:', emailError.message);
      console.error('Unexpected error in email logic — full object:', emailError);
    }

    return NextResponse.json({ id: request.id });
  } catch (error: any) {
    console.error('General API Error — name:', error.name);
    console.error('General API Error — message:', error.message);
    console.error('General API Error — full object:', error);
    return NextResponse.json({ error: 'Server Error', message: error.message }, { status: 500 });
  }
}
