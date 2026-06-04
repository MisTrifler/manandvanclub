import { buildSeoMetadata } from "../seoMetadata";

export const metadata = buildSeoMetadata({
  title: 'Join Us | West Midlands Cleaner',
  description:
    'Apply to join West Midlands Cleaner and hear about cleaning booking opportunities across the West Midlands.',
  path: '/join-us'
});

export default function PageLayout({ children }) {
  return children;
}
