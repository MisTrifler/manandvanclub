import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("bushbury");

export default function Page() {
  return <AreaPageTemplate slug="bushbury" />;
}
