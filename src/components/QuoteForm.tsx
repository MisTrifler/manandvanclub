"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2, Shield, Lock, Clock, BadgeCheck, ArrowLeft, Building2, Home, GraduationCap, Sofa, Package, Boxes } from "lucide-react";
import Link from "next/link";
import { detectIntent, getIntentLabel, getMoveTypeLabel, type IntentType } from "@/lib/intent-detection";
import { calculateGuidePrice, type GuidePriceResult } from "@/lib/guide-price";
import {
  POSTCODE_ERROR_MESSAGE,
  UK_POSTCODE_EXAMPLE,
  SAME_POSTCODE_ERROR_MESSAGE,
  isSameUKPostcode,
  isValidUKPostcode,
  normalisePostcodeForDisplay,
  parseUKPostcode,
  sanitizePostcodeTyping,
} from "@/lib/postcode";
import IntentSelector from "./IntentSelector";

const today = new Date().toISOString().split("T")[0];

const positiveIntegerString = (message: string) =>
  z.string().optional().refine((value) => {
    if (value == null || value === "") return true;
    const n = Number(value);
    return Number.isInteger(n) && n >= 1;
  }, { message });

function normalisePostcodeInput(value: unknown): string {
  return normalisePostcodeForDisplay(value);
}

function routePairKey(collectionPostcode: unknown, deliveryPostcode: unknown): string {
  const collection = parseUKPostcode(collectionPostcode);
  const delivery = parseUKPostcode(deliveryPostcode);
  if (!collection || !delivery || collection.compact === delivery.compact) return "";
  return `${collection.compact}|${delivery.compact}`;
}

function outwardPostcode(value: unknown): string {
  return parseUKPostcode(value)?.display.split(" ")[0] || "";
}

function getDeviceType(): "mobile" | "tablet" | "desktop" | "unknown" {
  if (typeof window === "undefined") return "unknown";
  const ua = navigator.userAgent || "";
  if (/ipad|tablet/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android/i.test(ua)) return "mobile";
  if (window.matchMedia?.("(pointer: coarse) and (max-width: 1024px)").matches) return "tablet";
  return "desktop";
}

function getAttributionData(collectionPostcode: string, deliveryPostcode: string) {
  if (typeof window === "undefined") {
    return {
      sourcePage: "",
      landingPage: "",
      referrer: "",
      deviceType: "unknown",
      collectionOutwardPostcode: outwardPostcode(collectionPostcode),
      deliveryOutwardPostcode: outwardPostcode(deliveryPostcode),
    };
  }

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const campaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"];
  const currentTouch: Record<string, string> = {
    landingPage: `${url.pathname}${url.search}`,
    referrer: document.referrer || "",
    firstTouchAt: new Date().toISOString(),
  };

  for (const key of campaignKeys) {
    const value = params.get(key);
    if (value) currentTouch[key] = value;
  }

  let firstTouch = currentTouch;
  try {
    const stored = window.sessionStorage.getItem("mvc_first_touch");
    if (stored) {
      firstTouch = { ...currentTouch, ...JSON.parse(stored) };
    } else {
      window.sessionStorage.setItem("mvc_first_touch", JSON.stringify(currentTouch));
    }
  } catch {
    firstTouch = currentTouch;
  }

  const readCampaign = (key: string) => params.get(key) || firstTouch[key] || "";

  return {
    sourcePage: window.location.pathname,
    landingPage: firstTouch.landingPage || `${url.pathname}${url.search}`,
    referrer: firstTouch.referrer || document.referrer || "",
    utmSource: readCampaign("utm_source"),
    utmMedium: readCampaign("utm_medium"),
    utmCampaign: readCampaign("utm_campaign"),
    utmTerm: readCampaign("utm_term"),
    utmContent: readCampaign("utm_content"),
    gclid: readCampaign("gclid"),
    gbraid: readCampaign("gbraid"),
    wbraid: readCampaign("wbraid"),
    firstTouchAt: firstTouch.firstTouchAt || "",
    deviceType: getDeviceType(),
    collectionOutwardPostcode: outwardPostcode(collectionPostcode),
    deliveryOutwardPostcode: outwardPostcode(deliveryPostcode),
  };
}


function generateFallbackUuid(): string {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (char) => {
    const value = Number(char) ^ (Math.random() * 16 >> (Number(char) / 4));
    return value.toString(16);
  });
}

function getOrCreateAbandonedQuoteId(): string {
  if (typeof window === "undefined") return "";

  try {
    const existing = window.localStorage.getItem("mvc_abandoned_quote_id");
    if (existing) return existing;

    const nextId = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : generateFallbackUuid();

    window.localStorage.setItem("mvc_abandoned_quote_id", nextId);
    return nextId;
  } catch {
    return typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : generateFallbackUuid();
  }
}

function clearAbandonedQuoteId() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem("mvc_abandoned_quote_id");
  } catch {
    // ignore storage errors
  }
}

