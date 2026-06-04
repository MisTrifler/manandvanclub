"use client";

import React, { useMemo, useState } from "react";

const statusOptions = [
  {
    value: "submitted",
    label: "Documents submitted"
  },
  {
    value: "under_review",
    label: "Under review"
  },
  {
    value: "approved",
    label: "Approved"
  },
  {
    value: "more_info_needed",
    label: "More info needed"
  },
  {
    value: "rejected",
    label: "Rejected"
  },
  {
    value: "withdrawn",
    label: "Withdrawn"
  }
];

function formatDate(value) {
  if (!value) {
    return "Not set";
  }

  try {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function display(value) {
  return value || "Not provided";
}

function statusLabel(status) {
  const found = statusOptions.find((option) => option.value === status);
  return found?.label || status || "Unknown";
}

function stripeStatusLabel(status) {
  if (status === "complete") return "Complete";
  if (status === "submitted") return "Submitted";
  if (status === "requirements_due") return "Action needed";
  if (status === "pending") return "Pending";
  if (status === "not_started") return "Not started";
  return status || "Not started";
}

function statusClass(status) {
  if (status === "approved") return "successPill";
  if (status === "rejected") return "dangerPill";
  if (status === "more_info_needed") return "warningPill";
  if (status === "under_review") return "infoPill";
  return "neutralPill";
}

function stripeStatusClass(status) {
  if (status === "complete") return "successPill";
  if (status === "submitted") return "infoPill";
  if (status === "requirements_due") return "warningPill";
  if (status === "pending") return "warningPill";
  return "neutralPill";
}

function getAdminNoteValue(notes, label) {
  const text = String(notes || "");
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`${escapedLabel}:\\s*([^\\n\\r]+)`, "i");
  const match = text.match(regex);

  return match?.[1]?.trim() || "Not recorded";
}

function buildEvidenceSummary(application) {
  return [
    "WEST MIDLANDS CLEANER - CLEANER PARTNER APPLICATION EVIDENCE",
    "",
    `Cleaner name: ${display(application.full_name)}`,
    `Business name: ${display(application.business_name)}`,
    `Email: ${display(application.email)}`,
    `Phone: ${display(application.phone)}`,
    `Application reference: ${display(application.id)}`,
    `Application status: ${statusLabel(application.application_status)}`,
    "",
    "Electronic signature proof",
    `Signed name: ${getAdminNoteValue(application.admin_notes, "Signed name")}`,
    `Submitted at: ${getAdminNoteValue(application.admin_notes, "Submitted at")}`,
    `Cleaner Partner Agreement accepted: ${getAdminNoteValue(application.admin_notes, "Cleaner Partner Agreement accepted")}`,
    `Standards & Data Agreement accepted: ${getAdminNoteValue(application.admin_notes, "Standards & Data Agreement accepted")}`,
    `Self-employed confirmation: ${getAdminNoteValue(application.admin_notes, "Self-employed confirmation")}`,
    `No employment confirmation: ${getAdminNoteValue(application.admin_notes, "No employment confirmation")}`,
    `No guaranteed work confirmation: ${getAdminNoteValue(application.admin_notes, "No guaranteed work confirmation")}`,
    `Can accept/reject bookings confirmation: ${getAdminNoteValue(application.admin_notes, "Can accept/reject bookings confirmation")}`,
    "",
    "Self-employed details",
    `UTR number: ${display(application.utr_number)}`,
    `National Insurance number: ${display(application.national_insurance_number)}`,
    `Self-employed: ${application.is_self_employed ? "Yes" : "No"}`,
    `Understands not employment: ${application.understands_no_employment ? "Yes" : "No"}`,
    `Understands no guaranteed work: ${application.understands_no_guaranteed_work ? "Yes" : "No"}`,
    `Public liability insurance: ${application.has_public_liability_insurance ? "Yes" : "No"}`,
    "",
    "Uploaded document paths",
    `ID document: ${display(application.id_document_path)}`,
    `Proof of address: ${display(application.extra_document_path)}`,
    `Right-to-work / eligibility: ${display(application.right_to_work_document_path)}`,
    `Insurance certificate: ${display(application.insurance_document_path)}`,
    "",
    "Admin notes",
    application.admin_notes || "No admin notes recorded."
  ].join("\n");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getTodayForDocument() {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short"
  }).format(new Date());
}

function safeFileName(value) {
  return (
    String(value || "cleaner")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "cleaner"
  );
}

function openPdfSaveWindow(filename, html) {
  const existingFrame = document.getElementById("wmc-print-frame");

  if (existingFrame) {
    existingFrame.remove();
  }

  const iframe = document.createElement("iframe");
  iframe.id = "wmc-print-frame";
  iframe.title = filename.replace(/\.pdf$/i, "");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";

  document.body.appendChild(iframe);

  const frameWindow = iframe.contentWindow;
  const frameDocument = iframe.contentDocument || frameWindow?.document;

  if (!frameWindow || !frameDocument) {
    window.alert("Could not prepare the PDF print screen. Please refresh and try again.");
    return;
  }

  frameDocument.open();
  frameDocument.write(html);
  frameDocument.close();

  setTimeout(() => {
    try {
      frameWindow.focus();
      frameWindow.print();
    } catch {
      window.alert(
        "Could not open the Save as PDF screen automatically. Please refresh and try again."
      );
    }
  }, 600);
}

