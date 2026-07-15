import { LocationData, getLocationBySlug, LOCATIONS } from "@/constants/locations";
import { customLocationContentOverrides } from "./custom-location-content";
import { getRouteInfo, type RouteInfo } from "./google-maps-routes";
import { isLaunchIndexableLocation, isSeoLaunchMode } from "./seo-quality-guard";

export interface LocationPageData {
  name: string;
  title: string;
  description: string;
  badge: string;
  intro: string;
  knowledge: string;
  areas: string[];
  slug: string;
  h1?: string;
  faq: { q: string; a: string }[];
  nearbyLocations: { slug: string; name: string }[];
  serviceLinks: { title: string; href: string }[];
  localBusinessSchema: Record<string, any>;
  breadcrumbSchema: Record<string, any>;
  faqSchema: Record<string, any>;
  region: string;
  pageType: "location";
  // NEW: rich content sections
  areasWeCover: string[];
  localMovingInfo: string;
  popularMoves: { from: string; to: string; slug?: string; routeInfo: RouteInfo }[];
  localLandmarks: string[];
  trustPoints: { icon: string; label: string }[];
  verificationChecks: string[];
  movingChecklist: string[];
  regionCities: { name: string; slug: string }[];
  localAreaGuides?: { title: string; body: string; links?: { label: string; href: string }[] }[];
  exampleMoveRequests?: { area: string; type: string; detail: string }[];
  postcodeCoverage?: { area: string; postcodes: string[] }[];
  // Step 2: Honest coverage signal for top locations
  coverageSignal?: boolean;
  // Step 3: Cross-region nearby areas for stronger internal linking
  crossRegionLinks?: { slug: string; name: string }[];
}


const SERVICE_LINKS = [
  { title: "House Removals", href: "/house-removals" },
  { title: "Flat Removals", href: "/flat-removals" },
  { title: "Office Removals", href: "/office-removals" },
  { title: "Student Moves", href: "/student-removals" },
  { title: "Furniture Collection", href: "/furniture-delivery" },
  { title: "Long Distance Moves", href: "/long-distance-removals" },
  { title: "Same Day Moves", href: "/same-day-man-and-van" },
];

const TRUST_POINTS = [
  { icon: "ClipboardCheck", label: "Free To Submit" },
  { icon: "PhoneOff", label: "No Endless Calls" },
  { icon: "UserCheck", label: "Customer-Confirmed Process" },
  { icon: "Lock", label: "Secure Enquiry Process" },
  { icon: "MapPin", label: "Local Mover Coverage" },
];

const VERIFICATION_CHECKS = [
  "Business Details",
  "Contact Information",
  "Goods in Transit Insurance",
  "Public Liability Insurance",
  "Service Area Verification",
];

const MOVING_CHECKLIST = [
  "Confirm moving date",
  "Prepare packing materials",
  "Label boxes clearly",
  "Arrange parking if required",
  "Notify utility providers",
  "Take meter readings",
  "Update your address",
];

function generateBusinessModelIntro(loc: LocationData): string {
  const areas = loc.nearbyAreas.slice(0, 3).join(", ");
  return `${loc.name} moves can vary by postcode, property type, parking and access. Whether your move is around ${areas || loc.name} or elsewhere nearby, Man and Van Club lets you submit a free request for a verified mover to review before sending quote options.`;
}

function generateBusinessModelKnowledge(loc: LocationData): string {
  const roads = loc.majorRoads.slice(0, 3).join(", ");
  const properties = loc.propertyTypes.slice(0, 3).join(", ");
  const considerations = loc.movingConsiderations.slice(0, 3).join("; ");
  return `A good ${loc.name} quote depends on more than mileage. Postcodes, item list, parking, stairs, lifts, access and timing can all affect the work involved. Your request gives a verified mover the details they need to account for ${roads ? `${roads} routes, ` : ""}${properties || "local property types"}${considerations ? ` and local issues such as ${considerations}` : ""} before you decide whether to book.`;
}

