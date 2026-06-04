import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("handsworth");

export default function Page() {
  return <AreaPageTemplate slug="handsworth" />;
}
