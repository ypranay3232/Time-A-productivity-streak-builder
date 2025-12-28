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

## 📦 Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to **Extensions**
3. Search for **Time Streak Builder**
4. Click **Install**

That’s it. No setup required.

---

### Local Installation (VSIX)

```bash
code --install-extension time-a-productivity-streak-builder-0.1.0.vsix
🧑‍💻 Development Setup (For Contributors)
Prerequisites
Node.js (v18+ recommended)

npm

VS Code

Basic knowledge of TypeScript

Clone the Repository
bash
Copy code
git clone https://github.com/<your-username>/time-a-productivity-streak-builder.git
cd time-a-productivity-streak-builder
Install Dependencies
bash
Copy code
npm install
Compile the Extension
bash
Copy code
npm run compile
Run in Development Mode
Open the project in VS Code

Press F5

A new Extension Development Host window opens

Test commands via Ctrl + Shift + P

📁 Data Storage
All data is stored locally using VS Code’s global storage:

Per-project total time

Daily streak count

Star count

No files are synced or uploaded.

You can reset all data by clearing VS Code global storage.

🏗️ Project Structure
bash
Copy code
src/
  extension.ts        # Lifecycle & wiring
  tracker.ts          # Time & inactivity logic
  storage.ts          # Local persistence
  rewards.ts          # Streaks & stars
  firePopup.ts        # Reward WebView
  stopwatchView.ts    # Stopwatch & Pomodoro UI
  messages.ts         # Random messages
  timeUtils.ts        # Duration formatting

media/
  reward.html
  stopwatch.html
  fire.gif
  messages.json
  icon.png
