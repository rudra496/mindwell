import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import "./a11y.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AccessibilitySkipLink } from "@/components/AccessibilitySkipLink";
import { EmergencySupportBar } from "@/components/safety/EmergencySupportBar";
import { GlobalFooter } from "@/components/layout/GlobalFooter";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AnalyticsPlaceholder } from "@/components/AnalyticsPlaceholder";
import { ClientErrorLogger } from "@/components/ClientErrorLogger";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { NavigationBar } from "@/components/NavigationBar";

const description = "MindWell is an open-source mental health platform.
MindWell Support provides free, ethical mental health support,
crisis guidance, and psychologist access worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mindwell.vercel.app"),
  title: {
    default: "MindWell – Open Source Mental Health Platform",
    template: "%s | MindWell",
  },
  description,
  applicationName: "MindWell",
  keywords: ["mental health", "clinical psychologists", "self-reflection tools", "therapy resources", "community support"],
  authors: [{ name: "Rudra Sarker", url: "https://rudra496.github.io/site" }],
  creator: "Rudra Sarker",
  publisher: "MindWell",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mindwell.vercel.app",
    siteName: "MindWell",
    title: "MindWell – Open Source Mental Health Platform",
    description,
    images: [{ url: "/images/stock/hero_group_support.jpg", width: 1600, height: 900, alt: "MindWell hero support group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MindWell – Open Source Mental Health Platform",
    description,
    images: ["/images/stock/hero_group_support.jpg"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://mindwell.vercel.app" },
  category: "health",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d9488",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://mindwell.vercel.app/#organization",
        name: "MindWell",
        url: "https://mindwell.vercel.app",
        description: "MindWell – Open Source Mental Health Platform",
        contactPoint: {
          "@type": "ContactPoint",
          email: "contactmindwellorg@gmail.com",
          telephone: "+8801988223165",
          contactType: "support",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://mindwell.vercel.app/#website",
        url: "https://mindwell.vercel.app",
        name: "MindWell",
        description,
        publisher: { "@id": "https://mindwell.vercel.app/#organization" },
      },
      {
        "@type": "WebApplication",
        "@id": "https://mindwell.vercel.app/#webapp",
        name: "MindWell",
        url: "https://mindwell.vercel.app",
        applicationCategory: "HealthApplication",
        operatingSystem: "Any",
        description,
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <Script id="structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} strategy="beforeInteractive" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <ErrorBoundary>
            <AccessibilitySkipLink />
            <EmergencySupportBar />
            <NavigationBar />
            <div className="flex flex-col min-h-screen">
              <main className="flex-1 bg-gradient-to-br from-teal-50 via-indigo-50 to-emerald-50 transition-colors duration-300">
                <div className="container mx-auto px-4">
                  <Breadcrumbs />
                </div>
                {children}
              </main>
              <GlobalFooter />
            </div>
            <AnalyticsPlaceholder />
            <ClientErrorLogger />
            <PerformanceMonitor />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
