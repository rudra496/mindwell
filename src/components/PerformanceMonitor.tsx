'use client';

import { useEffect } from 'react';

/**
 * Performance Monitor Component
 * Monitors Web Vitals (CLS, FID, LCP, FCP, TTFB)
 * Can be integrated with analytics services
 */
export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    // Monitor Largest Contentful Paint (LCP)
    const observeLCP = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          
          if (process.env.NODE_ENV === 'development') {
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
          }
          
          // Send to analytics
          // gtag('event', 'web_vitals', { name: 'LCP', value: lastEntry.renderTime || lastEntry.loadTime });
        });
        
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
        return observer;
      } catch (e) {
        // LCP not supported
        return null;
      }
    };

    // Monitor First Input Delay (FID)
    const observeFID = () => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('FID:', entry.processingStart - entry.startTime);
            }
            
            // Send to analytics
            // gtag('event', 'web_vitals', { name: 'FID', value: entry.processingStart - entry.startTime });
          });
        });
        
        observer.observe({ type: 'first-input', buffered: true });
        return observer;
      } catch (e) {
        // FID not supported
        return null;
      }
    };

    // Monitor Cumulative Layout Shift (CLS)
    const observeCLS = () => {
      try {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          
          if (process.env.NODE_ENV === 'development') {
            console.log('CLS:', clsValue);
          }
          
          // Send to analytics
          // gtag('event', 'web_vitals', { name: 'CLS', value: clsValue });
        });
        
        observer.observe({ type: 'layout-shift', buffered: true });
        return observer;
      } catch (e) {
        // CLS not supported
        return null;
      }
    };

    const lcpObserver = observeLCP();
    const fidObserver = observeFID();
    const clsObserver = observeCLS();

    return () => {
      lcpObserver?.disconnect();
      fidObserver?.disconnect();
      clsObserver?.disconnect();
    };
  }, []);

  return null;
}
