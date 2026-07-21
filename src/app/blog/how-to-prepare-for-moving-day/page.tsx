import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "How to Prepare for Moving Day | Man and Van Club",
  description:
    "A practical moving day checklist covering packing, access notes, parking arrangements and everything you need to do before, during and after your move.",
  alternates: {
    canonical: `${baseUrl}/blog/how-to-prepare-for-moving-day`,
  },
  openGraph: {
    title: "How to Prepare for Moving Day: Complete Checklist",
    description: "A practical moving day checklist covering packing, access notes, parking arrangements and everything you need to do before, during and after your move.",
    url: `${baseUrl}/blog/how-to-prepare-for-moving-day`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("How to Prepare for Moving Day")}&subtitle=${encodeURIComponent("Checklist & Tips")}`, width: 1200, height: 630, alt: "How to Prepare for Moving Day" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Prepare for Moving Day: Complete Checklist",
    description: "A practical moving day checklist covering packing, access notes, parking and everything you need to do before, during and after your move.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("How to Prepare for Moving Day")}&subtitle=${encodeURIComponent("Checklist & Tips")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Prepare for Moving Day: A Complete Checklist",
  description: "A practical moving day checklist covering packing, access notes, parking and everything you need to do before, during and after your move.",
  datePublished: "2026-07-14",
  dateModified: "2026-07-14",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/how-to-prepare-for-moving-day`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Moving Day Checklist", item: `${baseUrl}/blog/how-to-prepare-for-moving-day` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="How to Prepare for Moving Day"
        description="A complete checklist covering everything you need to do before, during and after your move — from packing order to access notes."
        date="2026-07-14"
        readTime="7 min read"
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            The difference between a stressful move and a smooth one usually comes down to preparation. This checklist covers everything from two weeks before moving day to the final walkthrough, with practical tips that movers appreciate.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Two weeks before</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Confirm your moving date</strong> — Lock in the date with your mover and make sure both properties are accessible on the day.</li>
            <li><strong className="text-primary">Start decluttering</strong> — Sell, donate or bin anything you do not want to move. Fewer items means a faster, cheaper move.</li>
            <li><strong className="text-primary">Order packing supplies</strong> — Boxes, tape, bubble wrap, marker pens. Order more boxes than you think you need.</li>
            <li><strong className="text-primary">Notify important contacts</strong> — Let your utility providers, council, bank, employer and GP surgery know your new address.</li>
            <li><strong className="text-primary">Arrange parking</strong> — Check whether you need a parking suspension or permit at either property. This is especially important in city centres and areas with Controlled Parking Zones.</li>
            <li><strong className="text-primary">Check access at both ends</strong> — Note any stairs, lifts, narrow doorways, low ceilings or long walks from the van to the property. Tell your mover about these in advance.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">One week before</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Pack non-essentials first</strong> — Books, ornaments, out-of-season clothes, spare bedding. Label every box with the room it belongs to.</li>
            <li><strong className="text-primary">Take photos of electronics</strong> — Photograph how your TV, hi-fi and router are connected. It saves time when you are setting up at the new place.</li>
            <li><strong className="text-primary">Arrange childcare or pet care</strong> — Moving day is safer and less stressful for children and pets if they are elsewhere.</li>
            <li><strong className="text-primary">Defrost the freezer</strong> — Unplug it 24–48 hours before the move and empty the contents.</li>
            <li><strong className="text-primary">Confirm details with your mover</strong> — Send your final item list, confirm the time, and double-check the collection and delivery addresses.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">The day before</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Pack an essentials bag</strong> — Toiletries, phone charger, change of clothes, important documents, snacks and water. Keep this with you, not in the van.</li>
            <li><strong className="text-primary">Finish packing</strong> — Everything except what you need overnight should be boxed and sealed.</li>
            <li><strong className="text-primary">Dismantle furniture if needed</strong> — Beds, wardrobes and tables that come apart are easier and faster to move when already dismantled.</li>
            <li><strong className="text-primary">Clear a path</strong> — Make sure there is a clear route from the rooms to the front door at both properties.</li>
            <li><strong className="text-primary">Note the meter readings</strong> — Take photos of gas, electric and water meters at the property you are leaving.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Moving day morning</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Strip the beds</strong> — Pack the bedding last — it is usually one of the final items loaded.</li>
            <li><strong className="text-primary">Check every room, cupboard and shelf</strong> — Go through the property systematically before the mover arrives.</li>
            <li><strong className="text-primary">Be ready when the mover arrives</strong> — The clock usually starts when the mover gets to your door. Having everything packed and ready saves time and money.</li>
            <li><strong className="text-primary">Point out fragile items</strong> — Tell the mover which boxes and items need extra care before loading starts.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">During the move</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Stay available</strong> — The mover may need to ask questions about where items go or how to access certain areas.</li>
            <li><strong className="text-primary">Do a final walkthrough</strong> — Before leaving the old property, check every room, the loft, the shed and the garden one last time.</li>
            <li><strong className="text-primary">Lock up and hand over keys</strong> — Once you are satisfied nothing has been left behind.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">After the move</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Check items as they are unloaded</strong> — Note any damage before the mover leaves.</li>
            <li><strong className="text-primary">Take new meter readings</strong> — Photograph the meters at your new property.</li>
            <li><strong className="text-primary">Prioritise the essentials</strong> — Set up beds, find the kettle, and sort the bathroom first. Everything else can wait.</li>
            <li><strong className="text-primary">Update your address</strong> — DVLA, electoral roll, subscriptions and online accounts.</li>
            <li><strong className="text-primary">Leave a review</strong> — If your mover did a good job, a review helps them and helps other customers find a reliable service.</li>
          </ul>

          <div className="bg-[#F9F9F7] rounded-2xl border border-border p-8 mt-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">Submit your move details</h3>
            <p className="mb-4">
              The Man and Van Club form asks for the details that help a mover plan your move accurately: postcodes, item list, access notes, parking and your preferred date. It is free to submit.
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
                <Link href="/man-and-van-prices" className="text-sm text-accent font-bold hover:underline">Man and Van Prices</Link>
                <Link href="/man-and-van-near-me" className="text-sm text-accent font-bold hover:underline">Find a Mover Near You</Link>
                <Link href="/man-and-van-west-midlands" className="text-sm text-accent font-bold hover:underline">West Midlands</Link>
                <Link href="/man-and-van-london" className="text-sm text-accent font-bold hover:underline">London</Link>
                <Link href="/man-and-van-manchester" className="text-sm text-accent font-bold hover:underline">Manchester</Link>
              </div>
            </div>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
