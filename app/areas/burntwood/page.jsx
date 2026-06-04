import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("burntwood");

export default function Page() {
  return <AreaPageTemplate slug="burntwood" />;
}
