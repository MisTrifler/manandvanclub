import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("aston");

export default function Page() {
  return <AreaPageTemplate slug="aston" />;
}
