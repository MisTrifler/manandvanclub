import Link from "next/link";
import { MapPin, ArrowUpRight, ShieldCheck, Globe } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Areas We Cover | Man and Van England | Man and Van Club",
  description: "Man and Van Club covers key areas across England, mainly focused on Birmingham. Find your area and get matched with a vetted local mover.",
};

const regions = [
  {
    name: "London & South East",
    cities: [
      { name: "London", href: "/man-and-van-london" },
      { name: "Brighton", href: "/#quote-form" },
      { name: "Southampton", href: "/#quote-form" },
      { name: "Oxford", href: "/#quote-form" },
      { name: "Reading", href: "/#quote-form" },
      { name: "Guildford", href: "/#quote-form" },
      { name: "Canterbury", href: "/#quote-form" },
      { name: "Maidstone", href: "/#quote-form" },
      { name: "Milton Keynes", href: "/#quote-form" }
    ]
  },
  {
    name: "Midlands (Main Focus)",
    cities: [
      { name: "Birmingham", href: "/man-and-van-birmingham" },
      { name: "Wolverhampton", href: "/man-and-van-wolverhampton" },
      { name: "Walsall", href: "/man-and-van-walsall" },
      { name: "Coventry", href: "/#quote-form" },
      { name: "Leicester", href: "/#quote-form" },
      { name: "Nottingham", href: "/man-and-van-nottingham" },
      { name: "Derby", href: "/#quote-form" },
      { name: "Stoke-on-Trent", href: "/#quote-form" }
    ]
  },
  {
    name: "North West",
    cities: [
      { name: "Manchester", href: "/man-and-van-manchester" },
      { name: "Liverpool", href: "/#quote-form" },
      { name: "Preston", href: "/#quote-form" },
      { name: "Blackpool", href: "/#quote-form" },
      { name: "Bolton", href: "/#quote-form" },
      { name: "Wigan", href: "/#quote-form" },
      { name: "Chester", href: "/#quote-form" },
      { name: "Salford", href: "/#quote-form" }
    ]
  },
  {
    name: "Yorkshire",
    cities: [
      { name: "Leeds", href: "/man-and-van-leeds" },
      { name: "Sheffield", href: "/#quote-form" },
      { name: "Bradford", href: "/#quote-form" },
      { name: "Hull", href: "/#quote-form" },
      { name: "York", href: "/#quote-form" },
      { name: "Harrogate", href: "/#quote-form" },
      { name: "Wakefield", href: "/#quote-form" },
      { name: "Huddersfield", href: "/#quote-form" }
    ]
  },
  {
    name: "North East",
    cities: [
      { name: "Newcastle", href: "/#quote-form" },
      { name: "Sunderland", href: "/#quote-form" },
      { name: "Middlesbrough", href: "/#quote-form" },
      { name: "Durham", href: "/#quote-form" }
    ]
  },
  {
    name: "South West",
    cities: [
      { name: "Bristol", href: "/man-and-van-bristol" },
      { name: "Bath", href: "/#quote-form" },
      { name: "Exeter", href: "/#quote-form" },
      { name: "Plymouth", href: "/#quote-form" },
      { name: "Gloucester", href: "/#quote-form" },
      { name: "Swindon", href: "/#quote-form" },
      { name: "Bournemouth", href: "/#quote-form" },
      { name: "Cheltenham", href: "/#quote-form" }
    ]
  }
];

export default function AreasPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.manandvanclub.co.uk"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Areas We Cover",
        "item": "https://www.manandvanclub.co.uk/areas"
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Hero */}
      <section className="bg-[#F9F9F7] py-32 border-b border-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute inset-0 grid grid-cols-6 gap-4">
              {[...Array(24)].map((_, i) => <div key={i} className="border border-primary/20 h-32 w-full" />)}
           </div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <span className="inline-block bg-accent/10 text-accent px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-accent/20">
              England Coverage
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-primary uppercase tracking-tighter leading-[0.9]">
              Areas <span className="text-accent italic">We Cover</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
              Man and Van Club matches customers with vetted local movers across key areas in England, with a primary focus on Birmingham.
            </p>
          </div>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {regions.map((region, i) => (
              <div key={i} className="space-y-8">
                <h2 className="text-xl font-black text-primary uppercase tracking-tight border-b-4 border-accent pb-4 inline-block">{region.name}</h2>
                <div className="flex flex-col gap-4">
                   {region.cities.map((city, j) => (
                     <Link 
                       key={j} 
                       href={city.href}
                       className="group flex items-center justify-between text-sm font-bold text-text-secondary hover:text-accent transition-colors"
                     >
                       <span>{city.name}</span>
                       <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                     </Link>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-[#F9F9F7] border-t border-border">
        <div className="container mx-auto px-4 text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-none">Don't see your area?</h2>
          <p className="text-xl text-text-secondary font-medium max-w-xl mx-auto leading-relaxed">
            We are expanding across England. Submit your move details and we'll match you with the nearest available mover in our network.
          </p>
          <Link href="/#quote-form" className="btn-orange px-14 py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] shadow-2xl shadow-accent/20 transition-all hover:scale-105 inline-flex items-center gap-3">
             Get Matched Now <ArrowUpRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
}
