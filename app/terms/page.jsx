import { buildSeoMetadata } from "../seoMetadata";
export const metadata = buildSeoMetadata({
  title: 'Terms and Conditions | West Midlands Cleaner',
  description:
    'Website and booking terms for West Midlands Cleaner, a cleaning booking platform arranging bookings through approved independent cleaning partners.',
  path: '/terms'
});

const terms = [
  {
    number: "1",
    title: "Booking platform",
    text:
      "West Midlands Cleaner operates as a cleaning booking platform. Customers can submit cleaning requests, compare quotes from approved independent cleaners and cleaning business partners where available, choose a provider and pay securely after selecting a quote."
  },
  {
    number: "2",
    title: "Independent cleaning partners",
    text:
      "Cleaning partners may include self-employed cleaner partners and approved cleaning business partners. They are independent from West Midlands Cleaner and are not employees of WMC. WMC does not guarantee hours, wages, shifts or booking opportunities to cleaning partners."
  },
  {
    number: "3",
    title: "Booking requests are not confirmed bookings",
    text:
      "A customer booking request is not automatically a confirmed booking with a provider. Approved providers may review safe job details and submit quotes. A provider booking is only confirmed after the customer chooses a provider quote, payment is completed where required, and attendance details are confirmed."
  },
  {
    number: "4",
    title: "Prices and payment",
    text:
      "The website may show an estimated guide price. Approved providers can submit their own quotes, so the provider quote may be higher or lower than the guide estimate. Payment may be taken securely through Stripe after the customer chooses a provider quote. WMC normally retains a simple 15% platform fee from confirmed bookings, with no separate WMC joining fee, monthly fee or fixed platform subscription charge for approved partners at this stage. Cleaning partner payout and WMC platform fee may be recorded for transparency and platform management."
  },
  {
    number: "5",
    title: "Cleaner assignment",
    text:
      "WMC may offer suitable booking opportunities to approved cleaning partners. Cleaning partners may show interest in or accept suitable opportunities. WMC may manually assign an approved self-employed cleaner partner or approved cleaning business partner to a booking."
  },
  {
    number: "6",
    title: "Customer responsibilities",
    text:
      "Customers must provide accurate property details, access information, parking information, service requirements, date and time preferences and any important information needed for the cleaning booking."
  },
  {
    number: "7",
    title: "Cleaner partner responsibilities",
    text:
      "Cleaning partners must only attend bookings confirmed by WMC. They should provide cleaning services professionally, attend at the agreed time, follow booking details and report issues to WMC promptly. Business partners are responsible for ensuring any cleaner or team they send is authorised and suitably covered by their business arrangements."
  },
  {
    number: "8",
    title: "Insurance and checks",
    text:
      "WMC may request public liability insurance proof and other information before assigning work to a cleaning partner. WMC may refuse or remove cleaner partner access if information is incomplete, unsuitable or raises concerns."
  },
  {
    number: "9",
    title: "Cancellations and refunds",
    text:
      "Cancellations, rearrangements and refunds are handled according to the WMC cancellation and refund policy, booking timing, customer circumstances, cleaning partner arrangements and any costs already incurred."
  },
  {
    number: "10",
    title: "Partner payouts",
    text:
      "Cleaning partner payouts are normally released by WMC after a 48-hour issue window following job completion and approval, provided customer payment has been received and there is no unresolved complaint, refund issue, missing information or dispute. Once released, Stripe Express pays the provider bank according to its Stripe payout schedule. Payment is not made before completion."
  },
  {
    number: "11",
    title: "Late cancellations, no-shows and accepted jobs",
    text:
      "Cleaning partners must tell WMC as soon as possible if they accept a booking by mistake, become unavailable, may be late or cannot attend. Repeated late cancellations, no-shows, poor communication or accepting work that cannot be completed may result in fewer booking opportunities, suspension or removal from the WMC platform."
  },
  {
    number: "12",
    title: "Travel, parking and extra work",
    text:
      "Travel costs, parking charges and clean air zone charges are not automatically covered unless WMC confirms this before the booking. Cleaning partners must not agree extra paid work directly with customers without WMC approval. Any changes to hours, tasks or price should be confirmed through WMC."
  },
  {
    number: "13",
    title: "Disputes",
    text:
      "If there is a dispute or complaint, WMC may review customer information, cleaning partner information, photos, messages and booking records before deciding what action is appropriate."
  }
];

export default function TermsPage() {
  return (
    <main className="page">
      <section className="section shell">
        <div className="sectionIntro">
          <h1>Terms and conditions.</h1>
          <p className="lead">
            These terms explain how West Midlands Cleaner handles cleaning booking requests,
            customer payments, cleaning partner arrangements and booking responsibilities.
          </p>
        </div>

        <div className="notice" style={{ marginBottom: 28 }}>
          Important: West Midlands Cleaner is a cleaning booking platform. We help customers post
          cleaning booking requests and arrange bookings with approved independent cleaning partners, including self-employed cleaner partners and approved
          cleaning business partners across the West Midlands.
        </div>

        <div className="grid2">
          {terms.map((term) => (
            <article key={term.number} className="card infoCard">
              <p className="kicker">{term.number}</p>
              <h3>{term.title}</h3>
              <p>{term.text}</p>
            </article>
          ))}
        </div>

        <div className="card formCard" style={{ marginTop: 28 }}>
          <p className="kicker">Important wording</p>
          <h2>Independent cleaning partner model.</h2>

          <div className="warningBox">
            Cleaning partners are not employees of West Midlands Cleaner. They may be self-employed cleaner
            partners or approved cleaning business partners. There are no guaranteed hours, wages,
            shifts or booking opportunities. Payments to cleaning partners are normally released by WMC after a 48-hour issue window following completed and approved work, subject to customer payment and no unresolved issue. Once released, Stripe Express pays the provider bank according to its Stripe payout schedule.
          </div>

          <div className="actionRow">
            <a href="/book" className="btn btnPrimary">
              Post a cleaning job
            </a>

            <a href="/cancellation-refund-policy" className="btn btnSecondary">
              Cancellation/refund policy
            </a>

            <a href="/privacy" className="btn btnSecondary">
              Privacy policy
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
