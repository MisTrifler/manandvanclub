import { buildSeoMetadata } from "../seoMetadata";
import ContactForm from "./ContactForm";

export const metadata = buildSeoMetadata({
  title: "Contact West Midlands Cleaner | Cleaning Marketplace Support",
  description:
    "Contact West Midlands Cleaner for customer booking support, provider enquiries, payment questions and platform support across the West Midlands.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <main className="page">
      <section className="section shell contactPageShell">
        <div className="sectionIntro contactPageIntro">
          <p className="kicker">Contact WMC</p>
          <h1>Contact West Midlands Cleaner.</h1>
          <p className="lead">
            WMC is a cleaning marketplace, so most customer requests should be posted online for approved providers to quote. Use this page for platform support, booking questions, payment queries or partner enquiries.
          </p>
        </div>

        <div className="grid2 contactPageGrid">
          <section className="card formCard contactFormCard">
            <p className="kicker">Send a message</p>
            <h2>Contact form.</h2>
            <p>
              Complete the form below and WMC will reply by email where needed. If your message is about an existing booking, include your WMC reference.
            </p>
            <ContactForm />
          </section>

          <aside className="card sideCard contactHelpCard">
            <p className="kicker">Marketplace support</p>
            <h2>Useful links.</h2>

            <div className="guideBox" style={{ marginBottom: 14 }}>
              <strong>Post a cleaning request</strong>
              <br />
              Customers can post a cleaning request and compare quotes from approved independent providers.
            </div>

            <div className="guideBox" style={{ marginBottom: 14 }}>
              <strong>Check booking status</strong>
              <br />
              Use your WMC reference to check the progress of a request or booking.
            </div>

            <div className="guideBox" style={{ marginBottom: 14 }}>
              <strong>Email support</strong>
              <br />
              info@westmidlandscleaner.co.uk
            </div>

            <div className="guideBox" style={{ marginBottom: 14 }}>
              <strong>Phone / WhatsApp</strong>
              <br />
              <a href="tel:07943617386">07943 617386</a>
            </div>

            <div className="actionRow">
              <a href="/book#post-job" className="btn btnGreen">
                Post a cleaning request
              </a>

              <a href="/booking-status" className="btn btnSecondary">
                Check booking status
              </a>
            </div>
          </aside>
        </div>

        <div className="notice" style={{ marginTop: 24 }}>
          West Midlands Cleaner operates as a marketplace/platform. Cleaning services are carried out by the independent provider selected by the customer through the platform.
        </div>
      </section>
    </main>
  );
}
