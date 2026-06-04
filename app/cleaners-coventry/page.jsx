import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("coventry");

export default function Page() {
  return <AreaPageTemplate slug="coventry" />;
}
