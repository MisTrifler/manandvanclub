import { MetadataRoute } from 'next';
import { LOCATIONS } from '@/constants/locations';
import { isLocationIndexable } from '@/lib/seo-quality-guard';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.manandvanclub.co.uk';

  // ─── Priority tiers for sitemap <priority> ───
  const tier1Slugs = new Set([
    // Primary target cities — must rank #1
    'birmingham', 'walsall',
  ]);

  const tier2Slugs = new Set([
    // West Midlands core cities
    'wolverhampton', 'dudley', 'west-bromwich', 'solihull', 'coventry',
    'stourbridge', 'halesowen', 'wednesbury', 'bloxwich', 'brownhills',
    // East Midlands core cities
    'nottingham', 'leicester', 'derby', 'northampton', 'lincoln',
    // Top UK cities — high search volume
    'london', 'manchester', 'leeds', 'liverpool', 'bristol', 'sheffield',
    'edinburgh', 'glasgow', 'cardiff', 'newcastle-upon-tyne',
  ]);

  const tier3Slugs = new Set([
    // WM/EM area pages + major UK area cities
    'aldridge', 'willenhall', 'darlaston', 'oldbury', 'tipton', 'bilston',
    'arnold', 'beeston', 'carlton', 'west-bridgford', 'hucknall',
    'oadby', 'wigston', 'braunstone', 'evington',
    'chaddesden', 'mickleover', 'alvaston', 'littleover',
    'kingsthorpe', 'duston', 'abington', 'north-hykeham',
    'rugby', 'nuneaton', 'tamworth', 'cannock', 'lichfield',
    // London boroughs
    'croydon', 'bromley', 'romford', 'ilford', 'wembley', 'ealing',
    'harrow', 'hounslow', 'kingston', 'twickenham', 'enfield', 'barnet',
    'finchley', 'edgware', 'stratford', 'lewisham', 'greenwich', 'bexley',
    'sutton', 'mitcham', 'walthamstow', 'wood-green', 'tottenham',
    'acton', 'chiswick', 'richmond',
    // Greater Manchester cities
    'salford', 'bolton', 'bury', 'rochdale', 'oldham', 'stockport',
    'altrincham', 'trafford', 'wigan', 'leigh', 'ashton-under-lyne', 'hyde', 'stalybridge',
    // West Yorkshire cities
    'bradford', 'wakefield', 'huddersfield', 'halifax', 'dewsbury', 'batley',
    'keighley', 'pudsey', 'morley',
    // Merseyside cities
    'bootle', 'birkenhead', 'wallasey', 'southport', 'st-helens', 'widnes', 'prescot', 'huyton',
    // South West cities
    'bath', 'weston-super-mare', 'bridgwater', 'taunton', 'yeovil', 'frome',
    'trowbridge', 'swindon', 'cheltenham', 'gloucester',
  ]);

  // Last modified dates
  const locationLastModified: Record<string, string> = {
    'birmingham': '2026-07-14',
    'walsall': '2026-07-14',
    'wolverhampton': '2026-07-14',
    'dudley': '2026-07-14',
    'west-bromwich': '2026-07-14',
    'solihull': '2026-07-14',
    'coventry': '2026-07-14',
    'stourbridge': '2026-07-14',
    'halesowen': '2026-07-14',
    'wednesbury': '2026-07-14',
    'bloxwich': '2026-07-14',
    'brownhills': '2026-07-14',
    'nottingham': '2026-07-14',
    'leicester': '2026-07-14',
    'derby': '2026-07-14',
    'northampton': '2026-07-14',
    'lincoln': '2026-07-14',
  };

  const getLocationPriority = (slug: string): number => {
    if (tier1Slugs.has(slug)) return 0.9;
    if (tier2Slugs.has(slug)) return 0.85;
    if (tier3Slugs.has(slug)) return 0.8;
    return 0.75;
  };

  const locationUrls = LOCATIONS.filter(loc => isLocationIndexable(loc.slug)).map(loc => ({
    url: `${baseUrl}/man-and-van-${loc.slug}`,
    lastModified: new Date(locationLastModified[loc.slug] || '2026-07-14'),
    changeFrequency: (tier1Slugs.has(loc.slug) || tier2Slugs.has(loc.slug)) ? 'weekly' as const : 'monthly' as const,
    priority: getLocationPriority(loc.slug),
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

  // Service URLs are now in staticUrls above with proper priorities.
  // Keep this array for reference but don't duplicate in the sitemap.
  const _serviceUrls = services.map(service => ({
    url: `${baseUrl}/${service}`,
    lastModified: new Date('2026-07-14'),
    changeFrequency: highIntentServiceSlugs.has(service) ? 'weekly' as const : 'monthly' as const,
    priority: highIntentServiceSlugs.has(service) ? 0.8 : 0.7,
  }));

  const staticUrls = [
    { route: '', priority: 1.0, freq: 'weekly' as const },
    { route: '/man-and-van-west-midlands', priority: 0.95, freq: 'weekly' as const },
    { route: '/man-and-van-east-midlands', priority: 0.95, freq: 'weekly' as const },
    { route: '/man-and-van-london', priority: 0.95, freq: 'weekly' as const },
    { route: '/man-and-van-manchester', priority: 0.95, freq: 'weekly' as const },
    { route: '/man-and-van-leeds', priority: 0.95, freq: 'weekly' as const },
    { route: '/man-and-van-liverpool', priority: 0.95, freq: 'weekly' as const },
    { route: '/man-and-van-bristol', priority: 0.95, freq: 'weekly' as const },
    { route: '/man-and-van-sheffield', priority: 0.95, freq: 'weekly' as const },
    { route: '/man-and-van-edinburgh', priority: 0.95, freq: 'weekly' as const },
    { route: '/man-and-van-cardiff', priority: 0.95, freq: 'weekly' as const },
    { route: '/man-and-van-newcastle-upon-tyne', priority: 0.95, freq: 'weekly' as const },
    { route: '/blog', priority: 0.8, freq: 'weekly' as const },
    { route: '/blog/how-much-does-man-and-van-cost', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/how-to-prepare-for-moving-day', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/man-and-van-vs-removal-company-guide', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/student-moving-guide', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/what-to-tell-your-mover-before-moving-day', priority: 0.85, freq: 'monthly' as const },
    { route: '/man-and-van-prices', priority: 0.85, freq: 'weekly' as const },
    { route: '/man-and-van-near-me', priority: 0.85, freq: 'weekly' as const },
    { route: '/man-and-van-vs-removal-company', priority: 0.85, freq: 'weekly' as const },
    { route: '/house-removals', priority: 0.8, freq: 'monthly' as const },
    { route: '/flat-removals', priority: 0.8, freq: 'monthly' as const },
    { route: '/student-removals', priority: 0.8, freq: 'monthly' as const },
    { route: '/office-removals', priority: 0.8, freq: 'monthly' as const },
    { route: '/furniture-delivery', priority: 0.8, freq: 'monthly' as const },
    { route: '/same-day-man-and-van', priority: 0.8, freq: 'weekly' as const },
    { route: '/long-distance-removals', priority: 0.8, freq: 'monthly' as const },
    { route: '/facebook-marketplace-collection', priority: 0.75, freq: 'monthly' as const },
    { route: '/how-it-works', priority: 0.7, freq: 'monthly' as const },
    { route: '/get-started', priority: 0.8, freq: 'monthly' as const },
    { route: '/for-businesses', priority: 0.6, freq: 'monthly' as const },
    { route: '/about', priority: 0.6, freq: 'monthly' as const },
    { route: '/areas-covered', priority: 0.7, freq: 'monthly' as const },
    { route: '/pricing', priority: 0.6, freq: 'monthly' as const },
    { route: '/contact', priority: 0.6, freq: 'monthly' as const },
    { route: '/apply-to-join', priority: 0.6, freq: 'monthly' as const },
    { route: '/why-join', priority: 0.6, freq: 'monthly' as const },
    { route: '/terms', priority: 0.3, freq: 'yearly' as const },
    { route: '/privacy', priority: 0.3, freq: 'yearly' as const },
    { route: '/cookies', priority: 0.3, freq: 'yearly' as const },
  ].map(({ route, priority, freq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-07-14'),
    changeFrequency: freq,
    priority,
  }));

  return [...staticUrls, ...locationUrls];
}
