import { MetadataRoute } from 'next';
import { LOCATIONS } from '@/constants/locations';
import { isLocationIndexable } from '@/lib/seo-quality-guard';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.manandvanclub.co.uk';

  // Quality guard: only locations passing the thin-page checks are
  // listed. Failing pages render with noindex and stay out of the
  // sitemap until their data is enriched.
  const priorityWestMidlandsSlugs = new Set([
    'birmingham',
    'walsall',
    'wolverhampton',
    'dudley',
    'west-bromwich',
    'solihull',
    'coventry',
    'stourbridge',
    'halesowen',
    'wednesbury',
    'bloxwich',
    'brownhills',
  ]);

  const locationUrls = LOCATIONS.filter(loc => isLocationIndexable(loc.slug)).map(loc => ({
    url: `${baseUrl}/man-and-van-${loc.slug}`,
    lastModified: new Date('2026-07-12'),
    changeFrequency: 'weekly' as const,
    priority: priorityWestMidlandsSlugs.has(loc.slug) ? 0.85 : 0.75,
  }));

  const services = [
    "house-removals", "flat-removals", "student-removals",
    "office-removals", "furniture-delivery", "same-day-man-and-van",
    "long-distance-removals", "facebook-marketplace-collection"
  ];

  const highIntentServiceSlugs = new Set([
    'same-day-man-and-van',
    'furniture-delivery',
    'student-removals',
  ]);

  const serviceUrls = services.map(service => ({
    url: `${baseUrl}/${service}`,
    lastModified: new Date('2026-07-12'),
    changeFrequency: highIntentServiceSlugs.has(service) ? 'weekly' as const : 'monthly' as const,
    priority: highIntentServiceSlugs.has(service) ? 0.8 : 0.7,
  }));

  const staticUrls = [
    '', '/man-and-van-west-midlands', '/how-it-works', '/for-businesses', '/about',
    '/areas-covered', '/pricing', '/contact', '/apply-to-join',
    '/why-join', '/terms', '/privacy', '/cookies'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-07-12'),
    changeFrequency: route === '/man-and-van-west-midlands' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1.0 : route === '/man-and-van-west-midlands' ? 0.95 : route === '/areas-covered' ? 0.7 : 0.6,
  }));

  return [...staticUrls, ...locationUrls, ...serviceUrls];
}
