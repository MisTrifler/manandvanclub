import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("dudley");

export default function Page() {
  return <AreaPageTemplate slug="dudley" />;
}
