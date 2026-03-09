'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { BackButton } from '@/components/BackButton';

/**
 * Breadcrumbs Component
 * Shows page hierarchy for better navigation and SEO
 * WCAG 2.1 AA compliant
 */
export function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show on home page
  if (pathname === '/') {
    return null;
  }

  // Generate breadcrumb path
  const pathSegments = pathname.split('/').filter(Boolean);
  
  // Map of path segments to human-readable labels
  const labelMap: Record<string, string> = {
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'medical-disclaimer': 'Medical Disclaimer',
    'about': 'About',
    'ethics': 'Ethics & Safety',
    'transparency': 'Data Sources',
    'faq': 'FAQ',
  };

  const breadcrumbs = [
    { href: '/', label: 'Home' },
    ...pathSegments.map((segment, index) => ({
      href: '/' + pathSegments.slice(0, index + 1).join('/'),
      label: labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
    })),
  ];

  return (
    <nav aria-label="Breadcrumb" className="py-4 space-y-3">
      <BackButton className="inline-flex items-center gap-2 rounded-md border border-teal-300 bg-white/90 px-3 py-2 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2" />
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight 
                  className="w-4 h-4 text-gray-400 dark:text-gray-600" 
                  aria-hidden="true" 
                />
              )}
              {isLast ? (
                <span 
                  className="text-gray-900 dark:text-white font-medium"
                  aria-current="page"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
