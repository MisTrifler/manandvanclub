import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Driver Login | Man and Van Club",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginClient />;
}
