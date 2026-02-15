"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
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
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Card
      ref={cardRef}
      id={id}
      className={`border-2 overflow-hidden dark:border-gray-700 transition-all duration-500 ${!stockPhotoUrl ? "shadow-lg hover:shadow-xl transition-shadow transform-gpu hover:scale-[1.01] motion-reduce:hover:scale-100" : ""} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${className}`}
    >
      <div
        className={`relative min-h-[240px] md:min-h-[320px] cursor-pointer group bg-gradient-to-br ${bgGradient} transition-all duration-300 ${!stockPhotoUrl ? "border-b border-white/50 dark:border-slate-700 shadow-inner bg-[length:200%_200%] bg-[position:0%_50%] hover:bg-[position:100%_50%] motion-reduce:hover:bg-[position:0%_50%]" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {stockPhotoUrl && (
          <div className="absolute inset-0 overflow-hidden opacity-[0.42] group-hover:opacity-[0.5] transition-opacity">
            <Image
              src={stockPhotoUrl}
              alt={stockPhotoAlt}
              aria-hidden={stockPhotoAlt === ""}
              fill
              className="object-cover saturate-75"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1200px"
            />
          </div>
        )}

        <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${iconColor}`} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 drop-shadow-sm text-center md:text-left">
              {title}
            </h2>
          </div>

          <button
            className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors ml-2 flex-shrink-0"
            aria-label={isOpen ? "Collapse section" : "Expand section"}
          >
            {isOpen ? (
              <ChevronUp className="h-6 w-6 sm:h-7 sm:w-7" />
            ) : (
              <ChevronDown className="h-6 w-6 sm:h-7 sm:w-7" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <CardContent className="p-6 sm:p-8 pt-6 animate-fade-in bg-white dark:bg-slate-800 text-xl [&_button]:text-lg [&_button]:px-7 [&_button]:py-3 [&_button]:h-auto">
          {children}
        </CardContent>
      )}
    </Card>
  )
}
