const siteUrl = "https://www.westmidlandscleaner.co.uk";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api",
          "/api/",
          "/cleaner/jobs",
          "/cleaner/my-jobs",
          "/business/jobs",
          "/business-portal",
          "/customer",
          "/customer/",
          "/messages",
          "/messages/",
          "/pay",
          "/pay/",
          "/booking-status",
          "/booking-status/"
        ]
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
