import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("harborne");

export default function Page() {
  return <AreaPageTemplate slug="harborne" />;
}
