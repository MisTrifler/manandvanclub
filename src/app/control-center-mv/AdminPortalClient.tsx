"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateCustomerNoShowCompensation } from "@/lib/no-show";
import {
  ArrowUpRight,
  Check,
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
};

export default function AdminPortalClient() {
  const [activeTab, setActiveTab] = useState<"leads" | "drivers">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatCard label="Total Leads" value={leads.length} icon={<Zap size={20} />} />
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
                      if (!lead || noShowPanelId !== lead.id || !lead.customer_no_show_status) return [row];
                      return [row, (
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
                      )];
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
