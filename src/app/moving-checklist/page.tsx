import type { Metadata } from "next";
import Link from "next/link";
import { Phone, CheckCircle2, ArrowUpRight, ClipboardCheck, Calendar, Box, Truck, Home, FileText, Users } from "lucide-react";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Moving Checklist UK 2026 | Step-by-Step Moving Day Guide | Man and Van Club",
  description:
    "Free UK moving checklist for 2026. Week-by-week guide: what to do 8 weeks before, 4 weeks before, 1 week before, and on moving day. Download and print. From Man and Van Club — from £19/hr. Call 0121 751 1269.",
  alternates: {
    canonical: `${siteUrl}/moving-checklist`,
  },
  openGraph: {
    title: "Moving Checklist UK 2026 | Free Step-by-Step Guide",
    description: "Free UK moving checklist. Week-by-week guide from 8 weeks out to moving day. Print it off and tick it off. From Man and Van Club.",
    url: `${siteUrl}/moving-checklist`,
    images: [{ url: `${siteUrl}/api/og?title=${encodeURIComponent("Moving Checklist UK 2026")}&subtitle=${encodeURIComponent("Free Step-by-Step Guide")}`, width: 1200, height: 630, alt: "Moving Checklist UK 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moving Checklist UK 2026 | Free Step-by-Step Guide",
    description: "Free UK moving checklist. Week-by-week from 8 weeks out to moving day.",
    images: [`${siteUrl}/api/og?title=${encodeURIComponent("Moving Checklist UK 2026")}&subtitle=${encodeURIComponent("Free Step-by-Step Guide")}`],
  },
};

const faqItems = [
  {
    q: "How far in advance should I start planning my move?",
    a: "Start planning 8 weeks before your moving date if possible. This gives you time to compare quotes, declutter, arrange packing and book a man and van. If you are moving at the end of a tenancy or on a completion day, book your mover at least 2 weeks ahead — those dates fill up fast.",
  },
  {
    q: "What should I do the night before moving?",
    a: "Pack a survival bag with essentials: phone charger, toiletries, change of clothes, kettle, tea bags, milk, snacks, bin bags, cleaning cloths, important documents and keys. Defrost the fridge. Take final meter readings. Check every room, cupboard and loft space is empty.",
  },
  {
    q: "Do I need to empty drawers for the movers?",
    a: "It depends. If the furniture is heavy (like a solid oak chest of drawers), empty it — a mover cannot safely carry a loaded drawer unit down stairs. If it is lightweight (IKEA Malm, for example), you can usually leave clothes in the drawers but remove anything breakable or valuable. Ask your mover when they confirm the booking.",
  },
  {
    q: "What should I tell the mover before moving day?",
    a: "Your full collection and delivery postcodes, the item list, any stairs or lifts at either address, parking restrictions, whether furniture needs dismantling, and your preferred time. The more detail you provide upfront, the more accurate the quote and the smoother the move.",
  },
  {
    q: "What is the cheapest way to move home in the UK?",
    a: "The cheapest way is a self-loading man and van from £19/hr. You pack, load and unload — the driver transports. For a studio or 1-bed flat, this can cost as little as £60–£150. If you need help lifting, the driver-helps service at £34/hr is still significantly cheaper than a full removal company.",
  },
  {
    q: "Should I move on a Friday or a weekday?",
    a: "Fridays are the most popular day to move — which means movers are busiest and rates can be higher. Tuesday and Wednesday are typically the cheapest and most available days. If you can be flexible, midweek moves save money and stress.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Moving Checklist UK 2026",
  url: `${siteUrl}/moving-checklist`,
  provider: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: siteUrl,
    email: "support@manandvanclub.co.uk",
    telephone: "+44-121-751-1269",
    logo: `${siteUrl}/icon.png`,
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  serviceType: ["Moving checklist", "House moving guide", "Removals planning", "Moving day preparation"],
  description: "Free UK moving checklist for 2026. Week-by-week guide from 8 weeks before to moving day. Print it off and tick it off. From Man and Van Club.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Moving Checklist", item: `${siteUrl}/moving-checklist` },
  ],
};

