import { LocationData, getLocationBySlug, LOCATIONS } from "@/constants/locations";
import { customLocationContentOverrides } from "./custom-location-content";
import { getRouteInfo, type RouteInfo } from "./google-maps-routes";
import { isLaunchIndexableLocation, isSeoLaunchMode } from "./seo-quality-guard";
import { ROUTES } from "./route-data";

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
  // Step 4: City-to-city route page links for internal linking
  routeLinks?: { slug: string; cityA: string; cityB: string; distance: string; price: string }[];
}


const SERVICE_LINKS = [
  { title: "House Removals", href: "/house-removals" },
  { title: "Flat Removals", href: "/flat-removals" },
  { title: "Office Removals", href: "/office-removals" },
  { title: "Student Moves", href: "/student-removals" },
  { title: "Furniture Collection", href: "/furniture-delivery-service" },
  { title: "Long Distance Moves", href: "/long-distance-removals" },
  { title: "Same Day Moves", href: "/same-day-man-and-van" },
  { title: "Moving Home", href: "/moving-home" },
  { title: "Help Me Move", href: "/help-me-move" },
  { title: "Cheap Man and Van", href: "/cheap-man-and-van" },
  { title: "Van Hire with Driver", href: "/cheap-van-hire-with-driver" },
  { title: "Cheapest Moving Van", href: "/cheapest-moving-van" },
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
  return `Need a man and van in ${loc.name}? Whether you are moving a few items, a full flat or collecting furniture from ${areas || loc.name}, submit your postcodes, move date, item list and access notes for free. A verified mover reviews your ${loc.name} move before sending a quote — so you see the details before deciding whether to book. From £19/hr self-loading, £34/hr with driver help.`;
}

