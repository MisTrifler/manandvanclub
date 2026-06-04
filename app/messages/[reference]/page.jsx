"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

const quickMessages = {
  customer: [
    "Hi, I just want to confirm the arrival time for this booking.",
    "Please let me know if you need any extra access or parking information.",
    "I have a question about products/equipment for this clean.",
    "Thank you, I will wait for your update."
  ],
  provider: [
    "Hi, I can confirm I am available for the agreed time.",
    "Please confirm any access or parking details before I attend.",
    "I may need a little more information about the property condition.",
    "Thank you, I will keep you updated if anything changes."
  ]
};

function formatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function formatBookingDate(value) {
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

function statusText(value) {
  return String(value || "Not set").replaceAll("_", " ");
}

function statusTone(job) {
  if (job?.has_open_issue) return { label: "Issue open — WMC can step in", tone: "#fff1f2", border: "#fecdd3" };
  if (job?.customer_confirmed_completed_at) return { label: "Completed and customer confirmed", tone: "#ecfdf5", border: "#bbf7d0" };
  if (job?.provider_marked_completed_at) return { label: "Provider marked completed — 48-hour issue window", tone: "#eff6ff", border: "#bfdbfe" };
  if (job?.payment_status === "paid") return { label: "Paid and confirmed", tone: "#ecfdf5", border: "#bbf7d0" };
  return { label: "Booking in progress", tone: "#fffbeb", border: "#fde68a" };
}

async function safeJson(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { error: text || "Server returned an invalid response." };
  }
}

