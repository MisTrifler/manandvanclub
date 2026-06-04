import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("cheslyn-hay");

export default function Page() {
  return <AreaPageTemplate slug="cheslyn-hay" />;
}
