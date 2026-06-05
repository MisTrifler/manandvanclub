import Image from "next/image";
import { CheckCircle2, TrendingUp, Map, ShieldCheck, Wallet } from "lucide-react";

export default function ForBusinesses() {
  const leadFees = [
    { type: "Small move", items: "1–2 items / single room", fee: "£8" },
    { type: "Medium move", items: "1–2 bedroom flat or house", fee: "£15" },
    { type: "Large move", items: "3+ bedrooms", fee: "£25" },
    { type: "Long distance", items: "50+ miles", fee: "£35" },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Get More Moving Jobs</h1>
              <p className="text-xl text-gray-300 mb-8">
                Join hundreds of man & van drivers earning more with Man & Van Club. No monthly contracts, just quality job enquiries.
              </p>
              <div className="space-y-4">
                {[
                  "New customer enquiries daily",
                  "Only pay for jobs you choose to unlock",
                  "No monthly contracts — ever",
                  "Control your service area and job types",
                  "Build a verified review profile"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-accent" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signup Form */}
            <div className="lg:w-1/2 w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl text-text-primary">
              <h2 className="text-2xl font-bold mb-6">Apply to Join</h2>
              <form className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold">Company Name / Trading Name</label>
                  <input className="w-full p-3 border border-border rounded-md" placeholder="e.g. Swift Moves Ltd" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold">Contact Name</label>
                    <input className="w-full p-3 border border-border rounded-md" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold">Mobile Number</label>
                    <input className="w-full p-3 border border-border rounded-md" required />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold">Email Address</label>
                  <input type="email" className="w-full p-3 border border-border rounded-md" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold">Coverage Area</label>
                    <input className="w-full p-3 border border-border rounded-md" placeholder="e.g. Manchester" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold">Radius (miles)</label>
                    <select className="w-full p-3 border border-border rounded-md bg-white">
                      <option>10 miles</option>
                      <option>25 miles</option>
                      <option>50 miles</option>
                      <option>UK-wide</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold">Vehicle Type</label>
                  <select className="w-full p-3 border border-border rounded-md bg-white">
                    <option>Transit Van</option>
                    <option>Luton Van</option>
                    <option>Luton with Tail Lift</option>
                    <option>Multiple Vehicles</option>
                  </select>
                </div>
                <div className="flex items-start gap-2 pt-2">
                  <input type="checkbox" className="mt-1" required />
                  <span className="text-xs text-text-secondary">I confirm I am fully insured for goods in transit and public liability.</span>
                </div>
                <button type="submit" className="btn-orange w-full py-4 text-lg">Apply to Join →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-text-secondary">You only pay when you choose to unlock a job. No hidden fees.</p>
          </div>

          <div className="border border-border rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-border">
                <tr>
                  <th className="p-4 md:p-6 font-bold text-primary">Move Type</th>
                  <th className="p-4 md:p-6 font-bold text-primary hidden md:table-cell">Description</th>
                  <th className="p-4 md:p-6 font-bold text-primary text-right">To Unlock Job</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leadFees.map((row) => (
                  <tr key={row.type} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 md:p-6 font-semibold">{row.type}</td>
                    <td className="p-4 md:p-6 text-text-secondary hidden md:table-cell">{row.items}</td>
                    <td className="p-4 md:p-6 text-right font-bold text-accent">{row.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center space-y-4">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-accent">
                <TrendingUp size={32} />
              </div>
              <h3 className="font-bold text-xl">Grow Fast</h3>
              <p className="text-sm text-text-secondary">Access a steady stream of new customers looking for moves in your area today.</p>
            </div>
            <div className="card text-center space-y-4">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-accent">
                <Wallet size={32} />
              </div>
              <h3 className="font-bold text-xl">Pay Per Lead</h3>
              <p className="text-sm text-text-secondary">Stop wasting money on marketing. Only pay when you actually get the customer's details.</p>
            </div>
            <div className="card text-center space-y-4">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-accent">
                <Map size={32} />
              </div>
              <h3 className="font-bold text-xl">Full Control</h3>
              <p className="text-sm text-text-secondary">Choose exactly where you work and the types of jobs you want to accept.</p>
            </div>
            <div className="card text-center space-y-4">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-accent">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-bold text-xl">Verified Reputation</h3>
              <p className="text-sm text-text-secondary">Every review you collect stays with your profile, helping you win more jobs over time.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
