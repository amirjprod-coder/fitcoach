# FitCoach — Feature Roadmap / Notes

Captured from user notes. Ordered loosely by theme. Nothing implemented yet — this is the backlog.

## Exercise content & guidance
- [x] **More cable work** — DONE (first pass). Added ~20 cable moves to the swap library (Cable Chest Press, Cable Fly hi/lo, Cable Pull-Through, Cable RDL, Cable Front/Lateral Raise, Cable Upright Row, Bayesian Cable Curl, Cable Rope Hammer Curl, Cable Overhead Extension, Single-Arm Cable Pushdown, Cable Woodchopper, Pallof Press, etc). Still TODO: seed cable work directly into program days, not just as swaps.
- [x] **Muscle group per exercise** — DONE. Color-coded badge (primary + secondary) on every exercise in the Train/Today sheets, driven by a `muscleFor()` classifier (name-based, audited across all 273 exercises). Powers future work: alternatives, search, overtraining flag.
- [x] **Better alternatives for each workout** — DONE. Swap modal now shows a muscle badge + equipment per option, sorts "can-do-with-your-kit" first, and adds a "Similar — also hits <muscle>" section pulling matching moves from other categories.
- [x] **More alternatives + search** — DONE. Swap modal has a live search box over a 105-move universe; filters by name, muscle, or equipment across all categories with focus retained.
- [x] **Link to video or image** — DONE. A ▶ chip on every exercise row and every picker row, deep-linking to a YouTube search for "<name> proper form technique" (`target=_blank`, `rel=noopener noreferrer`).
  **Why search links, not curated ones:** hand-writing ~300 video IDs would mean guessing IDs that 404 or point at the wrong lift, and they rot over time. A search deep-link always resolves and covers moves added later for free. Trade-off: it leaves the app and the top result isn't guaranteed. Swap in curated URLs later if any exercise deserves a specific clip.
- [x] **Reference more than one PDF** — DONE. `exUniverse()` now pools the curated SWAPS list **plus every exercise from every program**: 105 → **300 moves across all 6 packets**. Each picker row shows its source (📄 GROWTH / 8 Week Shred / …). New `equipFor()` derives kit from the name (errs permissive — a move wrongly shown is a shrug, wrongly hidden you'd never find). Class/Pilates + cardio days are excluded (session content, not slottable gym moves).
  **Not done — blending whole programs into a hybrid plan.** Each program is a coherent design and the `tuning` layer depends on that shape; splicing them would break the logic. Pooling exercises gives the cross-PDF reach without wrecking the programming.

## Program & schedule control
- [x] **Add / subtract workouts** — DONE. `＋ Add exercise` (reuses the searchable move picker) and `✕` per row, with `↩ Restore N removed`. Scoped to a single day, fully reversible.
- [x] **Change workout days & rest days** — DONE. "Training days" card: tap weekdays to train/rest; the week's sessions get dealt onto the days you pick. Warns when you pick fewer days than the program has sessions. Reset-to-default available.

### Design: plan edits are an OVERLAY, never a fork
`S.edits[pid] = {hide:{dayId:[ei]}, add:{dayId:[{ei,name,sets,reps}]}, trainDays:[0..6]|null}`,
applied at two choke points — `dayBlocks()` and `scheduleFor()` — so the sheet, session
status, weekly volume and the overtraining flag all pick edits up for free.

Chosen over forking a personal copy of the program because: the `data.js` programs still
get coach fixes (which a frozen fork would miss), reset-to-default stays possible, it syncs
as a few keys instead of a full program blob, and it matches how swaps already behave.

**The invariant that matters:** logs and swaps are keyed by exercise INDEX (`log[ei]`,
`pid.dayId.exIdx`). So we NEVER splice the block list — removing only flags `__hidden`
(index stays reserved) and added moves take stable indices from `ADD_EI_BASE`(1000) up.
Splicing would silently re-attach logged weights to the wrong exercise. Verified: logging
95lb on ei=3, then removing ei=1, leaves ei=3 pointing at the same move with the same weight.

## Coaching intelligence
- [x] **Overtraining flag** — DONE. "Weekly Muscle Balance" card on the Train tab: `weeklyVolume()` counts effective sets/muscle for the current program week (primary full, secondary half, respects swaps), color-coded bars sorted by volume, and flags ⚠️ overtraining (≥32 sets), 🔥 antagonist imbalance (e.g. Quads 6× Hamstrings), and 💤 under-trained majors. Thresholds calibrated against all 6 programs so balanced ones (growth, gbb6) correctly read balanced.

## Tracking
- [x] **Notes tracking** — DONE. Two kinds, deliberately separate:
  - **Exercise cue** (`S.exNotes[pid.dayId.ei]`) — persists across *every* week, shown as an amber callout on the row; the ✎ chip lights up when set. For form cues, machine settings, a niggle to watch.
  - **Session note** (`log.__note`) — per week, per day; amber panel at the sheet footer. For how that one session went. Browsable via "show past sessions". Works on class/no-weight days too.
  - Cues key off the same stable `ei` as logs, so removing an exercise can't drift a note onto the wrong movement. `sessionStatus` skips `__note` so it can't be counted as a set.
- [x] **Weight data accuracy fix** — DONE. Four real bugs found & fixed:
  1. `goalDir()` derived lose/gain from your **first-ever** weigh-in, so crossing or re-setting your goal gave backwards advice (told you to keep cutting while already under target). Now reads from your current trend weight, with a 1 lb deadband.
  2. `recentWeights()` anchored its 28-day window to your **last entry** instead of today — months-old data produced a confident, wrong "current rate" and a real projected goal date. Now anchored to today.
  3. Trend chart plotted points by **array index**, so a 3-month gap looked identical to a 1-day gap and the trend slope was meaningless with irregular logging. Now spaced by real elapsed days.
  4. Stale data now says "Data stale — last weigh-in was N days ago" instead of inventing a rate.

---
### Priority order (TBD — confirm with user)
_To be decided. Weight-accuracy fix and muscle-group labels look like good high-value starters._
