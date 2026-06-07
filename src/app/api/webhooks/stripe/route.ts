import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { resend } from '@/lib/resend';
import { headers } from 'next/headers';

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
    const { requestId, businessName } = session.metadata;

    const supabaseAdmin = getSupabaseAdmin();

    try {
      // Check if already locked
      const { data: existing } = await supabaseAdmin
        .from('move_requests')
        .select('status, locked_by')
        .eq('id', requestId)
        .single();

      if (existing?.status === 'locked') {
        return NextResponse.json({ received: true });
      }

      // Lock the lead
      const { data: moveRequest, error: updateError } = await supabaseAdmin
        .from('move_requests')
        .update({
          status: 'locked',
          locked_by: businessName,
          locked_at: new Date().toISOString(),
        })
        .eq('id', requestId)
        .select()
        .single();

      if (updateError) throw updateError;

      // === EMAIL TO DRIVER ===
      await resend.emails.send({
        from: 'Man and Van Club <leads@manandvanclub.co.uk>',
        to: [session.customer_details.email],
        subject: `Lead Unlocked: ${moveRequest.first_name} - ${moveRequest.collection_postcode} → ${moveRequest.delivery_postcode}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
            <div style="text-align: center; margin-bottom: 30px;">
              <span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M&amp;V</span>
            </div>
            
            <h2 style="color: #0F172A; font-size: 24px; margin: 0 0 20px 0;">Lead Unlocked Successfully</h2>
            
            <p style="color: #475569; font-size: 16px;">Hi ${businessName},</p>
            <p style="color: #475569; font-size: 16px;">You have unlocked the following lead:</p>
            
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin: 24px 0;">
              <p style="margin: 0 0 8px 0;"><strong>Customer:</strong> ${moveRequest.first_name}</p>
              <p style="margin: 0 0 8px 0;"><strong>Phone:</strong> <a href="tel:${moveRequest.phone}" style="color: #F97316;">${moveRequest.phone}</a></p>
              <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${moveRequest.email}" style="color: #F97316;">${moveRequest.email}</a></p>
              <p style="margin: 0 0 8px 0;"><strong>Route:</strong> ${moveRequest.collection_postcode} → ${moveRequest.delivery_postcode}</p>
              <p style="margin: 0;"><strong>Date:</strong> ${moveRequest.move_date}</p>
            </div>

            <div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 16px; margin: 24px 0;">
              <strong style="color: #92400E;">Pro Tip:</strong> 
              <span style="color: #92400E;">Contact the customer within the first 15 minutes for the highest chance of securing the job.</span>
            </div>

            <p style="color: #64748B; font-size: 14px; margin-top: 30px;">© 2026 Man and Van Club</p>
          </div>
        `,
      });

      // === EMAIL TO CUSTOMER ===
      await resend.emails.send({
        from: 'Man and Van Club <no-reply@manandvanclub.co.uk>',
        to: [moveRequest.email],
        subject: `${businessName} has unlocked your move request`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
            <div style="text-align: center; margin-bottom: 30px;">
              <span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M&amp;V</span>
            </div>
            
            <h2 style="color: #0F172A; font-size: 24px;">Great news!</h2>
            
            <p style="color: #475569; font-size: 16px;">Hi ${moveRequest.first_name},</p>
            <p style="color: #475569; font-size: 16px;"><strong>${businessName}</strong> has unlocked your move request and will contact you shortly.</p>
            
            <div style="background: #F0FDF4; border-left: 4px solid #22C55E; padding: 16px; margin: 24px 0;">
              <p style="margin: 0; color: #166534; font-size: 15px;">
                You are under no obligation to accept their quote. Take your time and compare if needed.
              </p>
            </div>

            <p style="color: #64748B; font-size: 14px; margin-top: 30px;">© 2026 Man and Van Club</p>
          </div>
        `,
      });

    } catch (err: any) {
      console.error('Webhook processing error:', err.message);
      return NextResponse.json({ error: 'Processing Failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
