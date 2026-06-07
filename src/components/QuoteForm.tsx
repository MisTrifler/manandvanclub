"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChevronRight, Loader2, CheckCircle2, Info, ChevronLeft, Phone, Mail, ShieldCheck, MapPin, Zap, Lock, Check } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
  const [emailSent, setEmailSent] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null);

  const { register, handleSubmit, watch, trigger, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      moveType: "",
    }
  });

  const calculateEstimate = (data: FormData) => {
    const moveTypeBase: Record<string, [number, number]> = {
      "Single Item": [50, 80],
      "Furniture Collection": [60, 100],
      "Studio Flat": [80, 130],
      "1 Bed Flat": [100, 160],
      "2 Bed House": [180, 280],
      "3 Bed House": [300, 450],
      "4+ Bed House": [500, 850],
      "Office Move": [200, 500],
      "Other": [100, 300]
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
      if (step === 2) setEstimate(calculateEstimate(watch()));
      if (step === 4) {
        // CALL THE REAL API
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

    // Auto-focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
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
      if (!response.ok) {
        throw new Error(result.details || result.message || 'Failed to save request');
      }
      
      setRequestId(result.id);
      setStep(5); // Go to verification step
    } catch (error: any) {
      alert(`Submission Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOTP = async () => {
    const code = otp.join("");
    if (code.length < 4) {
      setOtpError("Please enter the full 4-digit code");
      return;
    }

    setIsSubmitting(true);
    setOtpError(null);
    
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, otp: code }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Verification failed');
      }

      setStep(6);
    } catch (error: any) {
      setOtpError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative z-20 bg-white rounded-2xl lg:rounded-[2rem] shadow-[0_40px_80px_-16px_rgba(0,0,0,0.1)] border border-border overflow-hidden" id="quote-form">
      {/* Progress */}
      {step < 6 && (
        <div className="bg-gray-50/50 px-6 lg:px-8 py-3 lg:py-4 flex items-center justify-end border-b border-border">
          <div className="flex gap-1.5 lg:gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={cn("h-1 lg:h-1.5 w-6 lg:w-10 rounded-full transition-all duration-1000", i <= step ? "bg-accent" : "bg-gray-200")} />
            ))}
          </div>
        </div>
      )}

      <div className="p-6 lg:p-10">
        {step === 1 && (
          <div className="space-y-6 lg:space-y-10">
            <div className="space-y-2">
              <p className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest text-accent">Step 1 of 3 — Tell us about your move</p>
              <h2 className="text-3xl lg:text-4xl font-black text-primary tracking-tighter leading-none uppercase">Start Your Move</h2>
              <p className="text-text-secondary font-bold text-sm lg:text-lg">Verified local movers ready to help.</p>
            </div>
            <div className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-1">
                  <label className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Collection</label>
                  <input {...register("collectionPostcode")} placeholder="e.g. SW1A 1AA" className="w-full p-4 lg:p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-xl lg:rounded-[1.25rem] outline-none font-black text-base lg:text-lg transition-all shadow-inner" />
                  {errors.collectionPostcode && <p className="text-red-500 text-[10px] font-black ml-1 uppercase tracking-widest">{errors.collectionPostcode.message}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Delivery</label>
                  <input {...register("deliveryPostcode")} placeholder="e.g. M1 1AE" className="w-full p-4 lg:p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-xl lg:rounded-[1.25rem] outline-none font-black text-base lg:text-lg transition-all shadow-inner" />
                  {errors.deliveryPostcode && <p className="text-red-500 text-[10px] font-black ml-1 uppercase tracking-widest">{errors.deliveryPostcode.message}</p>}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Move Date</label>
                <input type="date" {...register("moveDate")} className="w-full p-4 lg:p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-xl lg:rounded-[1.25rem] outline-none font-black text-base lg:text-lg transition-all shadow-inner" />
                {errors.moveDate && <p className="text-red-500 text-[10px] font-black ml-1 uppercase tracking-widest">{errors.moveDate.message}</p>}
              </div>
            </div>
            <div className="space-y-3">
              <button onClick={onNextStep} className="btn-orange w-full py-4 lg:py-6 rounded-xl lg:rounded-[1.5rem] flex items-center justify-center gap-3 text-lg lg:text-xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-accent/30 hover:scale-[1.02] active:scale-95 transition-all">
                Continue <ChevronRight size={24} />
              </button>
              <p className="text-[8px] lg:text-[10px] text-center font-bold text-text-secondary uppercase tracking-widest opacity-60">
                No payment required at this stage. Details stay private until match.
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-primary tracking-tighter uppercase leading-none text-center">Move Type</h2>
            <div className="grid grid-cols-1 gap-3 max-h-[450px] overflow-y-auto pr-3 custom-scrollbar">
              {["Single Item", "Furniture Collection", "Studio Flat", "1 Bed Flat", "2 Bed House", "3 Bed House", "4+ Bed House", "Office Move", "Other"].map(type => (
                <button 
                  key={type}
                  type="button"
                  onClick={() => { setValue("moveType", type); onNextStep(); }}
                  className={cn("p-6 text-left rounded-[1.25rem] border-2 border-border font-black text-primary hover:border-accent hover:bg-accent/5 transition-all flex justify-between items-center group shadow-sm", watch("moveType") === type ? "border-accent bg-accent/5" : "")}
                >
                  <span className="uppercase tracking-tight text-sm">{type}</span>
                  <div className="bg-white p-2 rounded-lg group-hover:bg-accent group-hover:text-white shadow-sm transition-all text-accent">
                    <ChevronRight size={18} />
                  </div>
                </button>
              ))}
            </div>
            {errors.moveType && <p className="text-red-500 text-[10px] font-black text-center uppercase tracking-widest">{errors.moveType.message}</p>}
            <button onClick={() => setStep(1)} className="w-full text-text-secondary text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-1 opacity-40 hover:opacity-100 transition-opacity">Back to Start</button>
          </div>
        )}

        {step === 3 && estimate && (
          <div className="space-y-12 text-center py-6">
            <div className="space-y-3">
              <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] leading-none">Estimated Move Value</h2>
              <p className="text-text-secondary font-black text-lg uppercase tracking-tighter">Standard Marketplace Rates</p>
            </div>
            <div className="bg-primary text-white p-16 rounded-[4rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-48 h-48 bg-accent opacity-10 rounded-full -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-1000" />
               <div className="relative z-10">
                 <span className="text-7xl md:text-8xl font-black tracking-tighter tabular-nums leading-none">£{estimate.min}–{estimate.max}</span>
                 <div className="mt-8 flex items-center justify-center gap-3 text-accent text-[10px] font-black uppercase tracking-[0.3em]">
                   <ShieldCheck size={20} />
                   Verified Estimates
                 </div>
               </div>
            </div>
            <div className="flex flex-col gap-5">
              <button onClick={onNextStep} className="btn-orange w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-lg shadow-2xl shadow-accent/40 hover:scale-105 active:scale-95 transition-all">
                Verified Match
              </button>
              <button onClick={() => setStep(2)} className="text-text-secondary text-[10px] font-black uppercase tracking-[0.3em] hover:text-primary transition-colors opacity-40 hover:opacity-100">Edit Details</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-10">
            <div className="space-y-3 text-center">
              <h2 className="text-4xl font-black text-primary tracking-tighter uppercase leading-none">Your Details</h2>
              <p className="text-text-secondary font-bold">To connect you with your exclusive mover.</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">First Name</label>
                <input {...register("firstName")} className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-[1.25rem] font-black text-lg transition-all shadow-inner" placeholder="e.g. Alex Smith" />
                {errors.firstName && <p className="text-red-500 text-[10px] font-black ml-1 uppercase tracking-widest">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">UK Mobile</label>
                <input {...register("phone")} className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-[1.25rem] font-black text-lg transition-all shadow-inner" placeholder="07XXX XXXXXX" />
                {errors.phone && <p className="text-red-500 text-[10px] font-black ml-1 uppercase tracking-widest">{errors.phone.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 ml-1">Email</label>
                <input {...register("email")} className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-accent focus:bg-white rounded-[1.25rem] font-black text-lg transition-all shadow-inner" placeholder="alex@example.com" />
                {errors.email && <p className="text-red-500 text-[10px] font-black ml-1 uppercase tracking-widest">{errors.email.message}</p>}
              </div>
            </div>

            {/* Spam Protection Placeholder */}
            <div className="bg-gray-50 border border-border p-4 rounded-xl text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Secure Verification Protected by reCAPTCHA</p>
            </div>

            <button onClick={onNextStep} disabled={isSubmitting} className="btn-orange w-full py-7 rounded-[1.5rem] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl transition-all hover:scale-[1.02] active:scale-95">
              {isSubmitting ? <Loader2 className="animate-spin" /> : <>Send Verification Link <Mail size={22} className="fill-white" /></>}
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-10 text-center">
            <div className="bg-accent/10 w-28 h-28 rounded-[2.5rem] flex items-center justify-center mx-auto text-accent mb-6 animate-pulse">
              <Mail size={48} />
            </div>
            <div className="space-y-3">
              <h2 className="text-4xl font-black text-primary tracking-tighter uppercase leading-none">Verify Your Email</h2>
              <p className="text-text-secondary font-bold leading-relaxed px-4 italic">
                We've sent a 4-digit code to {watch("email")}
              </p>
            </div>
            
            <div className="flex justify-center gap-4">
              {otp.map((digit, i) => (
                <input 
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={cn(
                    "w-16 h-24 bg-gray-50 border-3 rounded-[1.5rem] text-center text-4xl font-black outline-none transition-all shadow-inner",
                    otpError ? "border-red-500 bg-red-50" : "border-border focus:border-accent focus:bg-white"
                  )} 
                />
              ))}
            </div>

            {otpError && (
              <p className="text-red-500 text-xs font-black uppercase tracking-widest">{otpError}</p>
            )}

            <div className="space-y-8">
               <button onClick={handleVerifyOTP} disabled={isSubmitting} className="btn-orange w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 text-lg shadow-2xl shadow-accent/20 transition-all hover:scale-105 active:scale-95">
                 {isSubmitting ? <Loader2 className="animate-spin" /> : "Confirm Verification"}
               </button>
               <div className="flex flex-col gap-3">
                 <button type="button" className="text-accent font-black uppercase tracking-widest text-[10px] hover:underline">Resend Email</button>
                 <p className="text-[9px] text-text-secondary font-black uppercase tracking-widest opacity-30">Verification expires in 30:00</p>
               </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="text-center py-10 space-y-10">
            <div className="bg-success/10 w-32 h-32 rounded-full flex items-center justify-center mx-auto text-success mb-6 relative">
              <div className="absolute inset-0 bg-success/20 rounded-full animate-ping opacity-20" />
              <CheckCircle2 size={64} />
            </div>
            <div className="space-y-4">
              <h2 className="text-5xl font-black text-primary tracking-tighter uppercase leading-none">Request Submitted</h2>
              <p className="text-xl text-text-secondary font-bold max-w-sm mx-auto leading-relaxed">
                Your email has been verified and your move request is now active.
              </p>
            </div>
            <div className="bg-[#F9F9F7] p-10 rounded-[3rem] border border-border/50 text-left space-y-6 shadow-inner">
               <div className="flex items-start gap-5">
                 <div className="bg-accent text-white rounded-full p-2 mt-1 shrink-0 shadow-lg shadow-accent/20"><Check size={16} strokeWidth={4}/></div>
                 <p className="text-lg font-black text-primary leading-tight uppercase tracking-tighter">Exclusive Matching: <span className="text-text-secondary font-medium normal-case text-base">Your request will be offered to one approved mover only.</span></p>
               </div>
               <div className="flex items-start gap-5">
                 <div className="bg-accent text-white rounded-full p-2 mt-1 shrink-0 shadow-lg shadow-accent/20"><Check size={16} strokeWidth={4}/></div>
                 <p className="text-lg font-black text-primary leading-tight uppercase tracking-tighter">Verified Mover: <span className="text-text-secondary font-medium normal-case text-base">An approved local mover will contact you shortly.</span></p>
               </div>
               <div className="flex items-start gap-5">
                 <div className="bg-accent text-white rounded-full p-2 mt-1 shrink-0 shadow-lg shadow-accent/20"><Check size={16} strokeWidth={4}/></div>
                 <p className="text-lg font-black text-primary leading-tight uppercase tracking-tighter">No Obligation: <span className="text-text-secondary font-medium normal-case text-base">You're free to accept or decline any quote provided.</span></p>
               </div>
            </div>
            <div className="pt-8">
              <a href="/" className="btn-outline px-16 py-6 font-black uppercase tracking-[0.3em] text-sm rounded-2xl hover:bg-primary hover:text-white transition-all shadow-xl">Return Home</a>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 p-6 border-t border-border flex flex-wrap items-center justify-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-primary/30">
        <span className="flex items-center gap-2"><ShieldCheck size={18}/> Secure & Encrypted</span>
        <span className="flex items-center gap-2"><MapPin size={18}/> Nationwide UK</span>
        <span className="flex items-center gap-2"><Lock size={18}/> 1-to-1 Match Only</span>
      </div>
    </div>
  );
}
