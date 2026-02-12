'use client';

import Link from 'next/link';
import { Github, Heart, Mail } from 'lucide-react';

/**
 * Global Footer Component
 * Provides consistent footer with legal links and contact information
 * Enhances credibility and trust signals
 */
export function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              MindWell
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              World's largest open-source mental health platform. Free, comprehensive support for everyone.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/rudra496/mindwell"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
                aria-label="MindWell on GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:rudrasarker125@gmail.com"
                className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
                aria-label="Contact via email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Legal & Information
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/privacy"
                  className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms"
                  className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/medical-disclaimer"
                  className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
                >
                  Medical Disclaimer
                </Link>
              </li>
              <li>
                <Link 
                  href="/ethics"
                  className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
                >
                  Ethics & Safety
                </Link>
              </li>
              <li>
                <Link 
                  href="/transparency"
                  className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
                >
                  Data Sources
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
                >
                  About MindWell
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500" aria-label="love" /> by{' '}
            <a
              href="https://rudra496.github.io/site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 dark:text-teal-400 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
            >
              Rudra Sarker
            </a>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            © {currentYear} MindWell. Open Source Mental Health Platform.
          </p>
        </div>
      </div>
    </footer>
  );
}
