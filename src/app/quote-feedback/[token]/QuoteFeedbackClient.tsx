"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { isClosingReason, shouldShowBudgetFields } from "@/lib/quote-attempts-shared";

const REASONS = [
  "Price was too high",
  "I need a different service option",
  "Date or time no longer works",
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

  const clearBudget = () => {
    setBudgetMin("");
    setBudgetMax("");
  };

  const handleReasonChange = (newReason: string) => {
    setReason(newReason);
    if (isClosingReason(newReason)) {
      setStillNeedsHelp("no");
      clearBudget();
    } else if (!shouldShowBudgetFields(stillNeedsHelp, newReason)) {
      clearBudget();
    }
  };

  const handleStillNeedsHelpChange = (value: "yes" | "no") => {
    setStillNeedsHelp(value);
    if (value === "no" || !shouldShowBudgetFields(value, reason)) clearBudget();
  };

  const submit = async () => {
    setError(null);
    if (!stillNeedsHelp) { setError("Please tell us whether you still need help with this move."); return; }
    if (!reason) { setError("Please choose the main reason."); return; }
    const min = budgetMin ? parseFloat(budgetMin) : null;
    const max = budgetMax ? parseFloat(budgetMax) : null;
    if (min !== null && (!Number.isFinite(min) || min < 0)) { setError("Budget values must be positive numbers."); return; }
    if (max !== null && (!Number.isFinite(max) || max < 0)) { setError("Budget values must be positive numbers."); return; }
    if (min !== null && max !== null && max < min) { setError("Maximum budget must be at least the minimum budget."); return; }

    setLoading(true);
    try {
      const closeReason = isClosingReason(reason);
      const res = await fetch("/api/customer/quote-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          stillNeedsHelp: closeReason ? false : stillNeedsHelp === "yes",
          reason,
          budgetMin: shouldShowBudgetFields(stillNeedsHelp, reason) ? min : null,
          budgetMax: shouldShowBudgetFields(stillNeedsHelp, reason) ? max : null,
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

  const isReopening = stillNeedsHelp === "yes" && !isClosingReason(reason);

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7] p-6">
        <div className="max-w-md text-center space-y-6 bg-white border border-border rounded-3xl p-8 shadow-sm">
          <CheckCircle2 size={48} className="mx-auto text-green-600" />
          <h1 className="text-3xl font-black text-primary tracking-tighter">
            {isReopening ? "Request Available Again" : "Request Closed"}
          </h1>
          <p className="text-text-secondary leading-relaxed">
            {isReopening
              ? "Thanks — we've made your request available again so another approved mover can review it."
              : "Thanks — we've closed your request."}
          </p>
          <p className="text-xs text-text-secondary/70">
            {isReopening
              ? "We cannot guarantee another quote, but approved movers can now review the updated information and send quote options if they can help."
              : "If you need help with another move, you can submit a new request any time."}
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
          <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tighter uppercase">Update or close your move request</h1>
          <p className="text-text-secondary mt-3 max-w-lg mx-auto">
            Hi {firstName || "there"} — {lastOutcome === "expired"
              ? "your quote was not accepted before it expired."
              : "you chose not to go ahead with your quote."} If you still need help, you can make your request available again for approved movers to review. If you have already found another mover or no longer need help, you can close the request.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(["yes", "no"] as const).map((v) => (
                <button key={v} onClick={() => handleStillNeedsHelpChange(v)}
                  className={`py-3 rounded-xl border-2 font-black uppercase tracking-widest text-xs transition-all ${stillNeedsHelp === v ? "border-accent bg-accent/10 text-primary" : "border-border text-primary/60 hover:border-accent/40"}`}>
                  {v === "yes" ? "Yes, make my request available again" : "No, close my request"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-primary/50 block mb-2">What was the main reason?</label>
            <select value={reason} onChange={(e) => handleReasonChange(e.target.value)}
              className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none appearance-none">
              <option value="">Select a reason</option>
              {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {shouldShowBudgetFields(stillNeedsHelp, reason) && (
            <>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-primary/50 block mb-2">What budget range would work for you? (Optional)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" min="0" value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} placeholder="Minimum £" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  <input type="number" min="0" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} placeholder="Maximum £" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-primary/50 block mb-2">Anything else movers should know? (Optional)</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} maxLength={1000} placeholder="e.g. flexible on dates, fewer items than before" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-medium text-sm outline-none resize-none" />
              </div>
            </>
          )}

          {stillNeedsHelp === "yes" && reason === "I need a different service option" && (
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-primary/50 block mb-2">What service option would work better? (Optional)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} maxLength={1000} placeholder="e.g. transport only, 2 movers, Luton van, help loading and unloading" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-medium text-sm outline-none resize-none" />
            </div>
          )}

          {stillNeedsHelp === "yes" && reason === "Date or time no longer works" && (
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-primary/50 block mb-2">What date or time would work better? (Optional)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} maxLength={1000} placeholder="e.g. flexible this weekend, evenings only, next Friday morning" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-medium text-sm outline-none resize-none" />
            </div>
          )}

          {stillNeedsHelp === "yes" && (reason === "I missed the quote before it expired" || reason === "Other") && (
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-primary/50 block mb-2">Anything movers should know? (Optional)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} maxLength={1000} placeholder="e.g. flexible on dates" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-medium text-sm outline-none resize-none" />
            </div>
          )}

          {stillNeedsHelp === "no" && (
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-primary/50 block mb-2">Anything else you want to tell us? (Optional)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} maxLength={1000} placeholder="Optional note" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-medium text-sm outline-none resize-none" />
            </div>
          )}

          {error && <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-red-600 text-sm font-bold">{error}</div>}

          <button onClick={submit} disabled={loading}
            className="btn-orange w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" size={18} /> : (isReopening ? "Make Request Available Again" : "Close Request")}
          </button>
          <p className="text-[10px] text-text-secondary/60 text-center">
            If you make your request available again, approved movers may review it and send quote options if they can help.
          </p>
        </div>
      </div>
    </div>
  );
}
