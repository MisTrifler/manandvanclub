import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("great-wyrley");

export default function Page() {
  return <AreaPageTemplate slug="great-wyrley" />;
}
