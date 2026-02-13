"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react"

interface MinimalSectionProps {
  id: string
  title: string
  icon: LucideIcon
  iconColor?: string
  stockPhotoUrl?: string
  stockPhotoAlt?: string
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
  bgGradient?: string
}

/**
 * Minimal expandable section for new homepage design
 * Shows: Title + Stock Photo + Icon/Animation
 * Expands on click to show full content
 */
export function MinimalSection({
  id,
  title,
  icon: Icon,
  iconColor = "text-teal-600 dark:text-teal-400",
  stockPhotoUrl,
  stockPhotoAlt = "",
  defaultOpen = false,
  children,
  className = "",
  bgGradient = "from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20"
}: MinimalSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Card 
      id={id}
      className={`border-2 hover:shadow-xl transition-all duration-300 overflow-hidden ${className} dark:border-gray-700`}
    >
      {/* Collapsed View - Minimal Display */}
      <div 
        className={`relative cursor-pointer group bg-gradient-to-br ${bgGradient} transition-all duration-300`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Stock Photo Background with Transparent Overlay */}
        {stockPhotoUrl && (
          <div className="absolute inset-0 overflow-hidden opacity-30 group-hover:opacity-40 transition-opacity">
            <img 
              src={stockPhotoUrl} 
              alt={stockPhotoAlt}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* Animated Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${iconColor} group-hover:scale-110 transition-transform`} />
            </div>
            
            {/* Title */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 drop-shadow-sm">
              {title}
            </h2>
          </div>
          
          {/* Expand/Collapse Button */}
          <button 
            className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors ml-4 flex-shrink-0"
            aria-label={isOpen ? "Collapse section" : "Expand section"}
          >
            {isOpen ? (
              <ChevronUp className="h-6 w-6 sm:h-7 sm:w-7 animate-bounce-soft" />
            ) : (
              <ChevronDown className="h-6 w-6 sm:h-7 sm:w-7 animate-bounce-soft" />
            )}
          </button>
        </div>
      </div>
      
      {/* Expanded Content */}
      {isOpen && (
        <CardContent className="p-6 sm:p-8 pt-6 animate-fade-in bg-white dark:bg-slate-800">
          {children}
        </CardContent>
      )}
    </Card>
  )
}
