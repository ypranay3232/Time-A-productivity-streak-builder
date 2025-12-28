import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function showFirePopup(
	context: vscode.ExtensionContext,
	message: string,
	meta: string,
	durationText: string
) {
	const panel = vscode.window.createWebviewPanel(
		'fireReward',
		'🔥 Time Streak Builder',
		vscode.ViewColumn.Active,
		{
			enableScripts: true,
			localResourceRoots: [
				vscode.Uri.file(path.join(context.extensionPath, 'media'))
			]
		}
	);

	const htmlPath = path.join(context.extensionPath, 'media', 'reward.html');
	let html = fs.readFileSync(htmlPath, 'utf8');

	const fireUri = panel.webview.asWebviewUri(
		vscode.Uri.file(path.join(context.extensionPath, 'media', 'fire.gif'))
	);

	html = html.replace('{{DURATION}}', durationText);
	html = html.replace('{{MESSAGE}}', message);
	html = html.replace('{{META}}', meta);
	html = html.replace('fire.gif', fireUri.toString());

	panel.webview.html = html;

	setTimeout(() => panel.dispose(), 4000);
}
