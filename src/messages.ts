import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export function getRandomMessage(
	context: vscode.ExtensionContext,
	type: 'default' | 'projectComplete'
): string {
	const filePath = path.join(context.extensionPath, 'media', 'messages.json');
	const raw = fs.readFileSync(filePath, 'utf8');
	const data = JSON.parse(raw);

	const messages: string[] = data[type] || data.default;
	return messages[Math.floor(Math.random() * messages.length)];
}
