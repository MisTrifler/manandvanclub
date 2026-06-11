"use client";

import { useState } from "react";
import {
  MapPin,
  CalendarDays,
  Tag,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface Props {
  token: string;
  firstName: string;
  moveType: string;
  colPostcode: string;
  delPostcode: string;
  moveDate: string;
  estimatedPrice: string;
  quoteAmount: number;
  quoteMessage: string;
  bookingFee: number;
}

export default function QuoteReviewClient({
  token,
  firstName,
  moveType,
  colPostcode,
  delPostcode,
  moveDate,
  estimatedPrice,
  quoteAmount,
  quoteMessage,
  bookingFee,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [declining, setDeclining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAccept = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/customer/accept-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (res.status === 409) {
        const data = await res.json();
        setError(data.error || "Quote is no longer available");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Something went wrong" }));
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
    } finally {
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
        body: JSON.stringify({ token }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Something went wrong" }));
        setError(data.error || "Something went wrong");
        setDeclining(false);
        return;
      }

      window.location.reload();
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
      setDeclining(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-primary px-3 py-2 rounded-xl inline-block mb-4">
            <span className="text-white font-black text-xl leading-none">M&amp;V</span>
          </div>
          <h1 className="text-3xl font-black text-primary tracking-tighter">
            Your Quote Is Ready
          </h1>
          <p className="text-text-secondary mt-2">
            Hi {firstName || "there"}, a vetted local mover has reviewed your request.
          </p>
        </div>

        {/* Quote card */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden mb-6">
          <div className="p-6 md:p-8">
            {/* Mover quote */}
            <div className="bg-primary/5 rounded-xl p-5 border border-border/50 mb-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-1">
                Mover quote
              </p>
              <p className="text-4xl font-black text-primary tracking-tighter">
                £{quoteAmount.toFixed(2)}
              </p>
              {quoteMessage && (
                <div className="mt-3 pt-3 border-t border-border/30">
                  <p className="text-sm text-text-secondary italic">
                    &ldquo;{quoteMessage}&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Move details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-primary/60" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-primary/40">Route</p>
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
                    <p className="text-xs font-black uppercase tracking-widest text-primary/40">Your original estimate</p>
                    <p className="font-bold text-primary">{estimatedPrice}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Booking fee */}
            <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-4 mb-6">
              <p className="text-sm text-amber-800 font-medium">
                <strong>Booking fee:</strong> £{bookingFee.toFixed(2)}
              </p>
              <p className="text-sm text-amber-700/80 mt-1">
                The booking fee confirms your request and allows us to release your contact details to the mover. The remaining move cost is paid directly to the mover.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-red-600 text-sm font-bold mb-6">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAccept}
                disabled={loading || declining}
                className="btn-orange w-full py-4 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-sm disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    Accept Quote & Pay Booking Fee
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <button
                onClick={handleDecline}
                disabled={loading || declining}
                className="w-full py-4 rounded-xl border border-border font-black uppercase tracking-widest text-sm text-primary/60 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {declining ? (
                  <Loader2 className="animate-spin mx-auto" size={18} />
                ) : (
                  "Decline Quote"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer trust */}
        <div className="text-center text-sm text-text-secondary/70">
          <p>
            Need help?{" "}
            <a href="mailto:support@manandvanclub.co.uk" className="text-accent font-bold hover:underline">
              support@manandvanclub.co.uk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
