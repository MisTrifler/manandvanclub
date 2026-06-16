// Enhanced Service schemas for priority city pages
// These schemas describe Man and Van Club as a quote-request marketplace, not a local moving operator.

const provider = {
  "@type": "Organization",
  "name": "Man and Van Club",
  "url": "https://www.manandvanclub.co.uk",
  "logo": "https://www.manandvanclub.co.uk/icon.png",
  "telephone": "+44-7943-617-386",
  "email": "support@manandvanclub.co.uk"
};

const baseSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "provider": provider,
  "serviceType": "Man and van quote request",
  "telephone": "+44-7943-617-386",
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
  }
};

export function getEnhancedServiceSchema(locationKey: string): Record<string, any> | null {
  return enhancedServiceSchemas[locationKey] || null;
}
