import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("walsall-wood");

export default function Page() {
  return <AreaPageTemplate slug="walsall-wood" />;
}
