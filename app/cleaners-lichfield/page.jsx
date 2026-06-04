import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("lichfield");

export default function Page() {
  return <AreaPageTemplate slug="lichfield" />;
}
