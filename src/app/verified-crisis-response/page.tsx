import { Metadata } from "next";
import { Phone, ShieldCheck } from "lucide-react";
import { VerifiedCrisisResponse } from "@/components/VerifiedCrisisResponse";
import { verifiedCrisisHotlines } from "@/data/verified-crisis-hotlines";

export const metadata: Metadata = {
  title: "Verified Crisis Hotlines – 60+ Countries",
  description:
    "Comprehensive, verified mental health and suicide prevention crisis hotlines for 60+ countries. All numbers sourced from official government and WHO-recognized organizations.",
  keywords: [
    "crisis hotline",
    "suicide prevention",
    "mental health crisis",
    "Bangladesh crisis number",
    "international crisis support",
    "verified crisis resources",
  ],
};

export default function VerifiedCrisisResponsePage() {
  const countries = new Set(verifiedCrisisHotlines.map((h) => h.country)).size;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl" id="main-content">
      <section aria-labelledby="vcr-title">
        <div className="flex items-center gap-3 mb-2">
          <ShieldCheck className="h-8 w-8 text-teal-600" aria-hidden="true" />
          <h1 id="vcr-title" className="text-3xl font-bold text-gray-900 dark:text-white">
            Verified Crisis Hotlines
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-2">
          All crisis numbers listed here are verified from official government health ministries, WHO-recognized organizations,
          and nationally registered NGOs. Coverage: {countries} countries, {verifiedCrisisHotlines.length}+ hotlines.
        </p>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 flex items-center gap-3">
          <Phone className="h-6 w-6 text-red-600 dark:text-red-400 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold text-red-800 dark:text-red-200">Bangladesh Crisis Support</p>
            <a
              href="tel:+8801779554391"
              className="text-red-700 dark:text-red-300 text-lg font-bold hover:underline"
              aria-label="Call Kaan Pete Roi Bangladesh crisis helpline"
            >
              Kaan Pete Roi: 01779-554391
            </a>
            <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">24/7 · Bengali & English · Emotional support & suicide prevention</p>
          </div>
        </div>

        <VerifiedCrisisResponse showSearch={true} />
      </section>
    </div>
  );
}
