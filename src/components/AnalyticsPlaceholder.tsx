'use client';

import Script from 'next/script';

/**
 * Analytics Placeholder Component
 * Ready for Google Analytics 4 integration
 * Replace GA_MEASUREMENT_ID with actual ID when ready
 */
export function AnalyticsPlaceholder() {
  // Set to empty string to disable analytics
  // Replace with your GA4 Measurement ID (e.g., 'G-XXXXXXXXXX') to enable
  const GA_MEASUREMENT_ID = '';

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
