import { Metadata } from "next";
import { Star, ExternalLink, Phone } from "lucide-react";
import Link from "next/link";

const baseUrl = "https://www.manandvanclub.co.uk";
const GOOGLE_REVIEWS_URL = "https://share.google/xemGXWRByHBK5PSbN";

export const metadata: Metadata = {
  title: "Man and Van Club Reviews | Rated 5.0/5 | Real Customer Reviews",
  description:
    "Read real customer reviews for Man and Van Club. Rated 5.0 out of 5 across 11 reviews. See what movers' customers say about price, punctuality and care.",
  alternates: { canonical: `${baseUrl}/man-and-van-reviews` },
  openGraph: {
    title: "Man and Van Club Reviews | Rated 5.0/5",
    description: "Real customer reviews for Man and Van Club. Rated 5.0 out of 5.",
    url: `${baseUrl}/man-and-van-reviews`,
  },
};

// Verbatim customer reviews (unchanged, including typos) - mirrored in the
// site's Organisation Review schema.
const REVIEWS: { author: string; date: string; body: string }[] = [
  {
    author: "Anku G.",
    date: "23 July 2026",
    body: "Great price. I had an excellent experience. I needed to move from Leicester to Glasgow and was getting ridiculous prices everywhere. But soon as I called them up and told my situation the staff were really understanding and provided me with a great alternative and cut my costs! Cant thank you enough. Recommended company!",
  },
  {
    author: "S.J.",
    date: "15 May 2026",
    body: "Absolutely brilliant service. The driver was punctual, careful and really helpful with loading. Best man and van I've used in Birmingham. Will definitely use again.",
  },
  {
    author: "M.K.",
    date: "22 April 2026",
    body: "Needed a same-day move in Walsall and they came through. Fair price, no hidden fees. The driver even helped carry everything upstairs. Five stars.",
  },
  {
    author: "R.P.",
    date: "1 June 2026",
    body: "Used Man and Van Club for a furniture collection from Facebook Marketplace. Driver was professional, blankets and straps for protection. Great value at £19/hr.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Reviews", item: `${baseUrl}/man-and-van-reviews` },
  ],
};

export default function ReviewsPage() {
  return (
    <div className="flex flex-col w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">Customer reviews</p>
          <h1 className="text-3xl lg:text-4xl font-black text-primary tracking-tight">Man and Van Club reviews</h1>
          <p className="mt-3 text-sm text-text-secondary leading-relaxed">
            Every review below is a real customer review, published word for word (including any typos). You can read
            our latest reviews and rating on our Google Business Profile.
          </p>

          {/* Aggregate card */}
          <div className="mt-8 bg-white rounded-2xl border border-border p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-black text-primary">5.0<span className="text-lg text-text-secondary">/5</span></div>
              <div>
                <div className="flex items-center gap-0.5" aria-label="Rated 5 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={18} fill="#00B67A" className="text-[#00B67A]" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-1 text-xs font-bold text-text-secondary">Across 11 verified reviews</p>
              </div>
            </div>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:ml-auto inline-flex items-center justify-center gap-2 bg-accent text-white text-sm font-black px-5 py-3 rounded-xl hover:bg-accent/90 transition-colors"
            >
              See our reviews on Google <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14 bg-white border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl space-y-5">
          {REVIEWS.map((r) => (
            <figure key={r.author + r.date} className="bg-background rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-0.5" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill="#00B67A" className="text-[#00B67A]" strokeWidth={0} />
                  ))}
                </div>
                <figcaption className="text-xs font-bold text-text-secondary">
                  <span className="text-primary font-black">{r.author}</span> · {r.date}
                </figcaption>
              </div>
              <blockquote className="mt-3 text-sm text-text-secondary leading-relaxed">
                &ldquo;{r.body}&rdquo;
              </blockquote>
            </figure>
          ))}

          <p className="text-xs text-text-secondary leading-relaxed pt-2">
            Reviews are shown exactly as written by customers. New reviews appear on our Google profile as they are
            posted:{" "}
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="text-accent font-bold hover:underline">
              google profile &amp; reviews
            </a>
            .
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background text-center">
        <div className="container mx-auto px-4 max-w-xl">
          <h2 className="text-2xl font-black text-primary tracking-tight">Ready to move with us?</h2>
          <p className="mt-2 text-sm text-text-secondary">
            Submit your move details for free and a verified mover reviews your job before quoting. No spam, one mover, real prices.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/#quote-form"
              className="inline-flex items-center justify-center bg-accent text-white text-sm font-black px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors"
            >
              Get a free quote
            </Link>
            <a
              href="tel:01217511269"
              className="inline-flex items-center gap-2 text-sm font-black text-primary hover:text-accent transition-colors"
            >
              <Phone size={15} /> 0121 751 1269
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
