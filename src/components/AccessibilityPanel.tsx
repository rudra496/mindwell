"use client";

import { useState, useEffect } from "react";
import { Settings, X, Type, AlignJustify, Sun, MoveHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

type A11ySettings = {
  fontSize: "sm" | "md" | "lg" | "xl";
  fontFamily: "sans" | "serif" | "dyslexic";
  lineHeight: "normal" | "relaxed" | "loose";
  letterSpacing: "normal" | "wide" | "wider";
  highContrast: boolean;
};

const STORAGE_KEY = "mindwell_a11y_settings";

const defaults: A11ySettings = {
  fontSize: "md",
  fontFamily: "sans",
  lineHeight: "normal",
  letterSpacing: "normal",
  highContrast: false,
};

const fontSizeMap = { sm: "14px", md: "16px", lg: "18px", xl: "20px" };
const fontFamilyMap = {
  sans: "ui-sans-serif, system-ui, sans-serif",
  serif: "ui-serif, Georgia, serif",
  dyslexic: "'OpenDyslexic', 'Comic Sans MS', Arial, sans-serif",
};
const lineHeightMap = { normal: "1.5", relaxed: "1.75", loose: "2" };
const letterSpacingMap = { normal: "0em", wide: "0.05em", wider: "0.1em" };

function applySettings(s: A11ySettings) {
  const root = document.documentElement;
  root.style.setProperty("--a11y-font-size", fontSizeMap[s.fontSize]);
  root.style.setProperty("--a11y-font-family", fontFamilyMap[s.fontFamily]);
  root.style.setProperty("--a11y-line-height", lineHeightMap[s.lineHeight]);
  root.style.setProperty("--a11y-letter-spacing", letterSpacingMap[s.letterSpacing]);
  if (s.highContrast) {
    root.classList.add("a11y-high-contrast");
  } else {
    root.classList.remove("a11y-high-contrast");
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
        setSettings(parsed);
        applySettings(parsed);
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
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="relative w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400"
              aria-label="Close accessibility settings"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-teal-600" aria-hidden="true" />
              Accessibility
            </h2>

            <div className="space-y-4">
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
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
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
                      className={`py-1.5 px-3 rounded-lg border text-sm text-left transition-colors ${
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
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
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
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
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

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Sun className="h-4 w-4" aria-hidden="true" /> High Contrast
                </label>
                <button
                  onClick={() => update({ highContrast: !settings.highContrast })}
                  role="switch"
                  aria-checked={settings.highContrast}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                    settings.highContrast ? "bg-teal-600" : "bg-slate-200 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.highContrast ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <Button variant="outline" size="sm" onClick={reset} className="w-full mt-2">
                Reset to Defaults
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
