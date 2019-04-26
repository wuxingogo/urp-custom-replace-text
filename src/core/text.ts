import * as vscode from 'vscode';
import { isNullOrUndefined } from 'util';
import * as fs from 'fs';
import replaceResources from "../../assets/replace-text.json";
import packageInfo from '../../package.json';

interface IReplaceEntry
{
	[key : string] : string;
}

export async function replaceText(replaceFilePath:string)
{
	var editor = vscode.window.activeTextEditor;
	if (!editor) { return; }

	var text = editor.document.getText(editor.selection);
	//var myExtension = vscode.extensions.getExtension(`${packageInfo.publisher}.${packageInfo.name}`);

	if (text.length <= 0) { return; }
	//if (isNullOrUndefined(extension)) { return; }

	try {
		var jsonData = JSON.parse(fs.readFileSync(replaceFilePath, 'utf8'));
		var replaces = Object.assign(jsonData, <{[key : string] : IReplaceEntry}>{});

		for (var key in replaces)
		{
			var temp = text.split(key);
			text = temp.join(replaces[key].toString());
		}

		editor.edit(builder => builder.replace(editor.selection, text));

	} catch (err) {
		vscode.window.showInformationMessage(err.message);
	}

}
