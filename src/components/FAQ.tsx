import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ({ items, title }: { items: FAQItem[]; title?: string }) {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {title && (
        <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter text-center">
          {title}
        </h2>
      )}
      <div className="space-y-4">
        {items.map((item, i) => (
          <details key={i} open={i === 0} className="group border border-border rounded-lg bg-white overflow-hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-bold text-primary transition-colors hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <ChevronDown
                size={20}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <div className="p-5 pt-0 text-text-secondary leading-relaxed border-t border-border">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
