"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stethoscope, Shield, Lock, UserCheck, Mail } from "lucide-react"
import { useLanguage } from "@/lib/useLanguage"
import { translations, t } from "@/lib/i18n"

interface PsychologistsAccessSectionProps {
  onRequestSupport?: () => void
}

/**
 * Access to Psychologists Section
 * Structured section explaining availability, ethics, confidentiality
 */
export function PsychologistsAccessSection({ onRequestSupport }: PsychologistsAccessSectionProps) {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      icon: UserCheck,
      title: { en: "Qualified Professionals", bn: "যোগ্য পেশাদার" },
      description: { 
        en: "Licensed clinical psychologists with expertise in various mental health areas",
        bn: "বিভিন্ন মানসিক স্বাস্থ্য ক্ষেত্রে দক্ষতা সহ লাইসেন্সপ্রাপ্ত ক্লিনিক্যাল মনোবিজ্ঞানী"
      }
    },
    {
      icon: Lock,
      title: { en: "Complete Confidentiality", bn: "সম্পূর্ণ গোপনীয়তা" },
      description: { 
        en: "All sessions are strictly confidential and follow professional ethics guidelines",
        bn: "সমস্ত সেশন কঠোরভাবে গোপনীয় এবং পেশাদার নৈতিকতা নির্দেশিকা অনুসরণ করে"
      }
    },
    {
      icon: Shield,
      title: { en: "Ethical Standards", bn: "নৈতিক মান" },
      description: { 
        en: "Committed to highest standards of professional conduct and patient care",
        bn: "পেশাদার আচরণ এবং রোগীর যত্নের সর্বোচ্চ মানের প্রতি প্রতিশ্রুতিবদ্ধ"
      }
    }
  ]

  return (
    <section className="mb-12" id="psychologists">
      <Card className="border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 overflow-hidden">
        <CardHeader className="bg-white/50 border-b border-teal-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-3xl sm:text-4xl font-bold text-teal-900">
              {mounted ? t(translations.psychologists.title, language) : "Access to Psychologists"}
            </CardTitle>
          </div>
          <p className="text-gray-700 text-lg">
            {mounted ? t(translations.psychologists.description, language) : "Connect with qualified psychologists who can provide professional guidance and support."}
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-5 border border-teal-200 hover:shadow-lg transition-all"
              >
                <feature.icon className="h-10 w-10 text-teal-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">
                  {mounted ? t(feature.title, language) : feature.title.en}
                </h3>
                <p className="text-gray-600 text-sm">
                  {mounted ? t(feature.description, language) : feature.description.en}
                </p>
              </div>
            ))}
          </div>

          {/* Information Box */}
          <div className="bg-teal-100/50 rounded-lg p-6 border-l-4 border-teal-600 mb-6">
            <h3 className="font-bold text-teal-900 mb-3">
              {mounted
                ? (language === 'en' ? "Now Available ✓" : "এখন উপলব্ধ ✓")
                : "Now Available ✓"}
            </h3>
            <p className="text-gray-700 mb-4">
              {mounted
                ? (language === 'en'
                    ? "Professional mental health support is now available through licensed psychologist Md. Rifat Hasan Tarofder. This service is available free of charge to university students in Bangladesh."
                    : "পেশাদার মানসিক স্বাস্থ্য সহায়তা এখন লাইসেন্সপ্রাপ্ত মনোবিজ্ঞানী মোঃ রিফাত হাসান তারোফদারের মাধ্যমে উপলব্ধ। এই পরিষেবাটি বাংলাদেশের বিশ্ববিদ্যালয়ের শিক্ষার্থীদের জন্য বিনামূল্যে উপলব্ধ।")
                : "Professional mental health support is now available through licensed psychologist Md. Rifat Hasan Tarofder. This service is available free of charge to university students in Bangladesh."}
            </p>
            
            {/* CTA Button */}
            <Button 
              onClick={onRequestSupport}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
            >
              <Mail className="h-4 w-4 mr-2" />
              {mounted ? t(translations.psychologists.requestBtn, language) : "Request Support"}
            </Button>
          </div>

          {/* Note */}
          <p className="text-xs text-gray-600 text-center">
            {mounted
              ? (language === 'en'
                  ? "All psychologist sessions will maintain strict confidentiality and follow professional ethical guidelines. No payment or commercial transaction will be involved."
                  : "সমস্ত মনোবিজ্ঞানী সেশন কঠোর গোপনীয়তা বজায় রাখবে এবং পেশাদার নৈতিক নির্দেশিকা অনুসরণ করবে। কোন অর্থ প্রদান বা বাণিজ্যিক লেনদেন জড়িত থাকবে না।")
              : "All psychologist sessions will maintain strict confidentiality and follow professional ethical guidelines. No payment or commercial transaction will be involved."}
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
