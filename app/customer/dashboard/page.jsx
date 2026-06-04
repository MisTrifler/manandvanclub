"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

function formatMoney(value) {
  const number = Number(value || 0);
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(number);
}

function formatDate(value) {
  if (!value) return "Date not set";
  const raw = String(value).trim();
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  const date = match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

function formatTime(value) {
  if (!value) return "Time not set";
  const raw = String(value).trim();
  const hourOnly = raw.match(/^(\d{1,2})$/);
  if (hourOnly) return `${hourOnly[1].padStart(2, "0")}:00`;
  const hourMinute = raw.match(/^(\d{1,2}):(\d{2})/);
  if (hourMinute) return `${hourMinute[1].padStart(2, "0")}:${hourMinute[2]}`;
  return raw;
}

function statusLabel(job) {
  if (job?.has_open_issue || job?.issue_status === "open") return "Issue open";
  if (job?.payment_status === "paid" && job?.customer_confirmed_completed_at) return "Completed";
  if (job?.payment_status === "paid") return "Confirmed and paid";
  if (job?.selected_provider_quote_id) return "Provider selected — payment needed";
  if (Number(job?.quote_count || 0) > 0) return "Provider quotes available";
  return "Waiting for provider quotes";
}

function statusHelp(job) {
  if (job?.has_open_issue || job?.issue_status === "open") return "WMC can step in if the issue cannot be resolved with the provider.";
  if (job?.payment_status === "paid" && job?.customer_confirmed_completed_at) return "You can leave a WMC verified review for the selected provider.";
  if (job?.payment_status === "paid") return "Your selected provider can attend the confirmed booking.";
  if (job?.selected_provider_quote_id) return "Open your quotes page to complete secure payment for your selected provider.";
  if (Number(job?.quote_count || 0) > 0) return "Open your quotes page to compare providers and choose one before payment.";
  return "Approved providers can review the safe job details and submit quotes.";
}

function BookingCard({ job }) {
  const reference = job.quote_reference || job.booking_reference || job.reference;
  const quoteHref = `/quotes/${encodeURIComponent(reference)}`;
  const messagesHref = `/messages/${encodeURIComponent(reference)}`;
  const issueHref = `/issue/${encodeURIComponent(reference)}`;
  const reviewHref = `/review/${encodeURIComponent(reference)}`;

  return (
    <article className="card formCard" style={{ marginBottom: 18 }}>
      <div className="actionRow" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p className="kicker">{reference}</p>
          <h2>{job.service_type || "Cleaning request"}</h2>
          <p>
            {job.area_town || job.town || job.postcode || "Area not provided"} • {formatDate(job.preferred_date || job.booking_date)} at {formatTime(job.preferred_time || job.booking_time)}
          </p>
        </div>
        <span className="pill">{statusLabel(job)}</span>
      </div>

      <div className="guideBox">
        <strong>{statusHelp(job)}</strong>
        <p style={{ marginBottom: 0 }}>
          Provider quotes: {Number(job.quote_count || 0)}
          {job.selected_provider_name ? ` • Selected provider: ${job.selected_provider_name}` : ""}
          {job.selected_customer_price ? ` • Selected quote: ${formatMoney(job.selected_customer_price)}` : ""}
        </p>
      </div>

      <div className="actionRow">
        <a className="btn btnPrimary" href={quoteHref}>View quotes/status</a>
        {job.payment_status === "paid" ? <a className="btn btnSecondary" href={messagesHref}>Message provider</a> : null}
        {job.payment_status === "paid" ? <a className="btn btnSecondary" href={issueHref}>Report issue</a> : null}
        {job.payment_status === "paid" ? <a className="btn btnSecondary" href={reviewHref}>Leave review</a> : null}
      </div>
    </article>
  );
}

function CustomerDashboardContent() {
  const searchParams = useSearchParams();
  const urlToken = searchParams.get("token") || "";
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const nextToken = urlToken || window.localStorage.getItem("wmc_customer_login_token") || "";
    if (nextToken) {
      window.localStorage.setItem("wmc_customer_login_token", nextToken);
      setToken(nextToken);
    } else {
      setLoading(false);
      setError("Please log in with your email to view your WMC bookings.");
    }
  }, [urlToken]);

  useEffect(() => {
    if (!token) return;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/customer/dashboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          setError(data?.error || "Could not load your customer dashboard.");
          setJobs([]);
          return;
        }

        setEmail(data.email || "");
        setJobs(data.jobs || []);
      } catch (err) {
        setError("Something went wrong loading your dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [token]);

  function logout() {
    window.localStorage.removeItem("wmc_customer_login_token");
    window.location.href = "/customer/login";
  }

  const hasJobs = jobs.length > 0;

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">Customer dashboard</p>
          <h1>Your WMC bookings</h1>
          <p className="lead">
            View your cleaning requests, provider quotes, selected provider, messages, issues and reviews in one place.
          </p>
          {email ? <p className="notice">Logged in as {email}</p> : null}
        </div>

        {loading ? <div className="card formCard"><p>Loading your bookings...</p></div> : null}

        {!loading && error ? (
          <div className="card formCard">
            <div className="warningBox">{error}</div>
            <div className="actionRow">
              <a className="btn btnPrimary" href="/customer/login">Log in</a>
              <a className="btn btnSecondary" href="/book">Post a cleaning request</a>
            </div>
          </div>
        ) : null}

        {!loading && !error && !hasJobs ? (
          <div className="card formCard">
            <h2>No WMC bookings found yet</h2>
            <p>
              We could not find any cleaning requests linked to this email address. Use the same email address when posting your cleaning request so it appears here automatically.
            </p>
            <a className="btn btnPrimary" href="/book">Post a cleaning request</a>
          </div>
        ) : null}

        {!loading && !error && hasJobs ? (
          <div>
            <div className="actionRow" style={{ marginBottom: 18 }}>
              <a className="btn btnPrimary" href="/book">Post another cleaning request</a>
              <button className="btn btnSecondary" type="button" onClick={logout}>Log out</button>
            </div>
            {jobs.map((job) => (
              <BookingCard key={job.id || job.quote_reference} job={job} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default function CustomerDashboardPage() {
  return (
    <Suspense fallback={<main className="page"><section className="section shell"><div className="card formCard"><p>Loading customer dashboard...</p></div></section></main>}>
      <CustomerDashboardContent />
    </Suspense>
  );
}
