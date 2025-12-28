import * as vscode from 'vscode';
import { TimeTracker } from './tracker';
import { Storage } from './storage';
import { Rewards } from './rewards';
import { showFirePopup } from './firePopup';
import { getRandomMessage } from './messages';
import { openStopwatch } from './stopwatchView';
import { formatDuration } from './timeUtils';

let tracker: TimeTracker;
let storage: Storage;
let rewards: Rewards;
let extensionContext: vscode.ExtensionContext;

export function activate(context: vscode.ExtensionContext) {
	console.log('[Time Streak Builder] Activated');

	extensionContext = context;

	tracker = new TimeTracker();
	storage = new Storage(context);
	rewards = new Rewards(context);

	// Session boundary via focus
	vscode.window.onDidChangeWindowState(
		state => {
			if (state.focused) {
				const continued = tracker.resume();

				if (!continued) {
					// Session truly ended due to long inactivity
					const sessionTime = tracker.consumeSessionTime();
					if (sessionTime > 0) {
						const projectName =
							vscode.workspace.workspaceFolders?.[0]?.name ?? 'unknown-project';

						storage.addTime(projectName, sessionTime);
						rewards.recordActiveDay();

						const rewardData = rewards.getRewards();
						const message = getRandomMessage(extensionContext, 'default');
						const formattedTime = formatDuration(sessionTime);

						showFirePopup(
							extensionContext,
							message,
							`🔥 ${rewardData.streak}-day streak   ⭐ ${rewardData.stars}`,
							`You spent ${formattedTime} building this project`
						);
					}
				}
			} else {
				tracker.pause();
			}
		},
		null,
		context.subscriptions
	);

	// Activity tracking
	vscode.workspace.onDidChangeTextDocument(
		() => tracker.recordActivity(),
		null,
		context.subscriptions
	);

	// Live stopwatch
	const openStopwatchCmd = vscode.commands.registerCommand(
		'time-a-productivity-streak-builder.openStopwatch',
		() => openStopwatch(extensionContext)
	);

	// Project completion → star + popup
	const markComplete = vscode.commands.registerCommand(
		'time-a-productivity-streak-builder.markProjectComplete',
		() => {
			rewards.addStar();

			const projectName =
				vscode.workspace.workspaceFolders?.[0]?.name ?? 'unknown-project';

			const rewardData = rewards.getRewards();
			const message = getRandomMessage(extensionContext, 'projectComplete');
			const totalTime =
				storage.getAll()[projectName]?.totalTimeMs ?? 0;

			showFirePopup(
				extensionContext,
				message,
				`🔥 ${rewardData.streak}-day streak   ⭐ ${rewardData.stars}`,
				`You spent ${formatDuration(totalTime)} building this project`
			);

			console.log('[Project Complete]', rewardData);
		}
	);

	context.subscriptions.push(openStopwatchCmd, markComplete);
}

export function deactivate() {
	if (!tracker) return;

	tracker.stop();
	const sessionTime = tracker.consumeSessionTime();

	if (sessionTime > 0) {
		const projectName =
			vscode.workspace.workspaceFolders?.[0]?.name ?? 'unknown-project';

		storage.addTime(projectName, sessionTime);
		rewards.recordActiveDay();

		console.log('[Deactivated] Session saved');
	}
}
