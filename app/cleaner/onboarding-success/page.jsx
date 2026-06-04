import Link from "next/link";

export const metadata = {
  title: "Payout setup submitted | West Midlands Cleaner",
  description:
    "Your West Midlands Cleaner Stripe Express payout setup has been submitted."
};

export default function CleanerOnboardingSuccessPage() {
  return (
    <main className="page">
      <section className="section shell">
        <div
          className="card formCard"
          style={{
            maxWidth: 860,
            margin: "0 auto",
            textAlign: "center"
          }}
        >
          <p className="kicker">West Midlands Cleaner</p>

          <h1>Payout setup submitted.</h1>

          <div className="guideBox" style={{ marginTop: 24, textAlign: "left" }}>
            <strong>Thank you.</strong>
            <br />
            Your Stripe Express payout setup has been submitted successfully.
          </div>

          <p className="lead" style={{ marginTop: 24 }}>
            West Midlands Cleaner will now review your onboarding status, documents and approval
            checks before offering paid cleaning bookings.
          </p>

          <div className="notice" style={{ marginTop: 24, textAlign: "left" }}>
            <strong>What happens next?</strong>
            <br />
            You do not need to do anything else on this page. WMC will contact you when your
            onboarding and checks are complete.
          </div>

          <div className="actionRow" style={{ justifyContent: "center", marginTop: 28 }}>
            <Link href="/cleaner/jobs" className="btn btnPrimary">
              Go to cleaner jobs portal
            </Link>

            <Link href="/" className="btn btnSecondary">
              Return to homepage
            </Link>
          </div>

          <p className="muted" style={{ marginTop: 24 }}>
            You may now close this page.
          </p>
        </div>
      </section>
    </main>
  );
}
