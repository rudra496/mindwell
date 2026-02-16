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
      title: "",
      text: "This self-reflection tool is for educational purposes only. Results are not a diagnosis. If you have concerns about your mental health, please consult with a mental health expert."
    },
    bn: {
      title: "",
      text: "This self-reflection tool is for educational purposes only. Results are not a diagnosis. If you have concerns about your mental health, please consult with a mental health expert."
    }
  }
  
  const text = content[language]
  
  return (
    <div className={`rounded-lg bg-blue-50 border-2 border-blue-300 p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
                    <p className="text-xs text-blue-800">
            {text.text}
          </p>
        </div>
      </div>
    </div>
  )
}
