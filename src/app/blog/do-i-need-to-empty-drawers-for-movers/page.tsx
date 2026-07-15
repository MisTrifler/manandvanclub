import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "Do I Need to Empty Drawers for Movers? | Man and Van Club",
  description:
    "The honest answer: it depends on the furniture, what's inside it, and how it's being moved. Here's what you can leave in, what you must empty, and why getting it wrong can damage your furniture — or your mover's back.",
  alternates: {
    canonical: `${baseUrl}/blog/do-i-need-to-empty-drawers-for-movers`,
  },
  openGraph: {
    title: "Do I Need to Empty Drawers for Movers?",
    description: "Can you leave clothes in drawers when moving house? It depends on the furniture. Here's what to empty and what you can leave.",
    url: `${baseUrl}/blog/do-i-need-to-empty-drawers-for-movers`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Empty Drawers for Movers?")}&subtitle=${encodeURIComponent("What You Need to Know")}`, width: 1200, height: 630, alt: "Empty Drawers for Movers?" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Do I Need to Empty Drawers for Movers?",
    description: "Can you leave clothes in drawers when moving? It depends on the furniture. Here's what to empty and what you can leave.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Empty Drawers for Movers?")}&subtitle=${encodeURIComponent("What You Need to Know")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Do I Need to Empty Drawers for Movers?",
  description: "Can you leave clothes in drawers when moving house? What to empty, what you can leave, and why getting it wrong matters.",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/do-i-need-to-empty-drawers-for-movers`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Empty Drawers for Movers?", item: `${baseUrl}/blog/do-i-need-to-empty-drawers-for-movers` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="Do I Need to Empty Drawers for Movers?"
        description="The honest answer — it depends on the furniture, what's in it, and how it's being moved. Here's the breakdown."
        date="2026-07-15"
        readTime="5 min read"
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            This is one of the most common questions movers get asked, and the answer isn't a simple yes or no. It depends on three things: the type of furniture, what's inside it, and whether the furniture is being carried or dismantled.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">The short version</h2>
          <div className="bg-[#F9F9F7] rounded-2xl p-8 border border-border space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-accent font-black text-xl mt-0.5">✓</span>
              <div><strong className="text-primary">Leave clothes in</strong> — Sturdy chest of drawers with lightweight clothes (t-shirts, socks, underwear) that's being carried, not turned on its side.</div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-accent font-black text-xl mt-0.5">✗</span>
              <div><strong className="text-primary">Empty completely</strong> — Wardrobes, bedside tables with heavy items, any furniture being dismantled, IKEA-style flat-pack furniture, antique or fragile pieces.</div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-accent font-black text-xl mt-0.5">△</span>
              <div><strong className="text-primary">Use judgement</strong> — Chest of drawers with heavy items (jeans, books, files) or drawers that don't stay shut when tilted.</div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Why it matters: what can go wrong</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-primary">Drawers slide out</strong> — When a piece of furniture is tilted to go through a doorway or down stairs, the drawers can fly open. If there's anything breakable inside, it's going to hit the floor. Even clothes can fall out and get dirty or snagged.</li>
            <li><strong className="text-primary">The furniture breaks</strong> — A chest of drawers that's designed to hold 20kg of clothes becomes a 50kg+ unit when it's fully loaded. The joints, runners and base panel aren't built for that weight to be shifted around while someone carries it. Flat-pack furniture is particularly vulnerable — the cam locks and dowels can pop under the strain.</li>
            <li><strong className="text-primary">Someone gets hurt</strong> — A loaded wardrobe or chest of drawers is significantly heavier than an empty one. Movers plan how they'll lift something based on what it is. If it's heavier than expected because it's full, that can cause back strains or the piece to be dropped.</li>
            <li><strong className="text-primary">Doors and drawers warp</strong> — Wardrobes with hanging rails and clothes inside put uneven pressure on the frame when the wardrobe is tilted. The doors can buckle and never close properly again.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Furniture type by type</h2>

          <h3 className="text-lg font-black text-primary mt-8 mb-3">Chest of drawers (solid wood)</h3>
          <p>
            You can usually leave lightweight clothes in if the drawers have decent runners and stay shut when the unit is tilted. Remove anything heavy from the top drawers — the higher the weight, the more it strains the frame when carried. If the drawers don't have latches or locks, tape them shut with masking tape (not Sellotape — it leaves residue).
          </p>

          <h3 className="text-lg font-black text-primary mt-8 mb-3">Chest of drawers (flat-pack / IKEA)</h3>
          <p>
            Empty it. Flat-pack furniture joints are not designed to carry the combined weight of furniture plus contents while being moved. The cam bolts and wooden dowels can shear under the load. It's not worth the risk — it takes 10 minutes to empty the drawers and you avoid potentially writing off a piece of furniture.
          </p>

          <h3 className="text-lg font-black text-primary mt-8 mb-3">Wardrobes</h3>
          <p>
            Always empty them. Even if the wardrobe is solid, it's almost impossible to carry safely with clothes still hanging inside — the rail bends, the hangers slide, and the whole thing becomes top-heavy and unstable. Take everything out, remove the rail and shelves if they come out, and carry the frame separately.
          </p>

          <h3 className="text-lg font-black text-primary mt-8 mb-3">Bedside tables</h3>
          <p>
            Empty them. They're small enough that packing the contents takes seconds, and the drawers usually don't have proper runners — just grooves in the wood. The drawers slide out easily when tilted.
          </p>

          <h3 className="text-lg font-black text-primary mt-8 mb-3">Sideboards and dressers</h3>
          <p>
            Empty them. These are heavy even without contents, and the doors and drawers are wider, making them more likely to swing open during a move. If it has glass doors, the risk is even higher.
          </p>

          <h3 className="text-lg font-black text-primary mt-8 mb-3">Desks and filing cabinets</h3>
          <p>
            Always empty filing cabinets — paper is extraordinarily heavy and the drawers will fall open if the cabinet is tilted. For desks, remove everything from the drawers and any shelves. Keyboards and monitors should be packed separately.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What about the "tape the drawers shut" approach?</h2>
          <p>
            Some guides suggest taping drawers shut and carrying the furniture fully loaded. This can work for a solid, good-quality chest of drawers with only lightweight clothes inside — but it's a risk, and most professional movers would rather you emptied them. The tape is fine for keeping drawers from sliding during the van journey (after the furniture is loaded and secured), but it's not reliable for the carrying part of the move.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Tell your mover what you've done</h2>
          <p>
            When you <Link href="/get-started" className="text-accent font-bold hover:underline">submit a move request</Link>, mention whether drawers and wardrobes are empty or still full. It helps the mover plan the job properly — they'll know what's heavy, what needs extra care, and whether to bring an extra pair of hands for the larger pieces.
          </p>

          <div className="bg-[#F9F9F7] rounded-2xl p-8 border border-border mt-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">Key takeaways</h3>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
              <li>Solid chest of drawers with light clothes: usually fine to leave as-is.</li>
              <li>Flat-pack furniture: always empty. The joints can't take the extra weight.</li>
              <li>Wardrobes: always empty. They're top-heavy and the rails buckle.</li>
              <li>If in doubt, empty it. Ten minutes of packing beats a broken chest of drawers.</li>
              <li>Tell your mover which pieces are full and which are empty.</li>
            </ul>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
