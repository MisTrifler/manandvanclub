import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("edgbaston");

export default function Page() {
  return <AreaPageTemplate slug="edgbaston" />;
}
