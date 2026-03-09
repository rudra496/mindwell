'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type CapacitorAppPlugin = {
  addListener?: (
    eventName: 'backButton',
    listenerFunc: () => void,
  ) => Promise<{ remove: () => Promise<void> | void }> | { remove: () => Promise<void> | void };
  exitApp?: () => Promise<void> | void;
};

type CapacitorRuntime = {
  isNativePlatform?: () => boolean;
  Plugins?: {
    App?: CapacitorAppPlugin;
  };
};

declare global {
  interface Window {
    Capacitor?: CapacitorRuntime;
  }
}

export default function useGlobalBackNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const capacitor = window.Capacitor;
    const appPlugin = capacitor?.Plugins?.App;
    const isNativePlatform = Boolean(capacitor?.isNativePlatform?.());

    const goBack = () => {
      if (window.history.length > 1) {
        router.back();
        return;
      }

      if (pathname !== '/') {
        router.push('/');
        return;
      }

      if (isNativePlatform) {
        appPlugin?.exitApp?.();
      }
    };

    const browserHandler = () => {
      // Keep browser default behavior untouched; this ensures parity with native back handling lifecycle.
    };

    window.addEventListener('popstate', browserHandler);

    let listenerHandle: { remove: () => Promise<void> | void } | null = null;
    let removed = false;

    const attachNativeListener = async () => {
      if (!isNativePlatform || !appPlugin?.addListener) {
        return;
      }

      const handle = await appPlugin.addListener('backButton', () => {
        goBack();
      });

      if (removed) {
        await handle.remove();
        return;
      }

      listenerHandle = handle;
    };

    void attachNativeListener();

    return () => {
      removed = true;
      window.removeEventListener('popstate', browserHandler);
      void listenerHandle?.remove();
    };
  }, [pathname, router]);
}
