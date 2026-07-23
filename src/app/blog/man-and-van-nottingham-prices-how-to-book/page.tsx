import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Nottingham Prices 2026 | Man and Van Club",
  description:
    "Man and van Nottingham prices for 2026. Hourly rates, what affects the cost, how to book a verified mover and what to have ready before your move day in Nottingham.",
  alternates: {
    canonical: `${baseUrl}/blog/man-and-van-nottingham-prices-how-to-book`,
  },
  openGraph: {
    title: "Man and Van Nottingham: Prices & How to Book (2026)",
    description: "Nottingham man and van prices, booking advice and local access tips for 2026.",
    url: `${baseUrl}/blog/man-and-van-nottingham-prices-how-to-book`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Nottingham")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`, width: 1200, height: 630, alt: "Man and Van Nottingham: Prices & How to Book" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Nottingham: Prices & How to Book (2026)",
    description: "Nottingham man and van prices, booking advice and local access tips for 2026.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Nottingham")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Man and Van Nottingham: Prices & How to Book (2026)",
  description: "Nottingham man and van prices, booking advice and local access tips for 2026.",
  datePublished: "2026-07-23",
  dateModified: "2026-07-23",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/man-and-van-nottingham-prices-how-to-book`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Man and Van Nottingham Prices", item: `${baseUrl}/blog/man-and-van-nottingham-prices-how-to-book` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        cityGuideHref="/blog/man-and-van-nottingham-prices-how-to-book"
        title="Man and Van Nottingham: Prices & How to Book (2026)"
        description="Current Nottingham man and van prices, what affects the cost, and how to book a verified mover for your next move in Nottingham."
        date="2026-07-23"
        readTime="7 min read"
        breadcrumbs={[{ label: "Cost Guides", href: "/blog/cost-guides" }]}
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            If you're looking for a man and van in Nottingham, you probably want two things: a clear idea of what it costs, and a straightforward way to book. This guide covers both — current 2026 pricing for Nottingham moves, what actually affects the quote you get, and how to submit a request so a verified mover can review your details before quoting.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Man and van Nottingham prices in 2026</h2>
          <p>
            Nottingham man and van rates typically start from <strong className="text-primary">£19 per hour</strong>. That's the baseline for a standard van with one mover doing local work within the city. Most Nottingham moves fall into these ranges:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Single item collection</strong> — from £19. A sofa from Sherwood to a flat in the Lace Market, for example.</li>
            <li><strong className="text-primary">Studio or 1-bed flat move</strong> — from £150–£250. Depends on the floor, whether there's a lift, and how close the van can park.</li>
            <li><strong className="text-primary">2–3 bedroom house move</strong> — from £300–£550. More items, more time, potentially a Luton van rather than a standard transit.</li>
            <li><strong className="text-primary">Nottingham to Leicester</strong> — from £80–£300 depending on load. Around 25 miles via the A46 and M1.</li>
            <li><strong className="text-primary">Nottingham to Sheffield</strong> — from £90–£320 depending on load. About 38 miles straight up the M1.</li>
            <li><strong className="text-primary">London to Nottingham</strong> — from £250–£550 for a full van load. A 130-mile M1 run where driver hours and return travel shape the quote.</li>
          </ul>
          <p>
            These are guide prices, not fixed quotes. The final number depends on things like stairs, parking, how ready your boxes are, and whether it's a weekend or weekday. The best way to get an accurate price is to <Link href="/man-and-van-nottingham" className="text-accent font-bold hover:underline">submit your Nottingham move details</Link> so a mover can review exactly what's involved.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What affects man and van prices in Nottingham?</h2>
          <p>
            Nottingham has its own set of quirks that affect move pricing more than most people realise:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Terraced streets and steep hills</strong> — Forest Fields, Radford and Sneinton are dense Victorian terraces with on-street parking, and parts of St Ann's and Mapperley sit on serious gradients. Carrying furniture uphill from a van parked two doors down takes time — state it honestly.</li>
            <li><strong className="text-primary">The Park Estate</strong> — This private estate near the castle has gated entrances and its own access rules. If you live on The Park, the mover needs to know exactly which gate and whether a temporary access arrangement is needed.</li>
            <li><strong className="text-primary">Permit parking</strong> — Much of the city centre (NG1) and the streets around the universities are permit-controlled. If the van can't park within a reasonable carry distance, the job takes longer. Mention permit zones and the nearest loading spot when you submit.</li>
            <li><strong className="text-primary">Student moves</strong> — Nottingham has two large universities: University of Nottingham (University Park, with Lenton and Dunkirk the classic student areas) and Nottingham Trent in the city centre. June and September are peak weeks, and demand pushes prices up. Book early if you can.</li>
            <li><strong className="text-primary">River Trent crossings</strong> — Moves between West Bridgford and the north of the city funnel over Trent Bridge or Lady Bay Bridge, which clog at rush hour and on Forest home match days at the City Ground. Include both postcodes so the mover can plan around it.</li>
            <li><strong className="text-primary">Day and time</strong> — Weekends cost more than weekdays. The A52 towards M1 junction 25 and the A453 towards junction 24 both back up at peak times, adding 20–30 minutes to journeys out of the city. Early mornings are usually cheaper than afternoon slots.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to book a man and van in Nottingham</h2>
          <p>
            The process is simple. You don't need to call five different companies and repeat your details each time:
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-primary">Submit your move details</strong> — Go to <Link href="/man-and-van-nottingham" className="text-accent font-bold hover:underline">the Nottingham page</Link> and enter your collection and delivery postcodes, move date, item list and any access notes (floor, lift, parking restrictions).</li>
            <li><strong className="text-primary">See a guide price</strong> — You'll see an estimated range based on your details. This is a guide, not the final quote.</li>
            <li><strong className="text-primary">A verified mover reviews your request</strong> — One approved mover from the platform reviews your anonymised details and sends a quote. They're not guessing — they've seen your postcodes, stairs and item list before they price it.</li>
            <li><strong className="text-primary">Accept or decline</strong> — If the quote works for you, accept it and pay the booking deposit (which comes off the final balance). If not, there's no obligation. Your details stay private either way until you accept.</li>
          </ol>
          <p>
            It's free to submit. You only pay the booking deposit if you accept a quote, and that deposit is deducted from the mover's price on moving day.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Nottingham areas with the most move requests</h2>
          <p>
            Based on the types of enquiries we see through Man and Van Club, these Nottingham areas come up most often:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">City Centre, Lace Market and Hockley (NG1)</strong> — Converted lace warehouses and apartment blocks with loading bays, entry systems and lift bookings. Check your building's moving rules before moving day.</li>
            <li><strong className="text-primary">The Park (NG7)</strong> — Private estate with gated access and historic properties. Beautiful streets, but the mover needs gate details in advance.</li>
            <li><strong className="text-primary">Lenton, Dunkirk and Radford (NG7)</strong> — Classic student terraces near University Park. High turnover at term times, tight on-street parking, and lots of part-load moves.</li>
            <li><strong className="text-primary">Sherwood and Mapperley (NG5/NG3)</strong> — Victorian and Edwardian terraces and semis on hills. Front gardens and driveways make some streets far easier than others for van access.</li>
            <li><strong className="text-primary">Beeston (NG9)</strong> — Student and family suburb west of the centre with a tram line through it. Mix of terraces near the tram stops and semis with driveways further out.</li>
            <li><strong className="text-primary">West Bridgford (NG2)</strong> — Family semis and larger homes across the Trent. Easy access, but journey times depend entirely on the bridge traffic.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Before you book: have these details ready</h2>
          <p>
            The more accurate your request, the more accurate your quote. Movers in Nottingham tell us the most useful details are:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Full postcodes at both ends</strong> — Not just "Nottingham city centre." NG1 5XX and NG9 2XX are very different routes with different access.</li>
            <li><strong className="text-primary">Which floor, and is there a lift?</strong> — "Third floor, no lift, narrow stair" changes the time estimate significantly, especially in Lace Market conversions.</li>
            <li><strong className="text-primary">Parking situation</strong> — Can the van stop outside? Is it a permit zone? Is there a loading bay, concierge or a Park Estate gate to arrange?</li>
            <li><strong className="text-primary">Item list with sizes</strong> — "Student room's worth of stuff" is vague. "1 double bed frame, 1 mattress, 1 desk, 6 boxes, 1 bike" lets the mover choose the right van size.</li>
            <li><strong className="text-primary">Preferred date and time</strong> — Weekdays are usually cheaper. Morning slots often run more smoothly than afternoon ones, and avoiding match days helps on Trent Bridge routes.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Ready to book your Nottingham move?</h2>
          <p>
            Submit your move details on the <Link href="/man-and-van-nottingham" className="text-accent font-bold hover:underline">Nottingham page</Link>. It takes under a minute, it's free, and a verified mover reviews your exact requirements before sending a quote. If you'd rather talk it through, call <a href="tel:01217511269" className="text-accent font-bold hover:underline">0121 751 1269</a> — we're open 24/7.
          </p>
          <p>
            Moving between Nottingham and another city? Check our <Link href="/routes" className="text-accent font-bold hover:underline">route pages</Link> for pricing estimates on city-to-city moves including <Link href="/routes/nottingham-to-leicester" className="text-accent font-bold hover:underline">Nottingham to Leicester</Link>, <Link href="/routes/nottingham-to-sheffield" className="text-accent font-bold hover:underline">Nottingham to Sheffield</Link> and <Link href="/routes/nottingham-to-birmingham" className="text-accent font-bold hover:underline">Nottingham to Birmingham</Link>, or see the <Link href="/man-and-van-leicester" className="text-accent font-bold hover:underline">Leicester</Link> and <Link href="/man-and-van-derby" className="text-accent font-bold hover:underline">Derby</Link> man and van pages if you're heading elsewhere in the East Midlands.
          </p>
        </div>
      </BlogPostLayout>
    </>
  );
}
