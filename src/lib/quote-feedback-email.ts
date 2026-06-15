// Customer feedback emails for declined/expired quote flows. Server-side only.

import { resend, SENDER_ADDRESS, REPLY_TO_ADDRESS, SITE_URL } from "@/lib/resend";
import { escapeHtml } from "@/lib/html";

function moveText(lead: {
  move_type?: string | null;
  collection_postcode?: string | null;
  delivery_postcode?: string | null;
  move_date?: string | null;
}) {
  return [
    `Move: ${lead.move_type || "Move"}`,
    `Route: ${lead.collection_postcode || "—"} to ${lead.delivery_postcode || "—"}`,
    `Move date: ${lead.move_date || "—"}`,
  ].join("\n");
}

function footerText(customer = true) {
  return [
    "",
    "Man and Van Club",
    "support@manandvanclub.co.uk",
    SITE_URL,
    customer ? "You are receiving this email because you requested a quote through Man and Van Club." : "",
  ].filter(Boolean).join("\n");
}

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

  const feedbackUrl = `${SITE_URL}/quote-feedback/${encodeURIComponent(lead.customer_quote_token)}`;
  const firstName = lead.first_name || "there";
  const text = `Hi ${firstName},\n\nYour recent mover quote was not booked.\n\nIf you still need help, you can update your request so approved movers can review it again. If you have already found another mover or no longer need help, you can close the request.\n\n${moveText(lead)}\n\nUpdate or close request:\n${feedbackUrl}\n\nWe cannot guarantee another quote, but if your request is still active, approved movers may review it and send quote options if they can help.${footerText(true)}`;

  try {
    await resend.emails.send({
      from: SENDER_ADDRESS,
      to: [lead.email],
      replyTo: REPLY_TO_ADDRESS,
      subject: "Update or close your Man and Van Club request",
      text,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
          <div style="text-align: center; margin-bottom: 30px;"><span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M<span style="color:#F5781E;">&amp;</span>V</span></div>
          <h2 style="color: #0F172A; font-size: 24px; margin: 0 0 20px 0;">Update or close your move request</h2>
          <p style="color: #475569; font-size: 16px;">Hi ${escapeHtml(firstName)},</p>
          <p style="color: #475569; font-size: 16px;">Your recent mover quote was not booked.</p>
          <p style="color: #475569; font-size: 16px;">If you still need help, you can update your request so approved movers can review it again. If you have already found another mover or no longer need help, you can close the request.</p>
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Move:</strong> ${escapeHtml(lead.move_type || "Move")}</p>
            <p style="margin: 0 0 8px 0;"><strong>Route:</strong> ${escapeHtml(lead.collection_postcode || "—")} to ${escapeHtml(lead.delivery_postcode || "—")}</p>
            <p style="margin: 0;"><strong>Move date:</strong> ${escapeHtml(lead.move_date || "—")}</p>
          </div>
          <a href="${escapeHtml(feedbackUrl)}" style="display: inline-block; background: #F97316; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;">Update or close request</a>
          <p style="color: #64748B; font-size: 14px;">We cannot guarantee another quote, but if your request is still active, approved movers may review it and send quote options if they can help.</p>
          <p style="color: #64748B; font-size: 14px; margin-top: 30px;">Man and Van Club<br />support@manandvanclub.co.uk<br /><a href="${SITE_URL}">${SITE_URL}</a></p>
          <p style="color: #94A3B8; font-size: 12px;">You are receiving this email because you requested a quote through Man and Van Club.</p>
        </div>
      `,
    });
  } catch {
    // email failure must never block the decline/expiry flow
  }
}

/** Sent once per expired quote attempt. */
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

  const feedbackUrl = `${SITE_URL}/quote-feedback/${encodeURIComponent(lead.customer_quote_token)}`;
  const firstName = lead.first_name || "there";
  const text = `Hi ${firstName},\n\nYour recent mover quote has expired, so we've made your request available again for another approved mover to review.\n\n${moveText(lead)}\n\nIf your budget or move details have changed, you can update your feedback so movers can decide whether they can help.\n\nUpdate feedback or close request:\n${feedbackUrl}\n\nWe cannot guarantee another quote, but your request is now available for movers to review again.${footerText(true)}`;

  try {
    await resend.emails.send({
      from: SENDER_ADDRESS,
      to: [lead.email],
      replyTo: REPLY_TO_ADDRESS,
      subject: "Your mover quote has expired",
      text,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #E2E8F0; padding: 30px; border-radius: 16px; background: #fff;">
          <div style="text-align: center; margin-bottom: 30px;"><span style="background: #0F172A; color: white; padding: 8px 20px; border-radius: 9999px; font-weight: 900; font-size: 20px;">M<span style="color:#F5781E;">&amp;</span>V</span></div>
          <h2 style="color: #0F172A; font-size: 24px; margin: 0 0 20px 0;">Your mover quote has expired</h2>
          <p style="color: #475569; font-size: 16px;">Hi ${escapeHtml(firstName)},</p>
          <p style="color: #475569; font-size: 16px;">Your recent mover quote has expired, so we've made your request available again for another approved mover to review.</p>
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Move:</strong> ${escapeHtml(lead.move_type || "Move")}</p>
            <p style="margin: 0 0 8px 0;"><strong>Route:</strong> ${escapeHtml(lead.collection_postcode || "—")} to ${escapeHtml(lead.delivery_postcode || "—")}</p>
            <p style="margin: 0;"><strong>Move date:</strong> ${escapeHtml(lead.move_date || "—")}</p>
          </div>
          <p style="color: #475569; font-size: 16px;">If your budget or move details have changed, you can update your feedback so movers can decide whether they can help.</p>
          <a href="${escapeHtml(feedbackUrl)}" style="display: inline-block; background: #F97316; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;">Update feedback or close request</a>
          <p style="color: #64748B; font-size: 14px;">We cannot guarantee another quote, but your request is now available for movers to review again.</p>
          <p style="color: #64748B; font-size: 14px; margin-top: 30px;">Man and Van Club<br />support@manandvanclub.co.uk<br /><a href="${SITE_URL}">${SITE_URL}</a></p>
          <p style="color: #94A3B8; font-size: 12px;">You are receiving this email because you requested a quote through Man and Van Club.</p>
        </div>
      `,
    });
  } catch {
    // non-blocking
  }
}
