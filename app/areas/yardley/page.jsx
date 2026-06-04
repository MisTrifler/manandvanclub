import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("yardley");

export default function Page() {
  return <AreaPageTemplate slug="yardley" />;
}
