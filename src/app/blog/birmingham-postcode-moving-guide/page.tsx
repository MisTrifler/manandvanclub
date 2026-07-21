import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Birmingham Postcode Guide | Man and Van Club",
  description:
    "Moving in Birmingham? Each B postcode area has different access, parking and route challenges. This guide covers B1 to B75 — what to tell your mover before moving day.",
  alternates: {
    canonical: `${baseUrl}/blog/birmingham-postcode-moving-guide`,
  },
  openGraph: {
    title: "Birmingham Postcode Moving Guide | B-Postcode Areas Explained",
    description: "Moving in Birmingham? Each B postcode has different access, parking and route challenges. This guide covers B1 to B75.",
    url: `${baseUrl}/blog/birmingham-postcode-moving-guide`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Birmingham Postcode Moving Guide")}&subtitle=${encodeURIComponent("Area-by-Area Move Advice")}`, width: 1200, height: 630, alt: "Birmingham Postcode Moving Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Birmingham Postcode Moving Guide | B-Postcode Areas Explained",
    description: "Moving in Birmingham? Each B postcode has different access, parking and route challenges.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Birmingham Postcode Moving Guide")}&subtitle=${encodeURIComponent("Area-by-Area Move Advice")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Birmingham Postcode Moving Guide: What to Know Before You Move",
  description: "Moving in Birmingham? Each B postcode area has different access, parking and route challenges. This guide covers B1 to B75 — what to tell your mover before moving day.",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/birmingham-postcode-moving-guide`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Birmingham Postcode Guide", item: `${baseUrl}/blog/birmingham-postcode-moving-guide` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Birmingham Postcode Moving Guide"
        description="Each Birmingham B-postcode area has different access, parking and route challenges. Here is what to tell your mover before moving day."
        date="2026-07-15"
        readTime="8 min read"
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            Birmingham is the largest city outside London, and its B-postcode districts vary enormously. A move from a Jewellery Quarter apartment (B1) is nothing like a move from a Sutton Coldfield family home (B72–B76). Knowing your postcode area helps your mover quote accurately — and avoids surprises on moving day.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">B1–B5: City Centre and Ladywood</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Parking:</strong> Most city-centre streets are Controlled Parking Zones. You will need a parking suspension from Birmingham City Council — apply at least 5 working days before your move.</li>
            <li><strong className="text-primary">Access:</strong> Many B1 apartments are in converted warehouses with lift access but tight corridors. Check whether the lift fits your largest item. Some Jewellery Quarter buildings have loading bays but restricted hours.</li>
            <li><strong className="text-primary">Clean Air Zone:</strong> B1–B5 are inside Birmingham&apos;s Clean Air Zone. Most modern vans meet the standard, but older vehicles may be charged. This is normally accounted for in the mover&apos;s quote.</li>
            <li><strong className="text-primary">Route timing:</strong> Avoid the A38 Queensway tunnels during rush hour. Middleway (A4540) is the outer ring road option.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">B12–B18: Sparkbrook, Balsall Heath and Edgbaston</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Parking:</strong> Terraced streets in B12 and B13 often have permit-only parking. Check whether your road has restrictions. Some streets near the cricket ground and university have match-day restrictions.</li>
            <li><strong className="text-primary">Access:</strong> Balsall Heath and Sparkbrook have narrow terraces with shared alleyways. Edgbaston has larger properties with driveways — much easier for van access.</li>
            <li><strong className="text-primary">Route timing:</strong> The Pershore Road (A441) and Bristol Road (A38) are busy during rush hour. Moseley and Kings Heath traffic can add 15–20 minutes at peak times.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">B13–B15: Moseley, Kings Heath and Harborne</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Parking:</strong> Moseley and Kings Heath village areas have heavy on-street parking. Driveways are common in Harborne. Some roads near Moseley village have resident-only schemes.</li>
            <li><strong className="text-primary">Access:</strong> Moseley has a mix of large Victorian semis and period conversions. Upper-floor conversions may have steep staircases. Harborne tends to have better access with front driveways.</li>
            <li><strong className="text-primary">Route timing:</strong> The A435 Alcester Road South is the main route in and out. Avoid school drop-off times (8:15–9:00 and 15:00–15:45) near B13 school zones.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">B17–B21: Bearwood, Smethwick and West Bromwich Border</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Parking:</strong> Bearwood high street area is tight. Most residential roads have free parking but narrow streets. Smethwick has similar terraced-street parking to inner Birmingham.</li>
            <li><strong className="text-primary">Access:</strong> A mix of pre-war semis in Bearwood and back-to-back terraces closer to Smethwick. Tell your mover about any shared entry or rear-access-only properties.</li>
            <li><strong className="text-primary">Route timing:</strong> The Hagley Road (A456) connects directly to the city centre. The M5 junction 1 at West Bromwich is useful for cross-city moves.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">B23–B26: Erdington, Sutton Coldfield and Walmley</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Parking:</strong> Most properties in B23–B26 have driveways or off-street parking. This is the easiest area of Birmingham for van access. Some Sutton Coldfield roads near the town centre have time-limited parking.</li>
            <li><strong className="text-primary">Access:</strong> Larger suburban homes with driveways. Some Sutton Coldfield properties are on steep hills — mention this so the mover can plan for trolley access on slopes.</li>
            <li><strong className="text-primary">Route timing:</strong> The A5127 Lichfield Road connects Erdington to the city centre. The A453 and A38 (northbound) connect Sutton Coldfield. Allow extra time in morning rush hour.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">B27–B34: Acocks Green, Sheldon and Shard End</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Parking:</strong> Mostly suburban with driveway access. Acocks Green village area can be tight. Sheldon has wide residential roads.</li>
            <li><strong className="text-primary">Access:</strong> Predominantly interwar and post-war semis and detached houses. Good access for vans. Some older Acocks Green properties have narrow side entries.</li>
            <li><strong className="text-primary">Route timing:</strong> The A41 Warwick Road and A45 Coventry Road are the main routes. The M42 (junctions 5–6) connects to Solihull and the NEC area.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">B28–B31: Hall Green, Selly Oak and Northfield</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Parking:</strong> Selly Oak student areas have heavy on-street parking and permit zones near the university. Hall Green and Northfield have more driveway access.</li>
            <li><strong className="text-primary">Access:</strong> Selly Oak has student houses with multiple occupants and shared access. Northfield and Longbridge have newer developments with good access. Bournville has some conservation-area restrictions on parking.</li>
            <li><strong className="text-primary">Route timing:</strong> The Bristol Road (A38) connects Selly Oak and Northfield to the city centre. It can be slow during rush hour. The A441 Redditch Road is an alternative from Northfield.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What to tell your mover</h2>
          <p>Wherever you are in Birmingham, these details help your mover quote accurately:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Full postcodes</strong> — Both collection and delivery. This tells the mover the distance and likely route.</li>
            <li><strong className="text-primary">Property type</strong> — Flat, maisonette, terraced house, semi, detached. Mention the floor level.</li>
            <li><strong className="text-primary">Lift access</strong> — If there is a lift, does it fit your largest item? Measure if unsure.</li>
            <li><strong className="text-primary">Parking</strong> — Driveway, on-street, permit zone, loading bay, restricted hours.</li>
            <li><strong className="text-primary">Stairs and narrow entries</strong> — Number of flights, tight corners, shared alleyways.</li>
            <li><strong className="text-primary">Clean Air Zone</strong> — If either property is inside the CAZ, mention it so the mover plans the right vehicle.</li>
            <li><strong className="text-primary">Move date and time</strong> — Avoid rush hour if possible. Mid-morning and early afternoon are often smoothest.</li>
          </ul>

          <div className="bg-[#F9F9F7] rounded-2xl border border-border p-8 mt-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">Submit your Birmingham move request</h3>
            <p className="mb-4">
              Enter your Birmingham postcodes, item list and access notes on Man and Van Club. A verified mover reviews the details and sends a quote. It is free to submit — you only pay a booking deposit if you accept.
            </p>
            <Link
              href="/get-started"
              className="btn-orange px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3"
            >
              Start Free Request
            </Link>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm font-black text-primary uppercase tracking-widest mb-3">Related</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/man-and-van-birmingham" className="text-sm text-accent font-bold hover:underline">Man and Van Birmingham</Link>
                <Link href="/man-and-van-west-midlands" className="text-sm text-accent font-bold hover:underline">West Midlands Hub</Link>
                <Link href="/man-and-van-prices" className="text-sm text-accent font-bold hover:underline">Man and Van Prices</Link>
                <Link href="/moving-cost-calculator" className="text-sm text-accent font-bold hover:underline">Cost Calculator</Link>
                <Link href="/flat-removals" className="text-sm text-accent font-bold hover:underline">Flat Moves</Link>
              </div>
            </div>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
