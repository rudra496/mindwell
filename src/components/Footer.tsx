"use client"

import { Heart, Mail, Globe, Github } from "lucide-react"
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
    <footer className="mt-12 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* About */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
              {mounted ? t(translations.footer.about, language) : "About MindWell"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 break-words mb-3">
              {mounted 
                ? (language === 'en'
                    ? "World's largest open-source mental health platform providing comprehensive, scientifically-backed, free mental health support to everyone, everywhere."
                    : "বিশ্বের বৃহত্তম ওপেন-সোর্স মানসিক স্বাস্থ্য প্ল্যাটফর্ম সবার জন্য ব্যাপক, বৈজ্ঞানিকভাবে সমর্থিত, বিনামূল্যে মানসিক স্বাস্থ্য সহায়তা প্রদান করে।")
                : "World's largest open-source mental health platform providing comprehensive, scientifically-backed, free mental health support to everyone, everywhere."}
            </p>
            <p className="text-xs text-gray-500">
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
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
              {mounted ? t(translations.footer.contact, language) : "Contact"}
            </h3>
            <div className="space-y-2">
              <a
                href={`mailto:${config.contact.email}`}
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-teal-600 transition-colors break-words"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>{config.contact.email}</span>
              </a>
              <a
                href={config.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-teal-600 transition-colors break-words"
              >
                <Globe className="h-4 w-4 flex-shrink-0" />
                <span>rudra496.github.io/site</span>
              </a>
              <a
                href={config.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-teal-600 transition-colors break-words"
              >
                <Github className="h-4 w-4 flex-shrink-0" />
                <span>github.com/rudra496/mindwell</span>
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              {mounted ? t(translations.common.inspiredBy, language) : "Inspired by Prof. Farzana Hussain, Ph.D."}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
              {mounted ? t(translations.footer.important, language) : "Important"}
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-gray-600">
              <p className="break-words">
                <strong>
                  {mounted ? (language === 'en' ? "Crisis Support:" : "সংকট সহায়তা:") : "Crisis Support:"}
                </strong>{" "}
                {mounted ? (language === 'en' ? "Call or text" : "কল বা টেক্সট করুন") : "Call or text"}{" "}
                <strong>988</strong>
              </p>
              <p className="break-words">
                <strong>
                  {mounted ? (language === 'en' ? "Emergency:" : "জরুরি:") : "Emergency:"}
                </strong>{" "}
                <strong>911</strong>
              </p>
              <p className="text-xs text-gray-500 mt-3">
                {mounted
                  ? (language === 'en'
                      ? "For educational purposes only. Not a substitute for professional medical advice."
                      : "শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে। পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়।")
                  : "For educational purposes only. Not a substitute for professional medical advice."}
              </p>
            </div>
          </div>
        </div>

        {/* Bangladesh Context Note */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-teal-500 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-700">
            <strong>🇧🇩{" "}
              {mounted ? (language === 'en' ? "Bangladesh Context:" : "বাংলাদেশ প্রসঙ্গ:") : "Bangladesh Context:"}
            </strong>{" "}
            {mounted
              ? (language === 'en'
                  ? "This platform is developed with a focus on Bangladesh and similar low-resource settings, while maintaining global applicability. We provide information about local low-cost government mental health services alongside international crisis resources."
                  : "এই প্ল্যাটফর্মটি বৈশ্বিক প্রযোজ্যতা বজায় রেখে বাংলাদেশ এবং অনুরূপ কম-সম্পদ সেটিংসের উপর ফোকাস করে তৈরি করা হয়েছে। আমরা আন্তর্জাতিক সংকট সম্পদের পাশাপাশি স্থানীয় স্বল্প-খরচ সরকারী মানসিক স্বাস্থ্য পরিষেবা সম্পর্কে তথ্য প্রদান করি।")
              : "This platform is developed with a focus on Bangladesh and similar low-resource settings, while maintaining global applicability. We provide information about local low-cost government mental health services alongside international crisis resources."}
          </p>
        </div>

        {/* Ethical Commitment */}
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
          <h4 className="font-bold text-blue-900 mb-2 text-sm">
            {mounted
              ? (language === 'en' ? "Our Ethical Commitment" : "আমাদের নৈতিক প্রতিশ্রুতি")
              : "Our Ethical Commitment"}
          </h4>
          <p className="text-xs text-blue-800">
            {mounted
              ? (language === 'en'
                  ? "MindWell is a non-profit, open-source initiative committed to providing free, evidence-based mental health resources. We maintain strict ethical standards, protect user privacy, and ensure all information is scientifically validated."
                  : "মাইন্ডওয়েল একটি অলাভজনক, ওপেন-সোর্স উদ্যোগ যা বিনামূল্যে, প্রমাণ-ভিত্তিক মানসিক স্বাস্থ্য সংস্থান প্রদানে প্রতিশ্রুতিবদ্ধ। আমরা কঠোর নৈতিক মান বজায় রাখি, ব্যবহারকারীর গোপনীয়তা রক্ষা করি এবং সমস্ত তথ্য বৈজ্ঞানিকভাবে যাচাই করা নিশ্চিত করি।")
              : "MindWell is a non-profit, open-source initiative committed to providing free, evidence-based mental health resources. We maintain strict ethical standards, protect user privacy, and ensure all information is scientifically validated."}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} MindWell.{" "}
            {mounted ? t(translations.footer.copyright, language) : "Open-source mental health platform."}
            <br className="sm:hidden" /> Licensed under MIT.
          </p>
        </div>
      </div>
    </footer>
  )
}
