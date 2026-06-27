import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, siteUrl } from "@/lib/site";
import { CRISIS_BANGLADESH } from "@/lib/crisis-info";
import "./globals.css";
import "./a11y.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AccessibilitySkipLink } from "@/components/AccessibilitySkipLink";
import { EmergencySupportBar } from "@/components/safety/EmergencySupportBar";
import { GlobalFooter } from "@/components/layout/GlobalFooter";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AnalyticsPlaceholder } from "@/components/AnalyticsPlaceholder";
import { NavigationBar } from "@/components/NavigationBar";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import { GuidedTour } from "@/components/GuidedTour";
import { CapacitorRuntimeBootstrap } from "@/components/capacitor/CapacitorRuntimeBootstrap";
import { OfflineGuard } from "@/components/OfflineGuard";

const description = SITE_DESCRIPTION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Free Mental Health Support Platform | Mood Tracking & Mindfulness`,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  applicationName: "MindWell",
  keywords: [
    "mental health",
    "mood tracking",
    "mindfulness",
    "self-assessment",
    "therapy",
    "wellness",
    "open source",
    "free",
    "mental health platform",
    "anxiety",
    "depression",
    "CBT",
    "DBT",
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
    title: "MindWell — Free Mental Health Support Platform | Mood Tracking & Mindfulness",
    description,
    images: [{ url: "/images/stock/hero_group_support.jpg", width: 1600, height: 900, alt: `${SITE_NAME} — Free Mental Health Support Platform` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MindWell — Free Mental Health Support Platform | Mood Tracking & Mindfulness",
    description,
    images: ["/images/stock/hero_group_support.jpg"],
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
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        description: `${SITE_NAME} — Free Mental Health Support Platform`,
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
        <Script id="structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} strategy="beforeInteractive" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <OfflineGuard>
          <ErrorBoundary>
            {/* Bangladesh crisis number – absolute top of every page, slim bar */}
            <a
              href={CRISIS_BANGLADESH.tel}
              className="block bg-red-700 hover:bg-red-800 text-white text-center text-xs py-1 px-2 transition-colors"
              aria-label={`Bangladesh crisis helpline (${CRISIS_BANGLADESH.hours}) – call ${CRISIS_BANGLADESH.organization} at ${CRISIS_BANGLADESH.phone}`}
            >
              Bangladesh Crisis ({CRISIS_BANGLADESH.hours}): <strong>{CRISIS_BANGLADESH.phone}</strong> – {CRISIS_BANGLADESH.organization}
            </a>
            <AccessibilitySkipLink />
            <EmergencySupportBar />
            <NavigationBar />
            <GuidedTour />
            <div className="flex flex-col min-h-screen">
              <main className="flex-1 bg-background transition-colors duration-300">
                <div className="container mx-auto px-4">
                  <Breadcrumbs />
                </div>
                {children}
              </main>
              <GlobalFooter />
            </div>
            <AnalyticsPlaceholder />
            <AccessibilityPanel />
            <CapacitorRuntimeBootstrap />
          </ErrorBoundary>
          </OfflineGuard>
        </ThemeProvider>
      </body>
    </html>
  );
}
