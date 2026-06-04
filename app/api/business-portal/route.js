import { NextResponse } from "next/server";

export const runtime = "nodejs";

const REQUIRED_FIELDS = [
  "businessName",
  "businessPhone",
  "bookingReference",
  "bookingDate",
  "bookingTime",
  "cleanerName",
  "cleanerPhone",
];

function clean(value) {
  return String(value || "").trim();
}

function escapeHtml(value) {
  return clean(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normaliseBoolean(value) {
  return value === true || value === "true" || value === "on";
}

function parseEmailList(value) {
  return clean(value)
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function getFromEmail() {
  return (
    process.env.WMC_FROM_EMAIL ||
    process.env.RESEND_FROM_EMAIL ||
    process.env.FROM_EMAIL ||
    "West Midlands Cleaner <info@westmidlandscleaner.co.uk>"
  );
}

async function sendWmcEmail({ to, subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const recipients = Array.isArray(to) ? to : parseEmailList(to);

  if (!recipients.length) {
    throw new Error("No email recipients provided.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: getFromEmail(),
      to: recipients,
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(`Resend email failed: ${response.status} ${errorText}`);
  }

  return response.json().catch(() => ({}));
}

function fieldRow(label, value) {
  return `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#111827;vertical-align:top;width:220px;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;vertical-align:top;">
        ${escapeHtml(value) || "Not provided"}
      </td>
    </tr>
  `;
}

function buildTextEmail(data) {
  return `
Business portal cleaner details

Business details
Business name: ${clean(data.businessName)}
Business phone: ${clean(data.businessPhone)}

WMC booking details
WMC booking reference: ${clean(data.bookingReference)}
Booking date: ${clean(data.bookingDate)}
Booking time: ${clean(data.bookingTime)}

Cleaner attending
Cleaner name: ${clean(data.cleanerName)}
Cleaner phone: ${clean(data.cleanerPhone)}

Confirmations
Cleaner authorised by business: Yes
Cleaner covered under business insurance where applicable: Yes
Cleaner can attend agreed booking date and time: Yes
Business understands WMC must confirm the cleaner before final job information is released: Yes
  `.trim();
}

function buildAdminHtml(data) {
  const safeReference = escapeHtml(data.bookingReference);

  return `
    <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;color:#111827;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
        <div style="padding:22px 24px;background:#0f8276;color:#ffffff;">
          <h1 style="margin:0;font-size:22px;line-height:1.3;">Business portal cleaner details</h1>
          <p style="margin:8px 0 0;font-size:15px;">Booking reference: ${safeReference}</p>
        </div>

        <div style="padding:24px;">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
            A business partner has submitted the cleaner attending details for a WMC booking.
          </p>

          <h2 style="font-size:18px;margin:22px 0 10px;">Business details</h2>
          <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;">
            ${fieldRow("Business name", data.businessName)}
            ${fieldRow("Business phone", data.businessPhone)}
          </table>

          <h2 style="font-size:18px;margin:22px 0 10px;">WMC booking details</h2>
          <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;">
            ${fieldRow("WMC booking reference", data.bookingReference)}
            ${fieldRow("Booking date", data.bookingDate)}
            ${fieldRow("Booking time", data.bookingTime)}
          </table>

          <h2 style="font-size:18px;margin:22px 0 10px;">Cleaner attending</h2>
          <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;">
            ${fieldRow("Cleaner name", data.cleanerName)}
            ${fieldRow("Cleaner phone", data.cleanerPhone)}
          </table>

          <h2 style="font-size:18px;margin:22px 0 10px;">Confirmations</h2>
          <ul style="line-height:1.7;margin:0;padding-left:20px;">
            <li>The named cleaner is authorised by the business to attend this WMC booking.</li>
            <li>The named cleaner is covered under the business insurance where applicable.</li>
            <li>The named cleaner can attend at the agreed booking date and time.</li>
            <li>The business understands WMC must confirm the named cleaner before final job information is released.</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

function validatePayload(data) {
  for (const field of REQUIRED_FIELDS) {
    if (!clean(data[field])) {
      return `Missing required field: ${field}`;
    }
  }

  if (
    !normaliseBoolean(data.confirmAuthorised) ||
    !normaliseBoolean(data.confirmInsurance) ||
    !normaliseBoolean(data.confirmAttendance) ||
    !normaliseBoolean(data.confirmWmcApproval)
  ) {
    return "All confirmations must be accepted before submitting.";
  }

  return "";
}

export async function POST(request) {
  try {
    const data = await request.json();

    const validationError = validatePayload(data);

    if (validationError) {
      return NextResponse.json(
        {
          ok: false,
          error: validationError,
        },
        {
          status: 400,
        }
      );
    }

    const adminEmail =
      process.env.WMC_ADMIN_EMAIL ||
      process.env.ADMIN_EMAIL ||
      "info@westmidlandscleaner.co.uk";

    const adminRecipients = parseEmailList(adminEmail);
    const bookingReference = clean(data.bookingReference);

    await sendWmcEmail({
      to: adminRecipients,
      subject: `Business portal cleaner details – ${bookingReference}`,
      html: buildAdminHtml(data),
      text: buildTextEmail(data),
    });

    return NextResponse.json({
      ok: true,
      message:
        "Cleaner details submitted. WMC will review and confirm the next step.",
    });
  } catch (error) {
    console.error("Business portal submission error:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          "Unable to submit the cleaner details right now. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}
