import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Glasgow Prices 2026 | Man and Van Club",
  description:
    "Man and van Glasgow prices for 2026. Hourly rates, what affects the cost, how to book a verified mover and what to have ready before your move day in Glasgow.",
  alternates: {
    canonical: `${baseUrl}/blog/man-and-van-glasgow-prices-how-to-book`,
  },
  openGraph: {
    title: "Man and Van Glasgow: Prices & How to Book (2026)",
    description: "Glasgow man and van prices, booking advice and local access tips for 2026.",
    url: `${baseUrl}/blog/man-and-van-glasgow-prices-how-to-book`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Glasgow")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`, width: 1200, height: 630, alt: "Man and Van Glasgow: Prices & How to Book" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Glasgow: Prices & How to Book (2026)",
    description: "Glasgow man and van prices, booking advice and local access tips for 2026.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Glasgow")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Man and Van Glasgow: Prices & How to Book (2026)",
  description: "Glasgow man and van prices, booking advice and local access tips for 2026.",
  datePublished: "2026-07-23",
  dateModified: "2026-07-23",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/man-and-van-glasgow-prices-how-to-book`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Man and Van Glasgow Prices", item: `${baseUrl}/blog/man-and-van-glasgow-prices-how-to-book` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        cityGuideHref="/blog/man-and-van-glasgow-prices-how-to-book"
        title="Man and Van Glasgow: Prices & How to Book (2026)"
        description="Current Glasgow man and van prices, what affects the cost, and how to book a verified mover for your next move in Glasgow."
        date="2026-07-23"
        readTime="7 min read"
        breadcrumbs={[{ label: "Cost Guides", href: "/blog/cost-guides" }]}
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            If you're looking for a man and van in Glasgow, you probably want two things: a clear idea of what it costs, and a straightforward way to book. This guide covers both — current 2026 pricing for Glasgow moves, what actually affects the quote you get, and how to submit a request so a verified mover can review your details before quoting.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Man and van Glasgow prices in 2026</h2>
          <p>
            Glasgow man and van rates typically start from <strong className="text-primary">£19 per hour</strong>. That's the baseline for a standard van with one mover doing local work within the city. Most Glasgow moves fall into these ranges:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Single item collection</strong> — from £19. A sofa from the West End to a flat on the Southside, for example.</li>
            <li><strong className="text-primary">Studio or 1-bed flat move</strong> — from £150–£250. Depends on the tenement floor, whether there's a lift, and how close the van can park.</li>
            <li><strong className="text-primary">2–3 bedroom house move</strong> — from £300–£550. More items, more time, potentially a Luton van rather than a standard transit.</li>
            <li><strong className="text-primary">Glasgow to Edinburgh</strong> — from £140–£220 for a full van load. Around 47 miles on the M8, with journey time varying heavily by time of day.</li>
            <li><strong className="text-primary">Glasgow to London</strong> — from £650–£900 for a full van load. Long-distance quotes factor in fuel, driver hours and return travel time on a 400-plus mile run.</li>
          </ul>
          <p>
            These are guide prices, not fixed quotes. The final number depends on things like stairs, parking, how ready your boxes are, and whether it's a weekend or weekday. The best way to get an accurate price is to <Link href="/man-and-van-glasgow" className="text-accent font-bold hover:underline">submit your Glasgow move details</Link> so a mover can review exactly what's involved.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What affects man and van prices in Glasgow?</h2>
          <p>
            Glasgow has its own set of quirks that affect move pricing more than most people realise:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Tenement closes and stairs</strong> — Glasgow's famous tenements mean shared closes, tight staircases and no lifts. A top-floor flat on a winding tenement stair takes measurably longer than a ground-floor main-door flat. Always state your floor honestly.</li>
            <li><strong className="text-primary">Parking and permits</strong> — Much of the West End (G11/G12) and city centre is permit-controlled. If the van can't park within a reasonable carry distance, the job takes longer. Mention permit zones and the nearest loading spot when you submit.</li>
            <li><strong className="text-primary">Flats without lifts</strong> — Second and third-floor flats in Shawlands, Dennistoun and Partick add significant time. Every trip up and down the stair is time the mover is on the clock.</li>
            <li><strong className="text-primary">Student moves</strong> — Glasgow has tens of thousands of students around the University of Glasgow (West End), Strathclyde and Caledonian (city centre). June and September are peak weeks, and demand pushes prices up. Book early if you can.</li>
            <li><strong className="text-primary">Distance between properties</strong> — A move from G1 to G41 is a 15-minute drive across the Clyde. A move from Bearsden (G61) to the East End takes longer through cross-city traffic. Include both postcodes in your request so the mover can plan the route.</li>
            <li><strong className="text-primary">Day and time</strong> — Weekends cost more than weekdays. The M8 and Kingston Bridge at rush hour can add 30–45 minutes to a cross-city move. Early mornings are usually cheaper than afternoon slots.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to book a man and van in Glasgow</h2>
          <p>
            The process is simple. You don't need to call five different companies and repeat your details each time:
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-primary">Submit your move details</strong> — Go to <Link href="/man-and-van-glasgow" className="text-accent font-bold hover:underline">the Glasgow page</Link> and enter your collection and delivery postcodes, move date, item list and any access notes (tenement floor, lift, parking restrictions).</li>
            <li><strong className="text-primary">See a guide price</strong> — You'll see an estimated range based on your details. This is a guide, not the final quote.</li>
            <li><strong className="text-primary">A verified mover reviews your request</strong> — One approved mover from the platform reviews your anonymised details and sends a quote. They're not guessing — they've seen your postcodes, stairs and item list before they price it.</li>
            <li><strong className="text-primary">Accept or decline</strong> — If the quote works for you, accept it and pay the booking deposit (which comes off the final balance). If not, there's no obligation. Your details stay private either way until you accept.</li>
          </ol>
          <p>
            It's free to submit. You only pay the booking deposit if you accept a quote, and that deposit is deducted from the mover's price on moving day.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Glasgow areas with the most move requests</h2>
          <p>
            Based on the types of enquiries we see through Man and Van Club, these Glasgow areas come up most often:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">West End — Hillhead, Partick and Dowanhill (G11/G12)</strong> — Tenement flats, permit parking and student turnover. Peak moving weeks are May to September.</li>
            <li><strong className="text-primary">Southside — Shawlands and Pollokshields (G41/G43)</strong> — Period tenements and conversions with shared closes. Front-garden access where it exists makes loading easier.</li>
            <li><strong className="text-primary">East End — Dennistoun (G31)</strong> — Popular with first-time buyers. Tenement stairs again, plus on-street parking on the steeper streets.</li>
            <li><strong className="text-primary">City Centre and Merchant City (G1)</strong> — Apartment blocks with loading bays and lift bookings. Check your building's moving rules before moving day.</li>
            <li><strong className="text-primary">Finnieston and Yorkhill (G3)</strong> — New-build flats near the SEC. Goods lifts and concierge notice periods are common.</li>
            <li><strong className="text-primary">Bearsden and Milngavie (G61/G62)</strong> — Larger homes with driveways — easier for van access but more items to move.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Before you book: have these details ready</h2>
          <p>
            The more accurate your request, the more accurate your quote. Movers in Glasgow tell us the most useful details are:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Full postcodes at both ends</strong> — Not just "Glasgow West End." G12 8XX and G3 6XX are very different routes with different access.</li>
            <li><strong className="text-primary">Which floor, close or lift?</strong> — "Top floor tenement, narrow stair" changes the time estimate significantly.</li>
            <li><strong className="text-primary">Parking situation</strong> — Can the van stop outside? Is it a permit zone? Is there a loading bay or concierge to notify?</li>
            <li><strong className="text-primary">Item list with sizes</strong> — "1-bed tenement worth of stuff" is vague. "1 double bed frame, 1 mattress, 1 wardrobe, 8 boxes, 1 sofa, 1 chest of drawers" lets the mover choose the right van size.</li>
            <li><strong className="text-primary">Preferred date and time</strong> — Weekdays are usually cheaper. Morning slots often run more smoothly than afternoon ones.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Ready to book your Glasgow move?</h2>
          <p>
            Submit your move details on the <Link href="/man-and-van-glasgow" className="text-accent font-bold hover:underline">Glasgow page</Link>. It takes under a minute, it's free, and a verified mover reviews your exact requirements before sending a quote. If you'd rather talk it through, call <a href="tel:01217511269" className="text-accent font-bold hover:underline">0121 751 1269</a> — we're open 24/7.
          </p>
          <p>
            Moving between Glasgow and another city? Check our <Link href="/routes" className="text-accent font-bold hover:underline">route pages</Link> for pricing estimates and access information for city-to-city moves including <Link href="/routes/glasgow-to-edinburgh" className="text-accent font-bold hover:underline">Glasgow to Edinburgh</Link>, or see the <Link href="/man-and-van-edinburgh" className="text-accent font-bold hover:underline">Edinburgh man and van page</Link> if you're heading east.
          </p>
        </div>
      </BlogPostLayout>
    </>
  );
}
