export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7] p-6">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-3xl font-black text-primary tracking-tighter">Payment Not Completed</h1>
        <p className="text-text-secondary leading-relaxed">
          Your payment was not completed and you have not been charged.
        </p>
        <p className="text-sm text-text-secondary/70">
          Customers pay a booking fee only after accepting a mover quote. Movers submit quotes for free.
        </p>
        <a href="/marketplace" className="btn-orange inline-block px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm">
          Back to Marketplace
        </a>
      </div>
    </div>
  );
}
