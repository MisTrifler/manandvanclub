import Link from "next/link";
import { ShieldCheck, ArrowUpRight, Zap, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Driver Introduction Pricing | Man and Van Club",
  description: "Transparent pay-per-introduction pricing for movers in England. No monthly contracts. Pay only for the customers you choose to unlock.",
};

export default function PricingPage() {
  const fees = [
    { type: "Small / single item", fee: "From £2.99" },
    { type: "1-bed flat/house", fee: "From £5.99" },
    { type: "2–3 bed house", fee: "From £17.99" },
    { type: "Large / long distance", fee: "From £35.99" },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.manandvanclub.co.uk"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Pricing",
        "item": "https://www.manandvanclub.co.uk/pricing"
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="bg-[#F9F9F7] py-32 border-b border-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute inset-0 grid grid-cols-6 gap-4">
              {[...Array(24)].map((_, i) => <div key={i} className="border border-primary/20 h-32 w-full" />)}
           </div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-6xl md:text-8xl font-black text-primary uppercase tracking-tighter leading-[0.9]">
              Driver <span className="text-accent">Introduction</span> Pricing
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
              No monthly fees. No bidding wars. Pay only per verified customer introduction you choose to accept.
            </p>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <h2 className="text-4xl font-black text-primary uppercase tracking-tight">How It Works</h2>
              <div className="space-y-8">
                {[
                  { t: "Apply and get verified", d: "Join our network of professional movers for free. We vet every driver to maintain quality." },
                  { t: "Live move requests", d: "View active requests in your chosen coverage area directly from your dashboard." },
                  { t: "Choose what to unlock", d: "You only pay for the jobs you want. No forced assignments or monthly contracts." },
                  { t: "Exclusive details", d: "Once unlocked, the customer's details are yours exclusively. No other mover can access them." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black shrink-0">{i+1}</div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-primary uppercase tracking-tight">{step.t}</h3>
                      <p className="text-text-secondary text-sm leading-relaxed">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F9F9F7] p-10 md:p-14 rounded-[3rem] border border-border/50 space-y-10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full -mr-16 -mt-16" />
               <h2 className="text-3xl font-black text-primary uppercase tracking-tight">Introduction Fees</h2>
               <div className="space-y-4">
                 {fees.map((f, i) => (
                   <div key={i} className="flex justify-between items-center py-4 border-b border-border/50 last:border-0">
                     <span className="font-bold text-primary uppercase tracking-tight text-sm">{f.type}</span>
                     <span className="font-black text-accent">{f.fee}</span>
                   </div>
                 ))}
               </div>
               <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest leading-relaxed">
                 * Exact pricing is confirmed during onboarding. Fees are competitive and benchmarked against the local moving market.
               </p>
               <div className="pt-6 flex flex-col sm:flex-row gap-4">
                 <Link href="/for-businesses" className="btn-orange flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center">
                    Apply to Join
                 </Link>
                 <Link href="/login" className="bg-primary text-white flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center hover:bg-accent transition-colors">
                    Driver Login
                 </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#F9F9F7] border-t border-border">
        <div className="container mx-auto px-4 text-center space-y-12">
          <div className="inline-flex items-center gap-3 bg-accent/10 text-accent px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-accent/20">
            <ShieldCheck size={16} /> Verified Mover Network
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter">Grow your moving business today</h2>
          <div className="flex flex-wrap justify-center gap-8 text-primary/40 font-black uppercase tracking-widest text-[10px]">
            <span className="flex items-center gap-2"><Zap size={14} className="text-accent"/> No Bidding Wars</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-accent"/> Exclusive Introductions</span>
            <span className="flex items-center gap-2"><ArrowUpRight size={14} className="text-accent"/> High Conversion</span>
          </div>
        </div>
      </section>
    </div>
  );
}
