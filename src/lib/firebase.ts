import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  Auth,
} from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const COMMUNITY_REOPEN_FLAG = "mindwell:reopen-community-after-auth";

// Check if Firebase is configured
const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.projectId;

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

const isCapacitorNativeRuntime = (): boolean => {
  if (typeof window === "undefined") return false;
  const capacitor = (window as any).Capacitor;
  if (!capacitor) return false;

  if (typeof capacitor.isNativePlatform === "function") {
    return Boolean(capacitor.isNativePlatform());
  }

  if (typeof capacitor.getPlatform === "function") {
    return capacitor.getPlatform() !== "web";
  }

  return false;
};

// Only initialize Firebase if properly configured
if (isFirebaseConfigured) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export async function signInWithGoogle() {
  if (!auth) {
    console.warn("Firebase not configured. Sign-in unavailable.");
    return;
  }

  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(COMMUNITY_REOPEN_FLAG, "1");
  }

  if (isCapacitorNativeRuntime()) {
    await signInWithRedirect(auth, provider);
    return;
  }

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.warn("Google popup sign-in failed; retrying with redirect.", error);
    await signInWithRedirect(auth, provider);
  }
}

export async function completeGoogleRedirectSignIn(): Promise<void> {
  if (!auth || typeof window === "undefined") return;

  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      window.sessionStorage.setItem(COMMUNITY_REOPEN_FLAG, "1");
    }
  } catch (error) {
    console.warn("Google redirect result could not be completed:", error);
  }
}

export function consumePendingCommunityOpen(): boolean {
  if (typeof window === "undefined") return false;
  const pending = window.sessionStorage.getItem(COMMUNITY_REOPEN_FLAG) === "1";
  if (pending) {
    window.sessionStorage.removeItem(COMMUNITY_REOPEN_FLAG);
  }
  return pending;
}

export { auth, db };
export default app;
