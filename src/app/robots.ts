import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/login', '/marketplace'],
    },
    sitemap: 'https://www.manandvanclub.co.uk/sitemap.xml',
  };
}
