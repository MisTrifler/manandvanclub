"use client";

import { useState } from "react";
import {
  calculateIntroductionFee,
} from "@/lib/fee-calculator";
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
  Phone,
  Mail,
  User,
} from "lucide-react";

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

  const handleLogout = async () => {
    await fetch("/api/driver/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const handleUnlock = async (lead: Lead) => {
    if (!lead.move_type) return;

    setLoadingId(lead.id);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: lead.id,
        }),
      });

      if (response.status === 409) {
        alert("This lead is no longer available. Please refresh the marketplace.");
        setLoadingId(null);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        alert(errorData.error || "Error initiating checkout. Please try again.");
        setLoadingId(null);
        return;
      }

      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      alert("Error initiating checkout. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* ── Header ─────────────────────────── */}
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
              {leads.length} available
            </span>
            <button
              onClick={handleLogout}
              className="text-xs font-black uppercase tracking-widest text-primary/60 hover:text-accent transition-colors border border-border px-3 py-1.5 rounded-xl bg-white"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* ── Disclaimer ─────────────────────── */}
        <div className="bg-white rounded-2xl border border-border p-4 md:p-5 mb-6">
          <p className="text-sm text-text-secondary leading-relaxed">
            Man &amp; Van Club provides <strong className="text-primary">verified customer enquiries</strong>, not guaranteed bookings. Final price and availability are agreed directly between you and the customer.
          </p>
        </div>

        {/* ── Leads ──────────────────────────── */}
        {leads.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-border text-center">
            <p className="text-lg text-text-secondary">
              No active leads available right now.
            </p>
            <p className="text-sm text-text-secondary/60 mt-2">
              Check back later — new enquiries come in throughout the day.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {leads.map((lead) => {
              const moveTypeLabel = formatMoveType(lead.move_type);
              const moveTypeIcon =
                MOVE_TYPE_ICONS[lead.move_type || ""] || <Package size={16} />;
              const fee = lead.move_type
                ? calculateIntroductionFee(lead.move_type, lead.details)
                : 0;
              const colPostcode = formatUKPostcode(
                lead.collection_postcode
              );
              const delPostcode = formatUKPostcode(lead.delivery_postcode);
              const moveDate = formatDisplayDate(lead.move_date);
              const submitted = relativeTime(lead.created_at);
              const urgent = isUrgent(lead.move_date);
              const moveSummary = getMoveSummary(
                lead.move_type,
                lead.details
              );
              const itemSummary = getItemSummary(lead.details);
              const accessNote = getAccessNote(lead.details);
              const hasEstimate =
                lead.estimated_price && lead.estimated_price.trim() !== "";

              return (
                <div
                  key={lead.id}
                  className="bg-white rounded-2xl border border-border overflow-hidden"
                >
                  {/* Card body */}
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
                        Exclusive lead
                      </span>
                      {urgent && (
                        <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest">
                          <Flame size={12} />
                          Move soon
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
                        <CalendarDays
                          size={16}
                          className="text-primary/40 flex-shrink-0"
                        />
                        <p className="text-sm text-text-secondary font-medium">
                          Move date: {moveDate}
                        </p>
                      </div>
                    )}

                    {/* Move summary (bedrooms, property type, office size) */}
                    {moveSummary && (
                      <div className="flex items-center gap-2 mb-2">
                        <Boxes
                          size={16}
                          className="text-primary/40 flex-shrink-0"
                        />
                        <p className="text-sm text-text-secondary font-medium">
                          {moveSummary}
                        </p>
                      </div>
                    )}

                    {/* Item summary */}
                    {itemSummary && (
                      <div className="flex items-center gap-2 mb-2">
                        <Package
                          size={16}
                          className="text-primary/40 flex-shrink-0"
                        />
                        <p className="text-sm text-text-secondary font-medium">
                          {itemSummary}
                        </p>
                      </div>
                    )}

                    {/* Access notes */}
                    {accessNote && (
                      <div className="flex items-center gap-2 mb-2">
                        <Home
                          size={16}
                          className="text-primary/40 flex-shrink-0"
                        />
                        <p className="text-sm text-text-secondary font-medium">
                          {accessNote}
                        </p>
                      </div>
                    )}

                    {/* Customer guide price */}
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
                  </div>

                  {/* ── Fee + Action ─────────────────── */}
                  <div className="border-t border-border bg-gray-50/50 p-4 md:p-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-0.5">
                          Exclusive intro fee
                        </p>
                        <p className="text-2xl font-black text-accent tracking-tighter">
                          £{fee}
                        </p>
                        <p className="text-xs text-text-secondary/70 mt-0.5">
                          Pay once to view customer contact details.
                        </p>
                      </div>

                      <button
                        onClick={() => handleUnlock(lead)}
                        disabled={loadingId === lead.id}
                        className="btn-orange w-full md:w-auto px-6 py-3 rounded-xl font-black uppercase tracking-widest text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {loadingId === lead.id ? (
                          "Processing..."
                        ) : (
                          <>
                            Accept Exclusive Lead
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Lead Credit Policy ─────────────── */}
        <div className="mt-8 bg-white rounded-2xl border border-border p-5 md:p-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-primary/60 mb-3">
            Lead Credit Policy
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-2">
            If an enquiry is fake, duplicated, unreachable, outside your approved area, or contains clearly incorrect details, contact{" "}
            <a
              href="mailto:support@manandvanclub.co.uk"
              className="text-accent font-bold hover:underline"
            >
              support@manandvanclub.co.uk
            </a>{" "}
            and we’ll review it for a lead credit.
          </p>
          <p className="text-sm text-text-secondary/70 leading-relaxed">
            Customer choosing not to proceed after receiving your quote does not automatically make the enquiry invalid.
          </p>
        </div>
      </div>
    </div>
  );
}
