import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("darlaston");

export default function Page() {
  return <AreaPageTemplate slug="darlaston" />;
}
