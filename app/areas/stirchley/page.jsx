import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("stirchley");

export default function Page() {
  return <AreaPageTemplate slug="stirchley" />;
}
