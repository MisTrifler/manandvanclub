import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Birmingham Prices 2026 | Man and Van Club",
  description:
    "Man and van Birmingham prices for 2026. Hourly rates, what affects the cost, how to book a verified mover and what to have ready before your move day in Birmingham.",
  alternates: {
    canonical: `${baseUrl}/blog/man-and-van-birmingham-prices-how-to-book`,
  },
  openGraph: {
    title: "Man and Van Birmingham: Prices & How to Book (2026)",
    description: "Birmingham man and van prices, booking advice and local access tips for 2026.",
    url: `${baseUrl}/blog/man-and-van-birmingham-prices-how-to-book`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Birmingham")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`, width: 1200, height: 630, alt: "Man and Van Birmingham: Prices & How to Book" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Birmingham: Prices & How to Book (2026)",
    description: "Birmingham man and van prices, booking advice and local access tips for 2026.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Birmingham")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Man and Van Birmingham: Prices & How to Book (2026)",
  description: "Birmingham man and van prices, booking advice and local access tips for 2026.",
  datePublished: "2026-07-16",
  dateModified: "2026-07-16",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/man-and-van-birmingham-prices-how-to-book`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Man and Van Birmingham Prices", item: `${baseUrl}/blog/man-and-van-birmingham-prices-how-to-book` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        cityGuideHref="/blog/man-and-van-birmingham-prices-how-to-book"
        title="Man and Van Birmingham: Prices & How to Book (2026)"
        description="Current Birmingham man and van prices, what affects the cost, and how to book a verified mover for your next move in Birmingham."
        date="2026-07-16"
        readTime="7 min read"
        breadcrumbs={[{ label: "Cost Guides", href: "/blog/cost-guides" }]}
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            If you're looking for a man and van in Birmingham, you probably want two things: a clear idea of what it costs, and a straightforward way to book. This guide covers both — current 2026 pricing for Birmingham moves, what actually affects the quote you get, and how to submit a request so a verified mover can review your details before quoting.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Man and van Birmingham prices in 2026</h2>
          <p>
            Birmingham man and van rates typically start from <strong className="text-primary">£19 per hour</strong>. That's the baseline for a standard van with one mover doing local work within the city. Most Birmingham moves fall into these ranges:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Single item collection</strong> — from £19. A sofa from the Bull Ring area to a flat in Selly Oak, for example.</li>
            <li><strong className="text-primary">Studio or 1-bed flat move</strong> — from £150–£250. Depends on which floor, whether there's a lift, and how close the van can park.</li>
            <li><strong className="text-primary">2–3 bedroom house move</strong> — from £300–£550. More items, more time, potentially a Luton van rather than a standard transit.</li>
            <li><strong className="text-primary">Birmingham to London</strong> — from £350–£500 for a full van load. Long-distance quotes factor in fuel, return travel time and any Congestion Charge if the delivery is inside the zone.</li>
          </ul>
          <p>
            These are guide prices, not fixed quotes. The final number depends on things like stairs, parking, how ready your boxes are, and whether it's a weekend or weekday. The best way to get an accurate price is to <Link href="/man-and-van-birmingham" className="text-accent font-bold hover:underline">submit your Birmingham move details</Link> so a mover can review exactly what's involved.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What affects man and van prices in Birmingham?</h2>
          <p>
            Birmingham has its own set of quirks that affect move pricing more than most people realise:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Parking and access</strong> — Birmingham city centre has restricted loading bays, permit zones and narrow streets around the Jewellery Quarter and Digbeth. If the van can't park near your door, the mover has to carry everything further, which takes more time. Mention your parking situation when you submit your request.</li>
            <li><strong className="text-primary">Flats without lifts</strong> — Second-floor walkups in areas like Moseley, Kings Heath and Balsall Heath add significant time. Every trip up and down stairs is time the mover is on the clock.</li>
            <li><strong className="text-primary">Student moves</strong> — Birmingham has thousands of students in Selly Oak, Harborne and Edgbaston. July and September are peak weeks, and demand pushes prices up. Book early if you can.</li>
            <li><strong className="text-primary">Distance between properties</strong> — A move from B1 to B5 is a 15-minute drive. A move from B75 (Sutton Coldfield) to B29 (Selly Oak) takes longer through traffic. Include both postcodes in your request so the mover can plan the route.</li>
            <li><strong className="text-primary">Day and time</strong> — Weekends cost more than weekdays. Early mornings are usually cheaper than afternoon slots. Birmingham's rush hour (4pm–7pm) can add 30–45 minutes to a cross-city move.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to book a man and van in Birmingham</h2>
          <p>
            The process is simple. You don't need to call five different companies and repeat your details each time:
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-primary">Submit your move details</strong> — Go to <Link href="/man-and-van-birmingham" className="text-accent font-bold hover:underline">the Birmingham page</Link> and enter your collection and delivery postcodes, move date, item list and any access notes (stairs, lifts, parking restrictions).</li>
            <li><strong className="text-primary">See a guide price</strong> — You'll see an estimated range based on your details. This is a guide, not the final quote.</li>
            <li><strong className="text-primary">A verified mover reviews your request</strong> — One approved mover from the platform reviews your anonymised details and sends a quote. They're not guessing — they've seen your postcodes, stairs and item list before they price it.</li>
            <li><strong className="text-primary">Accept or decline</strong> — If the quote works for you, accept it and pay the booking deposit (which comes off the final balance). If not, there's no obligation. Your details stay private either way until you accept.</li>
          </ol>
          <p>
            It's free to submit. You only pay the booking deposit if you accept a quote, and that deposit is deducted from the mover's price on moving day.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Birmingham areas with the most move requests</h2>
          <p>
            Based on the types of enquiries we see through Man and Van Club, these Birmingham areas come up most often:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Jewellery Quarter (B1)</strong> — Lots of new-build flats with underground parking but tight loading bays.</li>
            <li><strong className="text-primary">Selly Oak and Bournbrook (B29)</strong> — Student moves peak in summer. Shared houses with front-garden access make loading easier.</li>
            <li><strong className="text-primary">Moseley and Kings Heath (B13/B14)</strong> — Period properties with narrow hallways and on-street parking. Measure doorframes if you have large furniture.</li>
            <li><strong className="text-primary">Sutton Coldfield (B72–B76)</strong> — Larger homes with driveways — easier for van access but more items to move.</li>
            <li><strong className="text-primary">Edgbaston (B15–B17)</strong> — Mix of mansion flats and houses near the university. Parking permits are common.</li>
            <li><strong className="text-primary">Digbeth and Southside (B5/B9)</strong> — Warehouse conversions and apartments. Check whether your building has a goods lift or if everything has to go via stairs.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Before you book: have these details ready</h2>
          <p>
            The more accurate your request, the more accurate your quote. Movers in Birmingham tell us the most useful details are:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Full postcodes at both ends</strong> — Not just "Birmingham city centre." B1 1AA and B5 4AB are very different routes with different access.</li>
            <li><strong className="text-primary">Which floor and is there a lift?</strong> — "Second floor, no lift" changes the time estimate significantly.</li>
            <li><strong className="text-primary">Parking situation</strong> — Can the van park outside? Is it a permit zone? Is there a loading bay?</li>
            <li><strong className="text-primary">Item list with sizes</strong> — "2-bed flat worth of stuff" is vague. "1 king-size bed frame, 1 mattress, 1 wardrobe, 6 boxes, 1 sofa, 1 dining table" lets the mover choose the right van size.</li>
            <li><strong className="text-primary">Preferred date and time</strong> — Weekdays are usually cheaper. Morning slots often run more smoothly than afternoon ones.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Ready to book your Birmingham move?</h2>
          <p>
            Submit your move details on the <Link href="/man-and-van-birmingham" className="text-accent font-bold hover:underline">Birmingham page</Link>. It takes under a minute, it's free, and a verified mover reviews your exact requirements before sending a quote. If you'd rather talk it through, call <a href="tel:01217511269" className="text-accent font-bold hover:underline">0121 751 1269</a> — we're open 24/7.
          </p>
          <p>
            Moving from Birmingham to another city? Check our <Link href="/routes" className="text-accent font-bold hover:underline">route pages</Link> for pricing estimates and access information for city-to-city moves including <Link href="/routes/birmingham-to-london" className="text-accent font-bold hover:underline">Birmingham to London</Link>, <Link href="/routes/birmingham-to-manchester" className="text-accent font-bold hover:underline">Birmingham to Manchester</Link> and <Link href="/routes/birmingham-to-bristol" className="text-accent font-bold hover:underline">Birmingham to Bristol</Link>.
          </p>
        </div>
      </BlogPostLayout>
    </>
  );
}