const checklistWeeks = [
  {
    icon: <Calendar size={24} className="text-accent" />,
    title: "8 weeks before",
    items: [
      "Book your man and van — get quotes early for the best rates and availability",
      "Declutter every room — sell, donate or bin anything you do not want to move",
      "Start collecting boxes from supermarkets, friends or buy a packing kit online",
      "Notify your landlord (if renting) and confirm your notice period",
      "Start a moving folder — keep quotes, contracts and receipts in one place",
      "Check your home insurance covers your move day (most standard policies do not)",
    ],
  },
  {
    icon: <Box size={24} className="text-accent" />,
    title: "4 weeks before",
    items: [
      "Pack non-essentials first — books, decorations, seasonal clothes, guest room items",
      "Label every box with the room it is going to at the new address",
      "Arrange parking at both addresses — check permit requirements and loading bays",
      "Notify utility providers (gas, electric, water, broadband) of your move date",
      "Redirect your post with Royal Mail — £30–£40 for 3–12 months",
      "Book time off work for moving day if needed",
      "If you have children, notify their school and arrange the transfer",
    ],
  },
  {
    icon: <ClipboardCheck size={24} className="text-accent" />,
    title: "1 week before",
    items: [
      "Pack everything except daily essentials — clothes, toiletries, phone charger",
      "Dismantle any furniture that needs it — keep screws and bolts in a labelled bag taped to the item",
      "Confirm the booking with your mover — send them postcodes, parking notes and access details",
      "Defrost the freezer at least 24 hours before the move",
      "Take photos of how your electronics are connected — makes reassembly easier",
      "Put all important documents (passport, driving licence, tenancy agreement, bank details) in one folder you carry yourself",
      "Pack a survival bag for the first night: kettle, tea bags, milk, snacks, toilet roll, phone charger, change of clothes, toiletries",
    ],
  },
  {
    icon: <Truck size={24} className="text-accent" />,
    title: "Moving day",
    items: [
      "Take final meter readings (gas, electric, water) — photograph them",
      "Walk through every room, cupboard, loft and shed to check nothing is left",
      "Give the old property a quick clean — especially if you want your deposit back",
      "Lock all windows and doors, return keys to the landlord or estate agent",
      "Meet the mover at the collection address — show them where to park and load",
      "Check each room at the new address before the mover leaves — make sure nothing is damaged",
      "Pay the mover the remaining balance (deposit already deducted)",
      "Unpack the survival bag first — you will want that cup of tea",
    ],
  },
  {
    icon: <Home size={24} className="text-accent" />,
    title: "After the move",
    items: [
      "Update your address on the electoral roll, driving licence and bank accounts",
      "Register with a new GP and dentist if you have moved areas",
      "Set up gas, electric, water and broadband at the new address",
      "Leave a review for your mover — it helps other people find reliable help",
      "Change the locks on external doors — you do not know who has spare keys",
    ],
  },
];

export default function MovingChecklistPage() {
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="py-16 lg:py-24 bg-[#F9F9F7] border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-4xl mx-auto space-y-8">
          <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Free checklist</span>
          <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9]">Moving Checklist <span className="text-accent italic">UK 2026</span></h1>
          <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto">Your week-by-week guide to a stress-free move. From 8 weeks before to moving day — tick it off as you go. Works for flats, houses and student moves across the UK.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Book Your Mover <ArrowUpRight size={18} /></Link>
            <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all"><Phone size={16} /> Call 0121 751 1269</a>
          </div>
        </div>
      </section>

      {/* Checklist by week */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-16">
          {checklistWeeks.map((week, i) => (
            <div key={i} className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">{week.icon}</div>
                <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight">{week.title}</h2>
              </div>
              <ul className="space-y-3">
                {week.items.map((item, j) => (
                  <li key={j} className="flex gap-3 items-start bg-[#F9F9F7] rounded-xl border border-border p-4">
                    <CheckCircle2 size={18} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-secondary font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing reminder */}
      <section className="py-16 lg:py-24 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Book your man and van early</h2>
          <p className="text-text-secondary font-medium">The earlier you book, the better the rate and the more choice you have on dates. End-of-month Fridays sell out first. Submit your move details and get a quote from one verified mover.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="bg-white rounded-2xl border border-border p-6 text-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Self-loading</span>
              <span className="text-3xl font-black text-primary">£19<span className="text-sm font-bold text-text-secondary">/hr</span></span>
            </div>
            <div className="bg-primary rounded-2xl p-6 text-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/70 block">Driver helps</span>
              <span className="text-3xl font-black text-accent">£34<span className="text-sm font-bold text-white/70">/hr</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Moving checklist questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, i) => (
              <details key={i} className="bg-[#F9F9F7] rounded-2xl border border-border p-6 group">
                <summary className="cursor-pointer font-bold text-primary text-sm leading-relaxed flex items-center justify-between gap-4">{item.q}<span className="flex-shrink-0 text-accent text-xl font-black group-open:rotate-45 transition-transform">+</span></summary>
                <p className="mt-4 text-sm text-text-secondary font-medium leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 lg:py-20 bg-[#F9F9F7] border-t border-border">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Ready to move?</h2>
          <p className="text-lg text-text-secondary font-medium max-w-xl mx-auto">Submit your move details for free. One verified mover reviews before quoting. From £19/hr.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Start Free Request <ArrowUpRight size={18} /></Link>
            <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all"><Phone size={16} /> Call 0121 751 1269</a>
          </div>
        </div>
      </section>
    </main>
  );
}
