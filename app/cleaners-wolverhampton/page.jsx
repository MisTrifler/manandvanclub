import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("wolverhampton");

export default function Page() {
  return <AreaPageTemplate slug="wolverhampton" />;
}
