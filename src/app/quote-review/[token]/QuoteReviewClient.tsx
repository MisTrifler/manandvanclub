"use client";

import { useMemo, useState } from "react";
import {
  MapPin,
  CalendarDays,
  Tag,
  ArrowRight,
  Loader2,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";
import { formatPounds } from "@/lib/booking-fee";
import { isClosingReason, shouldShowBudgetFields } from "@/lib/quote-attempts-shared";

interface DisplayOption {
  id: string;
  serviceLabel: string;
  serviceDescription: string;
  vanLabel: string;
  totalPrice: number;
  bookingDeposit: number;
  remainingBalance: number;
}

interface Props {
  token: string;
  firstName: string;
  moveType: string;
  colPostcode: string;
  delPostcode: string;
  moveDate: string;
  estimatedPrice: string;
  detailSummary: string[];
  options: DisplayOption[];
  quoteExpiresAt: string;
}

const STANDARD_QUOTE_ASSUMPTION =
  "This quote is based on the move details provided. The price may change if the item list, access, parking, waiting time, distance, or move date changes.";

const DECLINE_REASONS = [
  "Price was too high",
  "I need a different service option",
  "Date or time no longer works",
  "I found another mover",
  "I no longer need to move",
  "I missed the quote before it expired",
  "Other",
];

export default function QuoteReviewClient({
  token,
  firstName,
  moveType,
  colPostcode,
  delPostcode,
  moveDate,
  estimatedPrice,
  detailSummary,
  options,
  quoteExpiresAt,
}: Props) {
  const [loadingOptionId, setLoadingOptionId] = useState<string | null>(null);
  const [declining, setDeclining] = useState(false);
  const [showDeclineReasons, setShowDeclineReasons] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [declineStillNeedsHelp, setDeclineStillNeedsHelp] = useState<"yes" | "no" | "">("");
  const [declineBudgetMin, setDeclineBudgetMin] = useState("");
  const [declineBudgetMax, setDeclineBudgetMax] = useState("");
  const [declineNotes, setDeclineNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loading = loadingOptionId !== null;

  const expiryText = useMemo(() => {
    if (!quoteExpiresAt) return "";
    const date = new Date(quoteExpiresAt);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [quoteExpiresAt]);

  const handleAccept = async (optionId: string) => {
    setLoadingOptionId(optionId);
    setError(null);
    try {
      const res = await fetch("/api/customer/accept-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, selectedQuoteOptionId: optionId }),
      });

      const data = await res.json().catch(() => ({ error: "Something went wrong" }));

      if (!res.ok) {
        setError(data.error || "Quote is no longer available");
        setLoadingOptionId(null);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      setError("Stripe checkout could not be started. Please try again.");
      setLoadingOptionId(null);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoadingOptionId(null);
    }
  };

  const clearDeclineBudget = () => {
    setDeclineBudgetMin("");
    setDeclineBudgetMax("");
  };

  const handleDeclineReasonChange = (newReason: string) => {
    setDeclineReason(newReason);
    if (isClosingReason(newReason)) {
      setDeclineStillNeedsHelp("no");
      clearDeclineBudget();
    } else if (!shouldShowBudgetFields(declineStillNeedsHelp, newReason)) {
      clearDeclineBudget();
    }
  };

  const handleDeclineStillNeedsHelpChange = (value: "yes" | "no") => {
    setDeclineStillNeedsHelp(value);
    if (value === "no" || !shouldShowBudgetFields(value, declineReason)) clearDeclineBudget();
  };

  const handleDecline = async () => {
    setError(null);
    if (declineStillNeedsHelp === "") {
      setError("Please tell us whether you still need help with this move.");
      return;
    }
    if (!declineReason) {
      setError("Please choose the main reason.");
      return;
    }
    const closeReason = isClosingReason(declineReason);
    const showBudget = shouldShowBudgetFields(declineStillNeedsHelp, declineReason);
    const min = showBudget && declineBudgetMin ? parseFloat(declineBudgetMin) : null;
    const max = showBudget && declineBudgetMax ? parseFloat(declineBudgetMax) : null;
    if (min !== null && (!Number.isFinite(min) || min < 0)) {
      setError("Budget values must be positive numbers.");
      return;
    }
    if (max !== null && (!Number.isFinite(max) || max < 0)) {
      setError("Budget values must be positive numbers.");
      return;
    }
    if (min !== null && max !== null && max < min) {
      setError("Maximum budget must be at least the minimum budget.");
      return;
    }
    setDeclining(true);
    try {
      const res = await fetch("/api/customer/decline-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          reason: declineReason,
          stillNeedsHelp: closeReason ? false : declineStillNeedsHelp === "yes",
          budgetMin: min,
          budgetMax: max,
          notes: declineNotes.trim().slice(0, 1000),
        }),
      });

      const data = await res.json().catch(() => ({ error: "Something went wrong" }));

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setDeclining(false);
        return;
      }

      window.location.reload();
    } catch {
      setError("Something went wrong. Please try again.");
      setDeclining(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="bg-primary px-3 py-2 rounded-xl inline-block mb-4">
            <span className="text-white font-black text-xl leading-none">M&amp;V</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tighter uppercase">
            {options.length > 1 ? "Your mover quote options are ready" : "Your mover quote is ready"}
          </h1>
          <p className="text-text-secondary mt-3 max-w-xl mx-auto">
            Hi {firstName || "there"}, a vetted local mover has reviewed your request. No spam, no endless calls.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-border overflow-hidden mb-6 shadow-sm">
          <div className="p-5 md:p-8">
            <p className="text-sm text-text-secondary mb-5">
              Your mover has provided the following {options.length > 1 ? "options" : "quote"}. Choose the one that suits your move best. Your booking deposit is deducted from the option you accept.
            </p>

            <div className="space-y-4 mb-6">
              {options.map((option, index) => (
                <div key={option.id} className="rounded-2xl border-2 border-border hover:border-accent/50 transition-colors overflow-hidden">
                  <div className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-1">
                          {options.length > 1 ? `Option ${index + 1}` : "Mover quote"}
                        </p>
                        <p className="text-xl font-black text-primary tracking-tight">{option.serviceLabel}</p>
                        <p className="text-sm text-text-secondary mt-1">{option.serviceDescription}</p>
                        <p className="text-xs text-text-secondary mt-2"><strong className="text-primary/70">Van:</strong> {option.vanLabel}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Total quote</p>
                        <p className="text-3xl font-black text-primary tracking-tighter">{formatPounds(option.totalPrice)}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 border border-border/60 mb-4">
                      <div className="flex items-center justify-between py-1">
                        <span className="text-xs text-text-secondary">Mover total quote</span>
                        <span className="text-sm font-bold text-primary">{formatPounds(option.totalPrice)}</span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-xs text-text-secondary">Booking deposit (pay today)</span>
                        <span className="text-sm font-bold text-primary">{formatPounds(option.bookingDeposit)}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-t border-dashed border-border">
                        <span className="text-xs font-black text-primary">Pay mover on moving day</span>
                        <span className="font-black text-primary">{formatPounds(option.remainingBalance)}</span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-xs text-text-secondary">Total move cost</span>
                        <span className="text-sm font-bold text-primary">{formatPounds(option.totalPrice)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAccept(option.id)}
                      disabled={loading || declining}
                      className="btn-orange w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-sm disabled:opacity-50"
                    >
                      {loadingOptionId === option.id ? <Loader2 className="animate-spin" size={18} /> : <>Accept this option <ArrowRight size={16} /></>}
                    </button>

                    <p className="text-[11px] text-text-secondary/70 mt-3 leading-relaxed">{STANDARD_QUOTE_ASSUMPTION}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-primary/60" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-primary/40">Move summary</p>
                  <p className="font-bold text-primary">
                    {colPostcode || "—"}
                    <span className="text-primary/30 mx-2">→</span>
                    {delPostcode || "—"}
                  </p>
                  <p className="text-sm text-text-secondary">{moveType}</p>
                </div>
              </div>

              {moveDate && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                    <CalendarDays size={18} className="text-primary/60" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-primary/40">Move date</p>
                    <p className="font-bold text-primary">{moveDate}</p>
                  </div>
                </div>
              )}

              {estimatedPrice && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                    <Tag size={18} className="text-primary/60" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-primary/40">Guide price shown earlier</p>
                    <p className="font-bold text-primary">{estimatedPrice}</p>
                  </div>
                </div>
              )}

              {detailSummary.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                    <ClipboardList size={18} className="text-primary/60" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-primary/40">Details provided</p>
                    <ul className="text-sm text-text-secondary mt-1 space-y-1">
                      {detailSummary.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {expiryText && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800 font-bold">This quote is available for 6 hours — until {expiryText}.</p>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-4 mb-6">
              <p className="text-sm text-amber-800 font-medium">
                Pay the booking deposit on your chosen option to secure your booking and release your details to the mover. The deposit is deducted from that option&apos;s quote, so your total move cost stays the same. You pay the remaining balance directly to the mover on moving day.
              </p>
              <p className="text-xs text-amber-700/80 mt-2">
                If you are unavailable when the mover attends at the agreed time and the no-show is approved after review, your deposit may be retained to cover reasonable attendance and waiting costs. You can dispute a no-show report within 48 hours.
              </p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
              <p className="text-sm text-green-800 font-bold mb-2">What happens next?</p>
              <ol className="text-sm text-green-800/80 space-y-1 list-decimal pl-5">
                <li>Pay the booking deposit today.</li>
                <li>Your contact details are released only to this mover.</li>
                <li>The mover contacts you to confirm timing, access and payment method.</li>
                <li>You pay the remaining balance directly to the mover on moving day.</li>
              </ol>
            </div>

            <div className="bg-white border border-border rounded-xl p-4 mb-6">
              <p className="text-xs text-text-secondary leading-relaxed">
                The booking deposit is refundable if the mover cannot fulfil the accepted booking and we cannot arrange a suitable replacement. It is not normally refundable if you cancel after accepting the quote, provide incorrect move details, materially change the job, or book another mover elsewhere. This does not affect your statutory rights.
              </p>
            </div>

            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-red-600 text-sm font-bold mb-6">{error}</div>
            )}

            <div className="flex flex-col gap-3">
              {!showDeclineReasons ? (
                <button
                  onClick={() => setShowDeclineReasons(true)}
                  disabled={loading || declining}
                  className="w-full py-4 rounded-xl border border-border font-black uppercase tracking-widest text-sm text-primary/60 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Decline Quote
                </button>
              ) : (
                <div className="space-y-3 border border-border rounded-xl p-4 bg-gray-50">
                  <label className="text-xs font-black uppercase tracking-widest text-primary/50 block">Why did this quote not work for you?</label>
                  <select
                    value={declineReason}
                    onChange={(e) => handleDeclineReasonChange(e.target.value)}
                    className="w-full p-3 bg-white border border-border rounded-xl font-bold text-sm outline-none focus:border-accent"
                  >
                    <option value="">Select a reason</option>
                    {DECLINE_REASONS.map((reason) => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>

                  <label className="text-xs font-black uppercase tracking-widest text-primary/50 block">Do you still need help with this move?</label>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => handleDeclineStillNeedsHelpChange("yes")}
                      className={`py-3 px-3 rounded-xl border-2 font-bold text-sm text-left transition-all ${declineStillNeedsHelp === "yes" ? "border-accent bg-accent/10 text-primary" : "border-border bg-white text-primary/60 hover:border-accent/40"}`}
                    >
                      Yes, make my request available again
                    </button>
                    <button
                      onClick={() => handleDeclineStillNeedsHelpChange("no")}
                      className={`py-3 px-3 rounded-xl border-2 font-bold text-sm text-left transition-all ${declineStillNeedsHelp === "no" ? "border-accent bg-accent/10 text-primary" : "border-border bg-white text-primary/60 hover:border-accent/40"}`}
                    >
                      No, close my request
                    </button>
                  </div>

                  {shouldShowBudgetFields(declineStillNeedsHelp, declineReason) && (
                    <>
                      <label className="text-xs font-black uppercase tracking-widest text-primary/50 block">What budget range would work for you? (Optional)</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="number" min="0" value={declineBudgetMin} onChange={(e) => setDeclineBudgetMin(e.target.value)} placeholder="Minimum £" className="w-full p-3 bg-white border border-border rounded-xl font-bold text-sm outline-none focus:border-accent" />
                        <input type="number" min="0" value={declineBudgetMax} onChange={(e) => setDeclineBudgetMax(e.target.value)} placeholder="Maximum £" className="w-full p-3 bg-white border border-border rounded-xl font-bold text-sm outline-none focus:border-accent" />
                      </div>
                      <label className="text-xs font-black uppercase tracking-widest text-primary/50 block">Anything else movers should know? (Optional)</label>
                      <textarea value={declineNotes} onChange={(e) => setDeclineNotes(e.target.value)} rows={2} maxLength={1000} placeholder="e.g. flexible on dates, fewer items than before" className="w-full p-3 bg-white border border-border rounded-xl font-medium text-sm outline-none focus:border-accent resize-none" />
                    </>
                  )}

                  {declineStillNeedsHelp === "yes" && declineReason === "I need a different service option" && (
                    <>
                      <label className="text-xs font-black uppercase tracking-widest text-primary/50 block">What service option would work better? (Optional)</label>
                      <textarea value={declineNotes} onChange={(e) => setDeclineNotes(e.target.value)} rows={2} maxLength={1000} placeholder="e.g. transport only, 2 movers, Luton van, help loading and unloading" className="w-full p-3 bg-white border border-border rounded-xl font-medium text-sm outline-none focus:border-accent resize-none" />
                    </>
                  )}

                  {declineStillNeedsHelp === "yes" && declineReason === "Date or time no longer works" && (
                    <>
                      <label className="text-xs font-black uppercase tracking-widest text-primary/50 block">What date or time would work better? (Optional)</label>
                      <textarea value={declineNotes} onChange={(e) => setDeclineNotes(e.target.value)} rows={2} maxLength={1000} placeholder="e.g. flexible this weekend, evenings only, next Friday morning" className="w-full p-3 bg-white border border-border rounded-xl font-medium text-sm outline-none focus:border-accent resize-none" />
                    </>
                  )}

                  {declineStillNeedsHelp === "yes" && (declineReason === "I missed the quote before it expired" || declineReason === "Other") && (
                    <>
                      <label className="text-xs font-black uppercase tracking-widest text-primary/50 block">Anything movers should know? (Optional)</label>
                      <textarea value={declineNotes} onChange={(e) => setDeclineNotes(e.target.value)} rows={2} maxLength={1000} placeholder="e.g. flexible on dates" className="w-full p-3 bg-white border border-border rounded-xl font-medium text-sm outline-none focus:border-accent resize-none" />
                    </>
                  )}

                  {declineStillNeedsHelp === "no" && (
                    <>
                      <label className="text-xs font-black uppercase tracking-widest text-primary/50 block">Anything else you want to tell us? (Optional)</label>
                      <textarea value={declineNotes} onChange={(e) => setDeclineNotes(e.target.value)} rows={2} maxLength={1000} placeholder="Optional note" className="w-full p-3 bg-white border border-border rounded-xl font-medium text-sm outline-none focus:border-accent resize-none" />
                    </>
                  )}

                  <button
                    onClick={handleDecline}
                    disabled={loading || declining}
                    className="w-full py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 font-black uppercase tracking-widest text-sm disabled:opacity-50"
                  >
                    {declining ? <Loader2 className="animate-spin mx-auto" size={18} /> : (declineStillNeedsHelp === "yes" && !isClosingReason(declineReason) ? "Make Request Available Again" : "Close Request")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-text-secondary/70">
          <p className="inline-flex items-center gap-2"><ShieldCheck size={16} /> Your details are protected until you accept a quote.</p>
          <p className="mt-2">
            Need help? <a href="mailto:support@manandvanclub.co.uk" className="text-accent font-bold hover:underline">support@manandvanclub.co.uk</a>
          </p>
        </div>
      </div>
    </div>
  );
}
