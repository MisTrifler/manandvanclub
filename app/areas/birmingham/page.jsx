import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("birmingham");

export default function Page() {
  return <AreaPageTemplate slug="birmingham" />;
}
