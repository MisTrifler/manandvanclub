"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Check, X, User, MapPin, Phone, Mail, Clock, Shield, Zap, Loader2, Search, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface Lead {
  id: string;
  first_name: string;
  email: string;
  collection_postcode: string;
  delivery_postcode: string;
  move_type: string;
  is_verified: boolean;
  locked_by?: string;
  created_at: string;
}

interface Driver {
  id: string;
  company_name: string;
  contact_name: string;
  phone: string;
  email: string;
  coverage_area: string;
  radius: string;
  status: string;
  applied_at: string;
}

export default function AdminPortalWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F9F9F7] flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    }>
      <AdminPortal />
    </Suspense>
  );
}

function AdminPortal() {
  const searchParams = useSearchParams();
  const adminKey = searchParams.get("key");

  const [activeTab, setActiveTab] = useState<"leads" | "drivers">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debugError, setDebugError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    setDebugError(null);
    try {
      // Fetch Leads
      const { data: leadsData, error: leadsError } = await supabase
        .from("move_requests")
        .select("*");
      
      // Fetch Drivers
      const { data: driversData, error: driversError } = await supabase
        .from("driver_applications")
        .select("*");

      if (leadsError) {
        setDebugError(`Leads Error: ${leadsError.message} (${leadsError.code})`);
      } else if (driversError) {
        setDebugError(`Drivers Error: ${driversError.message} (${driversError.code})`);
      }

      setLeads(leadsData || []);
      setDrivers(driversData || []);
    } catch (err: any) {
      setDebugError(`Critical Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function updateDriverStatus(id: string, status: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/approve-driver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driverId: id, status }),
      });
      if (res.ok) fetchData();
      else {
        const error = await res.json();
        setDebugError(`Action Failed: ${error.message}`);
      }
    } catch (err: any) {
      setDebugError(`Critical Action Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  const filteredLeads = leads.filter(l => 
    l.first_name?.toLowerCase().includes(search.toLowerCase()) || 
    l.collection_postcode?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredDrivers = drivers.filter(d => 
    d.company_name?.toLowerCase().includes(search.toLowerCase()) || 
    d.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (adminKey !== "MV2026") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <Shield size={48} className="mx-auto text-primary/10" />
          <p className="font-black text-primary/20 uppercase tracking-[0.4em] text-xs">Unauthorized Access</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F7] p-4 lg:p-12 font-sans selection:bg-accent selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-primary tracking-tighter uppercase">Admin <span className="text-accent italic">Portal</span></h1>
            <p className="text-text-secondary font-medium">Manage leads and verify drivers</p>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-border shadow-sm">
            <button 
              onClick={() => setActiveTab("leads")}
              className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${activeTab === 'leads' ? 'bg-primary text-white shadow-lg' : 'text-primary/40 hover:bg-gray-50'}`}
            >
              Move Leads
            </button>
            <button 
              onClick={() => setActiveTab("drivers")}
              className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${activeTab === 'drivers' ? 'bg-primary text-white shadow-lg' : 'text-primary/40 hover:bg-gray-50'}`}
            >
              Driver Apps
            </button>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
           <StatCard label="Total Leads" value={leads.length} icon={<Zap size={20}/>} />
           <StatCard label="Pending Apps" value={drivers.filter(d => d.status === 'pending').length} icon={<Shield size={20}/>} />
           <StatCard label="Verified Leads" value={leads.filter(l => l.is_verified).length} icon={<Check size={20}/>} />
           <StatCard label="Active Movers" value={drivers.filter(d => d.status === 'approved').length} icon={<User size={20}/>} />
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20" size={20} />
           <input 
             type="text" 
             placeholder="Search by name, email or postcode..."
             className="w-full pl-16 pr-6 py-5 bg-white border border-border rounded-[2rem] outline-none focus:border-accent font-bold transition-all shadow-sm"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
        </div>

        {/* Debug Error Area */}
        {debugError && (
          <div className="mb-8 p-6 bg-red-50 border-2 border-red-100 rounded-[2rem] text-red-600 font-black uppercase tracking-widest text-[10px]">
            DEBUG: {debugError}
          </div>
        )}

        {/* Table Area */}
        <div className="bg-white rounded-[3rem] border border-border shadow-2xl overflow-hidden">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin text-accent" size={48} />
              <p className="font-black text-primary/20 uppercase tracking-[0.3em] text-xs">Syncing Database...</p>
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
                    filteredLeads.map(lead => (
                      <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-8">
                          <p className="font-black text-primary uppercase tracking-tight">{lead.first_name}</p>
                          <p className="text-xs text-text-secondary font-medium">{lead.email}</p>
                        </td>
                        <td className="p-8">
                          <div className="flex items-center gap-2 text-xs font-bold text-primary italic">
                            {lead.collection_postcode} <ArrowUpRight size={12}/> {lead.delivery_postcode}
                          </div>
                          <p className="text-[10px] text-text-secondary uppercase tracking-widest mt-1">{lead.move_type}</p>
                        </td>
                        <td className="p-8">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${lead.is_verified ? 'bg-success/10 text-success' : 'bg-amber-100 text-amber-600'}`}>
                            {lead.is_verified ? 'Verified' : 'Unverified'}
                          </span>
                        </td>
                        <td className="p-8 text-xs font-bold text-primary/60 uppercase">
                          {lead.locked_by || '—'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    filteredDrivers.map(driver => (
                      <tr key={driver.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-8">
                          <p className="font-black text-primary uppercase tracking-tight">{driver.company_name}</p>
                          <span className={`text-[9px] font-black uppercase tracking-widest ${driver.status === 'approved' ? 'text-success' : 'text-amber-500'}`}>
                            {driver.status}
                          </span>
                        </td>
                        <td className="p-8">
                          <p className="text-xs font-bold text-primary">{driver.coverage_area}</p>
                          <p className="text-[10px] text-text-secondary uppercase tracking-widest">{driver.radius}</p>
                        </td>
                        <td className="p-8 text-xs">
                          <p className="font-bold text-primary">{driver.contact_name}</p>
                          <p className="text-text-secondary font-medium">{driver.phone}</p>
                        </td>
                        <td className="p-8">
                          {driver.status === 'pending' ? (
                            <div className="flex gap-2">
                              <button onClick={() => updateDriverStatus(driver.id, 'approved')} className="p-3 bg-success text-white rounded-xl hover:scale-110 transition-all shadow-lg shadow-success/20"><Check size={16} strokeWidth={3}/></button>
                              <button onClick={() => updateDriverStatus(driver.id, 'rejected')} className="p-3 bg-red-500 text-white rounded-xl hover:scale-110 transition-all shadow-lg shadow-red-500/20"><X size={16} strokeWidth={3}/></button>
                            </div>
                          ) : (
                            <button onClick={() => updateDriverStatus(driver.id, 'pending')} className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline">Reset to Pending</button>
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

function StatCard({ label, value, icon }: { label: string, value: number, icon: React.ReactNode }) {
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
