'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Shield, FileText, HelpCircle, Info } from 'lucide-react';

/**
 * Global Navigation Component
 * Provides consistent navigation across all pages (except home page)
 * Enhances information architecture and accessibility
 */
export function GlobalNavigation() {
  const pathname = usePathname();
  
  // Don't show on home page
  if (pathname === '/') {
    return null;
  }

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: Info },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
    { href: '/privacy', label: 'Privacy', icon: Shield },
    { href: '/terms', label: 'Terms', icon: FileText },
    { href: '/medical-disclaimer', label: 'Disclaimer', icon: BookOpen },
  ];

  return (
    <nav 
      className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm"
      aria-label="Primary navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/"
            className="text-xl font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-md px-2"
          >
            MindWell
          </Link>
          
          <div className="flex items-center gap-1 md:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                    min-h-[44px] min-w-[44px] justify-center
                    ${isActive 
                      ? 'bg-teal-50 dark:bg-teal-900 text-teal-700 dark:text-teal-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
