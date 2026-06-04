"use client";

import React, { useEffect, useState } from "react";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "under_review", label: "Under review" },
  { value: "approved", label: "Approved" },
  { value: "more_info_needed", label: "More info needed" },
  { value: "rejected", label: "Rejected" },
  { value: "suspended", label: "Suspended" },
  { value: "withdrawn", label: "Withdrawn" }
];

function display(value) {
  if (Array.isArray(value)) return value.join(", ") || "Not provided";
  if (value === true) return "Yes";
  if (value === false) return "No";
  return value || "Not provided";
}

function formatDate(value) {
  if (!value) return "Not set";
  try {
    return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
  } catch {
    return value;
  }
}

function statusLabel(value) {
  const found = statusOptions.find((option) => option.value === value);
  return found?.label || value || "Not set";
}

async function safeJson(response) {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    return { error: text || "Server returned an empty or invalid response." };
  }
}

export default function AdminBusinessPartnersPage() {
  const [password, setPassword] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [workingBusinessId, setWorkingBusinessId] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("wmc_admin_password") || "";
    if (stored) {
      setPassword(stored);
      setSavedPassword(stored);
      loadBusinesses(stored);
    }
  }, []);

  async function loadBusinesses(passwordToUse = password) {
    setLoading(true);
    setNotice("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/business-partners", {
        headers: { "x-wmc-admin-password": passwordToUse }
      });
      const data = await safeJson(response);

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not load business partners.");
        return;
      }

      setBusinesses(data.businesses || []);
      setSavedPassword(passwordToUse);
      window.localStorage.setItem("wmc_admin_password", passwordToUse);
    } catch {
      setErrorMessage("Something went wrong loading business partners.");
    } finally {
      setLoading(false);
    }
  }

  function updateBusinessInState(updatedBusiness) {
    setBusinesses((current) =>
      current.map((item) => (item.id === updatedBusiness.id ? updatedBusiness : item))
    );
  }

  async function updateBusiness(id, updates) {
    setNotice("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/business-partners", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-wmc-admin-password": savedPassword || password
        },
        body: JSON.stringify({ id, ...updates })
      });
      const data = await safeJson(response);

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not update business partner.");
        return;
      }

      updateBusinessInState(data.business);
      setNotice("Business partner updated.");
    } catch {
      setErrorMessage("Something went wrong updating the business partner.");
    }
  }

  async function sendStripeOnboarding(business) {
    const confirmed = window.confirm(
      [
        "Send Stripe Express onboarding to this business?",
        "",
        `Business: ${business.business_name || "Business partner"}`,
        `Email: ${business.email || "Not provided"}`,
        "",
        "Only send this after the business is approved, active and ready for payout setup."
      ].join("\n")
    );

    if (!confirmed) return;

    setWorkingBusinessId(business.id);
    setNotice("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/business-stripe-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-wmc-admin-password": savedPassword || password
        },
        body: JSON.stringify({ businessPartnerId: business.id })
      });
      const data = await safeJson(response);

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not create business Stripe onboarding link.");
        return;
      }

      if (data.businessPartner) updateBusinessInState(data.businessPartner);

      const emailText = data.emailSent
        ? "The onboarding email was sent to the business."
        : `Onboarding link created, but the email may not have sent: ${data.emailError || "check email logs."}`;

      setNotice(`${emailText} Stripe account: ${data.stripeAccountId}`);
    } catch {
      setErrorMessage("Something went wrong creating the business Stripe onboarding link.");
    } finally {
      setWorkingBusinessId("");
    }
  }

  async function refreshStripeStatus(business) {
    setWorkingBusinessId(business.id);
    setNotice("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/business-stripe-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-wmc-admin-password": savedPassword || password
        },
        body: JSON.stringify({ businessPartnerId: business.id })
      });
      const data = await safeJson(response);

      if (!response.ok) {
        setErrorMessage(data?.error || "Could not refresh business Stripe status.");
        return;
      }

      if (data.businessPartner) updateBusinessInState(data.businessPartner);

      setNotice(
        `Stripe status refreshed. Onboarding: ${data.stripeStatus?.onboardingStatus || "unknown"}, payouts enabled: ${data.stripeStatus?.payoutsEnabled ? "yes" : "no"}.`
      );
    } catch {
      setErrorMessage("Something went wrong refreshing the business Stripe status.");
    } finally {
      setWorkingBusinessId("");
    }
  }

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">WMC Admin</p>
          <h1>Business partner applications.</h1>
          <p>Review business partners, approve access, send Stripe onboarding and manage whether they can log in to the business portal.</p>
        </div>

        <div className="card formCard" style={{ marginBottom: 18 }}>
          <h2>Admin access</h2>
          <div className="formGrid">
            <label className="field">
              <span>Admin password</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your WMC admin password" />
            </label>
          </div>
          <div className="actionRow">
            <button type="button" className="btn btnPrimary" onClick={() => loadBusinesses(password)}>{loading ? "Loading..." : "Load business partners"}</button>
          </div>
          {notice && <div className="notice" style={{ marginTop: 18 }}>{notice}</div>}
          {errorMessage && <div className="warningBox" style={{ marginTop: 18 }}>{errorMessage}</div>}
        </div>



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

        <div className="grid2">
          {businesses.map((business) => {
            const isWorking = workingBusinessId === business.id;
            const isApprovedActive = business.status === "approved" && business.is_active === true;

            return (
              <article key={business.id} className="card infoCard">
                <p className="kicker">{formatDate(business.created_at)}</p>
                <h3>{business.business_name}</h3>

                <div className="guideBox">
                  <strong>Status:</strong> {statusLabel(business.status)}<br />
                  <strong>Active:</strong> {business.is_active ? "Yes" : "No"}<br />
                  <strong>Contact:</strong> {display(business.contact_name)} / {display(business.contact_role)}<br />
                  <strong>Phone:</strong> {display(business.phone)}<br />
                  <strong>Email:</strong> {display(business.email)}
                </div>

                <div className={business.stripe_payouts_enabled ? "notice" : "warningBox"} style={{ marginTop: 14 }}>
                  <strong>Stripe payout setup</strong><br />
                  Account: {display(business.stripe_account_id)}<br />
                  Onboarding: {display(business.stripe_onboarding_status)}<br />
                  Details submitted: {display(business.stripe_details_submitted)}<br />
                  Payouts enabled: {display(business.stripe_payouts_enabled)}<br />
                  Charges enabled: {display(business.stripe_charges_enabled)}<br />
                  Onboarded at: {formatDate(business.stripe_onboarded_at)}
                </div>

                <div className="actionRow" style={{ marginTop: 14 }}>
                  <button
                    type="button"
                    className="btn btnPrimary"
                    disabled={!isApprovedActive || isWorking}
                    onClick={() => sendStripeOnboarding(business)}
                  >
                    {isWorking ? "Working..." : "Send Stripe onboarding"}
                  </button>

                  <button
                    type="button"
                    className="btn btnSecondary"
                    disabled={!business.stripe_account_id || isWorking}
                    onClick={() => refreshStripeStatus(business)}
                  >
                    Refresh Stripe status
                  </button>
                </div>

                {!isApprovedActive && (
                  <div className="warningBox" style={{ marginTop: 14 }}>
                    Approve this business and set active portal access to Yes before sending Stripe onboarding.
                  </div>
                )}

                <p>
                  <strong>Business type:</strong> {display(business.business_type)}<br />
                  <strong>Trading name:</strong> {display(business.trading_name)}<br />
                  <strong>Postcode:</strong> {display(business.postcode)}<br />
                  <strong>Areas covered:</strong> {display(business.areas_covered)}<br />
                  <strong>Team size:</strong> {display(business.team_size)}
                </p>

                <p>
                  <strong>Available days:</strong> {display(business.available_days)}<br />
                  <strong>Available times:</strong> {display(business.available_times)}<br />
                  <strong>Minimum notice:</strong> {display(business.minimum_notice)}<br />
                  <strong>Minimum booking length:</strong> {display(business.minimum_booking_length)}<br />
                  <strong>Products/equipment:</strong> {display(business.products_equipment)}
                </p>

                <div className="warningBox">
                  <strong>Insurance:</strong><br />
                  Status: {display(business.insurance_status)}<br />
                  Provider: {display(business.insurance_provider)}<br />
                  Policy/certificate no: {display(business.insurance_policy_number)}<br />
                  Expiry: {display(business.insurance_expiry_date)}<br />
                  Cover: {display(business.insurance_cover_amount)}
                </div>

                <p>
                  <strong>Services:</strong> {display(business.services_offered)}<br />
                  <strong>Message:</strong> {display(business.message)}
                </p>

                <div className="formGrid">
                  <label className="field">
                    <span>Status</span>
                    <select value={business.status || "pending"} onChange={(event) => updateBusiness(business.id, { status: event.target.value })}>
                      {statusOptions.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                    </select>
                  </label>
                  <label className="field">
                    <span>Active portal access</span>
                    <select value={business.is_active ? "yes" : "no"} onChange={(event) => updateBusiness(business.id, { is_active: event.target.value === "yes" })}>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </label>
                </div>

                <label className="field">
                  <span>Admin notes</span>
                  <textarea defaultValue={business.admin_notes || ""} onBlur={(event) => updateBusiness(business.id, { admin_notes: event.target.value })} placeholder="Private WMC notes" />
                </label>
              </article>
            );
          })}
        </div>

        {!loading && businesses.length === 0 && savedPassword && <div className="notice" style={{ marginTop: 24 }}>No business partner applications found yet.</div>}
      </section>
    </main>
  );
}