export default function BookingMessagesPage() {
  const params = useParams();
  const reference = useMemo(() => decodeURIComponent(String(params?.reference || "")).toUpperCase(), [params]);

  const [role, setRole] = useState("customer");
  const [providerType, setProviderType] = useState("cleaner");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [messageText, setMessageText] = useState("");
  const [job, setJob] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const currentTone = statusTone(job);

  useEffect(() => {
    const savedCustomerPhone = window.localStorage.getItem(`wmc_messages_customer_phone_${reference}`) || "";
    const savedProviderEmail = window.localStorage.getItem("wmc_messages_provider_email") || "";
    const savedProviderPhone = window.localStorage.getItem("wmc_messages_provider_phone") || "";
    if (savedCustomerPhone) setPhone(savedCustomerPhone);
    if (savedProviderEmail) setEmail(savedProviderEmail);
    if (savedProviderPhone && !savedCustomerPhone) setPhone(savedProviderPhone);
  }, [reference]);

  async function callMessagesApi(action, extra = {}) {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference, role, providerType, email, phone, action, ...extra })
    });
    const data = await safeJson(response);
    if (!response.ok) throw new Error(data?.error || "Could not process message request.");
    return data;
  }

  async function loadMessages(event) {
    if (event) event.preventDefault();
    setLoading(true);
    setNotice("");
    setErrorMessage("");

    try {
      const data = await callMessagesApi("load");
      setJob(data.job);
      setMessages(data.messages || []);
      if (role === "customer") window.localStorage.setItem(`wmc_messages_customer_phone_${reference}`, phone);
      if (role === "provider") {
        window.localStorage.setItem("wmc_messages_provider_email", email);
        window.localStorage.setItem("wmc_messages_provider_phone", phone);
      }
      if ((data.messages || []).length === 0) {
        setNotice("No messages yet. Send the first message below if you need to clarify anything.");
      } else {
        setNotice(`Loaded ${data.messages.length} message${data.messages.length === 1 ? "" : "s"}.`);
      }
    } catch (error) {
      setJob(null);
      setMessages([]);
      setErrorMessage(error?.message || "Could not load messages.");
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage(event) {
    event.preventDefault();
    setSending(true);
    setNotice("");
    setErrorMessage("");

    try {
      const data = await callMessagesApi("send", { messageText });
      setJob(data.job);
      setMessages(data.messages || []);
      setMessageText("");
      setNotice("Message sent. The other side may receive an email notification.");
    } catch (error) {
      setErrorMessage(error?.message || "Could not send message.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">WMC booking messages</p>
          <h1>Message about booking {reference}</h1>
          <p>
            Use this page for booking-related messages between the customer and the selected provider.
            WMC can review platform messages only where needed for support, safety, quality checks,
            complaints or disputes.
          </p>
        </div>

        <div className="grid2" style={{ alignItems: "start", marginBottom: 24 }}>
          <div className="card formCard">
            <h2>Open secure messages</h2>
            <p className="notice">
              Choose whether you are the customer or the selected provider, then enter the details
              used on the booking/provider account.
            </p>

            <form onSubmit={loadMessages}>
              <label className="field">
                <span>I am the</span>
                <select value={role} onChange={(event) => setRole(event.target.value)}>
                  <option value="customer">Customer</option>
                  <option value="provider">Selected provider</option>
                </select>
              </label>

              {role === "provider" && (
                <>
                  <label className="field">
                    <span>Provider type</span>
                    <select value={providerType} onChange={(event) => setProviderType(event.target.value)}>
                      <option value="cleaner">Self-employed cleaner partner</option>
                      <option value="business">Cleaning business partner</option>
                    </select>
                  </label>
                  <label className="field">
                    <span>Approved provider email</span>
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email used on your WMC provider account" />
                  </label>
                </>
              )}

              <label className="field">
                <span>{role === "customer" ? "Phone number used on booking" : "Approved provider phone"}</span>
                <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Example: 07XXXXXXXXX" required />
              </label>

              <button className="btn btnPrimary" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Open messages"}
              </button>
            </form>
          </div>

          <aside className="card sideCard">
            <p className="kicker">How to use messages</p>
            <h2>Keep everything clear.</h2>
            <div className="statusList">
              <div className="statusRow">
                <span>Use messages for arrival, access, parking and booking questions.</span>
                <strong>Booking only</strong>
              </div>
              <div className="statusRow">
                <span>Do not arrange private off-platform work or extra payments.</span>
                <strong>Stay on WMC</strong>
              </div>
              <div className="statusRow">
                <span>If an issue cannot be resolved directly, report it so WMC can review.</span>
                <strong>Support</strong>
              </div>
            </div>
          </aside>
        </div>

        {errorMessage && <div className="warningBox">{errorMessage}</div>}
        {notice && <div className="notice">{notice}</div>}

        {job && (
          <div className="card sideCard" style={{ marginBottom: 24 }}>
            <div
              className="notice"
              style={{ background: currentTone.tone, borderColor: currentTone.border, marginBottom: 16 }}
            >
              <strong>Current status:</strong> {currentTone.label}
            </div>

            <h2>{job.service_type || "Cleaning booking"}</h2>
            <div className="grid2">
              <p>
                <strong>Provider:</strong> {job.provider_display_name || "Selected provider"}<br />
                <strong>Date/time:</strong> {formatBookingDate(job.preferred_date)} at {formatTime(job.preferred_time)}<br />
                <strong>Status:</strong> {statusText(job.job_status)}<br />
                <strong>Payment:</strong> {statusText(job.payment_status)}
              </p>
              <p>
                <strong>Issue status:</strong> {job.has_open_issue ? "Open issue / payout paused" : statusText(job.issue_status || "none")}<br />
                <strong>Provider completed:</strong> {job.provider_marked_completed_at ? formatDateTime(job.provider_marked_completed_at) : "Not yet"}<br />
                <strong>Customer confirmed:</strong> {job.customer_confirmed_completed_at ? formatDateTime(job.customer_confirmed_completed_at) : "Not yet"}
              </p>
            </div>
            <div className="actionRow">
              <a className="btn btnSecondary" href={`/issue/${encodeURIComponent(reference)}`}>Report or view issue options</a>
              <a className="btn btnSecondary" href={`/review/${encodeURIComponent(reference)}`}>Leave provider review</a>
              <a className="btn btnSecondary" href={`/quotes/${encodeURIComponent(reference)}`}>View booking quotes</a>
            </div>
          </div>
        )}

        {job && (
          <div className="card formCard" style={{ marginBottom: 24 }}>
            <h2>Send a message</h2>
            <p>
              Keep the message short and clear. If you need to report a serious problem, use the
              issue page so payout can be paused if needed.
            </p>

            <div className="pillRow" style={{ marginBottom: 14 }}>
              {quickMessages[role].map((template) => (
                <button
                  key={template}
                  type="button"
                  className="pill"
                  onClick={() => setMessageText(template)}
                  style={{ cursor: "pointer" }}
                >
                  {template}
                </button>
              ))}
            </div>

            <form onSubmit={sendMessage}>
              <label className="field">
                <span>Your message</span>
                <textarea rows="5" value={messageText} onChange={(event) => setMessageText(event.target.value)} placeholder="Keep messages clear and related to this booking." required />
              </label>
              <button className="btn btnPrimary" type="submit" disabled={sending}>{sending ? "Sending..." : "Send message"}</button>
            </form>
          </div>
        )}

        {job && (
          <div className="statusList">
            {messages.length === 0 ? (
              <div className="card infoCard">
                <p className="kicker">No messages yet</p>
                <h3>Start the conversation above.</h3>
                <p>Messages should stay related to this WMC booking.</p>
              </div>
            ) : (
              messages.map((message) => (
                <article key={message.id} className="card infoCard">
                  <p className="kicker">{message.sender_role === "customer" ? "Customer" : message.sender_role === "provider" ? "Provider" : "WMC"}</p>
                  <h3>{message.sender_name}</h3>
                  <p style={{ whiteSpace: "pre-wrap" }}>{message.message_text}</p>
                  <p className="notice">Sent {formatDateTime(message.created_at)}</p>
                </article>
              ))
            )}
          </div>
        )}
      </section>
    </main>
  );
}
