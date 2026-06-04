import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("sheldon");

export default function Page() {
  return <AreaPageTemplate slug="sheldon" />;
}
