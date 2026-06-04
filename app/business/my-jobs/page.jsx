"use client";

import React, { useEffect, useState } from "react";

function formatMoney(value) {
  const number = Number(value || 0);
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(number);
}

function formatStatus(value) {
  return String(value || "Not set").replace(/_/g, " ");
}


function statusBadge(label, tone = "neutral") {
  const tones = {
    green: { background: "#dcfce7", color: "#166534", border: "#86efac" },
    yellow: { background: "#fef9c3", color: "#854d0e", border: "#fde68a" },
    blue: { background: "#dbeafe", color: "#1d4ed8", border: "#93c5fd" },
    red: { background: "#fee2e2", color: "#991b1b", border: "#fecaca" },
    neutral: { background: "#f1f5f9", color: "#334155", border: "#cbd5e1" }
  };
  const style = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 999,
        border: `1px solid ${style.border}`,
        background: style.background,
        color: style.color,
        fontSize: 13,
        fontWeight: 800,
        lineHeight: 1,
        whiteSpace: "nowrap"
      }}
    >
      {label}
    </span>
  );
}

function getJobStage(job) {
  const payment = String(job.payment_status || "").toLowerCase();
  const status = String(job.job_status || job.status || "").toLowerCase();
  const payoutStatus = String(job.payout_status || job.cleaner_payout_status || job.business_payout_status || "").toLowerCase();
  const hasIssue = Boolean(job.has_open_issue || job.payout_on_hold || job.issue_reported_at || job.issue_status === "open");

  if (hasIssue) {
    return { label: "Issue open", tone: "red", help: "Payout is paused until the issue is resolved." };
  }

  if (payoutStatus.includes("paid") || job.cleaner_paid_at || job.business_paid_at || status.includes("paid_out")) {
    return { label: "Payout released", tone: "green", help: "WMC has released the payout to Stripe Express." };
  }

  if (job.customer_confirmed_completed_at || status.includes("completed") || status.includes("payout_ready")) {
    return { label: "Completed / payout window", tone: "blue", help: "The job is completed and moving through the 48-hour issue window." };
  }

  if (job.provider_marked_completed_at) {
    return { label: "Awaiting customer confirmation", tone: "yellow", help: "You marked this completed. The customer can confirm, review or report an issue." };
  }

  if (payment === "paid" || payment === "succeeded" || payment === "complete") {
    return { label: "Confirmed paid booking", tone: "green", help: "Customer payment is confirmed. Check full details before attending." };
  }

  if (payment === "pending" || payment === "unpaid" || payment === "not_paid") {
    return { label: "Customer chosen - awaiting payment", tone: "yellow", help: "The customer has selected the quote, but payment is not confirmed yet." };
  }

  return { label: "Assigned / check details", tone: "neutral", help: "Review the booking details and status before taking action." };
}

function StatusLegend() {
  const items = [
    ["Yellow", "customer decision or confirmation pending", "yellow"],
    ["Green", "accepted, paid or payout released", "green"],
    ["Blue", "completed or 48-hour payout window", "blue"],
    ["Red", "issue/dispute needs attention", "red"]
  ];

  return (
    <div className="guideBox" style={{ marginTop: 18, marginBottom: 24 }}>
      <strong>Status colours:</strong>
      <div className="actionRow" style={{ marginTop: 10, gap: 8 }}>
        {items.map(([title, text, tone]) => (
          <span key={title} style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            {statusBadge(title, tone)}
            <small>{text}</small>
          </span>
        ))}
      </div>
    </div>
  );
}

