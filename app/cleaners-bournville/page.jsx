import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("bournville");

export default function Page() {
  return <AreaPageTemplate slug="bournville" />;
}
