import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Liverpool: Prices & How to Book (2026) | Man and Van Club",
  description: "Man and van Liverpool prices for 2026. Hourly rates, what affects the cost, how to book a verified mover and what to have ready before your move day in Liverpool.",
  alternates: { canonical: `${baseUrl}/blog/man-and-van-liverpool-prices-how-to-book` },
  openGraph: {
    title: "Man and Van Liverpool: Prices & How to Book (2026)",
    description: "Liverpool man and van prices, booking advice and local access tips for 2026.",
    url: `${baseUrl}/blog/man-and-van-liverpool-prices-how-to-book`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Liverpool")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`, width: 1200, height: 630, alt: "Man and Van Liverpool: Prices & How to Book" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Liverpool: Prices & How to Book (2026)",
    description: "Liverpool man and van prices, booking advice and local access tips for 2026.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Liverpool")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Man and Van Liverpool: Prices & How to Book (2026)",
  description: "Liverpool man and van prices, booking advice and local access tips for 2026.",
  datePublished: "2026-07-16",
  dateModified: "2026-07-16",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/man-and-van-liverpool-prices-how-to-book`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Man and Van Liverpool Prices", item: `${baseUrl}/blog/man-and-van-liverpool-prices-how-to-book` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Man and Van Liverpool: Prices & How to Book (2026)"
        description="Current Liverpool man and van prices, what affects the cost, and how to book a verified mover for your next move in Liverpool."
        date="2026-07-16"
        readTime="7 min read"
        breadcrumbs={[{ label: "Cost Guides", href: "/blog/cost-guides" }]}
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            Liverpool has some of the most affordable man and van rates among England's major cities — but the price you pay still depends heavily on where in the city you're moving from and to. A waterfront apartment at Princes Dock is a very different job to a terrace in Toxteth or a family home in Allerton. This guide covers 2026 pricing, what actually affects the cost, and how to get a quote from a verified mover who knows Liverpool.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Man and van Liverpool prices in 2026</h2>
          <p>
            Liverpool man and van rates start from <strong className="text-primary">£50 per hour</strong>. Typical price ranges:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Single item collection</strong> — from £50. A desk from Aigburth to Childwall, for example.</li>
            <li><strong className="text-primary">Studio or 1-bed flat move</strong> — from £130–£250. A city-centre apartment near the Albert Dock is different to a flat in Old Swan with its own driveway.</li>
            <li><strong className="text-primary">2–3 bedroom house move</strong> — from £250–£480. Liverpool's Victorian terraces in areas like Wavertree and Toxteth are often bigger inside than they look.</li>
            <li><strong className="text-primary">Liverpool to London</strong> — from £350–£550. The M6 and M1 route takes about 3.5 hours. A long day but doable in one go.</li>
          </ul>
          <p>
            These are guide prices. For a quote based on your actual move, <Link href="/man-and-van-liverpool" className="text-accent font-bold hover:underline">submit your Liverpool move details</Link>.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What affects man and van prices in Liverpool?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Terraced streets without driveways</strong> — Large parts of Liverpool (Kensington, Wavertree, Toxteth, Anfield) are rows of terraces with no off-street parking. On-street parking may need a suspension from Liverpool City Council.</li>
            <li><strong className="text-primary">Student areas</strong> — Smithdown Road, Wavertree and Kensington have huge student populations. June and September are peak months. Demand is high and availability is tight — book a week ahead if you can.</li>
            <li><strong className="text-primary">City centre apartments</strong> — The Baltic Triangle, Ropewalks and Princes Dock have modern flats with underground parking. Check the height clearance and whether the goods lift fits your largest item. Some car parks have tight corners.</li>
            <li><strong className="text-primary">Mersey tunnels</strong> — If your move crosses the Mersey (Liverpool to Birkenhead/Wallasey or vice versa), the tunnel toll for vans is currently £1.80 per crossing. Some movers factor this into the quote.</li>
            <li><strong className="text-primary">Liverpool Clean Air Zone</strong> — Liverpool does not currently have a Clean Air Zone. The proposal was paused. Standard parking restrictions and bus lane rules still apply.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to book a man and van in Liverpool</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-primary">Submit your move details</strong> — Go to <Link href="/man-and-van-liverpool" className="text-accent font-bold hover:underline">the Liverpool page</Link>. Enter both postcodes, move date, item list and access notes.</li>
            <li><strong className="text-primary">See a guide price</strong> — An estimated range based on your details.</li>
            <li><strong className="text-primary">A verified mover reviews your request</strong> — One approved mover reviews your postcodes and item list before quoting. They know the difference between a Baltic Triangle apartment and a Wavertree terrace.</li>
            <li><strong className="text-primary">Accept or decline</strong> — If the quote works, accept it and pay the booking deposit. No obligation if it doesn't suit you.</li>
          </ol>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Liverpool areas with the most move requests</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Baltic Triangle and Ropewalks (L1)</strong> — Converted warehouses and new-build flats. Check lift dimensions and loading bay access.</li>
            <li><strong className="text-primary">Wavertree and Smithdown (L7/L15)</strong> — Student territory. High turnover in summer. Front-garden access makes loading easier than some cities.</li>
            <li><strong className="text-primary">Allerton and Childwall (L16/L18)</strong> — Suburban family homes with driveways. Generally straightforward for van access.</li>
            <li><strong className="text-primary">Toxteth and Princes Park (L8)</strong> — Victorian terraces, some with narrow access and on-street parking only.</li>
            <li><strong className="text-primary">Aigburth and Grassendale (L17/L19)</strong> — Mix of period properties and newer builds along the river. Easier parking than the city centre.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Ready to book your Liverpool move?</h2>
          <p>
            Submit your move details on the <Link href="/man-and-van-liverpool" className="text-accent font-bold hover:underline">Liverpool page</Link>. It takes under a minute, it's free, and a verified mover reviews your exact requirements before sending a quote. If you'd rather talk it through, call <a href="tel:01217511269" className="text-accent font-bold hover:underline">0121 751 1269</a> — we're open 7 days a week.
          </p>
        </div>
      </BlogPostLayout>
    </>
  );
}