function formatBookingDate(value) {
  if (!value) return "Date not set";

  const raw = String(value).trim();
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  const date = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(raw);

  if (Number.isNaN(date.getTime())) return raw;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function formatBookingTime(value) {
  if (!value) return "Time not set";

  const raw = String(value).trim();
  const hourOnly = raw.match(/^(\d{1,2})$/);
  if (hourOnly) return `${hourOnly[1].padStart(2, "0")}:00`;

  const hourMinute = raw.match(/^(\d{1,2}):(\d{2})/);
  if (hourMinute) return `${hourMinute[1].padStart(2, "0")}:${hourMinute[2]}`;

  return raw;
}

function formatBookingDateTime(dateValue, timeValue) {
  return `${formatBookingDate(dateValue)} at ${formatBookingTime(timeValue)}`;
}

export default function BusinessMyJobsPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedEmail = window.localStorage.getItem("wmc_business_email") || "";
    const savedPhone = window.localStorage.getItem("wmc_business_phone") || "";
    if (savedEmail) setEmail(savedEmail);
    if (savedPhone) setPhone(savedPhone);
  }, []);


  async function markCompleted(job) {
    setNotice("");
    setErrorMessage("");

    if (!window.confirm(`Mark ${job.quote_reference} as completed? The customer will be asked to confirm, review or report an issue.`)) {
      return;
    }

    try {
      const response = await fetch("/api/job-completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "provider_mark_completed",
          reference: job.quote_reference,
          providerType: "business",
          email,
          phone
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not mark booking completed.");
        return;
      }

      setNotice("Booking marked completed. The customer has been asked to confirm, review or report an issue.");
      setJobs((current) => current.map((item) => (item.id === job.id ? { ...item, ...data.job } : item)));
    } catch (error) {
      setErrorMessage(error?.message || "Could not mark booking completed.");
    }
  }

  async function loadJobs(event) {
    if (event) event.preventDefault();
    setLoading(true);
    setNotice("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/business/my-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not load assigned business jobs.");
        setBusiness(null);
        setJobs([]);
        return;
      }

      setBusiness(data.business);
      setJobs(data.jobs || []);
      window.localStorage.setItem("wmc_business_email", email);
      window.localStorage.setItem("wmc_business_phone", phone);

      if ((data.jobs || []).length === 0) {
        setNotice("No assigned bookings yet. Accepted jobs will appear here after WMC approves the business request.");
      }
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong loading assigned business jobs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">Business partner portal</p>
          <h1>My assigned WMC bookings.</h1>
          <p>
            View bookings where the customer has selected your business quote and payment has been
            confirmed. Full customer details are only shown for confirmed assigned bookings.
          </p>
        </div>

        <div className="guideBox" style={{ marginTop: 18, marginBottom: 24 }}>
          <strong>Important partner expectations:</strong> Please attend only bookings confirmed by WMC. Your business can see the selected provider price and proposed business payout so the quote and WMC flat 15% platform fee are clear. Business payouts are normally released by WMC after a 48-hour issue window following job completion and approval, provided customer payment has been received and there is no unresolved complaint, refund issue, missing information or dispute. Once released, Stripe Express pays the provider bank according to its Stripe payout schedule. Travel, parking and clean air zone charges are not automatically covered unless WMC confirms this before the booking. Do not agree extra paid work directly with the customer without WMC approval.
        </div>

        <StatusLegend />

        <div className="grid3" style={{ marginBottom: 24 }}>
          <div className="card miniCard">
            <p className="kicker">Before attending</p>
            <h3>Check the full details.</h3>
            <p>Confirm the date, time, address, access notes, service type and assigned cleaner/team.</p>
          </div>
          <div className="card miniCard">
            <p className="kicker">During booking</p>
            <h3>Use WMC messages.</h3>
            <p>Message the customer through WMC where possible so there is a clear record if support is needed.</p>
          </div>
          <div className="card miniCard">
            <p className="kicker">After booking</p>
            <h3>Mark completed.</h3>
            <p>Once finished, mark the job completed so the customer can confirm, review or report an issue.</p>
          </div>
        </div>

        <div className="card formCard" style={{ marginBottom: 24 }}>
          <h2>Business access</h2>
          <form onSubmit={loadJobs}>
            <div className="formGrid">
              <label className="field">
                <span>Approved business email</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email used on your business application" />
              </label>
              <label className="field">
                <span>Approved business phone</span>
                <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone used on your business application" />
              </label>
            </div>
            <div className="actionRow">
              <button type="submit" className="btn btnPrimary" disabled={loading}>{loading ? "Loading..." : "View my assigned jobs"}</button>
              <a href="/business/jobs" className="btn btnSecondary">Available jobs</a>
            </div>
          </form>

          {business && <div className="guideBox" style={{ marginTop: 18 }}>Logged in as: <strong>{business.business_name}</strong>{business.contact_name ? ` / ${business.contact_name}` : ""}</div>}
          {notice && <div className="notice" style={{ marginTop: 18 }}>{notice}</div>}
          {errorMessage && <div className="warningBox" style={{ marginTop: 18 }}>{errorMessage}</div>}
        </div>

        <div className="grid2">
          {jobs.map((job) => {
            const detailsUnlocked = Boolean(job.customer_details_unlocked);
            const stage = getJobStage(job);
            return (
              <article key={job.id} className="card infoCard">
                <div className="actionRow" style={{ justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                  <p className="kicker" style={{ margin: 0 }}>{job.quote_reference}</p>
                  {statusBadge(stage.label, stage.tone)}
                </div>
                <h3>{job.service_type}</h3>

                <div className="guideBox">
                  <strong>Current stage:</strong> {stage.help}<br />
                  <strong>Status:</strong> {formatStatus(job.job_status)}<br />
                  <strong>Payment:</strong> {formatStatus(job.payment_status)}<br />
                  <strong>Selected provider price:</strong> {formatMoney(job.customer_total_price)}<br />
                  <strong>Business payout:</strong> {formatMoney(job.business_payout)}<br />
                  <strong>Estimated hours:</strong> {job.estimated_hours || "Not set"}
                </div>

                {!detailsUnlocked && (
                  <div className="warningBox">
                    Full customer address, access notes and private details are locked until WMC confirms attendance is ready for the business. Do not attend until WMC confirms attendance is ready and releases the final details.
                  </div>
                )}

                {detailsUnlocked ? (
                  <p>
                    <strong>Customer:</strong> {job.customer_name || "Not provided"}<br />
                    <strong>Customer phone:</strong> {job.customer_phone || "Not provided"}<br />
                    <strong>Customer email:</strong> {job.customer_email || "Not provided"}<br />
                    <strong>Area / town:</strong> {job.area_town || "Not provided"}<br />
                    <strong>Postcode:</strong> {job.postcode || "Not provided"}<br />
                    <strong>Date/time:</strong> {formatBookingDateTime(job.preferred_date, job.preferred_time)}
                  </p>
                ) : (
                  <p>
                    <strong>Postcode area:</strong> {job.postcode_area}<br />
                    <strong>Date/time:</strong> {formatBookingDateTime(job.preferred_date, job.preferred_time)}
                  </p>
                )}

                <p>
                  <strong>Cleaner/team lead:</strong> {job.business_team_lead_name || "Not provided"}<br />
                  <strong>Cleaner/team phone:</strong> {job.business_team_lead_phone || "Not provided"}<br />
                  <strong>Property:</strong> {job.property_type || "Property type not set"}{job.bedrooms !== null && job.bedrooms !== undefined ? `, ${job.bedrooms} bedroom(s)` : ""}{job.bathrooms !== null && job.bathrooms !== undefined ? `, ${job.bathrooms} bathroom(s)` : ""}<br />
                  <strong>Condition:</strong> {job.condition_level || "Not provided"}<br />
                  <strong>Extras:</strong> {job.extras || "None"}<br />
                  <strong>Pets:</strong> {job.pets_at_property || "Not provided"}
                </p>

                {detailsUnlocked ? (
                  <>
                    <div className="notice">Customer details are unlocked. Only attend if WMC has confirmed the booking is ready to proceed.</div>
                    <p>
                      <strong>Customer notes:</strong> {job.notes || "None"}<br />
                      <strong>Access notes:</strong> {job.access_notes || "None"}<br />
                      <strong>Parking notes:</strong> {job.parking_notes || "None"}
                    </p>
                  </>
                ) : (
                  <div className="notice">The business has been assigned, but full details are held until WMC confirms the job is ready.</div>
                )}

                <div className="actionRow">
                  <a href={`/messages/${encodeURIComponent(job.quote_reference)}`} className="btn btnPrimary">Message customer</a>
                  <button type="button" className="btn btnSecondary" onClick={() => markCompleted(job)}>Mark completed</button>
                  <a href={`/issue/${encodeURIComponent(job.quote_reference)}`} className="btn btnSecondary">Issue options</a>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
