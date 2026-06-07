"use client";

import { useState } from "react";
import { calculateIntroductionFee } from "@/lib/fee-calculator";

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
    if (!lead.move_type) return;
    
    const fee = calculateIntroductionFee(lead.move_type);
    setLoadingId(lead.id);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId: lead.id,
          fee: fee,
          businessName: userEmail,
        }),
      });

      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      alert("Error initiating checkout. Please try again.");
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
            {leads.map((lead) => {
              const fee = lead.move_type ? calculateIntroductionFee(lead.move_type) : 0;
              return (
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

                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-accent">Unlock Fee</p>
                    <p className="text-3xl font-black text-accent tracking-tighter">£{fee}</p>
                    
                    <button
                      onClick={() => handleUnlock(lead)}
                      disabled={loadingId === lead.id}
                      className="mt-4 bg-accent text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-sm disabled:opacity-50"
                    >
                      {loadingId === lead.id ? "Processing..." : "Unlock Job"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
