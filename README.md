# Time Streak Builder ⏱️🔥

**Time Streak Builder** is a local-first VS Code extension that tracks your active coding time, builds daily streaks, and rewards you with meaningful feedback — without sending any data anywhere.

No accounts. No SaaS. No tracking servers.  
Everything stays on your machine.

---

## ✨ Features

### ⏱️ Smart Time Tracking
- Tracks **active coding time only**
- Automatically pauses when you switch apps
- Ends a session only after **15 minutes of inactivity**
- Prevents false session endings during quick tab switches

### 🔥 Streaks & ⭐ Stars
- **Daily streaks** for consistent coding
- **Stars** for manually completed projects
- No auto-guessing — user intent is respected

### 🎉 Reward Popup
- Full-screen reward popup on session end
- Shows:
  - Time spent building the project
  - Current streak
  - Total stars
  - Motivational message
- Clean black UI with animated fire

### ⏲️ Live Stopwatch + Pomodoro
- Minimal black stopwatch UI
- Start / Stop / Reset controls
- Optional **Pomodoro mode (50 min focus / 10 min break)**
- Notifications at focus & break completion
- Quotes refresh after each Pomodoro cycle

### 🔒 Privacy First
- 100% local storage (JSON)
- No APIs
- No network requests
- You own your data

---

## 🧠 How It Works (In Simple Terms)

- Time is counted **only when VS Code is focused**
- Short tab switches (docs, browser) do **not** end sessions
- Long inactivity (15+ min) ends the session and shows a reward
- Project completion is **manual**, never guessed

---

## 🚀 Commands

Open Command Palette (`Ctrl + Shift + P`):

- **Time Streak Builder: Open Stopwatch**
- **Time Streak Builder: Mark Project Complete**

---

## 📁 Data Storage

All data is stored locally in:



VsCode GlobalStorage : 

Includes:
- Per-project total time
- Daily streak data
- Stars count

You can delete this data anytime.

---

## 🏆 Why This Exists

Most productivity tools:
- Track everything
- Send data to servers
- Guess what “work” means

**Time Streak Builder** focuses on:
- Honest measurement
- Habit reinforcement
- Developer trust

---

## 🛠️ Installation

From VS Code Marketplace (coming soon)  
or install locally using a VSIX build.

---

## 📌 Status

- Version: `0.1.0`
- Stable V1
- Actively improving

---

## 🙌 Credits

Built with focus on **developer experience**, **privacy**, and **real-world workflows**.
