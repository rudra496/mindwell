"use client"

import { useEffect, useRef } from "react"

interface FacebookPostEmbedProps {
  postUrl: string
  width?: number
}

// Facebook SDK type declaration
declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: (element?: HTMLElement | null) => void
      }
    }
  }
}

export function FacebookPostEmbed({ postUrl, width = 500 }: FacebookPostEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Facebook SDK if not already loaded
    if (typeof window !== "undefined" && !window.FB) {
      // Check if script already exists
      const existingScript = document.querySelector('script[src*="connect.facebook.net"]')
      if (!existingScript) {
        const script = document.createElement("script")
        script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0"
        script.async = true
        script.defer = true
        script.crossOrigin = "anonymous"
        document.head.appendChild(script)

        script.onload = () => {
          // Parse XFBML after SDK loads
          if (window.FB) {
            window.FB.XFBML.parse()
          }
        }
      }
    } else if (window.FB) {
      // SDK already loaded, just parse the container
      window.FB.XFBML.parse(containerRef.current)
    }
  }, [postUrl])

  return (
    <div ref={containerRef} className="flex justify-center">
      <div
        className="fb-post"
        data-href={postUrl}
        data-width={width}
        data-show-text="true"
      ></div>
    </div>
  )
}
