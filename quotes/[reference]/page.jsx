"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

function formatMoney(value) {
  const number = Number(value || 0);
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(number);
}

function formatDate(value) {
  if (!value) return "Date not set";
  const raw = String(value).trim();
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  const date = match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

function formatTime(value) {
  if (!value) return "Time not set";
  const raw = String(value).trim();
  const hourOnly = raw.match(/^(\d{1,2})$/);
  if (hourOnly) return `${hourOnly[1].padStart(2, "0")}:00`;
  const hourMinute = raw.match(/^(\d{1,2}):(\d{2})/);
  if (hourMinute) return `${hourMinute[1].padStart(2, "0")}:${hourMinute[2]}`;
  return raw;
}

function isQuoteSelected(job, quote) {
  return quote.quote_status === "customer_selected" || job?.selected_provider_quote_id === quote.id;
}

function platformFeePercent(quote) {
  const percent = Number(quote?.wmc_fee_percent || 15);
  if (!Number.isFinite(percent) || percent <= 0) return 15;
  return percent;
}

function quoteBadge(index, quote) {
  if (index === 0) return "Recommended by WMC";
  if (Number(quote.wmc_review_count || 0) > 0) return "WMC reviewed";
  if (Number(quote.completed_wmc_jobs || 0) > 0) return "Completed WMC jobs";
  return "Approved provider";
}

function Stars({ rating }) {
  const value = Number(rating || 0);
  if (!value) return <span aria-label="No WMC verified rating yet">New</span>;

  const rounded = Math.round(value);
  return (
    <span aria-label={`${value} out of 5 WMC verified rating`}>
      {"★".repeat(Math.max(0, Math.min(5, rounded)))}
      {"☆".repeat(Math.max(0, 5 - Math.min(5, rounded)))}
    </span>
  );
}

function ProviderTrustCard({ quote }) {
  const profile = quote.provider_profile || {};
  const badges = Array.isArray(profile.badges) ? profile.badges : [];

  return (
    <div className="guideBox" style={{ marginTop: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <p className="kicker" style={{ marginBottom: 6 }}>Provider profile</p>
          <h4 style={{ margin: 0 }}>{profile.display_name || quote.provider_display_name || "Approved provider"}</h4>
          <p style={{ marginTop: 6 }}>{profile.type_label || quote.provider_type_label}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <strong style={{ fontSize: 22 }}>
            <Stars rating={profile.average_rating} />
          </strong>
          <br />
          <span>{profile.trust_label || "New WMC provider"}</span>
        </div>
      </div>

      {profile.headline && <p style={{ marginTop: 12 }}>{profile.headline}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 12 }}>
        <div className="notice" style={{ margin: 0 }}>
          <strong>{profile.completed_count || 0}</strong>
          <span>WMC jobs completed</span>
        </div>
        <div className="notice" style={{ margin: 0 }}>
          <strong>{profile.review_count || 0}</strong>
          <span>Verified WMC reviews</span>
        </div>
        <div className="notice" style={{ margin: 0 }}>
          <strong>{profile.insurance_checked ? "Checked" : "Pending"}</strong>
          <span>Insurance details</span>
        </div>
      </div>

      {badges.length > 0 && (
        <div className="actionRow" style={{ marginTop: 12 }}>
          {badges.map((badge) => (
            <span key={badge} className="pill">{badge}</span>
          ))}
        </div>
      )}

      {quote.provider_profile_url && (
        <div style={{ marginTop: 12 }}>
          <a className="btn btnSecondary" href={quote.provider_profile_url}>
            View provider profile
          </a>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 12 }}>
        <div>
          <strong>Services</strong>
          <p>{profile.services?.length ? profile.services.join(", ") : "Service details shown in quote"}</p>
        </div>
        <div>
          <strong>Areas</strong>
          <p>{profile.areas?.length ? profile.areas.join(", ") : "Area coverage checked by WMC"}</p>
        </div>
        <div>
          <strong>Products/equipment</strong>
          <p>{profile.products_equipment || quote.products_included || "To be confirmed by provider"}</p>
        </div>
      </div>

      {profile.latest_review_text && (
        <div className="notice" style={{ marginTop: 12 }}>
          <strong>Latest WMC verified review:</strong>
          <br />
          “{profile.latest_review_text}”
        </div>
      )}
    </div>
  );
}

function QuoteBreakdown({ quote }) {
  return (
    <div className="guideBox" style={{ marginTop: 14 }}>
      <strong>Quote breakdown</strong>
      <div className="statusList" style={{ marginTop: 10 }}>
        <div className="statusRow">
          <span>Customer price</span>
          <strong>{formatMoney(quote.customer_quote_amount)}</strong>
        </div>
        <div className="statusRow">
          <span>WMC platform fee ({platformFeePercent(quote)}%)</span>
          <strong>{formatMoney(quote.wmc_fee_amount)}</strong>
        </div>
        <div className="statusRow">
          <span>Provider payout</span>
          <strong>{formatMoney(quote.provider_payout_amount)}</strong>
        </div>
      </div>
      <p style={{ marginBottom: 0 }}>
        The WMC platform fee is already included in the quote shown. There is no extra customer charge added on top of this provider quote.
      </p>
    </div>
  );
}

export default function CustomerQuotesPage() {
  const params = useParams();
  const reference = useMemo(() => {
    const raw = params?.reference || "";
    return decodeURIComponent(String(raw || "")).toUpperCase();
  }, [params]);

  const [phone, setPhone] = useState("");
  const [job, setJob] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [choosing, setChoosing] = useState("");
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedPhone = window.localStorage.getItem(`wmc_quote_phone_${reference}`) || "";
    if (savedPhone) setPhone(savedPhone);
  }, [reference]);

  async function loadQuotes(event) {
    if (event) event.preventDefault();

    setLoading(true);
    setNotice("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/customer/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, phone })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not load provider quotes.");
        setJob(null);
        setQuotes([]);
        return;
      }

      setJob(data.job);
      setQuotes(data.quotes || []);
      window.localStorage.setItem(`wmc_quote_phone_${reference}`, phone);

      if ((data.quotes || []).length === 0) {
        setNotice("No provider quotes have been submitted yet. Please check again later. You will receive an email when a provider responds.");
      }
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong loading quotes.");
    } finally {
      setLoading(false);
    }
  }

  async function confirmCompleted() {
    setNotice("");
    setErrorMessage("");

    if (!window.confirm("Confirm this booking is completed with no unresolved issue?")) {
      return;
    }

    try {
      const response = await fetch("/api/job-completion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "customer_confirm_completed",
          reference,
          phone
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not confirm completion.");
        return;
      }

      setJob((current) => ({ ...current, ...data.job }));
      setNotice("Thank you. Completion has been confirmed. You can now leave a WMC verified review.");
    } catch (error) {
      setErrorMessage(error?.message || "Could not confirm completion.");
    }
  }

  async function chooseQuote(quoteId) {
    setChoosing(quoteId);
    setNotice("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/customer/quotes/choose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, phone, quoteId })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not choose this provider quote.");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      setNotice("Provider quote selected. Please wait while we prepare your payment link.");
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong choosing this quote.");
    } finally {
      setChoosing("");
    }
  }

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">Provider quotes</p>
          <h1>Compare approved cleaning providers.</h1>
          <p>
            Choose the quote that works best for you. Providers are independent, and each quote is submitted by the cleaner or cleaning business shown.
          </p>
        </div>

        <div className="quoteGrid">
          <div className="card formCard">
            <h2>View your quotes</h2>
            <p className="notice">
              Booking reference: <strong>{reference || "Not provided"}</strong>
            </p>

            <form onSubmit={loadQuotes}>
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
                {loading ? "Loading quotes..." : "View provider quotes"}
              </button>
            </form>
          </div>

          <aside className="card sideCard">
            <h2>How to choose</h2>
            <div className="statusList">
              <div className="statusRow">
                <strong>1</strong>
                <span>Compare price, date/time, reviews and provider message.</span>
              </div>
              <div className="statusRow">
                <strong>2</strong>
                <span>Open the provider profile if you want more trust details.</span>
              </div>
              <div className="statusRow">
                <strong>3</strong>
                <span>Choose one provider and pay securely to confirm the booking.</span>
              </div>
            </div>
          </aside>
        </div>

        {errorMessage && <div className="warningBox">{errorMessage}</div>}
        {notice && <div className="notice">{notice}</div>}

        {job && (
          <div className="card sideCard" style={{ marginBottom: 24 }}>
            <h2>Your cleaning request</h2>
            <div className="statusList">
              <div className="statusRow">
                <span>Service</span>
                <strong>{job.service_type || "Cleaning service"}</strong>
              </div>
              <div className="statusRow">
                <span>Area</span>
                <strong>{job.area_town || job.postcode_area || "Area not provided"}</strong>
              </div>
              <div className="statusRow">
                <span>Preferred date/time</span>
                <strong>{formatDate(job.preferred_date)} at {formatTime(job.preferred_time)}</strong>
              </div>
              <div className="statusRow">
                <span>Provider preference</span>
                <strong>{job.provider_preference_label || "No preference"}</strong>
              </div>
              <div className="statusRow">
                <span>Original guide estimate</span>
                <strong>{formatMoney(job.customer_guide_price)}</strong>
              </div>
            </div>

            <div className="guideBox" style={{ marginTop: 14 }}>
              Quotes are ranked to help you compare options. The recommended order considers your provider preference, WMC verified reviews, completed WMC bookings, insurance details and price. You are still free to choose any available quote.
            </div>
          </div>
        )}

        {quotes.length > 0 && (
          <>
            <div className="notice" style={{ marginBottom: 18 }}>
              <strong>{quotes.length} provider quote{quotes.length === 1 ? "" : "s"} available.</strong>{" "}
              Prices and availability are submitted by independent approved providers. You only pay after choosing the provider you prefer.
            </div>

            <div className="statusList">
              {quotes.map((quote, index) => {
                const isSelected = isQuoteSelected(job, quote);
                const isChoosing = choosing === quote.id;

                return (
                  <article key={quote.id} className="card infoCard">
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                      <div>
                        <p className="kicker">{quote.provider_type_label}</p>
                        <h3>{quote.provider_display_name || "Approved provider"}</h3>
                      </div>
                      <div className="notice" style={{ margin: 0 }}>
                        <strong>{quoteBadge(index, quote)}</strong>
                        <br />
                        {quote.recommendation_reason || "Approved WMC provider"}
                      </div>
                    </div>

                    <div className="guideBox" style={{ marginTop: 14 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
                        <div>
                          <strong>Customer price</strong>
                          <p>{formatMoney(quote.customer_quote_amount)}</p>
                        </div>
                        <div>
                          <strong>Available</strong>
                          <p>{formatDate(quote.available_date)} at {formatTime(quote.available_time)}</p>
                        </div>
                        <div>
                          <strong>Estimated duration</strong>
                          <p>{quote.estimated_hours || "Not provided"} hour(s)</p>
                        </div>
                        <div>
                          <strong>Reviews</strong>
                          <p>
                            {quote.wmc_review_count > 0
                              ? `${quote.wmc_review_average}/5 from ${quote.wmc_review_count} WMC verified review${quote.wmc_review_count === 1 ? "" : "s"}`
                              : "New WMC provider — no verified WMC reviews yet"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <ProviderTrustCard quote={quote} />
                    <QuoteBreakdown quote={quote} />

                    <div className="guideBox" style={{ marginTop: 14 }}>
                      <strong>Provider quote details</strong>
                      <br />
                      <strong>Products/equipment:</strong> {quote.products_included || "Not stated"}
                      <br />
                      <strong>Availability:</strong> {formatDate(quote.available_date)} at {formatTime(quote.available_time)}
                      <br />
                      <strong>Estimated duration:</strong> {quote.estimated_hours || "Not provided"} hour(s)
                    </div>

                    {quote.provider_message && (
                      <p>
                        <strong>Provider message:</strong>
                        <br />
                        {quote.provider_message}
                      </p>
                    )}

                    <p className="notice">
                      The selected provider carries out the cleaning work. WMC manages the marketplace, secure payment flow, platform records and support if an issue cannot be resolved directly.
                    </p>

                    {isSelected && job?.payment_status !== "paid" && (
                      <div className="guideBox">
                        You selected this provider. Complete secure payment to confirm the booking and release the final job details to the provider.
                      </div>
                    )}

                    {isSelected && job?.payment_status === "paid" && (
                      <div className="guideBox">
                        <strong>Booking confirmed.</strong> Payment has been received and this provider has been selected.
                        <br />
                        <strong>Provider email:</strong> {quote.provider_email || "Shown in your confirmation email"}
                        <br />
                        <strong>Provider phone:</strong> {quote.provider_phone || "Shown in your confirmation email"}
                        <br />
                        Please contact the provider directly for normal booking communication. If you cannot resolve an issue directly, WMC can step in to help review it.
                        <div className="actionRow" style={{ marginTop: 14 }}>
                          <a href={`/messages/${encodeURIComponent(reference)}`} className="btn btnPrimary">Message provider</a>
                          <button type="button" className="btn btnSecondary" onClick={confirmCompleted}>Confirm completed</button>
                          <a href={`/issue/${encodeURIComponent(reference)}`} className="btn btnSecondary">Report issue</a>
                          <a href={`/review/${encodeURIComponent(reference)}`} className="btn btnSecondary">Leave review</a>
                        </div>
                      </div>
                    )}

                    <button
                      className="btn btnPrimary"
                      type="button"
                      disabled={isChoosing || job?.payment_status === "paid"}
                      onClick={() => chooseQuote(quote.id)}
                    >
                      {job?.payment_status === "paid"
                        ? "Payment completed"
                        : isChoosing
                          ? "Preparing payment..."
                          : isSelected
                            ? `Continue to payment ${formatMoney(quote.customer_quote_amount)}`
                            : `Choose this provider and pay ${formatMoney(quote.customer_quote_amount)}`}
                    </button>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
