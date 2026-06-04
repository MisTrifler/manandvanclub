import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("codsall");

export default function Page() {
  return <AreaPageTemplate slug="codsall" />;
}
