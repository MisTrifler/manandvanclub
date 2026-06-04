import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("acocks-green");

export default function Page() {
  return <AreaPageTemplate slug="acocks-green" />;
}
