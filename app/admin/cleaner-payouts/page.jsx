"use client";

import React, { useMemo, useState } from "react";

function money(value) {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP"
  }).format(amount);
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
    return {
      error: text || "Server returned an empty or invalid response."
    };
  }
}

export default function AdminCleanerPayoutsPage() {
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
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 50);
  }

  function setCardMessage(jobId, text, type = "notice") {
    setCardMessages((current) => ({
      ...current,
      [jobId]: {
        text,
        type
      }
    }));
  }

  async function loadPayoutJobs(event) {
    if (event) event.preventDefault();

    setLoading(true);
    setMessage("");
    setCardMessages({});

    try {
      const response = await fetch("/api/admin/cleaner-payouts", {
        method: "GET",
        headers: {
          "x-admin-password": password
        }
      });

      const data = await safeJson(response);

      if (!response.ok) {
        showMessage(data?.error || "Could not load cleaner payout jobs.", "error");
        setIsUnlocked(false);
        return;
      }

      setJobs(data.jobs || []);
      setIsUnlocked(true);
      showMessage(
        `Loaded ${data.jobs?.length || 0} manual backup payout-ready job(s).`,
        "notice"
      );
    } catch (error) {
      showMessage(error?.message || "Could not load cleaner payout jobs.", "error");
    } finally {
      setLoading(false);
    }
  }

  async function payCleaner(job) {
    const cleanerName = job.cleaner?.fullName || job.cleaner?.businessName || "cleaner partner";

    const firstConfirmation = window.confirm(
      [
        `Manual backup cleaner payout check`,
        ``,
        `Cleaner: ${cleanerName}`,
        `Booking: ${job.reference}`,
        `Amount: ${money(job.cleanerPayout)}`,
        ``,
        `Only continue if:`,
        `1. The customer has paid WMC.`,
        `2. The job is completed.`,
        `3. You have checked there are no issues/refund disputes.`,
        `4. You are happy to release the cleaner fee now.`,
        ``,
        `Do you want to continue?`
      ].join("\n")
    );

    if (!firstConfirmation) return;

    const finalConfirmation = window.confirm(
      `Final confirmation: send ${money(job.cleanerPayout)} to ${cleanerName} now? This creates a real Stripe transfer and cannot be undone from this page.`
    );

    if (!finalConfirmation) return;

    setPayingJobId(job.id);
    setMessage("");
    setCardMessage(job.id, "Sending manual backup Stripe transfer now. Please wait...", "notice");

    try {
      const response = await fetch("/api/admin/cleaner-payouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password
        },
        body: JSON.stringify({
          jobId: job.id,
          adminNotes: `Manual backup cleaner payout released for ${job.reference}`
        })
      });

      const data = await safeJson(response);

      if (!response.ok) {
        const errorText = data?.error || "Cleaner payout failed.";
        setCardMessage(job.id, errorText, "error");
        showMessage(errorText, "error");
        alert(`Cleaner payout failed:\n\n${errorText}`);
        return;
      }

      setJobs((current) => current.filter((item) => item.id !== job.id));

      const successText = `Manual backup cleaner payout sent successfully. Stripe transfer: ${data.stripeTransferId}`;
      setCardMessage(job.id, successText, "success");
      showMessage(successText, "success");
      alert(successText);
    } catch (error) {
      const errorText = error?.message || "Cleaner payout failed.";
      setCardMessage(job.id, errorText, "error");
      showMessage(errorText, "error");
      alert(`Cleaner payout failed:\n\n${errorText}`);
    } finally {
      setPayingJobId("");
    }
  }

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return jobs;

    return jobs.filter((job) => {
      return [
        job.reference,
        job.service,
        job.customerName,
        job.customerPhone,
        job.customerEmail,
        job.area,
        job.cleaner?.fullName,
        job.cleaner?.businessName,
        job.cleaner?.phone,
        job.cleaner?.email
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [jobs, search]);

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">WMC admin</p>
          <h1>Cleaner payouts.</h1>
          <p className="lead">
            Cleaner payouts can be released automatically after the 48-hour issue window once the customer has paid,
            the job is completed, the job is marked payout ready and no issue is open. This page remains
            available as a manual backup if you need to release an approved cleaner fee yourself.
          </p>
        </div>

        <div className="warningBox" style={{ marginBottom: 24 }}>
          <strong>Automatic payout rule.</strong>
          <br />
          Approved cleaner payouts are normally released by WMC after a 48-hour issue window following
          completion and payout-ready approval, provided there is no customer complaint, refund issue,
          missing information or dispute. Stripe Express then pays the cleaner bank according to their Stripe payout schedule.
          Manual payout remains available here as a backup.
        </div>

        <div className="notice" style={{ marginBottom: 24 }}>
          <strong>Recommended WMC payout process:</strong>
          <br />
          1. Customer pays WMC.
          <br />
          2. Cleaner completes the job.
          <br />
          3. You mark the job completed.
          <br />
          4. You mark the job payout ready.
          <br />
          5. The 48-hour issue window starts from the payout-ready/completion timestamp.
          <br />
          6. If no issue is open, the automatic payout route can release the cleaner fee. Use this page only as a manual backup.
        </div>

        {message && (
          <div
            className={
              messageType === "error"
                ? "warningBox"
                : messageType === "success"
                  ? "notice"
                  : "notice"
            }
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
                {loading ? "Loading manual backup payout jobs..." : "Load manual backup payout-ready jobs"}
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
              <h2>Manual backup payout-ready jobs.</h2>

              <label className="field">
                <span>Search by booking, cleaner, customer or area</span>
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
                <h2>No manual backup payout-ready jobs found.</h2>
                <p>
                  Jobs will only appear here when they are paid by the customer, assigned to a
                  cleaner, marked completed, marked payout ready, and not already paid out.
                </p>
              </section>
            ) : (
              <section className="adminApplicationGrid">
                {filteredJobs.map((job) => {
                  const cleanerReady =
                    job.cleaner?.stripeAccountId &&
                    job.cleaner?.stripePayoutsEnabled &&
                    job.cleaner?.stripeDetailsSubmitted;

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
                          Manual backup payout: {money(job.cleanerPayout)}
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
                          <strong>Cleaner partner</strong>
                          <br />
                          {display(job.cleaner?.fullName)}
                          <br />
                          {display(job.cleaner?.businessName)}
                          <br />
                          {display(job.cleaner?.phone)}
                          <br />
                          {display(job.cleaner?.email)}
                        </div>

                        <div className="guideBox">
                          <strong>Customer paid</strong>
                          <br />
                          {money(job.customerPrice)}
                          <br />
                          Payment status: {display(job.paymentStatus)}
                        </div>

                        <div className="guideBox">
                          <strong>Job readiness</strong>
                          <br />
                          Job status: {display(job.jobStatus)}
                          <br />
                          General status: {display(job.status)}
                          <br />
                          Payout status: {display(job.payoutStatus)}
                          <br />
                          Completed at: {formatDate(job.completedAt)}
                          <br />
                          Payout ready at: {formatDate(job.payoutReadyAt)}
                          <br />
                          Payout ready age:{" "}
                          {job.payoutReadyAgeDays === null || job.payoutReadyAgeDays === undefined
                            ? "Not recorded"
                            : `${job.payoutReadyAgeDays} day(s)`}
                        </div>

                        <div className="guideBox">
                          <strong>Stripe payout readiness</strong>
                          <br />
                          Stripe account: {display(job.cleaner?.stripeAccountId)}
                          <br />
                          Onboarding: {display(job.cleaner?.stripeOnboardingStatus)}
                          <br />
                          Payouts enabled: {job.cleaner?.stripePayoutsEnabled ? "Yes" : "No"}
                          <br />
                          Details submitted: {job.cleaner?.stripeDetailsSubmitted ? "Yes" : "No"}
                        </div>

                        <div className="guideBox">
                          <strong>Cleaner payout status</strong>
                          <br />
                          Cleaner payout status: {display(job.cleanerPayoutStatus)}
                          <br />
                          Previous transfer: {display(job.cleanerStripeTransferId)}
                          <br />
                          Cleaner paid at: {formatDate(job.cleanerPaidAt)}
                        </div>
                      </div>

                      {!cleanerReady && (
                        <div className="warningBox" style={{ marginTop: 18 }}>
                          This cleaner is not ready for Stripe payouts yet. Go to cleaner
                          applications, refresh their Stripe status, and confirm payouts are enabled
                          before paying.
                        </div>
                      )}

                      <div className="warningBox" style={{ marginTop: 18 }}>
                        <strong>Final manual backup payout check:</strong>
                        <br />
                        Only click the button below if the job is completed, the customer has not
                        raised an issue, and you are happy to release the cleaner fee. This creates a
                        real Stripe transfer to the cleaner’s connected account.
                      </div>

                      <div className="actionRow">
                        <button
                          type="button"
                          className="btn btnPrimary"
                          onClick={() => payCleaner(job)}
                          disabled={!cleanerReady || payingJobId === job.id}
                        >
                          {payingJobId === job.id
                            ? "Sending manual Stripe transfer..."
                            : `Manually pay cleaner ${money(job.cleanerPayout)}`}
                        </button>
                      </div>
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
