import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Man and Van Club",
  description: "Terms and conditions for using the Man and Van Club marketplace.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/terms',
  },
};

export default function Terms() {
  return (
    <div className="bg-white min-h-screen py-20 text-primary/80">
      <div className="container mx-auto px-4 max-w-4xl prose prose-slate">
        <h1 className="text-4xl font-black text-primary uppercase tracking-tighter mb-8">Terms & Conditions</h1>
        <p className="lead italic">Last Updated: June 11, 2026</p>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-primary uppercase tracking-tight">1. Our Service</h2>
          <p><strong>Man and Van Club</strong> is an introduction marketplace only. We provide a platform that connects customers with independent local movers. <strong>Man and Van Club does not provide moving services directly.</strong></p>
          <p>Customers can submit a quote request for free. Approved movers can review anonymised move details and provide structured quote options based on the details supplied. If a customer accepts a quote option, the customer pays Man and Van Club a booking deposit to secure the booking, and their contact details are released only to that quoted mover. The booking deposit is deducted from the selected mover quote and is not an additional charge.</p>
          <p>Any moving contract exists solely between the customer and the mover. Man and Van Club is not a party to any agreement entered into between customers and movers.</p>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-primary uppercase tracking-tight">2. Mover Verification Disclaimer</h2>
          <p className="bg-gray-50 p-6 rounded-2xl border border-border italic">
            "Whilst Man and Van Club may review documentation supplied by movers, including insurance and identification documents, we do not independently guarantee the quality, competence, financial standing, insurance validity, licensing status, or ongoing compliance of any mover. Customers should carry out their own checks before entering into an agreement."
          </p>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-primary uppercase tracking-tight">3. Booking Deposit Rules for Customers</h2>
          <p>You only pay a booking deposit if you accept a mover quote option.</p>
          <p><strong>The booking deposit is deducted from the selected mover quote and is not an additional charge.</strong></p>
          <p><strong>The selected quote option is your total move cost.</strong></p>
          <p><strong>You pay the remaining balance directly to the mover on moving day unless otherwise agreed.</strong></p>
          <p>The booking deposit confirms your accepted quote option, and your contact details are released to the mover only after the booking deposit has been paid.</p>
          <p>Example: selected mover quote £300, booking deposit £25, remaining balance paid to mover £275, total move cost £300.</p>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-primary uppercase tracking-tight">4. Rules for Movers</h2>
          <p>Movers must be approved before accessing the marketplace. Approved movers must provide Goods in Transit and Public Liability insurance evidence before approval, and applications may include checks on business details, contact details and service areas.</p>
          <p><strong>Movers submit quote options for free.</strong></p>
          <p>Customer details are released only after the customer accepts a quote option and pays the booking deposit.</p>
          <p>Movers submit structured quote options with total prices. The booking deposit is deducted from the customer’s selected quote option, and movers should collect the remaining balance directly from the customer on moving day unless another payment method is agreed. Movers are expected to honour quotes based on the details provided.</p>
          <p>The quote may only change if the move details provided were incomplete, inaccurate or later changed.</p>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-primary uppercase tracking-tight">5. Refunds and Cancellations</h2>
          <p>The booking deposit may be refundable if the mover cannot fulfil the accepted booking and we cannot arrange a suitable replacement.</p>
          <p>The booking deposit is also refundable for duplicate payments, technical charging errors, or where customer details were not released after a successful booking deposit payment.</p>
          <p>The booking deposit is not normally refundable if you cancel after accepting the quote, provide incorrect move details, materially change the job, or book another mover elsewhere.</p>
          <p>This does not affect your statutory rights.</p>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-primary uppercase tracking-tight">6. Limitation of Liability</h2>
          <p>Man and Van Club is not responsible for the physical moving service provided by independent movers. Customers and movers are responsible for confirming final timings, access, inventory, insurance, payment method and any other move-specific details directly with each other.</p>
          <p>Nothing in these terms limits or excludes liability where it would be unlawful to do so.</p>
        </section>

        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-primary uppercase tracking-tight">7. Contact</h2>
          <p>If you have questions about these terms, booking deposits, refunds or a move request, contact us at <a href="mailto:support@manandvanclub.co.uk">support@manandvanclub.co.uk</a>.</p>
        </section>

        <div className="mt-16 pt-8 border-t border-border">
          <Link href="/" className="btn-orange px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center inline-block">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
