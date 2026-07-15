import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRouteBySlug, getAllRouteSlugs, RouteData } from "@/lib/route-data";
import RoutePageContent from "@/components/RoutePageContent";

const siteUrl = "https://www.manandvanclub.co.uk";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const route = getRouteBySlug(params.slug);
  if (!route) return { title: "Route Not Found | Man and Van Club" };

  const ogTitle = `${route.cityA} to ${route.cityB} Man and Van`;
  const ogSubtitle = `${route.distance} via ${route.motorway} · From ${route.estimatedFrom}`;
  const dynamicOgImage = `${siteUrl}/api/og?title=${encodeURIComponent(ogTitle)}&subtitle=${encodeURIComponent(ogSubtitle)}`;

  return {
    title: route.title,
    description: route.description,
    alternates: {
      canonical: `${siteUrl}/routes/${route.slug}`,
    },
    openGraph: {
      title: route.title,
      description: route.description,
      url: `${siteUrl}/routes/${route.slug}`,
      images: [{ url: dynamicOgImage, width: 1200, height: 630, alt: `Man and Van ${route.cityA} to ${route.cityB}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: [dynamicOgImage],
    },
  };
}

export default function RoutePage({ params }: { params: { slug: string } }) {
  const route = getRouteBySlug(params.slug);
  if (!route) notFound();

  return <RoutePageContent route={route} />;
}

export async function generateStaticParams() {
  return getAllRouteSlugs().map((slug) => ({ slug }));
}
