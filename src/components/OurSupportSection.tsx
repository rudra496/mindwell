"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Lightbulb, Stethoscope, Users } from "lucide-react"
import { useLanguage } from "@/lib/useLanguage"
import { translations, t } from "@/lib/i18n"

/**
 * Our Support Section - Explains emotional support, self-help, professional guidance, community care
 */
export function OurSupportSection() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const supportItems = [
    {
      icon: Heart,
      title: mounted ? t(translations.support.emotional, language) : "Emotional Support",
      description: mounted ? t(translations.support.emotionalDesc, language) : "Compassionate resources for managing emotions and mental health challenges",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Lightbulb,
      title: mounted ? t(translations.support.selfHelp, language) : "Self-Help Resources",
      description: mounted ? t(translations.support.selfHelpDesc, language) : "Evidence-based tools and techniques for personal growth and wellness",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: Stethoscope,
      title: mounted ? t(translations.support.professional, language) : "Professional Guidance",
      description: mounted ? t(translations.support.professionalDesc, language) : "Access to qualified psychologists and mental health professionals",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: Users,
      title: mounted ? t(translations.support.community, language) : "Community Care",
      description: mounted ? t(translations.support.communityDesc, language) : "Safe peer support spaces for sharing experiences and finding connection",
      gradient: "from-purple-500 to-indigo-500"
    }
  ]

  return (
    <section className="mb-12" id="our-support">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent mb-3">
          {mounted ? t(translations.support.title, language) : "Our Support"}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto px-4">
          {mounted 
            ? (language === 'en' 
                ? "We provide comprehensive support through four key pillars" 
                : "আমরা চারটি মূল স্তম্ভের মাধ্যমে ব্যাপক সহায়তা প্রদান করি")
            : "We provide comprehensive support through four key pillars"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {supportItems.map((item, index) => (
          <Card 
            key={index} 
            className="hover:shadow-xl transition-all duration-300 border-2 hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 mx-auto`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-center text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-sm">
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
