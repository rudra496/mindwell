'use client';

import Link from 'next/link';

export function GlobalFooter() {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm mb-6">
          <Link href="/privacy" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">Privacy Policy</Link>
          <Link href="/terms" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">Terms of Service</Link>
          <Link href="/medical-disclaimer" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">Medical Disclaimer</Link>
          <Link href="/faq" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">FAQ</Link>
          <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">About MindWell</Link>
          <Link href="/psychologists" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">Psychologists</Link>
        </div>

        <div className="text-center space-y-2">
          <p className="text-gray-800 dark:text-gray-200 font-medium">MindWell – Open Source Mental Health Platform</p>
          <p className="text-gray-700 dark:text-gray-300">
            Made with care by <a href="https://rudra496.github.io/site" target="_blank" rel="noopener noreferrer" className="text-teal-700 dark:text-teal-400 hover:underline">Rudra Sarker</a>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Inspired by <a href="https://www.linkedin.com/in/farzanahussain/" target="_blank" rel="noopener noreferrer" className="text-teal-700 dark:text-teal-400 hover:underline">Dr. Farzana Hussain</a>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2026 MindWell</p>
        </div>
      </div>
    </footer>
  );
}
