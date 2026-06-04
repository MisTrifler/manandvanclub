import { buildSeoMetadata } from "../seoMetadata";
import { areaDescription, areaTitle, getAreaBySlug } from "./areaData";
import { getServiceLocationPagesByArea } from "../serviceLocationData";

export function generateAreaMetadata(slug) {
  const area = getAreaBySlug(slug);

  if (!area) {
    return buildSeoMetadata({
      title: "Area Not Found | West Midlands Cleaner",
      description: "West Midlands Cleaner area page not found.",
      path: "/areas"
    });
  }

  return buildSeoMetadata({
    title: areaTitle(area),
    description: areaDescription(area),
    path: `/areas/${area.slug}`
  });
}

export function generateCleanerAreaMetadata(slug) {
  const area = getAreaBySlug(slug);

  if (!area) {
    return buildSeoMetadata({
      title: "Cleaner Area Not Found | West Midlands Cleaner",
      description: "West Midlands Cleaner area page not found.",
      path: "/areas"
    });
  }

  return buildSeoMetadata({
    title: `Cleaners in ${area.name} | Compare Local Cleaning Quotes | WMC`,
    description: `Looking for cleaners in ${area.name}? Post a cleaning request and compare quotes from approved independent cleaners and cleaning businesses across the West Midlands.`,
    path: `/cleaners-${area.slug}`
  });
}

function AreaSchema({ area }) {
  const faqSchema = area.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: area.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      }
    : null;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Cleaning quotes in ${area.name}`,
    serviceType: "Cleaning quote marketplace",
    areaServed: [area.name, ...(area.nearby || [])],
    provider: {
      "@type": "LocalBusiness",
      name: "West Midlands Cleaner",
      url: "https://www.westmidlandscleaner.co.uk"
    },
    description: areaDescription(area),
    url: `https://www.westmidlandscleaner.co.uk/areas/${area.slug}`
  };

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
        name: "Areas",
        item: "https://www.westmidlandscleaner.co.uk/areas"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: area.name,
        item: `https://www.westmidlandscleaner.co.uk/areas/${area.slug}`
      }
    ]
  };

  return (
    <>
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
    </>
  );
}

function DefaultAreaContent({ area }) {
  return (
    <>
      <div className="grid2">
        <article className="card formCard">
          <p className="kicker">Local cleaning support</p>
          <h2>Request cleaning services in {area.name}.</h2>
          <p>{area.focus}</p>
          <p>
            WMC helps customers find local cleaners in a clearer way. Submit your request online
            with property details, preferred date, condition and any notes, then suitable approved
            providers can review the safe job details and submit quotes.
          </p>
        </article>

        <aside className="card formCard">
          <p className="kicker">Nearby areas</p>
          <h2>{area.name} and surrounding locations.</h2>
          <p>
            This area page may also be relevant if you are searching near {area.nearby.join(", ")}.
          </p>
          <div className="notice">
            Coverage is not guaranteed. Availability depends on date, time, provider coverage,
            travel distance and the type of clean requested.
          </div>
        </aside>
      </div>

      <div className="card formCard" style={{ marginTop: 28 }}>
        <p className="kicker">Services in {area.name}</p>
        <h2>Cleaning services WMC can help arrange.</h2>

        <div className="grid3">
          <div className="guideBox">
            <strong>Regular domestic cleaning</strong>
            <br />
            General cleaning for homes and flats, based on the time booked and agreed priorities.
          </div>

          <div className="guideBox">
            <strong>Deep cleaning</strong>
            <br />
            More detailed cleaning for kitchens, bathrooms, build-up and areas needing extra time.
          </div>

          <div className="guideBox">
            <strong>End-of-tenancy cleaning</strong>
            <br />
            Cleaning requests for tenants, landlords, move-outs and pre-move property needs.
          </div>

          <div className="guideBox">
            <strong>Airbnb / holiday-let changeovers</strong>
            <br />
            Cleaning support for short-stay, serviced accommodation and guest changeovers.
          </div>

          <div className="guideBox">
            <strong>After-builders cleaning</strong>
            <br />
            Cleaning after decorating, repairs, renovations or building work.
          </div>

          <div className="guideBox">
            <strong>One-off house cleans</strong>
            <br />
            Flexible one-off cleaning requests for homes, rentals and property professionals.
          </div>
        </div>
      </div>
    </>
  );
}

