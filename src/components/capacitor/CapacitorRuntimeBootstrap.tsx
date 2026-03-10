"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import { completeGoogleRedirectSignIn } from '@/lib/firebase'

type CapacitorPluginBag = {
  App?: {
    addListener?: (eventName: string, callback: (...args: any[]) => void) => Promise<{ remove: () => void }> | { remove: () => void }
    exitApp?: () => void
    openSettings?: () => Promise<void>
  }
  Network?: {
    getStatus?: () => Promise<{ connected: boolean }>
    addListener?: (eventName: string, callback: (status: { connected: boolean }) => void) => Promise<{ remove: () => void }> | { remove: () => void }
  }
  StatusBar?: {
    setStyle?: (options: { style: 'DARK' | 'LIGHT' }) => Promise<void>
    setBackgroundColor?: (options: { color: string }) => Promise<void>
    setOverlaysWebView?: (options: { overlay: boolean }) => Promise<void>
  }
  SplashScreen?: {
    hide?: () => Promise<void>
  }
  Haptics?: {
    impact?: (options: { style: 'LIGHT' | 'MEDIUM' | 'HEAVY' }) => Promise<void>
  }
}

const getPlugins = (): CapacitorPluginBag => {
  if (typeof window === 'undefined') return {}
  return ((window as any).Capacitor?.Plugins ?? {}) as CapacitorPluginBag
}

const isCapacitorNative = (): boolean => {
  if (typeof window === 'undefined') return false
  const capacitor = (window as any).Capacitor
  if (!capacitor) return false
  if (typeof capacitor.isNativePlatform === 'function') {
    return Boolean(capacitor.isNativePlatform())
  }
  if (typeof capacitor.getPlatform === 'function') {
    return capacitor.getPlatform() !== 'web'
  }
  return false
}

export function CapacitorRuntimeBootstrap() {
  const [isOffline, setIsOffline] = useState(false)
  const [showExitHint, setShowExitHint] = useState(false)
  const wasOfflineRef = useRef(false)

  const nativeRuntime = useMemo(() => isCapacitorNative(), [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.warn('Service worker registration failed:', error)
      })

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service worker updated and controlling the page.')
      })
    }
  }, [])

  useEffect(() => {
    if (!nativeRuntime) return

    const plugins = getPlugins()
    plugins.StatusBar?.setOverlaysWebView?.({ overlay: false }).catch(() => undefined)
    plugins.StatusBar?.setStyle?.({ style: 'DARK' }).catch(() => undefined)
    plugins.StatusBar?.setBackgroundColor?.({ color: '#0d9488' }).catch(() => undefined)

    const hideSplash = window.setTimeout(() => {
      plugins.SplashScreen?.hide?.().catch(() => undefined)
    }, 450)

    return () => {
      window.clearTimeout(hideSplash)
    }
  }, [nativeRuntime])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const plugins = getPlugins()
    let networkRemove: (() => void) | null = null

    const setFromNavigator = () => {
      const offline = !navigator.onLine
      if (!offline && wasOfflineRef.current) {
        wasOfflineRef.current = false
        window.location.reload()
        return
      }
      wasOfflineRef.current = offline
      setIsOffline(offline)
    }

    setFromNavigator()
    window.addEventListener('online', setFromNavigator)
    window.addEventListener('offline', setFromNavigator)

    plugins.Network?.getStatus?.()
      .then((status) => {
        const offline = !status.connected
        wasOfflineRef.current = offline
        setIsOffline(offline)
      })
      .catch(() => undefined)

    const networkListener = plugins.Network?.addListener?.('networkStatusChange', (status) => {
      const offline = !status.connected
      if (!offline && wasOfflineRef.current) {
        wasOfflineRef.current = false
        window.location.reload()
        return
      }
      wasOfflineRef.current = offline
      setIsOffline(offline)
    })

    Promise.resolve(networkListener)
      .then((listener) => {
        networkRemove = listener?.remove ?? null
      })
      .catch(() => undefined)

    return () => {
      window.removeEventListener('online', setFromNavigator)
      window.removeEventListener('offline', setFromNavigator)
      networkRemove?.()
    }
  }, [])

  useEffect(() => {
    completeGoogleRedirectSignIn().catch(() => undefined)
  }, [])

  useEffect(() => {
    if (!nativeRuntime) return

    const plugins = getPlugins()
    let removeBackHandler: (() => void) | null = null

    const listenerResult = plugins.App?.addListener?.('backButton', () => {
      if (window.history.length > 1) {
        window.history.back()
        return
      }

      setShowExitHint(true)
      plugins.Haptics?.impact?.({ style: 'LIGHT' }).catch(() => undefined)
      window.setTimeout(() => {
        plugins.App?.exitApp?.()
      }, 1200)
    })

    Promise.resolve(listenerResult)
      .then((listener) => {
        removeBackHandler = listener?.remove ?? null
      })
      .catch(() => undefined)

    return () => {
      removeBackHandler?.()
    }
  }, [nativeRuntime])


  useEffect(() => {
    if (!nativeRuntime) return

    const plugins = getPlugins()
    let removeUrlOpenHandler: (() => void) | null = null

    const listenerResult = plugins.App?.addListener?.('appUrlOpen', (event: { url?: string }) => {
      const targetUrl = event?.url
      if (!targetUrl) return

      try {
        const parsed = new URL(targetUrl)
        const path = `${parsed.pathname}${parsed.search}${parsed.hash}`
        if (path) {
          window.location.href = path
        }
      } catch {
        console.warn('Unable to parse appUrlOpen URL:', targetUrl)
      }
    })

    Promise.resolve(listenerResult)
      .then((listener) => {
        removeUrlOpenHandler = listener?.remove ?? null
      })
      .catch(() => undefined)

    return () => {
      removeUrlOpenHandler?.()
    }
  }, [nativeRuntime])

  useEffect(() => {
    if (!showExitHint) return
    const timer = window.setTimeout(() => setShowExitHint(false), 1400)
    return () => window.clearTimeout(timer)
  }, [showExitHint])

  return (
    <>
      {isOffline ? (
        <div className="fixed bottom-4 left-1/2 z-[120] flex -translate-x-1/2 items-center gap-2 rounded-full bg-red-700 px-4 py-2 text-xs font-medium text-white shadow-lg" role="status" aria-live="polite">
          <span>You are offline. Turn on data/Wi-Fi to auto-refresh this screen.</span>
          <button
            type="button"
            className="rounded-full border border-white/40 px-2 py-0.5 text-[11px] hover:bg-white/10"
            onClick={() => {
              const appPlugin = getPlugins().App
              appPlugin?.openSettings?.().catch(() => undefined)
            }}
          >
            Open settings
          </button>
        </div>
      ) : null}

      {showExitHint ? (
        <div className="fixed bottom-16 left-1/2 z-[120] -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-lg" role="status" aria-live="assertive">
          Press back again to exit MindWell.
        </div>
      ) : null}
    </>
  )
}
