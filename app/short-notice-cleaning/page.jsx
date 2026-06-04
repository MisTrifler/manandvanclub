import { buildSeoMetadata } from "../seoMetadata";

export const metadata = buildSeoMetadata({
  title: "Short-Notice Cleaning West Midlands | Compare Cleaner Quotes | WMC",
  description:
    "Need a cleaner at short notice in the West Midlands? Post a request and WMC will check whether a suitable approved provider can quote.",
  path: "/short-notice-cleaning"
});

export default function ShortNoticeCleaningPage() {
  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <p className="kicker">Short-notice cleaning</p>
          <h1>Need a cleaner quickly?</h1>
          <p className="lead">
            West Midlands Cleaner can review urgent and short-notice cleaning requests across the
            West Midlands. Availability is not guaranteed, but your request can be shared with
            suitable approved providers who may be able to quote.
          </p>
        </div>

        <div className="grid2">
          <article className="card formCard">
            <p className="kicker">What we can check</p>
            <h2>Emergency-style cleaning requests.</h2>
            <p>
              Short-notice requests may include one-off house cleans, move-out cleans, pre-guest
              cleaning, Airbnb changeovers, landlord cleans and urgent deep-clean support.
            </p>
            <p>
              The more detail you provide, the easier it is for approved providers to understand the
              job and decide whether they can quote.
            </p>
          </article>

          <aside className="card formCard">
            <p className="kicker">Honest availability</p>
            <h2>Coverage depends on providers.</h2>
            <p>
              WMC is a marketplace, not a cleaning company with employed cleaners on standby.
              Short-notice availability depends on your postcode, date, time, property condition,
              service type and approved provider availability.
            </p>
            <div className="notice">
              No payment is taken when you submit your request. You only pay after choosing a final
              quote from an approved provider.
            </div>
          </aside>
        </div>

        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">How it works</p>
          <h2>Post the request and we will check availability.</h2>
          <div className="statusList">
            <div className="statusRow">
              <span>
                <strong>1. Submit your postcode and job details</strong>
                <br />
                Tell us what needs cleaning, where it is, and how soon you need it done.
              </span>
            </div>
            <div className="statusRow">
              <span>
                <strong>2. Suitable providers can quote</strong>
                <br />
                Approved providers who cover your area and timing can submit a quote where available.
              </span>
            </div>
            <div className="statusRow">
              <span>
                <strong>3. Choose before paying</strong>
                <br />
                You compare the quote and provider details before paying securely online.
              </span>
            </div>
          </div>
          <div className="actionRow" style={{ marginTop: 24 }}>
            <a href="/book?service=one-off" className="btn btnPrimary">
              Check short-notice availability
            </a>
            <a href="/service-promise" className="btn btnSecondary">
              Read our Service Promise
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
