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
          className="btn-orange px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest inline-block"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
