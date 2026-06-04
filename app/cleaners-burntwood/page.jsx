import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("burntwood");

export default function Page() {
  return <AreaPageTemplate slug="burntwood" />;
}
