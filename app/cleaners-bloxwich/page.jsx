import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("bloxwich");

export default function Page() {
  return <AreaPageTemplate slug="bloxwich" />;
}
