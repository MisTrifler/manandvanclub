import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Man & Van Club",
  description: "Terms and conditions for using the Man & Van Club marketplace.",
};

export default function Terms() {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl prose prose-slate">
        <h1>Terms & Conditions</h1>
        <p className="lead">Last Updated: June 6, 2026</p>
        
        <h2>1. For Customers</h2>
        <p>Man & Van Club is an exclusive customer introduction marketplace. We are not a removals company and do not provide moving services directly. Our platform connects customers with independent local movers.</p>
        
        <h2>2. Our Process</h2>
        <ol>
           <li>Customer submits a move request.</li>
           <li>Man & Van Club verifies the request (including email/phone validation).</li>
           <li>The request is made available to a limited number of local movers in our network.</li>
           <li>The first mover to purchase the introduction receives exclusive access to the customer details.</li>
           <li>The matched mover contacts the customer directly to provide a service.</li>
        </ol>

        <h2>3. For Businesses (Movers)</h2>
        <p>Movers must be fully insured and verified before accessing the marketplace. Introduction fees are non-refundable unless the customer details provided are invalid.</p>

        <h2>4. Exclusive Introduction Fees</h2>
        <p>Introductions are charged at a fixed rate based on the estimated move value. Fees are deducted from the driver's account balance upon unlocking a job.</p>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/" className="btn-outline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
