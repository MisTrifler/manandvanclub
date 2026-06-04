"use client";

import React, { useMemo, useState } from "react";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

const initialForm = {
  businessName: "",
  tradingName: "",
  businessType: "",
  contactName: "",
  contactRole: "",
  phone: "",
  email: "",
  postcode: "",
  areasCovered: "",
  teamSize: "",
  availableDays: [],
  availableTimes: [],
  minimumNotice: "",
  minimumBookingLength: "",
  productsEquipment: "",
  insuranceStatus: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  insuranceExpiryDate: "",
  insuranceCoverAmount: "",
  servicesOffered: [],
  message: "",
  confirmsAuthority: false,
  confirmsAccuracy: false,
  confirmsInsuranceDetails: false,
  understandsNoGuarantee: false,
  understandsPayoutOffer: false,
  understandsChecks: false,
  understandsProductsFee: false,
  consentsContact: false
};

const businessTypes = [
  "Limited company",
  "Sole trader",
  "Partnership",
  "Cleaning agency",
  "Other"
];


const availableDayOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const availableTimeOptions = ["Mornings", "Afternoons", "Evenings", "Flexible"];

const minimumNoticeOptions = [
  "Same day if available",
  "24 hours",
  "48 hours",
  "3 days",
  "1 week"
];

const minimumBookingLengthOptions = ["2 hours", "3 hours", "4 hours", "Half day", "Full day"];

const productsEquipmentOptions = [
  "Yes, products and equipment",
  "Products only",
  "Equipment only",
  "No, customer must provide",
  "Depends on booking"
];

const insuranceStatuses = [
  "Yes, active public liability insurance",
  "Insurance arranged but documents pending",
  "No insurance yet",
  "Not sure"
];

const insuranceCoverAmounts = ["£1 million", "£2 million", "£5 million", "£10 million+", "Not sure"];

const serviceOptions = [
  "Regular domestic cleaning",
  "One-off house cleaning",
  "Deep cleaning",
  "End-of-tenancy cleaning",
  "Move-in / move-out cleaning",
  "Airbnb / holiday-let changeovers",
  "After-builders cleaning",
  "Landlord / property management cleaning",
  "Office / commercial cleaning"
];