// Popular move destinations by region (for generic generation)
function getPopularMovesForRegion(loc: LocationData): { from: string; to: string; slug?: string; routeInfo: RouteInfo }[] {
  const majorCities: Record<string, { to: string; slug: string }[]> = {
    "West Midlands": [
      { to: "London", slug: "london" },
      { to: "Manchester", slug: "manchester" },
      { to: "Leeds", slug: "leeds" },
      { to: "Bristol", slug: "bristol" },
      { to: "Wolverhampton", slug: "wolverhampton" },
    ],
    "Greater London": [
      { to: "Birmingham", slug: "birmingham" },
      { to: "Manchester", slug: "manchester" },
      { to: "Bristol", slug: "bristol" },
      { to: "Leeds", slug: "leeds" },
      { to: "Brighton", slug: "" },
    ],
    "Greater Manchester": [
      { to: "London", slug: "london" },
      { to: "Birmingham", slug: "birmingham" },
      { to: "Leeds", slug: "leeds" },
      { to: "Liverpool", slug: "liverpool" },
      { to: "Sheffield", slug: "" },
    ],
    "West Yorkshire": [
      { to: "London", slug: "london" },
      { to: "Manchester", slug: "manchester" },
      { to: "Birmingham", slug: "birmingham" },
      { to: "Leeds", slug: "leeds" },
      { to: "Newcastle", slug: "" },
    ],
    "Merseyside": [
      { to: "London", slug: "london" },
      { to: "Manchester", slug: "manchester" },
      { to: "Birmingham", slug: "birmingham" },
      { to: "Leeds", slug: "leeds" },
      { to: "Chester", slug: "" },
    ],
    "South West": [
      { to: "London", slug: "london" },
      { to: "Birmingham", slug: "birmingham" },
      { to: "Manchester", slug: "manchester" },
      { to: "Cardiff", slug: "cardiff" },
      { to: "Exeter", slug: "" },
    ],
    "East Midlands": [
      { to: "Birmingham", slug: "birmingham" },
      { to: "London", slug: "london" },
      { to: "Manchester", slug: "manchester" },
      { to: "Leeds", slug: "leeds" },
      { to: "Leicester", slug: "leicester" },
    ],
  };

  const region = loc.region;
  const destinations = majorCities[region] || majorCities["West Midlands"];
  return destinations.slice(0, 5).map((d) => ({
    from: loc.name,
    to: d.to,
    slug: d.slug,
    routeInfo: getRouteInfo(loc.name, d.to),
  }));
}

function generateAreasWeCover(loc: LocationData): string[] {
  // Combine nearbyAreas + areas, take up to 12 unique
  const combined = Array.from(new Set([...loc.nearbyAreas, ...loc.areas]));
  return combined.slice(0, 12);
}

function generateLocalMovingInfo(loc: LocationData): string {
  const considerations = loc.movingConsiderations;
  const roads = loc.majorRoads.slice(0, 3).join(", ");
  const properties = loc.propertyTypes.slice(0, 3).join(", ");

  let info = `Moving in ${loc.name} can involve different parking, access and route considerations depending on the postcode and property type. `;

  if (loc.hasStudentAreas && loc.studentAreas) {
    info += `With student areas like ${loc.studentAreas.slice(0, 2).join(" and ")}, peak moving periods align with academic term dates. `;
  }

  if (loc.businessDistricts) {
    info += `Business relocations in ${loc.businessDistricts.slice(0, 2).join(" and ")} often need evening or weekend slots to minimise disruption. `;
  }

  info += `A verified mover can review details such as the ${roads} corridors and local property types, from ${properties}. `;

  if (considerations.length > 0) {
    info += `Common moving considerations in ${loc.name} include ${considerations.slice(0, 3).join("; ")}. `;
  }

  info += `Whether you are moving within ${loc.name} or relocating to a neighbouring town, your request stays protected while a mover reviews the details and prepares quote options.`;

  return info;
}

function generateLocalLandmarks(loc: LocationData): string[] {
  // Use nearbyAreas as "landmarks" - these are genuine local areas
  return loc.nearbyAreas.slice(0, 6);
}


