import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("tettenhall");

export default function Page() {
  return <AreaPageTemplate slug="tettenhall" />;
}
