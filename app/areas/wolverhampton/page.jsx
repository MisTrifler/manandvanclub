import AreaPageTemplate, { generateAreaMetadata } from "../AreaPageTemplate";

export const metadata = generateAreaMetadata("wolverhampton");

export default function Page() {
  return <AreaPageTemplate slug="wolverhampton" />;
}
