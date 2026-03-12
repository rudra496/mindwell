"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentLanguage } from "@/lib/i18n"

interface BlogTranslationRedirectProps {
  currentLocale: string
  translatedSlug?: string
  translatedLocale?: string
}

/**
 * Transparent client component that auto-redirects to the translated version
 * of a blog post when the user's stored language preference does not match
 * the current post's locale (and a translation exists).
 *
 * This enables the global language toggle button to control blog post language:
 * 1. User toggles language → useLanguage saves new language to localStorage and reloads.
 * 2. Page reloads → this component mounts and checks localStorage.
 * 3. If stored language ≠ current post locale and a translatedSlug exists → redirects.
 */
export function BlogTranslationRedirect({
  currentLocale,
  translatedSlug,
  translatedLocale,
}: BlogTranslationRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    if (!translatedSlug || !translatedLocale) return

    const preferredLanguage = getCurrentLanguage()

    // Only redirect when the preferred language matches the translated post's locale
    // and differs from the current post's locale.
    if (preferredLanguage === translatedLocale && preferredLanguage !== currentLocale) {
      router.replace(`/blog/${translatedSlug}`)
    }
  }, [currentLocale, translatedSlug, translatedLocale, router])

  return null
}
