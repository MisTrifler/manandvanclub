import Link from "next/link";
import { ShieldCheck, ArrowUpRight, Zap, CheckCircle2, Gift, ClipboardList, Search, Eye, Lock, Map, TrendingUp, XCircle, Phone, Calendar, MessageCircle, HelpCircle, Star } from "lucide-react";
import { Metadata } from "next";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Driver Pricing | Man and Van Club",
  description: "Simple, transparent lead pricing. Only pay for exclusive leads you choose to unlock. No subscriptions. No contracts. First lead free.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/pricing',
  },
};

const FAQ_ITEMS = [
  { q: "Do I need a subscription?", a: "No. You only pay when choosing to unlock an enquiry. There are no monthly fees, no recurring charges, and no long-term contracts." },
  { q: "Are enquiries shared with multiple movers?", a: "The platform is designed around exclusive enquiry opportunities. Each enquiry is offered to one mover at a time, so you are not competing against multiple companies for the same customer." },
  { q: "Do I have to unlock every enquiry?", a: "No. You decide which enquiries suit your business. You only unlock the ones that match your service area, capacity, and job preferences." },
  { q: "How do I receive enquiries?", a: "Approved movers can view available enquiries through their account dashboard. You will see move details, dates, and locations before choosing to unlock." },
  { q: "Can I choose where I work?", a: "Yes. Coverage areas can be configured within your account. You set your preferred service area and only see enquiries within that radius." },
  { q: "How do I become approved?", a: "Applications are reviewed manually and insurance verification is required. You must provide proof of Goods in Transit Insurance and Public Liability Insurance as part of the onboarding process." },
];

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
            Simple, Transparent Lead Pricing
          </h1>
          
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Only pay when you choose to unlock a customer enquiry. Unlike traditional lead-generation websites, customer enquiries are offered exclusively rather than being shared with multiple movers.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              "No monthly subscriptions",
              "No long-term contracts",
              "Exclusive enquiry opportunities",
              "Pay only for enquiries you choose to unlock",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-white border border-border px-4 py-2 rounded-full text-sm font-bold text-primary/80">
                <CheckCircle2 size={14} className="text-accent" />
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply-to-join" className="btn-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-2">
              Apply Now <ArrowUpRight size={16} />
            </Link>
            <Link href="/why-join" className="bg-white border border-border px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-50 inline-flex items-center gap-2">
              Why Join <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Notice */}
      <section className="py-4 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-[#F9F9F7] border border-border rounded-2xl p-4 flex items-start gap-3">
            <HelpCircle size={18} className="text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Customer Enquiries Are Free</p>
              <p className="text-sm text-text-secondary">This page is intended for mover partners. Customers can submit move requests free of charge with no obligation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* First Lead Free */}
      <section className="py-16 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 bg-accent/10 text-accent px-6 py-3 rounded-2xl mb-6">
            <Gift size={24} />
            <span className="font-black text-lg">Your First Lead is Completely Free</span>
          </div>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Try the platform risk-free and see how our exclusive lead system works before spending a penny.
          </p>
        </div>
      </section>

      {/* Pricing Table */}
      <section id="pricing" className="py-20 bg-[#F9F9F7]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-4">Lead Unlock Fees</h2>
            <p className="text-text-secondary">Pay only when you choose to unlock a lead. No hidden charges.</p>
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

      {/* Why Our Leads Are Different */}
      <section className="py-20 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-3">Why Our Leads Are Different</h2>
            <p className="text-text-secondary">Built exclusively for professional movers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "Exclusive Opportunities", d: "Customer enquiries are offered to one mover at a time.", icon: <Lock size={24} /> },
              { t: "No Competing Movers", d: "Avoid competing against multiple companies for the same customer.", icon: <XCircle size={24} /> },
              { t: "Direct Communication", d: "Contact customers directly once you unlock an enquiry.", icon: <Phone size={24} /> },
              { t: "Choose What You Want", d: "Only unlock enquiries that suit your business.", icon: <Eye size={24} /> },
              { t: "Transparent Pricing", d: "Simple lead fees with no hidden charges.", icon: <CheckCircle2 size={24} /> },
              { t: "Flexible Growth", d: "Increase your workload at your own pace.", icon: <TrendingUp size={24} /> },
            ].map((item, i) => (
              <div key={i} className="bg-[#F9F9F7] p-8 rounded-3xl border border-border flex items-start gap-4 hover:shadow-lg transition-all">
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

      {/* What's Included */}
      <section className="py-16 bg-[#F9F9F7] border-b border-border">
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
                <CheckCircle2 className="text-accent shrink-0" size={20} />
                <span className="font-medium text-primary text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-3">How It Works</h2>
            <p className="text-text-secondary">From customer enquiry to your unlocked lead.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { t: "Customer submits move request", d: "A customer fills in their move details on our platform.", icon: <ClipboardList size={24} /> },
              { t: "We review and match the enquiry", d: "Our team reviews the move and identifies suitable movers.", icon: <Search size={24} /> },
              { t: "Approved movers view enquiries", d: "Log in to see available enquiries in your service area.", icon: <Eye size={24} /> },
              { t: "Choose whether to unlock", d: "Review the details and unlock enquiries that suit you.", icon: <Lock size={24} /> },
              { t: "Contact the customer directly", d: "Get full contact details and arrange the move directly.", icon: <Phone size={24} /> },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
                  {step.icon}
                </div>
                <h3 className="font-black text-primary text-sm uppercase tracking-tight mb-2">Step {i + 1}</h3>
                <p className="font-bold text-primary text-sm mb-1">{step.t}</p>
                <p className="text-text-secondary text-sm leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#F9F9F7] border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-3">Frequently Asked Questions</h2>
            <p className="text-text-secondary">Common questions about pricing and platform access.</p>
          </div>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      {/* Refund Policy */}
      <section className="py-20 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Refunds */}
            <div>
              <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-6">Refund Policy</h3>
              <div className="space-y-3 text-sm text-text-secondary">
                <p className="font-medium text-primary">Refunds available where:</p>
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

      {/* Trust Section */}
      <section className="py-20 bg-[#F9F9F7] border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-4">Built For Professional Movers</h2>
            <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
              We carefully review applications before granting access to customer enquiries. Applicants must provide proof of Goods in Transit Insurance and Public Liability Insurance as part of the onboarding process. Only approved businesses receive platform access.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { t: "Manual Application Review", d: "Every application is checked by our team.", icon: <ShieldCheck size={24} /> },
              { t: "Insurance Verification", d: "Proof of insurance is required before approval.", icon: <CheckCircle2 size={24} /> },
              { t: "Professional Standards", d: "We maintain high expectations for all movers.", icon: <Star size={24} /> },
              { t: "Secure Platform Access", d: "Your account and data are handled securely.", icon: <Lock size={24} /> },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-border text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-black text-primary text-sm uppercase tracking-tight mb-1">{item.t}</h3>
                <p className="text-text-secondary text-sm">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white text-center border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 text-primary">
            Ready to Join Man and Van Club?
          </h2>
          <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-lg mx-auto leading-relaxed">
            Apply today and start accessing exclusive customer enquiry opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply-to-join" className="btn-orange px-14 py-6 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center gap-3 shadow-2xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
              Apply Now <ArrowUpRight size={20} />
            </Link>
            <Link href="/why-join" className="bg-white border-2 border-primary text-primary px-14 py-6 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center gap-3 hover:bg-primary hover:text-white transition-all">
              Why Join <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
