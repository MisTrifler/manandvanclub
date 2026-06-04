"use client";

import React, { useEffect, useState } from "react";

function formatStatus(value) {
  return String(value || "not_set").replaceAll("_", " ");
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

export default function CleanerMyJobsPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cleaner, setCleaner] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedEmail = window.localStorage.getItem("wmc_cleaner_email") || "";
    const savedPhone = window.localStorage.getItem("wmc_cleaner_phone") || "";

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
          providerType: "cleaner",
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

  async function loadMyJobs(event) {
    if (event) event.preventDefault();

    setLoading(true);
    setNotice("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/cleaner/my-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, phone })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not load your assigned jobs.");
        setCleaner(null);
        setJobs([]);
        setLoading(false);
        return;
      }

      setCleaner(data.cleaner);
      setJobs(data.jobs || []);

      window.localStorage.setItem("wmc_cleaner_email", email);
      window.localStorage.setItem("wmc_cleaner_phone", phone);

      if ((data.jobs || []).length === 0) {
        setNotice("You do not have any assigned bookings yet.");
      }
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong loading your jobs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">Cleaner partner portal</p>
          <h1>My assigned bookings.</h1>
          <p>
            View bookings where the customer has selected your quote and payment has been confirmed.
            Full customer details are only shown for confirmed assigned bookings.
          </p>
        </div>

        <div className="notice">
          These are booking opportunities assigned to you as an independent self-employed cleaner
          partner. You are not an employee of West Midlands Cleaner, and there are no guaranteed
          hours, wages or shifts.
        </div>

        <div className="guideBox" style={{ marginTop: 18, marginBottom: 24 }}>
          <strong>Important partner expectations:</strong> Please attend only bookings confirmed by WMC. Cleaner payouts are normally released by WMC after a 48-hour issue window following job completion and approval, provided customer payment has been received and there is no unresolved complaint, refund issue, missing information or dispute. Once released, Stripe Express pays the cleaner bank according to its Stripe payout schedule. Travel, parking and clean air zone charges are not automatically covered unless WMC confirms this before the booking. Do not agree extra paid work directly with the customer without WMC approval.
        </div>

        <StatusLegend />

        <div className="grid3" style={{ marginBottom: 24 }}>
          <div className="card miniCard">
            <p className="kicker">Before attending</p>
            <h3>Check the full details.</h3>
            <p>Confirm the date, time, address, access notes, service type and customer messages.</p>
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
          <h2>Cleaner access</h2>

          <form onSubmit={loadMyJobs}>
            <div className="formGrid">
              <label className="field">
                <span>Approved cleaner email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email used on your cleaner application"
                />
              </label>

              <label className="field">
                <span>Approved cleaner phone</span>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Phone used on your cleaner application"
                />
              </label>
            </div>

            <div className="actionRow">
              <button type="submit" className="btn btnPrimary" disabled={loading}>
                {loading ? "Loading..." : "View my assigned jobs"}
              </button>

              <a href="/cleaner/jobs" className="btn btnSecondary">
                Available jobs
              </a>
            </div>
          </form>

          {cleaner && (
            <div className="guideBox" style={{ marginTop: 18 }}>
              Logged in as: <strong>{cleaner.full_name}</strong>
              {cleaner.business_name ? ` / ${cleaner.business_name}` : ""}
            </div>
          )}

          {notice && (
            <div className="notice" style={{ marginTop: 18 }}>
              {notice}
            </div>
          )}

          {errorMessage && (
            <div className="warningBox" style={{ marginTop: 18 }}>
              {errorMessage}
            </div>
          )}
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
                  <strong>Status:</strong> {formatStatus(job.job_status)}
                  <br />
                  <strong>Payment:</strong> {formatStatus(job.payment_status)}
                  <br />
                  <strong>Cleaner payout:</strong> £{job.cleaner_payout || "0.00"}
                  <br />
                  <strong>Estimated hours:</strong> {job.estimated_hours || "Not set"}
                </div>

                {!detailsUnlocked && (
                  <div className="warningBox">
                    Customer contact details, full address, access notes and parking notes are locked
                    until customer payment is confirmed by WMC. Do not attend until WMC confirms and releases the final details.
                  </div>
                )}

                {detailsUnlocked ? (
                  <div>
                    <p>
                      <strong>Customer:</strong> {job.customer_name || "Not provided"}
                      <br />
                      <strong>Customer phone:</strong> {job.customer_phone || "Not provided"}
                      <br />
                      <strong>Customer email:</strong> {job.customer_email || "Not provided"}
                      <br />
                      <strong>Area / town:</strong> {job.area_town || "Not provided"}
                      <br />
                      <strong>Postcode:</strong> {job.postcode || "Not provided"}
                      <br />
                      <strong>Date/time:</strong> {job.preferred_date || "Date not set"} at{" "}
                      {job.preferred_time || "Time not set"}
                    </p>
                  </div>
                ) : (
                  <p>
                    <strong>Area:</strong> Hidden until payment confirmed
                    <br />
                    <strong>Postcode area:</strong> {job.postcode_area}
                    <br />
                    <strong>Date/time:</strong> {job.preferred_date || "Date not set"} at{" "}
                    {job.preferred_time || "Time not set"}
                  </p>
                )}

                <p>
                  <strong>Property:</strong> {job.property_type || "Property type not set"}
                  {job.bedrooms !== null && job.bedrooms !== undefined ? `, ${job.bedrooms} bedrooms` : ""}
                  {job.bathrooms !== null && job.bathrooms !== undefined ? `, ${job.bathrooms} bathrooms` : ""}
                  <br />
                  <strong>Condition:</strong> {job.condition_level || "Not provided"}
                  <br />
                  <strong>Extras:</strong> {job.extras || "None"}
                  <br />
                  <strong>Pets:</strong> {job.pets_at_property || "Not provided"}
                </p>

                {detailsUnlocked ? (
                  <>
                    <div className="notice">
                      Customer details are unlocked because payment is marked as paid. Only attend
                      if WMC has confirmed the booking is ready to proceed.
                    </div>

                    <p>
                      <strong>Customer notes:</strong> {job.notes || "None"}
                      <br />
                      <strong>Access notes:</strong> {job.access_notes || "None"}
                      <br />
                      <strong>Parking notes:</strong> {job.parking_notes || "None"}
                    </p>
                  </>
                ) : (
                  <div className="notice">
                    You have been assigned, but full details are held until payment is confirmed.
                    Contact WMC if you need an update.
                  </div>
                )}

                <div className="actionRow">
                  <a href={`/messages/${encodeURIComponent(job.quote_reference)}`} className="btn btnPrimary">
                    Message customer
                  </a>
                  <button type="button" className="btn btnSecondary" onClick={() => markCompleted(job)}>
                    Mark completed
                  </button>
                  <a href={`/issue/${encodeURIComponent(job.quote_reference)}`} className="btn btnSecondary">
                    Issue options
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {!loading && cleaner && jobs.length === 0 && (
          <div className="notice" style={{ marginTop: 24 }}>
            You have no assigned bookings yet. Check available jobs or wait for WMC to assign a
            booking to you.
          </div>
        )}
      </section>
    </main>
  );
}
