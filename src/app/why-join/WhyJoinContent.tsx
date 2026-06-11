"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ClipboardList,
  Search,
  BadgeCheck,
  Zap,
  ArrowUpRight,
  ArrowRight,
  Shield,
  TrendingUp,
  Phone,
  Wallet,
  ClipboardCheck,
  MapPin,
  Truck,
  Package,
  Calendar,
  PoundSterling,
  Lock,
  Eye,
  HelpCircle,
  Star,
  Clock,
  CheckCircle,
  UserCheck,
  PhoneOff,
  FileCheck,
  Landmark,
  Bus,
  GraduationCap,
  Sofa,
  Building2,
  Home,
  Route,
  Clock3,
} from "lucide-react";
import FAQ from "@/components/FAQ";

const FAQ_ITEMS = [
  { q: "Do I need a subscription?", a: "No. Approved movers submit quotes for free. Customer details are released only when the customer accepts a quote and pays the booking deposit, which is deducted from your quote." },
  { q: "How do enquiries work?", a: "When a customer submits a move request, we review and match it to a suitable mover in the area. Approved movers can view the enquiry details and choose whether to quote for it. Each enquiry is offered to one mover at a time." },
  { q: "Are enquiries shared with multiple movers?", a: "No. The platform is designed around one customer-confirmed quote at a time, so customers are not spammed by multiple companies." },
  { q: "How do I get approved?", a: "Applications are reviewed manually. You must provide valid Goods in Transit and Public Liability insurance before your application can be approved. Verification usually takes less than 24 hours." },
  { q: "Can I choose my coverage area?", a: "Yes. You can set your preferred service area within your account. You will only see enquiries that match your location and job type preferences." },
  { q: "How quickly are applications reviewed?", a: "Most applications are reviewed within 24 hours. Once approved, you can immediately start viewing available enquiries in your service area." },
];

const COMPARISON_ROWS = [
  { left: "Shared Customers", right: "Customer-Confirmed Opportunities" },
  { left: "Multiple Competitors", right: "Reduced Competition" },
  { left: "Price Wars", right: "Direct Customer Contact" },
  { left: "Unclear Costs", right: "Transparent Deposits" },
  { left: "Complex Process", right: "Simple Process" },
];

const BENEFIT_CARDS = [
  { t: "Customer-Confirmed Opportunities", d: "Customer enquiries are offered through a one-mover process. Customers are not spammed by multiple companies.", icon: <Lock size={24} /> },
  { t: "Direct Customer Contact", d: "Customer details are released after the customer accepts your quote and pays the booking deposit, which is deducted from your quote.", icon: <Phone size={24} /> },
  { t: "Transparent Pricing", d: "Approved movers submit quotes for free. Customer details are released only after customer acceptance.", icon: <Wallet size={24} /> },
  { t: "Flexible Growth", d: "Choose which enquiries to quote for. Set your coverage area and grow at your own pace.", icon: <TrendingUp size={24} /> },
  { t: "No Monthly Subscription", d: "No subscriptions, no minimum commitments, and no payment to submit quotes in the main marketplace flow.", icon: <Zap size={24} /> },
  { t: "Simple Application Process", d: "Apply online and provide your insurance documents. Insurance is required before approval, which usually takes less than 24 hours.", icon: <ClipboardCheck size={24} /> },
];

const HOW_IT_WORKS_STEPS = [
  { t: "Apply to Join", d: "Submit your business details and insurance information for review. You must provide valid Goods in Transit and Public Liability insurance before your application can be approved.", icon: <ClipboardList size={24} /> },
  { t: "View Anonymised Move Requests", d: "Approved movers can view local move requests without seeing the customer’s contact details.", icon: <Eye size={24} /> },
  { t: "Submit Your Total Quote", d: "Enter the total price you want the customer to see. The booking deposit is deducted from your quote.", icon: <BadgeCheck size={24} /> },
  { t: "Customer Accepts or Declines", d: "The customer receives a secure quote review link and chooses whether to proceed.", icon: <ShieldCheck size={24} /> },
  { t: "Receive Customer Details After Deposit Payment", d: "If the customer accepts and pays the booking deposit, their details are released to you.", icon: <Phone size={24} /> },
  { t: "Collect the Remaining Balance", d: "You collect the remaining balance directly from the customer on moving day, unless another payment method is agreed.", icon: <Wallet size={24} /> },
];

