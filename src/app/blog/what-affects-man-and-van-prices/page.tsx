import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "What Affects Man and Van Prices in 2026 | Man and Van Club",
  description: "The 9 factors that change your man and van quote: distance, load size, stairs, parking, timing, access, same-day premium, region and route. Understand what drives the price before you book.",
  alternates: { canonical: `${baseUrl}/blog/what-affects-man-and-van-prices` },
  openGraph: {
    title: "What Affects Man and Van Prices in 2026",
    description: "The 9 factors that change your man and van quote: distance, load size, stairs, parking, timing, access, same-day premium, region and route.",
    url: `${baseUrl}/blog/what-affects-man-and-van-prices`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("What Affects Man and Van Prices")}&subtitle=${encodeURIComponent("Understanding Your Quote")}`, width: 1200, height: 630, alt: "What Affects Man and Van Prices" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Affects Man and Van Prices in 2026",
    description: "The 9 factors that change your man and van quote: distance, load size, stairs, parking, timing, access, same-day premium, region and route.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("What Affects Man and Van Prices")}&subtitle=${encodeURIComponent("Understanding Your Quote")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Affects Man and Van Prices in 2026",
  description: "The 9 factors that change your man and van quote: distance, load size, stairs, parking, timing, access, same-day premium, region and route.",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/what-affects-man-and-van-prices`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "What Affects Man and Van Prices", item: `${baseUrl}/blog/what-affects-man-and-van-prices` },
  ],
};

