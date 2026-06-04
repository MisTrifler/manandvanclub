import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("moseley");

export default function Page() {
  return <AreaPageTemplate slug="moseley" />;
}
