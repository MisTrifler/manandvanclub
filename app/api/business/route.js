import { NextResponse } from "next/server";
import { parseEmailList, sendWmcEmail } from "../../../lib/wmcEmails";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const runtime = "nodejs";

const BUSINESS_EMAIL = "info@westmidlandscleaner.co.uk";
const BUSINESS_PHONE = "07943 617386";


function cleanText(value) {
  return String(value || "").trim();
}

function cleanEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function cleanList(value) {
  if (!Array.isArray(value)) return [];

  return value.map((item) => cleanText(item)).filter(Boolean);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

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

function listToHtml(items) {
  if (!items.length) return "Not provided";

  return items.map((item) => `• ${escapeHtml(item)}`).join("<br>");
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

function getBusinessOnboardingPackUrl() {
  return `${getSiteUrl()}/documents/wmc-business-partner-onboarding-pack.html`;
}

function getAdminRecipients() {
  return parseEmailList(process.env.WMC_ADMIN_EMAIL || process.env.ADMIN_EMAIL || BUSINESS_EMAIL);
}

function getReplyToEmail() {
  return process.env.WMC_REPLY_TO_EMAIL || BUSINESS_EMAIL;
}

function validateApplication(values) {
  if (!values.businessName) return "Business name is required.";
  if (!values.businessType) return "Business structure is required.";
  if (!values.contactName) return "Contact name is required.";
  if (!values.phone) return "Phone number is required.";
  if (!values.email) return "Email address is required.";
  if (!isValidEmail(values.email)) return "Please enter a valid email address.";
  if (!values.postcode) return "Business postcode is required.";
  if (!values.areasCovered) return "Areas covered is required.";
  if (!values.teamSize) return "Team size is required.";
  if (!values.availableDays.length) return "Please select at least one available day.";
  if (!values.availableTimes.length) return "Please select at least one available time.";
  if (!values.minimumNotice) return "Minimum notice required is required.";
  if (!values.minimumBookingLength) return "Minimum booking length accepted is required.";
  if (!values.productsEquipment) return "Products and equipment selection is required.";
  if (!values.insuranceStatus) return "Insurance status is required.";
  if (!values.insuranceProvider) return "Insurance provider name is required.";
  if (!values.insurancePolicyNumber) return "Policy or certificate number is required.";
  if (!values.insuranceExpiryDate) return "Insurance expiry date is required.";
  if (!values.insuranceCoverAmount) return "Insurance cover amount is required.";
  if (!values.servicesOffered.length) return "Please select at least one service offered.";
  if (!values.confirmsAuthority) return "Authority confirmation is required.";
  if (!values.confirmsAccuracy) return "Accuracy confirmation is required.";
  if (!values.confirmsInsuranceDetails) return "Insurance confirmation is required.";
  if (!values.understandsNoGuarantee) return "No guarantee confirmation is required.";
  if (!values.understandsPayoutOffer) return "Payout offer confirmation is required.";
  if (!values.understandsChecks) return "Checks confirmation is required.";
  if (!values.understandsProductsFee) return "Products fee confirmation is required.";
  if (!values.consentsContact) return "Contact consent is required.";

  return "";
}

function buildAdminEmail(values) {
  const businessPageUrl = `${getSiteUrl()}/business`;

  return `
    <div style="margin:0;padding:0;background:#f4f8fa;font-family:Arial,sans-serif;color:#071733;">
      <div style="max-width:860px;margin:0 auto;padding:28px 16px;">
        <div style="background:#ffffff;border:1px solid #dbe7ef;border-radius:24px;padding:28px;box-shadow:0 18px 45px rgba(7,23,51,0.08);">
          <p style="margin:0 0 12px;color:#0f8276;font-size:12px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;">
            WMC Admin
          </p>

          <h1 style="margin:0 0 16px;color:#071733;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">
            New cleaning business partner application
          </h1>

          <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
            A business has applied to become a West Midlands Cleaner business partner.
          </p>

          <div style="background:#eafff8;border:1px solid #8df5df;border-radius:18px;padding:18px;margin:18px 0;color:#006159;line-height:1.65;font-size:15px;">
            <strong>Business name:</strong> ${escapeHtml(values.businessName)}<br>
            <strong>Trading name:</strong> ${escapeHtml(values.tradingName || "Not provided")}<br>
            <strong>Business structure:</strong> ${escapeHtml(values.businessType)}<br>
            <strong>Business postcode:</strong> ${escapeHtml(values.postcode)}<br>
            <strong>Contact name:</strong> ${escapeHtml(values.contactName)}<br>
            <strong>Role / position:</strong> ${escapeHtml(values.contactRole || "Not provided")}<br>
            <strong>Phone:</strong> ${escapeHtml(values.phone)}<br>
            <strong>Email:</strong> ${escapeHtml(values.email)}<br>
            <strong>Team size:</strong> ${escapeHtml(values.teamSize)}
          </div>

          <div style="background:#ffffff;border:1px solid #dbe7ef;border-radius:18px;padding:18px;margin:18px 0;color:#33445f;line-height:1.65;font-size:15px;">
            <strong>Areas covered:</strong><br>
            ${nl2br(values.areasCovered)}
            <br><br>
            <strong>Services offered:</strong><br>
            ${listToHtml(values.servicesOffered)}
            <br><br>
            <strong>Available days:</strong><br>
            ${listToHtml(values.availableDays)}
            <br><br>
            <strong>Available times:</strong><br>
            ${listToHtml(values.availableTimes)}
            <br><br>
            <strong>Minimum notice required:</strong> ${escapeHtml(values.minimumNotice)}<br>
            <strong>Minimum booking length accepted:</strong> ${escapeHtml(values.minimumBookingLength)}<br>
            <strong>Products and equipment:</strong> ${escapeHtml(values.productsEquipment)}
          </div>

          <div style="background:#eef6ff;border:1px solid #bfd9ff;border-radius:18px;padding:18px;margin:18px 0;color:#173f91;line-height:1.65;font-size:15px;">
            <strong>Insurance status:</strong> ${escapeHtml(values.insuranceStatus)}<br>
            <strong>Insurance provider:</strong> ${escapeHtml(values.insuranceProvider)}<br>
            <strong>Policy / certificate number:</strong> ${escapeHtml(values.insurancePolicyNumber)}<br>
            <strong>Insurance expiry date:</strong> ${escapeHtml(values.insuranceExpiryDate)}<br>
            <strong>Cover amount:</strong> ${escapeHtml(values.insuranceCoverAmount)}
          </div>

          <div style="background:#ffffff;border:1px solid #dbe7ef;border-radius:18px;padding:18px;margin:18px 0;color:#33445f;line-height:1.65;font-size:15px;">
            <strong>Additional message:</strong><br>
            ${nl2br(values.message)}
          </div>

          <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
            <strong>Important:</strong> Do not offer paid bookings until checks, insurance proof and a
            business partner agreement are complete. Approved businesses may need to submit the
            cleaner/team attending each booking before full customer address/access details are
            released.
            <br><br>
            Products note: WMC may charge the customer a £6 products fee if the customer requires
            cleaning products. Business partners are recommended to bring suitable products where
            possible for recurring customers and better reviews.
            <br><br>
            Business form URL: <strong>${escapeHtml(businessPageUrl)}</strong><br>
            Applicant onboarding pack link sent: <strong>${escapeHtml(getBusinessOnboardingPackUrl())}</strong>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildApplicantEmail(values) {
  const onboardingPackUrl = getBusinessOnboardingPackUrl();

  return `
    <div style="margin:0;padding:0;background:#f4f8fa;font-family:Arial,sans-serif;color:#071733;">
      <div style="max-width:760px;margin:0 auto;padding:28px 16px;">
        <div style="background:#ffffff;border:1px solid #dbe7ef;border-radius:24px;padding:28px;box-shadow:0 18px 45px rgba(7,23,51,0.08);">
          <p style="margin:0 0 12px;color:#0f8276;font-size:12px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;">
            West Midlands Cleaner
          </p>

          <h1 style="margin:0 0 16px;color:#071733;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">
            Thank you — we received your business application
          </h1>

          <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
            Hi ${escapeHtml(values.contactName || "there")},
          </p>

          <p style="margin:0 0 18px;color:#33445f;font-size:16px;line-height:1.65;">
            Thank you for applying to partner with West Midlands Cleaner.
          </p>

          <div style="background:#eafff8;border:1px solid #8df5df;border-radius:18px;padding:18px;margin:18px 0;color:#006159;line-height:1.65;font-size:15px;">
            WMC has received the details for <strong>${escapeHtml(values.businessName)}</strong>.
            We will review the information and contact you if the business may be suitable for
            cleaning booking opportunities. Suitable booking opportunities may be offered with a clear
            proposed business payout for the business to accept.
          </div>

          <div style="background:#eafff8;border:1px solid #8df5df;border-radius:18px;padding:18px;margin:18px 0;color:#006159;line-height:1.65;font-size:15px;">
            <strong>Next step:</strong> please read, complete and sign the WMC Business Partner Onboarding Pack.
            After signing, save it as a PDF and email the completed signed copy back to
            <a href="mailto:${escapeHtml(BUSINESS_EMAIL)}" style="color:#0f8276;font-weight:800;">${escapeHtml(BUSINESS_EMAIL)}</a>.
            <br><br>
            <a href="${onboardingPackUrl}" style="display:inline-block;background:#0f8276;color:#ffffff;text-decoration:none;padding:14px 20px;border-radius:14px;font-weight:900;">
              Open business onboarding pack
            </a>
            <br><br>
            If the button does not open, copy this link into your browser:<br>
            <a href="${onboardingPackUrl}" style="color:#0f8276;font-weight:800;word-break:break-all;">${onboardingPackUrl}</a>
          </div>

          <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:18px;padding:18px;margin:18px 0;color:#9a3b00;line-height:1.65;font-size:15px;">
            Submitting this form and returning a signed onboarding pack does not guarantee approval
            or paid work. Before paid bookings can be considered, WMC may request documents such as
            public liability insurance, business registration proof where relevant, ID for the main contact,
            payout details and any other information required for review.
          </div>

          <div style="background:#eef6ff;border:1px solid #bfd9ff;border-radius:18px;padding:18px;margin:18px 0;color:#173f91;line-height:1.65;font-size:15px;">
            WMC may charge the customer a £6 products fee if the customer requires cleaning products
            to be provided. However, we recommend business partners bring suitable cleaning products
            and basic equipment where possible, especially for recurring customers. This can improve
            reliability, customer satisfaction and reviews.
          </div>

          <div style="margin-top:26px;padding-top:18px;border-top:1px solid #e5edf3;color:#40516b;font-size:14px;line-height:1.6;">
            <strong>West Midlands Cleaner</strong><br>
            Phone / WhatsApp: ${escapeHtml(BUSINESS_PHONE)}<br>
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
      businessName: cleanText(body.businessName),
      tradingName: cleanText(body.tradingName),
      businessType: cleanText(body.businessType),
      contactName: cleanText(body.contactName),
      contactRole: cleanText(body.contactRole),
      phone: cleanText(body.phone),
      email: cleanEmail(body.email),
      postcode: cleanText(body.postcode).toUpperCase(),
      areasCovered: cleanText(body.areasCovered),
      teamSize: cleanText(body.teamSize),
      availableDays: cleanList(body.availableDays),
      availableTimes: cleanList(body.availableTimes),
      minimumNotice: cleanText(body.minimumNotice),
      minimumBookingLength: cleanText(body.minimumBookingLength),
      productsEquipment: cleanText(body.productsEquipment),
      insuranceStatus: cleanText(body.insuranceStatus),
      insuranceProvider: cleanText(body.insuranceProvider),
      insurancePolicyNumber: cleanText(body.insurancePolicyNumber),
      insuranceExpiryDate: cleanText(body.insuranceExpiryDate),
      insuranceCoverAmount: cleanText(body.insuranceCoverAmount),
      servicesOffered: cleanList(body.servicesOffered),
      message: cleanText(body.message),
      confirmsAuthority: body.confirmsAuthority === true,
      confirmsAccuracy: body.confirmsAccuracy === true,
      confirmsInsuranceDetails: body.confirmsInsuranceDetails === true,
      understandsNoGuarantee: body.understandsNoGuarantee === true,
      understandsPayoutOffer: body.understandsPayoutOffer === true,
      understandsChecks: body.understandsChecks === true,
      understandsProductsFee: body.understandsProductsFee === true,
      consentsContact: body.consentsContact === true
    };

    const validationError = validateApplication(values);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }


    const businessPayload = {
      business_name: values.businessName,
      trading_name: values.tradingName || null,
      business_type: values.businessType || null,
      contact_name: values.contactName || null,
      contact_role: values.contactRole || null,
      phone: values.phone,
      email: values.email,
      postcode: values.postcode || null,
      areas_covered: values.areasCovered || null,
      team_size: values.teamSize || null,
      available_days: values.availableDays.join(", "),
      available_times: values.availableTimes.join(", "),
      minimum_notice: values.minimumNotice || null,
      minimum_booking_length: values.minimumBookingLength || null,
      products_equipment: values.productsEquipment || null,
      insurance_status: values.insuranceStatus || null,
      insurance_provider: values.insuranceProvider || null,
      insurance_policy_number: values.insurancePolicyNumber || null,
      insurance_expiry_date: values.insuranceExpiryDate || null,
      insurance_cover_amount: values.insuranceCoverAmount || null,
      services_offered: values.servicesOffered.join(", "),
      message: values.message || null,
      status: "pending",
      is_active: true
    };

    const { data: savedBusiness, error: saveBusinessError } = await supabaseAdmin
      .from("business_partners")
      .upsert(businessPayload, { onConflict: "email" })
      .select("id, business_name, email, status")
      .single();

    if (saveBusinessError) {
      return NextResponse.json(
        {
          error: `Business application could not be saved: ${saveBusinessError.message}. Please make sure supabase-business-partners-setup.sql has been run.`
        },
        { status: 500 }
      );
    }

    const adminEmailResult = await sendWmcEmail({
      to: getAdminRecipients(),
      subject: `New cleaning business partner application – ${values.businessName}`,
      html: buildAdminEmail(values),
      replyTo: values.email || getReplyToEmail()
    });

    const applicantEmailResult = await sendWmcEmail({
      to: [values.email],
      subject: "We received your business application – please sign the WMC onboarding pack",
      html: buildApplicantEmail(values),
      replyTo: getReplyToEmail()
    });

    return NextResponse.json({
      success: true,
      message: "Business application submitted.",
      business: savedBusiness,
      emailResults: {
        admin: adminEmailResult,
        applicant: applicantEmailResult
      }
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error?.message || "Could not submit the business application."
      },
      { status: 500 }
    );
  }
}
