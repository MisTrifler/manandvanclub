import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("sutton-coldfield");

export default function Page() {
  return <AreaPageTemplate slug="sutton-coldfield" />;
}
