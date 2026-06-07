import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const { driverId, status } = await req.json();

    if (!driverId || !status) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // 1. Get Driver Info
    const { data: driver, error: fetchError } = await supabase
      .from('driver_applications')
      .select('*')
      .eq('id', driverId)
      .single();

    if (fetchError || !driver) throw new Error('Driver not found');

    // 2. Update Status in Database
    const { error: updateError } = await supabase
      .from('driver_applications')
      .update({ status })
      .eq('id', driverId);

    if (updateError) throw updateError;

    // 3. Send Emails based on status
    if (process.env.RESEND_API_KEY) {
      if (status === 'approved') {
        await resend.emails.send({
          from: 'Man and Van Club <support@manandvanclub.co.uk>',
          to: [driver.email],
          subject: 'Approved: Welcome to the Man and Van Club Network!',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 30px; border-radius: 20px;">
              <h2 style="color: #0F172A;">CONGRATULATIONS!</h2>
              <p>Hi ${driver.contact_name},</p>
              <p>Your application to join **Man and Van Club** has been **OFFICIALLY APPROVED**.</p>
              
              <div style="background: #F8FAFC; padding: 20px; border-radius: 12px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #F97316;">What happens now?</h3>
                <ul style="padding-left: 20px; color: #475569;">
                  <li><strong>Live Alerts:</strong> You will now receive "New Job Alert" emails the moment a customer in your area submits a request.</li>
                  <li><strong>Exclusive Leads:</strong> These leads are 1-to-1. The first mover to unlock the lead gets exclusive access.</li>
                  <li><strong>No Bidding:</strong> Once you unlock a lead, the customer's real phone and email will be sent to you instantly.</li>
                </ul>
              </div>

              <p>We are excited to have ${driver.company_name} in our network.</p>
              
              <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;" />
              <p style="font-size: 12px; color: #94A3B8; text-align: center;">© 2026 Man and Van Club. All rights reserved.</p>
            </div>
          `
        });
      } else if (status === 'rejected') {
        await resend.emails.send({
          from: 'Man and Van Club <support@manandvanclub.co.uk>',
          to: [driver.email],
          subject: 'Update regarding your application - Man and Van Club',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 30px; border-radius: 20px;">
              <h2 style="color: #0F172A;">Application Update</h2>
              <p>Hi ${driver.contact_name},</p>
              <p>Thank you for your interest in joining the Man and Van Club mover network.</p>
              <p>We have carefully reviewed your application for **${driver.company_name}**. Unfortunately, we are unable to approve your application at this time.</p>
              
              <p style="color: #475569; line-height: 1.6;">
                To maintain the quality and exclusivity of our network, we have strict criteria for all our partners. While we cannot provide specific feedback on every application, common reasons for rejection include incomplete insurance details or coverage areas that are currently at capacity.
              </p>

              <p>We wish you the best of luck with your business.</p>
              
              <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;" />
              <p style="font-size: 12px; color: #94A3B8; text-align: center;">© 2026 Man and Van Club</p>
            </div>
          `
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Approval API Error:', error);
    return NextResponse.json({ error: 'Server Error', message: error.message }, { status: 500 });
  }
}
