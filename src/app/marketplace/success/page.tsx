import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DRIVER_COOKIE_NAME, isValidDriverSession } from "@/lib/driver-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { stripe } from "@/lib/stripe";
import {
  formatUKPostcode,
  formatDisplayDate,
  formatMoveType,
  getAccessNote,
  getItemSummary,
  getMoveSummary,
  type MoveDetails,
} from "@/lib/formatting";
import { calculateRemainingMoverBalance, formatPounds } from "@/lib/booking-fee";
import {
  CheckCircle2,
  Phone,
  Mail,
  User,
  MapPin,
  CalendarDays,
  ArrowRight,
  ClipboardList,
  Banknote,
} from "lucide-react";

export const dynamic = "force-dynamic";

function normaliseEmail(value?: string | null) {
  return String(value || "").toLowerCase().trim();
}

function MessagePage({ title, message }: { title: string; message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7] p-6">
      <div className="max-w-md text-center space-y-6 bg-white border border-border rounded-3xl p-8 shadow-sm">
        <h1 className="text-3xl font-black text-primary tracking-tighter">{title}</h1>
        <p className="text-text-secondary">{message}</p>
        <a href="/marketplace" className="btn-orange inline-block px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm">Back to Marketplace</a>
      </div>
    </div>
  );
}

