import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { loadState, saveState, StopwatchState } from './stopwatchState';
import { openPomodoro } from './pomodoroView';


let uiInterval: NodeJS.Timeout | null = null;
let sessionCount = 0;


export function openStopwatch(context: vscode.ExtensionContext) {
	const panel = vscode.window.createWebviewPanel(
		'liveStopwatch',
		'⏱️ Time Streak Builder',
		vscode.ViewColumn.Active,
		{
			enableScripts: true,
			retainContextWhenHidden: true
		}
	);

	const htmlPath = path.join(context.extensionPath, 'media', 'stopwatch.html');
	panel.webview.html = fs.readFileSync(htmlPath, 'utf8');

	let state: StopwatchState = loadState(context);

	// 🔁 UI ticker (cosmetic only)
	const startUiTicker = () => {
		if (uiInterval) return;

		uiInterval = setInterval(() => {
			const now = Date.now();

			// Pomodoro countdown
			if (state.mode === 'pomodoro' && state.pomodoroEndsAt) {
				const remaining = Math.max(0, state.pomodoroEndsAt - now);

				panel.webview.postMessage({
					type: 'tick',
					seconds: Math.floor(remaining / 1000)
				});

				// Phase transition (no await here)
				if (remaining === 0) {
					handlePomodoroPhaseTransition(context, panel, state);
				}

				return;
			}

			// Normal stopwatch
			let elapsed = state.elapsedMs;
			if (state.running && state.startedAt) {
				elapsed += now - state.startedAt;
			}

			panel.webview.postMessage({
				type: 'tick',
				seconds: Math.floor(elapsed / 1000)
			});
		}, 1000);
	};

	const stopUiTicker = () => {
		if (uiInterval) {
			clearInterval(uiInterval);
			uiInterval = null;
		}
	};

	startUiTicker();

	panel.webview.onDidReceiveMessage(async msg => {
		switch (msg.type) {
			case 'start':
				sessionCount++;

				panel.webview.postMessage({
					type: 'session',
					count: sessionCount
				});
				if (!state.running) {
					state.running = true;
					state.startedAt = Date.now();
					await saveState(context, state);
				}
				startUiTicker();
				break;

			case 'stop':
				if (state.running && state.startedAt) {
					state.elapsedMs += Date.now() - state.startedAt;
					state.startedAt = null;
					state.running = false;
					await saveState(context, state);
				}
				stopUiTicker();
				break;

			case 'reset':
				sessionCount = 0;
				state = {
					running: false,
					startedAt: null,
					elapsedMs: 0,
					mode: 'stopwatch',
					pomodoroPhase: null,
					pomodoroEndsAt: null
				};
				await saveState(context, state);
				panel.webview.postMessage({ type: 'tick', seconds: 0 });
				stopUiTicker();
				break;

			case 'pomodoroStart': {
				const now = Date.now();

				state.mode = 'pomodoro';
				state.pomodoroPhase = 'focus';
				state.running = true;
				state.startedAt = now;
				state.pomodoroEndsAt = now + 50 * 60 * 1000;

				await saveState(context, state);

				vscode.window.showInformationMessage(
					'Pomodoro started: 50 minutes focus'
				);


				openPomodoro(context);

				break;
			}

		}
	});

	panel.onDidDispose(() => {
		stopUiTicker();
	});
}

// 🔄 Pomodoro phase transitions (isolated + async-safe)
async function handlePomodoroPhaseTransition(
	context: vscode.ExtensionContext,
	panel: vscode.WebviewPanel,
	state: StopwatchState
) {
	const now = Date.now();

	if (state.pomodoroPhase === 'focus') {
		state.pomodoroPhase = 'break';
		state.startedAt = now;
		state.pomodoroEndsAt = now + 10 * 60 * 1000;

		panel.webview.postMessage({ type: 'phaseChange' });
		await saveState(context, state);

		vscode.window.showInformationMessage('Break started: 10 minutes');
	} else {
		state.mode = 'stopwatch';
		state.running = false;
		state.startedAt = null;
		state.pomodoroPhase = null;
		state.pomodoroEndsAt = null;

		await saveState(context, state);
		vscode.window.showInformationMessage('Pomodoro completed');
	}
}
