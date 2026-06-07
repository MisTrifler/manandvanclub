"use client";
import Link from "next/link";
import { Search, Calculator, CheckCircle, Zap, Truck, ArrowUpRight, ShieldCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorksContent() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.manandvanclub.co.uk" },
      { "@type": "ListItem", "position": 2, "name": "How It Works", "item": "https://www.manandvanclub.co.uk/how-it-works" }
    ]
  };

  const steps = [
    {
      title: "Details",
      desc: "Enter your postcodes and move date in under 60 seconds.",
      icon: <Search className="w-6 h-6" />,
    },
    {
      title: "Estimate",
      desc: "See a typical price range instantly for your specific move.",
      icon: <Calculator className="w-6 h-6" />,
    },
    {
      title: "Confirm",
      desc: "Verify your request. Your details stay private until match.",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      title: "Match",
      desc: "An approved local mover accepts your job exclusively.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Move",
      desc: "Your mover contacts you to finalize and carry out the move.",
      icon: <Truck className="w-6 h-6" />,
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] },
    }),
  };

  return (
    <div className="bg-white min-h-[calc(100vh-80px)] flex flex-col selection:bg-accent selection:text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* ── Main Section (One Screen Fit) ── */}
      <section className="flex-1 relative flex items-center py-12 lg:py-0">
        {/* Decorative Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full bg-[#F9F9F7] rounded-bl-[100px] lg:rounded-bl-[300px] transform translate-x-1/4 -translate-y-1/4 opacity-50" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -ml-32 -mb-32" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            
            {/* Header */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-center mb-12 lg:mb-20 space-y-4"
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-accent/20">
                <ShieldCheck size={12} />
                Exclusive Matching Process
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary uppercase tracking-tighter leading-none">
                How It <span className="text-accent italic">Works</span>
              </h1>
              <p className="text-base lg:text-lg text-text-secondary max-w-xl mx-auto font-medium leading-relaxed">
                We've stripped away the complexity. No bidding wars, no spam calls, just five simple steps to a stress-free move.
              </p>
            </motion.div>

            {/* Compact Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8 mb-12 lg:mb-20 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-10 right-10 h-px bg-border/60 z-0" />
              
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  custom={i + 1}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="relative z-10 flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-[2rem] border-2 border-border/50 flex items-center justify-center text-accent shadow-sm group-hover:border-accent group-hover:shadow-xl group-hover:shadow-accent/5 transition-all duration-500 mb-6 bg-gradient-to-br from-white to-gray-50/50">
                    {step.icon}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-xl flex items-center justify-center text-xs font-black shadow-lg">
                      0{i + 1}
                    </div>
                  </div>
                  <h3 className="font-black text-primary uppercase tracking-tight text-sm mb-2 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-text-secondary font-medium leading-relaxed max-w-[160px]">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={7}
              className="text-center"
            >
              <div className="inline-block p-2 bg-[#F9F9F7] rounded-[2.5rem] border border-border/50 shadow-inner">
                <Link 
                  href="/#quote-form" 
                  className="btn-orange inline-flex items-center gap-4 px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-accent/40 hover:scale-105 transition-all active:scale-95"
                >
                  Start Your Move Request <ArrowUpRight size={20} />
                </Link>
              </div>
              <p className="mt-6 text-[10px] font-black text-primary/30 uppercase tracking-[0.3em] flex items-center justify-center gap-4">
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-accent" /> Fully Insured</span>
                <span className="flex items-center gap-1.5"><Zap size={14} className="text-accent" /> 1-to-1 Match</span>
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA (Matches Homepage) */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden bg-white/80 backdrop-blur-xl border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.1)] px-4 py-4 flex gap-4">
        <Link href="/#quote-form" className="flex-1 btn-orange py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] text-center flex items-center justify-center gap-2 shadow-xl shadow-accent/20">
          <Zap size={16} fill="currentColor" /> Get Started
        </Link>
      </div>
    </div>
  );
}
