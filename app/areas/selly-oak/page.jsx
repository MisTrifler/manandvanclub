import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("selly-oak");

export default function Page() {
  return <AreaPageTemplate slug="selly-oak" />;
}
