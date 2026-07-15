"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Calculator, Phone, ShieldCheck, CheckCircle2, Info } from "lucide-react";

type MoveType = "single-item" | "studio-flat" | "1-bed-flat" | "2-bed-flat" | "1-2-bed-house" | "3-bed-house" | "4-bed-house" | "student" | "small-office";
type Region = "west-midlands" | "london" | "other";
type AccessLevel = "easy" | "moderate" | "difficult";

const moveTypeLabels: Record<MoveType, string> = {
  "single-item": "Single item collection",
  "studio-flat": "Studio flat move",
  "1-bed-flat": "1-bed flat move",
  "2-bed-flat": "2-bed flat move",
  "1-2-bed-house": "1–2 bed house move",
  "3-bed-house": "3-bed house move",
  "4-bed-house": "4+ bed house move",
  "student": "Student move (halls/shared)",
  "small-office": "Small office relocation",
};

const regionLabels: Record<Region, string> = {
  "west-midlands": "West Midlands",
  london: "Greater London",
  other: "Other UK",
};

const accessLabels: Record<AccessLevel, string> = {
  easy: "Easy (ground floor, driveway parking)",
  moderate: "Moderate (1st floor or stairs, on-street parking)",
  difficult: "Difficult (2nd+ floor no lift, permit parking, narrow access)",
};

// Base price ranges [min, max] by move type and region
const basePrices: Record<MoveType, Record<Region, [number, number]>> = {
  "single-item": { "west-midlands": [50, 90], london: [60, 110], other: [50, 100] },
  "studio-flat": { "west-midlands": [150, 280], london: [180, 350], other: [150, 300] },
  "1-bed-flat": { "west-midlands": [180, 350], london: [220, 420], other: [180, 380] },
  "2-bed-flat": { "west-midlands": [250, 450], london: [300, 550], other: [250, 500] },
  "1-2-bed-house": { "west-midlands": [200, 400], london: [280, 500], other: [220, 450] },
  "3-bed-house": { "west-midlands": [300, 550], london: [400, 700], other: [300, 600] },
  "4-bed-house": { "west-midlands": [500, 900], london: [650, 1200], other: [500, 1000] },
  "student": { "west-midlands": [80, 200], london: [100, 250], other: [80, 220] },
  "small-office": { "west-midlands": [300, 600], london: [400, 800], other: [300, 650] },
};

// Access multipliers
const accessMultipliers: Record<AccessLevel, [number, number]> = {
  easy: [1.0, 1.0],
  moderate: [1.1, 1.2],
  difficult: [1.2, 1.4],
};

const sameDayMultiplier = 1.2;

