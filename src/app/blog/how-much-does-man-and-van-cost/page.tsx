import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "How Much Does a Man and Van Cost in 2026? | Man and Van Club",
  description:
    "A breakdown of man and van pricing across the UK in 2026, from West Midlands to London. Learn what affects the cost and how to get an accurate quote for your move.",
  alternates: {
    canonical: `${baseUrl}/blog/how-much-does-man-and-van-cost`,
  },
  openGraph: {
    title: "How Much Does a Man and Van Cost in 2026?",
    description: "A breakdown of man and van pricing across the UK, from West Midlands to London. Learn what affects the cost and how to get an accurate quote for your move.",
    url: `${baseUrl}/blog/how-much-does-man-and-van-cost`,
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "How Much Does a Man and Van Cost in 2026?" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Much Does a Man and Van Cost in 2026?",
    description: "A breakdown of man and van pricing across the UK. Learn what affects the cost and how to get an accurate quote.",
    images: ["/images/og-homepage.jpg"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Much Does a Man and Van Cost in 2026?",
  description: "A breakdown of man and van pricing across the UK in 2026, from West Midlands to London.",
  datePublished: "2026-07-14",
  dateModified: "2026-07-14",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/how-much-does-man-and-van-cost`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "How Much Does a Man and Van Cost?", item: `${baseUrl}/blog/how-much-does-man-and-van-cost` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="How Much Does a Man and Van Cost in 2026?"
        description="A breakdown of man and van pricing across the UK, from West Midlands to London. Learn what affects the cost and how to get an accurate quote."
        date="2026-07-14"
        readTime="6 min read"
      >
        {/* Custom prose styling for blog content */}
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            The cost of hiring a man and van in the UK depends on several factors: your location, the distance between collection and delivery, the volume of items, and the access at both ends. This guide covers the typical price ranges across different regions and explains what goes into a quote.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Typical hourly rates by region</h2>
          <p>
            Man and van rates vary by region, largely driven by demand, parking costs, congestion charges and the time it takes to travel between jobs:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">West Midlands</strong> — from £50 per hour. Birmingham, Walsall, Wolverhampton and Coventry typically fall in this range.</li>
            <li><strong className="text-primary">East Midlands</strong> — from £50 per hour. Nottingham, Leicester, Derby and Northampton.</li>
            <li><strong className="text-primary">London</strong> — from £55 per hour. The higher rate accounts for Congestion Charge zones, ULEZ fees, Controlled Parking Zones and longer travel times between properties.</li>
            <li><strong className="text-primary">Greater Manchester</strong> — from £50 per hour. Manchester, Salford, Stockport and Bolton.</li>
            <li><strong className="text-primary">Other UK cities</strong> — from £50 per hour. Leeds, Liverpool, Bristol, Sheffield, Edinburgh, Glasgow, Cardiff and most other UK towns and cities.</li>
          </ul>
          <p>
            These are starting rates. The final quote depends on the details of your move.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What affects the cost of a man and van?</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-primary">Distance between postcodes</strong> — A local move within the same postcode area costs less than a cross-city or long-distance move. Movers factor in fuel and travel time.</li>
            <li><strong className="text-primary">Volume and weight of items</strong> — A few boxes and a bed frame takes less time than a full three-bedroom house. More items mean more loading time, a potentially larger van, and possibly a second trip.</li>
            <li><strong className="text-primary">Access at both ends</strong> — Stairs, lifts, narrow doorways, long walks from the van to the front door, and parking restrictions all add time to the job.</li>
            <li><strong className="text-primary">Helpers required</strong> — If you need a second person to lift heavy items, this is usually charged as an additional hourly rate.</li>
            <li><strong className="text-primary">Timing</strong> — Weekend and end-of-month dates are busier. Same-day or short-notice moves may carry a premium.</li>
            <li><strong className="text-primary">Specialist items</strong> — Pianos, large safes, or fragile antiques need extra care and equipment, which can increase the price.</li>
          </ol>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Hourly rate vs fixed price</h2>
          <p>
            Most man and van operators quote an hourly rate with an estimated time range. For example, a one-bedroom flat move might be quoted at 2–3 hours at the local hourly rate. Some operators offer a fixed price for straightforward jobs, but this is usually based on the same factors — just presented differently.
          </p>
          <p>
            On Man and Van Club, you see a guide price based on your postcodes and move details first. Then a verified mover reviews the specifics and sends an accurate quote before you decide whether to book.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Example move costs</h2>
          <p>These are representative examples, not fixed prices:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Studio flat, same city</strong> — typically 1–2 hours from £50–£110 (or from £55–£120 in London)</li>
            <li><strong className="text-primary">One-bedroom flat, same city</strong> — typically 2–3 hours from £100–£165 (or from £110–£180 in London)</li>
            <li><strong className="text-primary">Two-bedroom house, same city</strong> — typically 3–5 hours from £150–£275</li>
            <li><strong className="text-primary">Three-bedroom house, same city</strong> — typically 5–8 hours from £250–£440</li>
            <li><strong className="text-primary">Single item collection</strong> — typically 1 hour from £50 (or from £55 in London)</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to keep your move costs down</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong className="text-primary">Be accurate with your item list</strong> — Surprises on moving day can add time and cost. List everything upfront.</li>
            <li><strong className="text-primary">Describe access clearly</strong> — If there are stairs, parking restrictions or a long walk from van to door, say so. The mover can plan accordingly and quote accurately.</li>
            <li><strong className="text-primary">Pack in advance</strong> — The more ready you are when the mover arrives, the faster the loading goes.</li>
            <li><strong className="text-primary">Move mid-week if possible</strong> — Tuesday to Thursday tends to be quieter and may be easier to schedule.</li>
            <li><strong className="text-primary">Arrange parking</strong> — If you can reserve a parking space near the property, it saves time and potential parking fines.</li>
          </ol>

          <div className="bg-[#F9F9F7] rounded-2xl border border-border p-8 mt-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">Get an accurate quote for your move</h3>
            <p className="mb-4">
              Submit your move details on Man and Van Club and a verified mover will review your specific postcodes, item list and access notes before sending a quote. It is free to submit — you only pay a booking deposit if you accept the quote.
            </p>
            <Link
              href="/get-started"
              className="btn-orange px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3"
            >
              Start Free Request
            </Link>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm font-black text-primary uppercase tracking-widest mb-3">Related</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/man-and-van-prices" className="text-sm text-accent font-bold hover:underline">Man and Van Prices</Link>
                <Link href="/man-and-van-vs-removal-company" className="text-sm text-accent font-bold hover:underline">Man and Van vs Removals</Link>
                <Link href="/man-and-van-west-midlands" className="text-sm text-accent font-bold hover:underline">West Midlands</Link>
                <Link href="/man-and-van-london" className="text-sm text-accent font-bold hover:underline">London</Link>
                <Link href="/same-day-man-and-van" className="text-sm text-accent font-bold hover:underline">Same Day Moves</Link>
              </div>
            </div>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
