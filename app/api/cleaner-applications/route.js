import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const runtime = "nodejs";

const BUCKET_NAME = "cleaner-documents";
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ["pdf", "jpg", "jpeg", "png"];
const ALLOWED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const WMC_EMAIL =
  process.env.WMC_ONBOARDING_EMAIL ||
  process.env.WMC_ADMIN_EMAIL ||
  "viddchoudhary@hotmail.com";

function cleanText(value) {
  return String(value || "").trim();
}

function cleanEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function cleanPhone(value) {
  return String(value || "").trim();
}

function cleanBoolean(value) {
  return value === "true" || value === true || value === "on" || value === "yes" || value === "1";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getFormValue(formData, key) {
  return cleanText(formData.get(key));
}

function getFormEmail(formData, key) {
  return cleanEmail(formData.get(key));
}

function getFormPhone(formData, key) {
  return cleanPhone(formData.get(key));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function isValidUtr(value) {
  return /^\d{10}$/.test(cleanText(value).replace(/\s+/g, ""));
}

function isValidDateOfBirth(value) {
  const match = String(value || "").trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return false;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const currentYear = new Date().getFullYear();

  if (year < 1900 || year > currentYear) return false;

  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function addError(errors, field, message) {
  if (!errors[field]) errors[field] = message;
}

function getFileExtension(file) {
  return String(file?.name || "").split(".").pop()?.toLowerCase() || "";
}

function isUploadFile(value) {
  return value && typeof value.arrayBuffer === "function" && typeof value.size === "number";
}

function hasUsableFile(file) {
  return isUploadFile(file) && file.size > 0 && file.name;
}

function validateOptionalFile(file) {
  if (!hasUsableFile(file)) return "";

  const extension = getFileExtension(file);
  const mimeType = String(file.type || "").toLowerCase();

  if (!ALLOWED_EXTENSIONS.includes(extension) || !ALLOWED_MIME_TYPES.includes(mimeType)) {
    return "File must be PDF, JPG or PNG.";
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return "File must be 10MB or smaller.";
  }

  return "";
}

function safeFileName(value) {
  return String(value || "document")
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function ensureBucketExists() {
  const { error: getError } = await supabaseAdmin.storage.getBucket(BUCKET_NAME);

  if (!getError) return;

  const { error: createError } = await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
    public: false,
    fileSizeLimit: MAX_FILE_SIZE_BYTES,
    allowedMimeTypes: ALLOWED_MIME_TYPES
  });

  if (createError && !String(createError.message || "").toLowerCase().includes("already exists")) {
    throw new Error(
      `Supabase storage bucket "${BUCKET_NAME}" is not available. Create a private bucket named "${BUCKET_NAME}" and try again.`
    );
  }
}

async function uploadOptionalDocument({ applicationId, file, label }) {
  if (!hasUsableFile(file)) return "";

  const extension = getFileExtension(file) || "pdf";
  const path = `${applicationId}/${label}-${Date.now()}-${safeFileName(file.name || `${label}.${extension}`)}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabaseAdmin.storage.from(BUCKET_NAME).upload(path, buffer, {
    contentType: file.type || "application/octet-stream",
    upsert: false
  });

  if (error) {
    throw new Error(`${label} upload failed: ${error.message}`);
  }

  return path;
}

function yesNo(value) {
  return value ? "Yes" : "No";
}

function buildAdminNotes(extra) {
  return [
    "ONLINE CLEANER PARTNER APPLICATION SUBMITTED",
    `Submitted at: ${extra.submittedAt}`,
    `Application reference: ${extra.applicationId}`,
    "",
    "Electronic signature:",
    `Signed name: ${extra.electronicSignature}`,
    `Cleaner Partner Agreement accepted: ${yesNo(extra.acceptedCleanerAgreement)}`,
    `Standards & Data Agreement accepted: ${yesNo(extra.acceptedStandardsAgreement)}`,
    "",
    "Required confirmations:",
    `Self-employed confirmation: ${yesNo(extra.isSelfEmployed)}`,
    `No employment confirmation: ${yesNo(extra.understandsNoEmployment)}`,
    `No guaranteed work confirmation: ${yesNo(extra.understandsNoGuaranteedWork)}`,
    `Can accept/reject bookings confirmation: ${yesNo(extra.understandsCanAcceptReject)}`,
    `Truthful information confirmation: ${yesNo(extra.confirmsTruthfulInfo)}`,
    `Document review consent: ${yesNo(extra.consentsDocumentReview)}`,
    `Consent to store details: ${yesNo(extra.consentToStoreDetails)}`,
    `Consent to be contacted: ${yesNo(extra.consentToBeContacted)}`,
    "",
    "Application-stage statuses:",
    `UTR status: ${extra.utrStatus || "Not selected"}`,
    `Public liability insurance status: ${extra.insuranceStatus || "Not selected"}`,
    "",
    "Additional personal details:",
    `Date of birth: ${extra.dateOfBirth}`,
    `Home address: ${extra.address || "Not provided"}`,
    `National Insurance number: ${extra.nationalInsuranceNumber || "Not provided"}`,
    `Trading/business name: ${extra.businessName || "Not provided"}`,
    "",
    "Next of kin / emergency contact:",
    `Name: ${extra.nextOfKinName || "Not provided"}`,
    `Relationship: ${extra.nextOfKinRelationship || "Not provided"}`,
    `Phone: ${extra.nextOfKinPhone || "Not provided"}`,
    `Email: ${extra.nextOfKinEmail || "Not provided"}`,
    "",
    "Insurance:",
    `Provider: ${extra.insuranceProvider || "Not provided"}`,
    `Policy number: ${extra.insurancePolicyNumber || "Not provided"}`,
    `Cover amount: ${extra.insuranceCoverAmount || "Not provided"}`,
    `Expiry date: ${extra.insuranceExpiryDate || "Not provided"}`,
    "",
    "Documents uploaded:",
    `Photo ID: ${extra.idDocumentPath || "Not uploaded at application stage"}`,
    `Proof of address: ${extra.proofOfAddressPath || "Not uploaded at application stage"}`,
    `Right-to-work / eligibility evidence: ${extra.rightToWorkDocumentPath || "Not uploaded at application stage"}`,
    `Public liability insurance certificate: ${extra.insuranceDocumentPath || "Not uploaded at application stage"}`,
    "",
    "Review note: Applicant is not approved until WMC manually checks required documents, UTR/self-employed details, eligibility/right-to-work evidence, public liability insurance and Stripe payout setup."
  ].join("\n");
}

function buildEmailHtml({ application, extra }) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:760px;margin:0 auto;color:#071733;">
      <h1 style="font-size:28px;margin:0 0 8px;">New cleaner partner application submitted</h1>
      <p style="margin:0 0 20px;color:#33445f;">
        A cleaner has completed the online cleaner partner application form.
      </p>

      <div style="background:#eafff8;border:1px solid #8df5df;border-radius:16px;padding:16px;margin:20px 0;">
        <strong>Applicant:</strong> ${escapeHtml(application.full_name)}<br>
        <strong>Email:</strong> ${escapeHtml(application.email)}<br>
        <strong>Phone:</strong> ${escapeHtml(application.phone)}<br>
        <strong>Postcode:</strong> ${escapeHtml(application.postcode)}<br>
        <strong>UTR number:</strong> ${escapeHtml(application.utr_number || "Not provided yet")}<br>
        <strong>UTR status:</strong> ${escapeHtml(extra.utrStatus || "Not selected")}<br>
        <strong>Insurance status:</strong> ${escapeHtml(extra.insuranceStatus || "Not selected")}<br>
        <strong>Status:</strong> ${escapeHtml(application.application_status)}
      </div>

      <div style="background:#eef6ff;border:1px solid #bfd9ff;border-radius:16px;padding:16px;margin:20px 0;color:#173f91;">
        <strong>Electronic signature:</strong> ${escapeHtml(extra.electronicSignature)}<br>
        <strong>Cleaner Partner Agreement accepted:</strong> ${yesNo(extra.acceptedCleanerAgreement)}<br>
        <strong>Standards & Data Agreement accepted:</strong> ${yesNo(extra.acceptedStandardsAgreement)}<br>
        <strong>Submitted:</strong> ${escapeHtml(extra.submittedAt)}
      </div>

      <h2 style="font-size:22px;margin-top:26px;">Document status</h2>
      <ul>
        <li>Photo ID: ${extra.idDocumentPath ? "Uploaded" : "Not uploaded at application stage"}</li>
        <li>Proof of address: ${extra.proofOfAddressPath ? "Uploaded" : "Not uploaded at application stage"}</li>
        <li>Right-to-work / eligibility evidence: ${extra.rightToWorkDocumentPath ? "Uploaded" : "Not uploaded at application stage"}</li>
        <li>Public liability insurance certificate: ${extra.insuranceDocumentPath ? "Uploaded" : "Not uploaded at application stage"}</li>
      </ul>

      <p style="margin-top:20px;color:#9a3b00;background:#fff8e7;border:1px solid #f2d36a;border-radius:14px;padding:14px;">
        Review the application in the WMC admin panel. Do not offer bookings until ID, eligibility/right-to-work evidence,
        proof of address, UTR/self-employed details and public liability insurance have been manually checked and the applicant is approved.
      </p>
    </div>
  `;
}

function buildApplicantConfirmationEmailHtml({ application }) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#071733;line-height:1.65;">
      <h1 style="font-size:26px;margin:0 0 12px;">Cleaner application received</h1>
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;">Hi ${escapeHtml(application.full_name)},</p>
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;">
        Thank you for applying to become a cleaner partner with West Midlands Cleaner.
      </p>
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;">
        We have received your application. If any details or documents are missing, we may contact you before your application can move forward.
      </p>
      <div style="background:#fff8e7;border:1px solid #f2d36a;border-radius:16px;padding:16px;margin:20px 0;color:#9a3b00;">
        <strong>Your application has not been approved yet.</strong><br>
        WMC cannot offer paid cleaning bookings until all required checks, documents, insurance, UTR/self-employed details and payout setup are complete.
      </div>
      <p style="margin:0 0 18px;color:#33445f;font-size:16px;">
        Please do not attend or accept any cleaning work until WMC has confirmed your approval.
      </p>
      <p style="margin:24px 0 0;color:#33445f;font-size:16px;">
        Kind regards,<br>
        <strong>West Midlands Cleaner</strong><br>
        info@westmidlandscleaner.co.uk<br>
        07943 617386
      </p>
    </div>
  `;
}

async function sendApplicantConfirmationEmail({ application }) {
  if (!process.env.RESEND_API_KEY) {
    return { sent: false, error: "RESEND_API_KEY is not set." };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "West Midlands Cleaner <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [application.email],
      subject: "Cleaner application received – West Midlands Cleaner",
      html: buildApplicantConfirmationEmailHtml({ application })
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return { sent: false, error: data?.message || data?.error || `Resend error: ${response.status}` };
  }

  return { sent: true, id: data?.id || null };
}

async function sendApplicationEmail({ application, extra }) {
  if (!process.env.RESEND_API_KEY) {
    return { sent: false, error: "RESEND_API_KEY is not set." };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "West Midlands Cleaner <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [WMC_EMAIL],
      subject: `New cleaner application: ${application.full_name}`,
      html: buildEmailHtml({ application, extra }),
      reply_to: application.email
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return { sent: false, error: data?.message || data?.error || `Resend error: ${response.status}` };
  }

  return { sent: true, id: data?.id || null };
}

function validateApplication(formValues, files) {
  const fieldErrors = {};

  if (!formValues.fullName) addError(fieldErrors, "fullName", "Full legal name is required.");

  if (!formValues.dateOfBirth) {
    addError(fieldErrors, "dateOfBirth", "Date of birth is required.");
  } else if (!isValidDateOfBirth(formValues.dateOfBirth)) {
    addError(fieldErrors, "dateOfBirth", "Please enter date of birth in DD/MM/YYYY format.");
  }

  if (!formValues.phone) addError(fieldErrors, "phone", "Phone number is required.");

  if (!formValues.email) {
    addError(fieldErrors, "email", "Email address is required.");
  } else if (!isValidEmail(formValues.email)) {
    addError(fieldErrors, "email", "Please enter a valid email address.");
  }

  if (!formValues.postcode) addError(fieldErrors, "postcode", "Postcode is required.");
  if (!formValues.baseArea) addError(fieldErrors, "baseArea", "Main working base area is required.");
  if (!formValues.utrStatus) addError(fieldErrors, "utrStatus", "Please select your UTR status.");

  if (formValues.utrStatus === "have_utr") {
    if (!formValues.utrNumber) {
      addError(fieldErrors, "utrNumber", "Please enter your 10-digit UTR number.");
    } else if (!isValidUtr(formValues.utrNumber)) {
      addError(fieldErrors, "utrNumber", "UTR must be a valid 10-digit number.");
    }
  }

  if (!formValues.areasCovered) addError(fieldErrors, "areas", "Please select at least one area you can cover.");
  if (!formValues.servicesOffered) addError(fieldErrors, "services", "Please select at least one service you can offer.");
  if (!formValues.availability) addError(fieldErrors, "availability", "Please tell us your availability.");
  if (!formValues.experience) addError(fieldErrors, "experience", "Please tell us about your cleaning experience.");
  if (!formValues.insuranceStatus) addError(fieldErrors, "insuranceStatus", "Please select your public liability insurance status.");

  if (formValues.insuranceStatus === "have_insurance") {
    if (!formValues.insuranceProvider) addError(fieldErrors, "insuranceProvider", "Insurance provider is required if you already have insurance.");
    if (!formValues.insurancePolicyNumber) addError(fieldErrors, "insurancePolicyNumber", "Policy number is required if you already have insurance.");
    if (!formValues.insuranceExpiryDate) addError(fieldErrors, "insuranceExpiryDate", "Insurance expiry date is required if you already have insurance.");
  }

  if (!formValues.eligibleToWorkUk) addError(fieldErrors, "eligibleToWorkUk", "Please confirm you are eligible to work in the UK.");
  if (!formValues.acceptedCleanerAgreement) addError(fieldErrors, "acceptedCleanerAgreement", "Please accept the Cleaner Partner Agreement.");
  if (!formValues.acceptedStandardsAgreement) addError(fieldErrors, "acceptedStandardsAgreement", "Please accept the Standards & Data Agreement.");
  if (!formValues.isSelfEmployed) addError(fieldErrors, "isSelfEmployed", "Please confirm this is a self-employed cleaner partner application.");
  if (!formValues.understandsNoEmployment) addError(fieldErrors, "understandsNoEmployment", "Please confirm you understand this is not employment.");
  if (!formValues.understandsNoGuaranteedWork) addError(fieldErrors, "understandsNoGuaranteedWork", "Please confirm you understand there is no guaranteed work.");
  if (!formValues.understandsCanAcceptReject) addError(fieldErrors, "understandsCanAcceptReject", "Please confirm you can accept or reject booking offers.");
  if (!formValues.confirmsTruthfulInfo) addError(fieldErrors, "confirmsTruthfulInfo", "Please confirm your information is true and accurate.");
  if (!formValues.consentsDocumentReview) addError(fieldErrors, "consentsDocumentReview", "Please consent to WMC reviewing your documents before approval.");
  if (!formValues.consentToStoreDetails) addError(fieldErrors, "consentToStoreDetails", "Please consent to WMC storing your application details.");
  if (!formValues.consentToBeContacted) addError(fieldErrors, "consentToBeContacted", "Please consent to WMC contacting you about your application.");

  if (!formValues.electronicSignature) {
    addError(fieldErrors, "electronicSignature", "Please type your full legal name as your electronic signature.");
  } else if (formValues.fullName && formValues.electronicSignature.toLowerCase() !== formValues.fullName.toLowerCase()) {
    addError(fieldErrors, "electronicSignature", "Your electronic signature must match your full legal name.");
  }

  for (const [field, file] of Object.entries(files)) {
    const fileError = validateOptionalFile(file);
    if (fileError) addError(fieldErrors, field, fileError);
  }

  return fieldErrors;
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const formValues = {
      fullName: getFormValue(formData, "fullName"),
      businessName: getFormValue(formData, "businessName"),
      dateOfBirth: getFormValue(formData, "dateOfBirth"),
      utrStatus: getFormValue(formData, "utrStatus"),
      utrNumber: getFormValue(formData, "utrNumber").replace(/\s+/g, ""),
      nationalInsuranceNumber: getFormValue(formData, "nationalInsuranceNumber"),
      phone: getFormPhone(formData, "phone"),
      email: getFormEmail(formData, "email"),
      address: getFormValue(formData, "address"),
      postcode: getFormValue(formData, "postcode").toUpperCase(),
      baseArea: getFormValue(formData, "baseArea"),
      nextOfKinName: getFormValue(formData, "nextOfKinName"),
      nextOfKinRelationship: getFormValue(formData, "nextOfKinRelationship"),
      nextOfKinPhone: getFormPhone(formData, "nextOfKinPhone"),
      nextOfKinEmail: getFormEmail(formData, "nextOfKinEmail"),
      areasCovered: getFormValue(formData, "areasCovered"),
      servicesOffered: getFormValue(formData, "servicesOffered"),
      availability: getFormValue(formData, "availability"),
      experience: getFormValue(formData, "experience"),
      insuranceStatus: getFormValue(formData, "insuranceStatus"),
      rightToWorkShareCode: getFormValue(formData, "rightToWorkShareCode"),
      insuranceProvider: getFormValue(formData, "insuranceProvider"),
      insurancePolicyNumber: getFormValue(formData, "insurancePolicyNumber"),
      insuranceCoverAmount: getFormValue(formData, "insuranceCoverAmount"),
      insuranceExpiryDate: getFormValue(formData, "insuranceExpiryDate"),
      electronicSignature: getFormValue(formData, "electronicSignature"),
      hasOwnTransport: cleanBoolean(formData.get("hasOwnTransport")),
      hasOwnProductsEquipment: cleanBoolean(formData.get("hasOwnProductsEquipment")),
      eligibleToWorkUk: cleanBoolean(formData.get("eligibleToWorkUk")),
      acceptedCleanerAgreement: cleanBoolean(formData.get("acceptedCleanerAgreement")),
      acceptedStandardsAgreement: cleanBoolean(formData.get("acceptedStandardsAgreement")),
      isSelfEmployed: cleanBoolean(formData.get("isSelfEmployed")),
      understandsNoEmployment: cleanBoolean(formData.get("understandsNoEmployment")),
      understandsNoGuaranteedWork: cleanBoolean(formData.get("understandsNoGuaranteedWork")),
      understandsCanAcceptReject: cleanBoolean(formData.get("understandsCanAcceptReject")),
      confirmsTruthfulInfo: cleanBoolean(formData.get("confirmsTruthfulInfo")),
      consentsDocumentReview: cleanBoolean(formData.get("consentsDocumentReview")),
      consentToStoreDetails: cleanBoolean(formData.get("consentToStoreDetails")),
      consentToBeContacted: cleanBoolean(formData.get("consentToBeContacted"))
    };

    const files = {
      photoIdFile: formData.get("photoIdFile"),
      proofOfAddressFile: formData.get("proofOfAddressFile"),
      rightToWorkFile: formData.get("rightToWorkFile"),
      insuranceCertificateFile: formData.get("insuranceCertificateFile")
    };

    const fieldErrors = validateApplication(formValues, files);

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          error: "Please fix the highlighted fields.",
          fieldErrors
        },
        { status: 400 }
      );
    }

    const applicationId = crypto.randomUUID();
    const submittedAt = new Date().toISOString();

    const hasAnyFile = Object.values(files).some(hasUsableFile);
    if (hasAnyFile) await ensureBucketExists();

    const idDocumentPath = await uploadOptionalDocument({ applicationId, file: files.photoIdFile, label: "photo-id" });
    const proofOfAddressPath = await uploadOptionalDocument({ applicationId, file: files.proofOfAddressFile, label: "proof-of-address" });
    const rightToWorkDocumentPath = await uploadOptionalDocument({ applicationId, file: files.rightToWorkFile, label: "right-to-work" });
    const insuranceDocumentPath = await uploadOptionalDocument({ applicationId, file: files.insuranceCertificateFile, label: "public-liability-insurance" });

    const extra = {
      applicationId,
      submittedAt,
      ...formValues,
      idDocumentPath,
      proofOfAddressPath,
      rightToWorkDocumentPath,
      insuranceDocumentPath
    };

    const insertPayload = {
      id: applicationId,
      application_status: "submitted",

      full_name: formValues.fullName,
      business_name: formValues.businessName || null,
      phone: formValues.phone,
      email: formValues.email,
      postcode: formValues.postcode,
      base_area: formValues.baseArea || null,

      areas_covered: formValues.areasCovered || null,
      services_offered: formValues.servicesOffered || null,
      availability: formValues.availability || null,
      experience: formValues.experience || null,

      is_self_employed: formValues.isSelfEmployed,
      understands_no_employment: formValues.understandsNoEmployment,
      understands_no_guaranteed_work: formValues.understandsNoGuaranteedWork,
      eligible_to_work_uk: formValues.eligibleToWorkUk,

      utr_number: formValues.utrNumber || null,
      national_insurance_number: formValues.nationalInsuranceNumber || null,
      right_to_work_share_code: formValues.rightToWorkShareCode || null,

      has_public_liability_insurance: formValues.insuranceStatus === "have_insurance",
      insurance_provider: formValues.insuranceProvider || null,
      insurance_policy_number: formValues.insurancePolicyNumber || null,
      insurance_expiry_date: formValues.insuranceExpiryDate || null,

      has_own_transport: formValues.hasOwnTransport,
      has_own_products_equipment: formValues.hasOwnProductsEquipment,

      insurance_document_path: insuranceDocumentPath || null,
      right_to_work_document_path: rightToWorkDocumentPath || null,
      id_document_path: idDocumentPath || null,
      extra_document_path: proofOfAddressPath || null,

      consent_to_store_details: formValues.consentToStoreDetails,
      consent_to_be_contacted: formValues.consentToBeContacted,

      admin_notes: buildAdminNotes(extra)
    };

    const { data: application, error: insertError } = await supabaseAdmin
      .from("cleaner_applications")
      .insert(insertPayload)
      .select("*")
      .single();

    if (insertError) {
      return NextResponse.json(
        {
          error: insertError.message || "Could not save cleaner application."
        },
        { status: 500 }
      );
    }

    const emailResult = await sendApplicationEmail({ application, extra });
    const applicantEmailResult = await sendApplicantConfirmationEmail({ application });
    const emailNotes = [];

    if (!emailResult.sent) {
      emailNotes.push(`Admin email notification failed: ${emailResult.error}`);
      console.error("Cleaner application admin email failed:", emailResult.error);
    }

    if (!applicantEmailResult.sent) {
      emailNotes.push(`Cleaner confirmation email failed: ${applicantEmailResult.error}`);
      console.error("Cleaner application applicant email failed:", applicantEmailResult.error);
    }

    if (emailNotes.length) {
      await supabaseAdmin
        .from("cleaner_applications")
        .update({ admin_notes: `${insertPayload.admin_notes}\n\n${emailNotes.join("\n")}` })
        .eq("id", application.id);
    }

    return NextResponse.json({
      success: true,
      message: "Cleaner application submitted",
      applicationReference: application.id
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error?.message || "Unable to submit cleaner application."
      },
      { status: 500 }
    );
  }
}
