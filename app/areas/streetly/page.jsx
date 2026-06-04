import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("streetly");

export default function Page() {
  return <AreaPageTemplate slug="streetly" />;
}
