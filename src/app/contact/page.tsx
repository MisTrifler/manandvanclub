import ContactContent from "./ContactContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Man and Van Club | Move Support & Mover Enquiries",
  description: "Questions about your move or want to join as a mover? Contact Man and Van Club by phone, email or message. Usually same-day response.",
  alternates: {
    canonical: 'https://www.manandvanclub.co.uk/contact',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
