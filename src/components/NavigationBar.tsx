"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/Logo"
import { LanguageToggle } from "@/components/LanguageToggle"
import { GlobalSearch } from "@/components/GlobalSearch"
import {
  Phone,
  Users,
  Menu,
  Home,
  Target,
  Mail,
  AlertCircle,
  HelpCircle,
  Search,
} from "lucide-react"

type NavItem = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "crisis-emergency-help", label: "Emergency Support", icon: AlertCircle },
  { id: "community", label: "Community", icon: Users },
  { id: "faq", label: "FAQ", icon: HelpCircle, href: "/faq" },
  { id: "crisis-resources", label: "Crisis Resources", icon: Phone, href: "/crisis-resources" },
  { id: "sdg-our-mission", label: "Who We Are & Our Goals", icon: Target },
  { id: "funding-support", label: "Funding & Support", icon: Mail },
]

export function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

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
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1 text-gray-700 hover:text-teal-700 hover:bg-teal-50"
                aria-label="Search (Ctrl+K)"
              >
                <Search className="h-4 w-4" />
                <span className="text-xs font-medium hidden xl:inline">Search</span>
                <kbd className="hidden xl:inline-flex text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
              </Button>
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(true)}
                className="p-2"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
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
