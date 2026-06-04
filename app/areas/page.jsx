import { buildSeoMetadata } from "../seoMetadata";
import { areaGroups, allAreas } from "./areaData";
import { serviceLocationPages } from "../serviceLocationData";

export const metadata = buildSeoMetadata({
  title: "Areas Covered | Cleaning Quotes Across the West Midlands | WMC",
  description:
    "Compare cleaning quotes across Birmingham, Walsall, Wolverhampton, Dudley, Sandwell, Solihull, Coventry, Sutton Coldfield, Brownhills and nearby areas.",
  path: "/areas"
});

const siteUrl = "https://www.westmidlandscleaner.co.uk";

const areasPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Areas covered by West Midlands Cleaner",
  url: `${siteUrl}/areas`,
  description:
    "West Midlands Cleaner accepts cleaning quote requests across Birmingham, Walsall, Wolverhampton, Dudley, Sandwell, Solihull, Coventry, Sutton Coldfield, Brownhills and nearby areas, subject to independent provider availability."
};

const areasItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "West Midlands Cleaner local area pages",
  itemListElement: allAreas.map((area, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: area.name,
    url: `${siteUrl}/areas/${area.slug}`
  }))
};


const areaServiceLocationItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Service-location cleaning pages",
  itemListElement: serviceLocationPages.map((page, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${page.serviceName} in ${page.areaName}`,
    url: `${siteUrl}/${page.slug}`
  }))
};

const areasBreadcrumbSchema = {
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
      name: "Areas",
      item: `${siteUrl}/areas`
    }
  ]
};

const coreServices = [
  {
    title: "Domestic cleaning",
    description:
      "Regular or one-off cleaning for homes, flats and apartments where customers want provider choice before payment.",
    href: "/services/domestic-cleaning"
  },
  {
    title: "Deep cleaning",
    description:
      "More detailed cleaning for kitchens, bathrooms, dust, grease, limescale and properties that need extra time.",
    href: "/services/deep-cleaning"
  },
  {
    title: "End-of-tenancy cleaning",
    description:
      "Move-out, pre-move, landlord, tenant and estate-agent cleaning requests where scope and extras matter.",
    href: "/services/end-of-tenancy-cleaning"
  },
  {
    title: "Airbnb and holiday-let cleaning",
    description:
      "Guest-ready cleaning and changeover requests for short-stay properties, serviced accommodation and hosts.",
    href: "/services/airbnb-cleaning"
  },
  {
    title: "After-builders cleaning",
    description:
      "Cleaning after renovation, decorating, repairs or building work where dust level and room details affect quotes.",
    href: "/services/after-builders-cleaning"
  },
  {
    title: "Move-out cleaning",
    description:
      "Flexible empty-property cleaning for tenants, landlords, movers and property professionals.",
    href: "/services/move-out-cleaning"
  }
];

export default function AreasPage() {
  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areasPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areasItemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaServiceLocationItemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areasBreadcrumbSchema) }}
      />
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">Areas covered</p>
          <h1>Cleaning quotes across the West Midlands.</h1>
          <p className="lead">
            West Midlands Cleaner helps customers request and compare cleaning quotes across
            Birmingham, Walsall, Wolverhampton, Dudley, Sandwell, Solihull, Coventry, Sutton
            Coldfield, West Bromwich, Brownhills, Cannock, Lichfield, Burntwood and nearby areas.
            Coverage depends on independent provider availability, location, service type, date and
            property details.
          </p>
        </div>

        <div className="card formCard" style={{ marginBottom: 28 }}>
          <p className="kicker">Quick postcode check</p>
          <h2>Enter your postcode to start a local cleaning request.</h2>
          <p>
            Add your postcode and property details so suitable approved independent providers can
            review the safe job information and quote where available. No payment is needed when
            you first post the request.
          </p>

          <form action="/book" method="get" className="postcodeCheckForm">
            <label className="srOnly" htmlFor="areas-postcode-check">
              Enter your postcode
            </label>
            <input
              id="areas-postcode-check"
              name="postcode"
              type="text"
              inputMode="text"
              autoComplete="postal-code"
              placeholder="Enter your postcode"
              className="postcodeCheckInput"
            />
            <button type="submit" className="btn btnPrimary">
              Check availability
            </button>
          </form>
        </div>

        <div className="grid2">
          {areaGroups.map((group) => (
            <article key={group.group} className="card formCard">
              <p className="kicker">Area group</p>
              <h2>{group.group}</h2>
              <p>{group.intro}</p>

              <div className="pillRow" style={{ marginTop: 18 }}>
                {group.areas.map((area) => (
                  <a key={area.slug} href={`/areas/${area.slug}`} className="pill">
                    {area.name}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">Choose your local page</p>
          <h2>Choose the area page closest to the property.</h2>
          <p>
            Each area page gives more relevant information for that location, including nearby
            neighbourhoods, common cleaning requests, property types, provider quote details and
            local FAQs. Use the closest area page if you are comparing cleaners near you.
          </p>
          <div className="notice" style={{ marginTop: 16 }}>
            WMC is a marketplace/platform. Cleaning is carried out by the independent cleaner or
            cleaning business selected by the customer, not by WMC employees.
          </div>
        </div>

        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">Services by area</p>
          <h2>Cleaning services customers can request across the West Midlands.</h2>
          <p>
            The best provider quote depends on property size, current condition, access, parking,
            timing, selected extras and whether the clean is for a home, rental, landlord, Airbnb
            or post-work property.
          </p>

          <div className="grid3" style={{ marginTop: 18 }}>
            {coreServices.map((service) => (
              <a key={service.href} href={service.href} className="guideBox" style={{ textDecoration: "none" }}>
                <strong>{service.title}</strong>
                <br />
                {service.description}
              </a>
            ))}
          </div>
        </div>


        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">Popular service and area pages</p>
          <h2>Detailed quote pages for high-intent local searches.</h2>
          <p>
            These pages help customers who already know the service and area they need. Each page
            includes local context, quote guidance, FAQs and links back to the main service and area pages.
          </p>
          <div className="grid2" style={{ marginTop: 18 }}>
            {serviceLocationPages.map((page) => (
              <a key={page.slug} href={`/${page.slug}`} className="guideBox" style={{ textDecoration: "none" }}>
                <strong>{page.serviceName} in {page.areaName}</strong>
                <br />
                {page.heroLead}
              </a>
            ))}
          </div>
        </div>

        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">Before you book</p>
          <h2>Read our Service Promise.</h2>
          <p>
            See how WMC explains guide estimates, confirmed provider quotes, secure payment,
            independent providers and the 48-hour issue-reporting window before you book.
          </p>

          <div className="actionRow">
            <a href="/service-promise" className="btn btnPrimary">
              Read our Service Promise →
            </a>

            <a href="/book" className="btn btnSecondary">
              Post cleaning request
            </a>

            <a href="/services" className="btn btnSecondary">
              View services
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
