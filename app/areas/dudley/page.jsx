import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("dudley");

export default function Page() {
  return <AreaPageTemplate slug="dudley" />;
}
