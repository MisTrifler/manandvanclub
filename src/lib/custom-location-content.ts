// Custom unique content overrides for Top 10 priority city pages
// These replace the auto-generated content with rich, city-specific moving information
// designed to prevent doorway-page penalties and improve local SEO relevance.

export const customLocationContentOverrides: Record<string, Partial<{
  title: string;
  description: string;
  h1: string;
  intro: string;
  knowledge: string;
  localMovingInfo: string;
  faq: { q: string; a: string }[];
  localAreaGuides: { title: string; body: string; links?: { label: string; href: string }[] }[];
}>> = {
  // ──────────────────────────────────────────
  // BROWNHILLS
  // ──────────────────────────────────────────
  brownhills: {
    title: "Man and Van Brownhills | Local Moving Quotes in Walsall",
    description: "Request man and van quotes in Brownhills, WS8 and Walsall. Furniture delivery, house, flat and same-day moves from approved independent movers.",
    h1: "Man and Van Brownhills",
    intro: "Need a man and van in Brownhills? Submit your collection and delivery postcodes, move date, item list and access notes for free. A suitable approved independent mover can review your Brownhills move before sending a quote, so you decide whether to book after seeing the details.",
    knowledge: "Brownhills moves often depend on local access as much as distance. A sofa collection from Walsall Wood, a flat move near Clayhanger, a home move towards Pelsall or a route out to Cannock, Lichfield, Sutton Coldfield, Walsall or Birmingham can all need different timing around the A5, A452, A461 and M6 Toll.",
    localMovingInfo: `Brownhills sits on the north-east side of Walsall, with regular local movement between WS8, Walsall Wood, Clayhanger, Pelsall, Aldridge, Burntwood and Cannock. It is a useful local search area because customers often need smaller man and van jobs, furniture collections, flat moves and short-notice help without ringing multiple removal companies.

The A5 and A452 are the main route considerations. A short move within Brownhills can still take longer if loading access is tight, if the van needs to stop near a busy road, or if the move is planned around school-run traffic. Routes towards Walsall, Birmingham, Lichfield, Cannock and Sutton Coldfield can also change the final quote depending on time of day and parking at both addresses.

Brownhills properties can vary from post-war semis and bungalows to terraced homes and newer estates. Add floor level, stairs, driveway access, parking notes, dismantling needs and bulky furniture details so an approved mover can review the real work involved before quoting. Your contact details stay protected until you accept a quote and book.`,
    localAreaGuides: [
      {
        title: "Man and van Brownhills WS8",
        body: "For WS8 moves, include both full postcodes, the item list and any parking or access notes. This helps a mover judge whether the job is a quick local run or needs more time for loading and unloading.",
      },
      {
        title: "Furniture collection in Brownhills",
        body: "Sofas, beds, wardrobes, appliances and marketplace purchases often need clear size, floor and access details. Add whether items need dismantling so the mover can quote properly before you book.",
        links: [
          { label: "Furniture delivery", href: "/furniture-delivery" },
          { label: "Same-day man and van", href: "/same-day-man-and-van" }
        ],
      },
      {
        title: "House and flat moves around Walsall Wood and Clayhanger",
        body: "Moves around Walsall Wood, Clayhanger and Pelsall can involve cul-de-sacs, estate roads, parking limits and stairs. The more detail you add, the easier it is for a mover to price the job without surprises.",
        links: [
          { label: "House removals", href: "/house-removals" },
          { label: "Flat removals", href: "/flat-removals" }
        ],
      },
      {
        title: "Brownhills to Walsall, Birmingham or Cannock",
        body: "Longer local routes from Brownhills often depend on the A5, A452, A461 and M6 Toll. Add preferred times and any access restrictions so the mover can review route timing before quoting.",
        links: [
          { label: "Man and van Walsall", href: "/man-and-van-walsall" },
          { label: "Man and van Birmingham", href: "/man-and-van-birmingham" }
        ],
      },
      {
        title: "Same-day man and van Brownhills",
        body: "Same-day help may be possible depending on mover availability. Include photos or clear item descriptions where possible, plus collection time, delivery time and whether anyone can help load.",
        links: [
          { label: "Start a request", href: "/get-started" }
        ],
      },
    ],
  },

  // ──────────────────────────────────────────
  // BIRMINGHAM
  // ──────────────────────────────────────────
  birmingham: {
    title: "Man and Van Birmingham | Verified Birmingham Mover Quotes | Man and Van Club",
    description: "Free man and van request in Birmingham, West Midlands. A verified mover reviews your postcodes, item list, access and route details before sending quote options. No multiple companies contacting you. Covers Jewellery Quarter, Edgbaston, Selly Oak, Moseley, Harborne and Sutton Coldfield.",
    h1: "Man and Van Birmingham",
    intro: "Need a man and van in Birmingham? Submit your postcodes, move date, item list and access notes for free. You can see a guide price first, then one verified mover reviews your Birmingham move before you decide whether to book.",
    knowledge: "Birmingham moving costs can change quickly by postcode. A Jewellery Quarter apartment, an Edgbaston house, a Selly Oak student move and a Sutton Coldfield family relocation can all need different planning for parking, lifts, stairs, the Clean Air Zone and route timing. Your request gives the mover those details before they quote.",
    localMovingInfo: `Birmingham is the UK's second-largest city and one of the most competitive man and van markets in the West Midlands. Local search demand is strongest around city-centre flats, student moves, furniture collections and short-notice house moves. From the Georgian terraces of Edgbaston to the modern apartments of the Jewellery Quarter and the suburban homes of Sutton Coldfield, Birmingham properties vary widely — and so do access, parking and loading requirements.

The city centre operates under a Clean Air Zone that affects central routes and can influence how a mover plans a van route. Moves in B1, B2, B3, B4 and B5 often need more attention to loading bays, apartment lifts and timed access than a simple suburban route. Many terraced streets in Sparkbrook, Handsworth and Small Heath have limited parking and narrow access, while family moves around Moseley, Harborne and Sutton Coldfield may involve larger loads, driveways, fragile furniture and school-run timing.

Student demand is strongest around Selly Oak, Edgbaston and Harborne because of the University of Birmingham and nearby shared houses. June, July and September can be busier, so accurate item lists and flexible access notes help movers decide whether they can help. The M6, M5, A38 and A45 corridors are also important for moves heading towards Walsall, Solihull, Coventry, Wolverhampton and the wider West Midlands.

Your Birmingham request can include property type, access, parking, stairs, lifts and route details so a verified mover can account for the difference between a Jewellery Quarter apartment, a Moseley terrace and a Sutton Coldfield family home before sending quote options. Customer details stay protected until you accept a quote and book.`,
    faq: [
      { q: "Do you cover all areas of Birmingham?", a: "Yes. You can submit a move request for Jewellery Quarter, Edgbaston, Moseley, Harborne, Selly Oak, Sutton Coldfield and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Birmingham?", a: "Birmingham man and van hourly rates in 2026 start from £50 per hour, with full-day costs around £350–£500 depending on van size, crew, stairs, parking and access. A single-item furniture collection starts from £50, while a full house move from a 3-bed property could range from £300–£600. Your final quote depends on postcodes, item list, route time, helpers, parking and access — submit your details for a guide price first." },
      { q: "Can I find a mover for a same-day move in Birmingham?", a: "Same-day moves may be possible in Birmingham depending on mover availability. Submit your request and a verified mover can review the details if they have space to help." },
      { q: "Will multiple movers contact me?", a: "No. That is exactly what makes us different. Your enquiry is offered to one mover at a time. You will not receive a flood of calls or emails from multiple competing companies." },
      { q: "Is it free to submit a move request?", a: "Yes. It is free to submit your move request. You only pay a booking deposit if you accept a mover quote. The booking deposit is deducted from the mover's quote, and you pay the remaining balance directly to the mover on moving day." },
      { q: "How quickly will I be contacted?", a: "After you submit your request, a verified mover can review your anonymised move details and send quote options if they can help. Your contact details are only released after you accept a quote and pay the booking deposit." },
      { q: "Do you cover Jewellery Quarter, Edgbaston, Moseley?", a: "Yes. You can submit requests for Jewellery Quarter, Edgbaston, Moseley, Harborne, Selly Oak and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Can you help with student moves in Birmingham?", a: "Yes. Student moves can be submitted for areas near Selly Oak and Harborne. A verified mover can review the item list, access and date before quoting." },
      { q: "Do you handle office relocations in Birmingham?", a: "Yes. Office relocation requests can be submitted for City Centre and Digbeth and Jewellery Quarter. Include access, parking, equipment and timing details so a verified mover can quote accurately." },
      { q: "Are approved Birmingham movers insured?", a: "Approved movers must provide Goods in Transit and Public Liability insurance before joining the network. Cover can vary by mover, so we recommend checking the quote details before booking." },
      { q: "Does Birmingham's Clean Air Zone affect my move?", a: "Yes. Birmingham city centre has a Clean Air Zone (CAZ) that charges non-compliant vehicles £8 per day. Most modern vans used by approved movers are CAZ-compliant, but it is worth confirming this when you receive your quote. Moves in B1–B5 postcodes are most likely to be affected. Suburban moves in Sutton Coldfield, Moseley, Harborne and Edgbaston fall outside the zone." },
      { q: "How much does a man and van cost from Birmingham to Walsall?", a: "A Birmingham to Walsall man and van move in 2026 typically costs £80–£180 depending on load size, access at both addresses and time of day. The A34 corridor connects the two directly, making it a common route. A single-item collection might start from £50–£80. Submit your postcodes and item list for a guide price." },
    ],
    localAreaGuides: [
      {
        title: "Man and van Birmingham city centre",
        body: "City-centre moves often involve apartments, lift bookings, loading bays, one-way streets and Clean Air Zone planning. Add building access, floor level and parking notes so a mover can price the job properly before you book.",
      },
      {
        title: "Man and van Jewellery Quarter",
        body: "Jewellery Quarter moves are commonly apartment-based, with controlled access, narrow streets and limited loading space near converted buildings. Include lift and concierge details so the mover can judge time on site.",
      },
      {
        title: "Man and van Edgbaston",
        body: "Edgbaston moves can range from student rooms and flats to larger family homes. Access can vary between main-road apartments, leafy residential streets and properties close to the university and hospital areas.",
      },
      {
        title: "Student moves in Selly Oak and Harborne",
        body: "Selly Oak and Harborne are key student-move areas. Smaller loads, shared houses, term dates and narrow residential streets can all affect availability and quote accuracy.",
      },
      {
        title: "Furniture collection in Birmingham",
        body: "Single-item collections around Birmingham are often sofas, wardrobes, beds, appliances or marketplace purchases. A clear item list, collection postcode and access notes help avoid underquoting.",
        links: [
          { label: "Furniture collection service", href: "/furniture-delivery" },
          { label: "Same-day man and van", href: "/same-day-man-and-van" }
        ],
      },
      {
        title: "Man and van Sutton Coldfield",
        body: "Sutton Coldfield moves are typically larger family homes with driveways, gardens and suburban roads. Add furniture volume, packing notes and driveway access so the mover can judge the full job before quoting.",
        links: [
          { label: "House removals", href: "/house-removals" },
        ],
      },
      {
        title: "Man and van Moseley and Kings Heath",
        body: "Moseley and Kings Heath have a mix of Victorian terraces and converted flats. Parking can be limited on terraced streets, especially near the high streets. Add parking restrictions and access details to your request.",
      },
      {
        title: "Man and van Sparkbrook, Handsworth and Small Heath",
        body: "These areas have dense Victorian terraces with on-street parking, narrow access and high foot traffic. Loading notes, parking restrictions and property access details help a mover quote accurately.",
      },
      {
        title: "How much does a man and van cost in Birmingham?",
        body: "Across the UK in 2026, Birmingham man and van hourly rates start from £50 per hour, with full-day costs around £350–£500 depending on van size, crew, stairs, parking and access. A single-item furniture collection starts from £50, while a full house move from a 3-bed property could range from £300–£600. Your final quote depends on postcodes, item list, route time, helpers, parking and access — submit your details for a guide price first, then a verified mover reviews the job before quoting.",
      },
      {
        title: "Man and van vs removal company in Birmingham",
        body: "A man and van is typically more affordable and flexible than a full removals company, especially for flats, student moves, single items and same-day jobs. Man and Van Club is a marketplace — you submit one request and one verified mover quotes, rather than your details going to lots of companies. For larger 4+ bedroom house moves with packing services, a removal company may be more suitable.",
      },
      {
        title: "Man and van Walsall — moves between Birmingham and Walsall",
        body: "The A34 corridor connects Birmingham and Walsall directly, making moves between the two areas common. Whether you are moving from a Birmingham flat to a Walsall house or need a furniture collection that crosses the city boundary, include both postcodes and access notes so a mover can review the route timing before quoting.",
        links: [
          { label: "Man and van Walsall", href: "/man-and-van-walsall" },
        ],
      },
    ],
  },
  // ──────────────────────────────────────────
  london: {
    localMovingInfo: `London is one of the busiest moving markets in the UK, with unique challenges that local movers often need to account for. From narrow Victorian streets in Kensington and Islington to congestion zone restrictions and ULEZ charges, a London move requires careful planning and local knowledge.

The Ultra Low Emission Zone (ULEZ) covers all London boroughs, meaning any large van entering the zone must be compliant or face a daily charge. The Congestion Charge zone covers central London postcodes and operates Monday to Friday. Many residential streets in Zone 1 and 2 require resident permits or have timed loading restrictions, often limited to 20-minute loading windows. If your building has a lift, booking it in advance is essential, particularly in high-rise developments in Canary Wharf, Shoreditch, and the South Bank. Student moves are common around Bloomsbury, Camden, and Kingston, while family relocations frequently move from inner London to outer boroughs like Bromley, Croydon, and Enfield.

The M25 orbital creates significant traffic at all hours, and the A40, A12, North Circular, and South Circular are frequent bottlenecks. Your request can include parking, loading, lift and low-emission-zone details so a verified mover can review the route and access requirements before sending quote options. The final quote comes from the mover before you decide whether to book.`,
  },

  // ──────────────────────────────────────────
  // MANCHESTER
  // ──────────────────────────────────────────
  manchester: {
    localMovingInfo: `Manchester is one of the fastest-growing cities in the UK, with a constant flow of students, young professionals, and families moving in and out. From the converted warehouses of Ancoats to the Victorian semis of Didsbury and the student terraces of Fallowfield, Manchester moves can benefit from local knowledge.

The M60 ring road creates a permanent traffic loop around the city, and the M62 and M56 corridors are heavily congested during peak hours. The city centre has complex parking and loading restrictions, particularly around Deansgate, the Northern Quarter, and the expanding Spinningfields district. New-build apartment buildings in Salford Quays and MediaCityUK often have strict lift booking policies and underground loading bays that require advance coordination. The student move periods in June and September create peak demand around the university corridors, particularly in Fallowfield, Withington, and Rusholme.

A Manchester move can vary widely between a Northern Quarter apartment, a Didsbury family home and a student house in Fallowfield. Your request lets a verified mover review the postcodes, item list, parking, stairs and timing before sending quote options. You choose whether to book only after the mover has quoted.`,
  },

  // ──────────────────────────────────────────
  // LEEDS
  // ──────────────────────────────────────────
  leeds: {
    localMovingInfo: `Leeds is a university city with a constant turnover of student moves, as well as a growing professional population relocating into the city centre and surrounding suburbs. From Headingley to Roundhay, Leeds properties range from large Victorian terraces to modern city-centre apartments, each with its own access challenges.

The M1 and M62 motorways create heavy traffic around the city, particularly during rush hours on the inner ring road. Hyde Park and Headingley have narrow streets with limited parking, particularly during term time when students are moving in and out. Many properties in these areas are multi-storey Victorian terraces with steep staircases, requiring movers with experience in tight access. The city centre's new developments around Leeds Dock and the South Bank have modern lift access but require parking permits for loading. The A58 and A61 corridors are busy throughout the day, and the A64 towards York is a frequent bottleneck.

Leeds moves can vary between city-centre apartments, Headingley student houses and family homes around Roundhay or Horsforth. Your request gives a verified mover the route, access, parking and item details needed to price the job more accurately before you decide whether to book.`,
  },

  // ──────────────────────────────────────────
  // LIVERPOOL
  // ──────────────────────────────────────────
  liverpool: {
    localMovingInfo: `Liverpool is a city with distinct neighbourhoods, each with its own character and moving challenges. From the Victorian terraces of Aigburth to the suburban semis of Woolton and the student areas around Wavertree, Liverpool moves can benefit from local knowledge to navigate narrow streets, terrace access, and the city centre's one-way system.

The city centre has a complex one-way system and loading restrictions around the docks, the Liverpool Waters development, and the Baltic Triangle. Many Liverpool streets are terraced with rear alley access, which can be easier for loading than the front, so it helps to include access notes when submitting the request. The M62 tunnel approach and the A59 create significant traffic during rush hours, and the Kingsway Tunnel approach adds further congestion around the Wirral connection. Student moves are concentrated around the university areas of Wavertree and Toxteth, while family relocations frequently move to the south Liverpool suburbs like Allerton and Woolton.

Liverpool moves can involve terraces, apartments, dockside loading points and different parking restrictions by area. Your request lets a verified mover review the property type, route, access and timing before sending quote options. Your contact details stay private until you accept a quote and book.`,
  },

  // ──────────────────────────────────────────
  // BRISTOL
  // ──────────────────────────────────────────
  bristol: {
    localMovingInfo: `Bristol can be a physically challenging city for removals, with steep hills, narrow Georgian streets, and compact terraced areas. From Clifton to Bedminster, Southville to Redland, Bristol moves can benefit from movers who understand the city's geography, parking restrictions, and Clean Air Zone boundaries.

The city centre has a Clean Air Zone that affects the central area, and many streets in Clifton and Redland are on steep hills with narrow access that can challenge even experienced drivers. The M4 and M5 interchanges create heavy traffic around the city, particularly during rush hours and on weekends. Student moves are common in Redland, Stoke Bishop, and around the university, while family relocations frequently move from the city centre to the suburban areas of Henleaze, Westbury-on-Trym, and Bishopston. The narrow streets of Stokes Croft and the Georgian crescents of Clifton require careful vehicle sizing and manoeuvring.

Bristol moves can involve steep streets, narrow access, Clean Air Zone planning and different loading arrangements across Clifton, Bedminster, Redland and Harbourside. Your request lets a verified mover review these details and send quote options before you decide whether to book.`,
  },

  // ──────────────────────────────────────────
  // WOLVERHAMPTON
  // ──────────────────────────────────────────
  wolverhampton: {
    localMovingInfo: `Wolverhampton is a city with a mix of post-war estates, Victorian terraces, and newer suburban developments. From Tettenhall to Wednesfield, Penn to Bilston, moves in Wolverhampton vary widely depending on the area and property type. The city centre ring road has complex access points, and the M6 and M54 motorways create significant traffic around the city, particularly at junctions 10 and 11.

Many of Wolverhampton's older estates have narrow access roads and limited parking for larger vehicles. The Victorian terraces in the city centre and around the St Peter's district have tight street access and often require careful reversing manoeuvres. The suburban areas of Tettenhall and Penn have wider roads but can be hilly, particularly towards the west of the city. Student moves are concentrated around the university area and the city centre, while family relocations frequently move to the suburban areas and nearby towns like Walsall and Dudley.

Wolverhampton moves can involve tight terraced streets, wider suburban roads or newer estates depending on the postcode. Your request gives a verified mover the access, route and item details needed to quote before you decide whether to book.`,
  },

  // ──────────────────────────────────────────
  // WALSALL
  // ──────────────────────────────────────────
  walsall: {
    title: "Man and Van Walsall | Verified Local Mover Quotes | Man and Van Club",
    description: "Free man and van request in Walsall, West Midlands. A verified mover reviews your postcodes, item list, access and route details before sending quote options. No multiple companies contacting you.",
    faq: [
      { q: "Do you cover all areas of Walsall?", a: "Yes. You can submit a move request for Town Centre, Aldridge, Bloxwich, Willenhall, Darlaston, Pelsall, Rushall and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Walsall?", a: "Walsall man and van rates in 2026 start from £50 per hour, with full-day costs around £350–£500 depending on van size, crew, stairs, parking and access. A single-item collection (sofa, bed, appliance) starts from £50, while a full house move from a 3-bed Walsall property could range from £250–£500. Your final quote depends on postcodes, item list, route time, helpers, parking and access — submit your details for a guide price first." },
      { q: "Can I find a mover for a same-day move in Walsall?", a: "Same-day moves may be possible in Walsall depending on mover availability. Submit your request and a verified mover can review the details if they have space to help." },
      { q: "Will multiple movers contact me?", a: "No. That is exactly what makes us different. Your enquiry is offered to one mover at a time. You will not receive a flood of calls or emails from multiple competing companies." },
      { q: "Is it free to submit a move request?", a: "Yes. It is free to submit your move request. You only pay a booking deposit if you accept a mover quote. The booking deposit is deducted from the mover's quote, and you pay the remaining balance directly to the mover on moving day." },
      { q: "How quickly will I be contacted?", a: "After you submit your request, a verified mover can review your anonymised move details and send quote options if they can help. Your contact details are only released after you accept a quote and pay the booking deposit." },
      { q: "Do you cover Aldridge, Bloxwich, Willenhall?", a: "Yes. You can submit requests for Aldridge, Bloxwich, Willenhall, Darlaston, Wednesbury, Pelsall and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Walsall movers insured?", a: "Approved movers must provide Goods in Transit and Public Liability insurance before joining the network. Cover can vary by mover, so we recommend checking the quote details before booking." },
      { q: "How much does a man and van cost from Walsall to Birmingham?", a: "A Walsall to Birmingham man and van move in 2026 typically costs £80–£180 depending on load size, access at both addresses and time of day. The A34 corridor connects Walsall and Birmingham directly, making it a common route. A single-item collection might start from £50–£80. Submit your postcodes and item list for a guide price." },
      { q: "How much does a man and van cost from Walsall to Wolverhampton?", a: "A Walsall to Wolverhampton move in 2026 typically costs £70–£150 depending on load size and access. The two towns are close, so route time is usually short. Submit your postcodes for a guide price." },
    ],
    localMovingInfo: `Walsall is a Black Country town with a strong industrial heritage and a mix of housing types, from post-war semis to newer estates. From Bloxwich to Aldridge, Brownhills to Pelsall, Walsall moves require a mover who understands the local road network, estate layouts, and the town centre's one-way system. The A34 and A454 create heavy traffic during rush hours, and the town centre has controlled parking zones that complicate loading.

Residential estates in Brownhills and Pelsall often have narrow cul-de-sacs and limited turning space for larger vans. The Victorian terraces in the town centre and the older streets around the Arboretum have tight access and on-street parking restrictions. The newer estates in Aldridge and Rushall have wider roads but still require knowledge of the local school-run traffic and rush-hour bottlenecks. Moves between Walsall and surrounding Black Country towns often depend on route timing around the A34 and A454 corridors, so these details are useful for the mover to review before quoting.

Walsall moves can differ by postcode, from town centre terraces to Bloxwich semis and Aldridge estates. Your request helps a verified mover review route, parking, access and item details before sending quote options.`,
    localAreaGuides: [
      {
        title: "Man and van Walsall town centre",
        body: "Town-centre moves in WS1 and WS2 often involve terraces with on-street parking, controlled parking zones and narrow access. Add parking notes, floor level and loading details so a mover can quote accurately.",
      },
      {
        title: "Man and van Bloxwich and Leamore",
        body: "Bloxwich has a mix of post-war semis and newer estates along the A34 corridor. Cul-de-sac access, driveway availability and school-run timing can all affect the move. Include these details in your request.",
        links: [
          { label: "Man and van Bloxwich", href: "/man-and-van-bloxwich" },
        ],
      },
      {
        title: "Man and van Aldridge and Rushall",
        body: "Aldridge and Rushall are suburban areas with wider roads, driveways and larger family homes. Add furniture volume, packing notes and any garden access so the mover can judge the full scope before quoting.",
        links: [
          { label: "House removals", href: "/house-removals" },
        ],
      },
      {
        title: "Man and van Brownhills and Pelsall",
        body: "Brownhills and Pelsall are on the north-east side of Walsall near the A5 and A452. Estate roads, cul-de-sacs and local route timing around the M6 Toll are key details to include.",
        links: [
          { label: "Man and van Brownhills", href: "/man-and-van-brownhills" },
        ],
      },
      {
        title: "Furniture collection in Walsall",
        body: "Single-item collections around Walsall are often sofas, beds, wardrobes, appliances and Facebook Marketplace purchases. Add item size, collection postcode and access notes for an accurate quote.",
        links: [
          { label: "Furniture delivery", href: "/furniture-delivery" },
          { label: "Same-day man and van", href: "/same-day-man-and-van" },
        ],
      },
      {
        title: "Man and van Darlaston and Willenhall",
        body: "Darlaston and Willenhall sit between Walsall and Wolverhampton. Terraced streets, estate roads and route timing around the M6 and A463 can all affect the move. Add both postcodes and access details.",
      },
      {
        title: "How much does a man and van cost in Walsall?",
        body: "Walsall man and van rates start from £50 per hour, with full-day costs around £350–£500 depending on van size, crew, stairs, parking and access. A single-item collection (sofa, bed, appliance) starts from £50, while a full house move from a 3-bed Walsall property could range from £250–£500. Your final quote depends on postcodes, item list, route time, helpers, parking and access — submit your details for a guide price first, then a verified mover reviews the job before quoting.",
      },
      {
        title: "Man and van Walsall to Birmingham, Wolverhampton or Coventry",
        body: "Routes between Walsall and nearby cities depend on the A34, A454 and M6 corridors. Rush-hour timing and parking at both addresses can affect the quote. Add preferred times and access details so the mover can review route timing before quoting.",
        links: [
          { label: "Man and van Birmingham", href: "/man-and-van-birmingham" },
          { label: "Man and van Wolverhampton", href: "/man-and-van-wolverhampton" },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────
  // COVENTRY
  // ──────────────────────────────────────────
  coventry: {
    localMovingInfo: `Coventry is a city rebuilt with ambition, blending post-war rebuild housing, modern developments, and established suburban areas. From the city centre apartments to the family homes of Earlsdon and Kenilworth, Coventry moves require local knowledge of the ring road, the one-way system, and the distinct character of each neighbourhood.

The city centre ring road and central one-way systems can complicate access for larger vehicles, so detailed postcode and loading notes help a mover plan before quoting. The M6 and M69 motorways create heavy traffic around the city, particularly during rush hours at junctions 2 and 3. The post-war estates of Tile Hill and Allesley have narrow roads and limited parking, while the newer developments around the Ricoh Arena and the university have better access but require knowledge of the local road network. Student moves are concentrated around the university areas of Earlsdon and Stoke, while family relocations frequently move to the south-west suburbs and nearby villages.

Coventry moves can involve ring-road access, post-war estates, Victorian terraces or newer city-centre developments. Your request lets a verified mover review the route, access and item list before sending quote options.`,
  },

  // ──────────────────────────────────────────
  // NOTTINGHAM
  // ──────────────────────────────────────────
  nottingham: {
    localMovingInfo: `Nottingham is a vibrant East Midlands city famous for Robin Hood, the Lace Market, and two major universities. From the Victorian terraces of the Meadows to the modern apartments around the canal and the student streets of Lenton, Nottingham moves require local knowledge of the city's narrow streets, tram lines, and hilly residential areas.

The city centre has narrow streets in the Lace Market and Hockley areas, with loading restrictions and tram line crossings that require careful planning and timing. The Park Estate is one of the most desirable residential areas in the city but has steep, narrow roads that challenge even experienced movers. Student moves are concentrated in Lenton, Dunkirk, and Beeston around the University of Nottingham and Nottingham Trent University campuses, while family relocations frequently move to West Bridgford, Arnold, and Carlton. The M1 and A52 create significant traffic during rush hours, and the A60 corridor through the city is frequently congested.

The Meadows and St Ann's areas have dense Victorian terraces with narrow street access, while newer developments around the canal and Trent Bridge can involve different loading arrangements. Your request lets a verified mover review access, tram-line considerations, route timing and item details before sending quote options.`,
    faq: [
      { q: "Do you cover all areas of Nottingham?", a: "Yes. You can submit a move request for West Bridgford, Beeston, Arnold, Carlton, Hucknall, Lenton, Clifton and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Nottingham?", a: "Nottingham man and van hourly rates in 2026 start from £50 per hour, with full-day costs around £350–£500 depending on van size, crew, stairs, parking and access. A single-item furniture collection starts from £50, while a full house move from a 3-bed property could range from £250–£500. Your final quote depends on postcodes, item list, route time, helpers, parking and access — submit your details for a guide price first." },
      { q: "Can I find a mover for a same-day move in Nottingham?", a: "Same-day moves may be possible in Nottingham depending on mover availability. Submit your request and a verified mover can review the details if they have space to help." },
      { q: "Will multiple movers contact me?", a: "No. That is exactly what makes us different. Your enquiry is offered to one mover at a time. You will not receive a flood of calls or emails from multiple competing companies." },
      { q: "Is it free to submit a move request?", a: "Yes. It is free to submit your move request. You only pay a booking deposit if you accept a mover quote. The booking deposit is deducted from the mover's quote, and you pay the remaining balance directly to the mover on moving day." },
      { q: "How quickly will I be contacted?", a: "After you submit your request, a verified mover can review your anonymised move details and send quote options if they can help. Your contact details are only released after you accept a quote and pay the booking deposit." },
      { q: "Do you cover West Bridgford, Beeston, Arnold and Hucknall?", a: "Yes. You can submit requests for West Bridgford, Beeston, Arnold, Carlton, Hucknall, Lenton, Clifton and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Can you help with student moves in Nottingham?", a: "Yes. Student moves can be submitted for areas near Lenton, Dunkirk and Beeston around the University of Nottingham and Nottingham Trent University. A verified mover can review the item list, access and date before quoting." },
      { q: "Are the Lace Market and Hockley hard to access with a van?", a: "The Lace Market and Hockley have narrow streets, loading restrictions and tram line crossings. Adding your access notes, floor level and any parking restrictions helps a mover plan the route before quoting." },
      { q: "How much does a man and van cost from Nottingham to Leicester?", a: "A Nottingham to Leicester man and van move in 2026 typically costs £80–£160 depending on load size, access at both addresses and time of day. The M1 connects the two cities directly. A single-item collection might start from £60–£90. Submit your postcodes and item list for a guide price." },
      { q: "How much does a man and van cost from Nottingham to Derby?", a: "A Nottingham to Derby move in 2026 typically costs £70–£140 depending on load size and access. The A52 connects the two cities in around 30 minutes. Submit your postcodes for a guide price." },
    ],
    localAreaGuides: [
      {
        title: "Man and van West Bridgford and Lady Bay",
        body: "West Bridgford has tree-lined streets, Victorian villas and modern developments around Gamston and Edwalton. Moves here often need careful planning around Central Avenue parking, Lady Bay conservation area access and Trent Bridge match-day road closures.",
        links: [
          { label: "Man and van West Bridgford", href: "/man-and-van-west-bridgford" },
        ],
      },
      {
        title: "Man and van Beeston and the University area",
        body: "Beeston sits between Nottingham and the M1 with a mix of Victorian terraces, student housing and newer developments. The tram line crossing on Station Road and university-area parking patterns are key details to include in your request.",
        links: [
          { label: "Man and van Beeston", href: "/man-and-van-beeston" },
        ],
      },
      {
        title: "Man and van Arnold and Sherwood",
        body: "Arnold is one of Nottingham's most popular northern suburbs. The A60 Mansfield Road creates rush-hour congestion, and residential crescents near the town centre can have tight turning circles for larger vans.",
        links: [
          { label: "Man and van Arnold", href: "/man-and-van-arnold" },
        ],
      },
      {
        title: "Man and van Carlton and Gedling",
        body: "Carlton sits east of the city centre with a mix of Victorian terraces and post-war semis. On-street parking near Carlton Road and tight access on older streets are common considerations.",
        links: [
          { label: "Man and van Carlton", href: "/man-and-van-carlton" },
        ],
      },
      {
        title: "Student moves in Lenton and Dunkirk",
        body: "Student moves around the University of Nottingham campus cluster in Lenton, Dunkirk and Beeston. Peak demand falls in June, July and September. Add your full item list, access notes and preferred dates for a verified mover to review.",
        links: [
          { label: "Student removals", href: "/student-removals" },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────
  // LEICESTER
  // ──────────────────────────────────────────
  leicester: {
    localMovingInfo: `Leicester is one of the East Midlands' busiest moving markets, home to two universities, a dense city centre around Highcross, and popular family suburbs like Oadby and Wigston. From LE1 apartments to the terraces off Narborough Road, every Leicester move has its own access quirks.

The city centre has a one-way loop around Highcross and the Clock Tower that can complicate van access, especially for the apartment developments around the cultural quarter. Narborough Road's Victorian terraces have narrow access and limited on-street parking, while the student areas around Clarendon Park and Evington follow the DMU and University of Leicester academic calendars. The M1 at junction 21 and the M69 create regular rush-hour congestion on the city's southern approaches.

Family moves tend to head for Oadby, Wigston, Glenfield and Birstall — suburban areas with larger properties and driveway access but school-run traffic on the main routes. Fosse Park and Meridian Business Park generate office and commercial moves. The A6 and A46 corridors are key for moves heading towards Loughborough, Market Harborough and the wider county.

Leicester moves can differ greatly by postcode, from Highcross apartments to Oadby family homes and Evington terraces. Your request helps a verified mover review route, parking, access and item details before sending quote options.`,
    faq: [
      { q: "Do you cover all areas of Leicester?", a: "Yes. You can submit a move request for Oadby, Wigston, Braunstone, Evington, Glenfield, Clarendon Park, Birstall and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Leicester?", a: "Leicester man and van hourly rates in 2026 start from £50 per hour, with full-day costs around £350–£500 depending on van size, crew, stairs, parking and access. A single-item furniture collection starts from £50, while a full house move from a 3-bed property could range from £250–£500. Your final quote depends on postcodes, item list, route time, helpers, parking and access — submit your details for a guide price first." },
      { q: "Can I find a mover for a same-day move in Leicester?", a: "Same-day moves may be possible in Leicester depending on mover availability. Submit your request and a verified mover can review the details if they have space to help." },
      { q: "Will multiple movers contact me?", a: "No. That is exactly what makes us different. Your enquiry is offered to one mover at a time. You will not receive a flood of calls or emails from multiple competing companies." },
      { q: "Is it free to submit a move request?", a: "Yes. It is free to submit your move request. You only pay a booking deposit if you accept a mover quote. The booking deposit is deducted from the mover's quote, and you pay the remaining balance directly to the mover on moving day." },
      { q: "How quickly will I be contacted?", a: "After you submit your request, a verified mover can review your anonymised move details and send quote options if they can help. Your contact details are only released after you accept a quote and pay the booking deposit." },
      { q: "Do you cover Oadby, Wigston and Clarendon Park?", a: "Yes. You can submit requests for Oadby, Wigston, Braunstone, Evington, Clarendon Park, Glenfield and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Can you help with student moves in Leicester?", a: "Yes. Student moves can be submitted for areas near Clarendon Park and Evington around DMU and the University of Leicester. A verified mover can review the item list, access and date before quoting." },
      { q: "How much does a man and van cost from Leicester to Nottingham?", a: "A Leicester to Nottingham man and van move in 2026 typically costs £80–£160 depending on load size, access at both addresses and time of day. The M1 connects the two cities directly. A single-item collection might start from £60–£90. Submit your postcodes and item list for a guide price." },
      { q: "How much does a man and van cost from Leicester to Birmingham?", a: "A Leicester to Birmingham man and van move in 2026 typically costs £100–£200 depending on load size, access and time of day. The M6 and M69 provide the main route. Submit your postcodes for a guide price." },
    ],
    localAreaGuides: [
      {
        title: "Man and van Oadby and Stoneygate",
        body: "Oadby is one of Leicester's most popular family suburbs with tree-lined streets and University of Leicester halls. The A6 London Road creates commuter congestion, and university-area parking can be restricted during term time.",
        links: [
          { label: "Man and van Oadby", href: "/man-and-van-oadby" },
        ],
      },
      {
        title: "Man and van Wigston and South Wigston",
        body: "Wigston sits south of Leicester with a mix of Victorian terraces and post-war semis. The A5199 Welford Road and B582 corridors create regular rush-hour traffic that affects move timing.",
        links: [
          { label: "Man and van Wigston", href: "/man-and-van-wigston" },
        ],
      },
      {
        title: "Student moves in Clarendon Park and Evington",
        body: "Student areas around DMU and the University of Leicester cluster in Clarendon Park and Evington. Peak demand is June, July and September. Add your full item list and access notes for a verified mover to review.",
        links: [
          { label: "Student removals", href: "/student-removals" },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────
  // DERBY
  // ──────────────────────────────────────────
  derby: {
    localMovingInfo: `Derby sits at the crossroads of the A38, A52 and A50, making it a natural base for moves across the East Midlands. From Victorian terraces off Normanton Road to family homes in Mickleover and Allestree, access varies widely across the city.

The A38 and A52 junction creates one of the city's biggest pinch points, especially during rush hour when traffic backs up between Derby and Nottingham. Pride Park and the football stadium generate match-day traffic that can block key routes, particularly the A52 and A6 approaches. The Victorian terraces around Normanton Road have narrow access and on-street parking, while the suburban streets of Mickleover, Littleover and Allestree offer better access but involve larger loads from bigger family homes.

Student demand is smaller than Nottingham or Leicester but concentrated around the Kedleston Road university area. Commercial moves around Pride Park, Infinity Park and the city centre office buildings tend to need evening or weekend slots. The A50 connects Derby to Stoke-on-Trent and the M1, while the A6 runs north towards Matlock and Buxton — both routes that generate regular longer-distance move requests.

Derby moves can differ greatly by postcode, from Normanton Road terraces to Allestree family homes and Chaddesden estates. Your request helps a verified mover review route, parking, access and item details before sending quote options.`,
    faq: [
      { q: "Do you cover all areas of Derby?", a: "Yes. You can submit a move request for Mickleover, Littleover, Chaddesden, Allestree, Spondon, Alvaston and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Derby?", a: "Derby man and van hourly rates in 2026 start from £50 per hour, with full-day costs around £350–£500 depending on van size, crew, stairs, parking and access. A single-item furniture collection starts from £50, while a full house move from a 3-bed property could range from £250–£500. Your final quote depends on postcodes, item list, route time, helpers, parking and access — submit your details for a guide price first." },
      { q: "Can I find a mover for a same-day move in Derby?", a: "Same-day moves may be possible in Derby depending on mover availability. Submit your request and a verified mover can review the details if they have space to help." },
      { q: "Will multiple movers contact me?", a: "No. That is exactly what makes us different. Your enquiry is offered to one mover at a time. You will not receive a flood of calls or emails from multiple competing companies." },
      { q: "Is it free to submit a move request?", a: "Yes. It is free to submit your move request. You only pay a booking deposit if you accept a mover quote. The booking deposit is deducted from the mover's quote, and you pay the remaining balance directly to the mover on moving day." },
      { q: "How quickly will I be contacted?", a: "After you submit your request, a verified mover can review your anonymised move details and send quote options if they can help. Your contact details are only released after you accept a quote and pay the booking deposit." },
      { q: "Do you cover Mickleover, Chaddesden and Allestree?", a: "Yes. You can submit requests for Mickleover, Littleover, Chaddesden, Allestree, Spondon, Alvaston and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "How much does a man and van cost from Derby to Nottingham?", a: "A Derby to Nottingham man and van move in 2026 typically costs £70–£140 depending on load size, access at both addresses and time of day. The A52 connects the two cities in around 30 minutes. A single-item collection might start from £50–£80. Submit your postcodes and item list for a guide price." },
    ],
    localAreaGuides: [
      {
        title: "Man and van Mickleover and Littleover",
        body: "Mickleover and Littleover are popular western suburbs with larger family homes and driveway access. The A38 junction timing and school-run traffic on residential roads are key considerations for movers.",
        links: [
          { label: "Man and van Mickleover", href: "/man-and-van-mickleover" },
          { label: "Man and van Littleover", href: "/man-and-van-littleover" },
        ],
      },
      {
        title: "Man and van Chaddesden and Oakwood",
        body: "Chaddesden has a mix of post-war estates and newer Oakwood developments. The A52 Nottingham Road corridor creates regular rush-hour congestion, and older estate roads can have tighter access.",
        links: [
          { label: "Man and van Chaddesden", href: "/man-and-van-chaddesden" },
        ],
      },
      {
        title: "Furniture collection in Derby",
        body: "Single-item collections around Derby are often sofas, beds, wardrobes and Marketplace purchases. Add item size, collection postcode and access notes for an accurate quote.",
        links: [
          { label: "Furniture delivery", href: "/furniture-delivery" },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────
  // NORTHAMPTON
  // ──────────────────────────────────────────
  northampton: {
    title: "Man and Van Northampton | Verified Local Mover Quotes | Man and Van Club",
    description: "Free man and van request in Northampton, East Midlands. A verified mover reviews your postcodes, item list, access and route details before sending quote options. No multiple companies contacting you. Covers Kingsthorpe, Duston, Abington and surrounding areas.",
    h1: "Man and Van Northampton",
    intro: "Need a man and van in Northampton? Submit your collection and delivery postcodes, move date, item list and access notes for free. A verified mover can review your Northampton move before sending a quote, so you decide whether to book after seeing the details.",
    knowledge: "Northampton moves depend on which side of the M1 you are moving from, the one-way system around the town centre, and whether the property is a Victorian terrace near Abington or a newer build in Hunsbury. The M1 at junctions 15 and 15A creates regular congestion, and the A45 corridor towards Wellingborough and the Brackmills area gets busy during rush hour.",
    localMovingInfo: `Northampton sits at the crossroads of the M1, A45 and A43, making it a key moving hub in the East Midlands. From Victorian terraces near the town centre to the expanding estates of Hunsbury and Wootton, Northampton moves need local knowledge of the one-way system, the M1 junction approach roads and the distinct access patterns of each neighbourhood.

The town centre has a one-way system that can complicate van access, particularly around the Drapery and Gold Street areas. Abington and Kingsthorpe have Victorian and Edwardian terraces with on-street parking and narrow doorways, while the newer estates in Hunsbury, Wootton and Upton have driveway access but can involve larger furniture volumes. The M1 at junctions 15 and 15A is a key route consideration for any move heading north towards Leicester or south towards Milton Keynes and London.

Student moves around the University of Northampton and family relocations to the suburban estates both keep movers busy year-round. Commercial moves from the Brackmills industrial area and Moulton Park business district tend to need evening or weekend timing.

Northampton moves can differ by postcode, from Abington terraces to Hunsbury estates. Your request helps a verified mover review route, parking, access and item details before sending quote options.`,
    faq: [
      { q: "Do you cover all areas of Northampton?", a: "Yes. You can submit a move request for Kingsthorpe, Duston, Abington, Wootton, Hunsbury, Delapre and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Northampton?", a: "Northampton man and van hourly rates in 2026 start from £50 per hour, with full-day costs around £350–£500 depending on van size, crew, stairs, parking and access. A single-item furniture collection starts from £50, while a full house move from a 3-bed property could range from £250–£500. Your final quote depends on postcodes, item list, route time, helpers, parking and access — submit your details for a guide price first." },
      { q: "Can I find a mover for a same-day move in Northampton?", a: "Same-day moves may be possible in Northampton depending on mover availability. Submit your request and a verified mover can review the details if they have space to help." },
      { q: "Will multiple movers contact me?", a: "No. That is exactly what makes us different. Your enquiry is offered to one mover at a time. You will not receive a flood of calls or emails from multiple competing companies." },
      { q: "Is it free to submit a move request?", a: "Yes. It is free to submit your move request. You only pay a booking deposit if you accept a mover quote. The booking deposit is deducted from the mover's quote, and you pay the remaining balance directly to the mover on moving day." },
      { q: "How quickly will I be contacted?", a: "After you submit your request, a verified mover can review your anonymised move details and send quote options if they can help. Your contact details are only released after you accept a quote and pay the booking deposit." },
      { q: "Do you cover Kingsthorpe, Duston and Abington?", a: "Yes. You can submit requests for Kingsthorpe, Duston, Abington, Wootton, Hunsbury and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "How much does a man and van cost from Northampton to Leicester?", a: "A Northampton to Leicester man and van move in 2026 typically costs £90–£170 depending on load size, access at both addresses and time of day. The M1 and A14 provide the main route. Submit your postcodes and item list for a guide price." },
    ],
    localAreaGuides: [
      {
        title: "Man and van Kingsthorpe",
        body: "Kingsthorpe has a village character with Victorian terraces near the old high street and newer estates towards Moulton. The A508 Welford Road creates rush-hour congestion, and the older village streets have limited van access.",
        links: [
          { label: "Man and van Kingsthorpe", href: "/man-and-van-kingsthorpe" },
        ],
      },
      {
        title: "Man and van Duston",
        body: "Duston blends an older village core of stone cottages with extensive new-build estates. The A45 approaching the M1 at junction 15A gets heavily congested, so route timing matters.",
        links: [
          { label: "Man and van Duston", href: "/man-and-van-duston" },
        ],
      },
      {
        title: "Man and van Abington",
        body: "Abington has Victorian and Edwardian terraces near the park and town centre. On-street parking, narrow doorways and stairs in older properties are the main considerations for movers.",
        links: [
          { label: "Man and van Abington", href: "/man-and-van-abington" },
        ],
      },
    ],
  },

  // ──────────────────────────────────────────
  // LINCOLN
  // ──────────────────────────────────────────
  lincoln: {
    title: "Man and Van Lincoln | Verified Local Mover Quotes | Man and Van Club",
    description: "Free man and van request in Lincoln, East Midlands. A verified mover reviews your postcodes, item list, access and route details before sending quote options. No multiple companies contacting you. Covers Cathedral Quarter, Brayford, North Hykeham and surrounding areas.",
    h1: "Man and Van Lincoln",
    intro: "Need a man and van in Lincoln? Submit your collection and delivery postcodes, move date, item list and access notes for free. A verified mover can review your Lincoln move before sending a quote, so you decide whether to book after seeing the details.",
    knowledge: "Lincoln's dual personality — the medieval Cathedral Quarter above the city and the modern Brayford Waterfront below — means moves vary dramatically by area. Steep Hill and the cobbled streets around the cathedral have van access restrictions, while the newer estates in North Hykeham and Bracebridge Heath offer more straightforward loading. The A46 bypass and A15 connect Lincoln to the wider county.",
    localMovingInfo: `Lincoln's Cathedral Quarter and the famous Steep Hill create some of the most challenging moving conditions in the East Midlands. Above the cathedral, cobbled streets and restricted access make van loading difficult; below, the Brayford Waterfront and newer estates offer more straightforward moves. Lincoln's dual personality — historic hillside and modern riverside — means every move needs area-specific planning.

The Cathedral Quarter and Bailgate area have some of the narrowest streets in any English city, with pedestrian zones and loading time restrictions that require careful scheduling. Steep Hill, as the name suggests, is one of the steepest streets in England and presents unique challenges for loaded vans. The area below — around the Brayford Pool and the University of Lincoln — has modern apartment blocks with better access, though parking can still be limited during term time.

Student moves cluster around the University of Lincoln campus at Brayford, with peak demand in June, July and September. Family moves tend to head for North Hykeham, Bracebridge Heath and Waddington — growing areas south of the city with newer housing and driveway access. The A46 bypass connects Lincoln to Newark and Nottingham, while the A15 runs south towards Sleaford and north towards Scunthorpe.

Lincoln moves can differ by postcode, from Cathedral Quarter restrictions to North Hykeham estates. Your request helps a verified mover review route, parking, access and item details before sending quote options.`,
    faq: [
      { q: "Do you cover all areas of Lincoln?", a: "Yes. You can submit a move request for the Cathedral Quarter, Brayford, North Hykeham, Bracebridge Heath, Boultham, Waddington and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Lincoln?", a: "Lincoln man and van hourly rates in 2026 start from £50 per hour, with full-day costs around £350–£500 depending on van size, crew, stairs, parking and access. A single-item furniture collection starts from £50, while a full house move from a 3-bed property could range from £250–£500. Your final quote depends on postcodes, item list, route time, helpers, parking and access — submit your details for a guide price first." },
      { q: "Can I find a mover for a same-day move in Lincoln?", a: "Same-day moves may be possible in Lincoln depending on mover availability. Submit your request and a verified mover can review the details if they have space to help." },
      { q: "Will multiple movers contact me?", a: "No. That is exactly what makes us different. Your enquiry is offered to one mover at a time. You will not receive a flood of calls or emails from multiple competing companies." },
      { q: "Is it free to submit a move request?", a: "Yes. It is free to submit your move request. You only pay a booking deposit if you accept a mover quote. The booking deposit is deducted from the mover's quote, and you pay the remaining balance directly to the mover on moving day." },
      { q: "How quickly will I be contacted?", a: "After you submit your request, a verified mover can review your anonymised move details and send quote options if they can help. Your contact details are only released after you accept a quote and pay the booking deposit." },
      { q: "Can a van access Steep Hill and the Cathedral Quarter?", a: "Steep Hill and the Cathedral Quarter have restricted access, narrow streets and loading time limits. Adding your exact address, floor level and any access restrictions helps a mover plan the best approach before quoting." },
      { q: "Do you cover North Hykeham and Bracebridge Heath?", a: "Yes. You can submit requests for North Hykeham, Bracebridge Heath, Waddington, Boultham, Skellingthorpe and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "How much does a man and van cost from Lincoln to Nottingham?", a: "A Lincoln to Nottingham man and van move in 2026 typically costs £100–£200 depending on load size, access at both addresses and time of day. The A46 provides the main route between the two cities. Submit your postcodes and item list for a guide price." },
    ],
    localAreaGuides: [
      {
        title: "Man and van North Hykeham",
        body: "North Hykeham is a growing area south of Lincoln with a mix of post-war homes and newer estates. The A46 bypass and Newark Road connect it to Lincoln, but both routes create rush-hour congestion.",
        links: [
          { label: "Man and van North Hykeham", href: "/man-and-van-north-hykeham" },
        ],
      },
      {
        title: "Student moves at the University of Lincoln",
        body: "Student moves cluster around the Brayford campus. Peak demand is June, July and September. Add your full item list, halls or house address and preferred dates for a verified mover to review.",
        links: [
          { label: "Student removals", href: "/student-removals" },
        ],
      },
      {
        title: "Cathedral Quarter and Steep Hill moves",
        body: "The Cathedral Quarter has some of the narrowest streets in any English city. Add exact address, loading restrictions, floor level and whether items need carrying up Steep Hill so the mover can quote properly.",
      },
    ],
  },
};
