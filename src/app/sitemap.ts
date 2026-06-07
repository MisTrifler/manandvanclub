import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.manandvanclub.co.uk';

  const cities = [
    "london", "birmingham", "manchester", "leeds", "bristol", 
    "liverpool", "nottingham", "sheffield", "glasgow", "cardiff", 
    "edinburgh", "wolverhampton", "walsall", "leicester", "coventry"
  ];
  
  const services = [
    "house-removals", "flat-removals", "student-removals", 
    "office-removals", "furniture-delivery", "same-day-man-and-van", 
    "long-distance-removals", "facebook-marketplace-collection"
  ];

  const cityUrls = cities.map(city => ({
    url: `${baseUrl}/man-and-van-${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const serviceUrls = services.map(service => ({
    url: `${baseUrl}/${service}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticUrls = [
    '', '/how-it-works', '/for-businesses', '/about', 
    '/areas', '/pricing', '/contact', '/apply-to-join'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.6,
  }));

  return [...staticUrls, ...cityUrls, ...serviceUrls];
}
