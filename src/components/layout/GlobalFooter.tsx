'use client';

import Link from 'next/link';
import { Facebook, Github, Linkedin } from '@/components/icons/BrandIcons';
import { useLanguage } from '@/lib/useLanguage';
import { tKey } from '@/lib/i18n';

export function GlobalFooter() {
  const { language } = useLanguage();

  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm mb-6">
          <Link href="/privacy" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">{tKey('globalFooter.privacy', language)}</Link>
          <Link href="/terms" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">{tKey('globalFooter.terms', language)}</Link>
          <Link href="/cookie-policy" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">{tKey('globalFooter.cookie', language)}</Link>
          <Link href="/disclaimer" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">{tKey('globalFooter.disclaimer', language)}</Link>
          <Link href="/medical-disclaimer" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">{tKey('globalFooter.medical', language)}</Link>
          <Link href="/faq" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">{tKey('globalFooter.faq', language)}</Link>
          <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-teal-600">{tKey('globalFooter.about', language)}</Link>
        </div>

        <div className="text-center space-y-2">
          <p className="text-gray-800 dark:text-gray-200 font-medium">{tKey('globalFooter.title', language)}</p>
          <div className="max-w-3xl mx-auto rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30 p-4 text-left space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">{tKey('globalFooter.desc1', language)}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{tKey('globalFooter.desc2', language)}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{tKey('globalFooter.desc3', language)}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{tKey('globalFooter.desc4', language)}</p>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            {tKey('globalFooter.madeBy', language)} <a href="https://rudra496.github.io/site" target="_blank" rel="noopener noreferrer" className="text-teal-700 dark:text-teal-400 hover:underline">Rudra Sarker</a>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            {tKey('globalFooter.inspiredBy', language)} <a href="https://www.linkedin.com/in/farzanahussain/" target="_blank" rel="noopener noreferrer" className="text-teal-700 dark:text-teal-400 hover:underline">Dr. Farzana Hussain</a>
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
              href="https://www.linkedin.com/in/rudrasarker"
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
              <span>{tKey('globalFooter.github', language)}</span>
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2026 MindWell</p>
        </div>
      </div>
    </footer>
  );
}
