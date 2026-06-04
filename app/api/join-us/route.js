import { NextResponse } from "next/server";
import { parseEmailList, sendWmcEmail } from "../../../lib/wmcEmails";

export const runtime = "nodejs";

const BUSINESS_EMAIL = "info@westmidlandscleaner.co.uk";
const BUSINESS_PHONE = "07943 617386";

function cleanText(value) {
  return String(value || "").trim();
}

function cleanEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function normaliseProviderType(value) {
  const clean = cleanText(value).toLowerCase();

  if (clean === "business" || clean === "cleaning_business") {
    return "business";
  }

  if (
    clean === "self_employed_cleaner" ||
    clean === "self-employed cleaner" ||
    clean === "cleaner"
  ) {
    return "self_employed_cleaner";
  }

  return "";
}

function getProviderTypeLabel(providerType) {
  return providerType === "business" ? "Cleaning business" : "Self-employed cleaner partner";
}

function getNextStepUrl(providerType) {
  return providerType === "business" ? `${getSiteUrl()}/business` : `${getSiteUrl()}/cleaners`;
}

function getNextStepLabel(providerType) {
  return providerType === "business"
    ? "complete your full business partner application"
    : "complete your full cleaner partner application";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.WMC_SITE_URL ||
    "https://www.westmidlandscleaner.co.uk";

  const cleanUrl = String(configuredUrl || "https://www.westmidlandscleaner.co.uk").replace(
    /\/$/,
    ""
  );

  if (cleanUrl.includes("birmingham-cleaner-finder") || cleanUrl.includes(".vercel.app")) {
    return "https://www.westmidlandscleaner.co.uk";
  }

  return cleanUrl;
}

function getAdminRecipients() {
  return parseEmailList(process.env.WMC_ADMIN_EMAIL || process.env.ADMIN_EMAIL || BUSINESS_EMAIL);
}

function getReplyToEmail() {
  return process.env.WMC_REPLY_TO_EMAIL || BUSINESS_EMAIL;
}

function validateLead(values) {
  if (!values.providerType) return "Please choose whether you are a cleaning business or self-employed cleaner partner.";
  if (!values.fullName) return "Full name is required.";
  if (!values.phone) return "Phone number is required.";
  if (!values.email) return "Email address is required.";
  if (!isValidEmail(values.email)) return "Please enter a valid email address.";
  if (!values.postcode) return "Postcode is required.";
  if (!values.marketplaceAcknowledgement) {
    return "Please confirm that you understand WMC is a marketplace, not an employer, and that work is not guaranteed.";
  }

  return "";
}

