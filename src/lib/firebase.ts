import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  Auth,
  UserCredential,
} from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const COMMUNITY_AUTH_RETURN_KEY = "mindwell:community:return";
const COMMUNITY_AUTH_OPEN_KEY = "mindwell:community:open";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.projectId;

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

if (isFirebaseConfigured) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const isCapacitorNativeRuntime = (): boolean => {
  if (typeof window === "undefined") return false;
  const capacitor = (window as any)?.Capacitor;
  if (!capacitor) return false;

  if (typeof capacitor.isNativePlatform === "function") {
    return Boolean(capacitor.isNativePlatform());
  }

  if (typeof capacitor.getPlatform === "function") {
    return capacitor.getPlatform() !== "web";
  }

  return false;
};

const markCommunityReturn = () => {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(COMMUNITY_AUTH_RETURN_KEY, "1");
};

export const shouldReopenCommunityAfterAuth = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(COMMUNITY_AUTH_OPEN_KEY) === "1";
};

export const consumeCommunityReopenFlag = (): boolean => {
  if (!shouldReopenCommunityAfterAuth() || typeof window === "undefined") return false;
  window.sessionStorage.removeItem(COMMUNITY_AUTH_OPEN_KEY);
  return true;
};

export async function signInWithGoogle() {
  if (!auth) {
    console.warn("Firebase not configured. Sign-in unavailable.");
    return;
  }

  markCommunityReturn();

  if (isCapacitorNativeRuntime()) {
    await signInWithRedirect(auth, provider);
    return;
  }

  await signInWithPopup(auth, provider);
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(COMMUNITY_AUTH_OPEN_KEY, "1");
  }
}

export async function completeRedirectSignIn(): Promise<UserCredential | null> {
  if (!auth || typeof window === "undefined") return null;

  const result = await getRedirectResult(auth);

  if (result?.user) {
    if (window.sessionStorage.getItem(COMMUNITY_AUTH_RETURN_KEY) === "1") {
      window.sessionStorage.removeItem(COMMUNITY_AUTH_RETURN_KEY);
      window.sessionStorage.setItem(COMMUNITY_AUTH_OPEN_KEY, "1");
    }
  }

  return result;
}

export { auth, db };
export default app;
