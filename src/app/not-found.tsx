import Link from 'next/link';
import { Home, Search, HelpCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center" id="main-content">
      <div className="text-8xl font-extrabold text-teal-600 dark:text-teal-400 mb-4">404</div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Page Not Found</h1>
      <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8 text-sm leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let us help you find what you need.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <Button asChild>
          <Link href="/">
            <Home className="h-4 w-4 mr-2" aria-hidden="true" />
            Go Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/faq">
            <HelpCircle className="h-4 w-4 mr-2" aria-hidden="true" />
            FAQ
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/crisis-resources">
            <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
            Crisis Resources
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg w-full text-left">
        {[
          { label: 'Learn about mental health', href: '/#learn-awareness' },
          { label: 'Self-reflection assessments', href: '/#self-reflection-tools' },
          { label: 'Connect with psychologists', href: '/psychologists' },
          { label: 'About MindWell', href: '/about' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 hover:border-teal-400 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
          >
            <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
