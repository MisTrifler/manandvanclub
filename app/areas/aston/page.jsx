import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("aston");

export default function Page() {
  return <AreaPageTemplate slug="aston" />;
}
