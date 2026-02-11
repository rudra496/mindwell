"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Globe, Heart, TrendingUp } from "lucide-react"
import { useLanguage } from "@/lib/useLanguage"
import { translations, t } from "@/lib/i18n"

/**
 * SDG 3 (Good Health & Well-Being) Section
 * Explains impact with non-commercial tone
 */
export function SDGSection() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const impacts = [
    {
      icon: Globe,
      title: { en: "Global Reach", bn: "বৈশ্বিক পৌঁছানো" },
      description: { 
        en: "Accessible mental health resources for communities worldwide, regardless of location or income",
        bn: "অবস্থান বা আয় নির্বিশেষে বিশ্বব্যাপী সম্প্রদায়ের জন্য অ্যাক্সেসযোগ্য মানসিক স্বাস্থ্য সংস্থান"
      }
    },
    {
      icon: Heart,
      title: { en: "Community Impact", bn: "সম্প্রদায়ের প্রভাব" },
      description: { 
        en: "Supporting mental wellness through evidence-based, culturally-sensitive approaches",
        bn: "প্রমাণ-ভিত্তিক, সাংস্কৃতিকভাবে সংবেদনশীল পদ্ধতির মাধ্যমে মানসিক সুস্থতা সমর্থন করা"
      }
    },
    {
      icon: TrendingUp,
      title: { en: "Sustainable Growth", bn: "টেকসই বৃদ্ধি" },
      description: { 
        en: "Open-source platform ensuring long-term availability and continuous improvement",
        bn: "ওপেন-সোর্স প্ল্যাটফর্ম দীর্ঘমেয়াদী প্রাপ্যতা এবং ক্রমাগত উন্নতি নিশ্চিত করে"
      }
    }
  ]

  return (
    <section className="mb-12" id="sdg-mission">
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* SDG Logo Area */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Target className="h-16 w-16 text-white" />
              </div>
              <p className="text-center mt-3 text-sm font-bold text-blue-900">SDG 3</p>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-3">
                {mounted ? t(translations.sdg.title, language) : "SDG 3: Good Health & Well-Being"}
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                {mounted ? t(translations.sdg.description, language) : "MindWell contributes to the United Nations Sustainable Development Goal 3 by providing accessible mental health resources and support to communities worldwide."}
              </p>

              {/* Impact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {impacts.map((impact, index) => (
                  <div 
                    key={index}
                    className="bg-white/80 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-all"
                  >
                    <impact.icon className="h-8 w-8 text-blue-600 mb-2" />
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">
                      {mounted ? t(impact.title, language) : impact.title.en}
                    </h3>
                    <p className="text-gray-600 text-xs">
                      {mounted ? t(impact.description, language) : impact.description.en}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-100/50 rounded-lg p-4 border-l-4 border-blue-600">
                <p className="text-sm text-blue-900">
                  {mounted
                    ? (language === 'en'
                        ? "As a non-profit, open-source initiative, MindWell demonstrates how technology can advance public health goals and contribute to national and global well-being."
                        : "একটি অলাভজনক, ওপেন-সোর্স উদ্যোগ হিসাবে, মাইন্ডওয়েল প্রদর্শন করে কীভাবে প্রযুক্তি জনস্বাস্থ্য লক্ষ্যগুলিকে অগ্রসর করতে এবং জাতীয় ও বৈশ্বিক কল্যাণে অবদান রাখতে পারে।")
                    : "As a non-profit, open-source initiative, MindWell demonstrates how technology can advance public health goals and contribute to national and global well-being."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
