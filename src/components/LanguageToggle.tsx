"use client"

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/lib/useLanguage'
import { tKey } from '@/lib/i18n'
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
      aria-label={language === 'en' ? tKey('languageToggle.switchToBangla', language) : tKey('languageToggle.switchTo', language)}
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{language === 'en' ? tKey('languageToggle.bangla', language) : tKey('languageToggle.english', language)}</span>
    </Button>
  )
}
