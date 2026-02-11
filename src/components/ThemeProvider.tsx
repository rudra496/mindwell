"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get theme from localStorage or system preference
    const stored = localStorage.getItem("mindwell_theme") as Theme | null
    if (stored === "light" || stored === "dark") {
      setThemeState(stored)
      document.documentElement.classList.toggle("dark", stored === "dark")
    } else {
      // Check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const initialTheme = prefersDark ? "dark" : "light"
      setThemeState(initialTheme)
      document.documentElement.classList.toggle("dark", prefersDark)
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    if (typeof window !== 'undefined') {
      localStorage.setItem("mindwell_theme", newTheme)
      document.documentElement.classList.toggle("dark", newTheme === "dark")
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  // Always provide context, even during SSR
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
