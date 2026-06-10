/**
 * Google Maps Directions URL generator for Popular Moving Routes.
 * Generates URLs dynamically — no hardcoded route lists.
 */

export interface RouteInfo {
  distance: string;   // e.g. "118 miles"
  duration: string;   // e.g. "2h 20m"
}

/**
 * Known UK city-to-city route metadata (distance + drive time).
 * This is the only hardcoded data needed; URLs are generated dynamically.
 */
const ROUTE_METADATA: Record<string, RouteInfo> = {
  // Birmingham routes
  "Birmingham-London": { distance: "118 miles", duration: "2h 20m" },
  "Birmingham-Manchester": { distance: "86 miles", duration: "1h 40m" },
  "Birmingham-Leeds": { distance: "118 miles", duration: "2h 10m" },
  "Birmingham-Bristol": { distance: "88 miles", duration: "1h 45m" },
  "Birmingham-Wolverhampton": { distance: "18 miles", duration: "35–45 mins" },
  "Birmingham-Walsall": { distance: "10 miles", duration: "20–25 mins" },
  "Birmingham-Coventry": { distance: "19 miles", duration: "30–40 mins" },
  "Birmingham-Dudley": { distance: "10 miles", duration: "20–30 mins" },
  "Birmingham-Solihull": { distance: "9 miles", duration: "15–25 mins" },
  "Birmingham-Nottingham": { distance: "52 miles", duration: "1h 10m" },
  "Birmingham-Liverpool": { distance: "99 miles", duration: "1h 50m" },
  "Birmingham-Sheffield": { distance: "78 miles", duration: "1h 25m" },
  "Birmingham-Leicester": { distance: "43 miles", duration: "55 mins" },
  "Birmingham-Newcastle": { distance: "204 miles", duration: "3h 30m" },
  "Birmingham-Cardiff": { distance: "106 miles", duration: "2h 5m" },
  "Birmingham-Oxford": { distance: "68 miles", duration: "1h 20m" },
  "Birmingham-Cambridge": { distance: "86 miles", duration: "1h 45m" },
  "Birmingham-Glasgow": { distance: "286 miles", duration: "4h 50m" },
  "Birmingham-Edinburgh": { distance: "292 miles", duration: "5h 10m" },
  "Birmingham-Brighton": { distance: "163 miles", duration: "2h 50m" },

  // London routes
  "London-Birmingham": { distance: "118 miles", duration: "2h 20m" },
  "London-Manchester": { distance: "200 miles", duration: "3h 30m" },
  "London-Bristol": { distance: "118 miles", duration: "2h 20m" },
  "London-Leeds": { distance: "196 miles", duration: "3h 30m" },
  "London-Brighton": { distance: "53 miles", duration: "1h 30m" },
  "London-Liverpool": { distance: "198 miles", duration: "3h 40m" },
  "London-Sheffield": { distance: "164 miles", duration: "3h" },
  "London-Leicester": { distance: "99 miles", duration: "1h 55m" },
  "London-Newcastle": { distance: "282 miles", duration: "4h 50m" },
  "London-Cardiff": { distance: "150 miles", duration: "2h 45m" },
  "London-Oxford": { distance: "56 miles", duration: "1h 15m" },
  "London-Cambridge": { distance: "64 miles", duration: "1h 25m" },
  "London-Glasgow": { distance: "403 miles", duration: "6h 40m" },
  "London-Edinburgh": { distance: "332 miles", duration: "5h 40m" },
  "London-Nottingham": { distance: "126 miles", duration: "2h 20m" },

  // Manchester routes
  "Manchester-London": { distance: "200 miles", duration: "3h 30m" },
  "Manchester-Birmingham": { distance: "86 miles", duration: "1h 40m" },
  "Manchester-Leeds": { distance: "46 miles", duration: "55 mins" },
  "Manchester-Liverpool": { distance: "34 miles", duration: "50 mins" },
  "Manchester-Sheffield": { distance: "38 miles", duration: "50 mins" },
  "Manchester-Bristol": { distance: "173 miles", duration: "3h 5m" },
  "Manchester-Leicester": { distance: "99 miles", duration: "1h 50m" },
  "Manchester-Newcastle": { distance: "150 miles", duration: "2h 40m" },
  "Manchester-Cardiff": { distance: "189 miles", duration: "3h 20m" },
  "Manchester-Oxford": { distance: "153 miles", duration: "2h 40m" },
  "Manchester-Cambridge": { distance: "162 miles", duration: "2h 55m" },
  "Manchester-Glasgow": { distance: "214 miles", duration: "3h 35m" },
  "Manchester-Edinburgh": { distance: "220 miles", duration: "3h 50m" },
  "Manchester-Nottingham": { distance: "82 miles", duration: "1h 30m" },
  "Manchester-Brighton": { distance: "246 miles", duration: "4h 15m" },

  // Leeds routes
  "Leeds-London": { distance: "196 miles", duration: "3h 30m" },
  "Leeds-Manchester": { distance: "46 miles", duration: "55 mins" },
  "Leeds-Birmingham": { distance: "118 miles", duration: "2h 10m" },
  "Leeds-Sheffield": { distance: "33 miles", duration: "45 mins" },
  "Leeds-Liverpool": { distance: "73 miles", duration: "1h 20m" },
  "Leeds-Bristol": { distance: "207 miles", duration: "3h 40m" },
  "Leeds-Leicester": { distance: "82 miles", duration: "1h 30m" },
  "Leeds-Newcastle": { distance: "92 miles", duration: "1h 40m" },
  "Leeds-Cardiff": { distance: "231 miles", duration: "4h" },
  "Leeds-Oxford": { distance: "148 miles", duration: "2h 35m" },
  "Leeds-Cambridge": { distance: "141 miles", duration: "2h 30m" },
  "Leeds-Glasgow": { distance: "214 miles", duration: "3h 35m" },
  "Leeds-Edinburgh": { distance: "196 miles", duration: "3h 20m" },
  "Leeds-Nottingham": { distance: "73 miles", duration: "1h 20m" },
  "Leeds-Brighton": { distance: "244 miles", duration: "4h 15m" },

  // Liverpool routes
  "Liverpool-London": { distance: "198 miles", duration: "3h 40m" },
  "Liverpool-Manchester": { distance: "34 miles", duration: "50 mins" },
  "Liverpool-Birmingham": { distance: "99 miles", duration: "1h 50m" },
  "Liverpool-Leeds": { distance: "73 miles", duration: "1h 20m" },
  "Liverpool-Sheffield": { distance: "72 miles", duration: "1h 20m" },
  "Liverpool-Bristol": { distance: "190 miles", duration: "3h 20m" },
  "Liverpool-Leicester": { distance: "118 miles", duration: "2h 5m" },
  "Liverpool-Newcastle": { distance: "171 miles", duration: "2h 55m" },
  "Liverpool-Cardiff": { distance: "174 miles", duration: "3h 10m" },
  "Liverpool-Oxford": { distance: "171 miles", duration: "3h" },
  "Liverpool-Cambridge": { distance: "196 miles", duration: "3h 20m" },
  "Liverpool-Glasgow": { distance: "218 miles", duration: "3h 40m" },
  "Liverpool-Edinburgh": { distance: "217 miles", duration: "3h 45m" },
  "Liverpool-Nottingham": { distance: "106 miles", duration: "1h 55m" },
  "Liverpool-Brighton": { distance: "261 miles", duration: "4h 30m" },

  // Bristol routes
  "Bristol-London": { distance: "118 miles", duration: "2h 20m" },
  "Bristol-Birmingham": { distance: "88 miles", duration: "1h 45m" },
  "Bristol-Manchester": { distance: "173 miles", duration: "3h 5m" },
  "Bristol-Leeds": { distance: "207 miles", duration: "3h 40m" },
  "Bristol-Liverpool": { distance: "190 miles", duration: "3h 20m" },
  "Bristol-Sheffield": { distance: "155 miles", duration: "2h 40m" },
  "Bristol-Leicester": { distance: "115 miles", duration: "2h" },
  "Bristol-Newcastle": { distance: "292 miles", duration: "5h" },
  "Bristol-Cardiff": { distance: "45 miles", duration: "50 mins" },
  "Bristol-Oxford": { distance: "71 miles", duration: "1h 25m" },
  "Bristol-Cambridge": { distance: "146 miles", duration: "2h 35m" },
  "Bristol-Glasgow": { distance: "380 miles", duration: "6h 15m" },
  "Bristol-Edinburgh": { distance: "373 miles", duration: "6h 20m" },
  "Bristol-Nottingham": { distance: "145 miles", duration: "2h 30m" },
  "Bristol-Brighton": { distance: "155 miles", duration: "2h 40m" },

  // Wolverhampton routes
  "Wolverhampton-Birmingham": { distance: "18 miles", duration: "35–45 mins" },
  "Wolverhampton-London": { distance: "134 miles", duration: "2h 30m" },
  "Wolverhampton-Manchester": { distance: "76 miles", duration: "1h 25m" },
  "Wolverhampton-Leeds": { distance: "108 miles", duration: "1h 55m" },
  "Wolverhampton-Bristol": { distance: "96 miles", duration: "1h 50m" },
  "Wolverhampton-Liverpool": { distance: "85 miles", duration: "1h 30m" },
  "Wolverhampton-Sheffield": { distance: "68 miles", duration: "1h 15m" },
  "Wolverhampton-Leicester": { distance: "54 miles", duration: "1h" },
  "Wolverhampton-Newcastle": { distance: "190 miles", duration: "3h 15m" },
  "Wolverhampton-Cardiff": { distance: "126 miles", duration: "2h 15m" },
  "Wolverhampton-Oxford": { distance: "82 miles", duration: "1h 30m" },
  "Wolverhampton-Cambridge": { distance: "102 miles", duration: "1h 50m" },
  "Wolverhampton-Glasgow": { distance: "268 miles", duration: "4h 25m" },
  "Wolverhampton-Edinburgh": { distance: "266 miles", duration: "4h 30m" },
  "Wolverhampton-Nottingham": { distance: "62 miles", duration: "1h 10m" },
  "Wolverhampton-Brighton": { distance: "176 miles", duration: "3h 5m" },

  // Walsall routes
  "Walsall-Birmingham": { distance: "10 miles", duration: "20–25 mins" },
  "Walsall-London": { distance: "127 miles", duration: "2h 25m" },
  "Walsall-Manchester": { distance: "82 miles", duration: "1h 30m" },
  "Walsall-Leeds": { distance: "114 miles", duration: "2h" },
  "Walsall-Bristol": { distance: "95 miles", duration: "1h 50m" },
  "Walsall-Liverpool": { distance: "91 miles", duration: "1h 35m" },
  "Walsall-Sheffield": { distance: "74 miles", duration: "1h 20m" },
  "Walsall-Leicester": { distance: "48 miles", duration: "55 mins" },
  "Walsall-Newcastle": { distance: "196 miles", duration: "3h 20m" },
  "Walsall-Cardiff": { distance: "118 miles", duration: "2h 10m" },
  "Walsall-Oxford": { distance: "76 miles", duration: "1h 25m" },
  "Walsall-Cambridge": { distance: "96 miles", duration: "1h 45m" },
  "Walsall-Glasgow": { distance: "274 miles", duration: "4h 30m" },
  "Walsall-Edinburgh": { distance: "272 miles", duration: "4h 35m" },
  "Walsall-Nottingham": { distance: "56 miles", duration: "1h 5m" },
  "Walsall-Brighton": { distance: "169 miles", duration: "2h 55m" },

  // Coventry routes
  "Coventry-Birmingham": { distance: "19 miles", duration: "30–40 mins" },
  "Coventry-London": { distance: "106 miles", duration: "2h" },
  "Coventry-Manchester": { distance: "99 miles", duration: "1h 45m" },
  "Coventry-Leeds": { distance: "118 miles", duration: "2h 5m" },
  "Coventry-Bristol": { distance: "85 miles", duration: "1h 35m" },
  "Coventry-Liverpool": { distance: "109 miles", duration: "1h 55m" },
  "Coventry-Sheffield": { distance: "78 miles", duration: "1h 20m" },
  "Coventry-Leicester": { distance: "24 miles", duration: "35 mins" },
  "Coventry-Newcastle": { distance: "200 miles", duration: "3h 20m" },
  "Coventry-Cardiff": { distance: "125 miles", duration: "2h 15m" },
  "Coventry-Oxford": { distance: "47 miles", duration: "55 mins" },
  "Coventry-Cambridge": { distance: "73 miles", duration: "1h 20m" },
  "Coventry-Glasgow": { distance: "285 miles", duration: "4h 40m" },
  "Coventry-Edinburgh": { distance: "283 miles", duration: "4h 45m" },
  "Coventry-Nottingham": { distance: "43 miles", duration: "50 mins" },
  "Coventry-Brighton": { distance: "151 miles", duration: "2h 35m" },

  // Nottingham routes
  "Nottingham-Birmingham": { distance: "52 miles", duration: "1h 10m" },
  "Nottingham-London": { distance: "126 miles", duration: "2h 20m" },
  "Nottingham-Manchester": { distance: "82 miles", duration: "1h 30m" },
  "Nottingham-Leeds": { distance: "73 miles", duration: "1h 20m" },
  "Nottingham-Bristol": { distance: "145 miles", duration: "2h 30m" },
  "Nottingham-Liverpool": { distance: "106 miles", duration: "1h 55m" },
  "Nottingham-Sheffield": { distance: "37 miles", duration: "45 mins" },
  "Nottingham-Leicester": { distance: "25 miles", duration: "35 mins" },
  "Nottingham-Newcastle": { distance: "160 miles", duration: "2h 45m" },
  "Nottingham-Cardiff": { distance: "172 miles", duration: "2h 55m" },
  "Nottingham-Oxford": { distance: "90 miles", duration: "1h 40m" },
  "Nottingham-Cambridge": { distance: "76 miles", duration: "1h 25m" },
  "Nottingham-Glasgow": { distance: "292 miles", duration: "4h 50m" },
  "Nottingham-Edinburgh": { distance: "278 miles", duration: "4h 35m" },
  "Nottingham-Brighton": { distance: "171 miles", duration: "2h 55m" },

  // Sheffield routes
  "Sheffield-London": { distance: "164 miles", duration: "3h" },
  "Sheffield-Birmingham": { distance: "78 miles", duration: "1h 25m" },
  "Sheffield-Manchester": { distance: "38 miles", duration: "50 mins" },
  "Sheffield-Leeds": { distance: "33 miles", duration: "45 mins" },
  "Sheffield-Bristol": { distance: "155 miles", duration: "2h 40m" },
  "Sheffield-Liverpool": { distance: "72 miles", duration: "1h 20m" },
  "Sheffield-Leicester": { distance: "60 miles", duration: "1h 5m" },
  "Sheffield-Newcastle": { distance: "122 miles", duration: "2h 10m" },
  "Sheffield-Cardiff": { distance: "192 miles", duration: "3h 15m" },
  "Sheffield-Oxford": { distance: "112 miles", duration: "1h 55m" },
  "Sheffield-Cambridge": { distance: "111 miles", duration: "1h 55m" },
  "Sheffield-Glasgow": { distance: "245 miles", duration: "4h 5m" },
  "Sheffield-Edinburgh": { distance: "229 miles", duration: "3h 50m" },
  "Sheffield-Nottingham": { distance: "37 miles", duration: "45 mins" },
  "Sheffield-Brighton": { distance: "210 miles", duration: "3h 35m" },

  // Leicester routes
  "Leicester-London": { distance: "99 miles", duration: "1h 55m" },
  "Leicester-Birmingham": { distance: "43 miles", duration: "55 mins" },
  "Leicester-Manchester": { distance: "99 miles", duration: "1h 50m" },
  "Leicester-Leeds": { distance: "82 miles", duration: "1h 30m" },
  "Leicester-Bristol": { distance: "115 miles", duration: "2h" },
  "Leicester-Liverpool": { distance: "118 miles", duration: "2h 5m" },
  "Leicester-Sheffield": { distance: "60 miles", duration: "1h 5m" },
  "Leicester-Newcastle": { distance: "177 miles", duration: "3h" },
  "Leicester-Cardiff": { distance: "145 miles", duration: "2h 25m" },
  "Leicester-Oxford": { distance: "62 miles", duration: "1h 10m" },
  "Leicester-Cambridge": { distance: "65 miles", duration: "1h 15m" },
  "Leicester-Glasgow": { distance: "300 miles", duration: "5h" },
  "Leicester-Edinburgh": { distance: "290 miles", duration: "4h 50m" },
  "Leicester-Nottingham": { distance: "25 miles", duration: "35 mins" },
  "Leicester-Brighton": { distance: "158 miles", duration: "2h 45m" },

  // Newcastle routes
  "Newcastle-London": { distance: "282 miles", duration: "4h 50m" },
  "Newcastle-Birmingham": { distance: "204 miles", duration: "3h 30m" },
  "Newcastle-Manchester": { distance: "150 miles", duration: "2h 40m" },
  "Newcastle-Leeds": { distance: "92 miles", duration: "1h 40m" },
  "Newcastle-Bristol": { distance: "292 miles", duration: "5h" },
  "Newcastle-Liverpool": { distance: "171 miles", duration: "2h 55m" },
  "Newcastle-Sheffield": { distance: "122 miles", duration: "2h 10m" },
  "Newcastle-Leicester": { distance: "177 miles", duration: "3h" },
  "Newcastle-Cardiff": { distance: "328 miles", duration: "5h 30m" },
  "Newcastle-Oxford": { distance: "236 miles", duration: "3h 55m" },
  "Newcastle-Cambridge": { distance: "216 miles", duration: "3h 35m" },
  "Newcastle-Glasgow": { distance: "145 miles", duration: "2h 30m" },
  "Newcastle-Edinburgh": { distance: "105 miles", duration: "1h 50m" },
  "Newcastle-Nottingham": { distance: "160 miles", duration: "2h 45m" },
  "Newcastle-Brighton": { distance: "335 miles", duration: "5h 40m" },

  // Cardiff routes
  "Cardiff-London": { distance: "150 miles", duration: "2h 45m" },
  "Cardiff-Birmingham": { distance: "106 miles", duration: "2h 5m" },
  "Cardiff-Manchester": { distance: "189 miles", duration: "3h 20m" },
  "Cardiff-Leeds": { distance: "231 miles", duration: "4h" },
  "Cardiff-Bristol": { distance: "45 miles", duration: "50 mins" },
  "Cardiff-Liverpool": { distance: "174 miles", duration: "3h 10m" },
  "Cardiff-Sheffield": { distance: "192 miles", duration: "3h 15m" },
  "Cardiff-Leicester": { distance: "145 miles", duration: "2h 25m" },
  "Cardiff-Newcastle": { distance: "328 miles", duration: "5h 30m" },
  "Cardiff-Oxford": { distance: "97 miles", duration: "1h 50m" },
  "Cardiff-Cambridge": { distance: "189 miles", duration: "3h 15m" },
  "Cardiff-Glasgow": { distance: "392 miles", duration: "6h 30m" },
  "Cardiff-Edinburgh": { distance: "381 miles", duration: "6h 25m" },
  "Cardiff-Nottingham": { distance: "172 miles", duration: "2h 55m" },
  "Cardiff-Brighton": { distance: "195 miles", duration: "3h 15m" },

  // Oxford routes
  "Oxford-London": { distance: "56 miles", duration: "1h 15m" },
  "Oxford-Birmingham": { distance: "68 miles", duration: "1h 20m" },
  "Oxford-Manchester": { distance: "153 miles", duration: "2h 40m" },
  "Oxford-Leeds": { distance: "148 miles", duration: "2h 35m" },
  "Oxford-Bristol": { distance: "71 miles", duration: "1h 25m" },
  "Oxford-Liverpool": { distance: "171 miles", duration: "3h" },
  "Oxford-Sheffield": { distance: "112 miles", duration: "1h 55m" },
  "Oxford-Leicester": { distance: "62 miles", duration: "1h 10m" },
  "Oxford-Newcastle": { distance: "236 miles", duration: "3h 55m" },
  "Oxford-Cardiff": { distance: "97 miles", duration: "1h 50m" },
  "Oxford-Cambridge": { distance: "85 miles", duration: "1h 35m" },
  "Oxford-Glasgow": { distance: "338 miles", duration: "5h 35m" },
  "Oxford-Edinburgh": { distance: "328 miles", duration: "5h 25m" },
  "Oxford-Nottingham": { distance: "90 miles", duration: "1h 40m" },
  "Oxford-Brighton": { distance: "108 miles", duration: "1h 55m" },

  // Cambridge routes
  "Cambridge-London": { distance: "64 miles", duration: "1h 25m" },
  "Cambridge-Birmingham": { distance: "86 miles", duration: "1h 45m" },
  "Cambridge-Manchester": { distance: "162 miles", duration: "2h 55m" },
  "Cambridge-Leeds": { distance: "141 miles", duration: "2h 30m" },
  "Cambridge-Bristol": { distance: "146 miles", duration: "2h 35m" },
  "Cambridge-Liverpool": { distance: "196 miles", duration: "3h 20m" },
  "Cambridge-Sheffield": { distance: "111 miles", duration: "1h 55m" },
  "Cambridge-Leicester": { distance: "65 miles", duration: "1h 15m" },
  "Cambridge-Newcastle": { distance: "216 miles", duration: "3h 35m" },
  "Cambridge-Cardiff": { distance: "189 miles", duration: "3h 15m" },
  "Cambridge-Oxford": { distance: "85 miles", duration: "1h 35m" },
  "Cambridge-Glasgow": { distance: "345 miles", duration: "5h 45m" },
  "Cambridge-Edinburgh": { distance: "331 miles", duration: "5h 30m" },
  "Cambridge-Nottingham": { distance: "76 miles", duration: "1h 25m" },
  "Cambridge-Brighton": { distance: "118 miles", duration: "2h 5m" },

  // Glasgow routes
  "Glasgow-London": { distance: "403 miles", duration: "6h 40m" },
  "Glasgow-Birmingham": { distance: "286 miles", duration: "4h 50m" },
  "Glasgow-Manchester": { distance: "214 miles", duration: "3h 35m" },
  "Glasgow-Leeds": { distance: "214 miles", duration: "3h 35m" },
  "Glasgow-Bristol": { distance: "380 miles", duration: "6h 15m" },
  "Glasgow-Liverpool": { distance: "218 miles", duration: "3h 40m" },
  "Glasgow-Sheffield": { distance: "245 miles", duration: "4h 5m" },
  "Glasgow-Leicester": { distance: "300 miles", duration: "5h" },
  "Glasgow-Newcastle": { distance: "145 miles", duration: "2h 30m" },
  "Glasgow-Cardiff": { distance: "392 miles", duration: "6h 30m" },
  "Glasgow-Oxford": { distance: "338 miles", duration: "5h 35m" },
  "Glasgow-Cambridge": { distance: "345 miles", duration: "5h 45m" },
  "Glasgow-Edinburgh": { distance: "47 miles", duration: "55 mins" },
  "Glasgow-Nottingham": { distance: "292 miles", duration: "4h 50m" },
  "Glasgow-Brighton": { distance: "445 miles", duration: "7h 15m" },

  // Edinburgh routes
  "Edinburgh-London": { distance: "332 miles", duration: "5h 40m" },
  "Edinburgh-Birmingham": { distance: "292 miles", duration: "5h 10m" },
  "Edinburgh-Manchester": { distance: "220 miles", duration: "3h 50m" },
  "Edinburgh-Leeds": { distance: "196 miles", duration: "3h 20m" },
  "Edinburgh-Bristol": { distance: "373 miles", duration: "6h 20m" },
  "Edinburgh-Liverpool": { distance: "217 miles", duration: "3h 45m" },
  "Edinburgh-Sheffield": { distance: "229 miles", duration: "3h 50m" },
  "Edinburgh-Leicester": { distance: "290 miles", duration: "4h 50m" },
  "Edinburgh-Newcastle": { distance: "105 miles", duration: "1h 50m" },
  "Edinburgh-Cardiff": { distance: "381 miles", duration: "6h 25m" },
  "Edinburgh-Oxford": { distance: "328 miles", duration: "5h 25m" },
  "Edinburgh-Cambridge": { distance: "331 miles", duration: "5h 30m" },
  "Edinburgh-Glasgow": { distance: "47 miles", duration: "55 mins" },
  "Edinburgh-Nottingham": { distance: "278 miles", duration: "4h 35m" },
  "Edinburgh-Brighton": { distance: "374 miles", duration: "6h 15m" },

  // Brighton routes
  "Brighton-London": { distance: "53 miles", duration: "1h 30m" },
  "Brighton-Birmingham": { distance: "163 miles", duration: "2h 50m" },
  "Brighton-Manchester": { distance: "246 miles", duration: "4h 15m" },
  "Brighton-Leeds": { distance: "244 miles", duration: "4h 15m" },
  "Brighton-Bristol": { distance: "155 miles", duration: "2h 40m" },
  "Brighton-Liverpool": { distance: "261 miles", duration: "4h 30m" },
  "Brighton-Sheffield": { distance: "210 miles", duration: "3h 35m" },
  "Brighton-Leicester": { distance: "158 miles", duration: "2h 45m" },
  "Brighton-Newcastle": { distance: "335 miles", duration: "5h 40m" },
  "Brighton-Cardiff": { distance: "195 miles", duration: "3h 15m" },
  "Brighton-Oxford": { distance: "108 miles", duration: "1h 55m" },
  "Brighton-Cambridge": { distance: "118 miles", duration: "2h 5m" },
  "Brighton-Glasgow": { distance: "445 miles", duration: "7h 15m" },
  "Brighton-Edinburgh": { distance: "374 miles", duration: "6h 15m" },
  "Brighton-Nottingham": { distance: "171 miles", duration: "2h 55m" },
};

