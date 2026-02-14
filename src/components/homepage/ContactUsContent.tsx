"use client"

import { Mail, Facebook, Linkedin } from "lucide-react"
import { Card } from "@/components/ui/card"

/**
 * Section 13: Contact Us
 * No forms - Direct links only
 */
export function ContactUsContent() {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "contactmindwellorg@gmail.com",
      href: "mailto:contactmindwellorg@gmail.com",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20"
    },
    {
      icon: Facebook,
      label: "Facebook",
      value: "MindWell Facebook Page",
      href: "https://www.facebook.com/share/17uZeJjmBc/",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "MindWell LinkedIn",
      href: "https://www.linkedin.com/company/mindwell-care/",
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "bg-cyan-50 dark:bg-cyan-900/20"
    }
  ]

  return (
    <div className="space-y-6">
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Connect with us directly through any of these channels:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contactLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="block"
          >
            <Card className={`${link.bgColor} border-2 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer p-6 h-full`}>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`w-16 h-16 rounded-full ${link.bgColor} flex items-center justify-center border-2 border-current`}>
                  <link.icon className={`h-8 w-8 ${link.color}`} />
                </div>
                <h4 className={`text-lg font-bold ${link.color}`}>
                  {link.label}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
                  {link.value}
                </p>
              </div>
            </Card>
          </a>
        ))}
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6 italic">
        We respond to all inquiries within 24-48 hours
      </p>
    </div>
  )
}
