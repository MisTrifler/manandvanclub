import { allAreas } from "../areaData";
import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export function generateStaticParams() {
  return allAreas.map((area) => ({
    slug: area.slug
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return generateAreaMetadata(slug);
}

export default async function AreaPage({ params }) {
  const { slug } = await params;
  return <AreaPageTemplate slug={slug} />;
}
