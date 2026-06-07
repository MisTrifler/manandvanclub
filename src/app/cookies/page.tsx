import Link from "next/link";

export default function CookiePolicy() {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl prose prose-slate">
        <h1>Cookie Policy</h1>
        <p className="lead">Last Updated: June 6, 2026</p>
        
        <p>This Cookie Policy explains how Man & Van Club Ltd uses cookies and similar technologies to recognize you when you visit our website.</p>

        <h2>1. What are cookies?</h2>
        <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>

        <h2>2. Why do we use cookies?</h2>
        <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.</p>

        <h2>3. How can I control cookies?</h2>
        <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager or by changing your browser settings.</p>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/" className="btn-outline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
