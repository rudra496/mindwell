'use client';

import { Phone, AlertCircle } from 'lucide-react';

export function EmergencySupportBar() {
  return (
    <div className="bg-red-50 dark:bg-red-950 border-b border-red-200 dark:border-red-800">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-red-800 dark:text-red-200">
          <span className="flex items-center gap-1 font-semibold"><AlertCircle className="w-4 h-4" /> Crisis Support</span>
          <a href="tel:+8809678676777" className="hover:underline"><Phone className="w-3 h-3 inline mr-1" />Bangladesh: Kaan Pete Roi – 09678 676 777 (24/7)</a>
          <a href="tel:988" className="hover:underline"><Phone className="w-3 h-3 inline mr-1" />US: 988</a>
          <span className="font-medium">Emergency: 999 (BD) / 911 (US)</span>
        </div>
      </div>
    </div>
  );
}