const WEST_MIDLANDS_POSTCODE_COVERAGE: Record<string, { area: string; postcodes: string[] }[]> = {
  birmingham: [
    { area: "City centre and Jewellery Quarter", postcodes: ["B1", "B2", "B3"] },
    { area: "South Birmingham", postcodes: ["B13", "B14", "B29"] },
    { area: "Edgbaston, Harborne and west Birmingham", postcodes: ["B15", "B16", "B17"] },
  ],
  walsall: [
    { area: "Central Walsall", postcodes: ["WS1", "WS2"] },
    { area: "Bloxwich and north Walsall", postcodes: ["WS3"] },
    { area: "Aldridge, Pelsall and nearby", postcodes: ["WS4", "WS9"] },
  ],
  brownhills: [
    { area: "Brownhills and WS8", postcodes: ["WS8"] },
    { area: "North Walsall and Pelsall", postcodes: ["WS3", "WS4"] },
    { area: "Aldridge and Walsall Wood", postcodes: ["WS9"] },
  ],
  wolverhampton: [
    { area: "Central Wolverhampton", postcodes: ["WV1", "WV2"] },
    { area: "Tettenhall and west Wolverhampton", postcodes: ["WV6"] },
    { area: "Bushbury and north Wolverhampton", postcodes: ["WV10", "WV11"] },
  ],
  dudley: [
    { area: "Central Dudley", postcodes: ["DY1", "DY2"] },
    { area: "Brierley Hill and Pensnett", postcodes: ["DY5"] },
    { area: "Kingswinford and Sedgley", postcodes: ["DY3", "DY6"] },
  ],
  "west-bromwich": [
    { area: "West Bromwich and Sandwell", postcodes: ["B70", "B71"] },
    { area: "Smethwick and nearby", postcodes: ["B66", "B67"] },
    { area: "Oldbury and Rowley Regis", postcodes: ["B68", "B69"] },
  ],
  solihull: [
    { area: "Central Solihull", postcodes: ["B91", "B92"] },
    { area: "Shirley and Monkspath", postcodes: ["B90"] },
    { area: "Knowle and Dorridge", postcodes: ["B93"] },
  ],
  coventry: [
    { area: "Central Coventry", postcodes: ["CV1", "CV2"] },
    { area: "Earlsdon and Canley", postcodes: ["CV4", "CV5"] },
    { area: "Foleshill and north Coventry", postcodes: ["CV6"] },
  ],
  // ──────────────────────────────────────────
  // EAST MIDLANDS POSTCODE COVERAGE
  // ──────────────────────────────────────────
  nottingham: [
    { area: "City centre and Lace Market", postcodes: ["NG1", "NG2"] },
    { area: "West Bridgford and Lady Bay", postcodes: ["NG2"] },
    { area: "Beeston and University area", postcodes: ["NG9"] },
    { area: "Arnold and Sherwood", postcodes: ["NG5"] },
    { area: "Carlton and Gedling", postcodes: ["NG4"] },
    { area: "Hucknall and north Nottingham", postcodes: ["NG15"] },
  ],
  leicester: [
    { area: "City centre and Highcross", postcodes: ["LE1", "LE2"] },
    { area: "Oadby and Stoneygate", postcodes: ["LE2"] },
    { area: "Wigston and South Leicester", postcodes: ["LE18"] },
    { area: "Braunstone and west Leicester", postcodes: ["LE3"] },
    { area: "Evington and Clarendon Park", postcodes: ["LE5"] },
  ],
  derby: [
    { area: "City centre and Pride Park", postcodes: ["DE1", "DE24"] },
    { area: "Mickleover and Littleover", postcodes: ["DE3"] },
    { area: "Chaddesden and Spondon", postcodes: ["DE21"] },
    { area: "Alvaston and Allenton", postcodes: ["DE24"] },
    { area: "Allestree and north Derby", postcodes: ["DE22"] },
  ],
  northampton: [
    { area: "Town centre and Abington", postcodes: ["NN1"] },
    { area: "Kingsthorpe and north Northampton", postcodes: ["NN2"] },
    { area: "Duston and west Northampton", postcodes: ["NN5"] },
    { area: "Wootton and East Hunsbury", postcodes: ["NN4"] },
  ],
  lincoln: [
    { area: "City centre and Cathedral Quarter", postcodes: ["LN1", "LN2"] },
    { area: "Brayford and University area", postcodes: ["LN6"] },
    { area: "North Hykeham and south Lincoln", postcodes: ["LN6"] },
    { area: "Boultham and west Lincoln", postcodes: ["LN6"] },
  ],
  // East Midlands area pages
  arnold: [
    { area: "Arnold and Daybrook", postcodes: ["NG5"] },
  ],
  beeston: [
    { area: "Beeston and Chilwell", postcodes: ["NG9"] },
  ],
  carlton: [
    { area: "Carlton and Gedling", postcodes: ["NG4"] },
  ],
  "west-bridgford": [
    { area: "West Bridgford and Lady Bay", postcodes: ["NG2"] },
  ],
  hucknall: [
    { area: "Hucknall", postcodes: ["NG15"] },
  ],
  oadby: [
    { area: "Oadby and Stoneygate", postcodes: ["LE2"] },
  ],
  wigston: [
    { area: "Wigston and South Wigston", postcodes: ["LE18"] },
  ],
  braunstone: [
    { area: "Braunstone and New Parks", postcodes: ["LE3"] },
  ],
  evington: [
    { area: "Evington and Clarendon Park", postcodes: ["LE5"] },
  ],
  chaddesden: [
    { area: "Chaddesden and Oakwood", postcodes: ["DE21"] },
  ],
  mickleover: [
    { area: "Mickleover and Kingway", postcodes: ["DE3"] },
  ],
  alvaston: [
    { area: "Alvaston and Boulton", postcodes: ["DE24"] },
  ],
  littleover: [
    { area: "Littleover and Heatherton", postcodes: ["DE3"] },
  ],
  kingsthorpe: [
    { area: "Kingsthorpe", postcodes: ["NN2"] },
  ],
  duston: [
    { area: "Duston and Upton", postcodes: ["NN5"] },
  ],
  abington: [
    { area: "Abington and Semilong", postcodes: ["NN1"] },
  ],
  "north-hykeham": [
    { area: "North Hykeham", postcodes: ["LN6"] },
  ],
};

