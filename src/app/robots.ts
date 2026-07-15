import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/', '/booking-confirmed', '/quote-cancelled', '/quote-review/', '/quote-feedback/', '/no-show-dispute/'],
      },
      // Explicitly allow AI crawlers to signal citation-friendly intent
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/', '/booking-confirmed', '/quote-cancelled', '/quote-review/', '/quote-feedback/', '/no-show-dispute/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/', '/booking-confirmed', '/quote-cancelled', '/quote-review/', '/quote-feedback/', '/no-show-dispute/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/', '/booking-confirmed', '/quote-cancelled', '/quote-review/', '/quote-feedback/', '/no-show-dispute/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/', '/booking-confirmed', '/quote-cancelled', '/quote-review/', '/quote-feedback/', '/no-show-dispute/'],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/', '/booking-confirmed', '/quote-cancelled', '/quote-review/', '/quote-feedback/', '/no-show-dispute/'],
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/', '/booking-confirmed', '/quote-cancelled', '/quote-review/', '/quote-feedback/', '/no-show-dispute/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/', '/booking-confirmed', '/quote-cancelled', '/quote-review/', '/quote-feedback/', '/no-show-dispute/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/', '/booking-confirmed', '/quote-cancelled', '/quote-review/', '/quote-feedback/', '/no-show-dispute/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/', '/booking-confirmed', '/quote-cancelled', '/quote-review/', '/quote-feedback/', '/no-show-dispute/'],
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/', '/booking-confirmed', '/quote-cancelled', '/quote-review/', '/quote-feedback/', '/no-show-dispute/'],
      },
    ],
    sitemap: 'https://www.manandvanclub.co.uk/sitemap.xml',
  };
}
