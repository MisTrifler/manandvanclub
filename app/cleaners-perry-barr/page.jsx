import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("perry-barr");

export default function Page() {
  return <AreaPageTemplate slug="perry-barr" />;
}
