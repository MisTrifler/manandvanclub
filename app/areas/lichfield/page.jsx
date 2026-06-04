import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("lichfield");

export default function Page() {
  return <AreaPageTemplate slug="lichfield" />;
}
