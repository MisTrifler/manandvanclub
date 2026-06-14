import { redirect } from "next/navigation";

export const metadata = {
  title: "Start Your Move Request | Man and Van Club",
};

export default function GetStartedPage() {
  redirect("/#quote-form");
}
