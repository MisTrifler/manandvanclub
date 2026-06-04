import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("northfield");

export default function Page() {
  return <AreaPageTemplate slug="northfield" />;
}
