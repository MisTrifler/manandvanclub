"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [canUpdatePassword, setCanUpdatePassword] = useState(false);
  const [checkingLink, setCheckingLink] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const resetRedirectUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/reset-password`;
  }, []);

  useEffect(() => {
    if (!supabase) {
      setCheckingLink(false);
      return;
    }

    async function checkRecoveryLink() {
      setCheckingLink(true);

      try {
        const hash = window.location.hash || "";
        const search = window.location.search || "";

        const looksLikeRecoveryLink =
          hash.includes("type=recovery") ||
          search.includes("type=recovery") ||
          hash.includes("access_token") ||
          search.includes("code=");

        if (!looksLikeRecoveryLink) {
          setCanUpdatePassword(false);
          setCheckingLink(false);
          return;
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          setCanUpdatePassword(true);
          setMessage("Reset link verified. You can now set a new password.");
        } else {
          setCanUpdatePassword(false);
          setError(
            "This reset link could not be verified. Please request a new reset email."
          );
        }
      } catch (err) {
        setCanUpdatePassword(false);
        setError(
          err?.message ||
            "Could not verify the reset link. Please request a new reset email."
        );
      } finally {
        setCheckingLink(false);
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setCanUpdatePassword(true);
        setMessage("Reset link verified. You can now set a new password.");
        setError("");
      }
    });

    checkRecoveryLink();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  async function requestReset(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (!supabase) {
        throw new Error("Supabase is not configured correctly.");
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: resetRedirectUrl,
        }
      );

      if (resetError) throw resetError;

      setMessage(
        "Password reset email sent. Please check your inbox and spam folder. Only use the reset link in that email to set a new password."
      );
      setEmail("");
    } catch (err) {
      setError(err?.message || "Unable to send password reset email.");
    } finally {
      setLoading(false);
    }
  }

  async function updatePassword(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (!supabase) {
        throw new Error("Supabase is not configured correctly.");
      }

      if (!canUpdatePassword) {
        throw new Error(
          "For security, you must open the password reset link from your email before setting a new password."
        );
      }

      if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters.");
      }

      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;

      await supabase.auth.signOut();

      setMessage("Password updated successfully. You can now log in.");
      setNewPassword("");
      setConfirmPassword("");
      setCanUpdatePassword(false);

      window.history.replaceState({}, document.title, "/reset-password");
    } catch (err) {
      setError(err?.message || "Unable to update password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5fbf7] px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-xl rounded-3xl bg-white p-6 shadow-lg md:p-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            West Midlands Cleaner
          </p>
          <h1 className="mt-2 text-3xl font-bold">Reset your password</h1>
          <p className="mt-3 text-slate-600">
            Enter your email to receive a secure reset link. For security, you
            can only set a new password after opening the reset link from your
            email.
          </p>
        </div>

        <form onSubmit={requestReset} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">
              Email address
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-emerald-700 px-5 py-3 font-bold text-white hover:bg-emerald-800 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send password reset email"}
          </button>
        </form>

        <div className="my-8 border-t border-slate-200" />

        {checkingLink ? (
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            Checking reset link...
          </div>
        ) : canUpdatePassword ? (
          <form onSubmit={updatePassword} className="space-y-4">
            <div className="rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
              Reset link verified. Enter your new password below.
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                New password
              </span>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter a new password"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Confirm new password
              </span>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-emerald-700 px-5 py-3 font-bold text-white hover:bg-emerald-800 disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update password"}
            </button>
          </form>
        ) : (
          <div className="rounded-2xl bg-amber-50 p-4 text-sm font-medium text-amber-800">
            To set a new password, first request a reset email and open the
            secure link from that email.
          </div>
        )}

        {message && (
          <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          <p>
            Need help? Use the{" "}
            <a href="/contact" className="font-semibold text-emerald-700">
              contact page
            </a>{" "}
            or email{" "}
            <a
              href="mailto:info@westmidlandscleaner.co.uk"
              className="font-semibold text-emerald-700"
            >
              info@westmidlandscleaner.co.uk
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
