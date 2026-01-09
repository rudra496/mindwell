"use client"

import { Heart, Mail, Globe, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* About */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
              About MindWell
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 break-words mb-3">
              World's largest open-source mental health platform providing comprehensive, 
              scientifically-backed, free mental health support to everyone, everywhere.
            </p>
            <p className="text-xs text-gray-500">
              Created with <Heart className="inline h-3 w-3 text-red-500" /> for mental health awareness
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
              Contact
            </h3>
            <div className="space-y-2">
              <a
                href="mailto:rudrasarker130@gmail.com"
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-teal-600 transition-colors break-words"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>rudrasarker130@gmail.com</span>
              </a>
              <a
                href="https://rudra496.github.io/site"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-teal-600 transition-colors break-words"
              >
                <Globe className="h-4 w-4 flex-shrink-0" />
                <span>rudra496.github.io/site</span>
              </a>
              <a
                href="https://github.com/rudra496/mindwell"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 hover:text-teal-600 transition-colors break-words"
              >
                <Github className="h-4 w-4 flex-shrink-0" />
                <span>github.com/rudra496/mindwell</span>
              </a>
            </div>
          </div>
              <p className="text-sm text-gray-500 mt-2">
  Inspired by Prof. Farzana Hussain, Ph.D.
</p>
          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
              Important
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-gray-600">
              <p className="break-words">
                <strong>Crisis Support:</strong> Call or text <strong>988</strong>
              </p>
              <p className="break-words">
                <strong>Emergency:</strong> <strong>911</strong>
              </p>
              <p className="text-xs text-gray-500 mt-3">
                For educational purposes only. Not a substitute for professional medical advice.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} MindWell. Open-source mental health platform.
            <br className="sm:hidden" /> Licensed under MIT.
          </p>
        </div>
      </div>
    </footer>
  )
}
