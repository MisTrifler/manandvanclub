import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("great-barr");

export default function Page() {
  return <AreaPageTemplate slug="great-barr" />;
}
