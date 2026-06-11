import Link from "next/link";

export const dynamic = "force-dynamic";

export default function QuoteCancelledPage({
  searchParams,
}: {
  searchParams?: { token?: string; session_id?: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7] p-6">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-3xl font-black text-primary tracking-tighter">Payment Not Completed</h1>
        <p className="text-text-secondary leading-relaxed">
          Your booking deposit payment was not completed. Your details have not been released to the mover. If you change your mind, you can return to the quote review page and try again.
        </p>
        <div className="flex flex-col gap-3">
          {searchParams?.token && (
            <a
              href={`/quote-review/${searchParams.token}`}
              className="btn-orange inline-block px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
            >
              Return to Quote Review
            </a>
          )}
          <Link
            href="/"
            className="inline-block px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm border border-border text-primary/60 hover:bg-white transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
