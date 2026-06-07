"use client";

import { useState } from "react";

interface Lead {
  id: string;
  collection_postcode?: string;
  delivery_postcode?: string;
  move_type?: string;
  move_date?: string;
}

interface Props {
  userEmail: string;
  leads: Lead[];
}

export default function DriverMarketplaceClient({ userEmail, leads }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleUnlock = async (lead: Lead) => {
    setLoadingId(lead.id);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: lead.id,
          fee: 35.99, // You can make this dynamic later
          businessName: userEmail,
        }),
      });

      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      alert("Error initiating checkout.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black text-primary mb-2">Marketplace</h1>
        <p className="text-text-secondary mb-8">Welcome, {userEmail}</p>

        {leads.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-border text-center">
            <p className="text-lg text-text-secondary">No active leads available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-3xl border border-border p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="flex gap-3 mb-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest">
                      {lead.move_type}
                    </span>
                  </div>
                  <p className="text-xl font-black text-primary tracking-tight">
                    {lead.collection_postcode} → {lead.delivery_postcode}
                  </p>
                  <p className="text-text-secondary mt-1">Move Date: {lead.move_date}</p>
                </div>

                <button
                  onClick={() => handleUnlock(lead)}
                  disabled={loadingId === lead.id}
                  className="bg-accent text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest disabled:opacity-50"
                >
                  {loadingId === lead.id ? "Processing..." : "Unlock Job"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
