"use client";

import React, { useMemo, useRef, useState } from "react";

const areaOptions = [
  "Birmingham",
  "Walsall",
  "Wolverhampton",
  "Dudley",
  "Sandwell",
  "Solihull",
  "Sutton Coldfield",
  "West Bromwich",
  "Oldbury",
  "Smethwick",
  "Tipton",
  "Bilston",
  "Willenhall",
  "Brownhills",
  "Aldridge",
  "Great Barr",
  "Cannock",
  "Burntwood",
  "Lichfield",
  "Other West Midlands areas"
];

const serviceOptions = [
  "Regular domestic cleaning",
  "One-off house cleaning",
  "Deep cleaning",
  "End-of-tenancy cleaning",
  "Move-out cleaning",
  "Pre-move cleaning",
  "Airbnb / changeover cleaning",
  "Landlord / property cleaning",
  "After-builders cleaning",
  "Office / commercial cleaning"
];

const agreementSections = [
  {
    title: "Cleaner Partner Agreement",
    points: [
      "I am applying as an independent self-employed cleaner partner, not as an employee, worker, agent or representative of WMC.",
      "WMC does not guarantee any work, hours, income, wages, shifts or booking opportunities.",
      "I may accept or reject booking offers made to me.",
      "I am responsible for my own tax, National Insurance, expenses, tools, equipment, insurance and business records.",
      "The cleaner fee for each booking will be agreed before I accept that booking.",
      "Payouts are normally released by WMC after a 48-hour issue window following job completion and approval, provided customer payment has been received and there is no unresolved complaint, refund issue, missing information or dispute. Once released, Stripe Express pays the provider bank according to its Stripe payout schedule.",
      "Payment is not made before the job is completed and approved by WMC.",
      "Travel costs, parking charges and clean air zone charges are not automatically covered unless WMC confirms this before the booking.",
      "If I accept or show interest in a booking by mistake, become unavailable, or may be late, I must tell WMC immediately.",
      "I must not attend a WMC booking unless WMC confirms that the customer booking is ready to proceed.",
      "Customers introduced through WMC remain WMC-introduced customers. I must not take WMC customers privately, request cash side-payments or encourage customers to avoid WMC.",
      "I must keep valid public liability insurance and tell WMC if my insurance, eligibility or contact details change.",
      "WMC may stop offering bookings if there are concerns about safety, trust, insurance, eligibility, conduct, customer data, complaints, no-shows or serious breach."
    ]
  },
  {
    title: "Cleaner Partner Standards & Data Agreement",
    points: [
      "I will attend accepted bookings on time and communicate promptly if delayed.",
      "I will treat customers, properties, keys, access details and possessions with care and respect.",
      "I will not smoke, vape, drink alcohol, use drugs or bring unauthorised people to customer properties.",
      "I will only contact customers where needed for the accepted booking and will not ask for private work or payments outside WMC.",
      "I will keep customer names, addresses, phone numbers, access notes, photos and booking details confidential.",
      "I will not post customer information, property details, photos or videos online.",
      "I will work safely, avoid mixing chemicals, use products correctly and stop work if a task or property feels unsafe.",
      "I will report damage, accidents, injuries, hazards, complaints, lost keys or access issues to WMC as soon as possible.",
      "I understand repeated late cancellations, no-shows, poor communication or accepting jobs I cannot attend may result in fewer booking opportunities, temporary suspension or removal from WMC."
    ]
  }
];

const utrStatusOptions = [
  { value: "", label: "Select UTR status" },
  { value: "have_utr", label: "I have a UTR number" },
  { value: "applied_waiting", label: "I have applied and I am waiting for it" },
  { value: "do_not_have", label: "I do not have one yet" },
  { value: "need_guidance", label: "I need guidance" }
];

const insuranceStatusOptions = [
  { value: "", label: "Select insurance status" },
  { value: "have_insurance", label: "I already have public liability insurance" },
  { value: "arranging", label: "I am arranging it" },
  { value: "do_not_have", label: "I do not have it yet" },
  { value: "need_guidance", label: "I need guidance" }
];

const initialForm = {
  fullName: "",
  businessName: "",
  dateOfBirth: "",
  utrStatus: "",
  utrNumber: "",
  nationalInsuranceNumber: "",
  phone: "",
  email: "",
  address: "",
  postcode: "",
  baseArea: "",
  nextOfKinName: "",
  nextOfKinRelationship: "",
  nextOfKinPhone: "",
  nextOfKinEmail: "",
  areas: [],
  services: [],
  availability: "",
  experience: "",
  hasOwnTransport: false,
  hasOwnProductsEquipment: false,
  insuranceStatus: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  insuranceCoverAmount: "",
  insuranceExpiryDate: "",
  eligibleToWorkUk: false,
  rightToWorkShareCode: "",
  acceptedCleanerAgreement: false,
  acceptedStandardsAgreement: false,
  isSelfEmployed: false,
  understandsNoEmployment: false,
  understandsNoGuaranteedWork: false,
  understandsCanAcceptReject: false,
  confirmsTruthfulInfo: false,
  consentsDocumentReview: false,
  consentToStoreDetails: false,
  consentToBeContacted: false,
  electronicSignature: ""
};

