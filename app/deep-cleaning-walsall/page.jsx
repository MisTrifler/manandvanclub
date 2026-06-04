import ServiceLocationPage, { generateServiceLocationMetadata } from "../ServiceLocationPage";

const slug = "deep-cleaning-walsall";

export function generateMetadata() {
  return generateServiceLocationMetadata(slug);
}

export default function Page() {
  return <ServiceLocationPage slug={slug} />;
}
