import { buildSeoMetadata } from "../seoMetadata";
import { servicePages } from "./serviceData";
import { serviceLocationPages } from "../serviceLocationData";

export const metadata = buildSeoMetadata({
  title: "Cleaning Services West Midlands | Compare Provider Quotes | WMC",
  description:
    "Post cleaning requests across the West Midlands and compare quotes from approved independent cleaners and cleaning business partners.",
  path: "/services"
});

const BUSINESS_EMAIL = "info@westmidlandscleaner.co.uk";

const bookingConfidence = [
  "No payment taken when posting a request",
  "Guide estimate shown before submission",
  "Approved providers submit their own quotes",
  "Customer chooses provider before payment",
  "Secure Stripe payment after choosing a provider",
  "Cleaning is carried out by the selected independent provider"
];

const faqs = [
  {
    question: "Do I pay when I submit a cleaning job?",
    answer:
      "No. You post your cleaning request first. Approved providers can submit quotes, and you only pay after choosing the provider you want to book."
  },
  {
    question: "Is the website estimate final?",
    answer:
      "No. The website estimate is a guide only. Provider quotes may be higher or lower depending on service type, condition, timing, access, parking, products and availability."
  },
  {
    question: "Can I request weekly or fortnightly cleaning?",
    answer:
      "Yes. Post the first request and mention that you may want repeat cleaning. Providers can include this in their quote or message."
  },
  {
    question: "Who completes the cleaning job?",
    answer:
      "Jobs are completed by the approved independent provider selected by the customer. This may be a self-employed cleaner partner or an approved cleaning business partner."
  }
];

const siteUrl = "https://www.westmidlandscleaner.co.uk";

const servicesPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Cleaning Services West Midlands",
  url: `${siteUrl}/services`,
  description:
    "Compare cleaning service quotes across the West Midlands, including domestic cleaning, deep cleaning, end-of-tenancy cleaning, Airbnb cleaning and after-builders cleaning."
};

const servicesItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "West Midlands Cleaner services",
  itemListElement: servicePages.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.title,
    url: `${siteUrl}/services/${service.slug}`
  }))
};


const serviceLocationItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "West Midlands Cleaner local service pages",
  itemListElement: serviceLocationPages.map((page, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${page.serviceName} in ${page.areaName}`,
    url: `${siteUrl}/${page.slug}`
  }))
};

const servicesBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: `${siteUrl}/services`
    }
  ]
};

const servicesFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
};

export default function ServicesPage() {
  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesItemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLocationItemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesBreadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesFaqSchema) }}
      />
      <section className="section shell">
        <div className="heroGrid">
          <div className="card heroCard">
            <p className="kicker">Cleaning services West Midlands</p>
            <h1>Post a cleaning request and compare provider quotes.</h1>
            <p className="lead">
              Choose the service you need, add property details and let approved independent cleaners
              and cleaning business partners quote for your job. You choose the provider before paying.
            </p>

            <div className="heroActions">
              <a href="/book" className="btn btnPrimary">
                Post your cleaning request
              </a>

              <a href="/areas" className="btn btnSecondary">
                Areas covered
              </a>

              <a href="/contact" className="btn btnSecondary">
                Contact WMC
              </a>
            </div>

            <div className="pillRow">
              <span className="pill">✓ Provider quotes before payment</span>
              <span className="pill">✓ Businesses and self-employed cleaners</span>
              <span className="pill">✓ Guide estimate only</span>
              <span className="pill">✓ Customer chooses provider</span>
            </div>
          </div>

          <aside className="statusCard">
            <p className="kicker">How it works</p>
            <h2>Post. Compare. Choose. Pay.</h2>

            <div className="statusList">
              <div className="statusRow">
                <span>1. Choose your service</span>
                <strong>Start</strong>
              </div>

              <div className="statusRow">
                <span>2. Add property details</span>
                <strong>Details</strong>
              </div>

              <div className="statusRow">
                <span>3. Providers submit quotes</span>
                <strong>Quotes</strong>
              </div>

              <div className="statusRow">
                <span>4. Compare providers</span>
                <strong>Choose</strong>
              </div>

              <div className="statusRow">
                <span>5. Pay after choosing</span>
                <strong>Book</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section altBand">
        <div className="shell">
          <div className="sectionIntro">
            <p className="kicker">Services</p>
            <h2>Choose the clean that best matches the property.</h2>
            <p>
              Each service page explains who it is best for, what providers usually consider and why
              provider quotes can vary. Prices shown are guide estimates only.
            </p>
          </div>

          <div className="grid3">
            {servicePages.map((service) => (
              <article key={service.slug} className="infoCard card">
                <p className="kicker">Service</p>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>

                <div className="notice">
                  <strong>{service.guide}</strong>
                  <br />
                  Guide estimate only. Providers submit quotes before payment.
                </div>

                <ul style={{ marginTop: 14, paddingLeft: 18 }}>
                  {service.idealFor.slice(0, 3).map((point) => (
                    <li key={point} style={{ marginBottom: 8 }}>
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="actionRow" style={{ marginTop: 18 }}>
                  <a href={`/services/${service.slug}`} className="btn btnSecondary">
                    View service details
                  </a>
                  <a
                    href={`/book?service=${encodeURIComponent(service.bookingValue)}`}
                    className="btn btnPrimary"
                  >
                    Post request
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="card formCard" style={{ marginTop: 28 }}>
            <p className="kicker">Popular local service pages</p>
            <h2>High-intent cleaning quote pages by service and area.</h2>
            <p>
              These pages are built for customers searching for a specific cleaning service in a
              specific local area. They explain scope, quote details, local considerations and how
              provider choice works before payment.
            </p>
            <div className="grid2" style={{ marginTop: 18 }}>
              {serviceLocationPages.map((page) => (
                <a key={page.slug} href={`/${page.slug}`} className="guideBox" style={{ textDecoration: "none" }}>
                  <strong>{page.serviceName} in {page.areaName}</strong>
                  <br />
                  {page.metaDescription}
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section className="section shell">
        <div className="card formCard" style={{ marginBottom: 28 }}>
          <p className="kicker">Booking confidence</p>
          <h2>Clear before payment.</h2>

          <div className="grid2">
            {bookingConfidence.map((point) => (
              <div key={point} className="guideBox">
                ✓ {point}
              </div>
            ))}
          </div>
        </div>

        <div className="grid2" style={{ marginBottom: 28 }}>
          {faqs.map((faq) => (
            <article key={faq.question} className="card infoCard">
              <p className="kicker">FAQ</p>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>

        <div className="card formCard">
          <p className="kicker">Need help choosing?</p>
          <h2>Use the contact page if you are unsure.</h2>
          <p>
            Not sure whether you need regular cleaning, deep cleaning, end-of-tenancy, Airbnb
            changeover or after-builders cleaning? Send details through the contact page before
            posting a request.
          </p>

          <div className="actionRow">
            <a href="/book" className="btn btnPrimary">
              Post your cleaning request
            </a>

            <a href="/contact" className="btn btnSecondary">
              Contact WMC
            </a>

            <a href="/faq" className="btn btnSecondary">
              Read FAQ
            </a>
          </div>
        </div>

        <div className="notice" style={{ marginTop: 28 }}>
          Need support? Use the contact page or email <strong>{BUSINESS_EMAIL}</strong>.
        </div>

        <div className="warningBox" style={{ marginTop: 28 }}>
          West Midlands Cleaner is a local cleaning marketplace/platform. Customers post cleaning
          requests, approved independent providers submit quotes, and customers choose a provider
          before payment. Cleaning partners are not employees of WMC.
        </div>
      </section>
    </main>
  );
}
