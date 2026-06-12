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
  getMoveRequirements,
} from "@/lib/formatting";
import { getRouteEstimateFromDetails } from "@/lib/route-estimate";
import { noShowStatusLabel } from "@/lib/no-show";
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
  quote_options?: Array<{ id: string; serviceLabel?: string; vanLabel?: string; totalPrice: number }> | null;
  selected_quote_option?: { id: string; serviceLabel?: string; vanLabel?: string; totalPrice: number } | null;
  quoted_at?: string;
  booking_fee?: number;
  booking_fee_paid?: boolean;
  customer_details_released_at?: string;
  declined_reason?: string;
  quote_expires_at?: string;
  customer_no_show_status?: string | null;
}

interface Props {
  userEmail: string;
  driverName: string;
  leads: Lead[];
}

// ── Structured quote options (no free-text driver messages) ──────────
const SERVICE_LEVEL_CHOICES = [
  { value: "transport_only", label: "Transport only", description: "Customer loads and unloads. Driver provides van and transport only." },
  { value: "one_man_loading", label: "1 man and van", description: "Driver helps with loading, transport and unloading." },
  { value: "two_men_loading", label: "2 men and van", description: "Two movers help with loading, transport and unloading." },
  { value: "two_men_luton", label: "2 men and Luton van", description: "Two movers, Luton van, loading and unloading included." },
] as const;

const VAN_SIZE_CHOICES = [
  { value: "small_van", label: "Small van" },
  { value: "medium_van", label: "Medium van" },
  { value: "luton_van", label: "Luton van" },
  { value: "suitable_van", label: "Suitable van provided" },
] as const;

interface DraftOption {
  serviceLevel: string;
  vanSize: string;
  totalPrice: string;
}

const DEFAULT_DRAFT_OPTION: DraftOption = {
  serviceLevel: "one_man_loading",
  vanSize: "suitable_van",
  totalPrice: "",
};

