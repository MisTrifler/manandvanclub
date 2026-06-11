"use client";

import { useState } from "react";
import {
  formatUKPostcode,
  formatDisplayDate,
  formatMoveType,
  relativeTime,
  isUrgent,
  type MoveDetails,
  getMoveSummary,
  getAccessNote,
  getItemSummary,
} from "@/lib/formatting";
import {
  ShieldCheck,
  Clock,
  Flame,
  Tag,
  ArrowRight,
  MapPin,
  CalendarDays,
  Boxes,
  Package,
  Building2,
  Home,
  GraduationCap,
  Sofa,
  Truck,
  Warehouse,
  CheckCircle2,
  Loader2,
  Banknote,
  Eye,
  FileText,
} from "lucide-react";
import { calculateBookingDeposit, calculateRemainingMoverBalance, formatPounds } from "@/lib/booking-fee";

interface Lead {
  id: string;
  first_name?: string;
  email?: string;
  phone?: string;
  collection_postcode?: string;
  delivery_postcode?: string;
  move_date?: string;
  move_type?: string;
  estimated_price?: string;
  created_at?: string;
  details?: MoveDetails | null;
  status?: string;
  quoted_by?: string;
  quote_amount?: number;
  quoted_at?: string;
  booking_fee?: number;
  booking_fee_paid?: boolean;
  customer_details_released_at?: string;
  declined_reason?: string;
  quote_expires_at?: string;
}

interface Props {
  userEmail: string;
  driverName: string;
  leads: Lead[];
}

const MOVE_TYPE_ICONS: Record<string, React.ReactNode> = {
  "Office Move": <Building2 size={16} />,
  "Home Move": <Home size={16} />,
  "Student Move": <GraduationCap size={16} />,
  "Furniture Delivery": <Sofa size={16} />,
  "Man & Van Service": <Truck size={16} />,
  "Man & Van": <Truck size={16} />,
  "Storage Collection": <Warehouse size={16} />,
};

