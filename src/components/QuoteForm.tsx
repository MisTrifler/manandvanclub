"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2, Shield, Lock, Clock, BadgeCheck, ArrowLeft, Building2, Home, GraduationCap, Sofa, Package, Boxes } from "lucide-react";
import Link from "next/link";
import { detectIntent, getIntentLabel, getMoveTypeLabel, type IntentType } from "@/lib/intent-detection";
import IntentSelector from "./IntentSelector";

const today = new Date().toISOString().split("T")[0];

// All possible form fields — intent-specific required fields are enforced via trigger()
const formSchema = z.object({
  // Core fields (all intents)
  collectionPostcode: z.string().min(5, "Invalid postcode"),
  deliveryPostcode: z.string().min(5, "Invalid postcode"),
  moveDate: z.string().min(1, "Required").refine((date) => date >= today, {
    message: "Date cannot be in the past",
  }),
  moveType: z.string().min(1, "Required"),
  firstName: z.string().min(2, "Required").optional(),
  phone: z.string().regex(/^(?:0|(?:\+44))7\d{9}$/, "Invalid UK mobile number").optional(),
  email: z.string().email("Invalid email").optional(),
  // Office-specific (officeSize required for office intent, enforced via trigger)
  officeSize: z.string().min(1, "Please select office size"),
  numberOfDesks: z.string().optional(),
  // House-specific (required for house intent, enforced via trigger)
  bedrooms: z.string().min(1, "Please select bedrooms"),
  propertyType: z.string().min(1, "Please select property type"),
  accessNotes: z.string().optional(),
  // Student-specific
  accommodationArea: z.string().optional(),
  numberOfBoxes: z.string().optional(),
  suitcases: z.string().optional(),
  smallFurnitureItems: z.string().optional(),
  // Single-item-specific (required for single-item intent, enforced via trigger)
  itemType: z.string().min(1, "Please select an item"),
  // General
  numberOfItems: z.string().optional(),
  additionalHelpers: z.string().optional(),
  // Storage-specific (size + direction required for storage intent, via trigger)
  storageFacility: z.string().optional(),
  storageUnitSize: z.string().min(1, "Please select a rough amount"),
  storageItems: z.string().optional(),
  storageDirection: z.string().min(1, "Please select a direction"),
  // Shared optional notes
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface QuoteFormProps {
  intent?: IntentType;
}

const INTENT_ICONS: Record<IntentType, React.ReactNode> = {
  office: <Building2 size={18} />,
  house: <Home size={18} />,
  student: <GraduationCap size={18} />,
  "single-item": <Sofa size={18} />,
  general: <Package size={18} />,
  storage: <Boxes size={18} />,
};

export default function QuoteForm({ intent: propIntent }: QuoteFormProps) {
  const [detectedIntent, setDetectedIntent] = useState<IntentType | null>(null);
  const [selectedIntent, setSelectedIntent] = useState<IntentType | null>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null);

  // Detect intent from URL on client side (for homepage / no prop)
  useEffect(() => {
    if (!propIntent && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const intent = detectIntent(window.location.pathname, params);
      setDetectedIntent(intent);
    }
  }, [propIntent]);

  const activeIntent: IntentType | null = propIntent || selectedIntent || detectedIntent;

  const hasEstimate = activeIntent !== "single-item";
  const TOTAL_STEPS = hasEstimate ? 5 : 4;

  const { register, watch, trigger, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      moveType: activeIntent ? getMoveTypeLabel(activeIntent) : "",
      moveDate: "",
      collectionPostcode: "",
      deliveryPostcode: "",
      additionalHelpers: "",
      storageDirection: "",
    }
  });

  // Set moveType when intent is determined
  useEffect(() => {
    if (activeIntent) {
      setValue("moveType", getMoveTypeLabel(activeIntent));
    }
  }, [activeIntent, setValue]);

  const calculateEstimate = (data: FormData): { min: number; max: number } => {
    const base: Record<IntentType, [number, number]> = {
      office: [300, 800],
      house: [180, 450],
      student: [80, 200],
      "single-item": [45, 120],
      general: [100, 300],
      storage: [120, 350],
    };

    // House: adjust based on bedrooms
    if (activeIntent === "house" && data.bedrooms) {
      const map: Record<string, [number, number]> = {
        "Studio": [80, 130],
        "1": [100, 180],
        "2": [180, 280],
        "3": [300, 450],
        "4+": [500, 850],
      };
      const result = map[data.bedrooms] || base[activeIntent];
      return { min: result[0], max: result[1] };
    }

    // Office: adjust based on office size
    if (activeIntent === "office" && data.officeSize) {
      const map: Record<string, [number, number]> = {
        "Small office": [200, 450],
        "Medium office": [400, 900],
        "Large office": [800, 1800],
        "Warehouse / Industrial": [600, 1500],
      };
      const result = map[data.officeSize] || base[activeIntent];
      return { min: result[0], max: result[1] };
    }

    // Storage: adjust based on rough amount
    if (activeIntent === "storage" && data.storageUnitSize) {
      const map: Record<string, [number, number]> = {
        "Few items": [60, 150],
        "Half van": [120, 250],
        "Full van": [200, 400],
        "Unsure": [120, 350],
      };
      const result = map[data.storageUnitSize] || base[activeIntent];
      return { min: result[0], max: result[1] };
    }

    const result = base[activeIntent || "general"];
    return { min: result[0], max: result[1] };
  };

  const onNextStep = async () => {
    let fields: (keyof FormData)[] = [];

    if (step === 1) {
      // Core fields required for all intents
      fields = ["collectionPostcode", "deliveryPostcode", "moveDate", "moveType"];
      // Intent-specific required fields
      if (activeIntent === "office") {
        fields.push("officeSize");
      } else if (activeIntent === "house") {
        fields.push("bedrooms", "propertyType");
      } else if (activeIntent === "single-item") {
        fields.push("itemType");
      } else if (activeIntent === "storage") {
        fields.push("storageUnitSize", "storageDirection");
      }
    } else if (step === 2 && hasEstimate) {
      // Estimate step — auto-calculated, no validation needed
      setEstimate(calculateEstimate(watch()));
      setStep(3);
      return;
    } else if (step === (hasEstimate ? 3 : 2)) {
      // Contact details step
      fields = ["firstName", "phone", "email"];
    }

    const isValid = await trigger(fields);
    if (isValid) {
      if (step === 1 && hasEstimate) {
        // Pre-calculate estimate before showing step 2 so it renders immediately
        setEstimate(calculateEstimate(watch()));
        setStep(2);
      } else if (step === (hasEstimate ? 3 : 2)) {
        handleFinalSubmit(watch());
      } else {
        setStep(step + 1);
      }
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError(null);
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleFinalSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Capture the originating page URL for conversion attribution
      const sourcePage = typeof window !== "undefined" ? window.location.pathname : "";

      // Build details object for service-specific fields (empty optionals omitted)
      const details: Record<string, any> = {};
      if (activeIntent === "office") {
        details.officeSize = data.officeSize;
        if (data.numberOfDesks) details.numberOfDesks = data.numberOfDesks;
      } else if (activeIntent === "house") {
        details.bedrooms = data.bedrooms;
        details.propertyType = data.propertyType;
        if (data.accessNotes) details.accessNotes = data.accessNotes;
      } else if (activeIntent === "student") {
        if (data.accommodationArea) details.accommodationType = data.accommodationArea;
        if (data.numberOfBoxes) details.numberOfBoxes = data.numberOfBoxes;
        if (data.suitcases) details.suitcases = data.suitcases;
        if (data.smallFurnitureItems) details.smallFurnitureItems = data.smallFurnitureItems;
      } else if (activeIntent === "single-item") {
        details.itemType = data.itemType;
      } else if (activeIntent === "general") {
        if (data.numberOfItems) details.numberOfItems = data.numberOfItems;
        if (data.additionalHelpers) details.additionalHelpers = data.additionalHelpers;
      } else if (activeIntent === "storage") {
        if (data.storageFacility) details.storageFacility = data.storageFacility;
        details.storageUnitSize = data.storageUnitSize;
        details.storageDirection = data.storageDirection;
      }
      if (data.notes) details.notes = data.notes;

      const estimatePrice = estimate
        ? `£${estimate.min}–£${estimate.max}`
        : undefined;

      const payload = {
        ...data,
        sourcePage,
        estimatedPrice: estimatePrice,
        details: Object.keys(details).length > 0 ? details : undefined,
      };

      const response = await fetch('/api/move-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.details || 'Failed');
      setRequestId(result.id);
      setStep(hasEstimate ? 4 : 3);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    const code = otp.join("");
    if (code.length < 4) {
      setOtpError("Please enter the full code");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, otp: code }),
      });
      if (!response.ok) throw new Error('Verification failed');
      setStep(hasEstimate ? 5 : 4);
    } catch (error: any) {
      setOtpError("Invalid code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = () => {
    if (step === 1) return activeIntent ? getIntentLabel(activeIntent) + " Details" : "Move Details";
    if (step === 2 && hasEstimate) return "Estimated Price";
    if (step === (hasEstimate ? 3 : 2)) return "Your Details";
    if (step === (hasEstimate ? 4 : 3)) return "Verify Email";
    return "";
  };

  return (
    <div
      id="quote-form"
      className="bg-white"
      style={{
        borderRadius: '28px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
        overflow: 'hidden',
      }}
    >
      {/* ──────────────────────────────────────────
          Fallback: no intent detected → show selector
          ────────────────────────────────────────── */}
      {!activeIntent && (
        <div className="px-5 pt-6 pb-6 lg:px-10 lg:pt-10 lg:pb-10">
          <h2
            className="uppercase tracking-tighter"
            style={{
              fontSize: 'clamp(28px, 5vw, 42px)',
              fontWeight: 800,
              color: '#0F172A',
              lineHeight: 1.1,
            }}
          >
            Get Matched
          </h2>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary/50 mt-2">Takes less than a minute • Deposit only if quote accepted</p>
          <div className="mt-6">
            <IntentSelector onSelect={(intent) => { setSelectedIntent(intent); setStep(1); }} />
          </div>
        </div>
      )}

      {activeIntent && (<>
      {/* Form title */}
      <div className="px-5 pt-6 pb-2 lg:px-10 lg:pt-10">
        <h2
          className="uppercase tracking-tighter"
          style={{
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 800,
            color: '#0F172A',
            lineHeight: 1.1,
          }}
        >
          Get Matched
        </h2>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-primary/50 mt-2">Takes less than a minute • Deposit only if quote accepted</p>
      </div>

      {/* Progress bar */}
      {step < TOTAL_STEPS && (
        <div className="bg-gray-50/50 px-5 py-3 lg:px-10 lg:py-4 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {INTENT_ICONS[activeIntent] && (
                <span className="text-accent">{INTENT_ICONS[activeIntent]}</span>
              )}
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">
                Step {step} of {TOTAL_STEPS}: {getStepTitle()}
              </p>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">
              {Math.round((step / TOTAL_STEPS) * 100)}% Complete
            </p>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? "bg-accent" : "bg-gray-200"}`} />
            ))}
          </div>
        </div>
      )}

      <div className="px-5 pb-6 lg:px-10 lg:pb-10">
        {/* ──────────────────── STEP 1: Service Details ──────────────────── */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tighter">
                  {activeIntent === "office" && "Your Office Move"}
                  {activeIntent === "house" && "Your Moving Home Details"}
                  {activeIntent === "student" && "Your Student Move"}
                  {activeIntent === "single-item" && "Your Furniture Delivery"}
                  {activeIntent === "general" && "Your Man & Van Service"}
                  {activeIntent === "storage" && "Your Storage Collection"}
                </h2>
                <p className="text-sm text-text-secondary mt-1 font-medium">
                  {activeIntent === "office" && "Tell us about your office move"}
                  {activeIntent === "house" && "Tell us about your home move"}
                  {activeIntent === "student" && "Tell us about your student move"}
                  {activeIntent === "single-item" && "Tell us about the furniture you need delivered"}
                  {activeIntent === "general" && "Tell us about your move — big or small"}
                  {activeIntent === "storage" && "Tell us about your storage collection"}
                </p>
              </div>
              {!propIntent && (
                <button
                  onClick={() => { setSelectedIntent(null); setStep(1); }}
                  className="text-[10px] font-black uppercase tracking-widest text-primary/40 hover:text-accent transition-colors flex items-center gap-1"
                >
                  <ArrowLeft size={12} /> Change
                </button>
              )}
            </div>

            {/* Form reassurance */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: <Clock size={13} />, text: "Under 60 seconds" },
                { icon: <BadgeCheck size={13} />, text: "Free quote" },
                { icon: <Shield size={13} />, text: "Deposit if you book" },
                { icon: <Lock size={13} />, text: "GDPR secure" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-accent/5 text-accent px-2.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {item.icon} {item.text}
                </div>
              ))}
            </div>

            {/* ── OFFICE FORM ── */}
            {activeIntent === "office" && (
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Office Size</label>
                  <select {...register("officeSize")} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none appearance-none">
                    <option value="">Select office size</option>
                    <option value="Small office">Small office</option>
                    <option value="Medium office">Medium office</option>
                    <option value="Large office">Large office</option>
                    <option value="Warehouse / Industrial">Warehouse / industrial</option>
                  </select>
                  {errors.officeSize && <p className="text-red-500 text-xs font-bold mt-1">{errors.officeSize.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Approx Desks / Items (Optional)</label>
                  <input {...register("numberOfDesks")} type="number" placeholder="Optional, approximate" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Collection Postcode</label>
                  <input {...register("collectionPostcode")} placeholder="Current office postcode" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Delivery Postcode</label>
                  <input {...register("deliveryPostcode")} placeholder="New office postcode" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.deliveryPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.deliveryPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Move Date</label>
                  <input type="date" {...register("moveDate")} min={today} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.moveDate && <p className="text-red-500 text-xs font-bold mt-1">{errors.moveDate.message}</p>}
                </div>
              </div>
            )}

            {/* ── HOUSE FORM ── */}
            {activeIntent === "house" && (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Bedrooms</label>
                    <select {...register("bedrooms")} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none appearance-none">
                      <option value="">Select</option>
                      <option value="Studio">Studio</option>
                      <option value="1">1 Bed</option>
                      <option value="2">2 Bed</option>
                      <option value="3">3 Bed</option>
                      <option value="4+">4+ Bed</option>
                    </select>
                    {errors.bedrooms && <p className="text-red-500 text-xs font-bold mt-1">{errors.bedrooms.message}</p>}
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Property Type</label>
                    <select {...register("propertyType")} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none appearance-none">
                      <option value="">Select</option>
                      <option value="House">House</option>
                      <option value="Flat">Flat</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Bungalow">Bungalow</option>
                      <option value="Maisonette">Maisonette</option>
                    </select>
                    {errors.propertyType && <p className="text-red-500 text-xs font-bold mt-1">{errors.propertyType.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Access Notes (Optional)</label>
                  <input {...register("accessNotes")} placeholder="Optional, e.g. stairs, lift, parking, narrow entrance" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Collection Postcode</label>
                  <input {...register("collectionPostcode")} placeholder="Current postcode" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Delivery Postcode</label>
                  <input {...register("deliveryPostcode")} placeholder="New postcode" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.deliveryPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.deliveryPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Move Date</label>
                  <input type="date" {...register("moveDate")} min={today} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.moveDate && <p className="text-red-500 text-xs font-bold mt-1">{errors.moveDate.message}</p>}
                </div>
              </div>
            )}

            {/* ── STUDENT FORM ── */}
            {activeIntent === "student" && (
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Student Accommodation or Area (Optional)</label>
                  <input {...register("accommodationArea")} placeholder="Optional, e.g. halls, shared house, Selly Oak" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Boxes</label>
                    <input {...register("numberOfBoxes")} type="number" placeholder="Approximate" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Suitcases</label>
                    <input {...register("suitcases")} type="number" placeholder="Approximate" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Any Small Furniture?</label>
                  <select {...register("smallFurnitureItems")} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none appearance-none">
                    <option value="">Select option</option>
                    <option value="None">None — only boxes and bags</option>
                    <option value="Desk + Chair">Desk + Chair</option>
                    <option value="Desk + Chair + Bookshelf">Desk + Chair + Bookshelf</option>
                    <option value="Other small furniture">Other small furniture</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Moving From (Postcode)</label>
                  <input {...register("collectionPostcode")} placeholder="Current postcode" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Moving To (Postcode)</label>
                  <input {...register("deliveryPostcode")} placeholder="New postcode" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.deliveryPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.deliveryPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">When Do You Need to Move?</label>
                  <input type="date" {...register("moveDate")} min={today} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.moveDate && <p className="text-red-500 text-xs font-bold mt-1">{errors.moveDate.message}</p>}
                </div>
              </div>
            )}

            {/* ── SINGLE ITEM FORM ── */}
            {activeIntent === "single-item" && (
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Item Type</label>
                  <select {...register("itemType")} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none appearance-none">
                    <option value="">Select item</option>
                    <option value="Sofa">Sofa</option>
                    <option value="Bed">Bed</option>
                    <option value="Table">Table</option>
                    <option value="Wardrobe">Wardrobe</option>
                    <option value="Fridge">Fridge</option>
                    <option value="Washing Machine">Washing Machine</option>
                    <option value="Dining Set">Dining Set</option>
                    <option value="Desk">Desk</option>
                    <option value="Mattress">Mattress</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.itemType && <p className="text-red-500 text-xs font-bold mt-1">{errors.itemType.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Collection Address / Postcode</label>
                  <input {...register("collectionPostcode")} placeholder="Where is the item now?" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Delivery Address / Postcode</label>
                  <input {...register("deliveryPostcode")} placeholder="Where should it go?" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.deliveryPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.deliveryPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Preferred Date</label>
                  <input type="date" {...register("moveDate")} min={today} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.moveDate && <p className="text-red-500 text-xs font-bold mt-1">{errors.moveDate.message}</p>}
                </div>
              </div>
            )}

            {/* ── GENERAL / SAME DAY FORM ── */}
            {activeIntent === "general" && (
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Pickup Postcode</label>
                  <input {...register("collectionPostcode")} placeholder="Pickup postcode" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Drop-off Postcode</label>
                  <input {...register("deliveryPostcode")} placeholder="Drop-off postcode" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.deliveryPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.deliveryPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Number of Items (approximate)</label>
                  <input {...register("numberOfItems")} type="number" placeholder="e.g. 5" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Preferred Date</label>
                  <input type="date" {...register("moveDate")} min={today} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.moveDate && <p className="text-red-500 text-xs font-bold mt-1">{errors.moveDate.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Extra Help Needed? (Optional)</label>
                  <select {...register("additionalHelpers")} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none appearance-none">
                    <option value="">Optional — the mover can advise</option>
                    <option value="no">No — driver only</option>
                    <option value="yes">Yes — need extra helper</option>
                    <option value="unsure">Unsure — advise me</option>
                  </select>
                </div>
              </div>
            )}

            {/* ── STORAGE FORM ── */}
            {activeIntent === "storage" && (
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Direction</label>
                  <select {...register("storageDirection")} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none appearance-none">
                    <option value="">Select direction</option>
                    <option value="To storage">To storage — moving items into a unit</option>
                    <option value="From storage">From storage — collecting items out</option>
                    <option value="Between units">Between units — moving from one storage unit to another</option>
                  </select>
                  {errors.storageDirection && <p className="text-red-500 text-xs font-bold mt-1">{errors.storageDirection.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Rough Amount</label>
                  <select {...register("storageUnitSize")} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none appearance-none">
                    <option value="">Select rough amount</option>
                    <option value="Few items">Few items</option>
                    <option value="Half van">Half van</option>
                    <option value="Full van">Full van</option>
                    <option value="Unsure">Unsure</option>
                  </select>
                  {errors.storageUnitSize && <p className="text-red-500 text-xs font-bold mt-1">{errors.storageUnitSize.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Storage Facility / Notes (Optional)</label>
                  <input {...register("storageFacility")} placeholder="Optional, e.g. Big Yellow Storage" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Collection Postcode</label>
                  <input {...register("collectionPostcode")} placeholder="Storage facility postcode" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Delivery Postcode</label>
                  <input {...register("deliveryPostcode")} placeholder="Where items are going" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.deliveryPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.deliveryPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Move Date</label>
                  <input type="date" {...register("moveDate")} min={today} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
                  {errors.moveDate && <p className="text-red-500 text-xs font-bold mt-1">{errors.moveDate.message}</p>}
                </div>
              </div>
            )}

            {/* Shared optional notes — all move types */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Anything Else the Mover Should Know? (Optional)</label>
              <input {...register("notes")} placeholder="Optional, e.g. stairs, parking, fragile items, narrow access" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
            </div>

            <button onClick={onNextStep} className="btn-orange w-full py-5 rounded-xl font-black uppercase tracking-widest">Continue</button>
          </div>
        )}

        {/* ──────────────────── STEP 2: Estimate (skip for single-item) ──────────────────── */}
        {step === 2 && hasEstimate && (
          <div className="space-y-6 text-center py-2">
            <div className="bg-white p-6 rounded-[2rem] shadow-xl border-2 border-border">
              <p className="text-[10px] font-black uppercase text-primary/40 mb-2">
                {activeIntent === "office" && "Estimated Office Move Cost"}
                {activeIntent === "house" && "Estimated Home Move Cost"}
                {activeIntent === "student" && "Estimated Student Move Cost"}
                {activeIntent === "general" && "Estimated Man & Van Cost"}
                {activeIntent === "storage" && "Estimated Storage Collection Cost"}
              </p>
              <p className="text-5xl font-black tracking-tighter text-primary">
                {estimate ? `£${estimate.min}–${estimate.max}` : "£—"}
              </p>
              <p className="text-xs text-text-secondary mt-3 font-medium">This is an estimate based on the details you provided. A vetted mover can review your request and send a quote if they can help.</p>
            </div>
            <button onClick={onNextStep} className="btn-orange w-full py-5 rounded-xl font-black uppercase tracking-widest">Continue</button>
            <button onClick={() => setStep(1)} className="text-[10px] font-black uppercase opacity-30">Back</button>
          </div>
        )}

        {/* ──────────────────── Step 3 (or 2 for single-item): Contact Details ──────────────────── */}
        {(step === (hasEstimate ? 3 : 2)) && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-primary uppercase text-center">Your Details</h2>

            {/* Privacy & GDPR reassurance */}
            <div className="bg-green-50/50 border border-green-200/50 rounded-xl p-3 flex items-start gap-2">
              <Lock size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <span className="inline-block bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider">Secure & GDPR Compliant</span>
                </p>
                <p className="text-[10px] text-text-secondary mt-1 leading-relaxed">Your enquiry is handled securely. Details are released only if you accept a mover quote and pay the booking deposit. The deposit is deducted from the mover quote.</p>
              </div>
            </div>

            <div className="space-y-2">
              <input {...register("firstName")} placeholder="First Name" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
              {errors.firstName && <p className="text-red-500 text-xs font-bold mt-1">{errors.firstName.message}</p>}
              <input {...register("phone")} placeholder="UK Mobile Number" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
              {errors.phone && <p className="text-red-500 text-xs font-bold mt-1">{errors.phone.message}</p>}
              <input {...register("email")} placeholder="Email Address" className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
              {errors.email && <p className="text-red-500 text-xs font-bold mt-1">{errors.email.message}</p>}
            </div>
            <button onClick={onNextStep} disabled={isSubmitting} className="btn-orange w-full py-5 rounded-xl font-black uppercase tracking-widest disabled:opacity-50">
              {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "Verify Email"}
            </button>
            <button onClick={() => setStep(step - 1)} className="text-[10px] font-black uppercase opacity-30">Back</button>
          </div>
        )}

        {/* ──────────────────── Step 4 (or 3 for single-item): OTP ──────────────────── */}
        {(step === (hasEstimate ? 4 : 3)) && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-black text-primary uppercase">Verify Your Email</h2>
            <p className="text-sm text-text-secondary">Enter the 4-digit code sent to your email</p>
            <div className="flex justify-center gap-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-12 h-16 bg-gray-50 border-2 rounded-xl text-center text-3xl font-black outline-none border-border focus:border-accent"
                  aria-label={`Digit ${i + 1} of 4`}
                />
              ))}
            </div>
            {otpError && <p className="text-red-500 text-sm">{otpError}</p>}
            <button onClick={handleVerifyOTP} disabled={isSubmitting} className="btn-orange w-full py-5 rounded-xl font-black uppercase tracking-widest">
              {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "Confirm Verification"}
            </button>
          </div>
        )}

        {/* ──────────────────── Step 5 (or 4 for single-item): Success ──────────────────── */}
        {step === TOTAL_STEPS && (
          <div className="text-center py-4 space-y-4">
            <CheckCircle2 size={40} className="text-success mx-auto" />
            <h2 className="text-2xl font-black text-primary uppercase">You're All Set</h2>
            <p className="text-text-secondary">Your {activeIntent === "office" ? "office move" : activeIntent === "single-item" ? "furniture delivery" : activeIntent === "storage" ? "storage collection" : activeIntent === "student" ? "student move" : activeIntent === "house" ? "home move" : "man & van service"} request has been successfully submitted.</p>
            <p className="text-text-secondary text-sm">A vetted local mover will review your details and submit a quote if they can help.</p>

            <div className="text-left bg-gray-50/50 rounded-2xl p-4 border border-border">
              <h3 className="text-sm font-black uppercase tracking-widest text-primary/60 mb-3">What Happens Next</h3>
              <ol className="space-y-3 text-sm text-primary/80">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center text-xs font-black text-accent">1</span>
                  We review your {activeIntent === "office" ? "office move" : activeIntent === "single-item" ? "furniture delivery" : activeIntent === "storage" ? "storage collection" : activeIntent === "student" ? "student move" : activeIntent === "house" ? "home move" : "man & van service"} requirements
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center text-xs font-black text-accent">2</span>
                  A vetted mover reviews your request and submits a quote
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center text-xs font-black text-accent">3</span>
                  You receive the quote by email and can accept or decline
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center text-xs font-black text-accent">4</span>
                  If you accept, you pay a booking deposit deducted from the quote and the mover contacts you directly
                </li>
              </ol>
            </div>

            <p className="text-sm font-bold text-accent tracking-tight">No spam. Just one trusted mover quote.</p>

            <Link href="/" className="btn-outline w-full block py-4 font-black uppercase text-xs rounded-xl">Return Home</Link>
          </div>
        )}
      </div>
      </>)}
    </div>
  );
}
