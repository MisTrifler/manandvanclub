"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateCustomerNoShowCompensation } from "@/lib/no-show";
import { isCustomerBudgetReasonable } from "@/lib/quote-feedback";
import {
  ArrowUpRight,
  Check,
  Clock,
  Loader2,
  Search,
  Shield,
  User,
  X,
  Zap,
} from "lucide-react";

type Lead = {
  id: string;
  first_name?: string;
  email?: string;
  phone?: string;
  collection_postcode?: string;
  delivery_postcode?: string;
  move_type?: string;
  move_date?: string;
  is_verified?: boolean;
  locked_by?: string;
  created_at?: string;
  status?: string;
  quoted_by?: string;
  quote_amount?: number;
  booking_fee?: number;
  selected_quote_option?: { serviceLabel?: string; vanLabel?: string; totalPrice?: number } | null;
  customer_no_show_status?: string | null;
  customer_no_show_reported_at?: string;
  customer_no_show_wait_minutes?: number;
  customer_no_show_contact_attempts?: number;
  customer_no_show_evidence_notes?: string;
  customer_no_show_customer_dispute_until?: string;
  customer_no_show_customer_dispute_reason?: string;
  customer_no_show_mover_compensation_amount?: number;
  customer_no_show_platform_retained_amount?: number;
  customer_no_show_payout_status?: string | null;
  customer_no_show_payout_reference?: string;
  estimated_price?: string;
  details?: any;
  quote_feedback_last_outcome?: string | null;
  quote_feedback_reason?: string | null;
  quote_feedback_still_needs_help?: boolean | null;
  quote_feedback_budget_min?: number | null;
  quote_feedback_budget_max?: number | null;
  quote_feedback_notes?: string | null;
  quote_feedback_admin_decision?: string | null;
};

type AbandonedQuote = {
  id: string;
  status?: string;
  first_name?: string;
  email?: string;
  phone?: string;
  collection_postcode?: string;
  delivery_postcode?: string;
  move_type?: string;
  move_date?: string;
  service_intent?: string;
  guide_price_displayed?: string;
  source_page?: string;
  landing_page?: string;
  last_activity_at?: string;
  contacted_at?: string;
  converted_at?: string;
  converted_request_id?: string;
  archived_at?: string;
  created_at?: string;
  details?: any;
  admin_notes?: string | null;
};

type Driver = {
  id: string;
  company_name?: string;
  contact_name?: string;
  phone?: string;
  email?: string;
  coverage_area?: string;
  radius?: string;
  status?: string;
  applied_at?: string;
  has_insurance?: boolean;
  insurance_verified?: boolean;
  insurance_verified_at?: string;
};

type DashboardResponse = {
  leads: Lead[];
  drivers: Driver[];
  abandonedLeads?: AbandonedQuote[];
};

