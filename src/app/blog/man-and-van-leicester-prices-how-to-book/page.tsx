import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Leicester Prices 2026 | Man and Van Club",
  description:
    "Man and van Leicester prices for 2026. Hourly rates, what affects the cost, how to book a verified mover and what to have ready before your move day in Leicester.",
  alternates: {
    canonical: `${baseUrl}/blog/man-and-van-leicester-prices-how-to-book`,
  },
  openGraph: {
    title: "Man and Van Leicester: Prices & How to Book (2026)",
    description: "Leicester man and van prices, booking advice and local access tips for 2026.",
    url: `${baseUrl}/blog/man-and-van-leicester-prices-how-to-book`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Leicester")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`, width: 1200, height: 630, alt: "Man and Van Leicester: Prices & How to Book" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Leicester: Prices & How to Book (2026)",
    description: "Leicester man and van prices, booking advice and local access tips for 2026.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Leicester")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Man and Van Leicester: Prices & How to Book (2026)",
  description: "Leicester man and van prices, booking advice and local access tips for 2026.",
  datePublished: "2026-07-23",
  dateModified: "2026-07-23",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/man-and-van-leicester-prices-how-to-book`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Man and Van Leicester Prices", item: `${baseUrl}/blog/man-and-van-leicester-prices-how-to-book` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        cityGuideHref="/blog/man-and-van-leicester-prices-how-to-book"
        title="Man and Van Leicester: Prices & How to Book (2026)"
        description="Current Leicester man and van prices, what affects the cost, and how to book a verified mover for your next move in Leicester."
        date="2026-07-23"
        readTime="7 min read"
        breadcrumbs={[{ label: "Cost Guides", href: "/blog/cost-guides" }]}
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            If you're looking for a man and van in Leicester, you probably want two things: a clear idea of what it costs, and a straightforward way to book. This guide covers both — current 2026 pricing for Leicester moves, what actually affects the quote you get, and how to submit a request so a verified mover can review your details before quoting.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Man and van Leicester prices in 2026</h2>
          <p>
            Leicester man and van rates typically start from <strong className="text-primary">£19 per hour</strong>. That's the baseline for a standard van with one mover doing local work within the city. Most Leicester moves fall into these ranges:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Single item collection</strong> — from £19. A sofa from Clarendon Park to a flat in the city centre, for example.</li>
            <li><strong className="text-primary">Studio or 1-bed flat move</strong> — from £150–£250. Depends on the floor, whether there's a lift, and how close the van can park.</li>
            <li><strong className="text-primary">2–3 bedroom house move</strong> — from £300–£550. More items, more time, potentially a Luton van rather than a standard transit.</li>
            <li><strong className="text-primary">Leicester to Nottingham</strong> — from £80–£300 depending on load. Around 25 miles via the M1 and A46.</li>
            <li><strong className="text-primary">Leicester to Birmingham</strong> — from £120–£400 depending on load. About 45 miles down the M69 and M6.</li>
            <li><strong className="text-primary">London to Leicester</strong> — from £220–£550 for a full van load. A 100-mile M1 run where driver hours and return travel shape the quote.</li>
          </ul>
          <p>
            These are guide prices, not fixed quotes. The final number depends on things like stairs, parking, how ready your boxes are, and whether it's a weekend or weekday. The best way to get an accurate price is to <Link href="/man-and-van-leicester" className="text-accent font-bold hover:underline">submit your Leicester move details</Link> so a mover can review exactly what's involved.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What affects man and van prices in Leicester?</h2>
          <p>
            Leicester has its own set of quirks that affect move pricing more than most people realise:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Victorian terraces and on-street parking</strong> — Highfields, Clarendon Park, Westcotes and the streets off Narborough Road are dense terraces where the nearest legal stopping spot can be a few doors away. Carry distance adds real time — state it honestly.</li>
            <li><strong className="text-primary">Student moves</strong> — Leicester has two universities: the University of Leicester by Victoria Park (Clarendon Park, Stoneygate and Knighton are the classic student areas) and De Montfort University on the west of the centre. June and September are peak weeks, and demand pushes prices up. Book early if you can.</li>
            <li><strong className="text-primary">Permit parking zones</strong> — Much of the city centre (LE1) and streets around the universities operate residents' permit schemes. If the van can't park within a reasonable carry distance, the job takes longer. Mention permit zones and the nearest loading spot when you submit.</li>
            <li><strong className="text-primary">Match days and event traffic</strong> — Leicester City at the King Power Stadium and Tigers at Welford Road both clog the Aylestone Road and Raw Dykes Road routes south of the centre. On Diwali, the Golden Mile along Belgrave Road becomes one of the biggest celebrations of its kind outside India and traffic in the north of the city is heavy. Plan around it where you can.</li>
            <li><strong className="text-primary">Ring road and M1 access</strong> — The A563 outer ring road and the A6 corridor get congested at rush hours, and M1 junctions 21 and 21A (Fosse Park and the M69 split) back up at weekends with retail traffic. Early morning slots avoid the worst of it.</li>
            <li><strong className="text-primary">Day and time</strong> — Weekends cost more than weekdays. Morning slots also avoid the afternoon queues on London Road and around the station. Flexible mid-week dates are usually the cheapest option.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to book a man and van in Leicester</h2>
          <p>
            The process is simple. You don't need to call five different companies and repeat your details each time:
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-primary">Submit your move details</strong> — Go to <Link href="/man-and-van-leicester" className="text-accent font-bold hover:underline">the Leicester page</Link> and enter your collection and delivery postcodes, move date, item list and any access notes (floor, lift, parking restrictions).</li>
            <li><strong className="text-primary">See a guide price</strong> — You'll see an estimated range based on your details. This is a guide, not the final quote.</li>
            <li><strong className="text-primary">A verified mover reviews your request</strong> — One approved mover from the platform reviews your anonymised details and sends a quote. They're not guessing — they've seen your postcodes, stairs and item list before they price it.</li>
            <li><strong className="text-primary">Accept or decline</strong> — If the quote works for you, accept it and pay the booking deposit (which comes off the final balance). If not, there's no obligation. Your details stay private either way until you accept.</li>
          </ol>
          <p>
            It's free to submit. You only pay the booking deposit if you accept a quote, and that deposit is deducted from the mover's price on moving day.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Leicester areas with the most move requests</h2>
          <p>
            Based on the types of enquiries we see through Man and Van Club, these Leicester areas come up most often:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">City Centre and the Cultural Quarter (LE1)</strong> — Apartment blocks around the Curve theatre, St George's and the station with loading bays, entry systems and lift bookings. Check your building's moving rules before moving day.</li>
            <li><strong className="text-primary">Clarendon Park and Stoneygate (LE2)</strong> — Victorian and Edwardian terraces popular with young professionals and University of Leicester students. High turnover, tight on-street parking, lots of part-load moves.</li>
            <li><strong className="text-primary">Highfields and Evington (LE2/LE5)</strong> — Dense terraced streets near the universities with shared houses and HMOs. Room-by-room student moves are routine here at term times.</li>
            <li><strong className="text-primary">West End and Narborough Road (LE3)</strong> — Student and family terraces west of the centre, close to both university campuses and always busy at September move-in.</li>
            <li><strong className="text-primary">Belgrave and the Golden Mile (LE4)</strong> — Family homes around Belgrave Road with steady year-round movement, plus heavy event traffic around Diwali.</li>
            <li><strong className="text-primary">Oadby and Wigston (LE2/LE18)</strong> — Family semis and larger houses south-east of the centre. Easier driveway access, but journey times depend on the A6 corridor traffic.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Before you book: have these details ready</h2>
          <p>
            The more accurate your request, the more accurate your quote. Movers in Leicester tell us the most useful details are:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Full postcodes at both ends</strong> — Not just "Leicester city centre." LE1 6XX and LE5 0XX are very different routes with different access.</li>
            <li><strong className="text-primary">Which floor, and is there a lift?</strong> — "Third floor, no lift, narrow stair" changes the time estimate significantly, especially in converted terraces and Cultural Quarter blocks.</li>
            <li><strong className="text-primary">Parking situation</strong> — Can the van stop outside? Is it a residents' permit zone? Is there a loading bay or concierge to arrange?</li>
            <li><strong className="text-primary">Item list with sizes</strong> — "Student room's worth of stuff" is vague. "1 double bed frame, 1 mattress, 1 desk, 6 boxes, 1 bike" lets the mover choose the right van size.</li>
            <li><strong className="text-primary">Preferred date and time</strong> — Weekdays are usually cheaper. Morning slots often run more smoothly than afternoon ones, and avoiding match days helps on the stadium routes.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Ready to book your Leicester move?</h2>
          <p>
            Submit your move details on the <Link href="/man-and-van-leicester" className="text-accent font-bold hover:underline">Leicester page</Link>. It takes under a minute, it's free, and a verified mover reviews your exact requirements before sending a quote. If you'd rather talk it through, call <a href="tel:01217511269" className="text-accent font-bold hover:underline">0121 751 1269</a> — we're open 24/7.
          </p>
          <p>
            Moving between Leicester and another city? Check our <Link href="/routes" className="text-accent font-bold hover:underline">route pages</Link> for pricing estimates on city-to-city moves including <Link href="/routes/leicester-to-nottingham" className="text-accent font-bold hover:underline">Leicester to Nottingham</Link>, <Link href="/routes/leicester-to-birmingham" className="text-accent font-bold hover:underline">Leicester to Birmingham</Link>, <Link href="/routes/leicester-to-sheffield" className="text-accent font-bold hover:underline">Leicester to Sheffield</Link> and <Link href="/routes/london-to-leicester" className="text-accent font-bold hover:underline">London to Leicester</Link>, or see the <Link href="/man-and-van-nottingham" className="text-accent font-bold hover:underline">Nottingham</Link> and <Link href="/man-and-van-coventry" className="text-accent font-bold hover:underline">Coventry</Link> man and van pages if you're heading elsewhere in the Midlands.
          </p>
        </div>
      </BlogPostLayout>
    </>
  );
}
