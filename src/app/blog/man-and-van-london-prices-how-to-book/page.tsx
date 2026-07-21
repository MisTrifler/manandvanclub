import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van London Prices 2026 | Man and Van Club",
  description:
    "Man and van London prices for 2026. Borough-by-borough rates, what affects the cost, how to book a verified mover and what to know before moving in London.",
  alternates: {
    canonical: `${baseUrl}/blog/man-and-van-london-prices-how-to-book`,
  },
  openGraph: {
    title: "Man and Van London: Prices & How to Book (2026)",
    description: "London man and van prices by borough, booking advice and access tips for 2026.",
    url: `${baseUrl}/blog/man-and-van-london-prices-how-to-book`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van London")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`, width: 1200, height: 630, alt: "Man and Van London: Prices & How to Book" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van London: Prices & How to Book (2026)",
    description: "London man and van prices by borough, booking advice and access tips for 2026.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van London")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Man and Van London: Prices & How to Book (2026)",
  description: "London man and van prices by borough, booking advice and access tips for 2026.",
  datePublished: "2026-07-16",
  dateModified: "2026-07-16",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/man-and-van-london-prices-how-to-book`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Man and Van London Prices", item: `${baseUrl}/blog/man-and-van-london-prices-how-to-book` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Man and Van London: Prices & How to Book (2026)"
        description="Current London man and van prices, what affects the cost by borough, and how to book a verified mover."
        date="2026-07-16"
        readTime="8 min read"
        breadcrumbs={[{ label: "Cost Guides", href: "/blog/cost-guides" }]}
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            Moving in London is different from moving anywhere else in the UK. Congestion charges, ULEZ fees, controlled parking zones, narrow streets, tower blocks with tiny lifts — every borough has its own set of challenges. This guide breaks down what you'll actually pay for a man and van in London in 2026, what drives the price up or down, and how to book without the usual stress.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Man and van London prices in 2026</h2>
          <p>
            London man and van rates start from <strong className="text-primary">£55 per hour</strong> — higher than the rest of the UK because of Congestion Charge, ULEZ, parking costs and longer travel times between jobs. Here's what typical London moves cost:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Single item collection</strong> — from £55. A sofa from a shop on Old Kent Road to a flat in Brixton, for example.</li>
            <li><strong className="text-primary">Studio or 1-bed flat move</strong> — from £180–£320. The wide range comes down to which borough, floor number and parking.</li>
            <li><strong className="text-primary">2–3 bedroom house or flat</strong> — from £350–£650. More items, more time, and potentially a Luton van.</li>
            <li><strong className="text-primary">London to Birmingham</strong> — from £350–£500 for a full van load. See our <Link href="/routes/london-to-birmingham" className="text-accent font-bold hover:underline">London to Birmingham route page</Link> for detailed pricing and access notes.</li>
            <li><strong className="text-primary">London to Manchester</strong> — from £400–£600. See <Link href="/routes/london-to-manchester" className="text-accent font-bold hover:underline">London to Manchester</Link> for the full breakdown.</li>
          </ul>
          <p>
            These are guide prices. For a quote based on your exact postcodes and item list, <Link href="/man-and-van-london" className="text-accent font-bold hover:underline">submit your London move details</Link> on the London page — it's free.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What makes London moves more expensive?</h2>
          <p>
            Several London-specific factors add cost that you wouldn't encounter in other cities:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Congestion Charge zone</strong> — If your collection or delivery is inside the zone (roughly zones 1 and parts of zone 2), the mover pays £15 per day. That gets factored into your quote.</li>
            <li><strong className="text-primary">ULEZ</strong> — Covers all of Greater London now. If the mover's van isn't ULEZ-compliant, there's a £12.50 daily charge. Most reputable movers have compliant vehicles, but it's worth confirming.</li>
            <li><strong className="text-primary">Controlled Parking Zones (CPZs)</strong> — Most London boroughs have CPZs where you need a permit or have to pay at a meter. If the mover can't park near your door, they have to carry everything further — which takes more time and costs more money.</li>
            <li><strong className="text-primary">Tower blocks with small lifts</strong> — Many London tower blocks have lifts, but they're often too small for a sofa or mattress. If the mover has to walk items down the stairs, that's extra time.</li>
            <li><strong className="text-primary">Narrow streets and one-way systems</strong> — Areas like Camden, Islington and parts of Chelsea have streets where a Luton van physically can't fit. The mover may need a smaller transit van, which means more trips.</li>
            <li><strong className="text-primary">Traffic</strong> — London traffic adds significant time, especially during peak hours. A move that takes 4 hours on a Sunday morning might take 6 hours on a Friday afternoon.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to book a man and van in London</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-primary">Submit your move details</strong> — Go to <Link href="/man-and-van-london" className="text-accent font-bold hover:underline">the London page</Link> and enter both postcodes, your move date, item list and any access notes (which floor, lift, parking).</li>
            <li><strong className="text-primary">See a guide price</strong> — You'll get an estimated range based on your details.</li>
            <li><strong className="text-primary">A verified mover reviews your request</strong> — One approved mover looks at your exact postcodes and access before quoting. They'll know if your street is in a CPZ, whether the lift is big enough, and how long the drive takes.</li>
            <li><strong className="text-primary">Accept or decline</strong> — If the quote works, accept and pay the booking deposit (deducted from the final balance). Your details stay private until you accept.</li>
          </ol>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">London boroughs where we see the most move requests</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Croydon</strong> — One of the busiest areas. Mix of houses with driveways and flats near East Croydon station. See <Link href="/man-and-van-croydon" className="text-accent font-bold hover:underline">Croydon page</Link>.</li>
            <li><strong className="text-primary">Bromley</strong> — Suburban with good parking. Often cheaper moves than inner London.</li>
            <li><strong className="text-primary">Stratford and Newham</strong> — Lots of new-build flats. Check whether your building has a goods lift.</li>
            <li><strong className="text-primary">Ealing</strong> — Terraced houses with on-street parking. Permit zones are common.</li>
            <li><strong className="text-primary">Wembley and Harrow</strong> — Good van access, mostly houses with driveways.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Before you book: details that matter in London</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Full postcodes at both ends</strong> — "London" isn't enough. SW1A 1AA and E1 6AN are very different moves.</li>
            <li><strong className="text-primary">CPZ and parking permits</strong> — Tell the mover if you can arrange a parking suspension or if they need a visitor permit.</li>
            <li><strong className="text-primary">Lift dimensions</strong> — If you're in a tower block, measure the lift. Many London lifts are 70cm wide — too narrow for a standard double mattress.</li>
            <li><strong className="text-primary">Congestion Charge and ULEZ</strong> — Confirm whether your postcodes fall inside these zones.</li>
            <li><strong className="text-primary">Preferred time</strong> — Early mornings and Sundays are cheaper and faster. Avoid weekday afternoons if you can.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Ready to book your London move?</h2>
          <p>
            Submit your move details on the <Link href="/man-and-van-london" className="text-accent font-bold hover:underline">London page</Link>. It's free, takes under a minute, and a verified mover reviews your exact requirements before sending a quote. If you'd rather talk it through, call <a href="tel:01217511269" className="text-accent font-bold hover:underline">0121 751 1269</a> — open 24/7.
          </p>
          <p>
            Moving from London to another city? See our <Link href="/routes" className="text-accent font-bold hover:underline">route pages</Link> including <Link href="/routes/london-to-birmingham" className="text-accent font-bold hover:underline">London to Birmingham</Link>, <Link href="/routes/london-to-manchester" className="text-accent font-bold hover:underline">London to Manchester</Link>, <Link href="/routes/london-to-leeds" className="text-accent font-bold hover:underline">London to Leeds</Link> and <Link href="/routes/bristol-to-london" className="text-accent font-bold hover:underline">Bristol to London</Link>.
          </p>
        </div>
      </BlogPostLayout>
    </>
  );
}
