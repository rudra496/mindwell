"use client";

import { navigateToSection } from "@/hooks/useNavigationHistory";

const buttonClassName =
  "text-xs sm:text-sm px-3 py-1.5 rounded-full transition-colors";

export function DisorderSectionNavigation() {
  return (
    <nav aria-label="Section navigation" className="mb-6 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => navigateToSection("symptoms")}
        className={`${buttonClassName} bg-teal-100 text-teal-800 hover:bg-teal-200`}
      >
        Symptoms
      </button>
      <button
        type="button"
        onClick={() => navigateToSection("causes")}
        className={`${buttonClassName} bg-orange-100 text-orange-800 hover:bg-orange-200`}
      >
        Causes &amp; Risk
      </button>
      <button
        type="button"
        onClick={() => navigateToSection("treatment")}
        className={`${buttonClassName} bg-purple-100 text-purple-800 hover:bg-purple-200`}
      >
        Treatment
      </button>
    </nav>
  );
}