function generatePostcodeCoverage(loc: LocationData): { area: string; postcodes: string[] }[] {
  const explicit = WEST_MIDLANDS_POSTCODE_COVERAGE[loc.slug];
  if (explicit) return explicit;

  // Postcode coverage for all major UK cities
  const outwardBySlug: Record<string, string[]> = {
    // West Midlands
    stourbridge: ["DY8", "DY9"],
    halesowen: ["B62", "B63"],
    wednesbury: ["WS10", "DY4"],
    bloxwich: ["WS3"],
    brownhills: ["WS8"],
    aldridge: ["WS9"],
    oldbury: ["B68", "B69"],
    tipton: ["DY4"],
    willenhall: ["WV12", "WV13"],
    darlaston: ["WS10"],
    smethwick: ["B66", "B67"],
    bilston: ["WV14"],
    rugby: ["CV21", "CV22", "CV23"],
    nuneaton: ["CV10", "CV11", "CV12"],
    tamworth: ["B77", "B78", "B79"],
    cannock: ["WS11", "WS12"],
    lichfield: ["WS13", "WS14"],
    // Greater London
    croydon: ["CR0", "CR2", "CR7", "CR9"],
    bromley: ["BR1", "BR2", "BR3"],
    romford: ["RM1", "RM2", "RM3", "RM5"],
    ilford: ["IG1", "IG2", "IG3"],
    wembley: ["HA0", "HA9"],
    ealing: ["W5", "W7", "W13"],
    harrow: ["HA1", "HA2", "HA3"],
    hounslow: ["TW3", "TW4", "TW5"],
    kingston: ["KT1", "KT2"],
    twickenham: ["TW1", "TW2"],
    enfield: ["EN1", "EN2", "EN3"],
    barnet: ["EN4", "EN5"],
    finchley: ["N3", "N12"],
    edgware: ["HA8"],
    stratford: ["E15", "E20"],
    lewisham: ["SE13", "SE14", "SE6"],
    greenwich: ["SE10", "SE7", "SE18"],
    bexley: ["DA5", "DA6", "DA7"],
    sutton: ["SM1", "SM2", "SM3"],
    mitcham: ["CR4"],
    walthamstow: ["E17"],
    "wood-green": ["N22", "N8"],
    tottenham: ["N15", "N17"],
    acton: ["W3", "W12"],
    chiswick: ["W4"],
    richmond: ["TW9", "TW10"],
    // Greater Manchester
    salford: ["M5", "M6", "M7"],
    bolton: ["BL1", "BL2", "BL3"],
    bury: ["BL8", "BL9"],
    rochdale: ["OL11", "OL12", "OL16"],
    oldham: ["OL1", "OL2", "OL3"],
    stockport: ["SK1", "SK2", "SK3"],
    altrincham: ["WA14", "WA15"],
    trafford: ["M32", "M33"],
    wigan: ["WN1", "WN2", "WN3"],
    leigh: ["WN7"],
    "ashton-under-lyne": ["OL6", "OL7"],
    hyde: ["SK14"],
    stalybridge: ["SK15"],
    // West Yorkshire
    bradford: ["BD1", "BD2", "BD3", "BD4"],
    wakefield: ["WF1", "WF2", "WF3"],
    huddersfield: ["HD1", "HD2", "HD3"],
    halifax: ["HX1", "HX2", "HX3"],
    dewsbury: ["WF12", "WF13"],
    batley: ["WF17"],
    keighley: ["BD20", "BD21"],
    pudsey: ["LS28"],
    morley: ["LS27"],
    // Merseyside
    bootle: ["L20", "L30"],
    birkenhead: ["CH41", "CH42"],
    wallasey: ["CH44", "CH45"],
    southport: ["PR8", "PR9"],
    "st-helens": ["WA10", "WA11"],
    widnes: ["WA8"],
    prescot: ["L34", "L35"],
    huyton: ["L36", "L14"],
    // South West
    bath: ["BA1", "BA2"],
    "weston-super-mare": ["BS22", "BS23", "BS24"],
    bridgwater: ["TA6", "TA7"],
    taunton: ["TA1", "TA2"],
    yeovil: ["BA20", "BA21"],
    frome: ["BA11"],
    trowbridge: ["BA14"],
    swindon: ["SN1", "SN2", "SN3", "SN25"],
    cheltenham: ["GL50", "GL51", "GL52"],
    gloucester: ["GL1", "GL2", "GL3", "GL4"],
    // Scotland
    edinburgh: ["EH1", "EH2", "EH3", "EH4", "EH5", "EH6"],
    glasgow: ["G1", "G2", "G3", "G4", "G5", "G11"],
    aberdeen: ["AB10", "AB11", "AB12", "AB15"],
    dundee: ["DD1", "DD2", "DD3", "DD4"],
    // Wales
    cardiff: ["CF10", "CF11", "CF14", "CF15", "CF23", "CF24"],
    swansea: ["SA1", "SA2", "SA3", "SA5"],
    // North East
    "newcastle-upon-tyne": ["NE1", "NE2", "NE3", "NE4", "NE5"],
    // South East
    southampton: ["SO14", "SO15", "SO16", "SO17"],
    portsmouth: ["PO1", "PO2", "PO3", "PO4", "PO5"],
    oxford: ["OX1", "OX2", "OX3", "OX4"],
    cambridge: ["CB1", "CB2", "CB3", "CB4"],
    reading: ["RG1", "RG2", "RG4", "RG5", "RG6"],
    // Other
    sheffield: ["S1", "S2", "S3", "S6", "S7", "S8", "S10"],
    "stoke-on-trent": ["ST1", "ST2", "ST3", "ST4", "ST5", "ST6"],
    hull: ["HU1", "HU2", "HU3", "HU5", "HU6"],
    plymouth: ["PL1", "PL2", "PL3", "PL4"],
    york: ["YO1", "YO10", "YO23", "YO24", "YO30", "YO31"],
  };

  const postcodes = outwardBySlug[loc.slug] || [];
  return postcodes.length > 0
    ? [{ area: `${loc.name} and nearby`, postcodes }]
    : [];
}

