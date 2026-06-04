import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("bournville");

export default function Page() {
  return <AreaPageTemplate slug="bournville" />;
}
