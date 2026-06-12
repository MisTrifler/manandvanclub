import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/login', '/marketplace', '/admin', '/admin/', '/control-center-mv', '/control-center-mv/'],
    },
    sitemap: 'https://www.manandvanclub.co.uk/sitemap.xml',
  };
}
