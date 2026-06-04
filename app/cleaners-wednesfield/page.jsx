import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("wednesfield");

export default function Page() {
  return <AreaPageTemplate slug="wednesfield" />;
}
