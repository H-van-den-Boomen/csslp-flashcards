# CSSLP Flashcards

A focused, offline-capable study app for the ISC2 **CSSLP** exam: flip cards and
narrated audio, one deck per domain. No accounts, no tracking, no build step.

**188 cards across the 8 domains**, each with pre-generated neural-voice audio
for the question and the answer.

## Features

- **Flip cards** — tap (or press Space) to reveal the answer.
- **Audio** — play the question or answer aloud (edge-tts `en-US-AndrewNeural`).
- **Autoplay** — plays question, then answer, then advances, hands-free.
- **Shuffle** and keyboard navigation (`←` `→`, Space to flip, `P` to play).
- **Installable (PWA)** and works **offline** once loaded.
- Light and dark themes.

## Domains

| # | Domain | Cards |
|---|--------|-------|
| 1 | Secure Software Concepts | 40 |
| 2 | Secure Software Lifecycle Management | 20 |
| 3 | Secure Software Requirements | 20 |
| 4 | Secure Software Architecture and Design | 26 |
| 5 | Secure Software Implementation | 25 |
| 6 | Secure Software Testing | 20 |
| 7 | Secure Deployment, Operations, Maintenance | 19 |
| 8 | Secure Software Supply Chain | 18 |

## Run locally

It is a static site — any static server works:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

(Opening `index.html` directly via `file://` will not load `cards.json` due to
browser fetch rules; use a local server.)

## Deploy

Hosted with **GitHub Pages** from the `main` branch (root). Any static host
(Netlify, Vercel, Cloudflare Pages) works too — just serve the folder.

## Android app (offline APK)

A native Android build wraps the deck with [Capacitor](https://capacitorjs.com/).
It is **fully offline** (all cards and audio are bundled in the APK), **locked to
landscape**, and runs **immersive full-screen** (status and navigation bars
hidden). Domains and the theme switch live in a slide-in menu; the stage shows
only the card and its controls with the card number.

Download the ready-built APK from the repo's
[**Releases**](../../releases) and install it (enable "install from unknown
sources" when prompted).

### Build it yourself

Requires **JDK 21** (Android Studio's bundled JBR works) and the Android SDK.

```bash
npm install
node scripts/sync-assets.mjs          # copy cards.json + audio/ into app/
npx cap sync android
cd android && ./gradlew assembleDebug  # -> app/build/outputs/apk/debug/app-debug.apk
```

The APK UI (`app/index.html`, `app/styles.css`, `app/app.js`) is separate from
the web version at the repo root, which is left unchanged.

## Structure

```
index.html              web app shell (portrait, GitHub Pages)
styles.css              web design system (teal on slate, light/dark)
app.js                  web: flip / audio / autoplay / navigation
cards.json              the 188 cards + audio paths (source of truth)
audio/d1..d8/*.mp3       narrated question (-q) and answer (-a) clips
manifest.webmanifest    PWA metadata
sw.js                   offline service worker (web)
app/                    APK web assets (landscape + immersive UI)
android/                Capacitor Android project
scripts/sync-assets.mjs copies cards.json + audio/ into app/ for the APK
```

## Content

All cards are original study material written against the public CSSLP exam
outline. Not affiliated with or endorsed by ISC2.
