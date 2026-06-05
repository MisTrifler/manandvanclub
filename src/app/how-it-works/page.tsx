import Image from "next/image";
import Link from "next/link";
import { Search, Calculator, CheckCircle, Truck, Star } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Tell us about your move",
      desc: "Fill in your collection and delivery postcodes, move date, and property details. It takes less than 60 seconds.",
      icon: <Search className="w-8 h-8" />
    },
    {
      title: "See an estimated price",
      desc: "We calculate a typical price range for your move instantly based on thousands of similar jobs.",
      icon: <Calculator className="w-8 h-8" />
    },
    {
      title: "Confirm you're happy",
      desc: "Only once you agree the price looks right do we proceed. Your contact details are hidden until this step.",
      icon: <CheckCircle className="w-8 h-8" />
    },
    {
      title: "Get matched with local movers",
      desc: "Matching movers are notified and the first approved mover can unlock the request.",
      icon: <Truck className="w-8 h-8" />
    },
    {
      title: "Choose the best quote",
      desc: "Once unlocked, your matched mover contacts you directly to arrange the move.",
      icon: <Star className="w-8 h-8" />
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-background py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">How Man & Van Club Works</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            We've simplified the process of finding a reliable man and van. No more endless phone calls or hidden fees.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-24">
            {steps.map((step, i) => (
              <div key={i} className={`flex flex-col md:flex-row gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2">
                  <div className="bg-accent/10 w-20 h-20 rounded-2xl flex items-center justify-center text-accent mb-6">
                    {step.icon}
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl font-extrabold text-primary/10">0{i + 1}</span>
                    <h2 className="text-3xl font-bold text-primary">{step.title}</h2>
                  </div>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="md:w-1/2 w-full aspect-video bg-gray-100 rounded-2xl border-2 border-border border-dashed flex items-center justify-center text-gray-400 font-medium">
                  Step {i + 1} Visual Illustration / Screenshot
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to find your mover?</h2>
          <p className="text-gray-300 mb-10 max-w-xl mx-auto">Join thousands of happy customers who saved time and money using Man & Van Club.</p>
          <Link href="/#quote-form" className="btn-orange text-lg px-12 py-4">Get My Free Quotes →</Link>
        </div>
      </section>
    </div>
  );
}