function generateExampleMoveRequests(loc: LocationData): { area: string; type: string; detail: string }[] {
  const nearby = loc.nearbyAreas.length > 0 ? loc.nearbyAreas : loc.areas;
  const first = nearby[0] || loc.name;
  const second = nearby[1] || loc.name;
  const third = nearby[2] || loc.name;

  return [
    {
      area: `${loc.name} to ${first}`,
      type: loc.hasStudentAreas ? "Student move" : "Small home move",
      detail: loc.hasStudentAreas
        ? "Boxes, suitcases and small furniture with date and access notes included."
        : "Boxes, small furniture and access details for a local mover to review.",
    },
    {
      area: `${second} to ${loc.name}`,
      type: "Furniture collection",
      detail: "Single-item or multi-item collection with postcode, stairs and parking details supplied.",
    },
    {
      area: `${loc.name} to ${third}`,
      type: loc.businessDistricts?.length ? "Office or storage run" : "Flat move",
      detail: loc.businessDistricts?.length
        ? "Desk, chair, equipment or storage items with timing requirements described upfront."
        : "Flat or apartment move where lifts, floors and loading access matter before quoting.",
    },
  ];
}

function generateCostAnswer(loc: LocationData): string {
  // Provide region-specific pricing context where possible
  if (loc.region === "West Midlands") {
    return `Man and van rates in the West Midlands in 2026 start from £50 per hour, with full-day costs around £350–£500 depending on van size, crew, stairs, parking and access. A single-item furniture collection starts from £50, while a full house move from a 3-bed property could range from £250–£500. Your final quote depends on postcodes, item list, route time, helpers, parking and access — submit your details for a guide price first, then a verified mover reviews the job before quoting.`;
  }
  if (loc.region === "Greater London") {
    return `Man and van rates in London in 2026 start from £55 per hour, with full-day costs around £400–£600. Congestion Charge and ULEZ may apply to central London moves. A single-item collection starts from £55. Submit your details for a guide price first, then a verified mover reviews the job before quoting.`;
  }
  if (loc.region === "East Midlands") {
    return `Man and van rates in the East Midlands in 2026 start from £50 per hour, with full-day costs around £350–£500 depending on van size, crew, stairs, parking and access. A single-item furniture collection starts from £50, while a full house move from a 3-bed property could range from £250–£500. Your final quote depends on postcodes, item list, route time, helpers, parking and access — submit your details for a guide price first, then a verified mover reviews the job before quoting.`;
  }
  return `Man and van rates in the UK in 2026 start from £50 per hour, with full-day costs around £350–£500 depending on van size, crew, stairs, parking and access. Your final quote depends on postcodes, item list, route time, helpers, parking and access — submit your details for a guide price first, then a verified mover reviews the job before quoting.`;
}