function joinSelected(values) {
  return values.length ? values.join(", ") : "";
}

function isValidUtr(value) {
  return /^\d{10}$/.test(String(value || "").replace(/\s+/g, ""));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function formatDateOfBirthInput(value) {
  const digits = String(value || "").replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function isValidDateOfBirth(value) {
  const match = String(value || "")
    .trim()
    .match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

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

function fieldLabel(name) {
  const labels = {
    fullName: "Full legal name",
    dateOfBirth: "Date of birth",
    phone: "Phone number",
    email: "Email address",
    postcode: "Postcode",
    baseArea: "Main working base area",
    utrStatus: "UTR status",
    utrNumber: "UTR number",
    areas: "Areas you can cover",
    services: "Services you can offer",
    availability: "Availability",
    experience: "Cleaning experience",
    insuranceStatus: "Public liability insurance status",
    insuranceProvider: "Insurance provider",
    insurancePolicyNumber: "Insurance policy number",
    insuranceExpiryDate: "Insurance expiry date",
    eligibleToWorkUk: "Eligible to work in the UK confirmation",
    acceptedCleanerAgreement: "Cleaner Partner Agreement acceptance",
    acceptedStandardsAgreement: "Standards & Data Agreement acceptance",
    isSelfEmployed: "Self-employed confirmation",
    understandsNoEmployment: "Non-employment confirmation",
    understandsNoGuaranteedWork: "No guaranteed work confirmation",
    understandsCanAcceptReject: "Accept/reject bookings confirmation",
    confirmsTruthfulInfo: "Truthful information confirmation",
    consentsDocumentReview: "Document review consent",
    consentToStoreDetails: "Data storage consent",
    consentToBeContacted: "Contact consent",
    electronicSignature: "Typed electronic signature"
  };

  return labels[name] || name;
}

function ErrorText({ message }) {
  if (!message) return null;

  return (
    <small className="wmcFieldErrorText" role="alert">
      {message}
    </small>
  );
}

function Field({ field, label, error, registerField, children, style }) {
  return (
    <label
      ref={(node) => registerField(field, node)}
      className={error ? "field wmcFieldError" : "field"}
      style={style}
    >
      {label && <span>{label}</span>}
      {children}
      <ErrorText message={error} />
    </label>
  );
}

function CheckboxField({ field, error, registerField, children }) {
  return (
    <label
      ref={(node) => registerField(field, node)}
      className={error ? "checkbox wmcFieldError" : "checkbox"}
    >
      {children}
      <ErrorText message={error} />
    </label>
  );
}

export default function CleanersPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationReference, setApplicationReference] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fieldRefs = useRef({});

  const areasCovered = useMemo(() => joinSelected(form.areas), [form.areas]);
  const servicesOffered = useMemo(() => joinSelected(form.services), [form.services]);

  function registerField(name, node) {
    if (node) fieldRefs.current[name] = node;
  }

  function clearFieldError(field) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function update(field, value) {
    setErrorMessage("");
    clearFieldError(field);
    setForm((current) => ({ ...current, [field]: value }));
  }


  function toggleArray(field, value) {
    setErrorMessage("");
    clearFieldError(field);

    setForm((current) => {
      const existing = current[field] || [];
      const next = existing.includes(value)
        ? existing.filter((item) => item !== value)
        : [...existing, value];

      return { ...current, [field]: next };
    });
  }

  function setStepAndScroll(step) {
    setCurrentStep(step);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 30);
  }

  function scrollToFirstError(errors) {
    const firstField = Object.keys(errors)[0];

    if (!firstField) return;

    window.setTimeout(() => {
      const node = fieldRefs.current[firstField];

      if (node?.scrollIntoView) {
        node.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = node.querySelector?.("input, select, textarea, button");
        input?.focus?.({ preventScroll: true });
        return;
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 80);
  }

  function addError(errors, field, message) {
    if (!errors[field]) errors[field] = message;
  }

  function validateStep(step) {
    const errors = {};

    if (step === 1) {
      if (!form.fullName.trim()) addError(errors, "fullName", "Full legal name is required.");

      if (!form.dateOfBirth.trim()) {
        addError(errors, "dateOfBirth", "Date of birth is required.");
      } else if (!isValidDateOfBirth(form.dateOfBirth)) {
        addError(errors, "dateOfBirth", "Please enter date of birth in DD/MM/YYYY format.");
      }

      if (!form.phone.trim()) addError(errors, "phone", "Phone number is required.");

      if (!form.email.trim()) {
        addError(errors, "email", "Email address is required.");
      } else if (!isValidEmail(form.email)) {
        addError(errors, "email", "Please enter a valid email address.");
      }

      if (!form.postcode.trim()) addError(errors, "postcode", "Postcode is required.");
      if (!form.baseArea.trim()) addError(errors, "baseArea", "Main working base area is required.");
      if (!form.utrStatus) addError(errors, "utrStatus", "Please select your UTR status.");

      if (form.utrStatus === "have_utr") {
        if (!form.utrNumber.trim()) {
          addError(errors, "utrNumber", "Please enter your 10-digit UTR number.");
        } else if (!isValidUtr(form.utrNumber)) {
          addError(errors, "utrNumber", "UTR must be a valid 10-digit number.");
        }
      }
    }

    if (step === 2) {
      if (!areasCovered) addError(errors, "areas", "Please select at least one area you can cover.");
      if (!servicesOffered) addError(errors, "services", "Please select at least one service you can offer.");
      if (!form.availability.trim()) addError(errors, "availability", "Please tell us your availability.");
      if (!form.experience.trim()) addError(errors, "experience", "Please tell us about your cleaning experience.");
    }

    if (step === 3) {
      if (!form.insuranceStatus) {
        addError(errors, "insuranceStatus", "Please select your public liability insurance status.");
      }

      if (form.insuranceStatus === "have_insurance") {
        if (!form.insuranceProvider.trim()) {
          addError(errors, "insuranceProvider", "Insurance provider is required if you already have insurance.");
        }

        if (!form.insurancePolicyNumber.trim()) {
          addError(errors, "insurancePolicyNumber", "Policy number is required if you already have insurance.");
        }

        if (!form.insuranceExpiryDate) {
          addError(errors, "insuranceExpiryDate", "Insurance expiry date is required if you already have insurance.");
        }
      }

      if (!form.eligibleToWorkUk) {
        addError(errors, "eligibleToWorkUk", "Please confirm you are eligible to work in the UK.");
      }

    }

    if (step === 4) {
      if (!form.acceptedCleanerAgreement) {
        addError(errors, "acceptedCleanerAgreement", "Please accept the Cleaner Partner Agreement.");
      }

      if (!form.acceptedStandardsAgreement) {
        addError(errors, "acceptedStandardsAgreement", "Please accept the Standards & Data Agreement.");
      }
    }

    if (step === 5) {
      if (!form.isSelfEmployed) {
        addError(errors, "isSelfEmployed", "Please confirm this is a self-employed cleaner partner application.");
      }

      if (!form.understandsNoEmployment) {
        addError(errors, "understandsNoEmployment", "Please confirm you understand this is not employment.");
      }

      if (!form.understandsNoGuaranteedWork) {
        addError(errors, "understandsNoGuaranteedWork", "Please confirm you understand there is no guaranteed work.");
      }

      if (!form.understandsCanAcceptReject) {
        addError(errors, "understandsCanAcceptReject", "Please confirm you can accept or reject booking offers.");
      }

      if (!form.confirmsTruthfulInfo) {
        addError(errors, "confirmsTruthfulInfo", "Please confirm your information is true and accurate.");
      }

      if (!form.consentsDocumentReview) {
        addError(errors, "consentsDocumentReview", "Please consent to WMC reviewing your documents before approval.");
      }

      if (!form.consentToStoreDetails) {
        addError(errors, "consentToStoreDetails", "Please consent to WMC storing your application details.");
      }

      if (!form.consentToBeContacted) {
        addError(errors, "consentToBeContacted", "Please consent to WMC contacting you about your application.");
      }

      if (!form.electronicSignature.trim()) {
        addError(errors, "electronicSignature", "Please type your full legal name as your electronic signature.");
      } else if (
        form.fullName.trim() &&
        form.electronicSignature.trim().toLowerCase() !== form.fullName.trim().toLowerCase()
      ) {
        addError(errors, "electronicSignature", "Your electronic signature must match your full legal name.");
      }
    }

    return errors;
  }

  function showValidationErrors(errors) {
    const labels = Object.keys(errors).map(fieldLabel);
    setFieldErrors(errors);
    setErrorMessage(
      `Please fix the highlighted field${labels.length === 1 ? "" : "s"}: ${labels.join(", ")}.`
    );
    scrollToFirstError(errors);
  }

  function goNext() {
    const errors = validateStep(currentStep);

    if (Object.keys(errors).length) {
      showValidationErrors(errors);
      return;
    }

    setFieldErrors({});
    setErrorMessage("");
    setStepAndScroll(Math.min(5, currentStep + 1));
  }

  function goBack() {
    setErrorMessage("");
    setFieldErrors({});
    setStepAndScroll(Math.max(1, currentStep - 1));
  }

  async function submitApplication(event) {
    event.preventDefault();

    const errors = validateStep(5);

    if (Object.keys(errors).length) {
      showValidationErrors(errors);
      return;
    }

    setSubmitting(true);
    setErrorMessage("");
    setFieldErrors({});

    try {
      const data = new FormData();

      const textFields = {
        fullName: form.fullName,
        businessName: form.businessName,
        dateOfBirth: form.dateOfBirth,
        utrStatus: form.utrStatus,
        utrNumber: form.utrNumber,
        nationalInsuranceNumber: form.nationalInsuranceNumber,
        phone: form.phone,
        email: form.email,
        address: form.address,
        postcode: form.postcode,
        baseArea: form.baseArea,
        nextOfKinName: form.nextOfKinName,
        nextOfKinRelationship: form.nextOfKinRelationship,
        nextOfKinPhone: form.nextOfKinPhone,
        nextOfKinEmail: form.nextOfKinEmail,
        areasCovered,
        servicesOffered,
        availability: form.availability,
        experience: form.experience,
        insuranceStatus: form.insuranceStatus,
        rightToWorkShareCode: form.rightToWorkShareCode,
        insuranceProvider: form.insuranceProvider,
        insurancePolicyNumber: form.insurancePolicyNumber,
        insuranceCoverAmount: form.insuranceCoverAmount,
        insuranceExpiryDate: form.insuranceExpiryDate,
        electronicSignature: form.electronicSignature
      };

      Object.entries(textFields).forEach(([key, value]) => data.append(key, value || ""));

      [
        "hasOwnTransport",
        "hasOwnProductsEquipment",
        "eligibleToWorkUk",
        "acceptedCleanerAgreement",
        "acceptedStandardsAgreement",
        "isSelfEmployed",
        "understandsNoEmployment",
        "understandsNoGuaranteedWork",
        "understandsCanAcceptReject",
        "confirmsTruthfulInfo",
        "consentsDocumentReview",
        "consentToStoreDetails",
        "consentToBeContacted"
      ].forEach((key) => data.append(key, form[key] ? "true" : "false"));


      const response = await fetch("/api/cleaner-applications", {
        method: "POST",
        body: data
      });

      const responseText = await response.text();
      let result = {};

      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch {
        result = {};
      }

      if (!response.ok) {
        const apiErrors = result?.fieldErrors || {};

        if (Object.keys(apiErrors).length) {
          showValidationErrors(apiErrors);
        } else {
          setErrorMessage(
            result?.error || responseText || "Could not submit your application. Please check the form."
          );
          window.scrollTo({ top: 0, behavior: "smooth" });
        }

        setSubmitting(false);
        return;
      }

      setApplicationReference(result?.applicationReference || "");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong submitting your application.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="page">
        <section className="section shell">
          <div className="card formCard" style={{ maxWidth: 920, margin: "0 auto" }}>
            <p className="kicker">Application submitted</p>
            <h1>Thanks — your cleaner partner application has been received.</h1>

            <div className="notice">
              Please check your email for next steps. WMC will review your details and may ask you
              to complete a signed onboarding pack or provide further information before paid
              opportunities can be offered. You are not approved to receive booking offers until WMC
              confirms approval.
              {applicationReference && (
                <>
                  <br />
                  <strong>Reference:</strong> {applicationReference}
                </>
              )}
            </div>

            <div className="warningBox">
              Please do not attend any customer property or accept any WMC booking unless WMC has
              confirmed that you have been approved and that the booking is ready to proceed.
            </div>

            <div className="actionRow">
              <a href="/" className="btn btnPrimary">
                Back to homepage
              </a>

              <a href="/join-us" className="btn btnSecondary">
                Join WMC page
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const progressPercent = `${(currentStep / 5) * 100}%`;

  return (
    <main className="page">
      <style jsx global>{`
        .wmcFieldError input,
        .wmcFieldError select,
        .wmcFieldError textarea {
          border-color: #dc2626 !important;
          box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.12) !important;
          background: #fffafa !important;
        }

        .wmcFieldError.checkbox,
        .wmcFieldError.wmcUploadBox {
          border-color: #dc2626 !important;
          box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.1) !important;
          background: #fffafa !important;
        }

        .wmcFieldErrorText {
          display: block;
          margin-top: 7px;
          color: #b91c1c;
          font-weight: 900;
          line-height: 1.35;
        }

        .wmcUploadBox {
          display: grid;
          gap: 8px;
        }
      `}</style>

      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">Cleaner partner application</p>
          <h1>Complete your cleaner partner application.</h1>
          <p className="lead">
            This form helps WMC review whether you may be suitable to quote for local cleaning
            requests. Submitting it does not guarantee approval, bookings, income, or paid work.
          </p>
        </div>

        <div className="notice" style={{ marginBottom: 18 }}>
          <strong>Before you apply:</strong> WMC is a cleaning marketplace, not an employer. Cleaner
          partners are independent self-employed providers and are responsible for their own tax,
          insurance, equipment, travel, availability and service delivery.
        </div>

        <div className="guideBox" style={{ marginBottom: 18 }}>
          <strong>Payout and fees</strong>
          <br />
          Customers pay WMC securely after choosing a provider quote. WMC keeps a 15% platform fee
          from confirmed, completed bookings. For example, on a £100 completed booking, WMC keeps
          £15 and your provider payout is £85 before any agreed adjustments, refunds or disputes.
          <br />
          <br />
          Payout is normally released after the job is completed and the 48-hour issue window has
          passed, provided there is no unresolved complaint, refund request, dispute, missing
          information or payment issue. Once released, Stripe Express pays your bank according to
          its Stripe payout schedule.
        </div>

        <div className="warningBox" style={{ marginBottom: 18 }}>
          <strong>Tax and insurance:</strong> you are responsible for checking your own tax position,
          registering with HMRC where required, keeping records and declaring your income. Public
          liability insurance and required checks must be completed before paid bookings are offered.
        </div>

        <div className="guideBox" style={{ marginBottom: 18 }}>
          <strong>No bank details are collected at this stage.</strong>
          <br />
          Payout setup is handled later if your application proceeds. Please do not attend any
          customer property unless WMC has confirmed the booking and released the full job details.
        </div>

        <div className="notice" style={{ marginBottom: 18 }}>
          <strong>What happens next:</strong>
          <br />
          1. WMC reviews your application details.
          <br />
          2. If suitable, WMC may send an onboarding pack or request further information.
          <br />
          3. You return any requested signed pack or evidence.
          <br />
          4. Paid booking opportunities may be offered only once approval checks are complete.
        </div>

        <div className="bookingProgressWrap" style={{ marginTop: 0 }}>
          <div className="bookingProgressInner">
            {["Details", "Work", "Checks", "Agreements", "Signature"].map((step, index) => (
              <div
                key={step}
                className={
                  index + 1 === currentStep
                    ? "bookingProgressStep active"
                    : index + 1 < currentStep
                      ? "bookingProgressStep complete"
                      : "bookingProgressStep"
                }
              >
                <span className="bookingProgressCircle">{index + 1 < currentStep ? "✓" : ""}</span>
                <span className="bookingProgressText">{step}</span>
              </div>
            ))}
          </div>
          <div className="bookingProgressLine">
            <span style={{ width: progressPercent }} />
          </div>
        </div>

        <form onSubmit={submitApplication} className="quoteGrid" noValidate>
          <section className="card formCard wizardFormCard">
            {errorMessage && (
              <div
                className="warningBox"
                style={{ marginBottom: 22, borderColor: "#dc2626", color: "#b91c1c" }}
              >
                {errorMessage}
              </div>
            )}

            {currentStep === 1 && (
              <section className="bookingWizardStep">
                <p className="kicker">Step 1 of 5 — Details</p>
                <h2>Details</h2>
                <p className="muted">
                  Basic contact details and date of birth are required. You can tell us your UTR
                  and insurance status without needing every document ready today.
                </p>

                <div className="formGrid">
                  <Field
                    field="fullName"
                    label="Full legal name *"
                    error={fieldErrors.fullName}
                    registerField={registerField}
                  >
                    <input
                      value={form.fullName}
                      onChange={(event) => update("fullName", event.target.value)}
                      placeholder="Your full legal name"
                      autoComplete="name"
                    />
                  </Field>

                  <Field
                    field="businessName"
                    label="Trading / business name"
                    error={fieldErrors.businessName}
                    registerField={registerField}
                  >
                    <input
                      value={form.businessName}
                      onChange={(event) => update("businessName", event.target.value)}
                      placeholder="Leave blank if you do not use a business name"
                    />
                  </Field>

                  <Field
                    field="dateOfBirth"
                    label="Date of birth *"
                    error={fieldErrors.dateOfBirth}
                    registerField={registerField}
                  >
                    <input
                      type="text"
                      value={form.dateOfBirth}
                      onChange={(event) =>
                        update("dateOfBirth", formatDateOfBirthInput(event.target.value))
                      }
                      placeholder="DD/MM/YYYY"
                      inputMode="numeric"
                      autoComplete="bday"
                      maxLength={10}
                    />
                    <small>For example: DD/MM/YYYY</small>
                  </Field>

                  <Field
                    field="utrStatus"
                    label="UTR status *"
                    error={fieldErrors.utrStatus}
                    registerField={registerField}
                  >
                    <select value={form.utrStatus} onChange={(event) => update("utrStatus", event.target.value)}>
                      {utrStatusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    field="utrNumber"
                    label="Unique Taxpayer Reference (UTR)"
                    error={fieldErrors.utrNumber}
                    registerField={registerField}
                  >
                    <input
                      value={form.utrNumber}
                      onChange={(event) => update("utrNumber", event.target.value)}
                      placeholder="10-digit UTR if you already have one"
                      inputMode="numeric"
                    />
                    <small>
                      Leave blank if you do not have one yet, have applied, or expect your
                      self-employed trading income to remain within any applicable allowance.
                    </small>
                  </Field>

                  <Field
                    field="nationalInsuranceNumber"
                    label="National Insurance number"
                    error={fieldErrors.nationalInsuranceNumber}
                    registerField={registerField}
                  >
                    <input
                      value={form.nationalInsuranceNumber}
                      onChange={(event) => update("nationalInsuranceNumber", event.target.value)}
                      placeholder="Example: QQ123456C"
                    />
                  </Field>

                  <Field field="phone" label="Phone number *" error={fieldErrors.phone} registerField={registerField}>
                    <input
                      value={form.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                    />
                  </Field>

                  <Field field="email" label="Email address *" error={fieldErrors.email} registerField={registerField}>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => update("email", event.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </Field>

                  <Field field="address" label="Home address" error={fieldErrors.address} registerField={registerField}>
                    <textarea
                      value={form.address}
                      onChange={(event) => update("address", event.target.value)}
                      placeholder="House number, street, town/city"
                      autoComplete="street-address"
                      rows={3}
                      style={{ minHeight: 92 }}
                    />
                    <small>Enter your full address if available.</small>
                  </Field>

                  <Field field="postcode" label="Postcode *" error={fieldErrors.postcode} registerField={registerField}>
                    <input
                      value={form.postcode}
                      onChange={(event) => update("postcode", event.target.value)}
                      placeholder="Enter postcode"
                      autoComplete="postal-code"
                      style={{ minHeight: 92 }}
                    />
                  </Field>

                  <Field
                    field="baseArea"
                    label="Main working base area *"
                    error={fieldErrors.baseArea}
                    registerField={registerField}
                  >
                    <input
                      value={form.baseArea}
                      onChange={(event) => update("baseArea", event.target.value)}
                      placeholder="Example: Walsall, Birmingham, Wolverhampton"
                    />
                  </Field>
                </div>

                <h3>Emergency contact</h3>
                <p className="muted">Optional at this stage. WMC may request this before approval.</p>

                <div className="formGrid">
                  <Field
                    field="nextOfKinName"
                    label="Next of kin full name"
                    error={fieldErrors.nextOfKinName}
                    registerField={registerField}
                  >
                    <input
                      value={form.nextOfKinName}
                      onChange={(event) => update("nextOfKinName", event.target.value)}
                      placeholder="Optional"
                    />
                  </Field>

                  <Field
                    field="nextOfKinRelationship"
                    label="Relationship"
                    error={fieldErrors.nextOfKinRelationship}
                    registerField={registerField}
                  >
                    <input
                      value={form.nextOfKinRelationship}
                      onChange={(event) => update("nextOfKinRelationship", event.target.value)}
                      placeholder="Optional"
                    />
                  </Field>

                  <Field
                    field="nextOfKinPhone"
                    label="Next of kin phone"
                    error={fieldErrors.nextOfKinPhone}
                    registerField={registerField}
                  >
                    <input
                      value={form.nextOfKinPhone}
                      onChange={(event) => update("nextOfKinPhone", event.target.value)}
                      placeholder="Optional"
                    />
                  </Field>

                  <Field
                    field="nextOfKinEmail"
                    label="Next of kin email"
                    error={fieldErrors.nextOfKinEmail}
                    registerField={registerField}
                  >
                    <input
                      type="email"
                      value={form.nextOfKinEmail}
                      onChange={(event) => update("nextOfKinEmail", event.target.value)}
                      placeholder="Optional"
                    />
                  </Field>
                </div>
              </section>
            )}

            {currentStep === 2 && (
              <section className="bookingWizardStep">
                <p className="kicker">Step 2 of 5</p>
                <h2>Work areas and experience</h2>

                <div
                  ref={(node) => registerField("areas", node)}
                  className={fieldErrors.areas ? "wmcFieldError" : ""}
                >
                  <span style={{ display: "block", marginBottom: 8, fontWeight: 950 }}>
                    Areas you can cover *
                  </span>
                  <div className="serviceChecks">
                    {areaOptions.map((area) => (
                      <label key={area} className="checkbox">
                        <input
                          type="checkbox"
                          checked={form.areas.includes(area)}
                          onChange={() => toggleArray("areas", area)}
                        />
                        {area}
                      </label>
                    ))}
                  </div>
                  <ErrorText message={fieldErrors.areas} />
                </div>

                <div
                  ref={(node) => registerField("services", node)}
                  className={fieldErrors.services ? "wmcFieldError" : ""}
                >
                  <span style={{ display: "block", marginBottom: 8, fontWeight: 950 }}>
                    Services you can offer *
                  </span>
                  <div className="serviceChecks">
                    {serviceOptions.map((service) => (
                      <label key={service} className="checkbox">
                        <input
                          type="checkbox"
                          checked={form.services.includes(service)}
                          onChange={() => toggleArray("services", service)}
                        />
                        {service}
                      </label>
                    ))}
                  </div>
                  <ErrorText message={fieldErrors.services} />
                </div>

                <Field
                  field="availability"
                  label="Availability *"
                  error={fieldErrors.availability}
                  registerField={registerField}
                >
                  <textarea
                    value={form.availability}
                    onChange={(event) => update("availability", event.target.value)}
                    placeholder="Example: weekdays, weekends, evenings, short-notice availability, etc."
                  />
                </Field>

                <Field
                  field="experience"
                  label="Cleaning experience *"
                  error={fieldErrors.experience}
                  registerField={registerField}
                >
                  <textarea
                    value={form.experience}
                    onChange={(event) => update("experience", event.target.value)}
                    placeholder="Tell us about your cleaning experience, property types and how long you have been cleaning."
                  />
                </Field>

                <div className="serviceChecks">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={form.hasOwnTransport}
                      onChange={(event) => update("hasOwnTransport", event.target.checked)}
                    />
                    I have reliable transport or can travel to bookings I accept.
                  </label>

                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={form.hasOwnProductsEquipment}
                      onChange={(event) => update("hasOwnProductsEquipment", event.target.checked)}
                    />
                    I can bring suitable cleaning products/equipment where required.
                  </label>
                </div>
              </section>
            )}

            {currentStep === 3 && (
              <section className="bookingWizardStep">
                <p className="kicker">Step 3 of 5</p>
                <h2>Checks, insurance and documents</h2>

                <div className="notice" style={{ marginBottom: 18 }}>
                  <strong>Documents are not uploaded on this form.</strong>
                  <br />
                  If your application is suitable, WMC will contact you to request:
                  <br />
                  <br />
                  • Photo ID
                  <br />
                  • Proof of address
                  <br />
                  • Right-to-work / eligibility evidence, if applicable
                  <br />
                  • Public liability insurance certificate
                  <br />
                  • UTR/self-employed evidence, if required
                  <br />
                  <br />
                  You can still submit this form if some documents are not ready yet. Public
                  liability insurance and required checks must be completed before any paid bookings
                  are offered.
                </div>

                <div className="formGrid">
                  <Field
                    field="insuranceStatus"
                    label="Public liability insurance status *"
                    error={fieldErrors.insuranceStatus}
                    registerField={registerField}
                  >
                    <select
                      value={form.insuranceStatus}
                      onChange={(event) => update("insuranceStatus", event.target.value)}
                    >
                      {insuranceStatusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    field="insuranceProvider"
                    label="Public liability insurance provider"
                    error={fieldErrors.insuranceProvider}
                    registerField={registerField}
                  >
                    <input
                      value={form.insuranceProvider}
                      onChange={(event) => update("insuranceProvider", event.target.value)}
                      placeholder="Leave blank if not ready yet"
                    />
                  </Field>

                  <Field
                    field="insurancePolicyNumber"
                    label="Policy number"
                    error={fieldErrors.insurancePolicyNumber}
                    registerField={registerField}
                  >
                    <input
                      value={form.insurancePolicyNumber}
                      onChange={(event) => update("insurancePolicyNumber", event.target.value)}
                      placeholder="Leave blank if not ready yet"
                    />
                  </Field>

                  <Field
                    field="insuranceCoverAmount"
                    label="Cover amount"
                    error={fieldErrors.insuranceCoverAmount}
                    registerField={registerField}
                  >
                    <input
                      value={form.insuranceCoverAmount}
                      onChange={(event) => update("insuranceCoverAmount", event.target.value)}
                      placeholder="Example: £1,000,000 if known"
                    />
                  </Field>

                  <Field
                    field="insuranceExpiryDate"
                    label="Insurance expiry date"
                    error={fieldErrors.insuranceExpiryDate}
                    registerField={registerField}
                  >
                    <input
                      type="date"
                      value={form.insuranceExpiryDate}
                      onChange={(event) => update("insuranceExpiryDate", event.target.value)}
                    />
                  </Field>

                  <Field
                    field="rightToWorkShareCode"
                    label="Right-to-work share code / eligibility note"
                    error={fieldErrors.rightToWorkShareCode}
                    registerField={registerField}
                  >
                    <input
                      value={form.rightToWorkShareCode}
                      onChange={(event) => update("rightToWorkShareCode", event.target.value)}
                      placeholder="Optional at this stage"
                    />
                  </Field>
                </div>

                <CheckboxField
                  field="eligibleToWorkUk"
                  error={fieldErrors.eligibleToWorkUk}
                  registerField={registerField}
                >
                  <input
                    type="checkbox"
                    checked={form.eligibleToWorkUk}
                    onChange={(event) => update("eligibleToWorkUk", event.target.checked)}
                  />
                  I confirm I am eligible to work in the UK and can provide evidence if requested.
                </CheckboxField>

                <div className="warningBox" style={{ marginTop: 18 }}>
                  WMC cannot offer or assign any paid cleaning bookings until required checks,
                  documents and public liability insurance evidence are complete.
                </div>
              </section>
            )}

            {currentStep === 4 && (
              <section className="bookingWizardStep">
                <p className="kicker">Step 4 of 5</p>
                <h2>Read and accept agreements</h2>

                {agreementSections.map((section) => (
                  <div key={section.title} className="card miniCard" style={{ marginBottom: 18 }}>
                    <h3>{section.title}</h3>
                    <ul>
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="serviceChecks">
                  <CheckboxField
                    field="acceptedCleanerAgreement"
                    error={fieldErrors.acceptedCleanerAgreement}
                    registerField={registerField}
                  >
                    <input
                      type="checkbox"
                      checked={form.acceptedCleanerAgreement}
                      onChange={(event) => update("acceptedCleanerAgreement", event.target.checked)}
                    />
                    I have read and accept the Cleaner Partner Agreement.
                  </CheckboxField>

                  <CheckboxField
                    field="acceptedStandardsAgreement"
                    error={fieldErrors.acceptedStandardsAgreement}
                    registerField={registerField}
                  >
                    <input
                      type="checkbox"
                      checked={form.acceptedStandardsAgreement}
                      onChange={(event) => update("acceptedStandardsAgreement", event.target.checked)}
                    />
                    I have read and accept the Cleaner Partner Standards & Data Agreement.
                  </CheckboxField>
                </div>
              </section>
            )}

            {currentStep === 5 && (
              <section className="bookingWizardStep">
                <p className="kicker">Step 5 of 5</p>
                <h2>Final confirmations and signature</h2>

                <div className="notice" style={{ marginBottom: 18 }}>
                  Type your full legal name below as your electronic signature. This confirms your
                  application details and agreement acceptance. Missing documents/details can still
                  be requested before approval.
                </div>

                <div className="serviceChecks">
                  <CheckboxField field="isSelfEmployed" error={fieldErrors.isSelfEmployed} registerField={registerField}>
                    <input
                      type="checkbox"
                      checked={form.isSelfEmployed}
                      onChange={(event) => update("isSelfEmployed", event.target.checked)}
                    />
                    I confirm I am self-employed or intend to work on a self-employed basis as an
                    independent cleaner partner.
                  </CheckboxField>

                  <CheckboxField
                    field="understandsNoEmployment"
                    error={fieldErrors.understandsNoEmployment}
                    registerField={registerField}
                  >
                    <input
                      type="checkbox"
                      checked={form.understandsNoEmployment}
                      onChange={(event) => update("understandsNoEmployment", event.target.checked)}
                    />
                    I understand this is not employment and I am not applying to become an employee.
                  </CheckboxField>

                  <CheckboxField
                    field="understandsNoGuaranteedWork"
                    error={fieldErrors.understandsNoGuaranteedWork}
                    registerField={registerField}
                  >
                    <input
                      type="checkbox"
                      checked={form.understandsNoGuaranteedWork}
                      onChange={(event) => update("understandsNoGuaranteedWork", event.target.checked)}
                    />
                    I understand there are no guaranteed hours, wages, shifts or booking opportunities.
                  </CheckboxField>

                  <CheckboxField
                    field="understandsCanAcceptReject"
                    error={fieldErrors.understandsCanAcceptReject}
                    registerField={registerField}
                  >
                    <input
                      type="checkbox"
                      checked={form.understandsCanAcceptReject}
                      onChange={(event) => update("understandsCanAcceptReject", event.target.checked)}
                    />
                    I understand I can accept or reject booking offers.
                  </CheckboxField>

                  <div className="notice" style={{ marginTop: 12, marginBottom: 12 }}>
                    WMC keeps a 15% platform fee from confirmed completed bookings. For example,
                    on a £100 completed booking, WMC keeps £15 and your provider payout is £85
                    before any agreed adjustments, refunds or disputes.
                  </div>

                  <CheckboxField
                    field="confirmsTruthfulInfo"
                    error={fieldErrors.confirmsTruthfulInfo}
                    registerField={registerField}
                  >
                    <input
                      type="checkbox"
                      checked={form.confirmsTruthfulInfo}
                      onChange={(event) => update("confirmsTruthfulInfo", event.target.checked)}
                    />
                    I confirm all information and documents I provide are true, accurate and up to date.
                  </CheckboxField>

                  <CheckboxField
                    field="consentsDocumentReview"
                    error={fieldErrors.consentsDocumentReview}
                    registerField={registerField}
                  >
                    <input
                      type="checkbox"
                      checked={form.consentsDocumentReview}
                      onChange={(event) => update("consentsDocumentReview", event.target.checked)}
                    />
                    I agree that WMC may review and verify my documents before any booking offers are made.
                  </CheckboxField>

                  <CheckboxField
                    field="consentToStoreDetails"
                    error={fieldErrors.consentToStoreDetails}
                    registerField={registerField}
                  >
                    <input
                      type="checkbox"
                      checked={form.consentToStoreDetails}
                      onChange={(event) => update("consentToStoreDetails", event.target.checked)}
                    />
                    I consent to WMC storing and reviewing my application details and documents.
                  </CheckboxField>

                  <CheckboxField
                    field="consentToBeContacted"
                    error={fieldErrors.consentToBeContacted}
                    registerField={registerField}
                  >
                    <input
                      type="checkbox"
                      checked={form.consentToBeContacted}
                      onChange={(event) => update("consentToBeContacted", event.target.checked)}
                    />
                    I consent to WMC contacting me about this application and future booking opportunities.
                  </CheckboxField>
                </div>

                <Field
                  field="electronicSignature"
                  label="Electronic signature — type your full legal name *"
                  error={fieldErrors.electronicSignature}
                  registerField={registerField}
                  style={{ marginTop: 18 }}
                >
                  <input
                    value={form.electronicSignature}
                    onChange={(event) => update("electronicSignature", event.target.value)}
                    placeholder="Type your full legal name"
                  />
                </Field>
              </section>
            )}

            <div className={currentStep === 1 ? "wizardNavigation wizardNavigationFirst" : "wizardNavigation"}>
              {currentStep > 1 ? (
                <button type="button" className="btn btnSecondary" onClick={goBack}>
                  Back
                </button>
              ) : (
                <span />
              )}

              {currentStep < 5 ? (
                <button type="button" className="btn btnPrimary wizardNextButton" onClick={goNext}>
                  Continue
                </button>
              ) : (
                <button type="submit" className="btn btnPrimary wizardNextButton" disabled={submitting}>
                  {submitting ? "Submitting application..." : "Submit onboarding form for review"}
                </button>
              )}
            </div>
          </section>

          <aside className="card sideCard">
            <p className="kicker">Before paid bookings</p>
            <h2>Approval checks still apply.</h2>

            <div className="guideBox">
              You can submit the form even if some documents or details are not ready yet. WMC will
              review your application and may request missing information before approval.
            </div>

            <div className="warningBox">
              WMC cannot offer paid cleaning bookings until required checks are complete, including
              self-employed/tax status information, insurance, eligibility/right-to-work evidence
              where applicable and payout setup.
            </div>

            <div className="notice">
              Errors will be shown in red beside the field that needs attention, and the page will
              automatically scroll to the first issue.
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
}
