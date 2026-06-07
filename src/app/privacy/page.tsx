import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Man and Van Club",
  description: "Our commitment to protecting your personally identifiable information at Man and Van Club.",
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
            <p>When booking or registering on our site, as appropriate, you may be asked to enter your name, email address, phone number or other details to help you with your experience.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">2. When do we collect information?</h2>
            <p>We collect information from you when you register on our site, place a booking request, fill in a form or enter information on our site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">3. How do we use your information?</h2>
            <p>We may use the information we collect from you when you register, book a van, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>To personalize your experience and allow us to deliver the type of content and product offerings in which you are most interested.</li>
              <li>To improve our website in order to better serve you.</li>
              <li>To allow us to better serve you in response to your customer service requests.</li>
              <li>To provide to authorities when required for accounting purposes.</li>
            </ul>
            <p className="mt-4"><strong>Data Sharing:</strong> Customer information may be shared with a matched mover to facilitate your move request. We also share data with approved service providers such as payment processors (Stripe), hosting providers, analytics providers, and email providers. <strong>Personal data is never sold or rented for marketing purposes.</strong></p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">4. How long do we keep the data?</h2>
            <p>Your personal data will be stored on our servers for 5 years since the moment you create a booking request, as required for business and accounting purposes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">5. How do we protect your information?</h2>
            <p>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. We use regular Malware Scanning.</p>
            <p className="mt-4">Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>
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
