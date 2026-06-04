import { buildSeoMetadata } from "../seoMetadata";

export const metadata = buildSeoMetadata({
  title: "About West Midlands Cleaner | Local Cleaning Marketplace",
  description:
    "Learn about West Midlands Cleaner, a local cleaning marketplace connecting customers across the West Midlands with independent cleaners and cleaning businesses.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">About West Midlands Cleaner</p>
          <h1>About West Midlands Cleaner</h1>
          <p className="lead">
            West Midlands Cleaner is a local cleaning marketplace built to connect people across
            the West Midlands with trusted independent cleaners and cleaning businesses.
          </p>
        </div>

        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">Local cleaning marketplace</p>
          <h2>We help customers compare quotes, book with confidence and pay securely online.</h2>
          <p>
            We are not a national franchise or a faceless agency. WMC is a small,
            regionally-focused platform built for customers, landlords, tenants, Airbnb hosts,
            property professionals, independent cleaners and cleaning businesses across the West
            Midlands.
          </p>
          <p>
            Our aim is simple: make booking cleaning clearer. Customers can submit a cleaning
            request, compare suitable provider quotes, choose who to book and pay securely online before
            the clean goes ahead.
          </p>
        </div>

        <div className="grid3" style={{ marginTop: 28 }}>
          <article className="card miniCard">
            <p className="kicker">What WMC is</p>
            <h3>A quote-matching and booking platform.</h3>
            <p>
              WMC helps customers post cleaning requests and compare quotes from independent local
              providers.
            </p>
          </article>

          <article className="card miniCard">
            <p className="kicker">What WMC is not</p>
            <h3>Not a traditional cleaning company.</h3>
            <p>
              Cleaners and businesses on WMC are independent providers. They are not WMC employees.
            </p>
          </article>

          <article className="card miniCard">
            <p className="kicker">What WMC handles</p>
            <h3>The booking journey.</h3>
            <p>
              We support the process from quote request to provider selection, secure payment and
              platform communication.
            </p>
            <p>
              Approved means the provider has passed basic verification checks, confirmed suitable
              insurance, and agreed to WMC platform terms before being able to accept paid jobs.
            </p>
          </article>
        </div>

        <div className="grid2" style={{ marginTop: 28 }}>
          <article className="card formCard">
            <p className="kicker">Our story</p>
            <h2>Booking a cleaner should be straightforward.</h2>
            <p>
              WMC was created because cleaning bookings can feel uncertain. Customers are often
              left guessing about prices, availability, products, equipment and who will actually
              attend the property.
            </p>
            <p>
              At the same time, good cleaners and cleaning businesses can waste time chasing leads,
              answering unpaid enquiries and trying to stand out online. WMC aims to make the
              process more organised for both sides.
            </p>
          </article>

          <article className="card formCard">
            <p className="kicker">Our approach</p>
            <h2>Local, transparent and growing provider-by-provider.</h2>
            <p>
              We are focused on the West Midlands and are building our provider network carefully.
              Coverage depends on provider availability in your area, and we are growing one
              provider at a time.
            </p>
            <p>
              We want customers to compare provider quotes before payment, understand who they are
              booking, and have a clearer route for support if something goes wrong.
            </p>
          </article>
        </div>

        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">Areas we serve</p>
          <h2>Built for the West Midlands.</h2>
          <p>
            West Midlands Cleaner is committed to building a network of reliable cleaning providers
            across Birmingham, Wolverhampton, Walsall, Dudley, Solihull, Coventry and surrounding
            West Midlands areas.
          </p>
          <p>
            Because providers are independent, availability can vary by area, date, service type and
            job details. Customers can submit a request and choose whether to proceed once suitable
            quotes are available.
          </p>
          <div className="actionRow">
            <a href="/book#post-job" className="btn btnPrimary">
              Get cleaning quotes
            </a>
            <a href="/service-promise" className="btn btnSecondary">
              Read our service promise
            </a>
            <a href="/join-us" className="btn btnSecondary">
              Join us
            </a>
            <a
              href="https://www.trustpilot.com/review/westmidlandscleaner.co.uk"
              className="btn btnSecondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              See our reviews on Trustpilot
            </a>
          </div>
        </div>

        <div className="warningBox" style={{ marginTop: 28 }}>
          West Midlands Cleaner is a marketplace, not an employer. All cleaning providers are
          independent and responsible for their own work, insurance, tax, equipment, staff and
          service delivery. WMC facilitates bookings between customers and approved providers.
        </div>
      </section>
    </main>
  );
}
