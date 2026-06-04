import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("cannock");

export default function Page() {
  return <AreaPageTemplate slug="cannock" />;
}
