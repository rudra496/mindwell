"use client"

import { Info } from "lucide-react"
import { useLanguage } from "@/lib/useLanguage"

interface EducationalDisclaimerProps {
  className?: string
}

export function EducationalDisclaimer({ className = "" }: EducationalDisclaimerProps) {
  const { language } = useLanguage()
  
  const content = {
    en: {
      title: "Educational Information",
      text: "This information is for educational purposes only and is not a medical diagnosis. Always consult with a qualified healthcare professional for proper diagnosis and treatment."
    },
    bn: {
      title: "শিক্ষামূলক তথ্য",
      text: "এই তথ্যটি শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে এবং এটি একটি চিকিৎসা নির্ণয় নয়। সঠিক নির্ণয় এবং চিকিৎসার জন্য সর্বদা একজন যোগ্য স্বাস্থ্যসেবা পেশাদারের সাথে পরামর্শ করুন।"
    }
  }
  
  const text = content[language]
  
  return (
    <div className={`rounded-lg bg-indigo-50 border-2 border-indigo-300 p-3 ${className}`}>
      <div className="flex items-start gap-2">
        <Info className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-semibold text-indigo-900 mb-1">
            {text.title}
          </h4>
          <p className="text-xs text-indigo-800">
            {text.text}
          </p>
        </div>
      </div>
    </div>
  )
}
