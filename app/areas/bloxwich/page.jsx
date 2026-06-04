import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("bloxwich");

export default function Page() {
  return <AreaPageTemplate slug="bloxwich" />;
}
