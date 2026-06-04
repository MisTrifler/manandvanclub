import { buildSeoMetadata } from "../seoMetadata";
import Link from "next/link";

export const metadata = buildSeoMetadata({
  title: 'Privacy Policy | West Midlands Cleaner',
  description:
    'Privacy policy for West Midlands Cleaner, explaining how customer and cleaner information is collected, used and protected.',
  path: '/privacy'
});

export default function PrivacyPage() {
  return (
    <main className="page">
      <section className="section shell">
        <div className="card formCard" style={{ maxWidth: 980, margin: "0 auto" }}>
          <p className="kicker">West Midlands Cleaner</p>
          <h1>Privacy Policy</h1>

          <p className="lead">
            This Privacy Policy explains how West Midlands Cleaner, also referred to as WMC, collects,
            uses and protects information when customers submit cleaning booking requests, cleaner
            partners or business partners apply to work with WMC, or visitors use this website.
          </p>

          <div className="notice" style={{ marginTop: 22 }}>
            <strong>Contact:</strong> info@westmidlandscleaner.co.uk
            <br />
            <strong>Contact page:</strong> westmidlandscleaner.co.uk/contact
          </div>

          <div className="warningBox" style={{ marginTop: 22 }}>
            West Midlands Cleaner is a local cleaning marketplace/platform. WMC arranges bookings with approved independent
            cleaning partners, including self-employed cleaner partners and approved cleaning business
            partners. Cleaning partners are not employees of WMC.
          </div>

          <section style={{ marginTop: 34 }}>
            <h2>1. Information we collect from customers</h2>

            <p>
              When you submit a cleaning booking request, contact WMC or check your booking status,
              we may collect information such as:
            </p>

            <ul>
              <li>Your name</li>
              <li>Phone number and contact details</li>
              <li>Email address, if provided</li>
              <li>Property type, area, town and postcode</li>
              <li>Cleaning service required</li>
              <li>Preferred date and time</li>
              <li>Property size, number of bedrooms and bathrooms</li>
              <li>Condition level and cleaning extras requested</li>
              <li>Access notes, parking notes and customer notes</li>
              <li>Booking reference and booking status information</li>
              <li>Payment-related status information</li>
            </ul>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>2. Information we collect from cleaner and business partner applicants</h2>

            <p>
              When someone applies to become an independent cleaner partner or an approved business
              partner, WMC may collect information needed to review the application and decide
              whether suitable cleaning bookings can be offered.
            </p>

            <p>This may include:</p>

            <ul>
              <li>Full name or business contact name</li>
              <li>Business name, where applicable</li>
              <li>Phone number and email address</li>
              <li>Address, postcode or areas covered</li>
              <li>Cleaning experience, business details and services offered</li>
              <li>Availability</li>
              <li>Self-employed status confirmation, where applicable</li>
              <li>Business structure or trading information, where applicable</li>
              <li>Right to work or eligibility confirmation, where required</li>
              <li>Public liability insurance details</li>
              <li>Insurance provider, policy number and expiry date</li>
              <li>UTR or tax-related confirmation, if requested</li>
              <li>Bank or payout details, if required for completed jobs</li>
              <li>Any notes or supporting information submitted in the application</li>
            </ul>

            <div className="notice" style={{ marginTop: 18 }}>
              Cleaner or business partner documents may include insurance documents, eligibility
              information, business verification information and optional identity or supporting
              documents. These are used only for reviewing partner suitability, compliance,
              insurance checks and platform safety.
            </div>

            <div className="warningBox" style={{ marginTop: 18 }}>
              Please do not upload unnecessary documents. Only upload documents requested by WMC for
              reviewing your cleaner or business partner application or for confirming suitability before work
              is assigned.
            </div>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>3. How we use customer information</h2>

            <p>Customer information may be used to:</p>

            <ul>
              <li>Review cleaning booking requests</li>
              <li>Calculate or confirm estimated cleaning prices</li>
              <li>Contact customers about their booking request</li>
              <li>Confirm dates, times, property details and service requirements</li>
              <li>Match suitable bookings with approved independent cleaning partners</li>
              <li>Send payment instructions or selected provider quote information</li>
              <li>Provide booking support before and after a clean</li>
              <li>Handle cancellations, refunds, complaints or disputes</li>
              <li>Keep records for business, safety and legal purposes</li>
            </ul>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>4. How we use cleaner and business partner information</h2>

            <p>Cleaner and business partner information may be used to:</p>

            <ul>
              <li>Review cleaner partner and business partner applications</li>
              <li>Check whether applicants may be suitable for cleaning bookings</li>
              <li>Review service areas, experience and availability</li>
              <li>Request or verify public liability insurance and relevant business insurance details</li>
              <li>Confirm self-employed, business or eligibility information where required</li>
              <li>Offer suitable job opportunities</li>
              <li>Manage job assignment and job completion records</li>
              <li>Arrange payouts for completed work, where applicable</li>
              <li>Handle safety, quality, complaints or dispute matters</li>
            </ul>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>5. Lawful basis for processing</h2>

            <p>
              WMC processes personal information where it is necessary to respond to a booking
              request, take steps before entering into a contract, fulfil or support a booking,
              comply with legal obligations, or for legitimate business interests such as matching
              customers with suitable providers, keeping platform records, improving the service,
              preventing fraud and handling disputes.
            </p>

            <p>
              Where WMC sends marketing messages, we will only do so where we have a suitable lawful
              basis, such as consent or another lawful permission that applies. You can ask us to stop
              sending marketing messages at any time.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>6. Payment information</h2>

            <p>
              Payments may be processed securely through Stripe or another payment provider used by
              WMC. WMC does not need to store full card numbers on this website.
            </p>

            <p>
              We may store payment-related records such as payment status, booking amount, booking
              reference, payment date and transaction-related information needed to manage bookings,
              refunds, disputes and business records.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>7. Sharing information</h2>

            <p>
              WMC may share relevant booking details with approved independent cleaning partners where needed
              to review, accept or complete a cleaning booking. This may include service type,
              postcode or area, property details, access notes, parking notes and customer contact
              details once a booking is being arranged or confirmed. Full address/access details are
              only shared when needed for an approved or confirmed booking.
            </p>

            <p>
              WMC may also share information with service providers that help operate the website,
              booking system, payment processing, email, hosting, database, communications or
              business administration.
            </p>

            <p>
              Some service providers, such as hosting, analytics, email, database or payment
              providers, may process information outside the UK. Where this happens, WMC aims to use
              providers that apply appropriate safeguards for international data transfers.
            </p>

            <p>
              WMC may disclose information where required by law, to protect the business, to respond
              to a legal request, or to help resolve a safety, payment, complaint or dispute issue.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>8. Data storage and security</h2>

            <p>
              WMC takes reasonable steps to protect information from unauthorised access, loss,
              misuse or disclosure. However, no website, database, email system or online service can
              be guaranteed to be completely secure.
            </p>

            <p>
              Access to booking, cleaner partner and business partner information should be limited to people
              or systems that need it for WMC business purposes.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>9. How long we keep information</h2>

            <p>
              WMC keeps personal information only for as long as reasonably needed for booking,
              payment, tax, legal, safety, insurance, dispute handling and platform administration
              purposes.
            </p>

            <p>
              Customer booking and payment records are typically kept for up to 6 years after the
              last relevant activity where needed for tax, accounting, legal or dispute purposes.
            </p>

            <p>
              Cleaner or business partner application records may typically be kept for up to 2 years
              after a decision, or longer where needed for ongoing platform use, compliance, safety,
              insurance, payment, complaint or dispute purposes.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>10. Cookies and website analytics</h2>

            <p>
              This website may use basic cookies, hosting logs, analytics tools or similar
              technologies to understand how visitors use the website, improve the service and keep
              the website working properly.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>11. Children&apos;s data</h2>

            <p>
              WMC&apos;s services are not intended for children under 18. We do not knowingly collect
              personal information from children.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>12. ICO registration</h2>

            <p>
              If WMC is required to register with the Information Commissioner&apos;s Office as a data
              controller, registration details may be added to this page. You can still contact WMC
              using the details above with any privacy or personal information question.
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>13. Your rights</h2>

            <p>
              Depending on the circumstances, you may have rights to request access to your personal
              information, ask for corrections, request deletion, object to certain processing, or
              ask questions about how your information is used.
            </p>

            <p>
              To contact WMC about privacy or personal information, email:
              <br />
              <strong>info@westmidlandscleaner.co.uk</strong>
            </p>
          </section>

          <section style={{ marginTop: 34 }}>
            <h2>14. Important note</h2>

            <p>
              This Privacy Policy is intended to explain WMC&apos;s current website and booking
              process in plain English. WMC may update this page as the business, website, payment
              flow, cleaner/business partner process or legal requirements change.
            </p>
          </section>

          <div className="actionRow" style={{ marginTop: 34 }}>
            <Link href="/book" className="btn btnPrimary">
              Post a request
            </Link>

            <Link href="/join-us" className="btn btnSecondary">
              Join us
            </Link>

            <Link href="/" className="btn btnSecondary">
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