export default function WhatAffectsPricesPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="What Affects Man and Van Prices"
        description="9 factors that change your quote — and how to get the best price"
        date="2026-07-15"
        readTime="7 min read"
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">Man and van prices in the UK vary significantly depending on what you are moving, where you are moving from and to, and the details of your specific job. Understanding the factors that affect pricing helps you submit accurate details and get a more precise quote the first time.</p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">1. Distance and route</h2>
          <p>The most obvious factor: further costs more. But it is not just about miles — route complexity matters too. A 10-mile move across <Link href="/man-and-van-birmingham" className="text-accent hover:underline">Birmingham</Link> via the A38 during rush hour takes longer than a 15-mile move along the M6 Toll. Movers plan around traffic hotspots, Clean Air Zone charges and road restrictions, all of which affect the final quote.</p>
          <p>Cross-city moves (e.g. Birmingham to <Link href="/man-and-van-walsall" className="text-accent hover:underline">Walsall</Link>) tend to cost less than cross-country moves (e.g. <Link href="/man-and-van-manchester" className="text-accent hover:underline">Manchester</Link> to <Link href="/man-and-van-london" className="text-accent hover:underline">London</Link>) because the route time is shorter and the mover can potentially fit in another job the same day.</p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">2. Load size and item count</h2>
          <p>A single sofa collection from a ground-floor garage costs significantly less than moving the contents of a 3-bed house. The mover needs to judge van size, loading time and whether a second trip is likely. Being specific about items — including dimensions for oversized furniture — helps the mover quote accurately without padding for uncertainty.</p>
          <p>Common load categories:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Single item:</strong> Sofa, bed, appliance — from £19</li>
            <li><strong className="text-primary">Part load:</strong> A few items from one room — £80–£150</li>
            <li><strong className="text-primary">Flat move:</strong> Studio or 1–2 bed — £150–£400</li>
            <li><strong className="text-primary">House move:</strong> 3+ bed property — £250–£600+</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">3. Stairs, lifts and floor level</h2>
          <p>Carrying a wardrobe down three flights of stairs takes considerably longer than loading from a driveway. If your building has a lift, mention it — but also mention whether the lift is large enough for your items. Many London flats have lifts that are too small for a standard sofa, meaning stairs are the only option.</p>
          <p>Floor level is one of the biggest factors that catches people out. A ground-floor move can take half the time of a third-floor move with the same items.</p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">4. Parking and access</h2>
          <p>Can the van park outside your front door? If the nearest parking is 50 metres away, loading takes longer. If you need a parking suspension or permit, the mover needs to know in advance. In city centres — particularly <Link href="/man-and-van-london" className="text-accent hover:underline">London</Link>, <Link href="/man-and-van-edinburgh" className="text-accent hover:underline">Edinburgh</Link> and <Link href="/man-and-van-bristol" className="text-accent hover:underline">Bristol</Link> — restricted parking zones can add £20–£60 for a suspension, plus time for the council to process it.</p>
          <p>Include details about: driveway access, resident permit zones, loading bay availability, double yellow lines, and any time-limited parking windows.</p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">5. Timing and day of the week</h2>
          <p>Fridays and Saturdays are the busiest moving days. Prices tend to be higher because demand outstrips supply. Mid-week moves (Tuesday–Thursday) are often cheaper. Similarly, end-of-month moves coincide with tenancy changeovers, creating peak demand.</p>
          <p>Student move periods (June–July and September) drive up prices in university cities like <Link href="/man-and-van-leeds" className="text-accent hover:underline">Leeds</Link>, Manchester, <Link href="/man-and-van-sheffield" className="text-accent hover:underline">Sheffield</Link> and Nottingham.</p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">6. Same-day and short-notice premium</h2>
          <p>Need a mover today? Same-day availability depends on whether a verified mover has a gap in their schedule. Because the mover may need to reroute or adjust their day, same-day jobs typically carry a premium — expect to pay from £55/hr rather than the standard £19/hr. <Link href="/same-day-man-and-van" className="text-accent hover:underline">Same-day man and van</Link> requests submitted early in the day have a better chance of being picked up.</p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">7. Regional price differences</h2>
          <p>Man and van rates vary by region across the UK:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">West Midlands:</strong> From £19/hr — competitive rates due to high mover availability</li>
            <li><strong className="text-primary">London:</strong> From £26/hr — matched to the most competitive London providers; ULEZ and Congestion Charge may apply on central routes</li>
            <li><strong className="text-primary">North West (Manchester, Liverpool):</strong> From £19/hr</li>
            <li><strong className="text-primary">Scotland (Edinburgh, Glasgow):</strong> From £19/hr</li>
            <li><strong className="text-primary">South West (Bristol, Bath):</strong> From £19/hr</li>
            <li><strong className="text-primary">Remote/rural areas:</strong> Higher rates due to fewer available movers and longer travel distances</li>
          </ul>
          <p>Use the <Link href="/moving-cost-calculator" className="text-accent hover:underline">moving cost calculator</Link> to get an estimate for your specific region and move type.</p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">8. Route-specific charges</h2>
          <p>Certain routes carry extra costs that may not be obvious:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Clean Air Zone (Birmingham):</strong> Non-compliant vans pay £8 per day</li>
            <li><strong className="text-primary">ULEZ (London):</strong> Non-compliant vehicles pay £12.50 per day</li>
            <li><strong className="text-primary">Congestion Charge (Central London):</strong> £15 per day</li>
            <li><strong className="text-primary">Tolls:</strong> M6 Toll (£6–£12), Dartford Crossing (£2.50–£6), Severn Bridge (free but adds route time)</li>
            <li><strong className="text-primary">Ferry crossings:</strong> Isle of Wight, Scottish islands — additional cost and scheduling constraints</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">9. Disassembly and reassembly</h2>
          <p>If furniture needs to be taken apart to fit through doorways or staircases, this adds time. Some movers include basic disassembly in their quote; others charge extra. Mentioning dismantling needs upfront means the mover can factor it in rather than discovering it on moving day.</p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to get the best quote</h2>
          <p>The more detail you provide, the more accurate your quote will be. A mover who knows the exact postcodes, item list, floor levels, parking situation and preferred date can quote precisely — without padding for the unknowns.</p>
          <p>With Man and Van Club, your request goes to one verified mover who reviews the details before quoting. There are no competing companies, no lead-selling, and no pressure. <Link href="/get-started" className="text-accent hover:underline">Submit your move request for free</Link> and receive a quote before you decide whether to book.</p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Related</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/man-and-van-prices" className="text-accent hover:underline">Man and Van Prices — full 2026 UK guide</Link></li>
            <li><Link href="/moving-cost-calculator" className="text-accent hover:underline">Moving Cost Calculator — estimate your move</Link></li>
            <li><Link href="/blog/how-much-does-man-and-van-cost" className="text-accent hover:underline">How Much Does a Man and Van Cost?</Link></li>
            <li><Link href="/man-and-van-vs-removal-company" className="text-accent hover:underline">Man and Van vs Removal Company</Link></li>
          </ul>
        </div>
      </BlogPostLayout>
    </>
  );
}