function generateBusinessModelKnowledge(loc: LocationData): string {
  const roads = loc.majorRoads.slice(0, 3).join(", ");
  const properties = loc.propertyTypes.slice(0, 3).join(", ");
  const considerations = loc.movingConsiderations.slice(0, 3).join("; ");
  return `A good ${loc.name} quote depends on more than mileage. Postcodes, item list, parking, stairs, lifts, access and timing can all affect the work involved. Your request gives a verified mover the details they need to account for ${roads ? `${roads} routes, ` : ""}${properties || "local property types"}${considerations ? ` and local issues such as ${considerations}` : ""} before you decide whether to book. Most ${loc.name} moves fall between 1 and 4 hours — a studio or 1-bed flat move is typically 1–2 hours, while a 2–3 bed house is 3–5 hours. Furniture collections from Marketplace, IKEA or local shops are often under 1 hour. Submit your details for a free guide price first.`;
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
    info += `With student areas like ${loc.studentAreas.slice(0, 2).join(" and ")}, peak moving periods align with academic term dates — June and September are the busiest months. Student moves are usually smaller loads (boxes, suitcases, a mattress and small furniture) and self-loading at £19/hr keeps them affordable. `;
    if (loc.studentAreas.length > 2) {
      info += `Other popular student postcodes include ${loc.studentAreas.slice(2, 4).join(" and ")}. `;
    }
  }

  if (loc.businessDistricts) {
    info += `Business relocations in ${loc.businessDistricts.slice(0, 2).join(" and ")} often need evening or weekend slots to minimise disruption. Office moves typically involve desks, chairs, IT equipment and filing cabinets — include a full inventory so the mover can allocate enough time and van space. `;
  }

  info += `A verified mover can review details such as the ${roads} corridors and local property types, from ${properties}. `;

  if (considerations.length > 0) {
    info += `Common moving considerations in ${loc.name} include ${considerations.slice(0, 3).join("; ")}. These factors can change the time a move takes and the final quote — which is why submitting accurate access notes and item details matters. `;
  }

  info += `Whether you are moving within ${loc.name} or relocating to a neighbouring town, your request stays protected while a mover reviews the details and prepares quote options. `;

  // Add keyword-rich practical detail that competitors miss
  info += `For furniture collections in ${loc.name}, include the seller's full postcode, item dimensions, and whether you need the driver to carry the item upstairs or into a specific room. For flat moves, mention the floor level, whether there is a lift, and any parking restrictions outside the building. For house moves, include driveway access, any narrow hallways or doorways, and whether furniture needs dismantling before the mover arrives. `;

  info += `If you are comparing options, a man and van from £19/hr is typically the cheapest way to move in ${loc.name}. Self-drive van hire might look cheaper on paper at £50-80 per day, but add fuel, insurance and the time spent driving an unfamiliar vehicle, and a man and van with a professional driver works out better value — especially for local moves under 3 hours.`;

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
    // East Midlands — Derbyshire
    chesterfield: ["S40", "S41", "S42", "S43", "S44"],
    glossop: ["SK13"],
    ilkeston: ["DE7"],
    "long-eaton": ["NG10"],
    belper: ["DE56"],
    swadlincote: ["DE11", "DE12"],
    buxton: ["SK17"],
    ripley: ["DE5"],
    heanor: ["DE75"],
    alfreton: ["DE55"],
    matlock: ["DE4"],
    // East Midlands — Leicestershire
    loughborough: ["LE11", "LE12"],
    coalville: ["LE67"],
    hinckley: ["LE10"],
    "melton-mowbray": ["LE13", "LE14"],
    "market-harborough": ["LE16"],
    "ashby-de-la-zouch": ["LE65"],
    lutterworth: ["LE17"],
    // East Midlands — Lincolnshire
    grantham: ["NG31", "NG32", "NG33"],
    boston: ["PE20", "PE21", "PE22"],
    spalding: ["PE11", "PE12"],
    stamford: ["PE9"],
    gainsborough: ["DN21"],
    sleaford: ["NG34"],
    skegness: ["PE24", "PE25"],
    louth: ["LN11"],
    // East Midlands — Northamptonshire
    kettering: ["NN14", "NN15", "NN16"],
    corby: ["NN17", "NN18"],
    wellingborough: ["NN8", "NN9"],
    rushden: ["NN10"],
    daventry: ["NN11"],
    // East Midlands — Nottinghamshire
    mansfield: ["NG18", "NG19", "NG20"],
    "newark-on-trent": ["NG22", "NG23", "NG24"],
    worksop: ["S80", "S81"],
    "sutton-in-ashfield": ["NG17"],
    retford: ["DN22"],
    "kirkby-in-ashfield": ["NG17"],
    // East Midlands — Rutland
    oakham: ["LE15"],
    // Other
    sheffield: ["S1", "S2", "S3", "S6", "S7", "S8", "S10"],
    "stoke-on-trent": ["ST1", "ST2", "ST3", "ST4", "ST5", "ST6"],
    hull: ["HU1", "HU2", "HU3", "HU5", "HU6"],
    plymouth: ["PL1", "PL2", "PL3", "PL4"],
    york: ["YO1", "YO10", "YO23", "YO24", "YO30", "YO31"],
    // West Midlands expansion
    "burton-upon-trent": ['DE13', 'DE14', 'DE15'],
    // Greater Manchester expansion
    "warrington": ['WA1', 'WA2', 'WA3', 'WA4', 'WA5'],
    "sale": ['M33'],
    "prestwich": ['M25'],
    "middleton": ['M24'],
    "eccles": ['M30'],
    "swinton": ['M27'],
    "walkden": ['M28'],
    "failsworth": ['M35'],
    "denton": ['M34'],
    "droylsden": ['M43'],
    "farnworth": ['BL4', 'BL3'],
    "horwich": ['BL6'],
    "westhoughton": ['BL5'],
    "radcliffe": ['BL9'],
    "heywood": ['OL10'],
    "ashton-in-makerfield": ['WN4'],
    "cheadle": ['SK8'],
    // Merseyside + Lancashire expansion
    "ellesmere-port": ['CH65', 'CH66'],
    "bebington": ['CH62', 'CH63'],
    "preston": ['PR1', 'PR2', 'PR3', 'PR5'],
    "blackpool": ['FY1', 'FY2', 'FY3', 'FY4'],
    "blackburn": ['BB1', 'BB2', 'BB3'],
    "burnley": ['BB10', 'BB11', 'BB12'],
    "lytham-st-annes": ['FY8'],
    "chorley": ['PR6', 'PR7'],
    "skelmersdale": ['WN8'],
    "ormskirk": ['L39', 'L40'],
    // West Yorkshire expansion
    "brighouse": ['HD6', 'HD2'],
    "shipley": ['BD17', 'BD18'],
    "bingley": ['BD16'],
    "cleckheaton": ['BD19'],
    "ossett": ['WF5'],
    "ilkley": ['LS29'],
    // South Yorkshire + North East
    "mexborough": ['S64'],
    "washington": ['NE37', 'NE38'],
    "south-shields": ['NE33', 'NE34'],
    "north-shields": ['NE29', 'NE30'],
    "jarrow": ['NE32'],
    "gosforth": ['NE3'],
    // East Yorkshire / North Yorkshire
    "harrogate": ['HG1', 'HG2', 'HG3'],
    "scarborough": ['YO11', 'YO12'],
    "bridlington": ['YO15', 'YO16'],
    "beverley": ['HU17'],
    "selby": ['YO8'],
    "whitby": ['YO21', 'YO22'],
    "malton": ['YO17'],
    // South East expansion
    "guildford": ['GU1', 'GU2', 'GU3', 'GU4'],
    "woking": ['GU21', 'GU22', 'GU23'],
    "watford": ['WD17', 'WD18', 'WD19', 'WD24', 'WD25'],
    "high-wycombe": ['HP11', 'HP12', 'HP13'],
    "hemel-hempstead": ['HP1', 'HP2', 'HP3'],
    "stevenage": ['SG1', 'SG2'],
    "st-albans": ['AL1', 'AL2', 'AL3'],
    "eastbourne": ['BN20', 'BN21', 'BN22', 'BN23'],
    "hastings": ['TN34', 'TN35', 'TN37', 'TN38'],
    "chatham": ['ME4', 'ME5'],
    "maidenhead": ['SL6'],
    "bracknell": ['RG12', 'RG42'],
    "aylesbury": ['HP19', 'HP20', 'HP21', 'HP22'],
    "tonbridge": ['TN9', 'TN10', 'TN11'],
    "tunbridge-wells": ['TN1', 'TN2', 'TN3', 'TN4'],
    "farnborough": ['GU14', 'GU15'],
    "aldershot": ['GU11', 'GU12'],
    "hove": ['BN3', 'BN41', 'BN42'],
    "burgess-hill": ['RH15', 'RH16'],
    // East of England + South West
    "bedford": ['MK40', 'MK41', 'MK42', 'MK43', 'MK44'],
    "chelmsford": ['CM1', 'CM2', 'CM3'],
    "southend-on-sea": ['SS0', 'SS1', 'SS2', 'SS3'],
    "harlow": ['CM17', 'CM18', 'CM19', 'CM20'],
    "great-yarmouth": ['NR30', 'NR31'],
    "kings-lynn": ['PE30', 'PE31', 'PE32', 'PE33'],
    "lowestoft": ['NR32', 'NR33'],
    "clacton-on-sea": ['CO15', 'CO16'],
    "felixstowe": ['IP11'],
    "brentwood": ['CM13', 'CM14', 'CM15'],
    "dunstable": ['LU5', 'LU6'],
    "leighton-buzzard": ['LU7'],
    "ely": ['CB6', 'CB7'],
    "thetford": ['IP24', 'IP25'],
    "bishops-stortford": ['CM22', 'CM23'],
    "paignton": ['TQ3', 'TQ4'],
    "brixham": ['TQ5'],
    "newquay": ['TR7'],
    "falmouth": ['TR10', 'TR11'],
    "barnstaple": ['EX31', 'EX32'],

    // Phase 11: Scotland expansion
    "dunfermline": ['KY11', 'KY12'],
    "kirkcaldy": ['KY1', 'KY2'],
    "hamilton": ['ML3'],
    "ayr": ['KA7', 'KA8'],
    "cumbernauld": ['G67', 'G68'],
    "coatbridge": ['ML5'],
    "airdrie": ['ML6'],
    "motherwell": ['ML1'],
    "wishaw": ['ML2'],
    "greenock": ['PA15', 'PA16'],
    "elgin": ['IV30', 'IV31'],
    "arbroath": ['DD11'],
    // Phase 12: Wales expansion
    "barry": ['CF62', 'CF63'],
    "bridgend": ['CF31', 'CF32', 'CF35'],
    "merthyr-tydfil": ['CF47', 'CF48'],
    "neath": ['SA10', 'SA11'],
    "port-talbot": ['SA12', 'SA13'],
    "caerphilly": ['CF83'],
    "pontypridd": ['CF37', 'CF38'],
    "llandudno": ['LL30', 'LL31'],
    // Phase 13: Northern Ireland expansion
    "carrickfergus": ['BT38'],
    "coleraine": ['BT51', 'BT52'],
    "armagh": ['BT60', 'BT61'],
    "omagh": ['BT78', 'BT79'],
    "enniskillen": ['BT74'],
    "lurgan": ['BT66', 'BT67'],

    // Batch 2 expansion
    "chapeltown": ['S35'],
    "penistone": ['S36'],
    "wath-upon-dearne": ['S63'],
    "hertford": ['SG13', 'SG14'],
    "hitchin": ['SG4', 'SG5'],
    "welwyn-garden-city": ['AL7', 'AL8'],
    "potters-bar": ['EN6'],
    "dover": ['CT15', 'CT16', 'CT17'],
    "ashford": ['TN23', 'TN24', 'TN25'],
    "canterbury": ['CT1', 'CT2'],
    "folkestone": ['CT18', 'CT19', 'CT20'],
    "lewes": ['BN7'],
    "bexhill": ['TN39', 'TN40'],
    "worthing": ['BN11', 'BN12', 'BN13', 'BN14'],
    "chichester": ['PO19'],
    "reigate": ['RH2'],
    "epsom": ['KT17', 'KT18', 'KT19'],
    "walton-on-thames": ['KT12'],
    "windsor": ['SL4'],
    "newbury": ['RG14', 'RG20'],
    "beaconsfield": ['HP9'],
    "winchester": ['SO22', 'SO23'],
    "basingstoke": ['RG21', 'RG22', 'RG23', 'RG24'],
    "andover": ['SP10', 'SP11'],
    "goole": ['DN14'],
    "hedon": ['HU12'],
    "ripon": ['HG4'],
    "northallerton": ['DL6', 'DL7'],
    "lancaster": ['LA1', 'LA2', 'LA3'],
    "lytham": ['FY8'],

    // Batch 3: Priority city suburbs
    "great-barr": ['B42', 'B43', 'B44'],
    "perry-barr": ['B20', 'B42'],
    "sutton-coldfield": ['B72', 'B73', 'B74', 'B75', 'B76'],
    "caversham": ['RG4'],
    "bletchley": ['MK1', 'MK2', 'MK3'],
    "eastleigh": ['SO50', 'SO53'],
    "gosport": ['PO12', 'PO13'],
    "poole": ['BH12', 'BH13', 'BH14', 'BH15'],
    "leyland": ['PR25', 'PR26'],
    "cleveleys": ['FY5'],
    "diss": ['IP21', 'IP22'],
    "woodbridge": ['IP12', 'IP13'],
    "haxby": ['YO32'],
    "stockton-on-tees": ['TS16', 'TS17', 'TS18', 'TS19', 'TS20'],
    "willerby": ['HU10', 'HU11'],

    // ─── Nationwide Expansion — 45 new towns/cities postcodes ───
    "amersham": ['HP6', 'HP7'],
    "bangor-ni": ['BT19', 'BT20'],
    "bedworth": ['CV12'],
    "caernarfon": ['LL54', 'LL55'],
    "cottingham": ['HU16'],
    "dorchester": ['DT1', 'DT2'],
    "dorking": ['RH4', 'RH5'],
    "droitwich": ['WR9'],
    "dungannon": ['BT71'],
    "fleetwood": ['FY7'],
    "formby": ['L37'],
    "galashiels": ['TD1'],
    "gillingham": ['ME7', 'ME8'],
    "glastonbury": ['BA6'],
    "gravesend": ['DA11', 'DA12'],
    "haverfordwest": ['SA61', 'SA62'],
    "hawick": ['TD9'],
    "haywards-heath": ['RH16', 'RH17'],
    "hereford": ['HR1', 'HR2'],
    "hessle": ['HU13'],
    "hexham": ['NE46', 'NE47'],
    "kidderminster": ['DY10', 'DY11'],
    "kilmarnock": ['KA1', 'KA2'],
    "kirkby": ['L32', 'L33'],
    "knaresborough": ['HG5'],
    "leamington-spa": ['CV31', 'CV32', 'CV33'],
    "leatherhead": ['KT22', 'KT23'],
    "malvern": ['WR14', 'WR15'],
    "morecambe": ['LA3', 'LA4', 'LA5'],
    "newtownards": ['BT23', 'BT24'],
    "penarth": ['CF64'],
    "porthmadog": ['LL49'],
    "redditch": ['B97', 'B98'],
    "salisbury": ['SP1', 'SP2'],
    "shrewsbury": ['SY1', 'SY2', 'SY3'],
    "stratford-upon-avon": ['CV37'],
    "telford": ['TF1', 'TF2', 'TF3', 'TF4', 'TF5'],
    "tenby": ['SA70'],
    "warwick": ['CV34', 'CV35'],
    "wells": ['BA5'],
    "wetherby": ['LS22', 'LS23'],
    "weymouth": ['DT3', 'DT4'],
    "worcester": ['WR1', 'WR2', 'WR3', 'WR4', 'WR5'],

    // ─── Deep Coverage — 22 smaller towns/districts postcodes ───
    "sandwell": ['B70', 'B71', 'B66', 'B67', 'B68', 'B69'],
    "kenilworth": ['CV8'],
    "llandaff": ['CF5'],
    "cardiff-bay": ['CF10', 'CF11'],
    "whickham": ['NE16'],
    "guiseley": ['LS19', 'LS20'],
    "teignmouth": ['TQ14'],
    "bristol-clifton": ['BS8'],
    "clevedon": ['BS21'],
    "portishead": ['BS20'],
    "bexleyheath": ['DA6', 'DA7'],
    "dartford": ['DA1', 'DA2'],
    "sevenoaks": ['TN13', 'TN14', 'TN15'],
    "sidcup": ['DA14', 'DA15'],
    "maldon": ['CM9'],
    "whitefield": ['M45'],
    "timperley": ['WA14', 'WA15'],
    "poulton-le-fylde": ['FY6'],
    "st-andrews": ['KY16'],
    "berkhamsted": ['HP4'],
    "menai-bridge": ['LL59'],
    "devonport": ['PL1', 'PL2'],

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
    return `Man and van rates in the West Midlands in 2026 start from £19 per hour, with full-day costs around £350–£500 depending on van size, crew, stairs, parking and access. A single-item furniture collection starts from £19, while a full house move from a 3-bed property could range from £250–£500. Your final quote depends on postcodes, item list, route time, helpers, parking and access — submit your details for a guide price first, then a verified mover reviews the job before quoting.`;
  }
  if (loc.region === "Greater London") {
    return `Man and van rates in London in 2026 start from £55 per hour, with full-day costs around £400–£600. Congestion Charge and ULEZ may apply to central London moves. A single-item collection starts from £55. Submit your details for a guide price first, then a verified mover reviews the job before quoting.`;
  }
  if (loc.region === "East Midlands") {
    return `Man and van rates in the East Midlands in 2026 start from £19 per hour, with full-day costs around £350–£500 depending on van size, crew, stairs, parking and access. A single-item furniture collection starts from £19, while a full house move from a 3-bed property could range from £250–£500. Your final quote depends on postcodes, item list, route time, helpers, parking and access — submit your details for a guide price first, then a verified mover reviews the job before quoting.`;
  }
  return `Man and van rates in the UK in 2026 start from £19 per hour, with full-day costs around £350–£500 depending on van size, crew, stairs, parking and access. Your final quote depends on postcodes, item list, route time, helpers, parking and access — submit your details for a guide price first, then a verified mover reviews the job before quoting.`;
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

  // Keyword-rich FAQs — answer real search queries people type before finding a mover

  faq.push({
    q: `What is the difference between a man and van and a removal company in ${loc.name}?`,
    a: `A man and van is usually one driver with a Transit or Luton van, ideal for smaller moves, single-item collections, student moves and flat relocations. A removal company sends a larger team with a lorry, packing materials and a full packing service — which costs significantly more. Most ${loc.name} moves do not need a full removal company. A man and van from £19/hr can handle flats, terraced houses and furniture deliveries for a fraction of the cost.`,
  });

  faq.push({
    q: `Can I hire a van with a driver in ${loc.name}?`,
    a: `Yes. Every booking includes a van and a professional driver — you do not need to drive anything yourself. The driver brings the van, blankets, straps and equipment to your collection address. You choose self-loading at £19/hr (you load, driver transports) or driver-helps at £34/hr (driver assists with carrying). No driving licence needed, no deposit, no self-drive hire paperwork.`,
  });

  faq.push({
    q: `Can you collect furniture from Marketplace or eBay in ${loc.name}?`,
    a: `Yes. Furniture collection from Facebook Marketplace, eBay, Gumtree, IKEA, B&Q, Argos and charity shops is one of the most common jobs. Submit the seller's postcode, your delivery postcode and the item details. A verified mover collects and delivers — you do not need your own transport or a favour from a friend with a van.`,
  });

  faq.push({
    q: `How far in advance should I book a man and van in ${loc.name}?`,
    a: `Book 3–7 days ahead if possible. End-of-month and weekends are busiest, especially the last Friday of the month when tenancies end. If you are moving on a completion day, book at least a week ahead. Same-day moves may be possible depending on mover availability — submit your request and a mover will check their schedule.`,
  });

  faq.push({
    q: `What information does the mover need for a ${loc.name} quote?`,
    a: `Your collection and delivery postcodes, a full item list (number of boxes, furniture pieces, white goods), whether you need the driver to help load and unload, access details (stairs, lifts, parking restrictions, narrow doorways), and your preferred moving date. The more detail you provide, the more accurate the quote. Vague requests lead to estimates; detailed requests lead to firm quotes.`,
  });

  faq.push({
    q: `Can I move on a Sunday or bank holiday in ${loc.name}?`,
    a: `Yes. The service operates 24 hours a day, 7 days a week, including bank holidays. Sunday moves can sometimes be easier because parking restrictions are often relaxed and roads are quieter. Standard rates apply — there is no weekend or bank holiday surcharge.`,
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
  'solihull', 'west-bromwich', 'smethwick', 'nuneaton', 'nottingham', 'leicester', 'manchester',
  'liverpool', 'leeds', 'bristol', 'sheffield', 'derby',
  'edinburgh', 'glasgow', 'cardiff', 'newcastle-upon-tyne', 'stoke-on-trent',
  // Nationwide expansion — new major cities
  'belfast', 'sunderland', 'middlesbrough', 'brighton', 'milton-keynes',
  'luton', 'bournemouth', 'slough', 'norwich', 'ipswich',
  'peterborough', 'exeter', 'newport', 'inverness', 'stirling',
  'perth', 'paisley', 'doncaster', 'rotherham', 'medway',
  // East Midlands — expanded coverage
  'chesterfield', 'loughborough', 'mansfield', 'grantham', 'boston',
  'kettering', 'corby', 'gainsborough', 'oakham', 'sleaford',
  'spalding', 'stamford', 'skegness', 'worksop', 'newark-on-trent',
  'wellingborough', 'rushden', 'daventry', 'hinckley', 'melton-mowbray',
  'market-harborough', 'coalville', 'ashby-de-la-zouch', 'ilkeston',
  'belper', 'ripley', 'matlock', 'swadlincote', 'buxton',
  'heanor', 'alfreton', 'long-eaton', 'glossop', 'louth',
  'lutterworth', 'sutton-in-ashfield', 'retford', 'kirkby-in-ashfield',
  // West Midlands expansion
  'burton-upon-trent',
  // Greater Manchester expansion
  'warrington', 'sale', 'prestwich', 'middleton', 'eccles', 'swinton',
  'walkden', 'failsworth', 'denton', 'droylsden', 'farnworth', 'horwich',
  'westhoughton', 'radcliffe', 'heywood', 'ashton-in-makerfield', 'cheadle',
  // Merseyside + Lancashire expansion
  'preston', 'blackpool', 'blackburn', 'burnley', 'lytham-st-annes',
  'chorley', 'skelmersdale', 'ormskirk', 'ellesmere-port', 'bebington',
  'dunfermline',
  'kirkcaldy',
  'hamilton',
  'ayr',
  'cumbernauld',
  'coatbridge',
  'airdrie',
  'motherwell',
  'wishaw',
  'greenock',
  'elgin',
  'arbroath',
  'barry',
  'bridgend',
  'merthyr-tydfil',
  'neath',
  'port-talbot',
  'caerphilly',
  'pontypridd',
  'llandudno',
  'carrickfergus',
  'coleraine',
  'armagh',
  'omagh',
  'enniskillen',
  'lurgan',
  'chapeltown',
  'penistone',
  'wath-upon-dearne',
  'hertford',
  'hitchin',
  'welwyn-garden-city',
  'potters-bar',
  'dover',
  'ashford',
  'canterbury',
  'folkestone',
  'lewes',
  'bexhill',
  'worthing',
  'chichester',
  'reigate',
  'epsom',
  'walton-on-thames',
  'windsor',
  'newbury',
  'beaconsfield',
  'winchester',
  'basingstoke',
  'andover',
  'goole',
  'hedon',
  'ripon',
  'northallerton',
  'lancaster',
  'lytham',
  'great-barr',
  'perry-barr',
  'sutton-coldfield',
  'caversham',
  'bletchley',
  'eastleigh',
  'gosport',
  'poole',
  'leyland',
  'cleveleys',
  'diss',
  'woodbridge',
  'haxby',
  'stockton-on-tees',
  'willerby',

  // ─── Nationwide Expansion — 45 new towns/cities ───
  'amersham', 'bangor-ni', 'bedworth', 'caernarfon',
  'cottingham', 'dorchester', 'dorking', 'droitwich', 'dungannon',
  'fleetwood', 'formby', 'galashiels', 'gillingham', 'glastonbury',
  'gravesend', 'haverfordwest', 'hawick', 'haywards-heath', 'hereford',
  'hessle', 'hexham', 'kidderminster', 'kilmarnock', 'kirkby',
  'knaresborough', 'leamington-spa', 'leatherhead', 'malvern', 'morecambe',
  'newtownards', 'penarth', 'porthmadog', 'redditch', 'salisbury',
  'shrewsbury', 'stratford-upon-avon', 'telford', 'tenby',
  'warwick', 'wells', 'wetherby', 'weymouth', 'worcester',

  // ─── Deep Coverage — 22 smaller towns/districts ───
  'sandwell', 'kenilworth', 'llandaff', 'cardiff-bay', 'whickham',
  'guiseley', 'teignmouth', 'bristol-clifton', 'clevedon', 'portishead',
  'bexleyheath', 'dartford', 'sevenoaks', 'sidcup', 'maldon',
  'whitefield', 'timperley', 'poulton-le-fylde', 'st-andrews', 'berkhamsted',
  'menai-bridge', 'devonport',
]);

