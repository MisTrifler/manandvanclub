import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("northfield");

export default function Page() {
  return <AreaPageTemplate slug="northfield" />;
}