export default function AdminPortalClient() {
  const [activeTab, setActiveTab] = useState<"leads" | "abandoned" | "drivers">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [abandonedLeads, setAbandonedLeads] = useState<AbandonedQuote[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [abandonedStatusFilter, setAbandonedStatusFilter] = useState<"active" | "all" | "abandoned" | "contacted" | "converted" | "archived">("active");

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/dashboard", {
        method: "GET",
        cache: "no-store",
      });

      if (response.status === 401) {
        window.location.href = "/control-center-mv";
        return;
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || "Failed to load admin data.");
      }

      const data = result as DashboardResponse;
      setLeads(data.leads || []);
      setAbandonedLeads(data.abandonedLeads || []);
      setDrivers(data.drivers || []);
    } catch (err: any) {
      setError(err.message || "Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // ── No-show review state + actions ──────────────────────────────────
  const [noShowPanelId, setNoShowPanelId] = useState<string | null>(null);
  const [noShowAdminNote, setNoShowAdminNote] = useState("");
  const [noShowPayoutRef, setNoShowPayoutRef] = useState("");

  function noShowSuggestion(lead: Lead): string {
    const deposit = Number(lead.booking_fee || 0);
    if (!deposit) return "—";
    const comp = calculateCustomerNoShowCompensation(deposit);
    return `£${comp.moverCompensationAmount} / £${comp.platformRetainedAmount}`;
  }

  async function noShowAction(requestId: string, action: string) {
    setActionLoadingId(requestId);
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await fetch("/api/admin/no-show", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action, adminNote: noShowAdminNote.trim(), payoutReference: noShowPayoutRef.trim() }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "No-show action failed.");
        return;
      }
      setSuccessMessage(`No-show action '${action}' completed.`);
      setNoShowAdminNote("");
      setNoShowPayoutRef("");
      await fetchData();
    } catch {
      setError("No-show action failed.");
    } finally {
      setActionLoadingId(null);
    }
  }

  // ── Quote feedback review state + actions ──────────────────────────
  const [feedbackPanelId, setFeedbackPanelId] = useState<string | null>(null);
  const [feedbackAdminNote, setFeedbackAdminNote] = useState("");

  function budgetVerdict(lead: Lead): string {
    const guide = lead.details?.guidePrice;
    const prevOptions = Array.isArray(lead.details?.quoteOptionsArchive) ? lead.details.quoteOptionsArchive : [];
    const result = isCustomerBudgetReasonable({
      budgetMax: lead.quote_feedback_budget_max,
      guidePriceMin: guide?.min,
      guidePriceMax: guide?.max,
      previousQuoteMin: prevOptions.length ? Math.min(...prevOptions.map((o: any) => Number(o.totalPrice) || Infinity)) : null,
      previousQuoteMax: null,
    });
    return result.label;
  }

  async function feedbackAction(requestId: string, action: string) {
    setActionLoadingId(requestId);
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await fetch("/api/admin/quote-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action, adminNote: feedbackAdminNote.trim() }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Feedback action failed.");
        return;
      }
      setSuccessMessage(`Feedback action '${action}' completed.`);
      setFeedbackAdminNote("");
      await fetchData();
    } catch {
      setError("Feedback action failed.");
    } finally {
      setActionLoadingId(null);
    }
  }

  async function updateAbandonedQuoteStatus(id: string, action: "contacted" | "archive" | "reopen") {
    setActionLoadingId(id);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/admin/abandoned-quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to update abandoned quote.");
        return;
      }
      setSuccessMessage("Abandoned quote updated.");
      await fetchData();
    } catch {
      setError("Failed to update abandoned quote.");
    } finally {
      setActionLoadingId(null);
    }
  }

  async function markInsuranceVerified(driverId: string) {
    setActionLoadingId(driverId);
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await fetch("/api/admin/approve-driver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driverId, action: "verify_insurance" }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to mark insurance verified.");
        return;
      }
      setSuccessMessage("Insurance marked as verified. The mover can now be approved.");
      await fetchData();
    } catch {
      setError("Failed to mark insurance verified.");
    } finally {
      setActionLoadingId(null);
    }
  }

  async function updateDriverStatus(driverId: string, status: "approved" | "rejected" | "pending") {
    if (status === "approved") {
      const driver = drivers.find((d) => d.id === driverId);
      if (driver && driver.insurance_verified !== true) {
        setError("Cannot approve mover until insurance documents have been received and marked verified.");
        return;
      }
    }
    setActionLoadingId(driverId);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/admin/approve-driver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driverId, status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || "Failed to update driver status.");
      }

      // Show success message
      const driver = drivers.find(d => d.id === driverId);
      if (status === "approved" && driver?.email) {
        setSuccessMessage(`Driver approved. Magic link sent to ${driver.email}`);
      } else if (status === "rejected") {
        setSuccessMessage("Driver application rejected.");
      }

      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);

      await fetchData();
    } catch (err: any) {
      setError(err.message || "Failed to update driver status.");
    } finally {
      setActionLoadingId(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/control-center-mv";
  }

  const filteredLeads = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return leads;
    return leads.filter((lead) =>
      [lead.first_name, lead.email, lead.collection_postcode, lead.delivery_postcode, lead.move_type]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(term)),
    );
  }, [leads, search]);

  const abandonedStatusCounts = useMemo(() => {
    return abandonedLeads.reduce(
      (acc, lead) => {
        const status = String(lead.status || "abandoned");
        acc.all += 1;
        if (["abandoned", "contacted"].includes(status)) acc.active += 1;
        if (status in acc) acc[status as keyof typeof acc] += 1;
        return acc;
      },
      { all: 0, active: 0, abandoned: 0, contacted: 0, converted: 0, archived: 0 },
    );
  }, [abandonedLeads]);

  const filteredAbandonedLeads = useMemo(() => {
    const term = search.toLowerCase().trim();
    const visible = abandonedLeads.filter((lead) => {
      const status = String(lead.status || "abandoned");
      if (abandonedStatusFilter === "all") return true;
      if (abandonedStatusFilter === "active") return ["abandoned", "contacted"].includes(status);
      return status === abandonedStatusFilter;
    });

    if (!term) return visible;
    return visible.filter((lead) =>
      [lead.first_name, lead.email, lead.phone, lead.collection_postcode, lead.delivery_postcode, lead.move_type, lead.service_intent]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(term)),
    );
  }, [abandonedLeads, abandonedStatusFilter, search]);

  const filteredDrivers = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return drivers;
    return drivers.filter((driver) =>
      [driver.company_name, driver.email, driver.contact_name, driver.coverage_area, driver.phone]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(term)),
    );
  }, [drivers, search]);

  return (
    <div className="min-h-screen bg-[#F9F9F7] p-4 lg:p-12 selection:bg-accent selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-primary uppercase tracking-tighter">
              Control <span className="text-accent italic">Center</span>
            </h1>
            <p className="text-text-secondary font-medium">Server-side admin dashboard for leads and driver applications.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-border shadow-sm">
              <button
                onClick={() => setActiveTab("leads")}
                className={`px-5 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${
                  activeTab === "leads" ? "bg-primary text-white shadow-lg" : "text-primary/40 hover:bg-gray-50"
                }`}
              >
                Move Leads
              </button>
              <button
                onClick={() => setActiveTab("abandoned")}
                className={`px-5 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${
                  activeTab === "abandoned" ? "bg-primary text-white shadow-lg" : "text-primary/40 hover:bg-gray-50"
                }`}
              >
                Abandoned
              </button>
              <button
                onClick={() => setActiveTab("drivers")}
                className={`px-5 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${
                  activeTab === "drivers" ? "bg-primary text-white shadow-lg" : "text-primary/40 hover:bg-gray-50"
                }`}
              >
                Driver Apps
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="bg-white px-5 py-4 rounded-2xl border border-border shadow-sm text-[10px] font-black uppercase tracking-widest text-primary/60 hover:text-accent transition-colors"
            >
              Log Out
            </button>
          </div>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          <StatCard label="Total Leads" value={leads.length} icon={<Zap size={20} />} />
          <StatCard label="Active Abandoned" value={abandonedStatusCounts.active} icon={<Clock size={20} />} />
          <StatCard label="Pending Apps" value={drivers.filter((d) => d.status === "pending").length} icon={<Shield size={20} />} />
          <StatCard label="Verified Leads" value={leads.filter((l) => l.is_verified).length} icon={<Check size={20} />} />
          <StatCard label="Active Movers" value={drivers.filter((d) => d.status === "approved").length} icon={<User size={20} />} />
        </div>

        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20" size={20} />
          <input
            type="text"
            placeholder="Search by name, email, postcode or company..."
            className="w-full pl-16 pr-6 py-5 bg-white border border-border rounded-[2rem] outline-none focus:border-accent font-bold transition-all shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {error && (
          <div className="p-5 bg-red-50 border-2 border-red-100 rounded-[2rem] text-red-600 font-bold text-sm break-words">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="p-5 bg-green-50 border-2 border-green-100 rounded-[2rem] text-green-700 font-bold text-sm">
            {successMessage}
          </div>
        )}

        <div className="bg-white rounded-[3rem] border border-border shadow-2xl overflow-hidden">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin text-accent" size={48} />
              <p className="font-black text-primary/20 uppercase tracking-[0.3em] text-xs">Loading Admin Data...</p>
            </div>
          ) : activeTab === "abandoned" ? (
            <div>
              <div className="flex flex-wrap gap-2 border-b border-border/60 bg-gray-50/60 p-5">
                {([
                  ["active", "Active", abandonedStatusCounts.active],
                  ["abandoned", "Abandoned", abandonedStatusCounts.abandoned],
                  ["contacted", "Contacted", abandonedStatusCounts.contacted],
                  ["converted", "Converted", abandonedStatusCounts.converted],
                  ["archived", "Archived", abandonedStatusCounts.archived],
                  ["all", "All", abandonedStatusCounts.all],
                ] as const).map(([key, label, count]) => (
                  <button
                    key={key}
                    onClick={() => setAbandonedStatusFilter(key)}
                    className={`rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                      abandonedStatusFilter === key
                        ? "bg-primary text-white shadow-lg"
                        : "bg-white text-primary/50 hover:text-primary border border-border"
                    }`}
                  >
                    {label} <span className="ml-1 opacity-70">{count}</span>
                  </button>
                ))}
              </div>
              <AbandonedQuotesPanel
                quotes={filteredAbandonedLeads}
                actionLoadingId={actionLoadingId}
                onAction={updateAbandonedQuoteStatus}
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    {activeTab === "leads" ? (
                      <>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-primary/40">Customer</th>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-primary/40">Route</th>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-primary/40">Status</th>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-primary/40">Locked By</th>
                      </>
                    ) : (
                      <>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-primary/40">Company</th>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-primary/40">Area</th>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-primary/40">Contact</th>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-primary/40">Action</th>
                      </>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-border/50">
                  {activeTab === "leads" ? (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-8">
                          <p className="font-black text-primary uppercase tracking-tight">{lead.first_name || "Unnamed"}</p>
                          <p className="text-xs text-text-secondary font-medium break-all">{lead.email || "—"}</p>
                        </td>
                        <td className="p-8">
                          <div className="flex items-center gap-2 text-xs font-bold text-primary italic">
                            {lead.collection_postcode || "—"} <ArrowUpRight size={12} /> {lead.delivery_postcode || "—"}
                          </div>
                          <p className="text-[10px] text-text-secondary uppercase tracking-widest mt-1">{lead.move_type || "—"}</p>
                        </td>
                        <td className="p-8">
                          <span
                            className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                              lead.is_verified ? "bg-success/10 text-success" : "bg-amber-100 text-amber-600"
                            }`}
                          >
                            {lead.is_verified ? "Verified" : "Unverified"}
                          </span>
                        </td>
                        <td className="p-8 text-xs font-bold text-primary/60 uppercase">
                          {lead.quoted_by || lead.locked_by || "—"}
                          {["quote_feedback_pending", "quote_feedback_received", "declined", "expired"].includes(String(lead.status || "")) && (
                            <div className="mt-2 normal-case">
                              <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                lead.status === "quote_feedback_received" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                              }`}>
                                Feedback: {lead.status === "quote_feedback_received" ? "received" : "awaiting customer"}
                              </span>
                              <button
                                onClick={() => setFeedbackPanelId(feedbackPanelId === lead.id ? null : lead.id)}
                                className="block mt-1.5 text-[10px] font-black uppercase tracking-widest text-accent hover:text-primary transition-colors"
                              >
                                {feedbackPanelId === lead.id ? "Hide feedback" : "Review feedback"}
                              </button>
                            </div>
                          )}
                          {lead.customer_no_show_status && (
                            <div className="mt-2 normal-case">
                              <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                lead.customer_no_show_status === "approved" ? "bg-green-50 text-green-700"
                                : lead.customer_no_show_status === "rejected" ? "bg-gray-100 text-gray-500"
                                : lead.customer_no_show_status === "disputed" ? "bg-red-50 text-red-600"
                                : "bg-amber-50 text-amber-600"
                              }`}>
                                No-show: {lead.customer_no_show_status}
                              </span>
                              <button
                                onClick={() => setNoShowPanelId(noShowPanelId === lead.id ? null : lead.id)}
                                className="block mt-1.5 text-[10px] font-black uppercase tracking-widest text-accent hover:text-primary transition-colors"
                              >
                                {noShowPanelId === lead.id ? "Hide review" : "Review no-show"}
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )).flatMap((row, i) => {
                      const lead = filteredLeads[i];
                      if (!lead) return [row];
                      const rows = [row];
                      if (feedbackPanelId === lead.id && ["quote_feedback_pending", "quote_feedback_received", "declined", "expired"].includes(String(lead.status || ""))) {
                        rows.push(
                          <tr key={`${lead.id}-feedback`} className="bg-blue-50/30">
                            <td colSpan={4} className="p-6">
                              <div className="bg-white border border-border rounded-2xl p-5 space-y-4">
                                <p className="text-xs font-black uppercase tracking-widest text-primary/60">Quote Feedback Review — {lead.collection_postcode} → {lead.delivery_postcode}</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                                  <div><span className="text-text-secondary block">Move</span><strong className="text-primary">{lead.move_type || "—"}</strong></div>
                                  <div><span className="text-text-secondary block">Move date</span><strong className="text-primary">{lead.move_date || "—"}</strong></div>
                                  <div><span className="text-text-secondary block">Guide price</span><strong className="text-primary">{lead.estimated_price || "—"}</strong></div>
                                  <div><span className="text-text-secondary block">Last outcome</span><strong className="text-primary">{lead.quote_feedback_last_outcome || (lead.status === "expired" ? "expired" : lead.status === "declined" ? "declined" : "—")}</strong></div>
                                  <div><span className="text-text-secondary block">Still needs help</span><strong className="text-primary">{lead.quote_feedback_still_needs_help === true ? "Yes" : lead.quote_feedback_still_needs_help === false ? "No" : "—"}</strong></div>
                                  <div><span className="text-text-secondary block">Customer reason</span><strong className="text-primary">{lead.quote_feedback_reason || "—"}</strong></div>
                                  <div><span className="text-text-secondary block">Budget range</span><strong className="text-primary">{Number(lead.quote_feedback_budget_max) > 0 ? `${Number(lead.quote_feedback_budget_min) > 0 ? `£${lead.quote_feedback_budget_min}–` : "up to "}£${lead.quote_feedback_budget_max}` : "Not provided"}</strong></div>
                                  <div><span className="text-text-secondary block">Budget check</span><strong className="text-primary">{budgetVerdict(lead)}</strong></div>
                                </div>
                                {lead.quote_feedback_notes && (
                                  <div className="bg-gray-50 rounded-xl p-3 text-xs"><span className="font-black uppercase tracking-widest text-primary/40 block mb-1">Customer notes</span><span className="text-text-secondary">{lead.quote_feedback_notes}</span></div>
                                )}
                                <input value={feedbackAdminNote} onChange={(e) => setFeedbackAdminNote(e.target.value)} placeholder="Admin note (optional)" className="w-full p-2.5 bg-gray-50 border border-border rounded-lg text-xs outline-none focus:border-accent" />
                                <div className="flex flex-wrap gap-2">
                                  <button onClick={() => feedbackAction(lead.id, "release_to_pool")} disabled={actionLoadingId === lead.id} className="px-4 py-2 bg-success text-white rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-50">Release back to pool</button>
                                  <button onClick={() => feedbackAction(lead.id, "close_request")} disabled={actionLoadingId === lead.id} className="px-4 py-2 bg-red-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-50">Close request</button>
                                  <button onClick={() => feedbackAction(lead.id, "contact_customer")} disabled={actionLoadingId === lead.id} className="px-4 py-2 bg-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-50">Contact customer</button>
                                </div>
                                <p className="text-[10px] text-text-secondary/60">Releasing puts the request back into the driver pool with a fresh quote required. Budget check is guidance only.</p>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                      if (noShowPanelId !== lead.id || !lead.customer_no_show_status) return rows;
                      rows.push((
                        <tr key={`${lead.id}-noshow`} className="bg-amber-50/30">
                          <td colSpan={4} className="p-6">
                            <div className="bg-white border border-border rounded-2xl p-5 space-y-4">
                              <p className="text-xs font-black uppercase tracking-widest text-primary/60">No-Show Review — {lead.first_name || "Customer"} ({lead.collection_postcode} → {lead.delivery_postcode})</p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                                <div><span className="text-text-secondary block">Mover</span><strong className="text-primary break-all">{lead.quoted_by || "—"}</strong></div>
                                <div><span className="text-text-secondary block">Move date</span><strong className="text-primary">{lead.move_date || "—"}</strong></div>
                                <div><span className="text-text-secondary block">Quote / Deposit</span><strong className="text-primary">£{lead.quote_amount || "—"} / £{lead.booking_fee || "—"}</strong></div>
                                <div><span className="text-text-secondary block">Customer phone</span><strong className="text-primary">{lead.phone || "—"}</strong></div>
                                <div><span className="text-text-secondary block">Waited</span><strong className="text-primary">{lead.customer_no_show_wait_minutes ?? "—"} mins</strong></div>
                                <div><span className="text-text-secondary block">Call attempts</span><strong className="text-primary">{lead.customer_no_show_contact_attempts ?? "—"}</strong></div>
                                <div><span className="text-text-secondary block">Dispute window</span><strong className="text-primary">{lead.customer_no_show_customer_dispute_until ? new Date(lead.customer_no_show_customer_dispute_until).toLocaleString("en-GB") : "—"}</strong></div>
                                <div><span className="text-text-secondary block">Suggested comp / retained</span><strong className="text-primary">{noShowSuggestion(lead)}</strong></div>
                              </div>
                              {lead.customer_no_show_evidence_notes && (
                                <div className="bg-gray-50 rounded-xl p-3 text-xs"><span className="font-black uppercase tracking-widest text-primary/40 block mb-1">Mover report</span><span className="text-text-secondary">{lead.customer_no_show_evidence_notes}</span></div>
                              )}
                              {lead.customer_no_show_customer_dispute_reason && (
                                <div className="bg-red-50 rounded-xl p-3 text-xs"><span className="font-black uppercase tracking-widest text-red-600/60 block mb-1">Customer dispute</span><span className="text-text-secondary">{lead.customer_no_show_customer_dispute_reason}</span></div>
                              )}
                              <input value={noShowAdminNote} onChange={(e) => setNoShowAdminNote(e.target.value)} placeholder="Admin note (required for reject; optional otherwise)" className="w-full p-2.5 bg-gray-50 border border-border rounded-lg text-xs outline-none focus:border-accent" />
                              <div className="flex flex-wrap gap-2">
                                {lead.customer_no_show_status === "reported" && (
                                  <button onClick={() => noShowAction(lead.id, "notify_customer")} disabled={actionLoadingId === lead.id} className="px-4 py-2 bg-amber-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-50">Notify customer (48h window)</button>
                                )}
                                {(lead.customer_no_show_status === "customer_notified" || lead.customer_no_show_status === "disputed") && (
                                  <button onClick={() => noShowAction(lead.id, "approve")} disabled={actionLoadingId === lead.id} className="px-4 py-2 bg-success text-white rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-50">Approve no-show</button>
                                )}
                                {["reported", "customer_notified", "disputed"].includes(lead.customer_no_show_status || "") && (
                                  <button onClick={() => noShowAction(lead.id, "reject")} disabled={actionLoadingId === lead.id} className="px-4 py-2 bg-red-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-50">Reject report</button>
                                )}
                                {lead.customer_no_show_status === "approved" && lead.customer_no_show_payout_status === "pending_manual_payout" && (
                                  <div className="flex gap-2 items-center">
                                    <input value={noShowPayoutRef} onChange={(e) => setNoShowPayoutRef(e.target.value)} placeholder="Payout reference" className="p-2 bg-gray-50 border border-border rounded-lg text-xs outline-none focus:border-accent" />
                                    <button onClick={() => noShowAction(lead.id, "mark_paid")} disabled={actionLoadingId === lead.id} className="px-4 py-2 bg-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-50">Mark payout paid</button>
                                  </div>
                                )}
                                {lead.customer_no_show_payout_status === "paid_manually" && (
                                  <span className="text-[10px] font-black uppercase tracking-widest text-green-600 self-center">Paid manually — ref: {lead.customer_no_show_payout_reference || "—"}</span>
                                )}
                              </div>
                              <p className="text-[10px] text-text-secondary/60">All compensation and refunds are handled manually. No automatic payments are triggered by these actions.</p>
                            </div>
                          </td>
                        </tr>
                      ));
                      return rows;
                    })
                  ) : (
                    filteredDrivers.map((driver) => (
                      <tr key={driver.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-8">
                          <p className="font-black text-primary uppercase tracking-tight">{driver.company_name || "Unnamed"}</p>
                          <span
                            className={`text-[9px] font-black uppercase tracking-widest ${
                              driver.status === "approved"
                                ? "text-success"
                                : driver.status === "rejected"
                                ? "text-red-500"
                                : "text-amber-500"
                            }`}
                          >
                            {driver.status || "pending"}
                          </span>
                        </td>
                        <td className="p-8">
                          <p className="text-xs font-bold text-primary">{driver.coverage_area || "—"}</p>
                          <p className="text-[10px] text-text-secondary uppercase tracking-widest">{driver.radius || "—"}</p>
                        </td>
                        <td className="p-8 text-xs">
                          <p className="font-bold text-primary">{driver.contact_name || "—"}</p>
                          <p className="text-text-secondary font-medium">{driver.phone || "—"}</p>
                          <p className="text-text-secondary font-medium break-all">{driver.email || "—"}</p>
                          <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${driver.insurance_verified ? "text-success" : "text-amber-600"}`}>
                            {driver.insurance_verified ? "Insurance verified" : "Insurance status: pending email verification"}
                          </p>
                          {!driver.insurance_verified && (
                            <>
                              <p className="text-[9px] text-text-secondary font-medium mt-1 normal-case tracking-normal">
                                Mover must email Goods in Transit and Public Liability insurance documents to support@manandvanclub.co.uk.
                              </p>
                              <button
                                onClick={() => markInsuranceVerified(driver.id)}
                                disabled={actionLoadingId === driver.id}
                                className="mt-2 px-3 py-1.5 bg-primary text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-primary/80 transition-colors disabled:opacity-50"
                              >
                                {actionLoadingId === driver.id ? "..." : "Mark insurance verified"}
                              </button>
                            </>
                          )}
                        </td>
                        <td className="p-8">
                          {driver.status === "pending" ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateDriverStatus(driver.id, "approved")}
                                disabled={actionLoadingId === driver.id}
                                className="p-3 bg-success text-white rounded-xl hover:scale-110 transition-all shadow-lg shadow-success/20 disabled:opacity-50"
                              >
                                {actionLoadingId === driver.id ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} strokeWidth={3} />}
                              </button>
                              <button
                                onClick={() => updateDriverStatus(driver.id, "rejected")}
                                disabled={actionLoadingId === driver.id}
                                className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-all shadow-lg shadow-red-500/20 disabled:opacity-50"
                              >
                                {actionLoadingId === driver.id ? <Loader2 className="animate-spin" size={16} /> : <X size={16} strokeWidth={3} />}
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => updateDriverStatus(driver.id, "pending")}
                              disabled={actionLoadingId === driver.id}
                              className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline disabled:opacity-50"
                            >
                              Reset to Pending
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatAbandonedDate(value?: string) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function normaliseUkMobileForWhatsApp(phone?: string) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("44")) return digits;
  if (digits.startsWith("0")) return `44${digits.slice(1)}`;
  return digits;
}

