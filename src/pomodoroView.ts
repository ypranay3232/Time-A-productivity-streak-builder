import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let interval: NodeJS.Timeout | null = null;
let pomodoroStartedAt: number | null = null;
let sessionCount = 0;
let lastTickAt: number | null = null;

export function openPomodoro(context: vscode.ExtensionContext) {
	// 🔧 READ CONFIG AT RUNTIME
	const config = vscode.workspace.getConfiguration('timeStreakBuilder.pomodoro');
	const focusMinutes = config.get<number>('focusMinutes', 50);
	const breakMinutes = config.get<number>('breakMinutes', 10);

	let remainingSeconds = focusMinutes * 60;

	const panel = vscode.window.createWebviewPanel(
		'pomodoro',
		'Pomodoro',
		vscode.ViewColumn.Beside,
		{
			enableScripts: true,
			retainContextWhenHidden: true
		}
	);

	const htmlPath = path.join(context.extensionPath, 'media', 'pomodoro.html');
	if (!fs.existsSync(htmlPath)) {
		vscode.window.showErrorMessage('pomodoro.html not found');
		return;
	}

	panel.webview.html = fs.readFileSync(htmlPath, 'utf8');

	// Initial render
	panel.webview.postMessage({
		type: 'tick',
		seconds: remainingSeconds
	});

	panel.webview.onDidReceiveMessage(msg => {
		switch (msg.type) {
			case 'start':
				if (interval) return;

				sessionCount++;
				panel.webview.postMessage({
					type: 'session',
					count: sessionCount
				});

				pomodoroStartedAt = Date.now();
				lastTickAt = Date.now();

				// Immediate render
				panel.webview.postMessage({
					type: 'tick',
					seconds: remainingSeconds
				});

				interval = setInterval(() => {
					const now = Date.now();

					// 🔥 ADD FOCUS TIME TO PROJECT (INCREMENTAL)
					if (lastTickAt) {
						const deltaMs = now - lastTickAt;
						vscode.commands.executeCommand(
							'time-a-productivity-streak-builder.internalAddTime',
							deltaMs
						);
					}

					lastTickAt = now;
					remainingSeconds--;

					panel.webview.postMessage({
						type: 'tick',
						seconds: remainingSeconds
					});

					if (remainingSeconds <= 0) {
						stopTimer();
						lastTickAt = null;

						vscode.window.showInformationMessage(
							` Focus session complete. Take a ${breakMinutes}-minute break.`
						);

						// Do NOT auto-start break
						// User decides when to resume
					}

				}, 1000);
				break;

			case 'reset':
				stopTimer();
				remainingSeconds = focusMinutes * 60;
				pomodoroStartedAt = null;
				lastTickAt = null;

				panel.webview.postMessage({
					type: 'tick',
					seconds: remainingSeconds
				});
				break;

			case 'exit':
				stopTimer();
				sessionCount = 0;
				pomodoroStartedAt = null;
				lastTickAt = null;
				panel.dispose();
				break;
		}
	});

	panel.onDidDispose(() => stopTimer());
}

function stopTimer() {
	if (interval) {
		clearInterval(interval);
		interval = null;
	}
}
