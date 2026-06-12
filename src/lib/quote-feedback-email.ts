// Customer "Still need help?" feedback email — sent when a quote is
// declined or expires. Server-side only.

import { resend, SENDER_ADDRESS, REPLY_TO_ADDRESS } from "@/lib/resend";
import { escapeHtml } from "@/lib/html";

export async function sendQuoteFeedbackEmail(lead: {
  email?: string | null;
  first_name?: string | null;
  move_type?: string | null;
  collection_postcode?: string | null;
  delivery_postcode?: string | null;
  move_date?: string | null;
  customer_quote_token?: string | null;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY || !lead.email || !lead.customer_quote_token) return;

  const siteUrl = process.env.NEXT_PUBLIC_URL || "https://www.manandvanclub.co.uk";
  const feedbackUrl = `${siteUrl}/quote-feedback/${lead.customer_quote_token}`;

  try {
    await resend.emails.send({
      from: SENDER_ADDRESS,
      to: [lead.email],
      replyTo: REPLY_TO_ADDRESS,
      subject: "Still need help with your move?",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
          <div style="text-align: center; margin-bottom: 30px;"><span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M&amp;V</span></div>
          <h2 style="color: #0F172A; font-size: 24px; margin: 0 0 20px 0;">Still Need Help With Your Move?</h2>
          <p style="color: #475569; font-size: 16px;">Hi ${escapeHtml(lead.first_name || "there")},</p>
          <p style="color: #475569; font-size: 16px;">Your recent mover quote was not booked.</p>
          <p style="color: #475569; font-size: 16px;">If you still need help with your move, you can tell us what would work better for you. This helps us understand whether another approved mover may be able to help.</p>
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Move:</strong> ${escapeHtml(lead.move_type || "Move")}</p>
            <p style="margin: 0 0 8px 0;"><strong>Route:</strong> ${escapeHtml(lead.collection_postcode || "—")} to ${escapeHtml(lead.delivery_postcode || "—")}</p>
            <p style="margin: 0;"><strong>Move date:</strong> ${escapeHtml(lead.move_date || "—")}</p>
          </div>
          <p style="color: #475569; font-size: 16px;">You can let us know:</p>
          <ul style="color: #475569; font-size: 15px; line-height: 1.8;">
            <li>whether you still need help</li>
            <li>why the quote did not work for you</li>
            <li>your preferred budget range</li>
            <li>anything else movers should know</li>
          </ul>
          <a href="${feedbackUrl}" style="display: inline-block; background: #F97316; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;">Tell us what would work better</a>
          <p style="color: #64748B; font-size: 14px;">We will review your feedback before deciding whether to make the request available to movers again.</p>
          <p style="color: #64748B; font-size: 14px; margin-top: 30px;">Man and Van Club<br />support@manandvanclub.co.uk</p>
        </div>
      `,
    });
  } catch {
    // email failure must never block the decline/expiry flow
  }
}

/** "Your mover quote has expired" — sent once per expired attempt. */
export async function sendQuoteExpiredEmail(lead: {
  email?: string | null;
  first_name?: string | null;
  move_type?: string | null;
  collection_postcode?: string | null;
  delivery_postcode?: string | null;
  move_date?: string | null;
  customer_quote_token?: string | null;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY || !lead.email || !lead.customer_quote_token) return;

  const siteUrl = process.env.NEXT_PUBLIC_URL || "https://www.manandvanclub.co.uk";
  const feedbackUrl = `${siteUrl}/quote-feedback/${lead.customer_quote_token}`;

  try {
    await resend.emails.send({
      from: SENDER_ADDRESS,
      to: [lead.email],
      replyTo: REPLY_TO_ADDRESS,
      subject: "Your mover quote has expired",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
          <div style="text-align: center; margin-bottom: 30px;"><span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M&amp;V</span></div>
          <h2 style="color: #0F172A; font-size: 24px; margin: 0 0 20px 0;">Your Mover Quote Has Expired</h2>
          <p style="color: #475569; font-size: 16px;">Hi ${escapeHtml(lead.first_name || "there")},</p>
          <p style="color: #475569; font-size: 16px;">Your recent mover quote has expired, so we've made your request available again for another approved mover to review.</p>
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Move:</strong> ${escapeHtml(lead.move_type || "Move")}</p>
            <p style="margin: 0 0 8px 0;"><strong>Route:</strong> ${escapeHtml(lead.collection_postcode || "—")} to ${escapeHtml(lead.delivery_postcode || "—")}</p>
            <p style="margin: 0;"><strong>Move date:</strong> ${escapeHtml(lead.move_date || "—")}</p>
          </div>
          <p style="color: #475569; font-size: 16px;">If your budget or move details have changed, you can update your feedback so movers can decide whether they can help.</p>
          <a href="${feedbackUrl}" style="display: inline-block; background: #F97316; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;">Update feedback or close request</a>
          <p style="color: #64748B; font-size: 14px;">We cannot guarantee another quote, but your request is now available for movers to review again.</p>
          <p style="color: #64748B; font-size: 14px; margin-top: 30px;">Man and Van Club<br />support@manandvanclub.co.uk</p>
        </div>
      `,
    });
  } catch {
    // non-blocking
  }
}