function EnhancedAreaContent({ area }) {
  return (
    <>
      <div className="grid2">
        <article className="card formCard">
          <p className="kicker">Local cleaning support</p>
          <h2>{area.supportTitle}</h2>
          {area.supportParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        <aside className="card formCard">
          <p className="kicker">Nearby areas</p>
          <h2>{area.name} and surrounding locations.</h2>
          <p>
            WMC can review cleaning requests around {area.name} and nearby areas including {area.nearby.join(", ")}.
          </p>
          <div className="notice">
            Coverage is not guaranteed. Availability depends on provider coverage, travel distance,
            date, time, service type and property details.
          </div>
          {area.relatedAreaLinks?.length ? (
            <div className="actionRow" style={{ marginTop: 18 }}>
              {area.relatedAreaLinks.slice(0, 3).map((link) => (
                <a key={link.href} href={link.href} className="btn btnSecondary">
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </aside>
      </div>

      <div className="card formCard" style={{ marginTop: 28 }}>
        <p className="kicker">Popular local cleaning requests</p>
        <h2>Cleaning services customers commonly compare quotes for in {area.name}.</h2>
        <div className="grid2">
          {area.localHighlights.map((item) => (
            <a key={item.title} href={item.href} className="guideBox" style={{ textDecoration: "none" }}>
              <strong>{item.title}</strong>
              <br />
              {item.copy}
            </a>
          ))}
        </div>
      </div>

      {area.propertyNotes?.length ? (
        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">Local property needs</p>
          <h2>Cleaning quotes for different property types in {area.name}.</h2>
          <div className="grid3">
            {area.propertyNotes.map((item) => (
              <div key={item.title} className="guideBox">
                <strong>{item.title}</strong>
                <br />
                {item.copy}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="card formCard" style={{ marginTop: 28 }}>
        <p className="kicker">Common situations</p>
        <h2>When {area.name} customers use WMC.</h2>
        <p>
          WMC is useful when the job needs a clearer quote, the customer wants provider choice,
          or the clean depends on property condition, access, timing or selected extras.
        </p>
        <div className="grid2">
          {(area.customerScenarios || []).map((scenario) => (
            <div key={scenario} className="guideBox">
              ✓ {scenario}
            </div>
          ))}
        </div>
      </div>

      {area.quoteChecklist?.length ? (
        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">Better quotes</p>
          <h2>What to include in your {area.name} cleaning request.</h2>
          <p>
            The more accurate your request is, the easier it is for independent providers to quote
            fairly and avoid surprises later.
          </p>
          <div className="grid2">
            {area.quoteChecklist.map((item) => (
              <div key={item} className="guideBox">
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="card formCard" style={{ marginTop: 28 }}>
        <p className="kicker">How {area.name} quotes work</p>
        <h2>Guide estimate first, provider quote before payment.</h2>
        <div className="grid3">
          {(area.processNotes || []).map((step) => (
            <div key={step.title} className="guideBox">
              <strong>{step.title}</strong>
              <br />
              {step.copy}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function AreaPageTemplate({ slug }) {
  const area = getAreaBySlug(slug);

  if (!area) {
    return (
      <main className="page">
        <section className="section shell">
          <div className="card formCard">
            <p className="kicker">Area not found</p>
            <h1>We could not find this area.</h1>
            <p>
              Please return to the areas page or start a booking request with your postcode so WMC
              can check availability.
            </p>
            <div className="actionRow">
              <a href="/areas" className="btn btnSecondary">
                View areas
              </a>
              <a href="/book" className="btn btnPrimary">
                Start booking request
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const hasEnhancedContent = Boolean(area.supportParagraphs?.length && area.localHighlights?.length);
  const localServicePages = getServiceLocationPagesByArea(area.slug);

  return (
    <main className="page">
      <AreaSchema area={area} />
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">{area.heroKicker || "Cleaners near you"}</p>
          <h1>{area.heroTitle || `Compare cleaners in ${area.name}.`}</h1>
          <p className="lead">
            {area.heroLead ||
              `Looking for cleaners near you in ${area.name}? West Midlands Cleaner helps you post a cleaning request, compare quotes from approved independent cleaning providers and choose who to book before paying securely online.`}
          </p>
        </div>

        {hasEnhancedContent ? <EnhancedAreaContent area={area} /> : <DefaultAreaContent area={area} />}


        {localServicePages.length ? (
          <div className="card formCard" style={{ marginTop: 28 }}>
            <p className="kicker">Service pages for {area.name}</p>
            <h2>Detailed cleaning quote pages for {area.name}.</h2>
            <p>
              These pages give customers more specific guidance for high-intent searches in {area.name},
              including what to include in the request and how provider quotes work before payment.
            </p>
            <div className="actionRow">
              {localServicePages.map((page) => (
                <a key={page.slug} href={`/${page.slug}`} className="btn btnSecondary">
                  {page.serviceName} in {area.name}
                </a>
              ))}
            </div>
          </div>
        ) : null}

        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">Typical guide examples</p>
          <h2>Useful price examples before you book.</h2>
          <p>
            Every clean is different, so these examples are only guide starting points. Approved
            providers submit their own quotes, and you only pay after choosing a provider.
          </p>

          <div className="grid3">
            <div className="guideBox">
              <strong>Regular 2-hour clean</strong>
              <br />
              From around £60, depending on location, cleaner availability and requested tasks.
            </div>

            <div className="guideBox">
              <strong>Deep clean</strong>
              <br />
              Often from around £105+, depending on property size, condition and extras.
            </div>

            <div className="guideBox">
              <strong>End-of-tenancy clean</strong>
              <br />
              Often from around £150+, depending on bedrooms, bathrooms, condition and scope.
            </div>
          </div>
        </div>

        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">FAQs for {area.name}</p>
          <h2>Common questions about cleaners in {area.name}.</h2>

          <div className="grid2">
            {(area.faqs || [
              {
                question: `Can I find cleaners near me in ${area.name}?`,
                answer:
                  "Yes. Post your cleaning request with your postcode and property details, then suitable approved providers can quote where available."
              },
              {
                question: `Can I compare cleaning quotes in ${area.name}?`,
                answer:
                  "Yes. WMC is built so customers can compare provider quotes and choose who they prefer before paying securely online."
              },
              {
                question: `Do providers cover all of ${area.name}?`,
                answer:
                  "Coverage depends on provider availability, travel distance, date, time and the type of cleaning service requested."
              },
              {
                question: `What cleaning services can I request in ${area.name}?`,
                answer:
                  "You can request domestic cleaning, deep cleaning, end-of-tenancy cleaning, Airbnb changeovers, move-out cleaning, one-off house cleans and after-builders cleaning."
              }
            ]).map((faq) => (
              <div key={faq.question} className="guideBox">
                <strong>{faq.question}</strong>
                <br />
                {faq.answer}
              </div>
            ))}
          </div>
        </div>

        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">How it works</p>
          <h2>Post your request. Compare quotes. Choose before payment.</h2>

          <div className="statusList">
            <div className="statusRow">
              <span>
                <strong>1. Post your request</strong>
                <br />
                Tell approved providers what type of clean you need in {area.name}, including
                property details and preferred timing.
              </span>
            </div>

            <div className="statusRow">
              <span>
                <strong>2. Providers send quotes</strong>
                <br />
                Suitable approved providers can review the safe job details and submit quotes.
              </span>
            </div>

            <div className="statusRow">
              <span>
                <strong>3. Choose, pay and book</strong>
                <br />
                Compare quotes, choose the provider you prefer, then pay securely before the
                selected provider attends.
              </span>
            </div>
          </div>

          <div className="actionRow" style={{ marginTop: 24 }}>
            <a href={`/book?area=${encodeURIComponent(area.name)}`} className="btn btnPrimary">
              Post a cleaning request in {area.name}
            </a>

            <a href="/areas" className="btn btnSecondary">
              View all areas
            </a>

            {area.relatedAreaLinks?.slice(3).map((link) => (
              <a key={link.href} href={link.href} className="btn btnSecondary">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="warningBox" style={{ marginTop: 28 }}>
          West Midlands Cleaner is a local cleaning marketplace. Cleaning is carried out by approved
          independent providers, not WMC employees. Providers are responsible for their own work,
          equipment, staff and service delivery. Customers choose a provider quote before payment.
        </div>
      </section>
    </main>
  );
}
