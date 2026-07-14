# FitCoach — Feature Roadmap / Notes

Captured from user notes. Ordered loosely by theme. Nothing implemented yet — this is the backlog.

## Exercise content & guidance
- [x] **More cable work** — DONE (first pass). Added ~20 cable moves to the swap library (Cable Chest Press, Cable Fly hi/lo, Cable Pull-Through, Cable RDL, Cable Front/Lateral Raise, Cable Upright Row, Bayesian Cable Curl, Cable Rope Hammer Curl, Cable Overhead Extension, Single-Arm Cable Pushdown, Cable Woodchopper, Pallof Press, etc). Still TODO: seed cable work directly into program days, not just as swaps.
- [x] **Muscle group per exercise** — DONE. Color-coded badge (primary + secondary) on every exercise in the Train/Today sheets, driven by a `muscleFor()` classifier (name-based, audited across all 273 exercises). Powers future work: alternatives, search, overtraining flag.
- [x] **Better alternatives for each workout** — DONE. Swap modal now shows a muscle badge + equipment per option, sorts "can-do-with-your-kit" first, and adds a "Similar — also hits <muscle>" section pulling matching moves from other categories.
- [x] **More alternatives + search** — DONE. Swap modal has a live search box over a 105-move universe; filters by name, muscle, or equipment across all categories with focus retained.
- [ ] **Link to video or image** — each exercise links to a general demo video or reference image (form guide).
- [ ] **Reference more than one PDF** — pull exercises/programs from multiple source PDFs, not a single program at a time.

## Program & schedule control
- [ ] **Add / subtract workouts** — user can add or remove workouts from a day/week.
- [ ] **Change workout days & rest days** — reconfigure which days are training vs. rest.

## Coaching intelligence
- [x] **Overtraining flag** — DONE. "Weekly Muscle Balance" card on the Train tab: `weeklyVolume()` counts effective sets/muscle for the current program week (primary full, secondary half, respects swaps), color-coded bars sorted by volume, and flags ⚠️ overtraining (≥32 sets), 🔥 antagonist imbalance (e.g. Quads 6× Hamstrings), and 💤 under-trained majors. Thresholds calibrated against all 6 programs so balanced ones (growth, gbb6) correctly read balanced.

## Tracking
- [ ] **Notes tracking** — be able to write and track notes (per workout / per exercise / general).
- [x] **Weight data accuracy fix** — DONE. Four real bugs found & fixed:
  1. `goalDir()` derived lose/gain from your **first-ever** weigh-in, so crossing or re-setting your goal gave backwards advice (told you to keep cutting while already under target). Now reads from your current trend weight, with a 1 lb deadband.
  2. `recentWeights()` anchored its 28-day window to your **last entry** instead of today — months-old data produced a confident, wrong "current rate" and a real projected goal date. Now anchored to today.
  3. Trend chart plotted points by **array index**, so a 3-month gap looked identical to a 1-day gap and the trend slope was meaningless with irregular logging. Now spaced by real elapsed days.
  4. Stale data now says "Data stale — last weigh-in was N days ago" instead of inventing a rate.

---
### Priority order (TBD — confirm with user)
_To be decided. Weight-accuracy fix and muscle-group labels look like good high-value starters._
