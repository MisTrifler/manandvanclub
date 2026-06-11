"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { Mail, Loader2, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [screen, setScreen] = useState<"email" | "code" | "unverified">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const startCooldown = useCallback(() => {
    setCooldown(60);
    const interval = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }, []);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/driver/send-login-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("Send login code response:", data);

      // Always show the same generic message regardless of what happened
      if (data.success) {
        setScreen("code");
        startCooldown();
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(null);

    if (value && index < 5) {
      document.getElementById(`login-code-${index + 1}`)?.focus();
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`login-code-${index - 1}`)?.focus();
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const fullCode = code.join("");
    if (fullCode.length < 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/driver/verify-login-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: fullCode }),
      });

      const data = await res.json();
      console.log("Verify login code response:", data);

      if (data.success) {
        window.location.href = "/marketplace";
      } else {
        setError(data.message || "Invalid or expired code. Please request a new one.");
      }
    } catch (err: any) {
      console.error("Verify login code error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (loading || cooldown > 0) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/driver/send-login-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        startCooldown();
      }
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="bg-primary px-3 py-2 rounded-xl">
              <span className="text-white font-black text-xl leading-none">M&V</span>
            </div>
            <span className="text-2xl font-black text-primary tracking-tighter uppercase">Man and Van Club</span>
          </Link>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl border border-border">
          {screen === "email" && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-black text-primary uppercase tracking-tight">Driver Login</h1>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Enter your approved mover email address and we’ll send you a secure login code.
                </p>
              </div>

              <form onSubmit={handleSendCode} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black uppercase tracking-widest text-primary/60 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="driver@company.co.uk"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-border rounded-xl focus:border-accent outline-none transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-red-600 text-sm font-bold">
                    {error}
                  </div>
                )}

                <button
                  disabled={loading}
                  className="btn-orange w-full py-4 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-widest mt-4"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Send Login Code <ArrowRight size={18} /></>}
                </button>
              </form>

              <p className="text-xs text-text-secondary text-center leading-relaxed">
                No password needed. We’ll send a secure login code to your approved mover email.
              </p>

              <div className="pt-6 border-t border-border text-center">
                <p className="text-text-secondary text-sm mb-4">Don’t have a driver account yet?</p>
                <Link href="/for-businesses" className="text-primary font-black hover:text-accent transition-colors uppercase tracking-widest text-sm">
                  Apply to Join →
                </Link>
              </div>
            </div>
          )}

          {screen === "code" && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-black text-primary uppercase tracking-tight">Check Your Email</h1>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Enter the 6-digit code we sent to your email address.
                </p>
              </div>

              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="flex justify-center gap-3">
                  {code.map((digit, i) => (
                    <input
                      key={i}
                      id={`login-code-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(i, e.target.value)}
                      onKeyDown={(e) => handleCodeKeyDown(i, e)}
                      className="w-12 h-14 bg-gray-50 border-2 rounded-xl text-center text-2xl font-black outline-none border-border focus:border-accent"
                      aria-label={`Digit ${i + 1} of 6`}
                    />
                  ))}
                </div>

                {error && (
                  <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-red-600 text-sm font-bold text-center">
                    {error}
                  </div>
                )}

                <button
                  disabled={loading}
                  className="btn-orange w-full py-4 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-widest"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Log In"}
                </button>
              </form>

              <div className="text-center space-y-3">
                <button
                  onClick={handleResend}
                  disabled={loading || cooldown > 0}
                  className="text-accent font-black text-sm hover:underline disabled:opacity-40 disabled:no-underline"
                >
                  {cooldown > 0 ? `Resend Code in ${cooldown}s` : "Resend Code"}
                </button>

                <p className="text-xs text-text-secondary">
                  Codes expire after 10 minutes.
                </p>

                <button
                  onClick={() => {
                    setScreen("email");
                    setError(null);
                    setCode(["", "", "", "", "", ""]);
                    setCooldown(0);
                  }}
                  className="text-sm text-primary/60 font-bold hover:text-accent transition-colors flex items-center justify-center gap-1"
                >
                  <ArrowLeft size={14} /> Change email
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-text-secondary text-sm font-bold hover:text-primary">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
