"use client"

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/useLanguage'
import { Globe } from 'lucide-react'

/**
 * Language toggle component for switching between English and Bangla
 */
export function LanguageToggle() {
  const { language, changeLanguage, isClient } = useLanguage()

  if (!isClient) {
    return null // Prevent hydration mismatch
  }

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'bn' : 'en')
  }

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="min-h-[44px] flex items-center gap-2"
      aria-label={`Switch to ${language === 'en' ? 'Bangla' : 'English'}`}
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{language === 'en' ? 'বাংলা' : 'English'}</span>
    </Button>
  )
}