const COVERAGE_LOCATIONS = [
  { name: "Birmingham", href: "/man-and-van-birmingham" },
  { name: "Manchester", href: "/man-and-van-manchester" },
  { name: "Leeds", href: "/man-and-van-leeds" },
  { name: "Liverpool", href: "/man-and-van-liverpool" },
  { name: "Bristol", href: "/man-and-van-bristol" },
  { name: "Coventry", href: "/man-and-van-coventry" },
  { name: "Wolverhampton", href: "/man-and-van-wolverhampton" },
  { name: "Walsall", href: "/man-and-van-walsall" },
  { name: "Nottingham", href: "/man-and-van-nottingham" },
  { name: "Leicester", href: "" },
];

const VERIFICATION_CHECKS = [
  "Business Verification",
  "Contact Verification",
  "Goods in Transit Insurance",
  "Public Liability Insurance",
  "Manual Review Process",
];

const SAMPLE_ENQUIRIES = [
  {
    type: "House Move",
    location: "Birmingham",
    property: "2 Bedroom Property",
    date: "Flexible",
    fee: "£25",
    icon: <Home size={20} />,
  },
  {
    type: "Furniture Collection",
    location: "Wolverhampton",
    property: "Single Item",
    date: "This Week",
    fee: "£10",
    icon: <Sofa size={20} />,
  },
];

