import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("acocks-green");

export default function Page() {
  return <AreaPageTemplate slug="acocks-green" />;
}
