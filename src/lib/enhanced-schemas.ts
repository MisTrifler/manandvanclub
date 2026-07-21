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
  belfast: {
    ...baseSchema,
    name: "Man and Van Club — Belfast",
    description:
      "Free man and van request service in Belfast. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-belfast",
    areaServed: {
      "@type": "City",
      name: "Belfast",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "County Antrim"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "South Belfast" },
        { "@type": "Neighborhood", name: "East Belfast" },
        { "@type": "Neighborhood", name: "West Belfast" },
        { "@type": "Neighborhood", name: "Queens Quarter" },
        { "@type": "Neighborhood", name: "Titanic Quarter" },
        { "@type": "Neighborhood", name: "Botanic" },
        { "@type": "Neighborhood", name: "Ballyhackamore" },
        { "@type": "Neighborhood", name: "Ormeau" },
        { "@type": "Neighborhood", name: "Andersonstown" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Office Relocations", "Furniture Delivery"]
  },
  brighton: {
    ...baseSchema,
    name: "Man and Van Club — Brighton",
    description:
      "Free man and van request service in Brighton. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-brighton",
    areaServed: {
      "@type": "City",
      name: "Brighton",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "East Sussex"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "Kemptown" },
        { "@type": "Neighborhood", name: "Hove" },
        { "@type": "Neighborhood", name: "Preston Park" },
        { "@type": "Neighborhood", name: "Hanover" },
        { "@type": "Neighborhood", name: "Seven Dials" },
        { "@type": "Neighborhood", name: "Fiveways" },
        { "@type": "Neighborhood", name: "Queens Park" },
        { "@type": "Neighborhood", name: "Moulsecoomb" },
        { "@type": "Neighborhood", name: "Portslade" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Office Relocations", "Furniture Delivery"]
  },
  sunderland: {
    ...baseSchema,
    name: "Man and Van Club — Sunderland",
    description:
      "Free man and van request service in Sunderland. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-sunderland",
    areaServed: {
      "@type": "City",
      name: "Sunderland",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Tyne and Wear"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "Roker" },
        { "@type": "Neighborhood", name: "Seaburn" },
        { "@type": "Neighborhood", name: "Hendon" },
        { "@type": "Neighborhood", name: "Millfield" },
        { "@type": "Neighborhood", name: "Ashbrooke" },
        { "@type": "Neighborhood", name: "Fulwell" },
        { "@type": "Neighborhood", name: "Barnes" },
        { "@type": "Neighborhood", name: "Thornhill" },
        { "@type": "Neighborhood", name: "Pallion" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "milton-keynes": {
    ...baseSchema,
    name: "Man and Van Club — Milton Keynes",
    description:
      "Free man and van request service in Milton Keynes. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-milton-keynes",
    areaServed: {
      "@type": "City",
      name: "Milton Keynes",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Buckinghamshire"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "Stony Stratford" },
        { "@type": "Neighborhood", name: "Wolverton" },
        { "@type": "Neighborhood", name: "Bletchley" },
        { "@type": "Neighborhood", name: "Newport Pagnell" },
        { "@type": "Neighborhood", name: "Olney" },
        { "@type": "Neighborhood", name: "Shenley Church End" },
        { "@type": "Neighborhood", name: "Great Linford" },
        { "@type": "Neighborhood", name: "Campbell Park" },
        { "@type": "Neighborhood", name: "Loughton" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  bournemouth: {
    ...baseSchema,
    name: "Man and Van Club — Bournemouth",
    description:
      "Free man and van request service in Bournemouth. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-bournemouth",
    areaServed: {
      "@type": "City",
      name: "Bournemouth",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Dorset"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Westbourne" },
        { "@type": "Neighborhood", name: "Boscombe" },
        { "@type": "Neighborhood", name: "Southbourne" },
        { "@type": "Neighborhood", name: "Winton" },
        { "@type": "Neighborhood", name: "Charminster" },
        { "@type": "Neighborhood", name: "Kinson" },
        { "@type": "Neighborhood", name: "Poole" },
        { "@type": "Neighborhood", name: "Christchurch" },
        { "@type": "Neighborhood", name: "Talbot Woods" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Office Relocations", "Furniture Delivery"]
  },
  peterborough: {
    ...baseSchema,
    name: "Man and Van Club — Peterborough",
    description:
      "Free man and van request service in Peterborough. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-peterborough",
    areaServed: {
      "@type": "City",
      name: "Peterborough",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Cambridgeshire"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "Hampton" },
        { "@type": "Neighborhood", name: "Werrington" },
        { "@type": "Neighborhood", name: "Fletton" },
        { "@type": "Neighborhood", name: "Woodston" },
        { "@type": "Neighborhood", name: "Orton" },
        { "@type": "Neighborhood", name: "Bretton" },
        { "@type": "Neighborhood", name: "Paston" },
        { "@type": "Neighborhood", name: "Dogsthorpe" },
        { "@type": "Neighborhood", name: "Newborough" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  norwich: {
    ...baseSchema,
    name: "Man and Van Club — Norwich",
    description:
      "Free man and van request service in Norwich. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-norwich",
    areaServed: {
      "@type": "City",
      name: "Norwich",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Norfolk"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "Eaton" },
        { "@type": "Neighborhood", name: "Cringleford" },
        { "@type": "Neighborhood", name: "Thorpe St Andrew" },
        { "@type": "Neighborhood", name: "Sprowston" },
        { "@type": "Neighborhood", name: "Hellesdon" },
        { "@type": "Neighborhood", name: "Costessey" },
        { "@type": "Neighborhood", name: "Taverham" },
        { "@type": "Neighborhood", name: "Lakenham" },
        { "@type": "Neighborhood", name: "Bowthorpe" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Office Relocations", "Furniture Delivery"]
  },
  luton: {
    ...baseSchema,
    name: "Man and Van Club — Luton",
    description:
      "Free man and van request service in Luton. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-luton",
    areaServed: {
      "@type": "City",
      name: "Luton",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Bedfordshire"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Biscot" },
        { "@type": "Neighborhood", name: "High Town" },
        { "@type": "Neighborhood", name: "Barton Hills" },
        { "@type": "Neighborhood", name: "Leagrave" },
        { "@type": "Neighborhood", name: "Limbury" },
        { "@type": "Neighborhood", name: "Stockwood Park" },
        { "@type": "Neighborhood", name: "Caddington" },
        { "@type": "Neighborhood", name: "Bramingham" },
        { "@type": "Neighborhood", name: "Sundon Park" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Office Relocations", "Furniture Delivery"]
  },
  middlesbrough: {
    ...baseSchema,
    name: "Man and Van Club — Middlesbrough",
    description:
      "Free man and van request service in Middlesbrough. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-middlesbrough",
    areaServed: {
      "@type": "City",
      name: "Middlesbrough",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "North Yorkshire"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "Linthorpe" },
        { "@type": "Neighborhood", name: "Acklam" },
        { "@type": "Neighborhood", name: "Marton" },
        { "@type": "Neighborhood", name: "Nunthorpe" },
        { "@type": "Neighborhood", name: "Billingham" },
        { "@type": "Neighborhood", name: "Stockton" },
        { "@type": "Neighborhood", name: "Redcar" },
        { "@type": "Neighborhood", name: "Guisborough" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  newport: {
    ...baseSchema,
    name: "Man and Van Club — Newport",
    description:
      "Free man and van request service in Newport. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-newport",
    areaServed: {
      "@type": "City",
      name: "Newport",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Gwent"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "Caerleon" },
        { "@type": "Neighborhood", name: "Bettws" },
        { "@type": "Neighborhood", name: "Maindee" },
        { "@type": "Neighborhood", name: "Baneswell" },
        { "@type": "Neighborhood", name: "Somerton" },
        { "@type": "Neighborhood", name: "Gaer" },
        { "@type": "Neighborhood", name: "Rogerstone" },
        { "@type": "Neighborhood", name: "Pillgwenlly" },
        { "@type": "Neighborhood", name: "Duffryn" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  ipswich: {
    ...baseSchema,
    name: "Man and Van Club — Ipswich",
    description:
      "Free man and van request service in Ipswich. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-ipswich",
    areaServed: {
      "@type": "City",
      name: "Ipswich",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Suffolk"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Felixstowe" },
        { "@type": "Neighborhood", name: "Woodbridge" },
        { "@type": "Neighborhood", name: "Kesgrave" },
        { "@type": "Neighborhood", name: "Rushmere St Andrew" },
        { "@type": "Neighborhood", name: "Claydon" },
        { "@type": "Neighborhood", name: "Pinewood" },
        { "@type": "Neighborhood", name: "Chantry" },
        { "@type": "Neighborhood", name: "Bramford" },
        { "@type": "Neighborhood", name: "Westerfield" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  exeter: {
    ...baseSchema,
    name: "Man and Van Club — Exeter",
    description:
      "Free man and van request service in Exeter. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-exeter",
    areaServed: {
      "@type": "City",
      name: "Exeter",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Devon"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "St Leonards" },
        { "@type": "Neighborhood", name: "Heavitree" },
        { "@type": "Neighborhood", name: "Pinhoe" },
        { "@type": "Neighborhood", name: "Alphington" },
        { "@type": "Neighborhood", name: "Topsham" },
        { "@type": "Neighborhood", name: "Cranbrook" },
        { "@type": "Neighborhood", name: "Countess Wear" },
        { "@type": "Neighborhood", name: "Whipton" },
        { "@type": "Neighborhood", name: "St Thomas" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Office Relocations", "Furniture Delivery"]
  },
  derry: {
    ...baseSchema,
    name: "Man and Van Club — Derry",
    description:
      "Free man and van request service in Derry/Londonderry. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-derry",
    areaServed: {
      "@type": "City",
      name: "Derry",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "County Londonderry"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "Waterside" },
        { "@type": "Neighborhood", name: "Creggan" },
        { "@type": "Neighborhood", name: "Shantallow" },
        { "@type": "Neighborhood", name: "Ballymagroarty" },
        { "@type": "Neighborhood", name: "Foyle Bridge area" },
        { "@type": "Neighborhood", name: "Clooney" },
        { "@type": "Neighborhood", name: "Eglinton" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  inverness: {
    ...baseSchema,
    name: "Man and Van Club — Inverness",
    description:
      "Free man and van request service in Inverness. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-inverness",
    areaServed: {
      "@type": "City",
      name: "Inverness",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Highland"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "Culloden" },
        { "@type": "Neighborhood", name: "Dingwall" },
        { "@type": "Neighborhood", name: "Nairn" },
        { "@type": "Neighborhood", name: "Beauly" },
        { "@type": "Neighborhood", name: "Drumnadrochit" },
        { "@type": "Neighborhood", name: "Fortrose" },
        { "@type": "Neighborhood", name: "Aviemore" },
        { "@type": "Neighborhood", name: "Munlochy" },
        { "@type": "Neighborhood", name: "Alness" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  colchester: {
    ...baseSchema,
    name: "Man and Van Club — Colchester",
    description:
      "Free man and van request service in Colchester. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-colchester",
    areaServed: {
      "@type": "City",
      name: "Colchester",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Essex"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Lexden" },
        { "@type": "Neighborhood", name: "Prettygate" },
        { "@type": "Neighborhood", name: "Stanway" },
        { "@type": "Neighborhood", name: "Greenstead" },
        { "@type": "Neighborhood", name: "Highwoods" },
        { "@type": "Neighborhood", name: "Tiptree" },
        { "@type": "Neighborhood", name: "Wivenhoe" },
        { "@type": "Neighborhood", name: "Layer-de-la-Haye" },
        { "@type": "Neighborhood", name: "Marks Tey" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Office Relocations", "Furniture Delivery"]
  },
  doncaster: {
    ...baseSchema,
    name: "Man and Van Club — Doncaster",
    description:
      "Free man and van request service in Doncaster. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-doncaster",
    areaServed: {
      "@type": "City",
      name: "Doncaster",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "South Yorkshire"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Bessacarr" },
        { "@type": "Neighborhood", name: "Wheatley" },
        { "@type": "Neighborhood", name: "Cantley" },
        { "@type": "Neighborhood", name: "Edenthorpe" },
        { "@type": "Neighborhood", name: "Armthorpe" },
        { "@type": "Neighborhood", name: "Hatfield" },
        { "@type": "Neighborhood", name: "Rossington" },
        { "@type": "Neighborhood", name: "Sprotbrough" },
        { "@type": "Neighborhood", name: "Finningley" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  crawley: {
    ...baseSchema,
    name: "Man and Van Club — Crawley",
    description:
      "Free man and van request service in Crawley. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-crawley",
    areaServed: {
      "@type": "City",
      name: "Crawley",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Sussex"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Three Bridges" },
        { "@type": "Neighborhood", name: "Ifield" },
        { "@type": "Neighborhood", name: "Pound Hill" },
        { "@type": "Neighborhood", name: "Tilgate" },
        { "@type": "Neighborhood", name: "Broadfield" },
        { "@type": "Neighborhood", name: "Bewbush" },
        { "@type": "Neighborhood", name: "Gossops Green" },
        { "@type": "Neighborhood", name: "Southgate" },
        { "@type": "Neighborhood", name: "West Green" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  basildon: {
    ...baseSchema,
    name: "Man and Van Club — Basildon",
    description:
      "Free man and van request service in Basildon. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-basildon",
    areaServed: {
      "@type": "City",
      name: "Basildon",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Essex"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Pitsea" },
        { "@type": "Neighborhood", name: "Laindon" },
        { "@type": "Neighborhood", name: "Wickford" },
        { "@type": "Neighborhood", name: "Billericay" },
        { "@type": "Neighborhood", name: "Langdon Hills" },
        { "@type": "Neighborhood", name: "Vange" },
        { "@type": "Neighborhood", name: "Lee Chapel" },
        { "@type": "Neighborhood", name: "Great Burstead" },
        { "@type": "Neighborhood", name: "Dunton" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  slough: {
    ...baseSchema,
    name: "Man and Van Club — Slough",
    description:
      "Free man and van request service in Slough. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-slough",
    areaServed: {
      "@type": "City",
      name: "Slough",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Berkshire"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Cippenham" },
        { "@type": "Neighborhood", name: "Langley" },
        { "@type": "Neighborhood", name: "Britwell" },
        { "@type": "Neighborhood", name: "Wexham" },
        { "@type": "Neighborhood", name: "Chalvey" },
        { "@type": "Neighborhood", name: "Upton" },
        { "@type": "Neighborhood", name: "Iver" },
        { "@type": "Neighborhood", name: "Colnbrook" },
        { "@type": "Neighborhood", name: "Datchet" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  gateshead: {
    ...baseSchema,
    name: "Man and Van Club — Gateshead",
    description:
      "Free man and van request service in Gateshead. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-gateshead",
    areaServed: {
      "@type": "City",
      name: "Gateshead",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Tyne and Wear"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Low Fell" },
        { "@type": "Neighborhood", name: "Gateshead Quays" },
        { "@type": "Neighborhood", name: "Bensham" },
        { "@type": "Neighborhood", name: "Saltwell" },
        { "@type": "Neighborhood", name: "Deckham" },
        { "@type": "Neighborhood", name: "Dunston" },
        { "@type": "Neighborhood", name: "Whickham" },
        { "@type": "Neighborhood", name: "Blaydon" },
        { "@type": "Neighborhood", name: "Rowlands Gill" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  barnsley: {
    ...baseSchema,
    name: "Man and Van Club — Barnsley",
    description:
      "Free man and van request service in Barnsley. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-barnsley",
    areaServed: {
      "@type": "City",
      name: "Barnsley",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "South Yorkshire"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Dodworth" },
        { "@type": "Neighborhood", name: "Penistone" },
        { "@type": "Neighborhood", name: "Hoyland" },
        { "@type": "Neighborhood", name: "Wombwell" },
        { "@type": "Neighborhood", name: "Royston" },
        { "@type": "Neighborhood", name: "Cudworth" },
        { "@type": "Neighborhood", name: "Monk Bretton" },
        { "@type": "Neighborhood", name: "Goldthorpe" },
        { "@type": "Neighborhood", name: "Thurnscoe" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  aberystwyth: {
    ...baseSchema,
    name: "Man and Van Club — Aberystwyth",
    description:
      "Free man and van request service in Aberystwyth. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-aberystwyth",
    areaServed: {
      "@type": "City",
      name: "Aberystwyth",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Ceredigion"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Penparcau" },
        { "@type": "Neighborhood", name: "Llanbadarn Fawr" },
        { "@type": "Neighborhood", name: "Borth" },
        { "@type": "Neighborhood", name: "Trefechan" },
        { "@type": "Neighborhood", name: "Comins Coch" },
        { "@type": "Neighborhood", name: "Capel Bangor" },
        { "@type": "Neighborhood", name: "Bow Street" },
        { "@type": "Neighborhood", name: "Clarach" },
        { "@type": "Neighborhood", name: "Talybont" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  bangor: {
    ...baseSchema,
    name: "Man and Van Club — Bangor",
    description:
      "Free man and van request service in Bangor. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-bangor",
    areaServed: {
      "@type": "City",
      name: "Bangor",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Gwynedd"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "Hirael" },
        { "@type": "Neighborhood", name: "Garth" },
        { "@type": "Neighborhood", name: "Port Penrhyn" },
        { "@type": "Neighborhood", name: "Tregarth" },
        { "@type": "Neighborhood", name: "Bethel" },
        { "@type": "Neighborhood", name: "Llanberis" },
        { "@type": "Neighborhood", name: "Menai Bridge" },
        { "@type": "Neighborhood", name: "Beaumaris" },
        { "@type": "Neighborhood", name: "Caernarfon" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Furniture Delivery"]
  },
  darlington: {
    ...baseSchema,
    name: "Man and Van Club — Darlington",
    description:
      "Free man and van request service in Darlington. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-darlington",
    areaServed: {
      "@type": "City",
      name: "Darlington",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "County Durham"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Northgate" },
        { "@type": "Neighborhood", name: "Haughton" },
        { "@type": "Neighborhood", name: "Faverdale" },
        { "@type": "Neighborhood", name: "Brinkburn" },
        { "@type": "Neighborhood", name: "Cockerton" },
        { "@type": "Neighborhood", name: "Hurstworth" },
        { "@type": "Neighborhood", name: "Sadberge" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  durham: {
    ...baseSchema,
    name: "Man and Van Club — Durham",
    description:
      "Free man and van request service in Durham. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-durham",
    areaServed: {
      "@type": "City",
      name: "Durham",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "County Durham"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "Gilesgate" },
        { "@type": "Neighborhood", name: "Framwellgate Moor" },
        { "@type": "Neighborhood", name: "Nevilles Cross" },
        { "@type": "Neighborhood", name: "Claypath" },
        { "@type": "Neighborhood", name: "Belmont" },
        { "@type": "Neighborhood", name: "Aykley Heads" },
        { "@type": "Neighborhood", name: "Dragonville" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Student Moves", "Office Relocations", "Furniture Delivery"]
  },
  "east-kilbride": {
    ...baseSchema,
    name: "Man and Van Club — East Kilbride",
    description:
      "Free man and van request service in East Kilbride. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-east-kilbride",
    areaServed: {
      "@type": "City",
      name: "East Kilbride",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "South Lanarkshire"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "The Village" },
        { "@type": "Neighborhood", name: "Greenhills" },
        { "@type": "Neighborhood", name: "Stewartfield" },
        { "@type": "Neighborhood", name: "West Mains" },
        { "@type": "Neighborhood", name: "Calderwood" },
        { "@type": "Neighborhood", name: "Mossneuk" },
        { "@type": "Neighborhood", name: "Hairmyres" },
        { "@type": "Neighborhood", name: "Murray" },
        { "@type": "Neighborhood", name: "Whitehills" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  falkirk: {
    ...baseSchema,
    name: "Man and Van Club — Falkirk",
    description:
      "Free man and van request service in Falkirk. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-falkirk",
    areaServed: {
      "@type": "City",
      name: "Falkirk",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Falkirk"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Grangemouth" },
        { "@type": "Neighborhood", name: "Larbert" },
        { "@type": "Neighborhood", name: "Denny" },
        { "@type": "Neighborhood", name: "Bonnybridge" },
        { "@type": "Neighborhood", name: "Polmont" },
        { "@type": "Neighborhood", name: "Camelon" },
        { "@type": "Neighborhood", name: "Bainsford" },
        { "@type": "Neighborhood", name: "Brightons" },
        { "@type": "Neighborhood", name: "Reddingmuirhead" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  hartlepool: {
    ...baseSchema,
    name: "Man and Van Club — Hartlepool",
    description:
      "Free man and van request service in Hartlepool. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-hartlepool",
    areaServed: {
      "@type": "City",
      name: "Hartlepool",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "County Durham"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Headland" },
        { "@type": "Neighborhood", name: "Seaton Carew" },
        { "@type": "Neighborhood", name: "West Park" },
        { "@type": "Neighborhood", name: "Throston" },
        { "@type": "Neighborhood", name: "Elwick" },
        { "@type": "Neighborhood", name: "Owton" },
        { "@type": "Neighborhood", name: "Rift House" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  horsham: {
    ...baseSchema,
    name: "Man and Van Club — Horsham",
    description:
      "Free man and van request service in Horsham. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-horsham",
    areaServed: {
      "@type": "City",
      name: "Horsham",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Sussex"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Broadbridge Heath" },
        { "@type": "Neighborhood", name: "Southwater" },
        { "@type": "Neighborhood", name: "Billingshurst" },
        { "@type": "Neighborhood", name: "Henfield" },
        { "@type": "Neighborhood", name: "Steyning" },
        { "@type": "Neighborhood", name: "Pulborough" },
        { "@type": "Neighborhood", name: "Warnham" },
        { "@type": "Neighborhood", name: "Rusper" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  lisburn: {
    ...baseSchema,
    name: "Man and Van Club — Lisburn",
    description:
      "Free man and van request service in Lisburn. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-lisburn",
    areaServed: {
      "@type": "City",
      name: "Lisburn",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "County Antrim"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "Hillsborough" },
        { "@type": "Neighborhood", name: "Moira" },
        { "@type": "Neighborhood", name: "Lambeg" },
        { "@type": "Neighborhood", name: "Knockmore" },
        { "@type": "Neighborhood", name: "Lisnasharragh" },
        { "@type": "Neighborhood", name: "Hilden" },
        { "@type": "Neighborhood", name: "Maze" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  livingston: {
    ...baseSchema,
    name: "Man and Van Club — Livingston",
    description:
      "Free man and van request service in Livingston. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-livingston",
    areaServed: {
      "@type": "City",
      name: "Livingston",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Lothian"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Dedridge" },
        { "@type": "Neighborhood", name: "Murieston" },
        { "@type": "Neighborhood", name: "Adambrae" },
        { "@type": "Neighborhood", name: "Boghall" },
        { "@type": "Neighborhood", name: "Eliburn" },
        { "@type": "Neighborhood", name: "Deans" },
        { "@type": "Neighborhood", name: "Broxburn" },
        { "@type": "Neighborhood", name: "Uphall" },
        { "@type": "Neighborhood", name: "Winchburgh" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  maidstone: {
    ...baseSchema,
    name: "Man and Van Club — Maidstone",
    description:
      "Free man and van request service in Maidstone. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-maidstone",
    areaServed: {
      "@type": "City",
      name: "Maidstone",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Kent"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Bearsted" },
        { "@type": "Neighborhood", name: "Loose" },
        { "@type": "Neighborhood", name: "Detling" },
        { "@type": "Neighborhood", name: "Marden" },
        { "@type": "Neighborhood", name: "Yalding" },
        { "@type": "Neighborhood", name: "Headcorn" },
        { "@type": "Neighborhood", name: "Birling" },
        { "@type": "Neighborhood", name: "Parkwood" },
        { "@type": "Neighborhood", name: "Shepway" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  medway: {
    ...baseSchema,
    name: "Man and Van Club — Medway",
    description:
      "Free man and van request service in Medway. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-medway",
    areaServed: {
      "@type": "City",
      name: "Medway",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Kent"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Rochester" },
        { "@type": "Neighborhood", name: "Chatham" },
        { "@type": "Neighborhood", name: "Gillingham" },
        { "@type": "Neighborhood", name: "Strood" },
        { "@type": "Neighborhood", name: "Rainham" },
        { "@type": "Neighborhood", name: "Cuxton" },
        { "@type": "Neighborhood", name: "Halling" },
        { "@type": "Neighborhood", name: "Hoo" },
        { "@type": "Neighborhood", name: "Walderslade" },
        { "@type": "Neighborhood", name: "Lordswood" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  newry: {
    ...baseSchema,
    name: "Man and Van Club — Newry",
    description:
      "Free man and van request service in Newry. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-newry",
    areaServed: {
      "@type": "City",
      name: "Newry",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "County Down"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "Warrenpoint" },
        { "@type": "Neighborhood", name: "Crossmaglen" },
        { "@type": "Neighborhood", name: "Kilkeel" },
        { "@type": "Neighborhood", name: "Rostrevor" },
        { "@type": "Neighborhood", name: "Bessbrook" },
        { "@type": "Neighborhood", name: "Camlough" },
        { "@type": "Neighborhood", name: "Meigh" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  paisley: {
    ...baseSchema,
    name: "Man and Van Club — Paisley",
    description:
      "Free man and van request service in Paisley. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-paisley",
    areaServed: {
      "@type": "City",
      name: "Paisley",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Renfrewshire"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Gallowhill" },
        { "@type": "Neighborhood", name: "Foxbar" },
        { "@type": "Neighborhood", name: "Ferguslie" },
        { "@type": "Neighborhood", name: "Elderslie" },
        { "@type": "Neighborhood", name: "Johnstone" },
        { "@type": "Neighborhood", name: "Renfrew" },
        { "@type": "Neighborhood", name: "Linwood" },
        { "@type": "Neighborhood", name: "Shortroods" },
        { "@type": "Neighborhood", name: "Ralston" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  perth: {
    ...baseSchema,
    name: "Man and Van Club — Perth",
    description:
      "Free man and van request service in Perth. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-perth",
    areaServed: {
      "@type": "City",
      name: "Perth",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Perth and Kinross"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "Scone" },
        { "@type": "Neighborhood", name: "Crieff" },
        { "@type": "Neighborhood", name: "Auchterarder" },
        { "@type": "Neighborhood", name: "Blairgowrie" },
        { "@type": "Neighborhood", name: "Coupar Angus" },
        { "@type": "Neighborhood", name: "Bridge of Earn" },
        { "@type": "Neighborhood", name: "Stanley" },
        { "@type": "Neighborhood", name: "Luncarty" },
        { "@type": "Neighborhood", name: "Muirton" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  rotherham: {
    ...baseSchema,
    name: "Man and Van Club — Rotherham",
    description:
      "Free man and van request service in Rotherham. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-rotherham",
    areaServed: {
      "@type": "City",
      name: "Rotherham",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "South Yorkshire"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Wickersley" },
        { "@type": "Neighborhood", name: "Bramley" },
        { "@type": "Neighborhood", name: "Maltby" },
        { "@type": "Neighborhood", name: "Rawmarsh" },
        { "@type": "Neighborhood", name: "Wath-upon-Dearne" },
        { "@type": "Neighborhood", name: "Swinton" },
        { "@type": "Neighborhood", name: "Aston" },
        { "@type": "Neighborhood", name: "Thurcroft" },
        { "@type": "Neighborhood", name: "Kimberworth" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  stirling: {
    ...baseSchema,
    name: "Man and Van Club — Stirling",
    description:
      "Free man and van request service in Stirling. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-stirling",
    areaServed: {
      "@type": "City",
      name: "Stirling",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Stirling"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "Bridge of Allan" },
        { "@type": "Neighborhood", name: "Dunblane" },
        { "@type": "Neighborhood", name: "Bannockburn" },
        { "@type": "Neighborhood", name: "Causewayhead" },
        { "@type": "Neighborhood", name: "Raploch" },
        { "@type": "Neighborhood", name: "St Ninians" },
        { "@type": "Neighborhood", name: "Fallin" },
        { "@type": "Neighborhood", name: "Cambusbarron" },
        { "@type": "Neighborhood", name: "Throsk" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  torquay: {
    ...baseSchema,
    name: "Man and Van Club — Torbay",
    description:
      "Free man and van request service in Torquay and the Torbay area. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-torquay",
    areaServed: {
      "@type": "City",
      name: "Torbay",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Devon"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Torquay" },
        { "@type": "Neighborhood", name: "Paignton" },
        { "@type": "Neighborhood", name: "Brixham" },
        { "@type": "Neighborhood", name: "Chelston" },
        { "@type": "Neighborhood", name: "Ellacombe" },
        { "@type": "Neighborhood", name: "St Marychurch" },
        { "@type": "Neighborhood", name: "Cockington" },
        { "@type": "Neighborhood", name: "Galmpton" },
        { "@type": "Neighborhood", name: "Maidenhall" },
        { "@type": "Neighborhood", name: "Goodrington" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  truro: {
    ...baseSchema,
    name: "Man and Van Club — Truro",
    description:
      "Free man and van request service in Truro. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-truro",
    areaServed: {
      "@type": "City",
      name: "Truro",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Cornwall"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "City Centre" },
        { "@type": "Neighborhood", name: "Newham" },
        { "@type": "Neighborhood", name: "Tregolls" },
        { "@type": "Neighborhood", name: "Highertown" },
        { "@type": "Neighborhood", name: "Kenwyn" },
        { "@type": "Neighborhood", name: "Malpas" },
        { "@type": "Neighborhood", name: "Shortlandsend" },
        { "@type": "Neighborhood", name: "Probus" },
        { "@type": "Neighborhood", name: "St Clement" },
        { "@type": "Neighborhood", name: "Feock" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  wrexham: {
    ...baseSchema,
    name: "Man and Van Club — Wrexham",
    description:
      "Free man and van request service in Wrexham. Submit your move details securely so a verified mover can review them and send quote options before you decide whether to book.",
    url: "https://www.manandvanclub.co.uk/man-and-van-wrexham",
    areaServed: {
      "@type": "City",
      name: "Wrexham",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Clwyd"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Town Centre" },
        { "@type": "Neighborhood", name: "Gresford" },
        { "@type": "Neighborhood", name: "Rhosddu" },
        { "@type": "Neighborhood", name: "Broughton" },
        { "@type": "Neighborhood", name: "Ruabon" },
        { "@type": "Neighborhood", name: "Chirk" },
        { "@type": "Neighborhood", name: "Coedpoeth" },
        { "@type": "Neighborhood", name: "Bangor-on-Dee" },
        { "@type": "Neighborhood", name: "Hightown" },
        { "@type": "Neighborhood", name: "Acton" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  abington: {
    ...baseSchema,
    name: "Man and Van Club — Abington",
    description:
      "Free man and van quote request service in Abington, Northamptonshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-abington`,
    areaServed: {
      "@type": "City",
      name: "Abington",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Northamptonshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  acton: {
    ...baseSchema,
    name: "Man and Van Club — Acton",
    description:
      "Free man and van quote request service in Acton, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-acton`,
    areaServed: {
      "@type": "City",
      name: "Acton",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  aldridge: {
    ...baseSchema,
    name: "Man and Van Club — Aldridge",
    description:
      "Free man and van quote request service in Aldridge, West Midlands. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-aldridge`,
    areaServed: {
      "@type": "City",
      name: "Aldridge",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  altrincham: {
    ...baseSchema,
    name: "Man and Van Club — Altrincham",
    description:
      "Free man and van quote request service in Altrincham, Greater Manchester. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-altrincham`,
    areaServed: {
      "@type": "City",
      name: "Altrincham",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater Manchester"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  alvaston: {
    ...baseSchema,
    name: "Man and Van Club — Alvaston",
    description:
      "Free man and van quote request service in Alvaston, Derbyshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-alvaston`,
    areaServed: {
      "@type": "City",
      name: "Alvaston",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Derbyshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  arnold: {
    ...baseSchema,
    name: "Man and Van Club — Arnold",
    description:
      "Free man and van quote request service in Arnold, Nottinghamshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-arnold`,
    areaServed: {
      "@type": "City",
      name: "Arnold",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Nottinghamshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  "ashton-under-lyne": {
    ...baseSchema,
    name: "Man and Van Club — Ashton-under-Lyne",
    description:
      "Free man and van quote request service in Ashton-under-Lyne, Greater Manchester. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-ashton-under-lyne`,
    areaServed: {
      "@type": "City",
      name: "Ashton-under-Lyne",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater Manchester"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  barnet: {
    ...baseSchema,
    name: "Man and Van Club — Barnet",
    description:
      "Free man and van quote request service in Barnet, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-barnet`,
    areaServed: {
      "@type": "City",
      name: "Barnet",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  bath: {
    ...baseSchema,
    name: "Man and Van Club — Bath",
    description:
      "Free man and van quote request service in Bath, Somerset. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-bath`,
    areaServed: {
      "@type": "City",
      name: "Bath",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Somerset"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  batley: {
    ...baseSchema,
    name: "Man and Van Club — Batley",
    description:
      "Free man and van quote request service in Batley, West Yorkshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-batley`,
    areaServed: {
      "@type": "City",
      name: "Batley",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Yorkshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  beeston: {
    ...baseSchema,
    name: "Man and Van Club — Beeston",
    description:
      "Free man and van quote request service in Beeston, Nottinghamshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-beeston`,
    areaServed: {
      "@type": "City",
      name: "Beeston",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Nottinghamshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  bexley: {
    ...baseSchema,
    name: "Man and Van Club — Bexley",
    description:
      "Free man and van quote request service in Bexley, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-bexley`,
    areaServed: {
      "@type": "City",
      name: "Bexley",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  bilston: {
    ...baseSchema,
    name: "Man and Van Club — Bilston",
    description:
      "Free man and van quote request service in Bilston, West Midlands. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-bilston`,
    areaServed: {
      "@type": "City",
      name: "Bilston",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  birkenhead: {
    ...baseSchema,
    name: "Man and Van Club — Birkenhead",
    description:
      "Free man and van quote request service in Birkenhead, Merseyside. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-birkenhead`,
    areaServed: {
      "@type": "City",
      name: "Birkenhead",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Merseyside"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  bloxwich: {
    ...baseSchema,
    name: "Man and Van Club — Bloxwich",
    description:
      "Free man and van quote request service in Bloxwich, West Midlands. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-bloxwich`,
    areaServed: {
      "@type": "City",
      name: "Bloxwich",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  bolton: {
    ...baseSchema,
    name: "Man and Van Club — Bolton",
    description:
      "Free man and van quote request service in Bolton, Greater Manchester. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-bolton`,
    areaServed: {
      "@type": "City",
      name: "Bolton",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater Manchester"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  bootle: {
    ...baseSchema,
    name: "Man and Van Club — Bootle",
    description:
      "Free man and van quote request service in Bootle, Merseyside. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-bootle`,
    areaServed: {
      "@type": "City",
      name: "Bootle",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Merseyside"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  braunstone: {
    ...baseSchema,
    name: "Man and Van Club — Braunstone",
    description:
      "Free man and van quote request service in Braunstone, Leicestershire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-braunstone`,
    areaServed: {
      "@type": "City",
      name: "Braunstone",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Leicestershire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  bridgwater: {
    ...baseSchema,
    name: "Man and Van Club — Bridgwater",
    description:
      "Free man and van quote request service in Bridgwater, Somerset. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-bridgwater`,
    areaServed: {
      "@type": "City",
      name: "Bridgwater",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Somerset"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  bromley: {
    ...baseSchema,
    name: "Man and Van Club — Bromley",
    description:
      "Free man and van quote request service in Bromley, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-bromley`,
    areaServed: {
      "@type": "City",
      name: "Bromley",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  bury: {
    ...baseSchema,
    name: "Man and Van Club — Bury",
    description:
      "Free man and van quote request service in Bury, Greater Manchester. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-bury`,
    areaServed: {
      "@type": "City",
      name: "Bury",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater Manchester"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  cannock: {
    ...baseSchema,
    name: "Man and Van Club — Cannock",
    description:
      "Free man and van quote request service in Cannock, Staffordshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-cannock`,
    areaServed: {
      "@type": "City",
      name: "Cannock",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Staffordshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  carlton: {
    ...baseSchema,
    name: "Man and Van Club — Carlton",
    description:
      "Free man and van quote request service in Carlton, Nottinghamshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-carlton`,
    areaServed: {
      "@type": "City",
      name: "Carlton",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Nottinghamshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  chaddesden: {
    ...baseSchema,
    name: "Man and Van Club — Chaddesden",
    description:
      "Free man and van quote request service in Chaddesden, Derbyshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-chaddesden`,
    areaServed: {
      "@type": "City",
      name: "Chaddesden",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Derbyshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  cheltenham: {
    ...baseSchema,
    name: "Man and Van Club — Cheltenham",
    description:
      "Free man and van quote request service in Cheltenham, Gloucestershire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-cheltenham`,
    areaServed: {
      "@type": "City",
      name: "Cheltenham",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Gloucestershire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  chiswick: {
    ...baseSchema,
    name: "Man and Van Club — Chiswick",
    description:
      "Free man and van quote request service in Chiswick, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-chiswick`,
    areaServed: {
      "@type": "City",
      name: "Chiswick",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  croydon: {
    ...baseSchema,
    name: "Man and Van Club — Croydon",
    description:
      "Free man and van quote request service in Croydon, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-croydon`,
    areaServed: {
      "@type": "City",
      name: "Croydon",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  darlaston: {
    ...baseSchema,
    name: "Man and Van Club — Darlaston",
    description:
      "Free man and van quote request service in Darlaston, West Midlands. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-darlaston`,
    areaServed: {
      "@type": "City",
      name: "Darlaston",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  dewsbury: {
    ...baseSchema,
    name: "Man and Van Club — Dewsbury",
    description:
      "Free man and van quote request service in Dewsbury, West Yorkshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-dewsbury`,
    areaServed: {
      "@type": "City",
      name: "Dewsbury",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Yorkshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  dudley: {
    ...baseSchema,
    name: "Man and Van Club — Dudley",
    description:
      "Free man and van quote request service in Dudley, West Midlands. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-dudley`,
    areaServed: {
      "@type": "City",
      name: "Dudley",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  duston: {
    ...baseSchema,
    name: "Man and Van Club — Duston",
    description:
      "Free man and van quote request service in Duston, Northamptonshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-duston`,
    areaServed: {
      "@type": "City",
      name: "Duston",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Northamptonshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  ealing: {
    ...baseSchema,
    name: "Man and Van Club — Ealing",
    description:
      "Free man and van quote request service in Ealing, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-ealing`,
    areaServed: {
      "@type": "City",
      name: "Ealing",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  edgware: {
    ...baseSchema,
    name: "Man and Van Club — Edgware",
    description:
      "Free man and van quote request service in Edgware, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-edgware`,
    areaServed: {
      "@type": "City",
      name: "Edgware",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  enfield: {
    ...baseSchema,
    name: "Man and Van Club — Enfield",
    description:
      "Free man and van quote request service in Enfield, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-enfield`,
    areaServed: {
      "@type": "City",
      name: "Enfield",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  evington: {
    ...baseSchema,
    name: "Man and Van Club — Evington",
    description:
      "Free man and van quote request service in Evington, Leicestershire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-evington`,
    areaServed: {
      "@type": "City",
      name: "Evington",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Leicestershire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  finchley: {
    ...baseSchema,
    name: "Man and Van Club — Finchley",
    description:
      "Free man and van quote request service in Finchley, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-finchley`,
    areaServed: {
      "@type": "City",
      name: "Finchley",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  frome: {
    ...baseSchema,
    name: "Man and Van Club — Frome",
    description:
      "Free man and van quote request service in Frome, Somerset. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-frome`,
    areaServed: {
      "@type": "City",
      name: "Frome",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Somerset"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  gloucester: {
    ...baseSchema,
    name: "Man and Van Club — Gloucester",
    description:
      "Free man and van quote request service in Gloucester, Gloucestershire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-gloucester`,
    areaServed: {
      "@type": "City",
      name: "Gloucester",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Gloucestershire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  greenwich: {
    ...baseSchema,
    name: "Man and Van Club — Greenwich",
    description:
      "Free man and van quote request service in Greenwich, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-greenwich`,
    areaServed: {
      "@type": "City",
      name: "Greenwich",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  halesowen: {
    ...baseSchema,
    name: "Man and Van Club — Halesowen",
    description:
      "Free man and van quote request service in Halesowen, West Midlands. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-halesowen`,
    areaServed: {
      "@type": "City",
      name: "Halesowen",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  halifax: {
    ...baseSchema,
    name: "Man and Van Club — Halifax",
    description:
      "Free man and van quote request service in Halifax, West Yorkshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-halifax`,
    areaServed: {
      "@type": "City",
      name: "Halifax",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Yorkshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  harrow: {
    ...baseSchema,
    name: "Man and Van Club — Harrow",
    description:
      "Free man and van quote request service in Harrow, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-harrow`,
    areaServed: {
      "@type": "City",
      name: "Harrow",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  hounslow: {
    ...baseSchema,
    name: "Man and Van Club — Hounslow",
    description:
      "Free man and van quote request service in Hounslow, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-hounslow`,
    areaServed: {
      "@type": "City",
      name: "Hounslow",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  hucknall: {
    ...baseSchema,
    name: "Man and Van Club — Hucknall",
    description:
      "Free man and van quote request service in Hucknall, Nottinghamshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-hucknall`,
    areaServed: {
      "@type": "City",
      name: "Hucknall",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Nottinghamshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  huddersfield: {
    ...baseSchema,
    name: "Man and Van Club — Huddersfield",
    description:
      "Free man and van quote request service in Huddersfield, West Yorkshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-huddersfield`,
    areaServed: {
      "@type": "City",
      name: "Huddersfield",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Yorkshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  huyton: {
    ...baseSchema,
    name: "Man and Van Club — Huyton",
    description:
      "Free man and van quote request service in Huyton, Merseyside. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-huyton`,
    areaServed: {
      "@type": "City",
      name: "Huyton",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Merseyside"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  hyde: {
    ...baseSchema,
    name: "Man and Van Club — Hyde",
    description:
      "Free man and van quote request service in Hyde, Greater Manchester. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-hyde`,
    areaServed: {
      "@type": "City",
      name: "Hyde",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater Manchester"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  ilford: {
    ...baseSchema,
    name: "Man and Van Club — Ilford",
    description:
      "Free man and van quote request service in Ilford, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-ilford`,
    areaServed: {
      "@type": "City",
      name: "Ilford",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  keighley: {
    ...baseSchema,
    name: "Man and Van Club — Keighley",
    description:
      "Free man and van quote request service in Keighley, West Yorkshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-keighley`,
    areaServed: {
      "@type": "City",
      name: "Keighley",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Yorkshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  kingsthorpe: {
    ...baseSchema,
    name: "Man and Van Club — Kingsthorpe",
    description:
      "Free man and van quote request service in Kingsthorpe, Northamptonshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-kingsthorpe`,
    areaServed: {
      "@type": "City",
      name: "Kingsthorpe",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Northamptonshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  kingston: {
    ...baseSchema,
    name: "Man and Van Club — Kingston upon Thames",
    description:
      "Free man and van quote request service in Kingston upon Thames, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-kingston`,
    areaServed: {
      "@type": "City",
      name: "Kingston upon Thames",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  leigh: {
    ...baseSchema,
    name: "Man and Van Club — Leigh",
    description:
      "Free man and van quote request service in Leigh, Greater Manchester. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-leigh`,
    areaServed: {
      "@type": "City",
      name: "Leigh",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater Manchester"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  lewisham: {
    ...baseSchema,
    name: "Man and Van Club — Lewisham",
    description:
      "Free man and van quote request service in Lewisham, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-lewisham`,
    areaServed: {
      "@type": "City",
      name: "Lewisham",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  lichfield: {
    ...baseSchema,
    name: "Man and Van Club — Lichfield",
    description:
      "Free man and van quote request service in Lichfield, Staffordshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-lichfield`,
    areaServed: {
      "@type": "City",
      name: "Lichfield",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Staffordshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  littleover: {
    ...baseSchema,
    name: "Man and Van Club — Littleover",
    description:
      "Free man and van quote request service in Littleover, Derbyshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-littleover`,
    areaServed: {
      "@type": "City",
      name: "Littleover",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Derbyshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  mickleover: {
    ...baseSchema,
    name: "Man and Van Club — Mickleover",
    description:
      "Free man and van quote request service in Mickleover, Derbyshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-mickleover`,
    areaServed: {
      "@type": "City",
      name: "Mickleover",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Derbyshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  mitcham: {
    ...baseSchema,
    name: "Man and Van Club — Mitcham",
    description:
      "Free man and van quote request service in Mitcham, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-mitcham`,
    areaServed: {
      "@type": "City",
      name: "Mitcham",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  morley: {
    ...baseSchema,
    name: "Man and Van Club — Morley",
    description:
      "Free man and van quote request service in Morley, West Yorkshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-morley`,
    areaServed: {
      "@type": "City",
      name: "Morley",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Yorkshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  "north-hykeham": {
    ...baseSchema,
    name: "Man and Van Club — North Hykeham",
    description:
      "Free man and van quote request service in North Hykeham, Lincolnshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-north-hykeham`,
    areaServed: {
      "@type": "City",
      name: "North Hykeham",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Lincolnshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  nuneaton: {
    ...baseSchema,
    name: "Man and Van Club — Nuneaton",
    description:
      "Free man and van quote request service in Nuneaton, Warwickshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-nuneaton`,
    areaServed: {
      "@type": "City",
      name: "Nuneaton",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Warwickshire"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Camp Hill" },
        { "@type": "Neighborhood", name: "Weddington" },
        { "@type": "Neighborhood", name: "Stockingford" },
        { "@type": "Neighborhood", name: "Whitestone" },
        { "@type": "Neighborhood", name: "St Nicolas Park" },
        { "@type": "Neighborhood", name: "Galley Common" },
        { "@type": "Neighborhood", name: "Attleborough" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  oadby: {
    ...baseSchema,
    name: "Man and Van Club — Oadby",
    description:
      "Free man and van quote request service in Oadby, Leicestershire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-oadby`,
    areaServed: {
      "@type": "City",
      name: "Oadby",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Leicestershire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  oldbury: {
    ...baseSchema,
    name: "Man and Van Club — Oldbury",
    description:
      "Free man and van quote request service in Oldbury, West Midlands. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-oldbury`,
    areaServed: {
      "@type": "City",
      name: "Oldbury",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  smethwick: {
    ...baseSchema,
    name: "Man and Van Club — Smethwick",
    description:
      "Free man and van quote request service in Smethwick, West Midlands. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-smethwick`,
    areaServed: {
      "@type": "City",
      name: "Smethwick",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      },
      containsPlace: [
        { "@type": "Neighborhood", name: "Cape Hill" },
        { "@type": "Neighborhood", name: "Soho" },
        { "@type": "Neighborhood", name: "Bearwood" },
        { "@type": "Neighborhood", name: "Hollyhedge" },
        { "@type": "Neighborhood", name: "Victoria" }
      ]
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  oldham: {
    ...baseSchema,
    name: "Man and Van Club — Oldham",
    description:
      "Free man and van quote request service in Oldham, Greater Manchester. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-oldham`,
    areaServed: {
      "@type": "City",
      name: "Oldham",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater Manchester"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  prescot: {
    ...baseSchema,
    name: "Man and Van Club — Prescot",
    description:
      "Free man and van quote request service in Prescot, Merseyside. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-prescot`,
    areaServed: {
      "@type": "City",
      name: "Prescot",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Merseyside"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  pudsey: {
    ...baseSchema,
    name: "Man and Van Club — Pudsey",
    description:
      "Free man and van quote request service in Pudsey, West Yorkshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-pudsey`,
    areaServed: {
      "@type": "City",
      name: "Pudsey",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Yorkshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  richmond: {
    ...baseSchema,
    name: "Man and Van Club — Richmond",
    description:
      "Free man and van quote request service in Richmond, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-richmond`,
    areaServed: {
      "@type": "City",
      name: "Richmond",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  rochdale: {
    ...baseSchema,
    name: "Man and Van Club — Rochdale",
    description:
      "Free man and van quote request service in Rochdale, Greater Manchester. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-rochdale`,
    areaServed: {
      "@type": "City",
      name: "Rochdale",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater Manchester"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  romford: {
    ...baseSchema,
    name: "Man and Van Club — Romford",
    description:
      "Free man and van quote request service in Romford, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-romford`,
    areaServed: {
      "@type": "City",
      name: "Romford",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  rugby: {
    ...baseSchema,
    name: "Man and Van Club — Rugby",
    description:
      "Free man and van quote request service in Rugby, Warwickshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-rugby`,
    areaServed: {
      "@type": "City",
      name: "Rugby",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Warwickshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  salford: {
    ...baseSchema,
    name: "Man and Van Club — Salford",
    description:
      "Free man and van quote request service in Salford, Greater Manchester. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-salford`,
    areaServed: {
      "@type": "City",
      name: "Salford",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater Manchester"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  solihull: {
    ...baseSchema,
    name: "Man and Van Club — Solihull",
    description:
      "Free man and van quote request service in Solihull, West Midlands. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-solihull`,
    areaServed: {
      "@type": "City",
      name: "Solihull",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  southport: {
    ...baseSchema,
    name: "Man and Van Club — Southport",
    description:
      "Free man and van quote request service in Southport, Merseyside. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-southport`,
    areaServed: {
      "@type": "City",
      name: "Southport",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Merseyside"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  "st-helens": {
    ...baseSchema,
    name: "Man and Van Club — St Helens",
    description:
      "Free man and van quote request service in St Helens, Merseyside. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-st-helens`,
    areaServed: {
      "@type": "City",
      name: "St Helens",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Merseyside"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  stalybridge: {
    ...baseSchema,
    name: "Man and Van Club — Stalybridge",
    description:
      "Free man and van quote request service in Stalybridge, Greater Manchester. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-stalybridge`,
    areaServed: {
      "@type": "City",
      name: "Stalybridge",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater Manchester"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  stockport: {
    ...baseSchema,
    name: "Man and Van Club — Stockport",
    description:
      "Free man and van quote request service in Stockport, Greater Manchester. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-stockport`,
    areaServed: {
      "@type": "City",
      name: "Stockport",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater Manchester"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  stourbridge: {
    ...baseSchema,
    name: "Man and Van Club — Stourbridge",
    description:
      "Free man and van quote request service in Stourbridge, West Midlands. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-stourbridge`,
    areaServed: {
      "@type": "City",
      name: "Stourbridge",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  stratford: {
    ...baseSchema,
    name: "Man and Van Club — Stratford",
    description:
      "Free man and van quote request service in Stratford, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-stratford`,
    areaServed: {
      "@type": "City",
      name: "Stratford",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  sutton: {
    ...baseSchema,
    name: "Man and Van Club — Sutton",
    description:
      "Free man and van quote request service in Sutton, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-sutton`,
    areaServed: {
      "@type": "City",
      name: "Sutton",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  tamworth: {
    ...baseSchema,
    name: "Man and Van Club — Tamworth",
    description:
      "Free man and van quote request service in Tamworth, Staffordshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-tamworth`,
    areaServed: {
      "@type": "City",
      name: "Tamworth",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Staffordshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  taunton: {
    ...baseSchema,
    name: "Man and Van Club — Taunton",
    description:
      "Free man and van quote request service in Taunton, Somerset. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-taunton`,
    areaServed: {
      "@type": "City",
      name: "Taunton",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Somerset"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  tipton: {
    ...baseSchema,
    name: "Man and Van Club — Tipton",
    description:
      "Free man and van quote request service in Tipton, West Midlands. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-tipton`,
    areaServed: {
      "@type": "City",
      name: "Tipton",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  tottenham: {
    ...baseSchema,
    name: "Man and Van Club — Tottenham",
    description:
      "Free man and van quote request service in Tottenham, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-tottenham`,
    areaServed: {
      "@type": "City",
      name: "Tottenham",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  trafford: {
    ...baseSchema,
    name: "Man and Van Club — Trafford",
    description:
      "Free man and van quote request service in Trafford, Greater Manchester. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-trafford`,
    areaServed: {
      "@type": "City",
      name: "Trafford",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater Manchester"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  trowbridge: {
    ...baseSchema,
    name: "Man and Van Club — Trowbridge",
    description:
      "Free man and van quote request service in Trowbridge, Wiltshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-trowbridge`,
    areaServed: {
      "@type": "City",
      name: "Trowbridge",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Wiltshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  twickenham: {
    ...baseSchema,
    name: "Man and Van Club — Twickenham",
    description:
      "Free man and van quote request service in Twickenham, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-twickenham`,
    areaServed: {
      "@type": "City",
      name: "Twickenham",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  wakefield: {
    ...baseSchema,
    name: "Man and Van Club — Wakefield",
    description:
      "Free man and van quote request service in Wakefield, West Yorkshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-wakefield`,
    areaServed: {
      "@type": "City",
      name: "Wakefield",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Yorkshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  wallasey: {
    ...baseSchema,
    name: "Man and Van Club — Wallasey",
    description:
      "Free man and van quote request service in Wallasey, Merseyside. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-wallasey`,
    areaServed: {
      "@type": "City",
      name: "Wallasey",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Merseyside"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  walthamstow: {
    ...baseSchema,
    name: "Man and Van Club — Walthamstow",
    description:
      "Free man and van quote request service in Walthamstow, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-walthamstow`,
    areaServed: {
      "@type": "City",
      name: "Walthamstow",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  wednesbury: {
    ...baseSchema,
    name: "Man and Van Club — Wednesbury",
    description:
      "Free man and van quote request service in Wednesbury, West Midlands. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-wednesbury`,
    areaServed: {
      "@type": "City",
      name: "Wednesbury",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  wembley: {
    ...baseSchema,
    name: "Man and Van Club — Wembley",
    description:
      "Free man and van quote request service in Wembley, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-wembley`,
    areaServed: {
      "@type": "City",
      name: "Wembley",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  "west-bridgford": {
    ...baseSchema,
    name: "Man and Van Club — West Bridgford",
    description:
      "Free man and van quote request service in West Bridgford, Nottinghamshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-west-bridgford`,
    areaServed: {
      "@type": "City",
      name: "West Bridgford",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Nottinghamshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  "west-bromwich": {
    ...baseSchema,
    name: "Man and Van Club — West Bromwich",
    description:
      "Free man and van quote request service in West Bromwich, West Midlands. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-west-bromwich`,
    areaServed: {
      "@type": "City",
      name: "West Bromwich",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  "weston-super-mare": {
    ...baseSchema,
    name: "Man and Van Club — Weston-super-Mare",
    description:
      "Free man and van quote request service in Weston-super-Mare, Somerset. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-weston-super-mare`,
    areaServed: {
      "@type": "City",
      name: "Weston-super-Mare",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Somerset"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  widnes: {
    ...baseSchema,
    name: "Man and Van Club — Widnes",
    description:
      "Free man and van quote request service in Widnes, Cheshire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-widnes`,
    areaServed: {
      "@type": "City",
      name: "Widnes",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Cheshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  wigan: {
    ...baseSchema,
    name: "Man and Van Club — Wigan",
    description:
      "Free man and van quote request service in Wigan, Greater Manchester. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-wigan`,
    areaServed: {
      "@type": "City",
      name: "Wigan",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater Manchester"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  wigston: {
    ...baseSchema,
    name: "Man and Van Club — Wigston",
    description:
      "Free man and van quote request service in Wigston, Leicestershire. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-wigston`,
    areaServed: {
      "@type": "City",
      name: "Wigston",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Leicestershire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  willenhall: {
    ...baseSchema,
    name: "Man and Van Club — Willenhall",
    description:
      "Free man and van quote request service in Willenhall, West Midlands. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-willenhall`,
    areaServed: {
      "@type": "City",
      name: "Willenhall",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Midlands"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  "wood-green": {
    ...baseSchema,
    name: "Man and Van Club — Wood Green",
    description:
      "Free man and van quote request service in Wood Green, Greater London. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-wood-green`,
    areaServed: {
      "@type": "City",
      name: "Wood Green",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Greater London"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },
  yeovil: {
    ...baseSchema,
    name: "Man and Van Club — Yeovil",
    description:
      "Free man and van quote request service in Yeovil, Somerset. Submit your move details and a verified mover reviews them before sending quote options. No obligation to book.",
    url: `${siteUrl}/man-and-van-yeovil`,
    areaServed: {
      "@type": "City",
      name: "Yeovil",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Somerset"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Furniture Delivery"]
  },

  // ─── East Midlands expansion (38 new) ───
  "chesterfield": {
    ...baseSchema,
    name: "Man and Van Club — Chesterfield",
    description: "Free man and van quote request service in Chesterfield, Derbyshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Brimington, Hasland, Staveley, Clay Cross and Dronfield.",
    url: `${siteUrl}/man-and-van-chesterfield`,
    areaServed: {
      "@type": "City",
      name: "Chesterfield",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Derbyshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "glossop": {
    ...baseSchema,
    name: "Man and Van Club — Glossop",
    description: "Free man and van quote request service in Glossop, Derbyshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Hadfield, Padfield, Simmondley and Whitfield.",
    url: `${siteUrl}/man-and-van-glossop`,
    areaServed: {
      "@type": "City",
      name: "Glossop",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Derbyshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "ilkeston": {
    ...baseSchema,
    name: "Man and Van Club — Ilkeston",
    description: "Free man and van quote request service in Ilkeston, Derbyshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Cotmanhay, Kirk Hallam, Little Hallam and Stanley.",
    url: `${siteUrl}/man-and-van-ilkeston`,
    areaServed: {
      "@type": "City",
      name: "Ilkeston",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Derbyshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "long-eaton": {
    ...baseSchema,
    name: "Man and Van Club — Long Eaton",
    description: "Free man and van quote request service in Long Eaton, Derbyshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Sawley, Borrowash, Breaston and Sandiacre.",
    url: `${siteUrl}/man-and-van-long-eaton`,
    areaServed: {
      "@type": "City",
      name: "Long Eaton",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Derbyshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "belper": {
    ...baseSchema,
    name: "Man and Van Club — Belper",
    description: "Free man and van quote request service in Belper, Derbyshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Milford, Heage, Ripley and Swanwick.",
    url: `${siteUrl}/man-and-van-belper`,
    areaServed: {
      "@type": "City",
      name: "Belper",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Derbyshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "swadlincote": {
    ...baseSchema,
    name: "Man and Van Club — Swadlincote",
    description: "Free man and van quote request service in Swadlincote, Derbyshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Church Gresley, Newhall, Woodville and Midway.",
    url: `${siteUrl}/man-and-van-swadlincote`,
    areaServed: {
      "@type": "City",
      name: "Swadlincote",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Derbyshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "buxton": {
    ...baseSchema,
    name: "Man and Van Club — Buxton",
    description: "Free man and van quote request service in Buxton, Derbyshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Fairfield, Lightwood, Harpur Hill and Peak District.",
    url: `${siteUrl}/man-and-van-buxton`,
    areaServed: {
      "@type": "City",
      name: "Buxton",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Derbyshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "ripley": {
    ...baseSchema,
    name: "Man and Van Club — Ripley",
    description: "Free man and van quote request service in Ripley, Derbyshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Codnor, Heanor, Waingroves and Pentrich.",
    url: `${siteUrl}/man-and-van-ripley`,
    areaServed: {
      "@type": "City",
      name: "Ripley",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Derbyshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "heanor": {
    ...baseSchema,
    name: "Man and Van Club — Heanor",
    description: "Free man and van quote request service in Heanor, Derbyshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Loscoe, Langley Mill, Marlpool and Shipley.",
    url: `${siteUrl}/man-and-van-heanor`,
    areaServed: {
      "@type": "City",
      name: "Heanor",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Derbyshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "alfreton": {
    ...baseSchema,
    name: "Man and Van Club — Alfreton",
    description: "Free man and van quote request service in Alfreton, Derbyshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Somercotes, Riddings, Ironville and Shirland.",
    url: `${siteUrl}/man-and-van-alfreton`,
    areaServed: {
      "@type": "City",
      name: "Alfreton",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Derbyshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "matlock": {
    ...baseSchema,
    name: "Man and Van Club — Matlock",
    description: "Free man and van quote request service in Matlock, Derbyshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Matlock Bath, Cromford, Darley Dale and Rowsley.",
    url: `${siteUrl}/man-and-van-matlock`,
    areaServed: {
      "@type": "City",
      name: "Matlock",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Derbyshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "loughborough": {
    ...baseSchema,
    name: "Man and Van Club — Loughborough",
    description: "Free man and van quote request service in Loughborough, Leicestershire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Shepshed, Quorn, Mountsorrel and Nanpantan.",
    url: `${siteUrl}/man-and-van-loughborough`,
    areaServed: {
      "@type": "City",
      name: "Loughborough",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Leicestershire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "coalville": {
    ...baseSchema,
    name: "Man and Van Club — Coalville",
    description: "Free man and van quote request service in Coalville, Leicestershire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Whitwick, Hugglescote, Newhall and Ravenstone.",
    url: `${siteUrl}/man-and-van-coalville`,
    areaServed: {
      "@type": "City",
      name: "Coalville",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Leicestershire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "hinckley": {
    ...baseSchema,
    name: "Man and Van Club — Hinckley",
    description: "Free man and van quote request service in Hinckley, Leicestershire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Barwell, Earl Shilton, Burbage and Stoke Golding.",
    url: `${siteUrl}/man-and-van-hinckley`,
    areaServed: {
      "@type": "City",
      name: "Hinckley",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Leicestershire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "melton-mowbray": {
    ...baseSchema,
    name: "Man and Van Club — Melton Mowbray",
    description: "Free man and van quote request service in Melton Mowbray, Leicestershire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Asfordby, Bottesford and Waltham on the Wolds.",
    url: `${siteUrl}/man-and-van-melton-mowbray`,
    areaServed: {
      "@type": "City",
      name: "Melton Mowbray",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Leicestershire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "market-harborough": {
    ...baseSchema,
    name: "Man and Van Club — Market Harborough",
    description: "Free man and van quote request service in Market Harborough, Leicestershire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Great Bowden, Little Bowden, Foxton and Kibworth.",
    url: `${siteUrl}/man-and-van-market-harborough`,
    areaServed: {
      "@type": "City",
      name: "Market Harborough",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Leicestershire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "ashby-de-la-zouch": {
    ...baseSchema,
    name: "Man and Van Club — Ashby de la Zouch",
    description: "Free man and van quote request service in Ashby de la Zouch, Leicestershire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Moira, Donisthorpe, Measham and Packington.",
    url: `${siteUrl}/man-and-van-ashby-de-la-zouch`,
    areaServed: {
      "@type": "City",
      name: "Ashby de la Zouch",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Leicestershire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "lutterworth": {
    ...baseSchema,
    name: "Man and Van Club — Lutterworth",
    description: "Free man and van quote request service in Lutterworth, Leicestershire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Bitteswell, Gilmorton, Magna Park and Cotesbach.",
    url: `${siteUrl}/man-and-van-lutterworth`,
    areaServed: {
      "@type": "City",
      name: "Lutterworth",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Leicestershire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "grantham": {
    ...baseSchema,
    name: "Man and Van Club — Grantham",
    description: "Free man and van quote request service in Grantham, Lincolnshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Barrowby, Great Gonerby, Harlaxton and Belton.",
    url: `${siteUrl}/man-and-van-grantham`,
    areaServed: {
      "@type": "City",
      name: "Grantham",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Lincolnshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "boston": {
    ...baseSchema,
    name: "Man and Van Club — Boston",
    description: "Free man and van quote request service in Boston, Lincolnshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Wyberton, Fishtoft, Freiston and Skirbeck.",
    url: `${siteUrl}/man-and-van-boston`,
    areaServed: {
      "@type": "City",
      name: "Boston",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Lincolnshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "spalding": {
    ...baseSchema,
    name: "Man and Van Club — Spalding",
    description: "Free man and van quote request service in Spalding, Lincolnshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Pinchbeck, Cowbit, Gosberton and Donington.",
    url: `${siteUrl}/man-and-van-spalding`,
    areaServed: {
      "@type": "City",
      name: "Spalding",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Lincolnshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "stamford": {
    ...baseSchema,
    name: "Man and Van Club — Stamford",
    description: "Free man and van quote request service in Stamford, Lincolnshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Barnack, Easton on the Hill, Ketton and Wansford.",
    url: `${siteUrl}/man-and-van-stamford`,
    areaServed: {
      "@type": "City",
      name: "Stamford",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Lincolnshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "gainsborough": {
    ...baseSchema,
    name: "Man and Van Club — Gainsborough",
    description: "Free man and van quote request service in Gainsborough, Lincolnshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Morton, Lea, Beckingham and Walkeringham.",
    url: `${siteUrl}/man-and-van-gainsborough`,
    areaServed: {
      "@type": "City",
      name: "Gainsborough",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Lincolnshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "sleaford": {
    ...baseSchema,
    name: "Man and Van Club — Sleaford",
    description: "Free man and van quote request service in Sleaford, Lincolnshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Quarrington, Greylees, Rauceby and Cranwell.",
    url: `${siteUrl}/man-and-van-sleaford`,
    areaServed: {
      "@type": "City",
      name: "Sleaford",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Lincolnshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "skegness": {
    ...baseSchema,
    name: "Man and Van Club — Skegness",
    description: "Free man and van quote request service in Skegness, Lincolnshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Ingoldmells, Chapel St Leonards, Winthorpe and Addlethorpe.",
    url: `${siteUrl}/man-and-van-skegness`,
    areaServed: {
      "@type": "City",
      name: "Skegness",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Lincolnshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "louth": {
    ...baseSchema,
    name: "Man and Van Club — Louth",
    description: "Free man and van quote request service in Louth, Lincolnshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Legbourne, Manby, North Thoresby and Fotherby.",
    url: `${siteUrl}/man-and-van-louth`,
    areaServed: {
      "@type": "City",
      name: "Louth",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Lincolnshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "kettering": {
    ...baseSchema,
    name: "Man and Van Club — Kettering",
    description: "Free man and van quote request service in Kettering, Northamptonshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Rothwell, Desborough, Barton Seagrave and Burton Latimer.",
    url: `${siteUrl}/man-and-van-kettering`,
    areaServed: {
      "@type": "City",
      name: "Kettering",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Northamptonshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "corby": {
    ...baseSchema,
    name: "Man and Van Club — Corby",
    description: "Free man and van quote request service in Corby, Northamptonshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Weldon, Gretton, Rockingham and East Carlton.",
    url: `${siteUrl}/man-and-van-corby`,
    areaServed: {
      "@type": "City",
      name: "Corby",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Northamptonshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "wellingborough": {
    ...baseSchema,
    name: "Man and Van Club — Wellingborough",
    description: "Free man and van quote request service in Wellingborough, Northamptonshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Irthlingborough, Finedon, Earls Barton and Wollaston.",
    url: `${siteUrl}/man-and-van-wellingborough`,
    areaServed: {
      "@type": "City",
      name: "Wellingborough",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Northamptonshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "rushden": {
    ...baseSchema,
    name: "Man and Van Club — Rushden",
    description: "Free man and van quote request service in Rushden, Northamptonshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Higham Ferrers, Irthlingborough, Raunds and Stanwick.",
    url: `${siteUrl}/man-and-van-rushden`,
    areaServed: {
      "@type": "City",
      name: "Rushden",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Northamptonshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "daventry": {
    ...baseSchema,
    name: "Man and Van Club — Daventry",
    description: "Free man and van quote request service in Daventry, Northamptonshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Weedon Bec, Long Buckby, Badby and Staverton.",
    url: `${siteUrl}/man-and-van-daventry`,
    areaServed: {
      "@type": "City",
      name: "Daventry",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Northamptonshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "mansfield": {
    ...baseSchema,
    name: "Man and Van Club — Mansfield",
    description: "Free man and van quote request service in Mansfield, Nottinghamshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Forest Town, Ladybrook, Shirebrook and Rainworth.",
    url: `${siteUrl}/man-and-van-mansfield`,
    areaServed: {
      "@type": "City",
      name: "Mansfield",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Nottinghamshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "newark-on-trent": {
    ...baseSchema,
    name: "Man and Van Club — Newark on Trent",
    description: "Free man and van quote request service in Newark on Trent, Nottinghamshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Balderton, Farndon, Coddington and Winthorpe.",
    url: `${siteUrl}/man-and-van-newark-on-trent`,
    areaServed: {
      "@type": "City",
      name: "Newark on Trent",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Nottinghamshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "worksop": {
    ...baseSchema,
    name: "Man and Van Club — Worksop",
    description: "Free man and van quote request service in Worksop, Nottinghamshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Shireoaks, Carlton in Lindrick, Harworth and Creswell.",
    url: `${siteUrl}/man-and-van-worksop`,
    areaServed: {
      "@type": "City",
      name: "Worksop",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Nottinghamshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "sutton-in-ashfield": {
    ...baseSchema,
    name: "Man and Van Club — Sutton in Ashfield",
    description: "Free man and van quote request service in Sutton in Ashfield, Nottinghamshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Kirkby in Ashfield, Huthwaite, Stanton Hill and Annesley.",
    url: `${siteUrl}/man-and-van-sutton-in-ashfield`,
    areaServed: {
      "@type": "City",
      name: "Sutton in Ashfield",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Nottinghamshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "retford": {
    ...baseSchema,
    name: "Man and Van Club — Retford",
    description: "Free man and van quote request service in Retford, Nottinghamshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Ordsall, Clayworth, Babworth and Ranby.",
    url: `${siteUrl}/man-and-van-retford`,
    areaServed: {
      "@type": "City",
      name: "Retford",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Nottinghamshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "kirkby-in-ashfield": {
    ...baseSchema,
    name: "Man and Van Club — Kirkby in Ashfield",
    description: "Free man and van quote request service in Kirkby in Ashfield, Nottinghamshire. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Sutton in Ashfield, Huthwaite, Annesley and Selston.",
    url: `${siteUrl}/man-and-van-kirkby-in-ashfield`,
    areaServed: {
      "@type": "City",
      name: "Kirkby in Ashfield",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Nottinghamshire"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
  },
  "oakham": {
    ...baseSchema,
    name: "Man and Van Club — Oakham",
    description: "Free man and van quote request service in Oakham, Rutland. A verified mover reviews your postcodes, item list, access and route details before sending quote options. Covers Uppingham, Ketton, Cottesmore and Rutland Water.",
    url: `${siteUrl}/man-and-van-oakham`,
    areaServed: {
      "@type": "City",
      name: "Oakham",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Rutland"
      }
    },
    serviceType: ["Man and Van Services", "House Removals", "Flat Removals", "Office Relocations", "Furniture Delivery"]
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
    "priceRange": "From £19/hr",
    "currenciesAccepted": "GBP",
    "paymentAccepted": "Card, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Towpath Drive, Brownhills",
      "addressLocality": "Walsall",
      "addressRegion": "West Midlands",
      "postalCode": "WS8 6FG",
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
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
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
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    };
  }

  return null;
}
