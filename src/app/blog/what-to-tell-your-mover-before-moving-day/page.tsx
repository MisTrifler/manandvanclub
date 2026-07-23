import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "What to Tell Your Mover Before Moving Day | Man and Van Club",
  description:
    "The details that make the difference between a smooth move and a stressful one. Parking, access, stairs, lifts, item sizes and timing — explained clearly.",
  alternates: {
    canonical: `${baseUrl}/blog/what-to-tell-your-mover-before-moving-day`,
  },
  openGraph: {
    title: "What to Tell Your Mover Before Moving Day",
    description: "The details that make the difference between a smooth move and a stressful one. Parking, access, stairs, lifts, item sizes and timing — explained clearly.",
    url: `${baseUrl}/blog/what-to-tell-your-mover-before-moving-day`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("What to Tell Your Mover")}&subtitle=${encodeURIComponent("Essential Info Before Moving Day")}`, width: 1200, height: 630, alt: "What to Tell Your Mover" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What to Tell Your Mover Before Moving Day",
    description: "The details that make the difference between a smooth move and a stressful one. Parking, access, stairs, lifts, item sizes and timing.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("What to Tell Your Mover")}&subtitle=${encodeURIComponent("Essential Info Before Moving Day")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What to Tell Your Mover Before Moving Day",
  description: "The details that make the difference between a smooth move and a stressful one. Parking, access, stairs, lifts, item sizes and timing explained.",
  datePublished: "2026-07-14",
  dateModified: "2026-07-14",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/what-to-tell-your-mover-before-moving-day`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "What to Tell Your Mover", item: `${baseUrl}/blog/what-to-tell-your-mover-before-moving-day` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="What to Tell Your Mover Before Moving Day"
        description="The details that make the difference between a smooth move and a stressful one — parking, access, stairs, lifts, item sizes and timing."
        date="2026-07-14"
        readTime="4 min read"
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            The more your mover knows in advance, the smoother your move will be. Surprises on moving day — like a flight of stairs you forgot to mention, or a parking restriction you did not know about — can add time, cost and stress. Here is what to tell your mover before the van arrives.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">1. Your exact postcodes</h2>
          <p>
            The full postcodes for both the collection and delivery addresses. This lets the mover plan the route, estimate the driving time and factor in tolls, congestion charges or low-emission zones. In London, this is essential — the Congestion Charge zone and ULEZ boundaries can add significant costs if the route crosses them.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">2. A complete item list</h2>
          <p>
            List everything you want moved. Do not forget:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Furniture</strong> — Include dimensions if possible, especially for large items like sofas, wardrobes and beds.</li>
            <li><strong className="text-primary">White goods</strong> — Washing machines, fridges and freezers are heavy and may need a two-person lift.</li>
            <li><strong className="text-primary">Boxes and bags</strong> — An estimate of the number helps the mover choose the right van size.</li>
            <li><strong className="text-primary">Specialist items</strong> — Pianos, fish tanks, gym equipment, large mirrors or artwork.</li>
          </ul>
          <p>
            If you are not sure about exact quantities, give your best estimate. An approximate list is far better than no list.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">3. Parking at both addresses</h2>
          <p>
            This is one of the most common issues on moving day. Tell your mover:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Is there a driveway, dedicated parking space or loading bay?</li>
            <li>Is there on-street parking? Is it permit-only or restricted by time?</li>
            <li>Will you need to arrange a parking suspension with the council?</li>
            <li>How far is the parking from the property entrance?</li>
          </ul>
          <p>
            In cities like Birmingham, London and Manchester, parking can be the biggest factor in how long a move takes. If the van has to park 100 metres from the front door because of permit zones, the loading and unloading will take significantly longer.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">4. Stairs, lifts and access</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Which floor?</strong> — Ground floor is fastest. Every additional floor adds time.</li>
            <li><strong className="text-primary">Is there a lift?</strong> — If yes, how big is it? Some lifts are too small for furniture.</li>
            <li><strong className="text-primary">Narrow staircases or corridors</strong> — Older properties, especially terraces and conversion flats, often have tight corners and low ceilings.</li>
            <li><strong className="text-primary">Garden access</strong> — If items need to come through the garden or a side gate, mention it.</li>
            <li><strong className="text-primary">Security requirements</strong> — Key fobs, entry codes, concierge sign-in — these can slow down the move if the mover is not prepared.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">5. Your preferred date and time</h2>
          <p>
            Give your preferred date and any flexibility you have. If you can move on a Tuesday instead of a Saturday, it may be easier to book and potentially cheaper. Also let the mover know if there are any time constraints — for example, if you need to collect keys by a certain time.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">6. Do you need help lifting?</h2>
          <p>
            If you are unable to help with loading and unloading, or if you have particularly heavy items, let the mover know. They may need to bring a second person, which affects the quote but means the move gets done safely.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">7. Anything unusual</h2>
          <p>
            If there is anything out of the ordinary — a very narrow doorway, a tight turn on the stairs, an item that needs to be taken apart before it will fit, or a time window when the building is only accessible — mention it upfront. The mover would rather know in advance than discover it on the day.
          </p>

          <div className="bg-[#F9F9F7] rounded-2xl border border-border p-8 mt-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">Tell us everything on the form</h3>
            <p className="mb-4">
              The Man and Van Club request form asks for your postcodes, item list, access notes, parking details and preferred date. The more complete your submission, the more accurate your quote will be. It is free to submit — a verified mover reviews your details before you decide whether to book.
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
                <Link href="/house-removals" className="text-sm text-accent font-bold hover:underline">House Removals</Link>
                <Link href="/flat-removals" className="text-sm text-accent font-bold hover:underline">Flat Moves</Link>
                <Link href="/furniture-delivery-service" className="text-sm text-accent font-bold hover:underline">Furniture Delivery</Link>
                <Link href="/man-and-van-near-me" className="text-sm text-accent font-bold hover:underline">Find a Mover Near You</Link>
                <Link href="/man-and-van-prices" className="text-sm text-accent font-bold hover:underline">Man and Van Prices</Link>
              </div>
            </div>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