function AbandonedQuotesPanel({
  quotes,
  actionLoadingId,
  onAction,
}: {
  quotes: AbandonedQuote[];
  actionLoadingId: string | null;
  onAction: (id: string, action: "contacted" | "archive" | "reopen") => void;
}) {
  if (!quotes.length) {
    return (
      <div className="p-12 text-center">
        <p className="text-2xl font-black uppercase tracking-tight text-primary">No records in this view</p>
        <p className="mt-2 text-sm font-medium text-text-secondary">Abandoned, contacted, converted and archived quote recovery records stay here for tracking.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border/60">
      {quotes.map((quote) => {
        const whatsappNumber = normaliseUkMobileForWhatsApp(quote.phone);
        const message = encodeURIComponent(
          `Hi ${quote.first_name || "there"}, you started a Man and Van Club quote for ${quote.collection_postcode || "your collection"} to ${quote.delivery_postcode || "your delivery"}. Do you still need help completing it?`,
        );

        return (
          <div key={quote.id} className="grid gap-6 p-6 lg:grid-cols-[1.3fr_1fr_1fr_auto] lg:items-center lg:p-8 hover:bg-gray-50/60 transition-colors">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-black text-primary uppercase tracking-tight">{quote.first_name || "Unnamed customer"}</p>
                <span className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-widest ${
                  quote.status === "contacted"
                    ? "bg-blue-50 text-blue-600"
                    : quote.status === "converted"
                      ? "bg-success/10 text-success"
                      : quote.status === "archived"
                        ? "bg-gray-100 text-gray-500"
                        : "bg-amber-50 text-amber-600"
                }`}>
                  {quote.status || "abandoned"}
                </span>
              </div>
              <p className="mt-1 text-xs font-medium text-text-secondary break-all">{quote.email || "No email"}</p>
              <p className="text-xs font-medium text-text-secondary">{quote.phone || "No phone"}</p>
              <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-primary/35">Last activity: {formatAbandonedDate(quote.last_activity_at || quote.created_at)}</p>
              {quote.status === "converted" && (
                <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-success">
                  Converted: {formatAbandonedDate(quote.converted_at)}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-primary italic">
                {quote.collection_postcode || "—"} <ArrowUpRight size={12} /> {quote.delivery_postcode || "—"}
              </div>
              <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-text-secondary">{quote.move_type || quote.service_intent || "Move request"}</p>
              {quote.move_date && <p className="mt-1 text-xs font-bold text-primary/60">Move date: {quote.move_date}</p>}
              {quote.guide_price_displayed && <p className="mt-1 text-xs font-bold text-accent">Guide: {quote.guide_price_displayed}</p>}
            </div>

            <div className="space-y-2 text-xs">
              {quote.email && (
                <a href={`mailto:${quote.email}?subject=${encodeURIComponent("Complete your Man and Van Club quote")}`} className="block rounded-xl border border-border bg-white px-4 py-2 font-black uppercase tracking-widest text-primary hover:border-accent">
                  Email customer
                </a>
              )}
              {quote.phone && (
                <a href={`tel:${quote.phone}`} className="block rounded-xl border border-border bg-white px-4 py-2 font-black uppercase tracking-widest text-primary hover:border-accent">
                  Call customer
                </a>
              )}
              {whatsappNumber && (
                <a href={`https://wa.me/${whatsappNumber}?text=${message}`} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border bg-white px-4 py-2 font-black uppercase tracking-widest text-primary hover:border-accent">
                  WhatsApp
                </a>
              )}
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              {quote.status === "converted" ? (
                <span className="rounded-xl bg-success/10 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-success">
                  Converted
                </span>
              ) : (
                <>
                  <button
                    onClick={() => onAction(quote.id, "contacted")}
                    disabled={actionLoadingId === quote.id}
                    className="rounded-xl bg-primary px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white disabled:opacity-50"
                  >
                    Contacted
                  </button>
                  {quote.status === "archived" ? (
                    <button
                      onClick={() => onAction(quote.id, "reopen")}
                      disabled={actionLoadingId === quote.id}
                      className="rounded-xl bg-amber-500 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white disabled:opacity-50"
                    >
                      Reopen
                    </button>
                  ) : (
                    <button
                      onClick={() => onAction(quote.id, "archive")}
                      disabled={actionLoadingId === quote.id}
                      className="rounded-xl bg-gray-100 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-primary/60 disabled:opacity-50"
                    >
                      Archive
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm space-y-4">
      <div className="text-accent">{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/30">{label}</p>
        <p className="text-4xl font-black text-primary tracking-tighter leading-none mt-1">{value}</p>
      </div>
    </div>
  );
}
