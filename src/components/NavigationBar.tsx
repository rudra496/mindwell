"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Brain,
  ClipboardList,
  Phone,
  Users,
  MessageCircle,
  Menu,
  X,
  Home,
  BookOpen,
  Sparkles,
  Gamepad2,
  Stethoscope
} from "lucide-react"

interface NavigationBarProps {
  onNavigate: (section: string) => void
}

export function NavigationBar({ onNavigate }: NavigationBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "home", label: "Home", icon: Home, color: "text-teal-600" },
    { id: "disorders", label: "Mental Health Info", icon: Stethoscope, color: "text-primary" },
    { id: "assessments", label: "Assessments", icon: ClipboardList, color: "text-secondary" },
    { id: "games", label: "Therapeutic Games", icon: Gamepad2, color: "text-accent" },
    { id: "therapy", label: "Therapy Techniques", icon: BookOpen, color: "text-teal-500" },
    { id: "meditation", label: "Meditation", icon: Sparkles, color: "text-pink-500" },
    { id: "chatbot", label: "AI Support", icon: MessageCircle, color: "text-indigo-500" },
    { id: "community", label: "Community", icon: Users, color: "text-purple-500" },
    { id: "crisis", label: "Crisis Support", icon: Phone, color: "text-red-600" }
  ]

  const handleNavClick = (id: string) => {
    onNavigate(id)
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-40 border-b-2 border-teal-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                MindWell
              </span>
            </button>

            {/* Navigation Items */}
            <div className="flex items-center gap-1">
              {navItems.slice(1).map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 ${item.color} hover:bg-gray-100 transition-all`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-40 border-b-2 border-teal-200">
        <div className="container mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Brain className="h-7 w-7 text-primary" />
              <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                MindWell
              </span>
            </button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="mt-3 pb-2 space-y-1 border-t pt-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full justify-start ${item.color} hover:bg-gray-100 transition-all min-h-[48px]`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Tablet Navigation (md breakpoint) */}
      <nav className="hidden md:block lg:hidden bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-40 border-b-2 border-teal-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                MindWell
              </span>
            </button>

            {/* Mobile Menu Button for Tablet */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Tablet Menu */}
          {mobileMenuOpen && (
            <div className="grid grid-cols-2 gap-2 border-t pt-2">
              {navItems.slice(1).map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 ${item.color} hover:bg-gray-100 transition-all justify-start min-h-[44px]`}
                >
                  <item.icon className="h-4 w-4" />
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
