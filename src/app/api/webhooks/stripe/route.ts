import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
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

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const { requestId, businessName } = session.metadata;

    try {
      // 1. Mark the job as 'locked' so no one else can buy it
      const { data: moveRequest, error: updateError } = await supabase
        .from('move_requests')
        .update({ 
          status: 'locked',
          locked_by: businessName,
          locked_at: new Date().toISOString()
        })
        .eq('id', requestId)
        .select()
        .single();

      if (updateError) throw updateError;

      // 2. Send the Customer's REAL details to the Driver
      await resend.emails.send({
        from: 'Man and Van Club <leads@manandvanclub.co.uk>',
        to: [session.customer_details.email], // Driver's email from Stripe
        subject: `JOB UNLOCKED: ${moveRequest.first_name}'s Contact Details`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 2px solid #F97316; padding: 30px; border-radius: 20px;">
            <h2 style="color: #0F172A; text-transform: uppercase;">Lead Unlocked Successfully</h2>
            <p>Hi ${businessName},</p>
            <p>You have successfully unlocked the contact details for this customer. Please contact them immediately to provide your quote.</p>
            
            <div style="background: #F8FAFC; padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #E2E8F0;">
              <h3 style="margin-top: 0; color: #F97316;">Customer Details</h3>
              <p style="font-size: 18px; margin: 5px 0;"><strong>Name:</strong> ${moveRequest.first_name}</p>
              <p style="font-size: 18px; margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${moveRequest.phone}">${moveRequest.phone}</a></p>
              <p style="font-size: 18px; margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${moveRequest.email}">${moveRequest.email}</a></p>
            </div>

            <div style="background: #FFF7ED; padding: 20px; border-radius: 12px; border: 1px solid #FFEDD5;">
              <p style="margin: 0; font-size: 13px; color: #9A3412;"><strong>Pro Tip:</strong> Customers are 70% more likely to book if you call them within the first 15 minutes of unlocking.</p>
            </div>

            <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #94A3B8; text-align: center;">© 2026 Man and Van Club</p>
          </div>
        `
      });

      // 3. Optional: Notify the Customer they've been matched
      await resend.emails.send({
        from: 'Man and Van Club <no-reply@manandvanclub.co.uk>',
        to: [moveRequest.email],
        subject: `You've been matched! ${businessName} will contact you shortly`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
            <h2>Great news!</h2>
            <p>Hi ${moveRequest.first_name},</p>
            <p>A professional mover from <strong>${businessName}</strong> has accepted your request for your move on ${moveRequest.move_date}.</p>
            <p>They will be in touch shortly via phone or email to provide your exclusive quote.</p>
            <hr />
            <p style="font-size: 12px; color: #64748B;">You are under no obligation to accept their quote.</p>
            <p style="font-size: 12px; color: #94A3B8;">© 2026 Man and Van Club</p>
          </div>
        `
      });

    } catch (err: any) {
      console.error('Webhook processing error:', err.message);
      return NextResponse.json({ error: 'Processing Failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
