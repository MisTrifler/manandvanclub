"use client";

import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  bookingReference: "",
  topic: "Customer booking support",
  message: ""
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Unable to send your message. Please try again.");
      }

      setStatus({
        type: "success",
        message: "Thank you. Your message has been sent to WMC. We will reply by email where needed."
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.message || "Unable to send your message. Please try again."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="contactForm" onSubmit={handleSubmit}>
      <div className="grid2">
        <label>
          <span>Your name</span>
          <input
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your full name"
            required
          />
        </label>

        <label>
          <span>Email address</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>
      </div>

      <div className="grid2">
        <label>
          <span>WMC booking reference, if you have one</span>
          <input
            value={form.bookingReference}
            onChange={(event) => update("bookingReference", event.target.value)}
            placeholder="Example: WMC-2026-1234"
          />
        </label>

        <label>
          <span>What is this about?</span>
          <select value={form.topic} onChange={(event) => update("topic", event.target.value)}>
            <option>Customer booking support</option>
            <option>Provider quote or booking issue</option>
            <option>Payment or refund question</option>
            <option>Business partner enquiry</option>
            <option>Self-employed cleaner partner enquiry</option>
            <option>Other enquiry</option>
          </select>
        </label>
      </div>

      <label>
        <span>Message</span>
        <textarea
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="Tell us what you need help with. Please include the booking reference if your message is about an existing request."
          rows={7}
          required
        />
      </label>

      {status.type !== "idle" && (
        <div className={status.type === "success" ? "successBox" : "warningBox"}>
          {status.message}
        </div>
      )}

      <button className="btn btnGreen" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
