import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("kings-norton");

export default function Page() {
  return <AreaPageTemplate slug="kings-norton" />;
}
