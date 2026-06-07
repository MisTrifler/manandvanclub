import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.manandvanclub.co.uk';

  const cities = ["london", "birmingham", "manchester", "leeds", "bristol", "liverpool", "nottingham", "sheffield", "glasgow", "cardiff", "walsall"];
  const services = ["house-removals", "flat-removals", "student-removals", "office-removals", "furniture-delivery", "sofa-collection", "ikea-collection", "same-day-man-and-van", "long-distance-removals", "facebook-marketplace-collection"];

  const cityUrls = cities.map(city => ({
    url: `${baseUrl}/man-and-van-${city}`,
    lastModified: new Date(),
  }));

  const serviceUrls = services.map(service => ({
    url: `${baseUrl}/${service}`,
    lastModified: new Date(),
  }));

  const staticUrls = [
    '',
    '/how-it-works',
    '/for-businesses',
    '/about',
    '/areas',
    '/pricing',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
    '/apply-to-join'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticUrls, ...cityUrls, ...serviceUrls];
}