function generateFAQ(loc: LocationData): { q: string; a: string }[] {
  const faq: { q: string; a: string }[] = [];

  faq.push({
    q: `Do you cover all areas of ${loc.name}?`,
    a: `Yes. You can submit a move request for ${loc.areas.slice(0, 5).join(", ")} and surrounding areas. A verified mover can review the details and send quote options if they can help.`,
  });

  faq.push({
    q: `How much does a man and van cost in ${loc.name}?`,
    a: generateCostAnswer(loc),
  });

  faq.push({
    q: `Can I find a mover for a same-day move in ${loc.name}?`,
    a: `Same-day moves may be possible in ${loc.name} depending on mover availability. Submit your request and a verified mover can review the details if they have space to help.`,
  });

  faq.push({
    q: `Will multiple movers contact me?`,
    a: `No. That is exactly what makes us different. Your enquiry is offered to one mover at a time. You will not receive a flood of calls or emails from multiple competing companies.`,
  });

  faq.push({
    q: `Is it free to submit a move request?`,
    a: `Yes. It is free to submit your move request. You only pay a booking deposit if you accept a mover quote. The booking deposit is deducted from the mover’s quote, and you pay the remaining balance directly to the mover on moving day.`,
  });

  faq.push({
    q: `How quickly will I be contacted?`,
    a: `After you submit your request, a verified mover can review your anonymised move details and send quote options if they can help. Your contact details are only released after you accept a quote and pay the booking deposit.`,
  });

  if (loc.nearbyAreas.length > 0) {
    const nearby = loc.nearbyAreas.slice(0, 3).join(", ");
    faq.push({
      q: `Do you cover ${nearby}?`,
      a: `Yes. You can submit requests for ${loc.nearbyAreas.slice(0, 5).join(", ")} and nearby areas. Availability depends on verified movers reviewing the move details.`,
    });
  }

  if (loc.hasStudentAreas && loc.studentAreas && loc.studentAreas.length > 0) {
    faq.push({
      q: `Can you help with student moves in ${loc.name}?`,
      a: `Yes. Student moves can be submitted for areas near ${loc.studentAreas.join(" and ")}. A verified mover can review the item list, access and date before quoting.`,
    });
  }

  if (loc.businessDistricts && loc.businessDistricts.length > 0) {
    faq.push({
      q: `Do you handle office relocations in ${loc.name}?`,
      a: `Yes. Office relocation requests can be submitted for ${loc.businessDistricts.join(" and ")}. Include access, parking, equipment and timing details so a verified mover can quote accurately.`,
    });
  }

  faq.push({
    q: `Are approved ${loc.name} movers insured?`,
    a: `Approved movers must provide Goods in Transit and Public Liability insurance before joining the network. Cover can vary by mover, so we recommend checking the quote details before booking.`,
  });

  return faq;
}

function getRegionCities(loc: LocationData): { name: string; slug: string }[] {
  // Only link to nearby region pages that pass the quality guard. This keeps
  // internal equity focused on pages Google is allowed to index. Importing the
  // guard here would create a circular dependency, so mirror its essential
  // threshold with data already available on LocationData.
  return LOCATIONS
    .filter((l) => l.region === loc.region && l.slug !== loc.slug)
    .filter((l) => !isSeoLaunchMode() || isLaunchIndexableLocation(l.slug))
    .filter((l) =>
      Boolean(
        l.intro?.trim().length >= 120 &&
        l.knowledge?.trim().length >= 120 &&
        l.nearbyAreas?.length >= 5 &&
        l.movingConsiderations?.length >= 3 &&
        ((l.majorRoads?.length || 0) + (l.studentAreas?.length || 0) + (l.businessDistricts?.length || 0)) >= 2
      )
    )
    .map((l) => ({
      name: l.name,
      slug: l.slug,
    }));
}

// Top 20 priority locations for coverage signal (Step 2)
const COVERAGE_SIGNAL_SLUGS = new Set([
  'birmingham', 'walsall', 'wolverhampton', 'coventry', 'dudley',
  'solihull', 'west-bromwich', 'nottingham', 'leicester', 'manchester',
  'liverpool', 'leeds', 'bristol', 'sheffield', 'derby',
  'edinburgh', 'glasgow', 'cardiff', 'newcastle-upon-tyne', 'stoke-on-trent',
  // Nationwide expansion — new major cities
  'belfast', 'sunderland', 'middlesbrough', 'brighton', 'milton-keynes',
  'luton', 'bournemouth', 'slough', 'norwich', 'ipswich',
  'peterborough', 'exeter', 'newport', 'inverness', 'stirling',
  'perth', 'paisley', 'doncaster', 'rotherham', 'medway',
]);

