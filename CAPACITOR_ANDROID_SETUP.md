# Capacitor Android Setup (Hosted URL mode) — Complete Guide

This guide is for the exact flow you asked for:
- Android Web Wrapper APK via Capacitor
- all core features working from hosted Next.js
- meditation text-to-voice working in WebView
- offline banner + reconnect auto-refresh
- Google sign-in that returns to the APK and reopens community flow

---

## 1) What is already implemented in this repo

- Capacitor config: `capacitor.config.ts`
- Runtime wrapper bootstrap: `src/components/capacitor/CapacitorRuntimeBootstrap.tsx`
  - service worker registration (prod)
  - offline banner with **Open settings** action
  - auto reload when network returns
  - Android back button handling
  - status bar + splash handoff
  - `appUrlOpen` deep-link listener
- Google auth logic updated in `src/lib/firebase.ts`
  - tries popup on web
  - uses redirect flow for native WebView and popup fallback
  - stores a “reopen community after auth” flag
- Community reopen after auth in `src/app/page.tsx`

---

## 2) Install + sync Capacitor

```bash
npm install
npx cap add android
npm run cap:sync:android
npm run cap:open:android
```

If `npm` registry access is blocked in your current environment, run these on your local machine/CI with normal npm access.

---

## 3) Set environment variables for production build

In Vercel (or your host), configure Firebase public vars:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (optional)

Without these, community auth won’t work.

---

## 4) Firebase Authentication settings (critical for APK login)

In Firebase Console:

1. Enable **Authentication → Sign-in method → Google**.
2. Add Authorized domains:
   - your hosted domain (e.g. `mindwell-navy.vercel.app`)
   - localhost domains used for local debug if needed
3. If you use custom domain, add that domain too.
4. Ensure OAuth consent screen/publishing status is valid.

> In Capacitor WebView, popup auth may fail on some devices; redirect sign-in is now supported and preferred there.

---

## 5) Return-to-app flow after sign-in (deep link / appUrlOpen)

To guarantee “login in browser then come back to APK”:

1. Decide app scheme/host, for example:
   - scheme: `mindwell`
   - host: `auth`
   - callback: `mindwell://auth`
2. Add Android intent filter in the Capacitor Android app for that callback.
3. Register the callback URL in your auth provider flow where applicable.
4. Keep `appUrlOpen` handling enabled (already in runtime bootstrap).

When redirect returns, app opens and route is restored; community modal reopen is handled via session flag.

---

## 6) Meditation text-to-voice in Android wrapper

The app already supports these runtime paths:

1. Web Speech API (browser path)
2. Capacitor plugin fallback (`Capacitor.Plugins.TextToSpeech` / `TTS`)
3. Android bridge fallback (`window.AndroidTTS`)

For best reliability in APK:

- Install/wire a native TTS plugin in wrapper shell.
- Keep Google Speech Services available on test devices.
- Validate audio focus behavior on interruptions.

See `CAPACITOR_WEBVIEW_ENHANCEMENTS.md` for integration notes.

---

## 7) Offline behavior and reconnect

Implemented behavior:
- When offline: user sees banner + settings shortcut.
- After internet is restored: app auto-refreshes once.

This is controlled in `CapacitorRuntimeBootstrap.tsx`.

---

## 8) Verify before release

### Web checks
```bash
npm run lint
npm test
npm run build
```

### Capacitor checks
```bash
npm run cap:sync:android
```
Then test in Android Studio/emulator/device:
- community open + sign in + return
- post/reply actions
- meditation TTS playback
- offline → online auto refresh
- back button behavior

---

## 9) Recommended repo tasks remaining (if you want “fully production ready”)

- Add a real Android project commit (`android/`) after running `npx cap add android` locally.
- Add concrete Firebase auth troubleshooting section in README.
- Add QA test matrix (Android 10/12/14, Chrome WebView versions).
- Add release branch workflow for `versionCode` / signing.

