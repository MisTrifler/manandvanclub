"use client";

import React, { useEffect, useState } from "react";

const jobStatusOptions = [
  {
    value: "submitted",
    label: "1. Request submitted — customer posted cleaning request"
  },
  {
    value: "needs_review",
    label: "2. Posted to providers — suitable approved providers notified"
  },
  {
    value: "quote_sent",
    label: "3. Provider quotes available — customer can compare quotes"
  },
  {
    value: "customer_accepted",
    label: "4. Provider chosen — customer selected a provider quote"
  },
  {
    value: "awaiting_payment",
    label: "5. Awaiting payment — selected quote checkout pending"
  },
  {
    value: "paid",
    label: "6. Paid — booking confirmed after customer payment"
  },
  {
    value: "available_to_cleaners",
    label: "7. Reposted to providers — use only if more quotes are needed"
  },
  {
    value: "cleaner_interested",
    label: "8. Provider response received — provider has shown interest/quoted"
  },
  {
    value: "cleaner_assigned",
    label: "9. Selected provider assigned — provider confirmed for booking"
  },
  {
    value: "in_progress",
    label: "10. In progress — selected provider attending / job underway"
  },
  {
    value: "completed",
    label: "11. Completed — job completed, 48-hour issue window starts"
  },
  {
    value: "payout_ready",
    label: "12. Payout ready — no open issue / provider payout eligible"
  },
  {
    value: "cancelled",
    label: "Cancelled"
  },
  {
    value: "refunded",
    label: "Refunded"
  },
  {
    value: "dispute",
    label: "Dispute / issue — payout should stay on hold"
  }
];

const paymentStatusOptions = [
  {
    value: "not_paid",
    label: "1. Not paid"
  },
  {
    value: "payment_pending",
    label: "2. Payment pending"
  },
  {
    value: "paid",
    label: "3. Paid"
  },
  {
    value: "refunded",
    label: "Refunded"
  },
  {
    value: "part_refunded",
    label: "Part refunded"
  }
];

function formatMoney(value) {
  const number = Number(value || 0);

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP"
  }).format(number);
}

function toInputValue(value) {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  return String(value);
}

function toNumber(value) {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return 0;
  }

  return number;
}

function roundMoney(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}

function formatBoolean(value) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  if (value === null || value === undefined || value === "") return "Not provided";

  return String(value);
}

function cleanValue(value) {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }

  return String(value);
}

function statusLabel(value) {
  const found = jobStatusOptions.find((option) => option.value === value);
  return found?.label || value || "Not set";
}

function paymentStatusLabel(value) {
  const found = paymentStatusOptions.find((option) => option.value === value);
  return found?.label || value || "Not set";
}

function getPropertyAddress(job) {
  const possibleText = [job.access_notes, job.notes].filter(Boolean).join("\n");
  const fullAddressMatch = possibleText.match(/Full address:\s*(.+)/i);
  const propertyAddressMatch = possibleText.match(/Property address:\s*(.+)/i);

  if (fullAddressMatch?.[1]) {
    return fullAddressMatch[1].trim();
  }

  if (propertyAddressMatch?.[1]) {
    return propertyAddressMatch[1].trim();
  }

  const area = cleanValue(job.area_town);
  const postcode = cleanValue(job.postcode);

  if (area === "Not provided" && postcode === "Not provided") {
    return "Not provided";
  }

  return `${area} / ${postcode}`;
}

function getProviderPreferenceFromNotes(job) {
  const text = String(job?.notes || "");
  const match = text.match(/Customer provider preference:\s*(.+)/i);

  return match?.[1]?.split("\n")?.[0]?.trim() || "Not provided";
}

function createDraftFromJob(job) {
  return {
    customer_total_price: toInputValue(job.customer_total_price),
    wmc_fee_percent: toInputValue(job.wmc_fee_percent),
    wmc_fee_amount: toInputValue(job.wmc_fee_amount),
    cleaner_payout: toInputValue(job.cleaner_payout),
    business_payout: toInputValue(job.business_payout || job.cleaner_payout),
    estimated_hours: toInputValue(job.estimated_hours)
  };
}

function DetailRow({ label, value }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "125px 1fr",
        gap: 8,
        padding: "5px 0",
        fontSize: 13,
        borderBottom: "1px solid rgba(7, 23, 51, 0.08)"
      }}
    >
      <strong>{label}</strong>
      <span>{cleanValue(value)}</span>
    </div>
  );
}

