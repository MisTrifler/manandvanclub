"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const REASONS = [
  "Price was too high",
  "Move date or time no longer works",
  "I wanted a different service option",
  "I found another mover",
  "I no longer need to move",
  "I missed the quote before it expired",
  "Other",
];

interface Props {
  token: string;
  firstName: string;
  moveType: string;
  colPostcode: string;
  delPostcode: string;
  moveDate: string;
  lastOutcome: "declined" | "expired";
}

export default function QuoteFeedbackClient({
  token, firstName, moveType, colPostcode, delPostcode, moveDate, lastOutcome,
}: Props) {
  const [stillNeedsHelp, setStillNeedsHelp] = useState<"yes" | "no" | "">("");
  const [reason, setReason] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    if (!stillNeedsHelp) { setError("Please tell us whether you still need help with this move."); return; }
    if (!reason) { setError("Please choose the main reason."); return; }
    const min = budgetMin ? parseFloat(budgetMin) : null;
    const max = budgetMax ? parseFloat(budgetMax) : null;
    if (stillNeedsHelp === "yes" && (!max || max <= 0)) { setError("Please tell us your maximum budget so we can review your request."); return; }
    if (min !== null && (!Number.isFinite(min) || min < 0)) { setError("Budget values must be positive numbers."); return; }
    if (max !== null && (!Number.isFinite(max) || max < 0)) { setError("Budget values must be positive numbers."); return; }
    if (min !== null && max !== null && max < min) { setError("Maximum budget must be at least the minimum budget."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/customer/quote-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          stillNeedsHelp: stillNeedsHelp === "yes",
          reason,
          budgetMin: min,
          budgetMax: max,
          notes: notes.trim().slice(0, 1000),
        }),
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
          <h1 className="text-3xl font-black text-primary tracking-tighter">Thanks — Feedback Received</h1>
          <p className="text-text-secondary leading-relaxed">
            Our team will review it and decide whether your request should be made available to movers again.
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
          <div className="bg-primary px-3 py-2 rounded-xl inline-block mb-4">
            <span className="text-white font-black text-xl leading-none">M&amp;V</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tighter uppercase">Still Need Help With Your Move?</h1>
          <p className="text-text-secondary mt-3 max-w-lg mx-auto">
            Hi {firstName || "there"} — {lastOutcome === "expired"
              ? "your quote was not accepted before it expired."
              : "you chose not to go ahead with your quote."} If you still need help, tell us what would work better and we&apos;ll review whether we can send it back to approved movers.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-border p-6 md:p-8 shadow-sm space-y-6">
          <div className="bg-gray-50 rounded-2xl border border-border/60 p-5 space-y-1">
            <p className="text-xs font-black uppercase tracking-widest text-primary/40">Your move</p>
            <p className="text-sm text-text-secondary"><strong className="text-primary">{moveType}</strong></p>
            <p className="text-sm text-text-secondary">{colPostcode} to {delPostcode}</p>
            <p className="text-sm text-text-secondary">{moveDate || "Date to be confirmed"}</p>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-primary/50 block mb-2">Do you still need help with this move?</label>
            <div className="grid grid-cols-2 gap-2">
              {(["yes", "no"] as const).map((v) => (
                <button key={v} onClick={() => setStillNeedsHelp(v)}
                  className={`py-3 rounded-xl border-2 font-black uppercase tracking-widest text-sm transition-all ${stillNeedsHelp === v ? "border-accent bg-accent/10 text-accent" : "border-border text-primary/50 hover:border-accent/40"}`}>
                  {v === "yes" ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-primary/50 block mb-2">What was the main reason?</label>
            <select value={reason} onChange={(e) => setReason(e.target.value)}
              className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none appearance-none">
              <option value="">Select a reason</option>
              {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-primary/50 block mb-2">What budget range would work for you?</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input type="number" min="0" value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} placeholder="Minimum (£, optional)"
                  className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
              </div>
              <div>
                <input type="number" min="0" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} placeholder={stillNeedsHelp === "yes" ? "Maximum (£)" : "Maximum (£, optional)"}
                  className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-primary/50 block mb-2">Anything else we should know? (Optional)</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} maxLength={1000}
              placeholder="e.g. flexible on dates, fewer items than before, different service option preferred"
              className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-medium text-sm outline-none resize-none" />
          </div>

          {error && <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-red-600 text-sm font-bold">{error}</div>}

          <button onClick={submit} disabled={loading}
            className="btn-orange w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Send Feedback"}
          </button>
          <p className="text-[10px] text-text-secondary/60 text-center">
            We will review your feedback before deciding whether to make the request available to movers again.
          </p>
        </div>
      </div>
    </div>
  );
}
