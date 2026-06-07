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
      // Check if lead is already locked
      const { data: existing } = await supabaseAdmin
        .from('move_requests')
        .select('status, locked_by')
        .eq('id', requestId)
        .single();

      if (existing?.status === 'locked') {
        console.log(`Lead ${requestId} already locked by ${existing.locked_by}`);
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

      // Send customer details to driver
      await resend.emails.send({
        from: 'Man and Van Club <leads@manandvanclub.co.uk>',
        to: [session.customer_details.email],
        subject: `JOB UNLOCKED: ${moveRequest.first_name}'s Contact Details`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 2px solid #F97316; padding: 30px; border-radius: 20px;">
            <h2 style="color: #0F172A; text-transform: uppercase;">Lead Unlocked Successfully</h2>
            <p>Hi ${businessName},</p>
            <p>You have successfully unlocked the contact details for this customer.</p>
            
            <div style="background: #F8FAFC; padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #E2E8F0;">
              <h3 style="margin-top: 0; color: #F97316;">Customer Details</h3>
              <p style="font-size: 18px; margin: 5px 0;"><strong>Name:</strong> ${moveRequest.first_name}</p>
              <p style="font-size: 18px; margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${moveRequest.phone}">${moveRequest.phone}</a></p>
              <p style="font-size: 18px; margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${moveRequest.email}">${moveRequest.email}</a></p>
            </div>

            <p style="font-size: 13px; color: #9A3412;"><strong>Tip:</strong> Contact the customer quickly for higher conversion.</p>
            <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #94A3B8; text-align: center;">© 2026 Man and Van Club</p>
          </div>
        `,
      });

      // Notify customer
      await resend.emails.send({
        from: 'Man and Van Club <no-reply@manandvanclub.co.uk>',
        to: [moveRequest.email],
        subject: `You've been matched with ${businessName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
            <h2>Great news!</h2>
            <p>Hi ${moveRequest.first_name},</p>
            <p><strong>${businessName}</strong> has unlocked your move request.</p>
            <p>They will contact you shortly.</p>
            <p style="font-size: 12px; color: #64748B;">You are under no obligation to accept their quote.</p>
            <p style="font-size: 12px; color: #94A3B8;">© 2026 Man and Van Club</p>
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
