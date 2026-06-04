import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("bilston");

export default function Page() {
  return <AreaPageTemplate slug="bilston" />;
}
