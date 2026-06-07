import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const { requestId, otp } = await req.json();

    if (!requestId || !otp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Check if OTP matches
    const { data: request, error: fetchError } = await supabase
      .from('move_requests')
      .select('otp_code, is_verified')
      .eq('id', requestId)
      .single();

    if (fetchError || !request) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    if (request.is_verified) {
      return NextResponse.json({ message: 'Already verified' });
    }

    if (request.otp_code !== otp) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    // 2. Update status to active and is_verified to true
    const { error: updateError } = await supabase
      .from('move_requests')
      .update({ 
        is_verified: true, 
        status: 'active',
        verified_at: new Date().toISOString()
      })
      .eq('id', requestId);

    if (updateError) {
      throw updateError;
    }

    // 3. Find Matching Drivers and Notify them
    try {
      // Get the move request details to find the location
      const { data: moveRequest } = await supabase
        .from('move_requests')
        .select('*')
        .eq('id', requestId)
        .single();

      if (moveRequest) {
        // Find approved drivers in that area
        const { data: matchingDrivers } = await supabase
          .from('driver_applications')
          .select('email, contact_name')
          .eq('status', 'approved'); 
          // Note: For launch, we'll email all approved drivers. 
          // Later we can filter by .ilike('coverage_area', `%${moveRequest.collection_postcode.split(' ')[0]}%`)

        if (matchingDrivers && matchingDrivers.length > 0) {
          for (const driver of matchingDrivers) {
            await resend.emails.send({
              from: 'Man & Van Club <leads@manandvanclub.co.uk>',
              to: [driver.email],
              subject: `New Move Request: ${moveRequest.move_type} in ${moveRequest.collection_postcode}`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
                  <h2 style="color: #0F172A;">NEW JOB ALERT</h2>
                  <p>Hi ${driver.contact_name},</p>
                  <p>A new verified move request has just been submitted in your area:</p>
                  <div style="background: #F8FAFC; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <p><strong>Route:</strong> ${moveRequest.collection_postcode} → ${moveRequest.delivery_postcode}</p>
                    <p><strong>Date:</strong> ${moveRequest.move_date}</p>
                    <p><strong>Type:</strong> ${moveRequest.move_type}</p>
                  </div>
                  <p>This is an <strong>exclusive lead</strong>. Only the first mover to unlock it will get the customer details.</p>
                  <a href="https://www.manandvanclub.co.uk/marketplace?id=${requestId}" 
                     style="display: block; background: #F97316; color: white; padding: 15px; text-align: center; text-decoration: none; font-weight: bold; border-radius: 8px;">
                    Unlock Lead Details Now
                  </a>
                  <p style="font-size: 12px; color: #94A3B8; margin-top: 20px;">© 2026 Man & Van Club Ltd</p>
                </div>
              `
            });
          }
        }
      }
    } catch (notifyError) {
      console.error('Notification Error:', notifyError);
      // Non-blocking: we still return success to the customer
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Verification Error:', error);
    return NextResponse.json({ error: 'Server Error', message: error.message }, { status: 500 });
  }
}
