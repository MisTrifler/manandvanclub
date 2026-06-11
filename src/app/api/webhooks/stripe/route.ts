import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { resend } from '@/lib/resend';
import { headers } from 'next/headers';
import { calculateBookingDeposit, calculateRemainingMoverBalance, normaliseQuoteAmount, toStripePence, formatPounds } from '@/lib/booking-fee';
import { escapeHtml } from '@/lib/html';
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

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ received: true, skipped: 'payment_not_paid' });
    }

    const metadata = session.metadata || {};

    if (metadata.paymentType === 'customer_booking_deposit' || metadata.paymentType === 'customer_booking_fee') {
      await handleCustomerBookingDeposit(session, metadata);
    } else {
      await handleLegacyDriverPayment(session, metadata);
    }
  }

  return NextResponse.json({ received: true });
}

async function handleCustomerBookingDeposit(session: any, metadata: any) {
  const requestId = metadata.requestId;

  if (!requestId) {
    console.error('[webhook] customer_booking_deposit: missing requestId');
    return;
  }

  const supabaseAdmin = getSupabaseAdmin();

  try {
    const { data: existing } = await supabaseAdmin
      .from('move_requests')
      .select('id, status, booking_fee_paid, booking_fee_stripe_session_id, customer_details_released_at, quoted_by, email, first_name, phone, collection_postcode, delivery_postcode, move_date, move_type, quote_amount, booking_fee, admin_notes')
      .eq('id', requestId)
      .single();

    if (!existing) {
      console.error('[webhook] customer_booking_deposit: request not found');
      return;
    }

    if (existing.booking_fee_paid === true && existing.status === 'booked' && existing.customer_details_released_at) {
      console.log('[webhook] customer_booking_deposit: already processed');
      return;
    }

    if (existing.status !== 'quoted') {
      console.warn('[webhook] customer_booking_deposit: request not in quoted state, skipping');
      return;
    }

    if (!existing.quoted_by || !existing.quote_amount) {
      console.warn('[webhook] customer_booking_deposit: quote incomplete, skipping');
      return;
    }

    const quoteAmount = normaliseQuoteAmount(existing.quote_amount);
    const bookingDeposit = calculateBookingDeposit(quoteAmount);
    const remainingMoverBalance = calculateRemainingMoverBalance(quoteAmount, bookingDeposit);
    const expectedPence = toStripePence(bookingDeposit);
    const actualPence = typeof session.amount_total === 'number' ? session.amount_total : null;

    if (actualPence === null || actualPence < expectedPence) {
      const note = actualPence === null
        ? `Stripe payment requires admin review: amount_total missing for session ${session.id}.`
        : `Stripe payment under expected booking deposit: expected ${expectedPence}p, received ${actualPence}p, session ${session.id}. Customer details were not released.`;
      console.warn('[webhook] customer_booking_deposit: payment amount unsafe; booking left for admin review');
      await supabaseAdmin
        .from('move_requests')
        .update({
          booking_fee: bookingDeposit,
          booking_fee_stripe_session_id: session.id,
          admin_notes: `${existing.admin_notes ? `${existing.admin_notes}\n` : ''}${note}`,
        })
        .eq('id', requestId);
      return;
    }

    if (actualPence > expectedPence) {
      console.warn('[webhook] customer_booking_deposit: Stripe amount higher than expected; processing with server-calculated booking deposit');
    }

    const now = new Date().toISOString();

    const { data: bookedRequest, error: updateError } = await supabaseAdmin
      .from('move_requests')
      .update({
        status: 'booked',
        booking_fee: bookingDeposit,
        booking_fee_paid: true,
        booking_fee_paid_at: now,
        booking_fee_stripe_session_id: session.id,
        customer_accepted_quote_at: now,
        customer_details_released_at: now,
      })
      .eq('id', requestId)
      .eq('status', 'quoted')
      .is('customer_details_released_at', null)
      .or('booking_fee_paid.is.null,booking_fee_paid.eq.false')
      .select('*')
      .single();

    if (updateError || !bookedRequest) {
      console.warn('[webhook] customer_booking_deposit: booking update skipped; likely duplicate or changed state');
      return;
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('[webhook] RESEND_API_KEY missing — booking emails not sent');
      return;
    }

    const moveType = formatMoveType(bookedRequest.move_type);
    const colPostcode = formatUKPostcode(bookedRequest.collection_postcode);
    const delPostcode = formatUKPostcode(bookedRequest.delivery_postcode);
    const moveDate = formatDisplayDate(bookedRequest.move_date);

    const { data: driver } = await supabaseAdmin
      .from('driver_applications')
      .select('contact_name, email')
      .eq('email', bookedRequest.quoted_by)
      .single();

    const driverName = driver?.contact_name || 'there';

    if (bookedRequest.quoted_by) {
      await resend.emails.send({
        from: SENDER_ADDRESS,
        to: [bookedRequest.quoted_by],
        subject: `Customer-confirmed booking: ${colPostcode} to ${delPostcode}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
            <div style="text-align: center; margin-bottom: 30px;"><span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M&amp;V</span></div>
            <h2 style="color: #0F172A; font-size: 24px; margin: 0 0 20px 0;">Customer-Confirmed Booking</h2>
            <p style="color: #475569; font-size: 16px;">Hi ${escapeHtml(driverName)},</p>
            <p style="color: #475569; font-size: 16px;">The customer accepted your quote and paid the booking deposit to secure the booking.</p>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin: 24px 0;">
              <p style="margin: 0 0 8px 0;"><strong>Customer details:</strong></p>
              <p style="margin: 0 0 8px 0;"><strong>Name:</strong> ${escapeHtml(bookedRequest.first_name || '—')}</p>
              <p style="margin: 0 0 8px 0;"><strong>Phone:</strong> <a href="tel:${escapeHtml(bookedRequest.phone || '')}" style="color: #F97316;">${escapeHtml(bookedRequest.phone || '—')}</a></p>
              <p style="margin: 0 0 20px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(bookedRequest.email || '')}" style="color: #F97316;">${escapeHtml(bookedRequest.email || '—')}</a></p>
              <p style="margin: 0 0 8px 0;"><strong>Move details:</strong></p>
              <p style="margin: 0 0 8px 0;">${escapeHtml(moveType)}</p>
              <p style="margin: 0 0 8px 0;">${escapeHtml(colPostcode)} to ${escapeHtml(delPostcode)}</p>
              <p style="margin: 0 0 20px 0;">${escapeHtml(moveDate)}</p>
              <p style="margin: 0 0 8px 0;"><strong>Your total quote:</strong> ${formatPounds(quoteAmount)}</p>
              <p style="margin: 0 0 8px 0;"><strong>Deposit paid to secure booking:</strong> ${formatPounds(bookingDeposit)}</p>
              <p style="margin: 0;"><strong>Customer pays you on moving day:</strong> ${formatPounds(remainingMoverBalance)}</p>
            </div>
            <div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 16px; margin: 24px 0;">
              <strong style="color: #92400E;">Next step:</strong><span style="color: #92400E;"> Please contact the customer as soon as possible to confirm timing, access and payment method.</span>
            </div>
            <p style="color: #64748B; font-size: 14px; margin-top: 30px;">The customer has paid the booking deposit to secure your quote. This deposit is deducted from your total quote. You should collect the remaining balance directly from the customer on moving day, unless you agree another payment method with them.</p>
            <p style="color: #64748B; font-size: 14px; margin-top: 10px;">Man and Van Club<br />support@manandvanclub.co.uk</p>
          </div>
        `,
      });
    }

    if (bookedRequest.email) {
      await resend.emails.send({
        from: SENDER_ADDRESS,
        to: [bookedRequest.email],
        subject: 'Your booking is secured',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
            <div style="text-align: center; margin-bottom: 30px;"><span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M&amp;V</span></div>
            <h2 style="color: #0F172A; font-size: 24px; margin: 0 0 20px 0;">Your Booking Is Secured</h2>
            <p style="color: #475569; font-size: 16px;">Hi ${escapeHtml(bookedRequest.first_name || 'there')},</p>
            <p style="color: #475569; font-size: 16px;">Your booking is secured and your details have been released to the mover.</p>
            <p style="color: #475569; font-size: 16px;">The mover will contact you directly to confirm timing, access and payment method.</p>
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin: 24px 0;">
              <p style="margin: 0 0 8px 0;"><strong>Mover total quote:</strong> ${formatPounds(quoteAmount)}</p>
              <p style="margin: 0 0 8px 0;"><strong>Booking deposit paid:</strong> ${formatPounds(bookingDeposit)}</p>
              <p style="margin: 0 0 8px 0;"><strong>Pay mover on moving day:</strong> ${formatPounds(remainingMoverBalance)}</p>
              <p style="margin: 0;"><strong>Total move cost:</strong> ${formatPounds(quoteAmount)}</p>
            </div>
            <p style="color: #64748B; font-size: 14px; margin-top: 30px;">Your booking deposit is deducted from the mover’s quote. You pay the remaining balance directly to the mover on moving day.</p>
            <p style="color: #64748B; font-size: 14px; margin-top: 10px;">Man and Van Club<br />support@manandvanclub.co.uk</p>
          </div>
        `,
      });
    }

    console.log('[webhook] customer_booking_deposit: processed successfully');
  } catch (err: any) {
    console.error('[webhook] customer_booking_deposit error:', err.message);
  }
}

async function handleLegacyDriverPayment(session: any, metadata: any) {
  const requestId = metadata.requestId;
  const resolvedDriverEmail =
    metadata.driverEmail ||
    metadata.businessName ||
    session.customer_details?.email;

  if (!requestId) {
    console.error('[webhook] legacy driver payment: missing requestId');
    return;
  }

  if (!resolvedDriverEmail) {
    console.warn('[webhook] legacy driver payment: missing driver identity; details not released');
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
      console.warn('[webhook] legacy driver payment: duplicate payment detected');
      return;
    }

    const { data: moveRequest, error: updateError } = await supabaseAdmin
      .from('move_requests')
      .update({
        status: 'locked',
        locked_by: resolvedDriverEmail,
        locked_at: new Date().toISOString(),
      })
      .eq('id', requestId)
      .select()
      .single();

    if (updateError) throw updateError;

    if (!process.env.RESEND_API_KEY) {
      console.warn('[webhook] RESEND_API_KEY missing — legacy emails not sent');
      return;
    }

    await resend.emails.send({
      from: SENDER_ADDRESS,
      to: [resolvedDriverEmail],
      subject: `Legacy customer details: ${escapeHtml(moveRequest.collection_postcode)} to ${escapeHtml(moveRequest.delivery_postcode)}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
          <h2 style="color: #0F172A; font-size: 24px; margin: 0 0 20px 0;">Customer Details</h2>
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Customer:</strong> ${escapeHtml(moveRequest.first_name)}</p>
            <p style="margin: 0 0 8px 0;"><strong>Phone:</strong> ${escapeHtml(moveRequest.phone)}</p>
            <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${escapeHtml(moveRequest.email)}</p>
            <p style="margin: 0 0 8px 0;"><strong>Route:</strong> ${escapeHtml(moveRequest.collection_postcode)} to ${escapeHtml(moveRequest.delivery_postcode)}</p>
            <p style="margin: 0;"><strong>Date:</strong> ${escapeHtml(moveRequest.move_date)}</p>
          </div>
        </div>
      `,
    });
  } catch (err: any) {
    console.error('[webhook] legacy driver payment error:', err.message);
  }
}
