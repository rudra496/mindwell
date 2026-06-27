"use client"

import { useState, useEffect } from 'react'
import { Language, SupportedLanguage, getCurrentLanguage, isSupportedLanguage, setCurrentLanguage } from './i18n'

/**
 * Hook for managing language state across the application.
 *
 * SPA-native: switching language updates localStorage, sets <html lang>, and
 * dispatches a 'languageChange' event that every useLanguage() instance listens
 * for — so the whole tree re-renders in the new language WITHOUT a full page
 * reload. (The old implementation called window.location.reload(), which
 * discarded in-progress state and refetched everything.)
 */
export function useLanguage() {
  const [language, setLanguage] = useState<SupportedLanguage>('en')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const apply = (lang: SupportedLanguage) => {
      setLanguage(lang)
      if (typeof document !== 'undefined') document.documentElement.lang = lang
    }

    const currentLang = getCurrentLanguage()
    apply(isSupportedLanguage(currentLang) ? currentLang : 'en')

    const onLanguageChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as SupportedLanguage
      apply(isSupportedLanguage(detail) ? detail : 'en')
    }
    window.addEventListener('languageChange', onLanguageChange)
    return () => window.removeEventListener('languageChange', onLanguageChange)
  }, [])

  const changeLanguage = (newLang: Language) => {
    const normalizedLang: SupportedLanguage = isSupportedLanguage(newLang) ? newLang : 'en'
    setCurrentLanguage(normalizedLang)
    if (typeof document !== 'undefined') document.documentElement.lang = normalizedLang
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChange', { detail: normalizedLang }))
    }
  }

  return {
    language,
    changeLanguage,
    isClient,
  }
}
