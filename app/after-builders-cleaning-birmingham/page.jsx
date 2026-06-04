import ServiceLocationPage, { generateServiceLocationMetadata } from "../ServiceLocationPage";

const slug = "after-builders-cleaning-birmingham";

export function generateMetadata() {
  return generateServiceLocationMetadata(slug);
}

export default function Page() {
  return <ServiceLocationPage slug={slug} />;
}
