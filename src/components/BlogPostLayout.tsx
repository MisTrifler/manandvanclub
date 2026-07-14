import Link from "next/link";
import { ArrowUpRight, MapPin, Clock, User } from "lucide-react";

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
        <div className="container mx-auto px-4 text-center space-y-8">
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
              className="bg-white border border-border px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs inline-flex items-center gap-3 text-primary hover:border-accent hover:text-accent transition-all"
            >
              Call 0121 751 1269
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
