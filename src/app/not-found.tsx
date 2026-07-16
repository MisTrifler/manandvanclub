import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h1 className="text-6xl font-black text-primary uppercase tracking-tighter mb-4">404</h1>
        <h2 className="text-2xl font-black text-primary uppercase tracking-tight mb-6">
          Page Not Found
        </h2>
        <p className="text-text-secondary text-lg mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Try one of these helpful links instead:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10">
          <Link
            href="/"
            className="group bg-[#F9F9F7] p-6 rounded-2xl border border-border hover:border-accent hover:shadow-lg transition-all"
          >
            <span className="font-black text-primary uppercase text-sm tracking-tight group-hover:text-accent transition-colors block mb-1">Homepage</span>
            <span className="text-xs text-text-secondary">Free move requests across the UK</span>
          </Link>
          <Link
            href="/man-and-van-birmingham"
            className="group bg-[#F9F9F7] p-6 rounded-2xl border border-border hover:border-accent hover:shadow-lg transition-all"
          >
            <span className="font-black text-primary uppercase text-sm tracking-tight group-hover:text-accent transition-colors block mb-1">Man and Van Birmingham</span>
            <span className="text-xs text-text-secondary">City centre, Jewellery Quarter, Edgbaston and more</span>
          </Link>
          <Link
            href="/man-and-van-walsall"
            className="group bg-[#F9F9F7] p-6 rounded-2xl border border-border hover:border-accent hover:shadow-lg transition-all"
          >
            <span className="font-black text-primary uppercase text-sm tracking-tight group-hover:text-accent transition-colors block mb-1">Man and Van Walsall</span>
            <span className="text-xs text-text-secondary">Bloxwich, Aldridge, Brownhills and more</span>
          </Link>
          <Link
            href="/man-and-van-west-midlands"
            className="group bg-[#F9F9F7] p-6 rounded-2xl border border-border hover:border-accent hover:shadow-lg transition-all"
          >
            <span className="font-black text-primary uppercase text-sm tracking-tight group-hover:text-accent transition-colors block mb-1">West Midlands Hub</span>
            <span className="text-xs text-text-secondary">All West Midlands areas and services</span>
          </Link>
          <Link
            href="/house-removals"
            className="group bg-[#F9F9F7] p-6 rounded-2xl border border-border hover:border-accent hover:shadow-lg transition-all"
          >
            <span className="font-black text-primary uppercase text-sm tracking-tight group-hover:text-accent transition-colors block mb-1">House Removals</span>
            <span className="text-xs text-text-secondary">Full home move quote requests</span>
          </Link>
          <Link
            href="/same-day-man-and-van"
            className="group bg-[#F9F9F7] p-6 rounded-2xl border border-border hover:border-accent hover:shadow-lg transition-all"
          >
            <span className="font-black text-primary uppercase text-sm tracking-tight group-hover:text-accent transition-colors block mb-1">Same Day Man and Van</span>
            <span className="text-xs text-text-secondary">Urgent local moves and collections</span>
          </Link>
        </div>

        <Link
          href="/"
          className="btn-orange px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest inline-flex items-center gap-2"
        >
          Back to Homepage
        </Link>

        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-sm text-text-secondary mb-4">Need a man and van? Call us directly:</p>
          <a
            href="tel:01217511269"
            className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm inline-flex items-center gap-3 hover:bg-primary/90 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call 0121 751 1269
          </a>
          <p className="text-xs text-primary/40 mt-3">Open 7 days · Prices from £50 · Free to submit</p>
        </div>
      </div>
    </div>
  );
}
