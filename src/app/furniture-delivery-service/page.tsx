import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ShieldCheck, CheckCircle2, ArrowUpRight, Truck, PoundSterling, Package, Sofa, ShoppingBag } from "lucide-react";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Furniture Delivery | From £19/hr | Man and Van Club",
  description:
    "Furniture delivery across the UK from £19/hr. IKEA, Facebook Marketplace, eBay, Argos, B&Q collections. One verified mover. Sofa, bed, wardrobe, fridge delivery. Call 0121 751 1269.",
  alternates: {
    canonical: `${siteUrl}/furniture-delivery-service`,
  },
  openGraph: {
    title: "Furniture Delivery | From £19/hr | Man and Van Club",
    description: "Furniture delivery from £19/hr. IKEA, Facebook Marketplace, eBay collections. One verified mover. Call 0121 751 1269.",
    url: `${siteUrl}/furniture-delivery-service`,
    images: [{ url: `${siteUrl}/api/og?title=${encodeURIComponent("Furniture Delivery")}&subtitle=${encodeURIComponent("From £19/hr — IKEA, Marketplace, eBay")}`, width: 1200, height: 630, alt: "Furniture Delivery | From £19/hr" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Furniture Delivery | From £19/hr | Man and Van Club",
    description: "Furniture delivery from £19/hr. IKEA, Facebook Marketplace, eBay collections. Call 0121 751 1269.",
    images: [`${siteUrl}/api/og?title=${encodeURIComponent("Furniture Delivery")}&subtitle=${encodeURIComponent("From £19/hr — IKEA, Marketplace, eBay")}`],
  },
};

const faqItems = [
  {
    q: "How much does furniture delivery cost?",
    a: "Furniture delivery with a man and van starts from £19/hr for self-loading. For a single item like a sofa or wardrobe, the total is often between £19 and £50 depending on distance. With driver help at £34/hr, the driver carries the item to your room of choice. There are no extra charges for fuel or insurance within the local area.",
  },
  {
    q: "Can you collect furniture from IKEA, B&Q or Argos?",
    a: "Yes. Many customers use a man and van to collect flat-pack furniture, mattresses and larger items from IKEA, B&Q, Argos, Homebase, Homesense and other retailers. Submit the store postcode, your home postcode and the item details. The mover can usually collect the same day or next day.",
  },
  {
    q: "Can you deliver furniture I bought on Facebook Marketplace or eBay?",
    a: "Absolutely. This is one of the most common requests. You buy a sofa, bed, wardrobe or table from Facebook Marketplace, Gumtree, eBay or Shpock — and you need someone with a van to collect it. Submit the seller's postcode, your postcode and a description of the item. The mover handles the rest.",
  },
  {
    q: "Will the driver help carry the furniture upstairs?",
    a: "Yes, with the driver-helps service at £34/hr. The driver will carry your furniture up stairs, through narrow hallways, and into the room where you want it. Add details about stairs, lifts, tight corners or dismantling needs in your request so the mover comes prepared with the right tools and extra hands if needed.",
  },
  {
    q: "What size furniture can you deliver?",
    a: "A standard Transit van fits most single items: sofas, mattresses, wardrobes, dining tables, fridge freezers, bookshelves and beds. For very large items like American-style fridge freezers or 3-seater corner sofas, the mover will bring a larger van. Include item dimensions in your request so the right van is sent.",
  },
  {
    q: "Is my furniture insured during delivery?",
    a: "Yes. Every mover on the platform carries Goods in Transit insurance, which covers your items while they are in the van. Add details about valuable or fragile items so the mover can take extra care with wrapping and securing them with blankets and straps.",
  },
  {
    q: "Can I get same-day furniture delivery?",
    a: "Same-day collection and delivery may be possible depending on mover availability. Submit your request with today's date and the mover will confirm if they can do it. Marketplace purchases are often collected the same day you agree to buy — just submit the request as soon as the seller confirms.",
  },
  {
    q: "Do I need to be at both addresses?",
    a: "You or someone on your behalf needs to be at the collection address to hand over the item and at the delivery address to receive it. If you bought something on Marketplace, you can ask the seller to hand it to the driver. Include any access codes or parking notes in your request.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Furniture Delivery Service",
  url: `${siteUrl}/furniture-delivery-service`,
  provider: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: siteUrl,
    email: "support@manandvanclub.co.uk",
    telephone: "+44-121-751-1269",
    logo: `${siteUrl}/icon.png`,
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  serviceType: ["Furniture delivery", "Furniture collection", "IKEA delivery", "Marketplace delivery", "Sofa delivery", "Bed delivery", "Wardrobe delivery"],
  description: "Furniture delivery across the UK from £19/hr. IKEA, Facebook Marketplace, eBay, Argos collections. One verified mover. Call 0121 751 1269.",
  offers: [
    { "@type": "Offer", name: "Self-loading furniture delivery", price: "19", priceCurrency: "GBP", priceUnit: "hour" },
    { "@type": "Offer", name: "Driver-helps furniture delivery", price: "34", priceCurrency: "GBP", priceUnit: "hour" },
  ],
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
    { "@type": "ListItem", position: 2, name: "Furniture Delivery", item: `${siteUrl}/furniture-delivery-service` },
  ],
};

const popularItems = [
  { name: "Sofa", icon: "🛋️", detail: "2-seater, 3-seater, corner sofa, sofa bed" },
  { name: "Bed & Mattress", icon: "🛏️", detail: "Single, double, king, super king" },
  { name: "Wardrobe", icon: "👔", detail: "Single, double, sliding door, fitted" },
  { name: "Fridge Freezer", icon: "🧊", detail: "Under-counter, tall, American-style" },
  { name: "Dining Table", icon: "🍽️", detail: "Round, rectangular, extending" },
  { name: "Washing Machine", icon: "🫧", detail: "Integrated, freestanding" },
  { name: "Bookshelf", icon: "📚", detail: "Billy, Hemnes, custom units" },
  { name: "Desk", icon: "💻", detail: "Office desk, standing desk, corner desk" },
];

const collectionSources = [
  { name: "Facebook Marketplace", detail: "Sofas, beds, wardrobes — the most common source for second-hand furniture collections" },
  { name: "IKEA", detail: "Flat-pack and larger items. Most IKEA stores have loading bays for van collection" },
  { name: "eBay & Gumtree", detail: "Local collection for furniture purchased online. The seller hands items to the driver" },
  { name: "Argos & B&Q", detail: "Larger items that do not fit in your car. Click-and-collect, then a van picks up" },
  { name: "Charity shops", detail: "British Heart Foundation, Emmaus, local charity shops often deliver but a man and van is usually cheaper" },
  { name: "Next, M&S, John Lewis", detail: "Retailer delivery can cost £30–£50+. A man and van from £19/hr is often less" },
];

export default function FurnitureDeliveryPage() {
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="py-16 lg:py-24 bg-[#F9F9F7] border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="space-y-5">
                <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Furniture delivery</span>
                <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9]">Furniture <span className="text-accent italic">Delivery</span></h1>
                <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-xl">Bought a sofa on Marketplace? Need IKEA collection? A wardrobe that will not fit in your car? One verified mover collects and delivers from £19/hr.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><PoundSterling size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">From</span><span className="text-2xl font-black text-primary">£19<span className="text-sm font-bold text-text-secondary">/hr</span></span></div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><ShoppingBag size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Collection</span><span className="text-sm font-black text-primary">IKEA, Marketplace, eBay</span></div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><ShieldCheck size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Covered</span><span className="text-sm font-black text-primary">Goods in Transit insurance</span></div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Book Furniture Delivery <ArrowUpRight size={18} /></Link>
                <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all"><Phone size={16} /> Call 0121 751 1269</a>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] border border-border p-6 lg:p-8 space-y-5 shadow-sm">
              <h3 className="text-xl font-black uppercase tracking-tight text-primary">Popular furniture we deliver</h3>
              <div className="grid grid-cols-2 gap-3">
                {popularItems.map((item) => (
                  <div key={item.name} className="bg-[#F9F9F7] rounded-xl border border-border p-4 space-y-1">
                    <div className="text-2xl">{item.icon}</div>
                    <span className="text-sm font-black text-primary">{item.name}</span>
                    <span className="text-xs text-text-secondary block">{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection sources */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Where from?</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">We collect from anywhere</h2>
            <p className="text-text-secondary font-medium">Shop, seller's house, store, charity shop — give the mover the postcode and they collect.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collectionSources.map((source) => (
              <div key={source.name} className="bg-[#F9F9F7] rounded-[2rem] border border-border p-8 space-y-3">
                <h3 className="text-lg font-black uppercase tracking-tight text-primary">{source.name}</h3>
                <p className="text-sm text-text-secondary font-medium leading-relaxed">{source.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-24 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">Pricing</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Furniture delivery prices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-[2rem] border border-border p-8 space-y-5">
              <div className="flex items-center gap-3"><Package size={24} className="text-accent" /><h3 className="text-xl font-black uppercase tracking-tight text-primary">Self-loading</h3></div>
              <div><span className="text-4xl font-black text-primary">£19</span><span className="text-lg font-bold text-text-secondary">/hr</span></div>
              <p className="text-sm text-text-secondary font-medium">You or the seller loads the item into the van. The driver transports and you unload at the other end. Best for items you can carry yourself.</p>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Single sofa: from £19</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Mattress + bed frame: from £25</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> IKEA flat-pack run: from £30</li>
              </ul>
            </div>
            <div className="bg-primary rounded-[2rem] p-8 space-y-5">
              <div className="flex items-center gap-3"><Sofa size={24} className="text-accent" /><h3 className="text-xl font-black uppercase tracking-tight text-white">Driver helps</h3></div>
              <div><span className="text-4xl font-black text-accent">£34</span><span className="text-lg font-bold text-white/70">/hr</span></div>
              <p className="text-white/80 text-sm font-medium">The driver carries the furniture from the seller's house to the van, then from the van into your home. Up stairs, around corners — they handle it.</p>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Sofa delivered to room: from £34</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Wardrobe + stairs handled</li>
                <li className="flex gap-2"><CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" /> Dismantling if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Popular areas */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Furniture delivery near you</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: "Birmingham", slug: "man-and-van-birmingham" },
              { name: "Walsall", slug: "man-and-van-walsall" },
              { name: "London", slug: "man-and-van-london" },
              { name: "Manchester", slug: "man-and-van-manchester" },
              { name: "Leeds", slug: "man-and-van-leeds" },
              { name: "Bristol", slug: "man-and-van-bristol" },
              { name: "Sheffield", slug: "man-and-van-sheffield" },
              { name: "Liverpool", slug: "man-and-van-liverpool" },
              { name: "Edinburgh", slug: "man-and-van-edinburgh" },
              { name: "Glasgow", slug: "man-and-van-glasgow" },
              { name: "Cardiff", slug: "man-and-van-cardiff" },
              { name: "Belfast", slug: "man-and-van-belfast" },
            ].map((area) => (
              <Link key={area.slug} href={`/${area.slug}`} className="bg-[#F9F9F7] rounded-xl border border-border p-4 text-center text-sm font-bold text-primary hover:border-accent hover:text-accent transition-all">
                {area.name}
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/areas-covered" className="text-sm font-bold text-accent hover:underline">View all 370 areas →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-[#F9F9F7] border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Furniture delivery questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, i) => (
              <details key={i} className="bg-white rounded-2xl border border-border p-6 group">
                <summary className="cursor-pointer font-bold text-primary text-sm leading-relaxed flex items-center justify-between gap-4">{item.q}<span className="flex-shrink-0 text-accent text-xl font-black group-open:rotate-45 transition-transform">+</span></summary>
                <p className="mt-4 text-sm text-text-secondary font-medium leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Need furniture delivered?</h2>
          <p className="text-lg text-text-secondary font-medium max-w-xl mx-auto">Submit the collection postcode, your postcode and item details. A verified mover quotes from £19/hr.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Book Furniture Delivery <ArrowUpRight size={18} /></Link>
            <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all"><Phone size={16} /> Call 0121 751 1269</a>
          </div>
        </div>
      </section>
    </main>
  );
}
