// Hub page data for new major UK cities
// Each city gets a dedicated hub page with local context, pricing, FAQs and schema

export interface HubPageData {
  slug: string;
  name: string;
  region: string;
  nation: string;
  population: string;
  title: string;
  description: string;
  badge: string;
  heroSubtitle: string;
  contextTitle: string;
  contextText: string;
  featureLeft: { title: string; text: string };
  featureRight: { title: string; text: string };
  neighborhoods: string[];
  nearbyAreas: { slug: string; name: string; note: string }[];
  pricing: { type: string; price: string }[];
  faq: { q: string; a: string }[];
  hasCleanAirZone: boolean;
  cleanAirNote?: string;
}

export const HUB_PAGES: Record<string, HubPageData> = {
  belfast: {
    slug: "belfast",
    name: "Belfast",
    region: "Northern Ireland",
    nation: "Northern Ireland",
    population: "345,000",
    title: "Man and Van Belfast | Verified Mover Quotes from £50 | Man and Van Club",
    description: "Submit a free man and van request in Belfast. One verified mover reviews your details before you book. From £50/hr. City centre, Titanic Quarter, South Belfast, Queen's University area.",
    badge: "Northern Ireland",
    heroSubtitle: "Moving in Belfast? Submit your postcodes, item list and access notes for free. One verified mover reviews your Belfast move before you decide whether to book.",
    contextTitle: "Belfast moving challenges",
    contextText: "Belfast is Northern Ireland's capital and largest city. The city centre, Titanic Quarter and Cathedral Quarter have apartment developments with loading restrictions. South Belfast and the Queen's University area have terraced streets and student accommodation. The M1 and M2 motorways connect Belfast to the west and north. Belfast has no Clean Air Zone. The form captures these details so your mover can plan properly.",
    featureLeft: { title: "City centre apartments and South Belfast terraces", text: "A move from a Titanic Quarter apartment is different to a South Belfast terrace, a Holywood family home or a Lisburn suburban house. The form asks for the details a mover needs: postcodes, items, helpers, stairs, lifts, access and date." },
    featureRight: { title: "One verified mover, not a lead blast", text: "Your enquiry is not sold to lots of companies. A verified mover reviews your anonymised request, then your contact details are only released if you accept the quote and pay the booking deposit." },
    neighborhoods: ["City Centre", "Titanic Quarter", "South Belfast", "Queen's Quarter", "Holyland", "Stranmillis", "Ballyhackamore", "Ormeau Road", "Lisburn Road"],
    nearbyAreas: [
      { slug: "derry", name: "Derry/Londonderry", note: "Northern Ireland's second city, 70 minutes via A6" },
      { slug: "lisburn", name: "Lisburn", note: "South of Belfast, 20 minutes via M1" },
      { slug: "newry", name: "Newry", note: "Border city, 45 minutes via A1" },
    ],
    pricing: [
      { type: "Single-item furniture collection", price: "From £50" },
      { type: "Studio / 1-bed flat move", price: "£150–£300" },
      { type: "2-bed flat or terraced house move", price: "£200–£400" },
      { type: "3-bed house move", price: "£300–£550" },
      { type: "Student move (halls/shared house)", price: "£80–£250" },
      { type: "Same-day man and van", price: "From £55/hr" },
      { type: "Belfast to Dublin", price: "£250–£450" },
    ],
    faq: [
      { q: "How much does a man and van cost in Belfast?", a: "Belfast moves typically start from £50 per hour. A straightforward local move usually costs £60–£130 depending on furniture volume, access (stairs, lifts, parking) and route. A full 3-bed house move in Belfast could be £300–£550. Submit your postcodes and item list for a guide price first, then a verified mover reviews the details and sends a quote." },
      { q: "Can I book a same-day man and van in Belfast?", a: "Same-day moves may be possible depending on mover availability. Submit the request with your postcodes and move details so a verified mover can review it quickly." },
      { q: "Does Belfast have a Clean Air Zone?", a: "No. Belfast does not currently have a Clean Air Zone or congestion charge. Standard parking restrictions and permit zones still apply in some areas." },
      { q: "Do you cover Queen's University and the Holyland area?", a: "Yes. Student moves from Queen's University area, the Holyland, Stranmillis and South Belfast can be submitted. Peak demand is June, July and September. Add your item list, access notes and preferred dates for a verified mover to review." },
      { q: "Can a mover help with a Belfast to Dublin move?", a: "Cross-border moves to Dublin can be submitted. The mover would need to be able to operate in both Northern Ireland and the Republic. Add both postcodes and mention it is a cross-border move so the mover can confirm before quoting." },
      { q: "Is my data protected?", a: "Yes. Your contact details stay private until you accept a quote and pay the booking deposit. Your initial request is anonymised — the mover sees move details, not your name or phone number." },
    ],
    hasCleanAirZone: false,
  },
  brighton: {
    slug: "brighton",
    name: "Brighton",
    region: "South East",
    nation: "England",
    population: "276,000",
    title: "Man and Van Brighton | Verified Mover Quotes from £55 | Man and Van Club",
    description: "Submit a free man and van request in Brighton. One verified mover reviews your details before you book. From £55/hr. City centre, Hove, Kemptown, Preston Park, Lewes Road.",
    badge: "South East",
    heroSubtitle: "Moving in Brighton? Submit your postcodes, item list and access notes for free. One verified mover reviews your Brighton move before you decide whether to book.",
    contextTitle: "Brighton moving challenges",
    contextText: "Brighton's housing stock is dominated by Regency and Victorian terraces with narrow staircases, basement flats and restricted on-street parking. The city centre and Kemptown have Controlled Parking Zones. Hove is generally easier for van access. The A23 and M23 connect Brighton to London in about an hour. Brighton does not have a Clean Air Zone. The form captures these details so your mover can plan properly.",
    featureLeft: { title: "Regency squares, basement flats and CPZs", text: "A move from a Brunswick Terrace basement is different to a Hove family home, a Kemptown flat or a Preston Park house. Brighton's narrow staircases and restricted parking need clear details on the form: postcodes, items, helpers, stairs, access and date." },
    featureRight: { title: "One verified mover, not a lead blast", text: "Your enquiry is not sold to lots of companies. A verified mover reviews your anonymised request, then your contact details are only released if you accept the quote and pay the booking deposit." },
    neighborhoods: ["City Centre", "Kemptown", "Hove", "Preston Park", "Hanover", "Seven Dials", "Queen's Park", "Fiveways", "Withdean"],
    nearbyAreas: [
      { slug: "london", name: "London", note: "Major hub, 1 hour via A23/M23" },
      { slug: "crawley", name: "Crawley", note: "Gatwick area, 30 minutes via A23" },
      { slug: "horsham", name: "Horsham", note: "West Sussex, 35 minutes via A24" },
    ],
    pricing: [
      { type: "Single-item furniture collection", price: "From £55" },
      { type: "Studio / 1-bed flat move", price: "£170–£350" },
      { type: "2-bed flat or terraced house move", price: "£250–£450" },
      { type: "3-bed house move", price: "£350–£600" },
      { type: "Student move (halls/shared house)", price: "£90–£280" },
      { type: "Same-day man and van", price: "From £60/hr" },
      { type: "Brighton to London", price: "£200–£450" },
    ],
    faq: [
      { q: "How much does a man and van cost in Brighton?", a: "Brighton moves typically start from £55 per hour, reflecting the South East's higher costs. A straightforward local move usually costs £70–£150 depending on furniture volume, access (stairs, lifts, parking) and route. A full 3-bed house move in Brighton could be £350–£600. Submit your postcodes and item list for a guide price first." },
      { q: "Is parking difficult for removals in Brighton?", a: "Yes — Brighton has extensive Controlled Parking Zones covering the city centre, Kemptown and Hanover. Hove has some areas without CPZs. You should apply for a parking suspension from Brighton & Hove City Council at least 5 working days before your move." },
      { q: "Does Brighton have a Clean Air Zone?", a: "No. Brighton does not currently have a Clean Air Zone. However, some city-centre streets have traffic restrictions and pedestrian zones that may affect van access." },
      { q: "Can you help with student moves in Brighton?", a: "Yes. Brighton has a large student population (University of Sussex, University of Brighton). Student moves can be submitted for all areas. Peak demand is June, July and September. Add your item list, access notes and preferred dates." },
      { q: "How much does a Brighton to London move cost?", a: "A Brighton to London move in 2026 typically costs £200–£450 depending on load size, access at both ends and timing. The A23/M23 route takes about 1 hour 15 minutes. A single-item delivery starts from around £120. Submit your postcodes and item list for a guide price." },
    ],
    hasCleanAirZone: false,
  },
  sunderland: {
    slug: "sunderland",
    name: "Sunderland",
    region: "North East",
    nation: "England",
    population: "277,000",
    title: "Man and Van Sunderland | Verified Mover Quotes from £50 | Man and Van Club",
    description: "Submit a free man and van request in Sunderland. One verified mover reviews your details before you book. From £50/hr. City centre, Roker, Seaburn, Hylton, Washington.",
    badge: "North East",
    heroSubtitle: "Moving in Sunderland? Submit your postcodes, item list and access notes for free. One verified mover reviews your Sunderland move before you decide whether to book.",
    contextTitle: "Sunderland moving challenges",
    contextText: "Sunderland sits at the mouth of the River Wear, with the city centre, Roker seafront and Washington new town. The A19 and A1 connect Sunderland to Newcastle, Durham and Teesside. Terraced streets in Hendon and Millfield have limited parking. The University of Sunderland creates student move demand in summer. Sunderland does not have a Clean Air Zone. The form captures these details so your mover can plan properly.",
    featureLeft: { title: "Seafront flats, terraced streets and Washington estates", text: "A move from a Roker seafront flat is different to a Hendon terrace, a Hylton estate or a Washington family home. The form asks for the details a mover needs: postcodes, items, helpers, stairs, lifts, access and date." },
    featureRight: { title: "One verified mover, not a lead blast", text: "Your enquiry is not sold to lots of companies. A verified mover reviews your anonymised request, then your contact details are only released if you accept the quote and pay the booking deposit." },
    neighborhoods: ["City Centre", "Roker", "Seaburn", "Hendon", "Millfield", "Hylton", "Washington", "Fulwell", "Ashbrooke"],
    nearbyAreas: [
      { slug: "newcastle-upon-tyne", name: "Newcastle", note: "Major North East hub, 30 minutes via A19" },
      { slug: "durham", name: "Durham", note: "Historic city, 30 minutes via A690" },
      { slug: "middlesbrough", name: "Middlesbrough", note: "Tees Valley, 45 minutes via A19" },
    ],
    pricing: [
      { type: "Single-item furniture collection", price: "From £50" },
      { type: "Studio / 1-bed flat move", price: "£150–£300" },
      { type: "2-bed flat or terraced house move", price: "£200–£400" },
      { type: "3-bed house move", price: "£300–£500" },
      { type: "Student move (halls/shared house)", price: "£80–£220" },
      { type: "Same-day man and van", price: "From £55/hr" },
      { type: "Sunderland to Newcastle", price: "£80–£180" },
    ],
    faq: [
      { q: "How much does a man and van cost in Sunderland?", a: "Sunderland moves typically start from £50 per hour. A straightforward local move usually costs £60–£130 depending on furniture volume, access and route. A full 3-bed house move could be £300–£500. Submit your postcodes and item list for a guide price first." },
      { q: "Does Sunderland have a Clean Air Zone?", a: "No. Sunderland does not currently have a Clean Air Zone or congestion charge. Standard parking restrictions still apply." },
      { q: "Can you help with student moves at the University of Sunderland?", a: "Yes. Student moves from University of Sunderland halls and shared houses can be submitted. Peak demand is June, July and September. Add your item list, access notes and preferred dates for a verified mover to review." },
      { q: "How far is Sunderland from Newcastle?", a: "Sunderland is about 12 miles from Newcastle via the A19, taking roughly 30 minutes in clear traffic. A man and van between the two cities typically costs £80–£180 depending on load size and access." },
    ],
    hasCleanAirZone: false,
  },
  "milton-keynes": {
    slug: "milton-keynes",
    name: "Milton Keynes",
    region: "South East",
    nation: "England",
    population: "230,000",
    title: "Man and Van Milton Keynes | Verified Mover Quotes from £50 | Man and Van Club",
    description: "Submit a free man and van request in Milton Keynes. One verified mover reviews your details before you book. From £50/hr. City centre, Bletchley, Stony Stratford, Newport Pagnell.",
    badge: "South East",
    heroSubtitle: "Moving in Milton Keynes? Submit your postcodes, item list and access notes for free. One verified mover reviews your Milton Keynes move before you decide whether to book.",
    contextTitle: "Milton Keynes moving challenges",
    contextText: "Milton Keynes is a new town built on a grid system, which makes van access easier than most UK cities. However, the city's rapid growth means a mix of new-build estates, older homes in Bletchley and Stony Stratford, and city-centre apartments. The M1 (junctions 13–15) connects Milton Keynes to London and the North. No Clean Air Zone applies. The form captures these details so your mover can plan properly.",
    featureLeft: { title: "Grid roads, new-build estates and mixed housing", text: "A move from a new-build estate in Kingston is different to a Bletchley terrace, a Stony Stratford cottage or a city-centre apartment. Milton Keynes' grid road system generally makes van access easier, but some areas have limited parking. The form asks for the details a mover needs." },
    featureRight: { title: "One verified mover, not a lead blast", text: "Your enquiry is not sold to lots of companies. A verified mover reviews your anonymised request, then your contact details are only released if you accept the quote and pay the booking deposit." },
    neighborhoods: ["City Centre", "Bletchley", "Stony Stratford", "Newport Pagnell", "Wolverton", "Kingston", "Shenley", "Woburn Sands", "Great Linford"],
    nearbyAreas: [
      { slug: "london", name: "London", note: "1 hour via M1" },
      { slug: "luton", name: "Luton", note: "30 minutes via M1" },
      { slug: "northampton", name: "Northampton", note: "25 minutes via M1" },
    ],
    pricing: [
      { type: "Single-item furniture collection", price: "From £50" },
      { type: "Studio / 1-bed flat move", price: "£150–£320" },
      { type: "2-bed flat or house move", price: "£200–£420" },
      { type: "3-bed house move", price: "£300–£550" },
      { type: "Same-day man and van", price: "From £55/hr" },
      { type: "Milton Keynes to London", price: "£200–£400" },
    ],
    faq: [
      { q: "How much does a man and van cost in Milton Keynes?", a: "Milton Keynes moves typically start from £50 per hour. A straightforward local move usually costs £60–£130 depending on furniture volume, access and route. A full 3-bed house move could be £300–£550. Submit your postcodes and item list for a guide price first." },
      { q: "Is parking easy in Milton Keynes for removals?", a: "Milton Keynes' grid road system and modern housing estates generally make van access easier than older UK cities. However, some city-centre apartments and newer developments have restricted parking. Check with your building management for loading bay access." },
      { q: "Does Milton Keynes have a Clean Air Zone?", a: "No. Milton Keynes does not currently have a Clean Air Zone or congestion charge." },
      { q: "How much does Milton Keynes to London cost with a man and van?", a: "A Milton Keynes to London move in 2026 typically costs £200–£400 depending on load size and access. The M1 connects both in roughly 1 hour. A single-item delivery starts from around £120. Submit your postcodes for a guide price." },
    ],
    hasCleanAirZone: false,
  },
  bournemouth: {
    slug: "bournemouth",
    name: "Bournemouth",
    region: "South West",
    nation: "England",
    population: "197,000",
    title: "Man and Van Bournemouth | Verified Mover Quotes from £50 | Man and Van Club",
    description: "Submit a free man and van request in Bournemouth. One verified mover reviews your details before you book. From £50/hr. City centre, Boscombe, Westbourne, Poole, Christchurch.",
    badge: "South West",
    heroSubtitle: "Moving in Bournemouth? Submit your postcodes, item list and access notes for free. One verified mover reviews your Bournemouth move before you decide whether to book.",
    contextTitle: "Bournemouth moving challenges",
    contextText: "Bournemouth sits on the south coast with a mix of Victorian terraces, 1930s semis, seafront apartments and suburban estates. Boscombe and the town centre have flats with restricted parking. Westbourne and Poole have larger properties with driveways. The A338 connects Bournemouth to the M27 and London. Bournemouth does not have a Clean Air Zone. The form captures these details so your mover can plan properly.",
    featureLeft: { title: "Seafront flats, Victorian terraces and suburban estates", text: "A move from a Boscombe flat is different to a Westbourne house, a Poole harbour apartment or a Christchurch family home. Bournemouth's mix of older terraces and newer developments means access varies significantly. The form asks for the details a mover needs." },
    featureRight: { title: "One verified mover, not a lead blast", text: "Your enquiry is not sold to lots of companies. A verified mover reviews your anonymised request, then your contact details are only released if you accept the quote and pay the booking deposit." },
    neighborhoods: ["City Centre", "Boscombe", "Westbourne", "Poole", "Christchurch", "Southbourne", "Winton", "Charminster", "Kinson"],
    nearbyAreas: [
      { slug: "bristol", name: "Bristol", note: "Major South West hub, 1.5 hours via A350" },
      { slug: "exeter", name: "Exeter", note: "Devon, 2 hours via A35" },
      { slug: "southampton", name: "Southampton", note: "Hampshire, 40 minutes via A338/M27" },
    ],
    pricing: [
      { type: "Single-item furniture collection", price: "From £50" },
      { type: "Studio / 1-bed flat move", price: "£150–£300" },
      { type: "2-bed flat or house move", price: "£200–£400" },
      { type: "3-bed house move", price: "£300–£550" },
      { type: "Student move (halls/shared house)", price: "£80–£250" },
      { type: "Same-day man and van", price: "From £55/hr" },
      { type: "Bournemouth to London", price: "£250–£500" },
    ],
    faq: [
      { q: "How much does a man and van cost in Bournemouth?", a: "Bournemouth moves typically start from £50 per hour. A straightforward local move usually costs £60–£130 depending on furniture volume, access and route. A full 3-bed house move could be £300–£550. Submit your postcodes and item list for a guide price first." },
      { q: "Does Bournemouth have a Clean Air Zone?", a: "No. Bournemouth does not currently have a Clean Air Zone or congestion charge. Standard parking restrictions still apply in the town centre and Boscombe." },
      { q: "Can you help with student moves at Bournemouth University?", a: "Yes. Student moves from Bournemouth University, Arts University Bournemouth and local halls can be submitted. Peak demand is June, July and September." },
      { q: "Is parking difficult for removals in Bournemouth?", a: "The town centre and Boscombe have restricted parking with permit zones. Westbourne, Poole and suburban areas are generally easier for van access. Apply for a parking suspension from BCP Council if needed." },
    ],
    hasCleanAirZone: false,
  },
};
