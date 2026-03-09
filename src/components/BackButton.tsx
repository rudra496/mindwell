'use client';

import { useSmartBackNavigation } from '@/hooks/useSmartBackNavigation';

type BackButtonProps = {
  className?: string;
  label?: string;
};

export function BackButton({ className, label = 'Back' }: BackButtonProps) {
  const { goBack } = useSmartBackNavigation();

  return (
    <button
      type="button"
      onClick={goBack}
      className={
        className ??
        'inline-flex items-center gap-2 rounded-md border border-teal-300 bg-white px-3 py-2 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
      }
      aria-label={label}
    >
      <span aria-hidden="true">←</span>
      <span>{label}</span>
    </button>
  );
}
