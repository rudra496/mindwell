# Play Store Release Checklist (MindWell Wrapper)

## App identity

- [ ] Finalize package name (e.g., `org.mindwell.app`)
- [ ] Increment `versionCode` and `versionName`
- [ ] Create signed release keystore and secure backup

## Store listing assets

- [ ] 512x512 app icon
- [ ] Feature graphic (1024x500)
- [ ] At least 2 phone screenshots
- [ ] Short + full descriptions

## Policy and legal

- [ ] Privacy Policy URL published and accessible
- [ ] Data Safety form completed accurately
- [ ] Ads declaration configured (if applicable)
- [ ] Sensitive health disclaimers verified in-app

## Technical QA

- [ ] Cold start and resume tested on Android 10+
- [ ] Offline behavior tested (banner + cached routes)
- [ ] Back button behavior validated on root and nested routes
- [ ] Deep links / external links open expected destinations
- [ ] Push permission flow tested (if enabled)

## Security hardening

- [ ] HTTPS-only `server.url`
- [ ] Mixed content disabled
- [ ] Navigation allowlist restricted
- [ ] CSP and security headers validated in production

