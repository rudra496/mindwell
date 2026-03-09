"use client";

import { useEffect } from "react";

type CapacitorAppPlugin = {
  addListener: (
    eventName: "backButton",
    listenerFunc: () => void
  ) => Promise<{ remove: () => Promise<void> }>;
  exitApp: () => void;
};

function getNormalizedSection(sectionId: string) {
  return sectionId.replace(/^#/, "").trim();
}

export function navigateToSection(sectionId: string) {
  if (typeof window === "undefined") return;

  const normalizedSection = getNormalizedSection(sectionId);
  if (!normalizedSection) return;

  const currentHash = window.location.hash.replace(/^#/, "");
  const targetElement = document.getElementById(normalizedSection);

  if (currentHash !== normalizedSection) {
    const url = `${window.location.pathname}#${normalizedSection}`;
    window.history.pushState({ section: normalizedSection }, "", url);
  }

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
}

export function useNavigationHistory() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onPopState = () => {
      if (!window.location.hash) return;

      const section = window.location.hash.replace("#", "");
      const element = document.getElementById(section);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cleanup: (() => void) | undefined;

    const loadCapacitorApp = new Function(
      "moduleName",
      "return import(moduleName);"
    ) as (moduleName: string) => Promise<{ App: CapacitorAppPlugin }>;

    void loadCapacitorApp("@capacitor/app")
      .then(async ({ App }) => {
        const listener = await App.addListener("backButton", () => {
          if (window.history.length > 1) {
            window.history.back();
            return;
          }

          App.exitApp();
        });

        cleanup = () => {
          void listener.remove();
        };
      })
      .catch(() => {
        cleanup = undefined;
      });

    return () => {
      cleanup?.();
    };
  }, []);
}
