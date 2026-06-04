"use client";

import { useMemo, useState } from "react";

const initialForm = {
  businessName: "",
  businessPhone: "",
  bookingReference: "",
  bookingDate: "",
  bookingTime: "",
  cleanerName: "",
  cleanerPhone: "",
  confirmAuthorised: false,
  confirmInsurance: false,
  confirmAttendance: false,
  confirmWmcApproval: false,
};

export default function BusinessPortalPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requiredMissing = useMemo(() => {
    const requiredFields = [
      "businessName",
      "businessPhone",
      "bookingReference",
      "bookingDate",
      "bookingTime",
      "cleanerName",
      "cleanerPhone",
    ];

    return requiredFields.some((field) => !String(form[field] || "").trim());
  }, [form]);

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function updateCheckbox(name, checked) {
    setForm((current) => ({
      ...current,
      [name]: checked,
    }));
  }

  function validateClientSide() {
    if (requiredMissing) {
      return "Please complete all required fields marked with *.";
    }

    if (
      !form.confirmAuthorised ||
      !form.confirmInsurance ||
      !form.confirmAttendance ||
      !form.confirmWmcApproval
    ) {
      return "Please tick all confirmations before submitting.";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    const validationError = validateClientSide();

    if (validationError) {
      setStatus({
        type: "error",
        message: validationError,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/business-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus({
          type: "error",
          message:
            result?.error ||
            "Something went wrong. Please check the details and try again.",
        });
        return;
      }

      setStatus({
        type: "success",
        message:
          result?.message ||
          "Cleaner details submitted. WMC will review and confirm the next step.",
      });

      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          "Unable to submit the cleaner details right now. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page">
      <section className="section shell">
        <div className="card formCard">
          <p className="notice">Approved business partners only</p>

          <h1>Confirm cleaner attending</h1>

          <p>
            Use this page to confirm which cleaner will attend the WMC booking
            you have already been offered. Please only submit this form after
            WMC has shared the booking reference with your business.
          </p>

          <div className="warningBox">
            <strong>Important:</strong> The cleaner must not attend until WMC
            confirms the cleaner details and releases the final job information
            to your business.
          </div>

          <form onSubmit={handleSubmit}>
            <h2>Business details</h2>

            <div className="formGrid">
              <label className="field">
                <span>Business name *</span>
                <input
                  type="text"
                  value={form.businessName}
                  onChange={(event) =>
                    updateField("businessName", event.target.value)
                  }
                  required
                />
              </label>

              <label className="field">
                <span>Business phone number *</span>
                <input
                  type="tel"
                  value={form.businessPhone}
                  onChange={(event) =>
                    updateField("businessPhone", event.target.value)
                  }
                  required
                />
              </label>
            </div>

            <h2>WMC booking details</h2>

            <div className="formGrid">
              <label className="field">
                <span>WMC booking reference *</span>
                <input
                  type="text"
                  value={form.bookingReference}
                  onChange={(event) =>
                    updateField("bookingReference", event.target.value)
                  }
                  placeholder="Example: WMC-2026-1234"
                  required
                />
              </label>

              <label className="field">
                <span>Booking date *</span>
                <input
                  type="date"
                  value={form.bookingDate}
                  onChange={(event) =>
                    updateField("bookingDate", event.target.value)
                  }
                  required
                />
              </label>

              <label className="field">
                <span>Booking time *</span>
                <input
                  type="time"
                  value={form.bookingTime}
                  onChange={(event) =>
                    updateField("bookingTime", event.target.value)
                  }
                  required
                />
              </label>
            </div>

            <h2>Cleaner attending</h2>

            <div className="formGrid">
              <label className="field">
                <span>Cleaner name *</span>
                <input
                  type="text"
                  value={form.cleanerName}
                  onChange={(event) =>
                    updateField("cleanerName", event.target.value)
                  }
                  required
                />
              </label>

              <label className="field">
                <span>Cleaner phone number *</span>
                <input
                  type="tel"
                  value={form.cleanerPhone}
                  onChange={(event) =>
                    updateField("cleanerPhone", event.target.value)
                  }
                  required
                />
              </label>
            </div>

            <div className="guideBox">
              <h2>Confirmations</h2>

              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={form.confirmAuthorised}
                  onChange={(event) =>
                    updateCheckbox("confirmAuthorised", event.target.checked)
                  }
                  required
                />
                <span>
                  I confirm the named cleaner is authorised by my business to
                  attend this WMC booking.
                </span>
              </label>

              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={form.confirmInsurance}
                  onChange={(event) =>
                    updateCheckbox("confirmInsurance", event.target.checked)
                  }
                  required
                />
                <span>
                  I confirm the named cleaner is covered under my business
                  insurance where applicable.
                </span>
              </label>

              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={form.confirmAttendance}
                  onChange={(event) =>
                    updateCheckbox("confirmAttendance", event.target.checked)
                  }
                  required
                />
                <span>
                  I confirm the named cleaner can attend at the agreed booking
                  date and time.
                </span>
              </label>

              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={form.confirmWmcApproval}
                  onChange={(event) =>
                    updateCheckbox("confirmWmcApproval", event.target.checked)
                  }
                  required
                />
                <span>
                  I understand WMC must confirm the named cleaner before final
                  job information is released to my business.
                </span>
              </label>
            </div>

            {status.message ? (
              <div
                className={status.type === "success" ? "notice" : "warningBox"}
                role="status"
              >
                {status.message}
              </div>
            ) : null}

            <button
              className="btn btnPrimary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit cleaner details"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
