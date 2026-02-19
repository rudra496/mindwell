'use client';

import Link from 'next/link';

export function EmergencySupportBar() {
  return (
    <div className="bg-red-50 dark:bg-red-950 border-b border-red-200 dark:border-red-800">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-red-800 dark:text-red-200">
          <span className="font-semibold">Crisis support resources are available.</span>
          <Link href="/crisis-resources" className="font-medium underline underline-offset-2">View crisis resources by country</Link>
        </div>
      </div>
    </div>
  );
}
