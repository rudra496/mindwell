'use client';

import { useEffect } from 'react';

/**
 * Client Error Logger Component
 * Logs unhandled errors for monitoring
 * Can be integrated with error tracking services like Sentry
 */
export function ClientErrorLogger() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Client Error:', {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          error: event.error,
        });
      }

      // In production, send to error tracking service
      // Example: Sentry, LogRocket, etc.
      // Sentry.captureException(event.error);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Unhandled Promise Rejection:', event.reason);
      }

      // In production, send to error tracking service
      // Sentry.captureException(event.reason);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
}
