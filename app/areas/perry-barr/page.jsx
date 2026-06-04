import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("perry-barr");

export default function Page() {
  return <AreaPageTemplate slug="perry-barr" />;
}
