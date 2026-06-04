export default function PaySuccessPage() {
  return (
    <main className="page">
      <section className="section shell">
        <div className="card formCard" style={{ maxWidth: 760, margin: "0 auto" }}>
          <p className="kicker">Payment received</p>
          <h1>Thank you for your payment.</h1>

          <div className="guideBox">
            Your Stripe payment has been submitted. Your selected provider quote can now move to the
            confirmed booking stage. Please use your booking reference when contacting WMC.
          </div>

          <p>
            If you have any questions, use the contact page or the platform message link connected
            to your booking reference.
          </p>

          <div className="actionRow">
            <a href="/" className="btn btnPrimary">Back to homepage</a>
            <a href="/contact" className="btn btnSecondary">Contact WMC</a>
          </div>
        </div>
      </section>
    </main>
  );
}
