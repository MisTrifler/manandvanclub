import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("penn");

export default function Page() {
  return <AreaPageTemplate slug="penn" />;
}
