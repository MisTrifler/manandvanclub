import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, ShieldCheck, CheckCircle2, ArrowUpRight, Clock, Users, Search } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

const siteUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Near Me | From £19 | Man and Van Club",
  description:
    "Find a man and van near you across the UK. Submit a free move request and one verified local mover reviews your details before sending a quote. West Midlands, London, Manchester, Leeds and more.",
  alternates: {
    canonical: `${siteUrl}/man-and-van-near-me`,
  },
  openGraph: {
    title: "Man and Van Near Me | Find Local Verified Movers",
    description:
      "Find a man and van near you across the UK. Submit a free move request and one verified local mover reviews your details before sending a quote.",
    url: `${siteUrl}/man-and-van-near-me`,
    images: [{ url: `${siteUrl}/api/og?title=${encodeURIComponent("Man and Van Near Me")}&subtitle=${encodeURIComponent("Find Local Verified Movers")}`, width: 1200, height: 630, alt: "Man and Van Near Me — Find Local Verified Movers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Near Me | Find Local Verified Movers",
    description:
      "Find a man and van near you across the UK. Submit a free move request and one verified local mover reviews your details before sending a quote.",
    images: [`${siteUrl}/api/og?title=${encodeURIComponent("Man and Van Near Me")}&subtitle=${encodeURIComponent("Find Local Verified Movers")}`],
  },
};

const faqItems = [
  {
    q: "How do I find a man and van near me?",
    a: "Enter your collection and delivery postcodes on Man and Van Club. A verified local mover can review your anonymised move details and send a quote before you decide whether to book. You do not need to search or call multiple companies — one mover reviews your request at a time.",
  },
  {
    q: "Is there a man and van near me in the West Midlands?",
    a: "Yes. Man and Van Club covers Birmingham, Walsall, Wolverhampton, Dudley, West Bromwich, Solihull, Coventry, Stourbridge, Halesowen, Wednesbury, Bloxwich, Brownhills and surrounding West Midlands areas. Submit your postcodes and a local mover can review the details.",
  },
  {
    q: "Is there a man and van near me outside the West Midlands?",
    a: "Yes. Man and Van Club also covers London, Manchester, Leeds, Liverpool, Bristol, Sheffield, Edinburgh, Cardiff, Newcastle upon Tyne, Nottingham, Leicester, Derby and surrounding areas across England, Scotland and Wales. Enter your postcodes to see if a verified mover in your area can help.",
  },
  {
    q: "How quickly can a man and van near me arrive?",
    a: "Same-day moves may be possible depending on mover availability. Submit your request with the correct postcodes and move details so a verified mover can review it quickly. Availability is higher for advance bookings.",
  },
  {
    q: "How much does a man and van near me cost?",
    a: "UK man and van rates in 2026 start from £19 per hour. West Midlands rates average £19–£70/hr, London rates start from £26/hr. A single-item collection starts from £19, while a full house move could cost £300–£600+. Submit your details for a free guide price first.",
  },
  {
    q: "Are the movers near me verified?",
    a: "Yes. All movers on Man and Van Club must complete our application and verification process, including business details, contact information, Goods in Transit insurance, Public Liability insurance and service area verification before they can access customer enquiries.",
  },
  {
    q: "Will multiple movers contact me if I search for one near me?",
    a: "No. Your details are not shared with multiple companies. One verified mover reviews your anonymised request and sends a quote. Your contact details are only released after you accept the quote and pay the booking deposit.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Man and Van Near Me",
      item: `${siteUrl}/man-and-van-near-me`,
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Man and Van Near Me — Local Mover Matching",
  url: `${siteUrl}/man-and-van-near-me`,
  provider: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    telephone: "+44-121-751-1269",
    email: "support@manandvanclub.co.uk",
  },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
  serviceType: "Man and van near me matching service",
  description:
    "Find a verified man and van near you across the UK. Submit a free move request with your postcodes, item list and access notes. One approved local mover reviews your details and sends a quote before you decide whether to book.",
};

export default function ManAndVanNearMePage() {
  return (
    <div className="bg-white min-h-screen selection:bg-accent selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F9F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="flex items-center gap-2" aria-current="page">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
              <span className="text-primary font-bold">Man and Van Near Me</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero with Quote Form */}
      <section className="bg-[#F9F9F7] py-10 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
            <div className="lg:w-1/2 space-y-5">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-accent/20">
                <MapPin size={12} /> UK-Wide Local Coverage
              </div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-primary/20">
                <span className="text-accent font-black text-sm leading-none">£</span> Prices from £19
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter">
                Man and Van Near Me
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
                Find a verified man and van near you across the UK. Submit your postcodes and move details for free — one approved local mover reviews your request and sends a quote before you decide whether to book.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full border border-green-100">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest">Open 24/7</span>
                </div>
                <span className="text-[10px] font-medium text-primary/50">24/7</span>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="tel:01217511269" className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3 hover:bg-primary/90 transition-all">
                  <Phone size={18} /> Call 0121 751 1269
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 w-full max-w-lg">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signal Strip */}
      <div className="bg-green-50 border-b border-green-100">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <span className="flex items-center gap-2 text-sm text-green-800 font-medium">
            <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" /> Free to submit
          </span>
          <span className="flex items-center gap-2 text-sm text-green-800 font-medium">
            <ShieldCheck size={16} className="text-green-600 flex-shrink-0" /> Verified movers
          </span>
          <span className="flex items-center gap-2 text-sm text-green-800 font-medium">
            <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" /> No hidden fees
          </span>
        </div>
      </div>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-10 text-center">How to Find a Man and Van Near You</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: <Search size={24} />, title: "Enter Your Postcodes", desc: "Tell us your collection and delivery postcodes, move date and what you need moved." },
              { icon: <Clock size={24} />, title: "See a Guide Price", desc: "We show a guide price based on your move details. This is not the final mover quote." },
              { icon: <Users size={24} />, title: "Mover Reviews Request", desc: "One verified local mover reviews your anonymised details and sends a quote." },
              { icon: <CheckCircle2 size={24} />, title: "Accept or Decline", desc: "You decide whether to book. Your details stay private until you accept." },
            ].map((step, i) => (
              <div key={i} className="text-center space-y-3">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto">{step.icon}</div>
                <h3 className="font-black text-primary text-sm uppercase tracking-tight">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Areas — Near Me Targeting */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-4 text-center">Man and Van Near Me — Popular Areas</h2>
          <p className="text-text-secondary text-center mb-10 max-w-2xl mx-auto">
            We cover towns and cities across the UK. Enter your postcodes on the form to see if a verified mover near you can help.
          </p>
          <h3 className="text-xs font-black uppercase tracking-[0.25em] text-primary/40 mb-4">West Midlands</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              { name: "Man and Van Birmingham", href: "/man-and-van-birmingham", desc: "City centre, Edgbaston, Selly Oak, Jewellery Quarter, Sutton Coldfield", popular: true },
              { name: "Man and Van Walsall", href: "/man-and-van-walsall", desc: "Bloxwich, Aldridge, Brownhills, Darlaston, Willenhall", popular: true },
              { name: "Man and Van Wolverhampton", href: "/man-and-van-wolverhampton", desc: "Tettenhall, Penn, Bilston, Wednesfield" },
              { name: "Man and Van Dudley", href: "/man-and-van-dudley", desc: "Brierley Hill, Kingswinford, Sedgley, Netherton" },
              { name: "Man and Van Coventry", href: "/man-and-van-coventry", desc: "Earlsdon, Canley, Foleshill, city centre" },
              { name: "Man and Van Solihull", href: "/man-and-van-solihull", desc: "Shirley, Knowle, Dorridge, Monkspath" },
              { name: "West Midlands Hub", href: "/man-and-van-west-midlands", desc: "All West Midlands areas, services and pricing" },
              { name: "East Midlands Hub", href: "/man-and-van-east-midlands", desc: "Nottingham, Leicester, Derby and surrounding areas" },
            ].map((area) => (
              <Link
                key={area.href}
                href={area.href}
                className="group bg-white rounded-2xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all"
              >
                {area.popular && (
                  <span className="inline-block bg-accent/10 text-accent text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full mb-2">Most popular</span>
                )}
                <h3 className="font-black text-primary text-sm uppercase tracking-tight group-hover:text-accent transition-colors">{area.name}</h3>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">{area.desc}</p>
              </Link>
            ))}
          </div>
          <h3 className="text-xs font-black uppercase tracking-[0.25em] text-primary/40 mb-4">UK-Wide</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Man and Van London", href: "/man-and-van-london", desc: "Croydon, Stratford, Richmond, Camden, Shoreditch, Clapham" },
              { name: "Man and Van Manchester", href: "/man-and-van-manchester", desc: "Salford, Stockport, Bolton, Oldham, Altrincham" },
              { name: "Man and Van Leeds", href: "/man-and-van-leeds", desc: "Bradford, Wakefield, Huddersfield, Halifax" },
              { name: "Man and Van Liverpool", href: "/man-and-van-liverpool", desc: "Bootle, Birkenhead, Southport, St Helens" },
              { name: "Man and Van Bristol", href: "/man-and-van-bristol", desc: "Bath, Weston-super-Mare, Cheltenham, Gloucester" },
              { name: "Man and Van Sheffield", href: "/man-and-van-sheffield", desc: "Rotherham, Barnsley, Doncaster, Chesterfield" },
              { name: "Man and Van Edinburgh", href: "/man-and-van-edinburgh", desc: "Leith, Morningside, Corstorphine, Old Town" },
              { name: "Man and Van Cardiff", href: "/man-and-van-cardiff", desc: "Swansea, Newport, Barry, Bridgend" },
              { name: "Man and Van Newcastle", href: "/man-and-van-newcastle-upon-tyne", desc: "Gateshead, Sunderland, Durham, Middlesbrough" },
              { name: "Man and Van Belfast", href: "/man-and-van-belfast", desc: "Titanic Quarter, Queen's, South Belfast, Holyland" },
              { name: "Man and Van Brighton", href: "/man-and-van-brighton", desc: "Hove, Kemptown, Preston Park, Seven Dials" },
              { name: "Man and Van Sunderland", href: "/man-and-van-sunderland", desc: "Roker, Seaburn, Washington, Hylton" },
              { name: "Man and Van Milton Keynes", href: "/man-and-van-milton-keynes", desc: "Bletchley, Stony Stratford, Newport Pagnell" },
              { name: "Man and Van Bournemouth", href: "/man-and-van-bournemouth", desc: "Poole, Christchurch, Boscombe, Westbourne" },
              { name: "Man and Van Coventry", href: "/man-and-van-coventry", desc: "Earlsdon, Cheylesmore, Binley, Tile Hill" },
              { name: "Man and Van Nottingham", href: "/man-and-van-nottingham", desc: "West Bridgford, Beeston, Arnold, Carlton" },
              { name: "Man and Van Leicester", href: "/man-and-van-leicester", desc: "Oadby, Wigston, Evington, Braunstone" },
            ].map((area) => (
              <Link
                key={area.href}
                href={area.href}
                className="group bg-white rounded-2xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all"
              >
                <h3 className="font-black text-primary text-sm uppercase tracking-tight group-hover:text-accent transition-colors">{area.name}</h3>
                <p className="text-xs text-text-secondary mt-2 leading-relaxed">{area.desc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/areas-covered" className="text-accent font-black text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
              View all areas covered <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Near Me */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">Man and Van Prices Near Me (2026)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { region: "West Midlands", rate: "From £19/hr", example: "Birmingham, Walsall, Wolverhampton, Coventry" },
              { region: "Greater London", rate: "From £26/hr", example: "London, Croydon, Stratford, Richmond" },
              { region: "Other UK", rate: "From £19/hr", example: "Manchester, Leeds, Bristol, Liverpool" },
            ].map((region) => (
              <div key={region.region} className="bg-[#F9F9F7] rounded-2xl border border-border p-6 space-y-3 text-center">
                <h3 className="font-black text-primary uppercase tracking-tight">{region.region}</h3>
                <p className="text-2xl font-black text-accent">{region.rate}</p>
                <p className="text-xs text-text-secondary">{region.example}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-text-secondary text-center mt-6">
            Prices are typical UK ranges for 2026. Your final quote depends on postcodes, item list, access, stairs, parking and timing.
            <Link href="/man-and-van-prices" className="text-accent font-bold hover:underline ml-1">See full pricing guide →</Link>
          </p>
        </div>
      </section>

      {/* Services Near Me */}
      <section className="py-16 bg-[#F9F9F7] border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">Moving Services Near Me</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label: "House Removals", href: "/house-removals" },
              { label: "Flat Moves", href: "/flat-removals" },
              { label: "Student Moves", href: "/student-removals" },
              { label: "Office Moves", href: "/office-removals" },
              { label: "Furniture Delivery", href: "/furniture-delivery" },
              { label: "Piano Removals", href: "/piano-removals" },
              { label: "Single Item", href: "/single-item-delivery" },
              { label: "Same Day", href: "/same-day-man-and-van" },
              { label: "Long Distance", href: "/long-distance-removals" },
              { label: "Marketplace Collection", href: "/facebook-marketplace-collection" },
            ].map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group bg-white rounded-2xl border border-border p-5 text-center hover:border-accent hover:shadow-md transition-all"
              >
                <span className="text-xs font-black text-primary uppercase tracking-widest group-hover:text-accent transition-colors">{service.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-8 text-center">Man and Van Near Me — FAQ</h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.q} className="bg-[#F9F9F7] p-6 rounded-2xl border border-border/50 space-y-3">
                <h3 className="font-black text-primary text-sm leading-snug">{item.q}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F9F9F7] text-center border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter mb-4">Find a Man and Van Near You</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-lg mx-auto leading-relaxed">
            Submit your move details for free. One verified local mover reviews your request and sends a quote before you decide whether to book.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-started" className="btn-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3">
              Start Your Move Request <ArrowUpRight size={20} />
            </Link>
            <a href="tel:01217511269" className="bg-white border-2 border-border px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all">
              <Phone size={18} /> Call 0121 751 1269
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6 text-[9px] font-black uppercase tracking-widest text-primary/40">
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-600" /> Verified Movers</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-green-600" /> Free To Submit</span>
          </div>
        </div>
      </section>

      {/* ── Mobile Floating Call Button ── */}
      <a
        href="tel:01217511269"
        className="floating-call-btn fixed bottom-20 right-6 z-[200] lg:hidden flex items-center gap-3 bg-accent text-white px-6 py-4 rounded-full shadow-2xl hover:bg-accent/90 transition-all"
        aria-label="Call Man and Van Club"
      >
        <Phone size={22} className="text-white" />
        <span className="font-black tracking-tight text-sm">Call Now</span>
      </a>
    </div>
  );
}
