import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Man and Van Club",
  description: "Learn how Man and Van Club uses cookies, what each cookie does, and how to manage your cookie preferences.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/cookies',
  },
};

export default function CookiePolicy() {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl prose prose-slate">
        <h1 className="text-4xl font-black text-primary uppercase tracking-tighter mb-8">Cookie Policy</h1>
        
        <p className="text-lg text-text-secondary mb-8">
          This policy explains how Man and Van Club uses cookies and similar technologies, what each category does, and how you can manage your preferences.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">1. What are cookies?</h2>
            <p>Cookies are small text files that are stored on your device when you visit a website. They help the site remember your actions and preferences over time. We use cookies to make our site work properly, to understand how it is used, and to improve your experience.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">2. Categories of cookies we use</h2>
            
            <div className="space-y-6 mt-6">
              <div className="bg-[#F9F9F7] border border-border rounded-2xl p-6">
                <h3 className="text-lg font-black text-primary mb-2">Necessary cookies</h3>
                <p className="text-sm text-text-secondary mb-3">These cookies are essential for the website to function and cannot be switched off. They are usually only set in response to actions made by you such as setting your privacy preferences, logging in, or filling in forms.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 font-bold text-primary">Cookie</th>
                        <th className="text-left py-2 font-bold text-primary">Purpose</th>
                        <th className="text-left py-2 font-bold text-primary">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 font-mono">cookie-consent</td>
                        <td className="py-2">Stores your cookie consent preference</td>
                        <td className="py-2">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[#F9F9F7] border border-border rounded-2xl p-6">
                <h3 className="text-lg font-black text-primary mb-2">Analytics cookies</h3>
                <p className="text-sm text-text-secondary mb-3">These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 font-bold text-primary">Cookie</th>
                        <th className="text-left py-2 font-bold text-primary">Purpose</th>
                        <th className="text-left py-2 font-bold text-primary">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 font-mono">_ga</td>
                        <td className="py-2">Google Analytics — distinguishes unique visitors</td>
                        <td className="py-2">2 years</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 font-mono">_ga_*</td>
                        <td className="py-2">Google Analytics — maintains session state</td>
                        <td className="py-2">2 years</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 font-mono">_gat</td>
                        <td className="py-2">Google Analytics — throttles request rate</td>
                        <td className="py-2">1 minute</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 font-mono">_gid</td>
                        <td className="py-2">Google Analytics — distinguishes unique visitors per day</td>
                        <td className="py-2">24 hours</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[#F9F9F7] border border-border rounded-2xl p-6">
                <h3 className="text-lg font-black text-primary mb-2">Marketing cookies</h3>
                <p className="text-sm text-text-secondary">These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">3. Third-party services</h2>
            <p>We use Google Analytics (provided by Google LLC) to understand how visitors interact with our website. Google Analytics uses cookies to collect information about how visitors use our site. This data is aggregated and anonymous. You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">Google Analytics opt-out browser add-on</a>.</p>
            <p className="mt-4">We also use Google Tag Manager to manage analytics and tracking scripts. More information is available in <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">Google&apos;s Privacy Policy</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">4. Controlling cookies</h2>
            <p>You can manage your cookie preferences at any time:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Use the cookie consent banner on our site to accept, reject or customise which cookies you allow.</li>
              <li>Adjust your browser settings to block or delete cookies. Each browser is different, so check your browser&apos;s Help menu.</li>
              <li>Use the Google Analytics opt-out add-on if you do not want your data collected by Google Analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">5. What happens if you disable cookies</h2>
            <p>If you turn off cookies, some features will be disabled. The core functionality of submitting a move request will still work, but analytics and personalised features may not function properly.</p>
            <p className="mt-4">You can still place quote requests by contacting our team directly at <a href="mailto:support@manandvanclub.co.uk" className="text-primary font-bold hover:underline">support@manandvanclub.co.uk</a> or by calling <a href="tel:07943617386" className="text-primary font-bold hover:underline">07943 617 386</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">6. Changes to this policy</h2>
            <p>We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">7. Contact</h2>
            <p>If you have any questions about our use of cookies, please contact us at <a href="mailto:support@manandvanclub.co.uk" className="text-primary font-bold hover:underline">support@manandvanclub.co.uk</a>.</p>
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
