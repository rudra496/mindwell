"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Phone, X } from "lucide-react"
import { useLanguage } from "@/lib/useLanguage"

interface ConsentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConsent: () => void
  assessmentName?: string
  isHighRisk?: boolean
}

export function ConsentModal({ 
  open, 
  onOpenChange, 
  onConsent,
  assessmentName = "this assessment",
  isHighRisk = false
}: ConsentModalProps) {
  const [understood, setUnderstood] = useState(false)
  const [canExit, setCanExit] = useState(false)
  const [crisisAware, setCrisisAware] = useState(false)
  const { language } = useLanguage()
  
  const handleContinue = () => {
    if (understood && canExit && (!isHighRisk || crisisAware)) {
      onConsent()
      onOpenChange(false)
      // Reset for next time
      setUnderstood(false)
      setCanExit(false)
      setCrisisAware(false)
    }
  }
  
  const handleExit = () => {
    onOpenChange(false)
    // Reset checkboxes
    setUnderstood(false)
    setCanExit(false)
    setCrisisAware(false)
  }
  
  const content = {
    en: {
      title: "Before You Continue",
      description: isHighRisk 
        ? "This assessment contains sensitive content that may be distressing. Please read carefully before proceeding."
        : "Please review this important information before starting the assessment.",
      checkbox1: "I understand this is a self-reflection tool, not a medical diagnosis",
      checkbox2: "I can exit at any time if I feel uncomfortable",
      checkbox3: "If I'm in crisis, I'll use emergency resources instead",
      emergencyTitle: "In Crisis? Get Immediate Help",
      emergency988: "Call or text 988 (US Suicide & Crisis Lifeline)",
      emergency911: "Call 911 or go to nearest emergency room",
      exitButton: "Exit to Safety",
      continueButton: "I Understand - Continue",
      notReady: "Please check all boxes to continue"
    },
    bn: {
      title: "অব্যাহত রাখার আগে",
      description: isHighRisk
        ? "এই মূল্যায়নে সংবেদনশীল বিষয়বস্তু রয়েছে যা কষ্টদায়ক হতে পারে। অগ্রসর হওয়ার আগে সাবধানে পড়ুন।"
        : "মূল্যায়ন শুরু করার আগে এই গুরুত্বপূর্ণ তথ্য পর্যালোচনা করুন।",
      checkbox1: "আমি বুঝতে পেরেছি এটি একটি আত্ম-প্রতিফলন সরঞ্জাম, চিকিৎসা নির্ণয় নয়",
      checkbox2: "আমি যেকোনো সময় অস্বস্তি বোধ করলে প্রস্থান করতে পারি",
      checkbox3: "আমি সংকটে থাকলে, আমি পরিবর্তে জরুরি সম্পদ ব্যবহার করব",
      emergencyTitle: "সংকটে? অবিলম্বে সাহায্য পান",
      emergency988: "988 কল বা টেক্সট করুন (US সুইসাইড ও ক্রাইসিস লাইফলাইন)",
      emergency911: "911 কল করুন বা নিকটতম জরুরি কক্ষে যান",
      exitButton: "নিরাপত্তায় প্রস্থান",
      continueButton: "আমি বুঝতে পেরেছি - চালিয়ে যান",
      notReady: "চালিয়ে যেতে সব চেকবক্স চেক করুন"
    }
  }
  
  const text = content[language]
  const canContinue = understood && canExit && (!isHighRisk || crisisAware)
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900">
                {text.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-2">
                {text.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Consent Checkboxes */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Checkbox 
                id="understood" 
                checked={understood}
                onCheckedChange={(checked) => setUnderstood(checked === true)}
                className="mt-1"
              />
              <label 
                htmlFor="understood"
                className="text-sm text-gray-800 cursor-pointer leading-relaxed"
              >
                {text.checkbox1}
              </label>
            </div>
            
            <div className="flex items-start gap-3">
              <Checkbox 
                id="canExit" 
                checked={canExit}
                onCheckedChange={(checked) => setCanExit(checked === true)}
                className="mt-1"
              />
              <label 
                htmlFor="canExit"
                className="text-sm text-gray-800 cursor-pointer leading-relaxed"
              >
                {text.checkbox2}
              </label>
            </div>
            
            {isHighRisk && (
              <div className="flex items-start gap-3">
                <Checkbox 
                  id="crisisAware" 
                  checked={crisisAware}
                  onCheckedChange={(checked) => setCrisisAware(checked === true)}
                  className="mt-1"
                />
                <label 
                  htmlFor="crisisAware"
                  className="text-sm text-gray-800 cursor-pointer leading-relaxed font-semibold"
                >
                  {text.checkbox3}
                </label>
              </div>
            )}
          </div>
          
          {/* Emergency Resources */}
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-red-900 mb-2">
                  {text.emergencyTitle}
                </h4>
                <div className="space-y-1 text-xs text-red-800">
                  <p><strong>988:</strong> {text.emergency988}</p>
                  <p><strong>911:</strong> {text.emergency911}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleExit}
              className="flex-1 min-h-[44px]"
            >
              <X className="mr-2 h-4 w-4" />
              {text.exitButton}
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!canContinue}
              className="flex-1 min-h-[44px] bg-primary hover:bg-primary/90"
            >
              {text.continueButton}
            </Button>
          </div>
          
          {!canContinue && (
            <p className="text-xs text-center text-gray-500 italic">
              {text.notReady}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
