"use client";

import React, { useEffect, useMemo, useState } from "react";

async function safeJson(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { error: text || "Server returned an empty or invalid response." };
  }
}

function statusText(value) {
  return String(value || "Not set").replaceAll("_", " ");
}

function formatMoney(value) {
  const number = Number(value || 0);
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(number);
}

function isOpenIssue(issue) {
  return issue?.issue_status === "open";
}

function needsAttention(job) {
  return (
    job?.has_open_issue === true ||
    job?.issue_status === "open" ||
    job?.job_status === "dispute" ||
    job?.payment_status === "failed"
  );
}

export default function AdminOverviewPage() {
  const [password, setPassword] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [jobs, setJobs] = useState([]);
  const [issues, setIssues] = useState([]);
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("wmc_admin_password") || "";
    if (stored) {
      setPassword(stored);
      setSavedPassword(stored);
      loadOverview(stored);
    }
  }, []);

  async function loadOverview(passwordToUse = password) {
    setLoading(true);
    setNotice("");
    setErrorMessage("");

    try {
      const headers = { "x-wmc-admin-password": passwordToUse };
      const [jobsResponse, issuesResponse, performanceResponse] = await Promise.all([
        fetch("/api/admin/jobs", { headers }),
        fetch("/api/admin/issues?status=open", { headers }),
        fetch("/api/admin/provider-performance", { headers })
      ]);

      const [jobsData, issuesData, performanceData] = await Promise.all([
        safeJson(jobsResponse),
        safeJson(issuesResponse),
        safeJson(performanceResponse)
      ]);

      if (!jobsResponse.ok) throw new Error(jobsData?.error || "Could not load marketplace jobs.");
      if (!issuesResponse.ok) throw new Error(issuesData?.error || "Could not load open issues.");
      if (!performanceResponse.ok) throw new Error(performanceData?.error || "Could not load provider performance.");

      setJobs(jobsData.jobs || []);
      setIssues(issuesData.issues || []);
      setPerformance(performanceData.summary || null);
      setSavedPassword(passwordToUse);
      window.localStorage.setItem("wmc_admin_password", passwordToUse);
      setNotice("Admin overview loaded.");
    } catch (error) {
      setErrorMessage(error?.message || "Could not load admin overview.");
    } finally {
      setLoading(false);
    }
  }

  const stats = useMemo(() => {
    const list = jobs || [];
    const openIssues = (issues || []).filter(isOpenIssue);
    const unpaid = list.filter((job) => job.payment_status !== "paid");
    const paid = list.filter((job) => job.payment_status === "paid");
    const completed = list.filter((job) => job.job_status === "completed" || job.job_status === "payout_ready");
    const attention = list.filter(needsAttention);
    const awaitingQuotes = list.filter((job) => ["submitted", "needs_review", "available_to_cleaners"].includes(job.job_status));
    const awaitingCustomer = list.filter((job) => ["quote_sent", "customer_accepted", "awaiting_payment"].includes(job.job_status));
    const totalGuide = list.reduce((sum, job) => sum + Number(job.customer_total || job.final_customer_total || job.guide_customer_total || 0), 0);

    return {
      total: list.length,
      unpaid: unpaid.length,
      paid: paid.length,
      completed: completed.length,
      openIssues: openIssues.length,
      attention: attention.length,
      awaitingQuotes: awaitingQuotes.length,
      awaitingCustomer: awaitingCustomer.length,
      totalGuide
    };
  }, [jobs, issues]);

  const recentAttention = useMemo(() => {
    return (jobs || []).filter(needsAttention).slice(0, 6);
  }, [jobs]);

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">Admin overview</p>
          <h1>WMC marketplace control centre.</h1>
          <p>
            Use this page to quickly check marketplace health, open issues, provider performance and
            where to go next. Admin should be oversight only unless a payment, dispute or support
            issue needs action.
          </p>
        </div>

        <div className="card formCard" style={{ marginBottom: 18 }}>
          <h2>Load overview</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              loadOverview(password);
            }}
          >
            <label className="field">
              <span>Admin password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter admin password"
                required
              />
            </label>
            <button className="btn btnPrimary" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Load admin overview"}
            </button>
          </form>

          {notice && <div className="notice" style={{ marginTop: 14 }}>{notice}</div>}
          {errorMessage && <div className="warningBox" style={{ marginTop: 14 }}>{errorMessage}</div>}
        </div>

        <div className="guideBox" style={{ marginBottom: 18 }}>
          <p className="kicker">Admin shortcuts</p>
          <h2>Go straight to the right area.</h2>
          <div className="actionRow">
            <a href="/admin/marketplace" className="btn btnPrimary">Marketplace dashboard</a>
            <a href="/admin/issues" className="btn btnSecondary">Issues / disputes</a>
            <a href="/admin/provider-performance" className="btn btnSecondary">Provider performance</a>
            <a href="/admin/provider-reviews" className="btn btnSecondary">Provider reviews</a>
            <a href="/admin/business-payouts" className="btn btnSecondary">Business payouts</a>
            <a href="/admin/cleaner-payouts" className="btn btnSecondary">Cleaner payouts</a>
          </div>
        </div>

        <div className="grid3" style={{ marginBottom: 24 }}>
          <div className="card infoCard">
            <p className="kicker">Requests</p>
            <h2>{stats.total}</h2>
            <p>Total marketplace jobs loaded.</p>
          </div>
          <div className="card infoCard">
            <p className="kicker">Quotes needed</p>
            <h2>{stats.awaitingQuotes}</h2>
            <p>Requests still waiting for provider quotes or availability.</p>
          </div>
          <div className="card infoCard">
            <p className="kicker">Customer action</p>
            <h2>{stats.awaitingCustomer}</h2>
            <p>Jobs where the customer may need to choose a provider or pay.</p>
          </div>
          <div className="card infoCard">
            <p className="kicker">Paid</p>
            <h2>{stats.paid}</h2>
            <p>Bookings with customer payment marked paid.</p>
          </div>
          <div className="card infoCard">
            <p className="kicker">Open issues</p>
            <h2>{stats.openIssues}</h2>
            <p>Payouts should stay paused while issues are open.</p>
          </div>
          <div className="card infoCard">
            <p className="kicker">Guide value</p>
            <h2>{formatMoney(stats.totalGuide)}</h2>
            <p>Approximate total customer value from loaded jobs.</p>
          </div>
        </div>

        <div className="grid2">
          <article className="card formCard">
            <p className="kicker">Needs attention</p>
            <h2>Disputes or failed statuses.</h2>
            {recentAttention.length === 0 ? (
              <div className="notice">No urgent jobs found in the loaded list.</div>
            ) : (
              <div className="statusList">
                {recentAttention.map((job) => (
                  <div key={job.id} className="statusRow">
                    <span>
                      <strong>{job.quote_reference || job.booking_reference || job.id}</strong>
                      <br />
                      {job.customer_name || "Customer"} — {statusText(job.job_status)}
                    </span>
                    <a href="/admin/issues" className="btn btnSecondary">Review</a>
                  </div>
                ))}
              </div>
            )}
          </article>

          <article className="card formCard">
            <p className="kicker">Provider health</p>
            <h2>Quality overview.</h2>
            <div className="statusList">
              <div className="statusRow">
                <span>Approved/loaded providers</span>
                <strong>{performance?.totalProviders ?? "Load to view"}</strong>
              </div>
              <div className="statusRow">
                <span>Providers needing attention</span>
                <strong>{performance?.attentionNeeded ?? "Load to view"}</strong>
              </div>
              <div className="statusRow">
                <span>Average WMC rating</span>
                <strong>{performance?.averageRating ? `${performance.averageRating}/5` : "No rating yet"}</strong>
              </div>
            </div>
            <div className="actionRow" style={{ marginTop: 14 }}>
              <a href="/admin/provider-performance" className="btn btnPrimary">Open provider performance</a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
