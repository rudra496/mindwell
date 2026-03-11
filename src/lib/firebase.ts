import { App as CapacitorApp } from "@capacitor/app"
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  type Auth,
  type UserCredential,
  onAuthStateChanged,
} from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"

const COMMUNITY_AUTH_OPEN_KEY = "mindwell:community:open"
const AUTH_PROVIDER_KEY = "provider"
const AUTH_ID_TOKEN_KEY = "id_token"
const AUTH_ACCESS_TOKEN_KEY = "access_token"
const AUTH_ERROR_KEY = "error"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

let app: FirebaseApp | undefined
let auth: Auth | undefined
let db: Firestore | undefined

if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
}

const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })

function getCapacitorBrowserPlugin(): {
  open?: (options: { url: string; windowName?: string }) => Promise<void>
  close?: () => Promise<void>
} | null {
  if (typeof window === "undefined") return null

  return (
    ((window as typeof window & { Capacitor?: { Plugins?: { Browser?: unknown } } }).Capacitor
      ?.Plugins?.Browser as {
      open?: (options: { url: string; windowName?: string }) => Promise<void>
      close?: () => Promise<void>
    } | undefined) ?? null
  )
}

async function openExternalAuth(url: string): Promise<void> {
  const browser = getCapacitorBrowserPlugin()

  if (browser?.open) {
    await browser.open({ url, windowName: "_self" })
    return
  }

  if (typeof window !== "undefined") {
    window.location.assign(url)
  }
}

async function closeExternalAuth(): Promise<void> {
  const browser = getCapacitorBrowserPlugin()
  if (!browser?.close) return

  await browser.close().catch(() => undefined)
}

function extractAuthParamsFromLocation(): URLSearchParams | null {
  if (typeof window === "undefined") return null

  const fromSearch = new URLSearchParams(window.location.search)
  if (fromSearch.has(AUTH_ID_TOKEN_KEY) || fromSearch.has(AUTH_ERROR_KEY)) {
    return fromSearch
  }

  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash
  const fromHash = new URLSearchParams(hash)

  if (fromHash.has(AUTH_ID_TOKEN_KEY) || fromHash.has(AUTH_ERROR_KEY)) {
    return fromHash
  }

  return null
}

export async function signInWithGoogle() {
  if (!auth) {
    console.warn("Firebase not configured")
    return
  }

  const loginUrl = "https://mindwell-navy.vercel.app/api/auth/google"
  await openExternalAuth(loginUrl)
}

export function setupCapacitorAuthRedirectHandler() {
  CapacitorApp.addListener("appUrlOpen", async (event) => {
    const incomingUrl = event.url
    if (!incomingUrl) return

    try {
      const url = new URL(incomingUrl)

      if (url.hostname === "mindwell-navy.vercel.app") {
        await closeExternalAuth()

        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(COMMUNITY_AUTH_OPEN_KEY, "1")
          window.location.href = url.pathname + url.search + url.hash
        }
      }
    } catch (err) {
      console.error("Invalid redirect URL", err)
    }
  })
}

export async function completeRedirectSignIn(): Promise<UserCredential | null> {
  if (!auth || typeof window === "undefined") return null

  const params = extractAuthParamsFromLocation()
  if (!params) return null

  const authError = params.get(AUTH_ERROR_KEY)
  if (authError) {
    console.error("OAuth redirect error", authError)
    return null
  }

  const authProvider = params.get(AUTH_PROVIDER_KEY)
  if (authProvider && authProvider !== "google") return null

  const idToken = params.get(AUTH_ID_TOKEN_KEY)
  if (!idToken) return null

  const accessToken = params.get(AUTH_ACCESS_TOKEN_KEY) ?? undefined

  const credential = GoogleAuthProvider.credential(idToken, accessToken)
  return signInWithCredential(auth, credential)
}

export const shouldReopenCommunityAfterAuth = (): boolean => {
  if (typeof window === "undefined") return false
  return window.sessionStorage.getItem(COMMUNITY_AUTH_OPEN_KEY) === "1"
}

export const consumeCommunityReopenFlag = (): boolean => {
  if (typeof window === "undefined") return false

  const flag = window.sessionStorage.getItem(COMMUNITY_AUTH_OPEN_KEY) === "1"
  window.sessionStorage.removeItem(COMMUNITY_AUTH_OPEN_KEY)
  return flag
}

export function watchAuthState(callback: (user: unknown) => void) {
  if (!auth) return
  return onAuthStateChanged(auth, callback)
}

export { auth, db }
export default app
