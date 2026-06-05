import { LayoutDashboard, List, Wallet, Settings, Bell, ChevronRight, Check } from "lucide-react";
import Link from "next/link";

export default function DriverDashboard() {
  const leads = [
    { type: "Medium move", from: "SW1A", to: "M1", date: "12 June", fee: "£15", expires: "1h 42m" },
    { type: "Small move", from: "B1", to: "B15", date: "15 June", fee: "£8", expires: "2h 15m" },
    { type: "Long distance", from: "G1", to: "E1", date: "20 June", fee: "£35", expires: "4h 05m" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white hidden md:flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-white/10">
          Driver Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="#" className="flex items-center gap-3 p-3 bg-white/10 rounded-lg"><LayoutDashboard size={20} /> Overview</Link>
          <Link href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg"><List size={20} /> Available Jobs</Link>
          <Link href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg"><Wallet size={20} /> My Balance</Link>
          <Link href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg"><Bell size={20} /> Notifications</Link>
          <Link href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg"><Settings size={20} /> Account</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-primary">Welcome back, Swift Moves</h1>
          <div className="bg-white px-6 py-2 rounded-full border border-border flex items-center gap-4">
            <span className="text-sm font-medium">Balance: <span className="text-accent font-bold">£124.00</span></span>
            <button className="bg-accent text-white px-4 py-1 rounded-full text-xs font-bold">Top Up</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl border border-border">
            <div className="text-text-secondary text-sm mb-1">Jobs Available Today</div>
            <div className="text-3xl font-bold">12</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-border">
            <div className="text-text-secondary text-sm mb-1">Unlocked (June)</div>
            <div className="text-3xl font-bold">45</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-border">
            <div className="text-text-secondary text-sm mb-1">Total Earned</div>
            <div className="text-3xl font-bold">£2,450</div>
          </div>
        </div>

        {/* Lead Feed */}
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
          Available Jobs Near You
          <span className="bg-accent text-white text-xs px-2 py-1 rounded-full uppercase tracking-widest font-black">Driver Feed</span>
        </h2>
        
        <div className="space-y-4">
          {leads.map((lead, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-border flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-all">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                <div>
                  <div className="text-xs text-text-secondary uppercase tracking-wider mb-1 font-bold">Type</div>
                  <div className="font-bold text-primary">{lead.type}</div>
                </div>
                <div>
                  <div className="text-xs text-text-secondary uppercase tracking-wider mb-1 font-bold">Route</div>
                  <div className="font-bold text-primary">{lead.from} → {lead.to}</div>
                </div>
                <div>
                  <div className="text-xs text-text-secondary uppercase tracking-wider mb-1 font-bold">Date</div>
                  <div className="font-bold text-primary">{lead.date}</div>
                </div>
                <div>
                  <div className="text-xs text-text-secondary uppercase tracking-wider mb-1 font-bold">To Unlock</div>
                  <div className="font-bold text-accent">{lead.fee}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="text-xs text-red-500 font-bold hidden lg:block italic">Expires in {lead.expires}</div>
                <button className="btn-orange text-sm flex-1 md:flex-none py-3 px-8 font-black uppercase tracking-wide">Unlock Job</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
