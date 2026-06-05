"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronRight, Loader2, CheckCircle2, Info } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formSchema = z.object({
  collectionPostcode: z.string().min(5, "Invalid UK postcode"),
  deliveryPostcode: z.string().min(5, "Invalid UK postcode"),
  moveDate: z.string().min(1, "Required"),
  propertyType: z.string().min(1, "Required"),
  numRooms: z.string().min(1, "Required"),
  specialItems: z.array(z.string()).optional(),
  packingService: z.string(),
  loadingHelp: z.string(),
  firstName: z.string().min(2, "Required").optional(),
  lastName: z.string().min(2, "Required").optional(),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().min(10, "Invalid phone number").optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null);

  const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm<FormData>({
    defaultValues: {
      specialItems: [],
      packingService: "No",
      loadingHelp: "Yes",
    }
  });

  const calculateEstimate = (data: FormData) => {
    // Logic from prompt:
    // Base price by property size
    const basePrices: Record<string, [number, number]> = {
      "Studio flat": [80, 130],
      "1-bed flat": [80, 130],
      "2-bed flat": [120, 200],
      "3-bed flat": [180, 280],
      "1-bed house": [150, 250],
      "2-bed house": [150, 250],
      "3-bed house": [220, 350],
      "4-bed house": [300, 500],
      "5+ bed house": [450, 800],
      "Office": [200, 400],
      "Storage unit": [80, 150],
      "Other": [100, 300]
    };

    let [min, max] = basePrices[data.propertyType] || [100, 200];

    // Special items uplift
    const specialItemPrices: Record<string, [number, number]> = {
      "Piano": [80, 120],
      "American fridge": [40, 60],
      "Hot tub": [100, 200],
      "Pool table": [80, 150],
      "Safe": [50, 100]
    };

    data.specialItems?.forEach(item => {
      if (specialItemPrices[item]) {
        min += specialItemPrices[item][0];
        max += specialItemPrices[item][1];
      }
    });

    // Packing uplift
    if (data.packingService === "Yes") {
      min *= 1.25;
      max *= 1.25;
    }

    // Final range adjustment (prompt says display as min * 0.85 and max * 1.15)
    return {
      min: Math.round(min * 0.85),
      max: Math.round(max * 1.15)
    };
  };

  const onNextStep = async () => {
    const fieldsToValidate = step === 1 
      ? ["collectionPostcode", "deliveryPostcode", "moveDate", "propertyType", "numRooms"] as const
      : [];
    
    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) {
      if (step === 1) {
        setEstimate(calculateEstimate(watch()));
      }
      setStep(step + 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setStep(4); // Success screen
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-border overflow-hidden" id="quote-form">
      {/* Progress Bar */}
      {step < 4 && (
        <div className="bg-gray-50 border-b border-border px-6 py-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Step {step} of 3</span>
            <span className="text-xs text-text-secondary">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-500 ease-out" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">Tell us about your move</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-primary">Collection Postcode</label>
                <input 
                  {...register("collectionPostcode")}
                  placeholder="e.g. SW1A 1AA"
                  className={cn("w-full p-3 border rounded-md focus:ring-2 focus:ring-accent outline-none", errors.collectionPostcode ? "border-red-500" : "border-border")}
                />
                {errors.collectionPostcode && <p className="text-red-500 text-xs">{errors.collectionPostcode.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-primary">Delivery Postcode</label>
                <input 
                  {...register("deliveryPostcode")}
                  placeholder="e.g. M1 1AE"
                  className={cn("w-full p-3 border rounded-md focus:ring-2 focus:ring-accent outline-none", errors.deliveryPostcode ? "border-red-500" : "border-border")}
                />
                {errors.deliveryPostcode && <p className="text-red-500 text-xs">{errors.deliveryPostcode.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary">Move Date</label>
              <input 
                type="date"
                {...register("moveDate")}
                className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-accent outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-primary">Property Type</label>
                <select 
                  {...register("propertyType")}
                  className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-accent outline-none bg-white"
                >
                  <option value="">Select type...</option>
                  <option value="Studio flat">Studio flat</option>
                  <option value="1-bed flat">1-bed flat</option>
                  <option value="2-bed flat">2-bed flat</option>
                  <option value="1-bed house">1-bed house</option>
                  <option value="2-bed house">2-bed house</option>
                  <option value="3-bed house">3-bed house</option>
                  <option value="4-bed house">4-bed house</option>
                  <option value="Office">Office</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-primary">Rooms being moved</label>
                <select 
                  {...register("numRooms")}
                  className="w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-accent outline-none bg-white"
                >
                  <option value="1">1 Room</option>
                  <option value="2">2 Rooms</option>
                  <option value="3">3 Rooms</option>
                  <option value="4">4 Rooms</option>
                  <option value="5+">5+ Rooms</option>
                </select>
              </div>
            </div>

            <button onClick={onNextStep} className="btn-orange w-full flex items-center justify-center gap-2 text-lg py-4">
              Get Instant Estimate <ChevronRight size={20} />
            </button>
          </div>
        )}

        {step === 2 && estimate && (
          <div className="space-y-8 py-4">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-primary">Your Instant Estimate</h2>
              <p className="text-text-secondary">Based on your details, local man & van companies typically charge:</p>
              
              <div className="bg-orange-50 border-2 border-accent/20 rounded-2xl p-8 my-6">
                <span className="text-5xl md:text-6xl font-extrabold text-accent">£{estimate.min} – £{estimate.max}</span>
                <p className="text-sm text-accent/80 font-medium mt-2">This is an estimate. Real quotes may vary.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-text-secondary">
                <Info size={18} className="text-primary shrink-0 mt-0.5" />
                <p>Only once you agree the price looks right do we match you with local movers.</p>
              </div>
              
              <button onClick={onNextStep} className="btn-orange w-full text-lg py-4">
                Yes, send me real quotes →
              </button>
              <button onClick={() => setStep(1)} className="w-full text-text-secondary text-sm font-medium hover:underline">
                Edit my details
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">Final Step: Contact Details</h2>
            <p className="text-text-secondary -mt-4">Where should we send your quotes?</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-primary">First Name</label>
                <input {...register("firstName")} className="w-full p-3 border border-border rounded-md" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-text-primary">Last Name</label>
                <input {...register("lastName")} className="w-full p-3 border border-border rounded-md" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary">Email Address</label>
              <input type="email" {...register("email")} className="w-full p-3 border border-border rounded-md" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary">Mobile Number</label>
              <input type="tel" {...register("phone")} className="w-full p-3 border border-border rounded-md" required />
            </div>

            <div className="bg-gray-50 p-4 rounded-md text-xs text-text-secondary">
              By clicking below, you agree to our Terms & Privacy Policy. Your details are only shared with up to 5 vetted movers.
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-orange w-full flex items-center justify-center gap-2 text-lg py-4"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit and get my quotes"}
            </button>
          </form>
        )}

        {step === 4 && (
          <div className="text-center py-10 space-y-6">
            <div className="flex justify-center">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle2 size={64} className="text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-primary">Request Received!</h2>
            <p className="text-lg text-text-secondary max-w-sm mx-auto">
              We've sent your request to vetted movers in your area. Most customers receive their first quotes within 30 minutes.
            </p>
            <div className="pt-4">
              <Link href="/" className="btn-outline">Back to Homepage</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
