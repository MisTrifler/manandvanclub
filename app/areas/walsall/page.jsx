import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("walsall");

export default function Page() {
  return <AreaPageTemplate slug="walsall" />;
}
