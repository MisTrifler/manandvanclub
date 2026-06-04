import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("tettenhall");

export default function Page() {
  return <AreaPageTemplate slug="tettenhall" />;
}
