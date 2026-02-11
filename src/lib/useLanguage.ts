"use client"

import { useState, useEffect } from 'react'
import { Language, getCurrentLanguage, setCurrentLanguage } from './i18n'

/**
 * Hook for managing language state across the application
 */
export function useLanguage() {
  const [language, setLanguage] = useState<Language>('en')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const currentLang = getCurrentLanguage()
    setLanguage(currentLang)
  }, [])

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang)
    setCurrentLanguage(newLang)
    
    // Trigger a custom event for other components to listen to
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }))
    }
  }

  return {
    language,
    changeLanguage,
    isClient,
  }
}
