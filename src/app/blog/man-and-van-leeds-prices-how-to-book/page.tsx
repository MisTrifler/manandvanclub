import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Leeds: Prices & How to Book (2026) | Man and Van Club",
  description:
    "Man and van Leeds prices for 2026. Hourly rates, local area tips, how to book a verified mover and what to have ready before your move day in Leeds.",
  alternates: {
    canonical: `${baseUrl}/blog/man-and-van-leeds-prices-how-to-book`,
  },
  openGraph: {
    title: "Man and Van Leeds: Prices & How to Book (2026)",
    description: "Leeds man and van prices, booking advice and local access tips for 2026.",
    url: `${baseUrl}/blog/man-and-van-leeds-prices-how-to-book`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Leeds")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`, width: 1200, height: 630, alt: "Man and Van Leeds: Prices & How to Book" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Leeds: Prices & How to Book (2026)",
    description: "Leeds man and van prices, booking advice and local access tips for 2026.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Leeds")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Man and Van Leeds: Prices & How to Book (2026)",
  description: "Leeds man and van prices, booking advice and local access tips for 2026.",
  datePublished: "2026-07-16",
  dateModified: "2026-07-16",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/man-and-van-leeds-prices-how-to-book`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Man and Van Leeds Prices", item: `${baseUrl}/blog/man-and-van-leeds-prices-how-to-book` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Man and Van Leeds: Prices & How to Book (2026)"
        description="Current Leeds man and van prices, what affects the cost, and how to book a verified mover for your next move in Leeds."
        date="2026-07-16"
        readTime="6 min read"
        breadcrumbs={[{ label: "Cost Guides", href: "/blog/cost-guides" }]}
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            Leeds has one of the busiest rental markets outside London, and that means a constant flow of people moving in and out of flats, student houses and family homes across the city. This guide covers what you'll actually pay for a man and van in Leeds in 2026 and how to book without calling round multiple companies.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Man and van Leeds prices in 2026</h2>
          <p>
            Leeds rates start from <strong className="text-primary">£34 per hour</strong>, consistent with the wider Yorkshire and North West market. The city is slightly cheaper than Manchester for most moves, and significantly cheaper than London. Typical costs:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Single item collection or delivery</strong> — from £34. A washing machine from Leeds city centre to Headingley, or a sofa from a shop in Crown Point.</li>
            <li><strong className="text-primary">1-bed flat or studio</strong> — from £130–£220. Depends on floor and parking access.</li>
            <li><strong className="text-primary">2–3 bedroom house</strong> — from £270–£480. Leeds has lots of back-to-back terraces in areas like Burley and Harehills, which can slow loading down.</li>
            <li><strong className="text-primary">Leeds to London</strong> — from £350–£550. See <Link href="/routes/leeds-to-london" className="text-accent font-bold hover:underline">Leeds to London route</Link>.</li>
            <li><strong className="text-primary">Leeds to Manchester</strong> — from £200–£300. Only 40 miles via M62. See <Link href="/routes/manchester-to-leeds" className="text-accent font-bold hover:underline">Manchester to Leeds route</Link>.</li>
          </ul>
          <p>
            For a proper quote based on your exact postcodes and items, <Link href="/man-and-van-leeds" className="text-accent font-bold hover:underline">submit your Leeds move details</Link> — free, takes under a minute.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What affects Leeds move prices?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Back-to-back terraces</strong> — Common in Burley, Harehills and parts of Chapeltown. No front garden, front door opens onto the pavement, and no rear vehicle access. Movers have to carry everything through the house.</li>
            <li><strong className="text-primary">Student moves in LS4, LS5 and LS6</strong> — Headingley, Hyde Park and Woodhouse see huge demand in summer. July and September are peak weeks — book at least a week ahead.</li>
            <li><strong className="text-primary">City centre apartments</strong> — Newer builds around Leeds Dock, South Bank and the railway station often have underground car parks. Check the height clearance for the mover's van.</li>
            <li><strong className="text-primary">Suburban houses with driveways</strong> — Alwoodley, Roundhay, Horsforth and Cookridge have bigger houses with off-road parking. These moves are usually faster to load.</li>
            <li><strong className="text-primary">M621 and Inner Ring Road traffic</strong> — Cross-city moves during peak hours can be slow. The M621 gets particularly busy between junctions 1 and 4 during the morning and evening rush.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to book a man and van in Leeds</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-primary">Submit your move details</strong> — Go to <Link href="/man-and-van-leeds" className="text-accent font-bold hover:underline">the Leeds page</Link> and enter both postcodes, move date, item list and access notes.</li>
            <li><strong className="text-primary">See a guide price</strong> — An estimated range based on your details.</li>
            <li><strong className="text-primary">A verified mover reviews your request</strong> — One approved mover looks at your exact postcodes and access before quoting.</li>
            <li><strong className="text-primary">Accept or decline</strong> — Free to submit, no obligation. Your details stay private until you accept.</li>
          </ol>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What to have ready</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Both postcodes in full</strong> — LS6 1XX to LS16 5YY, not just "Headingley to Horsforth."</li>
            <li><strong className="text-primary">Floor and lift details</strong> — Especially important for city-centre flats and converted Victorian buildings.</li>
            <li><strong className="text-primary">Parking situation</strong> — Driveway, on-street free, permit zone? Leeds has permit parking in Headingley, Hyde Park and parts of Chapel Allerton.</li>
            <li><strong className="text-primary">Item list</strong> — "1 king-size bed, 1 wardrobe, 1 sofa, 1 fridge freezer, 10 boxes" — specific is better.</li>
            <li><strong className="text-primary">Move date</strong> — If you're flexible on the day, weekday mornings are usually cheaper.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Ready to book your Leeds move?</h2>
          <p>
            Go to <Link href="/man-and-van-leeds" className="text-accent font-bold hover:underline">manandvanclub.co.uk/leeds</Link>, enter your details and a verified mover reviews your request before quoting. Free to submit, no obligation. Or call <a href="tel:01217511269" className="text-accent font-bold hover:underline">0121 751 1269</a> — open 7 days, 8am to 8pm.
          </p>
          <p>
            Moving from Leeds to another city? See our <Link href="/routes" className="text-accent font-bold hover:underline">route pages</Link> for <Link href="/routes/leeds-to-london" className="text-accent font-bold hover:underline">Leeds to London</Link>, <Link href="/routes/manchester-to-leeds" className="text-accent font-bold hover:underline">Leeds to Manchester</Link> and <Link href="/routes/leeds-to-sheffield" className="text-accent font-bold hover:underline">Leeds to Sheffield</Link>.
          </p>
        </div>
      </BlogPostLayout>
    </>
  );
}
