import { notFound, redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  formatUKPostcode,
  formatDisplayDate,
  formatMoveType,
} from "@/lib/formatting";
import { calculateBookingDeposit, calculateRemainingMoverBalance, normaliseQuoteAmount, formatPounds } from "@/lib/booking-fee";
import { parseStoredQuoteOptions } from "@/lib/quote-options";
import { getRouteEstimateFromDetails } from "@/lib/route-estimate";
import {
  CheckCircle2,
  MapPin,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BookingConfirmedPage({
  searchParams,
}: {
  searchParams?: { session_id?: string };
}) {
  const sessionId = searchParams?.session_id;

  if (!sessionId) {
    notFound();
  }

  let stripeSession;
  try {
    stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    notFound();
  }

  if (stripeSession.payment_status !== "paid") {
    redirect("/quote-cancelled?session_id=" + encodeURIComponent(sessionId));
  }

  const metadata = stripeSession.metadata || {};

  if ((metadata.paymentType !== "customer_booking_deposit" && metadata.paymentType !== "customer_booking_fee")) {
    notFound();
  }

  const requestId = metadata.requestId;

  if (!requestId) {
    notFound();
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data: lead } = await supabaseAdmin
    .from("move_requests")
    .select("*")
    .eq("id", requestId)
    .single();

  if (!lead || !lead.booking_fee_paid || lead.status !== "booked") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7] p-6">
        <div className="max-w-md text-center space-y-6 bg-white border border-border rounded-3xl p-8 shadow-sm">
          <div className="text-success text-5xl mb-4">
            <CheckCircle2 size={48} className="mx-auto text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-primary tracking-tighter">Payment Received</h1>
          <p className="text-text-secondary">
            Your payment was successful. We are confirming your booking details. You will receive an email confirmation shortly.
          </p>
          <a href="/" className="btn-orange inline-block px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm">Return Home</a>
        </div>
      </div>
    );
  }

  const moveType = formatMoveType(lead.move_type);
  const colPostcode = formatUKPostcode(lead.collection_postcode);
  const delPostcode = formatUKPostcode(lead.delivery_postcode);
  const moveDate = formatDisplayDate(lead.move_date);
  const routeEstimate = getRouteEstimateFromDetails(lead.details);
  const quoteAmount = normaliseQuoteAmount(lead.quote_amount || 0);
  const bookingDeposit = lead.booking_fee ? Number(lead.booking_fee) : calculateBookingDeposit(quoteAmount);
  const remainingMoverBalance = calculateRemainingMoverBalance(quoteAmount, bookingDeposit);
  const selectedOption = parseStoredQuoteOptions(
    lead.selected_quote_option ? [lead.selected_quote_option] : []
  )[0] || null;

  return (
    <div className="min-h-screen bg-[#F9F9F7] p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-border p-6 md:p-8 text-center mb-6">
          <div className="text-success text-5xl mb-4">
            <CheckCircle2 size={48} className="mx-auto text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-primary tracking-tighter mb-2">Quote Secured</h1>
          <p className="text-text-secondary">
            Your booking is secured and your details have been released to the mover.
          </p>
          <p className="text-text-secondary mt-2">
            The mover will contact you directly to confirm timing, access and payment method.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-black text-primary tracking-tight mb-6">Booking Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-primary/60" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-primary/40">Route</p>
                  <p className="font-bold text-primary">
                    {colPostcode || "—"}<span className="text-primary/30 mx-2">→</span>{delPostcode || "—"}
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

              {routeEstimate && (routeEstimate.distanceMeters > 0 || routeEstimate.mapUrl) && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-primary/60" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-primary/40">Estimated route</p>
                    {routeEstimate.distanceMeters > 0 && (
                      <p className="font-bold text-primary">{routeEstimate.distanceText} · {routeEstimate.durationText}</p>
                    )}
                    {routeEstimate.mapUrl && (
                      <a href={routeEstimate.mapUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-black text-accent">
                        {routeEstimate.distanceMeters > 0 ? "View route on map →" : "View postcode route on map →"}
                      </a>
                    )}
                    <p className="text-[10px] text-text-secondary/60">Postcode-to-postcode guide. Final timing may vary.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border pt-6 space-y-4">
              {selectedOption && (
                <>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">Selected option</span>
                    <span className="font-bold text-primary">{selectedOption.serviceLabel}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-text-secondary">Van</span>
                    <span className="font-bold text-primary">{selectedOption.vanLabel}</span>
                  </div>
                </>
              )}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-text-secondary">Mover total quote</span>
                <span className="font-bold text-primary">{formatPounds(quoteAmount)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-text-secondary">Booking deposit paid</span>
                <span className="font-bold text-primary">{formatPounds(bookingDeposit)}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-dashed border-border">
                <span className="text-sm font-bold text-primary">Pay mover on moving day</span>
                <span className="font-black text-primary text-xl">{formatPounds(remainingMoverBalance)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-text-secondary">Total move cost</span>
                <span className="font-bold text-primary">{formatPounds(quoteAmount)}</span>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mt-6">
              <p className="text-sm text-amber-800 font-medium"><strong>Reminder:</strong> Your booking deposit is deducted from the mover’s quote. You pay the remaining balance directly to the mover on moving day.</p>
            </div>
          </div>

          <div className="border-t border-border p-4 md:p-5 bg-gray-50/50">
            <a href="/" className="btn-orange w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm">
              Return Home <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