// Cross-region nearby links for stronger internal linking (Step 3)
// Key cities link to important cities in other regions, not just same-region
const CROSS_REGION_MAP: Record<string, string[]> = {
  'birmingham': ['walsall', 'wolverhampton', 'coventry', 'dudley', 'solihull', 'west-bromwich', 'smethwick', 'nottingham', 'leicester', 'stoke-on-trent'],
  'walsall': ['birmingham', 'wolverhampton', 'dudley', 'west-bromwich', 'smethwick', 'coventry', 'stoke-on-trent'],
  'wolverhampton': ['birmingham', 'walsall', 'dudley', 'stoke-on-trent', 'coventry'],
  'coventry': ['birmingham', 'solihull', 'leicester', 'nottingham', 'derby', 'northampton'],
  'dudley': ['birmingham', 'walsall', 'wolverhampton', 'west-bromwich', 'smethwick', 'stourbridge'],
  'solihull': ['birmingham', 'coventry', 'leicester', 'stratford', 'redditch'],
  'west-bromwich': ['birmingham', 'walsall', 'wolverhampton', 'dudley', 'smethwick', 'wednesbury'],
  'smethwick': ['birmingham', 'west-bromwich', 'walsall', 'oldbury', 'dudley'],
  'nottingham': ['derby', 'leicester', 'sheffield', 'coventry', 'lincoln'],
  'leicester': ['nottingham', 'coventry', 'birmingham', 'derby', 'northampton'],
  'manchester': ['liverpool', 'leeds', 'sheffield', 'bolton', 'stockport', 'stoke-on-trent'],
  'liverpool': ['manchester', 'chester', 'preston', 'wigan', 'warrington'],
  'leeds': ['manchester', 'sheffield', 'bradford', 'york', 'huddersfield', 'doncaster'],
  'bristol': ['bath', 'cardiff', 'gloucester', 'swindon', 'exeter'],
  'sheffield': ['leeds', 'nottingham', 'manchester', 'doncaster', 'rotherham', 'barnsley'],
  'derby': ['nottingham', 'leicester', 'sheffield', 'birmingham', 'stoke-on-trent'],
  'nuneaton': ['coventry', 'rugby', 'birmingham', 'tamworth'],
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
  "chesterfield": ["sheffield", "derby", "nottingham", "mansfield"],
  "loughborough": ["nottingham", "leicester", "derby"],
  "mansfield": ["nottingham", "chesterfield", "derby"],
  "grantham": ["nottingham", "lincoln", "leicester"],
  "boston": ["lincoln", "spalding", "sleaford"],
  "kettering": ["northampton", "corby", "wellingborough"],
  "corby": ["northampton", "kettering", "peterborough"],
  "gainsborough": ["lincoln", "doncaster"],
  "oakham": ["stamford", "corby", "nottingham"],
  // Greater Manchester expansion
  "warrington": ["manchester", "liverpool", "wigan", "warrington"],
  "sale": ["manchester", "altrincham", "stockport"],
  "prestwich": ["manchester", "bury", "salford"],
  "middleton": ["manchester", "rochdale", "oldham"],
  "eccles": ["manchester", "salford", "wigan"],
  "swinton": ["manchester", "salford", "bolton"],
  "walkden": ["manchester", "salford", "bolton"],
  "failsworth": ["manchester", "oldham"],
  "denton": ["manchester", "hyde", "stockport"],
  "droylsden": ["manchester", "ashton-under-lyne"],
  "farnworth": ["manchester", "bolton", "salford"],
  "horwich": ["manchester", "bolton", "wigan"],
  "westhoughton": ["manchester", "bolton", "wigan"],
  "radcliffe": ["manchester", "bury", "bolton"],
  "heywood": ["manchester", "rochdale", "bury"],
  "ashton-in-makerfield": ["manchester", "wigan", "st-helens"],
  "cheadle": ["manchester", "stockport", "altrincham"],
  "burton-upon-trent": ["derby", "lichfield", "tamworth"],
  // Merseyside + Lancashire expansion
  "preston": ["blackpool", "blackburn", "liverpool", "manchester", "bolton"],
  "blackpool": ["preston", "lytham-st-annes", "lancaster"],
  "blackburn": ["preston", "burnley", "bolton", "manchester"],
  "burnley": ["blackburn", "skipton", "manchester"],
  "lytham-st-annes": ["blackpool", "preston"],
  "chorley": ["preston", "blackburn", "bolton", "wigan"],
  "skelmersdale": ["liverpool", "wigan", "preston"],
  "ormskirk": ["liverpool", "preston", "southport"],
  "ellesmere-port": ["liverpool", "chester", "birkenhead"],
  "bebington": ["liverpool", "birkenhead", "chester"],
  // West Yorkshire expansion
  "brighouse": ["halifax", "huddersfield", "bradford", "wakefield"],
  "shipley": ["bradford", "bingley", "keighley", "leeds"],
  "bingley": ["shipley", "keighley", "bradford", "ilkley"],
  "cleckheaton": ["batley", "dewsbury", "bradford", "huddersfield"],
  "ossett": ["wakefield", "dewsbury", "batley", "huddersfield"],
  "ilkley": ["bradford", "bingley", "keighley", "harrogate"],
  // South Yorkshire + North East
  "mexborough": ["doncaster", "rotherham", "barnsley", "sheffield"],
  "washington": ["sunderland", "newcastle-upon-tyne", "gateshead", "durham"],
  "south-shields": ["newcastle-upon-tyne", "sunderland", "jarrow"],
  "north-shields": ["newcastle-upon-tyne", "south-shields", "whitley-bay"],
  "jarrow": ["south-shields", "newcastle-upon-tyne", "sunderland"],
  "gosforth": ["newcastle-upon-tyne", "sunderland", "gateshead"],
  // East Yorkshire / North Yorkshire
  "harrogate": ["york", "leeds", "bradford", "ripon"],
  "scarborough": ["york", "whitby", "bridlington"],
  "bridlington": ["hull", "scarborough", "beverley"],
  "beverley": ["hull", "bridlington", "york"],
  "selby": ["york", "leeds", "hull", "doncaster"],
  "whitby": ["scarborough", "middlesbrough"],
  "malton": ["york", "scarborough", "harrogate"],
  // South East expansion
  "guildford": ["woking", "farnham", "aldershot", "reading"],
  "woking": ["guildford", "aldershot", "farnborough"],
  "watford": ["st-albans", "hemel-hempstead", "london"],
  "high-wycombe": ["maidenhead", "reading", "oxford"],
  "hemel-hempstead": ["watford", "st-albans", "luton"],
  "stevenage": ["st-albans", "watford", "cambridge"],
  "st-albans": ["watford", "hemel-hempstead", "london"],
  "eastbourne": ["hastings", "brighton", "lewes"],
  "hastings": ["eastbourne", "bexhill"],
  "chatham": ["gillingham", "rochester", "maidstone"],
  "maidenhead": ["windsor", "slough", "reading", "bracknell"],
  "bracknell": ["reading", "wokingham", "maidenhead"],
  "aylesbury": ["high-wycombe", "oxford", "leighton-buzzard"],
  "tonbridge": ["tunbridge-wells", "sevenoaks", "maidstone"],
  "tunbridge-wells": ["tonbridge", "sevenoaks"],
  "farnborough": ["aldershot", "woking", "guildford"],
  "aldershot": ["farnborough", "farnham", "woking"],
  "hove": ["brighton", "shoreham", "worthing"],
  "burgess-hill": ["brighton", "horsham", "crawley"],
  // East of England + South West
  "bedford": ["milton-keynes", "luton", "northampton", "cambridge"],
  "chelmsford": ["southend-on-sea", "basildon", "brentwood", "colchester"],
  "southend-on-sea": ["chelmsford", "basildon", "rayleigh"],
  "harlow": ["bishops-stortford", "stevenage", "chelmsford"],
  "great-yarmouth": ["norwich", "lowestoft"],
  "kings-lynn": ["norwich", "peterborough", "wisbech"],
  "lowestoft": ["great-yarmouth", "norwich", "beccles"],
  "clacton-on-sea": ["colchester", "chelmsford"],
  "felixstowe": ["ipswich", "woodbridge"],
  "brentwood": ["chelmsford", "romford", "harlow"],
  "dunstable": ["luton", "leighton-buzzard", "aylesbury"],
  "leighton-buzzard": ["milton-keynes", "aylesbury", "dunstable"],
  "ely": ["cambridge", "march", "wisbech"],
  "thetford": ["norwich", "kings-lynn", "bury-st-edmunds"],
  "bishops-stortford": ["harlow", "stevenage", "chelmsford"],
  "paignton": ["torquay", "brixham", "exeter", "totnes"],
  "brixham": ["paignton", "torquay", "totnes", "dartmouth"],
  "newquay": ["truro", "st-ives", "redruth"],
  "falmouth": ["truro", "redruth", "helston"],
  "barnstaple": ["exeter", "tiverton", "bideford"],

  'dunfermline': ['edinburgh', 'stirling', 'kirkcaldy', 'falkirk'],
  'kirkcaldy': ['dunfermline', 'edinburgh', 'dundee', 'st-andrews'],
  'hamilton': ['glasgow', 'motherwell', 'east-kilbride', 'coatbridge'],
  'ayr': ['glasgow', 'kilmarnock', 'paisley'],
  'cumbernauld': ['glasgow', 'falkirk', 'stirling', 'coatbridge'],
  'coatbridge': ['glasgow', 'airdrie', 'motherwell', 'hamilton'],
  'airdrie': ['coatbridge', 'glasgow', 'cumbernauld', 'motherwell'],
  'motherwell': ['hamilton', 'glasgow', 'coatbridge', 'airdrie'],
  'wishaw': ['motherwell', 'hamilton', 'coatbridge', 'airdrie'],
  'greenock': ['paisley', 'glasgow', 'dumbarton'],
  'elgin': ['inverness', 'aberdeen'],
  'arbroath': ['dundee', 'perth', 'montrose'],
  'barry': ['cardiff', 'penarth', 'bridgend'],
  'bridgend': ['cardiff', 'swansea', 'barry', 'neath'],
  "merthyr-tydfil": ['cardiff', 'brecon', 'pontypridd', 'caerphilly'],
  'neath': ['swansea', 'port-talbot', 'bridgend'],
  "port-talbot": ['neath', 'swansea', 'bridgend'],
  'caerphilly': ['cardiff', 'pontypridd', 'merthyr-tydfil', 'newport'],
  'pontypridd': ['cardiff', 'caerphilly', 'merthyr-tydfil', 'swansea'],
  'llandudno': ['bangor', 'rhyl', 'aberystwyth'],
  'carrickfergus': ['belfast', 'larne', 'newtownabbey'],
  'coleraine': ['belfast', 'derry', 'ballymoney'],
  'armagh': ['newry', 'portadown', 'belfast'],
  'omagh': ['derry', 'enniskillen', 'belfast'],
  'enniskillen': ['belfast', 'omagh', 'sligo'],
  'lurgan': ['portadown', 'craigavon', 'belfast', 'armagh'],

  'chapeltown': ['sheffield', 'rotherham', 'barnsley', 'penistone'],
  'penistone': ['barnsley', 'sheffield', 'huddersfield'],
  "wath-upon-dearne": ['rotherham', 'barnsley', 'doncaster', 'mexborough'],
  'hertford': ['stevenage', 'st-albans', 'enfield', 'chelmsford'],
  'hitchin': ['stevenage', 'luton', 'st-albans', 'bedford'],
  "welwyn-garden-city": ['stevenage', 'st-albans', 'watford'],
  "potters-bar": ['enfield', 'watford', 'st-albans'],
  'dover': ['ashford', 'maidstone', 'canterbury'],
  'ashford': ['maidstone', 'canterbury', 'dover'],
  'canterbury': ['ashford', 'maidstone', 'dover'],
  'folkestone': ['ashford', 'dover', 'maidstone'],
  'lewes': ['brighton', 'eastbourne', 'hove'],
  'bexhill': ['eastbourne', 'hastings', 'brighton'],
  'worthing': ['brighton', 'hove', 'horsham'],
  'chichester': ['portsmouth', 'worthing', 'horsham', 'southampton'],
  'reigate': ['guildford', 'croydon', 'crawley', 'kingston'],
  'epsom': ['kingston', 'croydon', 'guildford', 'woking'],
  "walton-on-thames": ['kingston', 'woking', 'guildford'],
  'windsor': ['slough', 'maidenhead', 'reading'],
  'newbury': ['reading', 'basingstoke', 'swindon', 'oxford'],
  'beaconsfield': ['high-wycombe', 'slough', 'amersham'],
  'winchester': ['southampton', 'basingstoke', 'farnborough', 'reading'],
  'basingstoke': ['reading', 'winchester', 'farnborough', 'newbury'],
  'andover': ['basingstoke', 'winchester', 'newbury'],
  'goole': ['hull', 'doncaster', 'scunthorpe', 'selby'],
  'hedon': ['hull', 'beverley', 'bridlington'],
  'ripon': ['harrogate', 'york', 'darlington'],
  'northallerton': ['darlington', 'york', 'harrogate', 'ripon'],
  'lancaster': ['preston', 'blackpool', 'kendal'],
  'lytham': ['blackpool', 'preston', 'chorley'],

  "great-barr": ['birmingham', 'walsall', 'west-bromwich', 'smethwick'],
  "perry-barr": ['birmingham', 'west-bromwich', 'walsall'],
  "sutton-coldfield": ['birmingham', 'tamworth', 'lichfield'],
  'caversham': ['reading', 'maidenhead', 'windsor'],
  'bletchley': ['milton-keynes', 'bedford', 'leighton-buzzard'],
  'eastleigh': ['southampton', 'winchester', 'basingstoke'],
  'gosport': ['portsmouth', 'southampton', 'chichester'],
  'poole': ['bournemouth', 'exeter', 'southampton'],
  'leyland': ['preston', 'chorley', 'blackburn'],
  'cleveleys': ['blackpool', 'preston', 'lytham-st-annes'],
  'diss': ['norwich', 'ipswich', 'colchester'],
  'woodbridge': ['ipswich', 'colchester', 'norwich'],
  'haxby': ['york', 'harrogate', 'ripon'],
  "stockton-on-tees": ['middlesbrough', 'darlington', 'durham'],
  'willerby': ['hull', 'beverley', 'goole'],

  // ─── Nationwide Expansion — 45 new towns cross-regions ───
  'amersham': ['high-wycombe', 'beaconsfield', 'aylesbury', 'hemel-hempstead'],
  'bangor-ni': ['belfast', 'carrickfergus', 'newtownards'],
  'bedworth': ['nuneaton', 'coventry', 'rugby', 'birmingham'],
  'caernarfon': ['bangor', 'llandudno', 'porthmadog'],
  'cottingham': ['hull', 'beverley', 'hedon'],
  'dorchester': ['poole', 'bournemouth', 'weymouth'],
  'dorking': ['guildford', 'reigate', 'leatherhead', 'horsham'],
  'droitwich': ['worcester', 'kidderminster', 'birmingham'],
  'dungannon': ['belfast', 'omagh', 'armagh'],
  'fleetwood': ['blackpool', 'cleveleys', 'preston'],
  'formby': ['liverpool', 'southport', 'kirkby'],
  'galashiels': ['edinburgh', 'hawick'],
  'gillingham': ['chatham', 'maidstone', 'gravesend'],
  'glastonbury': ['wells', 'bristol', 'taunton'],
  'gravesend': ['chatham', 'gillingham', 'maidstone'],
  'haverfordwest': ['swansea', 'cardiff', 'tenby'],
  'hawick': ['galashiels', 'edinburgh'],
  'haywards-heath': ['brighton', 'crawley', 'burgess-hill'],
  'hereford': ['worcester', 'malvern', 'gloucester'],
  'hessle': ['hull', 'cottingham', 'beverley'],
  'hexham': ['newcastle-upon-tyne', 'durham', 'gateshead'],
  'kidderminster': ['worcester', 'droitwich', 'birmingham'],
  'kilmarnock': ['glasgow', 'ayr', 'hamilton'],
  'kirkby': ['liverpool', 'st-helens', 'huyton'],
  'knaresborough': ['harrogate', 'york', 'leeds'],
  'leamington-spa': ['warwick', 'coventry', 'stratford-upon-avon'],
  'leatherhead': ['guildford', 'reigate', 'woking', 'dorking'],
  'malvern': ['worcester', 'hereford', 'ledbury'],
  'morecambe': ['lancaster', 'preston', 'blackpool'],
  'newtownards': ['belfast', 'bangor-ni'],
  'penarth': ['cardiff', 'barry', 'bridgend'],
  'porthmadog': ['caernarfon', 'llandudno', 'bangor'],
  'redditch': ['birmingham', 'solihull', 'worcester'],
  'salisbury': ['winchester', 'bath', 'bristol'],
  'shrewsbury': ['telford', 'wolverhampton', 'stoke-on-trent'],
  'stratford-upon-avon': ['warwick', 'leamington-spa', 'coventry'],
  'telford': ['shrewsbury', 'wolverhampton', 'stoke-on-trent'],
  'tenby': ['haverfordwest', 'swansea', 'cardiff'],
  'warwick': ['leamington-spa', 'coventry', 'stratford-upon-avon'],
  'wells': ['bristol', 'bath', 'glastonbury'],
  'wetherby': ['leeds', 'york', 'harrogate'],
  'weymouth': ['dorchester', 'poole', 'bournemouth'],
  'worcester': ['kidderminster', 'droitwich', 'malvern', 'birmingham'],

  // ─── Deep Coverage — 22 smaller towns cross-regions ───
  'sandwell': ['birmingham', 'walsall', 'wolverhampton', 'dudley'],
  'kenilworth': ['warwick', 'leamington-spa', 'coventry'],
  'llandaff': ['cardiff', 'penarth', 'caerphilly'],
  'cardiff-bay': ['cardiff', 'penarth', 'barry'],
  'whickham': ['gateshead', 'newcastle-upon-tyne', 'durham'],
  'guiseley': ['leeds', 'ilkley', 'bradford'],
  'teignmouth': ['exeter', 'torquay', 'plymouth'],
  'bristol-clifton': ['bristol', 'bath', 'clevedon'],
  'clevedon': ['bristol', 'weston-super-mare', 'portishead'],
  'portishead': ['bristol', 'clevedon', 'weston-super-mare'],
  'bexleyheath': ['bexley', 'romford', 'croydon'],
  'dartford': ['gravesend', 'bexleyheath', 'chatham'],
  'sevenoaks': ['tonbridge', 'maidstone', 'dartford'],
  'sidcup': ['bexley', 'bexleyheath', 'romford'],
  'maldon': ['chelmsford', 'colchester', 'brentwood'],
  'whitefield': ['bury', 'prestwich', 'manchester'],
  'timperley': ['altrincham', 'sale', 'manchester'],
  'poulton-le-fylde': ['blackpool', 'cleveleys', 'preston'],
  'st-andrews': ['dundee', 'edinburgh', 'perth'],
  'berkhamsted': ['hemel-hempstead', 'watford', 'st-albans'],
  'menai-bridge': ['bangor', 'llandudno', 'caernarfon'],
  'devonport': ['plymouth', 'exeter', 'torquay'],

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

// City-to-city route page links for internal linking
// Filters the ROUTES array to find routes involving a given city
function getRouteLinksForCity(cityName: string): { slug: string; cityA: string; cityB: string; distance: string; price: string }[] {
  return ROUTES
    .filter((r) => r.cityA === cityName || r.cityB === cityName)
    .map((r) => ({
      slug: r.slug,
      cityA: r.cityA,
      cityB: r.cityB,
      distance: r.distance,
      price: r.estimatedFrom,
    }));
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
    title: `Man and Van ${loc.name} | From £19`,
    description: loc.region === 'Greater London'
      ? `Man and van ${loc.name} from £55/hr. One verified mover quotes. Free to submit, no multiple companies. Call 0121 751 1269.`
      : `Man and van ${loc.name} from £19/hr. One verified mover quotes. Free to submit, no multiple companies. Call 0121 751 1269.`,
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
    routeLinks: getRouteLinksForCity(loc.name),
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
