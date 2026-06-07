import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Man & Van Club",
  description: "Learn how we use cookies to improve your experience at Man & Van Club.",
};

export default function CookiePolicy() {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl prose prose-slate">
        <h1 className="text-4xl font-black text-primary uppercase tracking-tighter mb-8">Cookie Policy</h1>
        
        <p className="text-lg text-text-secondary mb-8">
          This policy explains how Man & Van Club uses "cookies" to recognize your browser and capture and remember certain information.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">1. Do we use "cookies"?</h2>
            <p>Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow it) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information.</p>
            <p className="mt-4">For instance, they are used to help us understand your preferences based on previous or current site activity, which enables us to provide you improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">2. We use cookies to:</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Help remember and process the details of your last quote search.</li>
              <li>Understand and save user's preferences for future visits.</li>
              <li>Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">3. Controlling Cookies</h2>
            <p>You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since every browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">4. Disabling Cookies</h2>
            <p>If you turn cookies off, some features will be disabled. Some of the features that make your site experience more efficient may not function properly.</p>
            <p className="mt-4">However, you will still be able to place quote requests by contacting our team directly.</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
          <Link href="/" className="btn-orange px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center inline-block">Back to Home</Link>
          <Link href="/privacy" className="bg-gray-100 text-primary px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs text-center inline-block hover:bg-gray-200 transition-colors">View Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
