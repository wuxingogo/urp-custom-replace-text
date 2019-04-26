import * as vscode from 'vscode';
import { localeText } from './lang/localization';
import { replaceText } from './core/text';
import { open } from 'inspector';
import { execFile } from 'child_process';
import { isNullOrUndefined } from 'util';
import packageInfo from '../package.json';

export function activate(context: vscode.ExtensionContext) 
{
	const myExtension = vscode.extensions.getExtension(`${packageInfo.publisher}.${packageInfo.name}`);
	if (isNullOrUndefined(myExtension))
	{
		return;
	}

	const replaceFilePath = myExtension.extensionPath + "\\assets\\replace-text.json";

	let disposable1 = vscode.commands.registerCommand('extension.replaceText', () => 
	{
		replaceText(replaceFilePath);
	});

	let disposable2 = vscode.commands.registerCommand('extension.openConfigFile', () => 
	{
		var myExtension = vscode.extensions.getExtension(`${packageInfo.publisher}.${packageInfo.name}`);
		if (isNullOrUndefined(myExtension))
		{
			return;
		}

		vscode.workspace.openTextDocument(replaceFilePath).then(doc =>
		{
			vscode.window.showTextDocument(doc);
		});
	});

	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
}

export function deactivate() {}
