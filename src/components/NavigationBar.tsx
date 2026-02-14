"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/Logo"
import { LanguageToggle } from "@/components/LanguageToggle"
import {
  ClipboardList,
  Phone,
  Users,
  Menu,
  Home,
  BookOpen,
  Sparkles,
  Stethoscope,
  Target,
  Heart,
  Mail
} from "lucide-react"
import { useLanguage } from "@/lib/useLanguage"
import { translations, t } from "@/lib/i18n"

interface NavigationBarProps {
  onNavigate: (section: string) => void
}

export function NavigationBar({ onNavigate }: NavigationBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { id: "home", label: mounted ? t(translations.nav.home, language) : "Home", icon: Home },
    { id: "education-resources", label: mounted ? (language === 'en' ? "Learn & Awareness" : "শিখুন এবং সচেতনতা") : "Learn & Awareness", icon: BookOpen },
    { id: "assessment", label: mounted ? (language === 'en' ? "Self-Reflection Tools" : "স্ব-প্রতিফলন সরঞ্জাম") : "Self-Reflection Tools", icon: ClipboardList },
    { id: "our-services", label: mounted ? t(translations.nav.therapyMeditation, language) : "Therapy & Meditation", icon: Sparkles },
    { id: "psychologists-page", label: mounted ? t(translations.nav.psychologists, language) : "Psychologists", icon: Stethoscope },
    { id: "crisis-resources", label: mounted ? t(translations.nav.crisisHelp, language) : "Crisis & Emergency", icon: Phone },
    { id: "bangladesh-support", label: mounted ? t(translations.nav.bangladeshServices, language) : "Bangladesh Services 🇧🇩", icon: Heart },
    { id: "sdg-goals", label: mounted ? t(translations.nav.sdgMission, language) : "SDG & Mission", icon: Target },
    { id: "contact-us", label: mounted ? t(translations.nav.contact, language) : "Contact", icon: Mail },
    { id: "community", label: "Community", icon: Users },
  ]

  const handleNavClick = (id: string) => {
    if (id === "psychologists-page") {
      window.location.href = "/psychologists"
      return
    }
    onNavigate(id)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="hidden lg:block bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-40 border-b-2 border-teal-200" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-2"
              aria-label="MindWell Home"
            >
              <Logo variant="full" className="h-8" />
            </button>

            <div className="flex items-center gap-1">
              {navItems.slice(1).map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center gap-2 text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all"
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              ))}
              <LanguageToggle />
            </div>
          </div>
        </div>
      </nav>

      <nav className="lg:hidden bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-40 border-b-2 border-teal-200" role="navigation" aria-label="Mobile navigation">
        <div className="container mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1"
              aria-label="MindWell Home"
            >
              <Logo variant="full" className="h-7" />
            </button>

            <div className="flex items-center gap-2">
              <LanguageToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <Menu className="h-6 w-6 rotate-90 transition-transform" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="mt-3 pb-2 space-y-1 border-t border-slate-200 pt-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavClick(item.id)}
                  className="w-full justify-start text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-all min-h-[48px]"
                  aria-label={item.label}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
