import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("kings-heath");

export default function Page() {
  return <AreaPageTemplate slug="kings-heath" />;
}
