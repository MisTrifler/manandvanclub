import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("aldridge");

export default function Page() {
  return <AreaPageTemplate slug="aldridge" />;
}
