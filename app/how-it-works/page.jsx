import { buildSeoMetadata } from "../seoMetadata";

export const metadata = buildSeoMetadata({
  title: "How It Works | West Midlands Cleaner",
  description:
    "How the West Midlands Cleaner marketplace works: post a cleaning request, compare approved provider quotes, choose a provider and pay securely.",
  path: "/how-it-works"
});

const steps = [
  {
    eyebrow: "Step 1",
    title: "Post your cleaning request",
    text: "Tell us what needs cleaning, where you are and when you would like the clean. It only takes a few minutes."
  },
  {
    eyebrow: "Step 2",
    title: "Compare approved provider quotes",
    text: "Suitable cleaning businesses and independent cleaner partners can review the safe job details and send quotes through WMC."
  },
  {
    eyebrow: "Step 3",
    title: "Choose, pay and confirm",
    text: "Choose the provider you prefer and pay WMC securely only when you are ready to confirm the booking."
  }
];

export default function HowItWorksPage() {
  return (
    <main className="page howWorksPage">
      <section className="howHero shell">
        <div className="howHeroCopy">
          <p className="kicker">How it works</p>
          <h1>The simple way to book cleaning across the West Midlands</h1>
          <p className="lead">
            Post your request, compare quotes from approved local providers and choose who
            to book before paying WMC securely.
          </p>
        </div>

        <div className="howHeroGrid">
          <div className="howStepStack" aria-label="How WMC works in 3 steps">
            {steps.map((step, index) => (
              <article className={`howStepCard ${index === 0 ? "isActive" : ""}`} key={step.title}>
                <div className="howStepTopline">
                  <span className="howStepNumber">{index + 1}</span>
                  <span>{step.eyebrow}</span>
                </div>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
              </article>
            ))}
          </div>

          <div className="howVisualPanel" aria-label="WMC quote preview">
            <div className="howVisualGlow" aria-hidden="true" />
            <div className="howPhoneMockup">
              <div className="howPhoneTop">
                <span>WMC</span>
                <small>Quotes</small>
              </div>
              <div className="howPhoneBody">
                <p className="howPhoneKicker">Cleaning request</p>
                <h3>Compare cleaner quotes</h3>
                <div className="howMiniInput">Local area • Regular clean</div>
                <div className="howQuoteMini isRecommended">
                  <strong>Best available quote</strong>
                  <span>Approved provider • £60</span>
                </div>
                <div className="howQuoteMini">
                  <strong>Available quote</strong>
                  <span>Business partner • £68</span>
                </div>
                <button type="button">Choose provider</button>
              </div>
            </div>
            <div className="howTrustPills" aria-hidden="true">
              <span>No upfront payment</span>
              <span>Approved providers</span>
              <span>Secure WMC payment</span>
            </div>
          </div>
        </div>

        <div className="howGuideNote">
          <strong>Guide price only:</strong> shown to help customers understand a likely price range.
          Provider quotes may vary depending on service type, property details, availability,
          products, access, parking, condition and provider pricing.
        </div>

        <div className="howProviderChecks">
          <p className="kicker">Provider checks</p>
          <h2>What “approved provider” means</h2>
          <div className="grid3">
            <div className="guideBox">
              <strong>Details reviewed</strong>
              <br />
              WMC reviews key business or cleaner partner details before providers can access paid opportunities.
            </div>
            <div className="guideBox">
              <strong>Insurance requested</strong>
              <br />
              Public liability insurance details are requested before paid bookings are offered or assigned.
            </div>
            <div className="guideBox">
              <strong>Independent providers</strong>
              <br />
              Cleaning is carried out by the provider the customer chooses, not by WMC employees.
            </div>
          </div>
        </div>

        <div className="howActions">
          <a href="/book" className="btn btnPrimary">
            Post your cleaning request
          </a>
          <a href="/faq" className="btn btnSecondary">
            Read FAQ
          </a>
          <a href="/contact" className="btn btnSecondary">
            Contact WMC
          </a>
        </div>
      </section>
    </main>
  );
}
