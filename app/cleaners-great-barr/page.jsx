import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("great-barr");

export default function Page() {
  return <AreaPageTemplate slug="great-barr" />;
}