export default function DriverMarketplaceClient({
  userEmail,
  driverName,
  leads,
}: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [quotingId, setQuotingId] = useState<string | null>(null);
  const [quoteAmount, setQuoteAmount] = useState<string>("");
  const [quoteMessage, setQuoteMessage] = useState<string>("");
  const [quoteError, setQuoteError] = useState<string | null>(null);

  const previewQuoteAmount = Number.parseFloat(quoteAmount);
  const hasValidPreviewAmount = Number.isFinite(previewQuoteAmount) && previewQuoteAmount > 0 && previewQuoteAmount <= 10000;
  const previewBookingDeposit = hasValidPreviewAmount ? calculateBookingDeposit(previewQuoteAmount) : 0;
  const previewRemainingBalance = hasValidPreviewAmount ? calculateRemainingMoverBalance(previewQuoteAmount, previewBookingDeposit) : 0;

  const handleLogout = async () => {
    await fetch("/api/driver/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const startQuote = (leadId: string) => {
    setQuotingId(leadId);
    setQuoteAmount("");
    setQuoteMessage("");
    setQuoteError(null);
  };

  const cancelQuote = () => {
    setQuotingId(null);
    setQuoteError(null);
  };

  const submitQuote = async (lead: Lead) => {
    const amount = parseFloat(quoteAmount);
    if (!amount || amount <= 0 || Number.isNaN(amount)) {
      setQuoteError("Please enter a valid quote amount greater than £0.");
      return;
    }
    if (amount > 10000) {
      setQuoteError("Quote amount must not exceed £10,000.");
      return;
    }
    setLoadingId(lead.id);
    setQuoteError(null);

    try {
      const res = await fetch("/api/mover/submit-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: lead.id,
          quoteAmount: amount,
          quoteMessage: quoteMessage.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => ({ error: "Unknown error" }));

      if (!res.ok) {
        setQuoteError(data.error || "Failed to submit quote. Please try again.");
        setLoadingId(null);
        return;
      }

      // Refresh page to show updated status
      window.location.reload();
    } catch (err: any) {
      setQuoteError("Something went wrong. Please try again.");
      setLoadingId(null);
    }
  };

  const isQuotedByMe = (lead: Lead) =>
    lead.quoted_by?.toLowerCase() === userEmail.toLowerCase();

  const isMyQuoted = (lead: Lead) =>
    isQuotedByMe(lead) && lead.status === "quoted";

  const isMyBooked = (lead: Lead) =>
    isQuotedByMe(lead) &&
    lead.status === "booked" &&
    lead.booking_fee_paid === true &&
    Boolean(lead.customer_details_released_at);

  const isMyDeclined = (lead: Lead) =>
    isQuotedByMe(lead) && lead.status === "declined";

  const isTakenByOther = (lead: Lead) => {
    if (!lead.quoted_by) return false;
    if (isQuotedByMe(lead)) return false;
    return lead.status === "booked" || lead.status === "quoted";
  };

  const isAvailable = (lead: Lead) =>
    !lead.quoted_by &&
    (lead.status === "available" || lead.status === "active" || lead.status === "verified" || lead.status === null || lead.status === "");

  const availableLeads = leads.filter((l) => isAvailable(l));
  const myQuoted = leads.filter((l) => isMyQuoted(l));
  const myBooked = leads.filter((l) => isMyBooked(l));
  const myDeclined = leads.filter((l) => isMyDeclined(l));
  const takenByOther = leads.filter((l) => isTakenByOther(l));

  const renderLeadCard = (lead: Lead, showQuoteForm: boolean) => {
    const moveTypeLabel = formatMoveType(lead.move_type);
    const moveTypeIcon = MOVE_TYPE_ICONS[lead.move_type || ""] || <Package size={16} />;
    const colPostcode = formatUKPostcode(lead.collection_postcode);
    const delPostcode = formatUKPostcode(lead.delivery_postcode);
    const moveDate = formatDisplayDate(lead.move_date);
    const submitted = relativeTime(lead.created_at);
    const urgent = isUrgent(lead.move_date);
    const moveSummary = getMoveSummary(lead.move_type, lead.details);
    const itemSummary = getItemSummary(lead.details);
    const accessNote = getAccessNote(lead.details);
    const hasEstimate = lead.estimated_price && lead.estimated_price.trim() !== "";

    const cardStatus = isMyBooked(lead)
      ? "booked"
      : isMyDeclined(lead)
        ? "declined"
        : isMyQuoted(lead)
          ? "quoted"
          : isTakenByOther(lead)
            ? "taken"
            : "available";

    return (
      <div
        key={lead.id}
        className={`bg-white rounded-2xl border overflow-hidden ${
          cardStatus === "booked"
            ? "border-green-300"
            : cardStatus === "quoted"
              ? "border-amber-300"
              : cardStatus === "declined"
                ? "border-red-200"
                : "border-border"
        }`}
      >
        <div className="p-5 md:p-6">
          {/* Top row: type + badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-primary/5 text-primary px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest">
              {moveTypeIcon}
              {moveTypeLabel}
            </span>
            {hasEstimate && (
              <span className="inline-flex items-center gap-1 bg-accent/10 text-accent px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest">
                <Tag size={12} />
                Customer estimate shown
              </span>
            )}
            <span className="inline-flex items-center gap-1 bg-primary/5 text-primary/70 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest">
              <ShieldCheck size={12} />
              Verified enquiry
            </span>
            {urgent && (
              <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest">
                <Flame size={12} />
                Move soon
              </span>
            )}
            {cardStatus === "booked" && (
              <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest">
                <CheckCircle2 size={12} />
                Customer-confirmed booking
              </span>
            )}
            {cardStatus === "quoted" && (
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest">
                <FileText size={12} />
                Quote sent
              </span>
            )}
            {cardStatus === "declined" && (
              <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest">
                <FileText size={12} />
                Customer declined quote
              </span>
            )}
            {submitted && (
              <span className="inline-flex items-center gap-1 text-primary/40 px-3 py-1.5 rounded-lg text-xs font-black tracking-widest">
                <Clock size={12} />
                {submitted}
              </span>
            )}
          </div>

          {/* Route */}
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={18} className="text-accent flex-shrink-0" />
            <p className="text-lg md:text-xl font-black text-primary tracking-tight">
              {colPostcode || "Unknown"}
              <span className="text-primary/30 mx-2">→</span>
              {delPostcode || "Unknown"}
            </p>
          </div>

          {/* Date */}
          {moveDate && (
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays size={16} className="text-primary/40 flex-shrink-0" />
              <p className="text-sm text-text-secondary font-medium">
                Move date: {moveDate}
              </p>
            </div>
          )}

          {moveSummary && (
            <div className="flex items-center gap-2 mb-2">
              <Boxes size={16} className="text-primary/40 flex-shrink-0" />
              <p className="text-sm text-text-secondary font-medium">{moveSummary}</p>
            </div>
          )}

          {itemSummary && (
            <div className="flex items-center gap-2 mb-2">
              <Package size={16} className="text-primary/40 flex-shrink-0" />
              <p className="text-sm text-text-secondary font-medium">{itemSummary}</p>
            </div>
          )}

          {accessNote && (
            <div className="flex items-center gap-2 mb-2">
              <Home size={16} className="text-primary/40 flex-shrink-0" />
              <p className="text-sm text-text-secondary font-medium">{accessNote}</p>
            </div>
          )}

          {hasEstimate && (
            <div className="mt-4 bg-primary/5 rounded-xl p-3 border border-border/50">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-1">
                Customer guide price
              </p>
              <p className="text-2xl font-black text-primary tracking-tighter">
                {lead.estimated_price}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                Guide only. Final price agreed directly with the customer.
              </p>
            </div>
          )}

          {/* Privacy notice */}
          <div className="mt-4 bg-blue-50/50 border border-blue-100/50 rounded-xl p-3">
            <p className="text-xs text-blue-700/80 font-medium">
              Customer name, phone and email are hidden until the customer accepts your total quote and pays the booking deposit.
            </p>
          </div>
        </div>

        {/* Action area */}
        <div className="border-t border-border bg-gray-50/50 p-4 md:p-5">
          {cardStatus === "available" && showQuoteForm && (
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-1 block mb-1">
                  Your total quote (£)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  value={quoteAmount}
                  onChange={(e) => setQuoteAmount(e.target.value)}
                  placeholder="e.g. 300.00"
                  className="w-full p-3 bg-white border border-border rounded-xl font-bold text-sm outline-none focus:border-accent"
                />
                <p className="text-xs text-text-secondary/70 mt-2 leading-relaxed">
                  Enter the total price you want the customer to see. The customer pays a deposit to secure the booking, and that deposit is deducted from your total quote. You collect the remaining balance directly from the customer on moving day.
                </p>
                {hasValidPreviewAmount && (
                  <div className="mt-3 bg-primary/5 rounded-xl border border-border/60 p-3 space-y-1">
                    <div className="flex justify-between text-xs"><span className="text-text-secondary">Your total quote</span><strong>{formatPounds(previewQuoteAmount)}</strong></div>
                    <div className="flex justify-between text-xs"><span className="text-text-secondary">Customer deposit paid today</span><strong>{formatPounds(previewBookingDeposit)}</strong></div>
                    <div className="flex justify-between text-xs"><span className="text-text-secondary">Customer pays you on moving day</span><strong>{formatPounds(previewRemainingBalance)}</strong></div>
                  </div>
                )}
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-1 block mb-1">
                  Message to customer (optional)
                </label>
                <textarea
                  value={quoteMessage}
                  onChange={(e) => setQuoteMessage(e.target.value)}
                  placeholder="Hi, I can complete this move on the requested date. This quote includes loading, transport and unloading."
                  rows={3}
                  className="w-full p-3 bg-white border border-border rounded-xl font-bold text-sm outline-none focus:border-accent resize-none"
                />
              </div>
              {quoteError && (
                <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-red-600 text-sm font-bold">
                  {quoteError}
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => submitQuote(lead)}
                  disabled={loadingId === lead.id}
                  className="btn-orange flex-1 py-3 rounded-xl font-black uppercase tracking-widest text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loadingId === lead.id ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      Send Total Quote
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
                <button
                  onClick={cancelQuote}
                  className="px-4 py-3 rounded-xl border border-border font-bold text-sm text-primary/60 hover:bg-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {cardStatus === "available" && !showQuoteForm && (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Banknote size={16} className="text-primary/40" />
                <p className="text-xs text-text-secondary/70 font-medium">
                  Submit your total quote. The customer pays a booking deposit to secure the booking, and pays you the remaining balance on moving day.
                </p>
              </div>
              <button
                onClick={() => startQuote(lead.id)}
                className="btn-orange px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2"
              >
                Submit Quote
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {cardStatus === "quoted" && (
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-amber-500" />
              <p className="text-sm font-bold text-amber-700">
                Quote sent — waiting for customer. Customer details will only be released if they accept and pay the booking deposit.
              </p>
            </div>
          )}

          {cardStatus === "booked" && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <p className="text-sm font-bold text-green-700">
                  The customer accepted your quote and paid the booking deposit. Their contact details are now available.
                </p>
              </div>
              <a
                href={`/marketplace/success?requestId=${lead.id}`}
                className="btn-orange w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm"
              >
                <Eye size={16} />
                View Customer Details
              </a>
              <p className="text-xs text-text-secondary/70">
                The booking deposit is deducted from your total quote. Collect the remaining balance from the customer on moving day.
              </p>
            </div>
          )}

          {cardStatus === "declined" && (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-red-500" />
                <p className="text-sm font-bold text-red-700">
                  Customer declined quote. Your quote was not accepted and customer details were not released.
                </p>
              </div>
              {lead.declined_reason && (
                <p className="text-xs text-text-secondary/70">Reason: {lead.declined_reason}</p>
              )}
            </div>
          )}

          {cardStatus === "taken" && (
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-primary/30" />
              <p className="text-sm font-bold text-primary/50">
                Another mover has already submitted a quote for this request.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-primary tracking-tighter">
              Marketplace
            </h1>
            <p className="text-text-secondary mt-1 text-sm">
              Welcome, {driverName}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-primary/60 bg-white border border-border px-3 py-1.5 rounded-xl">
              {availableLeads.length} available
            </span>
            <button
              onClick={handleLogout}
              className="text-xs font-black uppercase tracking-widest text-primary/60 hover:text-accent transition-colors border border-border px-3 py-1.5 rounded-xl bg-white"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-white rounded-2xl border border-border p-4 md:p-5 mb-6">
          <p className="text-sm text-text-secondary leading-relaxed">
            Man &amp; Van Club provides <strong className="text-primary">verified customer enquiries</strong>.
            Submit your total quote for free. The customer pays a booking deposit to secure the booking, and that deposit is deducted from your total quote. You collect the remaining balance directly from the customer on moving day.
          </p>
        </div>

        {/* Customer-confirmed bookings */}
        {myBooked.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-green-600 mb-3">
              Customer-Confirmed Bookings
            </h2>
            <div className="grid grid-cols-1 gap-5">
              {myBooked.map((lead) => renderLeadCard(lead, false))}
            </div>
          </div>
        )}

        {/* Quotes pending customer response */}
        {myQuoted.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-amber-600 mb-3">
              Quotes Waiting for Customer
            </h2>
            <div className="grid grid-cols-1 gap-5">
              {myQuoted.map((lead) => renderLeadCard(lead, false))}
            </div>
          </div>
        )}

        {/* Declined quotes */}
        {myDeclined.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-red-600 mb-3">
              Customer Declined Quotes
            </h2>
            <div className="grid grid-cols-1 gap-5">
              {myDeclined.map((lead) => renderLeadCard(lead, false))}
            </div>
          </div>
        )}

        {/* Available enquiries */}
        {availableLeads.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-primary/60 mb-3">
              Available Enquiries
            </h2>
            <div className="grid grid-cols-1 gap-5">
              {availableLeads.map((lead) =>
                renderLeadCard(lead, quotingId === lead.id)
              )}
            </div>
          </div>
        )}

        {/* Taken by other movers */}
        {takenByOther.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-primary/30 mb-3">
              Already Quoted
            </h2>
            <div className="grid grid-cols-1 gap-5">
              {takenByOther.map((lead) => renderLeadCard(lead, false))}
            </div>
          </div>
        )}

        {leads.length === 0 && (
          <div className="bg-white p-12 rounded-3xl border border-border text-center">
            <p className="text-lg text-text-secondary">
              No active enquiries available right now.
            </p>
            <p className="text-sm text-text-secondary/60 mt-2">
              Check back later — new requests come in throughout the day.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
