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
      title: "Caution / সতর্কতা",
      text: "এই তথ্য গুলো শুধুমাত্র সাইকো-এডুকেশনের জন্য প্রযোজ্য। সঠিক মানসিক সমস্যা নির্ণয়, ঔষধ কিংবা সাইকোথেরাপির জন্য পেশাদার সাইকিয়াট্রিস্ট অথবা আমাদের ক্লিনিক্যাল সাইকোলোজিস্টের সাথে পরামর্শ করুন।"
    },
    bn: {
      title: "Caution / সতর্কতা",
      text: "এই তথ্য গুলো শুধুমাত্র সাইকো-এডুকেশনের জন্য প্রযোজ্য। সঠিক মানসিক সমস্যা নির্ণয়, ঔষধ কিংবা সাইকোথেরাপির জন্য পেশাদার সাইকিয়াট্রিস্ট অথবা আমাদের ক্লিনিক্যাল সাইকোলোজিস্টের সাথে পরামর্শ করুন।"
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
