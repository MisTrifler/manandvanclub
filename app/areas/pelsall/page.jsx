import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("pelsall");

export default function Page() {
  return <AreaPageTemplate slug="pelsall" />;
}
