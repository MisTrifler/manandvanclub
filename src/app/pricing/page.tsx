import Link from "next/link";
import { ArrowUpRight, CheckCircle2, HelpCircle, ShieldCheck, Users, CreditCard, Lock, Banknote } from "lucide-react";
import { Metadata } from "next";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Booking Fee Pricing | Man and Van Club",
  description: "Simple customer-paid booking fee pricing. Movers submit quotes for free and customer details are released only after a customer accepts a quote and pays the booking fee.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/pricing',
  },
};

const FAQ_ITEMS = [
  { q: "Do movers pay to submit quotes?", a: "No. In the main Man and Van Club flow, approved movers submit quotes for free. Customer details are released only when the customer accepts a mover quote and pays the booking fee." },
  { q: "Is the booking fee deducted from the mover quote?", a: "No. In V1 the booking fee is separate from the mover’s quote. The customer pays the mover’s quoted price directly to the mover." },
  { q: "When does the customer pay?", a: "Customers only pay the booking fee after a vetted mover has provided a quote and the customer chooses to accept it." },
  { q: "Are customer details shared with multiple movers?", a: "No. Customer contact details stay protected and are only released to the quoted mover after the booking fee has been paid." },
  { q: "Can customers decline a quote?", a: "Yes. Customers can accept or decline the quote from their secure quote review page." },
];

export default function PricingPage() {
  const bookingFeeTiers = [
    { quote: "Up to £100", fee: "£10" },
    { quote: "£101 – £250", fee: "£15" },
    { quote: "£251 – £500", fee: "£25" },
    { quote: "£501 – £1,000", fee: "£35" },
    { quote: "£1,000+", fee: "£50" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#F9F9F7] py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6">
            <CreditCard size={14} /> Customer-paid booking fee
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-none mb-6">
            Simple Booking Fee Pricing
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Customers submit requests for free. Approved movers submit quotes for free. A booking fee is paid only when the customer accepts a mover quote.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              "Movers submit quotes for free",
              "Customers only pay after seeing a quote",
              "Details released after booking fee is paid",
              "No spam or multiple sales calls",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-white border border-border px-4 py-2 rounded-full text-sm font-bold text-primary/80">
                <CheckCircle2 size={14} className="text-accent" />
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#quote-form" className="btn-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center justify-center gap-2">
              Get Matched <ArrowUpRight size={16} />
            </Link>
            <Link href="/apply-to-join" className="bg-white border border-border px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-50 inline-flex items-center justify-center gap-2">
              Apply as a Mover <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-[#F9F9F7] border border-border rounded-3xl p-6 md:p-8 flex items-start gap-4">
            <HelpCircle size={24} className="text-accent mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-black text-primary uppercase tracking-tight mb-2">How the booking fee works</h2>
              <p className="text-text-secondary leading-relaxed">
                The booking fee confirms your accepted quote and releases your contact details only to this mover. It is separate from the mover’s quote. You pay the mover’s quoted price directly to the mover.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-4">Booking Fee Tiers</h2>
            <p className="text-text-secondary">The fee is calculated from the mover quote and charged only after the customer accepts.</p>
          </div>

          <div className="bg-white border border-border rounded-3xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-2 border-b border-border bg-gray-50 px-8 py-5 text-sm font-black uppercase tracking-widest text-primary/50">
              <div>Mover Quote</div>
              <div className="text-right">Booking Fee</div>
            </div>
            {bookingFeeTiers.map((tier) => (
              <div key={tier.quote} className="grid grid-cols-2 px-8 py-6 border-b border-border last:border-0 hover:bg-gray-50 transition-colors">
                <div className="font-bold text-primary">{tier.quote}</div>
                <div className="text-right font-black text-accent text-xl">{tier.fee}</div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-text-secondary mt-6 font-medium">
            Example: mover quote £140 + booking fee £15 = total customer cost £155. The customer pays £140 directly to the mover.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-3">Why This Model Works</h2>
            <p className="text-text-secondary">Built for customer trust and mover quality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: "Protected Details", d: "Customer contact details are hidden until a quote is accepted and the booking fee is paid.", icon: <Lock size={24} /> },
              { t: "No Weak Paid Leads", d: "Movers submit quotes without paying for enquiries that customers may not accept.", icon: <Users size={24} /> },
              { t: "Customer-Confirmed", d: "The mover receives details only after the customer has shown real intent.", icon: <ShieldCheck size={24} /> },
              { t: "Direct Mover Payment", d: "The remaining move cost is paid directly to the mover after booking.", icon: <Banknote size={24} /> },
            ].map((item) => (
              <div key={item.t} className="bg-[#F9F9F7] p-8 rounded-3xl border border-border flex items-start gap-4 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-black text-primary text-sm uppercase tracking-tight mb-1">{item.t}</h3>
                  <p className="text-text-secondary text-sm">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 max-w-4xl">
          <FAQ title="Booking Fee FAQs" items={FAQ_ITEMS} />
        </div>
      </section>
    </div>
  );
}
