"use client"

import { useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FacebookPostEmbedProps {
  postUrl: string
}

interface FacebookInitParams {
  xfbml: number
  version: string
}

declare global {
  interface Window {
    FB?: {
      init: (params: FacebookInitParams) => void
      XFBML: {
        parse: () => void
      }
    }
    fbAsyncInit?: () => void
  }
}

const FB_SDK_VERSION = "v18.0"
const EMBED_TIMEOUT_MS = 5000

export function FacebookPostEmbed({ postUrl }: FacebookPostEmbedProps) {
  const [embedFailed, setEmbedFailed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load Facebook SDK
    if (!window.FB) {
      const script = document.createElement("script")
      script.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=${FB_SDK_VERSION}`
      script.async = true
      script.defer = true
      script.crossOrigin = "anonymous"
      
      script.onload = () => {
        if (window.FB) {
          window.FB.XFBML.parse()
          setIsLoading(false)
        }
      }

      script.onerror = () => {
        setEmbedFailed(true)
        setIsLoading(false)
      }

      document.body.appendChild(script)
    } else {
      window.FB.XFBML.parse()
      setIsLoading(false)
    }

    // Set a timeout to show fallback if embed takes too long or fails
    const timeout = setTimeout(() => {
      setIsLoading(false)
      // Check if the embed actually loaded
      const fbPost = document.querySelector('.fb-post')
      if (fbPost && !fbPost.querySelector('iframe')) {
        setEmbedFailed(true)
      }
    }, EMBED_TIMEOUT_MS)

    return () => clearTimeout(timeout)
  }, [])

  if (embedFailed) {
    return (
      <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white/85 dark:bg-slate-800/70 p-6 shadow-sm">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 mb-2">
            <ExternalLink className="h-8 w-8 text-teal-600 dark:text-teal-400" />
          </div>
          <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
            View Our Post on Facebook
          </h5>
          <p className="text-gray-700 dark:text-gray-300">
            This post is available on Facebook. Click below to view it directly.
          </p>
          <Button
            asChild
            className="text-lg px-7 py-3 h-auto"
          >
            <a
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View MindWell post on Facebook"
            >
              View on Facebook
            </a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white/85 dark:bg-slate-800/70 p-4 shadow-sm">
      {isLoading && (
        <div className="aspect-video flex items-center justify-center text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-600 border-r-transparent mb-2"></div>
            <p>Loading post...</p>
          </div>
        </div>
      )}
      <div
        className="fb-post"
        data-href={postUrl}
        data-width="500"
        data-show-text="true"
      />
    </div>
  )
}
