"use client";

import { useState, useEffect } from "react";
import { Settings, X, Type, AlignJustify, MoveHorizontal, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

type A11ySettings = {
  fontSize: "sm" | "md" | "lg" | "xl";
  fontFamily: "sans" | "serif" | "dyslexic";
  lineHeight: "normal" | "relaxed" | "loose";
  letterSpacing: "normal" | "wide" | "wider";
  readMode: boolean;
};

const STORAGE_KEY = "mindwell_a11y_settings";

const defaults: A11ySettings = {
  fontSize: "md",
  fontFamily: "sans",
  lineHeight: "normal",
  letterSpacing: "normal",
  readMode: false,
};

// Percentage-based scaling applied to the html element so rem units
// (used by Tailwind) scale proportionally on all screen sizes.
const fontScaleMap = {
  sm: "87.5%",   // ~14px base
  md: "100%",    // 16px base (browser default)
  lg: "112.5%",  // ~18px base
  xl: "125%",    // 20px base
};

const fontFamilyMap = {
  sans: "ui-sans-serif, system-ui, sans-serif",
  serif: "ui-serif, Georgia, serif",
  // OpenDyslexic can be loaded via a CDN or bundled font; falls back to Comic Sans / Arial
  dyslexic: "'OpenDyslexic', 'Comic Sans MS', Arial, sans-serif",
};
const lineHeightMap = { normal: "1.5", relaxed: "1.75", loose: "2" };
const letterSpacingMap = { normal: "0em", wide: "0.05em", wider: "0.1em" };

function applySettings(s: A11ySettings) {
  const html = document.documentElement;
  // Apply font size scale to html so rem units scale proportionally
  html.style.fontSize = fontScaleMap[s.fontSize];
  html.style.setProperty("--a11y-font-family", fontFamilyMap[s.fontFamily]);
  html.style.setProperty("--a11y-line-height", lineHeightMap[s.lineHeight]);
  html.style.setProperty("--a11y-letter-spacing", letterSpacingMap[s.letterSpacing]);
  if (s.readMode) {
    html.classList.add("a11y-read-mode");
  } else {
    html.classList.remove("a11y-read-mode");
  }
}

export function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(defaults);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: A11ySettings = JSON.parse(stored);
        // Handle migration from old settings schema
        const migrated: A11ySettings = { ...defaults, ...parsed, readMode: parsed.readMode ?? false };
        setSettings(migrated);
        applySettings(migrated);
      }
    } catch {
      // ignore
    }
  }, []);

  const update = (partial: Partial<A11ySettings>) => {
    const next = { ...settings, ...partial };
    setSettings(next);
    applySettings(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const reset = () => {
    setSettings(defaults);
    applySettings(defaults);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-50 bg-teal-600 hover:bg-teal-700 text-white rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        aria-label="Open accessibility settings"
        title="Accessibility settings"
      >
        <Settings className="h-5 w-5" aria-hidden="true" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Accessibility settings"
          style={{ fontSize: "16px" }}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          {/* Panel uses px widths / max-h so it doesn't grow when the user increases html font scale */}
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col" style={{ maxHeight: "min(90dvh, 90vh)" }}>
            {/* Sticky header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100 dark:border-slate-700 shrink-0">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Settings className="h-4 w-4 text-teal-600" aria-hidden="true" />
                Accessibility
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400"
                aria-label="Close accessibility settings"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto px-5 py-4 space-y-4">
              {/* Text Size */}
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
                  <Type className="h-4 w-4" aria-hidden="true" /> Text Size
                </label>
                <div className="flex gap-2">
                  {(["sm", "md", "lg", "xl"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => update({ fontSize: s })}
                      className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-colors ${
                        settings.fontSize === s
                          ? "bg-teal-600 text-white border-teal-600"
                          : "border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                      }`}
                      aria-pressed={settings.fontSize === s}
                      aria-label={`Text size ${s}`}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Family */}
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Font Family</label>
                <div className="flex flex-col gap-1.5">
                  {(["sans", "serif", "dyslexic"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => update({ fontFamily: f })}
                      className={`py-2 px-3 rounded-lg border text-sm text-left transition-colors ${
                        settings.fontFamily === f
                          ? "bg-teal-600 text-white border-teal-600"
                          : "border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                      }`}
                      aria-pressed={settings.fontFamily === f}
                    >
                      {f === "sans" ? "Sans-Serif (Default)" : f === "serif" ? "Serif" : "Dyslexia-Friendly"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Height */}
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
                  <AlignJustify className="h-4 w-4" aria-hidden="true" /> Line Height
                </label>
                <div className="flex gap-2">
                  {(["normal", "relaxed", "loose"] as const).map((lh) => (
                    <button
                      key={lh}
                      onClick={() => update({ lineHeight: lh })}
                      className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-colors ${
                        settings.lineHeight === lh
                          ? "bg-teal-600 text-white border-teal-600"
                          : "border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                      }`}
                      aria-pressed={settings.lineHeight === lh}
                    >
                      {lh.charAt(0).toUpperCase() + lh.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Letter Spacing */}
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
                  <MoveHorizontal className="h-4 w-4" aria-hidden="true" /> Letter Spacing
                </label>
                <div className="flex gap-2">
                  {(["normal", "wide", "wider"] as const).map((ls) => (
                    <button
                      key={ls}
                      onClick={() => update({ letterSpacing: ls })}
                      className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-colors ${
                        settings.letterSpacing === ls
                          ? "bg-teal-600 text-white border-teal-600"
                          : "border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                      }`}
                      aria-pressed={settings.letterSpacing === ls}
                    >
                      {ls.charAt(0).toUpperCase() + ls.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Read Mode / Eye Care Mode */}
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  <span>
                    Read Mode <span className="text-xs text-slate-400 font-normal">(Eye Care)</span>
                  </span>
                </label>
                <button
                  onClick={() => update({ readMode: !settings.readMode })}
                  role="switch"
                  aria-checked={settings.readMode}
                  aria-label="Toggle read mode"
                  className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                    settings.readMode ? "bg-teal-600" : "bg-slate-200 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.readMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              {settings.readMode && (
                <p className="text-xs text-amber-600 dark:text-amber-400 -mt-2">
                  Warm background &amp; reduced eye strain for extended reading.
                </p>
              )}
            </div>

            {/* Sticky footer: reset button always visible */}
            <div className="px-5 pb-4 pt-2 border-t border-slate-100 dark:border-slate-700 shrink-0">
              <Button variant="outline" size="sm" onClick={reset} className="w-full">
                Reset to Defaults
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
