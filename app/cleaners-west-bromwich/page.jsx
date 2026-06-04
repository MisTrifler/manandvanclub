import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("west-bromwich");

export default function Page() {
  return <AreaPageTemplate slug="west-bromwich" />;
}
