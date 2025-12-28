# Time Streak Builder — Engineering Documentation

This document explains the internal architecture, design decisions, and extension lifecycle.

---

## 🎯 Design Goals

1. **Local-first**
2. **No false productivity**
3. **No automatic intent guessing**
4. **Low cognitive load**
5. **VS Code lifecycle safe**

---

## 🧩 Architecture Overview

src/
├── extension.ts # Lifecycle + wiring
├── tracker.ts # Session & inactivity logic
├── storage.ts # Local JSON persistence
├── rewards.ts # Streaks & stars
├── firePopup.ts # Reward WebView
├── stopwatchView.ts # Stopwatch + Pomodoro WebView
├── messages.ts # Random message loader
├── timeUtils.ts # Duration formatting
media/
├── reward.html
├── stopwatch.html
├── fire.gif
├── messages.json


---

## ⏱️ Time Tracking Logic

### Core Principle
> Track **editor engagement**, not “work”.

### Rules
- Session starts when VS Code gains focus
- Session pauses on focus loss
- Session resumes if user returns quickly
- Session ends only if inactivity ≥ **15 minutes**

### Why 15 Minutes?
- Prevents false endings during:
  - Docs lookup
  - Browser research
- Aligns with real developer behavior

---

## 🛑 Inactivity Handling

Implemented in `tracker.ts`:

- `pause()` → records blur timestamp
- `resume()`:
  - If inactivity < threshold → continue session
  - If ≥ threshold → end session

This avoids:
- UI spam
- Session fragmentation
- Inflated time

---

## 🔥 Reward System

### Streaks
- Incremented once per calendar day
- Requires at least one valid session
- Resets automatically if a day is skipped

### Stars
- Added only via manual command
- Never auto-generated

### Philosophy
> Trust the user. Never guess intent.

---

## 🎉 Reward Popup (firePopup)

- Implemented via WebView
- Triggered only on:
  - Session end
  - Project completion
- Displays:
  - Time spent (formatted)
  - Streak
  - Stars
  - Message

No UI is rendered during `deactivate()`.

---

## ⏲️ Stopwatch & Pomodoro

### Design Choice
- Timer lives **inside WebView**
- Extension host only handles:
  - Opening UI
  - Notifications

### Pomodoro
- 50 min focus
- 10 min break
- Quotes refresh after each cycle
- Notifications sent via `postMessage`

---

## 🔐 Data Storage

### Where
- `context.globalStorageUri`
- JSON format

### Why JSON?
- Transparent
- Easy to inspect
- Easy to migrate to SQLite later if needed

---

## 🧠 Key Engineering Decisions

| Decision | Reason |
|--------|-------|
No SaaS | Privacy + simplicity |
Manual project completion | Avoid false positives |
WebView for UI | Clean separation |
No UI in deactivate | VS Code lifecycle safety |
Threshold-based inactivity | Accurate UX |

---

## 🧪 Testing Strategy (Manual)

- Focus switch < 15 min → no popup
- Focus switch ≥ 15 min → popup
- Project complete → popup + star
- Pomodoro notifications fire correctly
- Data persists across restarts

---

## 🚀 Future Improvements (Optional)

- SQLite storage
- Daily summary view
- Export stats
- Configurable Pomodoro intervals
- Theme customization

---

## 🏁 Status

This extension is **V1 complete**, production-safe, and designed for iteration.

Engineering focus: **clarity, correctness, and trust**.