"use client";
import Image from "next/image";
import Link from "next/link";
import { Search, Calculator, CheckCircle, Truck, Star, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorksContent() {
  const steps = [
    {
      title: "Tell us about your move",
      desc: "Fill in your collection and delivery postcodes, move date, and property details. It takes less than 60 seconds.",
      icon: <Search className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "See an estimated price",
      desc: "We calculate a typical price range for your move instantly based on previous similar marketplace data.",
      icon: <Calculator className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1586762522814-11df9043743d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Confirm you're happy",
      desc: "Only once you agree the price looks right do we proceed. Your contact details are hidden until this step.",
      icon: <CheckCircle className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1454165833968-5170e99a136b?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Get matched with local movers",
      desc: "Matching movers are notified about your request. The first available mover will accept your job exclusively.",
      icon: <Zap className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Matched Local Mover",
      desc: "Once matched, your mover will contact you directly to confirm the final details and arrange your move.",
      icon: <Truck className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1600518464441-9154a4da21b5?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#F9F9F7] py-24 border-b border-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-5 rounded-full -mr-32 -mt-32" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6">
              Exclusive Process
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-primary mb-8 uppercase tracking-tighter">
              How Man & Van Club Works
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
              We've simplified the customer-mover connection. No more bidding wars, just exclusive introductions to vetted local experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-40">
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col md:flex-row gap-16 lg:gap-24 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="md:w-1/2 space-y-8">
                  <div className="bg-accent/10 w-24 h-24 rounded-3xl flex items-center justify-center text-accent shadow-xl shadow-accent/5">
                    {step.icon}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-6">
                      <span className="text-7xl font-black text-primary/5 tracking-tighter">{i + 1}</span>
                      <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight leading-none">{step.title}</h2>
                    </div>
                    <p className="text-xl text-text-secondary leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                  {i === 3 && (
                    <div className="bg-success/5 border border-success/10 p-6 rounded-2xl flex items-start gap-4">
                       <ShieldCheck className="text-success shrink-0" size={24} />
                       <p className="text-sm font-bold text-primary italic uppercase tracking-tighter">Only ONE mover can unlock your details to provide service.</p>
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 w-full">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-accent/5 rounded-[3rem] blur-2xl group-hover:bg-accent/10 transition-all duration-700" />
                    <div className="relative aspect-[4/3] bg-gray-100 rounded-[2.5rem] overflow-hidden border border-border shadow-2xl">
                      <Image 
                        src={step.image} 
                        alt={step.title} 
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote - REMOVED FAKE TESTIMONIAL */}

      {/* CTA */}
      <section className="py-32 bg-white text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-accent/5 rounded-[4rem] p-16 md:p-24 border border-accent/10 max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-black text-primary mb-8 uppercase tracking-tighter">Ready to find your mover?</h2>
            <p className="text-xl text-text-secondary mb-12 max-w-xl mx-auto font-medium">Join our verified network and get matched exclusively with local movers.</p>
            <Link href="/#quote-form" className="btn-orange text-xl px-16 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-accent/40 hover:scale-105 active:scale-95 transition-all">Get Started Now →</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