function TextBlock({ label, value }) {
  return (
    <div
      className="guideBox"
      style={{ background: "#ffffff", marginTop: 8, padding: 12, fontSize: 13 }}
    >
      <strong>{label}</strong>
      <br />
      <span style={{ whiteSpace: "pre-wrap" }}>{cleanValue(value)}</span>
    </div>
  );
}

export default function AdminMarketplacePage() {
  const [password, setPassword] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [jobs, setJobs] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [priceDrafts, setPriceDrafts] = useState({});
  const [savingFigures, setSavingFigures] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("wmc_admin_password") || "";

    if (stored) {
      setPassword(stored);
      setSavedPassword(stored);
      fetchJobs(stored);
    }
  }, []);

  async function fetchJobs(passwordToUse = password) {
    setLoading(true);
    setErrorMessage("");
    setNotice("");

    try {
      const response = await fetch("/api/admin/jobs", {
        headers: {
          "x-wmc-admin-password": passwordToUse
        }
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Could not load admin jobs.");
        setLoading(false);
        return;
      }

      const loadedJobs = data.jobs || [];

      setJobs(loadedJobs);
      setCleaners(data.cleaners || []);
      setBusinesses(data.businesses || []);

      const nextDrafts = {};

      for (const job of loadedJobs) {
        nextDrafts[job.id] = createDraftFromJob(job);
      }

      setPriceDrafts(nextDrafts);
      setSavedPassword(passwordToUse);
      window.localStorage.setItem("wmc_admin_password", passwordToUse);
    } catch {
      setErrorMessage("Something went wrong loading jobs.");
    } finally {
      setLoading(false);
    }
  }

  async function updateJob(jobId, updates) {
    setErrorMessage("");
    setNotice("");

    try {
      const response = await fetch("/api/admin/jobs", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-wmc-admin-password": savedPassword || password
        },
        body: JSON.stringify({
          id: jobId,
          ...updates
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Could not update job.");
        return null;
      }

      setJobs((current) => current.map((job) => (job.id === jobId ? data.job : job)));

      setPriceDrafts((current) => ({
        ...current,
        [jobId]: createDraftFromJob(data.job)
      }));

      const emailResults = data.email_results;

      if (emailResults) {
        const cleanerSent = emailResults.cleaner?.sent;
        const customerSent = emailResults.customer?.sent;

        if (cleanerSent && customerSent) {
          setNotice("Job updated. Cleaner and customer emails sent.");
        } else if (cleanerSent || customerSent) {
          setNotice("Job updated. Some notification emails were sent; check Resend logs for details.");
        } else {
          setNotice("Job updated. Email notification was not sent; check Resend logs/environment variables.");
        }
      } else {
        setNotice("Job updated.");
      }

      return data.job;
    } catch {
      alert("Something went wrong updating job.");
      return null;
    }
  }

  function getInterestedCleaners(job) {
    return (job.cleaner_job_interests || []).filter(
      (interest) => interest.interest_status === "interested"
    );
  }

  function getInterestedBusinesses(job) {
    return (job.business_job_interests || []).filter(
      (interest) => interest.interest_status === "interested"
    );
  }

  function getAssignedBusiness(job) {
    if (!job.assigned_business_partner_id) return null;

    const businessFromList = businesses.find((business) => business.id === job.assigned_business_partner_id);
    if (businessFromList) return businessFromList;

    const interests = job.business_job_interests || [];
    const assignedInterest = interests.find(
      (interest) => interest.business_partners?.id === job.assigned_business_partner_id
    );

    return assignedInterest?.business_partners || null;
  }

  function getAssignedBusinessInterest(job) {
    if (!job.assigned_business_interest_id) return null;
    return (job.business_job_interests || []).find(
      (interest) => interest.id === job.assigned_business_interest_id
    );
  }

  function getBusinessDisplayName(business) {
    if (!business) return "Business name missing";
    return business.trading_name
      ? `${business.business_name} / ${business.trading_name}`
      : business.business_name || "Business name missing";
  }

  function getAssignedCleaner(job) {
    if (!job.assigned_cleaner_id) return null;

    const cleanerFromList = cleaners.find((cleaner) => cleaner.id === job.assigned_cleaner_id);

    if (cleanerFromList) return cleanerFromList;

    const interests = job.cleaner_job_interests || [];

    const assignedInterest = interests.find(
      (interest) => interest.cleaner_partners?.id === job.assigned_cleaner_id
    );

    return assignedInterest?.cleaner_partners || null;
  }

  async function assignBusinessInterest(jobId, interest) {
    if (!interest?.business_partners?.id) return;

    await updateJob(jobId, {
      assigned_business_partner_id: interest.business_partners.id,
      assigned_business_interest_id: interest.id,
      business_team_lead_name: interest.cleaner_name || "",
      business_team_lead_phone: interest.cleaner_phone || "",
      business_payout: priceDrafts[jobId]?.business_payout || priceDrafts[jobId]?.cleaner_payout || null,
      job_status: "cleaner_assigned"
    });
  }

  async function assignBusinessManually(jobId, businessId) {
    if (!businessId) {
      await updateJob(jobId, {
        assigned_business_partner_id: null,
        assigned_business_interest_id: null,
        business_team_lead_name: "",
        business_team_lead_phone: ""
      });
      return;
    }

    await updateJob(jobId, {
      assigned_business_partner_id: businessId,
      assigned_business_interest_id: null,
      business_payout: priceDrafts[jobId]?.business_payout || priceDrafts[jobId]?.cleaner_payout || null,
      job_status: "cleaner_assigned"
    });
  }

  async function assignCleaner(jobId, cleanerId) {
    if (!cleanerId) {
      await updateJob(jobId, {
        assigned_cleaner_id: null
      });
      return;
    }

    await updateJob(jobId, {
      assigned_cleaner_id: cleanerId,
      job_status: "cleaner_assigned"
    });
  }

  function updatePriceDraft(jobId, field, value) {
    setPriceDrafts((current) => ({
      ...current,
      [jobId]: {
        ...(current[jobId] || {}),
        [field]: value
      }
    }));
  }

  function calculateFromFeePercent(jobId) {
    const draft = priceDrafts[jobId] || {};

    const customerTotal = toNumber(draft.customer_total_price);
    const feePercent = toNumber(draft.wmc_fee_percent);

    const wmcFeeAmount = roundMoney((customerTotal * feePercent) / 100);
    const cleanerPayout = roundMoney(customerTotal - wmcFeeAmount);

    setPriceDrafts((current) => ({
      ...current,
      [jobId]: {
        ...(current[jobId] || {}),
        wmc_fee_amount: String(wmcFeeAmount),
        cleaner_payout: String(cleanerPayout),
        business_payout: String(cleanerPayout)
      }
    }));
  }

  function calculateFromCleanerPayout(jobId) {
    const draft = priceDrafts[jobId] || {};

    const customerTotal = toNumber(draft.customer_total_price);
    const cleanerPayout = toNumber(draft.cleaner_payout);
    const wmcFeeAmount = roundMoney(Math.max(customerTotal - cleanerPayout, 0));
    const feePercent = customerTotal > 0 ? roundMoney((wmcFeeAmount / customerTotal) * 100) : 0;

    setPriceDrafts((current) => ({
      ...current,
      [jobId]: {
        ...(current[jobId] || {}),
        wmc_fee_percent: String(feePercent),
        wmc_fee_amount: String(wmcFeeAmount),
        cleaner_payout: String(roundMoney(cleanerPayout)),
        business_payout: String(roundMoney(cleanerPayout))
      }
    }));
  }

  async function saveFigures(job) {
    const draft = priceDrafts[job.id] || {};

    setSavingFigures((current) => ({
      ...current,
      [job.id]: true
    }));

    const customerTotal = roundMoney(draft.customer_total_price);
    const feePercent = roundMoney(draft.wmc_fee_percent);
    const feeAmount = roundMoney(draft.wmc_fee_amount);
    const cleanerPayout = roundMoney(draft.cleaner_payout);
    const estimatedHours = roundMoney(draft.estimated_hours);
    const businessPayout = roundMoney(draft.business_payout || draft.cleaner_payout);

    await updateJob(job.id, {
      customer_total_price: customerTotal,
      wmc_fee_percent: feePercent,
      wmc_fee_amount: feeAmount,
      cleaner_payout: cleanerPayout,
      business_payout: businessPayout,
      estimated_hours: estimatedHours
    });

    setSavingFigures((current) => ({
      ...current,
      [job.id]: false
    }));
  }

  return (
    <main className="page adminMarketplaceCompact">
      <style jsx global>{`
        .adminMarketplaceCompact .section {
          padding-top: 28px;
        }

        .adminMarketplaceCompact .sectionIntro {
          margin-bottom: 16px;
        }

        .adminMarketplaceCompact .sectionIntro h1 {
          font-size: clamp(30px, 4vw, 52px);
          line-height: 0.95;
          margin-bottom: 8px;
        }

        .adminMarketplaceCompact .sectionIntro p {
          font-size: 15px;
          max-width: 880px;
        }

        .adminMarketplaceCompact .formCard,
        .adminMarketplaceCompact .infoCard,
        .adminMarketplaceCompact .miniCard,
        .adminMarketplaceCompact .card {
          padding: 18px;
          border-radius: 22px;
        }

        .adminMarketplaceCompact h2 {
          font-size: 24px;
          margin-bottom: 10px;
        }

        .adminMarketplaceCompact h3 {
          font-size: 22px;
          line-height: 1.05;
          margin: 4px 0 12px;
        }

        .adminMarketplaceCompact .kicker {
          font-size: 11px;
          letter-spacing: 0.16em;
          margin-bottom: 6px;
        }

        .adminMarketplaceCompact .guideBox,
        .adminMarketplaceCompact .notice,
        .adminMarketplaceCompact .warningBox {
          padding: 12px;
          border-radius: 16px;
          font-size: 13px;
          line-height: 1.45;
        }

        .adminMarketplaceCompact .field span {
          font-size: 13px;
        }

        .adminMarketplaceCompact input,
        .adminMarketplaceCompact select,
        .adminMarketplaceCompact textarea {
          min-height: 44px;
          padding: 10px 12px;
          font-size: 14px;
          border-radius: 14px;
        }

        .adminMarketplaceCompact textarea {
          min-height: 82px;
        }

        .adminMarketplaceCompact .btn {
          min-height: 42px;
          padding: 10px 14px;
          font-size: 13px;
          border-radius: 14px;
        }

        .adminJobsGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
          gap: 18px;
        }

        .adminJobCard {
          font-size: 14px;
        }

        .adminJobTopLine {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          align-items: start;
          margin-bottom: 10px;
        }

        .adminStatusPills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: flex-end;
        }

        .adminStatusPills span {
          background: #eafff8;
          border: 1px solid #98f3e0;
          color: #006159;
          border-radius: 999px;
          padding: 5px 8px;
          font-size: 11px;
          font-weight: 900;
        }

        .adminAddressBox {
          background: #fff8e7;
          border: 1px solid #f2d36a;
          border-radius: 16px;
          padding: 12px;
          color: #7a3b00;
          font-size: 13px;
          line-height: 1.45;
          margin-bottom: 12px;
        }

        .adminCompactSummary {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px 12px;
          margin-bottom: 12px;
          font-size: 13px;
        }

        .adminCompactSummary div {
          background: #f8fafc;
          border: 1px solid #e1e8f0;
          border-radius: 14px;
          padding: 10px;
          min-width: 0;
        }

        .adminCompactSummary strong {
          display: block;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #526178;
          margin-bottom: 4px;
        }

        .adminMarketplaceCompact details.adminDetailsSection {
          background: #ffffff;
          border: 1px solid #e1e8f0;
          border-radius: 18px;
          padding: 12px;
          margin-top: 12px;
        }

        .adminMarketplaceCompact details.adminDetailsSection > summary {
          cursor: pointer;
          font-weight: 950;
          color: #071733;
          font-size: 14px;
        }

        @media (max-width: 720px) {
          .adminJobsGrid {
            grid-template-columns: 1fr;
          }

          .adminJobTopLine,
          .adminCompactSummary {
            grid-template-columns: 1fr;
          }

          .adminStatusPills {
            justify-content: flex-start;
          }
        }
      `}</style>

      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">WMC Admin</p>
          <h1>Marketplace admin dashboard.</h1>
          <p>
            Monitor the automated marketplace flow from one place. Customers post requests,
            approved providers submit quotes, customers choose and pay, then providers complete the job.
            Admin action should mainly be used for oversight, support, disputes and exceptional fixes.
          </p>
        </div>

        <div className="card formCard" style={{ marginBottom: 16 }}>
          <h2>Admin access</h2>

          <div className="formGrid">
            <label className="field">
              <span>Admin password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your WMC admin password"
              />
            </label>
          </div>

          <div className="actionRow">
            <button type="button" className="btn btnPrimary" onClick={() => fetchJobs(password)}>
              {loading ? "Loading..." : "Load jobs"}
            </button>
          </div>

          {notice && (
            <div className="notice" style={{ marginTop: 18 }}>
              {notice}
            </div>
          )}

          {errorMessage && (
            <div className="warningBox" style={{ marginTop: 18 }}>
              {errorMessage}
            </div>
          )}
        </div>



        <div className="guideBox" style={{ marginBottom: 18 }}>
          <p className="kicker">Admin shortcuts</p>
          <h2>Everything in one place</h2>
          <div className="actionRow">
            <a href="/admin/overview" className="btn btnPrimary">Admin overview</a>
            <a href="/admin/marketplace" className="btn btnSecondary">Marketplace dashboard</a>
            <a href="/admin/cleaner-applications" className="btn btnSecondary">Cleaner applications</a>
            <a href="/admin/cleaner-payouts" className="btn btnSecondary">Cleaner payouts</a>
            <a href="/admin/business-partners" className="btn btnSecondary">Business partners</a>
            <a href="/admin/business-payouts" className="btn btnSecondary">Business payouts</a>
            <a href="/admin/provider-reviews" className="btn btnSecondary">Provider reviews</a>
            <a href="/admin/provider-performance" className="btn btnSecondary">Provider performance</a>
            <a href="/admin/issues" className="btn btnSecondary">Issues / disputes</a>
            <a href="/cleaner/jobs" className="btn btnSecondary">Cleaner available jobs</a>
            <a href="/cleaner/my-jobs" className="btn btnSecondary">Cleaner confirmed jobs</a>
            <a href="/business/jobs" className="btn btnSecondary">Business available jobs</a>
            <a href="/business/my-jobs" className="btn btnSecondary">Business confirmed jobs</a>
          </div>
        </div>

        <div className="notice" style={{ marginBottom: 16 }}>
          <strong>Marketplace tracking:</strong> customers post requests, approved providers submit quotes, customers choose a provider and then pay. Admin should mainly use this page for oversight, disputes and backup actions. Provider payouts only become eligible after completion and the 48-hour issue window, with manual payout pages kept as a backup.
        </div>

        <div className="adminJobsGrid">
          {jobs.map((job) => {
            const interestedCleaners = getInterestedCleaners(job);
            const interestedBusinesses = getInterestedBusinesses(job);
            const assignedCleaner = getAssignedCleaner(job);
            const assignedBusiness = getAssignedBusiness(job);
            const assignedBusinessInterest = getAssignedBusinessInterest(job);
            const draft = priceDrafts[job.id] || createDraftFromJob(job);

            return (
              <article key={job.id} className="card infoCard adminJobCard">
                <div className="adminJobTopLine">
                  <div>
                    <p className="kicker">{job.quote_reference}</p>
                    <h3>{job.service_type}</h3>
                  </div>

                  <div className="adminStatusPills">
                    <span>{statusLabel(job.job_status || "submitted")}</span>
                    <span>{paymentStatusLabel(job.payment_status || "not_paid")}</span>
                  </div>
                </div>

                <div className="adminAddressBox">
                  <strong>Property address:</strong>
                  <br />
                  {getPropertyAddress(job)}
                </div>

                <div className="adminCompactSummary">
                  <div>
                    <strong>Customer</strong>
                    {job.customer_name}
                    <br />
                    {job.customer_phone}
                    <br />
                    {job.customer_email || "No email"}
                  </div>
                  <div>
                    <strong>Date / time</strong>
                    {job.preferred_date || "Not provided"}
                    <br />
                    {job.preferred_time || "Not provided"}
                  </div>
                  <div>
                    <strong>Area / postcode</strong>
                    {job.area_town || "Not provided"}
                    <br />
                    {job.postcode || "Not provided"}
                  </div>
                  <div>
                    <strong>Saved figures</strong>
                    Customer: {formatMoney(job.customer_total_price)}
                    <br />
                    WMC: {job.wmc_fee_percent || 0}% / {formatMoney(job.wmc_fee_amount)}
                    <br />
                    Cleaner: {formatMoney(job.cleaner_payout)}
                    <br />
                    Business: {formatMoney(job.business_payout || job.cleaner_payout)}
                  </div>
                </div>

                <details className="adminDetailsSection">
                  <summary>Customer selected options and notes</summary>
                  <div style={{ marginTop: 12 }}>
                    <div className="guideBox" style={{ background: "#ffffff" }}>
                      <DetailRow label="Service type" value={job.service_type} />
                      <DetailRow label="Property type" value={job.property_type} />
                      <DetailRow label="Bedrooms / rooms" value={job.bedrooms} />
                      <DetailRow label="Bathrooms" value={job.bathrooms} />
                      <DetailRow label="Frequency" value={job.frequency} />
                      <DetailRow label="Condition" value={job.condition_level} />
                      <DetailRow label="Extras" value={job.extras || "None selected"} />
                      <DetailRow label="Estimated hours" value={job.estimated_hours} />
                      <DetailRow label="Customer guide / selected provider price" value={formatMoney(job.customer_total_price)} />
                      <DetailRow label="Flexible date/time" value={formatBoolean(job.is_flexible)} />
                      <DetailRow label="Urgent request" value={formatBoolean(job.is_urgent)} />
                      <DetailRow label="Created" value={job.created_at} />
                    </div>

                    <TextBlock label="Customer notes / booking choices" value={job.notes} />
                    <TextBlock label="Access notes" value={job.access_notes} />
                    <TextBlock label="Parking notes" value={job.parking_notes} />

                    <div className="warningBox" style={{ marginTop: 10 }}>
                      Use these figures to check provider payout and platform fee accuracy. Heavy condition, long
                      travel, difficult parking, extra tasks, access issues or short-notice jobs may
                      affect the provider quote shown to the customer.
                    </div>
                  </div>
                </details>

                <details className="adminDetailsSection" open>
                  <summary>Edit payout figures and assign provider</summary>
                  <div style={{ marginTop: 12 }}>
                    <div className="formGrid">
                      <label className="field">
                        <span>Customer price (£)</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={draft.customer_total_price}
                          onChange={(event) =>
                            updatePriceDraft(job.id, "customer_total_price", event.target.value)
                          }
                          placeholder="Example: 180"
                        />
                      </label>

                      <label className="field">
                        <span>WMC fee percentage (%)</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={draft.wmc_fee_percent}
                          onChange={(event) =>
                            updatePriceDraft(job.id, "wmc_fee_percent", event.target.value)
                          }
                          placeholder="Default: 15"
                        />
                      </label>

                      <label className="field">
                        <span>WMC fee amount (£)</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={draft.wmc_fee_amount}
                          onChange={(event) =>
                            updatePriceDraft(job.id, "wmc_fee_amount", event.target.value)
                          }
                          placeholder="Example: 36"
                        />
                      </label>

                      <label className="field">
                        <span>Cleaner payout (£)</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={draft.cleaner_payout}
                          onChange={(event) =>
                            updatePriceDraft(job.id, "cleaner_payout", event.target.value)
                          }
                          placeholder="Example: 144"
                        />
                      </label>

                      <label className="field">
                        <span>Business payout (£)</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={draft.business_payout || ""}
                          onChange={(event) =>
                            updatePriceDraft(job.id, "business_payout", event.target.value)
                          }
                          placeholder="Example: 144"
                        />
                      </label>

                      <label className="field">
                        <span>Estimated hours</span>
                        <input
                          type="number"
                          min="0"
                          step="0.5"
                          value={draft.estimated_hours}
                          onChange={(event) =>
                            updatePriceDraft(job.id, "estimated_hours", event.target.value)
                          }
                          placeholder="Example: 4"
                        />
                      </label>
                    </div>

                    <div className="actionRow">
                      <button type="button" className="btn btnGreen" onClick={() => calculateFromFeePercent(job.id)}>
                        Calculate from WMC %
                      </button>

                      <button type="button" className="btn btnSecondary" onClick={() => calculateFromCleanerPayout(job.id)}>
                        Calculate from cleaner payout
                      </button>

                      <button
                        type="button"
                        className="btn btnPrimary"
                        onClick={() => saveFigures(job)}
                        disabled={Boolean(savingFigures[job.id])}
                      >
                        {savingFigures[job.id] ? "Saving..." : "Save figures"}
                      </button>
                    </div>

                    <div className="notice" style={{ marginTop: 12 }}>
                      Preview: customer pays <strong>{formatMoney(draft.customer_total_price)}</strong>, WMC fee{" "}
                      <strong>{formatMoney(draft.wmc_fee_amount)}</strong>, cleaner payout{" "}
                      <strong>{formatMoney(draft.cleaner_payout)}</strong>.
                      <br />
                      Default model: WMC keeps a simple 15% platform fee with no joining fee, monthly fee or extra platform subscription charge for approved partners at this stage. In the automated marketplace flow, providers submit their own quotes and the customer chooses one before payment. This section is for checking saved figures, provider payouts and WMC fee transparency after a provider quote has been selected or assigned. Providers should always understand the customer price, WMC's 15% platform fee and their proposed payout before accepting.
                    </div>

                    {assignedCleaner ? (
                      <div className="guideBox" style={{ marginTop: 18 }}>
                        <strong>Assigned cleaner:</strong>
                        <br />
                        {assignedCleaner.full_name || "Cleaner name missing"}
                        {assignedCleaner.business_name ? ` / ${assignedCleaner.business_name}` : ""}
                        <br />
                        Phone: {assignedCleaner.phone || "Not provided"}
                        <br />
                        Email: {assignedCleaner.email || "Not provided"}
                      </div>
                    ) : (
                      <div className="warningBox" style={{ marginTop: 18 }}>
                        No self-employed cleaner assigned yet.
                      </div>
                    )}

                    <label className="field">
                      <span>Manual fallback: assign approved self-employed cleaner</span>
                      <select
                        value={job.assigned_cleaner_id || ""}
                        onChange={(event) => assignCleaner(job.id, event.target.value)}
                      >
                        <option value="">No cleaner assigned</option>
                        {cleaners.map((cleaner) => (
                          <option key={cleaner.id} value={cleaner.id}>
                            {cleaner.full_name}
                            {cleaner.business_name ? ` / ${cleaner.business_name}` : ""} —{" "}
                            {cleaner.phone}
                          </option>
                        ))}
                      </select>
                    </label>

                    {cleaners.length === 0 && (
                      <div className="warningBox">
                        No approved cleaner partners found. Add or approve a cleaner in Supabase first.
                      </div>
                    )}



                    {assignedBusiness ? (
                      <div className="guideBox" style={{ marginTop: 18 }}>
                        <strong>Assigned business:</strong>
                        <br />
                        {getBusinessDisplayName(assignedBusiness)}
                        <br />
                        Contact: {assignedBusiness.contact_name || "Not provided"}
                        <br />
                        Phone: {assignedBusiness.phone || "Not provided"}
                        <br />
                        Email: {assignedBusiness.email || "Not provided"}
                        {assignedBusinessInterest ? (
                          <>
                            <br />
                            Cleaner attending: {assignedBusinessInterest.cleaner_name || "Not provided"}
                            <br />
                            Cleaner phone: {assignedBusinessInterest.cleaner_phone || "Not provided"}
                          </>
                        ) : null}
                      </div>
                    ) : (
                      <div className="warningBox" style={{ marginTop: 18 }}>
                        No business partner assigned yet.
                      </div>
                    )}

                    <label className="field">
                      <span>Manual fallback: assign approved business partner</span>
                      <select
                        value={job.assigned_business_partner_id || ""}
                        onChange={(event) => assignBusinessManually(job.id, event.target.value)}
                      >
                        <option value="">No business assigned</option>
                        {businesses.map((business) => (
                          <option key={business.id} value={business.id}>
                            {getBusinessDisplayName(business)} — {business.phone}
                          </option>
                        ))}
                      </select>
                    </label>

                    {businesses.length === 0 && (
                      <div className="warningBox">
                        No approved business partners found. Approve a business in /admin/business-partners first.
                      </div>
                    )}

                    <div className="notice" style={{ marginTop: 12 }}>
                      <strong>Automated marketplace checklist:</strong>
                      <br />
                      1. Customer posts a request and suitable approved providers are notified.
                      <br />
                      2. Providers submit quotes with their customer price, availability and message.
                      <br />
                      3. Customer compares quotes, chooses a provider and then pays securely.
                      <br />
                      4. After payment, the selected provider is confirmed and the booking can move to <strong>9. Selected provider assigned</strong>.
                      <br />
                      5. When the selected provider starts, use <strong>10. In progress</strong>.
                      <br />
                      6. When the job is completed, use <strong>11. Completed</strong>. The customer can confirm completion or report an issue.
                      <br />
                      7. If no issue is open after the 48-hour issue window, use <strong>12. Payout ready</strong> or let the completion flow/cron make the payout eligible.
                      <br />
                      8. Manual payment/assignment controls are only backup tools for exceptions, failed automation or disputes.
                    </div>

                    <label className="field">
                      <span>Job status</span>
                      <select
                        value={job.job_status}
                        onChange={(event) => updateJob(job.id, { job_status: event.target.value })}
                      >
                        {jobStatusOptions.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="field">
                      <span>Payment status</span>
                      <select
                        value={job.payment_status}
                        onChange={(event) =>
                          updateJob(job.id, { payment_status: event.target.value })
                        }
                      >
                        {paymentStatusOptions.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </details>



                <details className="adminDetailsSection">
                  <summary>Interested business partners</summary>
                  <div className="guideBox" style={{ marginTop: 12 }}>
                    <strong>Interested business partners:</strong>
                    <br />
                    {interestedBusinesses.length === 0 ? (
                      <span>No business has accepted this opportunity yet.</span>
                    ) : (
                      <div style={{ display: "grid", gap: 12, marginTop: 10 }}>
                        {interestedBusinesses.map((interest) => {
                          const business = interest.business_partners;

                          return (
                            <div key={interest.id} className="notice">
                              <strong>{getBusinessDisplayName(business)}</strong>
                              <br />
                              Contact: {business?.contact_name || "Not provided"}
                              <br />
                              Phone: {business?.phone || "Not provided"}
                              <br />
                              Email: {business?.email || "Not provided"}
                              <br />
                              Cleaner attending: {interest.cleaner_name || "Not provided"}
                              <br />
                              Cleaner phone: {interest.cleaner_phone || "Not provided"}
                              <br />
                              Message: {interest.business_message || "No message"}
                              <div className="actionRow" style={{ marginTop: 10 }}>
                                <button
                                  type="button"
                                  className="btn btnPrimary"
                                  onClick={() => assignBusinessInterest(job.id, interest)}
                                >
                                  Approve this business for job
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </details>

                <details className="adminDetailsSection">
                  <summary>Interested cleaner partners</summary>
                  <div className="guideBox" style={{ marginTop: 12 }}>
                    <strong>Interested cleaner partners:</strong>
                    <br />
                    {interestedCleaners.length === 0 ? (
                      <span>No cleaner has shown interest yet.</span>
                    ) : (
                      <div style={{ display: "grid", gap: 12, marginTop: 10 }}>
                        {interestedCleaners.map((interest) => {
                          const cleaner = interest.cleaner_partners;

                          return (
                            <div key={interest.id} className="notice">
                              <strong>{cleaner?.full_name || "Cleaner name missing"}</strong>
                              {cleaner?.business_name ? ` / ${cleaner.business_name}` : ""}
                              <br />
                              Phone: {cleaner?.phone || "Not provided"}
                              <br />
                              Email: {cleaner?.email || "Not provided"}
                              <br />
                              Message: {interest.cleaner_message || "No message"}
                              <div className="actionRow" style={{ marginTop: 10 }}>
                                <button
                                  type="button"
                                  className="btn btnPrimary"
                                  onClick={() => assignCleaner(job.id, cleaner?.id)}
                                >
                                  Assign this cleaner
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </details>

                <label className="field" style={{ marginTop: 12 }}>
                  <span>Admin notes</span>
                  <textarea
                    defaultValue={job.admin_notes || ""}
                    onBlur={(event) => updateJob(job.id, { admin_notes: event.target.value })}
                    placeholder="Private notes for WMC only"
                  />
                </label>
              </article>
            );
          })}
        </div>

        {!loading && jobs.length === 0 && savedPassword && (
          <div className="notice" style={{ marginTop: 24 }}>
            No customer booking requests found yet.
          </div>
        )}
      </section>
    </main>
  );
}
