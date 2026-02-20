"use client";

import { useState, useMemo } from "react";
import { Phone, ExternalLink, Search, Globe } from "lucide-react";
import { verifiedCrisisHotlines, type CrisisHotline } from "@/data/verified-crisis-hotlines";

type Props = {
  showSearch?: boolean;
  limit?: number;
};

export function VerifiedCrisisResponse({ showSearch = true, limit }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const data = limit ? verifiedCrisisHotlines.slice(0, limit) : verifiedCrisisHotlines;
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter(
      (h) =>
        h.country.toLowerCase().includes(q) ||
        h.organization.toLowerCase().includes(q) ||
        h.phone.toLowerCase().includes(q) ||
        h.type.toLowerCase().includes(q)
    );
  }, [query, limit]);

  const grouped = useMemo(
    () =>
      filtered.reduce<Record<string, CrisisHotline[]>>((acc, h) => {
        if (!acc[h.country]) acc[h.country] = [];
        acc[h.country].push(h);
        return acc;
      }, {}),
    [filtered]
  );

  const countries = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

  return (
    <div className="space-y-4">
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by country, organization, or type…"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Search crisis hotlines"
          />
        </div>
      )}

      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
        <Globe className="h-3.5 w-3.5" aria-hidden="true" />
        Showing {filtered.length} verified hotlines across {countries.length} countries. All data sourced from official organizations.
      </p>

      <div className="space-y-3">
        {countries.map((country) => (
          <details
            key={country}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            open={query.trim().length > 0}
          >
            <summary className="flex items-center gap-2 px-5 py-3.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors font-semibold text-slate-900 dark:text-slate-100 text-sm">
              <span className="font-mono text-slate-400 text-xs w-5 text-center">
                {grouped[country][0].countryCode}
              </span>
              {country}
              <span className="ml-auto text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                {grouped[country].length} line{grouped[country].length !== 1 ? "s" : ""}
              </span>
            </summary>
            <div className="px-5 pb-4 pt-1 space-y-3">
              {grouped[country].map((hotline) => (
                <div
                  key={hotline.phone}
                  className="rounded-lg border border-slate-100 dark:border-slate-700 p-3.5 space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">{hotline.organization}</p>
                    <a
                      href={hotline.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 text-xs shrink-0"
                      aria-label={`Official source for ${hotline.organization}`}
                    >
                      <ExternalLink className="h-3 w-3" aria-hidden="true" /> Source
                    </a>
                  </div>
                  <a
                    href={`tel:${hotline.phone.replace(/\s|-|\(|\)/g, "")}`}
                    className="inline-flex items-center gap-1.5 text-base font-bold text-teal-700 dark:text-teal-400 hover:underline"
                    aria-label={`Call ${hotline.organization}: ${hotline.phone}`}
                  >
                    <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {hotline.phone}
                  </a>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <span>⏰ {hotline.hours}</span>
                    <span>🌐 {hotline.languages.join(", ")}</span>
                    <span>🏷️ {hotline.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
          No results for &ldquo;{query}&rdquo;. Try a different country or organization name.
        </p>
      )}
    </div>
  );
}
