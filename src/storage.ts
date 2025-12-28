import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export interface ProjectData {
	totalTimeMs: number;
	lastUpdated: string;
}

export class Storage {
	private filePath: string;
	private data: Record<string, ProjectData> = {};

	constructor(context: vscode.ExtensionContext) {
		this.filePath = path.join(context.globalStorageUri.fsPath, 'tracker.json');

		if (!fs.existsSync(context.globalStorageUri.fsPath)) {
			fs.mkdirSync(context.globalStorageUri.fsPath, { recursive: true });
		}

		this.load();
	}

	private load() {
		if (fs.existsSync(this.filePath)) {
			const raw = fs.readFileSync(this.filePath, 'utf-8');
			this.data = JSON.parse(raw);
		}
	}

	save() {
		fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
	}

	addTime(projectName: string, timeMs: number) {
		if (!this.data[projectName]) {
			this.data[projectName] = {
				totalTimeMs: 0,
				lastUpdated: new Date().toISOString()
			};
		}

		this.data[projectName].totalTimeMs += timeMs;
		this.data[projectName].lastUpdated = new Date().toISOString();

		this.save();
	}

	getAll() {
		return this.data;
	}
}
