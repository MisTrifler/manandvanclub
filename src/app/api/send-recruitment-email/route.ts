import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { resend } from '@/lib/resend';
import { ADMIN_COOKIE_NAME, isValidAdminSession } from '@/lib/admin-auth';

export async function POST(req: Request) {
  try {
    // Admin-only: this endpoint sends branded outbound emails and must not be public
    const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
    if (!isValidAdminSession(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email, businessName, contactName } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Man and Van Club <support@manandvanclub.co.uk>',
      to: email,
      subject: 'Join Man and Van Club — Exclusive Mover Enquiries',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Join Man and Van Club</title>
          </head>
          <body style="margin:0;padding:0;background-color:#f9f9f7;font-family:'DM Sans',Arial,sans-serif;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td align="center" style="padding:40px 20px;">
                  <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #e0e0e0;">
                    <!-- Header -->
                    <tr>
                      <td style="background:#1B2D4F;padding:32px 40px;text-align:center;">
                        <div style="color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.5px;text-transform:uppercase;">
                          Man<span style="color:#F5781E;">&</span>Van Club
                        </div>
                        <div style="color:#F5781E;font-size:10px;font-weight:800;letter-spacing:0.4em;text-transform:uppercase;margin-top:4px;">The Club</div>
                      </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                      <td style="padding:40px;">
                        <p style="color:#1B2D4F;font-size:18px;font-weight:700;margin:0 0 20px 0;">Hi ${contactName || 'there'},</p>
                        <p style="color:#555555;font-size:15px;line-height:1.7;margin:0 0 24px 0;">
                          Thanks for your interest in joining <strong style="color:#1B2D4F;">Man and Van Club</strong>.
                          We connect verified movers with exclusive customer enquiries — no shared leads, just direct opportunities.
                        </p>
                        <p style="color:#555555;font-size:15px;line-height:1.7;margin:0 0 32px 0;">
                          Here's everything you need to get started:
                        </p>

                        <!-- CTA 1 -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:16px;">
                          <tr>
                            <td style="background:#1B2D4F;border-radius:16px;padding:24px;text-align:center;">
                              <p style="color:#ffffff;font-size:14px;font-weight:700;margin:0 0 12px 0;text-transform:uppercase;letter-spacing:0.1em;">Why Join Man and Van Club?</p>
                              <p style="color:#ffffff;font-size:13px;line-height:1.6;margin:0 0 16px 0;opacity:0.85;">
                                See how exclusive enquiries work and what makes us different from traditional lead sites.
                              </p>
                              <a href="https://www.manandvanclub.co.uk/why-join" style="display:inline-block;background:#F5781E;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">View Benefits →</a>
                            </td>
                          </tr>
                        </table>

                        <!-- CTA 2 -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                          <tr>
                            <td style="background:#F9F9F7;border:2px dashed #e0e0e0;border-radius:16px;padding:24px;text-align:center;">
                              <p style="color:#1B2D4F;font-size:14px;font-weight:700;margin:0 0 12px 0;text-transform:uppercase;letter-spacing:0.1em;">Ready to Apply?</p>
                              <p style="color:#555555;font-size:13px;line-height:1.6;margin:0 0 16px 0;">
                                Submit your application. Our team reviews every business manually before approval.
                              </p>
                              <a href="https://www.manandvanclub.co.uk/apply-to-join" style="display:inline-block;background:#F5781E;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Apply to Join →</a>
                            </td>
                          </tr>
                        </table>

                        <p style="color:#555555;font-size:14px;line-height:1.7;margin:32px 0 0 0;">
                          If you have any questions, reply to this email or call us on <strong style="color:#1B2D4F;">07943 617 386</strong>.
                        </p>
                      </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                      <td style="background:#f9f9f7;padding:24px 40px;text-align:center;border-top:1px solid #e0e0e0;">
                        <p style="color:#94a3b8;font-size:11px;margin:0;line-height:1.6;">
                          Man and Van Club<br>
                          support@manandvanclub.co.uk<br>
                          <a href="https://www.manandvanclub.co.uk" style="color:#1B2D4F;text-decoration:none;font-weight:700;">www.manandvanclub.co.uk</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error('Email send error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send email' }, { status: 500 });
  }
}
