"use client";

import React, { useEffect, useMemo, useState } from "react";

function formatDate(value) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(date);
}

function display(value) {
  if (Array.isArray(value)) return value.join(", ") || "Not provided";
  return value || "Not provided";
}

function Stars({ rating }) {
  const value = Number(rating || 0);
  if (!value) return <span>No WMC rating yet</span>;

  const rounded = Math.round(value);
  return (
    <span>
      {"★".repeat(Math.max(0, Math.min(5, rounded)))}
      {"☆".repeat(Math.max(0, 5 - Math.min(5, rounded)))} {value}/5
    </span>
  );
}

async function safeJson(response) {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    return { error: text || "Server returned an empty or invalid response." };
  }
}

export default function ProviderPerformancePage() {
  const [password, setPassword] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [providers, setProviders] = useState([]);
  const [summary, setSummary] = useState(null);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("wmc_admin_password") || "";
    if (stored) {
      setPassword(stored);
      setSavedPassword(stored);
      loadProviders(stored);
    }
  }, []);

  async function loadProviders(passwordToUse = password) {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/provider-performance", {
        headers: { "x-wmc-admin-password": passwordToUse }
      });
      const data = await safeJson(response);

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not load provider performance.");
        return;
      }

      setProviders(data.providers || []);
      setSummary(data.summary || null);
      setSavedPassword(passwordToUse);
      window.localStorage.setItem("wmc_admin_password", passwordToUse);
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong loading provider performance.");
    } finally {
      setLoading(false);
    }
  }

  const filteredProviders = useMemo(() => {
    if (filter === "attention") {
      return providers.filter((provider) => provider.open_issue_count > 0 || provider.low_review_count > 0 || provider.quality_status === "Monitor");
    }

    if (filter === "business") {
      return providers.filter((provider) => provider.provider_type === "business");
    }

    if (filter === "cleaner") {
      return providers.filter((provider) => provider.provider_type === "cleaner");
    }

    if (filter === "reviewed") {
      return providers.filter((provider) => provider.approved_review_count > 0);
    }

    return providers;
  }, [providers, filter]);

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">WMC admin</p>
          <h1>Provider performance dashboard.</h1>
          <p>
            Review provider trust signals, WMC verified ratings, quote conversion and open issue counts.
            This is for oversight only — providers can still quote automatically unless you suspend them.
          </p>
        </div>

        <div className="card formCard" style={{ marginBottom: 22 }}>
          <h2>Admin access</h2>
          <label className="field">
            <span>Admin password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter admin password"
            />
          </label>

          <div className="actionRow">
            <button type="button" className="btn btnPrimary" onClick={() => loadProviders(password)}>
              {loading ? "Loading..." : "Load provider performance"}
            </button>
            <a href="/admin/marketplace" className="btn btnSecondary">Marketplace</a>
            <a href="/admin/provider-reviews" className="btn btnSecondary">Provider reviews</a>
            <a href="/admin/issues" className="btn btnSecondary">Issues</a>
          </div>

          {errorMessage && (
            <div className="warningBox" style={{ marginTop: 16 }}>
              {errorMessage}
            </div>
          )}
        </div>

        {summary && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 22 }}>
            <div className="notice" style={{ margin: 0 }}>
              <strong>{summary.total_providers || 0}</strong>
              <span>Total providers</span>
            </div>
            <div className="notice" style={{ margin: 0 }}>
              <strong>{summary.approved_active_providers || 0}</strong>
              <span>Approved/active</span>
            </div>
            <div className="notice" style={{ margin: 0 }}>
              <strong>{summary.providers_with_reviews || 0}</strong>
              <span>With WMC reviews</span>
            </div>
            <div className="notice" style={{ margin: 0 }}>
              <strong>{summary.providers_with_open_issues || 0}</strong>
              <span>With open issues</span>
            </div>
            <div className="notice" style={{ margin: 0 }}>
              <strong>{summary.average_rating ? `${summary.average_rating}/5` : "New"}</strong>
              <span>Average reviewed rating</span>
            </div>
          </div>
        )}

        {providers.length > 0 && (
          <div className="guideBox" style={{ marginBottom: 22 }}>
            <p className="kicker">Filter</p>
            <div className="actionRow">
              <button type="button" className={filter === "all" ? "btn btnPrimary" : "btn btnSecondary"} onClick={() => setFilter("all")}>
                All
              </button>
              <button type="button" className={filter === "attention" ? "btn btnPrimary" : "btn btnSecondary"} onClick={() => setFilter("attention")}>
                Needs attention
              </button>
              <button type="button" className={filter === "business" ? "btn btnPrimary" : "btn btnSecondary"} onClick={() => setFilter("business")}>
                Businesses
              </button>
              <button type="button" className={filter === "cleaner" ? "btn btnPrimary" : "btn btnSecondary"} onClick={() => setFilter("cleaner")}>
                Self-employed cleaners
              </button>
              <button type="button" className={filter === "reviewed" ? "btn btnPrimary" : "btn btnSecondary"} onClick={() => setFilter("reviewed")}>
                Reviewed
              </button>
            </div>
          </div>
        )}

        <div className="statusList">
          {filteredProviders.map((provider) => (
            <article key={`${provider.provider_type}-${provider.id}`} className="card infoCard">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
                <div>
                  <p className="kicker">{provider.provider_type_label}</p>
                  <h2>{provider.display_name}</h2>
                  <p>
                    <strong>Status:</strong> {provider.status}
                    <br />
                    <strong>Active:</strong> {provider.active ? "Yes" : "No"}
                    <br />
                    <strong>Joined:</strong> {formatDate(provider.created_at)}
                  </p>
                </div>

                <div className={provider.open_issue_count > 0 ? "warningBox" : "notice"} style={{ minWidth: 220 }}>
                  <strong>{provider.quality_status}</strong>
                  <br />
                  <Stars rating={provider.average_rating} />
                  <br />
                  {provider.approved_review_count} verified WMC review{provider.approved_review_count === 1 ? "" : "s"}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 14 }}>
                <div className="notice" style={{ margin: 0 }}>
                  <strong>{provider.submitted_quotes}</strong>
                  <span>Quotes submitted</span>
                </div>
                <div className="notice" style={{ margin: 0 }}>
                  <strong>{provider.selected_quotes}</strong>
                  <span>Quotes selected</span>
                </div>
                <div className="notice" style={{ margin: 0 }}>
                  <strong>{provider.quote_conversion_rate}%</strong>
                  <span>Quote conversion</span>
                </div>
                <div className="notice" style={{ margin: 0 }}>
                  <strong>{provider.open_issue_count}</strong>
                  <span>Open issues</span>
                </div>
                <div className="notice" style={{ margin: 0 }}>
                  <strong>{provider.insurance_checked ? "Yes" : "No"}</strong>
                  <span>Insurance checked</span>
                </div>
              </div>

              <div className="actionRow" style={{ marginTop: 14 }}>
                {provider.provider_profile_url && (
                  <a className="btn btnSecondary" href={provider.provider_profile_url} target="_blank" rel="noreferrer">
                    View public provider profile
                  </a>
                )}
              </div>

              <div className="guideBox" style={{ marginTop: 14 }}>
                <strong>Contact</strong>
                <br />
                Email: {provider.email || "Not provided"}
                <br />
                Phone: {provider.phone || "Not provided"}
                <br />
                Services: {display(provider.services)}
                <br />
                Areas: {display(provider.areas)}
              </div>

              {(provider.open_issue_count > 0 || provider.low_review_count > 0) && (
                <div className="warningBox" style={{ marginTop: 14 }}>
                  This provider may need attention. Check open issues, low ratings or hidden reviews before offering more work.
                </div>
              )}
            </article>
          ))}
        </div>

        {!loading && savedPassword && providers.length === 0 && (
          <div className="notice">No providers found yet.</div>
        )}
      </section>
    </main>
  );
}
