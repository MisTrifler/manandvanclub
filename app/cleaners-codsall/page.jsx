import AreaPageTemplate, { generateCleanerAreaMetadata } from "../areas/AreaPageTemplate";

export const metadata = generateCleanerAreaMetadata("codsall");

export default function Page() {
  return <AreaPageTemplate slug="codsall" />;
}
