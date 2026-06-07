import Link from "next/link";
import { ShieldCheck, ArrowUpRight, Zap, CheckCircle2, Gift } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Driver Pricing | Man and Van Club",
  description: "Only pay for exclusive leads you choose to unlock. No subscriptions. First lead free.",
};

export default function PricingPage() {
  const pricingTiers = [
    { value: "£50 – £100", fee: "£4.99" },
    { value: "£101 – £200", fee: "£9.99" },
    { value: "£201 – £300", fee: "£14.99" },
    { value: "£301 – £500", fee: "£24.99" },
    { value: "£501 – £800", fee: "£39.99" },
    { value: "£801+", fee: "£69.99" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#F9F9F7] py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6">
            <Gift size={14} /> Launch Offer
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-none mb-6">
            Only Pay for Exclusive Leads<br />You Choose to Unlock
          </h1>
          
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            No subscriptions. No contracts. No bidding wars.<br />
            Every lead is offered to one mover only.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply-to-join" className="btn-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm">
              Get Your First Lead Free
            </Link>
            <Link href="#pricing" className="bg-white border border-border px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-50">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* First Lead Free */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 bg-success/10 text-success px-6 py-3 rounded-2xl mb-6">
            <Gift size={24} />
            <span className="font-black text-lg">Your First Lead is Completely Free</span>
          </div>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Try the platform risk-free and see how our exclusive lead system works before spending a penny.
          </p>
        </div>
      </section>

      {/* Pricing Table */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-4">Simple, Transparent Pricing</h2>
            <p className="text-text-secondary">Pay only when you choose to unlock a lead.</p>
          </div>

          <div className="bg-white border border-border rounded-3xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-2 border-b border-border bg-gray-50 px-8 py-5 text-sm font-black uppercase tracking-widest text-primary/50">
              <div>Job Value</div>
              <div className="text-right">Unlock Fee</div>
            </div>
            
            {pricingTiers.map((tier, index) => (
              <div key={index} className="grid grid-cols-2 px-8 py-6 border-b border-border last:border-0 hover:bg-gray-50 transition-colors">
                <div className="font-bold text-primary">{tier.value}</div>
                <div className="text-right font-black text-accent text-xl">{tier.fee}</div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-text-secondary mt-6 font-medium">
            On a £1,000 move, you keep over 93% of the job value.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h3 className="text-2xl font-black text-primary uppercase tracking-tight mb-8 text-center">What's Included When You Unlock</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              "Exclusive customer lead",
              "Customer name, phone & email",
              "Collection & delivery details",
              "Move date and job information",
              "No competing movers",
              "Instant lead delivery"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-5 rounded-2xl border border-border">
                <CheckCircle2 className="text-success shrink-0" size={20} />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refund Policy */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Refunds */}
            <div>
              <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-6">Refund Policy</h3>
              <div className="space-y-3 text-sm text-text-secondary">
                <p className="font-medium">Refunds available where:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Customer contact details are invalid</li>
                  <li>Duplicate lead supplied</li>
                  <li>Technical charging error</li>
                </ul>
                <p className="text-xs mt-4">Refund requests must be submitted within 48 hours with evidence.</p>
              </div>
            </div>

            {/* No Refunds */}
            <div>
              <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-6">No Refunds For</h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {[
                  "Customer does not answer",
                  "Customer declines a quote",
                  "Customer books another mover",
                  "Customer cancels the move",
                  "Mover chooses not to quote",
                  "Mover cannot secure the booking"
                ].map((item, i) => (
                  <div key={i} className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-8">
            Why Movers Choose Us
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-12">No monthly fees.<br />No long-term contracts.<br />Just quality leads.</h2>

          <Link href="/apply-to-join" className="btn-orange px-14 py-6 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3">
            Get Your First Lead Free <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
