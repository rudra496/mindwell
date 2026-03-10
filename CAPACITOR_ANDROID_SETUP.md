# Capacitor Android Setup (Option A: Hosted Next.js URL)

This setup wraps the hosted MindWell site in a native Android app shell.

## Included in this repository

- `capacitor.config.ts` with hosted `server.url` configuration.
- Capacitor npm scripts in `package.json`.
- Runtime bootstrap for:
  - service worker registration
  - network offline banner
  - Android back-button handling
  - status bar + splash coordination

## 1) Install dependencies

```bash
npm install
```

If your environment blocks npm registry access, run the command in a network-enabled CI or local machine.

## 2) Add Android platform

```bash
npx cap add android
```

## 3) Sync web + native changes

```bash
npm run cap:sync:android
```

## 4) Open Android Studio

```bash
npm run cap:open:android
```

## 5) Verify critical wrapper behavior

- App starts from `https://mindwell-navy.vercel.app`
- No mixed-content warnings
- Back button navigates in-app and supports exit flow at root
- Offline banner appears when network is unavailable
- Status bar color/style matches brand theme

## 6) Recommended plugin usage

Included dependencies:

- `@capacitor/app`
- `@capacitor/network`
- `@capacitor/status-bar`
- `@capacitor/splash-screen`
- `@capacitor/keyboard`
- `@capacitor/haptics`
- `@capacitor/push-notifications`

## Security defaults

- `allowMixedContent: false`
- HTTPS-only server URL
- Restricted `allowNavigation`
- CSP and security headers in `next.config.mjs`

## Backend strategy

This wrapper uses hosted URL mode, so Next.js API routes continue to run on the deployed server without forcing static export.

