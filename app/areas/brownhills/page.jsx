import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("brownhills");

export default function Page() {
  return <AreaPageTemplate slug="brownhills" />;
}
