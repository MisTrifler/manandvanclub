import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Average Cost of a 3-Bedroom House Move in the UK (2026) | Man and Van Club",
  description:
    "How much does it really cost to move a 3-bedroom house in the UK in 2026? Breakdown by distance, region, access and furniture volume. Real figures based on man and van quotes — not estimates from removal company websites.",
  alternates: {
    canonical: `${baseUrl}/blog/average-cost-3-bedroom-house-move`,
  },
  openGraph: {
    title: "Average Cost of a 3-Bedroom House Move in the UK (2026)",
    description: "Real cost breakdowns for moving a 3-bed house in the UK — by distance, region and access type. Based on actual man and van quotes, not inflated estimates.",
    url: `${baseUrl}/blog/average-cost-3-bedroom-house-move`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("3-Bed House Move Cost UK")}&subtitle=${encodeURIComponent("2026 Price Breakdown")}`, width: 1200, height: 630, alt: "3-Bed House Move Cost UK" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Average Cost of a 3-Bedroom House Move in the UK (2026)",
    description: "Real cost breakdowns for moving a 3-bed house in the UK — by distance, region and access type.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("3-Bed House Move Cost UK")}&subtitle=${encodeURIComponent("2026 Price Breakdown")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Average Cost of a 3-Bedroom House Move in the UK (2026)",
  description: "How much does it really cost to move a 3-bedroom house in the UK? Breakdown by distance, region and access based on actual man and van quotes.",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/average-cost-3-bedroom-house-move`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "3-Bed House Move Cost", item: `${baseUrl}/blog/average-cost-3-bedroom-house-move` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Average Cost of a 3-Bedroom House Move"
        description="Real figures for moving a 3-bed house in 2026 — broken down by distance, region and access type. Not inflated removal company estimates."
        date="2026-07-15"
        readTime="7 min read"
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            A 3-bedroom house move is the most common type of move in the UK. It's also the one where costs vary the most, because the range of what a "3-bed house" means is huge — a terraced house in Stoke with on-street parking is a very different job from a detached house in Surrey with a double driveway.
          </p>
          <p>
            The figures below are based on man and van quotes, not removal company prices. A man and van service typically costs 30–50% less than a full removal company for a 3-bed move, depending on whether you need two movers or one.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Quick answer: the headline numbers</h2>
          <div className="bg-[#F9F9F7] rounded-2xl p-8 border border-border space-y-4">
            <div className="flex justify-between items-center border-b border-border/50 pb-3">
              <span className="font-bold text-primary">Local move (under 15 miles)</span>
              <span className="font-black text-accent text-lg">£300 – £600</span>
            </div>
            <div className="flex justify-between items-center border-b border-border/50 pb-3">
              <span className="font-bold text-primary">Mid-distance (15–50 miles)</span>
              <span className="font-black text-accent text-lg">£450 – £850</span>
            </div>
            <div className="flex justify-between items-center border-b border-border/50 pb-3">
              <span className="font-bold text-primary">Long-distance (50–150 miles)</span>
              <span className="font-black text-accent text-lg">£600 – £1,200</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-primary">Long-distance (150+ miles)</span>
              <span className="font-black text-accent text-lg">£800 – £1,500+</span>
            </div>
          </div>
          <p className="text-sm italic">
            These are typical ranges for 2026. Your actual quote depends on the factors below.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What drives the cost of a 3-bed move</h2>

          <h3 className="text-lg font-black text-primary mt-8 mb-3">1. Distance</h3>
          <p>
            Distance matters, but not as much as people think. A 3-bed local move in the same town might take 4–6 hours total (loading, driving, unloading). The same house moved 100 miles away might take 8–10 hours because of the driving time. The cost difference is mostly the extra hours, not the mileage.
          </p>

          <h3 className="text-lg font-black text-primary mt-8 mb-3">2. Access at both properties</h3>
          <p>
            This is the single biggest factor that catches people out. A 3-bed semi with a driveway where the van parks outside the front door might take 3 hours to load. The same amount of furniture from a 3-bed terrace on a narrow street with no parking, 50 metres from the van, could take 5 hours. That's a £100–£200 difference from access alone.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Driveway right outside</strong> — fastest, cheapest.</li>
            <li><strong className="text-primary">On-street parking, van outside</strong> — slightly slower.</li>
            <li><strong className="text-primary">Permit zone or parking suspension needed</strong> — adds admin time and sometimes a fee.</li>
            <li><strong className="text-primary">Long carry from van to door (50m+)</strong> — significantly slower.</li>
            <li><strong className="text-primary">Stairs or lift in a flat conversion</strong> — adds time on every trip.</li>
          </ul>

          <h3 className="text-lg font-black text-primary mt-8 mb-3">3. How much furniture you actually have</h3>
          <p>
            A 3-bed house can mean anything from a minimalist set-up with beds, a sofa and a dining table, to a fully furnished family home with three wardrobes, a piano, two sofas, a dining set, a garden shed's worth of tools, and a garage full of boxes. The volume of stuff can easily double the move time.
          </p>
          <p>
            If you're <Link href="/get-started" className="text-accent font-bold hover:underline">requesting a quote</Link>, list every item you can think of. An under-estimated inventory is the main reason final prices end up higher than initial quotes.
          </p>

          <h3 className="text-lg font-black text-primary mt-8 mb-3">4. One mover or two</h3>
          <p>
            A single man and van can move a 3-bed house, but it will take longer — usually a full day. Two movers can typically do it in 5–7 hours. The per-hour rate is higher with two movers, but the total cost often works out similar because the job finishes faster. For a 3-bed move, two movers is almost always the better choice unless you're on a very tight budget and willing to help carry.
          </p>

          <h3 className="text-lg font-black text-primary mt-8 mb-3">5. Day of the week and time of year</h3>
          <p>
            Fridays and Saturdays are the busiest moving days and some movers charge a premium. June, July and September are peak months (especially for families tied to school terms and student tenancy dates). January and February are quieter and you might get a better rate.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Regional cost differences</h2>
          <p>
            London and the South East are more expensive than everywhere else — not just because rates are higher, but because parking is harder, traffic is worse, and properties are more likely to have access challenges (flats above shops, CPZs, congestion zones).
          </p>
          <div className="bg-[#F9F9F7] rounded-2xl p-8 border border-border space-y-4">
            <div className="flex justify-between items-center border-b border-border/50 pb-3">
              <span className="font-bold text-primary">London &amp; South East</span>
              <span className="font-black text-accent">£450 – £900 (local)</span>
            </div>
            <div className="flex justify-between items-center border-b border-border/50 pb-3">
              <span className="font-bold text-primary">West Midlands</span>
              <span className="font-black text-accent">£300 – £600 (local)</span>
            </div>
            <div className="flex justify-between items-center border-b border-border/50 pb-3">
              <span className="font-bold text-primary">North West</span>
              <span className="font-black text-accent">£280 – £550 (local)</span>
            </div>
            <div className="flex justify-between items-center border-b border-border/50 pb-3">
              <span className="font-bold text-primary">Yorkshire</span>
              <span className="font-black text-accent">£280 – £550 (local)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-primary">Scotland</span>
              <span className="font-black text-accent">£300 – £600 (local)</span>
            </div>
          </div>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Extra costs to watch for</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Parking suspensions</strong> — £30–£80 per day depending on the council.</li>
            <li><strong className="text-primary">Packing service</strong> — if the mover packs for you, add £200–£400 for a 3-bed house.</li>
            <li><strong className="text-primary">Dismantling and reassembly</strong> — some movers include this, others charge extra (£45–£150).</li>
            <li><strong className="text-primary">Storage</strong> — if there's a gap between moving out and moving in, storage costs around £20–£40 per week for a 3-bed house worth of items.</li>
            <li><strong className="text-primary">Congestion charge or ULEZ</strong> — if either property is in a charged zone, factor in the fee.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">How to keep costs down</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Declutter before you move</strong> — every item you don't move is money saved. Sell it, donate it, or bin it.</li>
            <li><strong className="text-primary">Do your own packing</strong> — having everything boxed and labelled before the mover arrives saves 2–3 hours on the day.</li>
            <li><strong className="text-primary">Dismantle furniture yourself</strong> — take bed frames, wardrobes and shelving units apart before moving day.</li>
            <li><strong className="text-primary">Move mid-week if you can</strong> — Tuesday, Wednesday and Thursday are usually cheaper.</li>
            <li><strong className="text-primary">Be accurate with your item list</strong> — a precise inventory means a more accurate quote with no surprises.</li>
          </ul>

          <p>
            The most reliable way to get a fair price is to <Link href="/get-started" className="text-accent font-bold hover:underline">submit your move details</Link> and let a verified mover review the specifics before quoting. A quote based on your actual postcodes, items and access notes is always more accurate than a ballpark hourly rate.
          </p>

          <div className="bg-[#F9F9F7] rounded-2xl p-8 border border-border mt-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">Key takeaways</h3>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
              <li>A local 3-bed house move typically costs £300–£600 with a man and van.</li>
              <li>Access at both properties has a bigger impact on price than distance.</li>
              <li>Two movers usually cost about the same total as one, but finish faster.</li>
              <li>London and the South East are 30–50% more expensive than the Midlands and North.</li>
              <li>The more organised you are, the cheaper the move — it's that simple.</li>
            </ul>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
