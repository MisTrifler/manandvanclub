import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Same-Day Man and Van Guide 2026 | Man and Van Club",
  description: "How to get a same-day man and van: when it is possible, what it costs, how to improve your chances, and what details to include. From £55/hr for urgent UK moves.",
  alternates: { canonical: `${baseUrl}/blog/same-day-move-guide` },
  openGraph: {
    title: "Same-Day Man and Van Guide 2026",
    description: "How to get a same-day man and van: when it is possible, what it costs, how to improve your chances.",
    url: `${baseUrl}/blog/same-day-move-guide`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Same-Day Man and Van")}&subtitle=${encodeURIComponent("Emergency Move Advice")}`, width: 1200, height: 630, alt: "Same-Day Man and Van" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Same-Day Man and Van Guide 2026",
    description: "How to get a same-day man and van: when it is possible, what it costs, how to improve your chances.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Same-Day Man and Van")}&subtitle=${encodeURIComponent("Emergency Move Advice")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Same-Day Man and Van Guide 2026",
  description: "How to get a same-day man and van: when it is possible, what it costs, how to improve your chances, and what details to include.",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/same-day-move-guide`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Same-Day Move Guide", item: `${baseUrl}/blog/same-day-move-guide` },
  ],
};

export default function SameDayMoveGuidePost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Same-Day Man and Van Guide"
        description="How to get a mover when you need one today"
        date="2026-07-15"
        readTime="6 min read"
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">Sometimes you cannot plan ahead. Whether it is a last-minute house completion, an urgent furniture collection from Facebook Marketplace, or a tenant who needs to move out today — a same-day man and van can be the solution. Here is what you need to know about getting a same-day move, what it costs, and how to improve your chances.</p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Is a same-day man and van always available?</h2>
          <p>No. Same-day availability depends on whether a verified mover has a gap in their schedule that day. It is not guaranteed. However, many movers build flexibility into their day precisely because short-notice jobs come up. The earlier in the day you submit your request, the better your chances.</p>
          <p>Availability tends to be higher on weekdays than weekends, and higher outside of peak periods (end of month, student move weeks in June and September).</p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How much does a same-day man and van cost?</h2>
          <p>Same-day moves typically carry a small premium because the mover may need to reroute their day. In 2026, expect to pay from £55/hr for a same-day job, compared to from £50/hr for a planned move.</p>
          <p>Typical same-day price ranges:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Single-item collection:</strong> From £55</li>
            <li><strong className="text-primary">Small local move (studio/1-bed):</strong> £150–£350</li>
            <li><strong className="text-primary">Larger local move (2–3 bed):</strong> £300–£550</li>
            <li><strong className="text-primary">Cross-city move:</strong> Depends on route and timing</li>
          </ul>
          <p>For a full breakdown of pricing factors, see our <Link href="/blog/what-affects-man-and-van-prices" className="text-accent hover:underline">what affects man and van prices</Link> guide.</p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to improve your chances of getting a same-day mover</h2>

          <h3 className="text-xl font-black text-primary uppercase tracking-tight mt-8 mb-3">1. Submit your request as early as possible</h3>
          <p>Movers review new requests throughout the day. A request submitted at 8am has a much better chance than one submitted at 3pm. Movers plan their routes in the morning, so being in the queue early matters.</p>

          <h3 className="text-xl font-black text-primary uppercase tracking-tight mt-8 mb-3">2. Be specific about timing</h3>
          <p>Instead of &quot;today&quot;, give a specific time window: &quot;collection between 10am and 2pm, delivery by 4pm&quot;. This helps the mover judge whether they can fit your job between existing bookings.</p>

          <h3 className="text-xl font-black text-primary uppercase tracking-tight mt-8 mb-3">3. Include full postcodes for both addresses</h3>
          <p>Postcodes allow the mover to check the route, estimate drive time and assess whether your job fits into their schedule. Vague location descriptions like &quot;near the city centre&quot; slow down the review process.</p>

          <h3 className="text-xl font-black text-primary uppercase tracking-tight mt-8 mb-3">4. List every item</h3>
          <p>Do not write &quot;a few boxes and some furniture&quot;. List each item — &quot;3 boxes, 1 double mattress, 1 bed frame, 1 washing machine&quot;. This lets the mover judge van space and loading time accurately.</p>

          <h3 className="text-xl font-black text-primary uppercase tracking-tight mt-8 mb-3">5. Mention access details upfront</h3>
          <p>Stairs, lifts, parking restrictions, narrow doorways — these all affect how long the job takes. If the mover discovers a fourth-floor walk-up on arrival that was not mentioned, the job will overrun and affect their next booking. <Link href="/blog/what-to-tell-your-mover-before-moving-day" className="text-accent hover:underline">Read our full guide on what to tell your mover</Link>.</p>

          <h3 className="text-xl font-black text-primary uppercase tracking-tight mt-8 mb-3">6. Be flexible on collection time</h3>
          <p>If you can accept a collection window rather than a fixed time, the mover has more flexibility to fit you in. Saying &quot;any time between 9am and 5pm&quot; opens up more possibilities than &quot;must be collected at 11am sharp&quot;.</p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Common same-day move scenarios</h2>

          <h3 className="text-xl font-black text-primary uppercase tracking-tight mt-8 mb-3">Facebook Marketplace collection</h3>
          <p>Bought a sofa or bed on Marketplace and the seller needs it gone today? <Link href="/facebook-marketplace-collection" className="text-accent hover:underline">Facebook Marketplace collections</Link> are one of the most common same-day requests. Include the seller&apos;s postcode, your postcode, and the item dimensions.</p>

          <h3 className="text-xl font-black text-primary uppercase tracking-tight mt-8 mb-3">End-of-tenancy move</h3>
          <p>If your tenancy ends today and you need to vacate, a same-day move may be your only option. Include the key handover time so the mover knows the deadline. In <Link href="/man-and-van-birmingham" className="text-accent hover:underline">Birmingham</Link> and <Link href="/man-and-van-london" className="text-accent hover:underline">London</Link>, end-of-month tenancy dates create peak demand — plan ahead where possible.</p>

          <h3 className="text-xl font-black text-primary uppercase tracking-tight mt-8 mb-3">Single-item delivery</h3>
          <p>A single sofa, fridge or bed can often be slotted into a mover&apos;s existing route more easily than a full house move. Single-item same-day collections have the highest success rate.</p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What if no mover is available today?</h2>
          <p>Sometimes every local mover is fully booked. In that case:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Try again the next morning — cancellations free up capacity</li>
            <li>Check if your move can wait until mid-week (Tuesday–Thursday has better availability)</li>
            <li>Consider splitting the move — collect urgent items today, schedule the rest for later in the week</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Submit a same-day move request</h2>
          <p>Man and Van Club connects you with one verified mover who reviews your details before quoting. There is no lead-selling, no competing companies and no pressure. Submit your request with accurate postcodes, item list and timing, and a mover can review it if they have same-day availability.</p>
          <p><Link href="/same-day-man-and-van" className="text-accent hover:underline">Request a same-day man and van →</Link></p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Related</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/same-day-man-and-van" className="text-accent hover:underline">Same-Day Man and Van Service</Link></li>
            <li><Link href="/man-and-van-prices" className="text-accent hover:underline">Man and Van Prices — 2026 UK Guide</Link></li>
            <li><Link href="/blog/what-affects-man-and-van-prices" className="text-accent hover:underline">What Affects Man and Van Prices</Link></li>
            <li><Link href="/blog/what-to-tell-your-mover-before-moving-day" className="text-accent hover:underline">What to Tell Your Mover Before Moving Day</Link></li>
            <li><Link href="/moving-cost-calculator" className="text-accent hover:underline">Moving Cost Calculator</Link></li>
          </ul>
        </div>
      </BlogPostLayout>
    </>
  );
}
