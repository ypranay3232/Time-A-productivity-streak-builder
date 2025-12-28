import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function openStopwatch(context: vscode.ExtensionContext) {
	const panel = vscode.window.createWebviewPanel(
		'liveStopwatch',
		'⏱️ Time Streak Builder',
		vscode.ViewColumn.Active,
		{ enableScripts: true }
	);

	const htmlPath = path.join(context.extensionPath, 'media', 'stopwatch.html');
	panel.webview.html = fs.readFileSync(htmlPath, 'utf8');

	panel.webview.onDidReceiveMessage(msg => {
		if (msg.type === 'notify') {
			vscode.window.showInformationMessage(msg.message);
		}
	});
}
