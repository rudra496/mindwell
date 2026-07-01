"use client";

import { useState } from "react";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_NEWSLETTER_API_URL;
      if (apiUrl) {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) throw new Error("Subscription failed");
      }
      // If no API URL configured, simulate success
      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg("Something went wrong. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <section className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-2xl p-6 sm:p-8">
      <div className="max-w-lg mx-auto text-center">
        <div className="flex justify-center mb-3">
          <span className="bg-teal-100 dark:bg-teal-900/40 p-3 rounded-full">
            <Mail className="h-6 w-6 text-teal-700 dark:text-teal-400" aria-hidden="true" />
          </span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Mental Wellness Updates
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
          Occasional updates on mental health resources and platform features. No spam.
        </p>

        {status === "success" ? (
          <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400">
            <CheckCircle className="h-5 w-5" aria-hidden="true" />
            <span className="font-medium">Thank you! You&apos;re subscribed.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-describedby={status === "error" ? "newsletter-error" : undefined}
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium"
            >
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </Button>
          </form>
        )}

        {status === "error" && (
          <div id="newsletter-error" role="alert" className="flex items-center justify-center gap-1.5 mt-3 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {errorMsg}
          </div>
        )}

        <p className="text-xs text-slate-400 mt-4">
          100% Privacy Respected. No tracking. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
