/**
 * Canonical site configuration for MindWell.
 * All SEO-sensitive code (metadata, JSON-LD, sitemap, robots) should
 * import from here rather than hard-coding a URL string.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://mindwell-navy.vercel.app"

export const SITE_NAME = "MindWell"

export const SITE_DESCRIPTION =
  "MindWell is an open-source mental health platform. MindWell Support provides free, ethical mental health support, crisis guidance, and psychologist access worldwide."

/** Absolute URL helper – joins SITE_URL with a path (path must start with /). */
export function siteUrl(path: string = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`
  return `${SITE_URL}${clean}`
}

export const LOCALES = ["en", "bn"] as const
export type Locale = (typeof LOCALES)[number]

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  bn: "বাংলা",
}
