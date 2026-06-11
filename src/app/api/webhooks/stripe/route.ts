import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { resend } from '@/lib/resend';
import { headers } from 'next/headers';
import {
  formatUKPostcode,
  formatDisplayDate,
  formatMoveType,
} from "@/lib/formatting";

const SENDER_ADDRESS = 'Man and Van Club <support@manandvanclub.co.uk>';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const metadata = session.metadata || {};
    const paymentType = metadata.paymentType || 'driver_lead_unlock'; // default for legacy sessions

    if (paymentType === 'customer_booking_fee') {
      await handleCustomerBookingFee(session, metadata);
    } else {
      // Legacy driver-paid lead unlock flow
      await handleDriverLeadUnlock(session, metadata);
    }
  }

  return NextResponse.json({ received: true });
}

async function handleCustomerBookingFee(session: any, metadata: any) {
  const requestId = metadata.requestId;
  const token = metadata.token;

  if (!requestId) {
    console.error('[webhook] customer_booking_fee: missing requestId');
    return;
  }

  const supabaseAdmin = getSupabaseAdmin();

  try {
    // 1. Fetch the move request
    const { data: existing } = await supabaseAdmin
      .from('move_requests')
      .select('status, booking_fee_paid, quoted_by, email, first_name, phone, collection_postcode, delivery_postcode, move_date, move_type, quote_amount, booking_fee')
      .eq('id', requestId)
      .single();

    if (!existing) {
      console.error('[webhook] customer_booking_fee: request not found', requestId);
      return;
    }

    // 2. Idempotency: already paid
    if (existing.booking_fee_paid) {
      console.log('[webhook] customer_booking_fee: already paid, skipping', requestId);
      return;
    }

    // 3. Must be quoted
    if (existing.status !== 'quoted') {
      console.warn('[webhook] customer_booking_fee: status is not quoted', requestId, existing.status);
      return;
    }

    // 4. Update request to booked
    await supabaseAdmin
      .from('move_requests')
      .update({
        status: 'booked',
        booking_fee_paid: true,
        booking_fee_paid_at: new Date().toISOString(),
        booking_fee_stripe_session_id: session.id,
        customer_accepted_quote_at: new Date().toISOString(),
        customer_details_released_at: new Date().toISOString(),
      })
      .eq('id', requestId);

    // 5. Email mover with customer details
    if (existing.quoted_by && process.env.RESEND_API_KEY) {
      const moveType = formatMoveType(existing.move_type);
      const colPostcode = formatUKPostcode(existing.collection_postcode);
      const delPostcode = formatUKPostcode(existing.delivery_postcode);
      const moveDate = formatDisplayDate(existing.move_date);

      await resend.emails.send({
        from: SENDER_ADDRESS,
        to: [existing.quoted_by],
        subject: `Customer-confirmed booking: ${colPostcode} to ${delPostcode}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
            <div style="text-align: center; margin-bottom: 30px;">
              <span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M&amp;V</span>
            </div>
            <h2 style="color: #0F172A; font-size: 24px; margin: 0 0 20px 0;">Customer-Confirmed Booking</h2>
            <p style="color: #475569; font-size: 16px;">Hi there,</p>
            <p style="color: #475569; font-size: 16px;">The customer has accepted your quote and paid the booking fee.</p>

            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin: 24px 0;">
              <p style="margin: 0 0 8px 0;"><strong>Customer name:</strong> ${existing.first_name || '—'}</p>
              <p style="margin: 0 0 8px 0;"><strong>Phone:</strong> <a href="tel:${existing.phone}" style="color: #F97316;">${existing.phone}</a></p>
              <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${existing.email}" style="color: #F97316;">${existing.email}</a></p>
              <p style="margin: 0 0 8px 0;"><strong>Route:</strong> ${colPostcode} to ${delPostcode}</p>
              <p style="margin: 0 0 8px 0;"><strong>Date:</strong> ${moveDate}</p>
              <p style="margin: 0;"><strong>Your quote:</strong> £${(existing.quote_amount || 0).toFixed(2)}</p>
            </div>

            <div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 16px; margin: 24px 0;">
              <strong style="color: #92400E;">Next step:</strong>
              <span style="color: #92400E;">Contact the customer as soon as possible to confirm timing, access and payment method.</span>
            </div>

            <p style="color: #64748B; font-size: 14px; margin-top: 30px;">The customer will pay the move cost directly to you.</p>
            <p style="color: #64748B; font-size: 14px; margin-top: 10px;">© 2026 Man and Van Club</p>
          </div>
        `,
      });
    }

    // 6. Email customer confirmation
    if (existing.email && process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: SENDER_ADDRESS,
        to: [existing.email],
        subject: 'Your booking is confirmed',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
            <div style="text-align: center; margin-bottom: 30px;">
              <span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M&amp;V</span>
            </div>
            <h2 style="color: #0F172A; font-size: 24px; margin: 0 0 20px 0;">Your Booking Is Confirmed</h2>
            <p style="color: #475569; font-size: 16px;">Hi ${existing.first_name || 'there'},</p>
            <p style="color: #475569; font-size: 16px;">Your booking fee has been paid and your details have been released to the mover.</p>
            <p style="color: #475569; font-size: 16px;">The mover will contact you directly to confirm timing, access and payment method.</p>

            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin: 24px 0;">
              <p style="margin: 0 0 8px 0;"><strong>Mover quote:</strong> £${(existing.quote_amount || 0).toFixed(2)}</p>
              <p style="margin: 0 0 8px 0;"><strong>Booking fee paid:</strong> £${(existing.booking_fee || 0).toFixed(2)}</p>
              <p style="margin: 0;"><strong>Remaining move cost:</strong> £${(existing.quote_amount || 0).toFixed(2)}</p>
            </div>

            <p style="color: #64748B; font-size: 14px; margin-top: 30px;">The remaining move cost is paid directly to the mover.</p>
            <p style="color: #64748B; font-size: 14px; margin-top: 10px;">© 2026 Man and Van Club</p>
          </div>
        `,
      });
    }

    console.log('[webhook] customer_booking_fee: processed successfully', requestId);
  } catch (err: any) {
    console.error('[webhook] customer_booking_fee error:', err.message);
  }
}

async function handleDriverLeadUnlock(session: any, metadata: any) {
  const { requestId, driverEmail } = metadata;

  if (!requestId || !driverEmail) {
    console.error('[webhook] driver_lead_unlock: missing requestId or driverEmail');
    return;
  }

  const supabaseAdmin = getSupabaseAdmin();

  try {
    const { data: existing } = await supabaseAdmin
      .from('move_requests')
      .select('status, locked_by')
      .eq('id', requestId)
      .single();

    if (existing?.status === 'locked') {
      console.warn(
        `[webhook] driver_lead_unlock: duplicate payment for request ${requestId}. ` +
        `Already locked by ${existing.locked_by}. Driver: ${driverEmail}. Session: ${session.id}`
      );
      return;
    }

    const { data: moveRequest, error: updateError } = await supabaseAdmin
      .from('move_requests')
      .update({
        status: 'locked',
        locked_by: driverEmail,
        locked_at: new Date().toISOString(),
      })
      .eq('id', requestId)
      .select()
      .single();

    if (updateError) throw updateError;

    // Email driver
    await resend.emails.send({
      from: SENDER_ADDRESS,
      to: [driverEmail],
      subject: `Lead Unlocked: ${moveRequest.first_name} - ${moveRequest.collection_postcode} → ${moveRequest.delivery_postcode}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M&amp;V</span>
          </div>
          <h2 style="color: #0F172A; font-size: 24px; margin: 0 0 20px 0;">Lead Unlocked Successfully</h2>
          <p style="color: #475569; font-size: 16px;">Hi there,</p>
          <p style="color: #475569; font-size: 16px;">You have unlocked the following lead:</p>
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Customer:</strong> ${moveRequest.first_name}</p>
            <p style="margin: 0 0 8px 0;"><strong>Phone:</strong> <a href="tel:${moveRequest.phone}" style="color: #F97316;">${moveRequest.phone}</a></p>
            <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${moveRequest.email}" style="color: #F97316;">${moveRequest.email}</a></p>
            <p style="margin: 0 0 8px 0;"><strong>Route:</strong> ${moveRequest.collection_postcode} → ${moveRequest.delivery_postcode}</p>
            <p style="margin: 0;"><strong>Date:</strong> ${moveRequest.move_date}</p>
          </div>
          <p style="color: #64748B; font-size: 14px; margin-top: 30px;">© 2026 Man and Van Club</p>
        </div>
      `,
    });

    // Email customer
    await resend.emails.send({
      from: SENDER_ADDRESS,
      to: [moveRequest.email],
      subject: `A mover has unlocked your move request`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M&amp;V</span>
          </div>
          <h2 style="color: #0F172A; font-size: 24px;">Great news!</h2>
          <p style="color: #475569; font-size: 16px;">Hi ${moveRequest.first_name},</p>
          <p style="color: #475569; font-size: 16px;"><strong>A mover</strong> has unlocked your move request and will contact you shortly.</p>
          <div style="background: #F0FDF4; border-left: 4px solid #22C55E; padding: 16px; margin: 24px 0;">
            <p style="margin: 0; color: #166534; font-size: 15px;">You are under no obligation to accept their quote. Take your time and compare if needed.</p>
          </div>
          <p style="color: #64748B; font-size: 14px; margin-top: 30px;">© 2026 Man and Van Club</p>
        </div>
      `,
    });

  } catch (err: any) {
    console.error('[webhook] driver_lead_unlock error:', err.message);
  }
}