async function resolveRequestId(searchParams?: { session_id?: string; requestId?: string }) {
  if (searchParams?.requestId) {
    return { requestId: searchParams.requestId, metadata: null as Record<string, string> | null };
  }

  if (!searchParams?.session_id) {
    return { requestId: null, metadata: null as Record<string, string> | null };
  }

  try {
    const stripeSession = await stripe.checkout.sessions.retrieve(searchParams.session_id);
    if (stripeSession.payment_status !== "paid") {
      return { requestId: null, metadata: null as Record<string, string> | null };
    }
    const metadata = (stripeSession.metadata || {}) as Record<string, string>;
    return { requestId: metadata.requestId || null, metadata };
  } catch {
    return { requestId: null, metadata: null as Record<string, string> | null };
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams?: { session_id?: string; requestId?: string };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get(DRIVER_COOKIE_NAME)?.value;
  const driverEmail = isValidDriverSession(token);

  if (!driverEmail) {
    redirect("/login?next=/marketplace");
  }

  const supabaseAdmin = getSupabaseAdmin();

  const { data: driver } = await supabaseAdmin
    .from("driver_applications")
    .select("id, contact_name, email, status")
    .eq("email", driverEmail)
    .single();

  if (!driver || driver.status !== "approved") {
    redirect("/login");
  }

  const { requestId, metadata } = await resolveRequestId(searchParams);

  if (!requestId) {
    return <MessagePage title="Booking Details Unavailable" message="We could not find the booking details. Please return to the marketplace or contact support." />;
  }

  if (metadata?.driverEmail && normaliseEmail(metadata.driverEmail) !== normaliseEmail(driverEmail)) {
    return <MessagePage title="Booking Details Unavailable" message="These details are not available for your mover account." />;
  }

  const { data: lead } = await supabaseAdmin
    .from("move_requests")
    .select("*")
    .eq("id", requestId)
    .single();

  if (!lead) {
    return <MessagePage title="Booking Details Unavailable" message="We could not find the booking details. Please contact support if you believe this is a mistake." />;
  }

  const isNewCustomerBooking =
    lead.status === "booked" &&
    lead.booking_fee_paid === true &&
    Boolean(lead.customer_details_released_at) &&
    normaliseEmail(lead.quoted_by) === normaliseEmail(driverEmail);

  const isLegacyLockedLead =
    lead.status === "locked" &&
    lead.locked_by &&
    normaliseEmail(lead.locked_by) === normaliseEmail(driverEmail);

  if (!isNewCustomerBooking && !isLegacyLockedLead) {
    return <MessagePage title="Booking Details Unavailable" message="Customer details are only available to the quoted mover after the customer has accepted the quote and paid the booking deposit." />;
  }

  const moveType = formatMoveType(lead.move_type);
  const colPostcode = formatUKPostcode(lead.collection_postcode);
  const delPostcode = formatUKPostcode(lead.delivery_postcode);
  const moveDate = formatDisplayDate(lead.move_date);
  const details = (lead.details || null) as MoveDetails | null;
  const detailSummary = [
    getMoveSummary(lead.move_type, details),
    getItemSummary(details),
    getAccessNote(details),
  ].filter(Boolean);
  const quoteAmount = Number(lead.quote_amount || 0);
  const bookingDeposit = Number(lead.booking_fee || 0);
  const remainingMoverBalance = quoteAmount > 0 && bookingDeposit > 0 ? calculateRemainingMoverBalance(quoteAmount, bookingDeposit) : 0;

  return (
    <div className="min-h-screen bg-[#F9F9F7] p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-border p-6 md:p-8 mb-6 text-center">
          <div className="text-success text-5xl mb-4">
            <CheckCircle2 size={48} className="mx-auto text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-primary tracking-tighter mb-2">Customer-Confirmed Booking</h1>
          <p className="text-text-secondary">The customer accepted your quote and paid the booking deposit. Please contact them as soon as possible to confirm timing, access and payment method.</p>
        </div>

        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-black text-primary tracking-tight mb-6">Customer Details</h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0"><User size={18} className="text-primary/60" /></div><div><p className="text-xs font-black uppercase tracking-widest text-primary/40">Customer Name</p><p className="font-bold text-primary">{lead.first_name || "Not provided"}</p></div></div>
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0"><Phone size={18} className="text-primary/60" /></div><div><p className="text-xs font-black uppercase tracking-widest text-primary/40">Phone</p><p className="font-bold text-primary">{lead.phone || "Not provided"}</p></div></div>
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0"><Mail size={18} className="text-primary/60" /></div><div><p className="text-xs font-black uppercase tracking-widest text-primary/40">Email</p><p className="font-bold text-primary break-all">{lead.email || "Not provided"}</p></div></div>
            </div>

            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-start gap-3"><div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0 mt-0.5"><MapPin size={18} className="text-primary/60" /></div><div><p className="text-xs font-black uppercase tracking-widest text-primary/40 mb-0.5">Route</p><p className="font-bold text-primary">{colPostcode || "Unknown"}<span className="text-primary/30 mx-2">→</span>{delPostcode || "Unknown"}</p><p className="text-sm text-text-secondary mt-0.5">{moveType}</p></div></div>

              {moveDate && <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0"><CalendarDays size={18} className="text-primary/60" /></div><div><p className="text-xs font-black uppercase tracking-widest text-primary/40">Move Date</p><p className="font-bold text-primary">{moveDate}</p></div></div>}

              {detailSummary.length > 0 && <div className="flex items-start gap-3"><div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0 mt-0.5"><ClipboardList size={18} className="text-primary/60" /></div><div><p className="text-xs font-black uppercase tracking-widest text-primary/40">Move Details</p><ul className="text-sm text-text-secondary mt-1 space-y-1">{detailSummary.map((item) => <li key={item}>• {item}</li>)}</ul></div></div>}

              {quoteAmount > 0 && <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0"><Banknote size={18} className="text-primary/60" /></div><div><p className="text-xs font-black uppercase tracking-widest text-primary/40">Your total quote</p><p className="font-bold text-primary">{formatPounds(quoteAmount)}</p>{bookingDeposit > 0 && <p className="text-xs text-text-secondary mt-1">Deposit paid: {formatPounds(bookingDeposit)} • Collect on moving day: {formatPounds(remainingMoverBalance)}</p>}</div></div>}
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mt-8">
              <p className="text-sm text-amber-800 font-medium"><strong>Reminder:</strong> The booking deposit is deducted from your total quote. Collect the remaining balance from the customer on moving day, unless you agree another payment method with them.</p>
            </div>
          </div>

          <div className="border-t border-border p-4 md:p-5 bg-gray-50/50">
            <a href="/marketplace" className="btn-orange w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm">Back to Marketplace <ArrowRight size={16} /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
