"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

function cleanText(value: string | null | undefined) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

function getInternalPath(href: string) {
  if (typeof window === "undefined") return href;
  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin ? url.pathname : url.href;
  } catch {
    return href;
  }
}

export default function AnalyticsEvents() {
  const pathname = usePathname();
  const lastPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastPathnameRef.current === pathname) return;
    lastPathnameRef.current = pathname;

    trackEvent("mvc_page_view", {
      path: pathname,
    });
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a");
      if (!link) return;

      const rawHref = link.getAttribute("href") || "";
      const href = link.href || rawHref;
      const linkText = cleanText(link.textContent);
      const linkPath = getInternalPath(href);

      if (rawHref.startsWith("mailto:")) {
        trackEvent("email_click", {
          link_text: linkText,
          email_address: rawHref.replace("mailto:", "").split("?")[0],
        });
        return;
      }

      if (rawHref.startsWith("tel:")) {
        trackEvent("phone_click", {
          link_text: linkText,
          phone_number: rawHref.replace("tel:", ""),
        });
        return;
      }

      if (linkPath.includes("/get-started")) {
        trackEvent("get_started_click", {
          link_text: linkText,
          link_url: linkPath,
        });
        return;
      }

      if (href.includes("facebook.com")) {
        trackEvent("social_click", {
          platform: "facebook",
          link_text: linkText,
          link_url: href,
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