// Cross-region nearby links for stronger internal linking (Step 3)
// Key cities link to important cities in other regions, not just same-region
const CROSS_REGION_MAP: Record<string, string[]> = {
  'birmingham': ['walsall', 'wolverhampton', 'coventry', 'dudley', 'solihull', 'west-bromwich', 'nottingham', 'leicester', 'stoke-on-trent'],
  'walsall': ['birmingham', 'wolverhampton', 'dudley', 'west-bromwich', 'coventry', 'stoke-on-trent'],
  'wolverhampton': ['birmingham', 'walsall', 'dudley', 'stoke-on-trent', 'coventry'],
  'coventry': ['birmingham', 'solihull', 'leicester', 'nottingham', 'derby', 'northampton'],
  'dudley': ['birmingham', 'walsall', 'wolverhampton', 'west-bromwich', 'stourbridge'],
  'solihull': ['birmingham', 'coventry', 'leicester', 'stratford', 'redditch'],
  'west-bromwich': ['birmingham', 'walsall', 'wolverhampton', 'dudley', 'wednesbury'],
  'nottingham': ['derby', 'leicester', 'sheffield', 'coventry', 'lincoln'],
  'leicester': ['nottingham', 'coventry', 'birmingham', 'derby', 'northampton'],
  'manchester': ['liverpool', 'leeds', 'sheffield', 'bolton', 'stockport', 'stoke-on-trent'],
  'liverpool': ['manchester', 'chester', 'preston', 'wigan', 'warrington'],
  'leeds': ['manchester', 'sheffield', 'bradford', 'york', 'huddersfield', 'doncaster'],
  'bristol': ['bath', 'cardiff', 'gloucester', 'swindon', 'exeter'],
  'sheffield': ['leeds', 'nottingham', 'manchester', 'doncaster', 'rotherham', 'barnsley'],
  'derby': ['nottingham', 'leicester', 'sheffield', 'birmingham', 'stoke-on-trent'],
  'edinburgh': ['glasgow', 'dundee', 'aberdeen', 'stirling', 'livingston'],
  'glasgow': ['edinburgh', 'stirling', 'paisley', 'dundee', 'east-kilbride'],
  'cardiff': ['bristol', 'swansea', 'newport', 'hereford'],
  'newcastle-upon-tyne': ['sunderland', 'durham', 'middlesbrough', 'gateshead'],
  'stoke-on-trent': ['manchester', 'wolverhampton', 'derby', 'birmingham', 'crewe'],
  // New nationwide cross-region links
  'belfast': ['derry', 'lisburn', 'newry'],
  'sunderland': ['newcastle-upon-tyne', 'middlesbrough', 'gateshead', 'durham'],
  'middlesbrough': ['sunderland', 'newcastle-upon-tyne', 'darlington', 'york'],
  'brighton': ['crawley', 'horsham', 'maidstone', 'medway'],
  'milton-keynes': ['luton', 'northampton', 'oxford', 'cambridge'],
  'luton': ['milton-keynes', 'slough', 'bedford', 'st-albans'],
  'bournemouth': ['southampton', 'exeter', 'poole'],
  'slough': ['reading', 'maidenhead', 'windsor', 'london'],
  'norwich': ['ipswich', 'colchester', 'cambridge', 'peterborough'],
  'ipswich': ['norwich', 'colchester', 'cambridge'],
  'peterborough': ['cambridge', 'milton-keynes', 'norwich', 'northampton'],
  'exeter': ['plymouth', 'taunton', 'torquay', 'bristol'],
  'newport': ['cardiff', 'swansea', 'bristol'],
  'wrexham': ['chester', 'shrewsbury', 'liverpool'],
  'inverness': ['aberdeen', 'perth', 'stirling'],
  'stirling': ['edinburgh', 'glasgow', 'perth', 'falkirk'],
  'perth': ['edinburgh', 'dundee', 'stirling', 'inverness'],
  'paisley': ['glasgow', 'east-kilbride', 'renfrew'],
  'doncaster': ['sheffield', 'rotherham', 'barnsley', 'leeds'],
  'rotherham': ['sheffield', 'doncaster', 'barnsley', 'leeds'],
  'barnsley': ['sheffield', 'rotherham', 'doncaster', 'wakefield'],
};

function getCrossRegionLinks(loc: LocationData): { slug: string; name: string }[] {
  const slugs = CROSS_REGION_MAP[loc.slug];
  if (!slugs) return [];
  return slugs
    .map((s) => {
      const l = getLocationBySlug(s);
      return l ? { slug: s, name: l.name } : null;
    })
    .filter((x): x is { slug: string; name: string } => x !== null);
}

