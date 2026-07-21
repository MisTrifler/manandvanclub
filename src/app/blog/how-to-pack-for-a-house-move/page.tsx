import Link from "next/link";
import BlogPostLayout from "@/components/BlogPostLayout";
import { Metadata } from "next";

const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: "How to Pack for a House Move | Man and Van Club",
  description:
    "A practical room-by-room packing guide for your house move. From kitchen glassware to bedroom wardrobes, learn what to pack first, what to leave to the movers, and how to avoid the common mistakes that slow everything down.",
  alternates: {
    canonical: `${baseUrl}/blog/how-to-pack-for-a-house-move`,
  },
  openGraph: {
    title: "How to Pack for a House Move: Room-by-Room Guide",
    description: "A practical room-by-room packing guide covering kitchen, bedroom, living room, bathroom and more. What to pack first and what to leave for moving day.",
    url: `${baseUrl}/blog/how-to-pack-for-a-house-move`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("How to Pack for a House Move")}&subtitle=${encodeURIComponent("Room-by-Room Packing Guide")}`, width: 1200, height: 630, alt: "How to Pack for a House Move" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Pack for a House Move: Room-by-Room Guide",
    description: "A practical room-by-room packing guide covering kitchen, bedroom, living room, bathroom and more.",
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("How to Pack for a House Move")}&subtitle=${encodeURIComponent("Room-by-Room Packing Guide")}`],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Pack for a House Move: Room-by-Room Guide",
  description: "A practical room-by-room packing guide for your house move. From kitchen glassware to bedroom wardrobes, learn what to pack first and how to avoid common mistakes.",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  author: { "@type": "Organization", name: "Man and Van Club", url: baseUrl },
  publisher: {
    "@type": "Organization",
    name: "Man and Van Club",
    url: baseUrl,
    logo: { "@type": "ImageObject", url: `${baseUrl}/icon.png` },
  },
  mainEntityOfPage: `${baseUrl}/blog/how-to-pack-for-a-house-move`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { "@type": "ListItem", position: 3, name: "Packing Guide", item: `${baseUrl}/blog/how-to-pack-for-a-house-move` },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <BlogPostLayout
        title="How to Pack for a House Move"
        description="A room-by-room packing guide — what to pack first, what to leave to the movers, and the mistakes that slow everything down on moving day."
        date="2026-07-15"
        readTime="9 min read"
      >
        <div className="text-text-secondary leading-relaxed space-y-6">
          <p className="text-lg">
            Packing is the part of moving that everyone underestimates. You think you can do it in a weekend. You can't. This guide goes room by room so you know exactly what to pack, what to leave out, and what not to bother packing at all.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Before you start: supplies you actually need</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Small boxes</strong> — for books, tins, anything heavy. Do not put heavy things in large boxes. Your mover will tell you the same thing.</li>
            <li><strong className="text-primary">Medium boxes</strong> — the workhorse. Kitchen items, toys, clothes, misc.</li>
            <li><strong className="text-primary">Large boxes</strong> — bedding, pillows, lampshades, anything light and bulky.</li>
            <li><strong className="text-primary">Wardrobe boxes</strong> — if you have suits or dresses that crease easily, worth the extra cost.</li>
            <li><strong className="text-primary">Packing paper</strong> — for wrapping crockery and glass. Newspaper leaves ink marks.</li>
            <li><strong className="text-primary">Bubble wrap</strong> — for anything fragile or valuable.</li>
            <li><strong className="text-primary">Strong tape</strong> — buy the proper stuff. Cheap tape splits when you lift the box.</li>
            <li><strong className="text-primary">Marker pens</strong> — two minimum. They always go missing.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Kitchen</h2>
          <p>
            The kitchen takes longer than any other room. Start it a full week before moving day.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Plates and bowls</strong> — wrap each one in packing paper and stack vertically, like records. Never stack them flat — the bottom ones crack under the weight.</li>
            <li><strong className="text-primary">Glasses and mugs</strong> — roll each glass in paper, stuff the inside with paper too. Mugs are tougher but the handles snap if packed loose.</li>
            <li><strong className="text-primary">Pots and pans</strong> — nest them. Put a piece of paper between each one so they don't scratch. Lids can go in separately.</li>
            <li><strong className="text-primary">Food</strong> — use up what you can in the week before. Tins are heavy — only move what you actually need. Open packets and jars go in a separate box sealed in a bag in case they leak.</li>
            <li><strong className="text-primary">Appliances</strong> — if you're taking the washing machine, it needs a transit bolt. If you've still got the original box, use it. If not, wrap it in blankets and stand it upright.</li>
          </ul>
          <p>
            Label every kitchen box with what's inside and which room it goes to. "Kitchen — plates and bowls" is a lot more useful than "Kitchen stuff" when you're unpacking at 10pm.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Living room</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">TV</strong> — if you kept the box, use it. If not, wrap the screen in a blanket and stand it upright in the van. Never lay a TV flat — the screen can crack from pressure.</li>
            <li><strong className="text-primary">Sofa</strong> — measure it before moving day. If it won't fit through the door at the other end, you need to know that now, not when the van is waiting. Some sofas have removable legs or arms.</li>
            <li><strong className="text-primary">Bookshelves</strong> — empty them completely before the movers arrive. The shelves themselves are heavy enough without books in them, and a loaded bookshelf is awkward and risky to carry.</li>
            <li><strong className="text-primary">Books</strong> — pack in small boxes. Books are deceptively heavy. A large box of books is a back injury waiting to happen.</li>
            <li><strong className="text-primary">Cables and remotes</strong> — put them in a labelled sandwich bag and tape it to the device they belong to. You will thank yourself later.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Bedrooms</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Clothes on hangers</strong> — if you've got wardrobe boxes, just transfer them straight across. If not, lay a bin bag over a group of hanging clothes and tie the bottom. Quickest packing method there is.</li>
            <li><strong className="text-primary">Folded clothes</strong> — leave them in the drawers if the drawers are coming with you. Just take out anything fragile or heavy from the top drawers to make the unit lighter.</li>
            <li><strong className="text-primary">Bedding</strong> — pack duvets and pillows last. They're light and you'll want them first at the other end. Use large boxes or vacuum bags if you've got them.</li>
            <li><strong className="text-primary">Mattress</strong> — a mattress bag costs a few pounds and keeps it clean in the van. Worth doing, especially if the van has carried other people's furniture before yours.</li>
            <li><strong className="text-primary">Wardrobes</strong> — empty them completely before the mover tries to lift them. A half-full wardrobe is heavier than you think and the doors fly open at the worst moment.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Bathroom</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Toiletries</strong> — put anything that could leak (shampoo, shower gel, cleaning products) in a sealed plastic bag before it goes in the box. Leaks ruin everything around them.</li>
            <li><strong className="text-primary">Towels</strong> — useful as padding for fragile items in other boxes. Wrap a towel around a vase or a picture frame and it does double duty.</li>
            <li><strong className="text-primary">Medicine</strong> — pack this separately and keep it with you. You don't want to be hunting through boxes for paracetamol at midnight.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">What not to pack</h2>
          <p>
            Some things shouldn't go in the van at all. Your mover will usually flag these, but it's worth knowing in advance:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-primary">Paint, solvents, petrol</strong> — flammable items can't go in most vans. It's an insurance issue.</li>
            <li><strong className="text-primary">Perishable food</strong> — frozen food won't stay frozen. Fridges and freezers need to be defrosted 24 hours before moving.</li>
            <li><strong className="text-primary">Important documents</strong> — passports, deeds, birth certificates, driving licences. Keep these with you.</li>
            <li><strong className="text-primary">Valuables</strong> — jewellery, cash, small electronics. Carry them yourself. Insurance policies have limits on items in transit.</li>
          </ul>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">The overnight bag</h2>
          <p>
            Pack a bag as if you were going away for a night or two. Toiletries, phone charger, change of clothes, pyjamas, kettle, mugs, teabags, milk, snacks, toilet roll. The first evening in a new place is always chaotic — having the basics to hand makes it bearable.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Labelling that actually works</h2>
          <p>
            Write three things on every box: the <strong className="text-primary">room</strong> it goes to, the <strong className="text-primary">contents</strong>, and whether it's <strong className="text-primary">fragile</strong>. If you want to be really organised, number each box and keep a quick list on your phone — "Box 1: Kitchen — plates and bowls". When you've got 40 boxes stacked in the new living room, that list saves you opening every one to find the kettle.
          </p>

          <h2 className="text-2xl font-black text-primary uppercase tracking-tight mt-10 mb-4">Making it easier for your mover</h2>
          <p>
            If you're using a man and van service, the more organised your packing is, the faster the move goes — and faster means cheaper. Stack all boxes in one room near the front door if you can. Disassemble furniture before the mover arrives. Make sure there's somewhere for the van to park. These small things can shave an hour off a full house move.
          </p>
          <p>
            When you <Link href="/get-started" className="text-accent font-bold hover:underline">submit a move request</Link>, add your packing status — the mover can plan the job more accurately if they know whether everything is boxed and ready or whether they'll need to help with last-minute packing.
          </p>

          <div className="bg-[#F9F9F7] rounded-2xl p-8 border border-border mt-10">
            <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-3">Key takeaways</h3>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
              <li>Start with the kitchen — it takes the longest.</li>
              <li>Pack heavy items in small boxes. Always.</li>
              <li>Leave clothes in drawers if the furniture is coming with you.</li>
              <li>Label every box with room, contents and whether it's fragile.</li>
              <li>Pack an overnight bag with everything you need for the first evening.</li>
              <li>The more organised your packing, the faster (and cheaper) the move.</li>
            </ul>
          </div>
        </div>
      </BlogPostLayout>
    </>
  );
}
