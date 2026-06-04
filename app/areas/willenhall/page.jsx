import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("willenhall");

export default function Page() {
  return <AreaPageTemplate slug="willenhall" />;
}
