"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type NavigationState = {
  path?: string;
  section?: string;
};

const MAX_TRACKED_ENTRIES = 30;

export function useGlobalNavigationManager() {
  const pathname = usePathname();
  const entryStackRef = useRef<string[]>([]);

  const trackEntry = useCallback((entry: string) => {
    const stack = entryStackRef.current;
    if (stack[stack.length - 1] === entry) return;
    stack.push(entry);
    if (stack.length > MAX_TRACKED_ENTRIES) stack.shift();
  }, []);

  const pushStateIfChanged = useCallback(
    (state: NavigationState, url: string, signature: string) => {
      if (typeof window === "undefined") return;

      const currentState = (window.history.state ?? {}) as NavigationState;
      const isDuplicateState = currentState.path === state.path && currentState.section === state.section;
      const isDuplicateUrl = `${window.location.pathname}${window.location.hash}` === url;

      if (isDuplicateState && isDuplicateUrl) return;

      window.history.pushState(state, "", url);
      trackEntry(signature);
    },
    [trackEntry]
  );

  const handleSectionNavigation = useCallback(
    (sectionId: string) => {
      if (typeof window === "undefined") return;
      const normalized = sectionId.replace(/^#/, "");
      if (!normalized) return;

      const url = `#${normalized}`;
      pushStateIfChanged({ path: pathname, section: normalized }, url, `section:${normalized}`);

      const target = document.getElementById(normalized);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [pathname, pushStateIfChanged]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentState = (window.history.state ?? {}) as NavigationState;
    if (currentState.path !== pathname || currentState.section) {
      window.history.replaceState({ path: pathname }, "", pathname);
    }
    trackEntry(`path:${pathname}`);

    pushStateIfChanged({ path: pathname }, pathname, `path:${pathname}`);
  }, [pathname, pushStateIfChanged, trackEntry]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      event.preventDefault();
      handleSectionNavigation(href);
    };

    const onPopState = (event: PopStateEvent) => {
      const state = (event.state ?? {}) as NavigationState;
      if (!state.section) return;

      const sectionId = state.section;
      requestAnimationFrame(() => {
        const target = document.getElementById(sectionId);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    window.addEventListener("popstate", onPopState);
    document.addEventListener("click", onDocumentClick);

    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onDocumentClick);
    };
  }, [handleSectionNavigation]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cleanup: (() => void) | undefined;

    const loadCapacitorApp = new Function("moduleName", "return import(moduleName);") as (moduleName: string) => Promise<{ App: { addListener: (eventName: string, listenerFunc: () => void) => Promise<{ remove: () => Promise<void> }>; exitApp: () => void } }>

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

  return { handleSectionNavigation };
}
