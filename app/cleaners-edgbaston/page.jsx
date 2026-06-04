import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("edgbaston");

export default function Page() {
  return <AreaPageTemplate slug="edgbaston" />;
}
