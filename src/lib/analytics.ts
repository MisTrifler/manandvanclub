export type AnalyticsEventName =
  | "mvc_page_view"
  | "quote_start"
  | "quote_step_completed"
  | "quote_submitted"
  | "quote_verified"
  | "contact_form_submitted"
  | "mover_apply_start"
  | "mover_apply_submit"
  | "phone_click"
  | "email_click"
  | "get_started_click"
  | "social_click"
  | "cookie_consent_update";

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;
type CookieConsentChoice = "accepted" | "declined";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | unknown[]>;
    gtag?: (...args: unknown[]) => void;
  }
}

function safePageLocation() {
  if (typeof window === "undefined") return undefined;

  // Keep analytics useful without sending query strings such as Stripe session IDs,
  // login tokens, customer references, or other personal/payment-related data.
  return `${window.location.origin}${window.location.pathname}`;
}

function pageContext(event?: AnalyticsEventName) {
  if (typeof window === "undefined") return {};

  const baseContext = {
    page_path: window.location.pathname,
    page_title: document.title,
  };

  if (event === "phone_click" || event === "email_click") {
    return baseContext;
  }

  return {
    ...baseContext,
    page_location: safePageLocation(),
  };
}

export function trackEvent(event: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...pageContext(event),
    ...params,
  });
}

function setGoogleConsent(consent: CookieConsentChoice) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  const consentUpdate =
    consent === "accepted"
      ? {
          ad_storage: "granted",
          analytics_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
        }
      : {
          ad_storage: "denied",
          analytics_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        };

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", consentUpdate);
  } else {
    window.dataLayer.push(["consent", "update", consentUpdate]);
  }
}

export function applyCookieConsent(consent: CookieConsentChoice) {
  setGoogleConsent(consent);
}

export function updateCookieConsent(consent: CookieConsentChoice) {
  setGoogleConsent(consent);
  trackEvent("cookie_consent_update", { consent });
}
