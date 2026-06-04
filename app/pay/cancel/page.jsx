export default function PayCancelPage() {
  return (
    <main className="page">
      <section className="section shell">
        <div className="card formCard" style={{ maxWidth: 760, margin: "0 auto" }}>
          <p className="kicker">Payment cancelled</p>
          <h1>Your payment was not completed.</h1>

          <div className="warningBox">
            No payment was taken if you closed Stripe Checkout or cancelled before completing card
            payment.
          </div>

          <p>
            You can return to the payment page and try again, or contact WMC if you need platform
            support with your booking reference.
          </p>

          <div className="actionRow">
            <a href="/pay" className="btn btnPrimary">Try payment again</a>
            <a href="/contact" className="btn btnSecondary">Contact WMC</a>
          </div>
        </div>
      </section>
    </main>
  );
}
