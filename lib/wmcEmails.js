import { supabaseAdmin } from "./supabaseAdmin";
const DEFAULT_SITE_URL = "https://www.westmidlandscleaner.co.uk";
const DEFAULT_FROM = "West Midlands Cleaner <bookings@westmidlandscleaner.co.uk>";
const BUSINESS_PHONE = "07943 617386";
const BUSINESS_EMAIL = "info@westmidlandscleaner.co.uk";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function nl2br(value) {
  return escapeHtml(value || "Not provided").replace(/\n/g, "<br>");
}

export function parseEmailList(value) {
  return String(value || "")
    .split(/[;,]/)
    .map((email) => email.trim())
    .filter(Boolean)
    .filter((email, index, array) => array.indexOf(email) === index);
}

export function formatMoney(value) {
  const number = Number(value || 0);

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP"
  }).format(number);
}

export function formatDate(value) {
  if (!value) return "Not provided";

  const date = new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.WMC_SITE_URL ||
    DEFAULT_SITE_URL;

  const cleanUrl = String(configuredUrl || DEFAULT_SITE_URL).replace(/\/$/, "");

  if (cleanUrl.includes("birmingham-cleaner-finder") || cleanUrl.includes(".vercel.app")) {
    return DEFAULT_SITE_URL;
  }

  return cleanUrl;
}

function getFromEmail() {
  return process.env.WMC_EMAIL_FROM || process.env.RESEND_FROM_EMAIL || DEFAULT_FROM;
}

function getReplyToEmail(fallback) {
  return process.env.WMC_REPLY_TO_EMAIL || BUSINESS_EMAIL || fallback || undefined;
}

function getBookingReference(job) {
  return (
    job?.quote_reference ||
    job?.booking_reference ||
    job?.reference ||
    job?.job_reference ||
    job?.id ||
    "WMC booking"
  );
}

function getCustomerFinalPrice(job) {
  return (
    job?.customer_total_price ??
    job?.customer_price ??
    job?.quote_amount ??
    job?.total_price ??
    job?.price ??
    job?.final_price ??
    0
  );
}

