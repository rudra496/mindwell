"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { App } from "@capacitor/app"
import { Network } from "@capacitor/network"

const reloadCooldownMs = 10000

const isNativeCapacitor = (): boolean => {
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

export function OfflineGuard({ children }: { children: React.ReactNode }) {
  const [isOffline, setIsOffline] = useState(false)
  const [checking, setChecking] = useState(true)
  const nativeRuntime = useMemo(() => isNativeCapacitor(), [])

  const wasOfflineRef = useRef(false)
  const reloadTriggeredRef = useRef(false)

  useEffect(() => {
    let unsubscribed = false
    let removeNetworkListener: (() => void) | null = null

    const updateConnectivity = (connected: boolean, source: string) => {
      if (unsubscribed) return

      const offline = !connected
      setChecking(false)
      setIsOffline(offline)

      console.info("[offline-guard] Connectivity update", { source, connected, offline })

      if (offline) {
        wasOfflineRef.current = true
        reloadTriggeredRef.current = false
        return
      }

      const canReload = wasOfflineRef.current && !reloadTriggeredRef.current
      if (!canReload) return

      const previousReload = Number(
        window.sessionStorage.getItem("mindwell:last-reload-on-online") ?? "0"
      )

      const now = Date.now()
      if (now - previousReload < reloadCooldownMs) return

      reloadTriggeredRef.current = true
      window.sessionStorage.setItem("mindwell:last-reload-on-online", String(now))
      window.location.reload()
    }

    const handleBrowserStatus = () => updateConnectivity(navigator.onLine, "navigator")

    window.addEventListener("online", handleBrowserStatus)
    window.addEventListener("offline", handleBrowserStatus)
    handleBrowserStatus()

    Network.getStatus()
      .then((status) => updateConnectivity(status.connected, "capacitor:getStatus"))
      .catch((error) => {
        console.warn("[offline-guard] Failed to read Network.getStatus", error)
      })

    Network.addListener("networkStatusChange", (status) => {
      updateConnectivity(status.connected, "capacitor:listener")
    })
      .then((listener) => {
        removeNetworkListener = () => listener.remove()
      })
      .catch((error) => {
        console.warn("[offline-guard] Failed to subscribe to networkStatusChange", error)
      })

    return () => {
      unsubscribed = true
      window.removeEventListener("online", handleBrowserStatus)
      window.removeEventListener("offline", handleBrowserStatus)
      removeNetworkListener?.()
    }
  }, [])

  if (checking) {
    return <>{children}</>
  }

  if (!isOffline) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <h1 className="text-3xl font-bold">Connect to Internet</h1>
      <p className="mt-3 max-w-md text-sm text-slate-200">
        MindWell needs an internet connection right now. Reopen the app when your connection is back.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-500"
        >
          Retry
        </button>

        {nativeRuntime ? (
          <button
            type="button"
            onClick={() => App.exitApp()}
            className="rounded-md border border-slate-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Close App
          </button>
        ) : null}
      </div>
    </div>
  )
}
