import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/login',
        '/marketplace',
        '/admin/',
        '/control-center-mv',
        '/quote-review/',
        '/booking-confirmed',
        '/quote-cancelled',
      ],
    },
    sitemap: 'https://www.manandvanclub.co.uk/sitemap.xml',
  };
}
