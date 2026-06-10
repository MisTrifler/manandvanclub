"use client";

import { type IntentType } from "@/lib/intent-detection";

const INTENT_OPTIONS = [
  { id: "house" as IntentType, label: "Moving Home", emoji: "🏠" },
  { id: "single-item" as IntentType, label: "Furniture", emoji: "🛋️" },
  { id: "general" as IntentType, label: "Man & Van", emoji: "🚐" },
  { id: "office" as IntentType, label: "Office", emoji: "🏢" },
  { id: "storage" as IntentType, label: "Storage", emoji: "📦" },
  { id: "student" as IntentType, label: "Student", emoji: "🎓" },
];

export default function IntentSelector({
  onSelect,
}: {
  onSelect: (intent: IntentType) => void;
}) {
  return (
    <div
      className="bg-white rounded-2xl lg:rounded-[2rem] border border-border overflow-hidden shadow-2xl p-4 lg:p-5"
      id="quote-form"
    >
      <div className="space-y-3">
        <div className="text-center lg:text-left">
          <h2 className="text-lg lg:text-xl font-black text-primary uppercase tracking-tighter">
            Get Matched
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Choose your move type to get started
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {INTENT_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className="flex flex-col items-center text-center p-2.5 sm:p-3 rounded-xl border-2 border-border bg-white hover:border-accent hover:bg-accent/5 transition-all duration-150 active:scale-[0.97] group"
            >
              <span className="text-2xl mb-1" aria-hidden="true">
                {option.emoji}
              </span>
              <span className="font-black text-primary uppercase text-[11px] tracking-tight leading-tight">
                {option.label}
              </span>
            </button>
          ))}
        </div>

        <p className="text-[10px] text-text-secondary text-center lg:text-left font-medium">
          Not sure? <span className="text-primary font-bold">Man & Van</span> covers everything.
        </p>
      </div>
    </div>
  );
}
