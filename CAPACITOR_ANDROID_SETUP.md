# Capacitor Android Setup (Hosted URL Mode)

This setup wraps the hosted MindWell web app in a native Android shell while preserving normal browser behavior.

## Included in this repository

- `capacitor.config.ts` configured for hosted HTTPS `server.url` mode.
- Runtime bootstrap for:
  - production-only service worker registration
  - offline detection + reconnect auto-refresh
  - Android back-button exit flow
  - Firebase redirect deep-link handling (`appUrlOpen`)
  - status bar + splash coordination
- Web/native Firebase auth split:
  - browser: popup login
  - Capacitor native: redirect login

## 0) `google-services.json` is NOT committed (required, local only)

`android/app/google-services.json` is git-ignored because it contains a Firebase API key. After cloning:

1. Copy `android/app/google-services.json.example` to `android/app/google-services.json`.
2. Fill in the real values from the Firebase console (Project settings → Your apps → Android app → `google-services.json` download).
3. In Google Cloud Console → APIs & Services → Credentials, keep the key **restricted** (Android app restriction: package name + SHA-1/SHA-256) so a leaked value cannot be abused.

## 1) Install and sync

```bash
npm install
npx cap add android
npm run cap:sync:android
npm run cap:open:android
```

## 2) Firebase auth + deep-link return setup (required)

Add an Android intent filter in `android/app/src/main/AndroidManifest.xml` for your hosted domain so redirect returns to the running app:

```xml
<intent-filter android:autoVerify="true">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="https" android:host="mindwell-navy.vercel.app" />
</intent-filter>
```

Also ensure your Firebase Authentication Authorized Domains include:

- `mindwell-navy.vercel.app`

## 3) Android wrapper behavior checklist

- App starts from `https://mindwell-navy.vercel.app`
- Google auth completes and returns to app
- Community modal reopens after successful sign-in
- Offline banner appears with “Open network settings” button
- App auto-refreshes once network is restored
- Back button navigates history; at root requires double-press to exit
- Meditation TTS works with Web Speech and native fallback plugin

## 4) Text-to-speech native fallback

The runtime supports native TTS fallback when a Capacitor TextToSpeech plugin is exposed in the wrapper (`Capacitor.Plugins.TextToSpeech`).

If your Android WebView has unreliable `speechSynthesis`, add a compatible TextToSpeech Capacitor plugin in the native shell and sync again.
