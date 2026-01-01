import * as vscode from 'vscode';

export interface StopwatchState {
	running: boolean;
	startedAt: number | null;
	elapsedMs: number;

	mode: 'stopwatch' | 'pomodoro';
	pomodoroPhase: 'focus' | 'break' | null;
	pomodoroEndsAt: number | null;
}


const KEY = 'stopwatchState';

export function loadState(
	context: vscode.ExtensionContext
): StopwatchState {
	return context.globalState.get<StopwatchState>(KEY, {
		running: false,
		startedAt: null,
		elapsedMs: 0,
		mode: 'stopwatch',
		pomodoroPhase: null,
		pomodoroEndsAt: null
	});

}

export async function saveState(
	context: vscode.ExtensionContext,
	state: StopwatchState
) {
	await context.globalState.update(KEY, state);
}
