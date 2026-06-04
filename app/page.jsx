import { buildSeoMetadata } from "./seoMetadata";
import Image from "next/image";

export const metadata = buildSeoMetadata({
  title: "West Midlands Cleaners | Compare Local Cleaning Quotes",
  description:
    "Find approved cleaners across Birmingham, Walsall, Wolverhampton, Dudley, Solihull, Coventry and the wider West Midlands for domestic, deep and end-of-tenancy cleaning.",
  path: "/"
});

const heroTitle = "Get free quotes from approved West Midlands cleaners";

const seoAreas = [
  { name: "Birmingham", href: "/areas/birmingham" },
  { name: "Walsall", href: "/areas/walsall" },
  { name: "Wolverhampton", href: "/areas/wolverhampton" },
  { name: "Dudley", href: "/areas/dudley" },
  { name: "Sandwell", href: "/areas/sandwell" },
  { name: "Solihull", href: "/areas/solihull" },
  { name: "Coventry", href: "/areas/coventry" },
  { name: "Sutton Coldfield", href: "/areas/sutton-coldfield" }
];

const seoServices = [
  { name: "Domestic cleaning", href: "/services/domestic-cleaning" },
  { name: "Deep cleaning", href: "/services/deep-cleaning" },
  { name: "End-of-tenancy cleaning", href: "/services/end-of-tenancy-cleaning" },
  { name: "Airbnb cleaning", href: "/services/airbnb-cleaning" },
  { name: "After-builders cleaning", href: "/services/after-builders-cleaning" }
];

const faqs = [
  {
    question: "Do I pay straight away?",
    answer:
      "No. You post your cleaning request first. Approved providers can quote, and you only pay after choosing the provider you want to book."
  },
  {
    question: "Who carries out the clean?",
    answer:
      "Cleaning is carried out by the independent self-employed cleaner or cleaning business partner you choose through the WMC platform."
  },
  {
    question: "Can I choose a business or self-employed cleaner?",
    answer:
      "Yes. You can tell us your provider preference when posting your request. Availability and quotes may vary by area, service type and date."
  }
];

