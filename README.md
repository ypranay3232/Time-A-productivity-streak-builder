Time Streak Builder ⏱️🔥
Time Streak Builder is a local-first VS Code extension that tracks your active coding time, builds daily streaks, and rewards you with meaningful feedback — without sending any data anywhere.

Privacy Note: No accounts. No SaaS. No tracking servers. Everything stays on your machine.

✨ Features
⏱️ Smart Time Tracking
Active Coding Only: Tracks time only when the editor is in focus.

Smart Pausing: Automatically pauses when you switch apps.

15-Minute Buffer: Ends a session only after 15 minutes of inactivity to prevent false endings during quick research breaks.

🔥 Streaks & ⭐ Stars
Daily Streaks: Tracks consecutive days of coding.

Manual Stars: Earn stars for manually completed projects—we respect user intent over auto-guessing.

🎉 Reward Popup
Full-screen UI: A clean black interface with animated fire effects.

Session Stats: View time spent, current streak, total stars, and a motivational message.

⏲️ Live Stopwatch + Pomodoro
Minimal UI: Sleek black stopwatch with Start / Stop / Reset controls.

Pomodoro Mode: 50 min focus / 10 min break cycles.

Notifications: Alerts at focus/break completion and fresh quotes for every cycle.

🔒 Privacy First
100% Local: Data is stored in local JSON files.

Zero Network: No APIs, no trackers, no network requests.

🧠 How It Works
Focus-Based: Time is counted only when VS Code is the active window.

Grace Period: Short tab switches (checking docs) do not interrupt your session.

Session End: Long inactivity triggers the reward screen and saves your progress.

Completion: Marking a project "Complete" is a manual action to ensure accuracy.

🚀 Commands
Open the Command Palette (Ctrl + Shift + P) and search for:

Time Streak Builder: Open Stopwatch

Time Streak Builder: Mark Project Complete

📦 Installation
✅ From VS Code Marketplace
Open Visual Studio Code.

Go to the Extensions view (Ctrl + Shift + X).

Search for Time Streak Builder.

Click Install.

🛠️ Local Installation (.VSIX)
If you have the build file, run the following command in your terminal:

Bash

code --install-extension time-a-productivity-streak-builder-0.1.0.vsix
🧑‍💻 Development Setup
Follow these steps if you want to contribute to the project or run it from the source.

🔧 Prerequisites
Node.js (v18+ recommended)

npm

Visual Studio Code

📥 Setup & Installation
1. Clone the Repository

Bash

git clone https://github.com/ypranay3232/Time-A-productivity-streak-builder.git
cd time-a-productivity-streak-builder
2. Install Dependencies

Bash

npm install
3. Compile & Run

Bash

# Compile the TypeScript code
npm run compile
4. Launching

Open the project folder in VS Code.

Press F5 to launch the Extension Development Host.

Test the commands in the new window using Ctrl + Shift + P.

📁 Data Storage
All data is stored locally within VS Code’s global storage. This includes:

Per-project total coding time.

Daily streak counts.

Star counts.

To reset your progress, you can use the internal "Reset Stats" command or clear the VS Code global storage folder.