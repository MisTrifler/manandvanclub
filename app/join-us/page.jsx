"use client";

import React, { useState } from "react";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

const initialForm = {
  providerType: "",
  fullName: "",
  phone: "",
  email: "",
  postcode: "",
  marketplaceAcknowledgement: false
};

const benefits = [
  {
    label: "1. Apply",
    title: "Start in minutes.",
    text: "Send your details and we will email the right full application link for your provider type."
  },
  {
    label: "2. Quote",
    title: "Choose suitable jobs.",
    text: "Approved providers can review local cleaning requests and submit their own quote, availability and message."
  },
  {
    label: "3. Get paid",
    title: "No monthly fee.",
    text: "No joining fee or monthly subscription. WMC keeps a 15% platform fee only from confirmed completed bookings."
  }
];

const trustPoints = [
  "Customers pay WMC before confirmed bookings",
  "You stay independent and choose what to quote for",
  "No paid leads or monthly subscription"
];

export default function JoinUsPage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function update(field, value) {
    setErrorMessage("");
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function validateForm() {
    if (!form.providerType) {
      return "Please choose whether you are a cleaning business or a self-employed cleaner partner.";
    }
    if (!form.fullName.trim()) return "Please enter your full name or main contact name.";
    if (!form.phone.trim()) return "Please enter your phone number.";
    if (!form.email.trim()) return "Please enter your email address.";
    if (!isValidEmail(form.email)) return "Please enter a valid email address.";
    if (!form.postcode.trim()) return "Please enter your postcode.";
    if (!form.marketplaceAcknowledgement) {
      return "Please confirm that you understand WMC is a marketplace, not an employer, and that work is not guaranteed.";
    }

    return "";
  }

  async function submitJoinUs(event) {
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
      const response = await fetch("/api/join-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          providerType: form.providerType,
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          postcode: form.postcode,
          marketplaceAcknowledgement: form.marketplaceAcknowledgement
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not submit your details. Please try again.");
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
            <p className="kicker">Details received</p>
            <h1>Thanks — check your email to continue.</h1>

            <div className="notice">
              We have sent the next-step application link to your email. Please check your inbox and
              spam folder to continue your WMC provider application.
            </div>

            <div className="warningBox">
              Returning your details does not guarantee approval or paid work. Required checks,
              insurance evidence and platform terms must be completed before paid bookings are
              offered.
            </div>

            <div className="actionRow">
              <a href="/" className="btn btnPrimary">
                Back to homepage
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
        <div className="quoteGrid" style={{ alignItems: "start" }}>
          <section className="card formCard">
            <p className="kicker">Join West Midlands Cleaner</p>
            <h1>Get local cleaning opportunities without paid leads.</h1>
            <p className="lead">
              Join WMC as a cleaning business or self-employed cleaner partner. No joining fee, no
              monthly fee — only a 15% WMC platform fee when you win and complete paid work.
            </p>

            <div className="grid3" style={{ marginTop: 20, marginBottom: 20 }}>
              {trustPoints.map((point) => (
                <div key={point} className="guideBox" style={{ margin: 0 }}>
                  ✓ {point}
                </div>
              ))}
            </div>

            <form onSubmit={submitJoinUs} noValidate>
              {errorMessage && (
                <div
                  className="warningBox"
                  style={{ marginBottom: 18, borderColor: "#dc2626", color: "#b91c1c" }}
                >
                  {errorMessage}
                </div>
              )}

              <div className="formGrid">
                <label className="field">
                  <span>Who are you? *</span>
                  <select
                    value={form.providerType}
                    onChange={(event) => update("providerType", event.target.value)}
                    required
                  >
                    <option value="">Choose one</option>
                    <option value="business">Cleaning business</option>
                    <option value="self_employed_cleaner">Self-employed cleaner partner</option>
                  </select>
                </label>

                <label className="field">
                  <span>Full name / main contact *</span>
                  <input
                    value={form.fullName}
                    onChange={(event) => update("fullName", event.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </label>

                <label className="field">
                  <span>Phone number *</span>
                  <input
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                  />
                </label>

                <label className="field">
                  <span>Email address *</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </label>

                <label className="field">
                  <span>Postcode *</span>
                  <input
                    value={form.postcode}
                    onChange={(event) => update("postcode", event.target.value)}
                    placeholder="Enter postcode"
                    autoComplete="postal-code"
                  />
                </label>
              </div>

              <label className="checkbox" style={{ marginTop: 18, marginBottom: 18 }}>
                <input
                  type="checkbox"
                  checked={form.marketplaceAcknowledgement}
                  onChange={(event) => update("marketplaceAcknowledgement", event.target.checked)}
                  required
                />
                <span>
                  I understand that WMC is a marketplace, not an employer. Approved providers are
                  independent and work is not guaranteed.
                </span>
              </label>

              <div className="actionRow">
                <button type="submit" className="btn btnPrimary" disabled={submitting}>
                  {submitting ? "Sending..." : "Send me the application link"}
                </button>
              </div>
            </form>
          </section>

          <aside className="card sideCard">
            <p className="kicker">What happens next?</p>
            <h2>Simple next steps.</h2>

            <div className="guideBox">
              <strong>1. Get the right link</strong>
              <br />
              We email you the full application link for either business partners or self-employed
              cleaner partners.
            </div>

            <div className="guideBox" style={{ marginTop: 12 }}>
              <strong>2. Complete checks</strong>
              <br />
              If suitable, WMC may ask for insurance evidence, required checks and a signed partner
              onboarding pack.
            </div>

            <div className="guideBox" style={{ marginTop: 12 }}>
              <strong>3. Quote for work</strong>
              <br />
              Once approved, you can review suitable local requests and quote only for jobs you want.
            </div>

            <div className="warningBox">
              Do not attend a customer property unless the booking is confirmed through WMC and the
              full job details have been released.
            </div>
          </aside>
        </div>

        <div className="grid3" style={{ marginTop: 18 }}>
          {benefits.map((item) => (
            <article key={item.label} className="card miniCard">
              <p className="kicker">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="notice" style={{ marginTop: 18 }}>
          <strong>How WMC works:</strong> customers post cleaning requests, approved independent
          providers submit quotes, customers choose who they prefer, and payment is taken by WMC
          before the confirmed booking goes ahead.
        </div>
      </section>
    </main>
  );
}
