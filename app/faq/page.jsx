import { buildSeoMetadata } from "../seoMetadata";

const EMAIL = "info@westmidlandscleaner.co.uk";

export const metadata = buildSeoMetadata({
  title: "FAQ | West Midlands Cleaner",
  description:
    "Frequently asked questions about West Midlands Cleaner, cleaning quotes, supplies, equipment, provider checks, insurance, payment, cancellations, damages and provider payouts.",
  path: "/faq"
});

const customerFaqs = [
  {
    question: "Is West Midlands Cleaner the cleaning company, or is it a marketplace?",
    answer:
      "West Midlands Cleaner is a marketplace, not a traditional cleaning company. We connect customers with independent cleaners and cleaning businesses. The providers are not WMC employees."
  },
  {
    question: "How does WMC work?",
    answer:
      "You submit a cleaning request, suitable independent providers can send quotes, you compare prices and provider details, then you choose the provider you want before paying securely online."
  },
  {
    question: "When do I pay?",
    answer:
      "No payment is taken when you first submit a request. You pay securely online once you have chosen a provider quote and are ready for the booking to go ahead."
  },
  {
    question: "How are quotes confirmed?",
    answer:
      "After you submit your cleaning request, interested providers can send you a quote. You compare prices, provider information and any available reviews, then choose the provider quote you want before you pay WMC securely."
  },
  {
    question: "Do cleaners bring their own cleaning products and equipment?",
    answer:
      "This varies by provider. Some cleaners include their own supplies and equipment as standard, while others may ask you to provide certain products. The selected provider quote should clarify exactly what is included. You can also state your preference when you submit your request."
  },
  {
    question: "Can I provide my own cleaning products?",
    answer:
      "Yes. Many customers prefer to use their own products, and cleaners can usually work with them. Make this clear in your request or when confirming the quote."
  },
  {
    question: "What happens if something is damaged during the clean?",
    answer:
      "Providers must confirm suitable public liability insurance before accepting paid jobs through WMC. If accidental damage occurs, report it within 48 hours. We will work with you and the provider to review the matter fairly."
  },
  {
    question: "What if I’m not happy with the quality of the clean?",
    answer:
      "Contact WMC within 48 hours of the job and explain your concerns clearly. Depending on the situation, WMC may help assess a re-clean, partial refund, full refund or another fair outcome. Because providers are independent, WMC facilitates the review process but does not directly control the provider’s work."
  },
  {
    question: "Can I cancel or reschedule?",
    answer:
      "Yes, but cancellation and rescheduling terms may depend on the provider and the timing. Please give as much notice as possible. Late cancellations may be subject to a charge at the provider’s discretion if time has already been reserved."
  },
  {
    question: "Are cleaners DBS checked?",
    answer:
      "Some providers may hold a DBS certificate. DBS checks are not mandatory for every domestic cleaning booking and WMC does not claim that every provider is DBS checked. If this is important to you, review provider details carefully before choosing who to book."
  },
  {
    question: "Are cleaning providers insured?",
    answer:
      "Providers must confirm suitable public liability insurance before accepting paid jobs through WMC. Customers should check provider details before choosing who to book."
  },
  {
    question: "How do I know a provider is reliable?",
    answer:
      "You can compare provider information, check available trust signals such as insurance details and reviews, and ask questions before choosing who to book. WMC reviews basic details and requires suitable insurance before paid jobs are offered through the platform."
  },
  {
    question: "How do keys and access work?",
    answer:
      "Access is arranged between you and your chosen provider. Common options include being home to let the cleaner in, leaving a key with a trusted neighbour, or using a secure key safe. Never share keys or access details in an unsafe way."
  }
];

