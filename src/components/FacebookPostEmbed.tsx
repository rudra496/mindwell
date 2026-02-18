"use client"

import { useEffect, useRef } from "react"

interface FacebookPostEmbedProps {
  postUrl: string
  width?: number
}

export function FacebookPostEmbed({ postUrl, width = 500 }: FacebookPostEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Facebook SDK if not already loaded
    if (typeof window !== "undefined" && !(window as any).FB) {
      // Check if script already exists
      const existingScript = document.querySelector('script[src*="connect.facebook.net"]')
      if (!existingScript) {
        const script = document.createElement("script")
        script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0"
        script.async = true
        script.defer = true
        script.crossOrigin = "anonymous"
        document.body.appendChild(script)

        script.onload = () => {
          // Parse XFBML after SDK loads
          if ((window as any).FB) {
            (window as any).FB.XFBML.parse()
          }
        }
      }
    } else if ((window as any).FB) {
      // SDK already loaded, just parse the container
      (window as any).FB.XFBML.parse(containerRef.current)
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
