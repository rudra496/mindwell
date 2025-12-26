import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MindWell - World's Largest Open-Source Mental Health Platform",
  description: "Comprehensive, scientifically-backed, free mental health support platform with 40+ disorders, validated assessments, therapeutic games, and crisis resources.",
  keywords: ["mental health", "depression", "anxiety", "therapy", "meditation", "crisis resources", "self-help"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-indigo-50 to-emerald-50">
          {children}
        </div>
      </body>
    </html>
  );
}
