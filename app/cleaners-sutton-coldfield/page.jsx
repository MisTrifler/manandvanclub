import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("sutton-coldfield");

export default function Page() {
  return <AreaPageTemplate slug="sutton-coldfield" />;
}
