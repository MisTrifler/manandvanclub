"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const customerLinks = [
  { label: "Post a request", href: "/book" },
  { label: "About WMC", href: "/about" },
  { label: "Login", href: "/customer/login" },
  { label: "Check booking status", href: "/booking-status" },
  { label: "Pay selected quote", href: "/pay" },
  { label: "Services", href: "/services" },
  { label: "Areas covered", href: "/areas" },
  { label: "Contact", href: "/contact" }
];

const cleanerLinks = [
  { label: "Join us", href: "/join-us" }
];

const policyLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Service promise", href: "/service-promise" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cancellation/refund policy", href: "/cancellation-refund-policy" },
  { label: "Policies & information", href: "/documents" }
];

const desktopNavLinks = [
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Join us", href: "/join-us" },
  { label: "Login", href: "/customer/login" }
];

function Logo({ className = "headerLogoLink", imageClassName = "headerLogoImage", onClick }) {
  return (
    <a
      href="/"
      className={className}
      aria-label="West Midlands Cleaner homepage"
      onClick={onClick}
    >
      <img
        src="/wmc-logo-header.png"
        alt="WMC logo"
        className={imageClassName}
        width="180"
        height="64"
        decoding="async"
      />
    </a>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHomePage = pathname === "/";

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className={isHomePage ? "siteHeader siteHeaderHome" : "siteHeader siteHeaderSimple"}>
        <div className="headerShell">
          <Logo />

          {isHomePage ? (
            <nav className="desktopHeaderNav" aria-label="Main navigation">
              {desktopNavLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}

              <a className="desktopHeaderCta" href="/book#post-job">
                Get quotes
              </a>
            </nav>
          ) : null}

          <div className="headerActions">
            <button
              type="button"
              className="menuButton"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="wmcMenuOverlay">
          <button
            type="button"
            className="wmcMenuBackdrop"
            aria-label="Close menu"
            onClick={closeMenu}
          />

          <aside className="wmcMenuPanel" aria-label="Main menu">
            <div className="wmcMenuTop">
              <div className="wmcMenuBrandWrap">
                <Logo
                  className="headerLogoLink headerLogoLinkMenu"
                  imageClassName="headerLogoImage headerLogoImageMenu"
                  onClick={closeMenu}
                />
              </div>

              <button
                type="button"
                className="wmcMenuClose"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                ×
              </button>
            </div>

            <div className="wmcMenuLinks">
              {customerLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              ))}
            </div>

            <div className="wmcMobileStatusBox">
              <strong>Already requested a clean?</strong>
              <span>Track your quote request or payment status quickly from your phone.</span>
              <a href="/booking-status" onClick={closeMenu}>
                Check booking status
              </a>
            </div>

            <div className="wmcMenuLine" />

            <div className="wmcMenuLinks">
              {cleanerLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              ))}
            </div>

            <div className="wmcMenuLine" />

            <div className="wmcMenuLinks wmcMenuLinksSmall">
              {policyLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              ))}
            </div>

            <div className="wmcMenuCtas">
              <a href="/book" className="btn btnPrimary" onClick={closeMenu}>
                Post a request
              </a>

              <a href="/booking-status" className="btn btnSecondary" onClick={closeMenu}>
                Check booking status
              </a>
            </div>

            <p className="wmcMenuNote">
              West Midlands Cleaner is a cleaning marketplace. Customers post requests, approved independent providers submit quotes, and customers choose a provider before paying WMC securely.
            </p>
          </aside>
        </div>
      )}
    </>
  );
}
