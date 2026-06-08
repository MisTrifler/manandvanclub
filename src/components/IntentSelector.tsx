"use client";

import { Building2, Home, GraduationCap, Sofa, Package, Boxes, ArrowRight } from "lucide-react";
import { type IntentType } from "@/lib/intent-detection";

const INTENT_OPTIONS = [
  { id: "office" as IntentType, label: "Office Relocation", icon: Building2, description: "Move your business, desks, IT equipment & furniture" },
  { id: "house" as IntentType, label: "House or Flat Move", icon: Home, description: "Move your home, from studio to 4+ bedrooms" },
  { id: "student" as IntentType, label: "Student Move", icon: GraduationCap, description: "Move to or from university accommodation" },
  { id: "single-item" as IntentType, label: "Single Item or Furniture", icon: Sofa, description: "Deliver a sofa, bed, table or any single item" },
  { id: "general" as IntentType, label: "Man and Van Hire", icon: Package, description: "Small moves, van hire with driver or general help" },
  { id: "storage" as IntentType, label: "Storage Collection", icon: Boxes, description: "Collect from or deliver to a storage unit" },
];

export default function IntentSelector({ onSelect }: { onSelect: (intent: IntentType) => void }) {
  return (
    <div className="bg-white rounded-2xl lg:rounded-[2rem] border border-border overflow-hidden shadow-2xl p-6 lg:p-8" id="quote-form">
      <div className="space-y-6">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tighter">What Type of Move?</h2>
          <p className="text-sm text-text-secondary mt-2">Select the option that matches your needs. We will ask the right questions for your move.</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {INTENT_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className="flex items-center gap-4 p-4 rounded-xl border-2 border-border hover:border-accent hover:bg-accent/5 transition-all text-left group"
            >
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                <option.icon size={24} className="text-primary group-hover:text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-primary uppercase text-sm tracking-tight">{option.label}</h3>
                <p className="text-xs text-text-secondary mt-0.5">{option.description}</p>
              </div>
              <ArrowRight size={18} className="text-primary/20 group-hover:text-accent transition-colors flex-shrink-0" />
            </button>
          ))}
        </div>

        <p className="text-xs text-text-secondary text-center lg:text-left font-medium">
          Not sure? Choose <span className="text-primary font-bold">Man and Van Hire</span> and we will help you figure it out.
        </p>
      </div>
    </div>
  );
}
