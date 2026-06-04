import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("erdington");

export default function Page() {
  return <AreaPageTemplate slug="erdington" />;
}
