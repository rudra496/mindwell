import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
getAuth,
GoogleAuthProvider,
signInWithCredential,
Auth,
UserCredential,
onAuthStateChanged
} from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { Browser } from "@capacitor/browser";
import { App as CapacitorApp } from "@capacitor/app";

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

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

if (firebaseConfig.apiKey && firebaseConfig.projectId) {
app = getApps().length ? getApp() : initializeApp(firebaseConfig);
auth = getAuth(app);
db = getFirestore(app);
}

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export async function signInWithGoogle() {
if (!auth) {
console.warn("Firebase not configured");
return;
}

const loginUrl =
"https://mindwell-navy.vercel.app/api/auth/google";

await Browser.open({
url: loginUrl,
windowName: "_self",
});
}

export function setupCapacitorAuthRedirectHandler() {
CapacitorApp.addListener("appUrlOpen", async (event) => {
const incomingUrl = event.url;

```
if (!incomingUrl) return;

try {
  const url = new URL(incomingUrl);

  if (url.hostname === "mindwell-navy.vercel.app") {
    await Browser.close();

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(COMMUNITY_AUTH_OPEN_KEY, "1");
      window.location.href = url.pathname + url.search + url.hash;
    }
  }
} catch (err) {
  console.error("Invalid redirect URL", err);
}
```

});
}

export const shouldReopenCommunityAfterAuth = (): boolean => {
if (typeof window === "undefined") return false;
return window.sessionStorage.getItem(COMMUNITY_AUTH_OPEN_KEY) === "1";
};

export const consumeCommunityReopenFlag = (): boolean => {
if (typeof window === "undefined") return false;

const flag = window.sessionStorage.getItem(COMMUNITY_AUTH_OPEN_KEY) === "1";
window.sessionStorage.removeItem(COMMUNITY_AUTH_OPEN_KEY);
return flag;
};

export function watchAuthState(callback: (user: any) => void) {
if (!auth) return;
return onAuthStateChanged(auth, callback);
}

export { auth, db };
export default app;
