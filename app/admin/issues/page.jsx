"use client";

import React, { useEffect, useMemo, useState } from "react";

function formatDate(value) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function statusLabel(value) {
  if (value === "resolved") return "Resolved";
  if (value === "closed") return "Closed";
  return "Open / payout paused";
}

async function safeJson(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { error: text || "Server returned an invalid response." };
  }
}

export default function AdminIssuesPage() {
  const [password, setPassword] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState("open");
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState("");
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("wmc_admin_password") || "";
    if (stored) {
      setPassword(stored);
      setSavedPassword(stored);
      loadIssues(stored, "open");
    }
  }, []);

  const counts = useMemo(() => {
    return issues.reduce(
      (acc, issue) => {
        acc.total += 1;
        acc[issue.issue_status] = (acc[issue.issue_status] || 0) + 1;
        return acc;
      },
      { total: 0, open: 0, resolved: 0, closed: 0 }
    );
  }, [issues]);

  async function loadIssues(passwordToUse = savedPassword || password, nextStatus = statusFilter) {
    setLoading(true);
    setNotice("");
    setErrorMessage("");

    try {
      const params = nextStatus ? `?status=${encodeURIComponent(nextStatus)}` : "";
      const response = await fetch(`/api/admin/issues${params}`, {
        headers: { "x-wmc-admin-password": passwordToUse }
      });
      const data = await safeJson(response);

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not load issues.");
        return;
      }

      setIssues(data.issues || []);
      setSavedPassword(passwordToUse);
      window.localStorage.setItem("wmc_admin_password", passwordToUse);
      setNotice(`Loaded ${data.issues?.length || 0} issue(s).`);
    } catch (error) {
      setErrorMessage(error?.message || "Could not load issues.");
    } finally {
      setLoading(false);
    }
  }

  async function updateIssue(issue, status) {
    const adminNotes = window.prompt(
      status === "resolved"
        ? "Add a note explaining the resolution:"
        : status === "closed"
          ? "Add a note explaining why this issue is closed:"
          : "Add a note for reopening this issue:",
      issue.admin_notes || ""
    );

    if (adminNotes === null) return;

    setSavingId(issue.id);
    setNotice("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/issues", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-wmc-admin-password": savedPassword || password
        },
        body: JSON.stringify({ id: issue.id, status, adminNotes })
      });

      const data = await safeJson(response);
      if (!response.ok) {
        setErrorMessage(data?.error || "Could not update issue.");
        return;
      }

      setIssues((current) => current.map((item) => (item.id === issue.id ? data.issue : item)));
      setNotice(`Issue updated to ${statusLabel(status)}.`);
    } catch (error) {
      setErrorMessage(error?.message || "Could not update issue.");
    } finally {
      setSavingId("");
    }
  }

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">Admin</p>
          <h1>Customer issues and disputes</h1>
          <p>
            Use this page only when a customer and provider cannot resolve an issue directly. Open issues pause automatic payout until resolved or closed.
          </p>
        </div>

        <div className="card sideCard" style={{ marginBottom: 20 }}>
          <p className="kicker">Admin shortcuts</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a href="/admin/marketplace" className="btn btnPrimary">Marketplace dashboard</a>
            <a href="/admin/issues" className="btn btnSecondary">Issues / disputes</a>
            <a href="/admin/provider-reviews" className="btn btnSecondary">Provider reviews</a>
            <a href="/admin/cleaner-payouts" className="btn btnSecondary">Cleaner payouts</a>
            <a href="/admin/business-payouts" className="btn btnSecondary">Business payouts</a>
          </div>
        </div>

        <div className="card formCard" style={{ marginBottom: 20 }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              loadIssues(password, statusFilter);
            }}
          >
            <label className="field">
              <span>Admin password</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </label>

            <label className="field">
              <span>Issue status</span>
              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  if (savedPassword || password) loadIssues(savedPassword || password, event.target.value);
                }}
              >
                <option value="open">Open issues</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
                <option value="">All issues</option>
              </select>
            </label>

            <div className="actionRow">
              <button className="btn btnPrimary" type="submit" disabled={loading}>{loading ? "Loading..." : "Load issues"}</button>
            </div>
          </form>

          <div className="guideBox" style={{ marginTop: 16 }}>
            <strong>Shown:</strong> {counts.total} issue(s). Open: {counts.open || 0}. Resolved: {counts.resolved || 0}. Closed: {counts.closed || 0}.
          </div>

          {notice && <div className="notice" style={{ marginTop: 18 }}>{notice}</div>}
          {errorMessage && <div className="warningBox" style={{ marginTop: 18 }}>{errorMessage}</div>}
        </div>

        <div className="statusList">
          {issues.map((issue) => (
            <article key={issue.id} className="card infoCard">
              <p className="kicker">{statusLabel(issue.issue_status)}</p>
              <h3>{issue.booking_reference}</h3>
              <p>
                <strong>Type:</strong> {issue.issue_type || "Not provided"}<br />
                <strong>Provider:</strong> {issue.provider_display_name || "Not provided"}<br />
                <strong>Customer:</strong> {issue.reporter_name || "Not provided"} / {issue.reporter_email || "Not provided"}<br />
                <strong>Reported:</strong> {formatDate(issue.created_at)}
              </p>
              <div className="guideBox">
                <strong>Issue details</strong><br />
                <span style={{ whiteSpace: "pre-wrap" }}>{issue.issue_details || "Not provided"}</span>
              </div>
              {issue.admin_notes && (
                <div className="notice">
                  <strong>Admin notes:</strong><br />
                  <span style={{ whiteSpace: "pre-wrap" }}>{issue.admin_notes}</span>
                </div>
              )}
              <div className="actionRow">
                <a href={`/messages/${encodeURIComponent(issue.booking_reference)}`} className="btn btnSecondary">Open messages</a>
                <button type="button" className="btn btnPrimary" disabled={savingId === issue.id} onClick={() => updateIssue(issue, "resolved")}>Mark resolved</button>
                <button type="button" className="btn btnSecondary" disabled={savingId === issue.id} onClick={() => updateIssue(issue, "closed")}>Close</button>
                <button type="button" className="btn btnSecondary" disabled={savingId === issue.id} onClick={() => updateIssue(issue, "open")}>Reopen</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
