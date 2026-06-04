"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const BUSINESS_EMAIL = "info@westmidlandscleaner.co.uk";

function formatMoney(value) {
  const number = Number(value || 0);

  if (!Number.isFinite(number) || number <= 0) {
    return "";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP"
  }).format(number);
}

function BookingSuccessContent() {
  const searchParams = useSearchParams();

  const reference =
    searchParams.get("reference") ||
    searchParams.get("quote_reference") ||
    searchParams.get("ref") ||
    "Your booking reference";

  const estimate =
    searchParams.get("estimate") ||
    searchParams.get("total") ||
    searchParams.get("price") ||
    "";

  const formattedEstimate = formatMoney(estimate);

  return (
    <main className="page">
      <section className="section shell">
        <div className="card formCard" style={{ maxWidth: 980, margin: "0 auto" }}>
          <p className="kicker">West Midlands Cleaner</p>

          <h1>Booking request received.</h1>

          <div className="notice" style={{ marginBottom: 22 }}>
            <strong>Your booking reference:</strong>
            <br />
            <span style={{ fontSize: 26 }}>{reference}</span>
          </div>

          {formattedEstimate ? (
            <div className="guideBox" style={{ marginBottom: 22 }}>
              <strong>Guide price submitted:</strong>
              <br />
              <span style={{ fontSize: 28 }}>{formattedEstimate}</span>
              <br />
              <br />
              This is the guide price only you submitted. Approved independent providers may
              review the safe job details and submit their own quotes. You will be emailed when provider
              quotes are available so you can compare them, choose your preferred provider and pay securely.
            </div>
          ) : (
            <div className="guideBox" style={{ marginBottom: 22 }}>
              <strong>Guide price only submitted</strong>
              <br />
              Your booking estimate has been received. Approved independent providers may review the safe job details and submit quotes for you to compare.
            </div>
          )}

          <p className="lead">
            Thank you. Your booking request has been received. Suitable approved independent providers
            may now review the safe job details and submit quotes. You will be emailed when provider
            quotes are available. No payment is taken until you choose a provider and continue to checkout.
          </p>

          <div className="warningBox" style={{ marginBottom: 22 }}>
            Submitting a booking request does not guarantee automatic acceptance. Your customer guide
            estimate helps approved providers understand the expected job value, but provider quotes
            may change after provider review, availability, property details and job condition are checked.
            You will be able to compare available provider quotes before choosing and paying.
          </div>

          <div className="card infoCard" style={{ marginBottom: 22, boxShadow: "none" }}>
            <h2>What happens next?</h2>

            <div className="statusList">
              <div className="statusRow">
                <span>1. Your request is posted to suitable approved providers</span>
                <strong>Posted</strong>
              </div>

              <div className="statusRow">
                <span>2. Approved providers review safe details and submit quotes</span>
                <strong>Provider quotes</strong>
              </div>

              <div className="statusRow">
                <span>3. You receive a quote comparison link and choose your preferred provider</span>
                <strong>Compare</strong>
              </div>

              <div className="statusRow">
                <span>4. You pay securely after choosing a provider</span>
                <strong>Pay</strong>
              </div>

              <div className="statusRow">
                <span>5. Your selected approved independent provider attends once confirmed</span>
                <strong>Clean</strong>
              </div>
            </div>
          </div>

          <div className="notice" style={{ marginBottom: 22 }}>
            <strong>No payment has been taken yet.</strong>
            <br />
            Payment is only requested after provider quotes are available and you choose the provider/quote you want to accept.
          </div>

          <div className="grid2" style={{ marginBottom: 22 }}>
            <div className="guideBox">
              <strong>Need to send more details?</strong>
              <br />
              Use the contact page with your booking reference if you need to add important details,
              notes, access information or timing changes.
            </div>

            <div className="guideBox">
              <strong>Booking support</strong>
              <br />
              Provider quotes can vary by area, service type and date. WMC may step in only where support, safety, payment or dispute help is needed.
            </div>
          </div>

          <div className="actionRow">
            <a href="/contact" className="btn btnPrimary">
              Contact WMC
            </a>

            <a href="/book" className="btn btnSecondary">
              Submit another job
            </a>

            <a href="/" className="btn btnSecondary">
              Back to homepage
            </a>
          </div>

          <div className="notice" style={{ marginTop: 24 }}>
            Email: <strong>{BUSINESS_EMAIL}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="page">
          <section className="section shell">
            <div className="card formCard" style={{ maxWidth: 980, margin: "0 auto" }}>
              <p className="kicker">West Midlands Cleaner</p>
              <h1>Booking request received.</h1>
              <div className="notice">Loading booking details...</div>
            </div>
          </section>
        </main>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}
