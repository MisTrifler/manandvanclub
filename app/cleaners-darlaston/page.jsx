import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("darlaston");

export default function Page() {
  return <AreaPageTemplate slug="darlaston" />;
}