const providerFaqs = [
  {
    question: "Do providers pay to join WMC?",
    answer:
      "There is no monthly subscription fee and no upfront advertising cost at this stage. Approved means the provider has completed basic verification checks, confirmed suitable insurance, and agreed to WMC platform terms. WMC only takes a 15% platform fee from jobs you win and complete through the platform."
  },
  {
    question: "How do providers get work?",
    answer:
      "Approved providers can view suitable local cleaning requests and choose the jobs they want to quote for. Customers compare quotes and choose which provider to book."
  },
  {
    question: "Are providers guaranteed work?",
    answer:
      "No. WMC is a marketplace and cannot guarantee work, fixed shifts or a set income. Opportunities depend on customer demand, area coverage, service type, availability and customer choice."
  },
  {
    question: "When are providers paid?",
    answer: (
      <>
        Customer payment is taken securely before the confirmed booking goes ahead. After the job is completed and marked as done, the customer has a 48-hour issue-reporting window. If no serious issue is raised, payout is processed according to the platform and <strong>Stripe payout flow</strong>.
      </>
    )
  },
  {
    question: "What happens if a customer raises an issue?",
    answer:
      "WMC reviews the information fairly, including booking details and platform communication where available. We consider both the customer’s concern and the provider’s response before deciding the next step."
  },
  {
    question: "Do providers stay independent?",
    answer:
      "Yes. Cleaning businesses and self-employed cleaners remain independent. They are responsible for their own tax, insurance, equipment, staff, service delivery and legal obligations."
  },
  {
    question: "Does WMC report provider income information?",
    answer:
      "WMC may need to keep and review provider payment records for tax, legal, fraud-prevention and platform reporting purposes. Providers remain responsible for their own tax position and should keep their own records of income earned through the platform."
  }
];

function FaqGrid({ items }) {
  return (
    <div className="grid2" style={{ marginTop: 20 }}>
      {items.map((item) => (
        <article key={item.question} className="card infoCard">
          <p className="kicker">Question</p>
          <h3 style={{ marginTop: 0 }}>{item.question}</h3>
          <p>{item.answer}</p>
        </article>
      ))}
    </div>
  );
}

export default function FaqPage() {
  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">Frequently Asked Questions</p>
          <h1>Frequently Asked Questions</h1>
          <p className="lead">
            Clear answers about WMC cleaning requests, quotes, payment, products, insurance,
            cancellations, damages and provider payouts.
          </p>
        </div>

        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">Customers</p>
          <h2>Customer questions.</h2>
          <p>
            These answers are designed to help customers understand exactly what happens before,
            during and after a cleaning booking through WMC.
          </p>
          <p>
            WMC is building its public review history transparently. You can also check our public
            Trustpilot profile before deciding whether to submit a request.
          </p>
          <div className="actionRow">
            <a
              href="https://www.trustpilot.com/review/westmidlandscleaner.co.uk"
              className="btn btnSecondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              See WMC on Trustpilot
            </a>
          </div>
        </div>

        <FaqGrid items={customerFaqs} />

        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">Still have questions?</p>
          <h2>Contact WMC and we will help.</h2>
          <p>
            If your question is not answered above, use the contact form and include your WMC
            reference if you already have one.
          </p>
          <div className="actionRow">
            <a href="/contact" className="btn btnPrimary">
              Contact WMC
            </a>
          </div>
        </div>

        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">Providers</p>
          <h2>Cleaning business and self-employed cleaner questions.</h2>
          <p>
            WMC is built for both cleaning businesses and self-employed cleaners who want to access
            local cleaning requests without paying monthly advertising fees.
          </p>
        </div>

        <FaqGrid items={providerFaqs} />

        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">Need help?</p>
          <h2>Contact WMC if you need support.</h2>
          <p>
            For booking questions, provider questions, payments, messages or issue support, use the
            contact form and include your WMC reference if you have one.
          </p>
          <div className="actionRow">
            <a href="/contact" className="btn btnPrimary">
              Contact WMC
            </a>
            <a href="/book#post-job" className="btn btnSecondary">
              Get cleaning quotes
            </a>
            <a href="/service-promise" className="btn btnSecondary">
              Service promise
            </a>
            <a href="/join-us" className="btn btnSecondary">
              Join us
            </a>
          </div>
        </div>

        <div className="warningBox" style={{ marginTop: 28 }}>
          West Midlands Cleaner operates as a marketplace/platform. Cleaning services are carried
          out by the independent provider selected by the customer. Providers are responsible for
          their own work, staff, equipment, insurance, tax, service quality and legal obligations.
          Email: <strong>{EMAIL}</strong>.
        </div>
      </section>
    </main>
  );
}
