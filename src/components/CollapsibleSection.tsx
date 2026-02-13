"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { LucideIcon } from "lucide-react"

interface CollapsibleSectionProps {
  title: string
  icon: LucideIcon
  iconColor?: string
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}

/**
 * Reusable collapsible section component for homepage reorganization
 * Shows title + icon by default, expands to show full content on click
 */
export function CollapsibleSection({
  title,
  icon: Icon,
  iconColor = "text-teal-600 dark:text-teal-400",
  defaultOpen = false,
  children,
  className = ""
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Card className={`border-2 hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 flex items-center justify-center`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <CardTitle className="text-xl sm:text-2xl text-gray-900 dark:text-gray-100">
              {title}
            </CardTitle>
          </div>
          <button 
            className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            aria-label={isOpen ? "Collapse section" : "Expand section"}
          >
            {isOpen ? (
              <ChevronUp className="h-6 w-6" />
            ) : (
              <ChevronDown className="h-6 w-6" />
            )}
          </button>
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="pt-0 animate-fade-in">
          {children}
        </CardContent>
      )}
    </Card>
  )
}
