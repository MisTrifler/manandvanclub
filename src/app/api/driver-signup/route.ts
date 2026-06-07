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
      if (error.code === '23505') {
        return NextResponse.json({ error: 'This email has already applied.' }, { status: 400 });
      }
      throw error;
    }

    // 2. Send Confirmation Email to Driver
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Man & Van Club <no-reply@manandvanclub.co.uk>',
        to: [data.email],
        subject: 'Application Received - Man & Van Club',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
            <h2 style="color: #0F172A;">Application Under Review</h2>
            <p>Hi ${data.contactName},</p>
            <p>Thank you for applying to join the Man & Van Club mover network.</p>
            <p>Our team manually reviews every application to ensure the highest quality for our customers. This usually takes <strong>24-48 hours</strong>.</p>
            <p>Once approved, you will receive an email with instructions on how to access the job feed.</p>
            <hr />
            <p style="font-size: 12px; color: #64748B;">© 2026 Man & Van Club Ltd</p>
          </div>
        `
      });

      // 3. Optional: Send Notification to YOU (Admin)
      await resend.emails.send({
        from: 'System <no-reply@manandvanclub.co.uk>',
        to: ['support@manandvanclub.co.uk'],
        subject: `New Mover App: ${data.company_name}`,
        text: `New driver application from ${data.contactName} (${data.companyName}). Area: ${data.coverageArea}`
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: 'Server Error', message: error.message }, { status: 500 });
  }
}