export default function BusinessPartnerPage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const selectedServiceCount = useMemo(() => form.servicesOffered.length, [form.servicesOffered]);
  const selectedDayCount = useMemo(() => form.availableDays.length, [form.availableDays]);
  const selectedTimeCount = useMemo(() => form.availableTimes.length, [form.availableTimes]);

  function update(field, value) {
    setErrorMessage("");
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function toggleArrayValue(field, value) {
    setErrorMessage("");
    setForm((current) => {
      const currentValues = Array.isArray(current[field]) ? current[field] : [];
      const exists = currentValues.includes(value);

      return {
        ...current,
        [field]: exists ? currentValues.filter((item) => item !== value) : [...currentValues, value]
      };
    });
  }

  function validateForm() {
    if (!form.businessName.trim()) return "Please enter the business name.";
    if (!form.businessType) return "Please select the business type.";
    if (!form.contactName.trim()) return "Please enter the main contact name.";
    if (!form.phone.trim()) return "Please enter a phone number.";
    if (!form.email.trim()) return "Please enter an email address.";
    if (!isValidEmail(form.email)) return "Please enter a valid email address.";
    if (!form.postcode.trim()) return "Please enter the business postcode.";
    if (!form.areasCovered.trim()) return "Please enter the areas covered.";
    if (!form.teamSize.trim()) return "Please enter how many cleaners or teams are available.";
    if (!form.availableDays.length) return "Please select at least one available day.";
    if (!form.availableTimes.length) return "Please select at least one available time.";
    if (!form.minimumNotice) return "Please select the minimum notice required.";
    if (!form.minimumBookingLength) return "Please select the minimum booking length accepted.";
    if (!form.productsEquipment) return "Please select whether your business provides products and equipment.";
    if (!form.insuranceStatus) return "Please select the insurance status.";
    if (!form.insuranceProvider.trim()) return "Please enter the insurance provider name.";
    if (!form.insurancePolicyNumber.trim()) return "Please enter the policy or certificate number.";
    if (!form.insuranceExpiryDate) return "Please enter the public liability insurance expiry date.";
    if (!form.insuranceCoverAmount) return "Please select the insurance cover amount.";
    if (!form.servicesOffered.length) return "Please select at least one service offered.";
    if (!form.confirmsAuthority) return "Please confirm you are authorised to submit this form.";
    if (!form.confirmsAccuracy) return "Please confirm the information provided is accurate.";
    if (!form.confirmsInsuranceDetails) return "Please confirm the insurance details are accurate.";
    if (!form.understandsNoGuarantee) return "Please confirm you understand submission does not guarantee approval or paid work.";
    if (!form.understandsPayoutOffer) return "Please confirm you understand WMC may offer booking opportunities with a clear proposed business payout.";
    if (!form.understandsChecks) return "Please confirm you understand checks are required before paid bookings.";
    if (!form.understandsProductsFee) return "Please confirm you understand the WMC products fee guidance.";
    if (!form.consentsContact) return "Please confirm WMC can contact you about this application.";

    return "";
  }

  async function submitBusinessApplication(event) {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not submit the business application. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
      setForm(initialForm);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="page">
        <section className="section shell">
          <div className="card formCard" style={{ maxWidth: 900, margin: "0 auto" }}>
            <p className="kicker">Application received</p>
            <h1>Thank you for applying to partner with WMC.</h1>
            <p>
              Your business partner application has been received. WMC will review the details and
              contact you to discuss the next steps if the business may be suitable.
            </p>

            <div className="notice">
              We have also emailed you the WMC Business Partner Onboarding Pack. Please read,
              complete and sign it, then email the signed PDF back to info@westmidlandscleaner.co.uk.
              Returning the signed pack is required for review, but it does not guarantee approval or paid work.
            </div>

            <div className="guideBox" style={{ marginTop: 18 }}>
              You can also open the onboarding pack here: {" "}
              <a href="/documents/wmc-business-partner-onboarding-pack.html" target="_blank" rel="noopener noreferrer">
                WMC Business Partner Onboarding Pack
              </a>
            </div>

            <div className="warningBox" style={{ marginTop: 18 }}>
              Please do not send a cleaner/team to any WMC booking unless WMC has confirmed the
              booking and released the agreed job details.
            </div>

            <div className="actionRow">
              <a href="/" className="btn btnPrimary">
                Back to homepage
              </a>
              <a href="/join-us" className="btn btnSecondary">
                Cleaner join-us page
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="section shell">
        <div className="quoteGrid">
          <form className="card formCard" onSubmit={submitBusinessApplication}>
            <p className="kicker">Business partners</p>
            <h1>Apply to become a WMC approved business partner.</h1>

            <p>
              Apply to join the WMC cleaning marketplace as an approved cleaning business partner.
              Approved businesses can receive suitable job alerts, submit their own quotes and let
              customers choose who to book.
            </p>

            {errorMessage && (
              <div
                className="warningBox"
                style={{ marginBottom: 18, borderColor: "#dc2626", color: "#b91c1c" }}
              >
                {errorMessage}
              </div>
            )}

            <div className="grid3" style={{ marginBottom: 22 }}>
              <div className="card miniCard">
                <p className="kicker">1. Apply</p>
                <h3>Tell us about your business.</h3>
                <p>Submit your services, coverage, team size, insurance and availability details.</p>
              </div>
              <div className="card miniCard">
                <p className="kicker">2. Quote</p>
                <h3>Send your own quotes.</h3>
                <p>Approved businesses can quote for suitable cleaning requests through the platform.</p>
              </div>
              <div className="card miniCard">
                <p className="kicker">3. Complete</p>
                <h3>Customer chooses and pays.</h3>
                <p>The customer chooses a provider and pays before the booking is confirmed.</p>
              </div>
            </div>

            <div className="notice" style={{ marginBottom: 22 }}>
              <strong>No joining fee. No monthly fee.</strong> WMC keeps a flat 15% platform fee from
              confirmed completed bookings. Your business is responsible for its own staff, cleaners,
              equipment, insurance, tax, legal obligations and service delivery.
            </div>

            <div className="guideBox" style={{ marginBottom: 22 }}>
              Payouts are normally released after the job is completed and the 48-hour issue window
              has passed, provided there is no unresolved complaint, missing information, refund
              issue or dispute. Stripe Express then pays your bank according to your Stripe payout schedule.
            </div>

            <div className="warningBox" style={{ marginBottom: 22 }}>
              This form does not approve a business for paid bookings automatically. WMC may request
              required checks, proof of public liability insurance, employer's liability insurance
              where applicable and a signed business partner agreement before paid booking opportunities
              are offered.
            </div>

            <h2>Business details</h2>

            <div className="formGrid">
              <label className="field">
                <span>Business name *</span>
                <input
                  value={form.businessName}
                  onChange={(event) => update("businessName", event.target.value)}
                  placeholder="Enter business name"
                  autoComplete="organization"
                />
              </label>

              <label className="field">
                <span>Trading name</span>
                <input
                  value={form.tradingName}
                  onChange={(event) => update("tradingName", event.target.value)}
                  placeholder="Enter trading name if different"
                />
              </label>

              <label className="field">
                <span>Business structure *</span>
                <select value={form.businessType} onChange={(event) => update("businessType", event.target.value)}>
                  <option value="">Select business structure</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Business postcode *</span>
                <input
                  value={form.postcode}
                  onChange={(event) => update("postcode", event.target.value)}
                  placeholder="Enter business postcode"
                  autoComplete="postal-code"
                />
              </label>
            </div>

            <h2>Main contact</h2>

            <div className="formGrid">
              <label className="field">
                <span>Contact name *</span>
                <input
                  value={form.contactName}
                  onChange={(event) => update("contactName", event.target.value)}
                  placeholder="Enter contact name"
                  autoComplete="name"
                />
              </label>

              <label className="field">
                <span>Role / position</span>
                <input
                  value={form.contactRole}
                  onChange={(event) => update("contactRole", event.target.value)}
                  placeholder="Owner, manager or director"
                />
              </label>

              <label className="field">
                <span>Phone number *</span>
                <input
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  placeholder="Enter phone number"
                  autoComplete="tel"
                />
              </label>

              <label className="field">
                <span>Email address *</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  placeholder="Enter email address"
                  autoComplete="email"
                />
              </label>
            </div>

            <h2>Coverage and services</h2>

            <div className="formGrid">
              <label className="field" style={{ gridColumn: "1 / -1" }}>
                <span>Areas covered *</span>
                <textarea
                  value={form.areasCovered}
                  onChange={(event) => update("areasCovered", event.target.value)}
                  placeholder="Enter the towns, cities or postcodes your business can cover"
                  rows={4}
                />
              </label>

              <label className="field">
                <span>Number of cleaners / teams available *</span>
                <input
                  value={form.teamSize}
                  onChange={(event) => update("teamSize", event.target.value)}
                  placeholder="Enter approximate team size"
                />
              </label>
            </div>

            <div className="field">
              <span>Services offered * ({selectedServiceCount} selected)</span>
              <div className="serviceChecks">
                {serviceOptions.map((service) => (
                  <label key={service} className="checkbox">
                    <input
                      type="checkbox"
                      checked={form.servicesOffered.includes(service)}
                      onChange={() => toggleArrayValue("servicesOffered", service)}
                    />
                    {service}
                  </label>
                ))}
              </div>
            </div>

            <h2>Availability</h2>

            <div className="field">
              <span>Available days * ({selectedDayCount} selected)</span>
              <div className="serviceChecks">
                {availableDayOptions.map((day) => (
                  <label key={day} className="checkbox">
                    <input
                      type="checkbox"
                      checked={form.availableDays.includes(day)}
                      onChange={() => toggleArrayValue("availableDays", day)}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>

            <div className="field">
              <span>Available times * ({selectedTimeCount} selected)</span>
              <div className="serviceChecks">
                {availableTimeOptions.map((time) => (
                  <label key={time} className="checkbox">
                    <input
                      type="checkbox"
                      checked={form.availableTimes.includes(time)}
                      onChange={() => toggleArrayValue("availableTimes", time)}
                    />
                    {time}
                  </label>
                ))}
              </div>
            </div>

            <div className="formGrid">
              <label className="field">
                <span>Minimum notice required *</span>
                <select value={form.minimumNotice} onChange={(event) => update("minimumNotice", event.target.value)}>
                  <option value="">Select minimum notice</option>
                  {minimumNoticeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Minimum booking length accepted *</span>
                <select
                  value={form.minimumBookingLength}
                  onChange={(event) => update("minimumBookingLength", event.target.value)}
                >
                  <option value="">Select minimum booking length</option>
                  {minimumBookingLengthOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <h2>Products and equipment</h2>

            <label className="field">
              <span>Do you provide cleaning products and equipment? *</span>
              <select
                value={form.productsEquipment}
                onChange={(event) => update("productsEquipment", event.target.value)}
              >
                <option value="">Select an option</option>
                {productsEquipmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <div className="guideBox" style={{ marginTop: 18 }}>
              <strong>About the £6 products fee:</strong> this is a customer-facing booking option,
              not an extra WMC charge to your business. If a customer asks for cleaning products to
              be provided, WMC may add a £6 products fee to the customer price to help cover basic
              product provision. It does not replace your own pricing, and it is not a mandatory
              platform fee charged to you.
              <br />
              <br />
              We recommend that business partners bring suitable cleaning products and basic
              equipment where possible, especially for recurring customers. Please only use safe,
              appropriate products and follow the customer&apos;s instructions where specific products
              are required.
            </div>

            <h2>Insurance details</h2>

            <div className="formGrid">
              <label className="field">
                <span>Public liability insurance status *</span>
                <select
                  value={form.insuranceStatus}
                  onChange={(event) => update("insuranceStatus", event.target.value)}
                >
                  <option value="">Select insurance status</option>
                  {insuranceStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Insurance provider name *</span>
                <input
                  value={form.insuranceProvider}
                  onChange={(event) => update("insuranceProvider", event.target.value)}
                  placeholder="Example: AXA, Simply Business, Hiscox"
                />
              </label>

              <label className="field">
                <span>Policy / certificate number *</span>
                <input
                  value={form.insurancePolicyNumber}
                  onChange={(event) => update("insurancePolicyNumber", event.target.value)}
                  placeholder="Enter policy or certificate number"
                />
              </label>

              <label className="field">
                <span>Public liability insurance expiry date *</span>
                <input
                  type="date"
                  value={form.insuranceExpiryDate}
                  onChange={(event) => update("insuranceExpiryDate", event.target.value)}
                />
              </label>

              <label className="field">
                <span>Cover amount *</span>
                <select
                  value={form.insuranceCoverAmount}
                  onChange={(event) => update("insuranceCoverAmount", event.target.value)}
                >
                  <option value="">Select cover amount</option>
                  {insuranceCoverAmounts.map((amount) => (
                    <option key={amount} value={amount}>
                      {amount}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="field">
              <span>Additional message</span>
              <textarea
                value={form.message}
                onChange={(event) => update("message", event.target.value)}
                placeholder="Add any useful details about your business, availability, products or preferred work"
                rows={4}
              />
            </label>

            <div className="guideBox" style={{ marginTop: 18, marginBottom: 18 }}>
              <strong>Important business partner expectations</strong>
              <br />
              WMC keeps a simple 15% platform fee from confirmed bookings. There are no WMC joining
              fees, monthly fees or extra platform subscription charges for approved business partners
              at this stage.
              <br />
              <br />
              Business payouts are normally released by WMC after a 48-hour issue window following job completion and
              approval, provided customer payment has been received and there is no unresolved complaint,
              refund issue, missing information or dispute. Once released, Stripe Express pays the provider bank according to its Stripe payout schedule. Payment is not made before completion. Travel
              costs, parking charges and clean air zone charges are not automatically covered unless
              WMC confirms this before the booking. Your business must not attend or send a cleaner
              until WMC confirms the booking and releases the final job details.
            </div>

            <h2>Confirmations</h2>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={form.confirmsAuthority}
                onChange={(event) => update("confirmsAuthority", event.target.checked)}
              />
              I confirm I am authorised to submit this business partner application.
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={form.confirmsAccuracy}
                onChange={(event) => update("confirmsAccuracy", event.target.checked)}
              />
              I confirm the information provided is accurate.
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={form.confirmsInsuranceDetails}
                onChange={(event) => update("confirmsInsuranceDetails", event.target.checked)}
              />
              I confirm the insurance details provided are accurate and understand WMC may request
              proof of public liability insurance before any paid booking opportunities are offered.
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={form.understandsNoGuarantee}
                onChange={(event) => update("understandsNoGuarantee", event.target.checked)}
              />
              I understand submitting this form does not guarantee approval or paid work.
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={form.understandsPayoutOffer}
                onChange={(event) => update("understandsPayoutOffer", event.target.checked)}
              />
              I understand that WMC may offer suitable booking opportunities with a clear proposed
              business payout, and the business can choose whether to accept each opportunity. I also
              understand WMC keeps a simple 15% platform fee from confirmed bookings and does not charge
              approved business partners a WMC joining fee, monthly fee or extra platform subscription
              charge at this stage. Business payouts are normally released by WMC after a 48-hour issue window following completion
              and approval, subject to customer payment and no unresolved issue. Once released, Stripe Express pays the provider bank according to its Stripe payout schedule.
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={form.understandsChecks}
                onChange={(event) => update("understandsChecks", event.target.checked)}
              />
              I understand WMC may request business verification, insurance documents, payment
              details and a signed business partner agreement before offering any paid booking
              opportunities.
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={form.understandsProductsFee}
                onChange={(event) => update("understandsProductsFee", event.target.checked)}
              />
              I understand the £6 products fee is a customer-facing booking option where products
              are required. It is not an additional WMC platform charge to my business, and WMC still
              recommends approved businesses bring suitable products where possible to improve
              customer experience and reviews.
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={form.consentsContact}
                onChange={(event) => update("consentsContact", event.target.checked)}
              />
              I agree that WMC can contact this business about this application.
            </label>

            <div className="actionRow">
              <button type="submit" className="btn btnPrimary" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit business application"}
              </button>
            </div>
          </form>

          <aside className="card sideCard">
            <p className="kicker">What happens next?</p>
            <h2>Automated first step. Careful approval.</h2>

            <div className="statusList">
              <div className="statusRow">
                <span className="statusDot paid"></span>
                <span>WMC receives your application automatically.</span>
              </div>

              <div className="statusRow">
                <span className="statusDot paid"></span>
                <span>You receive a confirmation email automatically.</span>
              </div>

              <div className="statusRow">
                <span className="statusDot pending"></span>
                <span>WMC reviews areas, availability, services, insurance details and suitability.</span>
              </div>

              <div className="statusRow">
                <span className="statusDot pending"></span>
                <span>WMC may request documents and a signed partner agreement.</span>
              </div>

              <div className="statusRow">
                <span className="statusDot pending"></span>
                <span>Only approved businesses can be considered for booking opportunities.</span>
              </div>
            </div>

            <div className="guideBox" style={{ marginTop: 18 }}>
              <strong>Documents WMC may request</strong>
              <br />
              Public liability insurance proof, business registration proof where relevant, main
              contact ID, services and areas covered, payment details and a signed business partner
              agreement.
            </div>

            <div className="guideBox" style={{ marginTop: 18 }}>
              <strong>Cleaner/team details for bookings</strong>
              <br />
              Approved businesses may be asked to submit cleaner/team details for each booking before
              full customer address/access details are released.
            </div>

            <div className="warningBox" style={{ marginTop: 18 }}>
              Customer details and paid booking opportunities should only be shared after checks are
              complete and WMC has approved the business.
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
