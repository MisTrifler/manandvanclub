import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Man & Van Club",
  description: "Learn how we collect, use, and protect your personal data at Man & Van Club.",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl prose prose-slate">
        <h1>Privacy Policy</h1>
        <p className="lead">Last Updated: June 5, 2026</p>
        
        <p>At Man & Van Club Ltd, we take your privacy seriously. This policy explains how we collect, use, and protect your personal data when you use our lead generation platform.</p>

        <h2>1. Data We Collect</h2>
        <p>When you request a quote, we collect your:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Collection and delivery postcodes</li>
          <li>Details about your move (property size, inventory, etc.)</li>
        </ul>

        <h2>2. How We Use Your Data</h2>
        <p>We use your data primarily to match you with a local moving company. By submitting a move request, you agree that we may share your details with ONE vetted local mover who has exclusively purchased the introduction to your request.</p>

        <h2>3. Data Retention</h2>
        <p>We store your data securely and only for as long as necessary to fulfill the purpose of your request or as required by UK law.</p>

        <h2>4. Your Rights</h2>
        <p>Under UK GDPR, you have the right to access, correct, or delete your personal data. You can exercise these rights by contacting us at support@manandvanclub.co.uk.</p>
        
        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/" className="btn-outline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
