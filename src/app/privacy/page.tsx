import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Man and Van Club",
  description: "Our commitment to protecting your personally identifiable information at Man and Van Club.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/privacy',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl prose prose-slate">
        <h1 className="text-4xl font-black text-primary uppercase tracking-tighter mb-8">Privacy Policy</h1>
        
        <p className="text-lg text-text-secondary mb-8">
          This privacy policy has been compiled to better serve those who are concerned with how their "Personally Identifiable Information" (PII) is being used online. <strong>Man and Van Club</strong> is the Data Controller for your information.
        </p>

        <div className="space-y-12 text-primary/80">
          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">Contact Details</h2>
            <p>If you have any questions regarding this privacy policy, you may contact us using the information below:</p>
            <ul className="list-none pl-0 mt-4">
              <li><strong>Website:</strong> www.manandvanclub.co.uk</li>
              <li><strong>Email:</strong> support@manandvanclub.co.uk</li>
              <li><strong>Phone:</strong> 07943 617386</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">1. What personal information do we collect?</h2>
            <p>When you request a moving quote, we collect your name, email address, phone number, collection and delivery postcodes, move date and move details. When a mover applies to join our network, we collect business details, contact information and insurance information. We may also collect information you provide when contacting our support team.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">2. When do we collect information?</h2>
            <p>We collect information when you submit a move request, verify your email address, review or accept a mover quote, pay a booking deposit, apply to join as a mover, log in to a mover account, or contact us through the site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">3. How do we use your information?</h2>
            <p>We use the information you provide to operate the Man and Van Club quote and booking service:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>To share anonymised move details (without your contact information) with approved movers so they can provide a quote.</li>
              <li>To send you service emails about your move request, your mover quote, and your booking, using our email provider.</li>
              <li>To release your contact details only to the verified mover handling your booking after you accept their quote and pay the booking deposit.</li>
              <li>To process booking deposit payments securely through Stripe.</li>
              <li>To review and verify mover applications, including insurance details.</li>
              <li>To respond to customer service requests and improve our website.</li>
              <li>To meet legal, accounting and regulatory obligations.</li>
            </ul>
            <p className="mt-4"><strong>Data Sharing:</strong> Your contact details are released only to the mover whose quote you accept, and only after the booking deposit is paid. We also share data with approved service providers, including our payment processor (Stripe), email provider, database and hosting providers. <strong>Personal data is never sold or rented for marketing purposes.</strong></p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">4. How long do we keep the data?</h2>
            <p>Your personal data will be stored for up to 5 years from the date of your move request, as required for business and accounting purposes, unless you ask us to delete it sooner where we have no legal obligation to retain it.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">5. How do we protect your information?</h2>
            <p>Your data is stored in a secure managed database with access controls, and is only accessible to a limited number of people who need it to operate the service. Customer contact details are hidden from movers until you accept a quote and pay the booking deposit. All data transmitted between your browser and our site is encrypted via Transport Layer Security (TLS).</p>
            <p className="mt-4"><strong>Payments:</strong> Payments are securely processed by Stripe or other approved payment providers. We do not store complete payment card details.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">6. Your Rights (UK GDPR)</h2>
            <p>Under UK GDPR, you have the right to access, rectify, erase, restrict processing, and the right to data portability. You also have the right to object to certain processing activities.</p>
            <p className="mt-4">If you believe your data is being handled incorrectly, you have the right to lodge a complaint with the Information Commissioner's Office (ICO).</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
          <Link href="/" className="btn-orange px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center inline-block">Back to Home</Link>
          <Link href="/cookies" className="bg-gray-100 text-primary px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center inline-block hover:bg-gray-200 transition-colors">View Cookie Policy</Link>
        </div>
      </div>
    </div>
  );
}
