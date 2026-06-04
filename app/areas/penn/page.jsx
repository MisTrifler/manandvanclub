import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("penn");

export default function Page() {
  return <AreaPageTemplate slug="penn" />;
}
