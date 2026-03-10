# Play Store Release Checklist (MindWell Capacitor Wrapper)

## App identity

- [ ] Finalize package name (`org.mindwell.app`)
- [ ] Increment `versionCode` and `versionName`
- [ ] Create and backup release keystore

## Policy and legal

- [ ] Publish Privacy Policy URL
- [ ] Complete Data Safety form
- [ ] Verify mental-health disclaimers are visible in-app

## Wrapper-specific QA

- [ ] Cold start and resume tested on Android 10+
- [ ] Firebase Google login works in WebView (redirect mode)
- [ ] Redirect returns to running app via intent filter
- [ ] Community section reopens after successful login
- [ ] Offline banner appears when disconnected
- [ ] “Open network settings” button launches Android settings
- [ ] Auto-refresh occurs once network is restored (no reload loop)
- [ ] Back button behavior verified (history back + double-press exit)
- [ ] Meditation TTS works on Android devices

## Security verification

- [ ] HTTPS-only `server.url`
- [ ] Mixed content disabled
- [ ] `allowNavigation` restricted to trusted hosts
- [ ] CSP/headers validated in production response

## Release build

- [ ] `npm run build` succeeds
- [ ] `npm run cap:sync:android` succeeds
- [ ] Generate signed AAB/APK from Android Studio
