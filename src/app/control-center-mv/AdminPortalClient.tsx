"use client";

import { useEffect, useMemo, useState } from "react";
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
  collection_postcode?: string;
  delivery_postcode?: string;
  move_type?: string;
  is_verified?: boolean;
  locked_by?: string;
  created_at?: string;
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

  async function updateDriverStatus(driverId: string, status: "approved" | "rejected" | "pending") {
    if (status === "approved") {
      const driver = drivers.find((d) => d.id === driverId);
      if (driver && !driver.has_insurance) {
        const proceed = window.confirm(
          "Insurance is required before approval, and this mover has NOT confirmed Goods in Transit and Public Liability insurance. Approve anyway?"
        );
        if (!proceed) return;
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
                        <td className="p-8 text-xs font-bold text-primary/60 uppercase">{lead.locked_by || "—"}</td>
                      </tr>
                    ))
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
                          <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${driver.has_insurance ? "text-success" : "text-red-500"}`}>
                            {driver.has_insurance ? "Insurance confirmed" : "Insurance NOT confirmed — required before approval"}
                          </p>
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
