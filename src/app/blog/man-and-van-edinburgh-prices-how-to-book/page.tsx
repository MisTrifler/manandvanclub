import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Edinburgh Prices 2026 | Man and Van Club",
  description: "Man and van Edinburgh prices for 2026. Hourly rates, what affects the cost, how to book a verified mover and what to have ready before your move day in Edinburgh.",
  alternates: { canonical: `${baseUrl}/blog/man-and-van-edinburgh-prices-how-to-book` },
  openGraph: {
    title: "Man and Van Edinburgh: Prices & How to Book (2026)",
    description: "Edinburgh man and van prices, booking advice and local access tips for 2026.",
    url: `${baseUrl}/blog/man-and-van-edinburgh-prices-how-to-book`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Edinburgh")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`, width: 1200, height: 630, alt: "Man and Van Edinburgh: Prices & How to Book" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Edinburgh: Prices & How to Book (2026)",
    description: "Edinburgh man and van prices, booking advice and local access tips for 2026.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Edinburgh")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Man and Van Edinburgh: Prices & How to Book (2026)",
  description: "Edinburgh man and van prices, booking advice and local access tips for 2026.",
  datePublished: "2026-07-16",
  dateModified: "2026-07-16",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/man-and-van-edinburgh-prices-how-to-book`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Man and Van Edinburgh Prices", item: `${baseUrl}/blog/man-and-van-edinburgh-prices-how-to-book` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Man and Van Edinburgh: Prices & How to Book (2026)"
        description="Current Edinburgh man and van prices, what affects the cost, and how to book a verified mover for your next move in Edinburgh."
        date="2026-07-16"
        readTime="7 min read"
        breadcrumbs={[{ label: "Cost Guides", href: "/blog/cost-guides" }]}
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            Edinburgh is one of the UK's most beautiful cities to live in — and one of the trickiest to move in. The combination of World Heritage architecture, a medieval Old Town, a Georgian New Town with restricted parking, and steep hills (Arthur's Seat, Calton Hill, Castle Rock) makes every move unique. This guide covers 2026 pricing, what drives the cost in Edinburgh, and how to get a verified mover who knows the difference between a Marchmont tenement and a New Town basement flat.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Man and van Edinburgh prices in 2026</h2>
          <p>
            Edinburgh man and van rates start from <strong className="text-primary">£19 per hour</strong>. Typical ranges:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Single item collection</strong> — from £19. A sofa from Leith to Morningside, for example.</li>
            <li><strong className="text-primary">Studio or 1-bed flat move</strong> — from £150–£280. A New Town basement with no parking is at the higher end; a ground-floor flat in Currie is lower.</li>
            <li><strong className="text-primary">2–3 bedroom house move</strong> — from £280–£550. Tenement flats in Marchmont and Bruntsfield often have three or four flights of stairs and no lift.</li>
            <li><strong className="text-primary">Edinburgh to Glasgow</strong> — from £180–£300. About 50 minutes via the M8. A common route.</li>
            <li><strong className="text-primary">Edinburgh to London</strong> — from £450–£700. About 7 hours via the A1 or M6. Usually requires a full-day booking.</li>
          </ul>
          <p>
            These are guide prices. <Link href="/man-and-van-edinburgh" className="text-accent font-bold hover:underline">Submit your Edinburgh move details</Link> for an accurate estimate based on your actual property and access.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What affects man and van prices in Edinburgh?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Tenement stairs</strong> — Edinburgh's traditional sandstone tenements in Marchmont, Bruntsfield, Morningside and Newington often have three or four flights of stone stairs with no lift. Carrying a sofa down four flights takes time. Mention the number of floors in your access notes.</li>
            <li><strong className="text-primary">New Town and Old Town parking</strong> — The World Heritage area has strict parking restrictions. Many streets in the New Town are Controlled Parking Zones with limited spaces. The Old Town has even tighter access around the Royal Mile and Grassmarket. Apply for a parking suspension from the City of Edinburgh Council well ahead of your move.</li>
            <li><strong className="text-primary">Festival season</strong> — August in Edinburgh means the Fringe and International Festival. The city centre becomes extremely busy, streets are closed for performances, and parking is virtually impossible. If you're moving in August, expect complications — and possibly higher prices.</li>
            <li><strong className="text-primary">Leith</strong> — Leith has a mix of traditional tenements and modern waterfront developments around the Shore. Access is generally better than the city centre, but some of the older closes are narrow.</li>
            <li><strong className="text-primary">Edinburgh Low Emission Zone</strong> — Edinburgh has a Low Emission Zone (LEZ) covering the city centre, enforced 24/7. Non-compliant vans face a penalty. Most modern vans are fine, but confirm with the mover if your property is inside the zone.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to book a man and van in Edinburgh</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-primary">Submit your move details</strong> — Go to <Link href="/man-and-van-edinburgh" className="text-accent font-bold hover:underline">the Edinburgh page</Link>. Enter both postcodes, move date, item list and access notes. Be specific about stairs, parking and whether you're inside the LEZ.</li>
            <li><strong className="text-primary">See a guide price</strong> — An estimated range based on what you've told us.</li>
            <li><strong className="text-primary">A verified mover reviews your request</strong> — One approved mover looks at your exact details and quotes. They know what a Marchmont fourth-floor tenement move involves.</li>
            <li><strong className="text-primary">Accept or decline</strong> — If the quote works, accept it and pay the booking deposit. No obligation if it doesn't suit.</li>
          </ol>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Edinburgh areas with the most move requests</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Marchmont and Meadows (EH9)</strong> — Student and professional tenements. Multiple flights of stairs, on-street parking, peak demand in June and September.</li>
            <li><strong className="text-primary">Bruntsfield and Morningside (EH10)</strong> — Popular professional areas with tenement flats and restricted parking.</li>
            <li><strong className="text-primary">Leith (EH6)</strong> — Mix of traditional and modern. Shore area developments have underground parking to check.</li>
            <li><strong className="text-primary">New Town (EH2/EH3)</strong> — Georgian basements and first-floor flats with restricted parking and loading access. World Heritage restrictions apply.</li>
            <li><strong className="text-primary">Portobello and Joppa (EH15)</strong> — Seaside properties, generally easier for van access than central areas.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Ready to book your Edinburgh move?</h2>
          <p>
            Submit your move details on the <Link href="/man-and-van-edinburgh" className="text-accent font-bold hover:underline">Edinburgh page</Link>. It takes under a minute, it's free, and a verified mover reviews your exact requirements before sending a quote. If you'd rather talk it through, call <a href="tel:01217511269" className="text-accent font-bold hover:underline">0121 751 1269</a> — we're open 24/7.
          </p>
        </div>
      </BlogPostLayout>
    </>
  );
}