export default function CalculatorContent() {
  const [moveType, setMoveType] = useState<MoveType>("1-bed-flat");
  const [region, setRegion] = useState<Region>("west-midlands");
  const [access, setAccess] = useState<AccessLevel>("moderate");
  const [sameDay, setSameDay] = useState(false);

  const [baseMin, baseMax] = basePrices[moveType][region];
  const [accessMin, accessMax] = accessMultipliers[access];
  const sameDayMult = sameDay ? sameDayMultiplier : 1.0;

  const estimatedMin = Math.round(baseMin * accessMin * sameDayMult);
  const estimatedMax = Math.round(baseMax * accessMax * sameDayMult);

  const avgEstimate = Math.round((estimatedMin + estimatedMax) / 2);
  const deposit = avgEstimate <= 100 ? 10 : avgEstimate <= 250 ? 15 : avgEstimate <= 500 ? 25 : avgEstimate <= 1000 ? 35 : 50;
  const remainingBalance = avgEstimate - deposit;

  return (
    <div className="space-y-12">
      {/* Calculator Form */}
      <div className="bg-white rounded-2xl border-2 border-accent/20 p-6 md:p-8 space-y-6 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Calculator size={24} className="text-accent" />
          <h2 className="text-xl font-black text-primary uppercase tracking-tight">Estimate Your Move Cost</h2>
        </div>

        {/* Move Type */}
        <div>
          <label className="block text-sm font-black text-primary uppercase tracking-widest mb-2">What are you moving?</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(moveTypeLabels).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setMoveType(value as MoveType)}
                className={`text-left px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                  moveType === value
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-white text-text-secondary hover:border-accent/50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Region */}
        <div>
          <label className="block text-sm font-black text-primary uppercase tracking-widest mb-2">Where are you moving?</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.entries(regionLabels).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setRegion(value as Region)}
                className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                  region === value
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-white text-text-secondary hover:border-accent/50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Access */}
        <div>
          <label className="block text-sm font-black text-primary uppercase tracking-widest mb-2">How easy is the access?</label>
          <div className="space-y-2">
            {Object.entries(accessLabels).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setAccess(value as AccessLevel)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                  access === value
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-white text-text-secondary hover:border-accent/50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Same Day */}
        <div>
          <button
            onClick={() => setSameDay(!sameDay)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-bold transition-all w-full ${
              sameDay
                ? "border-accent bg-accent/10 text-accent"
                : "border-border bg-white text-text-secondary hover:border-accent/50"
            }`}
          >
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${sameDay ? "border-accent bg-accent" : "border-border"}`}>
              {sameDay && <CheckCircle2 size={14} className="text-white" />}
            </div>
            I need a same-day move (+20% premium)
          </button>
        </div>
      </div>

      {/* Result */}
      <div className="bg-primary rounded-2xl p-6 md:p-8 text-white space-y-6">
        <h2 className="text-xl font-black uppercase tracking-widest">Estimated Cost</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-white/60 text-xs font-black uppercase tracking-widest">Estimated range</p>
            <p className="text-3xl md:text-4xl font-black mt-1">£{estimatedMin} – £{estimatedMax}</p>
          </div>
          <div>
            <p className="text-white/60 text-xs font-black uppercase tracking-widest">Typical mid-range</p>
            <p className="text-3xl md:text-4xl font-black mt-1 text-accent">~£{avgEstimate}</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/80">Booking deposit (if you accept a quote)</span>
            <span className="font-black">£{deposit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/80">Remaining balance (paid to mover on the day)</span>
            <span className="font-black">£{remainingBalance}</span>
          </div>
          <div className="flex justify-between text-sm border-t border-white/20 pt-2">
            <span className="text-white/80 font-bold">Total move cost</span>
            <span className="font-black text-accent">£{avgEstimate}</span>
          </div>
        </div>

        <Link
          href="/get-started"
          className="btn-orange w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm text-center block"
        >
          Submit Your Move Request — It&apos;s Free <ArrowUpRight size={16} className="inline" />
        </Link>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#F9F9F7] rounded-2xl border border-border p-6 flex items-start gap-3">
        <Info size={20} className="text-accent flex-shrink-0 mt-0.5" />
        <div className="text-sm text-text-secondary leading-relaxed">
          <p className="font-bold text-primary">This is a guide price, not a quote.</p>
          <p className="mt-1">Your final quote depends on exact postcodes, item list, distance, van size, number of helpers, parking, stairs, lift access and mover availability. Submit your details for free and a verified mover reviews your actual move before sending a quote.</p>
        </div>
      </div>

      {/* Related Links */}
      <div className="space-y-4">
        <p className="text-sm font-black text-primary uppercase tracking-widest">Related</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/man-and-van-prices" className="text-sm text-accent font-bold hover:underline">Man and Van Prices 2026</Link>
          <Link href="/man-and-van-vs-removal-company" className="text-sm text-accent font-bold hover:underline">Man and Van vs Removal Company</Link>
          <Link href="/man-and-van-near-me" className="text-sm text-accent font-bold hover:underline">Find a Mover Near You</Link>
          <Link href="/house-removals" className="text-sm text-accent font-bold hover:underline">House Removals</Link>
          <Link href="/flat-removals" className="text-sm text-accent font-bold hover:underline">Flat Moves</Link>
          <Link href="/furniture-delivery" className="text-sm text-accent font-bold hover:underline">Furniture Delivery</Link>
        </div>
      </div>
    </div>
  );
}
