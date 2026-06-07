"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronRight, Loader2, CheckCircle2, Mail, ShieldCheck, MapPin, Zap, Lock, Check } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formSchema = z.object({
  collectionPostcode: z.string().min(5, "Invalid postcode"),
  deliveryPostcode: z.string().min(5, "Invalid postcode"),
  moveDate: z.string().min(1, "Required"),
  moveType: z.string().min(1, "Required"),
  firstName: z.string().min(2, "Required").optional(),
  phone: z.string().regex(/^(?:0|(?:\+44))7\d{9}$/, "Invalid UK mobile number").optional(),
  email: z.string().email("Invalid email").optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null);

  const { register, watch, trigger, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { moveType: "" }
  });

  const calculateEstimate = (data: FormData) => {
    const moveTypeBase: Record<string, [number, number]> = {
      "Single Item": [50, 80], "Furniture Collection": [60, 100], "Studio Flat": [80, 130],
      "1 Bed Flat": [100, 160], "2 Bed House": [180, 280], "3 Bed House": [300, 450],
      "4+ Bed House": [500, 850], "Office Move": [200, 500], "Other": [100, 300]
    };
    const range = moveTypeBase[data.moveType] || [100, 200];
    return { min: range[0], max: range[1] };
  };

  const onNextStep = async () => {
    let fields: (keyof FormData)[] = [];
    if (step === 1) fields = ["collectionPostcode", "deliveryPostcode", "moveDate"];
    if (step === 2) fields = ["moveType"];
    if (step === 4) fields = ["firstName", "phone", "email"];
    
    const isValid = await trigger(fields);
    if (isValid) {
      if (step === 2) {
        setEstimate(calculateEstimate(watch()));
        setStep(3);
      } else if (step === 4) {
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
    if (value && index < 3) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) document.getElementById(`otp-${index - 1}`)?.focus();
  };

  const handleFinalSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/move-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.details || 'Failed');
      setRequestId(result.id);
      setStep(5);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    const code = otp.join("");
    if (code.length < 4) { setOtpError("Required"); return; }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, otp: code }),
      });
      if (!response.ok) throw new Error('Failed');
      setStep(6);
    } catch (error: any) {
      setOtpError("Invalid Code");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl lg:rounded-[2rem] border border-border overflow-hidden shadow-2xl" id="quote-form">
      {step < 6 && (
        <div className="bg-gray-50/50 px-6 py-3 border-b border-border flex justify-end">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={cn("h-1 w-6 lg:w-8 rounded-full transition-all", i <= step ? "bg-accent" : "bg-gray-200")} />
            ))}
          </div>
        </div>
      )}

      <div className="p-6 lg:p-8">
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase text-accent">Step 1 — Details</p>
              <h2 className="text-3xl lg:text-4xl font-black text-primary uppercase">Start Move</h2>
            </div>
            <div className="space-y-3">
              <input {...register("collectionPostcode")} placeholder="Collection Postcode" className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
              <input {...register("deliveryPostcode")} placeholder="Delivery Postcode" className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
              <input type="date" {...register("moveDate")} className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
            </div>
            <button onClick={onNextStep} className="btn-orange w-full py-5 rounded-xl font-black uppercase tracking-widest transition-all">Continue</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-primary uppercase text-center">Move Type</h2>
            <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
              {["Single Item", "Studio Flat", "1 Bed Flat", "2 Bed House", "3 Bed House", "4+ Bed House", "Office Move", "Other"].map(type => (
                <button key={type} onClick={() => { setValue("moveType", type); onNextStep(); }} className={cn("p-4 text-left rounded-xl border-2 border-border font-bold text-sm uppercase", watch("moveType") === type ? "border-accent bg-accent/5" : "")}>
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && estimate && (
          <div className="space-y-8 text-center py-4">
            <div className="bg-primary text-white p-10 rounded-[2.5rem] shadow-xl">
               <p className="text-[10px] font-black uppercase opacity-40 mb-2">Estimate</p>
               <p className="text-5xl font-black tracking-tighter">£{estimate.min}–{estimate.max}</p>
            </div>
            <button onClick={onNextStep} className="btn-orange w-full py-5 rounded-xl font-black uppercase tracking-widest shadow-xl">Verified Match</button>
            <button onClick={() => setStep(2)} className="text-[10px] font-black uppercase opacity-30">Back</button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-primary uppercase text-center">Contact</h2>
            <div className="space-y-3">
              <input {...register("firstName")} placeholder="Name" className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
              <input {...register("phone")} placeholder="Mobile" className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
              <input {...register("email")} placeholder="Email" className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
            </div>
            <button onClick={onNextStep} disabled={isSubmitting} className="btn-orange w-full py-5 rounded-xl font-black uppercase tracking-widest disabled:opacity-50">
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Verify Now"}
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-8 text-center">
            <h2 className="text-3xl font-black text-primary uppercase">Verify</h2>
            <div className="flex justify-center gap-3">
              {otp.map((digit, i) => (
                <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleKeyDown(i, e)} className={cn("w-12 h-16 bg-gray-50 border-2 rounded-xl text-center text-3xl font-black outline-none", otpError ? "border-red-500" : "border-border focus:border-accent")} />
              ))}
            </div>
            <button onClick={handleVerifyOTP} disabled={isSubmitting} className="btn-orange w-full py-5 rounded-xl font-black uppercase tracking-widest">
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Confirm"}
            </button>
          </div>
        )}

        {step === 6 && (
          <div className="text-center py-6 space-y-6">
            <CheckCircle2 size={48} className="text-success mx-auto" />
            <h2 className="text-3xl font-black text-primary uppercase">Success</h2>
            <div className="bg-[#F9F9F7] p-6 rounded-2xl text-left text-xs font-bold text-primary/70 space-y-2 uppercase">
              <p>✓ One mover only</p>
              <p>✓ Direct contact shortly</p>
            </div>
            <Link href="/" className="btn-outline w-full block py-4 font-black uppercase text-xs rounded-xl">Home</Link>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-3 border-t border-border flex justify-center gap-6 text-[8px] font-black uppercase text-primary/30">
        <span>✓ Secure</span>
        <span>✓ England</span>
        <span>✓ 1-to-1 Match</span>
      </div>
    </div>
  );
}
