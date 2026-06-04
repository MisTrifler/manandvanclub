import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("erdington");

export default function Page() {
  return <AreaPageTemplate slug="erdington" />;
}
