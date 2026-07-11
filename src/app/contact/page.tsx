import ContactContent from "./ContactContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Man and Van Club | Support & Enquiries",
  description: "Have a question about your move or want to join as a mover? Our team is ready to help. Contact us via phone, email or message.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/contact',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
