import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { sendWmcEmail } from "../../../../lib/wmcEmails";

export const runtime = "nodejs";

function cleanText(value) {
  return String(value || "").trim();
}

function cleanEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getAdminPasswordFromRequest(request) {
  return (
    request.headers.get("x-wmc-admin-password") ||
    request.headers.get("x-admin-password") ||
    ""
  );
}

function isAuthorised(request) {
  const submittedPassword = getAdminPasswordFromRequest(request);
  const realPassword = process.env.WMC_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "";

  return Boolean(realPassword && submittedPassword === realPassword);
}

function getSiteUrl(request) {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.WMC_SITE_URL ||
    request.headers.get("origin") ||
    "https://www.westmidlandscleaner.co.uk";

  const cleanUrl = String(configuredUrl || "https://www.westmidlandscleaner.co.uk").replace(/\/$/, "");

  if (cleanUrl.includes("birmingham-cleaner-finder") || cleanUrl.includes(".vercel.app")) {
    return "https://www.westmidlandscleaner.co.uk";
  }

  return cleanUrl;
}

function buildCleanerOnboardingPackEmail({ application, packUrl }) {
  const cleanerName = application?.full_name || "there";

  return `
    <div style="margin:0;padding:0;background:#f4f8fa;font-family:Arial,sans-serif;color:#071733;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
        Please read, sign and return your WMC cleaner partner onboarding pack.
      </div>

      <div style="max-width:760px;margin:0 auto;padding:28px 16px;">
        <div style="background:#ffffff;border:1px solid #dbe7ef;border-radius:24px;padding:28px;box-shadow:0 18px 45px rgba(7,23,51,0.08);">
          <p style="margin:0 0 12px;color:#0f8276;font-size:12px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;">
            West Midlands Cleaner
          </p>

          <h1 style="margin:0 0 16px;color:#071733;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">
            Your cleaner partner onboarding pack
          </h1>

          <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
            Hi ${escapeHtml(cleanerName)},
          </p>

          <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
            WMC has reviewed your cleaner partner application and is inviting you to the onboarding stage.
          </p>

          <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
            Please open the onboarding pack below, read it carefully, complete the required details, sign it once at the end, save it as a PDF and email the signed copy back to:
            <strong>info@westmidlandscleaner.co.uk</strong>
          </p>

          <p style="margin:24px 0;text-align:center;">
            <a href="${escapeHtml(packUrl)}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:16px;font-weight:900;">
              Open cleaner onboarding pack
            </a>
          </p>

          <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#7c2d12;line-height:1.65;font-size:15px;">
            <strong>Important:</strong><br>
            Receiving this pack does not guarantee paid work, bookings, income or ongoing platform access. WMC can only offer paid booking opportunities after required checks, insurance evidence, signed onboarding documents and payout setup are complete.
          </div>

          <p style="margin:18px 0;color:#33445f;font-size:15px;line-height:1.65;">
            If the button does not work, copy and paste this link into your browser:<br>
            <a href="${escapeHtml(packUrl)}" style="color:#0f8276;font-weight:700;word-break:break-word;">${escapeHtml(packUrl)}</a>
          </p>

          <div style="margin-top:26px;padding-top:18px;border-top:1px solid #e5edf3;color:#40516b;font-size:14px;line-height:1.6;">
            <strong>West Midlands Cleaner</strong><br>
            Email: info@westmidlandscleaner.co.uk<br>
            Contact: <a href="https://www.westmidlandscleaner.co.uk/contact" style="color:#0f8276;">Contact WMC</a><br>
            Website: <a href="https://www.westmidlandscleaner.co.uk" style="color:#0f8276;">https://www.westmidlandscleaner.co.uk</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function POST(request) {
  try {
    if (!isAuthorised(request)) {
      return NextResponse.json({ error: "Not authorised" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const applicationId = cleanText(body.applicationId);

    if (!applicationId) {
      return NextResponse.json({ error: "Application ID is required." }, { status: 400 });
    }

    const { data: application, error } = await supabaseAdmin
      .from("cleaner_applications")
      .select("*")
      .eq("id", applicationId)
      .single();

    if (error || !application) {
      return NextResponse.json(
        { error: error?.message || "Cleaner application not found." },
        { status: 404 }
      );
    }

    if (application.application_status !== "approved") {
      return NextResponse.json(
        { error: "Cleaner application must be saved as Approved before sending the onboarding pack." },
        { status: 400 }
      );
    }

    const cleanerEmail = cleanEmail(application.email);

    if (!cleanerEmail) {
      return NextResponse.json(
        { error: "Cleaner email address is missing." },
        { status: 400 }
      );
    }

    const siteUrl = getSiteUrl(request);
    const packUrl = `${siteUrl}/documents/wmc-self-employed-cleaner-partner-onboarding-pack.html`;

    const emailResult = await sendWmcEmail({
      to: [cleanerEmail],
      subject: "Your WMC cleaner partner onboarding pack",
      html: buildCleanerOnboardingPackEmail({ application, packUrl }),
      replyTo: process.env.WMC_REPLY_TO_EMAIL || "info@westmidlandscleaner.co.uk"
    });

    if (!emailResult?.sent) {
      return NextResponse.json(
        {
          success: false,
          error:
            emailResult?.error ||
            "Email provider did not confirm the cleaner onboarding pack email was sent.",
          emailResult
        },
        { status: 500 }
      );
    }

    const note = `Cleaner onboarding pack email sent to ${cleanerEmail} at ${new Date().toISOString()}.`;
    const existingNotes = cleanText(application.admin_notes);

    await supabaseAdmin
      .from("cleaner_applications")
      .update({
        admin_notes: existingNotes ? `${existingNotes}\n\n${note}` : note
      })
      .eq("id", applicationId);

    return NextResponse.json({
      success: true,
      message: "Cleaner onboarding pack email sent.",
      emailResult
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Could not send cleaner onboarding pack email." },
      { status: 500 }
    );
  }
}
