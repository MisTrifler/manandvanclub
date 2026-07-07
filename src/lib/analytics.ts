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

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

function pageContext() {
  if (typeof window === "undefined") return {};

  return {
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
  };
}

export function trackEvent(event: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...pageContext(),
    ...params,
  });
}

export function updateCookieConsent(consent: "accepted" | "declined") {
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
    window.dataLayer.push(["consent", "update", consentUpdate] as unknown as Record<string, unknown>);
  }

  trackEvent("cookie_consent_update", { consent });
}
