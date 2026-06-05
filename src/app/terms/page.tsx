import Link from "next/link";

export default function Terms() {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl prose prose-slate">
        <h1>Terms & Conditions</h1>
        <p className="lead">Last Updated: June 5, 2026</p>
        
        <h2>1. For Customers</h2>
        <p>Man & Van Club is a comparison platform. We are not a removal company and do not provide moving services directly. When you book a mover through our platform, your contract is directly with the mover, not Man & Van Club.</p>
        
        <h2>2. Quote Estimates</h2>
        <p>The instant estimate shown on our website is for guidance only. Final quotes provided by individual movers may vary based on specific job requirements.</p>

        <h2>3. For Businesses (Drivers)</h2>
        <p>Movers must be fully insured for Goods in Transit and Public Liability. Lead fees are non-refundable unless the customer provided invalid contact details.</p>

        <h2>4. Lead Marketplace Fees</h2>
        <p>Leads are charged at a flat rate based on the move type (Small: £8, Medium: £15, Large: £25, Long Distance: £35). Fees are deducted from the driver's account balance upon lead acceptance.</p>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/" className="btn-outline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
