'use client';

import { Phone, AlertCircle } from 'lucide-react';

/**
 * Emergency Support Bar
 * Persistent, non-intrusive crisis resources visible on all pages
 * Ensures crisis support is accessible within one interaction
 */
export function EmergencySupportBar() {
  return (
    <div className="bg-red-50 dark:bg-red-950 border-b border-red-200 dark:border-red-800">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span className="font-semibold">Crisis Support:</span>
          </div>
          <div className="flex items-center gap-4 text-red-700 dark:text-red-300">
            <a
              href="tel:988"
              className="flex items-center gap-1 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded px-1"
              aria-label="Call 988 Suicide and Crisis Lifeline"
            >
              <Phone className="w-3 h-3" aria-hidden="true" />
              <span className="font-medium">US: 988</span>
            </a>
            <span className="text-red-400 dark:text-red-600">|</span>
            <a
              href="tel:+8801779554391"
              className="flex items-center gap-1 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded px-1"
              aria-label="Call Bangladesh Kaan Pete Roi crisis hotline"
            >
              <Phone className="w-3 h-3" aria-hidden="true" />
              <span className="font-medium">BD: 09678 676 789</span>
            </a>
            <span className="text-red-400 dark:text-red-600">|</span>
            <a
              href="sms:741741?body=HELLO"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded px-1"
              aria-label="Text HELLO to 741741 for Crisis Text Line"
            >
              <span className="font-medium">Text: 741741</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
