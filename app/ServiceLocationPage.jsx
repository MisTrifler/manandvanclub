import { buildSeoMetadata } from "./seoMetadata";
import { getServiceLocationPage } from "./serviceLocationData";

const siteUrl = "https://www.westmidlandscleaner.co.uk";

export function generateServiceLocationMetadata(slug) {
  const page = getServiceLocationPage(slug);

  if (!page) {
    return buildSeoMetadata({
      title: "Cleaning Page Not Found | West Midlands Cleaner",
      description: "West Midlands Cleaner service-location page not found.",
      path: "/services"
    });
  }

  return buildSeoMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/${page.slug}`
  });
}

function ServiceLocationSchema({ page }) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${page.serviceName} in ${page.areaName}`,
    serviceType: page.serviceName,
    areaServed: [page.areaName, ...(page.nearbyAreas || [])],
    provider: {
      "@type": "LocalBusiness",
      name: "West Midlands Cleaner",
      url: siteUrl
    },
    description: page.heroLead,
    url: `${siteUrl}/${page.slug}`
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
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
        name: page.areaName,
        item: `${siteUrl}/areas/${page.areaSlug}`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.serviceName,
        item: `${siteUrl}/${page.slug}`
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

export default function ServiceLocationPage({ slug }) {
  const page = getServiceLocationPage(slug);

  if (!page) {
    return (
      <main className="page">
        <section className="section shell">
          <div className="card formCard">
            <p className="kicker">Page not found</p>
            <h1>We could not find this cleaning page.</h1>
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

  return (
    <main className="page">
      <ServiceLocationSchema page={page} />

      <section className="section shell">
        <div className="heroGrid">
          <div className="card heroCard">
            <p className="kicker">{page.areaName} cleaning quotes</p>
            <h1>{page.heroTitle}</h1>
            <p className="lead">{page.heroLead}</p>
            <div className="notice">
              Submit the request first. Compare provider quotes before payment. Cleaning is carried
              out by the independent provider you choose, not by WMC employees.
            </div>
            <div className="heroActions">
              <a href={`/book?service=${encodeURIComponent(page.bookingValue)}&area=${encodeURIComponent(page.areaName)}`} className="btn btnPrimary">
                Post a {page.shortServiceName} request
              </a>
              <a href={`/areas/${page.areaSlug}`} className="btn btnSecondary">View {page.areaName} cleaners</a>
              <a href={`/services/${page.serviceSlug}`} className="btn btnSecondary">View service guide</a>
            </div>
          </div>

          <aside className="statusCard">
            <p className="kicker">How it works</p>
            <h2>Quote-first booking flow</h2>
            <div className="statusList">
              <div className="statusRow"><span>1. Add job details</span><strong>No payment</strong></div>
              <div className="statusRow"><span>2. Providers quote</span><strong>Compare</strong></div>
              <div className="statusRow"><span>3. Choose provider</span><strong>Decide</strong></div>
              <div className="statusRow"><span>4. Pay securely</span><strong>Book</strong></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section altBand">
        <div className="shell">
          <div className="grid2">
            <article className="card formCard">
              <p className="kicker">Who this page is for</p>
              <h2>{page.serviceName} for {page.areaName} customers.</h2>
              <ul style={{ paddingLeft: 18 }}>
                {page.audience.map((item) => (
                  <li key={item} style={{ marginBottom: 10 }}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="card formCard">
              <p className="kicker">Nearby locations</p>
              <h2>{page.areaName} and surrounding areas.</h2>
              <p>
                This page may also help if you are searching near {page.nearbyAreas.join(", ")}.
              </p>
              <div className="warningBox" style={{ marginTop: 14 }}>
                Coverage is not guaranteed. Availability depends on provider coverage, travel distance,
                date, time, service type and property details.
              </div>
            </article>
          </div>

          <div className="card formCard" style={{ marginTop: 28 }}>
            <p className="kicker">Local service details</p>
            <h2>What to know before requesting {page.shortServiceName} in {page.areaName}.</h2>
            <div className="grid3">
              {page.sections.map((section) => (
                <div key={section.title} className="guideBox">
                  <strong>{section.title}</strong>
                  <br />
                  {section.copy}
                </div>
              ))}
            </div>
          </div>

          <div className="card formCard" style={{ marginTop: 28 }}>
            <p className="kicker">Better quotes</p>
            <h2>What to include in your {page.areaName} request.</h2>
            <p>
              Clear details help independent providers quote more accurately and reduce surprises
              after you choose a provider.
            </p>
            <div className="grid2">
              {page.checklist.map((item) => (
                <div key={item} className="guideBox">✓ {item}</div>
              ))}
            </div>
          </div>

          <div className="grid2" style={{ marginTop: 28 }}>
            <article className="card formCard">
              <p className="kicker">Related local needs</p>
              <h2>Common ways customers describe this request.</h2>
              <div className="grid2">
                {page.localSearches.map((term) => (
                  <div key={term} className="guideBox">{term}</div>
                ))}
              </div>
            </article>

            <article className="card formCard">
              <p className="kicker">Related pages</p>
              <h2>Helpful pages for this request.</h2>
              <div className="actionRow">
                {page.relatedLinks.map((link) => (
                  <a key={link.href} href={link.href} className="btn btnSecondary">{link.label}</a>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="card formCard" style={{ marginBottom: 28 }}>
          <p className="kicker">FAQs</p>
          <h2>Common questions about {page.shortServiceName} in {page.areaName}.</h2>
          <div className="grid2">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="guideBox">
                <strong>{faq.question}</strong>
                <br />
                {faq.answer}
              </div>
            ))}
          </div>
        </div>

        <div className="card formCard">
          <p className="kicker">Ready to compare?</p>
          <h2>Post your {page.areaName} {page.shortServiceName} request.</h2>
          <p>
            Add your postcode, property details, condition, preferred date and any extras. Suitable
            approved providers can quote, and you choose before paying securely online.
          </p>
          <div className="actionRow">
            <a href={`/book?service=${encodeURIComponent(page.bookingValue)}&area=${encodeURIComponent(page.areaName)}`} className="btn btnPrimary">
              Post request
            </a>
            <a href="/services" className="btn btnSecondary">View all services</a>
            <a href="/faq" className="btn btnSecondary">Read FAQ</a>
          </div>
        </div>
      </section>
    </main>
  );
}
