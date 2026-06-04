"use client";

import React, { useEffect, useState } from "react";

export default function PayPage() {
  const [form, setForm] = useState({
    quoteReference: "",
    phone: ""
  });

  const [job, setJob] = useState(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference") || params.get("ref") || "";
    const phone = params.get("phone") || "";

    if (reference || phone) {
      setForm((current) => ({
        ...current,
        quoteReference: reference || current.quoteReference,
        phone: phone || current.phone
      }));

      if (reference) {
        setNotice("Your booking reference has been filled in. Enter the phone number used on the booking to continue securely.");
      }
    }
  }, []);

  function update(field, value) {
    setErrorMessage("");
    setNotice("");

    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function lookupBooking(event) {
    event.preventDefault();

    setLookupLoading(true);
    setErrorMessage("");
    setNotice("");
    setJob(null);

    try {
      const response = await fetch("/api/marketplace/lookup-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not find booking request.");
        setLookupLoading(false);
        return;
      }

      setJob(data.job);

      if (data.job?.payment_status === "paid") {
        setNotice("This booking is already marked as paid.");
      } else {
        setNotice("Booking found. Please check the details before paying.");
      }
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong finding your booking.");
    } finally {
      setLookupLoading(false);
    }
  }

  async function payBooking() {
    setPayLoading(true);
    setErrorMessage("");
    setNotice("");

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quoteReference: form.quoteReference,
          phone: form.phone
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not start payment.");
        setPayLoading(false);
        return;
      }

      if (!data?.url) {
        setErrorMessage("Stripe did not return a payment link. Please contact WMC.");
        setPayLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong starting payment.");
      setPayLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="section shell">
        <div className="card formCard" style={{ maxWidth: 900, margin: "0 auto" }}>
          <p className="kicker">Secure Stripe payment</p>
          <h1>Pay your selected provider quote.</h1>

          <div className="notice">
            This page is a secure fallback payment page. In the normal marketplace flow, pay only
            after choosing an approved provider quote. Online guide estimates are not provider quotes.
          </div>

          <div className="grid3" style={{ marginTop: 18, marginBottom: 18 }}>
            <div className="guideBox">
              <strong>1. Find booking</strong>
              <br />
              Enter your WMC reference and phone number.
            </div>
            <div className="guideBox">
              <strong>2. Check amount</strong>
              <br />
              Review the selected provider quote and price.
            </div>
            <div className="guideBox">
              <strong>3. Pay securely</strong>
              <br />
              Continue to Stripe Checkout when ready.
            </div>
          </div>

          <p>
            Enter your WMC booking reference and the phone number used on the booking request. You
            can use either <strong>07</strong> or <strong>+44</strong> format. We will find the
            selected provider quote amount and send you to secure Stripe Checkout.
          </p>

          <form onSubmit={lookupBooking}>
            <div className="formGrid">
              <label className="field">
                <span>WMC booking reference</span>
                <input
                  value={form.quoteReference}
                  onChange={(event) => update("quoteReference", event.target.value)}
                  placeholder="Enter your booking reference"
                  autoComplete="off"
                />
              </label>

              <label className="field">
                <span>Phone number used on booking</span>
                <input
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  placeholder="Enter the phone number used on your booking"
                  autoComplete="tel"
                />
              </label>
            </div>

            <div className="actionRow">
              <button type="submit" className="btn btnPrimary" disabled={lookupLoading}>
                {lookupLoading ? "Finding booking..." : "Find my booking"}
              </button>

              <a href="/booking-status" className="btn btnSecondary">
                Check booking status
              </a>
            </div>
          </form>

          {errorMessage && (
            <div className="warningBox" style={{ marginTop: 18 }}>
              {errorMessage}
            </div>
          )}

          {notice && (
            <div className="notice" style={{ marginTop: 18 }}>
              {notice}
            </div>
          )}

          {job && (
            <div className="guideBox" style={{ marginTop: 24 }}>
              <h2 style={{ marginTop: 0 }}>Booking details</h2>

              <p>
                <strong>Reference:</strong> {job.quote_reference}
                <br />
                <strong>Customer:</strong> {job.customer_name}
                <br />
                <strong>Service:</strong> {job.service_type}
                <br />
                <strong>Date/time:</strong> {job.preferred_date || "Not set"} at{" "}
                {job.preferred_time || "Not set"}
                <br />
                <strong>Postcode:</strong> {job.postcode}
                <br />
                <strong>Payment status:</strong> {job.payment_status}
              </p>

              <h2>Amount to pay: £{job.customer_total_price}</h2>

              <p>
                This should match the provider quote you chose for this booking reference. After
                payment, WMC will update the booking and the selected independent provider can
                continue with the agreed cleaning arrangement. Payment is taken securely by Stripe.
              </p>

              <div className="actionRow">
                <button
                  type="button"
                  className="btn btnGreen"
                  onClick={payBooking}
                  disabled={payLoading || job.payment_status === "paid"}
                >
                  {job.payment_status === "paid"
                    ? "Already paid"
                    : payLoading
                      ? "Opening Stripe..."
                      : `Pay £${job.customer_total_price}`}
                </button>

                <a href="/contact" className="btn btnSecondary">
                  Contact WMC
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
