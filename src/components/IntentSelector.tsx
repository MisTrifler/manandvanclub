"use client";

import { useState } from "react";
import { type IntentType } from "@/lib/intent-detection";

const PRIMARY_INTENT_OPTIONS = [
  { id: "house" as IntentType, label: "Moving Home", emoji: "🏠" },
  { id: "single-item" as IntentType, label: "Furniture", emoji: "🛋️" },
  { id: "general" as IntentType, label: "Man & Van", emoji: "🚐" },
];

const MORE_INTENT_OPTIONS = [
  { id: "office" as IntentType, label: "Office", emoji: "🏢" },
  { id: "storage" as IntentType, label: "Storage", emoji: "📦" },
  { id: "student" as IntentType, label: "Student", emoji: "🎓" },
];

const ALL_INTENT_OPTIONS = [...PRIMARY_INTENT_OPTIONS, ...MORE_INTENT_OPTIONS];

type IntentOption = (typeof ALL_INTENT_OPTIONS)[number];

export default function IntentSelector({
  onSelect,
}: {
  onSelect: (intent: IntentType) => void;
}) {
  const [showMoreMoveTypes, setShowMoreMoveTypes] = useState(false);

  const renderOption = (option: IntentOption) => (
    <button
      key={option.id}
      type="button"
      onClick={() => onSelect(option.id)}
      className="flex min-h-[74px] flex-col items-center justify-center rounded-2xl border border-primary/10 bg-white p-2.5 text-center shadow-sm transition duration-200 active:scale-[0.98] sm:min-h-[92px] sm:p-4 lg:min-h-[116px] lg:p-5 lg:hover:-translate-y-0.5 lg:hover:border-accent/30 lg:hover:shadow-lg"
      aria-label={`Start move request for ${option.label}`}
    >
      <span className="mb-1 text-2xl sm:text-3xl" aria-hidden="true">
        {option.emoji}
      </span>
      <span className="text-[11px] font-black uppercase leading-tight tracking-tight text-primary sm:text-sm">
        {option.label}
      </span>
    </button>
  );

  return (
    <div className="space-y-3">
      <div className="text-center lg:text-left">
        <p className="text-base font-black tracking-tight text-primary">
          What do you need help moving?
        </p>
        <p className="mt-1 text-xs font-medium text-text-secondary">
          Choose the closest option. You can add the details next.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 lg:hidden">
        {PRIMARY_INTENT_OPTIONS.map(renderOption)}
      </div>

      <div
        id="more-move-types"
        className={`${showMoreMoveTypes ? "grid" : "hidden"} grid-cols-3 gap-2 lg:hidden`}
      >
        {MORE_INTENT_OPTIONS.map(renderOption)}
      </div>

      <button
        type="button"
        className="w-full rounded-xl border border-border bg-gray-50 px-4 py-3 text-xs font-black uppercase tracking-widest text-primary/70 transition active:scale-[0.99] hover:border-accent/40 hover:text-accent lg:hidden"
        onClick={() => setShowMoreMoveTypes((current) => !current)}
        aria-expanded={showMoreMoveTypes}
        aria-controls="more-move-types"
      >
        {showMoreMoveTypes ? "Show fewer move types" : "More move types"}
      </button>

      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-3">
        {ALL_INTENT_OPTIONS.map(renderOption)}
      </div>

      <p className="text-center text-xs font-medium text-text-secondary lg:text-left">
        Not sure?{" "}
        <button
          type="button"
          onClick={() => onSelect("general")}
          className="font-black text-primary underline decoration-accent/40 underline-offset-2 hover:text-accent"
        >
          Choose Man & Van.
        </button>
      </p>
    </div>
  );
}