function hasRecoverableContact(email: unknown, phone: unknown): boolean {
  const cleanEmail = String(email || "").trim();
  const cleanPhone = String(phone || "").replace(/\D/g, "");
  return cleanEmail.includes("@") || cleanPhone.length >= 10;
}

function formatRouteGuideForCustomer(routeEstimate: any | null): string {
  if (!routeEstimate || Number(routeEstimate.distanceMeters) <= 0) return "";
  const provider = String(routeEstimate.provider || "");
  if (provider.includes("local-sector")) {
    return "Local postcode area · short local route";
  }
  return `${routeEstimate.distanceText} · ${routeEstimate.durationText}`;
}

const MULTI_VALUE_SEPARATOR = ", ";

const FURNITURE_ITEM_OPTIONS = [
  "Sofa",
  "Bed",
  "Table",
  "Wardrobe",
  "Fridge",
  "Washing Machine",
  "Dining Set",
  "Desk",
  "Mattress",
  "Boxes",
  "Other",
];

const STUDENT_FURNITURE_OPTIONS = [
  "None — only boxes and bags",
  "Desk",
  "Chair",
  "Bookshelf",
  "Small drawers",
  "Clothes rail",
  "Other small furniture",
];

function splitMultiValue(value: unknown): string[] {
  return String(value || "")
    .split(MULTI_VALUE_SEPARATOR)
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinMultiValues(values: string[]): string {
  return values.filter(Boolean).join(MULTI_VALUE_SEPARATOR);
}

const postcodeFieldSchema = z.string().min(1, "Required").refine(isValidUKPostcode, {
  message: POSTCODE_ERROR_MESSAGE,
});

// All possible form fields — intent-specific required fields are enforced via trigger()
const formSchema = z.object({
  // Core fields (all intents)
  collectionPostcode: postcodeFieldSchema,
  deliveryPostcode: postcodeFieldSchema,
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
  numberOfDesks: positiveIntegerString("Enter at least 1 desk"),
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
  numberOfBoxes: positiveIntegerString("Enter at least 1 box"),
  suitcases: positiveIntegerString("Enter at least 1 suitcase"),
  smallFurnitureItems: z.string().optional(),
  // Single-item / item-list details
  itemType: z.string().optional(),
  itemDescription: z.string().optional(),
  // General
  numberOfItems: positiveIntegerString("Enter at least 1 item"),
  additionalHelpers: z.string().optional(),
  // Storage-specific
  storageFacility: z.string().optional(),
  storageUnitSize: z.string().optional(),
  storageItems: z.string().optional(),
}).superRefine((data, ctx) => {
  const isStorageRequest = String(data.moveType || "").toLowerCase().includes("storage");

  if (isStorageRequest && !String(data.storageItems || "").trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["storageItems"],
      message: "Tell us what needs moving",
    });
  }

  const collectionPostcode = normalisePostcodeInput(data.collectionPostcode);
  const deliveryPostcode = normalisePostcodeInput(data.deliveryPostcode);

  if (
    isValidUKPostcode(collectionPostcode) &&
    isValidUKPostcode(deliveryPostcode) &&
    isSameUKPostcode(collectionPostcode, deliveryPostcode)
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["deliveryPostcode"],
      message: SAME_POSTCODE_ERROR_MESSAGE,
    });
  }
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
  const [guidePricePairKey, setGuidePricePairKey] = useState<string | null>(null);
  const [routeEstimate, setRouteEstimate] = useState<any | null>(null);
  const [routeEstimatePairKey, setRouteEstimatePairKey] = useState<string | null>(null);
  const [isCalculatingGuide, setIsCalculatingGuide] = useState(false);
  const [abandonedQuoteStatus, setAbandonedQuoteStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const formShellRef = useRef<HTMLDivElement | null>(null);
  const abandonedQuoteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abandonedQuoteConvertedRef = useRef(false);
  const activeStepRef = useRef<HTMLDivElement | null>(null);
  const hasMountedRef = useRef(false);
  const historyReadyRef = useRef(false);
  const isHandlingPopStateRef = useRef(false);
  const activeStepNumberRef = useRef(0);
  const currentIntentRef = useRef<IntentType | null>(null);
  const previousScrollRestorationRef = useRef<ScrollRestoration | null>(null);

  const activeIntent: IntentType | null = propIntent || selectedIntent || detectedIntent;

  useEffect(() => {
    currentIntentRef.current = activeIntent;
  }, [activeIntent]);

  const canShowGuidePrice = Boolean(activeIntent);
  const TOTAL_STEPS = 4;
  const SELECT_INTENT_STEP = 0;
  const CONTACT_STEP = 2;
  const VERIFY_STEP = 3;
  const SUCCESS_STEP = 4;

  const scrollToActiveStep = useCallback((behavior: ScrollBehavior = "smooth") => {
    if (typeof window === "undefined") return;

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
  }, []);

  const scrollToStepAfterRender = useCallback((behavior: ScrollBehavior = "smooth") => {
    if (typeof window === "undefined") return;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollToActiveStep(behavior));
    });
  }, [scrollToActiveStep]);

  const getQuoteFormHistoryState = useCallback((nextStep: number, intentOverride?: IntentType | null) => {
    const existingState = window.history.state && typeof window.history.state === "object"
      ? window.history.state
      : {};

    return {
      ...existingState,
      manAndVanQuoteForm: true,
      quoteFormStep: nextStep,
      quoteFormIntent: intentOverride ?? currentIntentRef.current ?? null,
    };
  }, []);

  const pushQuoteFormHistoryState = useCallback((nextStep: number, intentOverride?: IntentType | null) => {
    if (typeof window === "undefined" || !historyReadyRef.current || isHandlingPopStateRef.current) return;
    if (activeStepNumberRef.current === nextStep) return;

    window.history.pushState(
      getQuoteFormHistoryState(nextStep, intentOverride),
      "",
      window.location.href
    );
    activeStepNumberRef.current = nextStep;
  }, [getQuoteFormHistoryState]);

  const goToStep = useCallback((nextStep: number, options: { history?: "push" | "replace" | "none"; scroll?: ScrollBehavior; intent?: IntentType | null } = {}) => {
    const safeStep = Math.min(TOTAL_STEPS, Math.max(1, nextStep));

    if (typeof window !== "undefined") {
      if (options.history === "replace") {
        window.history.replaceState(
          getQuoteFormHistoryState(safeStep, options.intent),
          "",
          window.location.href
        );
        activeStepNumberRef.current = safeStep;
      } else if (options.history !== "none") {
        pushQuoteFormHistoryState(safeStep, options.intent);
      } else {
        activeStepNumberRef.current = safeStep;
      }
    }

    setStep(safeStep);
    scrollToStepAfterRender(options.scroll || (safeStep === SUCCESS_STEP ? "auto" : "smooth"));
  }, [SUCCESS_STEP, TOTAL_STEPS, getQuoteFormHistoryState, pushQuoteFormHistoryState, scrollToStepAfterRender]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    previousScrollRestorationRef.current = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const initialHistoryStep = propIntent ? 1 : SELECT_INTENT_STEP;
    window.history.replaceState(
      getQuoteFormHistoryState(initialHistoryStep, propIntent || null),
      "",
      window.location.href
    );
    activeStepNumberRef.current = initialHistoryStep;
    historyReadyRef.current = true;
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state as { manAndVanQuoteForm?: boolean; quoteFormStep?: number; quoteFormIntent?: IntentType | null } | null;

      if (!state?.manAndVanQuoteForm || typeof state.quoteFormStep !== "number") {
        return;
      }

      event.preventDefault?.();
      const nextStep = Math.min(TOTAL_STEPS, Math.max(SELECT_INTENT_STEP, state.quoteFormStep));
      isHandlingPopStateRef.current = true;
      activeStepNumberRef.current = nextStep;

      if (!propIntent) {
        setSelectedIntent(nextStep === SELECT_INTENT_STEP ? null : state.quoteFormIntent || currentIntentRef.current);
      }

      setStep(nextStep <= SELECT_INTENT_STEP ? 1 : nextStep);
      scrollToStepAfterRender("auto");
      window.setTimeout(() => {
        isHandlingPopStateRef.current = false;
      }, 0);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      historyReadyRef.current = false;
      if (previousScrollRestorationRef.current) {
        window.history.scrollRestoration = previousScrollRestorationRef.current;
      }
    };
  }, [SELECT_INTENT_STEP, TOTAL_STEPS, getQuoteFormHistoryState, propIntent, scrollToStepAfterRender]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    scrollToActiveStep(step === SUCCESS_STEP ? "auto" : "smooth");
  }, [SUCCESS_STEP, scrollToActiveStep, step]);

  const handleIntentSelect = (intent: IntentType) => {
    setSelectedIntent(intent);
    currentIntentRef.current = intent;

    if (typeof window !== "undefined" && historyReadyRef.current && activeStepNumberRef.current === SELECT_INTENT_STEP) {
      window.history.pushState(
        getQuoteFormHistoryState(1, intent),
        "",
        window.location.href
      );
      activeStepNumberRef.current = 1;
      setStep(1);
      scrollToStepAfterRender("smooth");
      return;
    }

    goToStep(1, { history: "replace", scroll: "smooth", intent });
  };

  const handleChangeIntent = () => {
    setSelectedIntent(null);
    currentIntentRef.current = null;

    if (typeof window !== "undefined" && historyReadyRef.current) {
      window.history.replaceState(
        getQuoteFormHistoryState(SELECT_INTENT_STEP, null),
        "",
        window.location.href
      );
      activeStepNumberRef.current = SELECT_INTENT_STEP;
    }

    setStep(1);
    scrollToStepAfterRender("smooth");
  };

  // Detect intent from URL on client side (for homepage / no prop)
  useEffect(() => {
    if (!propIntent && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const intent = detectIntent(window.location.pathname, params);
      setDetectedIntent(intent);
    }
  }, [propIntent]);

  const { register, watch, trigger, setValue, setError, clearErrors, formState: { errors } } = useForm<FormData>({
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
      storageUnitSize: "Not sure",
    }
  });

  const watchedCollectionPostcode = watch("collectionPostcode");
  const watchedDeliveryPostcode = watch("deliveryPostcode");
  const watchedMoveDate = watch("moveDate");
  const watchedMoveType = watch("moveType");
  const watchedFirstName = watch("firstName");
  const watchedPhone = watch("phone");
  const watchedEmail = watch("email");
  const liveCollectionPostcode = normalisePostcodeInput(watchedCollectionPostcode);
  const liveDeliveryPostcode = normalisePostcodeInput(watchedDeliveryPostcode);
  const currentRoutePairKey = routePairKey(liveCollectionPostcode, liveDeliveryPostcode);
  const hasLiveSamePostcodeError =
    isValidUKPostcode(liveCollectionPostcode) &&
    isValidUKPostcode(liveDeliveryPostcode) &&
    isSameUKPostcode(liveCollectionPostcode, liveDeliveryPostcode);
  const routeEstimateIsCurrent = Boolean(
    routeEstimate && currentRoutePairKey && routeEstimatePairKey === currentRoutePairKey
  );
  const currentRouteEstimate = routeEstimateIsCurrent ? routeEstimate : null;
  const guidePriceIsCurrent = Boolean(
    guidePrice && currentRoutePairKey && guidePricePairKey === currentRoutePairKey
  );
  const currentGuidePrice = guidePriceIsCurrent ? guidePrice : null;
  const selectedItemTypes = splitMultiValue(watch("itemType"));
  const selectedStudentFurnitureItems = splitMultiValue(watch("smallFurnitureItems"));

  const toggleMultiValue = (field: "itemType" | "smallFurnitureItems", option: string) => {
    const currentValues = splitMultiValue(watch(field));
    const isNoneOption = /^none/i.test(option);

    let nextValues: string[];
    if (field === "smallFurnitureItems" && isNoneOption) {
      nextValues = currentValues.includes(option) ? [] : [option];
    } else {
      const valuesWithoutNone = field === "smallFurnitureItems"
        ? currentValues.filter((value) => !/^none/i.test(value))
        : currentValues;
      nextValues = valuesWithoutNone.includes(option)
        ? valuesWithoutNone.filter((value) => value !== option)
        : [...valuesWithoutNone, option];
    }

    setValue(field, joinMultiValues(nextValues), { shouldDirty: true, shouldValidate: true });
  };

  const multiOptionClass = (isSelected: boolean) =>
    `rounded-2xl border px-3 py-2 text-left text-[12px] font-black uppercase tracking-[0.12em] transition ${
      isSelected
        ? "border-accent bg-accent text-white shadow-sm"
        : "border-primary/10 bg-slate-50 text-primary hover:border-accent/50 hover:bg-white"
    }`;

  const deliveryPostcodeErrorMessage = hasLiveSamePostcodeError
    ? SAME_POSTCODE_ERROR_MESSAGE
    : errors.deliveryPostcode?.message;

  useEffect(() => {
    if (!currentRoutePairKey) {
      if (routeEstimate || guidePrice) {
        setRouteEstimate(null);
        setRouteEstimatePairKey(null);
        setGuidePrice(null);
        setGuidePricePairKey(null);
      }
      return;
    }

    if (routeEstimatePairKey && routeEstimatePairKey !== currentRoutePairKey) {
      setRouteEstimate(null);
      setRouteEstimatePairKey(null);
    }

    if (guidePricePairKey && guidePricePairKey !== currentRoutePairKey) {
      setGuidePrice(null);
      setGuidePricePairKey(null);
    }
  }, [currentRoutePairKey, guidePrice, guidePricePairKey, routeEstimate, routeEstimatePairKey]);

  const registerPostcode = (field: "collectionPostcode" | "deliveryPostcode") => {
    const registration = register(field);
    return {
      ...registration,
      inputMode: "text" as const,
      autoCapitalize: "characters",
      autoComplete: "postal-code",
      autoCorrect: "off",
      spellCheck: false,
      maxLength: 10,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = sanitizePostcodeTyping(event.target.value);
        registration.onChange(event);
      },
      onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
        const normalised = normalisePostcodeInput(event.target.value);
        setValue(field, normalised, { shouldDirty: true, shouldValidate: true });
        event.target.value = normalised;
        registration.onBlur(event);
      },
    };
  };

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
      if (data.itemDescription) details.itemDescription = data.itemDescription;
    } else if (activeIntent === "house") {
      details.bedrooms = data.bedrooms;
      details.propertyType = data.propertyType;
      details.packingRequired = data.packingRequired;
      details.floorLevel = data.floorLevel;
      details.liftAccess = data.houseLiftAccess;
      if (data.itemDescription) details.itemDescription = data.itemDescription;
    } else if (activeIntent === "student") {
      details.university = data.university;
      details.accommodationType = data.accommodationType;
      details.numberOfBoxes = data.numberOfBoxes;
      details.suitcases = data.suitcases;
      details.smallFurnitureItems = data.smallFurnitureItems;
      if (data.itemDescription) details.itemDescription = data.itemDescription;
    } else if (activeIntent === "single-item") {
      details.itemType = data.itemType;
      details.itemTypes = splitMultiValue(data.itemType);
      details.numberOfItems = data.numberOfItems;
      if (data.itemDescription) details.itemDescription = data.itemDescription;
    } else if (activeIntent === "general") {
      details.numberOfItems = data.numberOfItems;
      details.additionalHelpers = data.additionalHelpers;
      if (data.itemDescription) details.itemDescription = data.itemDescription;
    } else if (activeIntent === "storage") {
      details.storageFacility = data.storageFacility;
      details.storageUnitSize = data.storageUnitSize;
      details.storageItems = data.storageItems;
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
      numberOfBoxes: details.numberOfBoxes,
      suitcases: details.suitcases,
      smallFurnitureItems: details.smallFurnitureItems,
      collectionPostcode: data.collectionPostcode,
      deliveryPostcode: data.deliveryPostcode,
    };
  };

  const refreshGuidePreview = async (data: FormData) => {
    if (!activeIntent) return;
    const collectionPostcode = normalisePostcodeInput(data.collectionPostcode);
    const deliveryPostcode = normalisePostcodeInput(data.deliveryPostcode);
    const pairKey = routePairKey(collectionPostcode, deliveryPostcode);

    setIsCalculatingGuide(true);
    setGuidePrice(null);
    setGuidePricePairKey(null);
    setRouteEstimate(null);
    setRouteEstimatePairKey(null);

    if (!pairKey || !isValidUKPostcode(collectionPostcode) || !isValidUKPostcode(deliveryPostcode)) {
      setIsCalculatingGuide(false);
      return;
    }

    let route: any | null = null;
    try {
      const response = await fetch("/api/route-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collectionPostcode,
          deliveryPostcode,
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
    const latestPairKey = routePairKey(watch("collectionPostcode"), watch("deliveryPostcode"));
    if (latestPairKey === pairKey) {
      setRouteEstimate(route);
      setRouteEstimatePairKey(pairKey);
      setGuidePrice(guide);
      setGuidePricePairKey(pairKey);
    }
    setIsCalculatingGuide(false);
  };

  const onNextStep = async () => {
    let fields: (keyof FormData)[] = [];

    if (step === 1) {
      const collectionPostcode = normalisePostcodeInput(watch("collectionPostcode"));
      const deliveryPostcode = normalisePostcodeInput(watch("deliveryPostcode"));
      setValue("collectionPostcode", collectionPostcode, { shouldDirty: true, shouldValidate: true });
      setValue("deliveryPostcode", deliveryPostcode, { shouldDirty: true, shouldValidate: true });

      if (
        isValidUKPostcode(collectionPostcode) &&
        isValidUKPostcode(deliveryPostcode) &&
        isSameUKPostcode(collectionPostcode, deliveryPostcode)
      ) {
        setError("deliveryPostcode", { type: "manual", message: SAME_POSTCODE_ERROR_MESSAGE });
        scrollToStepAfterRender("smooth");
        return;
      } else {
        clearErrors("deliveryPostcode");
      }

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
        fields.push("itemType", "numberOfItems");
      } else if (activeIntent === "general") {
        fields.push("numberOfItems");
      } else if (activeIntent === "storage") {
        fields.push("storageItems");
      }
    } else if (step === CONTACT_STEP) {
      // Contact details step
      fields = ["firstName", "phone", "email"];
    }

    const isValid = await trigger(fields);
    if (isValid) {
      if (step === 1) {
        const currentData = {
          ...watch(),
          collectionPostcode: normalisePostcodeInput(watch("collectionPostcode")),
          deliveryPostcode: normalisePostcodeInput(watch("deliveryPostcode")),
        };
        goToStep(CONTACT_STEP);
        void refreshGuidePreview(currentData);
      } else if (step === CONTACT_STEP) {
        handleFinalSubmit(watch());
      } else {
        goToStep(step + 1);
      }
    }
  };

  useEffect(() => {
    if (step !== CONTACT_STEP || !activeIntent || abandonedQuoteConvertedRef.current) return;

    const formData = watch();
    const normalisedCollectionPostcode = normalisePostcodeInput(formData.collectionPostcode);
    const normalisedDeliveryPostcode = normalisePostcodeInput(formData.deliveryPostcode);

    if (
      !hasRecoverableContact(formData.email, formData.phone) ||
      !isValidUKPostcode(normalisedCollectionPostcode) ||
      !isValidUKPostcode(normalisedDeliveryPostcode) ||
      isSameUKPostcode(normalisedCollectionPostcode, normalisedDeliveryPostcode) ||
      !String(formData.moveDate || "").trim() ||
      !String(formData.moveType || "").trim()
    ) {
      return;
    }

    if (abandonedQuoteTimerRef.current) {
      clearTimeout(abandonedQuoteTimerRef.current);
    }

    setAbandonedQuoteStatus("saving");

    abandonedQuoteTimerRef.current = setTimeout(async () => {
      try {
        const quoteId = getOrCreateAbandonedQuoteId();
        const attribution = getAttributionData(normalisedCollectionPostcode, normalisedDeliveryPostcode);
        const submitPairKey = routePairKey(normalisedCollectionPostcode, normalisedDeliveryPostcode);
        const guidePriceForSnapshot =
          submitPairKey && guidePricePairKey === submitPairKey ? guidePrice : null;
        const details = buildDetails(formData);

        if (guidePriceForSnapshot) {
          details.guidePrice = {
            ...guidePriceForSnapshot,
            calculatedAt: new Date().toISOString(),
          };
        }

        details.attribution = {
          ...attribution,
          serviceIntent: activeIntent || "unknown",
          guidePriceDisplayed: guidePriceForSnapshot?.display || "",
          savedAtClient: new Date().toISOString(),
        };

        const response = await fetch("/api/abandoned-quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: quoteId,
            status: "abandoned",
            firstName: formData.firstName,
            email: formData.email,
            phone: formData.phone,
            collectionPostcode: normalisedCollectionPostcode,
            deliveryPostcode: normalisedDeliveryPostcode,
            moveType: formData.moveType,
            moveDate: formData.moveDate,
            serviceIntent: activeIntent || "unknown",
            currentStep: CONTACT_STEP,
            ...attribution,
            guidePriceDisplayed: guidePriceForSnapshot?.display || "",
            details,
          }),
        });

        if (!response.ok) throw new Error("Failed to save quote reminder");
        setAbandonedQuoteStatus("saved");
      } catch {
        setAbandonedQuoteStatus("error");
      }
    }, 900);

    return () => {
      if (abandonedQuoteTimerRef.current) {
        clearTimeout(abandonedQuoteTimerRef.current);
      }
    };
  }, [
    CONTACT_STEP,
    activeIntent,
    guidePrice,
    guidePricePairKey,
    step,
    watchedCollectionPostcode,
    watchedDeliveryPostcode,
    watchedEmail,
    watchedFirstName,
    watchedMoveDate,
    watchedMoveType,
    watchedPhone,
    watch,
  ]);

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
      const normalisedCollectionPostcode = normalisePostcodeInput(data.collectionPostcode);
      const normalisedDeliveryPostcode = normalisePostcodeInput(data.deliveryPostcode);
      const attribution = getAttributionData(normalisedCollectionPostcode, normalisedDeliveryPostcode);
      const submitPairKey = routePairKey(normalisedCollectionPostcode, normalisedDeliveryPostcode);

      // Build details object for service-specific fields. Route and guide
      // preview values are informational only; the server recalculates them.
      const details: Record<string, any> = buildDetails(data);
      const routeEstimateForSubmit =
        submitPairKey && routeEstimatePairKey === submitPairKey ? routeEstimate : null;
      const guidePriceForSubmit =
        submitPairKey && guidePricePairKey === submitPairKey ? guidePrice : null;
      if (routeEstimateForSubmit) details.routeEstimate = routeEstimateForSubmit;
      if (guidePriceForSubmit) details.guidePrice = { ...guidePriceForSubmit, calculatedAt: new Date().toISOString() };

      const estimatePrice = guidePriceForSubmit?.display;
      details.attribution = {
        ...attribution,
        serviceIntent: activeIntent || "unknown",
        guidePriceDisplayed: estimatePrice || "",
        submittedAtClient: new Date().toISOString(),
      };

      const payload = {
        ...data,
        collectionPostcode: normalisedCollectionPostcode,
        deliveryPostcode: normalisedDeliveryPostcode,
        ...attribution,
        serviceIntent: activeIntent || "unknown",
        guidePriceDisplayed: estimatePrice || "",
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

      const abandonedQuoteId = typeof window !== "undefined"
        ? window.localStorage.getItem("mvc_abandoned_quote_id")
        : null;
      if (abandonedQuoteId) {
        abandonedQuoteConvertedRef.current = true;
        void fetch("/api/abandoned-quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: abandonedQuoteId,
            status: "converted",
            convertedToRequestId: result.id,
            email: data.email,
            phone: data.phone,
            firstName: data.firstName,
            collectionPostcode: normalisedCollectionPostcode,
            deliveryPostcode: normalisedDeliveryPostcode,
            moveType: data.moveType,
            moveDate: data.moveDate,
            serviceIntent: activeIntent || "unknown",
            details: { convertedAtClient: new Date().toISOString() },
          }),
        }).finally(() => clearAbandonedQuoteId());
      }

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
      goToStep(SUCCESS_STEP);
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
                  {activeIntent === "storage" && "Tell us what needs collecting from storage"}
                </p>
              </div>
              {!propIntent && (
                <button
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
                  <input {...registerPostcode("collectionPostcode")} placeholder="Current office postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Delivery Postcode</label>
                  <input {...registerPostcode("deliveryPostcode")} placeholder="New office postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {deliveryPostcodeErrorMessage && <p className="text-red-500 text-xs font-bold mt-1">{deliveryPostcodeErrorMessage}</p>}
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
                  <input {...registerPostcode("collectionPostcode")} placeholder="Current postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Delivery Postcode</label>
                  <input {...registerPostcode("deliveryPostcode")} placeholder="New postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {deliveryPostcodeErrorMessage && <p className="text-red-500 text-xs font-bold mt-1">{deliveryPostcodeErrorMessage}</p>}
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
                  <input type="hidden" {...register("smallFurnitureItems")} />
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {STUDENT_FURNITURE_OPTIONS.map((option) => {
                      const isSelected = selectedStudentFurnitureItems.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => toggleMultiValue("smallFurnitureItems", option)}
                          className={multiOptionClass(isSelected)}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Other Items or Notes <span className="tracking-normal text-primary/30">(optional)</span></label>
                  <textarea {...register("itemDescription")} rows={2} placeholder="e.g. mini fridge, clothes rail, extra bags" className="w-full resize-none rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3 text-[15px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Moving From (Postcode)</label>
                  <input {...registerPostcode("collectionPostcode")} placeholder="Current postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Moving To (Postcode)</label>
                  <input {...registerPostcode("deliveryPostcode")} placeholder="New postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {deliveryPostcodeErrorMessage && <p className="text-red-500 text-xs font-bold mt-1">{deliveryPostcodeErrorMessage}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">When Do You Need to Move?</label>
                  <input type="date" {...register("moveDate")} min={today} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.moveDate && <p className="text-red-500 text-xs font-bold mt-1">{errors.moveDate.message}</p>}
                </div>
              </div>
            )}

            {/* ── FURNITURE / MULTI-ITEM FORM ── */}
            {activeIntent === "single-item" && (
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Items to Move</label>
                  <input type="hidden" {...register("itemType")} />
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {FURNITURE_ITEM_OPTIONS.map((option) => {
                      const isSelected = selectedItemTypes.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => toggleMultiValue("itemType", option)}
                          className={multiOptionClass(isSelected)}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[11px] font-semibold text-primary/45">Choose all that apply. Add quantities or extra details below.</p>
                  {errors.itemType && <p className="text-red-500 text-xs font-bold mt-1">{errors.itemType.message}</p>}
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-[0.8fr_1.2fr]">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Approx. Number of Items</label>
                    <input {...register("numberOfItems")} type="number" min={1} inputMode="numeric" placeholder="e.g. 3" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                    {errors.numberOfItems && <p className="text-red-500 text-xs font-bold mt-1">{errors.numberOfItems.message}</p>}
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Item Details <span className="tracking-normal text-primary/30">(optional)</span></label>
                    <textarea {...register("itemDescription")} rows={2} placeholder="e.g. 1 sofa, 2 wardrobes, 6 boxes" className="w-full resize-none rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3 text-[15px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Collection Postcode</label>
                  <input {...registerPostcode("collectionPostcode")} placeholder="Where are the items now?" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Delivery Postcode</label>
                  <input {...registerPostcode("deliveryPostcode")} placeholder="Where should they go?" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {deliveryPostcodeErrorMessage && <p className="text-red-500 text-xs font-bold mt-1">{deliveryPostcodeErrorMessage}</p>}
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
                  <input {...registerPostcode("collectionPostcode")} placeholder="Pickup postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Drop-off Postcode</label>
                  <input {...registerPostcode("deliveryPostcode")} placeholder="Drop-off postcode" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {deliveryPostcodeErrorMessage && <p className="text-red-500 text-xs font-bold mt-1">{deliveryPostcodeErrorMessage}</p>}
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-[0.8fr_1.2fr]">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Number of Items (approximate)</label>
                    <input {...register("numberOfItems")} type="number" min={1} inputMode="numeric" placeholder="e.g. 5" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                    {errors.numberOfItems && <p className="text-red-500 text-xs font-bold mt-1">{errors.numberOfItems.message}</p>}
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">What Are You Moving? <span className="tracking-normal text-primary/30">(optional)</span></label>
                    <textarea {...register("itemDescription")} rows={2} placeholder="e.g. sofa, boxes, wardrobe, appliances" className="w-full resize-none rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3 text-[15px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  </div>
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
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Storage Postcode</label>
                  <input {...registerPostcode("collectionPostcode")} placeholder={`Full UK postcode, e.g. ${UK_POSTCODE_EXAMPLE}`} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.collectionPostcode && <p className="text-red-500 text-xs font-bold mt-1">{errors.collectionPostcode.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Delivery Postcode</label>
                  <input {...registerPostcode("deliveryPostcode")} placeholder={`Full UK postcode, e.g. ${UK_POSTCODE_EXAMPLE}`} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {deliveryPostcodeErrorMessage && <p className="text-red-500 text-xs font-bold mt-1">{deliveryPostcodeErrorMessage}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Move Date</label>
                  <input type="date" {...register("moveDate")} min={today} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                  {errors.moveDate && <p className="text-red-500 text-xs font-bold mt-1">{errors.moveDate.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">What Needs Moving?</label>
                  <textarea {...register("storageItems")} placeholder="e.g. boxes, sofa, bed, appliances, furniture" rows={3} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 resize-none" />
                  {errors.storageItems && <p className="text-red-500 text-xs font-bold mt-1">{errors.storageItems.message}</p>}
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Storage Unit Size</label>
                  <select {...register("storageUnitSize")} className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 appearance-none">
                    <option value="Not sure">Not sure</option>
                    <option value="Small locker">Small locker</option>
                    <option value="25 sq ft">25 sq ft</option>
                    <option value="50 sq ft">50 sq ft</option>
                    <option value="75 sq ft">75 sq ft</option>
                    <option value="100 sq ft+">100 sq ft+</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Storage Facility Name <span className="tracking-normal text-primary/30">(optional)</span></label>
                  <input {...register("storageFacility")} placeholder="e.g. Big Yellow, Shurgard, Access Self Storage" className="w-full rounded-2xl border border-primary/10 bg-slate-50/80 px-4 py-3.5 text-[16px] font-bold text-primary outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10" />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={onNextStep}
              disabled={hasLiveSamePostcodeError}
              className="btn-orange w-full rounded-2xl py-4 font-black uppercase tracking-widest disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
            </button>
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
                <p className="text-[10px] text-text-secondary mt-1 leading-relaxed">Your details stay private until you accept a quote and pay the booking deposit. The deposit is deducted from the mover’s quote.</p>
              </div>
            </div>

            {canShowGuidePrice && (
              <div className="rounded-[1.5rem] border border-accent/20 bg-gradient-to-br from-accent/10 via-white to-primary/5 p-4 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary/45">Guide price range</p>
                <div className="mt-1 flex items-end justify-between gap-3">
                  <p className="text-3xl font-black tracking-tighter text-primary">
                    {isCalculatingGuide ? "Checking…" : currentGuidePrice?.display || "Guide pending"}
                  </p>
                  <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-accent shadow-sm">No obligation</span>
                </div>
                {currentRouteEstimate && Number(currentRouteEstimate.distanceMeters) > 0 && (
                  <p className="mt-1 text-[11px] font-bold text-primary/65">
                    Route guide: {formatRouteGuideForCustomer(currentRouteEstimate)}
                  </p>
                )}
                {currentRouteEstimate?.mapUrl && Number(currentRouteEstimate.distanceMeters) <= 0 && (
                  <Link
                    href={currentRouteEstimate.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex text-[11px] font-black uppercase tracking-wider text-accent underline-offset-4 hover:underline"
                  >
                    View postcode route on map
                  </Link>
                )}
                <p className="mt-2 text-xs font-medium leading-relaxed text-text-secondary">
                  This is only a guide price. A verified mover will review your details and send an accurate quote before you book.
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
            <div className="rounded-2xl border border-primary/10 bg-slate-50/80 p-3 text-[10px] font-semibold leading-relaxed text-text-secondary">
              We use these details for this quote request and to send a reminder if you leave before finishing. No marketing spam.
              {abandonedQuoteStatus === "saving" && <span className="ml-1 font-black text-primary">Saving quote link…</span>}
              {abandonedQuoteStatus === "saved" && <span className="ml-1 font-black text-success">Quote reminder saved.</span>}
              {abandonedQuoteStatus === "error" && <span className="ml-1 font-black text-amber-600">Reminder could not be saved.</span>}
            </div>
            <button onClick={onNextStep} disabled={isSubmitting} className="btn-orange w-full rounded-2xl py-4 font-black uppercase tracking-widest disabled:opacity-50">
              {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "Verify Email"}
            </button>
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
            <button onClick={handleVerifyOTP} disabled={isSubmitting} className="btn-orange w-full rounded-2xl py-4 font-black uppercase tracking-widest">
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
