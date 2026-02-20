"use client";

import { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TOUR_KEY = "mindwell_tour_completed";

const steps = [
  {
    title: "Welcome to MindWell 👋",
    content:
      "MindWell is a free, open-source mental health platform. We provide education, self-reflection tools, and crisis resources — all free, private, and accessible.",
  },
  {
    title: "Learn & Awareness",
    content:
      "Explore educational resources on mental health disorders, symptoms, and evidence-based treatments. Knowledge is the first step toward wellbeing.",
  },
  {
    title: "Self-Reflection Tools",
    content:
      "Take evidence-based assessments to better understand your mental health. These are for self-reflection only, not clinical diagnosis.",
  },
  {
    title: "Wellbeing Games & Mood Tracker 🎮",
    content:
      "Track your mood daily with our Mood Tracker and engage with interactive wellbeing games including a Gratitude Journal. Spotting patterns in your mood helps you take better care of your mental health.",
  },
  {
    title: "Global Search 🔍",
    content:
      "Use the search bar (Cmd+K / Ctrl+K) to instantly find any disorder, assessment, therapy technique, or meditation. Quick access to everything MindWell offers.",
  },
  {
    title: "Emergency Support",
    content:
      "If you or someone you know is in crisis, the Emergency Support section provides immediate helpline numbers and resources for Bangladesh and worldwide.",
  },
];

export function GuidedTour() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  const startTour = () => {
    setStep(0);
    setShow(true);
  };

  useEffect(() => {
    setMounted(true);
    try {
      if (!localStorage.getItem(TOUR_KEY)) {
        const timer = setTimeout(() => setShow(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mindwell:start-tour", startTour);
    return () => document.removeEventListener("mindwell:start-tour", startTour);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(TOUR_KEY, "true");
    } catch {
      // ignore
    }
  };

  const next = () => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      dismiss();
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  if (!mounted || !show) return null;

  const current = steps[step];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Guided tour"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 mx-auto">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400"
          aria-label="Skip tour"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4">
          <div className="flex gap-1.5 mb-4">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full flex-1 transition-colors ${
                  i <= step ? "bg-teal-500" : "bg-slate-200 dark:bg-slate-600"
                }`}
              />
            ))}
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{current.title}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{current.content}</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={dismiss}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            Skip tour
          </button>
          <div className="flex gap-2">
            {step > 0 && (
              <Button variant="outline" size="sm" onClick={back} aria-label="Previous step">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            <Button size="sm" onClick={next} className="bg-teal-600 hover:bg-teal-700 text-white">
              {step === steps.length - 1 ? "Finish" : "Next"}
              {step < steps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
