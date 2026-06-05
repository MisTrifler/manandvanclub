"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, i) => (
        <div key={i} className="border border-border rounded-lg bg-white overflow-hidden">
          <button 
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between items-center p-5 text-left font-bold text-primary hover:bg-gray-50 transition-colors"
          >
            {item.q}
            {openIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {openIndex === i && (
            <div className="p-5 pt-0 text-text-secondary leading-relaxed border-t border-border">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
