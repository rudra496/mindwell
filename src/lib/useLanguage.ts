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
    
    // Restore scroll position after language change refresh
    const savedScrollPosition = sessionStorage.getItem('mindwell_scroll_position')
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10))
      sessionStorage.removeItem('mindwell_scroll_position')
    }
  }, [])

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang)
    setCurrentLanguage(newLang)
    
    // Trigger a custom event for other components to listen to
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChange', { detail: newLang }))
      
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
