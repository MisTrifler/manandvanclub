import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("kings-norton");

export default function Page() {
  return <AreaPageTemplate slug="kings-norton" />;
}
