import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("sheldon");

export default function Page() {
  return <AreaPageTemplate slug="sheldon" />;
}
