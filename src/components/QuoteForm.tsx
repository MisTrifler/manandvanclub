"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronRight, Loader2, CheckCircle2, Info, ChevronLeft } from "lucide-react";
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
  packingService: z.enum(["Yes", "No", "Not sure"]),
  loadingHelp: z.enum(["Yes", "No"]),
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

  const { register, handleSubmit, watch, formState: { errors }, trigger, setValue } = useForm<FormData>({
    defaultValues: {
      specialItems: [],
      packingService: "No",
      loadingHelp: "Yes",
    }
  });

  const calculateEstimate = (data: FormData) => {
    // Logic from prompt:
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
      "Safe": [50, 100],
      "Washing machine": [15, 30],
      "Fridge freezer": [15, 30]
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

    return {
      min: Math.round(min * 0.85),
      max: Math.round(max * 1.15)
    };
  };

  const onNextStep = async () => {
    let fields: any[] = [];
    if (step === 1) fields = ["collectionPostcode", "deliveryPostcode", "moveDate", "propertyType", "numRooms", "packingService", "loadingHelp"];
    
    const isValid = await trigger(fields);
    if (isValid) {
      if (step === 1) {
        setEstimate(calculateEstimate(watch()));
      }
      setStep(step + 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setStep(4);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-border overflow-hidden" id="quote-form">
      {step < 4 && (
        <div className="bg-gray-50 border-b border-border px-6 py-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Step {step} of 3</span>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className={cn("h-1.5 w-8 rounded-full transition-colors", i <= step ? "bg-accent" : "bg-gray-200")} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-primary">Get Your Free Quotes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-text-primary">Collection Postcode</label>
                <input {...register("collectionPostcode")} placeholder="e.g. SW1A 1AA" className={cn("w-full p-3 border rounded-md outline-none focus:border-accent", errors.collectionPostcode ? "border-red-500" : "border-border")} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-text-primary">Delivery Postcode</label>
                <input {...register("deliveryPostcode")} placeholder="e.g. M1 1AE" className={cn("w-full p-3 border rounded-md outline-none focus:border-accent", errors.deliveryPostcode ? "border-red-500" : "border-border")} />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-text-primary">Move Date</label>
              <input type="date" {...register("moveDate")} className="w-full p-3 border border-border rounded-md outline-none focus:border-accent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-text-primary">Property Type</label>
                <select {...register("propertyType")} className="w-full p-3 border border-border rounded-md bg-white">
                  <option value="">Select...</option>
                  <option value="Studio flat">Studio flat</option>
                  <option value="1-bed flat">1-bed flat</option>
                  <option value="2-bed flat">2-bed flat</option>
                  <option value="3-bed flat">3-bed flat</option>
                  <option value="1-bed house">1-bed house</option>
                  <option value="2-bed house">2-bed house</option>
                  <option value="3-bed house">3-bed house</option>
                  <option value="4-bed house">4-bed house</option>
                  <option value="5+ bed house">5+ bed house</option>
                  <option value="Office">Office</option>
                  <option value="Storage unit">Storage unit</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-text-primary">Number of Rooms</label>
                <select {...register("numRooms")} className="w-full p-3 border border-border rounded-md bg-white">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-text-primary block">Large items requiring special handling?</label>
              <div className="grid grid-cols-2 gap-2">
                {["Piano", "Washing machine", "Fridge freezer", "American fridge", "Hot tub", "Pool table", "Safe"].map(item => (
                  <label key={item} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input type="checkbox" value={item} {...register("specialItems")} className="accent-accent" />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-primary block">Packing service needed?</label>
                <div className="flex gap-4">
                  {["Yes", "No", "Not sure"].map(opt => (
                    <label key={opt} className="flex items-center gap-1 text-sm cursor-pointer">
                      <input type="radio" value={opt} {...register("packingService")} className="accent-accent" /> {opt}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-primary block">Loading help needed?</label>
                <div className="flex gap-4">
                  {["Yes", "No"].map(opt => (
                    <label key={opt} className="flex items-center gap-1 text-sm cursor-pointer">
                      <input type="radio" value={opt} {...register("loadingHelp")} className="accent-accent" /> {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={onNextStep} className="btn-orange w-full flex items-center justify-center gap-2 text-lg py-4">
              Get My Free Quotes →
            </button>
          </div>
        )}

        {step === 2 && estimate && (
          <div className="space-y-6 text-center py-4">
            <h2 className="text-2xl font-bold text-primary">Your Instant Estimate</h2>
            <p className="text-text-secondary">Based on your move details, local man & van companies typically charge:</p>
            
            <div className="bg-orange-50 border-2 border-accent/20 rounded-2xl p-8">
              <span className="text-5xl font-extrabold text-accent">£{estimate.min} – £{estimate.max}</span>
              <p className="text-sm text-accent/80 font-medium mt-2">This is an estimate only. Your confirmed quotes may vary.</p>
            </div>

            <div className="space-y-4 pt-4">
              <button onClick={onNextStep} className="btn-orange w-full text-lg py-4">
                Yes, send me real quotes →
              </button>
              <button onClick={() => setStep(1)} className="flex items-center justify-center gap-1 w-full text-text-secondary text-sm font-medium hover:underline">
                <ChevronLeft size={16} /> Edit my details
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <h2 className="text-2xl font-bold text-primary">Nearly there!</h2>
            <p className="text-text-secondary">Enter your contact details to receive your confirmed quotes.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold">First Name</label>
                <input {...register("firstName")} className="w-full p-3 border border-border rounded-md" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold">Last Name</label>
                <input {...register("lastName")} className="w-full p-3 border border-border rounded-md" required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold">Mobile Number</label>
              <input type="tel" {...register("phone")} className="w-full p-3 border border-border rounded-md" required />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold">Email Address</label>
              <input type="email" {...register("email")} className="w-full p-3 border border-border rounded-md" required />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-[11px] text-primary/70 leading-relaxed">
              Your details are only shared with vetted local movers. We never sell your data. By clicking below you agree to our Terms & Privacy Policy.
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-orange w-full flex items-center justify-center gap-2 text-lg py-4">
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit and get my quotes"}
            </button>
          </form>
        )}

        {step === 4 && (
          <div className="text-center py-10 space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 size={80} className="text-success" />
            </div>
            <h2 className="text-3xl font-bold text-primary">Success!</h2>
            <p className="text-lg text-text-secondary max-w-sm mx-auto">
              Your request has been sent to local movers. You'll receive your first quotes via email and SMS shortly.
            </p>
            <div className="pt-4">
              <a href="/" className="btn-outline">Return Home</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
