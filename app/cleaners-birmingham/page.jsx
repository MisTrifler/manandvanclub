import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("birmingham");

export default function Page() {
  return <AreaPageTemplate slug="birmingham" />;
}
