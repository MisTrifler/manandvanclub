import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  formatUKPostcode,
  formatDisplayDate,
  formatMoveType,
} from "@/lib/formatting";
import {
  CheckCircle2,
  MapPin,
  CalendarDays,
  ArrowRight,
  Tag,
  Phone,
  Mail,
  User,
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
    redirect("/quote-cancelled?session_id=" + sessionId);
  }

  const metadata = stripeSession.metadata || {};
  const requestId = metadata.requestId;

  if (!requestId) {
    notFound();
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data: lead } = await supabaseAdmin
    .from("move_requests")
    .select(
      "first_name, move_type, collection_postcode, delivery_postcode, move_date, quote_amount, booking_fee, estimated_price, quoted_by, booking_fee_paid, status"
    )
    .eq("id", requestId)
    .single();

  if (!lead || !lead.booking_fee_paid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7] p-6">
        <div className="max-w-md text-center space-y-6">
          <div className="text-success text-5xl mb-4">
            <CheckCircle2 size={48} className="mx-auto text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-primary tracking-tighter">Payment Received</h1>
          <p className="text-text-secondary">
            Your payment was successful. We are confirming your booking details. You will receive an email confirmation shortly.
          </p>
          <a
            href="/"
            className="btn-orange inline-block px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  const moveType = formatMoveType(lead.move_type);
  const colPostcode = formatUKPostcode(lead.collection_postcode);
  const delPostcode = formatUKPostcode(lead.delivery_postcode);
  const moveDate = formatDisplayDate(lead.move_date);
  const quoteAmount = lead.quote_amount || 0;
  const bookingFee = lead.booking_fee || 0;

  return (
    <div className="min-h-screen bg-[#F9F9F7] p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-border p-6 md:p-8 text-center mb-6">
          <div className="text-success text-5xl mb-4">
            <CheckCircle2 size={48} className="mx-auto text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-primary tracking-tighter mb-2">
            Booking Confirmed
          </h1>
          <p className="text-text-secondary">
            Your booking fee has been paid and your details have been released to the mover. The mover will contact you directly to confirm timing, access and payment method.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-black text-primary tracking-tight mb-6">
              Move Details
            </h2>

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
            </div>

            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-text-secondary">Mover quote</span>
                <span className="font-bold text-primary">£{quoteAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-text-secondary">Booking fee paid</span>
                <span className="font-bold text-primary">£{bookingFee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-dashed border-border">
                <span className="text-sm font-bold text-primary">Remaining move cost</span>
                <span className="font-black text-primary text-xl">£{quoteAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mt-6">
              <p className="text-sm text-amber-800 font-medium">
                <strong>Reminder:</strong> The remaining move cost is paid directly to the mover. The mover will contact you shortly to confirm timing and payment method.
              </p>
            </div>
          </div>

          <div className="border-t border-border p-4 md:p-5 bg-gray-50/50">
            <a
              href="/"
              className="btn-orange w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm"
            >
              Return Home
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
