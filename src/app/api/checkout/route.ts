import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { cookies } from 'next/headers';
import { DRIVER_COOKIE_NAME, isValidDriverSession } from '@/lib/driver-auth';
import { calculateIntroductionFee } from '@/lib/fee-calculator';
import { formatUKPostcode } from '@/lib/formatting';

export async function POST(req: Request) {
  try {
    // 1. Verify driver is logged in from secure session cookie
    const cookieStore = cookies();
    const token = cookieStore.get(DRIVER_COOKIE_NAME)?.value;
    const driverEmail = isValidDriverSession(token);

    if (!driverEmail) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // 2. Parse body — only requestId is accepted from frontend
    const { requestId } = await req.json();

    if (!requestId || typeof requestId !== 'string') {
      return NextResponse.json({ error: 'Missing requestId' }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // 3. Verify driver is approved
    const { data: driver } = await supabaseAdmin
      .from('driver_applications')
      .select('id, email, status')
      .eq('email', driverEmail)
      .single();

    if (!driver || driver.status !== 'approved') {
      return NextResponse.json({ error: 'Driver not approved' }, { status: 403 });
    }

    // 4. Fetch the lead server-side
    const { data: lead } = await supabaseAdmin
      .from('move_requests')
      .select('id, move_type, collection_postcode, delivery_postcode, move_date, status, locked_by, details')
      .eq('id', requestId)
      .single();

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // 5. Prevent duplicate checkouts for locked leads
    if (lead.status === 'locked' || lead.locked_by) {
      return NextResponse.json(
        { error: 'This lead is no longer available.' },
        { status: 409 }
      );
    }

    // 6. Calculate the intro fee server-side (ignore any frontend value)
    const fee = calculateIntroductionFee(lead.move_type, lead.details);

    const moveType = lead.move_type || 'Move';
    const colPostcode = formatUKPostcode(lead.collection_postcode);
    const delPostcode = formatUKPostcode(lead.delivery_postcode);
    const routeText = colPostcode && delPostcode
      ? `${colPostcode} to ${delPostcode}`
      : colPostcode || delPostcode || '';

    const descriptionParts = [
      `${moveType} • ${routeText}`,
      'One-time exclusive intro fee for access to a verified customer enquiry.',
      'This is not a guaranteed booking. Final price and availability are agreed directly with the customer.',
    ].filter(Boolean);

    // 7. Create Stripe checkout session with server-side metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Exclusive Lead Access',
              description: descriptionParts.join('\n'),
            },
            unit_amount: Math.round(fee * 100), // convert to pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/marketplace/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/marketplace/cancel`,
      metadata: {
        requestId,
        driverEmail: driver.email,
        moveType,
        collectionPostcode: colPostcode,
        deliveryPostcode: delPostcode,
        calculatedLeadFee: fee.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal error' },
      { status: 500 }
    );
  }
}
