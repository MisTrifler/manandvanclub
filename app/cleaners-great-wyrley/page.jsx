import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("great-wyrley");

export default function Page() {
  return <AreaPageTemplate slug="great-wyrley" />;
}
