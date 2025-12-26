"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Brain, 
  Heart, 
  Users, 
  MessageCircle, 
  BookOpen, 
  Stethoscope,
  ClipboardList,
  Gamepad2,
  Phone,
  AlertCircle,
  Sparkles
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Crisis Banner */}
      <div className="mb-8 rounded-lg bg-red-50 border-2 border-red-500 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h2 className="text-lg font-bold text-red-900 mb-2">
              ⚠️ IN CRISIS? GET HELP NOW
            </h2>
            <div className="space-y-1 text-sm text-red-800">
              <p><strong>US:</strong> Call or text <strong>988</strong> (Suicide & Crisis Lifeline) - Available 24/7</p>
              <p><strong>Crisis Text Line:</strong> Text <strong>HELLO</strong> to <strong>741741</strong></p>
              <p><strong>Emergency:</strong> Call <strong>911</strong> or go to nearest emergency room</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="h-12 w-12 text-primary" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
            MindWell
          </h1>
        </div>
        <p className="text-xl text-gray-700 mb-2">
          World's Largest Open-Source Mental Health Platform
        </p>
        <p className="text-md text-gray-600 max-w-3xl mx-auto">
          Comprehensive, scientifically-backed, free mental health support with 40+ disorders, 
          validated assessments, therapeutic games, meditation, and crisis resources.
        </p>
      </header>

      {/* Medical Disclaimer */}
      <div className="mb-12 rounded-lg bg-amber-50 border-2 border-amber-400 p-6">
        <h3 className="text-lg font-bold text-amber-900 mb-2">
          ⚕️ Medical Disclaimer
        </h3>
        <p className="text-sm text-amber-800">
          <strong>FOR EDUCATIONAL PURPOSES ONLY.</strong> This platform is NOT a substitute for professional medical advice, diagnosis, or treatment. 
          ALWAYS consult licensed mental health professionals. Assessments are screening tools, NOT diagnostic instruments.
        </p>
      </div>

      {/* Main Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Disorders Database */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Stethoscope className="h-8 w-8 text-primary" />
              <CardTitle>Disorders Database</CardTitle>
            </div>
            <CardDescription>
              40+ Mental Health Conditions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Comprehensive DSM-5 information including symptoms, causes, treatments, and research-backed solutions for all major mental health disorders.
            </p>
            <Button className="w-full" variant="outline">
              Explore Disorders
            </Button>
          </CardContent>
        </Card>

        {/* Self-Assessments */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <ClipboardList className="h-8 w-8 text-secondary" />
              <CardTitle>Self-Assessments</CardTitle>
            </div>
            <CardDescription>
              10 Validated Screening Tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Clinically validated questionnaires including PHQ-9 (Depression), GAD-7 (Anxiety), PCL-5 (PTSD), and more with proper scoring.
            </p>
            <Button className="w-full" variant="outline">
              Take Assessment
            </Button>
          </CardContent>
        </Card>

        {/* Therapeutic Games */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Gamepad2 className="h-8 w-8 text-accent" />
              <CardTitle>Therapeutic Games</CardTitle>
            </div>
            <CardDescription>
              12 Interactive Wellness Tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Evidence-based activities including breathing exercises, grounding techniques, mood tracking, gratitude journaling, and CBT tools.
            </p>
            <Button className="w-full" variant="outline">
              Play Games
            </Button>
          </CardContent>
        </Card>

        {/* AI Chatbot */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="h-8 w-8 text-indigo-500" />
              <CardTitle>AI Support Chatbot</CardTitle>
            </div>
            <CardDescription>
              24/7 Empathetic Companion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Compassionate AI trained in mental health support, crisis detection, coping strategies, and psychoeducation. Available anytime.
            </p>
            <Button className="w-full" variant="outline">
              Chat Now
            </Button>
          </CardContent>
        </Card>

        {/* Community Forum */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-8 w-8 text-purple-500" />
              <CardTitle>Community Forum</CardTitle>
            </div>
            <CardDescription>
              Safe Peer Support Space
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Anonymous peer support with categories for Depression, Anxiety, Trauma, Recovery, and more. Moderated for safety.
            </p>
            <Button className="w-full" variant="outline">
              Join Community
            </Button>
          </CardContent>
        </Card>

        {/* Therapy Techniques */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-8 w-8 text-teal-500" />
              <CardTitle>Therapy Library</CardTitle>
            </div>
            <CardDescription>
              Evidence-Based Techniques
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Learn CBT, DBT, ACT, ERP, MBCT, and IPT techniques with step-by-step guides, examples, and practical applications.
            </p>
            <Button className="w-full" variant="outline">
              Learn Techniques
            </Button>
          </CardContent>
        </Card>

        {/* Meditation Library */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="h-8 w-8 text-pink-500" />
              <CardTitle>Meditation Library</CardTitle>
            </div>
            <CardDescription>
              12+ Guided Practices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Full guided meditation scripts including body scan, loving-kindness, breath work, progressive relaxation, and sleep meditation.
            </p>
            <Button className="w-full" variant="outline">
              Meditate Now
            </Button>
          </CardContent>
        </Card>

        {/* Crisis Resources */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-red-400 bg-red-50">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Phone className="h-8 w-8 text-red-600" />
              <CardTitle className="text-red-900">Crisis Resources</CardTitle>
            </div>
            <CardDescription className="text-red-700">
              Immediate Help Available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-800 mb-4">
              Worldwide crisis hotlines, text lines, and emergency resources. Includes safety planning tool for managing suicidal thoughts.
            </p>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              Get Help Now
            </Button>
          </CardContent>
        </Card>

        {/* Mood Tracker Preview */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Heart className="h-8 w-8 text-rose-500" />
              <CardTitle>Mood Tracker</CardTitle>
            </div>
            <CardDescription>
              Track Your Wellness Journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Daily mood logging with visual charts, activity tracking, and insights into patterns. Monitor your mental health progress over time.
            </p>
            <Button className="w-full" variant="outline">
              Track Mood
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-primary mb-2">40+</div>
            <div className="text-sm text-gray-600">Mental Health Disorders</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-secondary mb-2">10</div>
            <div className="text-sm text-gray-600">Validated Assessments</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-accent mb-2">12</div>
            <div className="text-sm text-gray-600">Therapeutic Games</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-4xl font-bold text-indigo-600 mb-2">100%</div>
            <div className="text-sm text-gray-600">Free & Open Source</div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 border-t pt-8 mt-12">
        <p className="mb-2">
          <strong>MindWell</strong> - Built with care for mental health awareness
        </p>
        <p className="mb-2">
          Data sources: NIMH, WHO, APA, PubMed, Cochrane Reviews
        </p>
        <p className="text-xs text-gray-500">
          Open Source (MIT License) • Not a substitute for professional care
        </p>
      </footer>
    </div>
  )
}
