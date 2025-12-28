import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let stopwatchSeconds = 0;
let stopwatchRunning = false;
let interval: NodeJS.Timeout | null = null;

export function openStopwatch(context: vscode.ExtensionContext) {
	const panel = vscode.window.createWebviewPanel(
		'liveStopwatch',
		'⏱️ Time Streak Builder',
		vscode.ViewColumn.Active,
		{
			enableScripts: true,
			retainContextWhenHidden: true // 🔥 THIS IS THE FIX
		}
	);


	const htmlPath = path.join(context.extensionPath, 'media', 'stopwatch.html');
	panel.webview.html = fs.readFileSync(htmlPath, 'utf8');

	panel.webview.onDidReceiveMessage(msg => {
		switch (msg.type) {
			case 'start':
				if (!interval) {
					stopwatchRunning = true;
					interval = setInterval(() => {
						stopwatchSeconds++;
						panel.webview.postMessage({
							type: 'tick',
							seconds: stopwatchSeconds
						});
					}, 1000);
				}
				break;

			case 'stop':
				if (interval) {
					clearInterval(interval);
					interval = null;
					stopwatchRunning = false;
				}
				break;

			case 'reset':
				stopwatchSeconds = 0;
				panel.webview.postMessage({
					type: 'tick',
					seconds: stopwatchSeconds
				});
				break;
		}
	});

}
