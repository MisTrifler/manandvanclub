import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const name = escapeHtml(data.name || '');
    const email = escapeHtml(data.email || '');
    const subject = escapeHtml(data.subject || '');
    const message = escapeHtml(data.message || '');

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Man and Van Club <support@manandvanclub.co.uk>',
        to: ['support@manandvanclub.co.uk'],
        subject: `New Contact Form Submission: ${subject || 'General Enquiry'}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
            <h2 style="color: #0F172A;">New Message from ${name}</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject || 'General Enquiry'}</p>
            <hr />
            <p style="white-space: pre-wrap;">${message}</p>
            <hr />
            <p style="font-size: 12px; color: #94A3B8;">© 2026 Man and Van Club</p>
          </div>
        `
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact Form Error:', error);
    return NextResponse.json({ error: 'Server Error', message: error.message }, { status: 500 });
  }
}
