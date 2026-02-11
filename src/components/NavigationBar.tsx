"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/Logo"
import { LanguageToggle } from "@/components/LanguageToggle"
import { ThemeToggle } from "@/components/ThemeToggle"
import {
  ClipboardList,
  Phone,
  Users,
  MessageCircle,
  Menu,
  Home,
  BookOpen,
  Sparkles,
  Gamepad2,
  Stethoscope,
  Target,
  Heart,
  Info,
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

  // Navigation items organized by new requirements
  const navItems = [
    { id: "home", label: mounted ? t(translations.nav.home, language) : "Home", icon: Home },
    { id: "disorders", label: mounted ? (language === 'en' ? "Learn & Awareness" : "শিখুন এবং সচেতনতা") : "Learn & Awareness", icon: BookOpen },
    { id: "assessments", label: mounted ? (language === 'en' ? "Self-Reflection Tools" : "স্ব-প্রতিফলন সরঞ্জাম") : "Self-Reflection Tools", icon: ClipboardList },
    { id: "therapy", label: mounted ? t(translations.nav.therapyMeditation, language) : "Therapy & Meditation", icon: Sparkles },
    { id: "psychologists", label: mounted ? t(translations.nav.psychologists, language) : "Psychologists", icon: Stethoscope },
    { id: "crisis", label: mounted ? t(translations.nav.crisisHelp, language) : "Crisis & Emergency", icon: Phone },
    { id: "bangladesh", label: mounted ? t(translations.nav.bangladeshServices, language) : "Bangladesh Services 🇧🇩", icon: Heart },
    { id: "sdg", label: mounted ? t(translations.nav.sdgMission, language) : "SDG & Mission", icon: Target },
    { id: "about", label: mounted ? t(translations.nav.about, language) : "About", icon: Info },
  ]

  const handleNavClick = (id: string) => {
    onNavigate(id)
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md sticky top-0 z-40 border-b-2 border-teal-200 dark:border-teal-800 transition-colors" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-2"
              aria-label="MindWell Home"
            >
              <Logo variant="full" className="h-8" />
            </button>

            {/* Navigation Items */}
            <div className="flex items-center gap-1">
              {navItems.slice(1).map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-center gap-2 text-gray-700 hover:text-teal-600 hover:bg-teal-50 dark:text-gray-200 dark:hover:text-teal-400 dark:hover:bg-slate-800 transition-all"
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              ))}
              
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Language Toggle */}
              <LanguageToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md sticky top-0 z-40 border-b-2 border-teal-200 dark:border-teal-800 transition-colors" role="navigation" aria-label="Mobile navigation">
        <div className="container mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1"
              aria-label="MindWell Home"
            >
              <Logo variant="full" className="h-7" />
            </button>

            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Language Toggle */}
              <LanguageToggle />
              
              {/* Mobile Menu Button */}
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

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="mt-3 pb-2 space-y-1 border-t dark:border-slate-700 pt-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavClick(item.id)}
                  className="w-full justify-start text-gray-700 hover:text-teal-600 hover:bg-teal-50 dark:text-gray-200 dark:hover:text-teal-400 dark:hover:bg-slate-800 transition-all min-h-[48px]"
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
