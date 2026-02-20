'use client';

import Link from 'next/link';
import { Facebook, Github, Linkedin } from 'lucide-react';

export function GlobalFooter() {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm mb-6">
          <Link href="/privacy" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">Privacy Policy</Link>
          <Link href="/terms" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">Terms of Service</Link>
          <Link href="/cookie-policy" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">Cookie Policy</Link>
          <Link href="/disclaimer" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">Disclaimer</Link>
          <Link href="/medical-disclaimer" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">Medical Disclaimer</Link>
          <Link href="/faq" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">FAQ</Link>
          <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">About MindWell</Link>
        </div>

        <div className="text-center space-y-2">
          <p className="text-gray-800 dark:text-gray-200 font-medium">MindWell Support – Open Source Mental Health Platform</p>
          <div className="max-w-3xl mx-auto rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30 p-4 text-left space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">MindWell is an open-source mental health education and wellbeing platform focused on awareness, self-reflection, and ethical access to support.</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">It is not a diagnostic or emergency service, and is designed for global and low-resource communities.</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Aligned with SDG 3 (Good Health &amp; Well-being) and SDG 4 (Quality Education).</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Clinical support is available through assistant clinical psychologists. Currently, two psychologists are available, with more being added gradually. The first consultation session is free and is not intended to replace emergency or hospital care.</p>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Made with care by <a href="https://rudra496.github.io/site" target="_blank" rel="noopener noreferrer" className="text-teal-700 dark:text-teal-400 hover:underline">Rudra Sarker</a>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Inspired by <a href="https://www.linkedin.com/in/farzanahussain/" target="_blank" rel="noopener noreferrer" className="text-teal-700 dark:text-teal-400 hover:underline">Dr. Farzana Hussain</a>
          </p>
          <div className="pt-2 flex items-center justify-center gap-6 text-sm text-gray-700 dark:text-gray-300">
            <a
              href="https://www.facebook.com/share/17uZeJjmBc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MindWell on Facebook"
              className="inline-flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400"
            >
              <Facebook className="h-4 w-4" />
              <span>Facebook</span>
            </a>
            <a
              href="https://www.linkedin.com/in/rudra-sarker"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MindWell on LinkedIn"
              className="inline-flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/rudra496/mindwell"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open-source on GitHub"
              className="inline-flex items-center gap-2 hover:text-teal-600 dark:hover:text-teal-400"
            >
              <Github className="h-4 w-4" />
              <span>Open-source on GitHub</span>
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2026 MindWell</p>
        </div>
      </div>
    </footer>
  );
}