function baseEmailShell({ title, preheader, children }) {
  return `
    <div style="margin:0;padding:0;background:#f4f8fa;font-family:Arial,sans-serif;color:#071733;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader || title)}</div>
      <div style="max-width:760px;margin:0 auto;padding:28px 16px;">
        <div style="background:#ffffff;border:1px solid #dbe7ef;border-radius:24px;padding:28px;box-shadow:0 18px 45px rgba(7,23,51,0.08);">
          <p style="margin:0 0 12px;color:#0f8276;font-size:12px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;">West Midlands Cleaner</p>
          <h1 style="margin:0 0 16px;color:#071733;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${escapeHtml(title)}</h1>
          ${children}
          <div style="margin-top:26px;padding-top:18px;border-top:1px solid #e5edf3;color:#40516b;font-size:14px;line-height:1.6;">
            <strong>West Midlands Cleaner</strong><br>
            Email: ${escapeHtml(BUSINESS_EMAIL)}<br>
            Contact: <a href="${getSiteUrl()}/contact" style="color:#0f8276;">${getSiteUrl()}/contact</a><br>
            Website: <a href="${getSiteUrl()}" style="color:#0f8276;">${getSiteUrl()}</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function infoBox(rows, background = "#eafff8", border = "#8df5df", color = "#006159") {
  return `
    <div style="background:${background};border:1px solid ${border};border-radius:18px;padding:18px;margin:18px 0;color:${color};line-height:1.65;font-size:15px;">
      ${rows
        .map(
          ([label, value]) =>
            `<div><strong>${escapeHtml(label)}:</strong> ${value}</div>`
        )
        .join("")}
    </div>
  `;
}

export async function sendWmcEmail({ to, subject, html, replyTo }) {
  const recipients = Array.isArray(to) ? to.filter(Boolean) : parseEmailList(to);

  if (!process.env.RESEND_API_KEY) {
    return { sent: false, skipped: true, error: "RESEND_API_KEY is not set.", recipients };
  }

  if (!recipients.length) {
    return { sent: false, skipped: true, error: "No email recipients provided.", recipients };
  }

  try {
    const payload = {
      from: getFromEmail(),
      to: recipients,
      subject,
      html
    };

    const resolvedReplyTo = replyTo || getReplyToEmail();

    if (resolvedReplyTo) {
      payload.reply_to = resolvedReplyTo;
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        sent: false,
        error: data?.message || data?.error || `Resend error: ${response.status}`,
        recipients,
        status: response.status
      };
    }

    return {
      sent: true,
      id: data?.id || null,
      recipients,
      status: response.status
    };
  } catch (error) {
    return {
      sent: false,
      error: error?.message || "Unable to send email.",
      recipients
    };
  }
}

export function buildCustomerBookingEmail(job) {
  const reference = getBookingReference(job);
  const statusUrl = `${getSiteUrl()}/booking-status?reference=${encodeURIComponent(reference)}`;
  const quotesUrl = `${getSiteUrl()}/quotes/${encodeURIComponent(reference)}`;

  return baseEmailShell({
    title: "Request posted — providers can now quote",
    preheader: `Your WMC request has been posted and approved providers can now quote: ${reference}`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        Hi ${escapeHtml(job.customer_name || "there")}, thank you. Your cleaning request has been received and posted on the WMC platform so suitable approved cleaning providers can review safe job details and submit quotes.
      </p>
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        Approved independent cleaners and cleaning businesses can review the safe job details and your guide price only before sending their own quotes. We will email you when provider quotes are available, and you can choose the provider you prefer before any payment is requested by WMC.
      </p>
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        Your booking is not assigned to a provider yet. You stay in control: compare quotes, choose the provider that suits you, and only pay WMC securely when you are ready to confirm your selected provider.
      </p>
      ${infoBox([
        ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(reference)}</strong>`],
        ["Service", escapeHtml(job.service_type)],
        ["Guide price only", `<strong>${formatMoney(job.customer_total_price)}</strong>`],
        ["Preferred date", escapeHtml(formatDate(job.preferred_date))],
        ["Preferred time", escapeHtml(job.preferred_time || "Not provided")],
        ["Area / postcode", `${escapeHtml(job.area_town || "Not provided")} / ${escapeHtml(job.postcode || "Not provided")}`],
        ["Provider preference", escapeHtml(getProviderPreferenceLabel(job))]
      ])}
      <div style="background:#eef6ff;border:1px solid #bfd9ff;border-radius:18px;padding:18px;margin:18px 0;color:#173f91;line-height:1.65;font-size:15px;">
        <strong>This is a guide price only, not a provider quote.</strong><br>
        Approved providers may use this guide price as a starting point before submitting their own quotes. Provider quotes may be higher or lower depending on availability, property condition, products/equipment, parking, timing and the details provided. No payment is taken when submitting a request.
      </div>
      <p style="margin:18px 0;color:#33445f;font-size:15px;line-height:1.65;">
        You can check your booking status using your reference here:<br>
        <a href="${statusUrl}" style="color:#0f8276;font-weight:700;">${statusUrl}</a>
        <br><br>
        When provider quotes are available, you can compare them here:<br>
        <a href="${quotesUrl}" style="color:#0f8276;font-weight:700;">${quotesUrl}</a>
      </p>
    `
  });
}

export function buildAdminBookingEmail(job) {
  const adminUrl = `${getSiteUrl()}/admin/marketplace`;
  const reference = getBookingReference(job);

  return baseEmailShell({
    title: "New WMC cleaning request posted",
    preheader: `New platform request ${reference} from ${job.customer_name}`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        A new customer cleaning request has been posted on the WMC marketplace and saved in admin. Approved providers can now review safe job details and submit quotes.
      </p>
      ${infoBox([
        ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(reference)}</strong>`],
        ["Customer", escapeHtml(job.customer_name)],
        ["Phone", escapeHtml(job.customer_phone)],
        ["Email", escapeHtml(job.customer_email || "Not provided")],
        ["Service", escapeHtml(job.service_type)],
        ["Property", `${escapeHtml(job.bedrooms)} bedroom(s), ${escapeHtml(job.bathrooms)} bathroom(s), ${escapeHtml(job.property_type)}`],
        ["Condition", escapeHtml(job.condition_level)],
        ["Date / time", `${escapeHtml(formatDate(job.preferred_date))} at ${escapeHtml(job.preferred_time || "Not provided")}`],
        ["Area / postcode", `${escapeHtml(job.area_town || "Not provided")} / ${escapeHtml(job.postcode || "Not provided")}`],
        ["Guide price only", `<strong>${formatMoney(job.customer_total_price)}</strong>`],
        ["Estimated hours", escapeHtml(job.estimated_hours || "Not provided")]
      ])}
      <h2 style="font-size:20px;margin:24px 0 8px;color:#071733;">Notes</h2>
      <div style="background:#f8fafc;border:1px solid #dbe3ef;border-radius:16px;padding:16px;color:#33445f;line-height:1.65;font-size:15px;">
        <strong>Extras:</strong> ${escapeHtml(job.extras || "None selected")}<br><br>
        <strong>Customer notes:</strong><br>${nl2br(job.notes)}<br><br>
        <strong>Access notes:</strong><br>${nl2br(job.access_notes)}<br><br>
        <strong>Parking notes:</strong><br>${nl2br(job.parking_notes)}
      </div>
      <p style="margin:18px 0;color:#33445f;font-size:15px;line-height:1.65;">
        Admin marketplace: <a href="${adminUrl}" style="color:#0f8276;font-weight:700;">${adminUrl}</a>
      </p>
    `
  });
}

export function buildCleanerAssignmentEmail({ job, cleaner }) {
  const reference = getBookingReference(job);

  return baseEmailShell({
    title: "New WMC cleaning job assigned",
    preheader: `Job assigned: ${reference}`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        Hi ${escapeHtml(cleaner?.full_name || "there")}, a WMC cleaning job has been assigned to you after customer/provider confirmation.
      </p>
      ${infoBox([
        ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(reference)}</strong>`],
        ["Service", escapeHtml(job.service_type)],
        ["Date / time", `${escapeHtml(formatDate(job.preferred_date))} at ${escapeHtml(job.preferred_time || "Not provided")}`],
        ["Area / postcode", `${escapeHtml(job.area_town || "Not provided")} / ${escapeHtml(job.postcode || "Not provided")}`],
        ["Estimated hours", escapeHtml(job.estimated_hours || "Not provided")],
        ["Cleaner payout", `<strong>${formatMoney(job.cleaner_payout)}</strong>`]
      ])}
      <h2 style="font-size:20px;margin:24px 0 8px;color:#071733;">Customer details</h2>
      ${infoBox([
        ["Customer", escapeHtml(job.customer_name)],
        ["Phone", escapeHtml(job.customer_phone)],
        ["Email", escapeHtml(job.customer_email || "Not provided")]
      ], "#eef6ff", "#bfd9ff", "#173f91")}
      <h2 style="font-size:20px;margin:24px 0 8px;color:#071733;">Job notes</h2>
      <div style="background:#f8fafc;border:1px solid #dbe3ef;border-radius:16px;padding:16px;color:#33445f;line-height:1.65;font-size:15px;">
        <strong>Extras:</strong> ${escapeHtml(job.extras || "None selected")}<br><br>
        <strong>Customer notes:</strong><br>${nl2br(job.notes)}<br><br>
        <strong>Access notes:</strong><br>${nl2br(job.access_notes)}<br><br>
        <strong>Parking notes:</strong><br>${nl2br(job.parking_notes)}
      </div>
      <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
        <strong>Important:</strong> Please only attend if you have accepted/confirmed this job with WMC.
        After completing the job, message WMC with the booking reference, finish time, completion confirmation,
        any issue notes and useful photos if appropriate. Payout is handled through the WMC payout process after completion and the 48-hour issue window, provided there is no unresolved issue.
      </div>
    `
  });
}

export function buildCustomerCleanerAssignedEmail({ job }) {
  const reference = getBookingReference(job);
  const finalPrice = getCustomerFinalPrice(job);
  const statusUrl = `${getSiteUrl()}/booking-status?reference=${encodeURIComponent(reference)}`;

  return baseEmailShell({
    title: "Provider update for your WMC request",
    preheader: `Provider update for ${reference}`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        Hi ${escapeHtml(job.customer_name || "there")}, your WMC request has a provider update. Please check the latest status before making any payment or attendance plans.
      </p>
      ${infoBox([
        ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(reference)}</strong>`],
        ["Service", escapeHtml(job.service_type)],
        ["Current customer price", `<strong style="font-size:20px;color:#071733;">${formatMoney(finalPrice)}</strong>`],
        ["Date / time", `${escapeHtml(formatDate(job.preferred_date))} at ${escapeHtml(job.preferred_time || "Not provided")}`],
        ["Area / postcode", `${escapeHtml(job.area_town || "Not provided")} / ${escapeHtml(job.postcode || "Not provided")}`]
      ])}
      <div style="background:#eef6ff;border:1px solid #bfd9ff;border-radius:18px;padding:18px;margin:18px 0;color:#173f91;line-height:1.65;font-size:15px;">
        <strong>Your current customer price is ${formatMoney(finalPrice)}.</strong><br>
        In the normal marketplace flow, payment is only requested after you choose a provider quote. The price is based on the details provided and may change if the job or property is not as described.
      </div>
      <p style="margin:18px 0;color:#33445f;font-size:15px;line-height:1.65;">
        Booking status: <a href="${statusUrl}" style="color:#0f8276;font-weight:700;">${statusUrl}</a>
      </p>
    `
  });
}

export function buildSelectedProviderPaymentEmail(job) {
  const reference = getBookingReference(job);
  const finalPrice = getCustomerFinalPrice(job);
  const paymentUrl = `${getSiteUrl()}/pay?reference=${encodeURIComponent(reference)}`;
  const statusUrl = `${getSiteUrl()}/booking-status?reference=${encodeURIComponent(reference)}`;

  return baseEmailShell({
    title: "Payment request for your selected provider",
    preheader: `Payment request ready for ${reference}`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        Hi ${escapeHtml(job.customer_name || "there")}, your selected cleaning provider/payment request is ready. Please only pay if you are happy to proceed with the provider and price shown.
      </p>
      ${infoBox([
        ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(reference)}</strong>`],
        ["Service", escapeHtml(job.service_type)],
        ["Customer price", `<strong style="font-size:20px;color:#071733;">${formatMoney(finalPrice)}</strong>`],
        ["Preferred date", escapeHtml(formatDate(job.preferred_date))],
        ["Preferred time", escapeHtml(job.preferred_time || "Not provided")],
        ["Area / postcode", `${escapeHtml(job.area_town || "Not provided")} / ${escapeHtml(job.postcode || "Not provided")}`]
      ])}
      <div style="background:#eef6ff;border:1px solid #bfd9ff;border-radius:18px;padding:18px;margin:18px 0;color:#173f91;line-height:1.65;font-size:15px;">
        <strong>Payment is required before your selected provider booking is fully confirmed.</strong><br>
        Your booking reference will be filled in automatically on the payment page. For security, you may still be asked to enter the phone number used on the booking.
      </div>
      <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
        <strong>Important:</strong> This payment request is based on the booking details you provided.
        If the property/job is not as described, is significantly heavier than stated, has unsafe conditions,
        or extra work is requested on arrival, the price may need to be changed before the cleaner continues.
      </div>
      <p style="margin:22px 0;text-align:center;">
        <a href="${paymentUrl}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:16px;font-weight:800;">Pay selected provider securely</a>
      </p>
      <p style="margin:18px 0;color:#33445f;font-size:15px;line-height:1.65;">
        Payment link: <a href="${paymentUrl}" style="color:#0f8276;font-weight:700;">${paymentUrl}</a>
      </p>
      <p style="margin:18px 0;color:#33445f;font-size:15px;line-height:1.65;">
        Booking status: <a href="${statusUrl}" style="color:#0f8276;font-weight:700;">${statusUrl}</a>
      </p>
    `
  });
}



function getAdminRecipients() {
  return parseEmailList(process.env.WMC_ADMIN_EMAIL || process.env.ADMIN_EMAIL || BUSINESS_EMAIL);
}

function getBusinessDisplayName(business) {
  return (
    business?.trading_name ||
    business?.business_name ||
    business?.businessName ||
    business?.tradingName ||
    "your business"
  );
}

function getBusinessPortalUrl() {
  return `${getSiteUrl()}/business/jobs`;
}

function getBusinessMyJobsUrl() {
  return `${getSiteUrl()}/business/my-jobs`;
}

function getCleanerMyJobsUrl() {
  return `${getSiteUrl()}/cleaner/my-jobs`;
}

function getAdminMarketplaceUrl() {
  return `${getSiteUrl()}/admin/marketplace`;
}

function getAdminBusinessPayoutsUrl() {
  return `${getSiteUrl()}/admin/business-payouts`;
}

function safePostcodeArea(postcode) {
  const clean = String(postcode || "").trim().toUpperCase();
  if (!clean) return "Not provided";
  return clean.split(" ")[0];
}

export function buildBusinessApprovedEmail({ business }) {
  const businessName = getBusinessDisplayName(business);

  return baseEmailShell({
    title: "Your WMC business partner application has been approved",
    preheader: "Your business can now access WMC business booking opportunities.",
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        Hi ${escapeHtml(businessName)}, your West Midlands Cleaner business partner application has been approved.
      </p>
      ${infoBox([
        ["Business", escapeHtml(businessName)],
        ["Business portal", `<a href="${getBusinessPortalUrl()}" style="color:#0f8276;font-weight:700;">${getBusinessPortalUrl()}</a>`],
        ["Assigned jobs", `<a href="${getBusinessMyJobsUrl()}" style="color:#0f8276;font-weight:700;">${getBusinessMyJobsUrl()}</a>`]
      ])}
      <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
        <strong>Important:</strong> Approval does not guarantee paid work. WMC may offer suitable booking opportunities with a clear proposed business payout. Your business should only accept opportunities it can complete properly.
      </div>
      <p style="margin:18px 0;color:#33445f;font-size:15px;line-height:1.65;">
        Please keep your insurance and business details up to date. WMC may request proof before releasing booking details or paid work.
      </p>
    `
  });
}

