import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("west-bromwich");

export default function Page() {
  return <AreaPageTemplate slug="west-bromwich" />;
}
