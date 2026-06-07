"use client";
import { LayoutDashboard, List, Wallet, Settings, Bell, ChevronRight, Check, Clock, ShieldCheck, Zap, Info } from "lucide-react";
import Link from "next/link";

export default function DriverDashboard() {
  // Demo jobs for local testing - in production this would fetch from Supabase
  const jobs = [
    { id: '1', type: "3 Bedroom House", from: "WS8 Area", to: "B74 Area", date: "12 June", value: "£400–£500", fee: "£35.99", expires: "2 days", description: "Full house move. No large items. Standard loading help." },
  ]; 

  const handleUnlock = async (job: any) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: job.id,
          fee: parseFloat(job.fee.replace('£', '')),
          businessName: 'Mover Account' 
        }),
      });
      
      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      alert("Error initiating checkout. Check your Vercel logs.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-primary text-white hidden md:flex flex-col border-r border-white/5 shadow-2xl">
        <div className="p-8 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-accent px-2 py-1.5 rounded-lg">
              <span className="text-white font-black text-xl leading-none">M&V</span>
            </div>
            <span className="text-lg font-black uppercase tracking-tighter">Marketplace</span>
          </Link>
        </div>
        <nav className="flex-1 p-6 space-y-3">
          <Link href="#" className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs"><LayoutDashboard size={20} className="text-accent" /> Overview</Link>
          <Link href="#" className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-colors"><List size={20} className="opacity-40" /> Available Jobs</Link>
          <Link href="#" className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-colors"><ShieldCheck size={20} className="opacity-40" /> Introduced</Link>
          <Link href="#" className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-colors"><Wallet size={20} className="opacity-40" /> Credits</Link>
          <Link href="#" className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-colors"><Settings size={20} className="opacity-40" /> Account</Link>
        </nav>
        <div className="p-8 border-t border-white/5">
           <div className="bg-accent/10 rounded-2xl p-6 border border-accent/20">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-2">My Balance</p>
              <p className="text-3xl font-black tracking-tighter text-white">£0.00</p>
              <button className="w-full mt-4 bg-accent hover:bg-white hover:text-accent py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all">Top Up Credits</button>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-primary uppercase tracking-tighter">Available Jobs</h1>
            <p className="text-text-secondary font-bold">Exclusive introductions within your service radius.</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-border">
             <div className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-xl font-black text-xs uppercase tracking-widest">
                <div className="w-2 h-2 bg-success rounded-full animate-ping" />
                Live Feed
             </div>
             <div className="h-6 w-px bg-border mx-2" />
             <span className="pr-4 text-xs font-black uppercase tracking-widest text-primary/40">Real-time requests</span>
          </div>
        </div>

        {/* Lead Feed */}
        <div className="grid grid-cols-1 gap-6">
          {jobs.length > 0 ? jobs.map((job, i) => (
            <div key={i} className="bg-white rounded-3xl border border-border overflow-hidden hover:shadow-2xl hover:border-accent/50 transition-all duration-500 group flex flex-col md:flex-row">
              <div className="p-8 md:w-3/4 flex flex-col justify-between">
                <div>
                   <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="bg-primary text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">{job.type}</span>
                      <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-text-secondary">
                        <Clock size={14} /> Expires in {job.expires}
                      </span>
                      <span className="flex items-center gap-1.5 bg-success/5 text-success px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        <ShieldCheck size={14} /> Verified Mobile
                      </span>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mb-8">
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-1">Route</p>
                         <p className="text-xl font-black text-primary tracking-tight">{job.from} <ChevronRight className="inline text-accent" size={18}/> {job.to}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-1">Move Date</p>
                         <p className="text-xl font-black text-primary tracking-tight">{job.date}</p>
                      </div>
                      <div className="sm:col-span-2">
                         <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-1">Job Description</p>
                         <p className="text-text-secondary font-medium leading-relaxed">{job.description}</p>
                      </div>
                   </div>
                </div>

                <div className="pt-6 border-t border-gray-50 flex flex-wrap items-center gap-8">
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Est. Move Value</p>
                      <p className="text-2xl font-black text-primary tracking-tighter">{job.value}</p>
                   </div>
                   <div className="h-10 w-px bg-border" />
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-accent">Introduction Fee</p>
                      <p className="text-2xl font-black text-accent tracking-tighter italic">{job.fee}</p>
                   </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleUnlock(job)}
                className="md:w-1/4 bg-gray-50 group-hover:bg-accent text-primary/40 group-hover:text-white p-8 flex flex-col items-center justify-center gap-4 transition-all border-l border-border group-hover:border-accent"
              >
                 <div className="bg-white/50 p-4 rounded-2xl shadow-inner group-hover:bg-white group-hover:text-accent group-hover:scale-110 transition-all">
                    <Zap size={32} strokeWidth={3} />
                 </div>
                 <span className="font-black uppercase tracking-widest text-xs">Unlock Job</span>
                 <p className="text-[9px] font-bold uppercase opacity-60 text-center px-4 leading-tight group-hover:opacity-100">Immediate access to verified contact details</p>
              </button>
            </div>
          )) : (
            <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-border text-center space-y-4">
               <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-primary/20">
                  <List size={32} />
               </div>
               <div className="space-y-1">
                  <h3 className="text-2xl font-black text-primary uppercase tracking-tighter">No active move requests</h3>
                  <p className="text-text-secondary font-medium">New requests will appear here once verified.</p>
               </div>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-blue-50/50 rounded-3xl p-8 border border-blue-100 flex gap-6 items-start">
           <div className="bg-white p-3 rounded-2xl shadow-sm text-blue-600">
              <Info size={24} />
           </div>
           <div>
              <h3 className="font-black text-primary uppercase tracking-tight mb-2">How Exclusive Introductions Work</h3>
              <p className="text-text-secondary font-medium leading-relaxed text-sm">
                 Once you unlock a job, it is immediately removed from all other driver dashboards. Introductions are 1-to-1.
              </p>
           </div>
        </div>
      </main>
    </div>
  );
}
