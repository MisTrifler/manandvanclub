import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Walsall Prices 2026 | Man and Van Club",
  description:
    "Man and van Walsall prices for 2026. Hourly rates, local area tips, how to book a verified mover and what to have ready before your move day in Walsall and surrounding areas.",
  alternates: {
    canonical: `${baseUrl}/blog/man-and-van-walsall-prices-how-to-book`,
  },
  openGraph: {
    title: "Man and Van Walsall: Prices & How to Book (2026)",
    description: "Walsall man and van prices, booking advice and local access tips for 2026.",
    url: `${baseUrl}/blog/man-and-van-walsall-prices-how-to-book`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Walsall")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`, width: 1200, height: 630, alt: "Man and Van Walsall: Prices & How to Book" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Walsall: Prices & How to Book (2026)",
    description: "Walsall man and van prices, booking advice and local access tips for 2026.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Walsall")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Man and Van Walsall: Prices & How to Book (2026)",
  description: "Walsall man and van prices, booking advice and local access tips for 2026.",
  datePublished: "2026-07-16",
  dateModified: "2026-07-16",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/man-and-van-walsall-prices-how-to-book`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Man and Van Walsall Prices", item: `${baseUrl}/blog/man-and-van-walsall-prices-how-to-book` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        cityGuideHref="/blog/man-and-van-walsall-prices-how-to-book"
        title="Man and Van Walsall: Prices & How to Book (2026)"
        description="Current Walsall man and van prices, what affects the cost, and how to book a verified mover for your move in Walsall and surrounding areas."
        date="2026-07-16"
        readTime="6 min read"
        breadcrumbs={[{ label: "Cost Guides", href: "/blog/cost-guides" }]}
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            Walsall is one of the busiest areas we cover at Man and Van Club — and for good reason. It's a big residential borough with a mix of terraced houses, new-build estates and tower blocks, all with different access challenges. This guide covers what you'll pay for a man and van in Walsall in 2026, what affects the price, and how to book without the usual hassle of calling round different companies.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Man and van Walsall prices in 2026</h2>
          <p>
            Walsall rates start from <strong className="text-primary">£19 per hour</strong>, which is in line with the wider West Midlands average. Being slightly outside Birmingham means parking tends to be easier and travel times shorter, which can help keep costs down compared to city-centre moves. Here's what typical Walsall moves cost:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Single item collection or delivery</strong> — from £19. Picking up a sofa from a shop on High Street, or moving a washing machine between WS postcodes.</li>
            <li><strong className="text-primary">1-bed flat or studio</strong> — from £130–£220. Depends on whether there's a lift and how close the van can get to the entrance.</li>
            <li><strong className="text-primary">2–3 bedroom house</strong> — from £280–£500. Walsall has plenty of 1930s semis with good driveway access, which keeps loading time down.</li>
            <li><strong className="text-primary">Walsall to Birmingham</strong> — from £120–£200. It's only 8–10 miles depending on the postcodes, but access at both ends makes a big difference to the total.</li>
          </ul>
          <p>
            For a proper quote based on your exact postcodes and item list, <Link href="/man-and-van-walsall" className="text-accent font-bold hover:underline">submit your Walsall move details</Link> on the Walsall page. It's free and takes less than a minute.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Local knowledge that affects Walsall move prices</h2>
          <p>
            Walsall has some specific local factors that movers factor into their quotes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Tower blocks in Bloxwich and Leamore</strong> — Several high-rise blocks with no lifts above certain floors. If you're on the 10th floor of Goscote Lane towers with no lift access, that's a lot of stairs. Mention floor number and lift availability in your request.</li>
            <li><strong className="text-primary">Terraced houses in Caldmore and Palfrey</strong> — Narrow streets, on-street parking only, and front doors that open straight onto the pavement. Movers need to know if they can get a van within 20 metres of the entrance.</li>
            <li><strong className="text-primary">Aldridge and Streetly</strong> — More suburban with driveways and wider roads. These moves tend to be quicker to load, which can mean a lower quote.</li>
            <li><strong className="text-primary">Brownhills and Rushall</strong> — Older properties with narrow internal doorways. If you have a king-size bed or a large American-style fridge freezer, measure the doorframes before booking.</li>
            <li><strong className="text-primary">Parking restrictions in Walsall town centre</strong> — The area around the Saddlers Centre and Park Street has loading restrictions during the day. Early morning or evening moves work better here.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to book a man and van in Walsall</h2>
          <p>
            You don't need to ring around five different numbers and explain the same thing every time. Here's how it works:
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-primary">Enter your move details</strong> — Go to <Link href="/man-and-van-walsall" className="text-accent font-bold hover:underline">the Walsall page</Link> and fill in your collection and delivery postcodes, move date, what you need moving, and any access notes.</li>
            <li><strong className="text-primary">See a guide price</strong> — You'll get an estimated range based on your details. This helps you set expectations, but it's not the final quote.</li>
            <li><strong className="text-primary">A verified mover reviews your request</strong> — One approved mover looks at your exact postcodes, item list and access notes, then sends a quote. They're not estimating blind — they've seen what they're dealing with.</li>
            <li><strong className="text-primary">Accept and book, or decline</strong> — If the quote suits you, accept it and pay the booking deposit (which is taken off the final balance). If it doesn't, there's no charge. Your phone number and email stay private until you accept.</li>
          </ol>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What to have ready before you submit</h2>
          <p>
            The more detail you give, the more accurate your quote will be. Movers covering Walsall say these details make the biggest difference:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Both postcodes in full</strong> — "WS1 1AA to WS3 2BB" is much more useful than "Walsall to Bloxwich." It tells the mover the exact distance and likely traffic route.</li>
            <li><strong className="text-primary">Floor number and lift access</strong> — "Ground floor, van can park on the drive" versus "8th floor, lift to 6th floor then two flights of stairs" are very different jobs.</li>
            <li><strong className="text-primary">A specific item list</strong> — Rather than "2-bed house worth," list the big items: "1 double bed, 1 wardrobe, 1 sofa, 1 fridge freezer, 1 washing machine, 8 boxes, 2 suitcases." This helps the mover choose the right van size.</li>
            <li><strong className="text-primary">Parking arrangements</strong> — Driveway? On-street with no restrictions? Permit zone? Loading bay with a time limit? The more the mover knows, the more accurate the quote.</li>
            <li><strong className="text-primary">Preferred date and flexibility</strong> — If you can move on a Tuesday instead of a Saturday, you'll often get a better rate.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Walsall areas we cover</h2>
          <p>
            Through Man and Van Club, you can submit move requests for any WS postcode area, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Walsall town centre (WS1)</strong> — Flats, apartments and terraced housing near the Saddlers Centre and St Matthew's Quarter.</li>
            <li><strong className="text-primary">Bloxwich (WS3)</strong> — Mix of terraced streets and newer developments. Popular for first-time buyer moves.</li>
            <li><strong className="text-primary">Aldridge (WS9)</strong> — Suburban area with larger homes and easier parking.</li>
            <li><strong className="text-primary">Brownhills (WS8)</strong> — Where Man and Van Club is based. We know this area's roads and properties well.</li>
            <li><strong className="text-primary">Darlaston (WS10)</strong> — Close to Junction 10 of the M6, making it a good starting point for longer moves south.</li>
            <li><strong className="text-primary">Willenhall (WS12/WV12)</strong> — On the Walsall–Wolverhampton border. Movers from either area can cover it.</li>
          </ul>
          <p>
            For the full list of areas, see the <Link href="/man-and-van-walsall" className="text-accent font-bold hover:underline">Walsall area page</Link> or the <Link href="/man-and-van-west-midlands" className="text-accent font-bold hover:underline">West Midlands hub</Link>.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Ready to book your Walsall move?</h2>
          <p>
            Go to <Link href="/man-and-van-walsall" className="text-accent font-bold hover:underline">manandvanclub.co.uk/walsall</Link>, enter your postcodes and item list, and a verified mover reviews your details before quoting. Free to submit, no obligation to accept. If you'd rather talk it through first, call <a href="tel:01217511269" className="text-accent font-bold hover:underline">0121 751 1269</a> — we're open 24/7.
          </p>
          <p>
            Moving from Walsall to another city? We have <Link href="/routes" className="text-accent font-bold hover:underline">route pages</Link> for popular moves including <Link href="/routes/walsall-to-birmingham" className="text-accent font-bold hover:underline">Walsall to Birmingham</Link>, <Link href="/routes/birmingham-to-london" className="text-accent font-bold hover:underline">Birmingham to London</Link> and <Link href="/routes/birmingham-to-coventry" className="text-accent font-bold hover:underline">Birmingham to Coventry</Link>.
          </p>
        </div>
      </BlogPostLayout>
    </>
  );
}
