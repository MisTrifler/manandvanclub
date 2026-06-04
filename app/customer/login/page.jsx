"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function CustomerLoginContent() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/customer/dashboard";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!isEmail(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, returnTo })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data?.error || "We could not send your login link. Please try again.");
        return;
      }

      setMessage("Check your email. We have sent a secure login link to view your WMC bookings.");
      setEmail("");
    } catch (err) {
      setError("Something went wrong sending your login link. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="section shell">
        <div className="quoteGrid">
          <div className="card formCard">
            <p className="kicker">Customer login</p>
            <h1>View your WMC bookings</h1>
            <p className="lead">
              Enter the email address you used when posting your cleaning request. We will send a secure login link so you can view your requests, provider quotes, messages, payment status, issues and reviews.
            </p>

            <div className="guideBox">
              <strong>No password needed.</strong>
              <p>
                Your login link only gives access to bookings connected to your email address.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <label className="field">
                <span>Email address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              {error ? <div className="warningBox">{error}</div> : null}
              {message ? <div className="notice">{message}</div> : null}

              <button className="btn btnPrimary" type="submit" disabled={loading}>
                {loading ? "Sending login link..." : "Email me a login link"}
              </button>
            </form>
          </div>

          <aside className="card sideCard">
            <h2>What you can manage</h2>
            <div className="statusList">
              <div className="statusRow">
                <strong>Requests</strong>
                <span>See your cleaning requests and current status.</span>
              </div>
              <div className="statusRow">
                <strong>Quotes</strong>
                <span>Compare approved provider quotes and choose who you want.</span>
              </div>
              <div className="statusRow">
                <strong>After booking</strong>
                <span>Message your selected provider, report an issue or leave a WMC verified review.</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default function CustomerLoginPage() {
  return (
    <Suspense fallback={<main className="page"><section className="section shell"><div className="card formCard"><p>Loading customer login...</p></div></section></main>}>
      <CustomerLoginContent />
    </Suspense>
  );
}
