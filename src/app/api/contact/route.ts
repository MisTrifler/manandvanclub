import { NextResponse } from 'next/server';
import { resend, SENDER_ADDRESS, REPLY_TO_ADDRESS } from '@/lib/resend';
import { escapeHtml } from '@/lib/html';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, subject, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: SENDER_ADDRESS,
        to: ['support@manandvanclub.co.uk'],
        replyTo: REPLY_TO_ADDRESS,
        subject: `New Contact Form Submission: ${(subject || 'General Enquiry').slice(0, 120)}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
            <h2 style="color: #0F172A;">New Message from ${escapeHtml(name)}</h2>
            <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject || 'General Enquiry')}</p>
            <hr />
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
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
