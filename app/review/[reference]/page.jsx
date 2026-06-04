"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

function formatDate(value) {
  if (!value) return "Date not set";
  const raw = String(value).trim();
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  const date = match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

function Stars({ value, onChange, disabled }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={star <= Number(value || 0) ? "btn btnPrimary" : "btn btnSecondary"}
          disabled={disabled}
          onClick={() => onChange(star)}
          aria-label={`${star} star${star === 1 ? "" : "s"}`}
          style={{ minWidth: 48, paddingInline: 12 }}
        >
          {star} ★
        </button>
      ))}
    </div>
  );
}

export default function ReviewPage() {
  const params = useParams();
  const reference = useMemo(() => decodeURIComponent(String(params?.reference || "")).toUpperCase(), [params]);

  const [phone, setPhone] = useState("");
  const [job, setJob] = useState(null);
  const [existingReview, setExistingReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState("");
  const [issueRaised, setIssueRaised] = useState(false);
  const [issueDetails, setIssueDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedPhone = window.localStorage.getItem(`wmc_review_phone_${reference}`) || "";
    if (savedPhone) setPhone(savedPhone);
  }, [reference]);

  async function loadReview(event) {
    if (event) event.preventDefault();

    setLoading(true);
    setNotice("");
    setErrorMessage("");
    setJob(null);
    setExistingReview(null);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "load", reference, phone })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not load this review request.");
        return;
      }

      setJob(data.job);
      setExistingReview(data.review || null);
      window.localStorage.setItem(`wmc_review_phone_${reference}`, phone);

      if (data.review) {
        setNotice("A WMC verified review has already been submitted for this booking. Thank you.");
      }
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong loading this review request.");
    } finally {
      setLoading(false);
    }
  }

  async function submitReview(event) {
    event.preventDefault();

    setSubmitting(true);
    setNotice("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit",
          reference,
          phone,
          rating,
          reviewText,
          wouldRecommend,
          issueRaised,
          issueDetails
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not submit your review.");
        return;
      }

      setExistingReview(data.review || { rating, review_text: reviewText, status: "pending" });
      setNotice(
        issueRaised
          ? "Thank you. Your review and issue details have been received. WMC may contact you if more information is needed."
          : "Thank you. Your WMC verified review has been received and will help future customers choose trusted providers."
      );
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong submitting your review.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">WMC verified review</p>
          <h1>Review your selected cleaning provider.</h1>
          <p>
            Reviews can only be submitted for bookings completed through West Midlands Cleaner. Your review helps customers compare approved independent providers fairly.
          </p>
        </div>

        <div className="card formCard" style={{ marginBottom: 24 }}>
          <h2>Find your booking</h2>
          <p className="notice">
            Booking reference: <strong>{reference || "Not provided"}</strong>
          </p>

          <form onSubmit={loadReview}>
            <label className="field">
              <span>Phone number used on the booking</span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Example: 07XXXXXXXXX"
                required
              />
            </label>

            <button className="btn btnPrimary" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Continue"}
            </button>
          </form>
        </div>

        {errorMessage && <div className="warningBox">{errorMessage}</div>}
        {notice && <div className="notice">{notice}</div>}

        {job && (
          <div className="card sideCard" style={{ marginBottom: 24 }}>
            <h2>Booking reviewed</h2>
            <p>
              <strong>Service:</strong> {job.service_type || "Cleaning service"}
              <br />
              <strong>Provider:</strong> {job.provider_display_name || "Selected approved provider"}
              <br />
              <strong>Provider type:</strong> {job.provider_type_label || "Approved provider"}
              <br />
              <strong>Area:</strong> {job.area_town || "Area not provided"}
              <br />
              <strong>Date:</strong> {formatDate(job.preferred_date)}
            </p>
            <div className="guideBox">
              Only WMC verified reviews from completed WMC bookings are collected here. Outside Google or third-party reviews are not used for WMC provider ratings.
            </div>
          </div>
        )}

        {job && !existingReview && (
          <form className="card formCard" onSubmit={submitReview}>
            <h2>Your review</h2>

            <label className="field">
              <span>Overall rating *</span>
              <Stars value={rating} onChange={setRating} disabled={submitting} />
            </label>

            <label className="field">
              <span>Written review *</span>
              <textarea
                rows="5"
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                placeholder="Tell future customers about the service, communication, reliability and quality of the clean."
                required
              />
            </label>

            <label className="field">
              <span>Would you recommend this provider?</span>
              <select value={wouldRecommend} onChange={(event) => setWouldRecommend(event.target.value)} required>
                <option value="">Please choose</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={issueRaised}
                onChange={(event) => setIssueRaised(event.target.checked)}
              />
              <span>I need WMC to know about an unresolved issue with this booking.</span>
            </label>

            {issueRaised && (
              <label className="field">
                <span>Issue details</span>
                <textarea
                  rows="4"
                  value={issueDetails}
                  onChange={(event) => setIssueDetails(event.target.value)}
                  placeholder="Please explain what happened. WMC may review this before payout or before publishing the review."
                />
              </label>
            )}

            <div className="guideBox">
              Reviews are checked by WMC before being shown publicly. If you report an unresolved issue, WMC may contact you and may pause provider payout while the issue is reviewed.
            </div>

            <button className="btn btnPrimary" type="submit" disabled={submitting || Number(rating) < 1}>
              {submitting ? "Submitting review..." : "Submit WMC verified review"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
