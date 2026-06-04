import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("solihull");

export default function Page() {
  return <AreaPageTemplate slug="solihull" />;
}
