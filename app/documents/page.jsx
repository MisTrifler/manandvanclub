const EMAIL = "info@westmidlandscleaner.co.uk";

export const metadata = {
  title: "Policies & Information | West Midlands Cleaner",
  description:
    "West Midlands Cleaner policies, customer information, provider information, privacy policy, terms and cancellation/refund policy."
};

const customerLinks = [
  {
    title: "Post a cleaning request",
    description:
      "Submit your cleaning details and see a guide estimate. Approved providers can then submit quotes for you to compare.",
    href: "/book",
    button: "Post request"
  },
  {
    title: "Check booking status",
    description:
      "Check the status of a request using the details provided when the request was submitted.",
    href: "/booking-status",
    button: "Check status"
  },
  {
    title: "Frequently asked questions",
    description:
      "Read key information about guide estimates, provider quotes, payments, coverage and repeat cleaning requests.",
    href: "/faq",
    button: "Read FAQ"
  }
];

const legalLinks = [
  {
    title: "Privacy policy",
    description:
      "How West Midlands Cleaner may collect, use and handle booking, enquiry and application information.",
    href: "/privacy",
    button: "View privacy policy"
  },
  {
    title: "Terms and conditions",
    description:
      "Important terms for using the West Midlands Cleaner website and submitting booking requests.",
    href: "/terms",
    button: "View terms"
  },
  {
    title: "Cancellation and refund policy",
    description:
      "Information about cancellations, refunds and what happens if a booking cannot go ahead.",
    href: "/cancellation-refund-policy",
    button: "View policy"
  }
];

const providerLinks = [
  {
    title: "Self-employed cleaner partners",
    description:
      "Apply to be considered as an independent self-employed cleaner partner for suitable WMC booking opportunities.",
    href: "/join-us",
    button: "Apply as cleaner"
  },
  {
    title: "Cleaning business partners",
    description:
      "Cleaning businesses, teams and local companies can apply to quote for suitable marketplace requests.",
    href: "/business",
    button: "Apply as business"
  },
  {
    title: "Provider portals",
    description:
      "Approved providers can view suitable jobs, submit quotes, manage assigned jobs and follow completion steps.",
    href: "/business/jobs",
    button: "Business portal"
  }
];

export default function DocumentsPage() {
  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">Information hub</p>
          <h1>Policies and information.</h1>
          <p>
            Find the main customer, provider and policy information for West Midlands Cleaner.
            WMC is a local cleaning marketplace where customers post requests, approved providers
            submit quotes and customers choose who to book before payment.
          </p>
        </div>

        <div className="notice" style={{ marginBottom: 28 }}>
          <strong>Marketplace reminder:</strong> No payment is taken when you post a request. The
          website guide estimate is not a final price. Approved providers submit quotes, and you only
          pay after choosing a provider.
        </div>

        <div className="card formCard" style={{ marginBottom: 28 }}>
          <p className="kicker">Customers</p>
          <h2>Booking and customer information.</h2>
          <p>
            Customers can post a request, compare provider quotes, choose a provider, pay securely,
            message the selected provider and leave a WMC verified review after completion.
          </p>
          <div className="grid3" style={{ marginTop: 22 }}>
            {customerLinks.map((item) => (
              <article key={item.title} className="guideBox">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href={item.href} className="btn btnSecondary">{item.button}</a>
              </article>
            ))}
          </div>
        </div>

        <div className="card formCard" style={{ marginBottom: 28 }}>
          <p className="kicker">Providers</p>
          <h2>Cleaner and business partner information.</h2>
          <p>
            Providers are independent from WMC and are responsible for their own work, insurance,
            equipment, staff, tax and service delivery. Providers submit quotes and only take jobs
            they are happy to complete.
          </p>
          <div className="grid3" style={{ marginTop: 22 }}>
            {providerLinks.map((item) => (
              <article key={item.title} className="guideBox">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href={item.href} className="btn btnSecondary">{item.button}</a>
              </article>
            ))}
          </div>
        </div>

        <div className="card formCard" style={{ marginBottom: 28 }}>
          <p className="kicker">Policies</p>
          <h2>Legal and website policies.</h2>
          <p>
            These pages explain how WMC handles privacy, website terms, cancellations, refunds and
            marketplace responsibilities.
          </p>
          <div className="grid3" style={{ marginTop: 22 }}>
            {legalLinks.map((item) => (
              <article key={item.title} className="guideBox">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href={item.href} className="btn btnSecondary">{item.button}</a>
              </article>
            ))}
          </div>
        </div>

        <div className="warningBox" style={{ marginBottom: 28 }}>
          West Midlands Cleaner operates as a marketplace/platform. Cleaning services are carried out
          by the independent provider selected by the customer, not by WMC employees. WMC may assist
          with platform support, secure payment administration and unresolved issues where needed.
        </div>

        <div className="card formCard">
          <p className="kicker">Need help?</p>
          <h2>Contact West Midlands Cleaner.</h2>
          <p>
            Use the contact page for general support, customer questions, provider applications or
            unresolved platform issues.
          </p>
          <div className="actionRow">
            <a href="/contact" className="btn btnPrimary">Contact WMC</a>
            <a href="/book" className="btn btnSecondary">Post cleaning request</a>
            <a href="/faq" className="btn btnSecondary">Read FAQ</a>
          </div>
          <div className="notice" style={{ marginTop: 22 }}>
            Email: <strong>{EMAIL}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
