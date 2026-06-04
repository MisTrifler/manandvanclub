"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";

async function safeJson(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { error: text || "Server returned an invalid response." };
  }
}

export default function BookingIssuePage() {
  const params = useParams();
  const reference = useMemo(() => decodeURIComponent(String(params?.reference || "")).toUpperCase(), [params]);
  const [phone, setPhone] = useState("");
  const [issueType, setIssueType] = useState("Service issue");
  const [issueDetails, setIssueDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function reportIssue(event) {
    event.preventDefault();
    setSubmitting(true);
    setNotice("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/job-completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "customer_report_issue",
          reference,
          phone,
          issueType,
          issueDetails
        })
      });

      const data = await safeJson(response);
      if (!response.ok) {
        setErrorMessage(data?.error || "Could not report issue.");
        return;
      }

      setNotice("Issue reported. Provider payout has been paused while this is reviewed. Please use WMC messages to try to resolve the issue with the provider first; WMC can step in if it remains unresolved.");
      setIssueDetails("");
    } catch (error) {
      setErrorMessage(error?.message || "Could not report issue.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">Report an issue</p>
          <h1>Report a problem with your booking.</h1>
          <p>
            Please try to resolve normal service questions directly with your selected provider through WMC messages first. If there is no solution, report the issue here so WMC can review and pause payout where appropriate.
          </p>
        </div>

        <div className="card formCard">
          <p className="notice">Booking reference: <strong>{reference}</strong></p>
          <form onSubmit={reportIssue}>
            <label className="field">
              <span>Phone number used on booking</span>
              <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Example: 07XXXXXXXXX" required />
            </label>

            <label className="field">
              <span>Issue type</span>
              <select value={issueType} onChange={(event) => setIssueType(event.target.value)}>
                <option value="Service issue">Service issue</option>
                <option value="Provider did not attend">Provider did not attend</option>
                <option value="Damage or loss">Damage or loss</option>
                <option value="Timing or access issue">Timing or access issue</option>
                <option value="Payment or refund issue">Payment or refund issue</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="field">
              <span>Explain the issue</span>
              <textarea rows="6" value={issueDetails} onChange={(event) => setIssueDetails(event.target.value)} placeholder="Explain what happened and what you have already discussed with the provider." required />
            </label>

            <button className="btn btnPrimary" type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Report issue and pause payout"}</button>
          </form>

          {notice && <div className="notice" style={{ marginTop: 18 }}>{notice}</div>}
          {errorMessage && <div className="warningBox" style={{ marginTop: 18 }}>{errorMessage}</div>}
        </div>

        <div className="guideBox" style={{ marginTop: 24 }}>
          <strong>What happens next?</strong> WMC may review platform messages, notes and evidence to help resolve the issue. Provider payout may stay paused while the issue is open.
        </div>
      </section>
    </main>
  );
}
