import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export async function POST(req: Request) {
  try {
    const { requestId, fee, businessName } = await req.json();

    // Fetch move request details for the checkout display
    const supabaseAdmin = getSupabaseAdmin();
    const { data: lead } = await supabaseAdmin
      .from('move_requests')
      .select('move_type, collection_postcode, delivery_postcode, move_date')
      .eq('id', requestId)
      .single();

    const moveType = lead?.move_type || 'Move';
    const colPostcode = lead?.collection_postcode || '';
    const delPostcode = lead?.delivery_postcode || '';
    const routeText = colPostcode || delPostcode
      ? `${colPostcode} → ${delPostcode}`
      : '';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: 'Exclusive Lead Access',
              description: `One-time exclusive intro fee for access to a verified customer enquiry. This is not a guaranteed booking. Final price and availability are agreed directly with the customer.${routeText ? `\n${moveType} • ${routeText}` : ''}`,
            },
            unit_amount: Math.round(fee * 100), // convert to pence
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/marketplace/success?requestId=${requestId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/marketplace/cancel`,
      metadata: {
        requestId,
        businessName,
        moveType,
        collectionPostcode: colPostcode,
        deliveryPostcode: delPostcode,
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
