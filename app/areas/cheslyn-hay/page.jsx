import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("cheslyn-hay");

export default function Page() {
  return <AreaPageTemplate slug="cheslyn-hay" />;
}
