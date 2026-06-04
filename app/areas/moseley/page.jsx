import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("moseley");

export default function Page() {
  return <AreaPageTemplate slug="moseley" />;
}
