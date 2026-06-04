import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("essington");

export default function Page() {
  return <AreaPageTemplate slug="essington" />;
}
