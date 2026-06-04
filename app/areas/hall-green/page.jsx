import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("hall-green");

export default function Page() {
  return <AreaPageTemplate slug="hall-green" />;
}
