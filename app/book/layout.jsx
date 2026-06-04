import { buildSeoMetadata } from "../seoMetadata";

export const metadata = buildSeoMetadata({
  title: 'Book a Cleaner | West Midlands Cleaner',
  description:
    'Start a West Midlands Cleaner booking request for domestic, deep, end-of-tenancy, Airbnb and after-builders cleaning.',
  path: '/book'
});

export default function PageLayout({ children }) {
  return children;
}
