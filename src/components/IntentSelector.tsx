"use client";

import { type IntentType } from "@/lib/intent-detection";

const INTENT_OPTIONS = [
  {
    id: "house" as IntentType,
    label: "Moving Home",
    emoji: "🏠",
    description: "Move a house, flat, apartment or studio of any size.",
  },
  {
    id: "single-item" as IntentType,
    label: "Furniture Delivery",
    emoji: "🛋️",
    description: "Sofas, beds, wardrobes, appliances and single-item deliveries.",
  },
  {
    id: "general" as IntentType,
    label: "Man & Van Service",
    emoji: "🚐",
    description: "Flexible help for small moves, multiple items, Facebook Marketplace purchases and general transport.",
  },
  {
    id: "office" as IntentType,
    label: "Office Move",
    emoji: "🏢",
    description: "Business relocations, office furniture, IT equipment and commercial moves.",
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
    description: "Moving to or from university halls, student accommodation or shared housing.",
  },
];

export default function IntentSelector({
  onSelect,
}: {
  onSelect: (intent: IntentType) => void;
}) {
  return (
    <div
      className="bg-white rounded-2xl lg:rounded-[2rem] border border-border overflow-hidden shadow-2xl p-6 lg:p-8"
      id="quote-form"
    >
      <div className="space-y-6">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tighter">
            What Do You Need Help With?
          </h2>
          <p className="text-sm text-text-secondary mt-2">
            Choose the option that best matches your move and we&apos;ll ask the
            right questions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {INTENT_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className="flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl border-2 border-border bg-white hover:border-accent hover:shadow-lg hover:bg-accent/5 transition-all duration-200 active:scale-[0.98] group h-full"
            >
              <span className="text-4xl mb-3" aria-hidden="true">
                {option.emoji}
              </span>
              <h3 className="font-black text-primary uppercase text-sm tracking-tight mb-1">
                {option.label}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {option.description}
              </p>
            </button>
          ))}
        </div>

        <p className="text-xs text-text-secondary text-center lg:text-left font-medium">
          Not sure which option to choose? Select{" "}
          <span className="text-primary font-bold">Man & Van Service</span> and
          we&apos;ll guide you.
        </p>
      </div>
    </div>
  );
}
