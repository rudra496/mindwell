"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"
import { useState, useEffect } from "react"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="h-5 w-5 text-gray-400" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full transition-all hover:scale-110"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-400" />
      )}
    </Button>
  )
}
