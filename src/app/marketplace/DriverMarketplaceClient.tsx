"use client";

import { useState } from "react";

interface Props {
  userEmail: string;
}

export default function DriverMarketplaceClient({ userEmail }: Props) {
  const [jobs, setJobs] = useState<any[]>([]); // Will be populated in Step 4

  const handleUnlock = async (job: any) => {
    alert("Payment flow will be connected in the next steps.");
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black text-primary mb-2">Marketplace</h1>
        <p className="text-text-secondary mb-8">Welcome, {userEmail}</p>

        {jobs.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-border text-center">
            <p className="text-lg text-text-secondary">No active leads available right now.</p>
            <p className="text-sm text-text-secondary mt-2">New requests will appear here when customers in your area verify their move.</p>
          </div>
        ) : (
          <div>Jobs will appear here in Step 4</div>
        )}
      </div>
    </div>
  );
}
