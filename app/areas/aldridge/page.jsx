import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("aldridge");

export default function Page() {
  return <AreaPageTemplate slug="aldridge" />;
}
