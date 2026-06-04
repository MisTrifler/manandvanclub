import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("walsall");

export default function Page() {
  return <AreaPageTemplate slug="walsall" />;
}
