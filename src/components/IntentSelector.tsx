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

        <div className="grid grid-cols-3 gap-3">
          {INTENT_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className="flex flex-col items-center text-center p-4 sm:p-5 rounded-[18px] transition-all duration-200 ease-out active:scale-[0.97] group"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(15,23,42,0.08)',
                boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.08)';
              }}
            >
              <span className="text-3xl mb-2" aria-hidden="true">
                {option.emoji}
              </span>
              <span className="font-black text-primary uppercase text-sm tracking-tight leading-tight">
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
