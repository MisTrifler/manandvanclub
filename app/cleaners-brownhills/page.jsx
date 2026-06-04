import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("brownhills");

export default function Page() {
  return <AreaPageTemplate slug="brownhills" />;
}
