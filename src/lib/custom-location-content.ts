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
    title: "Man and Van Birmingham | Verified Mover Quotes",
    description: "Man and van Birmingham from £50/hr. One verified mover quotes — no multiple companies. Edgbaston, Selly Oak, Moseley, Harborne, Sutton Coldfield.",
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
    title: "Man and Van Walsall | Verified Mover Quotes",
    description: "Man and van Walsall from £50/hr. One verified mover quotes — no multiple companies. Aldridge, Bloxwich, Willenhall, Darlaston, Pelsall.",
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
    title: "Man and Van Coventry | Verified Mover Quotes",
    description: "Man and van Coventry from £50/hr. One verified mover quotes. Earlsdon, Tile Hill, Stoke, Kenilworth, Binley.",
    localMovingInfo: `Coventry is a city rebuilt with ambition, blending post-war rebuild housing, modern developments, and established suburban areas. From the city centre apartments to the family homes of Earlsdon and Kenilworth, Coventry moves require local knowledge of the ring road, the one-way system, and the distinct character of each neighbourhood.\n\nThe city centre ring road and central one-way systems can complicate access for larger vehicles, so detailed postcode and loading notes help a mover plan before quoting. The M6 and M69 motorways create heavy traffic around the city, particularly during rush hours at junctions 2 and 3. The post-war estates of Tile Hill and Allesley have narrow roads and limited parking, while the newer developments around the Ricoh Arena and the university have better access but require knowledge of the local road network. Student moves are concentrated around the university areas of Earlsdon and Stoke, while family relocations frequently move to the south-west suburbs and nearby villages.\n\nCoventry moves can involve ring-road access, post-war estates, Victorian terraces or newer city-centre developments. Your request lets a verified mover review the route, access and item list before sending quote options.`,
    faq: [
      { q: "Do you cover all areas of Coventry?", a: "Yes. You can submit a move request for Earlsdon, Tile Hill, Stoke, Binley, Coundon, Cheylsmore, Whoberley, Kenilworth and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Coventry?", a: "Coventry man and van rates in 2026 start from £50 per hour. A local move within CV1 — say from the city centre to Earlsdon — typically costs £60–£120 depending on furniture, stairs and ring-road timing. A full house move from a 3-bed Coventry semi could range from £250–£450. Submit your CV postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Coventry?", a: "Same-day moves in Coventry may be possible depending on mover availability. A mover already working near the university or the Ricoh Arena might be free. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your Coventry request goes to one verified mover — your contact details are not shared with other companies. They stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that is deducted from the total. The remaining balance goes to the mover on moving day. A mover can review your CV postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover reviews your Coventry move details — postcodes, items, access, date — and sends quote options. Your contact details stay private until you accept. Movers covering the M6 and M69 corridors around Coventry review local requests regularly." },
      { q: "Do you cover Earlsdon, Tile Hill and Kenilworth?", a: "Yes. You can submit requests for Earlsdon, Tile Hill, Kenilworth, Binley, Coundon, Cheylsmore, Whoberley and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Coventry movers insured?", a: "Movers on the platform must hold Goods in Transit and Public Liability insurance. When you receive a quote for your Coventry move, confirm their cover before booking." },
      { q: "Does the Coventry ring road affect move timing?", a: "Yes. The Coventry ring road is a one-way system that encircles the city centre, and access to many central streets requires exiting at specific junctions. If your property is inside the ring road, mention which junction is closest so the mover can plan the approach. Properties outside the ring road in Earlsdon and Tile Hill are more straightforward." },
      { q: "How much does a man and van cost from Coventry to Birmingham?", a: "A Coventry to Birmingham move in 2026 typically costs £80–£160 depending on load size, access and time of day. The M6 and A45 provide the main routes, around 25–35 minutes outside rush hour. A single-item collection might start from £50–£80. Submit your postcodes for a guide price." },
    ],
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
    title: "Man and Van Northampton | Verified Mover Quotes",
    description: "Man and van Northampton from £50/hr. One verified mover quotes — no multiple companies. Kingsthorpe, Duston, Abington, Wootton, Hunsbury.",
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
    title: "Man and Van Lincoln | Verified Mover Quotes",
    description: "Man and van Lincoln from £50/hr. One verified mover quotes — no multiple companies. Cathedral Quarter, Brayford, North Hykeham, Bracebridge Heath.",
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

  // ──────────────────────────────────────────
  // ARNOLD (Nottingham NG5)
  // ──────────────────────────────────────────
  arnold: {
    localMovingInfo: `Arnold sits in the NG5 postcode district north of Nottingham city centre, stretching from the older streets around Daybrook and the market area to the newer estates towards Calverton and Killisick. The A60 Mansfield Road is the main route through Arnold and the biggest factor in move timing — it carries heavy commuter traffic between Nottingham and Mansfield, particularly around Arnold town centre and the schools near Killisick Road. Residential crescents off Mansfield Road, built in the 1930s–1960s, can have tight turning circles that limit van size. Daybrook, on the southern edge of Arnold near Sherwood, has older terraces with on-street parking, while the estates towards Bestwood and Calverton tend to have driveways but more furniture volume in larger family homes. A verified mover reviewing an Arnold request will look at whether the property is on the main A60 corridor (faster access, more parking) or on a quieter estate road (wider access, but further from the main route).`,
    faq: [
      { q: "Do you cover all areas of Arnold?", a: "Yes. You can submit a move request for Daybrook, Sherwood, Redhill, Bestwood, Calverton, Woodthorpe, Killisick and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Arnold?", a: "Arnold man and van rates in 2026 start from £50 per hour. A move within NG5 — say from Daybrook to Sherwood — typically costs £70–£130 depending on how much furniture, whether there are stairs and if the A60 Mansfield Road is clear at the time. A full day covering a larger family home in Arnold with a trip across Nottingham could run £350–£500. Add your NG5 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Arnold?", a: "Same-day moves in the NG5 area may be possible if a verified mover is free. Arnold is well placed on the A60 north of Nottingham city centre, so a mover already working in Sherwood or Daybrook might be able to reach you quickly. Submit your request with the correct postcodes and timing and a mover will review it." },
      { q: "Will multiple movers contact me?", a: "No. Man and Van Club works differently from lead-selling sites. Your Arnold move request goes to one verified mover, not a list of companies. Your phone number and email stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that comes off the mover's price. The remaining balance goes directly to the mover on moving day. For an Arnold move, a verified mover reviews your NG5 postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover can review your anonymised Arnold move details — postcodes, item list, access notes, preferred date — and send quote options. Your contact details stay hidden until you accept a quote and pay the booking deposit. Movers working the A60 corridor between Nottingham and Mansfield review local requests regularly." },
      { q: "Do you cover Nottingham City Centre, Sherwood and Daybrook?", a: "Yes. You can submit requests for Daybrook, Sherwood, Redhill, Bestwood, Calverton, Woodthorpe, Killisick and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Arnold movers insured?", a: "Approved movers on the platform must hold Goods in Transit and Public Liability insurance before they can access customer requests. When a mover sends you a quote for your Arnold move, you can ask them to confirm their cover details before booking." },
      { q: "Can a van get down the residential crescents off Mansfield Road?", a: "Some of the crescents off Mansfield Road in Arnold were built with narrow access and tight turning circles. If your property is on a cul-de-sac, mention this in your request so the mover can bring a smaller van if needed. NG5 postcodes near Daybrook and Redhill tend to have wider access." },
      { q: "How much is a man and van from Arnold to Nottingham city centre?", a: "An Arnold to Nottingham city centre move in 2026 typically costs £60–£120 depending on load size, stairs and whether the A60 is congested. The route is only 3–4 miles but can take 20–40 minutes in rush hour. Add both postcodes and your item list for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // HUCKNALL (Nottingham NG15)
  // ──────────────────────────────────────────
  hucknall: {
    localMovingInfo: `Hucknall occupies the NG15 postcode area north of Nottingham, best known as the terminus of the Nottingham Express Transit tram line and as the former mining town where Lord Byron is buried at St Mary Magdalene Church. The A611 is the main road through Hucknall and the single biggest factor in move timing — it carries commuter traffic between Nottingham and the Ashfield district, and congestion around the town centre and tram terminus is common during peak hours. The tram terminus on Station Road also creates parking restrictions for nearby streets. Properties near Hucknall town centre tend to be Victorian terraces with on-street parking and narrower access, while the post-war and new-build estates towards Linby, Papplewick and Calverton offer driveways and wider roads but involve more furniture. The M1 at junction 27 is about 3 miles east of Hucknall, making it a key route for longer-distance moves towards Mansfield, Chesterfield or the north. A verified mover reviewing a Hucknall request will consider whether the property is near the congested A611 corridor or on the quieter estates, and whether the tram terminus parking restrictions affect loading.`,
    faq: [
      { q: "Do you cover all areas of Hucknall?", a: "Yes. You can submit a move request for Bulwell, Bestwood, Annesley, Kirkby-in-Ashfield, Sutton-in-Ashfield, Linby, Papplewick, Calverton and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Hucknall?", a: "Hucknall man and van rates in 2026 start from £50 per hour. A local move within NG15 — for example from the town centre to Annesley — typically costs £60–£120. A longer run from Hucknall to Nottingham city centre might cost £70–£140 depending on the A611 traffic. Full-day rates for a larger home move covering the NG15 area and a destination further afield run around £350–£500. Submit your postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Hucknall?", a: "Same-day moves in the NG15 area may be possible depending on mover availability. Hucknall's tram terminus means movers working the Nottingham-to-Hucknall route are regularly in the area. Submit your request with both postcodes and your preferred time." },
      { q: "Will multiple movers contact me?", a: "No. Unlike lead-selling sites, your Hucknall move request is seen by one verified mover — not broadcast to multiple companies. Your personal details remain private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting a move request is free. You only pay a booking deposit if you choose to accept a mover's quote, and that deposit is deducted from the total. The balance is paid to the mover on moving day. A mover can review your NG15 postcodes, item list and access notes before deciding whether to quote." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover can review your Hucknall request — postcodes, items, access notes and date — and send quote options. Your contact details stay hidden until you accept. Movers working the A611 corridor between Hucknall and Nottingham, or heading towards the M1 at junction 27, regularly review requests in the NG15 area." },
      { q: "Do you cover Bulwell, Bestwood and Annesley?", a: "Yes. You can submit requests for Bulwell, Bestwood, Annesley, Kirkby-in-Ashfield, Sutton-in-Ashfield, Linby, Papplewick, Calverton and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Hucknall movers insured?", a: "Movers approved on the platform must hold Goods in Transit and Public Liability insurance. When you receive a quote for your Hucknall move, you can ask the mover to confirm their insurance details before you book." },
      { q: "Can a van park near the tram terminus in Hucknall?", a: "The tram terminus area on Station Road has restricted parking, and the streets immediately around it can be tight for larger vans. If you are moving from a property near the terminus, add parking notes and whether a permit is needed. Properties further out towards Linby and Papplewick generally have easier van access." },
      { q: "How much does a man and van cost from Hucknall to Mansfield?", a: "A Hucknall to Mansfield man and van move in 2026 typically costs £80–£150 depending on load size, access and route. The A60 connects the two towns in around 20 minutes outside peak hours. A single-item collection might start from £50–£70. Submit your postcodes and item list for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // OADBY (Leicester LE2)
  // ──────────────────────────────────────────
  oadby: {
    localMovingInfo: `Oadby sits in the LE2 postcode south of Leicester city centre, best known for the University of Leicester halls along University Road and the leafy residential streets of Stoneygate and Knighton. The A6 London Road is the main route through Oadby and the dominant factor in move timing — it carries heavy commuter traffic between Leicester and Market Harborough, particularly at the junction with the A563 ring road. Tree-lined streets in the Stoneygate conservation area have mature trees that can restrict van access and overhang clearance, while the larger detached homes along the A6 corridor tend to have driveways but more furniture to move. Student moves peak around the University of Leicester halls in June, July and September, when parking near the halls is particularly restricted. Family moves in Oadby typically involve larger loads from semi-detached and detached homes, especially in the roads off Stoughton Lane and towards Great Glen. A verified mover reviewing an Oadby request will look at whether the property is on the A6 corridor (good access, busy traffic) or on a quieter side street (possible tree clearance issues, better parking).`,
    faq: [
      { q: "Do you cover all areas of Oadby?", a: "Yes. You can submit a move request for Stoneygate, Evington, Wigston, Knighton, Blaby, Great Glen, Scraptoft, Thurnby and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Oadby?", a: "Oadby man and van rates in 2026 start from £50 per hour. A local move within LE2 — for instance from Stoneygate to the university area — typically costs £70–£130 depending on furniture volume and whether the property has driveway access. A full house move from a larger Oadby family home could range from £300–£550 because of the furniture volume in detached and semi-detached properties. Submit your LE2 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Oadby?", a: "Same-day moves in the LE2 area may be possible. Oadby is well connected via the A6 London Road and the A563 ring road, so a mover already working in Stoneygate or Evington might be able to reach you. Submit your request with timing and postcodes." },
      { q: "Will multiple movers contact me?", a: "No. Man and Van Club does not send your details to multiple companies. One verified mover reviews your Oadby request. Your phone number and email are only shared after you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that is deducted from the mover's total. The remaining balance goes to the mover on moving day. A verified mover can review your LE2 postcodes, access notes and furniture list before quoting." },
      { q: "How quickly will I be contacted?", a: "Once you submit, a verified mover can review your Oadby move details — postcodes, item list, property access and preferred date — and send quote options. Your contact details stay private until you accept a quote. Movers covering the A6 London Road corridor between Oadby and Leicester city centre review local requests frequently." },
      { q: "Do you cover Stoneygate, Evington and Wigston?", a: "Yes. You can submit requests for Stoneygate, Evington, Wigston, Knighton, Blaby, Great Glen, Scraptoft, Thurnby and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Oadby movers insured?", a: "Approved movers must carry Goods in Transit and Public Liability insurance before they can access requests. When you receive a quote for your Oadby move, you can confirm the mover's insurance details before committing." },
      { q: "Is parking difficult near the University of Leicester halls in Oadby?", a: "University of Leicester halls around Oadby and Stoneygate can have restricted parking, especially during September move-in and June move-out. If you are moving near the halls, mention whether you have a parking permit or whether on-street loading is possible. Properties on the tree-lined streets off the A6 often have driveways." },
      { q: "How much does a man and van cost from Oadby to Leicester city centre?", a: "An Oadby to Leicester city centre move in 2026 typically costs £60–£120 depending on load size and access at both addresses. The A6 London Road connects Oadby to the city in around 10–15 minutes outside rush hour. A single-item collection might start from £50–£70. Submit your postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // WIGSTON (Leicester LE18)
  // ──────────────────────────────────────────
  wigston: {
    localMovingInfo: `Wigston and South Wigston sit in the LE18 postcode south of Leicester, separated by the railway line that creates a natural divide between the two areas. Wigston itself centres on Bell Street and the A5199 Welford Road, with Victorian terraces near the old town and 1930s semis spreading out towards Blaby and Glen Parva. South Wigston, south of the railway, has tighter terraced streets and older estate roads that can challenge larger vans. The A5199 Welford Road is the main route into Leicester and the single biggest variable in move timing — it carries commuter traffic between Leicester and the Harborough district, and the B582 bypass can also be busy around school hours. The railway bridge on Welford Road can restrict taller vehicles. Wigston has a regular market on Bell Street that creates additional parking restrictions on market days. Properties towards Blaby and Countesthorpe tend to be newer builds with driveways, while the older streets near the town centre have on-street parking. A verified mover reviewing a Wigston request will check whether the property is north or south of the railway line, whether it is near the congested A5199, and whether market-day parking affects loading.`,
    faq: [
      { q: "Do you cover all areas of Wigston?", a: "Yes. You can submit a move request for South Wigston, Oadby, Blaby, Glen Parva, Countesthorpe, Whetstone, Enderby, Kibworth and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Wigston?", a: "Wigston man and van rates in 2026 start from £50 per hour. A local move within LE18 — say from South Wigston to Blaby — typically costs £60–£120 depending on furniture, stairs and whether the A5199 Welford Road is clear. A full house move from a 3-bed Wigston semi could range from £250–£450. Submit your LE18 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Wigston?", a: "Same-day moves in the LE18 area may be possible if a mover is free. Wigston sits on the A5199 Welford Road south of Leicester, so a mover already working in Oadby or Blaby might be nearby. Submit your request with timing and postcodes." },
      { q: "Will multiple movers contact me?", a: "No. Your Wigston move request goes to one verified mover, not a list of competing companies. Your contact details stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that comes off the total. The remaining balance is paid to the mover on moving day. A verified mover can review your LE18 postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover can review your Wigston move details — postcodes, items, property access, date — and send quote options. Your contact details stay hidden until you accept. Movers working the A5199 corridor between Wigston and Leicester, or towards the M1 at junction 21, regularly review local requests." },
      { q: "Do you cover South Wigston, Oadby and Blaby?", a: "Yes. You can submit requests for South Wigston, Oadby, Blaby, Glen Parva, Countesthorpe, Whetstone, Enderby, Kibworth and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Wigston movers insured?", a: "Movers on the platform must hold Goods in Transit and Public Liability insurance before they can see customer requests. When you get a quote for your Wigston move, you can ask the mover to confirm their cover before booking." },
      { q: "What is the difference between Wigston and South Wigston for moving?", a: "Wigston (LE18) is the larger area north of the railway line, with a mix of Victorian terraces near the town centre and 1930s semis on the surrounding estates. South Wigston, on the other side of the line, has narrower streets and tighter access for vans. If your property is in South Wigston, mention any parking or access restrictions in your request so the mover can plan accordingly." },
      { q: "How much does a man and van cost from Wigston to Leicester city centre?", a: "A Wigston to Leicester city centre move in 2026 typically costs £60–£110 depending on load and access. The A5199 Welford Road connects the two in around 10–15 minutes outside rush hour. A single-item collection might start from £50–£70. Submit both postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // KINGSTHORPE (Northampton NN2)
  // ──────────────────────────────────────────
  kingsthorpe: {
    localMovingInfo: `Kingsthorpe occupies the NN2 postcode north of Northampton town centre, with a distinct village identity centred on the old high street and St John the Baptist Church. The A508 Welford Road is the main route through Kingsthorpe and the key factor in move timing — it carries commuter traffic between Northampton and the northern villages, and congestion near the Kingsthorpe shops and schools is common during peak hours. Kingsthorpe Village itself has Victorian terraces with narrow street access and limited on-street parking, particularly around the high street and Harborough Road. Further north towards Boothville and Moulton, the roads widen and properties tend to have driveways, but furniture volumes are larger in family homes. The A43 Kettering Road runs parallel to the east and connects to the A45, making it an alternative route for moves heading towards the M1. A verified mover reviewing a Kingsthorpe request will look at whether the property is in the tighter Village area (where a smaller van may be needed) or on the wider estates towards Moulton (where access is easier but loads are bigger).`,
    faq: [
      { q: "Do you cover all areas of Kingsthorpe?", a: "Yes. You can submit a move request for Kingsthorpe Village, Kingsthorpe Hollow, Dallington, Obelisk, Northampton Town Centre, Boothville, Sywell, Moulton and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Kingsthorpe?", a: "Kingsthorpe man and van rates in 2026 start from £50 per hour. A move within the NN2 area — for example from the Village to Boothville — typically costs £60–£120 depending on furniture volume and whether the A508 Welford Road is congested. A full house move from a 3-bed Kingsthorpe semi could range from £250–£450. Submit your NN2 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Kingsthorpe?", a: "Same-day moves in the NN2 area may be possible. Kingsthorpe is on the A508 north of Northampton town centre, so a mover already working in Kingsthorpe Village or Boothville might be able to help. Submit your request with postcodes and preferred timing." },
      { q: "Will multiple movers contact me?", a: "No. Man and Van Club sends your Kingsthorpe request to one verified mover, not to multiple companies. Your personal details remain hidden until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay a booking deposit if you accept a quote, and that deposit is deducted from the mover's total. The balance goes to the mover on moving day. A mover can review your NN2 postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover reviews your Kingsthorpe move details — postcodes, items, access, date — and sends quote options. Your contact details stay private until you accept. Movers covering the A508 corridor between Kingsthorpe and Northampton town centre review local requests regularly." },
      { q: "Do you cover Kingsthorpe Village, Kingsthorpe Hollow and Dallington?", a: "Yes. You can submit requests for Kingsthorpe Village, Kingsthorpe Hollow, Dallington, Obelisk, Boothville, Moulton and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Kingsthorpe movers insured?", a: "Movers approved on the platform must carry Goods in Transit and Public Liability insurance. When you receive a quote for your Kingsthorpe move, confirm the mover's insurance details before you book." },
      { q: "Can a van get down the older streets in Kingsthorpe Village?", a: "Kingsthorpe Village has some of the narrowest streets in Northampton, with Victorian terraces along the old high street that have on-street parking only. If your property is in the Village conservation area, mention this so the mover can plan for a smaller van or allow extra loading time. Properties towards Boothville and Moulton have wider roads and driveway access." },
      { q: "How much does a man and van cost from Kingsthorpe to Northampton town centre?", a: "A Kingsthorpe to Northampton town centre move in 2026 typically costs £50–£100 depending on load size and access. The A508 Welford Road connects the two in around 5–10 minutes outside rush hour. A single-item collection might start from £50. Submit both postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // ABINGTON (Northampton NN1)
  // ──────────────────────────────────────────
  abington: {
    localMovingInfo: `Abington occupies the NN1 postcode just north-east of Northampton town centre, built around the green space of Abington Park and the busy commercial strip of the Wellingborough Road. The area is dominated by Victorian and Edwardian terraces that present specific moving challenges: narrow front doors, steep staircases with tight turns at the top, and no driveway access — all loading and unloading happens from the street. The Wellingborough Road (A508) creates regular traffic that can make parking a van difficult during business hours, especially near the shops and restaurants. Abington Park itself has parking restrictions on surrounding roads. Properties on the streets between Abington Park and the town centre — Abington Street, Abington Vale, Semilong — have the tightest access, while the roads towards Weston Favell and Boothville gradually open up. Many Abington moves involve carrying furniture up two or three flights of stairs, which significantly affects the time and therefore the quote. A verified mover reviewing an Abington request will pay particular attention to the number of floors, stair width, and whether on-street loading is possible on the specific street.`,
    faq: [
      { q: "Do you cover all areas of Abington?", a: "Yes. You can submit a move request for Abington Park, Abington Vale, Semilong, Wellingborough Road, Weston Favell, Kingsthorpe, Boothville, Town Centre and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Abington?", a: "Abington man and van rates in 2026 start from £50 per hour. A move within the NN1 area — say from Abington Park to the Wellingborough Road — typically costs £60–£120 depending on stairs, on-street parking and furniture volume. Victorian and Edwardian properties in Abington often have more stairs and narrower doorways than newer builds, which can add to the time. Submit your NN1 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Abington?", a: "Same-day moves in the NN1 area may be possible. Abington is close to Northampton town centre, so a mover already working nearby on the Wellingborough Road or in Semilong might be able to help quickly. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your Abington request goes to one verified mover — your phone number and email are not shared with multiple companies. Your details stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, it is free to submit. You only pay a booking deposit if you accept a mover's quote, and that comes off the total. The remaining balance goes to the mover on the day. A mover will review your NN1 postcodes, property access notes and furniture list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover reviews your Abington move details — postcodes, items, access (especially stairs and parking), and date — then sends quote options. Your contact details are hidden until you accept. Movers working the Wellingborough Road and Abington Park area cover NN1 requests frequently." },
      { q: "Do you cover Abington Park, Abington Vale and Semilong?", a: "Yes. You can submit requests for Abington Park, Abington Vale, Semilong, Wellingborough Road, Weston Favell, Kingsthorpe, Boothville and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Abington movers insured?", a: "Movers on the platform must carry Goods in Transit and Public Liability insurance. When you receive a quote for your Abington move, you can check their insurance details before committing." },
      { q: "Are the Victorian terraces in Abington hard to move in and out of?", a: "Abington's Victorian and Edwardian terraces often have narrow doorways, steep staircases and no driveway — meaning on-street parking and carrying furniture through tight hallways. Add the number of floors, any bay-window restrictions and whether furniture needs dismantling so the mover can quote accurately. Properties near Abington Park tend to have the tightest access." },
      { q: "How much does a man and van cost from Abington to Northampton town centre?", a: "Abington to Northampton town centre is a short move — typically £50–£90 depending on furniture volume and whether there are stairs at either address. The distance is under a mile along the Wellingborough Road. A single-item collection might start from £50. Submit both postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // CHADDESDEN (Derby DE21)
  // ──────────────────────────────────────────
  chaddesden: {
    localMovingInfo: `Chaddesden occupies the DE21 postcode on Derby's eastern side, split between the older post-war estates near the A52 Nottingham Road and the newer Oakwood development to the north-east. The A52 is the dominant factor in any Chaddesden move — it carries commuter traffic between Derby and Nottingham, and the Nottingham Road stretch through Chaddesden is frequently congested at peak times. Older Chaddesden has post-war semis and council estates with narrower roads, limited driveways and on-street parking near Chaddesden Lane and the local shops. The Oakwood estate, built from the 1990s onwards, has wider estate roads, driveway access and larger family homes with more furniture volume. Spondon, immediately south of Chaddesden, sits between the A52 and the railway line and has a mix of terraces and semis. Borrowash, further east along the A52, is a popular destination for moves heading towards Nottingham. A verified mover reviewing a Chaddesden request will check whether the property is in older Chaddesden (tighter access, more stairs) or Oakwood (wider roads, larger loads) and plan the A52 timing accordingly.`,
    faq: [
      { q: "Do you cover all areas of Chaddesden?", a: "Yes. You can submit a move request for Chaddesden Village, Spondon, Oakwood, Alvaston, Borrowash, Draycott, Ockbrook, Nottingham Road area and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Chaddesden?", a: "Chaddesden man and van rates in 2026 start from £50 per hour. A local move within the DE21 area — for example from older Chaddesden to the newer Oakwood estate — typically costs £60–£130 depending on furniture, stairs and whether the A52 Nottingham Road is congested. A full house move from a 3-bed Chaddesden semi could range from £250–£450. Submit your DE21 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Chaddesden?", a: "Same-day moves in the DE21 area may be possible. Chaddesden sits on the A52 east of Derby, so a mover working along the Nottingham Road corridor might be available. Submit your request with both postcodes and preferred time." },
      { q: "Will multiple movers contact me?", a: "No. Your Chaddesden request is reviewed by one verified mover, not sent to multiple companies. Your personal details stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that comes off the mover's total. The balance is paid to the mover on moving day. A mover can review your DE21 postcodes, access notes and furniture list before quoting." },
      { q: "How quickly will I be contacted?", a: "Once you submit, a verified mover reviews your Chaddesden request — postcodes, items, property access and date — and sends quote options. Your contact details stay hidden until you accept. Movers covering the A52 corridor between Derby and Nottingham frequently pick up Chaddesden requests." },
      { q: "Do you cover Spondon, Oakwood and Alvaston?", a: "Yes. You can submit requests for Spondon, Oakwood, Alvaston, Borrowash, Draycott, Ockbrook and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Chaddesden movers insured?", a: "Movers on the platform must carry Goods in Transit and Public Liability insurance. When you receive a quote for your Chaddesden move, confirm their insurance details before you book." },
      { q: "Is Oakwood easier to move in and out of than older Chaddesden?", a: "Yes. The Oakwood development, north-east of the older Chaddesden area, has wider roads, driveways and modern estate layouts. Older Chaddesden near Nottingham Road has post-war semis with tighter access, smaller drives and narrower streets. Mention your specific part of Chaddesden in the request so the mover can plan accordingly." },
      { q: "How much does a man and van cost from Chaddesden to Nottingham?", a: "A Chaddesden to Nottingham move in 2026 typically costs £70–£140 depending on load and access at both addresses. The A52 connects the two in around 25–30 minutes outside rush hour. A single-item collection might start from £50–£80. Submit your postcodes and item list for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // ALVASTON (Derby DE24)
  // ──────────────────────────────────────────
  alvaston: {
    localMovingInfo: `Alvaston occupies the DE24 postcode on Derby's south-eastern side, stretching from the A6 London Road corridor to the post-war estates around Alvaston Park and Boulton. The A6 London Road is the primary route through Alvaston and the main variable in move timing — it carries heavy traffic between Derby and the south, particularly at the junction with the A5111 and near Pride Park stadium on match days. The older estates around Alvaston Park have road layouts dating from the 1940s–1960s, with narrower streets, limited driveways and on-street parking near the park and local shops. The newer developments towards Shelton Lock have wider roads and better access. Allenton, to the west, sits between Alvaston and the city centre with a mix of terraces and semis. Boulton Lane is a key residential road that connects the estates and creates school-run congestion. A verified mover reviewing an Alvaston request will consider whether the property is on the busy A6 corridor (good access but traffic) or on the quieter estate roads (tighter turns, more parking constraints) and whether Pride Park event traffic affects the route.`,
    faq: [
      { q: "Do you cover all areas of Alvaston?", a: "Yes. You can submit a move request for Alvaston Park, Boulton, Allenton, Shelton Lock, Elvaston, Draycott, Spondon, Chaddesden and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Alvaston?", a: "Alvaston man and van rates in 2026 start from £50 per hour. A local move within the DE24 area — say from Alvaston Park to Shelton Lock — typically costs £60–£120 depending on access and whether the A6 London Road is congested. A full house move from a 3-bed Alvaston semi could range from £250–£450. Submit your DE24 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Alvaston?", a: "Same-day moves in the DE24 area may be possible. Alvaston sits on the A6 south-east of Derby city centre, so a mover already working on London Road or near Pride Park might be available. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Man and Van Club does not share your details with multiple companies. One verified mover reviews your Alvaston request, and your contact details stay hidden until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay a booking deposit if you accept a quote, and that deposit is deducted from the total. The remaining balance goes to the mover on moving day. A mover will review your DE24 postcodes, property access and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover reviews your Alvaston move details — postcodes, items, access, date — and sends quote options. Your contact details stay private until you accept. Movers covering the A6 London Road corridor between Alvaston and Derby city centre, or heading towards the A52 and M1, review local requests." },
      { q: "Do you cover Alvaston Park, Boulton and Allenton?", a: "Yes. You can submit requests for Alvaston Park, Boulton, Allenton, Shelton Lock, Elvaston, Draycott, Spondon, Chaddesden and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Alvaston movers insured?", a: "Movers on the platform must hold Goods in Transit and Public Liability insurance. When you receive a quote for your Alvaston move, confirm their cover before booking." },
      { q: "Is parking difficult near Alvaston Park?", a: "Alvaston Park and the surrounding older estate roads can have limited parking, particularly near the park entrance and the shops on Boulton Lane. If your property is on the older estates near the park, mention whether there is a driveway or whether on-street loading is needed. Properties towards Shelton Lock and Allenton tend to have easier access." },
      { q: "How much does a man and van cost from Alvaston to Derby city centre?", a: "An Alvaston to Derby city centre move in 2026 typically costs £50–£100 depending on load and access. The A6 London Road connects the two in around 10 minutes outside rush hour, though the route passes near Pride Park which can add delay on match days. A single-item collection might start from £50. Submit both postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // MICKLEOVER (Derby DE3)
  // ──────────────────────────────────────────
  mickleover: {
    localMovingInfo: `Mickleover occupies the DE3 postcode on Derby's western edge, centred on the old village around Uttoxeter Road and stretching to the newer Kingway estate towards Findern. The A38 is the key route consideration — it connects Mickleover to Derby city centre (via the roundabout junction) and heads south towards Burton-on-Trent, Lichfield and Birmingham. The A38 roundabout at Mickleover can create significant delay during rush hour, and school-run traffic around Mickleover Court Road and St Mary's Wharf adds to morning and afternoon congestion. Mickleover properties tend to be larger — detached and semi-detached family homes from the 1930s through to modern executive builds on the Kingway development — which means furniture volumes are higher than average. The old village has tighter streets with some parking constraints, while Kingway has wide estate roads and driveway access. Findern and Willington to the south-west are popular destinations for movers heading out of Derby along the A516. A verified mover reviewing a Mickleover request will factor in the larger load, the A38 junction timing, and whether the property is in the village (tighter access) or on the newer estates (wider roads, more furniture).`,
    faq: [
      { q: "Do you cover all areas of Mickleover?", a: "Yes. You can submit a move request for Mickleover Village, Kingway, Littleover, Findern, Etwall, Repton, Harton, Willington and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Mickleover?", a: "Mickleover man and van rates in 2026 start from £50 per hour. A local move within the DE3 area — for example from Mickleover Village to the Kingway estate — typically costs £70–£140 depending on furniture volume, as family homes here tend to have larger loads. A full house move from a 4-bed Mickleover detached property could range from £350–£550. Submit your DE3 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Mickleover?", a: "Same-day moves in the DE3 area may be possible. Mickleover is on the A38 western side of Derby, so a mover already working in Littleover or towards the A50 might be nearby. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your Mickleover move request goes to one verified mover — your phone number and email are not shared with competing companies. Your details stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that is deducted from the total. The remaining balance goes to the mover on moving day. A mover can review your DE3 postcodes, access notes and furniture list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover reviews your Mickleover move details — postcodes, items, property access, date — and sends quote options. Your contact details stay hidden until you accept. Movers working the A38 corridor between Mickleover, Derby city centre and the A50 review local requests regularly." },
      { q: "Do you cover Kingway, Findern and Littleover?", a: "Yes. You can submit requests for Kingway, Littleover, Findern, Etwall, Repton, Harton, Willington and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Mickleover movers insured?", a: "Movers on the platform must hold Goods in Transit and Public Liability insurance. When you receive a quote for your Mickleover move, you can confirm their cover before booking." },
      { q: "Do Mickleover moves take longer because of the furniture volume?", a: "They can. Mickleover has a high proportion of larger detached and semi-detached family homes, which means more furniture, more boxes and sometimes more dismantling. A 4-bed Mickleover move might take 5–7 hours compared to 3–4 hours for a 2-bed flat closer to the city centre. Add your full item list and any dismantling needs so the mover can quote accurately." },
      { q: "How much does a man and van cost from Mickleover to Birmingham?", a: "A Mickleover to Birmingham move in 2026 typically costs £180–£350 depending on load size, access at both addresses and time of day. The A38 and M6 Toll provide the main route, around 45–60 minutes outside peak hours. A single-item collection might start from £80–£120. Submit your postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // LITTLEOVER (Derby DE3)
  // ──────────────────────────────────────────
  littleover: {
    localMovingInfo: `Littleover sits in the DE3 postcode south-west of Derby, with a distinct village identity centred on the shops and pubs along St Peter's Street and the war memorial. The A38 runs along the eastern edge, with the Littleover roundabout providing the main junction access — and the main source of traffic delay during rush hour. Blagreaves Lane runs through the heart of Littleover and is notable for its steep gradients; streets branching off it, particularly towards Sunnyhill and Stenson Fields, include some of the hilliest residential roads in Derby, which affects van positioning and loading time. The old village has 1930s semis with tighter streets, while the Heatherton Village development to the south has modern executive homes with driveway access and larger furniture volumes. Stenson Fields, further south, is a newer estate with good access. Littleover's good schools mean family moves are common, typically involving larger loads and more careful handling of furniture. A verified mover reviewing a Littleover request will consider whether the property is on a steep Blagreaves Lane side-street (needs careful van positioning), in the flatter village centre (easier access), or in Heatherton Village (wider roads, larger loads).`,
    faq: [
      { q: "Do you cover all areas of Littleover?", a: "Yes. You can submit a move request for Littleover Village, Heatherton Village, Sunnyhill, Derby City Centre, Findern, Etwall, Stenson Fields, Blagreaves and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Littleover?", a: "Littleover man and van rates in 2026 start from £50 per hour. A local move within the DE3 area — for instance from Littleover Village to Heatherton Village — typically costs £70–£140 depending on stairs and furniture volume. Littleover has many executive homes, so a full house move from a 4-bed property could range from £350–£550. Submit your DE3 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Littleover?", a: "Same-day moves in the DE3 area may be possible. Littleover is on the A38 south-west of Derby, so a mover already in Mickleover or heading towards the A50 might be available. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Unlike lead-selling sites, Man and Van Club sends your Littleover request to one verified mover. Your contact details are not shared with other companies. They stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, it is free to submit. You only pay a booking deposit if you accept a quote, and that deposit comes off the total. The remaining balance goes to the mover on moving day. A mover will review your DE3 postcodes, access notes and furniture list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover reviews your Littleover move details — postcodes, items, property access, date — and sends quote options. Your contact details stay private until you accept. Movers working the A38 and Blagreaves Lane corridor between Littleover and Derby city centre pick up local requests regularly." },
      { q: "Do you cover Heatherton Village, Sunnyhill and Stenson Fields?", a: "Yes. You can submit requests for Heatherton Village, Sunnyhill, Stenson Fields, Findern, Etwall, Blagreaves, Mickleover and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Littleover movers insured?", a: "Movers on the platform must hold Goods in Transit and Public Liability insurance. When you get a quote for your Littleover move, confirm their cover details before booking." },
      { q: "Are the hilly streets in Littleover difficult for moving?", a: "Streets off Blagreaves Lane in Littleover are among the hilliest in Derby, which can affect loading and unloading times — a loaded van on a steep incline needs careful positioning. If your property is on a hill, mention this in your request. Properties on the flatter roads near the village centre and Heatherton Village are more straightforward for movers." },
      { q: "How much does a man and van cost from Littleover to Derby city centre?", a: "A Littleover to Derby city centre move in 2026 typically costs £50–£100 depending on load and access. The A38 and A5111 connect the two in around 10 minutes outside rush hour, though the Littleover roundabout can add delay. A single-item collection might start from £50. Submit both postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // BLOXWICH (Walsall WS3)
  // ──────────────────────────────────────────
  bloxwich: {
    title: "Man and Van Bloxwich | Verified Mover Quotes",
    description: "Man and van Bloxwich from £50/hr. One verified mover reviews your postcodes, items and access before quoting. Walsall Wood, Pelsall, Leamore, Blakenall.",
    localMovingInfo: `Bloxwich sits in the WS3 postcode north of Walsall town centre, with a mix of Victorian terraces near the old high street and post-war semis on the surrounding estates. The A34 Walsall Road runs through Bloxwich and is the main factor in move timing — it carries commuter traffic between Walsall and Cannock, and the bus lanes restrict parking during peak hours. The older terraced streets off the A34, particularly around the Blakenall and Leamore areas, have narrow access and on-street parking with tight turning circles that limit van size. The newer estates towards Walsall Wood and Pelsall tend to have driveways but involve more furniture in larger family homes. Bloxwich town centre has a traditional market area with restricted loading during business hours. A verified mover reviewing a Bloxwich request will check whether the property is on the A34 corridor (busy but straightforward access) or on a tighter estate road (limited parking, smaller vans may be needed).`,
    faq: [
      { q: "Do you cover all areas of Bloxwich?", a: "Yes. You can submit a move request for Walsall Wood, Pelsall, Leamore, Blakenall, Little Bloxwich, Dudleys Fields and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Bloxwich?", a: "Bloxwich man and van rates in 2026 start from £50 per hour. A local move within WS3 — say from Blakenall to Leamore — typically costs £60–£110 depending on furniture, stairs and whether the A34 is busy. A full house move from a 3-bed Bloxwich semi could range from £250–£450. Submit your WS3 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Bloxwich?", a: "Same-day moves in the WS3 area may be possible if a mover is free. Bloxwich is on the A34 between Walsall and Cannock, so a mover already working in either direction might be able to reach you. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your Bloxwich request goes to one verified mover — your contact details are not shared with multiple companies. Your phone number and email stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that comes off the mover's price. The remaining balance goes directly to the mover on moving day. A mover reviews your WS3 postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover can review your Bloxwich move details — postcodes, items, access notes, preferred date — and send quote options. Your contact details stay hidden until you accept a quote and pay the booking deposit. Movers covering the A34 corridor between Walsall and Cannock review local requests regularly." },
      { q: "Do you cover Walsall Wood, Pelsall and Leamore?", a: "Yes. You can submit requests for Walsall Wood, Pelsall, Leamore, Blakenall, Little Bloxwich and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Bloxwich movers insured?", a: "Movers on the platform must hold Goods in Transit and Public Liability insurance before they can see customer requests. When you receive a quote for your Bloxwich move, you can confirm their cover before booking." },
      { q: "Is parking difficult on the A34 through Bloxwich?", a: "The A34 Walsall Road through Bloxwich has bus lanes that restrict parking during peak hours, and the streets immediately off it — especially around the market area — have tight on-street parking. If your property is on or near the A34, mention parking availability and whether a permit is needed. Properties towards Pelsall and Walsall Wood tend to have easier access." },
      { q: "How much does a man and van cost from Bloxwich to Walsall?", a: "A Bloxwich to Walsall move in 2026 typically costs £50–£90 depending on load and access. The two areas are close, connected by the A34 in around 5–10 minutes. A single-item collection might start from £50. Submit both postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // WEDNESBURY (Sandwell WS10)
  // ──────────────────────────────────────────
  wednesbury: {
    title: "Man and Van Wednesbury | Verified Mover Quotes",
    description: "Man and van Wednesbury from £50/hr. One verified mover reviews your postcodes, items and access before quoting. Friar Park, Wood Green, M6 corridor.",
    localMovingInfo: `Wednesbury sits in the WS10 postcode between the M6 and the A41, with a mix of Victorian terraces near the town centre and post-war semis on the surrounding estates. The M6 at junctions 9 and 10 is a major route consideration — it carries traffic between the Black Country and Birmingham, and congestion is common during peak hours and after incidents. The A41 Black Country New Road provides an alternative but can also be busy. Wednesbury's older terraced streets near the market area and around Friar Park have narrow access with on-street parking, while the newer estates towards Wood Green and Moxley offer wider roads but still have some tight cul-de-sacs. The hilly terrain on some residential roads can make loading a van more challenging. A verified mover reviewing a Wednesbury request will check whether the M6 junctions affect the route and whether the property is on a hillside terrace or a flatter estate road.`,
    faq: [
      { q: "Do you cover all areas of Wednesbury?", a: "Yes. You can submit a move request for Friar Park, Wood Green, Darlaston, Willenhall, Tipton, Moxley and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Wednesbury?", a: "Wednesbury man and van rates in 2026 start from £50 per hour. A local move within WS10 — for example from Friar Park to Wood Green — typically costs £60–£110 depending on furniture, stairs and whether the M6 junctions are clear. A full house move from a 3-bed Wednesbury semi could range from £250–£450. Submit your WS10 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Wednesbury?", a: "Same-day moves in the WS10 area may be possible. Wednesbury sits between the M6 and A41, so a mover already working in West Bromwich or Walsall might be nearby. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your Wednesbury request goes to one verified mover, not a list of companies. Your contact details stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that comes off the mover's total. The remaining balance goes directly to the mover on moving day. A mover will review your WS10 postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover can review your Wednesbury move details — postcodes, items, access notes, date — and send quote options. Your contact details stay hidden until you accept. Movers working the M6 and A41 corridors in the Black Country review local requests." },
      { q: "Do you cover Friar Park, Wood Green and Moxley?", a: "Yes. You can submit requests for Friar Park, Wood Green, Darlaston, Willenhall, Tipton, Moxley and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Wednesbury movers insured?", a: "Movers on the platform must hold Goods in Transit and Public Liability insurance. When you receive a quote for your Wednesbury move, confirm their cover before booking." },
      { q: "Does the M6 affect move timing in Wednesbury?", a: "Yes. The M6 at junctions 9 and 10 is one of the busiest stretches in the West Midlands. Delays are common during rush hour and can affect moves that cross the motorway. If your move involves the M6 corridor, mention preferred timing so the mover can plan around peak periods. The A41 provides an alternative route." },
      { q: "How much does a man and van cost from Wednesbury to Birmingham?", a: "A Wednesbury to Birmingham move in 2026 typically costs £70–£150 depending on load size, access at both addresses and time of day. The M6 and A41 provide the main routes. A single-item collection might start from £50–£70. Submit your postcodes and item list for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // WEST BROMWICH (Sandwell B70/B71)
  // ──────────────────────────────────────────
  "west-bromwich": {
    title: "Man and Van West Bromwich | Verified Mover Quotes",
    description: "Man and van West Bromwich from £50/hr. One verified mover quotes. Smethwick, Oldbury, Great Barr, Sandwell.",
    localMovingInfo: `West Bromwich occupies the B70 and B71 postcodes in the heart of Sandwell, with the Hawthorns football ground at its centre and the M5 running along its eastern edge. The A41 Black Country New Road and the A4034 connect West Bromwich to Birmingham and the wider Black Country, but both routes carry heavy commuter traffic. The town centre has bus lanes and controlled parking zones that complicate van access during business hours. Victorian terraces near the town centre — particularly around Greets Green and Charlemont — have on-street parking and narrow access, while the post-war estates towards Oldbury and Smethwick offer wider roads but can have tight cul-de-sacs. Match days at the Hawthorns create road closures and parking restrictions in the surrounding streets, which can affect moves scheduled on Saturdays. A verified mover reviewing a West Bromwich request will check whether the property is near the Hawthorns (match-day impact) and whether the M5 junction 1 affects the route timing.`,
    faq: [
      { q: "Do you cover all areas of West Bromwich?", a: "Yes. You can submit a move request for Wednesbury, Oldbury, Tipton, Smethwick, Great Barr, Greets Green, Charlemont and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in West Bromwich?", a: "West Bromwich man and van rates in 2026 start from £50 per hour. A local move within B70 — say from Greets Green to Charlemont — typically costs £60–£110 depending on furniture, parking and whether the A41 is congested. A full house move from a 3-bed West Bromwich semi could range from £250–£450. Submit your B70/B71 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in West Bromwich?", a: "Same-day moves in the B70 area may be possible. West Bromwich is between Birmingham and the Black Country on the A41, so a mover already working in Smethwick or Oldbury might be available. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your West Bromwich request goes to one verified mover — not multiple companies. Your personal details remain hidden until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay a booking deposit if you accept a quote, and that deposit is deducted from the total. The balance goes to the mover on moving day. A mover can review your B70/B71 postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover reviews your West Bromwich move details — postcodes, items, access, date — and sends quote options. Your contact details stay private until you accept. Movers working the A41 and M5 corridors between West Bromwich and Birmingham review local requests regularly." },
      { q: "Do you cover Smethwick, Oldbury and Great Barr?", a: "Yes. You can submit requests for Smethwick, Oldbury, Great Barr, Greets Green, Charlemont, Tipton and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved West Bromwich movers insured?", a: "Movers on the platform must carry Goods in Transit and Public Liability insurance. When you receive a quote for your West Bromwich move, confirm their insurance details before you book." },
      { q: "Do Hawthorns match days affect moves in West Bromwich?", a: "Yes. West Bromwich Albion home matches at the Hawthorns create road closures, parking restrictions and heavy traffic in the surrounding streets. If your move is on a match-day Saturday, mention this so the mover can plan an alternative route or adjust timing. Properties further from the ground towards Great Barr and Oldbury are less affected." },
      { q: "How much does a man and van cost from West Bromwich to Birmingham?", a: "A West Bromwich to Birmingham move in 2026 typically costs £60–£130 depending on load size, access at both addresses and time of day. The A41 connects the two in around 15–20 minutes outside rush hour. A single-item collection might start from £50–£70. Submit your postcodes and item list for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // DUDLEY (DY1–DY3)
  // ──────────────────────────────────────────
  dudley: {
    title: "Man and Van Dudley | Verified Mover Quotes",
    description: "Man and van Dudley from £50/hr. One verified mover quotes. Stourbridge, Halesowen, Brierley Hill, Netherton.",
    localMovingInfo: `Dudley occupies the DY1–DY3 postcodes in the heart of the Black Country, with the famous castle and zoo at its centre and steep terrain that makes some residential streets challenging for loaded vans. The A461 runs through Dudley and is the main route consideration — it carries commuter traffic between Wolverhampton and Stourbridge, and congestion near the town centre and the Merry Hill retail area is common during peak hours. Properties near the castle and Kates Hill are on some of the steepest streets in the Black Country, which affects van positioning and loading time. The post-war estates towards Netherton and Brierley Hill have wider roads but can involve more furniture in larger family homes. The Brierley Hill and Merry Hill area generates significant traffic on the A461 and A4101, particularly on weekends. A verified mover reviewing a Dudley request will consider whether the property is on a steep hillside (Kates Hill, Dudley Wood) or on flatter ground (Netherton, Brierley Hill) and plan accordingly.`,
    faq: [
      { q: "Do you cover all areas of Dudley?", a: "Yes. You can submit a move request for Stourbridge, Halesowen, Brierley Hill, Netherton, Kates Hill, Tipton, Pensnett and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Dudley?", a: "Dudley man and van rates in 2026 start from £50 per hour. A local move within DY1 — say from Kates Hill to Netherton — typically costs £60–£120 depending on furniture, stairs and whether the A461 is congested. A full house move from a 3-bed Dudley semi could range from £250–£450. Submit your DY postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Dudley?", a: "Same-day moves in the DY area may be possible. Dudley is central in the Black Country, so a mover already working in Stourbridge, Halesowen or Wolverhampton might be available. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your Dudley request goes to one verified mover, not a list of companies. Your contact details stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that comes off the mover's total. The remaining balance goes directly to the mover on moving day. A mover will review your DY postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover can review your Dudley move details — postcodes, items, access notes, date — and send quote options. Your contact details stay hidden until you accept. Movers working the A461 corridor between Dudley, Stourbridge and Wolverhampton review local requests regularly." },
      { q: "Do you cover Stourbridge, Halesowen and Brierley Hill?", a: "Yes. You can submit requests for Stourbridge, Halesowen, Brierley Hill, Netherton, Kates Hill, Pensnett and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Dudley movers insured?", a: "Movers on the platform must hold Goods in Transit and Public Liability insurance. When you receive a quote for your Dudley move, confirm their cover before booking." },
      { q: "Are the hills around Dudley castle difficult for moving?", a: "Streets near Dudley Castle and Kates Hill are among the steepest in the Black Country. A loaded van on a steep incline needs careful positioning and extra time for loading. If your property is on one of these hillside streets, mention this in your request so the mover can plan for a smaller van or additional time. Properties towards Netherton and Brierley Hill are on flatter ground." },
      { q: "How much does a man and van cost from Dudley to Birmingham?", a: "A Dudley to Birmingham move in 2026 typically costs £70–£150 depending on load size, access and time of day. The A461 and M5 provide the main routes, around 20–30 minutes outside rush hour. A single-item collection might start from £50–£80. Submit your postcodes and item list for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // STOURBRIDGE (DY7–DY9)
  // ──────────────────────────────────────────
  stourbridge: {
    title: "Man and Van Stourbridge | Verified Mover Quotes",
    description: "Man and van Stourbridge from £50/hr. One verified mover reviews your postcodes, items and access before quoting. Kingswinford, Wollaston, Lye, Norton.",
    localMovingInfo: `Stourbridge occupies the DY7–DY9 postcodes on the south-western edge of the Black Country, with a distinct market-town identity centred on the historic High Street and the famous glass-making heritage. The A491 and A451 are the main routes through Stourbridge and the key factors in move timing — they carry commuter traffic between Stourbridge and Dudley, and the A491 through the town centre can be congested during peak hours. The canal basin area near the town centre has narrow access roads with restricted turning, while the Georgian terraces near the High Street have on-street parking only. Properties in Wollaston and Norton tend to be larger family homes with driveways but more furniture volume. Kingswinford to the west has a mix of inter-war semis and modern estates. The roads towards the Clent Hills can be steep and narrow. A verified mover reviewing a Stourbridge request will consider whether the property is near the tight canal basin streets, on the busier A491 corridor, or in the more open suburbs towards Kingswinford and Wollaston.`,
    faq: [
      { q: "Do you cover all areas of Stourbridge?", a: "Yes. You can submit a move request for Dudley, Halesowen, Kingswinford, Wollaston, Lye, Norton, Brierley Hill and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Stourbridge?", a: "Stourbridge man and van rates in 2026 start from £50 per hour. A local move within DY8 — say from the High Street to Wollaston — typically costs £60–£120 depending on furniture, access and whether the A491 is congested. A full house move from a 3-bed Stourbridge semi could range from £250–£450. Submit your DY postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Stourbridge?", a: "Same-day moves in the Stourbridge area may be possible. A mover already working in Dudley or Halesowen might be able to reach you. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your Stourbridge request goes to one verified mover — your contact details are not shared with other companies. They stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, it is free to submit. You only pay a booking deposit if you accept a quote, and that comes off the total. The remaining balance goes to the mover on moving day. A mover will review your DY postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover reviews your Stourbridge move details — postcodes, items, access, date — and sends quote options. Your contact details stay private until you accept. Movers covering the A491 and A451 corridors between Stourbridge and Dudley review local requests." },
      { q: "Do you cover Kingswinford, Wollaston and Lye?", a: "Yes. You can submit requests for Kingswinford, Wollaston, Lye, Norton, Dudley, Halesowen and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Stourbridge movers insured?", a: "Movers on the platform must carry Goods in Transit and Public Liability insurance. When you receive a quote for your Stourbridge move, confirm their cover before booking." },
      { q: "Is access difficult near the canal basin in Stourbridge?", a: "The canal basin area near Stourbridge town centre has narrow access roads with tight turning circles, and the surrounding streets have limited parking. If your property is near the canal or the High Street, mention this so the mover can plan for a smaller van or allow extra time. Properties towards Wollaston and Kingswinford tend to have easier access." },
      { q: "How much does a man and van cost from Stourbridge to Birmingham?", a: "A Stourbridge to Birmingham move in 2026 typically costs £80–£160 depending on load size, access and time of day. The A456 and M5 provide the main route, around 25–35 minutes outside rush hour. A single-item collection might start from £50–£80. Submit your postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // HALESOWEN (B62/B63)
  // ──────────────────────────────────────────
  halesowen: {
    title: "Man and Van Halesowen | Verified Mover Quotes",
    description: "Man and van Halesowen from £50/hr. One verified mover reviews your postcodes, items and access before quoting. Cradley, Hayley Green, Hasbury, Lapal.",
    localMovingInfo: `Halesowen occupies the B62 and B63 postcodes on the southern edge of the Black Country, in the shadow of the Clent Hills. The A456 is the main route through Halesowen and the dominant factor in move timing — it carries commuter traffic between Birmingham and Kidderminster, and congestion near the town centre and the M5 junction 3 is common during peak hours. Properties near the town centre have Victorian terraces with on-street parking and narrower access, while the suburban areas towards Hayley Green, Hasbury and Lapal have larger inter-war semis with driveways but more furniture volume. The roads towards the Clent Hills can be steep and narrow, particularly in the Cradley and Romsley areas. Hasbury and Lapal are popular family areas with larger loads but good driveway access. A verified mover reviewing a Halesowen request will check whether the property is on a steep hillside road (needs careful positioning) or in the flatter suburban streets (easier access, larger loads).`,
    faq: [
      { q: "Do you cover all areas of Halesowen?", a: "Yes. You can submit a move request for Dudley, Stourbridge, Cradley, Hayley Green, Romsley, Lapal, Hasbury and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Halesowen?", a: "Halesowen man and van rates in 2026 start from £50 per hour. A local move within B62 — say from the town centre to Hayley Green — typically costs £60–£120 depending on furniture and whether the A456 is busy. A full house move from a 3-bed Halesowen semi could range from £250–£450. Submit your B62/B63 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Halesowen?", a: "Same-day moves in the Halesowen area may be possible. Halesowen is on the A456 between Birmingham and Kidderminster, so a mover already working in Dudley or Stourbridge might be nearby. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your Halesowen request goes to one verified mover, not a list of companies. Your personal details stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay a booking deposit if you accept a quote, and that deposit is deducted from the total. The remaining balance goes to the mover on moving day. A mover will review your B62/B63 postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover can review your Halesowen move details — postcodes, items, access, date — and send quote options. Your contact details stay private until you accept. Movers working the A456 corridor between Halesowen and Birmingham review local requests." },
      { q: "Do you cover Cradley, Hayley Green and Hasbury?", a: "Yes. You can submit requests for Cradley, Hayley Green, Romsley, Lapal, Hasbury, Dudley, Stourbridge and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Halesowen movers insured?", a: "Movers on the platform must hold Goods in Transit and Public Liability insurance. When you receive a quote for your Halesowen move, confirm their cover before booking." },
      { q: "Are the roads towards the Clent Hills difficult for moving vans?", a: "Some roads in the Cradley and Romsley areas towards the Clent Hills are steep and narrow, which can make van access and positioning more challenging. If your property is on a hillside, mention this in your request. Properties in the flatter areas around Hayley Green, Hasbury and Lapal are more straightforward for movers." },
      { q: "How much does a man and van cost from Halesowen to Birmingham?", a: "A Halesowen to Birmingham move in 2026 typically costs £70–£140 depending on load size, access and time of day. The A456 and M5 provide the main routes, around 15–25 minutes outside rush hour. A single-item collection might start from £50–£70. Submit your postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // SOLIHULL (B91–B94)
  // ──────────────────────────────────────────
  solihull: {
    title: "Man and Van Solihull | Verified Mover Quotes",
    description: "Man and van Solihull from £50/hr. One verified mover reviews your postcodes, items and access before quoting. Knowle, Dorridge, Shirley, Balsall Common.",
    localMovingInfo: `Solihull occupies the B91–B94 postcodes south-east of Birmingham, with a reputation as one of the West Midlands' most desirable areas. The M42 is the key route consideration — junctions 4, 5 and 6 serve Solihull and connect to the M40 and the wider motorway network, but the junctions are heavily congested during peak hours. Properties in the town centre and Shirley tend to be 1930s semis with moderate driveway access, while Knowle and Dorridge have larger detached homes with wide drives but significantly more furniture volume. The tree-lined streets that make Solihull attractive can restrict van access — mature trees overhang carriageways and narrow the effective road width. Balsall Common, further south, has a mix of village cottages and newer estates. The NEC and Birmingham Airport generate traffic on the A45 and A41 corridors that can affect moves in the B92 area. A verified mover reviewing a Solihull request will factor in the larger furniture loads, the M42 junction timing, and whether tree-lined streets restrict van access.`,
    faq: [
      { q: "Do you cover all areas of Solihull?", a: "Yes. You can submit a move request for Knowle, Dorridge, Balsall Common, Shirley, Olton, Hillfield and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Solihull?", a: "Solihull man and van rates in 2026 start from £50 per hour. A local move within B91 — say from the town centre to Shirley — typically costs £60–£120 depending on furniture and access. A full house move from a 4-bed Solihull detached home could range from £300–£550 because of the furniture volume. Submit your B91–B94 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Solihull?", a: "Same-day moves in the Solihull area may be possible. Solihull is well connected via the M42 and A41, so a mover already working in Shirley or Knowle might be available. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your Solihull request goes to one verified mover — your contact details are not shared with multiple companies. They stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that is deducted from the total. The remaining balance goes to the mover on moving day. A mover can review your B91–B94 postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover reviews your Solihull move details — postcodes, items, access, date — and sends quote options. Your contact details stay private until you accept. Movers working the M42 corridor between Solihull and Birmingham review local requests regularly." },
      { q: "Do you cover Knowle, Dorridge and Balsall Common?", a: "Yes. You can submit requests for Knowle, Dorridge, Balsall Common, Shirley, Olton and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Solihull movers insured?", a: "Movers on the platform must hold Goods in Transit and Public Liability insurance. When you receive a quote for your Solihull move, confirm their cover before booking." },
      { q: "Do Solihull moves take longer because of the furniture volume?", a: "They often do. Solihull has a high proportion of larger detached and semi-detached family homes, which means more furniture, more boxes and sometimes more dismantling. A 4-bed Solihull move might take 5–7 hours compared to 3–4 hours for a 2-bed flat. Add your full item list and any dismantling needs so the mover can quote accurately." },
      { q: "How much does a man and van cost from Solihull to Birmingham?", a: "A Solihull to Birmingham move in 2026 typically costs £60–£130 depending on load size, access and time of day. The A41 and M42 provide the main routes, around 15–25 minutes outside rush hour. A single-item collection might start from £50–£70. Submit your postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // BEESTON (Nottingham NG9)
  // ──────────────────────────────────────────
  beeston: {
    title: "Man and Van Beeston | Verified Mover Quotes",
    description: "Man and van Beeston from £50/hr. One verified mover reviews your postcodes, items and access before quoting. Chilwell, Bramcote, Toton, University area.",
    localMovingInfo: `Beeston occupies the NG9 postcode between Nottingham and the M1, best known for the University of Nottingham campus on its doorstep and the tram interchange on Station Road. The A6005 and A52 are the main routes through Beeston and the key factors in move timing — the A52 connects Beeston to Nottingham and Derby, while the M1 at junction 25 is about 2 miles south. The tram line crossing on Station Road creates specific access challenges: parking near the interchange is restricted, and the tracks affect routing for larger vehicles. Victorian terraces near the High Road have on-street parking and narrow access, while the student areas around Beeston Rylands and Dunkirk follow the university calendar with peak demand in June, July and September. Chilwell and Bramcote to the south have larger family homes with driveway access but more furniture. Toton, towards the M1, has a mix of inter-war semis and newer builds. A verified mover reviewing a Beeston request will check whether the property is near the tram interchange (parking restrictions), the university area (student move timing), or the suburban estates (larger loads).`,
    faq: [
      { q: "Do you cover all areas of Beeston?", a: "Yes. You can submit a move request for Chilwell, Toton, Bramcote, Wollaton, Dunkirk, Lenton, Long Eaton, Stapleford and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Beeston?", a: "Beeston man and van rates in 2026 start from £50 per hour. A local move within NG9 — say from the High Road to Chilwell — typically costs £60–£120 depending on furniture and access. A full house move from a 3-bed Beeston semi could range from £250–£450. Submit your NG9 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Beeston?", a: "Same-day moves in the NG9 area may be possible. Beeston is on the tram line and A52 between Nottingham and Derby, so a mover already working in either direction might be available. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your Beeston request goes to one verified mover — your contact details are not shared with other companies. They stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that is deducted from the total. The remaining balance goes to the mover on moving day. A mover can review your NG9 postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover reviews your Beeston move details — postcodes, items, access, date — and sends quote options. Your contact details stay private until you accept. Movers working the A52 corridor between Beeston and Nottingham, or towards the M1 at junction 25, review local requests." },
      { q: "Do you cover Chilwell, Bramcote and the University area?", a: "Yes. You can submit requests for Chilwell, Bramcote, Toton, Wollaton, Dunkirk, Lenton and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Can you help with student moves near the University of Nottingham?", a: "Yes. Student moves near the University of Nottingham campus in Beeston Rylands and Dunkirk can be submitted with your item list, access notes and preferred date. Peak demand is June, July and September." },
      { q: "Does the tram line affect moves in Beeston?", a: "The tram interchange on Station Road creates parking restrictions and the tracks affect routing for larger vehicles. If your property is near the interchange, mention this in your request so the mover can plan accordingly. Properties further from the tram line towards Chilwell and Bramcote have easier van access." },
      { q: "How much does a man and van cost from Beeston to Nottingham city centre?", a: "A Beeston to Nottingham city centre move in 2026 typically costs £50–£100 depending on load and access. The A6005 and A52 connect the two in around 10–15 minutes outside rush hour. A single-item collection might start from £50. Submit both postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // CARLTON (Nottingham NG4)
  // ──────────────────────────────────────────
  carlton: {
    title: "Man and Van Carlton | Verified Mover Quotes",
    description: "Man and van Carlton from £50/hr. One verified mover reviews your postcodes, items and access before quoting. Gedling, Netherfield, Mapperley, Burton Joyce.",
    localMovingInfo: `Carlton occupies the NG4 postcode east of Nottingham city centre, stretching from the Victorian terraces near Carlton Road to the post-war semis and newer estates towards Gedling and Burton Joyce. The A612 is the main route through Carlton and the key factor in move timing — it carries commuter traffic between Nottingham and the eastern villages, and congestion near Carlton Hill and Netherfield is common during peak hours. The older terraced streets off Carlton Road have narrow access and on-street parking with tight turning circles, while the estates towards Mapperley and Gedling have wider roads and driveway access but involve more furniture in larger family homes. Carlton Hill, the shopping area, has restricted parking during business hours. The B683 provides an alternative route towards Burton Joyce and the countryside beyond. A verified mover reviewing a Carlton request will check whether the property is on the tighter terraced streets near Carlton Road (smaller van may be needed) or on the wider estates towards Gedling (easier access, larger loads).`,
    faq: [
      { q: "Do you cover all areas of Carlton?", a: "Yes. You can submit a move request for Gedling, Netherfield, Colwick, Sneinton, Bakersfield, Mapperley, St Anns, Burton Joyce and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Carlton?", a: "Carlton man and van rates in 2026 start from £50 per hour. A local move within NG4 — say from Carlton Hill to Gedling — typically costs £60–£110 depending on furniture, parking and whether the A612 is congested. A full house move from a 3-bed Carlton semi could range from £250–£450. Submit your NG4 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Carlton?", a: "Same-day moves in the NG4 area may be possible. Carlton is on the A612 east of Nottingham, so a mover already working in Gedling or Netherfield might be available. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your Carlton request goes to one verified mover — not a list of companies. Your personal details stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that comes off the mover's total. The remaining balance goes directly to the mover on moving day. A mover can review your NG4 postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover can review your Carlton move details — postcodes, items, access, date — and send quote options. Your contact details stay hidden until you accept. Movers working the A612 corridor between Carlton and Nottingham review local requests regularly." },
      { q: "Do you cover Gedling, Netherfield and Mapperley?", a: "Yes. You can submit requests for Gedling, Netherfield, Colwick, Sneinton, Mapperley, Bakersfield and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Carlton movers insured?", a: "Movers on the platform must hold Goods in Transit and Public Liability insurance. When you receive a quote for your Carlton move, confirm their cover before booking." },
      { q: "Are the terraced streets off Carlton Road difficult for vans?", a: "The Victorian terraces off Carlton Road have narrow access, on-street parking and tight turning circles that can limit van size. If your property is on one of these streets, mention this so the mover can bring a smaller van or allow extra loading time. Properties towards Gedling and Mapperley have wider roads and driveways." },
      { q: "How much does a man and van cost from Carlton to Nottingham city centre?", a: "A Carlton to Nottingham city centre move in 2026 typically costs £50–£90 depending on load and access. The A612 connects the two in around 5–10 minutes outside rush hour. A single-item collection might start from £50. Submit both postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // WEST BRIDGFORD (Nottingham NG2)
  // ──────────────────────────────────────────
  "west-bridgford": {
    title: "Man and Van West Bridgford | Verified Mover Quotes",
    description: "Man and van West Bridgford from £50/hr. One verified mover quotes. Lady Bay, Edwalton, Gamston, Trent Bridge.",
    localMovingInfo: `West Bridgford occupies the NG2 postcode south of Nottingham, separated from the city by the River Trent and best known for Trent Bridge cricket ground, the tree-lined streets of Lady Bay and the modern developments around Gamston and Edwalton. The A60 and A52 are the main routes through West Bridgford and the dominant factors in move timing. The A60 London Road carries commuter traffic between Nottingham and the south, while the A52 Clifton Bridge connects West Bridgford to the M1 at junction 24. Lady Bay, a conservation area, has Victorian and Edwardian properties with narrow street access and restricted parking — particularly on match days when Trent Bridge road closures divert traffic through residential streets. Central Avenue, the main shopping street, has controlled parking zones. Edwalton and Gamston to the south have larger executive homes with driveways but significantly more furniture volume. A verified mover reviewing a West Bridgford request will check whether the property is in the Lady Bay conservation area (tight access, match-day issues), on Central Avenue (parking restrictions), or in the newer estates (wider roads, larger loads).`,
    faq: [
      { q: "Do you cover all areas of West Bridgford?", a: "Yes. You can submit a move request for Edwalton, Gamston, Ruddington, Trent Bridge, Lady Bay, Wilford, Clifton and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in West Bridgford?", a: "West Bridgford man and van rates in 2026 start from £50 per hour. A local move within NG2 — say from Lady Bay to Gamston — typically costs £60–£130 depending on furniture, access and whether match-day closures affect the route. A full house move from a 4-bed West Bridgford property could range from £300–£550. Submit your NG2 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in West Bridgford?", a: "Same-day moves in the NG2 area may be possible. West Bridgford is on the A60 south of Nottingham, so a mover already working in Lady Bay or Edwalton might be available. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your West Bridgford request goes to one verified mover, not a list of companies. Your contact details stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that is deducted from the total. The remaining balance goes to the mover on moving day. A mover can review your NG2 postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover reviews your West Bridgford move details — postcodes, items, access, date — and sends quote options. Your contact details stay private until you accept. Movers working the A60 and A52 corridors between West Bridgford and Nottingham review local requests regularly." },
      { q: "Do you cover Lady Bay, Edwalton and Gamston?", a: "Yes. You can submit requests for Lady Bay, Edwalton, Gamston, Ruddington, Wilford, Clifton and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Do Trent Bridge match days affect moves in West Bridgford?", a: "Yes. Trent Bridge cricket and football events can close key roads around the ground, particularly Radcliffe Road and Bridgford Road, and divert traffic through Lady Bay streets. If your move falls on a match day, mention this so the mover can plan an alternative route or adjust timing. Properties towards Edwalton and Gamston are less affected." },
      { q: "Is parking difficult in the Lady Bay conservation area?", a: "Lady Bay has restricted parking in its conservation area streets, with narrow access and limited on-street spaces. If your property is in Lady Bay, mention whether there is a driveway or whether on-street loading is possible. Properties on the wider roads towards Central Avenue and Gamston tend to have easier access." },
      { q: "How much does a man and van cost from West Bridgford to Nottingham city centre?", a: "A West Bridgford to Nottingham city centre move in 2026 typically costs £50–£100 depending on load and access. The A60 London Road connects the two in around 5–10 minutes outside rush hour. A single-item collection might start from £50. Submit both postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // BRAUNSTONE (Leicester LE3)
  // ──────────────────────────────────────────
  braunstone: {
    title: "Man and Van Braunstone | Verified Mover Quotes",
    description: "Man and van Braunstone from £50/hr. One verified mover quotes. New Parks, Thorpe Astley, Glenfield, Aylestone.",
    localMovingInfo: `Braunstone occupies the LE3 postcode on Leicester's western side, stretching from the post-war estates of Braunstone Town and New Parks to the newer developments of Thorpe Astley towards the M1. The A47 Narborough Road is the main route through Braunstone and the key factor in move timing — it carries commuter traffic between Leicester city centre and the M1 at junction 21, and congestion near the Fosse Park retail area is common during peak hours and on weekends. The older estates in Braunstone Town and New Parks have road layouts dating from the 1940s–1960s, with narrower streets, tight turns on estate roads and limited driveways. Thorpe Astley, built from the 1990s onwards, has wider estate roads and better access. The M1 at junction 21 is about a mile west of Braunstone and is a key route for moves heading towards Coventry, Birmingham or the north. Aylestone, to the south, connects Braunstone to the A563 ring road. A verified mover reviewing a Braunstone request will check whether the property is on the older estates (tighter access, more parking constraints) or in Thorpe Astley (wider roads, easier access).`,
    faq: [
      { q: "Do you cover all areas of Braunstone?", a: "Yes. You can submit a move request for Braunstone Town, New Parks, Thorpe Astley, Glenfield, Aylestone, Dane Hills, Westcotes and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Braunstone?", a: "Braunstone man and van rates in 2026 start from £50 per hour. A local move within LE3 — say from New Parks to Thorpe Astley — typically costs £60–£110 depending on furniture, access and whether the A47 is congested. A full house move from a 3-bed Braunstone semi could range from £250–£450. Submit your LE3 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Braunstone?", a: "Same-day moves in the LE3 area may be possible. Braunstone is on the A47 west of Leicester, so a mover already working near Fosse Park or the M1 might be available. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your Braunstone request goes to one verified mover — your contact details are not shared with multiple companies. They stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that is deducted from the total. The remaining balance goes to the mover on moving day. A mover can review your LE3 postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover can review your Braunstone move details — postcodes, items, access, date — and send quote options. Your contact details stay hidden until you accept. Movers working the A47 and M1 junction 21 corridors review local requests regularly." },
      { q: "Do you cover New Parks, Thorpe Astley and Glenfield?", a: "Yes. You can submit requests for New Parks, Thorpe Astley, Glenfield, Aylestone, Dane Hills, Westcotes and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Braunstone movers insured?", a: "Movers on the platform must hold Goods in Transit and Public Liability insurance. When you receive a quote for your Braunstone move, confirm their cover before booking." },
      { q: "Is access difficult on the older Braunstone estates?", a: "The older estates in Braunstone Town and New Parks have road layouts from the 1940s–1960s, with tighter turns, narrower streets and limited driveways. If your property is on one of these older estates, mention parking and access details. Thorpe Astley, the newer development, has wider roads and better van access." },
      { q: "How much does a man and van cost from Braunstone to Leicester city centre?", a: "A Braunstone to Leicester city centre move in 2026 typically costs £50–£90 depending on load and access. The A47 Narborough Road connects the two in around 10 minutes outside rush hour. A single-item collection might start from £50. Submit both postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // EVINGTON (Leicester LE5)
  // ──────────────────────────────────────────
  evington: {
    title: "Man and Van Evington | Verified Mover Quotes",
    description: "Man and van Evington from £50/hr. One verified mover quotes. Clarendon Park, Stoneygate, Hamilton, Thurnby.",
    localMovingInfo: `Evington occupies the LE5 postcode on Leicester's eastern side, blending Victorian terraces near the city boundary, student housing around Clarendon Park and newer developments towards Hamilton and Thurnby. The A47 Uppingham Road is the main route through Evington and the dominant factor in move timing — it carries commuter traffic between Leicester and the east, and congestion near the Evington village area and the junction with the A563 ring road is common during peak hours. Clarendon Park, home to many DMU and University of Leicester students, has Victorian terraces with on-street parking and restricted access during term-time, particularly during September move-in and June move-out. Evington Village itself has a conservation area with tighter streets, while the newer Hamilton development has wider estate roads and modern layouts. Properties towards Thurnby and Scraptoft are larger family homes with driveway access but more furniture. A verified mover reviewing an Evington request will check whether the property is in the student area (limited parking, seasonal demand), the village (tighter access), or the newer estates (wider roads, larger loads).`,
    faq: [
      { q: "Do you cover all areas of Evington?", a: "Yes. You can submit a move request for Clarendon Park, Stoneygate, Thurnby, Humberstone, Hamilton, Knighton, Scraptoft, Oadby and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Evington?", a: "Evington man and van rates in 2026 start from £50 per hour. A local move within LE5 — say from Clarendon Park to Hamilton — typically costs £60–£120 depending on furniture, parking and whether the A47 is congested. A full house move from a 3-bed Evington semi could range from £250–£450. Submit your LE5 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Evington?", a: "Same-day moves in the LE5 area may be possible. Evington is on the A47 east of Leicester, so a mover already working in Clarendon Park or Oadby might be available. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your Evington request goes to one verified mover — your contact details are not shared with multiple companies. They stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that is deducted from the total. The remaining balance goes to the mover on moving day. A mover can review your LE5 postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover can review your Evington move details — postcodes, items, access, date — and send quote options. Your contact details stay hidden until you accept. Movers working the A47 corridor between Evington and Leicester city centre review local requests." },
      { q: "Do you cover Clarendon Park, Stoneygate and Hamilton?", a: "Yes. You can submit requests for Clarendon Park, Stoneygate, Hamilton, Thurnby, Humberstone, Knighton and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Can you help with student moves in Clarendon Park?", a: "Yes. Student moves in Clarendon Park can be submitted with your item list, access notes and preferred date. Peak demand is June, July and September. Add whether you have parking or on-street loading is needed." },
      { q: "Is parking difficult in Clarendon Park?", a: "Clarendon Park has Victorian terraces with on-street parking only, and restrictions can be tight during term time. If you are moving in September or June, parking is especially competitive. Mention whether you have a permit or designated space. Properties towards Hamilton and Thurnby tend to have driveways." },
      { q: "How much does a man and van cost from Evington to Leicester city centre?", a: "An Evington to Leicester city centre move in 2026 typically costs £50–£90 depending on load and access. The A47 connects the two in around 5–10 minutes outside rush hour. A single-item collection might start from £50. Submit both postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // DUSTON (Northampton NN5)
  // ──────────────────────────────────────────
  duston: {
    title: "Man and Van Duston | Verified Mover Quotes",
    description: "Man and van Duston from £50/hr. One verified mover reviews your postcodes, items and access before quoting. Old Duston, New Duston, Upton, Harlestone.",
    localMovingInfo: `Duston occupies the NN5 postcode west of Northampton town centre, blending an older village core of stone cottages with extensive new-build estates stretching towards the M1. The A45 is the main route through Duston and the single biggest factor in move timing — it connects Duston to the M1 at junction 15A, and this stretch is one of the most congested in Northampton during rush hour. Old Duston, around the original village, has narrow stone-walled streets with limited parking and tight access for larger vans. New Duston and the surrounding developments have wider estate roads and driveway access, but the cul-de-sac layouts can involve more furniture in larger family homes. The A428 provides an alternative route towards Northampton town centre but also carries commuter traffic. Properties towards Harlestone and Briar Hill are more rural with narrow lanes. A verified mover reviewing a Duston request will check whether the property is in the old village (tighter access, stone walls) or on the newer estates (wider roads, larger loads) and plan around the A45 congestion.`,
    faq: [
      { q: "Do you cover all areas of Duston?", a: "Yes. You can submit a move request for Old Duston, New Duston, Upton, Dallington, Harlestone, Briar Hill, Weedon Bec and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in Duston?", a: "Duston man and van rates in 2026 start from £50 per hour. A local move within NN5 — say from Old Duston to New Duston — typically costs £60–£120 depending on furniture, access and whether the A45 is congested. A full house move from a 3-bed Duston semi could range from £250–£450. Submit your NN5 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in Duston?", a: "Same-day moves in the NN5 area may be possible. Duston is on the A45 west of Northampton, so a mover already working near the M1 might be available. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your Duston request goes to one verified mover, not a list of companies. Your contact details stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that comes off the mover's total. The remaining balance goes directly to the mover on moving day. A mover can review your NN5 postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover can review your Duston move details — postcodes, items, access, date — and send quote options. Your contact details stay hidden until you accept. Movers working the A45 and M1 corridors between Duston and Northampton review local requests." },
      { q: "Do you cover Old Duston, New Duston and Upton?", a: "Yes. You can submit requests for Old Duston, New Duston, Upton, Dallington, Harlestone, Briar Hill and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved Duston movers insured?", a: "Movers on the platform must hold Goods in Transit and Public Liability insurance. When you receive a quote for your Duston move, confirm their cover before booking." },
      { q: "Is access difficult in Old Duston village?", a: "Old Duston has stone-walled streets and older cottages with narrow access and limited parking — some lanes can barely fit a transit van. If your property is in the old village, mention this so the mover can bring a smaller van or allow extra time. The newer estates in New Duston have wider roads and driveway access." },
      { q: "How much does a man and van cost from Duston to Northampton town centre?", a: "A Duston to Northampton town centre move in 2026 typically costs £50–£90 depending on load and access. The A45 and A428 connect the two in around 5–10 minutes outside rush hour. A single-item collection might start from £50. Submit both postcodes for a guide price." },
    ],
  },

  // ──────────────────────────────────────────
  // NORTH HYKEHAM (Lincoln LN6)
  // ──────────────────────────────────────────
  "north-hykeham": {
    title: "Man and Van North Hykeham | Verified Mover Quotes",
    description: "Man and van North Hykeham from £50/hr. One verified mover quotes. Waddington, Bracebridge Heath, Witham St Hughs.",
    localMovingInfo: `North Hykeham occupies the LN6 postcode south of Lincoln, with a mix of post-war homes, newer housing estates and growing commercial areas along the A46 bypass corridor. The A46 is the main route consideration — it bypasses Lincoln to the south and connects North Hykeham to Newark and Nottingham to the east, and the A15 runs south towards Sleaford. The A46 roundabout near North Hykeham creates regular congestion during rush hour, and the A1434 Newark Road into Lincoln can also be busy during school-run times. The older residential areas near North Hykeham town centre have post-war semis with moderate driveway access, while the newer estates towards Witham St Hughs and the A46 have modern layouts with wider roads and driveway access. Waddington, to the south, is a popular village with a mix of older stone properties and newer builds. Bracebridge Heath, between North Hykeham and Lincoln, has a mix of terraces and semis. A verified mover reviewing a North Hykeham request will check whether the property is near the busy A46 junction, on the older estates (tighter access) or on the newer developments (wider roads).`,
    faq: [
      { q: "Do you cover all areas of North Hykeham?", a: "Yes. You can submit a move request for South Hykeham, Waddington, Bracebridge Heath, Lincoln City Centre, Witham St Hughs, Skellingthorpe, Boultham and surrounding areas. A verified mover can review the details and send quote options if they can help." },
      { q: "How much does a man and van cost in North Hykeham?", a: "North Hykeham man and van rates in 2026 start from £50 per hour. A local move within LN6 — say from the town centre to Witham St Hughs — typically costs £60–£110 depending on furniture, access and whether the A46 bypass is congested. A full house move from a 3-bed North Hykeham semi could range from £250–£450. Submit your LN6 postcodes and item list for a guide price." },
      { q: "Can I find a mover for a same-day move in North Hykeham?", a: "Same-day moves in the LN6 area may be possible. North Hykeham is on the A46 south of Lincoln, so a mover already working in Bracebridge Heath or Waddington might be available. Submit your request with postcodes and timing." },
      { q: "Will multiple movers contact me?", a: "No. Your North Hykeham request goes to one verified mover, not a list of companies. Your contact details stay private until you accept a quote and pay the booking deposit." },
      { q: "Is it free to submit a move request?", a: "Yes, submitting is free. You only pay if you accept a quote — a booking deposit that comes off the mover's total. The remaining balance goes directly to the mover on moving day. A mover can review your LN6 postcodes, access notes and item list before quoting." },
      { q: "How quickly will I be contacted?", a: "After you submit, a verified mover can review your North Hykeham move details — postcodes, items, access, date — and send quote options. Your contact details stay hidden until you accept. Movers working the A46 and A15 corridors between North Hykeham and Lincoln review local requests." },
      { q: "Do you cover Waddington, Bracebridge Heath and Witham St Hughs?", a: "Yes. You can submit requests for Waddington, Bracebridge Heath, Witham St Hughs, Skellingthorpe, Boultham and nearby areas. Availability depends on verified movers reviewing the move details." },
      { q: "Are approved North Hykeham movers insured?", a: "Movers on the platform must hold Goods in Transit and Public Liability insurance. When you receive a quote for your North Hykeham move, confirm their cover before booking." },
      { q: "Does the A46 bypass affect move timing in North Hykeham?", a: "The A46 bypass roundabout near North Hykeham creates regular congestion during rush hour, particularly in the morning and late afternoon. If your move involves crossing the bypass, mention preferred timing so the mover can plan around peak periods. The A1434 Newark Road provides an alternative route into Lincoln." },
      { q: "How much does a man and van cost from North Hykeham to Lincoln city centre?", a: "A North Hykeham to Lincoln city centre move in 2026 typically costs £50–£90 depending on load and access. The A1434 Newark Road connects the two in around 10 minutes outside rush hour. A single-item collection might start from £50. Submit both postcodes for a guide price." },
    ],
  },
};
