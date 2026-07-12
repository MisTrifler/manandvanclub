import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/'],
      },
      // Explicitly allow AI crawlers to signal citation-friendly intent
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/'],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/'],
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/'],
      },
    ],
    sitemap: 'https://www.manandvanclub.co.uk/sitemap.xml',
  };
}
