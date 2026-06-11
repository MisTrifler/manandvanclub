export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7] p-6">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-3xl font-black text-primary tracking-tighter">Payment Not Completed</h1>
        <p className="text-text-secondary leading-relaxed">
          Your payment was not completed. The exclusive lead was not unlocked and you will not be charged.
        </p>
        <p className="text-sm text-text-secondary/70">
          You can try accepting the lead again from the marketplace. The lead remains available to other approved movers until it is claimed.
        </p>
        <a
          href="/marketplace"
          className="btn-orange inline-block px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
        >
          Back to Marketplace
        </a>
      </div>
    </div>
  );
}
