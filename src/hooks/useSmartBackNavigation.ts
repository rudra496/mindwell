'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useNavigationStack } from '@/context/NavigationStackContext';

export function useSmartBackNavigation() {
  const router = useRouter();
  const { history } = useNavigationStack();

  const goBack = useCallback(() => {
    if (history.length > 1) {
      router.back();
      return;
    }

    router.push('/');
  }, [history.length, router]);

  return {
    goBack,
    canGoBack: history.length > 1,
    history,
  };
}
