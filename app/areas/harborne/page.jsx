import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("harborne");

export default function Page() {
  return <AreaPageTemplate slug="harborne" />;
}
