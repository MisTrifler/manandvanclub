import { NextResponse } from "next/server";
import { sendWmcEmail } from "../../../lib/wmcEmails";

const WMC_EMAIL = "info@westmidlandscleaner.co.uk";

function clean(value) {
  return String(value || "").trim();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request) {
  try {
    const body = await request.json();

    const name = clean(body.name);
    const email = clean(body.email).toLowerCase();
    const bookingReference = clean(body.bookingReference);
    const topic = clean(body.topic) || "Website enquiry";
    const message = clean(body.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please enter your name, email address and message." },
        { status: 400 }
      );
    }

    if (!email.includes("@") || email.length > 180) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (message.length > 4000) {
      return NextResponse.json(
        { error: "Please keep your message under 4000 characters." },
        { status: 400 }
      );
    }

    const html = `
      <div style="font-family:Arial,sans-serif;color:#071733;line-height:1.6;">
        <h2>New WMC contact form message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>
        <p><strong>Booking reference:</strong> ${escapeHtml(bookingReference || "Not provided")}</p>
        <div style="margin-top:18px;padding:16px;border:1px solid #dbe7ef;border-radius:14px;background:#f8fbfc;">
          ${escapeHtml(message).replace(/\n/g, "<br>")}
        </div>
      </div>
    `;

    const result = await sendWmcEmail({
      to: WMC_EMAIL,
      subject: `WMC contact form: ${topic}`,
      html,
      replyTo: email
    });

    if (!result.sent && !result.skipped) {
      return NextResponse.json(
        { error: result.error || "Unable to send your message." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, sent: result.sent, skipped: result.skipped || false });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Unable to send your message." },
      { status: 500 }
    );
  }
}
