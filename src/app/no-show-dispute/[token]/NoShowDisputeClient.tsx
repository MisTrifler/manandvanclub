"use client";

import { useState } from "react";
import { Loader2, ShieldAlert, CheckCircle2 } from "lucide-react";
import { BrandIcon } from "@/components/BrandLogo";

interface Props {
  token: string;
  firstName: string;
  moveType: string;
  colPostcode: string;
  delPostcode: string;
  moveDate: string;
  waitMinutes: number;
  contactAttempts: number;
  disputeUntil: string;
}

export default function NoShowDisputeClient({
  token, firstName, moveType, colPostcode, delPostcode, moveDate,
  waitMinutes, contactAttempts, disputeUntil,
}: Props) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deadline = new Date(disputeUntil).toLocaleString("en-GB", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  });

  const submit = async () => {
    if (reason.trim().length < 20) {
      setError("Please describe what happened (at least 20 characters).");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/customer/no-show-dispute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, reason: reason.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7] p-6">
        <div className="max-w-md text-center space-y-6 bg-white border border-border rounded-3xl p-8 shadow-sm">
          <CheckCircle2 size={48} className="mx-auto text-green-600" />
          <h1 className="text-3xl font-black text-primary tracking-tighter">Dispute Received</h1>
          <p className="text-text-secondary leading-relaxed">
            Our team will review the information from you and the mover before making a decision. No further action is needed right now unless we contact you for more information.
          </p>
          <a href="/" className="btn-orange inline-block px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm">Return Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F7] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <BrandIcon className="mb-4" />
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tighter uppercase">Dispute No-Show Report</h1>
          <p className="text-text-secondary mt-3">
            Hi {firstName || "there"}, tell us what happened and our team will review it fairly.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-border p-6 md:p-8 shadow-sm space-y-6">
          <div className="bg-gray-50 rounded-2xl border border-border/60 p-5 space-y-2">
            <p className="text-xs font-black uppercase tracking-widest text-primary/40">Reported details</p>
            <p className="text-sm text-text-secondary"><strong className="text-primary">Move:</strong> {moveType}</p>
            <p className="text-sm text-text-secondary"><strong className="text-primary">Route:</strong> {colPostcode} to {delPostcode}</p>
            <p className="text-sm text-text-secondary"><strong className="text-primary">Move date:</strong> {moveDate || "—"}</p>
            <p className="text-sm text-text-secondary"><strong className="text-primary">Mover wait time:</strong> {waitMinutes} minutes</p>
            <p className="text-sm text-text-secondary"><strong className="text-primary">Contact attempts:</strong> {contactAttempts} calls plus text/WhatsApp</p>
          </div>

          <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-4 flex items-start gap-3">
            <ShieldAlert size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              You can dispute this report until <strong>{deadline}</strong>. After review, your deposit may be retained to cover reasonable attendance and waiting costs, or refunded if the report is not approved.
            </p>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-primary/50 block mb-2">
              What happened? Why is this report incorrect?
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={5}
              placeholder="For example: I was at the property the whole time, the mover went to the wrong address, I received no calls or messages…"
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-medium text-sm outline-none resize-none"
            />
            <p className="text-[10px] text-text-secondary/60 mt-1">Minimum 20 characters.</p>
          </div>

          {error && (
            <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-red-600 text-sm font-bold">{error}</div>
          )}

          <button
            onClick={submit}
            disabled={loading}
            className="btn-orange w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Submit Dispute"}
          </button>
        </div>
      </div>
    </div>
  );
}