function documentShell({ title, application, children }) {
  const cleanerName = display(application.full_name);
  const signedName = getAdminNoteValue(application.admin_notes, "Signed name");
  const submittedAt = getAdminNoteValue(application.admin_notes, "Submitted at");

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)} - ${escapeHtml(cleanerName)}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #071733;
      background: #ffffff;
      margin: 0;
      padding: 32px;
      line-height: 1.55;
    }

    .page {
      max-width: 900px;
      margin: 0 auto;
    }

    h1 {
      font-size: 28px;
      margin: 0 0 8px;
    }

    h2 {
      font-size: 20px;
      margin: 28px 0 10px;
      border-bottom: 1px solid #dbe3ef;
      padding-bottom: 8px;
    }

    p {
      margin: 0 0 12px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0 22px;
    }

    th,
    td {
      text-align: left;
      vertical-align: top;
      border: 1px solid #dbe3ef;
      padding: 10px;
      font-size: 14px;
    }

    th {
      width: 34%;
      background: #f4f8fa;
    }

    .notice {
      background: #eafff8;
      border: 1px solid #8df5df;
      padding: 14px;
      border-radius: 10px;
      margin: 18px 0;
    }

    .signatureBox {
      border: 2px solid #071733;
      padding: 16px;
      margin-top: 28px;
      border-radius: 12px;
      background: #fbfdfe;
    }

    .small {
      color: #40516b;
      font-size: 13px;
    }

    @media print {
      body {
        padding: 18px;
      }

      .noPrint {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <h1>${escapeHtml(title)}</h1>
    <p class="small">Generated from West Midlands Cleaner admin records on ${escapeHtml(getTodayForDocument())}</p>

    <div class="notice">
      <strong>Important:</strong> This document is generated from the cleaner partner online onboarding application record.
      It records the typed electronic signature, acceptance confirmations, application details and uploaded document references.
    </div>

    <table>
      <tr><th>Cleaner</th><td>${escapeHtml(cleanerName)}</td></tr>
      <tr><th>Email</th><td>${escapeHtml(display(application.email))}</td></tr>
      <tr><th>Phone</th><td>${escapeHtml(display(application.phone))}</td></tr>
      <tr><th>Application reference</th><td>${escapeHtml(display(application.id))}</td></tr>
      <tr><th>Application status</th><td>${escapeHtml(statusLabel(application.application_status))}</td></tr>
      <tr><th>Signed name</th><td>${escapeHtml(signedName)}</td></tr>
      <tr><th>Submitted at</th><td>${escapeHtml(submittedAt)}</td></tr>
    </table>

    ${children}

    <div class="signatureBox">
      <h2>Electronic signature record</h2>
      <p><strong>Typed signature:</strong> ${escapeHtml(signedName)}</p>
      <p><strong>Submitted at:</strong> ${escapeHtml(submittedAt)}</p>
      <p><strong>Cleaner Partner Agreement accepted:</strong> ${escapeHtml(
        getAdminNoteValue(application.admin_notes, "Cleaner Partner Agreement accepted")
      )}</p>
      <p><strong>Standards & Data Agreement accepted:</strong> ${escapeHtml(
        getAdminNoteValue(application.admin_notes, "Standards & Data Agreement accepted")
      )}</p>
      <p><strong>Self-employed confirmation:</strong> ${escapeHtml(
        getAdminNoteValue(application.admin_notes, "Self-employed confirmation")
      )}</p>
      <p><strong>No employment confirmation:</strong> ${escapeHtml(
        getAdminNoteValue(application.admin_notes, "No employment confirmation")
      )}</p>
      <p><strong>No guaranteed work confirmation:</strong> ${escapeHtml(
        getAdminNoteValue(application.admin_notes, "No guaranteed work confirmation")
      )}</p>
      <p><strong>Can accept/reject bookings confirmation:</strong> ${escapeHtml(
        getAdminNoteValue(application.admin_notes, "Can accept/reject bookings confirmation")
      )}</p>
    </div>

    <p class="small" style="margin-top: 28px;">
      West Midlands Cleaner / WMC. This record should be kept with the cleaner partner uploaded documents,
      UTR evidence, insurance evidence and application review notes.
    </p>

    <div class="noPrint" style="margin-top: 22px;">
      <button onclick="window.print()" style="padding: 12px 18px; font-weight: bold; cursor: pointer;">
        Print or save as PDF
      </button>
    </div>
  </div>
</body>
</html>`;
}

function buildSignedCleanerAgreementHtml(application) {
  return documentShell({
    title: "Signed Cleaner Partner Agreement Evidence",
    application,
    children: `
      <h2>Cleaner Partner Agreement summary</h2>
      <p>
        The cleaner partner confirmed online that they are applying as a self-employed independent contractor
        and that they understand this is not employment with West Midlands Cleaner.
      </p>

      <table>
        <tr><th>Self-employed confirmation</th><td>${escapeHtml(application.is_self_employed ? "Yes" : "No")}</td></tr>
        <tr><th>Understands not employment</th><td>${escapeHtml(application.understands_no_employment ? "Yes" : "No")}</td></tr>
        <tr><th>Understands no guaranteed work</th><td>${escapeHtml(application.understands_no_guaranteed_work ? "Yes" : "No")}</td></tr>
        <tr><th>UTR number</th><td>${escapeHtml(display(application.utr_number))}</td></tr>
        <tr><th>National Insurance number</th><td>${escapeHtml(display(application.national_insurance_number))}</td></tr>
        <tr><th>Own transport</th><td>${escapeHtml(application.has_own_transport ? "Yes" : "No")}</td></tr>
        <tr><th>Own products/equipment</th><td>${escapeHtml(application.has_own_products_equipment ? "Yes" : "No")}</td></tr>
      </table>

      <h2>Key terms confirmed</h2>
      <p>
        The cleaner partner confirmed that they are responsible for their own tax, National Insurance,
        UTR/self-employment matters, public liability insurance, and that WMC does not guarantee work,
        wages or hours.
      </p>
    `
  });
}

function buildSignedStandardsAgreementHtml(application) {
  return documentShell({
    title: "Signed Standards and Data Agreement Evidence",
    application,
    children: `
      <h2>Standards and data agreement summary</h2>
      <p>
        The cleaner partner confirmed online that they accepted WMC standards, customer confidentiality,
        data handling expectations and conduct requirements before being considered for bookings.
      </p>

      <table>
        <tr><th>Consent to store details</th><td>${escapeHtml(application.consent_to_store_details ? "Yes" : "No")}</td></tr>
        <tr><th>Consent to be contacted</th><td>${escapeHtml(application.consent_to_be_contacted ? "Yes" : "No")}</td></tr>
        <tr><th>Eligible to work in the UK</th><td>${escapeHtml(application.eligible_to_work_uk ? "Yes" : "No")}</td></tr>
        <tr><th>Right-to-work / eligibility note</th><td>${escapeHtml(display(application.right_to_work_share_code))}</td></tr>
        <tr><th>Public liability insurance</th><td>${escapeHtml(application.has_public_liability_insurance ? "Yes" : "No")}</td></tr>
        <tr><th>Insurance provider</th><td>${escapeHtml(display(application.insurance_provider))}</td></tr>
        <tr><th>Insurance policy number</th><td>${escapeHtml(display(application.insurance_policy_number))}</td></tr>
        <tr><th>Insurance expiry date</th><td>${escapeHtml(display(application.insurance_expiry_date))}</td></tr>
      </table>

      <h2>Key standards confirmed</h2>
      <p>
        The cleaner partner accepted customer confidentiality, professional conduct, safe working,
        reporting issues or damage, and only attending bookings after WMC approval/confirmation.
      </p>
    `
  });
}

function buildOnboardingEvidenceHtml(application) {
  return documentShell({
    title: "Cleaner Onboarding Evidence",
    application,
    children: `
      <h2>Cleaner application details</h2>
      <table>
        <tr><th>Full name</th><td>${escapeHtml(display(application.full_name))}</td></tr>
        <tr><th>Business name</th><td>${escapeHtml(display(application.business_name))}</td></tr>
        <tr><th>Date of birth</th><td>${escapeHtml(display(application.date_of_birth))}</td></tr>
        <tr><th>Address</th><td>${escapeHtml(display(application.address))}</td></tr>
        <tr><th>Postcode</th><td>${escapeHtml(display(application.postcode))}</td></tr>
        <tr><th>Base area</th><td>${escapeHtml(display(application.base_area))}</td></tr>
        <tr><th>Areas covered</th><td>${escapeHtml(display(application.areas_covered))}</td></tr>
        <tr><th>Services offered</th><td>${escapeHtml(display(application.services_offered))}</td></tr>
        <tr><th>Availability</th><td>${escapeHtml(display(application.availability))}</td></tr>
        <tr><th>Experience</th><td>${escapeHtml(display(application.experience))}</td></tr>
        <tr><th>Next of kin</th><td>${escapeHtml(display(application.next_of_kin_name))}</td></tr>
        <tr><th>Next of kin phone</th><td>${escapeHtml(display(application.next_of_kin_phone))}</td></tr>
      </table>

      <h2>Uploaded document references</h2>
      <table>
        <tr><th>Photo ID path</th><td>${escapeHtml(display(application.id_document_path))}</td></tr>
        <tr><th>Proof of address path</th><td>${escapeHtml(display(application.extra_document_path))}</td></tr>
        <tr><th>Right-to-work / eligibility path</th><td>${escapeHtml(display(application.right_to_work_document_path))}</td></tr>
        <tr><th>Insurance certificate path</th><td>${escapeHtml(display(application.insurance_document_path))}</td></tr>
      </table>

      <h2>Admin notes</h2>
      <pre style="white-space: pre-wrap; background:#f8fafc; border:1px solid #dbe3ef; padding:14px; border-radius:10px;">${escapeHtml(application.admin_notes || "No admin notes recorded.")}</pre>
    `
  });
}

function buildFullEvidencePackHtml(application) {
  return documentShell({
    title: "Full Cleaner Partner Evidence Pack",
    application,
    children: `
      <h2>Evidence pack contents</h2>
      <p>This pack combines the cleaner partner application, online agreement acceptance, electronic signature evidence, self-employed confirmations and document references.</p>

      <h2>Cleaner details</h2>
      <table>
        <tr><th>Full name</th><td>${escapeHtml(display(application.full_name))}</td></tr>
        <tr><th>Business name</th><td>${escapeHtml(display(application.business_name))}</td></tr>
        <tr><th>Email</th><td>${escapeHtml(display(application.email))}</td></tr>
        <tr><th>Phone</th><td>${escapeHtml(display(application.phone))}</td></tr>
        <tr><th>Date of birth</th><td>${escapeHtml(display(application.date_of_birth))}</td></tr>
        <tr><th>Address</th><td>${escapeHtml(display(application.address))}</td></tr>
        <tr><th>Postcode</th><td>${escapeHtml(display(application.postcode))}</td></tr>
        <tr><th>UTR number</th><td>${escapeHtml(display(application.utr_number))}</td></tr>
        <tr><th>National Insurance number</th><td>${escapeHtml(display(application.national_insurance_number))}</td></tr>
      </table>

      <h2>Work details</h2>
      <table>
        <tr><th>Base area</th><td>${escapeHtml(display(application.base_area))}</td></tr>
        <tr><th>Areas covered</th><td>${escapeHtml(display(application.areas_covered))}</td></tr>
        <tr><th>Services offered</th><td>${escapeHtml(display(application.services_offered))}</td></tr>
        <tr><th>Availability</th><td>${escapeHtml(display(application.availability))}</td></tr>
        <tr><th>Experience</th><td>${escapeHtml(display(application.experience))}</td></tr>
      </table>

      <h2>Insurance and eligibility</h2>
      <table>
        <tr><th>Eligible to work in the UK</th><td>${escapeHtml(application.eligible_to_work_uk ? "Yes" : "No")}</td></tr>
        <tr><th>Right-to-work note</th><td>${escapeHtml(display(application.right_to_work_share_code))}</td></tr>
        <tr><th>Public liability insurance</th><td>${escapeHtml(application.has_public_liability_insurance ? "Yes" : "No")}</td></tr>
        <tr><th>Insurance provider</th><td>${escapeHtml(display(application.insurance_provider))}</td></tr>
        <tr><th>Insurance policy number</th><td>${escapeHtml(display(application.insurance_policy_number))}</td></tr>
        <tr><th>Insurance expiry date</th><td>${escapeHtml(display(application.insurance_expiry_date))}</td></tr>
      </table>

      <h2>Uploaded document references</h2>
      <table>
        <tr><th>Photo ID path</th><td>${escapeHtml(display(application.id_document_path))}</td></tr>
        <tr><th>Proof of address path</th><td>${escapeHtml(display(application.extra_document_path))}</td></tr>
        <tr><th>Right-to-work / eligibility path</th><td>${escapeHtml(display(application.right_to_work_document_path))}</td></tr>
        <tr><th>Insurance certificate path</th><td>${escapeHtml(display(application.insurance_document_path))}</td></tr>
      </table>

      <h2>Admin notes</h2>
      <pre style="white-space: pre-wrap; background:#f8fafc; border:1px solid #dbe3ef; padding:14px; border-radius:10px;">${escapeHtml(application.admin_notes || "No admin notes recorded.")}</pre>
    `
  });
}

function saveCleanerEvidenceAsPdf(application, documentType) {
  const cleanerName = safeFileName(application.full_name);

  if (documentType === "agreement") {
    openPdfSaveWindow(
      `${cleanerName}-signed-cleaner-partner-agreement.pdf`,
      buildSignedCleanerAgreementHtml(application)
    );
    return;
  }

  if (documentType === "standards") {
    openPdfSaveWindow(
      `${cleanerName}-signed-standards-data-agreement.pdf`,
      buildSignedStandardsAgreementHtml(application)
    );
    return;
  }

  if (documentType === "onboarding") {
    openPdfSaveWindow(
      `${cleanerName}-cleaner-onboarding-evidence.pdf`,
      buildOnboardingEvidenceHtml(application)
    );
    return;
  }

  openPdfSaveWindow(
    `${cleanerName}-full-cleaner-evidence-pack.pdf`,
    buildFullEvidencePackHtml(application)
  );
}

export default function AdminCleanerApplicationsPage() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState("");
  const [stripeLoadingId, setStripeLoadingId] = useState("");
  const [stripeRefreshingId, setStripeRefreshingId] = useState("");
  const [stripeStatuses, setStripeStatuses] = useState({});
  const [stripeMessages, setStripeMessages] = useState({});
  const [stripeLinks, setStripeLinks] = useState({});
  const [onboardingPackLoadingId, setOnboardingPackLoadingId] = useState("");
  const [onboardingPackMessages, setOnboardingPackMessages] = useState({});
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");

  function setStripeMessage(applicationId, text) {
    setStripeMessages((current) => ({
      ...current,
      [applicationId]: text
    }));
  }

  function setStripeLink(applicationId, url) {
    setStripeLinks((current) => ({
      ...current,
      [applicationId]: url
    }));
  }

  function setOnboardingPackMessage(applicationId, text) {
    setOnboardingPackMessages((current) => ({
      ...current,
      [applicationId]: text
    }));
  }

  async function loadApplications(event) {
    if (event) {
      event.preventDefault();
    }

    setLoading(true);
    setMessage("");
    setStripeMessages({});
    setStripeLinks({});
    setOnboardingPackMessages({});

    try {
      const response = await fetch("/api/admin/cleaner-applications", {
        method: "GET",
        headers: {
          "x-admin-password": password
        }
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setIsUnlocked(false);
        setMessage(data?.error || data?.message || "Could not load cleaner applications.");
        setLoading(false);
        return;
      }

      setApplications(data.applications || []);
      setIsUnlocked(true);
      setMessage(`Loaded ${data.applications?.length || 0} cleaner application(s).`);
    } catch (error) {
      setMessage(error?.message || "Could not load cleaner applications.");
    } finally {
      setLoading(false);
    }
  }

  function updateLocalApplication(id, updates) {
    setApplications((current) =>
      current.map((application) =>
        application.id === id
          ? {
              ...application,
              ...updates
            }
          : application
      )
    );
  }

  async function saveApplication(application) {
    setSavingId(application.id);
    setMessage("");
    setStripeMessage(application.id, "");
    setStripeLink(application.id, "");

    try {
      const response = await fetch("/api/admin/cleaner-applications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password
        },
        body: JSON.stringify({
          id: application.id,
          applicationStatus: application.application_status,
          adminNotes: application.admin_notes || ""
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setMessage(data?.error || data?.message || "Could not save application.");
        setSavingId("");
        return;
      }

      setApplications((current) =>
        current.map((item) => (item.id === data.application.id ? data.application : item))
      );

      if (data.cleanerPartnerAction) {
        setMessage(`Application updated. Cleaner partner ${data.cleanerPartnerAction}.`);
      } else {
        setMessage("Cleaner application updated.");
      }
    } catch (error) {
      setMessage(error?.message || "Could not save application.");
    } finally {
      setSavingId("");
    }
  }

  async function sendCleanerOnboardingPack(application) {
    setOnboardingPackLoadingId(application.id);
    setOnboardingPackMessage(application.id, "");
    setMessage("");

    if (application.application_status !== "approved") {
      setOnboardingPackMessage(
        application.id,
        "This cleaner must be saved as Approved before sending the onboarding pack. Select Approved, click Save application, then try again."
      );
      setOnboardingPackLoadingId("");
      return;
    }

    try {
      const response = await fetch("/api/admin/send-cleaner-onboarding-pack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password
        },
        body: JSON.stringify({
          applicationId: application.id
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setOnboardingPackMessage(
          application.id,
          data?.error || data?.message || "Could not send cleaner onboarding pack email."
        );
        setOnboardingPackLoadingId("");
        return;
      }

      setOnboardingPackMessage(
        application.id,
        "Cleaner onboarding pack email sent. Ask the cleaner to read, sign once at the end, save as PDF and email it back to info@westmidlandscleaner.co.uk."
      );

      setMessage("Cleaner onboarding pack email sent.");
    } catch (error) {
      setOnboardingPackMessage(
        application.id,
        error?.message || "Could not send cleaner onboarding pack email."
      );
    } finally {
      setOnboardingPackLoadingId("");
    }
  }

  async function createStripeOnboardingLink(application) {
    setStripeLoadingId(application.id);
    setMessage("");
    setStripeMessage(application.id, "Creating Stripe onboarding link...");
    setStripeLink(application.id, "");

    if (application.application_status !== "approved") {
      setStripeMessage(
        application.id,
        "This cleaner must be saved as Approved before creating a Stripe onboarding link. Select Approved, click Save application, then try again."
      );
      setStripeLoadingId("");
      return;
    }

    try {
      const response = await fetch("/api/admin/cleaner-stripe-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password
        },
        body: JSON.stringify({
          applicationId: application.id
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStripeMessage(
          application.id,
          data?.error ||
            data?.message ||
            `Could not create Stripe onboarding link. Server status: ${response.status}`
        );
        setStripeLoadingId("");
        return;
      }

      const onboardingUrl =
        data?.onboardingUrl ||
        data?.onboarding_url ||
        data?.url ||
        data?.accountLinkUrl ||
        data?.account_link_url ||
        "";

      if (!onboardingUrl) {
        setStripeMessage(
          application.id,
          "Stripe responded, but no onboarding link was returned. Check app/api/admin/cleaner-stripe-onboarding/route.js and your Stripe environment variables."
        );
        setStripeLoadingId("");
        return;
      }

      setStripeLink(application.id, onboardingUrl);
      setStripeMessage(
        application.id,
        "Stripe onboarding link created. Use the button below to open Stripe, or copy the link and send it to the cleaner."
      );
    } catch (error) {
      setStripeMessage(application.id, error?.message || "Could not create Stripe onboarding link.");
    } finally {
      setStripeLoadingId("");
    }
  }

  async function refreshStripeStatus(application) {
    setStripeRefreshingId(application.id);
    setMessage("");
    setStripeMessage(application.id, "Refreshing Stripe status...");

    try {
      const response = await fetch("/api/admin/cleaner-stripe-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password
        },
        body: JSON.stringify({
          applicationId: application.id
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStripeMessage(
          application.id,
          data?.error || data?.message || "Could not refresh Stripe status."
        );
        setStripeRefreshingId("");
        return;
      }

      setStripeStatuses((current) => ({
        ...current,
        [application.id]: data.stripeStatus
      }));

      setStripeMessage(
        application.id,
        `Stripe status refreshed: ${stripeStatusLabel(data.stripeStatus?.onboardingStatus)}.`
      );
    } catch (error) {
      setStripeMessage(application.id, error?.message || "Could not refresh Stripe status.");
    } finally {
      setStripeRefreshingId("");
    }
  }

  const filteredApplications = useMemo(() => {
    if (filter === "all") {
      return applications;
    }

    return applications.filter((application) => application.application_status === filter);
  }, [applications, filter]);

  const counts = useMemo(() => {
    return applications.reduce(
      (accumulator, application) => {
        accumulator.all += 1;
        accumulator[application.application_status] =
          (accumulator[application.application_status] || 0) + 1;
        return accumulator;
      },
      {
        all: 0
      }
    );
  }, [applications]);

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">WMC admin</p>
          <h1>Cleaner applications.</h1>
          <p className="lead">
            Review self-employed cleaner partner applications, check insurance details, open
            uploaded documents, approve cleaner partners and manage Stripe payout onboarding.
          </p>
        </div>

        <div className="notice" style={{ marginBottom: 24 }}>
          This page is for WMC admin use only. Documents are private and document links expire.
        </div>

        <section className="card formCard" style={{ marginBottom: 26 }}>
          <h2>Admin access</h2>

          <form onSubmit={loadApplications} className="formGrid">
            <label className="field">
              <span>Admin password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
              />
            </label>

            <div className="field">
              <span>&nbsp;</span>
              <button type="submit" className="btn btnPrimary" disabled={loading}>
                {loading ? "Loading applications..." : "Load cleaner applications"}
              </button>
            </div>
          </form>

          {message && (
            <div className="notice" style={{ marginTop: 18 }}>
              {message}
            </div>
          )}
        </section>



        <div className="guideBox" style={{ marginBottom: 18 }}>
          <p className="kicker">Admin shortcuts</p>
          <h2>Everything in one place</h2>
          <div className="actionRow">
            <a href="/admin/marketplace" className="btn btnPrimary">Marketplace dashboard</a>
            <a href="/admin/cleaner-applications" className="btn btnSecondary">Cleaner applications</a>
            <a href="/admin/cleaner-payouts" className="btn btnSecondary">Cleaner payouts</a>
            <a href="/admin/business-partners" className="btn btnSecondary">Business partners</a>
            <a href="/admin/business-payouts" className="btn btnSecondary">Business payouts</a>
            <a href="/cleaner/jobs" className="btn btnSecondary">Cleaner available jobs</a>
            <a href="/cleaner/my-jobs" className="btn btnSecondary">Cleaner assigned jobs</a>
            <a href="/business/jobs" className="btn btnSecondary">Business available jobs</a>
            <a href="/business/my-jobs" className="btn btnSecondary">Business assigned jobs</a>
          </div>
        </div>

        {isUnlocked && (
          <>
            <section className="card sideCard" style={{ marginBottom: 26 }}>
              <p className="kicker">Application filters</p>
              <h2>Review queue.</h2>

              <div className="actionRow">
                <button
                  type="button"
                  className={filter === "all" ? "btn btnPrimary" : "btn btnSecondary"}
                  onClick={() => setFilter("all")}
                >
                  All ({counts.all || 0})
                </button>

                {statusOptions.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    className={filter === option.value ? "btn btnPrimary" : "btn btnSecondary"}
                    onClick={() => setFilter(option.value)}
                  >
                    {option.label} ({counts[option.value] || 0})
                  </button>
                ))}
              </div>
            </section>

            {filteredApplications.length === 0 ? (
              <section className="card formCard">
                <h2>No applications found.</h2>
                <p>No cleaner applications match this filter.</p>
              </section>
            ) : (
              <section className="adminApplicationGrid">
                {filteredApplications.map((application) => {
                  const stripeStatus = stripeStatuses[application.id];
                  const stripeMessage = stripeMessages[application.id];
                  const stripeLink = stripeLinks[application.id];

                  return (
                    <article key={application.id} className="card formCard adminApplicationCard">
                      <div className="applicationHeader">
                        <div>
                          <p className="kicker">{formatDate(application.created_at)}</p>
                          <h2>{display(application.full_name)}</h2>
                          <p>
                            {display(application.business_name)} · {display(application.base_area)}
                          </p>
                        </div>

                        <span className={`statusPill ${statusClass(application.application_status)}`}>
                          {statusLabel(application.application_status)}
                        </span>
                      </div>

                      <div className="notice" style={{ marginBottom: 18 }}>
                        <strong>Contact:</strong> {display(application.phone)} ·{" "}
                        {display(application.email)}
                        <br />
                        <strong>Postcode:</strong> {display(application.postcode)}
                      </div>

                      <div className="adminDetailsGrid">
                        <div className="guideBox">
                          <strong>Areas covered</strong>
                          <br />
                          {display(application.areas_covered)}
                        </div>

                        <div className="guideBox">
                          <strong>Services offered</strong>
                          <br />
                          {display(application.services_offered)}
                        </div>

                        <div className="guideBox">
                          <strong>Availability</strong>
                          <br />
                          {display(application.availability)}
                        </div>

                        <div className="guideBox">
                          <strong>Experience</strong>
                          <br />
                          {display(application.experience)}
                        </div>

                        <div className="guideBox">
                          <strong>UTR number</strong>
                          <br />
                          {display(application.utr_number)}
                        </div>

                        <div className="guideBox">
                          <strong>National Insurance number</strong>
                          <br />
                          {display(application.national_insurance_number)}
                        </div>

                        <div className="guideBox">
                          <strong>Right-to-work / eligibility note</strong>
                          <br />
                          {display(application.right_to_work_share_code)}
                        </div>

                        <div className="guideBox">
                          <strong>Insurance provider</strong>
                          <br />
                          {display(application.insurance_provider)}
                        </div>

                        <div className="guideBox">
                          <strong>Insurance policy number</strong>
                          <br />
                          {display(application.insurance_policy_number)}
                        </div>

                        <div className="guideBox">
                          <strong>Insurance expiry date</strong>
                          <br />
                          {display(application.insurance_expiry_date)}
                        </div>

                        <div className="guideBox">
                          <strong>Own transport</strong>
                          <br />
                          {application.has_own_transport ? "Yes" : "No"}
                        </div>

                        <div className="guideBox">
                          <strong>Own products/equipment</strong>
                          <br />
                          {application.has_own_products_equipment ? "Yes" : "No"}
                        </div>

                        <div className="guideBox">
                          <strong>Eligible to work in UK</strong>
                          <br />
                          {application.eligible_to_work_uk ? "Yes" : "No"}
                        </div>
                      </div>

                      <div className="warningBox" style={{ marginTop: 18 }}>
                        <strong>Confirmations:</strong>
                        <br />
                        Self-employed: {application.is_self_employed ? "Yes" : "No"}
                        <br />
                        Understands not employment:{" "}
                        {application.understands_no_employment ? "Yes" : "No"}
                        <br />
                        Understands no guaranteed work:{" "}
                        {application.understands_no_guaranteed_work ? "Yes" : "No"}
                        <br />
                        Has public liability insurance:{" "}
                        {application.has_public_liability_insurance ? "Yes" : "No"}
                        <br />
                        Consent to store details:{" "}
                        {application.consent_to_store_details ? "Yes" : "No"}
                        <br />
                        Consent to be contacted:{" "}
                        {application.consent_to_be_contacted ? "Yes" : "No"}
                      </div>

                      <div className="card miniCard" style={{ marginTop: 18 }}>
                        <h3>Signed onboarding evidence</h3>

                        <div className="notice" style={{ marginBottom: 14 }}>
                          <strong>Electronic signature proof</strong>
                          <br />
                          Signed name: {getAdminNoteValue(application.admin_notes, "Signed name")}
                          <br />
                          Submitted at: {getAdminNoteValue(application.admin_notes, "Submitted at")}
                          <br />
                          Cleaner Partner Agreement accepted:{" "}
                          {getAdminNoteValue(
                            application.admin_notes,
                            "Cleaner Partner Agreement accepted"
                          )}
                          <br />
                          Standards & Data Agreement accepted:{" "}
                          {getAdminNoteValue(
                            application.admin_notes,
                            "Standards & Data Agreement accepted"
                          )}
                        </div>

                        <div className="actionRow" style={{ marginTop: 14 }}>
                          <button
                            type="button"
                            className="btn btnPrimary"
                            onClick={() => saveCleanerEvidenceAsPdf(application, "full")}
                          >
                            Save full evidence pack as PDF
                          </button>

                          <button
                            type="button"
                            className="btn btnSecondary"
                            onClick={() => saveCleanerEvidenceAsPdf(application, "agreement")}
                          >
                            Save signed agreement as PDF
                          </button>

                          <button
                            type="button"
                            className="btn btnSecondary"
                            onClick={() => saveCleanerEvidenceAsPdf(application, "standards")}
                          >
                            Save standards agreement as PDF
                          </button>

                          <button
                            type="button"
                            className="btn btnSecondary"
                            onClick={() => saveCleanerEvidenceAsPdf(application, "onboarding")}
                          >
                            Save onboarding evidence as PDF
                          </button>

                          <button
                            type="button"
                            className="btn btnSecondary"
                            onClick={() =>
                              navigator.clipboard.writeText(buildEvidenceSummary(application))
                            }
                          >
                            Copy evidence summary
                          </button>
                        </div>

                        <p style={{ marginTop: 12 }}>
                          The cleaner signed online using checkbox confirmations and a typed full legal name.
                          These buttons open your browser print screen from the saved application record.
                          Choose “Save as PDF” in the print screen to keep a PDF copy.
                        </p>
                      </div>

                      <div className="card miniCard" style={{ marginTop: 18 }}>
                        <h3>Uploaded documents</h3>

                        <div className="actionRow">
                          {application.document_urls?.insurance_document_url ? (
                            <a
                              href={application.document_urls.insurance_document_url}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btnSecondary"
                            >
                              Open insurance proof
                            </a>
                          ) : (
                            <span className="statusPill warningPill">No insurance file</span>
                          )}

                          {application.document_urls?.right_to_work_document_url ? (
                            <a
                              href={application.document_urls.right_to_work_document_url}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btnSecondary"
                            >
                              Open right-to-work proof
                            </a>
                          ) : (
                            <span className="statusPill neutralPill">No right-to-work file</span>
                          )}

                          {application.document_urls?.id_document_url ? (
                            <a
                              href={application.document_urls.id_document_url}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btnSecondary"
                            >
                              Open ID document
                            </a>
                          ) : (
                            <span className="statusPill neutralPill">No ID file</span>
                          )}

                          {application.document_urls?.extra_document_url ? (
                            <a
                              href={application.document_urls.extra_document_url}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btnSecondary"
                            >
                              Open proof of address
                            </a>
                          ) : (
                            <span className="statusPill neutralPill">No proof of address file</span>
                          )}
                        </div>

                        <p style={{ marginTop: 12 }}>
                          Document links are private signed links and may expire after 7 days. The proof of
                          address upload is shown as “proof of address”.
                        </p>
                      </div>

                      <div className="card miniCard" style={{ marginTop: 18 }}>
                        <h3>Cleaner onboarding pack</h3>
                        <p>
                          After you approve and save this cleaner application, send the WMC
                          Self-Employed Cleaner Partner Onboarding Pack. The cleaner must read it,
                          sign once at the end, save it as a PDF and email it back to WMC.
                        </p>

                        {application.application_status === "approved" ? (
                          <div className="actionRow">
                            <button
                              type="button"
                              className="btn btnPrimary"
                              onClick={() => sendCleanerOnboardingPack(application)}
                              disabled={onboardingPackLoadingId === application.id}
                            >
                              {onboardingPackLoadingId === application.id
                                ? "Sending pack..."
                                : "Send onboarding pack"}
                            </button>

                            <a
                              href="/documents/wmc-self-employed-cleaner-partner-onboarding-pack.html"
                              className="btn btnSecondary"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Preview pack
                            </a>
                          </div>
                        ) : (
                          <div className="warningBox">
                            Save this cleaner application as Approved before sending the onboarding
                            pack.
                          </div>
                        )}

                        {onboardingPackMessages[application.id] && (
                          <div className="notice" style={{ marginTop: 12 }}>
                            {onboardingPackMessages[application.id]}
                          </div>
                        )}
                      </div>

                      <div className="card miniCard" style={{ marginTop: 18 }}>
                        <h3>Stripe cleaner payout setup</h3>
                        <p>
                          After a cleaner partner is approved, start Stripe Express onboarding so Stripe can
                          collect their payout and verification details securely.
                        </p>

                        {stripeStatus && (
                          <div className="notice" style={{ marginTop: 14, marginBottom: 14 }}>
                            <strong>Stripe account:</strong> {stripeStatus.accountId}
                            <br />
                            <strong>Onboarding status:</strong>{" "}
                            <span
                              className={`statusPill ${stripeStatusClass(
                                stripeStatus.onboardingStatus
                              )}`}
                              style={{ marginLeft: 8 }}
                            >
                              {stripeStatusLabel(stripeStatus.onboardingStatus)}
                            </span>
                            <br />
                            <strong>Payouts enabled:</strong>{" "}
                            {stripeStatus.payoutsEnabled ? "Yes" : "No"}
                            <br />
                            <strong>Details submitted:</strong>{" "}
                            {stripeStatus.detailsSubmitted ? "Yes" : "No"}
                            {stripeStatus.disabledReason && (
                              <>
                                <br />
                                <strong>Disabled reason:</strong> {stripeStatus.disabledReason}
                              </>
                            )}
                            {stripeStatus.currentlyDue?.length > 0 && (
                              <>
                                <br />
                                <strong>Currently due:</strong>{" "}
                                {stripeStatus.currentlyDue.join(", ")}
                              </>
                            )}
                          </div>
                        )}

                        {application.application_status === "approved" ? (
                          <div className="actionRow">
                            <button
                              type="button"
                              className="btn btnPrimary"
                              onClick={() => createStripeOnboardingLink(application)}
                              disabled={stripeLoadingId === application.id}
                            >
                              {stripeLoadingId === application.id
                                ? "Creating Stripe link..."
                                : "Create Stripe onboarding link"}
                            </button>

                            <button
                              type="button"
                              className="btn btnSecondary"
                              onClick={() => refreshStripeStatus(application)}
                              disabled={stripeRefreshingId === application.id}
                            >
                              {stripeRefreshingId === application.id
                                ? "Refreshing Stripe..."
                                : "Refresh Stripe status"}
                            </button>
                          </div>
                        ) : (
                          <div className="notice">
                            Approve and save this cleaner application before starting Stripe onboarding.
                          </div>
                        )}

                        {stripeMessage && (
                          <div className="notice" style={{ marginTop: 14 }}>
                            {stripeMessage}
                          </div>
                        )}

                        {stripeLink && (
                          <div className="guideBox" style={{ marginTop: 14 }}>
                            <strong>Stripe onboarding link created:</strong>
                            <br />
                            <a href={stripeLink} target="_blank" rel="noreferrer">
                              Open Stripe onboarding
                            </a>

                            <div className="actionRow">
                              <button
                                type="button"
                                className="btn btnPrimary"
                                onClick={() => window.location.assign(stripeLink)}
                              >
                                Open Stripe now
                              </button>

                              <button
                                type="button"
                                className="btn btnSecondary"
                                onClick={() => navigator.clipboard.writeText(stripeLink)}
                              >
                                Copy Stripe link
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="formGrid" style={{ marginTop: 18 }}>
                        <label className="field">
                          <span>Application status</span>
                          <select
                            value={application.application_status}
                            onChange={(event) =>
                              updateLocalApplication(application.id, {
                                application_status: event.target.value
                              })
                            }
                          >
                            {statusOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="field">
                          <span>Admin notes</span>
                          <textarea
                            value={application.admin_notes || ""}
                            onChange={(event) =>
                              updateLocalApplication(application.id, {
                                admin_notes: event.target.value
                              })
                            }
                            placeholder="Private notes for WMC only"
                          />
                        </label>
                      </div>

                      <div className="actionRow">
                        <button
                          type="button"
                          className="btn btnPrimary"
                          onClick={() => saveApplication(application)}
                          disabled={savingId === application.id}
                        >
                          {savingId === application.id ? "Saving..." : "Save application"}
                        </button>

                        <button
                          type="button"
                          className="btn btnSecondary"
                          onClick={() =>
                            updateLocalApplication(application.id, {
                              application_status: "under_review"
                            })
                          }
                        >
                          Mark under review
                        </button>

                        <button
                          type="button"
                          className="btn btnSecondary"
                          onClick={() =>
                            updateLocalApplication(application.id, {
                              application_status: "more_info_needed"
                            })
                          }
                        >
                          Request more info
                        </button>

                        <button
                          type="button"
                          className="btn btnSecondary"
                          onClick={() =>
                            updateLocalApplication(application.id, {
                              application_status: "approved"
                            })
                          }
                        >
                          Mark approved
                        </button>

                        <button
                          type="button"
                          className="btn btnSecondary"
                          onClick={() =>
                            updateLocalApplication(application.id, {
                              application_status: "rejected"
                            })
                          }
                        >
                          Mark rejected
                        </button>
                      </div>
                    </article>
                  );
                })}
              </section>
            )}
          </>
        )}
      </section>
    </main>
  );
}
