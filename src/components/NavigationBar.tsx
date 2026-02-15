"use client"

import { useState } from "react"
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
  MapPin,
  Mail,
} from "lucide-react"

type NavItem = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "learn-awareness", label: "Learn & Awareness", icon: BookOpen },
  { id: "self-reflection-tools", label: "Self-Reflection Tools", icon: ClipboardList },
  { id: "therapy-meditation", label: "Therapy & Meditation", icon: Sparkles },
  { id: "psychologists-page", label: "Psychologists", icon: Stethoscope, href: "/psychologists" },
  { id: "crisis-resources", label: "Crisis Resources by Country", icon: Phone, href: "/faq" },
  { id: "free-services-bangladesh", label: "Free Services in Bangladesh 🇧🇩", icon: MapPin, href: "/bangladesh-services" },
  { id: "sdg-our-mission", label: "SDG & Our Mission", icon: Target },
  { id: "community", label: "Community", icon: Users },
  { id: "funding-support", label: "Funding & Support", icon: Mail },
]

export function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (item: NavItem) => {
    if (item.href) {
      window.location.href = item.href
      setMobileMenuOpen(false)
      return
    }

    window.location.href = `/#${item.id}`
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="hidden lg:block bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-teal-200" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <button onClick={() => handleNavClick(navItems[0])} className="flex items-center gap-2" aria-label="MindWell Home">
              <Logo variant="full" className="h-8" />
            </button>

            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick(item)}
                  className="flex items-center gap-1 text-gray-700 hover:text-teal-700 hover:bg-teal-50"
                  aria-label={item.label}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>
              ))}
              <LanguageToggle />
            </div>
          </div>
        </div>
      </nav>

      <nav className="lg:hidden bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-teal-200" role="navigation" aria-label="Mobile navigation">
        <div className="container mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => handleNavClick(navItems[0])} className="flex items-center gap-2" aria-label="MindWell Home">
              <Logo variant="full" className="h-7" />
            </button>

            <div className="flex items-center gap-2">
              <LanguageToggle />
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="mt-3 pb-2 space-y-1 border-t border-slate-200 pt-2 bg-white/95">
              {navItems.map((item) => (
                <Button key={item.id} variant="ghost" onClick={() => handleNavClick(item)} className="w-full justify-start text-gray-700 hover:text-teal-700 hover:bg-teal-50 min-h-[44px]">
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
