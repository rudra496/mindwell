"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { completeRedirectSignIn } from "@/lib/firebase"
import { App } from "@capacitor/app"
import { initializeSpeechSynthesis } from "@/lib/speech"

type CapacitorPluginBag = {
  StatusBar?: {
    setStyle?: (options: { style: "DARK" | "LIGHT" }) => Promise<void>
    setBackgroundColor?: (options: { color: string }) => Promise<void>
    setOverlaysWebView?: (options: { overlay: boolean }) => Promise<void>
  }
  SplashScreen?: {
    hide?: () => Promise<void>
  }
  Haptics?: {
    impact?: (options: { style: "LIGHT" | "MEDIUM" | "HEAVY" }) => Promise<void>
  }
}

const getPlugins = (): CapacitorPluginBag => {
  if (typeof window === "undefined") return {}
  return ((window as any).Capacitor?.Plugins ?? {}) as CapacitorPluginBag
}

const isCapacitorNative = (): boolean => {
  if (typeof window === "undefined") return false

  const capacitor = (window as any).Capacitor
  if (!capacitor) return false

  if (typeof capacitor.isNativePlatform === "function") {
    return Boolean(capacitor.isNativePlatform())
  }

  if (typeof capacitor.getPlatform === "function") {
    return capacitor.getPlatform() !== "web"
  }

  return false
}

export function CapacitorRuntimeBootstrap() {
  const [showExitHint, setShowExitHint] = useState(false)
  const [isAuthResolving, setIsAuthResolving] = useState(false)

  const nativeRuntime = useMemo(() => isCapacitorNative(), [])
  const lastBackPressRef = useRef(0)

  const resolveAuthRedirect = () => {
    setIsAuthResolving(true)
    completeRedirectSignIn()
      .catch(() => undefined)
      .finally(() => setIsAuthResolving(false))
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined)
    }
  }, [])

  useEffect(() => {
    initializeSpeechSynthesis().catch((error) => {
      console.warn("[speech] Startup voice initialization failed", error)
    })
  }, [])

  useEffect(() => {
    if (!nativeRuntime) return

    const plugins = getPlugins()

    plugins.StatusBar?.setOverlaysWebView?.({ overlay: false }).catch(() => undefined)
    plugins.StatusBar?.setStyle?.({ style: "DARK" }).catch(() => undefined)
    plugins.StatusBar?.setBackgroundColor?.({ color: "#0d9488" }).catch(() => undefined)

    const hideSplash = window.setTimeout(() => {
      plugins.SplashScreen?.hide?.().catch(() => undefined)
    }, 450)

    return () => window.clearTimeout(hideSplash)
  }, [nativeRuntime])

  useEffect(() => {
    if (!nativeRuntime) return

    const plugins = getPlugins()
    let removeBackHandler: (() => void) | null = null

    const listenerResult = App.addListener("backButton", () => {
      const atRoot = window.location.pathname === "/" && !window.location.hash

      if (!atRoot && window.history.length > 1) {
        window.history.back()
        return
      }

      const now = Date.now()
      if (now - lastBackPressRef.current < 1300) {
        App.exitApp()
        return
      }

      lastBackPressRef.current = now
      setShowExitHint(true)
      plugins.Haptics?.impact?.({ style: "LIGHT" }).catch(() => undefined)
    })

    Promise.resolve(listenerResult)
      .then((listener) => {
        removeBackHandler = listener?.remove ?? null
      })
      .catch(() => undefined)

    return () => removeBackHandler?.()
  }, [nativeRuntime])

  useEffect(() => {
    if (!nativeRuntime) return

    let removeUrlOpen: (() => void) | null = null

    const listenerResult = App.addListener("appUrlOpen", (event) => {
      const incomingUrl = event?.url
      if (!incomingUrl) return

      try {
        const url = new URL(incomingUrl)
        if (url.hostname === "mindwell-navy.vercel.app") {
          window.location.href = url.pathname + url.search + url.hash
          window.setTimeout(() => resolveAuthRedirect(), 250)
        }
      } catch (error) {
        console.warn("Invalid deep link", error)
      }
    })

    Promise.resolve(listenerResult)
      .then((listener) => {
        removeUrlOpen = listener?.remove ?? null
      })
      .catch(() => undefined)

    return () => removeUrlOpen?.()
  }, [nativeRuntime])

  useEffect(() => {
    if (typeof window === "undefined") return
    resolveAuthRedirect()
  }, [])

  useEffect(() => {
    if (!nativeRuntime) return

    let removeStateListener: (() => void) | null = null

    const listenerResult = App.addListener("appStateChange", ({ isActive }) => {
      if (isActive) {
        window.setTimeout(() => resolveAuthRedirect(), 200)
      }
    })

    Promise.resolve(listenerResult)
      .then((listener) => {
        removeStateListener = listener?.remove ?? null
      })
      .catch(() => undefined)

    return () => removeStateListener?.()
  }, [nativeRuntime])

  useEffect(() => {
    if (!showExitHint) return

    const timer = window.setTimeout(() => setShowExitHint(false), 1400)
    return () => window.clearTimeout(timer)
  }, [showExitHint])

  return (
    <>
      {showExitHint ? (
        <div className="fixed bottom-16 left-1/2 z-[120] -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-xs text-white shadow-lg">
          Press back again to exit MindWell.
        </div>
      ) : null}

      {isAuthResolving ? <div className="sr-only">Completing sign-in…</div> : null}
    </>
  )
}
