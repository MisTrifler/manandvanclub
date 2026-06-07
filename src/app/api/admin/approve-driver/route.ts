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

    // 3. Send "Welcome" Email if Approved
    if (status === 'approved' && process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Man & Van Club <support@manandvanclub.co.uk>',
        to: [driver.email],
        subject: 'Approved: Welcome to the Man & Van Club Network!',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 30px; border-radius: 20px;">
            <h2 style="color: #0F172A;">CONGRATULATIONS!</h2>
            <p>Hi ${driver.contact_name},</p>
            <p>Your application to join **Man & Van Club** has been **OFFICIALLY APPROVED**.</p>
            
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
            <p style="font-size: 12px; color: #94A3B8; text-align: center;">© 2026 Man & Van Club Ltd. All rights reserved.</p>
          </div>
        `
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Approval API Error:', error);
    return NextResponse.json({ error: 'Server Error', message: error.message }, { status: 500 });
  }
}
