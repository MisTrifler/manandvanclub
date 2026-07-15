import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "How to Move a Piano Without Damage | Man and Van Club",
  description:
    "Moving a piano is not like moving a sofa. This guide covers upright, digital, baby grand and grand pianos — what can go wrong, what professional piano movers do differently, and why this is one job you should never attempt alone.",
  alternates: {
    canonical: `${baseUrl}/blog/how-to-move-a-piano-without-damage`,
  },
  openGraph: {
    title: "How to Move a Piano Without Damage",
    description: "Moving a piano is not like moving a sofa. What can go wrong, how professionals do it, and why you shouldn't attempt it alone.",
    url: `${baseUrl}/blog/how-to-move-a-piano-without-damage`,
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "How to Move a Piano" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Move a Piano Without Damage",
    description: "Moving a piano is not like moving a sofa. What can go wrong and how professionals do it differently.",
    images: ["/images/og-homepage.jpg"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Move a Piano Without Damage",
  description: "Moving a piano is not like moving a sofa. This guide covers what can go wrong, how professionals do it, and why you should never attempt it alone.",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/how-to-move-a-piano-without-damage`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Moving a Piano", item: `${baseUrl}/blog/how-to-move-a-piano-without-damage` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="How to Move a Piano Without Damage"
        description="Moving a piano is not like moving a sofa. What can go wrong, how the professionals do it, and why this is one job you shouldn't attempt alone."
        date="2026-07-15"
        readTime="7 min read"
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            A piano is the single most difficult item to move in a typical house. It's heavy, awkwardly shaped, fragile on the inside, expensive to repair, and easy to damage in ways that aren't immediately obvious. This guide explains what's involved, what can go wrong, and how to make sure it arrives in one piece.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Why pianos are different from other furniture</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Weight</strong> — An upright piano weighs 130–230kg. A baby grand weighs 230–300kg. A full grand can be over 500kg. This is not a two-person lift on a set of stairs.</li>
            <li><strong className="text-primary">Internal mechanics</strong> — There are around 12,000 moving parts inside a piano. The action, the hammers, the strings, the soundboard — all carefully calibrated. A jolt or a tilt the wrong way can knock the whole thing out of regulation.</li>
            <li><strong className="text-primary">Finish damage</strong> — Piano cases are finished in polished lacquer or polyester. One scrape against a doorframe and you're looking at a professional repair that costs hundreds of pounds.</li>
            <li><strong className="text-primary">Cast iron frame</strong> — Inside every piano is a massive iron plate under extreme tension from the strings (roughly 20 tonnes of tension for an upright). The frame is tough, but it can crack if the piano is dropped or suffers a hard impact.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Upright pianos</h2>
          <p>
            Uprights are the most common type people move. They stand against a wall and weigh between 130 and 230kg. The main challenges are:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Getting it through doorways</strong> — Measure both the piano and every doorway it needs to pass through. Most uprights are about 60cm deep and 150cm tall. If a doorway is under 63cm wide, it's not going through without removing the door from its hinges.</li>
            <li><strong className="text-primary">Stairs</strong> — Uprights on stairs need a piano trolley (a four-wheel dolly designed for pianos) and at least two people who know what they're doing. The piano must be kept upright — laying it on its back can damage the action and the soundboard.</li>
            <li><strong className="text-primary">Piano boards</strong> — For stairs, a piano is strapped to a piano board (also called a skid board) which has padding and straps. The movers then carry it as a unit. This is how professional piano movers handle it.</li>
            <li><strong className="text-primary">Lock the keyboard lid</strong> — If the keyboard lid locks, lock it. If not, tape it shut. The keys are the most fragile part of the piano and they damage easily if the lid flies open.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Digital pianos</h2>
          <p>
            Digital pianos are much simpler to move than acoustic ones. They weigh 15–50kg, they have no internal strings or hammers to worry about, and they're usually compact enough to fit in a standard van. The main things to watch:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Remove the legs and pedal unit</strong> — Most digital pianos come apart. Transport the keyboard and stand separately.</li>
            <li><strong className="text-primary">Protect the keys</strong> — Even though they're not mechanical, the key surface can scratch. Close and secure the lid.</li>
            <li><strong className="text-primary">Original packaging</strong> — If you still have the box, use it. Digital pianos survive much better in their original packaging.</li>
            <li><strong className="text-primary">Keep it dry</strong> — Moisture is the enemy of electronics. Don't leave it in the van overnight in winter.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Baby grand and grand pianos</h2>
          <p>
            Grand pianos are a completely different proposition. A baby grand is 150–180cm long and weighs 230–300kg. A full grand can be over 270cm long and weigh over 500kg. You cannot move a grand piano with a standard man and van service — you need specialist piano movers.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">The lid and legs come off</strong> — Professional piano movers remove the lid, lyre and legs. The body of the piano is then wrapped and strapped to a piano board sideways.</li>
            <li><strong className="text-primary">The piano board is essential</strong> — Without a piano board, there is no safe way to move a grand. It provides the structural support the piano needs during transit.</li>
            <li><strong className="text-primary">It takes a crew of three or four</strong> — Two people minimum for a baby grand on flat ground. Three to four if there are stairs involved. Some grand piano moves need a crane or hoist if the piano can't fit through any doorway or stairwell.</li>
            <li><strong className="text-primary">Budget £400–£1,000+</strong> — A specialist piano move costs significantly more than a regular man and van job. For a grand piano with stairs or crane work, it can be £1,000–£2,000.</li>
          </ul>
          <p>
            We cover piano moves in more detail on our <Link href="/piano-removals" className="text-accent font-bold hover:underline">piano removals page</Link>, including how to request a quote for a piano-specific move.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What can go wrong (that people don't think about)</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-primary">Going out of tune</strong> — Every piano goes out of tune when moved. It's not a question of whether, but how much. Budget for a tuning 2–4 weeks after the move once the piano has acclimatised to its new room.</li>
            <li><strong className="text-primary">Sticking keys</strong> — A jolt can shift the action mechanism inside, causing keys to stick or not respond properly. This needs a piano technician to fix.</li>
            <li><strong className="text-primary">Soundboard cracks</strong> — Rapid changes in temperature and humidity (like going from a warm house into a cold van and back into a warm house) can cause the soundboard to crack. This is why piano movers try to minimise the time the piano spends in transit.</li>
            <li><strong className="text-primary">Floor damage</strong> — A 200kg piano on small castors can gouge hardwood floors or crack tiles. Professional movers use rubber-wheeled trolleys and floor protectors.</li>
            <li><strong className="text-primary">Back injuries</strong> — The number one reason not to move a piano yourself. A slipped disc from lifting 200kg the wrong way will cost you far more than paying a professional.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Before moving day</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Measure everything</strong> — The piano, every doorway, every hallway, every stairwell. Do this before you book the move.</li>
            <li><strong className="text-primary">Clear the route</strong> — Move any furniture, rugs or obstacles from the path between the piano and the van.</li>
            <li><strong className="text-primary">Check both properties</strong> — The route out of the old house and the route into the new one. The new house might have narrower doors or a different stair configuration.</li>
            <li><strong className="text-primary">Remove the music stand</strong> — On an upright, the music stand at the top usually lifts off. Take it off and pack it separately.</li>
            <li><strong className="text-primary">Lock the keyboard</strong> — If your piano has a lock, use it. If not, tape the fallboard shut.</li>
            <li><strong className="text-primary">Take photos</strong> — Photograph the piano from all sides before the move. If there's any damage in transit, you'll need before photos for an insurance claim.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Insurance</h2>
          <p>
            Standard Goods in Transit insurance may not cover a piano — many policies have single-item limits of £500–£1,000. Check with your mover whether their insurance specifically covers high-value items like pianos. If it doesn't, you may need to arrange separate cover.
          </p>

          <p>
            If you need a piano moved, <Link href="/get-started" className="text-accent font-bold hover:underline">submit your details</Link> and mention the piano specifically — the type, the weight if you know it, and whether there are stairs at either property. A mover with piano experience can then review the request and quote accordingly.
          </p>

          <div className="bg-[#F9F9F7] rounded-2xl p-8 border border-border mt-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">Key takeaways</h3>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
              <li>Upright pianos: at least two experienced people, a piano trolley, and a piano board if there are stairs.</li>
              <li>Grand pianos: specialist piano movers only. This is not a man-and-van job.</li>
              <li>Never lay an acoustic piano on its back or side — it damages the action and soundboard.</li>
              <li>Every piano will need tuning after a move. Budget for it.</li>
              <li>Check your mover's insurance covers the full value of the piano.</li>
            </ul>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
