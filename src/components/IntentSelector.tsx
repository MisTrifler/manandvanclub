"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { type IntentType } from "@/lib/intent-detection";

const PRIMARY_OPTIONS = [
  {
    id: "house" as IntentType,
    label: "Moving Home",
    emoji: "🏠",
    description: "House, flat, apartment or studio of any size.",
  },
  {
    id: "single-item" as IntentType,
    label: "Furniture Delivery",
    emoji: "🛋️",
    description: "Sofas, beds, wardrobes, appliances and single items.",
  },
  {
    id: "general" as IntentType,
    label: "Man & Van Service",
    emoji: "🚐",
    description: "Small moves, Marketplace purchases, general transport.",
  },
];

const SECONDARY_OPTIONS = [
  {
    id: "office" as IntentType,
    label: "Office Move",
    emoji: "🏢",
    description: "Business relocations, IT equipment and commercial moves.",
  },
  {
    id: "storage" as IntentType,
    label: "Storage Collection",
    emoji: "📦",
    description: "Collect from or deliver to a storage unit.",
  },
  {
    id: "student" as IntentType,
    label: "Student Move",
    emoji: "🎓",
    description: "University halls, student accommodation or shared housing.",
  },
];

export default function IntentSelector({
  onSelect,
}: {
  onSelect: (intent: IntentType) => void;
}) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl lg:rounded-[2rem] border border-border overflow-hidden shadow-2xl p-4 lg:p-6"
      id="quote-form"
    >
      <div className="space-y-4 lg:space-y-5">
        <div className="text-center lg:text-left">
          <h2 className="text-xl lg:text-2xl font-black text-primary uppercase tracking-tighter">
            What Do You Need Help With?
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Choose the option that matches your move and we&apos;ll ask the right questions.
          </p>
        </div>

        {/* Desktop: all 6 in 3×2 grid. Mobile: primary 3 + expandable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-fr">
          {[...PRIMARY_OPTIONS, ...SECONDARY_OPTIONS].map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`flex flex-col items-center text-center p-3 sm:p-4 rounded-xl border-2 border-border bg-white hover:border-accent hover:shadow-md hover:bg-accent/5 transition-all duration-200 active:scale-[0.98] group h-full ${
                SECONDARY_OPTIONS.some((s) => s.id === option.id)
                  ? "hidden lg:flex"
                  : ""
              } ${
                SECONDARY_OPTIONS.some((s) => s.id === option.id) && showMore
                  ? "!flex"
                  : ""
              }`}
            >
              <span className="text-3xl mb-1.5" aria-hidden="true">
                {option.emoji}
              </span>
              <h3 className="font-black text-primary uppercase text-xs tracking-tight mb-0.5">
                {option.label}
              </h3>
              <p className="text-[11px] text-text-secondary leading-tight">
                {option.description}
              </p>
            </button>
          ))}
        </div>

        {/* Mobile expander */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="lg:hidden w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-gray-50 text-xs font-black uppercase tracking-widest text-primary/60 hover:border-accent hover:text-accent transition-all"
        >
          {showMore ? "Show Fewer Services" : "View More Services"}
          <ChevronDown
            size={14}
            className={`transition-transform ${showMore ? "rotate-180" : ""}`}
          />
        </button>

        <p className="text-[11px] text-text-secondary text-center lg:text-left font-medium">
          Not sure which option to choose? Select{" "}
          <span className="text-primary font-bold">Man & Van Service</span> and
          we&apos;ll guide you.
        </p>
      </div>
    </div>
  );
}