function buildAdminEmail(values) {
  const nextStepUrl = getNextStepUrl(values.providerType);
  const providerTypeLabel = getProviderTypeLabel(values.providerType);

  return `
    <div style="margin:0;padding:0;background:#f4f8fa;font-family:Arial,sans-serif;color:#071733;">
      <div style="max-width:760px;margin:0 auto;padding:28px 16px;">
        <div style="background:#ffffff;border:1px solid #dbe7ef;border-radius:24px;padding:28px;box-shadow:0 18px 45px rgba(7,23,51,0.08);">
          <p style="margin:0 0 12px;color:#0f8276;font-size:12px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;">
            WMC Admin
          </p>

          <h1 style="margin:0 0 16px;color:#071733;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">
            New join-us lead
          </h1>

          <div style="background:#eafff8;border:1px solid #8df5df;border-radius:18px;padding:18px;margin:18px 0;color:#006159;line-height:1.65;font-size:15px;">
            <strong>Provider type:</strong> ${escapeHtml(providerTypeLabel)}<br>
            <strong>Name:</strong> ${escapeHtml(values.fullName)}<br>
            <strong>Phone:</strong> ${escapeHtml(values.phone)}<br>
            <strong>Email:</strong> ${escapeHtml(values.email)}<br>
            <strong>Postcode:</strong> ${escapeHtml(values.postcode)}<br>
            <strong>Marketplace acknowledgement:</strong> Confirmed
          </div>

          <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
            The applicant has been emailed this next-step link:<br>
            <strong>${escapeHtml(nextStepUrl)}</strong>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildApplicantEmail(values) {
  const providerTypeLabel = getProviderTypeLabel(values.providerType);
  const nextStepUrl = getNextStepUrl(values.providerType);
  const nextStepLabel = getNextStepLabel(values.providerType);
  const subjectLine =
    values.providerType === "business"
      ? "Next step: complete your WMC business partner application"
      : "Next step: complete your WMC cleaner partner application";

  return `
    <div style="margin:0;padding:0;background:#f4f8fa;font-family:Arial,sans-serif;color:#071733;">
      <div style="max-width:760px;margin:0 auto;padding:28px 16px;">
        <div style="background:#ffffff;border:1px solid #dbe7ef;border-radius:24px;padding:28px;box-shadow:0 18px 45px rgba(7,23,51,0.08);">
          <p style="margin:0 0 12px;color:#0f8276;font-size:12px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;">
            West Midlands Cleaner
          </p>

          <h1 style="margin:0 0 16px;color:#071733;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">
            ${escapeHtml(subjectLine)}
          </h1>

          <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
            Hi ${escapeHtml(values.fullName || "there")},
          </p>

          <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
            Thank you for your interest in joining West Midlands Cleaner as a ${escapeHtml(providerTypeLabel.toLowerCase())}.
          </p>

          <div style="background:#eafff8;border:1px solid #8df5df;border-radius:18px;padding:18px;margin:18px 0;color:#006159;line-height:1.65;font-size:15px;">
            To continue your application, please ${escapeHtml(nextStepLabel)} here:<br>
            <a href="${escapeHtml(nextStepUrl)}" style="display:inline-block;margin-top:12px;background:#0f8276;color:#ffffff;text-decoration:none;font-weight:900;border-radius:999px;padding:12px 18px;">
              Continue your WMC application
            </a>
            <br><br>
            If the button does not work, copy and paste this link into your browser:<br>
            <strong>${escapeHtml(nextStepUrl)}</strong>
          </div>

          <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
            Important: WMC is a cleaning marketplace, not an employer. Approved providers are
            independent and work is not guaranteed. Required checks and public liability insurance
            must be completed before paid bookings are offered.
          </div>

          <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
            After you complete the full application, WMC may ask you to complete and return a signed
            onboarding pack before paid cleaning opportunities can be offered.
          </p>

          <div style="margin-top:26px;padding-top:18px;border-top:1px solid #e5edf3;color:#40516b;font-size:14px;line-height:1.6;">
            <strong>West Midlands Cleaner</strong><br>
            Email: ${escapeHtml(BUSINESS_EMAIL)}<br>
            Website: <a href="${getSiteUrl()}" style="color:#0f8276;">${getSiteUrl()}</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));

    const values = {
      providerType: normaliseProviderType(body.providerType),
      fullName: cleanText(body.fullName),
      phone: cleanText(body.phone),
      email: cleanEmail(body.email),
      postcode: cleanText(body.postcode).toUpperCase(),
      marketplaceAcknowledgement: Boolean(body.marketplaceAcknowledgement)
    };

    const validationError = validateLead(values);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const adminEmailResult = await sendWmcEmail({
      to: getAdminRecipients(),
      subject: `New ${getProviderTypeLabel(values.providerType).toLowerCase()} join-us lead – ${values.fullName}`,
      html: buildAdminEmail(values),
      replyTo: values.email || getReplyToEmail()
    });

    const applicantEmailResult = await sendWmcEmail({
      to: [values.email],
      subject:
        values.providerType === "business"
          ? "Next step: complete your WMC business partner application"
          : "Next step: complete your WMC cleaner partner application",
      html: buildApplicantEmail(values),
      replyTo: getReplyToEmail()
    });

    return NextResponse.json({
      success: true,
      message: "Join-us details sent.",
      emailResults: {
        admin: adminEmailResult,
        applicant: applicantEmailResult
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error?.message || "Could not submit join-us details."
      },
      { status: 500 }
    );
  }
}
