import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("solihull");

export default function Page() {
  return <AreaPageTemplate slug="solihull" />;
}
