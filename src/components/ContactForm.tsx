"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Send, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/useLanguage"

interface FormData {
  name: string
  email: string
  reason: string
  preferredTime: string
  message: string
}

export function ContactForm() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    reason: "",
    preferredTime: "",
    message: ""
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setStatus("idle")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus("idle")
    setErrorMessage("")

    // Validate form
    if (!formData.name || !formData.email || !formData.reason || !formData.message) {
      setStatus("error")
      setErrorMessage(language === 'en' ? "Please fill in all required fields." : "দয়া করে সকল প্রয়োজনীয় ফিল্ড পূরণ করুন।")
      setLoading(false)
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatus("error")
      setErrorMessage(language === 'en' ? "Please enter a valid email address." : "দয়া করে একটি বৈধ ইমেইল ঠিকানা লিখুন।")
      setLoading(false)
      return
    }

    try {
      // Call API to send email
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus("success")
        // Reset form
        setFormData({
          name: "",
          email: "",
          reason: "",
          preferredTime: "",
          message: ""
        })
      } else {
        setStatus("error")
        setErrorMessage(data.error || (language === 'en' ? "Failed to send message. Please try again." : "বার্তা পাঠাতে ব্যর্থ। অনুগ্রহ করে পুনরায় চেষ্টা করুন।"))
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setStatus("error")
      setErrorMessage(language === 'en' ? "An error occurred. Please try again later." : "একটি ত্রুটি ঘটেছে। পরে আবার চেষ্টা করুন।")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-3xl mx-auto border-2 border-teal-200 dark:border-teal-800 shadow-lg">
      <CardHeader className="space-y-1 bg-gradient-to-r from-teal-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-center flex items-center justify-center gap-2">
          <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600 dark:text-teal-400" />
          {language === 'en' ? 'Contact Us' : 'আমাদের সাথে যোগাযোগ করুন'}
        </CardTitle>
        <CardDescription className="text-center text-sm sm:text-base">
          {language === 'en' 
            ? 'Request services, talk to psychologists, or reach out for general inquiries' 
            : 'সেবা অনুরোধ করুন, মনোবিজ্ঞানীদের সাথে কথা বলুন, বা সাধারণ জিজ্ঞাসার জন্য যোগাযোগ করুন'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              {language === 'en' ? 'Name' : 'নাম'} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder={language === 'en' ? 'Enter your full name' : 'আপনার সম্পূর্ণ নাম লিখুন'}
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              {language === 'en' ? 'Email Address' : 'ইমেইল ঠিকানা'} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={language === 'en' ? 'Enter your email' : 'আপনার ইমেইল লিখুন'}
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full"
              required
            />
          </div>

          {/* Reason for Contact */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-medium">
              {language === 'en' ? 'Reason for Contact' : 'যোগাযোগের কারণ'} <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.reason} onValueChange={(value) => handleChange("reason", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={language === 'en' ? 'Select a reason' : 'একটি কারণ নির্বাচন করুন'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="psychologist">
                  {language === 'en' ? 'Talk to Psychologist' : 'মনোবিজ্ঞানীর সাথে কথা বলুন'}
                </SelectItem>
                <SelectItem value="service-request">
                  {language === 'en' ? 'Request Services' : 'সেবা অনুরোধ'}
                </SelectItem>
                <SelectItem value="general-inquiry">
                  {language === 'en' ? 'General Inquiry' : 'সাধারণ জিজ্ঞাসা'}
                </SelectItem>
                <SelectItem value="feedback">
                  {language === 'en' ? 'Feedback/Suggestions' : 'মতামত/পরামর্শ'}
                </SelectItem>
                <SelectItem value="partnership">
                  {language === 'en' ? 'Partnership/Collaboration' : 'অংশীদারিত্ব/সহযোগিতা'}
                </SelectItem>
                <SelectItem value="other">
                  {language === 'en' ? 'Other' : 'অন্যান্য'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Time */}
          <div className="space-y-2">
            <Label htmlFor="preferredTime" className="text-sm font-medium">
              {language === 'en' ? 'Preferred Contact Time (Optional)' : 'পছন্দের যোগাযোগের সময় (ঐচ্ছিক)'}
            </Label>
            <Input
              id="preferredTime"
              type="text"
              placeholder={language === 'en' ? 'e.g., Weekdays 2-5 PM' : 'যেমন: সপ্তাহের দিন দুপুর ২-৫টা'}
              value={formData.preferredTime}
              onChange={(e) => handleChange("preferredTime", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              {language === 'en' ? 'Message' : 'বার্তা'} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder={language === 'en' ? 'Tell us more about your inquiry...' : 'আপনার জিজ্ঞাসা সম্পর্কে আরো বলুন...'}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="w-full min-h-[120px]"
              required
            />
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800 dark:text-green-300">
                {language === 'en' 
                  ? 'Thank you! Your message has been sent successfully. We will get back to you soon.' 
                  : 'ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।'}
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800 dark:text-red-300">{errorMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white font-semibold py-6 transition-all hover:scale-[1.02]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {language === 'en' ? 'Sending...' : 'পাঠানো হচ্ছে...'}
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                {language === 'en' ? 'Send Message' : 'বার্তা পাঠান'}
              </>
            )}
          </Button>
        </form>

        {/* Additional Info */}
        <div className="pt-4 border-t dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            {language === 'en' 
              ? 'Your information will be kept confidential and used only to respond to your inquiry.' 
              : 'আপনার তথ্য গোপনীয় রাখা হবে এবং শুধুমাত্র আপনার জিজ্ঞাসার উত্তর দিতে ব্যবহার করা হবে।'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
