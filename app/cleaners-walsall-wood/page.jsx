import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("walsall-wood");

export default function Page() {
  return <AreaPageTemplate slug="walsall-wood" />;
}
