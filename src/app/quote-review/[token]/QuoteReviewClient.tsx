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

interface Props {
  token: string;
  firstName: string;
  moveType: string;
  colPostcode: string;
  delPostcode: string;
  moveDate: string;
  estimatedPrice: string;
  detailSummary: string[];
  quoteAmount: number;
  quoteMessage: string;
  bookingFee: number;
  quoteExpiresAt: string;
}

const DECLINE_REASONS = [
  "Price too high",
  "Date no longer works",
  "Found another mover",
  "Details changed",
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
  quoteAmount,
  quoteMessage,
  bookingFee,
  quoteExpiresAt,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [declining, setDeclining] = useState(false);
  const [showDeclineReasons, setShowDeclineReasons] = useState(false);
  const [declineReason, setDeclineReason] = useState("Price too high");
  const [error, setError] = useState<string | null>(null);

  const totalCustomerCost = quoteAmount + bookingFee;

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

  const handleAccept = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/customer/accept-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json().catch(() => ({ error: "Something went wrong" }));

      if (!res.ok) {
        setError(data.error || "Quote is no longer available");
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      setError("Stripe checkout could not be started. Please try again.");
      setLoading(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleDecline = async () => {
    setDeclining(true);
    setError(null);
    try {
      const res = await fetch("/api/customer/decline-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, reason: declineReason }),
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
            Your mover quote is ready
          </h1>
          <p className="text-text-secondary mt-3 max-w-xl mx-auto">
            Hi {firstName || "there"}, a vetted local mover has reviewed your request. No spam, no multiple sales calls.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-border overflow-hidden mb-6 shadow-sm">
          <div className="p-5 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-primary/5 rounded-2xl p-5 border border-border/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-1">Mover quote</p>
                <p className="text-4xl font-black text-primary tracking-tighter">{formatPounds(quoteAmount)}</p>
                <p className="text-xs text-text-secondary mt-2">Paid directly to the mover after booking.</p>
              </div>

              <div className="bg-accent/10 rounded-2xl p-5 border border-accent/20">
                <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-1">Booking fee</p>
                <p className="text-4xl font-black text-primary tracking-tighter">{formatPounds(bookingFee)}</p>
                <p className="text-xs text-text-secondary mt-2">Paid now to confirm this accepted quote.</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 border border-border/60 mb-6">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-text-secondary">Mover quote</span>
                <span className="font-bold text-primary">{formatPounds(quoteAmount)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-text-secondary">Booking fee paid to Man &amp; Van Club</span>
                <span className="font-bold text-primary">{formatPounds(bookingFee)}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-dashed border-border">
                <span className="text-sm font-black text-primary">Total customer cost</span>
                <span className="font-black text-primary text-xl">{formatPounds(totalCustomerCost)}</span>
              </div>
            </div>

            {quoteMessage && (
              <div className="bg-white rounded-2xl border border-border p-4 mb-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-2">Mover message</p>
                <p className="text-sm text-text-secondary italic leading-relaxed">&ldquo;{quoteMessage}&rdquo;</p>
              </div>
            )}

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
                    <p className="text-xs font-black uppercase tracking-widest text-primary/40">Estimated guide price shown earlier</p>
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
                <p className="text-sm text-blue-800 font-bold">Quote valid until {expiryText}</p>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-4 mb-6">
              <p className="text-sm text-amber-800 font-medium">
                The booking fee confirms your accepted quote and releases your contact details only to this mover. It is separate from the mover’s quote. You pay the mover’s quoted price directly to the mover.
              </p>
              <p className="text-sm text-amber-700/80 mt-2">
                This quote is based on the move details provided. It may only change if the details were incomplete, inaccurate or later changed.
              </p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6">
              <p className="text-sm text-green-800 font-bold mb-2">What happens next?</p>
              <ol className="text-sm text-green-800/80 space-y-1 list-decimal pl-5">
                <li>Pay the booking fee.</li>
                <li>Your contact details are released only to this mover.</li>
                <li>The mover contacts you to confirm timing, access and payment method.</li>
                <li>You pay the mover directly for the move.</li>
              </ol>
            </div>

            <div className="bg-white border border-border rounded-xl p-4 mb-6">
              <p className="text-xs text-text-secondary leading-relaxed">
                The booking fee is refundable if the mover cannot fulfil the accepted booking and we cannot arrange a suitable replacement. It is not normally refundable if you cancel after accepting the quote, provide incorrect move details, change the job, or book another mover elsewhere. This does not affect your statutory rights.
              </p>
            </div>

            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-red-600 text-sm font-bold mb-6">{error}</div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={handleAccept}
                disabled={loading || declining}
                className="btn-orange w-full py-4 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-sm disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <>Accept quote and pay booking fee <ArrowRight size={16} /></>}
              </button>

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
                  <label className="text-xs font-black uppercase tracking-widest text-primary/50 block">Reason for declining</label>
                  <select
                    value={declineReason}
                    onChange={(e) => setDeclineReason(e.target.value)}
                    className="w-full p-3 bg-white border border-border rounded-xl font-bold text-sm outline-none focus:border-accent"
                  >
                    {DECLINE_REASONS.map((reason) => (
                      <option key={reason}>{reason}</option>
                    ))}
                  </select>
                  <button
                    onClick={handleDecline}
                    disabled={loading || declining}
                    className="w-full py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 font-black uppercase tracking-widest text-sm disabled:opacity-50"
                  >
                    {declining ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Confirm decline"}
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
