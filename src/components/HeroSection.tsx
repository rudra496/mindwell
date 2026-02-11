"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "@/components/AnimatedBackground"
import { Logo } from "@/components/Logo"
import { Phone, Heart } from "lucide-react"
import { useLanguage } from "@/lib/useLanguage"
import { translations, t } from "@/lib/i18n"

interface HeroSectionProps {
  onGetSupport?: () => void
  onEmergencyHelp?: () => void
}

/**
 * Hero Section with calm, supportive messaging and animated background
 */
export function HeroSection({ onGetSupport, onEmergencyHelp }: HeroSectionProps) {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative mb-12 rounded-2xl overflow-hidden min-h-[500px] flex items-center justify-center">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 py-16 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo variant="full" className="h-16 sm:h-20 drop-shadow-lg" />
        </div>
        
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900">
          {mounted
            ? (language === 'en'
                ? "Your Mental Health Matters"
                : "আপনার মানসিক স্বাস্থ্য গুরুত্বপূর্ণ")
            : "Your Mental Health Matters"}
        </h1>
        
        {/* Sub-headline */}
        <p className="text-xl sm:text-2xl text-gray-700 mb-3 font-medium">
          {mounted ? t(translations.hero.subtitle, language) : "World's Largest Open-Source Mental Health Platform"}
        </p>
        
        {/* Description */}
        <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          {mounted ? t(translations.hero.description, language) : "Comprehensive, scientifically-backed, free mental health support with 63+ disorders, 20 validated assessments, 16 therapeutic games, 14 meditations, 20 therapy techniques, and crisis resources."}
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary CTA */}
          <Button 
            onClick={onGetSupport}
            size="lg"
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-lg px-8 py-6 min-h-[56px] shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            <Heart className="h-5 w-5 mr-2" />
            {mounted ? t(translations.hero.getSupportBtn, language) : "Get Support"}
          </Button>
          
          {/* Secondary CTA */}
          <Button 
            onClick={onEmergencyHelp}
            size="lg"
            variant="outline"
            className="bg-white/90 hover:bg-white border-2 border-red-500 text-red-700 hover:text-red-800 text-lg px-8 py-6 min-h-[56px] shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Phone className="h-5 w-5 mr-2" />
            {mounted ? t(translations.hero.emergencyHelpBtn, language) : "Emergency Help"}
          </Button>
        </div>
        
        {/* Trust Badge */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{mounted ? (language === 'en' ? "100% Free" : "১০০% বিনামূল্যে") : "100% Free"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>{mounted ? (language === 'en' ? "Evidence-Based" : "প্রমাণ-ভিত্তিক") : "Evidence-Based"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>{mounted ? (language === 'en' ? "Open-Source" : "ওপেন-সোর্স") : "Open-Source"}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
            <span>{mounted ? (language === 'en' ? "Accessible 24/7" : "২৪/৭ অ্যাক্সেসযোগ্য") : "Accessible 24/7"}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
