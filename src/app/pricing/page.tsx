import Link from "next/link";
import { ArrowUpRight, CheckCircle2, HelpCircle, ShieldCheck, Users, CreditCard, Lock, Banknote } from "lucide-react";
import { Metadata } from "next";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Booking Deposit Pricing | Man and Van Club",
  description: "Simple booking deposit pricing. The deposit is deducted from the mover's quote, so the customer's total move cost stays the same.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/pricing',
  },
  openGraph: {
    title: "Booking Deposit Pricing | Man and Van Club",
    description: "Simple booking deposit pricing. The deposit is deducted from the mover's quote, so the customer's total move cost stays the same.",
    url: 'https://www.manandvanclub.co.uk/pricing',
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "Pricing — Man and Van Club" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking Deposit Pricing | Man and Van Club",
    description: "Simple booking deposit pricing. The deposit is deducted from the mover's quote.",
    images: ["/images/og-homepage.jpg"],
  },
};

const FAQ_ITEMS = [
  { q: "Do movers pay to submit quotes?", a: "No. Approved movers submit total quotes for free. Customer details are released only when the customer accepts a mover quote and pays the booking deposit." },
  { q: "What is the booking deposit?", a: "The booking deposit secures your accepted mover quote and releases your details to the mover. It is deducted from the mover's quote, so your total move cost stays the same." },
  { q: "Do I pay the mover separately?", a: "Yes. You pay the remaining balance directly to the mover on moving day." },
  { q: "Will my total cost increase?", a: "No. The mover quote is your total move cost. The booking deposit is deducted from that quote." },
  { q: "Example?", a: "If the mover quotes £300 and the booking deposit is £25, you pay £25 today and £275 to the mover on moving day. Your total move cost is £300." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function PricingPage() {
  const bookingDepositTiers = [
    { quote: "Up to £100", fee: "£10" },
    { quote: "£101 – £250", fee: "£15" },
    { quote: "£251 – £500", fee: "£25" },
    { quote: "£501 – £1,000", fee: "£35" },
    { quote: "£1,000+", fee: "£50" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="bg-[#F9F9F7] py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6">
            <CreditCard size={14} /> Booking deposit pricing
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-none mb-6">
            Simple Booking Deposit Pricing
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Customers submit requests for free. Approved movers submit total quotes for free. The booking deposit is paid only after the customer accepts a mover quote, and it is deducted from that quote.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              "Movers submit total quotes for free",
              "Customers only pay after seeing a quote",
              "Deposit deducted from mover quote",
              "No spam or multiple sales calls",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-white border border-border px-4 py-2 rounded-full text-sm font-bold text-primary/80">
                <CheckCircle2 size={14} className="text-accent" />
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="btn-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center justify-center gap-2">
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
              <h2 className="text-xl font-black text-primary uppercase tracking-tight mb-2">How the booking deposit works</h2>
              <p className="text-text-secondary leading-relaxed">
                The booking deposit secures the accepted mover quote and releases the customer's details only to that mover. It is deducted from the mover's quote, so the customer's total move cost stays the same. The remaining balance is paid directly to the mover on moving day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-4">Booking Deposit Tiers</h2>
            <p className="text-text-secondary">The deposit is calculated from the mover's total quote and paid only after the customer accepts.</p>
          </div>

          <div className="bg-white border border-border rounded-3xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-2 border-b border-border bg-gray-50 px-8 py-5 text-sm font-black uppercase tracking-widest text-primary/50">
              <div>Mover Total Quote</div>
              <div className="text-right">Booking Deposit</div>
            </div>
            {bookingDepositTiers.map((tier) => (
              <div key={tier.quote} className="grid grid-cols-2 px-8 py-6 border-b border-border last:border-0 hover:bg-gray-50 transition-colors">
                <div className="font-bold text-primary">{tier.quote}</div>
                <div className="text-right font-black text-accent text-xl">{tier.fee}</div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-text-secondary mt-6 font-medium">
            Example: mover quote £300, booking deposit £25, pay mover on moving day £275. Customer total: £300.
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
              { t: "Protected Details", d: "Customer contact details are hidden until a quote is accepted and the booking deposit is paid.", icon: <Lock size={24} /> },
              { t: "No Weak Paid Leads", d: "Movers submit quotes without paying for enquiries that customers may not accept.", icon: <Users size={24} /> },
              { t: "Customer-Confirmed", d: "The mover receives details only after the customer has shown real intent.", icon: <ShieldCheck size={24} /> },
              { t: "Balance Paid Directly", d: "The remaining balance is paid directly to the mover on moving day.", icon: <Banknote size={24} /> },
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
          <FAQ title="Booking Deposit FAQs" items={FAQ_ITEMS} />
        </div>
      </section>
    </div>
  );
}
