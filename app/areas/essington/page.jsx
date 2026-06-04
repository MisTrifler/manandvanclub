import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("essington");

export default function Page() {
  return <AreaPageTemplate slug="essington" />;
}
