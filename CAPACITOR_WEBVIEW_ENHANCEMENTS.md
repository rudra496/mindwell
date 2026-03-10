# Capacitor Android Web Wrapper Enhancements

This repository now includes runtime fallbacks for meditation voice playback so the app works in Android WebView wrappers where `window.speechSynthesis` is missing or unstable.

## What was added

- **Primary web path**: existing Web Speech API (`window.speechSynthesis`).
- **Capacitor plugin fallback**: if your native shell exposes `Capacitor.Plugins.TextToSpeech` (or `TTS`), the app will use it automatically.
- **Custom Android bridge fallback**: if you expose `window.AndroidTTS` from your native wrapper via `addJavascriptInterface`, the app will use it.

No existing UI/flow was removed. The original web behavior remains intact.

## Native wrapper setup (recommended)

### Option A: Capacitor Text-To-Speech plugin

Install and wire a native TTS plugin in your Capacitor app shell and expose it as `Capacitor.Plugins.TextToSpeech`.

Expected methods used by web app:

- `speak({ text, lang, rate, pitch, volume })`
- `stop()` (optional but recommended)

### Option B: Custom Android bridge

Expose this JavaScript bridge object in your Android wrapper:

```ts
window.AndroidTTS.speak(text, lang, rate, pitch, volume)
window.AndroidTTS.stop()
```

The web app auto-detects this object and uses it when Web Speech API is unavailable.

## Additional recommendations for best Android wrapper UX

- Request and test device **audio focus** to avoid silent output after notifications.
- Keep screen awake during long meditation sessions if desired.
- Ensure TTS engine package is available on device (e.g., Google Speech Services).
- Verify media volume stream is not muted by hardware buttons.
- Prefer HTTPS content and allow mixed content only when absolutely needed.

