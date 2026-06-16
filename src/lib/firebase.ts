import { App as CapacitorApp } from "@capacitor/app"
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import {
  browserLocalPersistence,
  browserPopupRedirectResolver,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  indexedDBLocalPersistence,
  initializeAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  type Auth,
  type UserCredential,
} from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"

const COMMUNITY_AUTH_OPEN_KEY = "mindwell:community:open"

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

  try {
    auth = initializeAuth(app, {
      persistence: [indexedDBLocalPersistence, browserLocalPersistence],
      popupRedirectResolver: browserPopupRedirectResolver,
    })
  } catch {
    auth = getAuth(app)
  }

  db = getFirestore(app)
}

const provider = new GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })


const isNativeCapacitorRuntime = (): boolean => {
  if (typeof window === "undefined") return false
  const capacitor = (window as any)?.Capacitor
  if (!capacitor) return false

  if (typeof capacitor.isNativePlatform === "function") {
    return Boolean(capacitor.isNativePlatform())
  }

  if (typeof capacitor.getPlatform === "function") {
    return capacitor.getPlatform() !== "web"
  }

  return false
}

/*
--------------------------------------------------
Google Login
--------------------------------------------------
*/

export async function signInWithGoogle() {
  if (!auth) {
    console.warn("Firebase not configured")
    return
  }

  try {
    await setPersistence(auth, browserLocalPersistence)
  } catch (error) {
    console.warn("Failed to set auth persistence", error)
  }

  const shouldUseRedirect = isNativeCapacitorRuntime()

  if (!shouldUseRedirect) {
    try {
      await signInWithPopup(auth, provider)
      return
    } catch (error) {
      console.warn("Popup sign-in failed; falling back to redirect", error)
    }
  }

  await signInWithRedirect(auth, provider)
}

/*
--------------------------------------------------
Handle Firebase redirect after login
--------------------------------------------------
*/

export async function completeRedirectSignIn(): Promise<UserCredential | null> {
  if (!auth || typeof window === "undefined") return null

  try {
    const result = await getRedirectResult(auth)

    if (result?.user) {
      window.sessionStorage.setItem(COMMUNITY_AUTH_OPEN_KEY, "1")
    }

    return result
  } catch (error) {
    console.error("Redirect sign-in failed", error)
    return null
  }
}

/*
--------------------------------------------------
Capacitor deep-link handler
--------------------------------------------------
*/

export function setupCapacitorAuthRedirectHandler() {
  CapacitorApp.addListener("appUrlOpen", (event) => {
    const incomingUrl = event.url
    if (!incomingUrl) return

    try {
      const url = new URL(incomingUrl)

      if (url.hostname === "rudra496.github.io") {
        window.location.href = url.pathname + url.search + url.hash
      }
    } catch (err) {
      console.error("Invalid redirect URL", err)
    }
  })
}

/*
--------------------------------------------------
Community reopen helpers
--------------------------------------------------
*/

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

/*
--------------------------------------------------
Auth state listener
--------------------------------------------------
*/

export function watchAuthState(callback: (user: unknown) => void) {
  if (!auth) return
  return onAuthStateChanged(auth, callback)
}

export { auth, db }
export default app
