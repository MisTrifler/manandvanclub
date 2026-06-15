"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2, Shield, Lock, Clock, BadgeCheck, ArrowLeft, Building2, Home, GraduationCap, Sofa, Package, Boxes } from "lucide-react";
import Link from "next/link";
import { detectIntent, getIntentLabel, getMoveTypeLabel, type IntentType } from "@/lib/intent-detection";
import { calculateGuidePrice, type GuidePriceResult } from "@/lib/guide-price";
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
  firstName: z.string().min(2, "Required"),
  phone: z.string().regex(/^(?:0|(?:\+44))7\d{9}$/, "Invalid UK mobile number"),
  email: z.string().email("Invalid email"),
  // Office-specific
  businessName: z.string().optional(),
  officeSize: z.string().optional(),
  numberOfDesks: z.string().optional(),
  itEquipment: z.string().optional(),
  filingCabinets: z.string().optional(),
  meetingRoomFurniture: z.string().optional(),
  officeLiftAccess: z.string().optional(),
  // House-specific
  bedrooms: z.string().optional(),
  propertyType: z.string().optional(),
  packingRequired: z.string().optional(),
  floorLevel: z.string().optional(),
  houseLiftAccess: z.string().optional(),
  // Student-specific
  university: z.string().optional(),
  accommodationType: z.string().optional(),
  numberOfBoxes: z.string().optional(),
  suitcases: z.string().optional(),
  smallFurnitureItems: z.string().optional(),
  // Single-item-specific
  itemType: z.string().optional(),
  // General
  numberOfItems: z.string().optional(),
  additionalHelpers: z.string().optional(),
  // Storage-specific
  storageFacility: z.string().optional(),
  storageUnitSize: z.string().optional(),
  storageItems: z.string().optional(),
  storageDirection: z.string().optional(),
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
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [guidePrice, setGuidePrice] = useState<GuidePriceResult | null>(null);
  const [routeEstimate, setRouteEstimate] = useState<any | null>(null);
  const [isCalculatingGuide, setIsCalculatingGuide] = useState(false);
  const formShellRef = useRef<HTMLDivElement | null>(null);
  const activeStepRef = useRef<HTMLDivElement | null>(null);
  const hasMountedRef = useRef(false);

  const activeIntent: IntentType | null = propIntent || selectedIntent || detectedIntent;

  const canShowGuidePrice = Boolean(activeIntent);
  const TOTAL_STEPS = 4;
  const CONTACT_STEP = 2;
  const VERIFY_STEP = 3;
  const SUCCESS_STEP = 4;

  const scrollToActiveStep = (behavior: ScrollBehavior = "smooth") => {
    if (typeof window === "undefined") return;

    // Wait for React to mount the new step and for the browser to settle layout.
    // Without the second frame, the viewport can keep the old taller-step scroll
    // position and appear to drop into the homepage content below the form.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const target = activeStepRef.current || formShellRef.current;
        if (!target) return;

        const stickyHeaderOffset = window.matchMedia("(min-width: 1024px)").matches ? 132 : 84;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - stickyHeaderOffset;

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior,
        });
      });
    });
  };

  const goToStep = (nextStep: number, behavior: ScrollBehavior = "smooth") => {
    setStep(Math.min(Math.max(nextStep, 1), TOTAL_STEPS));
    scrollToActiveStep(behavior);
  };

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    scrollToActiveStep(step === SUCCESS_STEP ? "auto" : "smooth");
  }, [step]);

  const scrollToStepAfterRender = () => {
    scrollToActiveStep("smooth");
  };

  const handleIntentSelect = (intent: IntentType) => {
    setSelectedIntent(intent);
    goToStep(1);
  };

  const handleChangeIntent = () => {
    setSelectedIntent(null);
    goToStep(1);
  };

  // Detect intent from URL on client side (for homepage / no prop)
  useEffect(() => {
    if (!propIntent && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const intent = detectIntent(window.location.pathname, params);
      setDetectedIntent(intent);
    }
  }, [propIntent]);

  const { register, watch, trigger, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      moveType: activeIntent ? getMoveTypeLabel(activeIntent) : "",
      moveDate: "",
      collectionPostcode: "",
      deliveryPostcode: "",
      packingRequired: "no",
      houseLiftAccess: "no",
      officeLiftAccess: "yes",
      additionalHelpers: "no",
      storageDirection: "",
    }
  });

  // Set moveType when intent is determined
  useEffect(() => {
    if (activeIntent) {
      setValue("moveType", getMoveTypeLabel(activeIntent));
    }
  }, [activeIntent, setValue]);

  const buildDetails = (data: FormData): Record<string, any> => {
    const details: Record<string, any> = {};
    if (activeIntent === "office") {
      details.businessName = data.businessName;
      details.officeSize = data.officeSize;
      details.numberOfDesks = data.numberOfDesks;
      details.itEquipment = data.itEquipment;
      details.filingCabinets = data.filingCabinets;
      details.meetingRoomFurniture = data.meetingRoomFurniture;
      details.liftAccess = data.officeLiftAccess;
    } else if (activeIntent === "house") {
      details.bedrooms = data.bedrooms;
      details.propertyType = data.propertyType;
      details.packingRequired = data.packingRequired;
      details.floorLevel = data.floorLevel;
      details.liftAccess = data.houseLiftAccess;
    } else if (activeIntent === "student") {
      details.university = data.university;
      details.accommodationType = data.accommodationType;
      details.numberOfBoxes = data.numberOfBoxes;
      details.suitcases = data.suitcases;
      details.smallFurnitureItems = data.smallFurnitureItems;
    } else if (activeIntent === "single-item") {
      details.itemType = data.itemType;
    } else if (activeIntent === "general") {
      details.numberOfItems = data.numberOfItems;
      details.additionalHelpers = data.additionalHelpers;
    } else if (activeIntent === "storage") {
      details.storageFacility = data.storageFacility;
      details.storageUnitSize = data.storageUnitSize;
      details.storageItems = data.storageItems;
      details.storageDirection = data.storageDirection;
    }
    return details;
  };

  const buildGuideInput = (data: FormData, route: any | null) => {
    const details = buildDetails(data);
    return {
      intent: activeIntent,
      moveType: data.moveType,
      routeEstimate: route && Number(route.distanceMeters) > 0 ? route : null,
      bedrooms: details.bedrooms,
      propertyType: details.propertyType,
      officeSize: details.officeSize,
      numberOfDesks: details.numberOfDesks,
      itemType: details.itemType,
      numberOfItems: details.numberOfItems,
      storageUnitSize: details.storageUnitSize,
      storageDirection: details.storageDirection,
      numberOfBoxes: details.numberOfBoxes,
      suitcases: details.suitcases,
      smallFurnitureItems: details.smallFurnitureItems,
      collectionPostcode: data.collectionPostcode,
      deliveryPostcode: data.deliveryPostcode,
    };
  };

  const refreshGuidePreview = async (data: FormData) => {
    if (!activeIntent) return;
    setIsCalculatingGuide(true);
    setGuidePrice(null);
    setRouteEstimate(null);

    let route: any | null = null;
    try {
      const response = await fetch("/api/route-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collectionPostcode: data.collectionPostcode,
          deliveryPostcode: data.deliveryPostcode,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (result?.ok && Number(result.distanceMeters) > 0) {
        route = result;
      } else if (typeof result?.mapUrl === "string") {
        route = {
          mapUrl: result.mapUrl,
          distanceMeters: 0,
          durationSeconds: 0,
          provider: "fallback",
          calculatedAt: new Date().toISOString(),
        };
      }
    } catch {
      route = null;
    }

    const guide = calculateGuidePrice(buildGuideInput(data, route));
    setRouteEstimate(route);
    setGuidePrice(guide);
    setIsCalculatingGuide(false);
  };

  const onNextStep = async () => {
    let fields: (keyof FormData)[] = [];

    if (step === 1) {
      // Core fields required for all intents
      fields = ["collectionPostcode", "deliveryPostcode", "moveDate", "moveType"];
      // Intent-specific required fields
      if (activeIntent === "office") {
        fields.push("businessName", "officeSize");
      } else if (activeIntent === "house") {
        fields.push("bedrooms", "propertyType");
      } else if (activeIntent === "student") {
        fields.push("university", "accommodationType");
      } else if (activeIntent === "single-item") {
        fields.push("itemType");
      } else if (activeIntent === "storage") {
        fields.push("storageFacility", "storageUnitSize", "storageDirection");
      }
    } else if (step === CONTACT_STEP) {
      // Contact details step
      fields = ["firstName", "phone", "email"];
    }

    const isValid = await trigger(fields);
    if (isValid) {
      if (step === 1) {
        const currentData = watch();
        goToStep(CONTACT_STEP);
        void refreshGuidePreview(currentData);
      } else if (step === CONTACT_STEP) {
        handleFinalSubmit(watch());
      } else {
        goToStep(step + 1);
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
    if (value && index < 5) {
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

      // Build details object for service-specific fields. Route and guide
      // preview values are informational only; the server recalculates them.
      const details: Record<string, any> = buildDetails(data);
      if (routeEstimate) details.routeEstimate = routeEstimate;
      if (guidePrice) details.guidePrice = { ...guidePrice, calculatedAt: new Date().toISOString() };

      const estimatePrice = guidePrice?.display;

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
      goToStep(VERIFY_STEP);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      setOtpError("Please enter the full 6-digit code");
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
      goToStep(SUCCESS_STEP, "auto");
    } catch (error: any) {
      setOtpError("Invalid code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = () => {
    if (step === 1) return activeIntent ? getIntentLabel(activeIntent) + " Details" : "Move Details";
    if (step === CONTACT_STEP) return canShowGuidePrice ? "Guide Price + Your Details" : "Your Details";
    if (step === VERIFY_STEP) return "Verify Email";
    if (step === SUCCESS_STEP) return "Complete";
    return "";
  };

  return (
    <div
      ref={formShellRef}
      id="move-request-form"
      className="overflow-hidden rounded-[1.75rem] border border-white/25 bg-white shadow-[0_24px_80px_rgba(2,6,23,0.20)] ring-1 ring-black/5"
    >
      {/* ──────────────────────────────────────────
          Fallback: no intent detected → show selector
          ────────────────────────────────────────── */}
      {!activeIntent && (
        <div ref={activeStepRef} className="px-5 pt-5 pb-5 lg:px-8 lg:pt-8 lg:pb-8">
          <h2
            className="uppercase tracking-tighter"
            style={{
              fontSize: 'clamp(28px, 5vw, 42px)',
              fontWeight: 800,
              color: '#0F172A',
              lineHeight: 1.1,
            }}
          >
            Start Your Move Request
          </h2>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-primary/50 mt-2">Free to submit • No spam • Details protected</p>
          <div className="mt-6">
            <IntentSelector onSelect={handleIntentSelect} />
          </div>
        </div>
      )}

      {activeIntent && (<>
      {/* Form title */}
      <div className="px-5 pt-5 pb-2 lg:px-8 lg:pt-8">
        <h2
          className="uppercase tracking-tighter"
          style={{
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 800,
            color: '#0F172A',
            lineHeight: 1.1,
          }}
        >
          Move Request
        </h2>
        <p className="mt-2 text-[11px] font-black uppercase tracking-[0.22em] text-primary/50">Takes less than a minute • Deposit only if quote accepted</p>
      </div>

      {/* Progress bar */}
      {step < TOTAL_STEPS && (
        <div className="border-y border-primary/10 bg-slate-50/80 px-5 py-3 lg:px-8 lg:py-4">
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

      <div className="px-5 pb-5 lg:px-8 lg:pb-8">
        {/* ──────────────────── STEP 1: Service Details ──────────────────── */}
        {step === 1 && (
          <div ref={activeStepRef} className="space-y-4">
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
                  {activeIntent === "office" && "Tell us about your business relocation"}
                  {activeIntent === "house" && "Tell us about your home move"}
                  {activeIntent === "student" && "Tell us about your university move"}
                  {activeIntent === "single-item" && "Tell us about the furniture you need delivered"}
                  {activeIntent === "general" && "Tell us about your move — big or small"}
                  {activeIntent === "storage" && "Tell us about your storage collection"}
                </p>
              </div>
              {!propIntent && (
                <button
                  type="button"
                  onClick={handleChangeIntent}
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
                { icon: <BadgeCheck size={13} />, text: "Free to submit" },
                { icon: <Shield size={13} />, text: "No obligation" },
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
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Business Name</label>
                  <input {...register("businessName")} placeholder="Your company name" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.businessName && <p className="text-red-500 text-xs font-bold mt-1">{errors.businessName.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Office Size</label>
                  <select {...register("officeSize")} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 appearance-none">
                    <option value="">Select office size</option>
                    <option value="Small (1–10 staff)">Small (1–10 staff)</option>
                    <option value="Medium (11–50 staff)">Medium (11–50 staff)</option>
                    <option value="Large (50+ staff)">Large (50+ staff)</option>
                    <option value="Warehouse / Industrial">Warehouse / Industrial</option>
                  </select>
                  {errors.officeSize && <p className="text-red-500 text-xs font-bold mt-1">{errors.officeSize.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Desks</label>
                    <input {...register("numberOfDesks")} type="number" placeholder="Approximate" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Filing Cabinets</label>
                    <input {...register("filingCabinets")} type="number" placeholder="Number" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">IT Equipment to Move</label>
                  <select {...register("itEquipment")} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 appearance-none">
                    <option value="">Select option</option>
                    <option value="Desktops only">Desktops only</option>
                    <option value="Desktops + Monitors">Desktops + Monitors</option>
                    <option value="Servers / Network equipment">Servers / Network equipment</option>
                    <option value="Minimal IT">Minimal IT</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Meeting Room Furniture</label>
                  <select {...register("meetingRoomFurniture")} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 appearance-none">
                    <option value="">Select option</option>
                    <option value="None">None</option>
                    <option value="1–2 tables & chairs">1–2 tables & chairs</option>
                    <option value="3+ tables & chairs">3+ tables & chairs</option>
                    <option value="Full boardroom">Full boardroom</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Lift Access</label>
                  <select {...register("officeLiftAccess")} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 appearance-none">
                    <option value="yes">Yes — lift available</option>
                    <option value="no">No — stairs only</option>
                    <option value="ground">Ground floor only</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Collection Postcode</label>
                  <input {...register("collectionPostcode")} placeholder="Current office postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Delivery Postcode</label>
                  <input {...register("deliveryPostcode")} placeholder="New office postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.deliveryPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.deliveryPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Move Date</label>
                  <input type="date" {...register("moveDate")} min={today} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
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
                    <select {...register("bedrooms")} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 appearance-none">
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
                    <select {...register("propertyType")} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 appearance-none">
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
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Packing Required?</label>
                  <select {...register("packingRequired")} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 appearance-none">
                    <option value="no">No — I'll pack everything</option>
                    <option value="yes">Yes — I need packing help</option>
                    <option value="partial">Partial — some items only</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Floor Level</label>
                    <select {...register("floorLevel")} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 appearance-none">
                      <option value="Ground">Ground</option>
                      <option value="1st">1st Floor</option>
                      <option value="2nd">2nd Floor</option>
                      <option value="3rd+">3rd+ Floor</option>
                      <option value="Basement">Basement</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Lift Access?</label>
                    <select {...register("houseLiftAccess")} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 appearance-none">
                      <option value="no">No — stairs only</option>
                      <option value="yes">Yes — lift available</option>
                      <option value="ground">Ground floor</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Collection Postcode</label>
                  <input {...register("collectionPostcode")} placeholder="Current postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Delivery Postcode</label>
                  <input {...register("deliveryPostcode")} placeholder="New postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.deliveryPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.deliveryPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Move Date</label>
                  <input type="date" {...register("moveDate")} min={today} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.moveDate && <p className="text-red-500 text-xs font-bold mt-1">{errors.moveDate.message}</p>}
                </div>
              </div>
            )}

            {/* ── STUDENT FORM ── */}
            {activeIntent === "student" && (
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Which University?</label>
                  <input {...register("university")} placeholder="e.g. University of Birmingham" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.university && <p className="text-red-500 text-xs font-bold mt-1">{errors.university.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Where Are You Staying?</label>
                  <select {...register("accommodationType")} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 appearance-none">
                    <option value="">Select</option>
                    <option value="University Halls">University Halls</option>
                    <option value="Shared House">Shared House</option>
                    <option value="Private Studio">Private Studio</option>
                    <option value="Private Flat">Private Flat</option>
                  </select>
                  {errors.accommodationType && <p className="text-red-500 text-xs font-bold mt-1">{errors.accommodationType.message}</p>}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Boxes</label>
                    <input {...register("numberOfBoxes")} type="number" placeholder="Approximate" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Suitcases</label>
                    <input {...register("suitcases")} type="number" placeholder="Approximate" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Any Small Furniture?</label>
                  <select {...register("smallFurnitureItems")} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 appearance-none">
                    <option value="">Select option</option>
                    <option value="None">None — only boxes and bags</option>
                    <option value="Desk + Chair">Desk + Chair</option>
                    <option value="Desk + Chair + Bookshelf">Desk + Chair + Bookshelf</option>
                    <option value="Other small furniture">Other small furniture</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Moving From (Postcode)</label>
                  <input {...register("collectionPostcode")} placeholder="Current postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Moving To (Postcode)</label>
                  <input {...register("deliveryPostcode")} placeholder="New postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.deliveryPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.deliveryPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">When Do You Need to Move?</label>
                  <input type="date" {...register("moveDate")} min={today} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.moveDate && <p className="text-red-500 text-xs font-bold mt-1">{errors.moveDate.message}</p>}
                </div>
              </div>
            )}

            {/* ── SINGLE ITEM FORM ── */}
            {activeIntent === "single-item" && (
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Item Type</label>
                  <select {...register("itemType")} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 appearance-none">
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
                  <input {...register("collectionPostcode")} placeholder="Where is the item now?" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Delivery Address / Postcode</label>
                  <input {...register("deliveryPostcode")} placeholder="Where should it go?" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.deliveryPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.deliveryPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Preferred Date</label>
                  <input type="date" {...register("moveDate")} min={today} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.moveDate && <p className="text-red-500 text-xs font-bold mt-1">{errors.moveDate.message}</p>}
                </div>
              </div>
            )}

            {/* ── GENERAL / SAME DAY FORM ── */}
            {activeIntent === "general" && (
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Pickup Postcode</label>
                  <input {...register("collectionPostcode")} placeholder="Pickup postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Drop-off Postcode</label>
                  <input {...register("deliveryPostcode")} placeholder="Drop-off postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.deliveryPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.deliveryPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Number of Items (approximate)</label>
                  <input {...register("numberOfItems")} type="number" placeholder="e.g. 5" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Preferred Date</label>
                  <input type="date" {...register("moveDate")} min={today} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.moveDate && <p className="text-red-500 text-xs font-bold mt-1">{errors.moveDate.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Additional Helpers Required?</label>
                  <select {...register("additionalHelpers")} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 appearance-none">
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
                  <select {...register("storageDirection")} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 appearance-none">
                    <option value="">Select direction</option>
                    <option value="To storage">To storage — moving items into a unit</option>
                    <option value="From storage">From storage — collecting items out</option>
                    <option value="Between units">Between units — moving from one storage unit to another</option>
                  </select>
                  {errors.storageDirection && <p className="text-red-500 text-xs font-bold mt-1">{errors.storageDirection.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Storage Facility Name</label>
                  <input {...register("storageFacility")} placeholder="e.g. Big Yellow Storage" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.storageFacility && <p className="text-red-500 text-xs font-bold mt-1">{errors.storageFacility.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Unit Size</label>
                  <select {...register("storageUnitSize")} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 appearance-none">
                    <option value="">Select unit size</option>
                    <option value="Small (locker to 25 sq ft)">Small (locker to 25 sq ft)</option>
                    <option value="Medium (50–100 sq ft)">Medium (50–100 sq ft)</option>
                    <option value="Large (150+ sq ft)">Large (150+ sq ft)</option>
                    <option value="Unsure">Unsure — need help estimating</option>
                  </select>
                  {errors.storageUnitSize && <p className="text-red-500 text-xs font-bold mt-1">{errors.storageUnitSize.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Items to Collect</label>
                  <textarea {...register("storageItems")} placeholder="Brief description of items in storage (e.g. furniture, boxes, appliances)" rows={3} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 resize-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Collection Postcode</label>
                  <input {...register("collectionPostcode")} placeholder="Storage facility postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Delivery Postcode</label>
                  <input {...register("deliveryPostcode")} placeholder="Where items are going" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.deliveryPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.deliveryPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Move Date</label>
                  <input type="date" {...register("moveDate")} min={today} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.moveDate && <p className="text-red-500 text-xs font-bold mt-1">{errors.moveDate.message}</p>}
                </div>
              </div>
            )}

            <button type="button" onClick={onNextStep} className="btn-orange w-full rounded-2xl py-4 font-black uppercase tracking-widest">Continue</button>
          </div>
        )}

        {/* ──────────────────── STEP 2: Contact Details + Guide Range ──────────────────── */}
        {(step === CONTACT_STEP) && (
          <div ref={activeStepRef} className="space-y-4">
            <h2 className="text-2xl font-black text-primary uppercase text-center">Your Details</h2>

            {/* Privacy & GDPR reassurance */}
            <div className="bg-green-50/50 border border-green-200/50 rounded-2xl p-3 flex items-start gap-2">
              <Lock size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <span className="inline-block bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider">Secure & GDPR Compliant</span>
                </p>
                <p className="text-[10px] text-text-secondary mt-1 leading-relaxed">Your enquiry is handled securely. Details are released only if you accept a mover quote and pay the booking deposit. The deposit is deducted from the mover quote.</p>
              </div>
            </div>

            {canShowGuidePrice && (
              <div className="rounded-[1.5rem] border border-accent/20 bg-gradient-to-br from-accent/10 via-white to-primary/5 p-4 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary/45">Guide price range</p>
                <div className="mt-1 flex items-end justify-between gap-3">
                  <p className="text-3xl font-black tracking-tighter text-primary">
                    {isCalculatingGuide ? "Checking…" : guidePrice?.display || "Guide pending"}
                  </p>
                  <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-accent shadow-sm">No obligation</span>
                </div>
                {routeEstimate && Number(routeEstimate.distanceMeters) > 0 && (
                  <p className="mt-1 text-[11px] font-bold text-primary/65">
                    Route guide: {routeEstimate.distanceText} · {routeEstimate.durationText}
                  </p>
                )}
                <p className="mt-2 text-xs font-medium leading-relaxed text-text-secondary">
                  This is only a guide price. A verified mover will review your move details and send an accurate quote before you decide whether to book.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <input {...register("firstName")} autoComplete="given-name" placeholder="First Name" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
              {errors.firstName && <p className="text-red-500 text-xs font-bold mt-1">{errors.firstName.message}</p>}
              <input {...register("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="UK Mobile Number" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
              {errors.phone && <p className="text-red-500 text-xs font-bold mt-1">{errors.phone.message}</p>}
              <input {...register("email")} type="email" inputMode="email" autoComplete="email" placeholder="Email Address" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
              {errors.email && <p className="text-red-500 text-xs font-bold mt-1">{errors.email.message}</p>}
            </div>
            <button type="button" onClick={onNextStep} disabled={isSubmitting} className="btn-orange w-full rounded-2xl py-4 font-black uppercase tracking-widest disabled:opacity-50">
              {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "Verify Email"}
            </button>
            <button type="button" onClick={() => goToStep(step - 1)} className="text-[10px] font-black uppercase tracking-widest text-primary/40 hover:text-primary">Back</button>
          </div>
        )}

        {/* ──────────────────── STEP 3: OTP Verification ──────────────────── */}
        {(step === VERIFY_STEP) && (
          <div ref={activeStepRef} className="space-y-6 text-center">
            <h2 className="text-2xl font-black text-primary uppercase">Verify Your Email</h2>
            <p className="text-sm text-text-secondary">Enter the 6-digit code sent to your email</p>
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
                  aria-label={`Digit ${i + 1} of 6`}
                />
              ))}
            </div>
            {otpError && <p className="text-red-500 text-sm">{otpError}</p>}
            <button type="button" onClick={handleVerifyOTP} disabled={isSubmitting} className="btn-orange w-full rounded-2xl py-4 font-black uppercase tracking-widest">
              {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "Confirm Verification"}
            </button>
          </div>
        )}

        {/* ──────────────────── STEP 4: Success ──────────────────── */}
        {step === SUCCESS_STEP && (
          <div ref={activeStepRef} className="text-center py-4 space-y-4">
            <CheckCircle2 size={40} className="text-success mx-auto" />
            <h2 className="text-2xl font-black text-primary uppercase">You're All Set</h2>
            <p className="text-text-secondary">Your {activeIntent === "office" ? "office move" : activeIntent === "single-item" ? "furniture delivery" : activeIntent === "storage" ? "storage collection" : activeIntent === "student" ? "student move" : activeIntent === "house" ? "home move" : "man & van service"} request has been successfully submitted.</p>
            <p className="text-text-secondary text-sm">A verified local mover will review your details and submit a quote if they can help.</p>

            <div className="text-left bg-gray-50/50 rounded-2xl p-4 border border-border">
              <h3 className="text-sm font-black uppercase tracking-widest text-primary/60 mb-3">What Happens Next</h3>
              <ol className="space-y-3 text-sm text-primary/80">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center text-xs font-black text-accent">1</span>
                  We review your {activeIntent === "office" ? "office move" : activeIntent === "single-item" ? "furniture delivery" : activeIntent === "storage" ? "storage collection" : activeIntent === "student" ? "student move" : activeIntent === "house" ? "home move" : "man & van service"} requirements
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center text-xs font-black text-accent">2</span>
                  A verified mover reviews your request and submits a quote
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
