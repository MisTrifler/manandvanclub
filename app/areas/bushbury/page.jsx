import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("bushbury");

export default function Page() {
  return <AreaPageTemplate slug="bushbury" />;
}
