import ContactContent from "./ContactContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Man and Van Club | Support & Enquiries",
  description: "Have a question about your move or want to join as a mover? Our team is ready to help. Contact us via phone, email or message.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/contact',
  },
  openGraph: {
    title: "Contact Man and Van Club | Support & Enquiries",
    description: "Have a question about your move or want to join as a mover? Contact us via phone, email or message.",
    url: 'https://www.manandvanclub.co.uk/contact',
    images: [{ url: "/images/og-homepage.jpg", width: 1200, height: 630, alt: "Contact Man and Van Club" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Man and Van Club | Support & Enquiries",
    description: "Have a question about your move or want to join as a mover? Contact us via phone, email or message.",
    images: ["/images/og-homepage.jpg"],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
