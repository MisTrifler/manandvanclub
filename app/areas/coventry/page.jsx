import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("coventry");

export default function Page() {
  return <AreaPageTemplate slug="coventry" />;
}
