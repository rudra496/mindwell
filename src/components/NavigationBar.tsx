"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/Logo"
import { LanguageToggle } from "@/components/LanguageToggle"
import { GlobalSearch } from "@/components/GlobalSearch"
import { useLanguage } from "@/lib/useLanguage"
import { tKey } from "@/lib/i18n"
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
  MapPin,
  Newspaper,
} from "lucide-react"

type NavItem = {
  id: string
  labelKey: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
}

const navItems: NavItem[] = [
  { id: "home", labelKey: "navBar.home", icon: Home, href: "/" },
  { id: "crisis-emergency-help", labelKey: "navBar.emergencySupport", icon: AlertCircle },
  { id: "community", labelKey: "navBar.community", icon: Users },
  { id: "crisis-resources", labelKey: "navBar.crisisResources", icon: Phone, href: "/crisis-resources" },
  { id: "sdg-our-mission", labelKey: "navBar.whoWeAre", icon: Target },
  { id: "funding-support", labelKey: "navBar.fundingSupport", icon: Mail },
  { id: "blog", labelKey: "navBar.blog", icon: Newspaper, href: "/blog" },
  { id: "faq", labelKey: "navBar.faq", icon: HelpCircle, href: "/faq" },
]

export function NavigationBar() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { language } = useLanguage()

  const handleNavClick = (item: NavItem) => {
    setMobileMenuOpen(false)
    if (item.href) {
      router.push(item.href)
      return
    }
    router.push(`/#${item.id}`)
  }

  return (
    <>
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
      <nav className="hidden lg:block bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 transition-colors" role="navigation" aria-label={tKey('navBar.mainNavigation', language)}>
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <button onClick={() => handleNavClick(navItems[0])} className="flex items-center gap-2" aria-label={tKey('navBar.homeAria', language)}>
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
                  aria-label={tKey(item.labelKey, language)}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{tKey(item.labelKey, language)}</span>
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1 text-gray-700 hover:text-teal-700 hover:bg-teal-50"
                aria-label={tKey('navBar.searchAria', language)}
              >
                <Search className="h-4 w-4" />
                <span className="text-xs font-medium hidden xl:inline">{tKey('navBar.search', language)}</span>
                <kbd className="hidden xl:inline-flex text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.dispatchEvent(new CustomEvent("mindwell:start-tour"))}
                className="flex items-center gap-1 text-gray-700 hover:text-teal-700 hover:bg-teal-50"
                aria-label={tKey('navBar.tourAria', language)}
              >
                <MapPin className="h-4 w-4" />
                <span className="text-xs font-medium hidden xl:inline">{tKey('navBar.tour', language)}</span>
              </Button>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </nav>

      <nav className="lg:hidden bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 transition-colors" role="navigation" aria-label={tKey('navBar.mobileNavigation', language)}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => handleNavClick(navItems[0])} className="flex items-center gap-2" aria-label={tKey('navBar.homeAria', language)}>
              <Logo variant="full" className="h-7" />
            </button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(true)}
                className="p-2"
                aria-label={tKey('navBar.search', language)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <LanguageToggle />
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2" aria-label={mobileMenuOpen ? tKey('navBar.closeMenu', language) : tKey('navBar.openMenu', language)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="mt-3 pb-4 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4 bg-white dark:bg-slate-900">
              {navItems.map((item) => (
                <Button key={item.id} variant="ghost" onClick={() => handleNavClick(item)} className="w-full justify-start text-gray-700 hover:text-teal-700 hover:bg-teal-50 min-h-[44px]">
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="text-sm font-medium">{tKey(item.labelKey, language)}</span>
                </Button>
              ))}
              <Button
                variant="ghost"
                onClick={() => { document.dispatchEvent(new CustomEvent("mindwell:start-tour")); setMobileMenuOpen(false); }}
                className="w-full justify-start text-gray-700 hover:text-teal-700 hover:bg-teal-50 min-h-[44px]"
              >
                <MapPin className="h-5 w-5 mr-3" />
                <span className="text-sm font-medium">{tKey('navBar.takeTour', language)}</span>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
