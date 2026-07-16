import { Metadata } from "next";
import { HUB_PAGES } from "@/lib/hub-page-data";
import HubPageContent from "@/components/HubPageContent";

const hub = HUB_PAGES["suffolk"]!;
const baseUrl = "https://www.manandvanclub.co.uk";

export const metadata: Metadata = {
  title: hub.title,
  description: hub.description,
  alternates: { canonical: `${baseUrl}/man-and-van-${hub.slug}` },
  openGraph: {
    title: hub.title,
    description: hub.description,
    url: `${baseUrl}/man-and-van-${hub.slug}`,
    images: [{ url: `${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Suffolk")}&subtitle=${encodeURIComponent("From £50 · Verified Movers")}`, width: 1200, height: 630, alt: `Man and Van ${hub.name} | Man and Van Club` }],
  },
  twitter: {
    card: "summary_large_image",
    title: hub.title,
    description: hub.description,
    images: [`${baseUrl}/api/og?title=${encodeURIComponent("Man and Van Suffolk")}&subtitle=${encodeURIComponent("From £50 · Verified Movers")}`],
  },
};

export default function SuffolkPage() {
  return <HubPageContent hub={hub} />;
}
