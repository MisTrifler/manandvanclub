import Link from "next/link";
import { ArrowUpRight, MapPin, Clock, User, Phone } from "lucide-react";

interface BlogPostProps {
  title: string;
  description: string;
  date: string;
  author?: string;
  readTime?: string;
  children: React.ReactNode;
  breadcrumbs?: { label: string; href: string }[];
}

export default function BlogPostLayout({
  title,
  description,
  date,
  author = "Man and Van Club",
  readTime = "5 min read",
  children,
  breadcrumbs,
}: BlogPostProps) {
  return (
    <main className="bg-white min-h-screen selection:bg-accent selection:text-white">
      {/* Visible Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-[#F9F9F7] border-b border-border/50">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-xs font-medium text-primary/50">
            <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
              <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
            </li>
            {breadcrumbs?.map((crumb, i) => (
              <li key={i} className="flex items-center gap-2" aria-current={i === breadcrumbs.length - 1 ? "page" : undefined}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30"><path d="m9 18 6-6-6-6"/></svg>
                <span className={i === breadcrumbs.length - 1 ? "text-primary font-bold" : "hover:text-accent transition-colors"}>
                  {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : crumb.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#F9F9F7] border-b border-border py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} className="text-accent" />
                {readTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User size={12} className="text-accent" />
                {author}
              </span>
              <time dateTime={date} className="text-primary/50">
                {new Date(date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter leading-[0.95]">
              {title}
            </h1>
            <p className="text-lg text-text-secondary font-medium leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <article className="prose prose-lg max-w-none">
            {children}
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F9F9F7] border-t border-border">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter">
            Need a man and van?
          </h2>
          <p className="text-text-secondary font-medium max-w-xl mx-auto leading-relaxed">
            Submit a free move request and let one verified mover review your details before you decide whether to book.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/get-started"
              className="btn-orange px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3"
            >
              Start Free Request <ArrowUpRight size={18} />
            </Link>
            <a
              href="tel:01217511269"
              className="bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 hover:bg-primary/90 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call 0121 751 1269
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-primary/40">
            <span>Prices from £19</span>
            <span>·</span>
            <span>Open 24/7</span>
            <span>·</span>
            <span>Free to submit</span>
          </div>
        </div>
      </section>

      {/* ── Mobile Floating Call Button ── */}
      <a
        href="tel:01217511269"
        className="floating-call-btn fixed bottom-20 right-6 z-[200] lg:hidden flex items-center gap-3 bg-accent text-white px-6 py-4 rounded-full shadow-2xl hover:bg-accent/90 transition-all"
        aria-label="Call Man and Van Club"
      >
        <Phone size={22} className="text-white" />
        <span className="font-black tracking-tight text-sm">Call Now</span>
      </a>
    </main>
  );
}
