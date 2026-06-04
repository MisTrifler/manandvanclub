"use client";

import React, { useEffect, useMemo, useState } from "react";

function getSavedMap(storageKey) {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveMap(storageKey, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey, JSON.stringify(value));
}

function formatMoney(value) {
  const number = Number(value || 0);
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(number);
}

function calculateQuote(customerQuoteAmount) {
  const quote = Number(customerQuoteAmount || 0);
  const fee = Math.round(quote * 15) / 100;
  const payout = Math.round((quote - fee) * 100) / 100;
  return { fee, payout };
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

function StatusLegend() {
  const items = [
    ["Yellow", "Quote waiting / customer decision", "yellow"],
    ["Green", "Accepted / confirmed", "green"],
    ["Blue", "Completed / payout window", "blue"],
    ["Red", "Issue needs attention", "red"]
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

export default function CleanerJobsPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cleaner, setCleaner] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [quoteByJob, setQuoteByJob] = useState({});
  const [availableDateByJob, setAvailableDateByJob] = useState({});
  const [availableTimeByJob, setAvailableTimeByJob] = useState({});
  const [estimatedHoursByJob, setEstimatedHoursByJob] = useState({});
  const [productsByJob, setProductsByJob] = useState({});
  const [messageByJob, setMessageByJob] = useState({});
  const [loading, setLoading] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState("");
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedIds, setSubmittedIds] = useState({});

  const storageKey = useMemo(() => {
    const safeEmail = String(email || "").trim().toLowerCase() || "unknown";
    const safePhone = String(phone || "").replace(/\s+/g, "") || "unknown";
    return `wmc_cleaner_quote_map_${safeEmail}_${safePhone}`;
  }, [email, phone]);

  useEffect(() => {
    const savedEmail = window.localStorage.getItem("wmc_cleaner_email") || "";
    const savedPhone = window.localStorage.getItem("wmc_cleaner_phone") || "";
    if (savedEmail) setEmail(savedEmail);
    if (savedPhone) setPhone(savedPhone);
  }, []);

  useEffect(() => {
    if (!email || !phone) return;
    setSubmittedIds(getSavedMap(storageKey));
  }, [email, phone, storageKey]);

  async function loadJobs(event) {
    if (event) event.preventDefault();

    setLoading(true);
    setNotice("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/cleaner/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not load cleaner jobs.");
        setCleaner(null);
        setJobs([]);
        return;
      }

      setCleaner(data.cleaner);
      setJobs(data.jobs || []);

      window.localStorage.setItem("wmc_cleaner_email", email);
      window.localStorage.setItem("wmc_cleaner_phone", phone);

      const quoteMap = {};
      const dateMap = {};
      const timeMap = {};
      const hoursMap = {};
      const productsMap = {};
      const submittedMap = {};

      (data.jobs || []).forEach((job) => {
        quoteMap[job.id] = job.existing_quote?.customer_quote_amount || job.customer_total_price || "";
        dateMap[job.id] = job.existing_quote?.available_date || job.preferred_date || "";
        timeMap[job.id] = job.existing_quote?.available_time || job.preferred_time || "";
        hoursMap[job.id] = job.existing_quote?.estimated_hours || job.estimated_hours || "";
        productsMap[job.id] = job.existing_quote?.products_included || "Products/equipment included where suitable";
        if (job.existing_quote) submittedMap[job.id] = true;
      });

      setQuoteByJob((current) => ({ ...quoteMap, ...current }));
      setAvailableDateByJob((current) => ({ ...dateMap, ...current }));
      setAvailableTimeByJob((current) => ({ ...timeMap, ...current }));
      setEstimatedHoursByJob((current) => ({ ...hoursMap, ...current }));
      setProductsByJob((current) => ({ ...productsMap, ...current }));

      const saved = getSavedMap(storageKey);
      setSubmittedIds({ ...saved, ...submittedMap });

      if ((data.jobs || []).length === 0) {
        setNotice("No available booking opportunities at the moment. Please check again later.");
      }
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong loading cleaner jobs.");
    } finally {
      setLoading(false);
    }
  }

  async function submitQuote(jobId) {
    if (submittedIds[jobId]) return;

    const customerQuoteAmount = Number(quoteByJob[jobId] || 0);
    const availableDate = String(availableDateByJob[jobId] || "").trim();
    const availableTime = String(availableTimeByJob[jobId] || "").trim();

    if (!customerQuoteAmount || customerQuoteAmount < 0.5) {
      setErrorMessage("Please enter your customer quote amount.");
      return;
    }

    if (!availableDate || !availableTime) {
      setErrorMessage("Please enter your available date and time for this quote.");
      return;
    }

    setQuoteLoading(jobId);
    setNotice("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/provider-quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerType: "cleaner",
          email,
          phone,
          jobId,
          customerQuoteAmount,
          availableDate,
          availableTime,
          estimatedHours: estimatedHoursByJob[jobId] || "",
          productsIncluded: productsByJob[jobId] || "",
          providerMessage: messageByJob[jobId] || ""
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not submit cleaner quote.");
        return;
      }

      const nextMap = { ...submittedIds, [jobId]: true };
      setSubmittedIds(nextMap);
      saveMap(storageKey, nextMap);
      setNotice("Your quote has been sent to the customer. If the customer chooses your quote and pays, the job will move to your assigned jobs.");
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong submitting your quote.");
    } finally {
      setQuoteLoading("");
    }
  }

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">Cleaner partner portal</p>
          <h1>Available booking opportunities.</h1>
          <p>
            Approved independent cleaner partners can review safe job details and submit quotes
            directly to customers. The customer can then compare provider quotes and choose who they want to book.
          </p>
        </div>

        <div className="notice">
          Cleaner partners remain independent self-employed cleaners. Viewing or quoting for a booking
          opportunity does not create employment, wages, shifts, guaranteed work or an employment
          contract with West Midlands Cleaner.
        </div>

        <div className="guideBox" style={{ marginTop: 18 }}>
          <strong>Quote and payout transparency:</strong> Submit the customer price you are happy to
          offer. WMC keeps a flat 15% platform fee from confirmed completed bookings and your payout
          is 85% of the customer price. No WMC joining fee, monthly fee or extra platform subscription
          charge applies at this stage.
        </div>

        <StatusLegend />

        <div className="grid3" style={{ marginTop: 18, marginBottom: 24 }}>
          <div className="card miniCard">
            <p className="kicker">1. Log in</p>
            <h3>Use your approved details.</h3>
            <p>Enter the email and phone number linked to your approved cleaner partner profile.</p>
          </div>
          <div className="card miniCard">
            <p className="kicker">2. Submit quote</p>
            <h3>Only quote if suitable.</h3>
            <p>Check the area, service, date, hours and guide price before sending your price.</p>
          </div>
          <div className="card miniCard">
            <p className="kicker">3. Wait for customer</p>
            <h3>Customer chooses.</h3>
            <p>If selected and paid, full booking details appear in My assigned bookings.</p>
          </div>
        </div>

        <div className="actionRow" style={{ marginTop: 14, marginBottom: 24 }}>
          <a href="/cleaner/my-jobs" className="btn btnSecondary">My assigned bookings</a>
          <a href="/contact" className="btn btnSecondary">Support</a>
        </div>

        <div className="card formCard" style={{ marginBottom: 24 }}>
          <h2>Cleaner access</h2>
          <form onSubmit={loadJobs}>
            <div className="formGrid">
              <label className="field">
                <span>Approved cleaner email</span>
                <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="cleaner@example.com" required />
              </label>
              <label className="field">
                <span>Approved cleaner phone</span>
                <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="07XXXXXXXXX" required />
              </label>
            </div>

            <button className="btn btnPrimary" type="submit" disabled={loading}>
              {loading ? "Loading jobs..." : "View available jobs"}
            </button>
          </form>
        </div>

        {errorMessage && <div className="warningBox">{errorMessage}</div>}
        {notice && <div className="notice">{notice}</div>}

        {cleaner && (
          <div className="notice" style={{ marginBottom: 20 }}>
            Logged in as <strong>{cleaner.full_name || cleaner.business_name || cleaner.email}</strong>.
          </div>
        )}

        {jobs.length > 0 && (
          <div className="statusList">
            {jobs.map((job) => {
              const submitted = Boolean(submittedIds[job.id]);
              const isSubmitting = quoteLoading === job.id;
              const quoteAmount = Number(quoteByJob[job.id] || 0);
              const { fee, payout } = calculateQuote(quoteAmount);

              return (
                <article key={job.id} className="card infoCard">
                  <div className="actionRow" style={{ justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                    <p className="kicker" style={{ margin: 0 }}>{job.quote_reference}</p>
                    {submitted ? statusBadge("Quote submitted", "green") : statusBadge("Not quoted yet", "yellow")}
                  </div>
                  <h3>{job.service_type}</h3>

                  <p>
                    <strong>Area:</strong> Hidden until customer chooses your quote and pays
                    <br />
                    <strong>Postcode area:</strong> {job.postcode_area}
                    <br />
                    <strong>Customer preference:</strong> {job.provider_preference_label || "No preference"}
                    <br />
                    <strong>Date/time requested:</strong> {job.preferred_date || "Date not set"} at {job.preferred_time || "Time not set"}
                    <br />
                    <strong>Estimated hours:</strong> {job.estimated_hours || "Not set"}
                  </p>

                  <div className="guideBox">
                    <strong>Guide price only:</strong> {formatMoney(job.customer_total_price)}
                    <br />
                    <strong>Your quote to customer:</strong> {formatMoney(quoteAmount)}
                    <br />
                    <strong>WMC 15% platform fee:</strong> {formatMoney(fee)}
                    <br />
                    <strong>Your payout if chosen:</strong> {formatMoney(payout)}
                  </div>

                  <p>
                    <strong>Property:</strong> {job.property_type || "Property type not set"}
                    {job.bedrooms !== null && job.bedrooms !== undefined ? `, ${job.bedrooms} bedrooms` : ""}
                    {job.bathrooms !== null && job.bathrooms !== undefined ? `, ${job.bathrooms} bathrooms` : ""}
                    <br />
                    <strong>Condition:</strong> {job.condition_level || "Not provided"}
                    <br />
                    <strong>Extras:</strong> {job.extras || "None"}
                  </p>

                  <div className="formGrid" style={{ marginTop: 14 }}>
                    <label className="field">
                      <span>Your customer quote (£)</span>
                      <input type="number" min="0.5" step="0.01" value={quoteByJob[job.id] || ""} onChange={(event) => setQuoteByJob((current) => ({ ...current, [job.id]: event.target.value }))} disabled={submitted} required />
                    </label>
                    <label className="field">
                      <span>Estimated hours</span>
                      <input type="number" min="0.5" step="0.25" value={estimatedHoursByJob[job.id] || ""} onChange={(event) => setEstimatedHoursByJob((current) => ({ ...current, [job.id]: event.target.value }))} disabled={submitted} />
                    </label>
                    <label className="field">
                      <span>Available date</span>
                      <input type="date" value={availableDateByJob[job.id] || ""} onChange={(event) => setAvailableDateByJob((current) => ({ ...current, [job.id]: event.target.value }))} disabled={submitted} required />
                    </label>
                    <label className="field">
                      <span>Available time</span>
                      <input type="time" value={availableTimeByJob[job.id] || ""} onChange={(event) => setAvailableTimeByJob((current) => ({ ...current, [job.id]: event.target.value }))} disabled={submitted} required />
                    </label>
                  </div>

                  <label className="field">
                    <span>Products/equipment included?</span>
                    <input value={productsByJob[job.id] || ""} onChange={(event) => setProductsByJob((current) => ({ ...current, [job.id]: event.target.value }))} placeholder="Example: Products included / customer provides products" disabled={submitted} />
                  </label>

                  <label className="field">
                    <span>Message to customer</span>
                    <textarea value={messageByJob[job.id] || ""} onChange={(event) => setMessageByJob((current) => ({ ...current, [job.id]: event.target.value }))} placeholder="Example: I can attend at 10am and bring products." disabled={submitted} />
                  </label>

                  <div className="warningBox">
                    Submit a quote only if you can complete the job at the quoted price and time. Full
                    customer address/access details are released only after the customer chooses your quote and pays.
                  </div>

                  <button className="btn btnPrimary" type="button" disabled={submitted || isSubmitting} onClick={() => submitQuote(job.id)}>
                    {submitted ? "Quote submitted" : isSubmitting ? "Submitting quote..." : "Submit quote to customer"}
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
