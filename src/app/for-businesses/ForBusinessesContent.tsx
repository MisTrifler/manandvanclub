"use client";
import Link from "next/link";
import { CheckCircle2, TrendingUp, Map, ShieldCheck, Wallet, ArrowUpRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function ForBusinessesContent() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.manandvanclub.co.uk" },
      { "@type": "ListItem", "position": 2, "name": "Join as a Driver", "item": "https://www.manandvanclub.co.uk/for-businesses" }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <section className="bg-white py-20 lg:py-28 overflow-hidden relative border-b border-border">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 space-y-8"
            >
              <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">Mover Network</div>
              <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-[0.9] text-primary">
                <span>Join a Network Built </span>
                <span className="text-accent italic">Around Exclusive</span>
                <span> Customer Enquiries</span>
              </h1>
              <p className="text-xl text-text-secondary mb-10 max-w-xl font-medium leading-relaxed">
                Receive customer enquiries without competing against multiple movers. No monthly contracts, just quality job enquiries across England, starting in Birmingham.
              </p>
                <div className="space-y-4">
                {[
                  "New customer enquiries daily",
                  "Submit quotes for verified move requests",
                  "No monthly contracts — ever",
                  "Control your service area and job types",
                  "Build a verified review profile"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4 bg-[#F9F9F7] border border-border p-4 rounded-2xl">
                    <CheckCircle2 size={24} className="text-accent" />
                    <span className="font-bold text-sm uppercase tracking-widest text-primary">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 mt-6">
                <p className="text-sm font-bold text-primary mb-3">Want to learn more about how the platform works?</p>
                <Link href="/why-join" className="inline-flex items-center gap-2 text-accent font-black uppercase text-xs tracking-widest hover:underline">
                  Why Join Man and Van Club <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* Signup CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 w-full max-w-xl bg-[#F9F9F7] p-12 md:p-20 rounded-[4rem] border border-border text-center space-y-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 rounded-full -mr-16 -mt-16" />
              <div className="space-y-4">
                <h2 className="text-4xl font-black uppercase tracking-tight text-primary leading-none">Apply to Join</h2>
                <p className="text-text-secondary font-medium text-lg leading-relaxed">
                  Join a network built around customer-confirmed move requests. Customers are not spammed by multiple movers.
                </p>
              </div>
              
              <div className="space-y-6">
                <Link 
                  href="/apply-to-join" 
                  className="btn-orange w-full py-7 rounded-[2rem] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 text-lg shadow-2xl shadow-accent/20 transition-all hover:scale-105 active:scale-95 inline-flex"
                >
                  Start Application →
                </Link>
                <div className="flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/40 italic">
                    <ShieldCheck size={14} /> Vetted Network
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/40 italic">
                    <Zap size={14} /> Fast Approval
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insurance Verification */}
      <section className="py-20 bg-[#F9F9F7] border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white border border-border rounded-[2.5rem] p-12 md:p-16 text-center space-y-6">
            <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-accent">
              <ShieldCheck size={36} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter">Insurance Verification Required</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed max-w-2xl mx-auto">
              <p className="text-lg font-medium">
                As part of our onboarding process, applicants must email proof of valid <span className="text-primary font-bold">Goods in Transit Insurance</span> and <span className="text-primary font-bold">Public Liability Insurance</span> to <a href="mailto:support@manandvanclub.co.uk" className="text-accent font-bold">support@manandvanclub.co.uk</a>. Applications cannot be approved until these documents have been received and checked.
              </p>
              <p className="text-sm">
                Every application is reviewed manually. Only approved businesses receive access to customer enquiries and platform features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table Section - Restricted to Logged In / Verified */}
      <section className="py-20 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#F9F9F7] border-2 border-dashed border-border rounded-[3rem] p-16 md:p-24 shadow-inner"
          >
            <ShieldCheck size={64} className="text-accent mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-primary uppercase tracking-tighter leading-none">View Booking Deposit Pricing</h2>
            <p className="text-xl text-text-secondary mb-12 max-w-md mx-auto leading-relaxed font-medium">
              To protect the network and ensure quality, driver pay-per-job rates are only visible to verified professional moving companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply-to-join" className="btn-orange px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-accent/20 transition-all">Apply to Join</Link>
              <Link href="/login" className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl transition-all">Driver Login</Link>
            </div>
            <p className="mt-10 text-[10px] text-text-secondary font-black uppercase tracking-[0.3em] opacity-40">
              * Verification usually takes less than 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-[#F9F9F7]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "Grow Fast", d: "Access a stream of active move requests in your service area today.", i: <TrendingUp /> },
              { t: "Exclusive Access", d: "Stop bidding against multiple companies. Once you receive customer details after booking deposit payment, which is deducted from the mover quote, they are yours exclusively.", i: <Wallet /> },
              { t: "Full Control", d: "Choose exactly where you work and the types of jobs you want to accept.", i: <Map /> },
              { t: "Verified Status", d: "Build your professional reputation within our exclusive logistics network.", i: <ShieldCheck /> },
            ].map((item, i) => (
              <motion.div 
                key={item.t} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-12 rounded-[2.5rem] text-center space-y-6 border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="bg-[#F9F9F7] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto text-accent group-hover:bg-accent group-hover:text-white transition-colors shadow-lg shadow-black/5">
                  {item.i}
                </div>
                <h3 className="font-black text-xl text-primary uppercase tracking-tight">{item.t}</h3>
                <p className="text-sm text-text-secondary font-medium leading-relaxed">{item.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
