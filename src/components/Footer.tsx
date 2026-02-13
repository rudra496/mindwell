"use client"

import { Heart, Mail, Globe, Github, Facebook, Linkedin } from "lucide-react"
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/useLanguage"
import { translations, t } from "@/lib/i18n"
import { config } from "@/lib/config"

export function Footer() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-12 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm transition-colors">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* About */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
              {mounted ? t(translations.footer.about, language) : "About MindWell"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words mb-3">
              {mounted 
                ? (language === 'en'
                    ? "World's largest open-source mental health platform providing comprehensive, scientifically-backed, free mental health support to everyone, everywhere."
                    : "বিশ্বের বৃহত্তম ওপেন-সোর্স মানসিক স্বাস্থ্য প্ল্যাটফর্ম সবার জন্য ব্যাপক, বৈজ্ঞানিকভাবে সমর্থিত, বিনামূল্যে মানসিক স্বাস্থ্য সহায়তা প্রদান করে।")
                : "World's largest open-source mental health platform providing comprehensive, scientifically-backed, free mental health support to everyone, everywhere."}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {mounted
                ? (language === 'en' ? "Created with" : "তৈরি করা হয়েছে")
                : "Created with"}{" "}
              <Heart className="inline h-3 w-3 text-red-500" />{" "}
              {mounted
                ? (language === 'en' ? "for mental health awareness" : "মানসিক স্বাস্থ্য সচেতনতার জন্য")
                : "for mental health awareness"}
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
              {mounted ? t(translations.footer.contact, language) : "Contact"}
            </h3>
            <div className="space-y-2">
              <a
                href={`mailto:${config.contact.email}`}
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors break-words"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>{config.contact.email}</span>
              </a>
              <a
                href={config.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors break-words"
              >
                <Facebook className="h-4 w-4 flex-shrink-0" />
                <span>{mounted ? (language === 'en' ? "Facebook Page" : "ফেসবুক পেজ") : "Facebook Page"}</span>
              </a>
              <a
                href={config.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors break-words"
              >
                <Github className="h-4 w-4 flex-shrink-0" />
                <span>GitHub Repository</span>
              </a>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              {mounted ? (language === 'en' ? "Inspired by" : "অনুপ্রাণিত") : "Inspired by"}{" "}
              <a
                href={config.advisors.farzanaLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
              >
                Prof. Farzana Hussain, Ph.D.
                <Linkedin className="h-3 w-3" />
              </a>
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
              {mounted ? (language === 'en' ? "Quick Links" : "দ্রুত লিঙ্ক") : "Quick Links"}
            </h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <a href="/medical-disclaimer" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                {mounted ? (language === 'en' ? "Disclaimer" : "দাবিত্যাগ") : "Disclaimer"}
              </a>
              <a href="/privacy" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                {mounted ? (language === 'en' ? "Privacy Policy" : "গোপনীয়তা নীতি") : "Privacy Policy"}
              </a>
              <a href="/faq" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                {mounted ? (language === 'en' ? "FAQ" : "সাধারণ প্রশ্ন") : "FAQ"}
              </a>
              <a href="/ethics" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                {mounted ? (language === 'en' ? "Ethics & Safety" : "নীতি ও নিরাপত্তা") : "Ethics & Safety"}
              </a>
              <a href="/terms" className="block text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                {mounted ? (language === 'en' ? "Terms of Service" : "সেবার শর্তাবলী") : "Terms of Service"}
              </a>
            </div>
          </div>
        </div>

        {/* Important Crisis Info */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-300 dark:border-red-700">
            <h4 className="font-bold text-red-900 dark:text-red-300 mb-2 text-sm">
              {mounted ? (language === 'en' ? "🚨 Crisis Support" : "🚨 সংকট সহায়তা") : "🚨 Crisis Support"}
            </h4>
            <div className="space-y-1 text-xs text-red-800 dark:text-red-300">
              <p><strong>Bangladesh:</strong> Kaan Pete Roi: <strong>09678 676 777</strong> (24/7)</p>
              <p><strong>US:</strong> Call or text <strong>988</strong> (Suicide & Crisis Lifeline)</p>
              <p><strong>Emergency:</strong> <strong>999</strong> (Bangladesh) or <strong>911</strong> (US)</p>
            </div>
          </div>
        </div>

        {/* Developer Info */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {mounted ? (language === 'en' ? "Developed & Founded by" : "উন্নয়ন ও প্রতিষ্ঠা") : "Developed & Founded by"}
            </p>
            <p className="text-base font-bold text-teal-700 dark:text-teal-400 mb-3">
              {config.developer.name}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href={config.developer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={config.developer.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={config.developer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {currentYear} MindWell.{" "}
            {mounted ? t(translations.footer.copyright, language) : "Open-source mental health platform."}
            <br className="sm:hidden" /> Licensed under MIT.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {mounted
              ? (language === 'en'
                  ? "For educational purposes only. Not a substitute for professional medical advice, diagnosis, or treatment."
                  : "শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে। পেশাদার চিকিৎসা পরামর্শ, নির্ণয় বা চিকিৎসার বিকল্প নয়।")
              : "For educational purposes only. Not a substitute for professional medical advice, diagnosis, or treatment."}
          </p>
        </div>
      </div>
    </footer>
  )
}
