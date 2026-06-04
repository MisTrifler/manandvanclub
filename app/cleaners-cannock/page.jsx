import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("cannock");

export default function Page() {
  return <AreaPageTemplate slug="cannock" />;
}
