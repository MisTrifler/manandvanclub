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
  },
  {
    slug: "birmingham-to-coventry",
    cityA: "Birmingham",
    cityB: "Coventry",
    regionA: "West Midlands",
    regionB: "West Midlands",
    distance: "20 miles",
    driveTime: "40 minutes",
    motorway: "M6 / A45",
    estimatedFrom: "£80",
    estimatedTo: "£280",
    title: "Man and Van Birmingham to Coventry | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Birmingham to Coventry moves. 20 miles via M6 / A45. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Birmingham to Coventry",
    intro: "Moving from Birmingham to Coventry? The 20-mile journey via the M6 and A45 takes roughly 40 minutes in clear traffic. It's a common local route — close enough that some movers treat it as a half-day job. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The M6 between junctions 4 and 5 gets congested during rush hours — allow an extra 20 minutes",
      "The A45 Coventry Road is an alternative if the M6 is backed up, but it has average speed cameras through Sheldon and Meriden",
      "Coventry's ring road is one-way and can be confusing — the junctions are numbered 1 to 12",
      "Birmingham Clean Air Zone applies at the collection end if you're in the city centre"
    ],
    parkingNotes: [
      { city: "Birmingham", notes: "The Clean Air Zone covers the city centre inside the A4540 Middleway. Suburban areas like Acocks Green, Yardley and Sheldon have free on-street parking." },
      { city: "Coventry", notes: "Coventry has a Clean Air Zone covering the city centre and ring road area. Earlsdon, Cheylesmore and Binley generally have easier parking." }
    ],
    faq: [
      { q: "How much does a man and van from Birmingham to Coventry cost?", a: "In 2026, a Birmingham to Coventry man and van move typically costs £80–£280 depending on load size and access. A single-item collection starts from around £50." },
      { q: "How long does a Birmingham to Coventry move take?", a: "The drive is about 20 miles and takes 35–45 minutes. Loading and unloading add 1–3 hours depending on property size. Most moves are completed in half a day." },
      { q: "Is there a Clean Air Zone in Coventry?", a: "Yes. Coventry's Clean Air Zone covers the city centre and inner ring road. Most modern Euro 6 diesel vans and all petrol vans are exempt." }
    ],
    relatedRoutes: [
      { label: "Coventry to Birmingham", href: "/routes/coventry-to-birmingham" },
      { label: "Birmingham to Leicester", href: "/routes/birmingham-to-leicester" }
    ],
    cityALink: "/man-and-van-birmingham",
    cityBLink: "/man-and-van-coventry"
  },
  {
    slug: "coventry-to-birmingham",
    cityA: "Coventry",
    cityB: "Birmingham",
    regionA: "West Midlands",
    regionB: "West Midlands",
    distance: "20 miles",
    driveTime: "40 minutes",
    motorway: "M6 / A45",
    estimatedFrom: "£80",
    estimatedTo: "£280",
    title: "Man and Van Coventry to Birmingham | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Coventry to Birmingham moves. 20 miles via M6 / A45. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Coventry to Birmingham",
    intro: "Moving from Coventry to Birmingham? The 20-mile journey via the M6 and A45 takes roughly 40 minutes in clear traffic. It's a straightforward local move for most man and van services. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The M6 northbound between junctions 2 and 4 slows during the morning rush — leave before 7:30am for a smoother run",
      "The A45 is the main alternative through Meriden and Sheldon if the M6 is congested",
      "If your Birmingham delivery address is in the city centre, use the A4540 Middleway rather than the inner ring",
      "Coventry's ring road is one-way — plan your exit carefully"
    ],
    parkingNotes: [
      { city: "Coventry", notes: "Coventry has a Clean Air Zone covering the city centre. Suburban areas like Earlsdon, Styvechale and Wyken have free on-street parking." },
      { city: "Birmingham", notes: "The Clean Air Zone covers the city centre inside the A4540 Middleway ring road. Areas like Moseley, Kings Heath and Harborne have on-street parking with some time limits." }
    ],
    faq: [
      { q: "How much does a man and van from Coventry to Birmingham cost?", a: "In 2026, a Coventry to Birmingham man and van move typically costs £80–£280 depending on load size and access. A single-item collection starts from around £50." },
      { q: "Can I do a Coventry to Birmingham move and be done by lunch?", a: "Yes, for a studio or 1-bed flat move with good access at both ends, a morning start usually finishes by early afternoon. Larger moves take a full day." }
    ],
    relatedRoutes: [
      { label: "Birmingham to Coventry", href: "/routes/birmingham-to-coventry" },
      { label: "London to Coventry", href: "/routes/london-to-coventry" }
    ],
    cityALink: "/man-and-van-coventry",
    cityBLink: "/man-and-van-birmingham"
  },
  {
    slug: "birmingham-to-leicester",
    cityA: "Birmingham",
    cityB: "Leicester",
    regionA: "West Midlands",
    regionB: "East Midlands",
    distance: "45 miles",
    driveTime: "1 hour",
    motorway: "M6 / M69",
    estimatedFrom: "£120",
    estimatedTo: "£400",
    title: "Man and Van Birmingham to Leicester | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Birmingham to Leicester moves. 45 miles via M6 / M69. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Birmingham to Leicester",
    intro: "Moving from Birmingham to Leicester? The 45-mile journey via the M6 and M69 takes roughly 1 hour in clear traffic. It's a popular cross-Midlands route for house moves and student moves. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The M69 is a quieter motorway but can slow near Leicester where it meets the M1 at junction 21",
      "If the M6 is congested around Coventry, the A47 through Nuneaton is a reasonable alternative",
      "Leicester's inner ring road has average speed cameras and one-way sections — a sat-nav helps",
      "Student moves between Birmingham and Leicester peak in June/July and September"
    ],
    parkingNotes: [
      { city: "Birmingham", notes: "The Clean Air Zone covers the city centre inside the A4540. Suburban areas like Acocks Green and Yardley have unrestricted parking." },
      { city: "Leicester", notes: "Leicester city centre has a Clean Air Zone. Areas like Oadby, Evington and Wigston have on-street parking with fewer restrictions. Clarendon Park and Highfields have permit-only zones." }
    ],
    faq: [
      { q: "How much does a man and van from Birmingham to Leicester cost?", a: "In 2026, a Birmingham to Leicester man and van move typically costs £120–£400 depending on load size, access and timing. A single-item delivery starts from around £70." },
      { q: "Is this a common route for student moves?", a: "Yes. Both cities have large student populations. Book early for June/July and September if you're moving student accommodation." }
    ],
    relatedRoutes: [
      { label: "Leicester to Birmingham", href: "/routes/leicester-to-birmingham" },
      { label: "Birmingham to Coventry", href: "/routes/birmingham-to-coventry" },
      { label: "Birmingham to Nottingham", href: "/routes/birmingham-to-nottingham" }
    ],
    cityALink: "/man-and-van-birmingham",
    cityBLink: "/man-and-van-leicester"
  },
  {
    slug: "leicester-to-birmingham",
    cityA: "Leicester",
    cityB: "Birmingham",
    regionA: "East Midlands",
    regionB: "West Midlands",
    distance: "45 miles",
    driveTime: "1 hour",
    motorway: "M69 / M6",
    estimatedFrom: "£120",
    estimatedTo: "£400",
    title: "Man and Van Leicester to Birmingham | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Leicester to Birmingham moves. 45 miles via M69 / M6. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Leicester to Birmingham",
    intro: "Moving from Leicester to Birmingham? The 45-mile journey via the M69 and M6 takes roughly 1 hour in clear traffic. A cross-Midlands move that's common for both house moves and student moves. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The M69 joins the M6 at junction 2 — the M6 northbound towards Birmingham can be slow from junctions 2 to 5 during the evening rush",
      "If heading to south Birmingham (Solihull, Shirley), the A47 and A45 through Nuneaton can be faster",
      "Leicester's Welford Road and London Road are busy routes out — plan your departure around morning traffic",
      "The M6 toll provides a faster alternative if the M6 is congested"
    ],
    parkingNotes: [
      { city: "Leicester", notes: "Leicester city centre has a Clean Air Zone. Clarendon Park and Highfields have permit-only parking. Oadby and Wigston have fewer restrictions." },
      { city: "Birmingham", notes: "The Clean Air Zone covers the city centre inside the A4540 Middleway. Suburban areas like Moseley, Kings Heath and Harborne have on-street parking." }
    ],
    faq: [
      { q: "How much does a man and van from Leicester to Birmingham cost?", a: "In 2026, a Leicester to Birmingham man and van move typically costs £120–£400. A single-item delivery starts from around £70." },
      { q: "Can I move from Leicester to Birmingham in half a day?", a: "For a studio or 1-bed flat with good access, yes — the drive is about an hour. Larger moves need a full day." }
    ],
    relatedRoutes: [
      { label: "Birmingham to Leicester", href: "/routes/birmingham-to-leicester" },
      { label: "Leicester to Nottingham", href: "/routes/leicester-to-nottingham" },
      { label: "London to Leicester", href: "/routes/london-to-leicester" }
    ],
    cityALink: "/man-and-van-leicester",
    cityBLink: "/man-and-van-birmingham"
  },
  {
    slug: "birmingham-to-nottingham",
    cityA: "Birmingham",
    cityB: "Nottingham",
    regionA: "West Midlands",
    regionB: "East Midlands",
    distance: "55 miles",
    driveTime: "1 hour 15 minutes",
    motorway: "M42 / M1",
    estimatedFrom: "£140",
    estimatedTo: "£450",
    title: "Man and Van Birmingham to Nottingham | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Birmingham to Nottingham moves. 55 miles via M42 / M1. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Birmingham to Nottingham",
    intro: "Moving from Birmingham to Nottingham? The 55-mile journey via the M42 and M1 takes roughly 1 hour 15 minutes in clear traffic. A straightforward cross-Midlands move. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The M42 near the M40 junction (3a) can be congested during rush hour",
      "Leave the M1 at junction 25 for Nottingham south (West Bridgford, Gamston) or junction 26 for the north",
      "Nottingham's tram network runs through several main roads — check for tram-only sections near your address",
      "The A453 between the M1 and Nottingham was upgraded to dual carriageway and is now faster"
    ],
    parkingNotes: [
      { city: "Birmingham", notes: "The Clean Air Zone covers the city centre inside the A4540 Middleway. Solihull, Shirley and Hall Green have unrestricted on-street parking." },
      { city: "Nottingham", notes: "Nottingham has no Clean Air Zone but does have a workplace parking levy. West Bridgford, Beeston and Arnold have on-street parking with fewer restrictions. The city centre has Controlled Parking Zones." }
    ],
    faq: [
      { q: "How much does a man and van from Birmingham to Nottingham cost?", a: "In 2026, a Birmingham to Nottingham man and van move typically costs £140–£450 depending on load size, access and timing. A single-item delivery starts from around £80." },
      { q: "Does Nottingham have a Clean Air Zone?", a: "No. Nottingham does not currently have a Clean Air Zone. However, the city centre has controlled parking zones." }
    ],
    relatedRoutes: [
      { label: "Nottingham to Birmingham", href: "/routes/nottingham-to-birmingham" },
      { label: "Birmingham to Leicester", href: "/routes/birmingham-to-leicester" },
      { label: "London to Nottingham", href: "/routes/london-to-nottingham" }
    ],
    cityALink: "/man-and-van-birmingham",
    cityBLink: "/man-and-van-nottingham"
  },
  {
    slug: "nottingham-to-birmingham",
    cityA: "Nottingham",
    cityB: "Birmingham",
    regionA: "East Midlands",
    regionB: "West Midlands",
    distance: "55 miles",
    driveTime: "1 hour 15 minutes",
    motorway: "M1 / M42",
    estimatedFrom: "£140",
    estimatedTo: "£450",
    title: "Man and Van Nottingham to Birmingham | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Nottingham to Birmingham moves. 55 miles via M1 / M42. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Nottingham to Birmingham",
    intro: "Moving from Nottingham to Birmingham? The 55-mile journey via the M1 and M42 takes roughly 1 hour 15 minutes. A common cross-Midlands route for house moves and work relocations. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "Join the M1 southbound at junction 25 or 26 and take the M42 west at junction 23a",
      "The M1 between Nottingham and Leicester (junctions 21–25) can be slow during weekday rush hours",
      "If heading to south Birmingham, the A46 to the A45 through Coventry can be an alternative",
      "Avoid the M42 around Birmingham airport during the afternoon peak"
    ],
    parkingNotes: [
      { city: "Nottingham", notes: "No Clean Air Zone in Nottingham. The city centre has Controlled Parking Zones. West Bridgford, Beeston and Arnold have fewer restrictions." },
      { city: "Birmingham", notes: "The Clean Air Zone covers the city centre inside the A4540 Middleway. Suburban areas like Moseley, Kings Heath and Harborne have on-street parking." }
    ],
    faq: [
      { q: "How much does a man and van from Nottingham to Birmingham cost?", a: "In 2026, a Nottingham to Birmingham man and van move typically costs £140–£450. A single-item delivery starts from around £80." },
      { q: "Can I move from Nottingham to Birmingham in a morning?", a: "For a 1-bed flat with good access, yes — the drive is about 1 hour 15 minutes. Larger moves need a full day." }
    ],
    relatedRoutes: [
      { label: "Birmingham to Nottingham", href: "/routes/birmingham-to-nottingham" },
      { label: "Nottingham to Leicester", href: "/routes/nottingham-to-leicester" },
      { label: "London to Birmingham", href: "/routes/london-to-birmingham" }
    ],
    cityALink: "/man-and-van-nottingham",
    cityBLink: "/man-and-van-birmingham"
  },
  {
    slug: "birmingham-to-walsall",
    cityA: "Birmingham",
    cityB: "Walsall",
    regionA: "West Midlands",
    regionB: "West Midlands",
    distance: "10 miles",
    driveTime: "25 minutes",
    motorway: "A34 / M6",
    estimatedFrom: "£60",
    estimatedTo: "£250",
    title: "Man and Van Birmingham to Walsall | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Birmingham to Walsall moves. 10 miles via A34 / M6. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Birmingham to Walsall",
    intro: "Moving from Birmingham to Walsall? The 10-mile journey via the A34 or M6 takes roughly 25 minutes in clear traffic. It's a short local move — close enough that most movers treat it as a standard local job. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The A34 Walsall Road is the most direct route — but it has average speed cameras through Perry Barr",
      "The M6 between junctions 6 and 7 gets congested during rush hour — the A34 is often faster",
      "Walsall town centre has one-way streets near the Saddlers Centre — use a sat-nav for the last mile",
      "Birmingham Clean Air Zone applies if you're collecting from the city centre"
    ],
    parkingNotes: [
      { city: "Birmingham", notes: "The Clean Air Zone covers the city centre inside the A4540 Middleway. Areas like Perry Barr, Handsworth and Great Barr have free on-street parking." },
      { city: "Walsall", notes: "Walsall does not have a Clean Air Zone. Aldridge, Bloxwich and Pelsall have easier parking with fewer restrictions." }
    ],
    faq: [
      { q: "How much does a man and van from Birmingham to Walsall cost?", a: "In 2026, a Birmingham to Walsall man and van move typically costs £60–£250 depending on load size and access. A single-item delivery starts from around £50." },
      { q: "Can I do a Birmingham to Walsall move in a few hours?", a: "Yes. The drive is only 10–15 minutes. A studio or 1-bed flat move with good access can be done in 2–3 hours." }
    ],
    relatedRoutes: [
      { label: "Walsall to Birmingham", href: "/routes/walsall-to-birmingham" },
      { label: "Birmingham to Coventry", href: "/routes/birmingham-to-coventry" }
    ],
    cityALink: "/man-and-van-birmingham",
    cityBLink: "/man-and-van-walsall"
  },
  {
    slug: "walsall-to-birmingham",
    cityA: "Walsall",
    cityB: "Birmingham",
    regionA: "West Midlands",
    regionB: "West Midlands",
    distance: "10 miles",
    driveTime: "25 minutes",
    motorway: "A34 / M6",
    estimatedFrom: "£60",
    estimatedTo: "£250",
    title: "Man and Van Walsall to Birmingham | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Walsall to Birmingham moves. 10 miles via A34 / M6. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Walsall to Birmingham",
    intro: "Moving from Walsall to Birmingham? The 10-mile journey via the A34 or M6 takes roughly 25 minutes. A short local move within the West Midlands conurbation. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The A34 southbound towards Birmingham is busy during morning rush — allow an extra 15 minutes",
      "If heading to Birmingham city centre, the M6 junction 6 (A38M) is the fastest entry point",
      "For south Birmingham (Moseley, Kings Heath, Solihull), use the A4540 Middleway",
      "Birmingham's Clean Air Zone applies if the delivery address is in the city centre"
    ],
    parkingNotes: [
      { city: "Walsall", notes: "No Clean Air Zone in Walsall. Aldridge, Brownhills and Pelsall have easy parking. The town centre near the market has time-limited bays." },
      { city: "Birmingham", notes: "The Clean Air Zone covers the city centre inside the A4540 Middleway. Edgbaston, Moseley and Harborne have on-street parking." }
    ],
    faq: [
      { q: "How much does a man and van from Walsall to Birmingham cost?", a: "In 2026, a Walsall to Birmingham man and van move typically costs £60–£250. A single-item delivery starts from around £50." }
    ],
    relatedRoutes: [
      { label: "Birmingham to Walsall", href: "/routes/birmingham-to-walsall" },
      { label: "London to Birmingham", href: "/routes/london-to-birmingham" }
    ],
    cityALink: "/man-and-van-walsall",
    cityBLink: "/man-and-van-birmingham"
  },
  {
    slug: "birmingham-to-wolverhampton",
    cityA: "Birmingham",
    cityB: "Wolverhampton",
    regionA: "West Midlands",
    regionB: "West Midlands",
    distance: "15 miles",
    driveTime: "30 minutes",
    motorway: "M6 / A41",
    estimatedFrom: "£60",
    estimatedTo: "£260",
    title: "Man and Van Birmingham to Wolverhampton | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Birmingham to Wolverhampton moves. 15 miles via M6 / A41. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Birmingham to Wolverhampton",
    intro: "Moving from Birmingham to Wolverhampton? The 15-mile journey via the M6 or A41 takes roughly 30 minutes. It's a short local move within the Black Country. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The A41 Birmingham New Road is the most direct route",
      "The M6 between junctions 8 and 10 is an alternative but often congested during rush hour",
      "Wolverhampton city centre has a one-way system around the ring road — plan your approach",
      "Birmingham's Clean Air Zone applies if your collection address is in the city centre"
    ],
    parkingNotes: [
      { city: "Birmingham", notes: "The Clean Air Zone covers the city centre inside the A4540. Smethwick, Oldbury and West Bromwich have unrestricted parking." },
      { city: "Wolverhampton", notes: "No Clean Air Zone in Wolverhampton. Tettenhall, Compton and Penn have easy on-street parking. The city centre has time-limited bays near the train station." }
    ],
    faq: [
      { q: "How much does a man and van from Birmingham to Wolverhampton cost?", a: "In 2026, a Birmingham to Wolverhampton man and van move typically costs £60–£260. A single-item delivery starts from around £50." },
      { q: "Does Wolverhampton have a Clean Air Zone?", a: "No. Wolverhampton does not have a Clean Air Zone. Birmingham's zone applies if the collection address is inside the A4540 Middleway." }
    ],
    relatedRoutes: [
      { label: "Wolverhampton to Birmingham", href: "/routes/wolverhampton-to-birmingham" },
      { label: "Birmingham to Walsall", href: "/routes/birmingham-to-walsall" }
    ],
    cityALink: "/man-and-van-birmingham",
    cityBLink: "/man-and-van-wolverhampton"
  },
  {
    slug: "wolverhampton-to-birmingham",
    cityA: "Wolverhampton",
    cityB: "Birmingham",
    regionA: "West Midlands",
    regionB: "West Midlands",
    distance: "15 miles",
    driveTime: "30 minutes",
    motorway: "A41 / M6",
    estimatedFrom: "£60",
    estimatedTo: "£260",
    title: "Man and Van Wolverhampton to Birmingham | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Wolverhampton to Birmingham moves. 15 miles via A41 / M6. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Wolverhampton to Birmingham",
    intro: "Moving from Wolverhampton to Birmingham? The 15-mile journey via the A41 or M6 takes roughly 30 minutes. A short Black Country to Birmingham move that's straightforward for local movers. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The A41 eastbound towards Birmingham is the most direct route",
      "The M6 southbound from junction 10 to 6 can be congested during the morning commute",
      "If heading to central Birmingham, use the A4540 Middleway rather than the inner city",
      "Birmingham's Clean Air Zone applies if the delivery address is inside the A4540 ring road"
    ],
    parkingNotes: [
      { city: "Wolverhampton", notes: "No Clean Air Zone. Penn, Tettenhall and Compton have easy parking. The city centre has time-limited bays." },
      { city: "Birmingham", notes: "The Clean Air Zone covers the city centre inside the A4540. Edgbaston, Harborne and Moseley have on-street parking." }
    ],
    faq: [
      { q: "How much does a man and van from Wolverhampton to Birmingham cost?", a: "In 2026, a Wolverhampton to Birmingham man and van move typically costs £60–£260. A single-item delivery starts from around £50." }
    ],
    relatedRoutes: [
      { label: "Birmingham to Wolverhampton", href: "/routes/birmingham-to-wolverhampton" },
      { label: "Walsall to Birmingham", href: "/routes/walsall-to-birmingham" },
      { label: "London to Birmingham", href: "/routes/london-to-birmingham" }
    ],
    cityALink: "/man-and-van-wolverhampton",
    cityBLink: "/man-and-van-birmingham"
  },
  {
    slug: "manchester-to-edinburgh",
    cityA: "Manchester",
    cityB: "Edinburgh",
    regionA: "Greater Manchester",
    regionB: "Scotland",
    distance: "220 miles",
    driveTime: "4 hours",
    motorway: "M6 / A74(M) / M8",
    estimatedFrom: "£400",
    estimatedTo: "£800",
    title: "Man and Van Manchester to Edinburgh | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Manchester to Edinburgh moves. 220 miles via M6 / A74(M) / M8. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Manchester to Edinburgh",
    intro: "Moving from Manchester to Edinburgh? The 220-mile journey via the M6, A74(M) and M8 takes roughly 4 hours in clear traffic. It's a long-distance move that crosses the England-Scotland border. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The M6 north of Carlisle becomes the A74(M) at the Scottish border — no tolls, but the road narrows in places",
      "Shap Fell on the M6 (junctions 38–39) can be dangerous in winter weather — check conditions before setting off",
      "Edinburgh has a Low Emission Zone covering the city centre — most modern vans are exempt",
      "The M8 through Glasgow and into Edinburgh gets busy during rush hours",
      "Fuel stops on the A74(M) are more spread out than on the M6 — fill up at Tebay if needed"
    ],
    parkingNotes: [
      { city: "Manchester", notes: "Manchester has a Clean Air Zone covering the city centre. Most suburban areas have on-street parking. Salford Quays and the Northern Quarter have restricted parking." },
      { city: "Edinburgh", notes: "Edinburgh has a Low Emission Zone covering the city centre. Leith, Portobello and Corstorphine have on-street parking with some restrictions. The Old Town and New Town have controlled parking zones." }
    ],
    faq: [
      { q: "How much does a man and van from Manchester to Edinburgh cost?", a: "In 2026, a Manchester to Edinburgh man and van move typically costs £400–£800. A single-item delivery starts from around £200." },
      { q: "Does Edinburgh have an emission zone?", a: "Yes. Edinburgh has a Low Emission Zone covering the city centre. Most Euro 6 diesel vans and all petrol vans are exempt." },
      { q: "Is there anything to watch on the M6 between Manchester and Scotland?", a: "Shap Fell (junctions 38–39) can be affected by strong winds and poor visibility, especially in winter. The A74(M) has fewer services than the M6." }
    ],
    relatedRoutes: [
      { label: "Edinburgh to Manchester", href: "/routes/edinburgh-to-manchester" },
      { label: "Edinburgh to Glasgow", href: "/routes/edinburgh-to-glasgow" },
      { label: "London to Edinburgh", href: "/routes/london-to-edinburgh" }
    ],
    cityALink: "/man-and-van-manchester",
    cityBLink: "/man-and-van-edinburgh"
  },
  {
    slug: "edinburgh-to-manchester",
    cityA: "Edinburgh",
    cityB: "Manchester",
    regionA: "Scotland",
    regionB: "Greater Manchester",
    distance: "220 miles",
    driveTime: "4 hours",
    motorway: "M8 / A74(M) / M6",
    estimatedFrom: "£400",
    estimatedTo: "£800",
    title: "Man and Van Edinburgh to Manchester | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Edinburgh to Manchester moves. 220 miles via M8 / A74(M) / M6. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Edinburgh to Manchester",
    intro: "Moving from Edinburgh to Manchester? The 220-mile journey via the M8, A74(M) and M6 takes roughly 4 hours in clear traffic. A cross-border move common for work relocations. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "Leave Edinburgh early to avoid the M8 Glasgow rush hour — junctions 8 to 13 slow considerably between 7:30 and 9am",
      "The A74(M) through the Scottish borders is generally clear but has limited service areas",
      "Shap Fell on the M6 (junctions 38–39) can have poor visibility in bad weather",
      "Manchester's Clean Air Zone covers the city centre — check your delivery postcode"
    ],
    parkingNotes: [
      { city: "Edinburgh", notes: "Edinburgh has a Low Emission Zone covering the city centre. Leith, Morningsade and Portobello have a mix of free and restricted parking." },
      { city: "Manchester", notes: "Manchester has a Clean Air Zone covering the city centre. Didsbury, Chorlton and Sale have on-street parking with fewer restrictions." }
    ],
    faq: [
      { q: "How much does a man and van from Edinburgh to Manchester cost?", a: "In 2026, an Edinburgh to Manchester man and van move typically costs £400–£800. A single-item delivery starts from around £200." },
      { q: "Are there any border crossings or tolls?", a: "No tolls or border checks between Scotland and England. The road changes from A74(M) to M6 at the border but it's continuous motorway standard." }
    ],
    relatedRoutes: [
      { label: "Manchester to Edinburgh", href: "/routes/manchester-to-edinburgh" },
      { label: "Edinburgh to Glasgow", href: "/routes/edinburgh-to-glasgow" },
      { label: "London to Manchester", href: "/routes/london-to-manchester" }
    ],
    cityALink: "/man-and-van-edinburgh",
    cityBLink: "/man-and-van-manchester"
  },
  {
    slug: "manchester-to-sheffield",
    cityA: "Manchester",
    cityB: "Sheffield",
    regionA: "Greater Manchester",
    regionB: "South Yorkshire",
    distance: "40 miles",
    driveTime: "1 hour",
    motorway: "A57 / M67",
    estimatedFrom: "£120",
    estimatedTo: "£400",
    title: "Man and Van Manchester to Sheffield | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Manchester to Sheffield moves. 40 miles via A57 / M67. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Manchester to Sheffield",
    intro: "Moving from Manchester to Sheffield? The 40-mile Pennine crossing takes roughly 1 hour via the A57 or M67. It's shorter than you'd think, but the Pennine crossing needs planning in bad weather. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The Snake Pass (A57) is scenic but closes in winter snow — check the status before relying on it",
      "The Woodhead Pass (A628) is an alternative but also affected by high-altitude weather",
      "The M67 from Manchester to Glossop is the most reliable motorway option, then A57 to Sheffield",
      "Sheffield's city centre has a Clean Air Zone — check if your delivery address is within it"
    ],
    parkingNotes: [
      { city: "Manchester", notes: "Manchester has a Clean Air Zone covering the city centre. Didsbury, Stockport and Altrincham have easier parking." },
      { city: "Sheffield", notes: "Sheffield has a Clean Air Zone covering the city centre. Ecclesall, Nether Edge and Broomhill have on-street parking with fewer restrictions." }
    ],
    faq: [
      { q: "How much does a man and van from Manchester to Sheffield cost?", a: "In 2026, a Manchester to Sheffield man and van move typically costs £120–£400. A single-item delivery starts from around £70." },
      { q: "What's the best route from Manchester to Sheffield?", a: "The M67 to Glossop then A57 (Snake Pass) is the most common. In winter, the M1 via Leeds is longer but more reliable." },
      { q: "Does the Snake Pass close in winter?", a: "Yes. It regularly closes during snow and ice, typically between November and March. Check Derbyshire County Council's website." }
    ],
    relatedRoutes: [
      { label: "Sheffield to Manchester", href: "/routes/sheffield-to-manchester" },
      { label: "Leeds to Manchester", href: "/routes/leeds-to-manchester" },
      { label: "Manchester to Liverpool", href: "/routes/manchester-to-liverpool" }
    ],
    cityALink: "/man-and-van-manchester",
    cityBLink: "/man-and-van-sheffield"
  },
  {
    slug: "sheffield-to-manchester",
    cityA: "Sheffield",
    cityB: "Manchester",
    regionA: "South Yorkshire",
    regionB: "Greater Manchester",
    distance: "40 miles",
    driveTime: "1 hour",
    motorway: "A57 / M67",
    estimatedFrom: "£120",
    estimatedTo: "£400",
    title: "Man and Van Sheffield to Manchester | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Sheffield to Manchester moves. 40 miles via A57 / M67. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Sheffield to Manchester",
    intro: "Moving from Sheffield to Manchester? The 40-mile Pennine crossing takes roughly 1 hour via the A57 and M67. A popular route for people relocating between South Yorkshire and Greater Manchester. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "Take the A57 (Snake Pass) west from Sheffield — it's the most direct route in good weather",
      "In winter, the M1 north to the M62 west is a safer (but 30-minute longer) alternative",
      "The M67 eastbound from the A57 has frequent speed cameras",
      "Manchester's Clean Air Zone applies to the city centre"
    ],
    parkingNotes: [
      { city: "Sheffield", notes: "Sheffield has a Clean Air Zone covering the city centre. Ecclesall, Broomhill and Nether Edge have easier parking." },
      { city: "Manchester", notes: "Manchester has a Clean Air Zone covering the city centre. Salford, Didsbury and Stockport have on-street parking." }
    ],
    faq: [
      { q: "How much does a man and van from Sheffield to Manchester cost?", a: "In 2026, a Sheffield to Manchester man and van move typically costs £120–£400. A single-item delivery starts from around £70." },
      { q: "How long does the drive take in winter?", a: "If the Snake Pass is open, add 15–20 minutes for cautious driving. If it's closed, the M1/M62 route takes about 1 hour 30 minutes." }
    ],
    relatedRoutes: [
      { label: "Manchester to Sheffield", href: "/routes/manchester-to-sheffield" },
      { label: "London to Sheffield", href: "/routes/london-to-sheffield" }
    ],
    cityALink: "/man-and-van-sheffield",
    cityBLink: "/man-and-van-manchester"
  },
  {
    slug: "sheffield-to-birmingham",
    cityA: "Sheffield",
    cityB: "Birmingham",
    regionA: "South Yorkshire",
    regionB: "West Midlands",
    distance: "75 miles",
    driveTime: "1 hour 30 minutes",
    motorway: "M1 / M42",
    estimatedFrom: "£180",
    estimatedTo: "£500",
    title: "Man and Van Sheffield to Birmingham | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Sheffield to Birmingham moves. 75 miles via M1 / M42. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Sheffield to Birmingham",
    intro: "Moving from Sheffield to Birmingham? The 75-mile journey via the M1 and M42 takes roughly 1 hour 30 minutes in clear traffic. A cross-Midlands route that's straightforward on a good day. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The M1 south from Sheffield (junctions 30–34) can be congested during the morning rush",
      "Join the M42 west at junction 23a — it's generally quieter than the M6 through Birmingham",
      "Birmingham's Clean Air Zone applies if your delivery address is inside the A4540 Middleway",
      "The A38 from the M1 to M42 via Derby is an alternative if the M1 is congested around Nottingham"
    ],
    parkingNotes: [
      { city: "Sheffield", notes: "Sheffield has a Clean Air Zone covering the city centre. Ecclesall, Broomhill and Nether Edge have easier parking." },
      { city: "Birmingham", notes: "The Clean Air Zone covers the city centre inside the A4540 Middleway. Solihull, Hall Green and Moseley have on-street parking." }
    ],
    faq: [
      { q: "How much does a man and van from Sheffield to Birmingham cost?", a: "In 2026, a Sheffield to Birmingham man and van move typically costs £180–£500. A single-item delivery starts from around £100." },
      { q: "Is the M1 or A38 a better route?", a: "The M1/M42 is the standard route and usually fastest. The A38 via Derby and Burton-on-Trent is an alternative if the M1 has major delays." }
    ],
    relatedRoutes: [
      { label: "Birmingham to Leeds", href: "/routes/birmingham-to-leeds" },
      { label: "London to Sheffield", href: "/routes/london-to-sheffield" },
      { label: "Sheffield to Manchester", href: "/routes/sheffield-to-manchester" }
    ],
    cityALink: "/man-and-van-sheffield",
    cityBLink: "/man-and-van-birmingham"
  },
  {
    slug: "bristol-to-cardiff",
    cityA: "Bristol",
    cityB: "Cardiff",
    regionA: "South West",
    regionB: "Wales",
    distance: "45 miles",
    driveTime: "1 hour",
    motorway: "M4",
    estimatedFrom: "£130",
    estimatedTo: "£420",
    title: "Man and Van Bristol to Cardiff | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Bristol to Cardiff moves. 45 miles via M4. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Bristol to Cardiff",
    intro: "Moving from Bristol to Cardiff? The 45-mile journey via the M4 takes roughly 1 hour in clear traffic. It's a cross-border move from England to Wales, but there are no border checks or tolls. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "Severn Bridge tolls were abolished in 2018 — both M4 and M48 crossings are free",
      "Cardiff city centre can be congested around M4 junctions 29–32 during rush hour",
      "The A48 through Chepstow is a scenic alternative but adds 15–20 minutes",
      "Both Bristol and Cardiff have Clean Air Zones covering their city centres"
    ],
    parkingNotes: [
      { city: "Bristol", notes: "Bristol has a Clean Air Zone covering the city centre. Clifton, Redland and Cotham have permit parking areas. Bedminster and Southville have fewer restrictions." },
      { city: "Cardiff", notes: "Cardiff has a Clean Air Zone covering the city centre. Canton, Roath and Cathays have on-street parking. Pontcanna and Llandaff have easier parking." }
    ],
    faq: [
      { q: "How much does a man and van from Bristol to Cardiff cost?", a: "In 2026, a Bristol to Cardiff man and van move typically costs £130–£420. A single-item delivery starts from around £80." },
      { q: "Do you need to pay to cross the Severn Bridge?", a: "No. Severn Bridge tolls were removed in December 2018. Both crossings are free." },
      { q: "Are there any restrictions moving from England to Wales?", a: "No border checks, no customs, no paperwork. The only practical difference is that some councils in Wales have different parking rules." }
    ],
    relatedRoutes: [
      { label: "Cardiff to Bristol", href: "/routes/cardiff-to-bristol" },
      { label: "Bristol to London", href: "/routes/bristol-to-london" },
      { label: "London to Cardiff", href: "/routes/london-to-cardiff" }
    ],
    cityALink: "/man-and-van-bristol",
    cityBLink: "/man-and-van-cardiff"
  },
  {
    slug: "cardiff-to-bristol",
    cityA: "Cardiff",
    cityB: "Bristol",
    regionA: "Wales",
    regionB: "South West",
    distance: "45 miles",
    driveTime: "1 hour",
    motorway: "M4",
    estimatedFrom: "£130",
    estimatedTo: "£420",
    title: "Man and Van Cardiff to Bristol | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Cardiff to Bristol moves. 45 miles via M4. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Cardiff to Bristol",
    intro: "Moving from Cardiff to Bristol? The 45-mile journey via the M4 takes roughly 1 hour in clear traffic. A common cross-border move for work and lifestyle relocations. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "Leave Cardiff early to avoid the M4 junction 32 congestion during morning rush hour",
      "The M4 Second Severn Crossing is the standard route — no tolls since 2018",
      "Bristol's Clean Air Zone covers the city centre — check if your delivery address is inside it",
      "If heading to north Bristol (Clifton, Redland), use the M5 junction 18 rather than the M4 junction 19"
    ],
    parkingNotes: [
      { city: "Cardiff", notes: "Cardiff has a Clean Air Zone covering the city centre. Roath, Cathays and Canton have on-street parking. Pontcanna and Llandaff have fewer restrictions." },
      { city: "Bristol", notes: "Bristol has a Clean Air Zone covering the city centre. Bedminster, Southville and Knowle have easier parking. Clifton and Redland have permit-only zones." }
    ],
    faq: [
      { q: "How much does a man and van from Cardiff to Bristol cost?", a: "In 2026, a Cardiff to Bristol man and van move typically costs £130–£420. A single-item delivery starts from around £80." },
      { q: "Can I move from Cardiff to Bristol in half a day?", a: "Yes, for a flat or small house move with good access. The drive is about an hour, so a morning start can finish by early afternoon." }
    ],
    relatedRoutes: [
      { label: "Bristol to Cardiff", href: "/routes/bristol-to-cardiff" },
      { label: "London to Cardiff", href: "/routes/london-to-cardiff" }
    ],
    cityALink: "/man-and-van-cardiff",
    cityBLink: "/man-and-van-bristol"
  },
  {
    slug: "london-to-brighton",
    cityA: "London",
    cityB: "Brighton",
    regionA: "Greater London",
    regionB: "South East",
    distance: "55 miles",
    driveTime: "1 hour 30 minutes",
    motorway: "M23 / A23",
    estimatedFrom: "£160",
    estimatedTo: "£500",
    title: "Man and Van London to Brighton | Move Quotes | Man and Van Club",
    description: "Man and van quotes for London to Brighton moves. 55 miles via M23 / A23. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "London to Brighton",
    intro: "Moving from London to Brighton? The 55-mile journey via the M23 and A23 takes roughly 1 hour 30 minutes in clear traffic. One of the most popular London exit routes — especially for people moving to the coast. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The M23/A23 can be very busy on Friday evenings and Sunday afternoons — peak coast-bound traffic",
      "Brighton has a Low Traffic Neighbourhood scheme in several areas — check for restrictions near your delivery address",
      "London ULEZ and Congestion Charge may apply at the collection end",
      "Brighton's one-way system around the Old Steine can be confusing — plan your approach"
    ],
    parkingNotes: [
      { city: "London", notes: "Most boroughs have CPZs. Apply for a parking suspension at least 5 working days before the move. Loading bays allow 20–40 minutes." },
      { city: "Brighton", notes: "Brighton has Controlled Parking Zones covering most of the city. Hove, Preston Park and areas north of the A27 have easier parking. Seafront properties often have residents' permit zones." }
    ],
    faq: [
      { q: "How much does a man and van from London to Brighton cost?", a: "In 2026, a London to Brighton man and van move typically costs £160–£500. A single-item delivery starts from around £90." },
      { q: "How long does the drive take?", a: "About 1 hour 30 minutes via the M23 and A23 in clear traffic. Weekend and summer traffic can add 30–60 minutes." },
      { q: "Is Brighton a popular destination for London movers?", a: "Very. Brighton is one of the top destinations for people leaving London. Movers on this route are experienced and availability is generally good." }
    ],
    relatedRoutes: [
      { label: "Brighton to London", href: "/routes/brighton-to-london" },
      { label: "London to Bristol", href: "/routes/bristol-to-london" },
      { label: "London to Southampton", href: "/routes/london-to-southampton" }
    ],
    cityALink: "/man-and-van-london",
    cityBLink: "/man-and-van-brighton"
  },
  {
    slug: "brighton-to-london",
    cityA: "Brighton",
    cityB: "London",
    regionA: "South East",
    regionB: "Greater London",
    distance: "55 miles",
    driveTime: "1 hour 30 minutes",
    motorway: "A23 / M23",
    estimatedFrom: "£160",
    estimatedTo: "£500",
    title: "Man and Van Brighton to London | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Brighton to London moves. 55 miles via A23 / M23. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Brighton to London",
    intro: "Moving from Brighton to London? The 55-mile journey via the A23 and M23 takes roughly 1 hour 30 minutes. Whether you're moving for work, family or a change of scene, a verified man and van can handle the full move. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The A23 northbound through Crawley and the M23 approach to the M25 are busiest on weekday mornings",
      "Avoid the M25 clockwise between junctions 7 and 10 during the afternoon rush",
      "London ULEZ applies to most of Greater London — check the zone boundary",
      "If heading to south London (Croydon, Bromley), the A23 through Purley is more direct than the M25"
    ],
    parkingNotes: [
      { city: "Brighton", notes: "Brighton has Controlled Parking Zones across most of the city. Fiveways, Hollingdean and Patcham have fewer restrictions than the city centre." },
      { city: "London", notes: "CPZs cover most boroughs. Apply for a parking suspension at least 5 working days before. Inner London boroughs have the strictest rules." }
    ],
    faq: [
      { q: "How much does a man and van from Brighton to London cost?", a: "In 2026, a Brighton to London man and van move typically costs £160–£500. A single-item delivery starts from around £90." },
      { q: "What's the best time to drive?", a: "Tuesday to Thursday mornings before 7:30am give the clearest run. Avoid Sunday evenings when coast-to-city traffic peaks." }
    ],
    relatedRoutes: [
      { label: "London to Brighton", href: "/routes/london-to-brighton" },
      { label: "London to Birmingham", href: "/routes/london-to-birmingham" },
      { label: "London to Manchester", href: "/routes/london-to-manchester" }
    ],
    cityALink: "/man-and-van-brighton",
    cityBLink: "/man-and-van-london"
  },
  {
    slug: "london-to-leicester",
    cityA: "London",
    cityB: "Leicester",
    regionA: "Greater London",
    regionB: "East Midlands",
    distance: "100 miles",
    driveTime: "2 hours",
    motorway: "M1",
    estimatedFrom: "£220",
    estimatedTo: "£550",
    title: "Man and Van London to Leicester | Move Quotes | Man and Van Club",
    description: "Man and van quotes for London to Leicester moves. 100 miles via M1. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "London to Leicester",
    intro: "Moving from London to Leicester? The 100-mile journey via the M1 takes roughly 2 hours in clear traffic. A popular route for people relocating to a more affordable city with good transport links. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The M1 northbound is busy from junctions 1 to 6a during the morning rush",
      "M1 roadworks between junctions 13 and 16 (Milton Keynes to Northampton) may cause delays",
      "Leave the M1 at junction 21 for Leicester city centre and south Leicester",
      "London ULEZ and Congestion Charge may apply at the collection end"
    ],
    parkingNotes: [
      { city: "London", notes: "Most boroughs have CPZs. Apply for a parking suspension at least 5 working days before." },
      { city: "Leicester", notes: "Leicester has a Clean Air Zone covering the city centre. Oadby, Wigston and Evington have on-street parking. Clarendon Park has permit-only zones." }
    ],
    faq: [
      { q: "How much does a man and van from London to Leicester cost?", a: "In 2026, a London to Leicester man and van move typically costs £220–£550. A single-item delivery starts from around £130." },
      { q: "Does Leicester have a Clean Air Zone?", a: "Yes. Leicester has a Clean Air Zone covering the city centre. Most modern vans (Euro 6 diesel and Euro 4+ petrol) are exempt." }
    ],
    relatedRoutes: [
      { label: "Leicester to London", href: "/routes/leicester-to-london" },
      { label: "Birmingham to Leicester", href: "/routes/birmingham-to-leicester" },
      { label: "London to Nottingham", href: "/routes/london-to-nottingham" }
    ],
    cityALink: "/man-and-van-london",
    cityBLink: "/man-and-van-leicester"
  },
  {
    slug: "leicester-to-london",
    cityA: "Leicester",
    cityB: "London",
    regionA: "East Midlands",
    regionB: "Greater London",
    distance: "100 miles",
    driveTime: "2 hours",
    motorway: "M1",
    estimatedFrom: "£220",
    estimatedTo: "£550",
    title: "Man and Van Leicester to London | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Leicester to London moves. 100 miles via M1. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Leicester to London",
    intro: "Moving from Leicester to London? The 100-mile journey via the M1 takes roughly 2 hours in clear traffic. Whether it's a work relocation or moving closer to family, a verified mover can handle the full journey. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The M1 southbound is busiest between 7am and 9:30am on weekdays — Northamptonshire is a regular bottleneck",
      "London ULEZ covers most of Greater London within the North and South Circular Roads",
      "The M1 junction 6a to M25 interchange is frequently congested — allow extra time",
      "If heading to east London, the A14 then A1(M) via Peterborough can be an alternative"
    ],
    parkingNotes: [
      { city: "Leicester", notes: "Leicester has a Clean Air Zone covering the city centre. Evington, Oadby and Braunstone have on-street parking with fewer restrictions." },
      { city: "London", notes: "CPZs cover most boroughs. Inner London parking is the most restricted. Apply for a parking suspension well in advance." }
    ],
    faq: [
      { q: "How much does a man and van from Leicester to London cost?", a: "In 2026, a Leicester to London man and van move typically costs £220–£550. A single-item delivery starts from around £130." },
      { q: "What's the best time to drive from Leicester to London?", a: "Tuesday to Thursday mornings before 7:30am give the clearest M1 run. Friday afternoons and Sunday evenings are the worst times." }
    ],
    relatedRoutes: [
      { label: "London to Leicester", href: "/routes/london-to-leicester" },
      { label: "Birmingham to Leicester", href: "/routes/birmingham-to-leicester" },
      { label: "London to Birmingham", href: "/routes/london-to-birmingham" }
    ],
    cityALink: "/man-and-van-leicester",
    cityBLink: "/man-and-van-london"
  },
  {
    slug: "leicester-to-nottingham",
    cityA: "Leicester",
    cityB: "Nottingham",
    regionA: "East Midlands",
    regionB: "East Midlands",
    distance: "25 miles",
    driveTime: "40 minutes",
    motorway: "M1 / A46",
    estimatedFrom: "£80",
    estimatedTo: "£300",
    title: "Man and Van Leicester to Nottingham | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Leicester to Nottingham moves. 25 miles via M1 / A46. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Leicester to Nottingham",
    intro: "Moving from Leicester to Nottingham? The 25-mile journey via the M1 or A46 takes roughly 40 minutes. A short East Midlands move — close enough for a half-day job for most properties. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The A46 between Leicester and Nottingham is often faster than the M1 — dual carriageway with fewer junctions",
      "Nottingham's tram network operates in the city centre — check for tram-only sections near your delivery address",
      "Student moves between the two cities peak in June/July and September"
    ],
    parkingNotes: [
      { city: "Leicester", notes: "Leicester has a Clean Air Zone covering the city centre. Oadby, Wigston and Evington have easier parking." },
      { city: "Nottingham", notes: "No Clean Air Zone. City centre has Controlled Parking Zones. West Bridgford, Beeston and Arnold have on-street parking." }
    ],
    faq: [
      { q: "How much does a man and van from Leicester to Nottingham cost?", a: "In 2026, a Leicester to Nottingham man and van move typically costs £80–£300. A single-item delivery starts from around £50." },
      { q: "Can I move from Leicester to Nottingham in a morning?", a: "Yes. The drive is only 25 miles and takes about 40 minutes. A flat move can be done in 2–3 hours." }
    ],
    relatedRoutes: [
      { label: "Nottingham to Leicester", href: "/routes/nottingham-to-leicester" },
      { label: "Birmingham to Leicester", href: "/routes/birmingham-to-leicester" },
      { label: "Birmingham to Nottingham", href: "/routes/birmingham-to-nottingham" }
    ],
    cityALink: "/man-and-van-leicester",
    cityBLink: "/man-and-van-nottingham"
  },
  {
    slug: "nottingham-to-leicester",
    cityA: "Nottingham",
    cityB: "Leicester",
    regionA: "East Midlands",
    regionB: "East Midlands",
    distance: "25 miles",
    driveTime: "40 minutes",
    motorway: "A46 / M1",
    estimatedFrom: "£80",
    estimatedTo: "£300",
    title: "Man and Van Nottingham to Leicester | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Nottingham to Leicester moves. 25 miles via A46 / M1. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Nottingham to Leicester",
    intro: "Moving from Nottingham to Leicester? The 25-mile journey via the A46 or M1 takes roughly 40 minutes. A short East Midlands move between two well-connected cities. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The A46 south from Nottingham is the most direct route — dual carriageway most of the way",
      "If the A46 is congested, the M1 south from junction 26 to junction 21 is an alternative",
      "Leicester's inner ring road has average speed cameras",
      "Both universities have peak moving periods in June/July and September — book early"
    ],
    parkingNotes: [
      { city: "Nottingham", notes: "No Clean Air Zone. City centre has Controlled Parking Zones. Beeston, West Bridgford and Arnold have easier parking." },
      { city: "Leicester", notes: "Leicester has a Clean Air Zone covering the city centre. Oadby, Evington and Braunstone have on-street parking." }
    ],
    faq: [
      { q: "How much does a man and van from Nottingham to Leicester cost?", a: "In 2026, a Nottingham to Leicester man and van move typically costs £80–£300. A single-item delivery starts from around £50." },
      { q: "Is the A46 or M1 better?", a: "The A46 is usually faster — more direct with fewer junctions. The M1 is only better if the A46 has roadworks." }
    ],
    relatedRoutes: [
      { label: "Leicester to Nottingham", href: "/routes/leicester-to-nottingham" },
      { label: "Nottingham to Birmingham", href: "/routes/nottingham-to-birmingham" },
      { label: "London to Nottingham", href: "/routes/london-to-nottingham" }
    ],
    cityALink: "/man-and-van-nottingham",
    cityBLink: "/man-and-van-leicester"
  },
  {
    slug: "london-to-southampton",
    cityA: "London",
    cityB: "Southampton",
    regionA: "Greater London",
    regionB: "South East",
    distance: "80 miles",
    driveTime: "1 hour 45 minutes",
    motorway: "M3",
    estimatedFrom: "£200",
    estimatedTo: "£520",
    title: "Man and Van London to Southampton | Move Quotes | Man and Van Club",
    description: "Man and van quotes for London to Southampton moves. 80 miles via M3. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "London to Southampton",
    intro: "Moving from London to Southampton? The 80-mile journey via the M3 takes roughly 1 hour 45 minutes in clear traffic. A popular route for people relocating to the south coast. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The M3 between junctions 2 and 4a gets congested on weekday mornings",
      "Southampton's Itchen Bridge has a toll for vehicles over 3 tonnes — most Luton vans are under this limit",
      "The M27 connects to Portsmouth — useful if your delivery address is in the eastern suburbs",
      "London ULEZ applies at the collection end for most central addresses"
    ],
    parkingNotes: [
      { city: "London", notes: "CPZs cover most boroughs. Apply for a parking suspension at least 5 working days before the move." },
      { city: "Southampton", notes: "Southampton city centre has Controlled Parking Zones. Portswood, Bitterne and Shirley have on-street parking with fewer restrictions. The university area has permit-only zones." }
    ],
    faq: [
      { q: "How much does a man and van from London to Southampton cost?", a: "In 2026, a London to Southampton man and van move typically costs £200–£520. A single-item delivery starts from around £110." },
      { q: "Does Southampton have a Clean Air Zone?", a: "No. Southampton currently does not have a Clean Air Zone, though the city centre has Controlled Parking Zones." }
    ],
    relatedRoutes: [
      { label: "Southampton to London", href: "/routes/southampton-to-london" },
      { label: "London to Brighton", href: "/routes/london-to-brighton" },
      { label: "London to Bristol", href: "/routes/bristol-to-london" }
    ],
    cityALink: "/man-and-van-london",
    cityBLink: "/man-and-van-southampton"
  },
  {
    slug: "southampton-to-london",
    cityA: "Southampton",
    cityB: "London",
    regionA: "South East",
    regionB: "Greater London",
    distance: "80 miles",
    driveTime: "1 hour 45 minutes",
    motorway: "M3",
    estimatedFrom: "£200",
    estimatedTo: "£520",
    title: "Man and Van Southampton to London | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Southampton to London moves. 80 miles via M3. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Southampton to London",
    intro: "Moving from Southampton to London? The 80-mile journey via the M3 takes roughly 1 hour 45 minutes. Whether it's for work, study or a return to the capital, a verified mover can handle the full journey. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The M3 northbound is busiest on weekday mornings — the M25 junction can add 20 minutes",
      "London ULEZ covers most of Greater London within the North and South Circular Roads",
      "If heading to west London, the M3 to M25 (clockwise) to M4 is a common route",
      "Avoid the M25 between junctions 9 and 13 during afternoon rush hour"
    ],
    parkingNotes: [
      { city: "Southampton", notes: "No Clean Air Zone. City centre has Controlled Parking Zones. Bitterne, Shirley and Woolston have easier parking." },
      { city: "London", notes: "CPZs cover most boroughs. Inner London boroughs have the strictest parking rules. Apply for a parking suspension well in advance." }
    ],
    faq: [
      { q: "How much does a man and van from Southampton to London cost?", a: "In 2026, a Southampton to London man and van move typically costs £200–£520. A single-item delivery starts from around £110." },
      { q: "What's the best time to drive?", a: "Tuesday to Thursday mornings before 7:30am give the clearest run on the M3. Friday afternoons and Sunday evenings are the busiest." }
    ],
    relatedRoutes: [
      { label: "London to Southampton", href: "/routes/london-to-southampton" },
      { label: "London to Brighton", href: "/routes/london-to-brighton" },
      { label: "London to Bristol", href: "/routes/bristol-to-london" }
    ],
    cityALink: "/man-and-van-southampton",
    cityBLink: "/man-and-van-london"
  },
  {
    slug: "london-to-plymouth",
    cityA: "London",
    cityB: "Plymouth",
    regionA: "Greater London",
    regionB: "South West",
    distance: "215 miles",
    driveTime: "3 hours 45 minutes",
    motorway: "M3 / A303 / A38",
    estimatedFrom: "£380",
    estimatedTo: "£800",
    title: "Man and Van London to Plymouth | Move Quotes | Man and Van Club",
    description: "Man and van quotes for London to Plymouth moves. 215 miles via M3 / A303 / A38. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "London to Plymouth",
    intro: "Moving from London to Plymouth? The 215-mile journey via the M3, A303 and A38 takes roughly 3 hours 45 minutes in clear traffic. It's a long move to the far south-west that needs a full day. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The A303 is the main route west — it has single-carriageway sections near Stonehenge and Ilminster that can cause delays",
      "The A38 Devon Expressway from Exeter to Plymouth is mostly dual carriageway but can be slow in summer tourist traffic",
      "There are limited service areas on the A303 — plan fuel stops at Fleet Services or near Yeovil",
      "London ULEZ and Congestion Charge apply at the collection end"
    ],
    parkingNotes: [
      { city: "London", notes: "CPZs cover most boroughs. Apply for a parking suspension at least 5 working days before." },
      { city: "Plymouth", notes: "No Clean Air Zone in Plymouth. Mutley, Mannamead and Peverell have on-street parking. The Hoe and city centre have restricted parking." }
    ],
    faq: [
      { q: "How much does a man and van from London to Plymouth cost?", a: "In 2026, a London to Plymouth man and van move typically costs £380–£800. A single-item delivery starts from around £200." },
      { q: "Is the A303 or M5 a better route?", a: "The A303 is shorter and more direct. The M5 (via Bristol and Exeter) is longer but motorway standard all the way. In summer, the A303 can be slower; in winter, the M5 is more reliable." }
    ],
    relatedRoutes: [
      { label: "Plymouth to London", href: "/routes/plymouth-to-london" },
      { label: "London to Bristol", href: "/routes/bristol-to-london" },
      { label: "London to Southampton", href: "/routes/london-to-southampton" }
    ],
    cityALink: "/man-and-van-london",
    cityBLink: "/man-and-van-plymouth"
  },
  {
    slug: "plymouth-to-london",
    cityA: "Plymouth",
    cityB: "London",
    regionA: "South West",
    regionB: "Greater London",
    distance: "215 miles",
    driveTime: "3 hours 45 minutes",
    motorway: "A38 / A303 / M3",
    estimatedFrom: "£380",
    estimatedTo: "£800",
    title: "Man and Van Plymouth to London | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Plymouth to London moves. 215 miles via A38 / A303 / M3. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Plymouth to London",
    intro: "Moving from Plymouth to London? The 215-mile journey via the A38, A303 and M3 takes roughly 3 hours 45 minutes. A long-distance move from the far south-west that needs a full day. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "Leave early — the A38 Devon Expressway is quieter before 7am",
      "The A303 has single-carriageway sections that slow traffic during holidays and summer weekends",
      "The M5 to the M4 (via Bristol) is the all-motorway alternative — about 30 minutes longer but more reliable",
      "London ULEZ covers most of Greater London within the North and South Circular Roads"
    ],
    parkingNotes: [
      { city: "Plymouth", notes: "No Clean Air Zone. Mutley, Mannamead and Peverell have on-street parking. The city centre and Hoe area have restricted parking." },
      { city: "London", notes: "CPZs cover most boroughs. Inner London has the strictest parking. Apply for a parking suspension well in advance." }
    ],
    faq: [
      { q: "How much does a man and van from Plymouth to London cost?", a: "In 2026, a Plymouth to London man and van move typically costs £380–£800. A single-item delivery starts from around £200." },
      { q: "Can I move from Plymouth to London in one day?", a: "Yes. The drive is about 3 hours 45 minutes. A 1–2 bed flat can be done in a day with an early start. A 3-bed house may need two days." }
    ],
    relatedRoutes: [
      { label: "London to Plymouth", href: "/routes/london-to-plymouth" },
      { label: "Bristol to London", href: "/routes/bristol-to-london" },
      { label: "London to Southampton", href: "/routes/london-to-southampton" }
    ],
    cityALink: "/man-and-van-plymouth",
    cityBLink: "/man-and-van-london"
  },
  {
    slug: "coventry-to-leicester",
    cityA: "Coventry",
    cityB: "Leicester",
    regionA: "West Midlands",
    regionB: "East Midlands",
    distance: "25 miles",
    driveTime: "40 minutes",
    motorway: "M69",
    estimatedFrom: "£80",
    estimatedTo: "£300",
    title: "Man and Van Coventry to Leicester | Move Quotes | Man and Van Club",
    description: "Man and van quotes for Coventry to Leicester moves. 25 miles via M69. Verified movers, transparent pricing. Submit your move details for free.",
    h1: "Coventry to Leicester",
    intro: "Moving from Coventry to Leicester? The 25-mile journey via the M69 takes roughly 40 minutes. A short cross-Midlands move that's straightforward for most man and van services. Submit your postcodes and item list for a free guide price.",
    routeTips: [
      "The M69 is a quiet motorway and rarely congested — one of the easiest cross-city routes in the Midlands",
      "Leave the M69 at the A47 for Hinckley and south Leicester, or continue to M1 junction 21 for the city centre",
      "Both Coventry and Leicester have Clean Air Zones covering their city centres",
      "The A47 through Nuneaton is the main alternative if the M69 has an incident"
    ],
    parkingNotes: [
      { city: "Coventry", notes: "Coventry has a Clean Air Zone covering the city centre. Earlsdon, Cheylesmore and Binley have easier parking." },
      { city: "Leicester", notes: "Leicester has a Clean Air Zone covering the city centre. Oadby, Wigston and Evington have on-street parking." }
    ],
    faq: [
      { q: "How much does a man and van from Coventry to Leicester cost?", a: "In 2026, a Coventry to Leicester man and van move typically costs £80–£300. A single-item delivery starts from around £50." },
      { q: "Is the M69 a busy motorway?", a: "No. The M69 is one of the quieter motorways in England and is rarely congested. It's a straightforward 25-mile drive." }
    ],
    relatedRoutes: [
      { label: "Birmingham to Coventry", href: "/routes/birmingham-to-coventry" },
      { label: "Birmingham to Leicester", href: "/routes/birmingham-to-leicester" }
    ],
    cityALink: "/man-and-van-coventry",
    cityBLink: "/man-and-van-leicester"
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
