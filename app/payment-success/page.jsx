const BUSINESS_NAME = "West Midlands Cleaner";

export default function PaymentSuccessPage() {
  return (
    <main className="page">
      <section className="shell" style={{ padding: "38px 0" }}>
        <div className="card" style={{ maxWidth: 660, margin: "0 auto", padding: 28 }}>
          <p className="kicker">{BUSINESS_NAME}</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 46px)" }}>
            Thank you — your payment was successful.
          </h1>
          <p className="lead" style={{ fontSize: 16 }}>
            We will now confirm cleaner partner availability and send your booking confirmation.
          </p>
          <p className="muted">
            Please keep an eye on the same WhatsApp or email conversation where your quote was
            confirmed.
          </p>
          <a href="/" className="btn btnPrimary" style={{ marginTop: 18 }}>
            Back to homepage
          </a>
        </div>
      </section>
    </main>
  );
}
