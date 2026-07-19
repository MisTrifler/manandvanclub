import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Manchester: Prices & How to Book (2026) | Man and Van Club",
  description:
    "Man and van Manchester prices for 2026. Hourly rates, local area tips, how to book a verified mover and what to have ready before your move day in Manchester.",
  alternates: {
    canonical: `${baseUrl}/blog/man-and-van-manchester-prices-how-to-book`,
  },
  openGraph: {
    title: "Man and Van Manchester: Prices & How to Book (2026)",
    description: "Manchester man and van prices, booking advice and local access tips for 2026.",
    url: `${baseUrl}/blog/man-and-van-manchester-prices-how-to-book`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Manchester")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`, width: 1200, height: 630, alt: "Man and Van Manchester: Prices & How to Book" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Manchester: Prices & How to Book (2026)",
    description: "Manchester man and van prices, booking advice and local access tips for 2026.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Manchester")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Man and Van Manchester: Prices & How to Book (2026)",
  description: "Manchester man and van prices, booking advice and local access tips for 2026.",
  datePublished: "2026-07-16",
  dateModified: "2026-07-16",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/man-and-van-manchester-prices-how-to-book`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Man and Van Manchester Prices", item: `${baseUrl}/blog/man-and-van-manchester-prices-how-to-book` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Man and Van Manchester: Prices & How to Book (2026)"
        description="Current Manchester man and van prices, what affects the cost, and how to book a verified mover for your next move in Manchester."
        date="2026-07-16"
        readTime="7 min read"
        breadcrumbs={[{ label: "Cost Guides", href: "/blog/cost-guides" }]}
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            Manchester is one of the fastest-growing cities in the UK, and that means a lot of people are moving in, out and around it. Whether you're relocating from Salford to Didsbury, moving into a city-centre apartment, or heading down the M6 to Birmingham, this guide covers what you'll pay for a man and van in Manchester in 2026 and how to book one without the usual hassle.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Man and van Manchester prices in 2026</h2>
          <p>
            Manchester rates start from <strong className="text-primary">£19 per hour</strong>, in line with the wider North West average. The city centre commands slightly more than suburban areas, but overall Manchester is cheaper than London and comparable to Birmingham. Typical moves cost:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Single item collection or delivery</strong> — from £19. Picking up a wardrobe from a shop in the Arndale or delivering a sofa to Sale.</li>
            <li><strong className="text-primary">1-bed flat or studio</strong> — from £140–£250. City-centre apartments with underground car parks are easier for loading than terraced houses in Levenshulme.</li>
            <li><strong className="text-primary">2–3 bedroom house</strong> — from £280–£520. Suburban moves in Altrincham, Stockport and Prestwich tend to be straightforward with driveway access.</li>
            <li><strong className="text-primary">Manchester to Birmingham</strong> — from £300–£450. See <Link href="/routes/manchester-to-birmingham" className="text-accent font-bold hover:underline">Manchester to Birmingham route</Link>.</li>
            <li><strong className="text-primary">Manchester to London</strong> — from £400–£600. See <Link href="/routes/manchester-to-london" className="text-accent font-bold hover:underline">Manchester to London route</Link>.</li>
          </ul>
          <p>
            For an accurate quote based on your exact postcodes, <Link href="/man-and-van-manchester" className="text-accent font-bold hover:underline">submit your Manchester move details</Link> — it's free.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What affects Manchester move prices?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">City centre parking</strong> — Deansgate, Spinningfields and the Northern Quarter have limited loading bays and time-restricted parking. If the mover has to park around the corner and walk 50 metres, it adds time.</li>
            <li><strong className="text-primary">Salford Quays and MediaCity</strong> — New-build apartments often have allocated parking but narrow underground access. Check the height clearance if the mover is bringing a Luton van.</li>
            <li><strong className="text-primary">Terraced houses in Longsight, Rusholme and Levenshulme</strong> — Back-entry access and on-street parking only. Mention this in your request so the mover can plan accordingly.</li>
            <li><strong className="text-primary">Student areas</strong> — Fallowfield and Withington see massive demand in July and September. Prices rise during these weeks — book early.</li>
            <li><strong className="text-primary">M60 traffic</strong> — Cross-city moves during rush hour can add 30–45 minutes. The M60 ring road is notorious for delays around junctions 12–18.</li>
            <li><strong className="text-primary">Suburban driveway access</strong> — Altrincham, Cheadle, Wilmslow and Prestwich usually have driveways, which makes loading and unloading much faster.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to book a man and van in Manchester</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-primary">Submit your move details</strong> — Go to <Link href="/man-and-van-manchester" className="text-accent font-bold hover:underline">the Manchester page</Link> and fill in your postcodes, move date, item list and access notes.</li>
            <li><strong className="text-primary">See a guide price</strong> — You'll get an estimated range based on your details.</li>
            <li><strong className="text-primary">A verified mover reviews your request</strong> — One approved mover reviews your exact details and sends a quote.</li>
            <li><strong className="text-primary">Accept or decline</strong> — No obligation. Your details stay private until you accept a quote.</li>
          </ol>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What to have ready before you submit</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Both postcodes in full</strong> — M1 1AA to SK8 2BB tells the mover the exact distance and likely route.</li>
            <li><strong className="text-primary">Floor number and lift</strong> — Ground floor with driveway access versus 4th floor with a small lift are very different jobs.</li>
            <li><strong className="text-primary">Parking situation</strong> — Driveway, on-street free, permit zone, loading bay?</li>
            <li><strong className="text-primary">Item list</strong> — Be specific about the big items. "1 double bed, 1 wardrobe, 1 sofa, 1 TV, 8 boxes" is much more useful than "1-bed flat."</li>
            <li><strong className="text-primary">Preferred date and flexibility</strong> — Weekday moves are usually cheaper than weekends.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Ready to book your Manchester move?</h2>
          <p>
            Go to <Link href="/man-and-van-manchester" className="text-accent font-bold hover:underline">manandvanclub.co.uk/manchester</Link>, enter your details and a verified mover reviews your request before quoting. Free to submit, no obligation. Or call <a href="tel:01217511269" className="text-accent font-bold hover:underline">0121 751 1269</a> — open 7 days, 8am to 8pm.
          </p>
          <p>
            Moving from Manchester to another city? Check our <Link href="/routes" className="text-accent font-bold hover:underline">route pages</Link> for <Link href="/routes/manchester-to-birmingham" className="text-accent font-bold hover:underline">Manchester to Birmingham</Link>, <Link href="/routes/manchester-to-london" className="text-accent font-bold hover:underline">Manchester to London</Link> and <Link href="/routes/manchester-to-leeds" className="text-accent font-bold hover:underline">Manchester to Leeds</Link>.
          </p>
        </div>
      </BlogPostLayout>
    </>
  );
}
