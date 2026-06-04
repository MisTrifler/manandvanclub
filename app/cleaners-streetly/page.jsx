import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("streetly");

export default function Page() {
  return <AreaPageTemplate slug="streetly" />;
}
