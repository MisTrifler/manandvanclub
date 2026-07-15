import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "London Borough Moving Guide | What to Know Before You Move | Man and Van Club",
  description:
    "Moving in London? Each borough has different parking rules, congestion charges and access challenges. This guide covers the key things to tell your mover — from ULEZ to permit parking.",
  alternates: {
    canonical: `${baseUrl}/blog/london-borough-moving-guide`,
  },
  openGraph: {
    title: "London Borough Moving Guide | What to Know Before You Move",
    description: "Moving in London? Each borough has different parking rules, congestion charges and access challenges.",
    url: `${baseUrl}/blog/london-borough-moving-guide`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("London Borough Moving Guide")}&subtitle=${encodeURIComponent("Area-by-Area Move Advice")}`, width: 1200, height: 630, alt: "London Borough Moving Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "London Borough Moving Guide | What to Know Before You Move",
    description: "Moving in London? Each borough has different parking rules, congestion charges and access challenges.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("London Borough Moving Guide")}&subtitle=${encodeURIComponent("Area-by-Area Move Advice")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "London Borough Moving Guide: What to Know Before You Move",
  description: "Moving in London? Each borough has different parking rules, congestion charges and access challenges. This guide covers what to tell your mover.",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/london-borough-moving-guide`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "London Borough Guide", item: `${baseUrl}/blog/london-borough-moving-guide` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="London Borough Moving Guide"
        description="Each London borough has different parking rules, congestion charges and access challenges. Here is what to tell your mover before moving day."
        date="2026-07-15"
        readTime="9 min read"
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            London is not one city — it is 32 boroughs plus the City, each with its own parking rules, road restrictions and property types. A move from a Croydon terrace is completely different to a move from a Camden flat, and both are different again from a Richmond house. The more you tell your mover about your specific borough, the more accurate your quote will be.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Central London: Zones 1–2</h2>
          <p>Includes Camden, Islington, Westminster, City of London, Southwark, Kensington and Chelsea, Tower Hamlets, Hackney, Lambeth.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Congestion Charge:</strong> Zone 1 is inside the Congestion Charge zone (active Mon–Fri 7am–6pm, £15 per day). Your mover may need to factor this into the quote.</li>
            <li><strong className="text-primary">ULEZ:</strong> All of Greater London is inside the ULEZ. Most modern vans meet the standard, but it is worth confirming with your mover.</li>
            <li><strong className="text-primary">Parking:</strong> Almost all central London streets are Controlled Parking Zones. You need a parking suspension from the local council — apply at least 5–10 working days before your move. Fees vary by borough (typically £30–£80 per day per bay).</li>
            <li><strong className="text-primary">Access:</strong> Many central London flats are in converted Victorian or Georgian buildings with narrow staircases and no lift. Estate blocks may have lifts but restrict moving to specific hours (often 9am–5pm weekdays only).</li>
            <li><strong className="text-primary">Loading bays:</strong> Some boroughs have dedicated loading bays, but they often have time limits (20–40 minutes). A full flat move may need a parking suspension instead.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">North London: Zones 2–4</h2>
          <p>Includes Barnet, Enfield, Haringey, Harringey, Finchley, Walthamstow, Edgware, Barnet.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Parking:</strong> CPZs extend into most Zone 2–3 areas. Barnet and Enfield have more free-parking roads than inner boroughs. Check your specific road — some roads near tube stations have restricted hours.</li>
            <li><strong className="text-primary">Access:</strong> North London has a mix of 1930s semis (good driveway access), Edwardian terraces (narrow front entries) and newer developments with allocated parking. Tell your mover about any steep driveways or tight side entries.</li>
            <li><strong className="text-primary">Route timing:</strong> The North Circular (A406) is the main cross-north route. It can be slow during rush hour. The A1 and A10 connect north London to the M25. Allow extra time if crossing the North Circular during peak hours.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">South London: Zones 2–5</h2>
          <p>Includes Croydon, Bromley, Lewisham, Greenwich, Bexley, Sutton, Mitcham, Wimbledon.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Parking:</strong> Croydon and Bromley have more suburban roads with free parking. Lewisham and Greenwich inner areas have CPZs. Wimbledon village and South Wimbledon have permit-only streets. Sutton is generally easier for van access.</li>
            <li><strong className="text-primary">Access:</strong> South London varies from Victorian terraces in Lewisham to suburban semis in Bromley and Sutton. Greenwich has a mix of conservation-area properties and modern developments. Croydon has newer apartment blocks with loading bays.</li>
            <li><strong className="text-primary">Route timing:</strong> The South Circular (A205) is notoriously slow — avoid if possible. The A23 connects Croydon to central London. The A2 connects Greenwich and Bexley to the M25 and Kent. The A3 connects Wimbledon and Sutton to the M25 and Surrey.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">East London: Zones 2–5</h2>
          <p>Includes Stratford, Ilford, Walthamstow, Wood Green, Tottenham, Romford, Barking.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Parking:</strong> Stratford and Walthamstow have CPZs near stations. Ilford and Romford have more free-parking roads. New developments around Stratford often have dedicated loading bays but restrict moving hours.</li>
            <li><strong className="text-primary">Access:</strong> East London has a high proportion of purpose-built flats and newer developments. Many have lifts but strict building management rules about which hours moves can happen. Older terraces in Walthamstow and Tottenham have narrow shared entries.</li>
            <li><strong className="text-primary">Route timing:</strong> The A12 and A13 are the main east–west routes. The A406 North Circular crosses east London. The M11 connects to Essex and Cambridge. Stratford High Street can be very slow during rush hour.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">West London: Zones 2–5</h2>
          <p>Includes Ealing, Harrow, Hounslow, Acton, Chiswick, Richmond, Kingston, Twickenham, Wembley.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Parking:</strong> Inner west London (Ealing Broadway, Chiswick, Acton) has CPZs. Harrow, Hounslow outer areas and Kingston have more free parking. Richmond and Twickenham have CPZs near the town centres. Wembley has event-day restrictions near the stadium.</li>
            <li><strong className="text-primary">Access:</strong> Ealing and Harrow have a mix of 1930s semis with driveways and period conversions. Chiswick and Richmond have larger properties, some on narrow lanes. Hounslow has a mix of terraces and newer developments near Heathrow.</li>
            <li><strong className="text-primary">Route timing:</strong> The A4 Great West Road connects Hounslow and Chiswick to central London. The A40 connects Ealing and Wembley. The M4 and M3 connect west London to the M25, Heathrow and the South West. Expect delays near Heathrow during peak hours.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Parking suspensions by borough</h2>
          <p>Most London boroughs require you to apply for a parking suspension before your move. Here is a quick reference:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Camden:</strong> Apply online, 5 working days notice. £40–£80 per bay per day.</li>
            <li><strong className="text-primary">Islington:</strong> Apply online, 5 working days notice. £30–£60 per bay per day.</li>
            <li><strong className="text-primary">Hackney:</strong> Apply online, 5 working days notice. £30–£70 per bay per day.</li>
            <li><strong className="text-primary">Southwark:</strong> Apply online, 5 working days notice. £25–£55 per bay per day.</li>
            <li><strong className="text-primary">Lambeth:</strong> Apply online, 5 working days notice. £30–£65 per bay per day.</li>
            <li><strong className="text-primary">Croydon:</strong> Apply online, 3 working days notice. £15–£40 per bay per day.</li>
            <li><strong className="text-primary">Ealing:</strong> Apply online, 3 working days notice. £20–£45 per bay per day.</li>
          </ul>
          <p className="text-sm">Fees are approximate and may change. Check your local council website for current rates and application deadlines.</p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What to tell your mover</h2>
          <p>Wherever you are in London, these details help your mover quote accurately:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Full postcodes</strong> — Both collection and delivery.</li>
            <li><strong className="text-primary">Borough name</strong> — Different boroughs have different parking rules and fees.</li>
            <li><strong className="text-primary">Property type</strong> — Flat, maisonette, terraced house, semi, detached. Floor level and whether there is a lift.</li>
            <li><strong className="text-primary">Parking situation</strong> — Driveway, CPZ, permit zone, loading bay, or need a suspension.</li>
            <li><strong className="text-primary">Building rules</strong> — Many London apartment blocks restrict moving to specific hours and require advance booking of the service lift.</li>
            <li><strong className="text-primary">Congestion Charge and ULEZ</strong> — Mention if either property is inside these zones.</li>
            <li><strong className="text-primary">Move date and time</strong> — Mid-week moves are often easier in London. Avoid peak hours if possible.</li>
          </ul>

          <div className="bg-[#F9F9F7] rounded-2xl border border-border p-8 mt-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">Submit your London move request</h3>
            <p className="mb-4">
              Enter your London postcodes, item list and access notes on Man and Van Club. A verified mover reviews the details and sends a quote. It is free to submit — you only pay a booking deposit if you accept.
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
                <Link href="/man-and-van-london" className="text-sm text-accent font-bold hover:underline">Man and Van London</Link>
                <Link href="/man-and-van-prices" className="text-sm text-accent font-bold hover:underline">Man and Van Prices</Link>
                <Link href="/moving-cost-calculator" className="text-sm text-accent font-bold hover:underline">Cost Calculator</Link>
                <Link href="/flat-removals" className="text-sm text-accent font-bold hover:underline">Flat Moves</Link>
                <Link href="/house-removals" className="text-sm text-accent font-bold hover:underline">House Removals</Link>
              </div>
            </div>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
