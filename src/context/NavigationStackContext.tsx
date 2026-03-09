'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';

const MAX_STACK_SIZE = 20;

type RouteChangeSource = 'push' | 'pop';

type NavigationStackContextValue = {
  history: string[];
  canGoBack: boolean;
};

const NavigationStackContext = createContext<NavigationStackContextValue | null>(null);

function trimStack(stack: string[]): string[] {
  return stack.slice(-MAX_STACK_SIZE);
}

export function NavigationStackProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [history, setHistory] = useState<string[]>([]);
  const pendingSourceRef = useRef<RouteChangeSource>('push');

  const syncStack = useCallback((nextPath: string, source: RouteChangeSource) => {
    setHistory((currentHistory) => {
      if (!nextPath) {
        return currentHistory;
      }

      if (currentHistory.length === 0) {
        return [nextPath];
      }

      const lastPath = currentHistory[currentHistory.length - 1];
      if (lastPath === nextPath) {
        return currentHistory;
      }

      if (source === 'pop') {
        const previousIndex = currentHistory.lastIndexOf(nextPath);

        if (previousIndex >= 0) {
          return currentHistory.slice(0, previousIndex + 1);
        }
      }

      return trimStack([...currentHistory, nextPath]);
    });
  }, []);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    syncStack(pathname, pendingSourceRef.current);
    pendingSourceRef.current = 'push';
  }, [pathname, syncStack]);

  useEffect(() => {
    const onPopState = () => {
      pendingSourceRef.current = 'pop';
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  const value = useMemo<NavigationStackContextValue>(
    () => ({
      history,
      canGoBack: history.length > 1,
    }),
    [history],
  );

  return <NavigationStackContext.Provider value={value}>{children}</NavigationStackContext.Provider>;
}

export function useNavigationStack() {
  const context = useContext(NavigationStackContext);

  if (!context) {
    throw new Error('useNavigationStack must be used within NavigationStackProvider');
  }

  return context;
}
