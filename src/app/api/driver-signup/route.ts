import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Insert into driver_applications
    const { error } = await supabase
      .from('driver_applications')
      .insert([
        {
          company_name: data.companyName,
          contact_name: data.contactName,
          phone: data.phone,
          email: data.email,
          coverage_area: data.coverageArea,
          radius: data.radius,
          has_insurance: data.hasInsurance,
          status: 'pending'
        }
      ]);

    if (error) {
      console.error('Supabase Driver Signup Error:', error);
      if (error.code === '23505') {
        return NextResponse.json({ error: 'This email has already applied.' }, { status: 400 });
      }
      // Return specific error details to help debug
      return NextResponse.json({ error: 'Database error', details: error.message, code: error.code }, { status: 500 });
    }

    // 2. Send Confirmation Email to Driver
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Man and Van Club <support@manandvanclub.co.uk>',
          to: [data.email],
          subject: 'Action Required: Verify Your Man and Van Club Application',
          replyTo: 'support@manandvanclub.co.uk',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; line-height: 1.6; color: #0F172A;">
              <p>Dear Applicant,</p>
              <p>Thank you for applying to join <strong>Man and Van Club</strong>.</p>
              <p>We have successfully received your application and it is currently under review by our team.</p>
              <p>To complete the verification process and avoid any delays in approving your account, <strong>please reply to this email with copies of the following documents:</strong></p>
              <ul style="list-style-type: disc; padding-left: 20px;">
                <li>Public Liability Insurance Certificate (minimum £1 million cover recommended)</li>
                <li>Goods in Transit Insurance Certificate (where applicable)</li>
              </ul>
              <p>Please ensure that all insurance documents are valid, current, and issued in the same company or trading name used on your application. We are unable to approve applications where the insurance details do not match the business information provided.</p>
              <p>Your application will remain pending until the required documents have been received and verified.</p>
              <p>Once verification is complete, we will notify you of the outcome and provide access to your driver account if approved.</p>
              <p>If you have any questions, please reply to this email and a member of our team will be happy to assist.</p>
              <p>Kind regards,</p>
              <p><strong>Man and Van Club</strong><br />Driver Approval Team</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
              <p style="font-size: 11px; color: #94A3B8; text-align: center;">© 2026 Man and Van Club</p>
            </div>
          `
        });

        // 3. Notification to YOU (Admin)
        await resend.emails.send({
          from: 'Man and Van Club <no-reply@manandvanclub.co.uk>',
          to: ['support@manandvanclub.co.uk'],
          subject: `New Mover App: ${data.companyName}`,
          text: `New driver application from ${data.contactName} (${data.companyName}). Area: ${data.coverageArea}`
        });
      } catch (emailErr) {
        console.error('Non-blocking Email Error:', emailErr);
        // We don't return error here because the DB insert was successful
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: 'Server Error', message: error.message }, { status: 500 });
  }
}
