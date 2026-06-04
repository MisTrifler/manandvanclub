import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("hall-green");

export default function Page() {
  return <AreaPageTemplate slug="hall-green" />;
}