const STANDARD_QUOTE_ASSUMPTION =
  "This quote is based on the move details provided. The price may change if the item list, access, parking, waiting time, distance, or move date changes.";

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
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [draftOptions, setDraftOptions] = useState<DraftOption[]>([DEFAULT_DRAFT_OPTION]);

  // ── Customer no-show reporting (own booked jobs only) ──────────────
  const [noShowReportingId, setNoShowReportingId] = useState<string | null>(null);
  const [noShowError, setNoShowError] = useState<string | null>(null);
  const [noShowForm, setNoShowForm] = useState({
    attended: false,
    arrivalTime: "",
    waitMinutes: "",
    contactAttempts: "",
    messageSent: false,
    notes: "",
  });

  const canReportNoShow = (lead: Lead): boolean => {
    if (!isMyBooked(lead)) return false;
    if (lead.customer_no_show_status && lead.customer_no_show_status !== "rejected") return false;
    if (!lead.move_date) return false;
    const d = new Date(lead.move_date);
    if (Number.isNaN(d.getTime())) return false;
    return d.toISOString().slice(0, 10) <= new Date().toISOString().slice(0, 10);
  };

  const submitNoShowReport = async (lead: Lead) => {
    if (!noShowForm.attended) {
      setNoShowError("Please confirm you attended the collection postcode.");
      return;
    }
    const wait = parseInt(noShowForm.waitMinutes, 10);
    if (!Number.isFinite(wait) || wait < 20) {
      setNoShowError("You must wait at least 20 minutes before reporting a no-show.");
      return;
    }
    const attempts = parseInt(noShowForm.contactAttempts, 10);
    if (!Number.isFinite(attempts) || attempts < 2) {
      setNoShowError("At least 2 phone call attempts are required.");
      return;
    }
    if (!noShowForm.messageSent) {
      setNoShowError("You must send at least one text or WhatsApp message first.");
      return;
    }
    if (noShowForm.notes.trim().length < 20) {
      setNoShowError("Please describe what happened (at least 20 characters).");
      return;
    }
    setLoadingId(lead.id);
    setNoShowError(null);
    try {
      const res = await fetch("/api/mover/report-no-show", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: lead.id,
          waitMinutes: wait,
          contactAttempts: attempts,
          messageSent: true,
          arrivalTime: noShowForm.arrivalTime.trim(),
          notes: noShowForm.notes.trim(),
        }),
      });
      const data = await res.json().catch(() => ({ error: "Unknown error" }));
      if (!res.ok) {
        setNoShowError(data.error || "Failed to submit report. Please try again.");
        setLoadingId(null);
        return;
      }
      window.location.reload();
    } catch {
      setNoShowError("Something went wrong. Please try again.");
      setLoadingId(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/driver/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const startQuote = (leadId: string) => {
    setQuotingId(leadId);
    setDraftOptions([{ ...DEFAULT_DRAFT_OPTION }]);
    setQuoteError(null);
  };

  const updateDraftOption = (index: number, patch: Partial<DraftOption>) => {
    setDraftOptions((prev) => prev.map((o, i) => (i === index ? { ...o, ...patch } : o)));
  };

  const addDraftOption = () => {
    setDraftOptions((prev) => (prev.length >= 3 ? prev : [...prev, { ...DEFAULT_DRAFT_OPTION }]));
  };

  const removeDraftOption = (index: number) => {
    setDraftOptions((prev) => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
  };

  const cancelQuote = () => {
    setQuotingId(null);
    setQuoteError(null);
  };

  const submitQuote = async (lead: Lead) => {
    // Validate all draft options before sending
    const parsedOptions = [];
    for (let i = 0; i < draftOptions.length; i += 1) {
      const draft = draftOptions[i];
      const amount = parseFloat(draft.totalPrice);
      if (!amount || Number.isNaN(amount) || amount < 10) {
        setQuoteError(`Option ${i + 1}: please enter a total price of at least £10.`);
        return;
      }
      if (amount > 10000) {
        setQuoteError(`Option ${i + 1}: total price must not exceed £10,000.`);
        return;
      }
      parsedOptions.push({
        serviceLevel: draft.serviceLevel,
        vanSize: draft.vanSize,
        totalPrice: amount,
      });
    }

    const combos = new Set(parsedOptions.map((o) => `${o.serviceLevel}|${o.vanSize}`));
    if (combos.size !== parsedOptions.length) {
      setQuoteError("Each option must have a different service level and van size combination.");
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
          quoteOptions: parsedOptions,
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

  const isMyCompleted = (lead: Lead) =>
    isQuotedByMe(lead) && (lead.status === "completed" || lead.status === "cancelled");

  const isPastDate = (lead: Lead) => {
    if (!lead.move_date) return false;
    const d = new Date(lead.move_date);
    if (Number.isNaN(d.getTime())) return false;
    return d.toISOString().slice(0, 10) < new Date().toISOString().slice(0, 10);
  };

  const isAvailable = (lead: Lead) =>
    !lead.quoted_by &&
    (lead.status === "available" || lead.status === "active" || lead.status === "verified" || lead.status === null || lead.status === "");

  const availableLeads = leads.filter((l) => isAvailable(l));
  const myQuoted = leads.filter((l) => isMyQuoted(l));
  const myBookedAll = leads.filter((l) => isMyBooked(l));
  const myBooked = myBookedAll.filter((l) => !isPastDate(l));
  const myDeclined = leads.filter((l) => isMyDeclined(l));
  // My History: past confirmed bookings + completed/cancelled + declined quotes.
  // All belong to the logged-in driver only (server never sends other movers' jobs).
  const myHistory = [
    ...myBookedAll.filter((l) => isPastDate(l)),
    ...leads.filter((l) => isMyCompleted(l)),
    ...myDeclined,
  ];

  // ── Earnings summary (driver collects quote minus deposit) ──────────
  // Booked/completed jobs use the selected option price (stored in
  // quote_amount at acceptance). Pending multi-option quotes use the
  // lowest option as the conservative pending value.
  const leadQuoteValue = (lead: Lead): number => {
    const direct = Number(lead.quote_amount || 0);
    if (Number.isFinite(direct) && direct > 0) return direct;
    if (lead.selected_quote_option?.totalPrice) return Number(lead.selected_quote_option.totalPrice);
    const opts = (lead.quote_options || []).map((o) => Number(o.totalPrice)).filter((v) => Number.isFinite(v) && v > 0);
    if (opts.length > 0) return Math.min(...opts);
    return 0;
  };

  const leadOptionRange = (lead: Lead): string | null => {
    const opts = (lead.quote_options || []).map((o) => Number(o.totalPrice)).filter((v) => Number.isFinite(v) && v > 0);
    if (opts.length < 2) return null;
    return `${formatPounds(Math.min(...opts))}–${formatPounds(Math.max(...opts))}`;
  };

  const moverBalance = (lead: Lead) => {
    const quote = leadQuoteValue(lead);
    if (!Number.isFinite(quote) || quote <= 0) return 0;
    const deposit = lead.booking_fee != null && Number(lead.booking_fee) > 0 ? Number(lead.booking_fee) : calculateBookingDeposit(quote);
    return calculateRemainingMoverBalance(quote, deposit);
  };
  const confirmedEarnings = [...myBookedAll, ...leads.filter((l) => isQuotedByMe(l) && l.status === "completed")]
    .reduce((sum, l) => sum + moverBalance(l), 0);
  const pendingQuotedValue = myQuoted.reduce((sum, l) => sum + moverBalance(l), 0);
  const declinedQuotedValue = myDeclined.reduce((sum, l) => sum + moverBalance(l), 0);

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
    const requirements = getMoveRequirements(lead.details);
    const routeEstimate = getRouteEstimateFromDetails(lead.details);
    const hasEstimate = lead.estimated_price && lead.estimated_price.trim() !== "";

    const cardStatus = isMyBooked(lead)
      ? "booked"
      : isMyDeclined(lead)
        ? "declined"
        : isMyQuoted(lead)
          ? "quoted"
          : isMyCompleted(lead)
            ? "completed"
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

          {accessNote && requirements.length === 0 && (
            <div className="flex items-center gap-2 mb-2">
              <Home size={16} className="text-primary/40 flex-shrink-0" />
              <p className="text-sm text-text-secondary font-medium">{accessNote}</p>
            </div>
          )}

          {/* Route estimate — postcode-to-postcode guide only */}
          {routeEstimate && (routeEstimate.distanceMeters > 0 || routeEstimate.mapUrl) && (
            <div className="flex items-start gap-2 mb-2">
              <MapPin size={16} className="text-primary/40 flex-shrink-0 mt-0.5" />
              <div>
                {routeEstimate.distanceMeters > 0 ? (
                  <p className="text-sm text-text-secondary font-medium">
                    Estimated route: <strong className="text-primary">{routeEstimate.distanceText}</strong>
                    <span className="mx-1 text-primary/30">·</span>
                    <strong className="text-primary">{routeEstimate.durationText}</strong>
                    {routeEstimate.mapUrl && (
                      <>
                        {" "}
                        <a href={routeEstimate.mapUrl} target="_blank" rel="noopener noreferrer" className="text-accent font-bold text-xs">
                          View route on map
                        </a>
                      </>
                    )}
                  </p>
                ) : (
                  <p className="text-sm text-text-secondary font-medium">
                    <a href={routeEstimate.mapUrl} target="_blank" rel="noopener noreferrer" className="text-accent font-bold text-xs">
                      View postcode route on map
                    </a>
                  </p>
                )}
                <p className="text-[10px] text-text-secondary/60">Postcode-to-postcode guide only. Final timing may vary.</p>
              </div>
            </div>
          )}

          {/* Move Requirements — anonymised, no contact details */}
          {requirements.length > 0 && (
            <div className="mt-4 bg-gray-50 rounded-xl border border-border/60 p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">
                Move Requirements
              </p>
              <div className="space-y-1.5">
                {requirements.map((row) => (
                  <div key={row.label + row.value} className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-primary/70 flex-shrink-0">{row.label}:</span>
                    <span className="text-text-secondary">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Income breakdown for the driver's own jobs */}
          {isQuotedByMe(lead) && leadQuoteValue(lead) > 0 && (
            <div className="mt-4 bg-primary/5 rounded-xl border border-border/60 p-3 space-y-1">
              {lead.selected_quote_option?.serviceLabel && (
                <div className="flex justify-between text-xs"><span className="text-text-secondary">Selected option</span><strong>{lead.selected_quote_option.serviceLabel}</strong></div>
              )}
              {cardStatus === "quoted" && leadOptionRange(lead) ? (
                <div className="flex justify-between text-xs"><span className="text-text-secondary">Pending quote options</span><strong>{leadOptionRange(lead)}</strong></div>
              ) : (
                <div className="flex justify-between text-xs"><span className="text-text-secondary">Mover total quote</span><strong>{formatPounds(leadQuoteValue(lead))}</strong></div>
              )}
              <div className="flex justify-between text-xs"><span className="text-text-secondary">Booking deposit</span><strong>{formatPounds(lead.booking_fee != null && Number(lead.booking_fee) > 0 ? Number(lead.booking_fee) : calculateBookingDeposit(leadQuoteValue(lead)))}</strong></div>
              <div className="flex justify-between text-xs"><span className="text-text-secondary">{cardStatus === "declined" ? "Value not earned" : "Customer pays you"}</span><strong>{formatPounds(moverBalance(lead))}</strong></div>
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
                Guide only. Final price is set by your quote options.
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
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-1 mb-1">Quote Options</p>
                <p className="text-xs text-text-secondary/80 leading-relaxed mb-1">
                  Offer up to 3 clear options. Do not include phone numbers, emails, company names or contact details. Customer and mover details are shared only after the customer pays the booking deposit.
                </p>
                <p className="text-xs font-bold text-primary/70 leading-relaxed mb-3">
                  Review the move requirements above before choosing service levels and prices.
                </p>
              </div>

              {draftOptions.map((draft, index) => {
                const amount = parseFloat(draft.totalPrice);
                const validAmount = Number.isFinite(amount) && amount >= 10 && amount <= 10000;
                const deposit = validAmount ? calculateBookingDeposit(amount) : 0;
                const balance = validAmount ? calculateRemainingMoverBalance(amount, deposit) : 0;
                const serviceChoice = SERVICE_LEVEL_CHOICES.find((c) => c.value === draft.serviceLevel);
                return (
                  <div key={index} className="bg-white border border-border rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase tracking-widest text-accent">Option {index + 1}</p>
                      {draftOptions.length > 1 && (
                        <button
                          onClick={() => removeDraftOption(index)}
                          className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
                        >
                          Remove option
                        </button>
                      )}
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/50 ml-1 block mb-1">Service level</label>
                      <select
                        value={draft.serviceLevel}
                        onChange={(e) => updateDraftOption(index, { serviceLevel: e.target.value })}
                        className="w-full p-3 bg-gray-50 border border-border rounded-xl font-bold text-sm outline-none focus:border-accent appearance-none"
                      >
                        {SERVICE_LEVEL_CHOICES.map((choice) => (
                          <option key={choice.value} value={choice.value}>{choice.label}</option>
                        ))}
                      </select>
                      {serviceChoice && (
                        <p className="text-[11px] text-text-secondary/70 mt-1 ml-1">{serviceChoice.description}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/50 ml-1 block mb-1">Van size</label>
                      <select
                        value={draft.vanSize}
                        onChange={(e) => updateDraftOption(index, { vanSize: e.target.value })}
                        className="w-full p-3 bg-gray-50 border border-border rounded-xl font-bold text-sm outline-none focus:border-accent appearance-none"
                      >
                        {VAN_SIZE_CHOICES.map((choice) => (
                          <option key={choice.value} value={choice.value}>{choice.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/50 ml-1 block mb-1">Total price (£)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="10"
                        max="10000"
                        value={draft.totalPrice}
                        onChange={(e) => updateDraftOption(index, { totalPrice: e.target.value })}
                        placeholder="e.g. 300.00"
                        className="w-full p-3 bg-gray-50 border border-border rounded-xl font-bold text-sm outline-none focus:border-accent"
                      />
                    </div>
                    {validAmount && (
                      <div className="bg-primary/5 rounded-xl border border-border/60 p-3 space-y-1">
                        <div className="flex justify-between text-xs"><span className="text-text-secondary">Total quote</span><strong>{formatPounds(amount)}</strong></div>
                        <div className="flex justify-between text-xs"><span className="text-text-secondary">Booking deposit</span><strong>{formatPounds(deposit)}</strong></div>
                        <div className="flex justify-between text-xs"><span className="text-text-secondary">Customer pays you on moving day</span><strong>{formatPounds(balance)}</strong></div>
                      </div>
                    )}
                  </div>
                );
              })}

              {draftOptions.length < 3 && (
                <button
                  onClick={addDraftOption}
                  className="w-full py-2.5 rounded-xl border border-dashed border-border font-black uppercase tracking-widest text-xs text-primary/50 hover:text-accent hover:border-accent/40 transition-colors"
                >
                  + Add another option
                </button>
              )}

              <p className="text-[11px] text-text-secondary/70 leading-relaxed">
                {STANDARD_QUOTE_ASSUMPTION}
              </p>

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
                      Send quote options
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

              {/* No-show status / report (own booked jobs only) */}
              {lead.customer_no_show_status ? (
                <div className="bg-gray-50 border border-border rounded-xl p-3">
                  <p className="text-xs font-bold text-primary/70">{noShowStatusLabel(lead.customer_no_show_status)}</p>
                  {lead.customer_no_show_status === "rejected" && canReportNoShow(lead) && (
                    <button
                      onClick={() => setNoShowReportingId(lead.id)}
                      className="mt-2 text-[10px] font-black uppercase tracking-widest text-primary/50 hover:text-accent transition-colors"
                    >
                      Submit a new report
                    </button>
                  )}
                </div>
              ) : canReportNoShow(lead) && noShowReportingId !== lead.id ? (
                <button
                  onClick={() => setNoShowReportingId(lead.id)}
                  className="w-full py-2.5 rounded-xl border border-border font-black uppercase tracking-widest text-[10px] text-primary/50 hover:text-red-600 hover:border-red-200 transition-colors"
                >
                  Report customer no-show
                </button>
              ) : null}

              {noShowReportingId === lead.id && (
                <div className="bg-white border border-border rounded-xl p-4 space-y-3">
                  <p className="text-xs font-black uppercase tracking-widest text-primary/60">Report Customer No-Show</p>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    Only report a no-show if you attended the collection postcode at the agreed time, waited at least 20 minutes, called the customer at least twice, and sent a text or WhatsApp message.
                  </p>
                  <label className="flex items-start gap-2 text-xs text-text-secondary">
                    <input type="checkbox" checked={noShowForm.attended} onChange={(e) => setNoShowForm({ ...noShowForm, attended: e.target.checked })} className="mt-0.5 accent-accent" />
                    I attended the collection postcode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/50 block mb-1">Arrival time</label>
                      <input value={noShowForm.arrivalTime} onChange={(e) => setNoShowForm({ ...noShowForm, arrivalTime: e.target.value })} placeholder="e.g. 09:00" className="w-full p-2.5 bg-gray-50 border border-border rounded-lg text-sm font-bold outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/50 block mb-1">Minutes waited</label>
                      <input type="number" min={20} value={noShowForm.waitMinutes} onChange={(e) => setNoShowForm({ ...noShowForm, waitMinutes: e.target.value })} placeholder="20+" className="w-full p-2.5 bg-gray-50 border border-border rounded-lg text-sm font-bold outline-none focus:border-accent" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/50 block mb-1">Phone call attempts</label>
                      <input type="number" min={2} value={noShowForm.contactAttempts} onChange={(e) => setNoShowForm({ ...noShowForm, contactAttempts: e.target.value })} placeholder="2+" className="w-full p-2.5 bg-gray-50 border border-border rounded-lg text-sm font-bold outline-none focus:border-accent" />
                    </div>
                    <label className="flex items-end gap-2 pb-2 text-xs text-text-secondary">
                      <input type="checkbox" checked={noShowForm.messageSent} onChange={(e) => setNoShowForm({ ...noShowForm, messageSent: e.target.checked })} className="accent-accent" />
                      I sent a text / WhatsApp
                    </label>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/50 block mb-1">Notes / what happened</label>
                    <textarea value={noShowForm.notes} onChange={(e) => setNoShowForm({ ...noShowForm, notes: e.target.value })} rows={3} placeholder="Describe what happened (minimum 20 characters)" className="w-full p-2.5 bg-gray-50 border border-border rounded-lg text-sm outline-none focus:border-accent resize-none" />
                  </div>
                  {noShowError && (
                    <div className="rounded-lg border border-red-100 bg-red-50 p-2.5 text-red-600 text-xs font-bold">{noShowError}</div>
                  )}
                  <div className="flex gap-2">
                    <button onClick={() => submitNoShowReport(lead)} disabled={loadingId === lead.id} className="flex-1 py-2.5 bg-red-600 text-white rounded-lg font-black uppercase tracking-widest text-[10px] disabled:opacity-50">
                      {loadingId === lead.id ? "Submitting…" : "Submit no-show report"}
                    </button>
                    <button onClick={() => { setNoShowReportingId(null); setNoShowError(null); }} className="px-4 py-2.5 border border-border rounded-lg font-bold text-xs text-primary/60">
                      Cancel
                    </button>
                  </div>
                  <p className="text-[10px] text-text-secondary/60">Reports are reviewed by our team. The customer has 48 hours to dispute. Compensation, if approved, is handled manually.</p>
                </div>
              )}
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

          {cardStatus === "completed" && (
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary/40" />
              <p className="text-sm font-bold text-primary/60">
                {lead.status === "cancelled" ? "This booking was cancelled." : "This job is completed."}
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
            Man &amp; Van Club provides <strong className="text-primary">verified customer enquiries in your covered area</strong>.
            Review the move requirements and submit quote options for free. If the customer accepts an option, they pay a deposit to secure the booking. The deposit is deducted from your total quote, and you collect the remaining balance directly from the customer on moving day.
          </p>
        </div>

        {/* Earnings summary */}
        {(confirmedEarnings > 0 || pendingQuotedValue > 0 || declinedQuotedValue > 0) && (
          <div className="bg-white rounded-2xl border border-border p-4 md:p-5 mb-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-primary/60 mb-1">
              Earnings Summary
            </h2>
            <p className="text-xs text-text-secondary mb-4">
              Based on the remaining balance paid to you by customers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-green-700/70">Confirmed earnings</p>
                <p className="text-2xl font-black text-green-700 tracking-tighter">{formatPounds(confirmedEarnings)}</p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-700/70">Pending quotes</p>
                <p className="text-2xl font-black text-amber-700 tracking-tighter">{formatPounds(pendingQuotedValue)}</p>
              </div>
              <div className="bg-gray-50 border border-border rounded-xl p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Declined quotes (not earned)</p>
                <p className="text-2xl font-black text-primary/50 tracking-tighter">{formatPounds(declinedQuotedValue)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Customer-confirmed bookings */}
        {myBooked.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-green-600 mb-1">
              Confirmed Bookings
            </h2>
            <p className="text-xs text-text-secondary mb-3">Customers who accepted your quote and paid the deposit.</p>
            <div className="grid grid-cols-1 gap-5">
              {myBooked.map((lead) => renderLeadCard(lead, false))}
            </div>
          </div>
        )}

        {/* Quotes pending customer response */}
        {myQuoted.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-amber-600 mb-1">
              My Quotes
            </h2>
            <p className="text-xs text-text-secondary mb-3">Quotes you have sent and are waiting for the customer to accept or decline.</p>
            <div className="grid grid-cols-1 gap-5">
              {myQuoted.map((lead) => renderLeadCard(lead, false))}
            </div>
          </div>
        )}

        {/* Available enquiries */}
        {availableLeads.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-primary/60 mb-1">
              Available Enquiries
            </h2>
            <p className="text-xs text-text-secondary mb-3">Jobs you can quote for, matched to your approved service area and service types.</p>
            <div className="grid grid-cols-1 gap-5">
              {availableLeads.map((lead) =>
                renderLeadCard(lead, quotingId === lead.id)
              )}
            </div>
          </div>
        )}

        {/* My History: past bookings, completed work and declined quotes — this driver only */}
        {myHistory.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-primary/40 mb-1">
              My History
            </h2>
            <p className="text-xs text-text-secondary mb-3">Track your previous quotes, confirmed jobs and completed work.</p>
            <div className="grid grid-cols-1 gap-5">
              {myHistory.map((lead) => renderLeadCard(lead, false))}
            </div>
          </div>
        )}

        {availableLeads.length === 0 && myQuoted.length === 0 && myBooked.length === 0 && myHistory.length === 0 && (
          <div className="bg-white p-12 rounded-3xl border border-border text-center">
            <p className="text-lg text-text-secondary">
              No enquiries available in your service area right now.
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