export default function WhyJoinContent() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] },
    }),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="flex flex-col w-full selection:bg-accent selection:text-white bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ── */}
      <section className="relative bg-white py-20 lg:py-28 border-b border-border">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <div className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                Mover Network
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] text-primary">
                Get Customer-Confirmed Move Requests Without Spammy Competition
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Many lead platforms send customer details to multiple businesses. We take a different approach: customer details stay protected and are released only after a customer accepts a mover quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/apply-to-join"
                  className="btn-orange inline-flex items-center gap-3 px-14 py-6 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Apply to Join <ArrowUpRight size={20} />
                </Link>
                <Link
                  href="/pricing"
                  className="bg-white border-2 border-primary text-primary px-14 py-6 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center gap-3 hover:bg-primary hover:text-white transition-all"
                >
                  View Pricing <ArrowUpRight size={20} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Benefits Section ── */}
      <section className="py-20 bg-[#F9F9F7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Why Movers Join Man and Van Club</h2>
            <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
              Designed for professional movers who want quality customer enquiries without competing against multiple companies.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFIT_CARDS.map((item, i) => (
              <motion.div
                key={item.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border border-border flex items-start gap-4 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-black text-primary text-sm uppercase tracking-tight mb-1">{item.t}</h3>
                  <p className="text-text-secondary text-sm">{item.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Section ── */}
      <section className="py-20 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Why We're Different</h2>
            <p className="text-text-secondary mt-3">See how we compare to traditional lead-selling platforms.</p>
          </div>
          <div className="max-w-5xl mx-auto bg-[#F9F9F7] rounded-[2.5rem] border border-border p-6 md:p-10">
            {/* Header row */}
            <div className="grid grid-cols-2 gap-4 md:gap-8 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                  <XCircle size={20} />
                </div>
                <h3 className="text-lg font-black text-primary uppercase tracking-tight">Traditional Customer Sites</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="text-lg font-black text-primary uppercase tracking-tight">Man and Van Club</h3>
              </div>
            </div>
            {/* Comparison rows */}
            <div className="divide-y divide-border">
              {COMPARISON_ROWS.map((row, i) => (
                <div key={i} className="grid grid-cols-2 gap-4 md:gap-8 py-6">
                  <div className="flex items-center gap-3">
                    <XCircle size={18} className="text-red-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-primary/70">{row.left}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-accent flex-shrink-0" />
                    <span className="text-sm font-bold text-primary">{row.right}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 bg-[#F9F9F7] border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">How It Works For Movers</h2>
            <p className="text-text-secondary mt-3">Submit total quotes for free. Customer details are released only after a customer secures the booking with a deposit.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border border-border text-center space-y-5 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  {step.icon}
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Step {i + 1}</span>
                  <h3 className="font-black text-primary text-sm uppercase tracking-tight">{step.t}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.d}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="max-w-md mx-auto mt-12 bg-white border border-border rounded-3xl p-8">
            <h3 className="font-black text-primary text-sm uppercase tracking-tight mb-4 text-center">Example</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-text-secondary">Your total quote</span><strong className="text-primary">£300</strong></div>
              <div className="flex justify-between text-sm"><span className="text-text-secondary">Customer deposit</span><strong className="text-primary">£25</strong></div>
              <div className="flex justify-between text-sm border-t border-dashed border-border pt-3"><span className="font-bold text-primary">Customer pays you on moving day</span><strong className="text-accent text-lg">£275</strong></div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/apply-to-join" className="btn-orange px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-2">
              Apply To Join <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Coverage Section ── */}
      <section className="py-20 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Growing Across England</h2>
            <p className="text-text-secondary mt-3 max-w-2xl mx-auto">
              We are actively expanding our network of approved movers across England. New areas are added regularly as demand grows.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {COVERAGE_LOCATIONS.map((loc) => (
              loc.href ? (
                <Link
                  key={loc.name}
                  href={loc.href}
                  className="group flex items-center justify-between bg-[#F9F9F7] p-5 rounded-2xl border border-border/50 hover:border-accent hover:shadow-md transition-all"
                >
                  <span className="flex items-center gap-2">
                    <MapPin size={14} className="text-primary/30 group-hover:text-accent transition-colors" />
                    <span className="font-black text-primary uppercase text-[10px] tracking-widest group-hover:text-accent transition-colors">{loc.name}</span>
                  </span>
                  <ArrowUpRight size={14} className="text-primary/30 group-hover:text-accent transition-colors" />
                </Link>
              ) : (
                <div key={loc.name} className="flex items-center justify-between bg-[#F9F9F7] p-5 rounded-2xl border border-border/50">
                  <span className="flex items-center gap-2">
                    <MapPin size={14} className="text-primary/30" />
                    <span className="font-black text-primary uppercase text-[10px] tracking-widest">{loc.name}</span>
                  </span>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ── Customer Example Section ── */}
      <section className="py-20 bg-[#F9F9F7] border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Sample Enquiries</h2>
            <p className="text-text-secondary mt-3">Examples of the type of customer enquiries available on the platform.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {SAMPLE_ENQUIRIES.map((enquiry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border border-border space-y-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                    {enquiry.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-primary text-sm uppercase tracking-tight">{enquiry.type}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">{enquiry.location}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-xs font-medium text-text-secondary">Property</span>
                    <span className="text-xs font-black text-primary uppercase">{enquiry.property}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-xs font-medium text-text-secondary">Moving Date</span>
                    <span className="text-xs font-black text-primary uppercase">{enquiry.date}</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-xs font-medium text-text-secondary">Booking Deposit</span>
                    <span className="text-lg font-black text-accent">{enquiry.fee}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-text-secondary mt-8 font-medium max-w-xl mx-auto">
            <span className="font-black text-primary">Sample Enquiries</span> — for illustration purposes only. Actual enquiries vary based on location, move size, and customer requirements.
          </p>
        </div>
      </section>

      {/* ── Verified Network / Trust Section ── */}
      <section className="py-20 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-4">Verified Network</h2>
            <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Applications are reviewed before movers receive access to customer enquiries. We verify businesses to help maintain a reliable network.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VERIFICATION_CHECKS.map((check, i) => (
              <div key={i} className="flex items-center gap-4 bg-[#F9F9F7] p-6 rounded-2xl border border-border/50">
                <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                <span className="font-bold text-primary text-sm">{check}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#F9F9F7] border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-3">Frequently Asked Questions</h2>
            <p className="text-text-secondary">Common questions about joining the platform.</p>
          </div>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      {/* ── Strong CTA ── */}
      <section className="py-20 bg-white text-center border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-primary uppercase">
              Ready to Join?
            </h2>
            <p className="text-xl text-text-secondary font-medium leading-relaxed max-w-xl mx-auto">
              Apply today and start accessing customer enquiry opportunities. No subscription, no monthly fees — just quality move requests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply-to-join"
                className="btn-orange inline-flex items-center gap-3 px-14 py-6 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all"
              >
                Apply to Join <ArrowRight size={20} />
              </Link>
              <Link
                href="/pricing"
                className="bg-white border-2 border-primary text-primary px-14 py-6 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center gap-3 hover:bg-primary hover:text-white transition-all"
              >
                View Pricing <ArrowUpRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
