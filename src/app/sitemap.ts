import { MetadataRoute } from 'next';
import { LOCATIONS } from '@/constants/locations';
import { isLocationIndexable } from '@/lib/seo-quality-guard';
import { getAllRouteSlugs } from '@/lib/route-data';

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
    'birmingham': '2026-07-18',
    'walsall': '2026-07-18',
    'wolverhampton': '2026-07-18',
    'dudley': '2026-07-18',
    'west-bromwich': '2026-07-18',
    'solihull': '2026-07-18',
    'coventry': '2026-07-18',
    'stourbridge': '2026-07-18',
    'halesowen': '2026-07-18',
    'wednesbury': '2026-07-18',
    'bloxwich': '2026-07-18',
    'brownhills': '2026-07-18',
    'nottingham': '2026-07-18',
    'leicester': '2026-07-18',
    'derby': '2026-07-18',
    'northampton': '2026-07-18',
    'lincoln': '2026-07-18',
    // New nationwide cities — added 2026-07-15
    'belfast': '2026-07-18',
    'derry': '2026-07-18',
    'lisburn': '2026-07-18',
    'newry': '2026-07-18',
    'sunderland': '2026-07-18',
    'middlesbrough': '2026-07-18',
    'gateshead': '2026-07-18',
    'darlington': '2026-07-18',
    'durham': '2026-07-18',
    'hartlepool': '2026-07-18',
    'doncaster': '2026-07-18',
    'rotherham': '2026-07-18',
    'barnsley': '2026-07-18',
    'brighton': '2026-07-18',
    'milton-keynes': '2026-07-18',
    'luton': '2026-07-18',
    'bournemouth': '2026-07-18',
    'slough': '2026-07-18',
    'medway': '2026-07-18',
    'crawley': '2026-07-18',
    'maidstone': '2026-07-18',
    'horsham': '2026-07-18',
    'peterborough': '2026-07-18',
    'norwich': '2026-07-18',
    'ipswich': '2026-07-18',
    'colchester': '2026-07-18',
    'basildon': '2026-07-18',
    'exeter': '2026-07-18',
    'torquay': '2026-07-18',
    'truro': '2026-07-18',
    'newport': '2026-07-18',
    'wrexham': '2026-07-18',
    'bangor': '2026-07-18',
    'aberystwyth': '2026-07-18',
    'inverness': '2026-07-18',
    'stirling': '2026-07-18',
    'perth': '2026-07-18',
    'paisley': '2026-07-18',
    'east-kilbride': '2026-07-18',
    'livingston': '2026-07-18',
    'falkirk': '2026-07-18',
  };

  const getLocationPriority = (slug: string): number => {
    if (tier1Slugs.has(slug)) return 0.9;
    if (tier2Slugs.has(slug)) return 0.85;
    if (tier3Slugs.has(slug)) return 0.8;
    return 0.75;
  };

  const locationUrls = LOCATIONS.filter(loc => isLocationIndexable(loc.slug)).map(loc => ({
    url: `${baseUrl}/man-and-van-${loc.slug}`,
    lastModified: new Date(locationLastModified[loc.slug] || '2026-07-18'),
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
    lastModified: new Date('2026-07-18'),
    changeFrequency: highIntentServiceSlugs.has(service) ? 'weekly' as const : 'monthly' as const,
    priority: highIntentServiceSlugs.has(service) ? 0.8 : 0.7,
  }));

  const staticUrls = [
    { route: '', priority: 1.0, freq: 'weekly' as const },
    { route: '/man-and-van-west-midlands', priority: 0.95, freq: 'weekly' as const },
    { route: '/man-and-van-east-midlands', priority: 0.95, freq: 'weekly' as const },
    // City hub pages removed from staticUrls — they are already in locationUrls from LOCATIONS
    { route: '/man-and-van-kent', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-essex', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-surrey', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-hampshire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-lancashire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-yorkshire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-devon', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-cornwall', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-staffordshire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-warwickshire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-worcestershire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-shropshire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-herefordshire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-nottinghamshire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-leicestershire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-derbyshire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-northamptonshire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-berkshire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-oxfordshire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-buckinghamshire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-hertfordshire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-cheshire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-somerset', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-dorset', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-wiltshire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-gloucestershire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-norfolk', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-suffolk', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-cambridgeshire', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-cost', priority: 0.95, freq: 'monthly' as const },
    { route: '/moving-home', priority: 0.95, freq: 'monthly' as const },
    { route: '/cheapest-moving-van', priority: 0.95, freq: 'monthly' as const },
    { route: '/blog', priority: 0.8, freq: 'weekly' as const },
    { route: '/blog/cost-guides', priority: 0.8, freq: 'monthly' as const },
    { route: '/blog/area-guides', priority: 0.8, freq: 'monthly' as const },
    { route: '/blog/moving-tips', priority: 0.8, freq: 'monthly' as const },
    { route: '/blog/how-much-does-man-and-van-cost', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/how-to-prepare-for-moving-day', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/man-and-van-vs-removal-company-guide', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/student-moving-guide', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/what-to-tell-your-mover-before-moving-day', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/birmingham-postcode-moving-guide', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/london-borough-moving-guide', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/what-affects-man-and-van-prices', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/same-day-move-guide', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/how-to-pack-for-a-house-move', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/average-cost-3-bedroom-house-move', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/do-i-need-to-empty-drawers-for-movers', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/how-to-move-a-piano-without-damage', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/office-relocation-checklist', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/anyvan-review-alternatives', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/what-insurance-does-your-man-and-van-need', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/house-moving-checklist-uk', priority: 0.85, freq: 'monthly' as const },
    { route: '/blog/man-and-van-birmingham-prices-how-to-book', priority: 0.9, freq: 'monthly' as const },
    { route: '/blog/man-and-van-walsall-prices-how-to-book', priority: 0.9, freq: 'monthly' as const },
    { route: '/blog/man-and-van-london-prices-how-to-book', priority: 0.9, freq: 'monthly' as const },
    { route: '/blog/man-and-van-manchester-prices-how-to-book', priority: 0.9, freq: 'monthly' as const },
    { route: '/blog/man-and-van-leeds-prices-how-to-book', priority: 0.9, freq: 'monthly' as const },
    { route: '/blog/man-and-van-sheffield-prices-how-to-book', priority: 0.9, freq: 'monthly' as const },
    { route: '/blog/man-and-van-bristol-prices-how-to-book', priority: 0.9, freq: 'monthly' as const },
    { route: '/blog/man-and-van-liverpool-prices-how-to-book', priority: 0.9, freq: 'monthly' as const },
    { route: '/blog/man-and-van-edinburgh-prices-how-to-book', priority: 0.9, freq: 'monthly' as const },
    { route: '/blog/man-and-van-cardiff-prices-how-to-book', priority: 0.9, freq: 'monthly' as const },
    { route: '/blog/man-and-van-newcastle-prices-how-to-book', priority: 0.9, freq: 'monthly' as const },
    { route: '/man-and-van-prices', priority: 0.85, freq: 'weekly' as const },
    { route: '/man-and-van-near-me', priority: 0.85, freq: 'weekly' as const },
    { route: '/man-and-van-vs-removal-company', priority: 0.85, freq: 'weekly' as const },
    { route: '/vs-anyvan', priority: 0.85, freq: 'weekly' as const },
    { route: '/house-removals', priority: 0.8, freq: 'monthly' as const },
    { route: '/flat-removals', priority: 0.8, freq: 'monthly' as const },
    { route: '/student-removals', priority: 0.8, freq: 'monthly' as const },
    { route: '/office-removals', priority: 0.8, freq: 'monthly' as const },
    { route: '/furniture-delivery', priority: 0.8, freq: 'monthly' as const },
    { route: '/same-day-man-and-van', priority: 0.8, freq: 'weekly' as const },
    { route: '/long-distance-removals', priority: 0.8, freq: 'monthly' as const },
    { route: '/facebook-marketplace-collection', priority: 0.75, freq: 'monthly' as const },
    { route: '/piano-removals', priority: 0.8, freq: 'monthly' as const },
    { route: '/single-item-delivery', priority: 0.8, freq: 'monthly' as const },
    { route: '/moving-cost-calculator', priority: 0.9, freq: 'weekly' as const },
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
    lastModified: new Date('2026-07-18'),
    changeFrequency: freq,
    priority,
  }));

  // Route pages — city-to-city move pages
  const routeUrls = getAllRouteSlugs().map(slug => ({
    url: `${baseUrl}/routes/${slug}`,
    lastModified: new Date('2026-07-18'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const routeIndexUrl = {
    url: `${baseUrl}/routes`,
    lastModified: new Date('2026-07-18'),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  };

  return [...staticUrls, routeIndexUrl, ...routeUrls, ...locationUrls];
}
