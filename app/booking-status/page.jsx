"use client";

import React, { useState } from "react";

function statusBadgeText(booking) {
  if (!booking) return "";

  if (booking.job_status === "completed") return "Completed";
  if (booking.job_status === "cancelled") return "Cancelled";
  if (booking.job_status === "dispute") return "Under review";
  if (booking.payment_paid && booking.cleaner_assigned) return "Provider booked";
  if (booking.cleaner_assigned && !booking.payment_paid) return "Provider selected";
  if (booking.job_status === "available_to_cleaners") return "Posted to providers";
  if (booking.job_status === "cleaner_interested") return "Provider response received";
  if (booking.job_status === "quote_sent") return "Provider quotes available";
  if (booking.job_status === "customer_accepted") return "Provider chosen";
  if (booking.job_status === "awaiting_payment") return "Awaiting payment";

  return "Request received";
}

function money(value) {
  const amount = Number(value || 0);

  if (!amount) {
    return "To be confirmed";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP"
  }).format(amount);
}

export default function BookingStatusPage() {
  const [form, setForm] = useState({
    quoteReference: "",
    phone: ""
  });

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function update(field, value) {
    setErrorMessage("");
    setNotice("");

    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function checkStatus(event) {
    event.preventDefault();

    setLoading(true);
    setBooking(null);
    setNotice("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/marketplace/booking-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not check booking status.");
        setLoading(false);
        return;
      }

      setBooking(data.booking);
      setNotice("Booking found.");
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong checking your booking.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="section shell">
        <div className="card formCard" style={{ maxWidth: 900, margin: "0 auto" }}>
          <p className="kicker">Booking status</p>
          <h1>Check your cleaning booking.</h1>

          <p>
            Enter your WMC booking reference and the phone number used on your booking request.
            You can use either 07 or +44 phone format.
          </p>

          <form onSubmit={checkStatus}>
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
              <button type="submit" className="btn btnPrimary" disabled={loading}>
                {loading ? "Checking..." : "Check booking status"}
              </button>

              <a href="/contact" className="btn btnSecondary">
                Contact WMC
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

          {booking && (
            <div className="guideBox" style={{ marginTop: 24 }}>
              <p className="kicker">Current status</p>
              <h2 style={{ marginTop: 0 }}>{statusBadgeText(booking)}</h2>

              <div className="notice" style={{ marginBottom: 18 }}>
                <strong>{booking.customer_stage}</strong>
              </div>

              <p>
                <strong>Reference:</strong> {booking.quote_reference}
                <br />
                <strong>Customer:</strong> {booking.customer_name}
                <br />
                <strong>Service:</strong> {booking.service_type}
                <br />
                <strong>Date/time:</strong> {booking.preferred_date || "Not set"} at{" "}
                {booking.preferred_time || "Not set"}
                <br />
                <strong>Area/postcode:</strong> {booking.area_town || "Not provided"} /{" "}
                {booking.postcode || "Not provided"}
                <br />
                <strong>Property:</strong> {booking.property_type || "Not set"}
                {booking.bedrooms !== null && booking.bedrooms !== undefined
                  ? `, ${booking.bedrooms} bedrooms`
                  : ""}
                {booking.bathrooms !== null && booking.bathrooms !== undefined
                  ? `, ${booking.bathrooms} bathrooms`
                  : ""}
              </p>

              <div className="guideBox" style={{ background: "#ffffff" }}>
                <strong>Quote amount:</strong> {money(booking.customer_total_price)}
                <br />
                <strong>Payment status:</strong> {booking.payment_status_label}
                <br />
                <strong>Booking status:</strong> {booking.job_status_label}
                <br />
                <strong>Selected provider:</strong> {booking.cleaner_assigned ? "Chosen/assigned" : "Not yet"}
              </div>

              {booking.can_pay && (
                <div className="notice" style={{ marginTop: 18 }}>
                  A provider quote is ready for payment. Only continue if the selected provider,
                  details and amount match the quote you chose.
                </div>
              )}

              {!booking.can_pay && !booking.payment_paid && (
                <div className="notice" style={{ marginTop: 18 }}>
                  Payment is not available from this status page yet. When provider quotes are
                  available, use your quote link to compare providers and choose before paying.
                </div>
              )}

              {booking.payment_paid && booking.cleaner_assigned && (
                <div className="notice" style={{ marginTop: 18 }}>
                  Your payment has been received and your selected provider has been assigned.
                  Please use platform messages for booking questions or updates.
                </div>
              )}

              {!booking.cleaner_assigned && (
                <div className="notice" style={{ marginTop: 18 }}>
                  Your request is still waiting for a provider quote or provider selection. Approved
                  providers can review the safe job details and respond where suitable.
                </div>
              )}

              <div className="actionRow" style={{ marginTop: 20 }}>
                {booking.can_pay && (
                  <a href="/pay" className="btn btnGreen">
                    Pay selected provider quote
                  </a>
                )}

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
