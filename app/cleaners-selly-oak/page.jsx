import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("selly-oak");

export default function Page() {
  return <AreaPageTemplate slug="selly-oak" />;
}
