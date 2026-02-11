import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL('https://mindwell.vercel.app'),
  title: {
    default: "MindWell - World's Largest Open-Source Mental Health Platform",
    template: "%s | MindWell"
  },
  description: "Free, comprehensive mental health support platform with 63+ disorders, 20 validated clinical assessments, therapeutic games, AI chatbot, and crisis resources. Evidence-based tools for anxiety, depression, PTSD, and more.",
  keywords: [
    "mental health",
    "depression",
    "anxiety",
    "PTSD",
    "OCD",
    "bipolar disorder",
    "therapy",
    "meditation",
    "crisis resources",
    "self-help",
    "mental health assessment",
    "PHQ-9",
    "GAD-7",
    "PCL-5",
    "CBT",
    "DBT",
    "mindfulness",
    "mental wellness",
    "psychological support",
    "suicide prevention",
    "988 lifeline",
    "mental health platform",
    "therapeutic games",
    "guided meditation",
    "mental health disorders",
    "DSM-5",
    "mental health resources",
    "free mental health support",
    "online therapy tools",
    "mental health community"
  ],
  authors: [{ name: "Rudra Sarker", url: "https://rudra496.github.io/site" }],
  creator: "Rudra Sarker",
  publisher: "MindWell",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MindWell"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mindwell.vercel.app",
    siteName: "MindWell",
    title: "MindWell - World's Largest Open-Source Mental Health Platform",
    description: "Free, comprehensive mental health support with 63+ disorders, validated assessments, therapeutic games, AI chatbot, and crisis resources. Evidence-based tools for anxiety, depression, PTSD, and more.",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "MindWell - Mental Health Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MindWell - World's Largest Open-Source Mental Health Platform",
    description: "Free, comprehensive mental health support with 63+ disorders, validated assessments, therapeutic games, and crisis resources.",
    images: ["/icon-512.png"],
    creator: "@mindwell"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://mindwell.vercel.app"
  },
  category: "health"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0d9488"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://mindwell.vercel.app/#organization",
        "name": "MindWell",
        "url": "https://mindwell.vercel.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://mindwell.vercel.app/icon-512.png",
          "width": 512,
          "height": 512
        },
        "description": "World's largest open-source mental health platform",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "rudrasarker125@gmail.com",
          "contactType": "Customer Support"
        },
        "sameAs": [
          "https://github.com/rudra496/mindwell",
          "https://rudra496.github.io/site"
        ]
      },
      {
        "@type": "WebApplication",
        "@id": "https://mindwell.vercel.app/#webapp",
        "name": "MindWell Mental Health Platform",
        "url": "https://mindwell.vercel.app",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Comprehensive mental health support platform with 63+ disorders, 20 validated assessments, therapeutic games, and crisis resources."
      },
      {
        "@type": "MedicalWebPage",
        "@id": "https://mindwell.vercel.app/#webpage",
        "url": "https://mindwell.vercel.app",
        "name": "MindWell - Mental Health Support Platform",
        "description": "Evidence-based mental health resources including disorder information, clinical assessments, therapeutic interventions, and crisis support.",
        "medicalAudience": [
          {
            "@type": "MedicalAudience",
            "audienceType": "Patient"
          },
          {
            "@type": "MedicalAudience",
            "audienceType": "CareGiver"
          }
        ],
        "about": {
          "@type": "MedicalCondition",
          "name": "Mental Health Disorders",
          "alternateName": ["Depression", "Anxiety", "PTSD", "OCD", "Bipolar Disorder"]
        }
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0d9488" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1e293b" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="canonical" href="https://mindwell.vercel.app" />
        
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="font-sans antialiased">
        {/* Puter.js for free AI chatbot */}
        <Script 
          src="https://js.puter.com/v2/" 
          strategy="beforeInteractive"
        />
        
        <ThemeProvider>
          <ErrorBoundary>
            <main className="min-h-screen bg-gradient-to-br from-teal-50 via-indigo-50 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
              {children}
            </main>
          </ErrorBoundary>
        </ThemeProvider>
        
        {/* Service Worker Registration */}
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) {
                    console.log('ServiceWorker registration successful:', registration.scope);
                  },
                  function(err) {
                    console.log('ServiceWorker registration failed:', err);
                  }
                );
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
