"use client";

import React, { useMemo, useState } from "react";

function money(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP"
  }).format(Number(value || 0));
}

function display(value) {
  return value || "Not provided";
}

function formatDate(value) {
  if (!value) return "Not set";

  try {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date(value));
  } catch {
    return value;
  }
}

async function safeJson(response) {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    return { error: text || "Server returned an empty or invalid response." };
  }
}

export default function AdminBusinessPayoutsPage() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payingJobId, setPayingJobId] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("notice");
  const [search, setSearch] = useState("");
  const [cardMessages, setCardMessages] = useState({});

  function showMessage(text, type = "notice") {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  }

  function setCardMessage(jobId, text, type = "notice") {
    setCardMessages((current) => ({
      ...current,
      [jobId]: { text, type }
    }));
  }

  async function loadPayoutJobs(event) {
    if (event) event.preventDefault();

    setLoading(true);
    setMessage("");
    setCardMessages({});

    try {
      const response = await fetch("/api/admin/business-payouts", {
        method: "GET",
        headers: {
          "x-admin-password": password,
          "x-wmc-admin-password": password
        }
      });

      const data = await safeJson(response);

      if (!response.ok) {
        showMessage(data?.error || "Could not load business payout jobs.", "error");
        setIsUnlocked(false);
        return;
      }

      setJobs(data.jobs || []);
      setIsUnlocked(true);
      showMessage(`Loaded ${data.jobs?.length || 0} manual backup business payout-ready job(s).`);
    } catch (error) {
      showMessage(error?.message || "Could not load business payout jobs.", "error");
    } finally {
      setLoading(false);
    }
  }

  async function payBusiness(job) {
    const businessName =
      job.business?.tradingName ||
      job.business?.businessName ||
      "business partner";

    const firstConfirmation = window.confirm(
      [
        "Manual backup business payout check",
        "",
        `Business: ${businessName}`,
        `Booking: ${job.reference}`,
        `Amount: ${money(job.businessPayout)}`,
        "",
        "Only continue if:",
        "1. The customer has paid WMC.",
        "2. The job is completed.",
        "3. You have checked there are no issues/refund disputes.",
        "4. You are happy to release the business payout now.",
        "",
        "Do you want to continue?"
      ].join("\n")
    );

    if (!firstConfirmation) return;

    const finalConfirmation = window.confirm(
      `Final confirmation: send ${money(job.businessPayout)} to ${businessName} now? This creates a real Stripe transfer and cannot be undone from this page.`
    );

    if (!finalConfirmation) return;

    setPayingJobId(job.id);
    setMessage("");
    setCardMessage(job.id, "Sending manual backup Stripe transfer now. Please wait...", "notice");

    try {
      const response = await fetch("/api/admin/business-payouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
          "x-wmc-admin-password": password
        },
        body: JSON.stringify({
          jobId: job.id,
          adminNotes: `Manual backup business payout released for ${job.reference}`
        })
      });

      const data = await safeJson(response);

      if (!response.ok) {
        const errorText = data?.error || "Business payout failed.";
        setCardMessage(job.id, errorText, "error");
        showMessage(errorText, "error");
        alert(`Business payout failed:\n\n${errorText}`);
        return;
      }

      setJobs((current) => current.filter((item) => item.id !== job.id));

      const successText = `Manual backup business payout sent successfully. Stripe transfer: ${data.stripeTransferId}`;
      setCardMessage(job.id, successText, "success");
      showMessage(successText, "success");
      alert(successText);
    } catch (error) {
      const errorText = error?.message || "Business payout failed.";
      setCardMessage(job.id, errorText, "error");
      showMessage(errorText, "error");
      alert(`Business payout failed:\n\n${errorText}`);
    } finally {
      setPayingJobId("");
    }
  }

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return jobs;

    return jobs.filter((job) =>
      [
        job.reference,
        job.service,
        job.customerName,
        job.customerPhone,
        job.customerEmail,
        job.area,
        job.business?.businessName,
        job.business?.tradingName,
        job.business?.contactName,
        job.business?.phone,
        job.business?.email
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [jobs, search]);

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">WMC admin</p>
          <h1>Business payouts.</h1>
          <p className="lead">
            Business payouts can be released automatically after the 48-hour issue window once the customer has paid,
            the job is completed, the job is marked payout ready and no issue is open. This page remains
            available as a manual backup if you need to release an approved business payout yourself.
          </p>
        </div>

        <div className="warningBox" style={{ marginBottom: 24 }}>
          <strong>Automatic payout rule.</strong>
          <br />
          Approved business payouts are normally released by WMC after a 48-hour issue window following
          completion and payout-ready approval, provided there is no customer complaint, refund issue,
          missing information or dispute. Stripe Express then pays the business bank according to its Stripe payout schedule.
          Manual payout remains available here as a backup.
        </div>

        <div className="notice" style={{ marginBottom: 24 }}>
          <strong>Recommended WMC business payout process:</strong>
          <br />
          1. Customer pays WMC.
          <br />
          2. Business/team completes the job.
          <br />
          3. You mark the job completed.
          <br />
          4. You mark the job payout ready.
          <br />
          5. The 48-hour issue window starts from the payout-ready/completion timestamp.
          <br />
          6. If no issue is open, the automatic payout route can release the business payout. Use this page only as a manual backup.
        </div>

        {message && (
          <div
            className={messageType === "error" ? "warningBox" : "notice"}
            style={{ marginBottom: 24 }}
          >
            <strong>{messageType === "error" ? "Error: " : ""}</strong>
            {message}
          </div>
        )}

        <section className="card formCard" style={{ marginBottom: 26 }}>
          <h2>Admin access</h2>

          <form onSubmit={loadPayoutJobs} className="formGrid">
            <label className="field">
              <span>Admin password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
              />
            </label>

            <div className="field">
              <span>&nbsp;</span>
              <button type="submit" className="btn btnPrimary" disabled={loading}>
                {loading ? "Loading manual backup business payout jobs..." : "Load manual backup business payout-ready jobs"}
              </button>
            </div>
          </form>

        </section>



        <div className="guideBox" style={{ marginBottom: 18 }}>
          <p className="kicker">Admin shortcuts</p>
          <h2>Everything in one place</h2>
          <div className="actionRow">
            <a href="/admin/marketplace" className="btn btnPrimary">Marketplace dashboard</a>
            <a href="/admin/cleaner-applications" className="btn btnSecondary">Cleaner applications</a>
            <a href="/admin/cleaner-payouts" className="btn btnSecondary">Cleaner payouts</a>
            <a href="/admin/business-partners" className="btn btnSecondary">Business partners</a>
            <a href="/admin/business-payouts" className="btn btnSecondary">Business payouts</a>
            <a href="/cleaner/jobs" className="btn btnSecondary">Cleaner available jobs</a>
            <a href="/cleaner/my-jobs" className="btn btnSecondary">Cleaner assigned jobs</a>
            <a href="/business/jobs" className="btn btnSecondary">Business available jobs</a>
            <a href="/business/my-jobs" className="btn btnSecondary">Business assigned jobs</a>
          </div>
        </div>

        {isUnlocked && (
          <>
            <section className="card sideCard" style={{ marginBottom: 26 }}>
              <p className="kicker">Payout search</p>
              <h2>Manual backup business payout-ready jobs.</h2>

              <label className="field">
                <span>Search by booking, business, customer or area</span>
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search payout jobs"
                />
              </label>
            </section>

            {filteredJobs.length === 0 ? (
              <section className="card formCard">
                <h2>No manual backup business payout-ready jobs found.</h2>
                <p>
                  Jobs will only appear here when they are paid by the customer, assigned to a
                  business, marked completed, marked payout ready, and not already paid out.
                </p>
              </section>
            ) : (
              <section className="adminApplicationGrid">
                {filteredJobs.map((job) => {
                  const businessReady =
                    job.business?.stripeAccountId &&
                    job.business?.stripePayoutsEnabled &&
                    job.business?.stripeDetailsSubmitted;

                  const cardMessage = cardMessages[job.id];

                  return (
                    <article key={job.id} className="card formCard adminApplicationCard">
                      <div className="applicationHeader">
                        <div>
                          <p className="kicker">{job.reference}</p>
                          <h2>{job.service}</h2>
                          <p>
                            {display(job.date)} {display(job.time)} · {display(job.area)}
                          </p>
                        </div>

                        <span className="statusPill successPill">
                          Manual backup payout: {money(job.businessPayout)}
                        </span>
                      </div>

                      {cardMessage && (
                        <div
                          className={cardMessage.type === "error" ? "warningBox" : "notice"}
                          style={{ marginTop: 18, marginBottom: 18 }}
                        >
                          <strong>{cardMessage.type === "error" ? "Payout error: " : ""}</strong>
                          {cardMessage.text}
                        </div>
                      )}

                      <div className="adminDetailsGrid">
                        <div className="guideBox">
                          <strong>Customer</strong>
                          <br />
                          {display(job.customerName)}
                          <br />
                          {display(job.customerPhone)}
                          <br />
                          {display(job.customerEmail)}
                        </div>

                        <div className="guideBox">
                          <strong>Business partner</strong>
                          <br />
                          {display(job.business?.businessName)}
                          <br />
                          {display(job.business?.tradingName)}
                          <br />
                          {display(job.business?.phone)}
                          <br />
                          {display(job.business?.email)}
                        </div>

                        <div className="guideBox">
                          <strong>Customer paid</strong>
                          <br />
                          {money(job.customerPrice)}
                          <br />
                          Payment status: {display(job.paymentStatus)}
                        </div>

                        <div className={businessReady ? "notice" : "warningBox"}>
                          <strong>Stripe business payout readiness</strong>
                          <br />
                          Account: {display(job.business?.stripeAccountId)}
                          <br />
                          Onboarding: {display(job.business?.stripeOnboardingStatus)}
                          <br />
                          Details submitted: {job.business?.stripeDetailsSubmitted ? "Yes" : "No"}
                          <br />
                          Payouts enabled: {job.business?.stripePayoutsEnabled ? "Yes" : "No"}
                        </div>
                      </div>

                      <div className="notice" style={{ marginTop: 18 }}>
                        Completed: {display(formatDate(job.completedAt))}
                        <br />
                        Payout ready: {display(formatDate(job.payoutReadyAt))}
                        {job.payoutReadyAgeDays !== null ? ` (${job.payoutReadyAgeDays} day(s) ago)` : ""}
                      </div>

                      <button
                        type="button"
                        className="btn btnPrimary"
                        style={{ marginTop: 18 }}
                        disabled={payingJobId === job.id || !businessReady}
                        onClick={() => payBusiness(job)}
                      >
                        {payingJobId === job.id
                          ? "Sending business payout..."
                          : `Pay business ${money(job.businessPayout)}`}
                      </button>

                      {!businessReady && (
                        <div className="warningBox" style={{ marginTop: 18 }}>
                          Business payout is blocked until the business has completed Stripe onboarding and payouts are enabled.
                        </div>
                      )}
                    </article>
                  );
                })}
              </section>
            )}
          </>
        )}
      </section>
    </main>
  );
}
