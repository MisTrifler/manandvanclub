// Enhanced Service schemas for priority city pages
// These schemas describe Man and Van Club as a quote-request marketplace, not a local moving operator.

const siteUrl = "https://www.manandvanclub.co.uk";

const provider = {
  "@type": "Organization",
  "name": "Man and Van Club",
  "url": "https://www.manandvanclub.co.uk",
  "logo": "https://www.manandvanclub.co.uk/icon.png",
  "telephone": "+44-121-751-1269",
  "email": "support@manandvanclub.co.uk"
};

const baseSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "provider": provider,
  "serviceType": "Man and van quote request",
  "telephone": "+44-121-751-1269",
  "email": "support@manandvanclub.co.uk"
};

export const enhancedServiceSchemas: Record<string, Record<string, any>> = {
  birmingham: {
    ...baseSchema,
    name: "Man and Van Club — Birmingham",
    description:
      "Free man and van request service in Birmingham. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-birmingham",
    areaServed: {
      "@type": "City",
      name: "Birmingham",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Jewellery Quarter" },
        { "@type": "Neighborhood", name: "Edgbaston" },
        { "@type": "Neighborhood", name: "Moseley" },
        { "@type": "Neighborhood", name: "Harborne" },
        { "@type": "Neighborhood", name: "Selly Oak" },
        { "@type": "Neighborhood", name: "Bournville" },
        { "@type": "Neighborhood", name: "Sutton Coldfield" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  london: {
    ...baseSchema,
    name: "Man and Van Club — London",
    description:
      "Free man and van request service in London. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-london",
    areaServed: {
      "@type": "City",
      name: "London",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Shoreditch" },
        { "@type": "Neighborhood", name: "Clapham" },
        { "@type": "Neighborhood", name: "Islington" },
        { "@type": "Neighborhood", name: "Camden" },
        { "@type": "Neighborhood", name: "Hackney" },
        { "@type": "Neighborhood", name: "Brixton" },
        { "@type": "Neighborhood", name: "Greenwich" },
        { "@type": "Neighborhood", name: "Kensington" },
        { "@type": "Neighborhood", name: "Wandsworth" },
        { "@type": "Neighborhood", name: "Richmond" },
        { "@type": "Neighborhood", name: "Fulham" },
        { "@type": "Neighborhood", name: "Wimbledon" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery", "Student Moves", "Same Day Moves"]
  },
  manchester: {
    ...baseSchema,
    name: "Man and Van Club — Manchester",
    description:
      "Free man and van request service in Manchester. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-manchester",
    areaServed: {
      "@type": "City",
      name: "Manchester",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater Manchester"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Northern Quarter" },
        { "@type": "Neighborhood", name: "Didsbury" },
        { "@type": "Neighborhood", name: "Chorlton" },
        { "@type": "Neighborhood", name: "Deansgate" },
        { "@type": "Neighborhood", name: "Ancoats" },
        { "@type": "Neighborhood", name: "Salford" },
        { "@type": "Neighborhood", name: "Prestwich" },
        { "@type": "Neighborhood", name: "Stockport" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Student Moves", "Furniture Delivery"]
  },
  leeds: {
    ...baseSchema,
    name: "Man and Van Club — Leeds",
    description:
      "Free man and van request service in Leeds. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-leeds",
    areaServed: {
      "@type": "City",
      name: "Leeds",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Yorkshire"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Headingley" },
        { "@type": "Neighborhood", name: "Roundhay" },
        { "@type": "Neighborhood", name: "Chapel Allerton" },
        { "@type": "Neighborhood", name: "Horsforth" },
        { "@type": "Neighborhood", name: "Hyde Park" },
        { "@type": "Neighborhood", name: "Kirkstall" },
        { "@type": "Neighborhood", name: "Alwoodley" },
        { "@type": "Neighborhood", name: "Morley" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  liverpool: {
    ...baseSchema,
    name: "Man and Van Club — Liverpool",
    description:
      "Free man and van request service in Liverpool. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-liverpool",
    areaServed: {
      "@type": "City",
      name: "Liverpool",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Merseyside"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Aigburth" },
        { "@type": "Neighborhood", name: "Allerton" },
        { "@type": "Neighborhood", name: "Woolton" },
        { "@type": "Neighborhood", name: "Walton" },
        { "@type": "Neighborhood", name: "Toxteth" },
        { "@type": "Neighborhood", name: "Anfield" },
        { "@type": "Neighborhood", name: "Wavertree" },
        { "@type": "Neighborhood", name: "Everton" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  bristol: {
    ...baseSchema,
    name: "Man and Van Club — Bristol",
    description:
      "Free man and van request service in Bristol. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-bristol",
    areaServed: {
      "@type": "City",
      name: "Bristol",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Bristol"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Clifton" },
        { "@type": "Neighborhood", name: "Bedminster" },
        { "@type": "Neighborhood", name: "Redland" },
        { "@type": "Neighborhood", name: "Southville" },
        { "@type": "Neighborhood", name: "Stokes Croft" },
        { "@type": "Neighborhood", name: "Fishponds" },
        { "@type": "Neighborhood", name: "Horfield" },
        { "@type": "Neighborhood", name: "City Centre" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Student Moves", "Furniture Delivery"]
  },
  wolverhampton: {
    ...baseSchema,
    name: "Man and Van Club — Wolverhampton",
    description:
      "Free man and van request service in Wolverhampton. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-wolverhampton",
    areaServed: {
      "@type": "City",
      name: "Wolverhampton",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Tettenhall" },
        { "@type": "Neighborhood", name: "Penn" },
        { "@type": "Neighborhood", name: "Bilston" },
        { "@type": "Neighborhood", name: "Wednesfield" },
        { "@type": "Neighborhood", name: "Heath Town" },
        { "@type": "Neighborhood", name: "Fallings Park" },
        { "@type": "Neighborhood", name: "Wombourne" },
        { "@type": "Neighborhood", name: "Codsall" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  nottingham: {
    ...baseSchema,
    name: "Man and Van Club — Nottingham",
    description:
      "Free man and van request service in Nottingham. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-nottingham",
    areaServed: {
      "@type": "City",
      name: "Nottingham",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "East Midlands"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "West Bridgford" },
        { "@type": "Neighborhood", name: "Beeston" },
        { "@type": "Neighborhood", name: "Arnold" },
        { "@type": "Neighborhood", name: "Carlton" },
        { "@type": "Neighborhood", name: "Lenton" },
        { "@type": "Neighborhood", name: "Hucknall" },
        { "@type": "Neighborhood", name: "Clifton" },
        { "@type": "Neighborhood", name: "Mansfield" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery", "Office Relocations"]
  },
  walsall: {
    ...baseSchema,
    name: "Man and Van Club — Walsall",
    description:
      "Free man and van request service in Walsall. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-walsall",
    areaServed: {
      "@type": "City",
      name: "Walsall",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Pelsall" },
        { "@type": "Neighborhood", name: "Bloxwich" },
        { "@type": "Neighborhood", name: "Aldridge" },
        { "@type": "Neighborhood", name: "Brownhills" },
        { "@type": "Neighborhood", name: "Darlaston" },
        { "@type": "Neighborhood", name: "Willenhall" },
        { "@type": "Neighborhood", name: "Rushall" },
        { "@type": "Neighborhood", name: "Shelfield" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  brownhills: {
    ...baseSchema,
    name: "Man and Van Club — Brownhills",
    description:
      "Free man and van request service in Brownhills, WS8 and Walsall. Submit your move details securely so an approved mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-brownhills",
    areaServed: {
      "@type": "Place",
      name: "Brownhills",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "WS8" },
        { "@type": "Neighborhood", name: "Walsall Wood" },
        { "@type": "Neighborhood", name: "Clayhanger" },
        { "@type": "Neighborhood", name: "Pelsall" },
        { "@type": "Neighborhood", name: "Aldridge" },
        { "@type": "Neighborhood", name: "Burntwood" },
        { "@type": "Neighborhood", name: "Cannock" },
        { "@type": "Neighborhood", name: "Lichfield" },
        { "@type": "Neighborhood", name: "Sutton Coldfield" }
      ]
    },
    serviceType: ["Man and Van Services", "Furniture Delivery", "House Removals", "Flat Removals", "Same Day Moves"]
  },
  leicester: {
    ...baseSchema,
    name: "Man and Van Club — Leicester",
    description:
      "Free man and van request service in Leicester. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-leicester",
    areaServed: {
      "@type": "City",
      name: "Leicester",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "East Midlands"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Oadby" },
        { "@type": "Neighborhood", name: "Wigston" },
        { "@type": "Neighborhood", name: "Braunstone" },
        { "@type": "Neighborhood", name: "Evington" },
        { "@type": "Neighborhood", name: "Clarendon Park" },
        { "@type": "Neighborhood", name: "Glenfield" },
        { "@type": "Neighborhood", name: "Birstall" },
        { "@type": "Neighborhood", name: "Fosse Park" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery", "Office Relocations"]
  },
  derby: {
    ...baseSchema,
    name: "Man and Van Club — Derby",
    description:
      "Free man and van request service in Derby. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-derby",
    areaServed: {
      "@type": "City",
      name: "Derby",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "East Midlands"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Mickleover" },
        { "@type": "Neighborhood", name: "Littleover" },
        { "@type": "Neighborhood", name: "Chaddesden" },
        { "@type": "Neighborhood", name: "Allestree" },
        { "@type": "Neighborhood", name: "Spondon" },
        { "@type": "Neighborhood", name: "Alvaston" },
        { "@type": "Neighborhood", name: "Pride Park" },
        { "@type": "Neighborhood", name: "Belper" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery", "Office Relocations"]
  },
  northampton: {
    ...baseSchema,
    name: "Man and Van Club — Northampton",
    description:
      "Free man and van request service in Northampton. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-northampton",
    areaServed: {
      "@type": "City",
      name: "Northampton",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "East Midlands"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Kingsthorpe" },
        { "@type": "Neighborhood", name: "Duston" },
        { "@type": "Neighborhood", name: "Abington" },
        { "@type": "Neighborhood", name: "Wootton" },
        { "@type": "Neighborhood", name: "East Hunsbury" },
        { "@type": "Neighborhood", name: "West Hunsbury" },
        { "@type": "Neighborhood", name: "Moulton Park" },
        { "@type": "Neighborhood", name: "Brackmills" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery", "Office Relocations"]
  },
  lincoln: {
    ...baseSchema,
    name: "Man and Van Club — Lincoln",
    description:
      "Free man and van request service in Lincoln. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-lincoln",
    areaServed: {
      "@type": "City",
      name: "Lincoln",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "East Midlands"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Cathedral Quarter" },
        { "@type": "Neighborhood", name: "Brayford" },
        { "@type": "Neighborhood", name: "North Hykeham" },
        { "@type": "Neighborhood", name: "Bracebridge Heath" },
        { "@type": "Neighborhood", name: "Boultham" },
        { "@type": "Neighborhood", name: "Waddington" },
        { "@type": "Neighborhood", name: "Skellingthorpe" },
        { "@type": "Neighborhood", name: "Steep Hill" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery", "Office Relocations"]
  },
  sheffield: {
    ...baseSchema,
    name: "Man and Van Club — Sheffield",
    description:
      "Free man and van request service in Sheffield. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-sheffield",
    areaServed: {
      "@type": "City",
      name: "Sheffield",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "South Yorkshire"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Ecclesall" },
        { "@type": "Neighborhood", name: "Broomhill" },
        { "@type": "Neighborhood", name: "Nether Edge" },
        { "@type": "Neighborhood", name: "Hillsborough" },
        { "@type": "Neighborhood", name: "Walkley" },
        { "@type": "Neighborhood", name: "Crookes" },
        { "@type": "Neighborhood", name: "Dore" },
        { "@type": "Neighborhood", name: "Chapeltown" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  edinburgh: {
    ...baseSchema,
    name: "Man and Van Club — Edinburgh",
    description:
      "Free man and van request service in Edinburgh. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-edinburgh",
    areaServed: {
      "@type": "City",
      name: "Edinburgh",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Scotland"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Leith" },
        { "@type": "Neighborhood", name: "Morningside" },
        { "@type": "Neighborhood", name: "Marchmont" },
        { "@type": "Neighborhood", name: "Portobello" },
        { "@type": "Neighborhood", name: "Corstorphine" },
        { "@type": "Neighborhood", name: "Stockbridge" },
        { "@type": "Neighborhood", name: "Newington" },
        { "@type": "Neighborhood", name: "Currie" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  glasgow: {
    ...baseSchema,
    name: "Man and Van Club — Glasgow",
    description:
      "Free man and van request service in Glasgow. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-glasgow",
    areaServed: {
      "@type": "City",
      name: "Glasgow",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Scotland"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "West End" },
        { "@type": "Neighborhood", name: "Southside" },
        { "@type": "Neighborhood", name: "East End" },
        { "@type": "Neighborhood", name: "Merchant City" },
        { "@type": "Neighborhood", name: "Partick" },
        { "@type": "Neighborhood", name: "Shawlands" },
        { "@type": "Neighborhood", name: "Govan" },
        { "@type": "Neighborhood", name: "Dennistoun" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  cardiff: {
    ...baseSchema,
    name: "Man and Van Club — Cardiff",
    description:
      "Free man and van request service in Cardiff. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-cardiff",
    areaServed: {
      "@type": "City",
      name: "Cardiff",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Wales"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Roath" },
        { "@type": "Neighborhood", name: "Cathays" },
        { "@type": "Neighborhood", name: "Pontcanna" },
        { "@type": "Neighborhood", name: "Llandaff" },
        { "@type": "Neighborhood", name: "Whitchurch" },
        { "@type": "Neighborhood", name: "Penarth" },
        { "@type": "Neighborhood", name: "Radyr" },
        { "@type": "Neighborhood", name: "Llanishen" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  "newcastle-upon-tyne": {
    ...baseSchema,
    name: "Man and Van Club — Newcastle upon Tyne",
    description:
      "Free man and van request service in Newcastle upon Tyne. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-newcastle-upon-tyne",
    areaServed: {
      "@type": "City",
      name: "Newcastle upon Tyne",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "North East"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Jesmond" },
        { "@type": "Neighborhood", name: "Gosforth" },
        { "@type": "Neighborhood", name: "Heaton" },
        { "@type": "Neighborhood", name: "Sandyford" },
        { "@type": "Neighborhood", name: "Fenham" },
        { "@type": "Neighborhood", name: "Byker" },
        { "@type": "Neighborhood", name: "Kenton" },
        { "@type": "Neighborhood", name: "West Jesmond" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  southampton: {
    ...baseSchema,
    name: "Man and Van Club — Southampton",
    description:
      "Free man and van request service in Southampton. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-southampton",
    areaServed: {
      "@type": "City",
      name: "Southampton",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "South East"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Portswood" },
        { "@type": "Neighborhood", name: "Shirley" },
        { "@type": "Neighborhood", name: "Bitterne" },
        { "@type": "Neighborhood", name: "Woolston" },
        { "@type": "Neighborhood", name: "Swaythling" },
        { "@type": "Neighborhood", name: "Highfield" },
        { "@type": "Neighborhood", name: "Chandler's Ford" },
        { "@type": "Neighborhood", name: "Eastleigh" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  oxford: {
    ...baseSchema,
    name: "Man and Van Club — Oxford",
    description:
      "Free man and van request service in Oxford. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-oxford",
    areaServed: {
      "@type": "City",
      name: "Oxford",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "South East"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Headington" },
        { "@type": "Neighborhood", name: "Cowley" },
        { "@type": "Neighborhood", name: "Jericho" },
        { "@type": "Neighborhood", name: "Summertown" },
        { "@type": "Neighborhood", name: "Botley" },
        { "@type": "Neighborhood", name: "Iffley" },
        { "@type": "Neighborhood", name: "Marston" },
        { "@type": "Neighborhood", name: "Abingdon" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  cambridge: {
    ...baseSchema,
    name: "Man and Van Club — Cambridge",
    description:
      "Free man and van request service in Cambridge. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-cambridge",
    areaServed: {
      "@type": "City",
      name: "Cambridge",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "East of England"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Cherry Hinton" },
        { "@type": "Neighborhood", name: "Chesterton" },
        { "@type": "Neighborhood", name: "Arbury" },
        { "@type": "Neighborhood", name: "Trumpington" },
        { "@type": "Neighborhood", name: "Newnham" },
        { "@type": "Neighborhood", name: "Romsey" },
        { "@type": "Neighborhood", name: "Histon" },
        { "@type": "Neighborhood", name: "Cambourne" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  coventry: {
    ...baseSchema,
    name: "Man and Van Club — Coventry",
    description:
      "Free man and van request service in Coventry. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-coventry",
    areaServed: {
      "@type": "City",
      name: "Coventry",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Earlsdon" },
        { "@type": "Neighborhood", name: "Stoke" },
        { "@type": "Neighborhood", name: "Cheylesmore" },
        { "@type": "Neighborhood", name: "Hillfields" },
        { "@type": "Neighborhood", name: "Binley" },
        { "@type": "Neighborhood", name: "Coundon" },
        { "@type": "Neighborhood", name: "Foleshill" },
        { "@type": "Neighborhood", name: "Canley" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  bradford: {
    ...baseSchema,
    name: "Man and Van Club — Bradford",
    description:
      "Free man and van request service in Bradford. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-bradford",
    areaServed: {
      "@type": "City",
      name: "Bradford",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Yorkshire"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Ilkley" },
        { "@type": "Neighborhood", name: "Shipley" },
        { "@type": "Neighborhood", name: "Bingley" },
        { "@type": "Neighborhood", name: "Keighley" },
        { "@type": "Neighborhood", name: "Saltaire" },
        { "@type": "Neighborhood", name: "Manningham" },
        { "@type": "Neighborhood", name: "Great Horton" },
        { "@type": "Neighborhood", name: "Queensbury" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  hull: {
    ...baseSchema,
    name: "Man and Van Club — Hull",
    description:
      "Free man and van request service in Hull. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-hull",
    areaServed: {
      "@type": "City",
      name: "Hull",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "East Yorkshire"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Anlaby" },
        { "@type": "Neighborhood", name: "Cottingham" },
        { "@type": "Neighborhood", name: "Hessle" },
        { "@type": "Neighborhood", name: "Willerby" },
        { "@type": "Neighborhood", name: "Beverley" },
        { "@type": "Neighborhood", name: "The Avenues" },
        { "@type": "Neighborhood", name: "Marfleet" },
        { "@type": "Neighborhood", name: "Sutton" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  swindon: {
    ...baseSchema,
    name: "Man and Van Club — Swindon",
    description:
      "Free man and van request service in Swindon. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-swindon",
    areaServed: {
      "@type": "City",
      name: "Swindon",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "South West"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Old Town" },
        { "@type": "Neighborhood", name: "Wroughton" },
        { "@type": "Neighborhood", name: "Highworth" },
        { "@type": "Neighborhood", name: "Purton" },
        { "@type": "Neighborhood", name: "Wanborough" },
        { "@type": "Neighborhood", name: "Stratton" },
        { "@type": "Neighborhood", name: "West Swindon" },
        { "@type": "Neighborhood", name: "Haydon Wick" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  "stoke-on-trent": {
    ...baseSchema,
    name: "Man and Van Club — Stoke-on-Trent",
    description:
      "Free man and van request service in Stoke-on-Trent. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-stoke-on-trent",
    areaServed: {
      "@type": "City",
      name: "Stoke-on-Trent",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West England"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Hanley" },
        { "@type": "Neighborhood", name: "Burslem" },
        { "@type": "Neighborhood", name: "Longton" },
        { "@type": "Neighborhood", name: "Fenton" },
        { "@type": "Neighborhood", name: "Tunstall" },
        { "@type": "Neighborhood", name: "Trentham" },
        { "@type": "Neighborhood", name: "Shelton" },
        { "@type": "Neighborhood", name: "Newcastle-under-Lyme" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  plymouth: {
    ...baseSchema,
    name: "Man and Van Club — Plymouth",
    description:
      "Free man and van request service in Plymouth. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-plymouth",
    areaServed: {
      "@type": "City",
      name: "Plymouth",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "South West"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Mutley" },
        { "@type": "Neighborhood", name: "Mannamead" },
        { "@type": "Neighborhood", name: "Eggbuckland" },
        { "@type": "Neighborhood", name: "Plympton" },
        { "@type": "Neighborhood", name: "Devonport" },
        { "@type": "Neighborhood", name: "Stonehouse" },
        { "@type": "Neighborhood", name: "Stoke" },
        { "@type": "Neighborhood", name: "Ivybridge" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  reading: {
    ...baseSchema,
    name: "Man and Van Club — Reading",
    description:
      "Free man and van request service in Reading. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-reading",
    areaServed: {
      "@type": "City",
      name: "Reading",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "South East"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Caversham" },
        { "@type": "Neighborhood", name: "Earley" },
        { "@type": "Neighborhood", name: "Woodley" },
        { "@type": "Neighborhood", name: "Tilehurst" },
        { "@type": "Neighborhood", name: "Whitley" },
        { "@type": "Neighborhood", name: "Green Park" },
        { "@type": "Neighborhood", name: "Wokingham" },
        { "@type": "Neighborhood", name: "Bracknell" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  aberdeen: {
    ...baseSchema,
    name: "Man and Van Club — Aberdeen",
    description:
      "Free man and van request service in Aberdeen. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-aberdeen",
    areaServed: {
      "@type": "City",
      name: "Aberdeen",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Scotland"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Rosemount" },
        { "@type": "Neighborhood", name: "Ferryhill" },
        { "@type": "Neighborhood", name: "Cults" },
        { "@type": "Neighborhood", name: "Dyce" },
        { "@type": "Neighborhood", name: "Bridge of Don" },
        { "@type": "Neighborhood", name: "Old Aberdeen" },
        { "@type": "Neighborhood", name: "Westhill" },
        { "@type": "Neighborhood", name: "Banchory" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  dundee: {
    ...baseSchema,
    name: "Man and Van Club — Dundee",
    description:
      "Free man and van request service in Dundee. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-dundee",
    areaServed: {
      "@type": "City",
      name: "Dundee",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Scotland"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "West End" },
        { "@type": "Neighborhood", name: "Broughty Ferry" },
        { "@type": "Neighborhood", name: "Lochee" },
        { "@type": "Neighborhood", name: "Stobswell" },
        { "@type": "Neighborhood", name: "Monifieth" },
        { "@type": "Neighborhood", name: "Menzieshill" },
        { "@type": "Neighborhood", name: "Downfield" },
        { "@type": "Neighborhood", name: "Carnoustie" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  swansea: {
    ...baseSchema,
    name: "Man and Van Club — Swansea",
    description:
      "Free man and van request service in Swansea. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-swansea",
    areaServed: {
      "@type": "City",
      name: "Swansea",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Wales"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Mumbles" },
        { "@type": "Neighborhood", name: "Sketty" },
        { "@type": "Neighborhood", name: "Uplands" },
        { "@type": "Neighborhood", name: "Gorseinon" },
        { "@type": "Neighborhood", name: "Morriston" },
        { "@type": "Neighborhood", name: "Killay" },
        { "@type": "Neighborhood", name: "Clydach" },
        { "@type": "Neighborhood", name: "Neath" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  york: {
    ...baseSchema,
    name: "Man and Van Club — York",
    description:
      "Free man and van request service in York. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-york",
    areaServed: {
      "@type": "City",
      name: "York",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "North Yorkshire"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Heworth" },
        { "@type": "Neighborhood", name: "Acomb" },
        { "@type": "Neighborhood", name: "Fulford" },
        { "@type": "Neighborhood", name: "Clifton" },
        { "@type": "Neighborhood", name: "Bishopthorpe" },
        { "@type": "Neighborhood", name: "Heslington" },
        { "@type": "Neighborhood", name: "Haxby" },
        { "@type": "Neighborhood", name: "Wigginton" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  portsmouth: {
    ...baseSchema,
    name: "Man and Van Club — Portsmouth",
    description:
      "Free man and van request service in Portsmouth. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-portsmouth",
    areaServed: {
      "@type": "City",
      name: "Portsmouth",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "South East"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Southsea" },
        { "@type": "Neighborhood", name: "Fratton" },
        { "@type": "Neighborhood", name: "Cosham" },
        { "@type": "Neighborhood", name: "Hilsea" },
        { "@type": "Neighborhood", name: "North End" },
        { "@type": "Neighborhood", name: "Copnor" },
        { "@type": "Neighborhood", name: "Drayton" },
        { "@type": "Neighborhood", name: "Fareham" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
};

export function getEnhancedServiceSchema(locationKey: string): Record<string, any> | null {
  return enhancedServiceSchemas[locationKey] || null;
}

// LocalBusiness schema for the two priority target cities.
// These run alongside the Service schema on those pages and give Google
// a strong local entity signal for the local pack and map results.
export function getLocalBusinessSchema(locationKey: string): Record<string, any> | null {
  const base = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Man and Van Club",
    "alternateName": ["Man & Van Club", "Man and Van Club UK"],
    "url": siteUrl,
    "logo": `${siteUrl}/icon.png`,
    "telephone": "+44-121-751-1269",
    "email": "support@manandvanclub.co.uk",
    "image": `${siteUrl}/images/og-homepage.jpg`,
    "priceRange": "From £50/hr",
    "currenciesAccepted": "GBP",
    "paymentAccepted": "Card, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Walsall",
      "addressRegion": "West Midlands",
      "addressCountry": "GB"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": "Man and Van Club",
      "url": siteUrl
    }
  };

  if (locationKey === "birmingham") {
    return {
      ...base,
      "name": "Man and Van Club — Birmingham",
      "description": "Free man and van quote request service in Birmingham, West Midlands. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Jewellery Quarter, Edgbaston, Moseley, Harborne, Selly Oak, Bournville and Sutton Coldfield.",
      "url": `${siteUrl}/man-and-van-birmingham`,
      "areaServed": {
        "@type": "City",
        "name": "Birmingham",
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": "West Midlands"
        }
      },
      "hasMap": "https://maps.google.com/?q=Birmingham+West+Midlands+UK",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "20:00"
      }
    };
  }

  if (locationKey === "walsall") {
    return {
      ...base,
      "name": "Man and Van Club — Walsall",
      "description": "Free man and van quote request service in Walsall, West Midlands. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Bloxwich, Aldridge, Brownhills, Darlaston, Willenhall, Pelsall and Rushall.",
      "url": `${siteUrl}/man-and-van-walsall`,
      "areaServed": {
        "@type": "City",
        "name": "Walsall",
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": "West Midlands"
        }
      },
      "hasMap": "https://maps.google.com/?q=Walsall+West+Midlands+UK",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "20:00"
      }
    };
  }

  return null;
}
