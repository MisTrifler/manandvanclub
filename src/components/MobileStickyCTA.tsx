"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HIDDEN_PREFIXES = [
  "/get-started",
  "/quote-review",
  "/marketplace",
  "/login",
  "/control-center-mv",
  "/admin",
];

export default function MobileStickyCTA() {
  const pathname = usePathname() || "/";

  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-border z-[200]">
      <Link
        href="/get-started"
        className="btn-orange w-full block py-4 text-center text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-2xl"
      >
        Start Move Request
      </Link>
    </div>
  );
}
