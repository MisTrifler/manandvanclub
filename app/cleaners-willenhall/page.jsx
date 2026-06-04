import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("willenhall");

export default function Page() {
  return <AreaPageTemplate slug="willenhall" />;
}
