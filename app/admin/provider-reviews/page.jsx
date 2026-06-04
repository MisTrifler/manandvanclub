"use client";

import React, { useEffect, useMemo, useState } from "react";

function formatDate(value) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function display(value) {
  return value || "Not provided";
}

function statusLabel(value) {
  if (value === "approved") return "Approved / visible";
  if (value === "hidden") return "Hidden";
  return "Pending review";
}

function providerTypeLabel(value) {
  return value === "business" ? "Business partner" : "Self-employed cleaner partner";
}

function Stars({ rating }) {
  const count = Number(rating || 0);
  return <span>{"★".repeat(count)}{"☆".repeat(Math.max(0, 5 - count))}</span>;
}

async function safeJson(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { error: text || "Server returned an invalid response." };
  }
}

export default function AdminProviderReviewsPage() {
  const [password, setPassword] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [reviews, setReviews] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState("");
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("wmc_admin_password") || "";
    if (stored) {
      setPassword(stored);
      setSavedPassword(stored);
      loadReviews(stored, "");
    }
  }, []);

  const counts = useMemo(() => {
    return reviews.reduce(
      (acc, review) => {
        acc.total += 1;
        acc[review.status] = (acc[review.status] || 0) + 1;
        return acc;
      },
      { total: 0, pending: 0, approved: 0, hidden: 0 }
    );
  }, [reviews]);

  async function loadReviews(passwordToUse = savedPassword || password, nextStatus = statusFilter) {
    setLoading(true);
    setNotice("");
    setErrorMessage("");

    try {
      const params = nextStatus ? `?status=${encodeURIComponent(nextStatus)}` : "";
      const response = await fetch(`/api/admin/provider-reviews${params}`, {
        headers: {
          "x-wmc-admin-password": passwordToUse
        }
      });

      const data = await safeJson(response);

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not load provider reviews.");
        return;
      }

      setReviews(data.reviews || []);
      setSavedPassword(passwordToUse);
      window.localStorage.setItem("wmc_admin_password", passwordToUse);
      setNotice(`Loaded ${data.reviews?.length || 0} provider review(s).`);
    } catch (error) {
      setErrorMessage(error?.message || "Could not load provider reviews.");
    } finally {
      setLoading(false);
    }
  }

  async function updateReview(review, status) {
    const adminNotes = window.prompt(
      status === "approved"
        ? "Optional admin note for approving this WMC verified review:"
        : status === "hidden"
          ? "Optional admin note explaining why this review is hidden:"
          : "Optional admin note:",
      review.admin_notes || ""
    );

    if (adminNotes === null) return;

    setSavingId(review.id);
    setNotice("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/provider-reviews", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-wmc-admin-password": savedPassword || password
        },
        body: JSON.stringify({
          id: review.id,
          status,
          adminNotes
        })
      });

      const data = await safeJson(response);

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not update review.");
        return;
      }

      setReviews((current) => current.map((item) => (item.id === review.id ? data.review : item)));
      setNotice(`Review updated to ${statusLabel(status)}.`);
    } catch (error) {
      setErrorMessage(error?.message || "Could not update review.");
    } finally {
      setSavingId("");
    }
  }

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">Admin</p>
          <h1>Provider reviews</h1>
          <p>
            Review and approve WMC verified reviews from completed bookings. Reviews are only shown as WMC verified once approved.
          </p>
        </div>

        <div className="card sideCard" style={{ marginBottom: 20 }}>
          <p className="kicker">Admin shortcuts</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a href="/admin/marketplace" className="btn btnPrimary">Marketplace dashboard</a>
            <a href="/admin/provider-reviews" className="btn btnSecondary">Provider reviews</a>
            <a href="/admin/issues" className="btn btnSecondary">Issues / disputes</a>
            <a href="/admin/cleaner-applications" className="btn btnSecondary">Cleaner applications</a>
            <a href="/admin/cleaner-payouts" className="btn btnSecondary">Cleaner payouts</a>
            <a href="/admin/business-partners" className="btn btnSecondary">Business partners</a>
            <a href="/admin/business-payouts" className="btn btnSecondary">Business payouts</a>
          </div>
        </div>

        <div className="card formCard" style={{ marginBottom: 20 }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              loadReviews(password, statusFilter);
            }}
          >
            <label className="field">
              <span>Admin password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            <label className="field">
              <span>Review status</span>
              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  if (savedPassword || password) loadReviews(savedPassword || password, event.target.value);
                }}
              >
                <option value="">All reviews</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="hidden">Hidden</option>
              </select>
            </label>

            <button className="btn btnPrimary" type="submit" disabled={loading}>
              {loading ? "Loading reviews..." : "Load provider reviews"}
            </button>
          </form>
        </div>

        {notice && <div className="notice">{notice}</div>}
        {errorMessage && <div className="warningBox">{errorMessage}</div>}

        <div className="guideBox" style={{ marginBottom: 20 }}>
          <strong>Total:</strong> {counts.total} &nbsp; | &nbsp;
          <strong>Pending:</strong> {counts.pending || 0} &nbsp; | &nbsp;
          <strong>Approved:</strong> {counts.approved || 0} &nbsp; | &nbsp;
          <strong>Hidden:</strong> {counts.hidden || 0}
        </div>

        <div className="statusList">
          {reviews.map((review) => (
            <article key={review.id} className="card infoCard">
              <p className="kicker">{statusLabel(review.status)}</p>
              <h2>{display(review.provider_display_name)}</h2>
              <p>
                <strong>Rating:</strong> <Stars rating={review.rating} /> ({review.rating}/5)
                <br />
                <strong>Provider type:</strong> {providerTypeLabel(review.provider_type)}
                <br />
                <strong>Booking:</strong> {display(review.booking_reference)}
                <br />
                <strong>Service:</strong> {display(review.service_type)}
                <br />
                <strong>Area:</strong> {display(review.area_town)}
                <br />
                <strong>Submitted:</strong> {formatDate(review.created_at)}
                <br />
                <strong>Would recommend:</strong> {review.would_recommend === true ? "Yes" : review.would_recommend === false ? "No" : "Not provided"}
              </p>

              <div className="guideBox" style={{ whiteSpace: "pre-wrap" }}>
                <strong>Customer review</strong>
                <br />
                {display(review.review_text)}
              </div>

              {review.issue_raised && (
                <div className="warningBox" style={{ whiteSpace: "pre-wrap" }}>
                  <strong>Customer reported an unresolved issue</strong>
                  <br />
                  {display(review.issue_details)}
                </div>
              )}

              <p>
                <strong>Customer:</strong> {display(review.customer_name)} / {display(review.customer_email)} / {display(review.customer_phone)}
              </p>

              {review.admin_notes && (
                <div className="guideBox" style={{ whiteSpace: "pre-wrap" }}>
                  <strong>Admin notes</strong>
                  <br />
                  {review.admin_notes}
                </div>
              )}

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <button
                  className="btn btnPrimary"
                  type="button"
                  disabled={savingId === review.id || review.status === "approved"}
                  onClick={() => updateReview(review, "approved")}
                >
                  Approve review
                </button>
                <button
                  className="btn btnSecondary"
                  type="button"
                  disabled={savingId === review.id || review.status === "hidden"}
                  onClick={() => updateReview(review, "hidden")}
                >
                  Hide review
                </button>
                <button
                  className="btn btnSecondary"
                  type="button"
                  disabled={savingId === review.id || review.status === "pending"}
                  onClick={() => updateReview(review, "pending")}
                >
                  Move to pending
                </button>
              </div>
            </article>
          ))}
        </div>

        {!loading && reviews.length === 0 && (
          <div className="notice">No provider reviews found for this filter yet.</div>
        )}
      </section>
    </main>
  );
}
