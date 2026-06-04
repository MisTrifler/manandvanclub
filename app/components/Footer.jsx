const customerLinks = [
  { label: "Post a cleaning request", href: "/book" },
  { label: "About WMC", href: "/about" },
  { label: "Check booking status", href: "/booking-status" },
  { label: "Pay selected quote", href: "/pay" },
  { label: "Services", href: "/services" },
  { label: "Areas covered", href: "/areas" },
  { label: "FAQ", href: "/faq" },
  { label: "Service promise", href: "/service-promise" },
  { label: "Contact", href: "/contact" }
];

const partnerLinks = [
  { label: "Join us", href: "/join-us" }
];

const legalLinks = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cancellation & refund policy", href: "/cancellation-refund-policy" },
  { label: "Delete account/data request", href: "/account/delete" }
];

export default function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerGrid">
        <div className="footerBrandCard">
          <a href="/" className="footerLogoLink" aria-label="West Midlands Cleaner homepage">
            <img src="/wmc-logo-horizontal.png" alt="WMC logo" className="footerLogoImage" />
          </a>

          <p>
            West Midlands Cleaner is a local cleaning marketplace. Customers post cleaning requests,
            approved independent providers submit quotes, and customers choose who to book before
            paying securely online.
          </p>

          <div className="footerContactBox">
            <span><strong>Email:</strong> info@westmidlandscleaner.co.uk</span>
            <span><strong>Support:</strong> Use the contact form for booking and platform enquiries.</span>
          </div>
        </div>

        <div className="footerColumn">
          <h3>Customers</h3>
          <nav aria-label="Customer links">
            {customerLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>
        </div>

        <div className="footerColumn">
          <h3>For providers</h3>
          <nav aria-label="Join WMC links">
            {partnerLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>
        </div>

        <div className="footerColumn">
          <h3>Legal</h3>
          <nav aria-label="Legal links">
            {legalLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>
        </div>
      </div>

      <div className="footerBottom">
        <p>
          © {new Date().getFullYear()} West Midlands Cleaner. West Midlands Cleaner is a marketplace,
          not an employer. All cleaning providers are independent and responsible for their own work,
          insurance, tax, equipment, staff and service delivery. WMC facilitates bookings between
          customers and approved providers.
        </p>
      </div>
    </footer>
  );
}
