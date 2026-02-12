'use client';

/**
 * Accessibility Skip Link
 * Allows keyboard users to skip navigation and jump to main content
 * WCAG 2.1 AA Requirement
 */
export function AccessibilitySkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}
