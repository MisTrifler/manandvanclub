"use client";

import React, { useState } from "react";

const BUSINESS_NAME = "West Midlands Cleaner";
const BUSINESS_EMAIL = "info@westmidlandscleaner.co.uk";

export default function AccountDeletePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    requestType: "Delete my account/data",
    details: ""
  });

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function sendRequest() {
    if (!form.name.trim() || !form.email.trim()) {
      alert("Please add your name and email address.");
      return;
    }

    const body = `Account/data request - West Midlands Cleaner

Name: ${form.name.trim()}
Email: ${form.email.trim()}
Phone: ${form.phone.trim() || "Not provided"}
Request type: ${form.requestType}

Details:
${form.details.trim() || "No extra details provided"}

I understand some records may be retained where required for legal, tax, fraud prevention, dispute, insurance, payment or business record purposes.`;

    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(
      "Account/data request"
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">Account and data request</p>
          <h1>Request account or personal data deletion.</h1>
          <p>
            Use this page to ask {BUSINESS_NAME} to delete, correct or provide information linked
            to a booking request or account record.
          </p>
        </div>

        <div className="quoteGrid">
          <div className="formCard card">
            <h2>Send your request</h2>

            <div className="formGrid">
              <Field label="Full name">
                <input
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  autoComplete="name"
                  placeholder="Your full name"
                />
              </Field>

              <Field label="Email address">
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </Field>

              <Field label="Phone number, optional">
                <input
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  autoComplete="tel"
                  placeholder="Phone number used for your booking"
                />
              </Field>

              <Field label="Request type">
                <select
                  value={form.requestType}
                  onChange={(event) => update("requestType", event.target.value)}
                >
                  <option>Delete my account/data</option>
                  <option>Delete my booking request details</option>
                  <option>Correct my information</option>
                  <option>Ask what information is held</option>
                </select>
              </Field>
            </div>

            <Field label="Extra details">
              <textarea
                value={form.details}
                onChange={(event) => update("details", event.target.value)}
                placeholder="Add any booking reference, booking date, phone number used, or details that help us find your records."
              />
            </Field>

            <div className="notice" style={{ marginTop: 18 }}>
              Some records may need to be retained where required for legal, tax, fraud prevention,
              dispute, insurance, payment or business record purposes.
            </div>

            <div className="actionRow">
              <button type="button" className="btn btnPrimary" onClick={sendRequest}>
                Send request by email
              </button>

              <a href="/privacy" className="btn btnSecondary">
                View privacy policy
              </a>
            </div>
          </div>

          <aside className="sideCard card">
            <p className="kicker">What happens next?</p>
            <h2>We will review your request.</h2>
            <p>
              Your request will open in your email app so you can send it to {BUSINESS_EMAIL}.
            </p>
            <div className="guideBox">
              Please use the same email address or phone number you used for your booking where
              possible.
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}
