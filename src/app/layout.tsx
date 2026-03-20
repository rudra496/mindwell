import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, siteUrl } from "@/lib/site";
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
import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import { GuidedTour } from "@/components/GuidedTour";
import { CapacitorRuntimeBootstrap } from "@/components/capacitor/CapacitorRuntimeBootstrap";
import { OfflineGuard } from "@/components/OfflineGuard";

const description = SITE_DESCRIPTION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Open Source Mental Health Platform`,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  applicationName: "MindWell",
  keywords: [
    "mental health",
    "mental health platform",
    "anxiety",
    "depression",
    "therapy",
    "CBT",
    "DBT",
    "mindfulness",
    "clinical psychologists",
    "self-reflection tools",
    "mental health Bangladesh",
    "crisis resources",
    "free mental health",
    "open source mental health",
    "suicide prevention",
    "mental wellness",
    "anxiety disorder",
    "depression treatment",
    "PTSD",
    "OCD",
    "bipolar disorder",
    "crisis helpline Bangladesh",
  ],
  authors: [{ name: "Rudra Sarker", url: "https://rudra496.github.io/site" }],
  creator: "Rudra Sarker",
  publisher: "MindWell",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "MindWell",
    title: "MindWell – Open Source Mental Health Platform",
    description,
    images: [{ url: "/images/stock/hero_group_support.jpg", width: 1600, height: 900, alt: `${SITE_NAME} – Open Source Mental Health Platform` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MindWell – Open Source Mental Health Platform",
    description,
    images: ["/images/stock/hero_group_support.jpg"],
    creator: "@Rudra496",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: "/" },
  category: "health",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d9488" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Rudra Sarker",
        url: "https://rudra496.github.io/site",
        jobTitle: "Student Innovator & Builder",
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Shahjalal University of Science and Technology",
        },
        sameAs: [
          "https://github.com/rudra496",
          "https://www.linkedin.com/in/rudrasarker",
          "https://www.facebook.com/rudrasarker130",
          "https://x.com/Rudra496",
          "https://www.researchgate.net/profile/Rudra-Sarker-3",
          "https://youtube.com/@rudrasarker9732",
          "https://www.instagram.com/rudrasarker/",
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        description: `${SITE_NAME} – Open Source Mental Health Platform`,
        contactPoint: {
          "@type": "ContactPoint",
          email: "contactmindwellorg@gmail.com",
          telephone: "+8801988223165",
          contactType: "support",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description,
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/blog?query={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#webapp`,
        name: SITE_NAME,
        url: SITE_URL,
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
        <link rel="me" href="https://github.com/rudra496" />
        <link rel="me" href="https://www.linkedin.com/in/rudrasarker" />
        <link rel="me" href="https://x.com/Rudra496" />
        {/* Google Search Console: replace YOUR_VERIFICATION_TOKEN with the value provided by Google Search Console. */}
        {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_TOKEN" /> */}
        <Script id="structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} strategy="beforeInteractive" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <OfflineGuard>
          <ErrorBoundary>
            {/* Bangladesh crisis number – absolute top of every page, slim bar */}
            <a
              href="tel:+8801779554391"
              className="block bg-red-700 hover:bg-red-800 text-white text-center text-xs py-1 px-2 transition-colors"
              aria-label="Bangladesh crisis helpline (24/7) – call Kaan Pete Roi at 01779-554391"
            >
              Bangladesh Crisis (24/7): <strong>01779-554391</strong> – Kaan Pete Roi
            </a>
            <AccessibilitySkipLink />
            <EmergencySupportBar />
            <NavigationBar />
            <GuidedTour />
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
            <AccessibilityPanel />
            <CapacitorRuntimeBootstrap />
          </ErrorBoundary>
          </OfflineGuard>
        </ThemeProvider>
      </body>
    </html>
  );
}
