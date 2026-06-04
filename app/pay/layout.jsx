import { buildSeoMetadata } from "../seoMetadata";

export const metadata = buildSeoMetadata({
  title: "Pay Selected Quote | West Midlands Cleaner",
  description:
    "Pay your selected West Midlands Cleaner provider quote securely after choosing who to book.",
  path: "/pay",
  noIndex: true
});

export default function PageLayout({ children }) {
  return children;
}