export function getLocationPageData(slug: string): LocationPageData | null {
  const loc = getLocationBySlug(slug);
  if (!loc) return null;

  const pageSlug = `man-and-van-${loc.slug}`;
  const url = `https://www.manandvanclub.co.uk/${pageSlug}`;
  const nearby = loc.nearbyLocations
    .map((s) => {
      const l = getLocationBySlug(s);
      return l ? { slug: s, name: l.name } : null;
    })
    .filter(Boolean) as { slug: string; name: string }[];

  const faq = generateFAQ(loc);

  // Build 3-level breadcrumb for regions with hub pages: Home → Region → City
  // Other regions use 2-level: Home → City
  const breadcrumbItems: Record<string, any>[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.manandvanclub.co.uk",
    },
  ];

  const regionBreadcrumbs: Record<string, { name: string; slug: string }> = {
    "West Midlands": { name: "West Midlands", slug: "man-and-van-west-midlands" },
    "East Midlands": { name: "East Midlands", slug: "man-and-van-east-midlands" },
    "Greater London": { name: "London", slug: "man-and-van-london" },
    "Greater Manchester": { name: "Manchester", slug: "man-and-van-manchester" },
    "West Yorkshire": { name: "West Yorkshire", slug: "man-and-van-leeds" },
    "Merseyside": { name: "Merseyside", slug: "man-and-van-liverpool" },
    "South West": { name: "South West", slug: "man-and-van-bristol" },
    "Scotland": { name: "Scotland", slug: "man-and-van-edinburgh" },
    "Wales": { name: "Wales", slug: "man-and-van-cardiff" },
    "South East": { name: "South East", slug: "man-and-van-oxford" },
    "South Yorkshire": { name: "South Yorkshire", slug: "man-and-van-sheffield" },
    "North East": { name: "North East", slug: "man-and-van-newcastle-upon-tyne" },
    "East of England": { name: "East of England", slug: "man-and-van-cambridge" },
    "East Yorkshire": { name: "East Yorkshire", slug: "man-and-van-hull" },
    "North Yorkshire": { name: "North Yorkshire", slug: "man-and-van-york" },
    "West England": { name: "West England", slug: "man-and-van-stoke-on-trent" },
    "South": { name: "South", slug: "man-and-van-reading" },
    "South West coast": { name: "South West", slug: "man-and-van-plymouth" },
  };

  const regionCrumb = regionBreadcrumbs[loc.region];
  if (regionCrumb) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: regionCrumb.name,
      item: `https://www.manandvanclub.co.uk/${regionCrumb.slug}`,
    });
  }

  breadcrumbItems.push({
    "@type": "ListItem",
    position: breadcrumbItems.length + 1,
    name: loc.name,
    item: url,
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Man and Van ${loc.name} quote request`,
    url,
    provider: {
      "@type": "Organization",
      name: "Man and Van Club",
      email: "support@manandvanclub.co.uk",
      telephone: "01217511269",
    },
    areaServed: {
      "@type": "Place",
      name: loc.name,
      containedInPlace: {
        "@type": "Place",
        name: loc.region,
      },
    },
    description: `Free man and van move request service in ${loc.name}. A verified mover can review anonymised move details and send quote options before the customer decides whether to book.`,
    serviceType: "Man and van quote request",
  };

  const baseData = {
    name: loc.name,
    title: `Man and Van ${loc.name} | Verified Local Movers`,
    description: loc.region === 'Greater London'
      ? `Man and van ${loc.name} from £55/hr. One verified mover quotes. Free to submit, no multiple companies.`
      : `Man and van ${loc.name} from £50/hr. One verified mover quotes. Free to submit, no multiple companies.`,
    badge: `Verified movers in ${loc.name}`,
    intro: generateBusinessModelIntro(loc),
    knowledge: generateBusinessModelKnowledge(loc),
    areas: loc.areas,
    slug: pageSlug,
    faq,
    nearbyLocations: nearby,
    serviceLinks: SERVICE_LINKS,
    localBusinessSchema,
    breadcrumbSchema,
    faqSchema,
    // NEW sections
    areasWeCover: generateAreasWeCover(loc),
    localMovingInfo: generateLocalMovingInfo(loc),
    popularMoves: getPopularMovesForRegion(loc),
    localLandmarks: generateLocalLandmarks(loc),
    trustPoints: TRUST_POINTS,
    verificationChecks: VERIFICATION_CHECKS,
    movingChecklist: MOVING_CHECKLIST,
    regionCities: getRegionCities(loc),
    exampleMoveRequests: generateExampleMoveRequests(loc),
    postcodeCoverage: generatePostcodeCoverage(loc),
    region: loc.region,
    pageType: "location" as const,
    coverageSignal: COVERAGE_SIGNAL_SLUGS.has(loc.slug),
    crossRegionLinks: getCrossRegionLinks(loc),
  };

  // Merge custom content overrides for priority cities (prevents doorway-page penalties)
  const customOverride = customLocationContentOverrides[loc.slug];
  if (customOverride) {
    const merged = { ...baseData, ...customOverride };

    // If FAQ was overridden, rebuild FAQ schema to match the new FAQ items
    if (customOverride.faq) {
      merged.faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: merged.faq.map((item: { q: string; a: string }) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      };
    }

    return merged;
  }

  return baseData;
}

export function getAllLocationPageSlugs(): string[] {
  return LOCATIONS.map((l) => `man-and-van-${l.slug}`);
}
