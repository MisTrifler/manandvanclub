import { allAreas } from "./areas/areaData";
import { servicePages } from "./services/serviceData";
import { serviceLocationPages } from "./serviceLocationData";

const siteUrl = "https://www.westmidlandscleaner.co.uk";

const routes = [
  "",
  "/book",
  "/services",
  "/areas",
  "/how-it-works",
  "/about",
  "/service-promise",
  "/join-us",
  "/business",
  "/landlords-estate-agents",
  "/short-notice-cleaning",
  "/faq",
  "/cleaners",
  "/contact",
  "/privacy",
  "/terms",
  "/cancellation-refund-policy",
  "/documents"
];

export default function sitemap() {
  const now = new Date();
  const areaRoutes = allAreas.map((area) => `/areas/${area.slug}`);
  const cleanerAreaRoutes = allAreas.map((area) => `/cleaners-${area.slug}`);
  const serviceRoutes = servicePages.map((service) => `/services/${service.slug}`);
  const serviceLocationRoutes = serviceLocationPages.map((page) => `/${page.slug}`);

  return [...routes, ...areaRoutes, ...cleanerAreaRoutes, ...serviceRoutes, ...serviceLocationRoutes].map((route) => {
    const isHome = route === "";
    const isPrimaryConversionPage = route === "/book";
    const isImportantPublicPage = [
      "/services",
      "/areas",
      "/how-it-works",
      "/about",
      "/service-promise",
      "/join-us",
      "/business",
      "/landlords-estate-agents",
      "/short-notice-cleaning",
      "/faq",
      "/contact"
    ].includes(route);
    const isServicePage = route.startsWith("/services/");
    const isServiceLocationPage = serviceLocationRoutes.includes(route);
    const isAreaPage = route.startsWith("/areas/") || route.startsWith("/cleaners-");

    return {
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: isHome || isPrimaryConversionPage ? "weekly" : "monthly",
      priority: isHome
        ? 1
        : isPrimaryConversionPage
          ? 0.95
          : isImportantPublicPage
            ? 0.86
            : isServiceLocationPage
              ? 0.84
              : isAreaPage
                ? 0.8
                : isServicePage
                  ? 0.78
                  : 0.6
    };
  });
}
