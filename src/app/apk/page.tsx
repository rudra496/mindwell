"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Smartphone,
  Download,
  CheckCircle2,
  ExternalLink,
  Code,
  Info
} from "lucide-react"
import { Chrome } from "@/components/icons/BrandIcons"

export default function APKGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full">
            <Smartphone className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-teal-900 dark:text-teal-400 mb-4">
          Install MindWell as an App
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Access mental health support anytime, even offline
        </p>
      </div>

      {/* PWA Installation Guide */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Chrome className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            Option 1: Install as Progressive Web App (PWA) - Recommended
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>No download required!</strong> Install MindWell directly from your browser. 
              Works on Android, iOS, Windows, Mac, and Linux.
            </AlertDescription>
          </Alert>

          {/* Android Chrome */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-green-600" />
              Android (Chrome, Edge, Samsung Internet)
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Open <strong>{typeof window !== 'undefined' ? window.location.host : 'mindwell-navy.vercel.app'}</strong> in Chrome</li>
              <li>Tap the <strong>menu icon</strong> (three dots) in the top-right corner</li>
              <li>Select <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong></li>
              <li>Confirm by tapping <strong>"Install"</strong></li>
              <li>MindWell will appear on your home screen like a native app!</li>
            </ol>
          </div>

          {/* iOS Safari */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-blue-600" />
              iPhone/iPad (Safari)
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Open <strong>mindwell-navy.vercel.app</strong> in Safari</li>
              <li>Tap the <strong>Share button</strong> (square with arrow pointing up)</li>
              <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
              <li>Tap <strong>"Add"</strong> in the top-right corner</li>
              <li>MindWell is now installed on your home screen!</li>
            </ol>
          </div>

          {/* Desktop */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Chrome className="h-5 w-5 text-blue-500" />
              Desktop (Chrome, Edge, Brave)
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Open <strong>mindwell-navy.vercel.app</strong> in Chrome or Edge</li>
              <li>Look for the <strong>install icon</strong> in the address bar (plus sign or computer monitor)</li>
              <li>Click <strong>"Install"</strong></li>
              <li>MindWell opens in its own window, like a desktop app</li>
            </ol>
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
            onClick={() => {
              if ('BeforeInstallPromptEvent' in window) {
                // Trigger PWA install prompt if available
                alert('Please use your browser\'s menu to install MindWell. Look for "Add to Home screen" or "Install app".')
              } else {
                alert('Please use your browser\'s menu to install MindWell. Look for "Add to Home screen" or "Install app".')
              }
            }}
          >
            <Download className="h-5 w-5 mr-2" />
            Install PWA Now
          </Button>
        </CardContent>
      </Card>

      {/* APK Generation Guide */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            Option 2: Generate Android APK (For Developers)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              This option requires technical knowledge and is intended for developers who want to create 
              a native Android APK from the PWA.
            </AlertDescription>
          </Alert>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Using Bubblewrap (Google's Official Tool)</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Bubblewrap is Google's official CLI tool for creating Android apps from PWAs.
            </p>
            
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="mb-2"># Install Bubblewrap</div>
              <div>npm install -g @bubblewrap/cli</div>
              <br />
              <div className="mb-2"># Initialize project</div>
              <div>bubblewrap init --manifest https://mindwell-navy.vercel.app/manifest.json</div>
              <br />
              <div className="mb-2"># Build APK</div>
              <div>bubblewrap build</div>
              <br />
              <div className="mb-2"># APK will be in ./app-release-signed.apk</div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Alternative: PWABuilder</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              PWABuilder provides a web-based interface for generating APKs from PWAs.
            </p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Go to <a href="https://www.pwabuilder.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 dark:text-teal-400 hover:underline">pwabuilder.com</a></li>
              <li>Enter: <strong>https://mindwell-navy.vercel.app</strong></li>
              <li>Click <strong>"Package for Stores"</strong></li>
              <li>Select <strong>"Android"</strong></li>
              <li>Download the generated APK</li>
            </ol>
          </div>

          <a 
            href="https://www.pwabuilder.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="outline" className="w-full">
              <ExternalLink className="h-5 w-5 mr-2" />
              Go to PWABuilder
            </Button>
          </a>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            Benefits of Installing MindWell
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <span><strong>Offline Access:</strong> View crisis resources even without internet connection</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <span><strong>Faster Loading:</strong> Cached content loads instantly</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <span><strong>Home Screen Icon:</strong> Quick access like a native app</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <span><strong>Full Screen Experience:</strong> No browser UI distractions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <span><strong>Privacy:</strong> Runs independently, no app store tracking</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