export default function HomePage() {
  return (
    <main className="page homePageCompact">
      <section className="homeScreen homeHeroScreen">
        <div className="shell">
          <div className="card homeProfessionalHeroCard homeMarketplaceHeroCard">
            <div className="homeProfessionalHeroContent">
              <p className="kicker homeHeroKicker">Local cleaning quotes across the West Midlands</p>
              <h1 className="homeHeroTitle">{heroTitle}</h1>

              <form className="homePostcodeForm" action="/book#post-job" method="get">
                <label className="srOnly" htmlFor="home-postcode">
                  Enter your postcode
                </label>
                <input
                  id="home-postcode"
                  name="postcode"
                  type="text"
                  inputMode="text"
                  autoComplete="postal-code"
                  placeholder="Enter your postcode"
                  className="homePostcodeInput"
                  required
                />
                <button className="btn btnGreen homeBigBookButton" type="submit">
                  Compare cleaning quotes
                </button>
              </form>
            </div>

            <div className="homeProfessionalHeroImageWrap homeMarketplaceHeroImageWrap">
              <Image
                src="/images/wmc-homepage-cleaner-hero-theme.png"
                alt="Professional cleaner vacuuming a modern living room with cleaning supplies visible"
                fill
                priority
                sizes="(max-width: 980px) 100vw, 48vw"
                className="homeProfessionalHeroImage homeMarketplaceHeroImage"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="homeScreen homeProcessScreen">
        <div className="shell">
          <div className="statusCard homeFullProcessCard">
            <p className="kicker">How it works</p>
            <h2 className="homeProcessTitle">Simple cleaning quotes in 3 steps.</h2>
            <p className="homeProcessLead">
              Post your request, review quotes from approved local providers, and choose who to book before paying securely.
            </p>

            <div className="homeStepGrid">
              <article className="homeStepCard">
                <span className="homeStepNumber">1</span>
                <h3>Post your request</h3>
                <p>Tell approved providers what you need, where you are, your preferred date and whether you prefer a business, self-employed cleaner or best available match.</p>
              </article>

              <article className="homeStepCard">
                <span className="homeStepNumber">2</span>
                <h3>Providers send quotes</h3>
                <p>Suitable approved providers review safe job details and submit their own quote, availability and message through WMC.</p>
              </article>

              <article className="homeStepCard">
                <span className="homeStepNumber">3</span>
                <h3>Choose and pay</h3>
                <p>Compare available quotes, choose the provider you prefer and pay securely online only when you are ready to confirm.</p>
              </article>
            </div>
          </div>
        </div>
      </section>


      <section className="homeScreen homeSeoScreen" aria-labelledby="home-local-cleaning-title">
        <div className="shell">
          <div className="card homeSeoCard">
            <p className="kicker">West Midlands cleaning coverage</p>
            <h2 id="home-local-cleaning-title">Cleaners across Birmingham, Walsall, Wolverhampton and the wider West Midlands.</h2>
            <p>
              West Midlands Cleaner helps customers request cleaning quotes from approved independent cleaning providers across Birmingham, Walsall, Wolverhampton, Dudley, Sandwell, Solihull, Coventry, Sutton Coldfield and the wider West Midlands. Book domestic cleaning, deep cleaning, end-of-tenancy cleaning, Airbnb changeovers and after-builders cleaning online.
            </p>

            <div className="homeSeoLinkGrid" aria-label="Popular cleaning areas and services">
              <div>
                <h3>Popular areas</h3>
                <div className="homeSeoLinks">
                  {seoAreas.map((area) => (
                    <a key={area.href} href={area.href}>{area.name}</a>
                  ))}
                </div>
              </div>

              <div>
                <h3>Popular services</h3>
                <div className="homeSeoLinks">
                  {seoServices.map((service) => (
                    <a key={service.href} href={service.href}>{service.name}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="homeScreen homeProviderTrustScreen">
        <div className="shell">
          <div className="statusCard homeProviderTrustCard">
            <div className="sectionIntro">
              <p className="kicker">Provider checks</p>
              <h2>How WMC approves providers.</h2>
              <p className="lead">
                Before paid bookings are offered, WMC reviews provider details so customers can compare quotes with more confidence.
              </p>
            </div>

            <div className="grid3">
              <article className="guideBox">
                <strong>Provider details reviewed</strong>
                <br />
                Cleaning businesses and cleaner partners share key contact, service and coverage details before joining.
              </article>

              <article className="guideBox">
                <strong>Insurance details requested</strong>
                <br />
                Public liability insurance details are requested before paid bookings are offered or assigned.
              </article>

              <article className="guideBox">
                <strong>Clear marketplace responsibility</strong>
                <br />
                Customers choose a provider quote and pay WMC securely. The selected independent provider carries out the clean.
              </article>
            </div>

            <div className="notice" style={{ marginTop: 18 }}>
              WMC does not claim every provider is DBS checked, council verified or employed by WMC. Provider checks and availability may vary by provider type, service and area.
            </div>
          </div>
        </div>
      </section>

      <section className="homeScreen homeReviewScreen">
        <div className="shell">
          <div className="card homeTrustpilotCard homeTrustpilotCardCompact">
            <div className="homeTrustpilotIntro">
              <p className="kicker">Trustpilot</p>
              <h2>Building trust across the West Midlands, one clean at a time.</h2>
              <p>
                WMC is a local cleaning marketplace helping customers compare approved provider quotes before paying securely. We are building trust with clear steps, local coverage and genuine customer feedback.
              </p>

              <a
                href="https://www.trustpilot.com/review/westmidlandscleaner.co.uk"
                className="btn btnSecondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View WMC on Trustpilot
              </a>
            </div>

            <article className="homeTrustpilotReview">
              <div className="homeTrustpilotStars" aria-label="5 star Trustpilot review">
                ★★★★★
              </div>

              <h3>Top Class Service</h3>

              <p>
                “I was unsure to trust them or not, but thought I would try as no upfront payment was needed which gave me some confidence.”
              </p>

              <p>
                “Top class service by Laura! She kept me updated as to her arrival and my home never looked better.”
              </p>

              <div className="homeTrustpilotMeta">
                <strong>Mansi Bagga</strong>
                <span>Trustpilot review</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="homeScreen homeCardsScreen" aria-labelledby="home-popular-services-title">
        <div className="shell">
          <div className="sectionIntro" style={{ marginBottom: 22 }}>
            <p className="kicker">Popular cleaning services</p>
            <h2 id="home-popular-services-title">Popular cleaning services across the West Midlands.</h2>
            <p className="lead">
              Choose the cleaning service you need and let suitable approved local providers quote for your home, move-out or property clean.
            </p>
          </div>

          <div className="grid3 homeLargeCardsGrid">
            <article className="card infoCard homeLargeInfoCard">
              <div className="homeCardImageWrap">
                <Image
                  src="/images/home-regular-cleaning-living-room.png"
                  alt="Cleaner mopping a bright living room during a regular home clean"
                  fill
                  sizes="(max-width: 980px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="homeCardContent">
                <p className="kicker">Domestic cleaning</p>
                <h3>Regular home cleaning.</h3>
                <p>Weekly, fortnightly or one-off domestic cleaning support for kitchens, bathrooms, floors, dusting and general home upkeep.</p>
              </div>
            </article>

            <article className="card infoCard homeLargeInfoCard">
              <div className="homeCardImageWrap">
                <Image
                  src="/images/home-deep-cleaning-kitchen.png"
                  alt="Cleaner wiping kitchen surfaces during a detailed home deep clean"
                  fill
                  sizes="(max-width: 980px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="homeCardContent">
                <p className="kicker">Deep cleaning</p>
                <h3>Detailed home deep cleans.</h3>
                <p>Request a deeper clean for kitchens, bathrooms, built-up areas, neglected rooms and homes that need more attention than a regular clean.</p>
              </div>
            </article>

            <article className="card infoCard homeLargeInfoCard">
              <div className="homeCardImageWrap">
                <Image
                  src="/images/home-end-of-tenancy-cleaning.png"
                  alt="Cleaner preparing a bright property during an end-of-tenancy or move-out clean"
                  fill
                  sizes="(max-width: 980px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="homeCardContent">
                <p className="kicker">Move-out & property cleaning</p>
                <h3>End-of-tenancy & property cleans.</h3>
                <p>Find providers for end-of-tenancy cleaning, move-out cleans, Airbnb changeovers and after-builders cleaning across the West Midlands.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section shell homeBottomSection">
        <div className="card formCard" style={{ marginBottom: 18 }}>
          <p className="kicker">Why trust WMC</p>
          <h2>Local cleaning support, arranged clearly.</h2>

          <div className="grid3">
            <div className="guideBox">
              <strong>No payment upfront</strong>
              <br />
              Post your request first. Payment is only taken after you choose a provider quote and confirm.
            </div>

            <div className="guideBox">
              <strong>Secure Stripe payment</strong>
              <br />
              Pay securely online only after selecting the independent provider you want to book.
            </div>

            <div className="guideBox">
              <strong>Approved independent providers</strong>
              <br />
              Cleaning work is carried out by the independent self-employed cleaner or cleaning business you select through the platform.
            </div>
          </div>
        </div>

        <div className="card formCard" style={{ marginBottom: 18 }}>
          <p className="kicker">FAQ</p>
          <h2>Questions before booking</h2>

          <div className="grid3">
            {faqs.map((faq) => (
              <article key={faq.question} className="guideBox">
                <strong>{faq.question}</strong>
                <br />
                {faq.answer}
              </article>
            ))}
          </div>
        </div>

        <div className="card formCard" style={{ marginBottom: 18 }}>
          <p className="kicker">Ready to book?</p>
          <h2>Post your cleaning request today.</h2>
          <p>
            Submit your request online and let suitable approved providers quote. You compare available options, choose the provider you prefer and pay securely only when you are ready to confirm.
          </p>

          <div className="actionRow">
            <a href="/book#post-job" className="btn btnGreen">
              Post your request
            </a>
            <a href="/how-it-works" className="btn btnSecondary">
              How it works
            </a>
          </div>
        </div>

        <div className="launchLegalNote" style={{ marginBottom: 18 }}>
          West Midlands Cleaner is a local cleaning marketplace/platform. WMC connects customers with approved independent cleaning providers, including self-employed cleaner partners and approved cleaning business partners. Cleaning partners are not employees of WMC. Providers submit quotes through the platform, and customers choose their preferred provider before payment. Bookings depend on provider availability.
        </div>
      </section>
    </main>
  );
}
