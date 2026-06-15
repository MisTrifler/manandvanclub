export function BrandIcon({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses =
    size === "sm"
      ? "px-2 py-1.5 rounded-lg text-sm"
      : "px-3 py-2 rounded-xl text-xl";

  return (
    <div
      className={`inline-flex items-center justify-center bg-primary ${sizeClasses} shadow-lg transition-transform duration-300 group-hover:scale-105 ${className}`}
      aria-hidden="true"
    >
      <span className="font-black leading-none tracking-tighter text-white">
        M<span className="text-accent">&amp;</span>V
      </span>
    </div>
  );
}

export function BrandWordmark({
  variant = "stacked",
  size = "md",
  className = "",
}: {
  variant?: "stacked" | "inline";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  if (variant === "inline") {
    const textSize = size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";
    return (
      <span className={`${textSize} font-black text-primary tracking-tighter uppercase leading-none ${className}`}>
        MAN<span className="text-accent">&amp;</span>VAN <span className="text-accent">CLUB</span>
      </span>
    );
  }

  const mainSize = size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";
  const clubSize = size === "sm" ? "text-[7px]" : size === "lg" ? "text-[9px]" : "text-[8px]";

  return (
    <span className={`flex flex-col ${className}`}>
      <span className={`${mainSize} font-black text-primary tracking-tighter leading-none uppercase`}>
        MAN<span className="text-accent">&amp;</span>VAN
      </span>
      <span className={`${clubSize} font-black text-accent tracking-[0.4em] uppercase mt-0.5 leading-none`}>
        CLUB
      </span>
    </span>
  );
}
