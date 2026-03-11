"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { completeRedirectSignIn } from "@/lib/firebase"
import { App } from "@capacitor/app"

type CapacitorPluginBag = {
Network?: {
getStatus?: () => Promise<{ connected: boolean }>
addListener?: (eventName: string, callback: (status: { connected: boolean }) => void) => Promise<{ remove: () => void }> | { remove: () => void }
}
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

const reloadCooldownMs = 10000

export function CapacitorRuntimeBootstrap() {
const [isOffline, setIsOffline] = useState(false)
const [showExitHint, setShowExitHint] = useState(false)
const [isAuthResolving, setIsAuthResolving] = useState(false)

const nativeRuntime = useMemo(() => isCapacitorNative(), [])
const wasOfflineRef = useRef(false)
const reloadTriggeredRef = useRef(false)
const lastBackPressRef = useRef(0)

/* ---------------------------
Service Worker
--------------------------- */
useEffect(() => {
if (typeof window === "undefined") return

```
if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  navigator.serviceWorker.register("/sw.js").catch(() => undefined)
}
```

}, [])

/* ---------------------------
Status bar & splash
--------------------------- */
useEffect(() => {
if (!nativeRuntime) return

```
const plugins = getPlugins()

plugins.StatusBar?.setOverlaysWebView?.({ overlay: false }).catch(() => undefined)
plugins.StatusBar?.setStyle?.({ style: "DARK" }).catch(() => undefined)
plugins.StatusBar?.setBackgroundColor?.({ color: "#0d9488" }).catch(() => undefined)

const hideSplash = window.setTimeout(() => {
  plugins.SplashScreen?.hide?.().catch(() => undefined)
}, 450)

return () => window.clearTimeout(hideSplash)
```

}, [nativeRuntime])

/* ---------------------------
Network state detection
--------------------------- */
useEffect(() => {
if (typeof window === "undefined") return

```
const plugins = getPlugins()
let networkRemove: (() => void) | null = null

const updateOfflineState = (connected: boolean) => {
  const offline = !connected
  setIsOffline(offline)

  if (offline) {
    wasOfflineRef.current = true
    reloadTriggeredRef.current = false
    return
  }

  const canReload = wasOfflineRef.current && !reloadTriggeredRef.current
  if (!canReload) return

  const previousReload = Number(window.sessionStorage.getItem("mindwell:last-reload-on-online") ?? "0")
  const now = Date.now()

  if (now - previousReload < reloadCooldownMs) return

  reloadTriggeredRef.current = true
  window.sessionStorage.setItem("mindwell:last-reload-on-online", String(now))
  window.location.reload()
}

const setFromNavigator = () => updateOfflineState(navigator.onLine)

setFromNavigator()

window.addEventListener("online", setFromNavigator)
window.addEventListener("offline", setFromNavigator)

plugins.Network?.getStatus?.()
  .then((status) => updateOfflineState(status.connected))
  .catch(() => undefined)

const networkListener = plugins.Network?.addListener?.("networkStatusChange", (status) => {
  updateOfflineState(status.connected)
})

Promise.resolve(networkListener)
  .then((listener) => {
    networkRemove = listener?.remove ?? null
  })
  .catch(() => undefined)

return () => {
  window.removeEventListener("online", setFromNavigator)
  window.removeEventListener("offline", setFromNavigator)
  networkRemove?.()
}
```

}, [])

/* ---------------------------
Android back button
--------------------------- */
useEffect(() => {
if (!nativeRuntime) return

```
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
```

}, [nativeRuntime])

/* ---------------------------
🔑 Deep-link login fix
--------------------------- */
useEffect(() => {
if (!nativeRuntime) return

```
let removeUrlOpen: (() => void) | null = null

const listenerResult = App.addListener("appUrlOpen", (event) => {
  const incomingUrl = event?.url
  if (!incomingUrl) return

  try {
    const url = new URL(incomingUrl)

    if (url.hostname === "mindwell-navy.vercel.app") {
      window.location.href = url.pathname + url.search + url.hash
    }
  } catch {
    console.warn("Invalid deep link")
  }
})

Promise.resolve(listenerResult)
  .then((listener) => {
    removeUrlOpen = listener?.remove ?? null
  })
  .catch(() => undefined)

return () => removeUrlOpen?.()
```

}, [nativeRuntime])

/* ---------------------------
Firebase redirect login
--------------------------- */
useEffect(() => {
if (typeof window === "undefined") return

```
setIsAuthResolving(true)

completeRedirectSignIn()
  .catch(() => undefined)
  .finally(() => setIsAuthResolving(false))
```

}, [])

/* ---------------------------
Exit hint timer
--------------------------- */
useEffect(() => {
if (!showExitHint) return

```
const timer = window.setTimeout(() => setShowExitHint(false), 1400)
return () => window.clearTimeout(timer)
```

}, [showExitHint])

return (
<>
{isOffline && ( <div className="fixed bottom-4 left-1/2 z-[120] w-[min(92vw,540px)] -translate-x-1/2 rounded-xl bg-red-700 px-4 py-3 text-xs font-medium text-white shadow-lg">
You are offline. Please reconnect. </div>
)}

```
  {showExitHint && (
    <div className="fixed bottom-16 left-1/2 z-[120] -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-xs text-white shadow-lg">
      Press back again to exit MindWell.
    </div>
  )}

  {isAuthResolving && (
    <div className="sr-only">Completing sign-in…</div>
  )}
</>
```

)
}
