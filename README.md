# FitCoach — your personal trainer

A private, offline-first phone app for **workouts, diet and weight goals**, with a
built-in "coach" that picks and configures a program based on your goal and the
equipment you actually have. Every workout day is laid out in the **"Grit" sheet
style** (black banner → giant motto → navy exercise blocks → SET / REPS / WT grid),
modeled on the workout sheets you liked.

Everything is built from **your own PDF packets**:

| Program | Source | Best for |
|---|---|---|
| GROWTH — 10 Week Bodybuilding | Hannah Eden (HEF) | build muscle (weekly rep-style cycling) |
| 12 Week Transformation | The Fitness Phantom | build muscle / recomp |
| Gains By Brains — 6 Week Fat Loss | Gains By Brains | cut / recomp (recipes + macros) |
| F/12 — 12 Week Shred | Flex Fitness | cut (strength + HIIT) |
| 8 Week Shred | Gold's Gym | cut (dumbbell-friendly) |
| Lean Bulking guide | Panacea Palm | the diet engine for bulking |

## What it does
- **Coach / onboarding** — asks your stats, goal, equipment and training days, then
  recommends a matching program and explains *why*.
- **Today** — your scheduled workout for the day, calories left, macros, weight, steps.
- **Train** — the full week of Grit-style sheets. Tap any cell to log weight + reps
  per set (auto-saved, turns green when done). Browse any week. **Swap** any exercise
  for one you can do with your equipment (bands/bodyweight/dumbbell/etc.).
- **Eat** — TDEE + macro targets straight from the guides (Mifflin–St Jeor, goal-based
  deficit/surplus), a daily food log, and a meal library with per-serving macros.
- **Weigh** — log weight, see the trend vs. your goal line, track progress.
- All data stays **on your device** (localStorage). No accounts, no servers.

## Run it
- **Quick:** open `FitCoach.html` (single self-contained file) in any browser.
- **As an installed app:** host the folder (GitHub Pages / Vercel / any static host),
  open it on your phone, and **Share → Add to Home Screen**. It then runs full-screen
  and offline like a native app.

## Files
- `index.html` — the app (loads `data.js`)
- `data.js` — all program / exercise / recipe / nutrition data from your PDFs
- `FitCoach.html` — single-file bundle (run `python3 build_bundle.py` to rebuild)
- `manifest.webmanifest`, `sw.js`, `icon-*.png` — PWA install + offline
- `source_files/` — your original PDFs · `extracted/` — their extracted text

## Add more of your content
Drop new PDFs into `source_files/` and ask the coach to fold them in — new programs
go in `data.js` as another entry in `PROGRAMS`, and new meals in `RECIPES`.
