import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("pelsall");

export default function Page() {
  return <AreaPageTemplate slug="pelsall" />;
}