export async function sendBusinessApprovedEmail({ business }) {
  if (!business?.email) {
    return { sent: false, skipped: true, error: "Business email not provided." };
  }

  return sendWmcEmail({
    to: [business.email],
    subject: "Your WMC business partner application has been approved",
    html: buildBusinessApprovedEmail({ business }),
    replyTo: getReplyToEmail(business.email)
  });
}

export function buildAdminBusinessInterestEmail({ job, business, interest }) {
  const reference = getBookingReference(job);
  const businessName = getBusinessDisplayName(business);

  return baseEmailShell({
    title: "Business submitted interest for a WMC booking",
    preheader: `${businessName} submitted interest for ${reference}`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        A business partner has submitted interest/cleaner-team details for a WMC booking. Review before approving any full job details.
      </p>
      ${infoBox([
        ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(reference)}</strong>`],
        ["Business", escapeHtml(businessName)],
        ["Business email", escapeHtml(business?.email || "Not provided")],
        ["Business phone", escapeHtml(business?.phone || "Not provided")],
        ["Service", escapeHtml(job?.service_type || "Not provided")],
        ["Date / time", `${escapeHtml(formatDate(job?.preferred_date))} at ${escapeHtml(job?.preferred_time || "Not provided")}`],
        ["Area / postcode area", `${escapeHtml(job?.area_town || "Not provided")} / ${escapeHtml(safePostcodeArea(job?.postcode))}`],
        ["Guide price only", `<strong>${formatMoney(job?.customer_total_price)}</strong>`],
        ["WMC platform fee", `${escapeHtml(job?.wmc_fee_percent || 15)}% / ${formatMoney(job?.wmc_fee_amount)}`],
        ["Estimated business payout if you quote at the guide price", `<strong>${formatMoney(job?.business_payout ?? job?.cleaner_payout)}</strong>`],
        ["Cleaner/team lead", escapeHtml(interest?.cleaner_name || "Not provided")],
        ["Cleaner/team phone", escapeHtml(interest?.cleaner_phone || "Not provided")]
      ])}
      <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
        <strong>Next step:</strong> Review this request in the admin marketplace. Only approve/release full job details when you are happy with the business and cleaner/team details.
      </div>
      <p style="margin:18px 0;color:#33445f;font-size:15px;line-height:1.65;">
        Admin marketplace: <a href="${getAdminMarketplaceUrl()}" style="color:#0f8276;font-weight:700;">${getAdminMarketplaceUrl()}</a>
      </p>
    `
  });
}

export async function sendAdminBusinessInterestEmail({ job, business, interest }) {
  return sendWmcEmail({
    to: getAdminRecipients(),
    subject: `Business submitted booking interest – ${getBookingReference(job)}`,
    html: buildAdminBusinessInterestEmail({ job, business, interest }),
    replyTo: business?.email || getReplyToEmail()
  });
}

export function buildBusinessAssignmentApprovedEmail({ job, business, interest }) {
  const reference = getBookingReference(job);
  const businessName = getBusinessDisplayName(business);

  return baseEmailShell({
    title: "Your business has been selected for this booking",
    preheader: `Provider selected: ${reference}`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        Hi ${escapeHtml(businessName)}, your business has been selected/approved for this booking after WMC review.
      </p>
      ${infoBox([
        ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(reference)}</strong>`],
        ["Service", escapeHtml(job?.service_type || "Not provided")],
        ["Date / time", `${escapeHtml(formatDate(job?.preferred_date))} at ${escapeHtml(job?.preferred_time || "Not provided")}`],
        ["Guide price only", `<strong>${formatMoney(job?.customer_total_price)}</strong>`],
        ["WMC platform fee", `${escapeHtml(job?.wmc_fee_percent || 15)}% / ${formatMoney(job?.wmc_fee_amount)}`],
        ["Business payout", `<strong>${formatMoney(job?.business_payout ?? job?.cleaner_payout)}</strong>`],
        ["Cleaner/team lead", escapeHtml(interest?.cleaner_name || job?.business_team_lead_name || "Not provided")],
        ["Cleaner/team phone", escapeHtml(interest?.cleaner_phone || job?.business_team_lead_phone || "Not provided")]
      ])}
      <div style="background:#eafff8;border:1px solid #8df5df;border-radius:18px;padding:18px;margin:18px 0;color:#006159;line-height:1.65;font-size:15px;">
        Full job details should now be available inside your WMC assigned jobs page.
      </div>
      <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
        <strong>Important:</strong> Please only attend with the cleaner/team details submitted to WMC. If the attending cleaner/team changes, contact WMC before the booking.
      </div>
      <p style="margin:22px 0;text-align:center;">
        <a href="${getBusinessMyJobsUrl()}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:16px;font-weight:800;">View assigned jobs</a>
      </p>
    `
  });
}

export async function sendBusinessAssignmentApprovedEmail({ job, business, interest }) {
  if (!business?.email) {
    return { sent: false, skipped: true, error: "Business email not provided." };
  }

  return sendWmcEmail({
    to: [business.email],
    subject: `WMC booking selected for your business – ${getBookingReference(job)}`,
    html: buildBusinessAssignmentApprovedEmail({ job, business, interest }),
    replyTo: getReplyToEmail(business.email)
  });
}

export function buildBusinessPayoutSentEmail({ job, business, payout, transferId }) {
  const reference = getBookingReference(job);
  const businessName = getBusinessDisplayName(business);
  const amount = payout?.amount_gbp ?? job?.business_payout ?? job?.cleaner_payout ?? 0;

  return baseEmailShell({
    title: "WMC business payout sent",
    preheader: `Payout sent for ${reference}`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        Hi ${escapeHtml(businessName)}, WMC has sent the agreed business payout for this completed booking.
      </p>
      ${infoBox([
        ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(reference)}</strong>`],
        ["Service", escapeHtml(job?.service_type || "Not provided")],
        ["Payout amount", `<strong>${formatMoney(amount)}</strong>`],
        ["WMC platform fee", `${escapeHtml(job?.wmc_fee_percent || 15)}% retained from the customer-selected quote before payout`],
        ["Stripe transfer reference", escapeHtml(transferId || payout?.stripe_transfer_id || "Not provided")]
      ])}
      <p style="margin:18px 0;color:#33445f;font-size:15px;line-height:1.65;">
        WMC has released the approved payout to your Stripe Express account. Stripe then pays your bank according to your Stripe payout schedule, so bank arrival time is controlled by Stripe and your bank.
      </p>
      <p style="margin:18px 0;color:#33445f;font-size:15px;line-height:1.65;">
        You can view your assigned jobs here: <a href="${getBusinessMyJobsUrl()}" style="color:#0f8276;font-weight:700;">${getBusinessMyJobsUrl()}</a>
      </p>
    `
  });
}

export async function sendBusinessPayoutSentEmail({ job, business, payout, transferId }) {
  if (!business?.email) {
    return { sent: false, skipped: true, error: "Business email not provided." };
  }

  return sendWmcEmail({
    to: [business.email],
    subject: `WMC business payout sent – ${getBookingReference(job)}`,
    html: buildBusinessPayoutSentEmail({ job, business, payout, transferId }),
    replyTo: getReplyToEmail(business.email)
  });
}

export function buildCleanerPayoutSentEmail({ job, cleaner, payout, transferId }) {
  const reference = getBookingReference(job);
  const cleanerName = cleaner?.full_name || cleaner?.business_name || "Cleaner partner";
  const amount = payout?.amount_gbp ?? job?.cleaner_payout ?? job?.payout_amount ?? 0;

  return baseEmailShell({
    title: "WMC cleaner payout released",
    preheader: `Payout released for ${reference}`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        Hi ${escapeHtml(cleanerName)}, WMC has released the agreed cleaner payout for this completed booking.
      </p>
      ${infoBox([
        ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(reference)}</strong>`],
        ["Service", escapeHtml(job?.service_type || job?.service || "Not provided")],
        ["Payout amount", `<strong>${formatMoney(amount)}</strong>`],
        ["WMC platform fee", `${escapeHtml(job?.wmc_fee_percent || 15)}% retained from the customer-selected quote before payout`],
        ["Stripe transfer reference", escapeHtml(transferId || payout?.stripe_transfer_id || "Not provided")]
      ])}
      <p style="margin:18px 0;color:#33445f;font-size:15px;line-height:1.65;">
        WMC has released this approved payout to your Stripe Express account. Stripe then pays your bank according to your Stripe payout schedule, so bank arrival time is controlled by Stripe and your bank.
      </p>
      <p style="margin:18px 0;color:#33445f;font-size:15px;line-height:1.65;">
        You can view your assigned jobs here: <a href="${getCleanerMyJobsUrl()}" style="color:#0f8276;font-weight:700;">${getCleanerMyJobsUrl()}</a>
      </p>
    `
  });
}

export async function sendCleanerPayoutSentEmail({ job, cleaner, payout, transferId }) {
  if (!cleaner?.email) {
    return { sent: false, skipped: true, error: "Cleaner email not provided." };
  }

  return sendWmcEmail({
    to: [cleaner.email],
    subject: `WMC cleaner payout released – ${getBookingReference(job)}`,
    html: buildCleanerPayoutSentEmail({ job, cleaner, payout, transferId }),
    replyTo: getReplyToEmail(cleaner.email)
  });
}


function getProviderPreferenceLabel(job) {
  const explicitLabel =
    job?.provider_preference_label ||
    job?.providerPreferenceLabel ||
    job?.customer_provider_preference_label;

  if (explicitLabel) {
    return String(explicitLabel);
  }

  const explicitValue =
    job?.provider_preference ||
    job?.providerPreference ||
    job?.customer_provider_preference;

  if (explicitValue === "business") {
    return "I prefer a cleaning business / company";
  }

  if (explicitValue === "self_employed" || explicitValue === "self_employed_cleaner") {
    return "I prefer an independent self-employed cleaner";
  }

  const notes = String(job?.notes || "");
  const match = notes.match(/Customer provider preference:\s*(.+)/i);

  if (match?.[1]) {
    return match[1].split("\n")[0].trim();
  }

  return "No preference — match me with the best available approved provider";
}

function getProviderNotificationTarget(job) {
  const preference = getProviderPreferenceLabel(job).toLowerCase();

  if (preference.includes("business") || preference.includes("company")) {
    return { notifyCleaners: false, notifyBusinesses: true };
  }

  if (preference.includes("self-employed") || preference.includes("independent self")) {
    return { notifyCleaners: true, notifyBusinesses: false };
  }

  return { notifyCleaners: true, notifyBusinesses: true };
}

function getCleanerPortalUrl() {
  return `${getSiteUrl()}/cleaner/jobs`;
}

function buildProviderOpportunitySummary(job, payoutLabel = "Proposed payout") {
  const reference = getBookingReference(job);

  return infoBox([
    ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(reference)}</strong>`],
    ["Service", escapeHtml(job?.service_type || "Not provided")],
    ["Date / time", `${escapeHtml(formatDate(job?.preferred_date))} at ${escapeHtml(job?.preferred_time || "Not provided")}`],
    ["Area / postcode area", `${escapeHtml(job?.area_town || "Not provided")} / ${escapeHtml(safePostcodeArea(job?.postcode))}`],
    ["Estimated hours", escapeHtml(job?.estimated_hours || "Not provided")],
    ["Customer provider preference", escapeHtml(getProviderPreferenceLabel(job))],
    ["Guide price only", `<strong>${formatMoney(job?.customer_total_price)}</strong>`],
    ["WMC platform fee", `${escapeHtml(job?.wmc_fee_percent || 15)}% / ${formatMoney(job?.wmc_fee_amount)}`],
    [payoutLabel, `<strong>${formatMoney(job?.business_payout ?? job?.cleaner_payout)}</strong>`]
  ]);
}

export function buildCleanerJobOpportunityEmail({ job, cleaner }) {
  return baseEmailShell({
    title: "New WMC booking opportunity available",
    preheader: `New booking opportunity: ${getBookingReference(job)}`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        Hi ${escapeHtml(cleaner?.full_name || "there")}, a new WMC booking opportunity is available for approved independent cleaner partners to review.
      </p>
      ${buildProviderOpportunitySummary(job, "Estimated cleaner payout if you quote at the guide price")}
      <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
        <strong>Before quoting:</strong> Please review the guide price, WMC flat 15% platform fee, location area, date, time and service type before submitting your provider quote. Full customer address/access details are only released after the customer chooses a provider and payment to WMC is completed.
      </div>
      <p style="margin:22px 0;text-align:center;">
        <a href="${getCleanerPortalUrl()}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:16px;font-weight:800;">View available jobs</a>
      </p>
    `
  });
}

export function buildBusinessJobOpportunityEmail({ job, business }) {
  const businessName = getBusinessDisplayName(business);

  return baseEmailShell({
    title: "New WMC business booking opportunity available",
    preheader: `New business booking opportunity: ${getBookingReference(job)}`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        Hi ${escapeHtml(businessName)}, a new WMC booking opportunity is available for approved business partners to review.
      </p>
      ${buildProviderOpportunitySummary(job, "Estimated business payout if you quote at the guide price")}
      <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
        <strong>Before quoting:</strong> Please review the guide price, WMC flat 15% platform fee, location area, date, time and service type before submitting your business quote. WMC must approve the cleaner/team attending before full customer address/access details are released, and full details are only released after the customer chooses a provider and payment to WMC is completed.
      </div>
      <p style="margin:22px 0;text-align:center;">
        <a href="${getBusinessPortalUrl()}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:16px;font-weight:800;">View business jobs</a>
      </p>
    `
  });
}

async function loadApprovedProviderRecipients({ notifyCleaners, notifyBusinesses }) {
  const result = {
    cleaners: [],
    businesses: [],
    errors: []
  };

  if (notifyCleaners) {
    const { data, error } = await supabaseAdmin
      .from("cleaner_partners")
      .select("id, full_name, business_name, email, phone, status")
      .eq("status", "approved")
      .not("email", "is", null)
      .limit(100);

    if (error) {
      result.errors.push(`Cleaner lookup failed: ${error.message}`);
    } else {
      result.cleaners = (data || []).filter((cleaner) => cleaner.email);
    }
  }

  if (notifyBusinesses) {
    const { data, error } = await supabaseAdmin
      .from("business_partners")
      .select("id, business_name, trading_name, contact_name, email, phone, status, is_active")
      .eq("status", "approved")
      .eq("is_active", true)
      .not("email", "is", null)
      .limit(100);

    if (error) {
      result.errors.push(`Business lookup failed: ${error.message}`);
    } else {
      result.businesses = (data || []).filter((business) => business.email);
    }
  }

  return result;
}

export async function sendNewJobOpportunityEmails({ job }) {
  const target = getProviderNotificationTarget(job);
  const recipients = await loadApprovedProviderRecipients(target);

  const results = {
    cleaners_notified: 0,
    businesses_notified: 0,
    cleaner_results: [],
    business_results: [],
    errors: recipients.errors
  };

  for (const cleaner of recipients.cleaners) {
    const emailResult = await sendWmcEmail({
      to: [cleaner.email],
      subject: `New WMC booking opportunity – ${getBookingReference(job)}`,
      html: buildCleanerJobOpportunityEmail({ job, cleaner }),
      replyTo: getReplyToEmail(cleaner.email)
    });

    results.cleaner_results.push({
      cleaner_id: cleaner.id,
      email: cleaner.email,
      sent: emailResult.sent,
      error: emailResult.error || null
    });

    if (emailResult.sent) {
      results.cleaners_notified += 1;
    }
  }

  for (const business of recipients.businesses) {
    const emailResult = await sendWmcEmail({
      to: [business.email],
      subject: `New WMC business booking opportunity – ${getBookingReference(job)}`,
      html: buildBusinessJobOpportunityEmail({ job, business }),
      replyTo: getReplyToEmail(business.email)
    });

    results.business_results.push({
      business_id: business.id,
      email: business.email,
      sent: emailResult.sent,
      error: emailResult.error || null
    });

    if (emailResult.sent) {
      results.businesses_notified += 1;
    }
  }

  return results;
}

export async function sendBookingEmails(job) {
  const results = {
    customer: null,
    admin: null
  };

  if (job.customer_email) {
    results.customer = await sendWmcEmail({
      to: [job.customer_email],
      subject: `Cleaning request posted on WMC – providers can now quote – ${getBookingReference(job)}`,
      html: buildCustomerBookingEmail(job),
      replyTo: getReplyToEmail(job.customer_email)
    });
  } else {
    results.customer = { sent: false, skipped: true, error: "Customer email not provided." };
  }

  const adminRecipients = parseEmailList(process.env.WMC_ADMIN_EMAIL);

  results.admin = await sendWmcEmail({
    to: adminRecipients,
    subject: `New WMC cleaning request posted – ${getBookingReference(job)}`,
    html: buildAdminBookingEmail(job),
    replyTo: getReplyToEmail(job.customer_email)
  });

  return results;
}

export async function sendCleanerAssignmentEmails({ job, cleaner }) {
  const results = {
    cleaner: null,
    customer: null
  };

  if (cleaner?.email) {
    results.cleaner = await sendWmcEmail({
      to: [cleaner.email],
      subject: `New WMC cleaning job assigned – ${getBookingReference(job)}`,
      html: buildCleanerAssignmentEmail({ job, cleaner }),
      replyTo: getReplyToEmail(cleaner.email)
    });
  } else {
    results.cleaner = { sent: false, skipped: true, error: "Cleaner email not provided." };
  }

  if (job.customer_email) {
    results.customer = await sendWmcEmail({
      to: [job.customer_email],
      subject: `Your WMC booking update – ${getBookingReference(job)}`,
      html: buildCustomerCleanerAssignedEmail({ job }),
      replyTo: getReplyToEmail(job.customer_email)
    });
  } else {
    results.customer = { sent: false, skipped: true, error: "Customer email not provided." };
  }

  return results;
}

export async function sendSelectedProviderPaymentEmail(job) {
  if (!job.customer_email) {
    return { sent: false, skipped: true, error: "Customer email not provided." };
  }

  return sendWmcEmail({
    to: [job.customer_email],
    subject: `Payment request for your selected WMC provider – ${getBookingReference(job)}`,
    html: buildSelectedProviderPaymentEmail(job),
    replyTo: getReplyToEmail(job.customer_email)
  });
}


function buildCustomerProviderQuoteReceivedEmail({ job, quote }) {
  const siteUrl = getSiteUrl();
  const reference = getBookingReference(job);
  const quotesUrl = `${siteUrl}/quotes/${encodeURIComponent(reference)}`;
  const providerType =
    quote?.provider_type === "business"
      ? "cleaning business partner"
      : "independent self-employed cleaner partner";

  return baseEmailShell({
    title: `A provider has quoted for your WMC request`,
    preheader: `A ${providerType} has submitted a quote for ${reference}.`,
    children: `
      <p style="margin:0 0 14px;font-size:16px;line-height:1.6;">
        A WMC approved ${escapeHtml(providerType)} has submitted a quote for your cleaning request.
      </p>

      <div style="background:#f4fbf9;border:1px solid #bfe8df;border-radius:18px;padding:18px;margin:18px 0;">
        <p style="margin:0 0 8px;"><strong>Booking reference:</strong> ${escapeHtml(reference)}</p>
        <p style="margin:0 0 8px;"><strong>Provider:</strong> ${escapeHtml(quote?.provider_display_name || "Approved provider")}</p>
        <p style="margin:0 0 8px;"><strong>Provider type:</strong> ${escapeHtml(providerType)}</p>
        <p style="margin:0 0 8px;"><strong>Quote price:</strong> ${formatMoney(quote?.customer_quote_amount)}</p>
        <p style="margin:0 0 8px;"><strong>Available:</strong> ${escapeHtml(formatDate(quote?.available_date))} at ${escapeHtml(quote?.available_time || "time not provided")}</p>
        <p style="margin:0;"><strong>Products/equipment:</strong> ${escapeHtml(quote?.products_included || "Not stated")}</p>
      </div>

      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;">
        You can view available provider quotes, compare prices and choose the provider you prefer.
        No payment is taken until you choose a provider and continue to secure checkout.
      </p>

      <p style="margin:22px 0;">
        <a href="${escapeHtml(quotesUrl)}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;font-weight:800;padding:13px 18px;border-radius:999px;">
          View provider quotes
        </a>
      </p>

      <p style="margin:0;font-size:14px;line-height:1.6;color:#52616f;">
        Cleaning services are carried out by the independent provider selected by you. WMC helps
        manage the platform, booking flow, payment administration and support where required.
      </p>
    `
  });
}

export async function sendCustomerProviderQuoteReceivedEmail({ job, quote }) {
  if (!job?.customer_email) {
    return { sent: false, skipped: true, error: "Customer email not provided." };
  }

  return sendWmcEmail({
    to: [job.customer_email],
    subject: `Provider quote received – ${getBookingReference(job)}`,
    html: buildCustomerProviderQuoteReceivedEmail({ job, quote }),
    replyTo: getReplyToEmail(job.customer_email)
  });
}

function getProviderTypeLabelFromQuote(quote) {
  return quote?.provider_type === "business"
    ? "Cleaning business partner"
    : "Independent self-employed cleaner partner";
}

function getProviderPortalUrlFromQuote(quote) {
  return quote?.provider_type === "business" ? getBusinessMyJobsUrl() : getCleanerMyJobsUrl();
}

function getProviderNameFromQuote(quote) {
  return quote?.provider_display_name || "Approved WMC provider";
}

function providerQuoteSummaryBox({ job, quote, includeProviderContact = false, includeCustomerContact = false }) {
  const rows = [
    ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(getBookingReference(job))}</strong>`],
    ["Service", escapeHtml(job?.service_type || "Cleaning service")],
    ["Provider", escapeHtml(getProviderNameFromQuote(quote))],
    ["Provider type", escapeHtml(getProviderTypeLabelFromQuote(quote))],
    ["Customer price", `<strong>${formatMoney(quote?.customer_quote_amount ?? job?.customer_total_price)}</strong>`],
    ["WMC platform fee", `${escapeHtml(quote?.wmc_fee_percent ?? job?.wmc_fee_percent ?? 15)}% / ${formatMoney(quote?.wmc_fee_amount ?? job?.wmc_fee_amount)}`],
    ["Provider payout", `<strong>${formatMoney(quote?.provider_payout_amount ?? job?.cleaner_payout ?? job?.business_payout)}</strong>`],
    ["Available date/time", `${escapeHtml(formatDate(quote?.available_date || job?.preferred_date))} at ${escapeHtml(quote?.available_time || job?.preferred_time || "Not provided")}`],
    ["Estimated duration", `${escapeHtml(quote?.estimated_hours || job?.estimated_hours || "Not provided")} hour(s)`],
    ["Products/equipment", escapeHtml(quote?.products_included || "Not stated")]
  ];

  if (includeProviderContact) {
    rows.push(["Provider email", escapeHtml(quote?.provider_email || "Not provided")]);
    rows.push(["Provider phone", escapeHtml(quote?.provider_phone || "Not provided")]);
  }

  if (includeCustomerContact) {
    rows.push(["Customer", escapeHtml(job?.customer_name || "Not provided")]);
    rows.push(["Customer phone", escapeHtml(job?.customer_phone || "Not provided")]);
    rows.push(["Customer email", escapeHtml(job?.customer_email || "Not provided")]);
    rows.push(["Customer address", escapeHtml(job?.customer_address || job?.address || job?.full_address || "See assigned job in your WMC portal")]);
    rows.push(["Area / postcode", `${escapeHtml(job?.area_town || "Not provided")} / ${escapeHtml(job?.postcode || "Not provided")}`]);
    rows.push(["Access notes", nl2br(job?.access_notes || "Not provided")]);
    rows.push(["Parking notes", nl2br(job?.parking_notes || "Not provided")]);
  }

  return infoBox(rows);
}

export function buildCustomerQuoteSelectedEmail({ job, quote, checkoutUrl }) {
  const reference = getBookingReference(job);

  return baseEmailShell({
    title: "Provider selected — secure payment next",
    preheader: `You selected ${getProviderNameFromQuote(quote)} for ${reference}.`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        You have selected an approved provider for your cleaning request. The booking is not confirmed until payment to WMC is completed.
      </p>
      ${providerQuoteSummaryBox({ job, quote })}
      <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
        <strong>Important:</strong> Full booking details are released to the selected provider only after payment to WMC is completed. Cleaning services are carried out by the independent provider you choose.
      </div>
      ${checkoutUrl ? `<p style="margin:22px 0;text-align:center;"><a href="${escapeHtml(checkoutUrl)}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:16px;font-weight:800;">Continue to secure payment</a></p>` : ""}
    `
  });
}

export async function sendCustomerQuoteSelectedEmail({ job, quote, checkoutUrl }) {
  if (!job?.customer_email) {
    return { sent: false, skipped: true, error: "Customer email not provided." };
  }

  return sendWmcEmail({
    to: [job.customer_email],
    subject: `Complete payment for your selected WMC provider – ${getBookingReference(job)}`,
    html: buildCustomerQuoteSelectedEmail({ job, quote, checkoutUrl }),
    replyTo: getReplyToEmail(job.customer_email)
  });
}

export function buildSelectedProviderAwaitingPaymentEmail({ job, quote }) {
  const reference = getBookingReference(job);

  return baseEmailShell({
    title: "Customer selected your quote",
    preheader: `Your quote was selected for ${reference}. Awaiting customer payment.`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        A customer has selected your quote. Please do not attend or contact the customer yet. The booking is only confirmed after the customer completes payment.
      </p>
      ${providerQuoteSummaryBox({ job, quote })}
      <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
        Full customer address, access notes and contact details are released only after payment to WMC is completed. If the customer does not pay, the job is not confirmed.
      </div>
      <p style="margin:18px 0;color:#33445f;font-size:15px;line-height:1.65;">
        You can check assigned jobs here once payment to WMC is completed:<br>
        <a href="${getProviderPortalUrlFromQuote(quote)}" style="color:#0f8276;font-weight:700;">${getProviderPortalUrlFromQuote(quote)}</a>
      </p>
    `
  });
}

export async function sendSelectedProviderAwaitingPaymentEmail({ job, quote }) {
  if (!quote?.provider_email) {
    return { sent: false, skipped: true, error: "Provider email not provided." };
  }

  return sendWmcEmail({
    to: [quote.provider_email],
    subject: `Customer selected your WMC quote – ${getBookingReference(job)}`,
    html: buildSelectedProviderAwaitingPaymentEmail({ job, quote }),
    replyTo: getReplyToEmail(quote.provider_email)
  });
}

export function buildProviderQuoteNotSelectedEmail({ job, quote }) {
  return baseEmailShell({
    title: "Customer chose another provider",
    preheader: `Another provider was selected for ${getBookingReference(job)}.`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        Thank you for quoting for this WMC booking opportunity. The customer has chosen another approved provider, so this opportunity is now closed for you.
      </p>
      ${infoBox([
        ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(getBookingReference(job))}</strong>`],
        ["Service", escapeHtml(job?.service_type || "Cleaning service")],
        ["Your quoted price", `<strong>${formatMoney(quote?.customer_quote_amount)}</strong>`]
      ], "#eef6ff", "#bfd9ff", "#173f91")}
      <p style="margin:18px 0;color:#33445f;font-size:15px;line-height:1.65;">
        You can continue to view other suitable booking opportunities in your WMC provider portal.
      </p>
    `
  });
}

export async function sendProviderQuoteNotSelectedEmail({ job, quote }) {
  if (!quote?.provider_email) {
    return { sent: false, skipped: true, error: "Provider email not provided." };
  }

  return sendWmcEmail({
    to: [quote.provider_email],
    subject: `WMC quote update – customer chose another provider for ${getBookingReference(job)}`,
    html: buildProviderQuoteNotSelectedEmail({ job, quote }),
    replyTo: getReplyToEmail(quote.provider_email)
  });
}

export function buildCustomerPaymentConfirmedSelectedProviderEmail({ job, quote }) {
  return baseEmailShell({
    title: "Booking confirmed — provider selected",
    preheader: `Your WMC booking ${getBookingReference(job)} is confirmed.`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        Payment has been received and your booking is confirmed with your selected approved provider.
      </p>
      ${providerQuoteSummaryBox({ job, quote, includeProviderContact: true })}
      <div style="background:#eef6ff;border:1px solid #bfd9ff;border-radius:18px;padding:18px;margin:18px 0;color:#173f91;line-height:1.65;font-size:15px;">
        Please use WMC messages or the provider contact details above for normal booking communication. If you cannot resolve an issue directly with the provider, WMC can step in to help review it.
      </div>
      <p style="margin:22px 0;text-align:center;">
        <a href="${escapeHtml(getMessagesUrl(job))}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:16px;font-weight:800;">Message selected provider</a>
      </p>
    `
  });
}

export function buildProviderPaymentConfirmedEmail({ job, quote }) {
  return baseEmailShell({
    title: "Customer payment received — booking confirmed",
    preheader: `Payment received for ${getBookingReference(job)}.`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        The customer has completed payment, so this booking is now confirmed. Full customer details should be available in your assigned jobs page.
      </p>
      ${providerQuoteSummaryBox({ job, quote, includeCustomerContact: true })}
      <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
        Only attend at the agreed date/time and complete the work you quoted for. Customer and provider should try to resolve normal service queries directly. If there is an unresolved issue, WMC may step in and may pause payout during review.
      </div>
      <p style="margin:22px 0;text-align:center;">
        <a href="${getProviderPortalUrlFromQuote(quote)}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:16px;font-weight:800;">View assigned job</a>
      </p>
      <p style="margin:10px 0;text-align:center;">
        <a href="${escapeHtml(getMessagesUrl(job))}" style="display:inline-block;background:#ffffff;color:#0f8276;text-decoration:none;padding:13px 20px;border-radius:16px;font-weight:800;border:1px solid #0f8276;">Open WMC messages</a>
      </p>
    `
  });
}

export async function sendMarketplacePaymentConfirmedEmails({ job, quote }) {
  const results = {};

  if (job?.customer_email) {
    results.customer = await sendWmcEmail({
      to: [job.customer_email],
      subject: `Your WMC booking is confirmed – ${getBookingReference(job)}`,
      html: buildCustomerPaymentConfirmedSelectedProviderEmail({ job, quote }),
      replyTo: quote?.provider_email || getReplyToEmail(job.customer_email)
    });
  } else {
    results.customer = { sent: false, skipped: true, error: "Customer email not provided." };
  }

  if (quote?.provider_email) {
    results.provider = await sendWmcEmail({
      to: [quote.provider_email],
      subject: `WMC booking confirmed and paid – ${getBookingReference(job)}`,
      html: buildProviderPaymentConfirmedEmail({ job, quote }),
      replyTo: job?.customer_email || getReplyToEmail(quote.provider_email)
    });
  } else {
    results.provider = { sent: false, skipped: true, error: "Provider email not provided." };
  }

  return results;
}


function getReviewUrl(job) {
  const reference = getBookingReference(job);
  return `${getSiteUrl()}/review/${encodeURIComponent(reference)}`;
}

function getMessagesUrl(job) {
  const reference = getBookingReference(job);
  return `${getSiteUrl()}/messages/${encodeURIComponent(reference)}`;
}

function getIssueUrl(job) {
  const reference = getBookingReference(job);
  return `${getSiteUrl()}/issue/${encodeURIComponent(reference)}`;
}

function getAdminIssuesUrl() {
  return `${getSiteUrl()}/admin/issues`;
}

export function buildCustomerReviewRequestEmail({ job, quote }) {
  const reference = getBookingReference(job);
  const reviewUrl = getReviewUrl(job);
  const providerName = quote?.provider_display_name || "your selected approved provider";
  const providerType = getProviderTypeLabelFromQuote(quote);

  return baseEmailShell({
    title: "Please review your cleaning provider",
    preheader: `Leave a WMC verified review for ${reference}.`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        Your WMC booking has been marked as completed. Please leave a WMC verified review for the provider you selected.
      </p>
      ${infoBox([
        ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(reference)}</strong>`],
        ["Provider", escapeHtml(providerName)],
        ["Provider type", escapeHtml(providerType)],
        ["Service", escapeHtml(job?.service_type || "Cleaning service")],
        ["Area", escapeHtml(job?.area_town || "Not provided")]
      ])}
      <p style="margin:0 0 18px;color:#33445f;font-size:15px;line-height:1.65;">
        WMC uses verified reviews from real completed bookings only. Your review helps future customers compare independent self-employed cleaner partners and cleaning business partners fairly.
      </p>
      <p style="margin:22px 0;text-align:center;">
        <a href="${escapeHtml(reviewUrl)}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:16px;font-weight:800;">
          Leave WMC verified review
        </a>
      </p>
      <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
        If there is an unresolved issue, please explain it in the review form. WMC may review the issue and may pause provider payout where appropriate.
      </div>
    `
  });
}

export async function sendCustomerReviewRequestEmail({ job, quote }) {
  if (!job?.customer_email) {
    return { sent: false, skipped: true, error: "Customer email not provided." };
  }

  return sendWmcEmail({
    to: [job.customer_email],
    subject: `Review your WMC provider – ${getBookingReference(job)}`,
    html: buildCustomerReviewRequestEmail({ job, quote }),
    replyTo: getReplyToEmail(job.customer_email)
  });
}

export function buildAdminProviderReviewReceivedEmail({ job, quote, review }) {
  const adminUrl = `${getSiteUrl()}/admin/provider-reviews`;
  const issueText = review?.issue_raised
    ? `<div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;"><strong>Customer reported an unresolved issue.</strong><br>${nl2br(review?.issue_details || "No details provided")}</div>`
    : "";

  return baseEmailShell({
    title: "New WMC provider review received",
    preheader: `Review received for ${getBookingReference(job)}.`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        A customer has submitted a WMC verified review. Please check it before it is shown publicly.
      </p>
      ${infoBox([
        ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(getBookingReference(job))}</strong>`],
        ["Provider", escapeHtml(review?.provider_display_name || quote?.provider_display_name || "Approved provider")],
        ["Provider type", escapeHtml(getProviderTypeLabelFromQuote(quote || review))],
        ["Rating", `${escapeHtml(review?.rating || "Not provided")}/5`],
        ["Would recommend", review?.would_recommend === true ? "Yes" : review?.would_recommend === false ? "No" : "Not provided"],
        ["Customer", `${escapeHtml(review?.customer_name || job?.customer_name || "Not provided")} / ${escapeHtml(review?.customer_email || job?.customer_email || "Not provided")}`]
      ])}
      <div style="background:#f4fbf9;border:1px solid #bfe8df;border-radius:18px;padding:18px;margin:18px 0;color:#123c36;line-height:1.65;font-size:15px;">
        <strong>Review text:</strong><br>${nl2br(review?.review_text || "Not provided")}
      </div>
      ${issueText}
      <p style="margin:22px 0;text-align:center;">
        <a href="${escapeHtml(adminUrl)}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:16px;font-weight:800;">
          Review in admin
        </a>
      </p>
    `
  });
}

export async function sendAdminProviderReviewReceivedEmail({ job, quote, review }) {
  const recipients = parseEmailList(
    process.env.WMC_ADMIN_EMAIL || process.env.ADMIN_EMAIL || BUSINESS_EMAIL
  );

  if (!recipients.length) {
    return { sent: false, skipped: true, error: "Admin email not provided." };
  }

  return sendWmcEmail({
    to: recipients,
    subject: `New WMC provider review – ${getBookingReference(job)}`,
    html: buildAdminProviderReviewReceivedEmail({ job, quote, review }),
    replyTo: review?.customer_email || job?.customer_email || getReplyToEmail()
  });
}


export function buildMessageNotificationEmail({ job, quote, senderRole, messageText }) {
  const reference = getBookingReference(job);
  const messagesUrl = getMessagesUrl(job);
  const senderLabel = senderRole === "customer" ? "Customer" : "Selected provider";

  return baseEmailShell({
    title: `New WMC booking message`,
    preheader: `New message for ${reference}.`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        ${escapeHtml(senderLabel)} sent a message about booking <strong>${escapeHtml(reference)}</strong>.
      </p>
      ${infoBox([
        ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(reference)}</strong>`],
        ["Provider", escapeHtml(quote?.provider_display_name || "Selected provider")],
        ["Service", escapeHtml(job?.service_type || "Cleaning service")]
      ])}
      <div style="background:#f4fbf9;border:1px solid #bfe8df;border-radius:18px;padding:18px;margin:18px 0;color:#123c36;line-height:1.65;font-size:15px;">
        <strong>Message preview:</strong><br>${nl2br(messageText || "Message sent through WMC.")}
      </div>
      <p style="margin:22px 0;text-align:center;">
        <a href="${escapeHtml(messagesUrl)}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:16px;font-weight:800;">Open WMC messages</a>
      </p>
    `
  });
}

export async function sendMessageNotificationEmail({ job, quote, senderRole, messageText }) {
  const to = senderRole === "customer" ? quote?.provider_email : job?.customer_email;
  if (!to) return { sent: false, skipped: true, error: "Recipient email not provided." };

  return sendWmcEmail({
    to: [to],
    subject: `New WMC message – ${getBookingReference(job)}`,
    html: buildMessageNotificationEmail({ job, quote, senderRole, messageText }),
    replyTo: senderRole === "customer" ? job?.customer_email : quote?.provider_email
  });
}

export function buildCustomerCompletionReviewEmail({ job, quote }) {
  const reference = getBookingReference(job);
  const messagesUrl = getMessagesUrl(job);
  const reviewUrl = getReviewUrl(job);
  const issueUrl = getIssueUrl(job);

  return baseEmailShell({
    title: "Provider marked your booking completed",
    preheader: `Please confirm, review or report an issue for ${reference}.`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        Your selected provider has marked booking <strong>${escapeHtml(reference)}</strong> as completed. Please confirm everything is okay, leave a WMC verified review, or report an issue if something is unresolved.
      </p>
      ${infoBox([
        ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(reference)}</strong>`],
        ["Provider", escapeHtml(quote?.provider_display_name || "Selected provider")],
        ["Service", escapeHtml(job?.service_type || "Cleaning service")],
        ["48-hour issue window", "Provider payout can be paused if an issue is reported during the issue window."]
      ])}
      <p style="margin:22px 0;text-align:center;">
        <a href="${escapeHtml(reviewUrl)}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:16px;font-weight:800;">Leave WMC verified review</a>
      </p>
      <p style="margin:10px 0;text-align:center;">
        <a href="${escapeHtml(messagesUrl)}" style="display:inline-block;background:#ffffff;color:#0f8276;text-decoration:none;padding:13px 20px;border-radius:16px;font-weight:800;border:1px solid #0f8276;">Message provider</a>
      </p>
      <p style="margin:10px 0;text-align:center;">
        <a href="${escapeHtml(issueUrl)}" style="display:inline-block;background:#fff8e7;color:#9a3b00;text-decoration:none;padding:13px 20px;border-radius:16px;font-weight:800;border:1px solid #f2d36a;">Report unresolved issue</a>
      </p>
    `
  });
}

export async function sendCustomerCompletionReviewEmail({ job, quote }) {
  if (!job?.customer_email) return { sent: false, skipped: true, error: "Customer email not provided." };
  return sendWmcEmail({
    to: [job.customer_email],
    subject: `Confirm or review your WMC booking – ${getBookingReference(job)}`,
    html: buildCustomerCompletionReviewEmail({ job, quote }),
    replyTo: quote?.provider_email || getReplyToEmail(job.customer_email)
  });
}

export function buildProviderCompletionConfirmedEmail({ job, quote }) {
  return baseEmailShell({
    title: "Customer confirmed completion",
    preheader: `Completion confirmed for ${getBookingReference(job)}.`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        The customer confirmed completion for booking <strong>${escapeHtml(getBookingReference(job))}</strong>. If there is no open issue, payout will follow the WMC 48-hour issue-window process and Stripe Express payout schedule.
      </p>
      ${providerQuoteSummaryBox({ job, quote, includeCustomerContact: false })}
    `
  });
}

export async function sendProviderCompletionConfirmedEmail({ job, quote }) {
  if (!quote?.provider_email) return { sent: false, skipped: true, error: "Provider email not provided." };
  return sendWmcEmail({
    to: [quote.provider_email],
    subject: `Customer confirmed completion – ${getBookingReference(job)}`,
    html: buildProviderCompletionConfirmedEmail({ job, quote }),
    replyTo: job?.customer_email || getReplyToEmail(quote.provider_email)
  });
}

export function buildProviderIssueReportedEmail({ job, quote, issue }) {
  const messagesUrl = getMessagesUrl(job);
  return baseEmailShell({
    title: "Customer reported an issue",
    preheader: `Issue reported for ${getBookingReference(job)}.`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        The customer reported an issue for booking <strong>${escapeHtml(getBookingReference(job))}</strong>. Provider payout is paused while the issue is open. Please use WMC messages to try to resolve this with the customer.
      </p>
      ${infoBox([
        ["Issue type", escapeHtml(issue?.issue_type || "Customer issue")],
        ["Provider", escapeHtml(quote?.provider_display_name || "Selected provider")],
        ["Service", escapeHtml(job?.service_type || "Cleaning service")]
      ], "#fff8e7", "#f2d36a", "#9a3b00")}
      <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
        <strong>Issue details:</strong><br>${nl2br(issue?.issue_details || "Not provided")}
      </div>
      <p style="margin:22px 0;text-align:center;">
        <a href="${escapeHtml(messagesUrl)}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:16px;font-weight:800;">Open WMC messages</a>
      </p>
    `
  });
}

export async function sendProviderIssueReportedEmail({ job, quote, issue }) {
  if (!quote?.provider_email) return { sent: false, skipped: true, error: "Provider email not provided." };
  return sendWmcEmail({
    to: [quote.provider_email],
    subject: `Customer issue reported – ${getBookingReference(job)}`,
    html: buildProviderIssueReportedEmail({ job, quote, issue }),
    replyTo: job?.customer_email || getReplyToEmail(quote.provider_email)
  });
}

export function buildAdminIssueReportedEmail({ job, quote, issue }) {
  const adminIssuesUrl = getAdminIssuesUrl();
  return baseEmailShell({
    title: "Customer issue reported",
    preheader: `Issue reported for ${getBookingReference(job)}.`,
    children: `
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
        A customer reported an issue. WMC only needs to step in if the customer and provider cannot resolve it directly, but payout is paused while the issue is open.
      </p>
      ${infoBox([
        ["Booking reference", `<strong style="font-size:20px;color:#071733;">${escapeHtml(getBookingReference(job))}</strong>`],
        ["Provider", escapeHtml(quote?.provider_display_name || "Selected provider")],
        ["Customer", `${escapeHtml(job?.customer_name || "Not provided")} / ${escapeHtml(job?.customer_email || "Not provided")}`],
        ["Issue type", escapeHtml(issue?.issue_type || "Customer issue")]
      ], "#fff8e7", "#f2d36a", "#9a3b00")}
      <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
        <strong>Issue details:</strong><br>${nl2br(issue?.issue_details || "Not provided")}
      </div>
      <p style="margin:22px 0;text-align:center;">
        <a href="${escapeHtml(adminIssuesUrl)}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:15px 22px;border-radius:16px;font-weight:800;">Open issues admin</a>
      </p>
    `
  });
}

export async function sendAdminIssueReportedEmail({ job, quote, issue }) {
  const recipients = parseEmailList(process.env.WMC_ADMIN_EMAIL || process.env.ADMIN_EMAIL || BUSINESS_EMAIL);
  if (!recipients.length) return { sent: false, skipped: true, error: "Admin email not provided." };
  return sendWmcEmail({
    to: recipients,
    subject: `Customer issue reported – ${getBookingReference(job)}`,
    html: buildAdminIssueReportedEmail({ job, quote, issue }),
    replyTo: job?.customer_email || getReplyToEmail()
  });
}

export function buildCustomerLoginLinkEmail({ email, loginUrl }) {
  return baseEmailShell({
    title: "Your WMC customer login link",
    preheader: "Use this secure link to view your West Midlands Cleaner bookings.",
    children: `
      <p>Hello,</p>
      <p>Use the button below to view your West Midlands Cleaner customer dashboard.</p>
      <p>Your dashboard shows cleaning requests linked to <strong>${escapeHtml(email)}</strong>, including provider quotes, selected providers, messages, issues and reviews.</p>
      <p style="margin:26px 0;">
        <a href="${escapeHtml(loginUrl)}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:14px 20px;border-radius:999px;font-weight:800;">
          View my WMC bookings
        </a>
      </p>
      <div style="background:#f0fdf9;border:1px solid #99f6e4;border-radius:16px;padding:16px;margin:18px 0;">
        <strong>Security note:</strong> This link gives access to bookings connected to your email address. Do not forward it to anyone else.
      </div>
      <p>If you did not request this email, you can ignore it.</p>
    `
  });
}

export async function sendCustomerLoginLinkEmail({ email, loginUrl }) {
  return sendWmcEmail({
    to: email,
    subject: "Your West Midlands Cleaner login link",
    html: buildCustomerLoginLinkEmail({ email, loginUrl })
  });
}
