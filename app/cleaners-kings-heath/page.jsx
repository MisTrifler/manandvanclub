import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("kings-heath");

export default function Page() {
  return <AreaPageTemplate slug="kings-heath" />;
}
