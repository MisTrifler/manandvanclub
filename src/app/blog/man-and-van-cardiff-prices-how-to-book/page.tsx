import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Cardiff Prices 2026 | Man and Van Club",
  description: "Man and van Cardiff prices for 2026. Hourly rates, what affects the cost, how to book a verified mover and what to have ready before your move day in Cardiff.",
  alternates: { canonical: `${baseUrl}/blog/man-and-van-cardiff-prices-how-to-book` },
  openGraph: {
    title: "Man and Van Cardiff: Prices & How to Book (2026)",
    description: "Cardiff man and van prices, booking advice and local access tips for 2026.",
    url: `${baseUrl}/blog/man-and-van-cardiff-prices-how-to-book`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Cardiff")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`, width: 1200, height: 630, alt: "Man and Van Cardiff: Prices & How to Book" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Cardiff: Prices & How to Book (2026)",
    description: "Cardiff man and van prices, booking advice and local access tips for 2026.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Cardiff")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Man and Van Cardiff: Prices & How to Book (2026)",
  description: "Cardiff man and van prices, booking advice and local access tips for 2026.",
  datePublished: "2026-07-16",
  dateModified: "2026-07-16",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/man-and-van-cardiff-prices-how-to-book`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Man and Van Cardiff Prices", item: `${baseUrl}/blog/man-and-van-cardiff-prices-how-to-book` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Man and Van Cardiff: Prices & How to Book (2026)"
        description="Current Cardiff man and van prices, what affects the cost, and how to book a verified mover for your next move in Cardiff."
        date="2026-07-16"
        readTime="6 min read"
        breadcrumbs={[{ label: "Cost Guides", href: "/blog/cost-guides" }]}
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            Cardiff is Wales' capital and biggest city, but it's compact compared to London or Birmingham. That doesn't mean moves are simple — Cardiff Bay apartments have their own access rules, the student areas in Cathays and Roath are busy in summer, and the Victorian terraces in Pontcanna and Canton have the usual narrow-street challenges. This guide covers 2026 pricing, what drives the cost, and how to book a verified mover who knows Cardiff.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Man and van Cardiff prices in 2026</h2>
          <p>
            Cardiff man and van rates start from <strong className="text-primary">£19 per hour</strong>. Typical ranges:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Single item collection</strong> — from £19. A bed frame from Llandaff to Whitchurch, for example.</li>
            <li><strong className="text-primary">Studio or 1-bed flat move</strong> — from £130–£250. A Cardiff Bay apartment is different to a ground-floor flat in Rumney.</li>
            <li><strong className="text-primary">2–3 bedroom house move</strong> — from £250–£480. Cardiff's Victorian terraces in Pontcanna and Splott can be surprisingly spacious.</li>
            <li><strong className="text-primary">Cardiff to London</strong> — from £350–£550. About 2.5 hours via the M4. A common long-distance route.</li>
          </ul>
          <p>
            These are guide prices. <Link href="/man-and-van-cardiff" className="text-accent font-bold hover:underline">Submit your Cardiff move details</Link> for a tailored estimate.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What affects man and van prices in Cardiff?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Cathays and Roath student areas</strong> — Thousands of students live in these areas near Cardiff University and Cardiff Metropolitan. June and September see huge turnover. Book early — at least a week ahead.</li>
            <li><strong className="text-primary">Cardiff Bay apartments</strong> — Modern waterfront flats with underground car parks. Check height clearance and whether the goods lift is big enough for your furniture. Mermaid Quay has restricted loading access during busy periods.</li>
            <li><strong className="text-primary">Pontcanna and Canton terraces</strong> — Victorian terraces with on-street parking and no driveways. Popular areas, limited loading space. A parking suspension from Cardiff Council may be needed.</li>
            <li><strong className="text-primary">M4 and city-centre traffic</strong> — The M4 around Newport (J24–J28) is notorious for delays. If your move involves this stretch, allow extra time or avoid peak hours. Cardiff city centre also has bus lanes and one-way systems that can catch out drivers who don't know the city.</li>
            <li><strong className="text-primary">Severn Bridge tolls</strong> — The Severn Crossing tolls were abolished in 2018. There is no charge for crossing from England to Wales or vice versa. Some older guides still mention tolls — they're outdated.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to book a man and van in Cardiff</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-primary">Submit your move details</strong> — Go to <Link href="/man-and-van-cardiff" className="text-accent font-bold hover:underline">the Cardiff page</Link>. Enter both postcodes, move date, item list and access notes.</li>
            <li><strong className="text-primary">See a guide price</strong> — An estimated range based on your details.</li>
            <li><strong className="text-primary">A verified mover reviews your request</strong> — One approved mover looks at your exact postcodes, stairs and item list before quoting.</li>
            <li><strong className="text-primary">Accept or decline</strong> — If the quote works, accept it and pay the booking deposit. No obligation otherwise.</li>
          </ol>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Ready to book your Cardiff move?</h2>
          <p>
            Submit your move details on the <Link href="/man-and-van-cardiff" className="text-accent font-bold hover:underline">Cardiff page</Link>. It takes under a minute, it's free, and a verified mover reviews your exact requirements before sending a quote. If you'd rather talk it through, call <a href="tel:01217511269" className="text-accent font-bold hover:underline">0121 751 1269</a> — we're open 24/7.
          </p>
        </div>
      </BlogPostLayout>
    </>
  );
}
