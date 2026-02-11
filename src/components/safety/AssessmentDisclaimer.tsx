"use client"

import { Info } from "lucide-react"
import { useLanguage } from "@/lib/useLanguage"

interface AssessmentDisclaimerProps {
  className?: string
}

export function AssessmentDisclaimer({ className = "" }: AssessmentDisclaimerProps) {
  const { language } = useLanguage()
  
  const content = {
    en: {
      title: "Before You Begin",
      text: "This self-reflection tool is for educational purposes only. Results are not a diagnosis. If you have concerns about your mental health, please consult a qualified professional."
    },
    bn: {
      title: "শুরু করার আগে",
      text: "এই আত্ম-প্রতিফলন সরঞ্জামটি শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে। ফলাফল একটি নির্ণয় নয়। আপনার মানসিক স্বাস্থ্য সম্পর্কে উদ্বেগ থাকলে, অনুগ্রহ করে একজন যোগ্য পেশাদারের সাথে পরামর্শ করুন।"
    }
  }
  
  const text = content[language]
  
  return (
    <div className={`rounded-lg bg-blue-50 border-2 border-blue-300 p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-blue-900 mb-1">
            {text.title}
          </h4>
          <p className="text-xs text-blue-800">
            {text.text}
          </p>
        </div>
      </div>
    </div>
  )
}
