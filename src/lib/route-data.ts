// Route page data for city-to-city man and van move pages
// Each route targets "man and van [city a] to [city b]" search queries
// Distances and times are approximate road distances via typical motorway routes

export interface RouteData {
  slug: string;
  cityA: string;
  cityB: string;
  regionA: string;
  regionB: string;
  distance: string;
  driveTime: string;
  motorway: string;
  estimatedFrom: string;
  estimatedTo: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  routeTips: string[];
  parkingNotes: { city: string; notes: string }[];
  faq: { q: string; a: string }[];
  relatedRoutes: { label: string; href: string }[];
  cityALink: string;
  cityBLink: string;
}

const siteUrl = "https://www.manandvanclub.co.uk";

export const ROUTES: RouteData[] = [
  {
    slug: "london-to-birmingham",
    cityA: "London",
    cityB: "Birmingham",
    regionA: "Greater London",
    regionB: "West Midlands",
    distance: "120 miles",
    driveTime: "2 hours 15 minutes",
    motorway: "M1",
    estimatedFrom: "£250",
    estimatedTo: "£550",
    title: "Man and Van London to Birmingham | Move Quotes | Man and Van Club",
    description: "Man and van quotes for London to Birmingham moves. 120 miles via M1. Transparent pricing, verified movers, no hidden fees. Submit your move details for free.",
    h1: "London to Birmingham",
    intro: "Moving from London to Birmingham? The 120-mile journey via the M1 takes roughly 2 hours 15 minutes in clear traffic. A verified man and van can handle your move end to end — from loading at your London address to unloading at your Birmingham property. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "Avoid the M1 northbound on Friday afternoons — junctions 6a to 13 can add 45 minutes",
      "The M6 toll (junctions 3a to 11a) bypasses Birmingham congestion for an additional £5.90 (car) but saves 20–30 minutes at peak times",
      "Birmingham Clean Air Zone applies to the city centre — check if your delivery address is inside the zone",
      "London Congestion Charge and ULEZ may apply at the collection end depending on the postcode",
      "Weekend moves often have lighter traffic but some London CPZs still operate on Saturdays"
    ],
    parkingNotes: [
      { city: "London", notes: "Controlled Parking Zones cover most boroughs. Residents' parking bays often need a visitor permit. Loading bays allow 20–40 minutes in most areas. Check your borough's rules at london.gov.uk." },
      { city: "Birmingham", notes: "The Clean Air Zone covers the city centre ring road area. On-street parking in areas like Edgbaston, Selly Oak and Moseley usually has time-limited bays. Flats in the Jewellery Quarter often have allocated parking." }
    ],
    faq: [
      { q: "How much does a man and van from London to Birmingham cost?", a: "In 2026, a London to Birmingham man and van move typically costs £250–£550 depending on load size, access at both ends, and whether it is a one-way or return trip. A single-item collection starts from around £150. Submit your postcodes and item list for a free guide price." },
      { q: "How long does a London to Birmingham move take?", a: "The drive is roughly 120 miles via the M1 and takes about 2 hours 15 minutes in clear traffic. Loading and unloading add 1–3 hours depending on property size, stairs and item count. A full day is typical for a 1–2 bed flat move." },
      { q: "Can I get a same-day London to Birmingham move?", a: "Same-day moves are sometimes possible if a mover is available, but advance booking gives better rates and more choice. A same-day premium of 15–30% above standard rates is typical." },
      { q: "Do I need to worry about the Birmingham Clean Air Zone?", a: "The Birmingham Clean Air Zone covers the city centre inside the A4540 Middleway ring road. If your delivery address is inside the zone, the mover's vehicle may need to pay the daily charge. Most modern diesel vans (Euro 6) and all petrol vans are exempt. Check your delivery postcode at brum.breathes.co.uk." },
      { q: "What is the best time to move from London to Birmingham?", a: "Tuesday to Thursday mornings offer the lightest traffic on the M1. Avoid Friday afternoons and Sunday evenings when motorway traffic peaks. Early morning starts (7–8am) from London avoid congestion around the North Circular and M1 junctions." }
    ],
    relatedRoutes: [
      { label: "Birmingham to London", href: "/routes/birmingham-to-london" },
      { label: "London to Manchester", href: "/routes/london-to-manchester" },
      { label: "London to Coventry", href: "/routes/london-to-coventry" },
      { label: "Birmingham to Bristol", href: "/routes/birmingham-to-bristol" }
    ],
    cityALink: "/man-and-van-london",
    cityBLink: "/man-and-van-birmingham"
  },
  {
    slug: "birmingham-to-london",
    cityA: "Birmingham",
    cityB: "London",
    regionA: "West Midlands",
    regionB: "Greater London",
    distance: "120 miles",
    driveTime: "2 hours 15 minutes",
    motorway: "M1",
    estimatedFrom: "£250",
    estimatedTo: "£550",
    title: "Man and Van Birmingham to London | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Birmingham to London moves. 120 miles via M1. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Birmingham to London",
    intro: "Moving from Birmingham to London? The 120-mile journey via the M1 takes roughly 2 hours 15 minutes in clear traffic. Whether you are relocating to a flat in Croydon, a house in Richmond, or a studio in Camden, a verified man and van can handle the full move. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "Leaving Birmingham before 7am avoids M6 congestion around Spaghetti Junction and the M1 approach",
      "The M6 toll is worth considering for southbound journeys — it bypasses the busiest section between Coventry and the M1",
      "London ULEZ covers all boroughs within the North and South Circular roads — check your delivery postcode",
      "Many London flats have no parking — arrange a parking suspension or loading bay in advance through your local council",
      "Saturday moves in London are often easier for parking but some CPZs still operate — check signs carefully"
    ],
    parkingNotes: [
      { city: "Birmingham", notes: "On-street parking in areas like Edgbaston and Selly Oak usually has time-limited bays. City-centre flats in the Jewellery Quarter may have allocated parking or loading areas." },
      { city: "London", notes: "Controlled Parking Zones cover most boroughs. Residents' parking bays often need a visitor permit. Loading bays allow 20–40 minutes in most areas. Some councils offer one-day parking suspensions for removals — book at least 5 working days in advance." }
    ],
    faq: [
      { q: "How much does a man and van from Birmingham to London cost?", a: "In 2026, a Birmingham to London man and van move typically costs £250–£550 depending on load size, access at both ends and whether it is a one-way or return trip. A single-item delivery starts from around £150. Submit your postcodes and item list for a free guide price." },
      { q: "Can I move from Birmingham to London on a weekend?", a: "Yes. Weekend moves are common for this route. Saturday is generally the best option as Sunday evening traffic on the M1 can be heavy. London parking is often easier on Sundays when some CPZs are unrestricted." },
      { q: "Will the mover charge for London congestion and ULEZ?", a: "If the collection or delivery address is inside the London Congestion Charge zone or ULEZ, the mover may include these fees in the quote. Most modern vans are ULEZ-compliant. Ask the mover to confirm when you receive the quote." },
      { q: "How far in advance should I book a Birmingham to London move?", a: "1–2 weeks in advance is ideal for the best rates and availability. Same-day moves are sometimes possible but attract a premium. End-of-month dates book up fastest." },
      { q: "Is it cheaper to move from Birmingham to London midweek?", a: "Yes. Tuesday to Thursday moves often cost less because demand is lower and motorway traffic is lighter. Friday and Saturday are the busiest days and may carry a small premium." }
    ],
    relatedRoutes: [
      { label: "London to Birmingham", href: "/routes/london-to-birmingham" },
      { label: "Birmingham to Manchester", href: "/routes/birmingham-to-manchester" },
      { label: "Birmingham to Bristol", href: "/routes/birmingham-to-bristol" },
      { label: "Birmingham to Leeds", href: "/routes/birmingham-to-leeds" }
    ],
    cityALink: "/man-and-van-birmingham",
    cityBLink: "/man-and-van-london"
  },
  {
    slug: "london-to-manchester",
    cityA: "London",
    cityB: "Manchester",
    regionA: "Greater London",
    regionB: "Greater Manchester",
    distance: "200 miles",
    driveTime: "3 hours 45 minutes",
    motorway: "M1 / M6",
    estimatedFrom: "£350",
    estimatedTo: "£750",
    title: "Man and Van London to Manchester | Move Quotes | Man and Van Club",
    description: "Man and van quotes for London to Manchester moves. 200 miles via M1/M6. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "London to Manchester",
    intro: "Moving from London to Manchester? The 200-mile journey via the M1 and M6 takes roughly 3 hours 45 minutes in clear traffic. A verified man and van can handle your move end to end — from loading at your London address to unloading at your Manchester property. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M1 northbound gets congested around Luton and Milton Keynes on Friday afternoons — avoid if possible",
      "The M6 through Cheshire (junctions 16–20) can be slow on weekday afternoons — consider the M6 toll if time is tight",
      "Manchester has a Clean Air Zone in the city centre — check if your delivery address is inside it",
      "London ULEZ applies to all areas within the North and South Circular roads",
      "Allow extra time for loading in London if your property is on a Controlled Parking Zone street"
    ],
    parkingNotes: [
      { city: "London", notes: "Most boroughs operate CPZs. Loading bays allow 20–40 minutes. Apply for a parking suspension from your local council at least 5 working days before the move." },
      { city: "Manchester", notes: "Manchester city centre has residents' parking zones. Areas like Didsbury, Chorlton and Salford Quays have on-street parking with time limits. The Clean Air Zone covers the city centre — check at cleanairgm.com." }
    ],
    faq: [
      { q: "How much does a man and van from London to Manchester cost?", a: "In 2026, a London to Manchester man and van move typically costs £350–£750 depending on load size, access at both ends and timing. A single-item delivery starts from around £180. Submit your postcodes and item list for a free guide price." },
      { q: "How long does a London to Manchester move take?", a: "The drive is roughly 200 miles and takes about 3 hours 45 minutes in clear traffic. With loading and unloading, a 1–2 bed flat move typically takes a full day. A full house move may span two trips or require a larger vehicle." },
      { q: "Does Manchester have a Clean Air Zone?", a: "Yes. Manchester's Clean Air Zone covers the city centre and some surrounding areas. Daily charges apply to non-compliant vehicles. Most modern vans are exempt. Check your delivery postcode at cleanairgm.com." },
      { q: "What is the cheapest day to move from London to Manchester?", a: "Tuesday to Thursday are typically the cheapest days due to lower demand and lighter motorway traffic. Avoid the last weekend of the month when moving demand peaks." },
      { q: "Can the mover do a same-day London to Manchester move?", a: "Same-day moves are possible but subject to mover availability. The distance means a same-day job is typically a very early start with loading completed before 8am. Expect a premium of 15–30% above standard rates." }
    ],
    relatedRoutes: [
      { label: "Manchester to London", href: "/routes/manchester-to-london" },
      { label: "London to Birmingham", href: "/routes/london-to-birmingham" },
      { label: "Manchester to Leeds", href: "/routes/manchester-to-leeds" },
      { label: "London to Liverpool", href: "/routes/london-to-liverpool" }
    ],
    cityALink: "/man-and-van-london",
    cityBLink: "/man-and-van-manchester"
  },
  {
    slug: "manchester-to-london",
    cityA: "Manchester",
    cityB: "London",
    regionA: "Greater Manchester",
    regionB: "Greater London",
    distance: "200 miles",
    driveTime: "3 hours 45 minutes",
    motorway: "M6 / M1",
    estimatedFrom: "£350",
    estimatedTo: "£750",
    title: "Man and Van Manchester to London | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Manchester to London moves. 200 miles via M6/M1. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Manchester to London",
    intro: "Moving from Manchester to London? The 200-mile journey via the M6 and M1 takes roughly 3 hours 45 minutes in clear traffic. A verified man and van can handle your move end to end. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "Leaving Manchester before 7am avoids M56 and M6 congestion around Lymm and Knutsford",
      "The M1 southbound around Luton and the M25 interchange is busy from 3pm — plan to clear this section early",
      "Arrange London parking well in advance — most boroughs need 5 working days' notice for a parking suspension",
      "ULEZ covers all London boroughs within the North and South Circular roads",
      "If delivering to Zone 1 or 2, consider a morning delivery before CPZs start at 8:30am in many areas"
    ],
    parkingNotes: [
      { city: "Manchester", notes: "On-street parking in Didsbury, Chorlton and Sale usually has time limits. City-centre flats often have allocated parking. The Clean Air Zone covers central Manchester." },
      { city: "London", notes: "Apply for a parking suspension from the relevant borough at least 5 working days before your move. Loading bays offer 20–40 minutes. Check ULEZ and Congestion Charge zones for your delivery postcode." }
    ],
    faq: [
      { q: "How much does a man and van from Manchester to London cost?", a: "In 2026, a Manchester to London man and van move typically costs £350–£750 depending on load size, access and timing. A single-item delivery starts from around £180. Submit your details for a free guide price." },
      { q: "Is it cheaper to move midweek from Manchester to London?", a: "Yes. Tuesday to Thursday moves usually cost less because demand is lower and motorway traffic is lighter. Friday and month-end dates are the most expensive." },
      { q: "Do I need a parking permit for the London end?", a: "Most London boroughs require a parking suspension or visitor permit for removals vans. Apply through the relevant council's website at least 5 working days in advance." },
      { q: "How long does the drive from Manchester to London take?", a: "About 3 hours 45 minutes via the M6 and M1 in clear traffic. Allow extra time for M25 congestion, particularly around the M1 and M40 junctions." },
      { q: "Can I get a quote before booking?", a: "Yes. Submit your postcodes, item list and access details for free. A verified mover reviews the information and sends a quote. You decide whether to accept before any payment is taken." }
    ],
    relatedRoutes: [
      { label: "London to Manchester", href: "/routes/london-to-manchester" },
      { label: "Manchester to Birmingham", href: "/routes/manchester-to-birmingham" },
      { label: "Manchester to Leeds", href: "/routes/manchester-to-leeds" },
      { label: "Manchester to Bristol", href: "/routes/manchester-to-bristol" }
    ],
    cityALink: "/man-and-van-manchester",
    cityBLink: "/man-and-van-london"
  },
  {
    slug: "london-to-leeds",
    cityA: "London",
    cityB: "Leeds",
    regionA: "Greater London",
    regionB: "West Yorkshire",
    distance: "195 miles",
    driveTime: "3 hours 30 minutes",
    motorway: "M1",
    estimatedFrom: "£350",
    estimatedTo: "£700",
    title: "Man and Van London to Leeds | Move Quotes | Man and Van Club",
    description: "Man and van quotes for London to Leeds moves. 195 miles via M1. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "London to Leeds",
    intro: "Moving from London to Leeds? The 195-mile journey via the M1 takes roughly 3 hours 30 minutes in clear traffic. A verified man and van can handle your move end to end — from loading at your London address to unloading at your Leeds property. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M1 northbound is congested around Luton and Milton Keynes on Friday afternoons",
      "Leeds city centre has a Clean Air Zone — check if your delivery address falls inside it",
      "London ULEZ and Congestion Charge may apply at the collection end",
      "Headingley and Hyde Park areas in Leeds are popular student areas with limited on-street parking",
      "The M1 around Sheffield and Rotherham can be slow during rush hour — allow extra time"
    ],
    parkingNotes: [
      { city: "London", notes: "Most boroughs operate CPZs. Apply for a parking suspension at least 5 working days before the move." },
      { city: "Leeds", notes: "Leeds city centre has a Clean Air Zone. Areas like Headingley and Chapel Allerton have residents' parking zones. On-street parking is generally easier than London but time-limited in popular areas." }
    ],
    faq: [
      { q: "How much does a man and van from London to Leeds cost?", a: "In 2026, a London to Leeds man and van move typically costs £350–£700 depending on load size, access and timing. A single-item delivery starts from around £175. Submit your postcodes and item list for a free guide price." },
      { q: "How long does the drive from London to Leeds take?", a: "About 3 hours 30 minutes via the M1 in clear traffic. With loading and unloading, a full day is typical for a flat move. Allow extra time for M1 roadworks and Sheffield area congestion." },
      { q: "Does Leeds have a Clean Air Zone?", a: "Yes. Leeds operates a Clean Air Zone covering the city centre. Non-compliant vehicles are charged. Most modern vans meet the standard. Check your delivery postcode on the Leeds City Council website." },
      { q: "When is the best time to move from London to Leeds?", a: "Tuesday to Thursday mornings offer the lightest traffic. Avoid the M1 on Friday afternoons and Sunday evenings when traffic peaks." }
    ],
    relatedRoutes: [
      { label: "Leeds to London", href: "/routes/leeds-to-london" },
      { label: "London to Manchester", href: "/routes/london-to-manchester" },
      { label: "Leeds to Birmingham", href: "/routes/leeds-to-birmingham" },
      { label: "London to Sheffield", href: "/routes/london-to-sheffield" }
    ],
    cityALink: "/man-and-van-london",
    cityBLink: "/man-and-van-leeds"
  },
  {
    slug: "leeds-to-london",
    cityA: "Leeds",
    cityB: "London",
    regionA: "West Yorkshire",
    regionB: "Greater London",
    distance: "195 miles",
    driveTime: "3 hours 30 minutes",
    motorway: "M1",
    estimatedFrom: "£350",
    estimatedTo: "£700",
    title: "Man and Van Leeds to London | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Leeds to London moves. 195 miles via M1. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Leeds to London",
    intro: "Moving from Leeds to London? The 195-mile journey via the M1 takes roughly 3 hours 30 minutes in clear traffic. A verified man and van can handle the full move. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M1 southbound gets busy around Sheffield, Nottingham and Luton on weekday afternoons",
      "London ULEZ applies to all areas within the North and South Circular roads",
      "Arrange London parking at least 5 working days in advance",
      "Leaving Leeds before 7am means you reach the M25 before afternoon congestion builds",
      "Leeds Clean Air Zone covers the city centre — check at the collection end"
    ],
    parkingNotes: [
      { city: "Leeds", notes: "Leeds city centre has a Clean Air Zone. Areas like Headingley and Chapel Allerton have residents' parking zones with time limits." },
      { city: "London", notes: "Apply for a parking suspension from the relevant borough at least 5 working days before the move. Loading bays offer 20–40 minutes in most areas." }
    ],
    faq: [
      { q: "How much does a man and van from Leeds to London cost?", a: "In 2026, a Leeds to London man and van move typically costs £350–£700 depending on load size, access and timing. A single-item delivery starts from around £175. Submit your details for a free guide price." },
      { q: "Can I move from Leeds to London on a Saturday?", a: "Yes. Saturday moves are popular for this route. Motorway traffic is lighter on Saturday mornings. London parking can be easier on weekends when some CPZs are unrestricted." },
      { q: "How far in advance should I book?", a: "1–2 weeks is ideal for best rates and availability. End-of-month and university term dates book up fastest in Leeds." }
    ],
    relatedRoutes: [
      { label: "London to Leeds", href: "/routes/london-to-leeds" },
      { label: "Leeds to Manchester", href: "/routes/leeds-to-manchester" },
      { label: "Leeds to Birmingham", href: "/routes/leeds-to-birmingham" },
      { label: "Manchester to London", href: "/routes/manchester-to-london" }
    ],
    cityALink: "/man-and-van-leeds",
    cityBLink: "/man-and-van-london"
  },
  {
    slug: "birmingham-to-manchester",
    cityA: "Birmingham",
    cityB: "Manchester",
    regionA: "West Midlands",
    regionB: "Greater Manchester",
    distance: "85 miles",
    driveTime: "1 hour 45 minutes",
    motorway: "M6",
    estimatedFrom: "£200",
    estimatedTo: "£450",
    title: "Man and Van Birmingham to Manchester | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Birmingham to Manchester moves. 85 miles via M6. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Birmingham to Manchester",
    intro: "Moving from Birmingham to Manchester? The 85-mile journey via the M6 takes roughly 1 hour 45 minutes in clear traffic. A verified man and van can handle the full move — from loading in Birmingham to unloading at your Manchester property. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M6 between Birmingham and Manchester is one of the busiest stretches in the UK — avoid Friday afternoons",
      "The M6 toll (junctions 3a–11a) costs £5.90 for cars and can save 20–30 minutes at peak times",
      "Manchester Clean Air Zone covers the city centre — check your delivery postcode at cleanairgm.com",
      "Birmingham Clean Air Zone applies at the collection end if you are inside the A4540 ring road",
      "Stoke-on-Trent and Knutsford are the main congestion points on the M6"
    ],
    parkingNotes: [
      { city: "Birmingham", notes: "On-street parking in areas like Edgbaston and Selly Oak usually has time-limited bays. City-centre flats may have allocated parking or loading areas." },
      { city: "Manchester", notes: "Manchester city centre has residents' parking zones. Areas like Didsbury, Chorlton and Salford Quays have on-street parking with time limits. The Clean Air Zone covers the city centre." }
    ],
    faq: [
      { q: "How much does a man and van from Birmingham to Manchester cost?", a: "In 2026, a Birmingham to Manchester man and van move typically costs £200–£450 depending on load size, access and timing. A single-item delivery starts from around £120. Submit your postcodes and item list for a free guide price." },
      { q: "How long does the drive from Birmingham to Manchester take?", a: "About 1 hour 45 minutes via the M6 in clear traffic. Allow extra time for the Thelwall Viaduct area (junctions 20–22) which is frequently congested. Loading and unloading add 1–3 hours depending on property size." },
      { q: "Is the M6 toll worth it for a Birmingham to Manchester move?", a: "The M6 toll bypasses the most congested section between Birmingham and Stafford. It is most useful during weekday rush hours (7–9am, 4–7pm) when the free M6 can add 30+ minutes to the journey." },
      { q: "Does Manchester have a Clean Air Zone?", a: "Yes. Manchester's Clean Air Zone covers the city centre. Most modern vans are exempt. Check your delivery postcode at cleanairgm.com." }
    ],
    relatedRoutes: [
      { label: "Manchester to Birmingham", href: "/routes/manchester-to-birmingham" },
      { label: "Birmingham to London", href: "/routes/birmingham-to-london" },
      { label: "Birmingham to Leeds", href: "/routes/birmingham-to-leeds" },
      { label: "Manchester to Liverpool", href: "/routes/manchester-to-liverpool" }
    ],
    cityALink: "/man-and-van-birmingham",
    cityBLink: "/man-and-van-manchester"
  },
  {
    slug: "manchester-to-birmingham",
    cityA: "Manchester",
    cityB: "Birmingham",
    regionA: "Greater Manchester",
    regionB: "West Midlands",
    distance: "85 miles",
    driveTime: "1 hour 45 minutes",
    motorway: "M6",
    estimatedFrom: "£200",
    estimatedTo: "£450",
    title: "Man and Van Manchester to Birmingham | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Manchester to Birmingham moves. 85 miles via M6. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Manchester to Birmingham",
    intro: "Moving from Manchester to Birmingham? The 85-mile journey via the M6 takes roughly 1 hour 45 minutes in clear traffic. A verified man and van can handle the full move. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M6 southbound from Manchester is congested around Thelwall Viaduct and Knutsford on weekday mornings",
      "The M6 toll can save 20–30 minutes when the main M6 is busy between junctions 10a and 4",
      "Birmingham Clean Air Zone covers the city centre inside the A4540 ring road",
      "If delivering to Birmingham suburbs like Solihull, Sutton Coldfield or Edgbaston, the A34 or A45 may be faster than the M6"
    ],
    parkingNotes: [
      { city: "Manchester", notes: "On-street parking in Didsbury, Chorlton and Sale usually has time limits. The Clean Air Zone covers central Manchester." },
      { city: "Birmingham", notes: "The Clean Air Zone covers the city centre ring road area. Suburbs like Edgbaston, Selly Oak and Sutton Coldfield usually have on-street parking available." }
    ],
    faq: [
      { q: "How much does a man and van from Manchester to Birmingham cost?", a: "In 2026, a Manchester to Birmingham man and van move typically costs £200–£450 depending on load size, access and timing. A single-item delivery starts from around £120. Submit your details for a free guide price." },
      { q: "When is the best time to drive from Manchester to Birmingham?", a: "Tuesday to Thursday mornings offer the lightest M6 traffic. Avoid the M6 on Friday afternoons when northbound and southbound traffic both peak." },
      { q: "Do I need to pay the Birmingham Clean Air Zone charge?", a: "If your delivery address is inside the A4540 ring road, non-compliant vehicles pay a daily charge. Most modern vans are exempt. Check your postcode at brum.breathes.co.uk." }
    ],
    relatedRoutes: [
      { label: "Birmingham to Manchester", href: "/routes/birmingham-to-manchester" },
      { label: "Manchester to London", href: "/routes/manchester-to-london" },
      { label: "Birmingham to London", href: "/routes/birmingham-to-london" },
      { label: "Manchester to Leeds", href: "/routes/manchester-to-leeds" }
    ],
    cityALink: "/man-and-van-manchester",
    cityBLink: "/man-and-van-birmingham"
  },
  {
    slug: "birmingham-to-bristol",
    cityA: "Birmingham",
    cityB: "Bristol",
    regionA: "West Midlands",
    regionB: "South West",
    distance: "90 miles",
    driveTime: "1 hour 50 minutes",
    motorway: "M5",
    estimatedFrom: "£200",
    estimatedTo: "£450",
    title: "Man and Van Birmingham to Bristol | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Birmingham to Bristol moves. 90 miles via M5. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Birmingham to Bristol",
    intro: "Moving from Birmingham to Bristol? The 90-mile journey via the M5 takes roughly 1 hour 50 minutes in clear traffic. A verified man and van can handle the full move. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M5 southbound is busy around Bromsgrove and the M42 interchange on weekday afternoons",
      "Bristol has a Clean Air Zone in the city centre — check your delivery postcode",
      "The M5 between junctions 15 (Almondsbury) and 19 (Portishead) can be slow at peak times",
      "Clifton and Redland areas in Bristol have narrow streets and residents' parking — plan loading access",
      "Birmingham Clean Air Zone applies if your collection address is inside the A4540 ring road"
    ],
    parkingNotes: [
      { city: "Birmingham", notes: "On-street parking in areas like Edgbaston and Selly Oak usually has time-limited bays. The Clean Air Zone covers the city centre." },
      { city: "Bristol", notes: "Bristol has a Clean Air Zone covering the city centre. Clifton, Redland and Cotham have residents' parking zones. On-street parking in Bishopston and Horfield is usually easier but time-limited." }
    ],
    faq: [
      { q: "How much does a man and van from Birmingham to Bristol cost?", a: "In 2026, a Birmingham to Bristol man and van move typically costs £200–£450 depending on load size, access and timing. A single-item delivery starts from around £120. Submit your details for a free guide price." },
      { q: "Does Bristol have a Clean Air Zone?", a: "Yes. Bristol's Clean Air Zone covers the city centre. Most modern vans are exempt. Check your delivery postcode on the Bristol City Council website." },
      { q: "How long does the drive from Birmingham to Bristol take?", a: "About 1 hour 50 minutes via the M5 in clear traffic. Allow extra time for M5 congestion around Bromsgrove and the M4/M5 interchange at Almondsbury." },
      { q: "Is parking difficult in Bristol for removals?", a: "City-centre flats often have no parking. Areas like Clifton and Redland have residents' parking zones. Apply for a parking suspension from Bristol City Council at least 5 working days before the move." }
    ],
    relatedRoutes: [
      { label: "Bristol to Birmingham", href: "/routes/bristol-to-birmingham" },
      { label: "Birmingham to London", href: "/routes/birmingham-to-london" },
      { label: "Bristol to London", href: "/routes/bristol-to-london" },
      { label: "Birmingham to Manchester", href: "/routes/birmingham-to-manchester" }
    ],
    cityALink: "/man-and-van-birmingham",
    cityBLink: "/man-and-van-bristol"
  },
  {
    slug: "bristol-to-london",
    cityA: "Bristol",
    cityB: "London",
    regionA: "South West",
    regionB: "Greater London",
    distance: "120 miles",
    driveTime: "2 hours 15 minutes",
    motorway: "M4",
    estimatedFrom: "£250",
    estimatedTo: "£550",
    title: "Man and Van Bristol to London | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Bristol to London moves. 120 miles via M4. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Bristol to London",
    intro: "Moving from Bristol to London? The 120-mile journey via the M4 takes roughly 2 hours 15 minutes in clear traffic. A verified man and van can handle the full move. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M4 eastbound is busy around Reading and the M25 interchange on weekday mornings",
      "The M4 bus lane between junctions 2 and 3 near London helps if your mover's van qualifies",
      "London ULEZ covers all boroughs within the North and South Circular roads",
      "Arrange London parking at least 5 working days in advance — parking suspensions are essential for most boroughs",
      "Bristol Clean Air Zone applies at the collection end if you are in the city centre"
    ],
    parkingNotes: [
      { city: "Bristol", notes: "Bristol's Clean Air Zone covers the city centre. Clifton and Redland have residents' parking zones. On-street parking is usually easier than London but time-limited." },
      { city: "London", notes: "Apply for a parking suspension from the relevant borough at least 5 working days before the move. Loading bays offer 20–40 minutes in most areas." }
    ],
    faq: [
      { q: "How much does a man and van from Bristol to London cost?", a: "In 2026, a Bristol to London man and van move typically costs £250–£550 depending on load size, access and timing. A single-item delivery starts from around £140. Submit your details for a free guide price." },
      { q: "How long does the drive from Bristol to London take?", a: "About 2 hours 15 minutes via the M4 in clear traffic. The M4 around Reading and the M25 interchange can add 30+ minutes at peak times." },
      { q: "What is the best time to move from Bristol to London?", a: "Tuesday to Thursday mornings offer the lightest M4 traffic. Avoid Friday afternoons when the M4 eastbound is busy with weekend traffic." },
      { q: "Will ULEZ charges apply?", a: "If your delivery address is inside London's ULEZ zone (within the North and South Circular roads), a non-compliant vehicle would be charged. Most modern vans are ULEZ-compliant." }
    ],
    relatedRoutes: [
      { label: "London to Bristol", href: "/routes/london-to-bristol" },
      { label: "Bristol to Birmingham", href: "/routes/bristol-to-birmingham" },
      { label: "London to Cardiff", href: "/routes/london-to-cardiff" },
      { label: "Bristol to Manchester", href: "/routes/bristol-to-manchester" }
    ],
    cityALink: "/man-and-van-bristol",
    cityBLink: "/man-and-van-london"
  },
  {
    slug: "london-to-cardiff",
    cityA: "London",
    cityB: "Cardiff",
    regionA: "Greater London",
    regionB: "Wales",
    distance: "150 miles",
    driveTime: "2 hours 45 minutes",
    motorway: "M4",
    estimatedFrom: "£300",
    estimatedTo: "£600",
    title: "Man and Van London to Cardiff | Move Quotes | Man and Van Club",
    description: "Man and van quotes for London to Cardiff moves. 150 miles via M4. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "London to Cardiff",
    intro: "Moving from London to Cardiff? The 150-mile journey via the M4 takes roughly 2 hours 45 minutes in clear traffic. A verified man and van can handle the full move. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M4 westbound through the Brynglas Tunnels near Newport can be slow — expect delays at peak times",
      "The Severn Bridge crossing is toll-free since 2018",
      "Cardiff city centre has limited on-street parking — arrange a parking bay in advance",
      "London ULEZ and Congestion Charge may apply at the collection end",
      "Pontcanna and Canton areas in Cardiff have residents' parking zones"
    ],
    parkingNotes: [
      { city: "London", notes: "Most boroughs operate CPZs. Apply for a parking suspension at least 5 working days before the move." },
      { city: "Cardiff", notes: "Cardiff city centre has residents' parking zones. Pontcanna, Canton and Roath have time-limited on-street parking. Apply for a parking suspension from Cardiff Council for the moving day." }
    ],
    faq: [
      { q: "How much does a man and van from London to Cardiff cost?", a: "In 2026, a London to Cardiff man and van move typically costs £300–£600 depending on load size, access and timing. A single-item delivery starts from around £160. Submit your details for a free guide price." },
      { q: "Is the Severn Bridge still tolled?", a: "No. The Severn Bridge tolls were removed in December 2018. The M4 crossing between England and Wales is now free." },
      { q: "How long does the drive from London to Cardiff take?", a: "About 2 hours 45 minutes via the M4 in clear traffic. The Brynglas Tunnels near Newport and the M4 around Reading are the main congestion points." }
    ],
    relatedRoutes: [
      { label: "Cardiff to London", href: "/routes/cardiff-to-london" },
      { label: "London to Bristol", href: "/routes/london-to-bristol" },
      { label: "Cardiff to Birmingham", href: "/routes/cardiff-to-birmingham" },
      { label: "London to Swansea", href: "/routes/london-to-swansea" }
    ],
    cityALink: "/man-and-van-london",
    cityBLink: "/man-and-van-cardiff"
  },
  {
    slug: "london-to-edinburgh",
    cityA: "London",
    cityB: "Edinburgh",
    regionA: "Greater London",
    regionB: "Scotland",
    distance: "400 miles",
    driveTime: "7 hours",
    motorway: "A1(M) / A1",
    estimatedFrom: "£550",
    estimatedTo: "£1,200",
    title: "Man and Van London to Edinburgh | Move Quotes | Man and Van Club",
    description: "Man and van quotes for London to Edinburgh moves. 400 miles via A1(M). Long-distance verified movers, transparent pricing. Submit your move details for free.",
    h1: "London to Edinburgh",
    intro: "Moving from London to Edinburgh? The 400-mile journey via the A1(M) takes roughly 7 hours in clear traffic. A verified man and van can handle this long-distance move end to end. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The A1 is less prone to congestion than the M6/M74 route but has fewer service areas",
      "An alternative route via the M1, M6 and M74 is longer but has more motorway services",
      "Edinburgh has a Low Emission Zone (LEZ) covering the city centre — non-compliant vehicles are charged",
      "For a 400-mile move, the mover may need to plan overnight rest stops or use a two-driver team",
      "London ULEZ and Congestion Charge apply at the collection end depending on postcode"
    ],
    parkingNotes: [
      { city: "London", notes: "Most boroughs operate CPZs. Apply for a parking suspension at least 5 working days before the move." },
      { city: "Edinburgh", notes: "Edinburgh has a Low Emission Zone covering the city centre. Leith, Morningside and Portobello have residents' parking zones. On-street parking in the Old Town and New Town is very limited — arrange a parking suspension from Edinburgh City Council." }
    ],
    faq: [
      { q: "How much does a man and van from London to Edinburgh cost?", a: "In 2026, a London to Edinburgh man and van move typically costs £550–£1,200 depending on load size, access and timing. The 400-mile distance means this is typically a full-day or two-day job. Submit your details for a free guide price." },
      { q: "How long does a London to Edinburgh move take?", a: "The drive is roughly 400 miles and takes about 7 hours in clear traffic via the A1. With loading and unloading, the full move typically takes 1–2 days depending on property size." },
      { q: "Does Edinburgh have an emission zone?", a: "Yes. Edinburgh's Low Emission Zone (LEZ) covers the city centre. Non-compliant vehicles are charged. Most modern vans meet the standard. Check with the mover before booking." },
      { q: "Is it cheaper to move to Edinburgh midweek?", a: "Yes. Midweek moves typically cost less due to lower demand. A 400-mile journey also benefits from lighter weekday motorway traffic." }
    ],
    relatedRoutes: [
      { label: "Edinburgh to London", href: "/routes/edinburgh-to-london" },
      { label: "London to Glasgow", href: "/routes/london-to-glasgow" },
      { label: "Edinburgh to Manchester", href: "/routes/edinburgh-to-manchester" },
      { label: "London to Leeds", href: "/routes/london-to-leeds" }
    ],
    cityALink: "/man-and-van-london",
    cityBLink: "/man-and-van-edinburgh"
  },
  {
    slug: "london-to-liverpool",
    cityA: "London",
    cityB: "Liverpool",
    regionA: "Greater London",
    regionB: "Merseyside",
    distance: "220 miles",
    driveTime: "3 hours 50 minutes",
    motorway: "M1 / M6",
    estimatedFrom: "£350",
    estimatedTo: "£750",
    title: "Man and Van London to Liverpool | Move Quotes | Man and Van Club",
    description: "Man and van quotes for London to Liverpool moves. 220 miles via M1/M6. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "London to Liverpool",
    intro: "Moving from London to Liverpool? The 220-mile journey via the M1 and M6 takes roughly 3 hours 50 minutes in clear traffic. A verified man and van can handle the full move. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M6 between Birmingham and the M62 interchange at junction 21a is frequently congested",
      "The M62 across the Pennines can be affected by high winds and poor visibility — check conditions",
      "Liverpool city centre has a Clean Air Zone — check your delivery postcode",
      "Areas like Aigburth and Mossley Hill have on-street parking with time limits",
      "London ULEZ and Congestion Charge apply at the collection end"
    ],
    parkingNotes: [
      { city: "London", notes: "Most boroughs operate CPZs. Apply for a parking suspension at least 5 working days before the move." },
      { city: "Liverpool", notes: "Liverpool city centre has a Clean Air Zone. Areas like Aigburth, Mossley Hill and Allerton have on-street parking with time limits. City-centre flats near the docks often have allocated parking." }
    ],
    faq: [
      { q: "How much does a man and van from London to Liverpool cost?", a: "In 2026, a London to Liverpool man and van move typically costs £350–£750 depending on load size, access and timing. A single-item delivery starts from around £180. Submit your details for a free guide price." },
      { q: "How long does the drive from London to Liverpool take?", a: "About 3 hours 50 minutes via the M1 and M6 in clear traffic. The M6 around Birmingham and the M62 interchange are the main congestion points." },
      { q: "Does Liverpool have a Clean Air Zone?", a: "Yes. Liverpool has a Clean Air Zone covering the city centre. Most modern vans are exempt. Check your delivery postcode on Liverpool City Council's website." }
    ],
    relatedRoutes: [
      { label: "Liverpool to London", href: "/routes/liverpool-to-london" },
      { label: "London to Manchester", href: "/routes/london-to-manchester" },
      { label: "Liverpool to Birmingham", href: "/routes/liverpool-to-birmingham" },
      { label: "Manchester to Liverpool", href: "/routes/manchester-to-liverpool" }
    ],
    cityALink: "/man-and-van-london",
    cityBLink: "/man-and-van-liverpool"
  },
  {
    slug: "birmingham-to-leeds",
    cityA: "Birmingham",
    cityB: "Leeds",
    regionA: "West Midlands",
    regionB: "West Yorkshire",
    distance: "120 miles",
    driveTime: "2 hours",
    motorway: "M42 / M1",
    estimatedFrom: "£250",
    estimatedTo: "£500",
    title: "Man and Van Birmingham to Leeds | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Birmingham to Leeds moves. 120 miles via M42/M1. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Birmingham to Leeds",
    intro: "Moving from Birmingham to Leeds? The 120-mile journey via the M42 and M1 takes roughly 2 hours in clear traffic. A verified man and van can handle the full move. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M42 northbound is congested around the M42/M6 interchange on weekday mornings",
      "The M1 between Sheffield and Leeds is busy during rush hour — allow extra time",
      "Leeds has a Clean Air Zone covering the city centre — check your delivery postcode",
      "Birmingham Clean Air Zone applies if your collection address is inside the A4540 ring road"
    ],
    parkingNotes: [
      { city: "Birmingham", notes: "On-street parking in areas like Edgbaston and Selly Oak usually has time-limited bays. The Clean Air Zone covers the city centre." },
      { city: "Leeds", notes: "Leeds city centre has a Clean Air Zone. Headingley and Chapel Allerton have residents' parking zones with time limits." }
    ],
    faq: [
      { q: "How much does a man and van from Birmingham to Leeds cost?", a: "In 2026, a Birmingham to Leeds man and van move typically costs £250–£500 depending on load size, access and timing. A single-item delivery starts from around £140. Submit your details for a free guide price." },
      { q: "How long does the drive from Birmingham to Leeds take?", a: "About 2 hours via the M42 and M1 in clear traffic. The M1 around Sheffield can add 15–30 minutes at peak times." },
      { q: "When is the best time to move?", a: "Tuesday to Thursday mornings offer the lightest traffic. Avoid the M1 on Friday afternoons." }
    ],
    relatedRoutes: [
      { label: "Leeds to Birmingham", href: "/routes/leeds-to-birmingham" },
      { label: "Birmingham to Manchester", href: "/routes/birmingham-to-manchester" },
      { label: "Leeds to London", href: "/routes/leeds-to-london" },
      { label: "Birmingham to Sheffield", href: "/routes/birmingham-to-sheffield" }
    ],
    cityALink: "/man-and-van-birmingham",
    cityBLink: "/man-and-van-leeds"
  },
  {
    slug: "leeds-to-manchester",
    cityA: "Leeds",
    cityB: "Manchester",
    regionA: "West Yorkshire",
    regionB: "Greater Manchester",
    distance: "40 miles",
    driveTime: "55 minutes",
    motorway: "M62",
    estimatedFrom: "£150",
    estimatedTo: "£350",
    title: "Man and Van Leeds to Manchester | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Leeds to Manchester moves. 40 miles via M62. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Leeds to Manchester",
    intro: "Moving from Leeds to Manchester? The 40-mile journey via the M62 takes roughly 55 minutes in clear traffic. A verified man and van can handle the full move — ideal for a half-day job. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M62 is one of the busiest motorways in the north — weekday rush hours (7–9am, 4–7pm) can add 20–30 minutes",
      "Both cities have Clean Air Zones in the city centre",
      "The M606 spur connects the M62 directly into Bradford — useful if collecting from Bradford",
      "Huddersfield is the main congestion point on the M62 between Leeds and Manchester"
    ],
    parkingNotes: [
      { city: "Leeds", notes: "Leeds city centre has a Clean Air Zone. Headingley and Chapel Allerton have residents' parking zones." },
      { city: "Manchester", notes: "Manchester's Clean Air Zone covers the city centre. Didsbury, Chorlton and Salford Quays have on-street parking with time limits." }
    ],
    faq: [
      { q: "How much does a man and van from Leeds to Manchester cost?", a: "In 2026, a Leeds to Manchester man and van move typically costs £150–£350 depending on load size, access and timing. The short distance makes this one of the most affordable inter-city moves. Submit your details for a free guide price." },
      { q: "Can I move from Leeds to Manchester in half a day?", a: "Yes. For a 1-bed flat or smaller, loading, driving and unloading can be completed in 3–4 hours. Larger house moves may take a full day." },
      { q: "When is the M62 quietest between Leeds and Manchester?", a: "Mid-morning (10am–12pm) and early afternoon (1–3pm) on weekdays are typically the quietest times. Avoid weekday rush hours." }
    ],
    relatedRoutes: [
      { label: "Manchester to Leeds", href: "/routes/manchester-to-leeds" },
      { label: "Leeds to London", href: "/routes/leeds-to-london" },
      { label: "Manchester to Birmingham", href: "/routes/manchester-to-birmingham" },
      { label: "Leeds to Sheffield", href: "/routes/leeds-to-sheffield" }
    ],
    cityALink: "/man-and-van-leeds",
    cityBLink: "/man-and-van-manchester"
  },
  {
    slug: "manchester-to-leeds",
    cityA: "Manchester",
    cityB: "Leeds",
    regionA: "Greater Manchester",
    regionB: "West Yorkshire",
    distance: "40 miles",
    driveTime: "55 minutes",
    motorway: "M62",
    estimatedFrom: "£150",
    estimatedTo: "£350",
    title: "Man and Van Manchester to Leeds | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Manchester to Leeds moves. 40 miles via M62. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Manchester to Leeds",
    intro: "Moving from Manchester to Leeds? The 40-mile journey via the M62 takes roughly 55 minutes in clear traffic. A verified man and van can handle the full move — ideal for a half-day job. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M62 eastbound from Manchester is busy around the M60 interchange on weekday mornings",
      "Huddersfield is the main congestion point on the M62 between the two cities",
      "Leeds Clean Air Zone covers the city centre — check your delivery postcode",
      "A half-day move is typical for a flat or small house on this route"
    ],
    parkingNotes: [
      { city: "Manchester", notes: "Manchester's Clean Air Zone covers the city centre. On-street parking in Didsbury and Chorlton has time limits." },
      { city: "Leeds", notes: "Leeds city centre has a Clean Air Zone. Headingley and Chapel Allerton have residents' parking zones with time limits." }
    ],
    faq: [
      { q: "How much does a man and van from Manchester to Leeds cost?", a: "In 2026, a Manchester to Leeds man and van move typically costs £150–£350 depending on load size and access. The short distance makes this an affordable inter-city move. Submit your details for a free guide price." },
      { q: "Can I do a same-day move from Manchester to Leeds?", a: "Yes. The short distance (40 miles) makes same-day moves very achievable. A 1-bed flat move can typically be completed in 3–4 hours including loading and unloading." }
    ],
    relatedRoutes: [
      { label: "Leeds to Manchester", href: "/routes/leeds-to-manchester" },
      { label: "Manchester to Birmingham", href: "/routes/manchester-to-birmingham" },
      { label: "Leeds to London", href: "/routes/leeds-to-london" },
      { label: "Manchester to Liverpool", href: "/routes/manchester-to-liverpool" }
    ],
    cityALink: "/man-and-van-manchester",
    cityBLink: "/man-and-van-leeds"
  },
  {
    slug: "london-to-coventry",
    cityA: "London",
    cityB: "Coventry",
    regionA: "Greater London",
    regionB: "West Midlands",
    distance: "95 miles",
    driveTime: "1 hour 50 minutes",
    motorway: "M1 / M45",
    estimatedFrom: "£200",
    estimatedTo: "£450",
    title: "Man and Van London to Coventry | Move Quotes | Man and Van Club",
    description: "Man and van quotes for London to Coventry moves. 95 miles via M1. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "London to Coventry",
    intro: "Moving from London to Coventry? The 95-mile journey via the M1 takes roughly 1 hour 50 minutes in clear traffic. A verified man and van can handle the full move. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M1 northbound through Luton and Milton Keynes is congested on Friday afternoons",
      "Coventry ring road is a one-way system that can confuse sat-navs — check access to your delivery address",
      "Coventry has no Clean Air Zone but parking in the city centre is limited",
      "London ULEZ and Congestion Charge may apply at the collection end",
      "Student move dates in Coventry (July and September) book up early — plan ahead"
    ],
    parkingNotes: [
      { city: "London", notes: "Most boroughs operate CPZs. Apply for a parking suspension at least 5 working days before the move." },
      { city: "Coventry", notes: "Coventry has no Clean Air Zone. On-street parking in Earlsdon and areas near the university has time limits. City-centre flats often have allocated parking." }
    ],
    faq: [
      { q: "How much does a man and van from London to Coventry cost?", a: "In 2026, a London to Coventry man and van move typically costs £200–£450 depending on load size, access and timing. A single-item delivery starts from around £130. Submit your details for a free guide price." },
      { q: "Is Coventry a Clean Air Zone?", a: "No. Coventry does not currently have a Clean Air Zone. On-street parking is generally easier than Birmingham or London." },
      { q: "When is the best time to move from London to Coventry?", a: "Tuesday to Thursday mornings offer the lightest M1 traffic. Avoid the M1 on Friday afternoons when northbound traffic is heavy." }
    ],
    relatedRoutes: [
      { label: "London to Birmingham", href: "/routes/london-to-birmingham" },
      { label: "London to Leicester", href: "/routes/london-to-leicester" },
      { label: "London to Northampton", href: "/routes/london-to-northampton" },
      { label: "Birmingham to Coventry", href: "/routes/birmingham-to-coventry" }
    ],
    cityALink: "/man-and-van-london",
    cityBLink: "/man-and-van-coventry"
  },
  {
    slug: "edinburgh-to-glasgow",
    cityA: "Edinburgh",
    cityB: "Glasgow",
    regionA: "Scotland",
    regionB: "Scotland",
    distance: "47 miles",
    driveTime: "1 hour",
    motorway: "M8",
    estimatedFrom: "£150",
    estimatedTo: "£350",
    title: "Man and Van Edinburgh to Glasgow | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Edinburgh to Glasgow moves. 47 miles via M8. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Edinburgh to Glasgow",
    intro: "Moving from Edinburgh to Glasgow? The 47-mile journey via the M8 takes roughly 1 hour in clear traffic. A verified man and van can handle the full move — ideal for a half-day job. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M8 between Edinburgh and Glasgow is one of Scotland's busiest motorways — rush hour adds 20–30 minutes",
      "Both Edinburgh and Glasgow have Low Emission Zones covering their city centres",
      "The M8 through Livingston and Bathgate is the main congestion point",
      "Edinburgh's LEZ is enforced 24/7 — check your collection postcode",
      "Glasgow's LEZ covers the city centre inside the M8 ring"
    ],
    parkingNotes: [
      { city: "Edinburgh", notes: "Edinburgh has a Low Emission Zone covering the city centre. Leith and Morningside have residents' parking zones. On-street parking in the Old Town is very limited." },
      { city: "Glasgow", notes: "Glasgow has a Low Emission Zone covering the city centre inside the M8 motorway ring. West End, Shawlands and Dennistoun have residents' parking zones." }
    ],
    faq: [
      { q: "How much does a man and van from Edinburgh to Glasgow cost?", a: "In 2026, an Edinburgh to Glasgow man and van move typically costs £150–£350 depending on load size, access and timing. The short distance makes this an affordable inter-city move. Submit your details for a free guide price." },
      { q: "Can I move from Edinburgh to Glasgow in half a day?", a: "Yes. For a 1-bed flat or smaller, loading, driving and unloading can typically be completed in 3–4 hours. Larger house moves may take a full day." },
      { q: "Do Edinburgh and Glasgow have emission zones?", a: "Yes. Both cities have Low Emission Zones (LEZs) covering their city centres. Most modern vans meet the standard. Check with the mover before booking." }
    ],
    relatedRoutes: [
      { label: "Glasgow to Edinburgh", href: "/routes/glasgow-to-edinburgh" },
      { label: "Edinburgh to London", href: "/routes/edinburgh-to-london" },
      { label: "Edinburgh to Manchester", href: "/routes/edinburgh-to-manchester" },
      { label: "Glasgow to Manchester", href: "/routes/glasgow-to-manchester" }
    ],
    cityALink: "/man-and-van-edinburgh",
    cityBLink: "/man-and-van-glasgow"
  },
  {
    slug: "glasgow-to-edinburgh",
    cityA: "Glasgow",
    cityB: "Edinburgh",
    regionA: "Scotland",
    regionB: "Scotland",
    distance: "47 miles",
    driveTime: "1 hour",
    motorway: "M8",
    estimatedFrom: "£150",
    estimatedTo: "£350",
    title: "Man and Van Glasgow to Edinburgh | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Glasgow to Edinburgh moves. 47 miles via M8. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Glasgow to Edinburgh",
    intro: "Moving from Glasgow to Edinburgh? The 47-mile journey via the M8 takes roughly 1 hour in clear traffic. A verified man and van can handle the full move. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M8 eastbound from Glasgow is busy during weekday rush hours (7–9am)",
      "Both cities have Low Emission Zones in the city centre",
      "Edinburgh's LEZ is enforced 24/7 — check your delivery postcode",
      "The A8 alternative through Livingston is useful if the M8 is blocked"
    ],
    parkingNotes: [
      { city: "Glasgow", notes: "Glasgow has a Low Emission Zone covering the city centre inside the M8 motorway ring. West End and Shawlands have residents' parking zones." },
      { city: "Edinburgh", notes: "Edinburgh has a Low Emission Zone covering the city centre. Leith, Morningside and Portobello have residents' parking zones. On-street parking in the Old Town is very limited." }
    ],
    faq: [
      { q: "How much does a man and van from Glasgow to Edinburgh cost?", a: "In 2026, a Glasgow to Edinburgh man and van move typically costs £150–£350 depending on load size and access. The short distance makes this an affordable inter-city move. Submit your details for a free guide price." },
      { q: "Can I do a same-day move from Glasgow to Edinburgh?", a: "Yes. The short distance (47 miles) makes same-day moves very achievable. A flat move can typically be completed in 3–4 hours." }
    ],
    relatedRoutes: [
      { label: "Edinburgh to Glasgow", href: "/routes/edinburgh-to-glasgow" },
      { label: "Glasgow to Manchester", href: "/routes/glasgow-to-manchester" },
      { label: "Edinburgh to London", href: "/routes/edinburgh-to-london" }
    ],
    cityALink: "/man-and-van-glasgow",
    cityBLink: "/man-and-van-edinburgh"
  },
  {
    slug: "manchester-to-liverpool",
    cityA: "Manchester",
    cityB: "Liverpool",
    regionA: "Greater Manchester",
    regionB: "Merseyside",
    distance: "35 miles",
    driveTime: "45 minutes",
    motorway: "M62 / M602",
    estimatedFrom: "£130",
    estimatedTo: "£300",
    title: "Man and Van Manchester to Liverpool | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Manchester to Liverpool moves. 35 miles via M62. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Manchester to Liverpool",
    intro: "Moving from Manchester to Liverpool? The 35-mile journey via the M62 and M602 takes roughly 45 minutes in clear traffic. A verified man and van can handle the full move — ideal for a half-day job. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M62 and M602 are generally quick outside rush hour — avoid 7–9am and 4–7pm on weekdays",
      "Liverpool has a Clean Air Zone in the city centre — check your delivery postcode",
      "Manchester Clean Air Zone covers the city centre at the collection end",
      "Widnes and Runcorn (M62 over the Mersey) can be slow at peak times"
    ],
    parkingNotes: [
      { city: "Manchester", notes: "Manchester's Clean Air Zone covers the city centre. On-street parking in Didsbury and Chorlton has time limits." },
      { city: "Liverpool", notes: "Liverpool has a Clean Air Zone covering the city centre. Aigburth and Mossley Hill have on-street parking with time limits." }
    ],
    faq: [
      { q: "How much does a man and van from Manchester to Liverpool cost?", a: "In 2026, a Manchester to Liverpool man and van move typically costs £130–£300 depending on load size and access. The short distance makes this one of the most affordable inter-city moves in the UK. Submit your details for a free guide price." },
      { q: "Can I move from Manchester to Liverpool in half a day?", a: "Yes. For a flat or small house, the move can typically be completed in 2–4 hours including loading, driving and unloading." }
    ],
    relatedRoutes: [
      { label: "Liverpool to Manchester", href: "/routes/liverpool-to-manchester" },
      { label: "Manchester to Leeds", href: "/routes/manchester-to-leeds" },
      { label: "Manchester to Birmingham", href: "/routes/manchester-to-birmingham" },
      { label: "Liverpool to London", href: "/routes/liverpool-to-london" }
    ],
    cityALink: "/man-and-van-manchester",
    cityBLink: "/man-and-van-liverpool"
  },
  {
    slug: "london-to-nottingham",
    cityA: "London",
    cityB: "Nottingham",
    regionA: "Greater London",
    regionB: "East Midlands",
    distance: "130 miles",
    driveTime: "2 hours 20 minutes",
    motorway: "M1",
    estimatedFrom: "£250",
    estimatedTo: "£550",
    title: "Man and Van London to Nottingham | Move Quotes | Man and Van Club",
    description: "Man and van quotes for London to Nottingham moves. 130 miles via M1. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "London to Nottingham",
    intro: "Moving from London to Nottingham? The 130-mile journey via the M1 takes roughly 2 hours 20 minutes in clear traffic. A verified man and van can handle the full move. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M1 northbound through Luton and Milton Keynes is congested on Friday afternoons",
      "Nottingham has a Clean Air Zone covering the city centre — check your delivery postcode",
      "London ULEZ and Congestion Charge may apply at the collection end",
      "Nottingham's tram network means some city-centre streets have restricted access"
    ],
    parkingNotes: [
      { city: "London", notes: "Most boroughs operate CPZs. Apply for a parking suspension at least 5 working days before the move." },
      { city: "Nottingham", notes: "Nottingham has a Clean Air Zone covering the city centre. Areas like West Bridgford, Beeston and Arnold have on-street parking with time limits." }
    ],
    faq: [
      { q: "How much does a man and van from London to Nottingham cost?", a: "In 2026, a London to Nottingham man and van move typically costs £250–£550 depending on load size, access and timing. A single-item delivery starts from around £140. Submit your details for a free guide price." },
      { q: "Does Nottingham have a Clean Air Zone?", a: "Yes. Nottingham has a Clean Air Zone covering the city centre. Most modern vans are exempt. Check your delivery postcode on Nottingham City Council's website." },
      { q: "How long does the drive from London to Nottingham take?", a: "About 2 hours 20 minutes via the M1 in clear traffic. The M1 around Luton and the M25 interchange can add 15–30 minutes at peak times." }
    ],
    relatedRoutes: [
      { label: "Nottingham to London", href: "/routes/nottingham-to-london" },
      { label: "London to Birmingham", href: "/routes/london-to-birmingham" },
      { label: "London to Leicester", href: "/routes/london-to-leicester" },
      { label: "London to Leeds", href: "/routes/london-to-leeds" }
    ],
    cityALink: "/man-and-van-london",
    cityBLink: "/man-and-van-nottingham"
  },
  {
    slug: "london-to-sheffield",
    cityA: "London",
    cityB: "Sheffield",
    regionA: "Greater London",
    regionB: "South Yorkshire",
    distance: "165 miles",
    driveTime: "3 hours",
    motorway: "M1",
    estimatedFrom: "£300",
    estimatedTo: "£650",
    title: "Man and Van London to Sheffield | Move Quotes | Man and Van Club",
    description: "Man and van quotes for London to Sheffield moves. 165 miles via M1. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "London to Sheffield",
    intro: "Moving from London to Sheffield? The 165-mile journey via the M1 takes roughly 3 hours in clear traffic. A verified man and van can handle the full move. Submit your postcodes and item list for a free guide price first.",
    routeTips: [
      "The M1 around Sheffield and Rotherham (junctions 30–34) is frequently congested during rush hour",
      "Sheffield has a Clean Air Zone covering the city centre — check your delivery postcode",
      "The M1 through the East Midlands (junctions 21–28) can be busy on weekday afternoons",
      "London ULEZ and Congestion Charge apply at the collection end"
    ],
    parkingNotes: [
      { city: "London", notes: "Most boroughs operate CPZs. Apply for a parking suspension at least 5 working days before the move." },
      { city: "Sheffield", notes: "Sheffield has a Clean Air Zone covering the city centre. Areas like Nether Edge, Broomhill and Ecclesall have on-street parking with time limits." }
    ],
    faq: [
      { q: "How much does a man and van from London to Sheffield cost?", a: "In 2026, a London to Sheffield man and van move typically costs £300–£650 depending on load size, access and timing. A single-item delivery starts from around £160. Submit your details for a free guide price." },
      { q: "How long does the drive from London to Sheffield take?", a: "About 3 hours via the M1 in clear traffic. The M1 around Luton, the East Midlands and Sheffield can add 30+ minutes at peak times." },
      { q: "Does Sheffield have a Clean Air Zone?", a: "Yes. Sheffield has a Clean Air Zone covering the city centre. Most modern vans are exempt. Check your delivery postcode on Sheffield City Council's website." }
    ],
    relatedRoutes: [
      { label: "Sheffield to London", href: "/routes/sheffield-to-london" },
      { label: "London to Leeds", href: "/routes/london-to-leeds" },
      { label: "London to Manchester", href: "/routes/london-to-manchester" },
      { label: "Sheffield to Birmingham", href: "/routes/sheffield-to-birmingham" }
    ],
    cityALink: "/man-and-van-london",
    cityBLink: "/man-and-van-sheffield"
  }
];

// Lookup helper
export function getRouteBySlug(slug: string): RouteData | undefined {
  return ROUTES.find(r => r.slug === slug);
}

// All route slugs for static generation
export function getAllRouteSlugs(): string[] {
  return ROUTES.map(r => r.slug);
}
