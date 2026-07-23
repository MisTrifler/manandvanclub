import Link from "next/link";
import FAQ from "@/components/FAQ";
import { Metadata } from "next";
import { ArrowUpRight, CheckCircle2, MapPin, Package, Route, ShieldCheck } from "lucide-react";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Cardiff From £19/hr | Free Quotes",
  description: "Man with a van in Cardiff from £19/hr. One verified mover reviews your details before you book. Rated 5.0/5 from 11 reviews.",
  alternates: { canonical: `${baseUrl}/man-and-van-cardiff` },
  openGraph: {
    title: "Man and Van Cardiff From £19/hr | Free Quotes",
    description: "Man with a van in Cardiff from £19/hr. One verified mover reviews your details before you book. Rated 5.0/5 from 11 reviews.",
    url: `${baseUrl}/man-and-van-cardiff`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Cardiff")}&subtitle=${encodeURIComponent("From £19/hr, Free Quotes")}`, width: 1200, height: 630, alt: "Man and Van Cardiff From £19/hr | Free Quotes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Cardiff From £19/hr | Free Quotes",
    description: "Man with a van in Cardiff from £19/hr. One verified mover reviews your details before you book. Rated 5.0/5 from 11 reviews.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Cardiff")}&subtitle=${encodeURIComponent("From £19/hr, Free Quotes")}`],
  },
};

const faqItems = [
  { q: "How much does a man and van cost in Cardiff?", a: "Cardiff moves typically start from £19 per hour. The final quote depends on the postcodes, distance, item list, helpers required, stairs, parking and access. You can see a guide price first, then a verified mover reviews the details and sends a quote before you decide whether to book." },
  { q: "Will multiple movers contact me?", a: "No. Your details are not sent to lots of companies. A verified mover reviews your anonymised request, and your contact details are only released after you accept a quote and pay the booking deposit." },
  { q: "Is it free to submit a move request?", a: "Yes. It is free to submit your request. You only pay a booking deposit if you accept a mover quote. The booking deposit is deducted from the mover\u2019s quote, and the remaining balance is paid directly to the mover on moving day." },
  { q: "Can I book a same-day man and van in Cardiff?", a: "Same-day moves may be possible depending on mover availability, route and access. Cardiff\u2019s inner ring road, the A48 and the M4 access are factored into the route planning." },
  { q: "Can I use this for single-item furniture collection in Cardiff?", a: "Yes. The Cardiff service can be used for single items, furniture collection, student moves, flat moves, house removals, office moves and local storage runs." },
];

const serviceSchema = { "@context": "https://schema.org", "@type": "Service", name: "Man and Van Cardiff quote request", url: `${baseUrl}/man-and-van-cardiff`, provider: { "@type": "Organization", name: "Man and Van Club", url: baseUrl, email: "support@manandvanclub.co.uk", telephone: "+44-121-751-1269", logo: `${baseUrl}/icon.png` }, areaServed: { "@type": "City", name: "Cardiff", containedInPlace: { "@type": "AdministrativeArea", name: "Wales" }, containsPlace: [{ "@type": "City", name: "Swansea" }, { "@type": "City", name: "Newport" }, { "@type": "City", name: "Barry" }, { "@type": "City", name: "Bridgend" }] }, serviceType: ["Man and van quote request", "House removals", "Flat moves", "Student moves", "Furniture collection", "Same-day man and van"], description: "Free Cardiff man and van request service. Customers can see a guide price, submit details securely and receive a quote from one verified mover before booking." };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: baseUrl }, { "@type": "ListItem", position: 2, name: "Man and Van Cardiff", item: `${baseUrl}/man-and-van-cardiff` }] };

export default function CardiffPage() {
  return (
    <main className="bg-white min-h-screen selection:bg-accent selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav aria-label="Breadcrumb" className="bg-[#F9F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg><span className="text-primary font-bold">Man and Van Cardiff</span></li>
          </ol>
        </div>
      </nav>

      <section className="bg-[#F9F9F7] border-b border-border py-16 lg:py-24 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none grid grid-cols-6 gap-4">{[...Array(30)].map((_, i) => <div key={i} className="border border-primary/20 h-32" />)}</div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.28em] border border-accent/20"><MapPin size={14} /> Wales</div>
                <Link href="/areas-covered" className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/60 hover:text-accent transition-colors">&larr; Back to all areas</Link>
              </div>
              <div className="space-y-5">
                <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter leading-[0.9]">Man and Van <span className="text-accent italic">Cardiff</span></h1>
                <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed max-w-xl">Submit a free Cardiff move request, see a guide price and let one verified mover review your details before you decide whether to book. From £19/hr.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><Package size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">From</span><span className="text-2xl font-black text-primary">£19<span className="text-sm font-bold text-text-secondary">/hr</span></span></div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><CheckCircle2 size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Verified</span><span className="text-sm font-black text-primary">One mover, not a lead blast</span></div>
                <div className="bg-white rounded-2xl border border-border p-5 text-center"><ShieldCheck size={22} className="text-accent mx-auto mb-2" /><span className="text-[9px] font-black uppercase tracking-widest text-primary/50 block">Private</span><span className="text-sm font-black text-primary">Details stay anonymous</span></div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/get-started" className="btn-orange px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3">Start Free Request <ArrowUpRight size={18} /></Link>
                <a href="tel:01217511269" className="bg-white border border-border px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all">Call 0121 751 1269</a>
              </div>
            </div>
            <div className="bg-white rounded-[2rem] border border-border p-6 lg:p-8 space-y-5 shadow-sm">
              <div className="flex items-start gap-3">
                <Route size={22} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-primary">Cardiff moving challenges</h3>
                  <p className="text-sm text-text-secondary font-medium leading-relaxed">Cardiff moves involve the M4 corridor and junction 29–33 congestion, Victorian terraces in areas like Roath and Cathays, student moves around Cardiff University, bay-area flats with parking restrictions, and the A48 northern avenue access. The form captures these details so your mover can plan properly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-primary rounded-[2rem] p-8 lg:p-10 min-h-[260px] flex flex-col justify-center space-y-5 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">M4, bay area and <span className="text-accent">Cathays</span> access</h2>
              <p className="text-white/85 font-medium leading-relaxed text-base lg:text-lg">A move from a Cathays terrace is different to a Cardiff Bay flat, a Llandaff family home or a Penarth property. The form asks for the details a mover needs: postcodes, items, helpers, stairs, lifts, access and date.</p>
            </div>
            <div className="bg-accent rounded-[2rem] p-8 lg:p-10 min-h-[260px] flex flex-col justify-center space-y-5 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-primary leading-tight">One verified mover, not a lead blast</h2>
              <p className="text-white font-medium leading-relaxed text-base lg:text-lg">Your enquiry is not sold to lots of companies. A verified mover reviews your anonymised request, then your contact details are only released if you accept the quote and pay the booking deposit.</p>
            </div>
          </div>
          <div className="pt-6 lg:pt-8 border-t border-border">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
              <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">FAQ</span>
              <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tight">Cardiff man and van questions</h2>
            </div>
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </main>
  );
}
