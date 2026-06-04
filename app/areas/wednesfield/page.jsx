import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("wednesfield");

export default function Page() {
  return <AreaPageTemplate slug="wednesfield" />;
}
