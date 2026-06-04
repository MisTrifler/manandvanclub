import { buildSeoMetadata } from "../seoMetadata";
import Link from "next/link";

export const metadata = buildSeoMetadata({
  title: 'Cancellation & Refund Policy | West Midlands Cleaner',
  description:
    'Cancellation and refund policy for West Midlands Cleaner marketplace requests, provider quotes, paid bookings and issue handling.',
  path: '/cancellation-refund-policy'
});

export default function CancellationRefundPolicyPage() {
  return (
    <main className="page">
      <section className="section shell">
        <div className="card formCard" style={{ maxWidth: 980, margin: "0 auto" }}>
          <p className="kicker">West Midlands Cleaner</p>
          <h1>Cancellation & Refund Policy</h1>

          <p className="lead">
            This policy explains how cancellations, changes and refunds are handled when customers
            use West Midlands Cleaner, also referred to as WMC, to compare quotes from approved
            independent cleaning providers.
          </p>

          <div className="guideBox" style={{ marginTop: 18 }}>
            WMC is a marketplace/platform. Customers post requests, approved providers submit quotes,
            customers choose a provider before payment, and the selected independent provider carries
            out the clean. WMC helps with the platform, secure payment administration and support if
            an issue cannot be resolved directly.
          </div>

          <div className="notice" style={{ marginTop: 22 }}>
            <strong>Contact:</strong> info@westmidlandscleaner.co.uk
            <br />
            <strong>Support page:</strong> westmidlandscleaner.co.uk/contact
          </div>

          <section style={{ marginTop: 34 }}>
            <h2>1. Posting a request is not a confirmed booking</h2>
            <p>
              Submitting a cleaning request through the WMC website does not automatically create a
              confirmed booking. A request becomes a booking only after the customer chooses a provider
              quote and completes the required payment step.
            </p>
            <p>
              The website guide estimate is not a provider quote. Provider quotes may be higher or lower
              depending on service type, property details, condition, access, parking, timing,
              products, equipment and provider availability.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>2. Provider quotes and payments</h2>
            <p>
              Approved independent providers submit their own quotes through WMC. Customers should
              only pay after choosing the provider quote they want to accept. Payment is taken securely
              online through Stripe where available.
            </p>
            <p>
              If a customer pays the wrong amount, uses the wrong reference or pays through an old
              fallback payment page, the booking may be delayed while WMC checks the payment and
              booking details.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>3. If no suitable provider quotes</h2>
            <p>
              WMC cannot guarantee that every request will receive a suitable quote. Availability
              depends on provider coverage, date, time, service type, job details and provider
              preference.
            </p>
            <div className="notice">
              If no suitable provider is available, no customer payment is taken through the normal
              marketplace quote flow.
            </div>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>4. Customer cancellations before payment</h2>
            <p>
              If you cancel before choosing a quote and paying, there is usually no cancellation
              charge from WMC because no confirmed paid booking has been created.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>5. Customer cancellations after payment</h2>
            <p>
              If you cancel after choosing a provider and paying, the refund position may depend on:
            </p>
            <ul>
              <li>How much notice you give</li>
              <li>Whether the selected provider has already prepared, travelled or started work</li>
              <li>Whether the job was urgent, same-day or short notice</li>
              <li>Payment processing, platform or unavoidable costs already incurred</li>
              <li>The selected provider's reasonable position and the circumstances of the job</li>
            </ul>
            <p>
              WMC may review cancellation requests for platform support, but a full refund is not
              guaranteed once a customer has chosen a provider, paid and the provider has prepared or
              started the booking.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>6. Rearranging a booking</h2>
            <p>
              Customers and the selected provider should message each other through WMC if a date or
              time needs to change. Rearranging depends on provider availability and may not always be
              possible.
            </p>
            <p>
              If the job details, timing or scope changes, the provider may need to update the quote.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>7. Provider cancellation or unavailability</h2>
            <p>
              If the selected provider becomes unavailable after a paid booking is confirmed, the
              provider should notify the customer and WMC as soon as possible. WMC may help the
              customer look for another provider quote where practical, but replacement availability
              cannot be guaranteed.
            </p>
            <p>
              If a replacement cannot be found for a paid booking, WMC may help process a refund or
              another reasonable outcome where appropriate.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>8. Customer no-access or missed booking</h2>
            <p>
              If the selected provider cannot access the property at the agreed time because the
              customer is unavailable, keys are not provided, access details are wrong, parking
              instructions are missing or the property cannot reasonably be accessed, the booking may
              be treated as a late cancellation or missed appointment.
            </p>
            <p>
              In these situations, a refund may be reduced or refused depending on the circumstances
              and costs already incurred.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>9. Unsafe jobs or changed property condition</h2>
            <p>
              WMC and approved providers may refuse, pause or cancel a job if the property condition
              is significantly different from what was described, the job is unsafe, specialist
              cleaning is required, hazardous materials are present, there is aggressive behaviour, or
              the job is not suitable for the selected provider.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>10. Complaints or issues after a clean</h2>
            <p>
              Customers should message the selected provider first through WMC if there is an issue.
              If the issue cannot be resolved directly, the customer can report the issue through the
              platform so WMC can review the messages, booking details and any supporting evidence.
            </p>
            <p>
              An open issue may place the provider payout on hold while the issue is reviewed. A
              refund, rearrangement, partial refund or no refund may be appropriate depending on the
              facts.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>11. Provider payouts and issue window</h2>
            <p>
              Provider payouts are normally released by WMC after the 48-hour issue window has passed,
              provided the job is completed, customer payment has been received, the provider's Stripe
              account is ready and there is no unresolved complaint, refund issue, missing information
              or dispute. Stripe Express then pays the provider's bank according to its Stripe payout
              schedule.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>12. Refund timing</h2>
            <p>
              If a refund is approved, WMC will aim to process it as soon as reasonably possible.
              Refund timing may depend on Stripe, bank processing times and any checks required.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>13. How to request cancellation, refund or issue support</h2>
            <p>
              Use the contact page or platform issue flow and include your booking reference, a clear
              explanation and supporting photos/messages where relevant.
            </p>
            <div className="notice">
              <strong>Email:</strong> info@westmidlandscleaner.co.uk
              <br />
              <strong>Contact page:</strong> westmidlandscleaner.co.uk/contact
            </div>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>14. Policy updates</h2>
            <p>
              WMC may update this policy as the marketplace, booking, payment, provider or legal
              process changes.
            </p>
          </section>

          <div className="actionRow" style={{ marginTop: 34 }}>
            <Link href="/book" className="btn btnPrimary">Post a cleaning request</Link>
            <Link href="/terms" className="btn btnSecondary">Terms & conditions</Link>
            <Link href="/contact" className="btn btnSecondary">Contact WMC</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
