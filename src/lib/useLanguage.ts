"use client"

import { useState, useEffect } from 'react'
import { Language, SupportedLanguage, getCurrentLanguage, isSupportedLanguage, setCurrentLanguage } from './i18n'

/**
 * Hook for managing language state across the application
 */
export function useLanguage() {
  const [language, setLanguage] = useState<SupportedLanguage>('en')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const currentLang = getCurrentLanguage()
    if (isSupportedLanguage(currentLang)) {
      setLanguage(currentLang)
      document.documentElement.lang = currentLang
    } else {
      setLanguage('en')
      document.documentElement.lang = 'en'
    }
    
    // Restore scroll position after language change refresh
    const savedScrollPosition = sessionStorage.getItem('mindwell_scroll_position')
    if (savedScrollPosition) {
      const scrollY = parseInt(savedScrollPosition, 10)
      if (!isNaN(scrollY) && scrollY >= 0) {
        window.scrollTo(0, scrollY)
      }
      sessionStorage.removeItem('mindwell_scroll_position')
    }
  }, [])

  const changeLanguage = (newLang: Language) => {
    const normalizedLang: SupportedLanguage = isSupportedLanguage(newLang) ? newLang : 'en'

    setLanguage(normalizedLang)
    setCurrentLanguage(normalizedLang)
    document.documentElement.lang = normalizedLang
    
    // Trigger a custom event for other components to listen to
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChange', { detail: normalizedLang }))
      
      // Auto-refresh the page after language change
      // Save current scroll position to restore after refresh
      const scrollY = window.scrollY
      sessionStorage.setItem('mindwell_scroll_position', scrollY.toString())
      
      // Refresh the page
      window.location.reload()
    }
  }

  return {
    language,
    changeLanguage,
    isClient,
  }
}
