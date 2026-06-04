import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("yardley");

export default function Page() {
  return <AreaPageTemplate slug="yardley" />;
}
