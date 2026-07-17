import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Man and Van Sheffield: Prices & How to Book (2026) | Man and Van Club",
  description: "Man and van Sheffield prices for 2026. Hourly rates, what affects the cost, how to book a verified mover and what to have ready before your move day in Sheffield.",
  alternates: { canonical: `${baseUrl}/blog/man-and-van-sheffield-prices-how-to-book` },
  openGraph: {
    title: "Man and Van Sheffield: Prices & How to Book (2026)",
    description: "Sheffield man and van prices, booking advice and local access tips for 2026.",
    url: `${baseUrl}/blog/man-and-van-sheffield-prices-how-to-book`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Sheffield")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`, width: 1200, height: 630, alt: "Man and Van Sheffield: Prices & How to Book" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Man and Van Sheffield: Prices & How to Book (2026)",
    description: "Sheffield man and van prices, booking advice and local access tips for 2026.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Sheffield")}&subtitle=${encodeURIComponent("Prices & How to Book 2026")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Man and Van Sheffield: Prices & How to Book (2026)",
  description: "Sheffield man and van prices, booking advice and local access tips for 2026.",
  datePublished: "2026-07-16",
  dateModified: "2026-07-16",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/man-and-van-sheffield-prices-how-to-book`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Man and Van Sheffield Prices", item: `${baseUrl}/blog/man-and-van-sheffield-prices-how-to-book` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Man and Van Sheffield: Prices & How to Book (2026)"
        description="Current Sheffield man and van prices, what affects the cost, and how to book a verified mover for your next move in Sheffield."
        date="2026-07-16"
        readTime="7 min read"
        breadcrumbs={[{ label: "Cost Guides", href: "/blog/cost-guides" }]}
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            Sheffield sits at the edge of the Peak District, and that geography makes a real difference when you're moving house. A flat in the city centre is one thing; a terraced house on a steep hill in Walkley or a cottage out in the Hope Valley is another. This guide covers current 2026 pricing for Sheffield moves, what actually affects the quote, and how to submit a request so a verified mover knows exactly what they're dealing with.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Man and van Sheffield prices in 2026</h2>
          <p>
            Sheffield man and van rates typically start from <strong className="text-primary">£45 per hour</strong>. That's the going rate for a standard van with one mover doing local work within the city. Most Sheffield moves fall into these ranges:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Single item collection</strong> — from £45. A sofa picked up from Meadowhall and delivered to Heeley, for example.</li>
            <li><strong className="text-primary">Studio or 1-bed flat move</strong> — from £140–£260. Depends heavily on which floor and whether there's a lift. City-centre apartments near the Moor are different to a ground-floor flat in Crookes.</li>
            <li><strong className="text-primary">2–3 bedroom house move</strong> — from £250–£500. Sheffield's terraces in areas like Walkley and Nether Edge can be deceptively full, and the narrow staircases slow things down.</li>
            <li><strong className="text-primary">Sheffield to London</strong> — from £350–£550 for a full van load. The M1 is the direct route — about 2 hours 45 minutes if the traffic behaves.</li>
          </ul>
          <p>
            These are guide prices, not fixed quotes. The final number depends on stairs, parking, how packed your boxes are, and whether you need the mover on a Saturday or a Tuesday. <Link href="/man-and-van-sheffield" className="text-accent font-bold hover:underline">Submit your Sheffield move details</Link> for an accurate guide price.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What affects man and van prices in Sheffield?</h2>
          <p>
            Sheffield has its own set of factors that affect pricing:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Hills</strong> — Sheffield is famously built on seven hills (actually more like eight). Walkley, Crookes, Nether Edge and Sharrow all sit on slopes. Carrying furniture up or down steep paths and steps adds time — sometimes a lot of time. Mention the terrain in your access notes.</li>
            <li><strong className="text-primary">Narrow terraced streets</strong> — Areas like Walkley, Broomhill and Heeley have Victorian terraces with no driveways and tight street parking. On moving day, you may need a parking suspension from Sheffield City Council.</li>
            <li><strong className="text-primary">Student moves</strong> — Sheffield has two large universities. Student houses in Broomhill, Crookes and Walkley turn over heavily in June and September. Demand pushes availability down and prices up during those weeks.</li>
            <li><strong className="text-primary">Peak District access</strong> — If you're moving to or from villages like Hathersage, Bamford or Hope, the roads are narrow and winding. A large Luton van may not fit down some lanes. Add your full address so the mover can check the route.</li>
            <li><strong className="text-primary">City centre apartments</strong> — New developments around the Moor, Heart of the City and Kelham Island often have underground car parks with height restrictions and tight corners. Check the clearance before moving day.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to book a man and van in Sheffield</h2>
          <p>
            The process is straightforward:
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong className="text-primary">Submit your move details</strong> — Go to <Link href="/man-and-van-sheffield" className="text-accent font-bold hover:underline">the Sheffield page</Link> and enter your collection and delivery postcodes, move date, item list and any access notes. Be specific about stairs, slopes, parking and lift access.</li>
            <li><strong className="text-primary">See a guide price</strong> — You'll see an estimated range based on your details.</li>
            <li><strong className="text-primary">A verified mover reviews your request</strong> — One approved mover looks at your postcodes, stairs and item list before quoting. They're not guessing — they know what a Walkley terrace move involves versus a Kelham Island apartment.</li>
            <li><strong className="text-primary">Accept or decline</strong> — If the quote works, accept it and pay the booking deposit (which comes off the final balance). If not, no obligation. Your contact details stay private until you accept.</li>
          </ol>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Sheffield areas with the most move requests</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Walkley and Crookes (S6)</strong> — Student and professional housing on steep hills. Narrow streets, no driveways. Allow extra time.</li>
            <li><strong className="text-primary">Broomhill and Fulwood (S10)</strong> — Mix of student houses and family homes near the Western Bank campus. Parking can be tight near Whitham Road.</li>
            <li><strong className="text-primary">Kelham Island and Neepsend (S3)</strong> — Warehouse conversions and new-build apartments. Check loading bay access and lift dimensions.</li>
            <li><strong className="text-primary">Nether Edge and Sharrow (S7/S11)</strong> — Period properties with character and narrow hallways. Beautiful homes, awkward sofas.</li>
            <li><strong className="text-primary">Hillsborough and Malin Bridge (S6)</strong> — Family homes with more driveways and easier van access than the hills further south.</li>
            <li><strong className="text-primary">Dore and Totley (S17)</strong> — On the edge of the Peak District. Larger properties, easier parking, but further from the city centre.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Ready to book your Sheffield move?</h2>
          <p>
            Submit your move details on the <Link href="/man-and-van-sheffield" className="text-accent font-bold hover:underline">Sheffield page</Link>. It takes under a minute, it's free, and a verified mover reviews your exact requirements before sending a quote. If you'd rather talk it through, call <a href="tel:01217511269" className="text-accent font-bold hover:underline">0121 751 1269</a> — we're open 7 days a week.
          </p>
        </div>
      </BlogPostLayout>
    </>
  );
}
