import { buildSeoMetadata } from "../../seoMetadata";
import { getCanonicalServicePath, getServiceBySlug, serviceRouteSlugs } from "../serviceData";
import { getServiceLocationPagesByService } from "../../serviceLocationData";

export function generateStaticParams() {
  return serviceRouteSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return buildSeoMetadata({
      title: "Cleaning Service Not Found | West Midlands Cleaner",
      description: "West Midlands Cleaner cleaning service page not found.",
      path: "/services"
    });
  }

  return buildSeoMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: getCanonicalServicePath(service)
  });
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <main className="page">
        <section className="section shell">
          <div className="card formCard">
            <p className="kicker">Service not found</p>
            <h1>We could not find this cleaning service.</h1>
            <p>Return to the services page or post a cleaning request with your property details.</p>
            <div className="actionRow">
              <a href="/services" className="btn btnSecondary">View services</a>
              <a href="/book" className="btn btnPrimary">Post cleaning request</a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    areaServed: service.areaServed || "West Midlands",
    provider: {
      "@type": "LocalBusiness",
      name: "West Midlands Cleaner",
      url: "https://www.westmidlandscleaner.co.uk"
    },
    description: service.summary,
    url: `https://www.westmidlandscleaner.co.uk/services/${service.slug}`
  };

  const faqSchema = service.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      }
    : null;

  const localServicePages = getServiceLocationPagesByService(service.slug);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.westmidlandscleaner.co.uk"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://www.westmidlandscleaner.co.uk/services"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `https://www.westmidlandscleaner.co.uk/services/${service.slug}`
      }
    ]
  };

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <section className="section shell">
        <div className="heroGrid">
          <div className="card heroCard">
            <p className="kicker">Cleaning service</p>
            <h1>{service.heroTitle || `${service.title} across the West Midlands.`}</h1>
            <p className="lead">{service.summary}</p>

            <div className="notice">
              <strong>{service.guide}</strong>
              <br />
              This is a guide estimate only. Approved providers submit their own quotes after
              reviewing the safe job details.
            </div>

            <div className="heroActions">
              <a
                href={`/book?service=${encodeURIComponent(service.bookingValue)}`}
                className="btn btnPrimary"
              >
                Post this cleaning request
              </a>
              <a href="/services" className="btn btnSecondary">View all services</a>
              <a href="/contact" className="btn btnSecondary">Ask before posting</a>
            </div>
          </div>

          <aside className="statusCard">
            <p className="kicker">Marketplace flow</p>
            <h2>How quotes work</h2>
            <div className="statusList">
              <div className="statusRow">
                <span>1. Post your request</span>
                <strong>No payment</strong>
              </div>
              <div className="statusRow">
                <span>2. Approved providers quote</span>
                <strong>Compare</strong>
              </div>
              <div className="statusRow">
                <span>3. Choose your provider</span>
                <strong>Decide</strong>
              </div>
              <div className="statusRow">
                <span>4. Pay securely</span>
                <strong>Book</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section altBand">
        <div className="shell">
          <div className="grid2">
            <article className="card formCard">
              <p className="kicker">Best for</p>
              <h2>When to choose {service.shortTitle}.</h2>
              <ul style={{ paddingLeft: 18 }}>
                {service.idealFor.map((point) => (
                  <li key={point} style={{ marginBottom: 10 }}>{point}</li>
                ))}
              </ul>
            </article>

            <article className="card formCard">
              <p className="kicker">Provider fit</p>
              <h2>Who may quote?</h2>
              <p>{service.providerFit}</p>
              <div className="guideBox" style={{ marginTop: 14 }}>
                WMC does not carry out the cleaning itself. Cleaning is carried out by the
                independent provider selected by the customer.
              </div>
            </article>
          </div>

          <div className="card formCard" style={{ marginTop: 28 }}>
            <p className="kicker">Typical scope</p>
            <h2>What providers usually consider.</h2>
            <div className="grid3">
              {service.includes.map((point) => (
                <div key={point} className="guideBox">✓ {point}</div>
              ))}
            </div>
            <div className="warningBox" style={{ marginTop: 18 }}>
              {service.note}
            </div>
          </div>

          {service.detailedSections?.length ? (
            <div className="card formCard" style={{ marginTop: 28 }}>
              <p className="kicker">Service details</p>
              <h2>{service.detailHeading || `What to know about ${service.shortTitle.toLowerCase()}.`}</h2>
              <div className="grid2">
                {service.detailedSections.map((section) => (
                  <div key={section.title} className="guideBox">
                    <strong>{section.title}</strong>
                    <br />
                    {section.copy}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {service.quoteChecklist?.length ? (
            <div className="card formCard" style={{ marginTop: 28 }}>
              <p className="kicker">Better provider quotes</p>
              <h2>What to include in your request.</h2>
              <p>
                Clear details help independent providers quote more accurately before you choose
                and pay.
              </p>
              <div className="grid2">
                {service.quoteChecklist.map((item) => (
                  <div key={item} className="guideBox">
                    ✓ {item}
                  </div>
                ))}
              </div>
            </div>
          ) : null}


          {localServicePages.length ? (
            <div className="card formCard" style={{ marginTop: 28 }}>
              <p className="kicker">Local service pages</p>
              <h2>Compare {service.shortTitle.toLowerCase()} quotes in key areas.</h2>
              <p>
                These local pages give more detailed guidance for customers searching by service and area.
              </p>
              <div className="actionRow">
                {localServicePages.map((page) => (
                  <a key={page.slug} href={`/${page.slug}`} className="btn btnSecondary">
                    {page.areaName}
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          {service.relatedAreaLinks?.length ? (
            <div className="card formCard" style={{ marginTop: 28 }}>
              <p className="kicker">Popular areas</p>
              <h2>Compare {service.shortTitle.toLowerCase()} quotes across key local areas.</h2>
              <div className="actionRow">
                {service.relatedAreaLinks.map((link) => (
                  <a key={link.href} href={link.href} className="btn btnSecondary">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          {service.relatedServiceLinks?.length ? (
            <div className="card formCard" style={{ marginTop: 28 }}>
              <p className="kicker">Related services</p>
              <h2>Other cleaning options that may fit your request.</h2>
              <div className="actionRow">
                {service.relatedServiceLinks.map((link) => (
                  <a key={link.href} href={link.href} className="btn btnSecondary">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section shell">
        {service.faqs?.length ? (
          <div className="card formCard" style={{ marginBottom: 28 }}>
            <p className="kicker">FAQs</p>
            <h2>Common questions about {service.shortTitle.toLowerCase()}.</h2>
            <div className="grid2">
              {service.faqs.map((faq) => (
                <div key={faq.question} className="guideBox">
                  <strong>{faq.question}</strong>
                  <br />
                  {faq.answer}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="card formCard">
          <p className="kicker">Ready to compare?</p>
          <h2>Post your {service.shortTitle.toLowerCase()} request.</h2>
          <p>
            Add your postcode, property details, preferred date and provider preference. Suitable
            approved providers can submit quotes, and you choose before paying.
          </p>
          <div className="actionRow">
            <a
              href={`/book?service=${encodeURIComponent(service.bookingValue)}`}
              className="btn btnPrimary"
            >
              Post request
            </a>
            <a href="/areas" className="btn btnSecondary">Check areas</a>
            <a href="/faq" className="btn btnSecondary">Read FAQ</a>
          </div>
        </div>
      </section>
    </main>
  );
}