/**
 * Generate a Google Maps directions URL from origin to destination.
 * Both cities are automatically suffixed with ",+UK" for accuracy.
 */
export function getGoogleMapsRouteUrl(origin: string, destination: string): string {
  const encodedOrigin = encodeURIComponent(`${origin}, UK`);
  const encodedDestination = encodeURIComponent(`${destination}, UK`);
  return `https://www.google.com/maps/dir/${encodedOrigin}/${encodedDestination}`;
}

/**
 * Look up static distance/duration metadata for a route.
 * Falls back to sensible defaults if the route is unknown.
 */
export function getRouteInfo(origin: string, destination: string): RouteInfo {
  const key = `${origin}-${destination}`;
  const reverseKey = `${destination}-${origin}`;

  // Try direct match first, then reverse
  if (ROUTE_METADATA[key]) {
    return ROUTE_METADATA[key];
  }
  if (ROUTE_METADATA[reverseKey]) {
    return ROUTE_METADATA[reverseKey];
  }

  // Fallback: return a generic placeholder
  return { distance: "", duration: "" };
}

/**
 * Check if we have known metadata for a route.
 */
export function hasRouteInfo(origin: string, destination: string): boolean {
  const key = `${origin}-${destination}`;
  const reverseKey = `${destination}-${origin}`;
  return !!ROUTE_METADATA[key] || !!ROUTE_METADATA[reverseKey];
}
