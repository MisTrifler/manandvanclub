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

  // Last modified dates based on when content was last meaningfully updated
  const locationLastModified: Record<string, string> = {
    'birmingham': '2026-07-12',
    'walsall': '2026-07-12',
    'wolverhampton': '2026-07-11',
    'dudley': '2026-07-10',
    'west-bromwich': '2026-07-10',
    'solihull': '2026-07-10',
    'coventry': '2026-07-10',
    'stourbridge': '2026-07-09',
    'halesowen': '2026-07-09',
    'wednesbury': '2026-07-09',
    'bloxwich': '2026-07-09',
    'brownhills': '2026-07-11',
  };

  const locationUrls = LOCATIONS.filter(loc => isLocationIndexable(loc.slug)).map(loc => ({
    url: `${baseUrl}/man-and-van-${loc.slug}`,
    lastModified: new Date(locationLastModified[loc.slug] || '2026-07-01'),
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

  const serviceLastModified: Record<string, string> = {
    'house-removals': '2026-07-12',
    'flat-removals': '2026-07-12',
    'student-removals': '2026-07-12',
    'office-removals': '2026-07-12',
    'furniture-delivery': '2026-07-12',
    'same-day-man-and-van': '2026-07-12',
    'long-distance-removals': '2026-07-12',
    'facebook-marketplace-collection': '2026-07-12',
  };

  const serviceUrls = services.map(service => ({
    url: `${baseUrl}/${service}`,
    lastModified: new Date(serviceLastModified[service] || '2026-07-01'),
    changeFrequency: highIntentServiceSlugs.has(service) ? 'weekly' as const : 'monthly' as const,
    priority: highIntentServiceSlugs.has(service) ? 0.8 : 0.7,
  }));

  const staticLastModified: Record<string, string> = {
    '': '2026-07-12',
    '/man-and-van-west-midlands': '2026-07-12',
    '/man-and-van-prices': '2026-07-12',
    '/man-and-van-near-me': '2026-07-12',
    '/man-and-van-vs-removal-company': '2026-07-12',
    '/how-it-works': '2026-07-12',
    '/for-businesses': '2026-07-08',
    '/about': '2026-07-10',
    '/areas-covered': '2026-07-11',
    '/pricing': '2026-07-08',
    '/contact': '2026-07-08',
    '/apply-to-join': '2026-07-08',
    '/why-join': '2026-07-10',
    '/terms': '2026-07-01',
    '/privacy': '2026-07-01',
    '/cookies': '2026-07-01',
  };

  const staticUrls = [
    '', '/man-and-van-west-midlands', '/man-and-van-prices', '/man-and-van-near-me',
    '/man-and-van-vs-removal-company', '/how-it-works', '/for-businesses', '/about',
    '/areas-covered', '/pricing', '/contact', '/apply-to-join',
    '/why-join', '/terms', '/privacy', '/cookies'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(staticLastModified[route] || '2026-07-01'),
    changeFrequency: route === '/man-and-van-west-midlands' || route === '/man-and-van-prices' || route === '/man-and-van-near-me' || route === '/man-and-van-vs-removal-company' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1.0 : route === '/man-and-van-west-midlands' ? 0.95 : route === '/man-and-van-prices' || route === '/man-and-van-near-me' || route === '/man-and-van-vs-removal-company' ? 0.85 : route === '/areas-covered' ? 0.7 : 0.6,
  }));

  return [...staticUrls, ...locationUrls, ...serviceUrls];
}
