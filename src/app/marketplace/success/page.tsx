export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7]">
      <div className="max-w-md text-center space-y-6">
        <div className="text-success text-6xl">✓</div>
        <h1 className="text-3xl font-black text-primary">Payment Successful</h1>
        <p className="text-text-secondary">
          You have successfully unlocked this lead. The customer’s contact details have been sent to your email.
        </p>
        <a href="/marketplace" className="btn-orange inline-block px-8 py-4 rounded-2xl font-black uppercase tracking-widest">
          Back to Marketplace
        </a>
      </div>
    </div>
  );
}
