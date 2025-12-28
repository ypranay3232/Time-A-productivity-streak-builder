import * as vscode from 'vscode';

const IDLE_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes
const INACTIVITY_THRESHOLD_MS = 15 * 60 * 1000; // 15 minutes


export class TimeTracker {
    private sessionStart: number | null = null;
    private lastBlurTime: number | null = null;
    private lastActivity: number = Date.now();
    private totalActiveTime = 0;
    private idleInterval: NodeJS.Timeout | null = null;

    start() {
        if (this.sessionStart !== null) {
            return;
        }

        this.sessionStart = Date.now();
        this.lastActivity = Date.now();

        this.idleInterval = setInterval(() => {
            this.checkIdle();
        }, 60 * 1000); // check every minute

        console.log('[Tracker] Session started');
    }
    pause() {
        if (this.sessionStart === null) return;

        const now = Date.now();
        this.totalActiveTime += now - this.sessionStart;
        this.sessionStart = null;
        this.lastBlurTime = now;
    }

    resume(): boolean {
        if (this.lastBlurTime) {
            const inactiveDuration = Date.now() - this.lastBlurTime;

            // If user was away too long → session ended
            if (inactiveDuration >= INACTIVITY_THRESHOLD_MS) {
                this.lastBlurTime = null;
                return false; // signal: session ended
            }
        }

        this.sessionStart = Date.now();
        this.lastBlurTime = null;
        return true; // session continues
    }

    stop() {
        if (this.sessionStart === null) {
            return;
        }

        const now = Date.now();
        this.totalActiveTime += now - this.sessionStart;

        this.sessionStart = null;

        if (this.idleInterval) {
            clearInterval(this.idleInterval);
            this.idleInterval = null;
        }

        console.log('[Tracker] Session stopped');
        console.log('[Tracker] Total active time (ms):', this.totalActiveTime);
    }

    recordActivity() {
        this.lastActivity = Date.now();
        console.log('[Tracker] Activity recorded');
    }

    private checkIdle() {
        if (this.sessionStart === null) return;

        const now = Date.now();
        const idleTime = now - this.lastActivity;

        if (idleTime >= IDLE_THRESHOLD_MS) {
            console.log('[Tracker] Idle detected — pausing session');
            this.stop();
        }
    }

    getTotalTimeMs() {
        return this.totalActiveTime;
    }

    consumeSessionTime(): number {
        const time = this.totalActiveTime;
        this.totalActiveTime = 0;
        return time;
    }

}
