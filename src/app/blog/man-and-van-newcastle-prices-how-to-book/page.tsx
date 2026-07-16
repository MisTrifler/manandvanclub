import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Newcastle upon Tyne: Prices & How to Book (2026) | Man and Van Club",
  description: "Man and van Newcastle upon Tyne prices for 2026. Hourly rates, what affects the cost, how to book a verified mover and what to have ready before your move day in Newcastle.",
  alternates: { canonical: `${baseUrl}/blog/man-and-van-newcastle-prices-how-to-book` },
  openGraph: {
    title: "Man and Van Newcastle upon Tyne: Prices & How to Book (2026)",
    description: "Newcastle upon Tyne man and van prices, booking advice and local access tips for 2026.",
    url: `${baseUrl}/blog/man-and-van-newcastle-prices-how-to-book`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Newcastle")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`, width: 1200, height: 630, alt: "Man and Van Newcastle: Prices & How to Book" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Newcastle upon Tyne: Prices & How to Book (2026)",
    description: "Newcastle upon Tyne man and van prices, booking advice and local access tips for 2026.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Newcastle")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Man and Van Newcastle upon Tyne: Prices & How to Book (2026)",
  description: "Newcastle upon Tyne man and van prices, booking advice and local access tips for 2026.",
  datePublished: "2026-07-16",
  dateModified: "2026-07-16",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/man-and-van-newcastle-prices-how-to-book`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Man and Van Newcastle Prices", item: `${baseUrl}/blog/man-and-van-newcastle-prices-how-to-book` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Man and Van Newcastle upon Tyne: Prices & How to Book (2026)"
        description="Current Newcastle upon Tyne man and van prices, what affects the cost, and how to book a verified mover for your next move in Newcastle."
        date="2026-07-16"
        readTime="6 min read"
        breadcrumbs={[{ label: "Cost Guides", href: "/blog/cost-guides" }]}
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            Newcastle upon Tyne is the largest city in the North East, sitting on the north bank of the River Tyne opposite Gateshead. The city has a compact centre with a mix of Georgian architecture, modern developments around the Quayside, and student-heavy areas like Jesmond and Heaton. Newcastle is generally more affordable for man and van services than southern cities, but the steep hills, Tyne Bridge traffic and tenement-style buildings in certain areas can add time and cost. This guide covers 2026 pricing, what drives the quote, and how to book a verified mover.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Man and van Newcastle prices in 2026</h2>
          <p>
            Newcastle man and van rates start from <strong className="text-primary">£50 per hour</strong>. Typical ranges:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Single item collection</strong> — from £50. A fridge from Gosforth to Fenham, for example.</li>
            <li><strong className="text-primary">Studio or 1-bed flat move</strong> — from £130–£250. A Quayside apartment with underground parking is different to a top-floor flat in Byker.</li>
            <li><strong className="text-primary">2–3 bedroom house move</strong> — from £250–£480. Gosforth and Jesmond family homes tend to be larger with more furniture.</li>
            <li><strong className="text-primary">Newcastle to Edinburgh</strong> — from £250–£400. About 1.5 hours via the A1. A common cross-border route.</li>
            <li><strong className="text-primary">Newcastle to London</strong> — from £400–£650. About 4.5 hours via the A1(M). A full-day job.</li>
          </ul>
          <p>
            These are guide prices. <Link href="/man-and-van-newcastle-upon-tyne" className="text-accent font-bold hover:underline">Submit your Newcastle move details</Link> for an accurate estimate.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What affects man and van prices in Newcastle?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Steep hills</strong> — Newcastle is famously hilly. Parts of Shieldfield, Byker and Benwell are on significant slopes. Carrying furniture up or down steep paths and steps takes more time. Mention the terrain in your access notes.</li>
            <li><strong className="text-primary">Student areas</strong> — Jesmond, Heaton, Sandyford and Shieldfield have large student populations from Newcastle University and Northumbria. Peak demand is June and September. Book ahead.</li>
            <li><strong className="text-primary">Quayside and Ouseburn</strong> — Modern apartment developments along the Tyne. Underground parking with height restrictions is common. Check the clearance before your move day.</li>
            <li><strong className="text-primary">Tyne Bridge and central traffic</strong> — The Tyne Bridge and Swing Bridge are key crossings but can be congested, especially during rush hour. Moves crossing the river to Gateshead may add time.</li>
            <li><strong className="text-primary">Newcastle Clean Air Zone</strong> — Newcastle has a Clean Air Zone covering the city centre and routes over the Tyne, Swing and Redheugh bridges. Most vans registered after September 2016 are exempt. Non-compliant vans face a daily charge. Confirm with the mover if your property is inside the zone.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to book a man and van in Newcastle</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-primary">Submit your move details</strong> — Go to <Link href="/man-and-van-newcastle-upon-tyne" className="text-accent font-bold hover:underline">the Newcastle page</Link>. Enter both postcodes, move date, item list and access notes. Be specific about stairs, slopes, parking and whether you're inside the CAZ.</li>
            <li><strong className="text-primary">See a guide price</strong> — An estimated range based on your details.</li>
            <li><strong className="text-primary">A verified mover reviews your request</strong> — One approved mover looks at your postcodes and item list before quoting. They know what a Jesmond move involves versus a Byker one.</li>
            <li><strong className="text-primary">Accept or decline</strong> — If the quote works, accept it and pay the booking deposit. No obligation if it doesn't suit.</li>
          </ol>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Ready to book your Newcastle move?</h2>
          <p>
            Submit your move details on the <Link href="/man-and-van-newcastle-upon-tyne" className="text-accent font-bold hover:underline">Newcastle page</Link>. It takes under a minute, it's free, and a verified mover reviews your exact requirements before sending a quote. If you'd rather talk it through, call <a href="tel:01217511269" className="text-accent font-bold hover:underline">0121 751 1269</a> — we're open 7 days a week.
          </p>
        </div>
      </BlogPostLayout>
    </>
  );
}
