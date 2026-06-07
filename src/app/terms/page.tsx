import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Man and Van Club",
  description: "Terms and conditions for using the Man and Van Club marketplace.",
};

export default function Terms() {
  return (
    <div className="bg-white min-h-screen py-20 text-primary/80">
      <div className="container mx-auto px-4 max-w-4xl prose prose-slate">
        <h1 className="text-4xl font-black text-primary uppercase tracking-tighter mb-8">Terms & Conditions</h1>
        <p className="lead italic">Last Updated: June 7, 2026</p>
        
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-primary uppercase tracking-tight">1. Our Service</h2>
          <p><strong>Man and Van Club</strong> is an introduction marketplace only. We provide a platform that connects customers with independent local movers. <strong>Man and Van Club does not provide moving services directly.</strong></p>
          <p>By using this website, you acknowledge that any moving contract exists solely between the customer and the mover. Man and Van Club is not a party to any agreement entered into between customers and movers.</p>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-primary uppercase tracking-tight">2. Mover Verification Disclaimer</h2>
          <p className="bg-gray-50 p-6 rounded-2xl border border-border italic">
            "Whilst Man and Van Club may review documentation supplied by movers, including insurance and identification documents, we do not independently guarantee the quality, competence, financial standing, insurance validity, licensing status, or ongoing compliance of any mover. Customers should carry out their own checks before entering into an agreement."
          </p>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-primary uppercase tracking-tight">3. For Businesses (Movers)</h2>
          <p>Movers must be fully insured and verified before accessing the marketplace. <strong>Payments are securely processed by Stripe or other approved payment providers. We do not store complete payment card details.</strong></p>
          
          <h3 className="text-xl font-bold text-primary uppercase">Lead Fee Refund Rules</h3>
          <p>Refunds for lead fees are only available where:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Customer contact details are invalid</li>
            <li>Duplicate lead supplied</li>
            <li>Technical charging error</li>
          </ul>
          <p>No refund is available because:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Customer does not answer</li>
            <li>Customer declines a quote</li>
            <li>Customer books another mover</li>
            <li>Customer cancels</li>
            <li>Mover cannot secure the booking</li>
            <li>Mover chooses not to quote</li>
          </ul>
        </section>

        <div className="mt-16 pt-8 border-t border-border">
          <Link href="/" className="btn-orange px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center inline-block">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
