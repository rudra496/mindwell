"use client"

import { AlertTriangle } from "lucide-react"
import { useLanguage } from "@/lib/useLanguage"

interface MedicalDisclaimerProps {
  variant?: "full" | "compact"
  className?: string
}

export function MedicalDisclaimer({ variant = "full", className = "" }: MedicalDisclaimerProps) {
  const { language } = useLanguage()
  
  const content = {
    en: {
      title: "⚕️ Medical Disclaimer",
      full: "MindWell provides educational information and guidance only. We are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with questions about mental health conditions.",
      compact: "FOR EDUCATIONAL PURPOSES ONLY. This platform is NOT a substitute for professional medical advice, diagnosis, or treatment. ALWAYS consult licensed mental health professionals. Assessments are screening tools, NOT diagnostic instruments."
    },
    bn: {
      title: "⚕️ চিকিৎসা দাবিত্যাগ",
      full: "মাইন্ডওয়েল শুধুমাত্র শিক্ষামূলক তথ্য এবং নির্দেশনা প্রদান করে। আমরা পেশাদার চিকিৎসা পরামর্শ, নির্ণয় বা চিকিৎসার বিকল্প নই। মানসিক স্বাস্থ্য সংক্রান্ত প্রশ্নের জন্য সর্বদা যোগ্য স্বাস্থ্যসেবা প্রদানকারীদের পরামর্শ নিন।",
      compact: "শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে। এই প্ল্যাটফর্মটি পেশাদার চিকিৎসা পরামর্শ, নির্ণয় বা চিকিৎসার বিকল্প নয়। সবসময় লাইসেন্সপ্রাপ্ত মানসিক স্বাস্থ্য পেশাদারদের সাথে পরামর্শ করুন। মূল্যায়ন স্ক্রীনিং টুল, ডায়াগনস্টিক যন্ত্র নয়।"
    }
  }
  
  const text = content[language]
  const message = variant === "full" ? text.full : text.compact
  
  return (
    <div className={`rounded-lg bg-amber-50 border-2 border-amber-400 p-4 sm:p-6 ${className}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-base sm:text-lg font-bold text-amber-900 mb-2">
            {text.title}
          </h3>
          <p className="text-xs sm:text-sm text-amber-800">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}
