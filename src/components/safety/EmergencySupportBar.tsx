'use client';

import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function EmergencySupportBar() {
  return (
    <div className="bg-red-50 dark:bg-red-950 border-b border-red-200 dark:border-red-800">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-red-800 dark:text-red-200">
          <span className="flex items-center gap-1 font-semibold"><AlertCircle className="w-4 h-4" /> Crisis Support</span>
          <span>If you are in immediate danger, contact your local emergency services.</span>
          <Link href="/faq" className="font-medium underline underline-offset-2">View country-specific crisis resources</Link>
        </div>
      </div>
    </div>
  );
}
