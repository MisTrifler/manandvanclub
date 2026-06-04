import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("bilston");

export default function Page() {
  return <AreaPageTemplate slug="bilston" />;
}
