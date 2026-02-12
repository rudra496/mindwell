'use client';

import Link from 'next/link';
import { Shield, FileText, BookOpen, HelpCircle } from 'lucide-react';

/**
 * Legal Links Bar Component
 * Quick access to legal and policy pages
 * Enhances trust and credibility
 */
export function LegalLinksBar() {
  const links = [
    { href: '/privacy', label: 'Privacy', icon: Shield },
    { href: '/terms', label: 'Terms', icon: FileText },
    { href: '/medical-disclaimer', label: 'Disclaimer', icon: BookOpen },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <div className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <span className="text-gray-600 dark:text-gray-400 font-medium">
            Important Information:
          </span>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded px-1"
              >
                <Icon className="w-3 h-3" aria-hidden="true" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
