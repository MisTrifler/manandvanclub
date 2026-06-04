import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("stirchley");

export default function Page() {
  return <AreaPageTemplate slug="stirchley" />;
}
