import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Man and Van Club",
  description: "Learn how we use cookies to improve your experience at Man and Van Club.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/cookies',
  },
};

const cookieTable = [
  {
    name: "cookie-consent",
    category: "Necessary",
    purpose: "Stores your cookie consent preference (accepted, declined, or partial).",
    duration: "1 year",
  },
  {
    name: "cookie-consent-choices",
    category: "Necessary",
    purpose: "Stores your granular cookie preferences (analytics on/off, marketing on/off).",
    duration: "1 year",
  },
  {
    name: "_ga",
    category: "Analytics",
    purpose: "Google Analytics — used to distinguish users and generate statistical data about how the site is used.",
    duration: "2 years",
  },
  {
    name: "_ga_*",
    category: "Analytics",
    purpose: "Google Analytics — used to maintain session state across page views.",
    duration: "2 years",
  },
  {
    name: "_gid",
    category: "Analytics",
    purpose: "Google Analytics — used to distinguish users within a 24-hour period.",
    duration: "24 hours",
  },
  {
    name: "_gat",
    category: "Analytics",
    purpose: "Google Analytics — used to throttle request rate to the analytics servers.",
    duration: "1 minute",
  },
];

export default function CookiePolicy() {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl prose prose-slate">
        <h1 className="text-4xl font-black text-primary uppercase tracking-tighter mb-8">Cookie Policy</h1>
        
        <p className="text-lg text-text-secondary mb-8">
          This policy explains how Man and Van Club uses &quot;cookies&quot; to recognize your browser and capture and remember certain information.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">1. Do we use &quot;cookies&quot;?</h2>
            <p>Yes. Cookies are small files that a site or its service provider transfers to your computer&apos;s hard drive through your Web browser (if you allow it) that enables the site&apos;s or service provider&apos;s systems to recognize your browser and capture and remember certain information.</p>
            <p className="mt-4">For instance, they are used to help us understand your preferences based on previous or current site activity, which enables us to provide you improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">2. Categories of cookies we use</h2>
            <p className="mb-4">We divide cookies into three categories:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Necessary</strong> — Required for the site to function. These cannot be disabled.</li>
              <li><strong>Analytics</strong> — Help us understand how visitors interact with the site. These are optional.</li>
              <li><strong>Marketing</strong> — Used for targeted advertising. These are optional.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">3. Cookies we use</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 pr-4 font-black text-primary uppercase text-xs tracking-widest">Cookie</th>
                    <th className="text-left py-3 pr-4 font-black text-primary uppercase text-xs tracking-widest">Category</th>
                    <th className="text-left py-3 pr-4 font-black text-primary uppercase text-xs tracking-widest">Purpose</th>
                    <th className="text-left py-3 font-black text-primary uppercase text-xs tracking-widest">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieTable.map((cookie) => (
                    <tr key={cookie.name} className="border-b border-border/50">
                      <td className="py-3 pr-4 font-mono text-xs text-accent">{cookie.name}</td>
                      <td className="py-3 pr-4">
                        <span className={`inline-block px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                          cookie.category === "Necessary" ? "bg-green-50 text-green-700" : "bg-accent/10 text-accent"
                        }`}>
                          {cookie.category}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-text-secondary">{cookie.purpose}</td>
                      <td className="py-3 text-text-secondary whitespace-nowrap">{cookie.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">4. Controlling Cookies</h2>
            <p>You can choose which cookies to allow using the consent banner when you first visit, or by clicking &quot;Cookie Preferences&quot; in the footer at any time. You can also control cookies through your browser settings. Since every browser is a little different, look at your browser&apos;s Help Menu to learn the correct way to modify your cookies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">5. Disabling Cookies</h2>
            <p>If you turn non-essential cookies off, some features will be disabled. Analytics and marketing cookies are optional — the site works fully with only necessary cookies.</p>
            <p className="mt-4">However, you will still be able to place quote requests by contacting our team directly.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary uppercase tracking-tight mb-4">6. Google Consent Mode</h2>
            <p>We use Google Consent Mode to ensure that analytics and advertising cookies are only loaded after you have given explicit consent. Until you accept, Google tags operate in a cookieless mode that does not store any personally identifiable information.</p>
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
