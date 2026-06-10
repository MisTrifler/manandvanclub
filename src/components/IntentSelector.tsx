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
      className="p-6 lg:p-8"
    >
      <div className="space-y-3">
        <div className="text-center lg:text-left">
          <p className="text-sm text-text-secondary">
            Choose your move type to get started
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 lg:gap-3">
          {INTENT_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className="flex flex-col items-center text-center p-3 sm:p-4 lg:p-5 rounded-[18px] transition-all duration-200 ease-out active:scale-[0.97]"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(15,23,42,0.06)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)';
                e.currentTarget.style.borderColor = 'rgba(249,115,22,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = 'rgba(15,23,42,0.06)';
              }}
            >
              <span className="text-2xl sm:text-3xl mb-1.5 lg:mb-2" aria-hidden="true">
                {option.emoji}
              </span>
              <span className="font-black text-primary uppercase text-[11px] sm:text-sm tracking-tight leading-tight">
                {option.label}
              </span>
            </button>
          ))}
        </div>

        <p className="text-xs text-text-secondary text-center lg:text-left font-medium">
          Not sure? <span className="text-primary font-bold">Man & Van</span> covers everything.
        </p>
      </div>
    </div>
  );
}
