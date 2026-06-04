export default function BusinessOnboardingSuccessPage({ searchParams }) {
  const status = searchParams?.status || "";

  const isRefresh = status === "refresh";

  return (
    <main className="page">
      <section className="section shell">
        <div className="card formCard">
          <p className="kicker">Business payout setup</p>
          <h1>{isRefresh ? "Please complete your payout setup." : "Thank you."}</h1>

          {isRefresh ? (
            <>
              <p>
                Stripe has asked you to continue or restart your business payout setup. Please use
                the latest onboarding link sent by West Midlands Cleaner.
              </p>
              <div className="warningBox">
                If the link has expired, contact WMC and we will send a fresh Stripe onboarding link.
              </div>
            </>
          ) : (
            <>
              <p>
                Your Stripe payout setup has been submitted or updated. WMC will refresh your
                business payout status before any manual business payout is released.
              </p>
              <div className="notice">
                Completing Stripe onboarding does not guarantee paid work. WMC only releases
                business payouts manually after a job is completed, checked and payout ready.
              </div>
            </>
          )}

          <div className="actionRow" style={{ marginTop: 24 }}>
            <a href="/business/jobs" className="btn btnPrimary">Go to business portal</a>
          </div>
        </div>
      </section>
    </main>
  );
}
