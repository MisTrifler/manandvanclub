import { MetadataRoute } from 'next';
import { LOCATIONS } from '@/constants/locations';
import { isLocationIndexable } from '@/lib/seo-quality-guard';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.manandvanclub.co.uk';

  // Quality guard: only locations passing the thin-page checks are
  // listed. Failing pages render with noindex and stay out of the
  // sitemap until their data is enriched.
  const locationUrls = LOCATIONS.filter(loc => isLocationIndexable(loc.slug)).map(loc => ({
    url: `${baseUrl}/man-and-van-${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const services = [
    "house-removals", "flat-removals", "student-removals",
    "office-removals", "furniture-delivery", "same-day-man-and-van",
    "long-distance-removals", "facebook-marketplace-collection"
  ];

  const serviceUrls = services.map(service => ({
    url: `${baseUrl}/${service}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticUrls = [
    '', '/how-it-works', '/for-businesses', '/about',
    '/areas-covered', '/pricing', '/contact', '/apply-to-join',
    '/why-join', '/for-movers', '/terms', '/privacy', '/cookies'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.6,
  }));

  return [...staticUrls, ...locationUrls, ...serviceUrls];
}
