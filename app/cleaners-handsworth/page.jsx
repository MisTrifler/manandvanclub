import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("handsworth");

export default function Page() {
  return <AreaPageTemplate slug="handsworth" />;
}
