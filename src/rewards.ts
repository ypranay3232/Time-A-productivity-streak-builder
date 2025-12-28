import * as vscode from 'vscode';

export interface RewardsData {
	streak: number;
	lastActiveDate: string | null;
	stars: number;
}

export class Rewards {
	private data: RewardsData;

	constructor(private context: vscode.ExtensionContext) {
		this.data = context.globalState.get<RewardsData>('rewards', {
			streak: 0,
			lastActiveDate: null,
			stars: 0
		});
	}


	recordActiveDay() {
		const today = new Date().toISOString().split('T')[0];

		if (this.data.lastActiveDate === today) {
			return;
		}

		if (this.data.lastActiveDate) {
			const last = new Date(this.data.lastActiveDate);
			const diff =
				(new Date(today).getTime() - last.getTime()) /
				(1000 * 60 * 60 * 24);

			if (diff === 1) {
				this.data.streak += 1;
			} else {
				this.data.streak = 1;
			}
		} else {
			this.data.streak = 1;
		}

		this.data.lastActiveDate = today;
		this.save();
	}

	addStar() {
		this.data.stars += 1;
		this.save();
	}

	getRewards() {
		return this.data;
	}

	private save() {
		this.context.globalState.update('rewards', this.data);
	}

    
}
