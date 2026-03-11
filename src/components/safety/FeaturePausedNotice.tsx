"use client"

import { AlertOctagon } from "lucide-react"
import { useLanguage } from "@/lib/useLanguage"

interface FeaturePausedNoticeProps {
  featureName?: string
  className?: string
}

export function FeaturePausedNotice({ featureName = "This feature", className = "" }: FeaturePausedNoticeProps) {
  const { language } = useLanguage()
  
  const content: Record<'en' | 'bn', any> = {
    en: {
      title: "Temporarily Paused for Safety Review",
      message: "This feature is currently paused to ensure ethical, clinical, and user safety standards. We're committed to providing the highest quality mental health support.",
      reason: "Why?",
      reasonText: "Mental health support requires rigorous safety protocols. We're reviewing this feature to ensure it meets professional standards and doesn't cause unintended harm."
    },
    bn: {
      title: "নিরাপত্তা পর্যালোচনার জন্য সাময়িকভাবে বন্ধ",
      message: "নৈতিক, ক্লিনিকাল এবং ব্যবহারকারী সুরক্ষা মান নিশ্চিত করতে এই বৈশিষ্ট্যটি বর্তমানে বন্ধ রয়েছে। আমরা সর্বোচ্চ মানের মানসিক স্বাস্থ্য সহায়তা প্রদানের জন্য প্রতিশ্রুতিবদ্ধ।",
      reason: "কেন?",
      reasonText: "মানসিক স্বাস্থ্য সহায়তার জন্য কঠোর সুরক্ষা প্রোটোকল প্রয়োজন। আমরা এই বৈশিষ্ট্যটি পেশাদার মান পূরণ করে এবং অনিচ্ছাকৃত ক্ষতি না করে তা নিশ্চিত করতে পর্যালোচনা করছি।"
    }
  }
  
  const text = content[language as keyof typeof content] ?? content.en
  
  return (
    <div className={`rounded-lg bg-orange-50 border-2 border-orange-400 p-6 ${className}`}>
      <div className="flex flex-col items-center text-center gap-4">
        <AlertOctagon className="h-12 w-12 text-orange-600" />
        <div>
          <h3 className="text-lg font-bold text-orange-900 mb-2">
            {text.title}
          </h3>
          <p className="text-sm text-orange-800 mb-4">
            {text.message}
          </p>
          <div className="bg-white rounded-md p-4 text-left">
            <p className="text-xs font-semibold text-orange-900 mb-1">
              {text.reason}
            </p>
            <p className="text-xs text-orange-800">
              {text.reasonText}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
