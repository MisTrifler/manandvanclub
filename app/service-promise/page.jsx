import { buildSeoMetadata } from "../seoMetadata";

export const metadata = buildSeoMetadata({
  title: "Our Service Promise | West Midlands Cleaner",
  description:
    "Read the West Midlands Cleaner service promise for customers and providers, including provider quotes, secure payment, issue reporting and fair resolutions.",
  path: "/service-promise"
});

const customerPromises = [
  {
    title: "Compare provider quotes before payment",
    text: "You can compare suitable provider quotes before you choose who to book. No payment is taken when you first submit a cleaning request."
  },
  {
    title: "Secure online payment",
    text: "Once you choose a provider and confirm the quote, payment is made securely online before the clean goes ahead."
  },
  {
    title: "Provider details shared before the job",
    text: "You will know which independent cleaner or cleaning business you have chosen before the booking goes ahead."
  },
  {
    title: "Insurance requested and checked before paid jobs",
    text: "Providers must confirm suitable public liability insurance before accepting paid jobs through WMC."
  },
  {
    title: "Short issue-reporting window",
    text: "If something goes seriously wrong, report it within 48 hours of the clean using the contact form or support email so WMC can review the matter and contact the provider."
  },
  {
    title: "Fair review process",
    text: "Depending on the situation, WMC may help assess a re-clean, partial refund, full refund or another fair outcome on a case-by-case basis."
  }
];

export default function ServicePromisePage() {
  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">Our Service Promise</p>
          <h1>Our Service Promise</h1>
          <p className="lead">
            We want every clean booked through West Midlands Cleaner to go smoothly. Here is how we
            aim to protect customers and providers while keeping the marketplace fair.
          </p>
        </div>

        <div className="notice" style={{ marginTop: 28 }}>
          <strong>Our Service Promise is simple:</strong> clear provider quotes, secure payment,
          verified providers, and a fair process if something goes wrong.
        </div>

        <div className="grid3" style={{ marginTop: 28 }}>
          {customerPromises.map((item) => (
            <article key={item.title} className="card miniCard">
              <p className="kicker">Promise</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="grid2" style={{ marginTop: 28 }}>
          <article className="card formCard">
            <p className="kicker">What WMC promises customers</p>
            <h2>A clearer booking process from quote to payment.</h2>
            <p>
              Customers can submit a request, compare suitable provider quotes and choose a
              provider before paying. This helps reduce confusion and gives customers more
              control before the booking is confirmed.
            </p>
            <p>
              If a serious issue is reported within the 48-hour issue window, WMC can review the
              booking information, contact the provider and help assess a fair resolution.
            </p>
          </article>

          <article className="card formCard">
            <p className="kicker">What WMC does not guarantee</p>
            <h2>We do not make a blanket money-back promise.</h2>
            <p>
              WMC is not the employer of the cleaners or businesses on the platform. Each provider
              is independent and responsible for the quality of their own work.
            </p>
            <p>
              We do not promise a blanket “100% satisfaction or your money back” guarantee. Instead,
              we promise a fair review process that considers both the customer and the provider.
            </p>
            <p>
              For more detail on how issues are handled, read our <a href="/faq">FAQs</a>.
            </p>
          </article>
        </div>

        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">For providers</p>
          <h2>Secure customer payment and a fair issue window.</h2>
          <p>
            Customer payment is taken before the confirmed booking goes ahead. After you complete
            the job and mark it as done, the customer has a short 48-hour window to raise a serious
            concern.
          </p>
          <p>
            If no issue is raised, payout is processed promptly according to the platform and Stripe
            payout flow. If an issue is reported, WMC reviews it fairly and considers both sides.
          </p>
          <p>
            This system helps customers feel protected and helps providers avoid chasing customers
            for payment after completing work.
          </p>
        </div>

        <div className="warningBox" style={{ marginTop: 28 }}>
          WMC operates as a marketplace/platform. Cleaning services are delivered by independent
          providers, not WMC employees. WMC may assist with platform communication, payment
          administration and dispute handling where required.
        </div>

        <div className="actionRow" style={{ marginTop: 28 }}>
          <a href="/book#post-job" className="btn btnPrimary">
            Get cleaning quotes
          </a>
          <a href="/faq" className="btn btnSecondary">
            Read FAQs
          </a>
          <a href="/join-us" className="btn btnSecondary">
            Join us
          </a>
        </div>
      </section>
    </main>
  );
}
