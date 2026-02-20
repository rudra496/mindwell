"use client";

import { Facebook, Twitter, Linkedin, Mail, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type SocialShareProps = {
  title?: string;
  url?: string;
  description?: string;
};

export function SocialShare({
  title = "MindWell – Open Source Mental Health Platform",
  url = "https://mindwell.vercel.app",
  description = "Free mental health education, self-reflection tools, and crisis resources.",
}: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);

  const shareLinks = [
    {
      label: "Share on Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:text-blue-600",
    },
    {
      label: "Share on Twitter / X",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:text-sky-500",
    },
    {
      label: "Share on LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:text-blue-700",
    },
    {
      label: "Share via email",
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`,
      color: "hover:text-teal-600",
    },
  ];

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
      } catch {
        // user cancelled or not supported
      }
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap" aria-label="Share this page">
      <span className="text-sm text-slate-500 font-medium">Share:</span>
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={`p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors ${link.color}`}
        >
          <link.icon className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
      {typeof window !== "undefined" && typeof navigator !== "undefined" && "share" in navigator && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleNativeShare}
          className="flex items-center gap-1.5 text-sm"
          aria-label="Share using device share menu"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Share
        </Button>
      )}
    </div>
  );
}
