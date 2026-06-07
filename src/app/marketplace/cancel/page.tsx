export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7]">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-3xl font-black text-primary">Payment Cancelled</h1>
        <p className="text-text-secondary">
          Your payment was not completed. You can try unlocking the lead again from the marketplace.
        </p>
        <a href="/marketplace" className="btn-orange inline-block px-8 py-4 rounded-2xl font-black uppercase tracking-widest">
          Back to Marketplace
        </a>
      </div>
    </div>
  );
}
