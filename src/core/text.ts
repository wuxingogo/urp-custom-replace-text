import * as vscode from 'vscode';
import { isNullOrUndefined } from 'util';
import * as fs from 'fs';
import replaceResources from "../../assets/replace-text.json";
import packageInfo from '../../package.json';

interface IReplaceEntry
{
	[key : string] : string;
}

function stringToRegex(str: string): RegExp {
	// 检查字符串是否被引号包围
	if (str.startsWith('"') && str.endsWith('"') || str.startsWith("'") && str.endsWith("'")) {
		// 使用 slice 方法去除引号
		const trimmedStr = str.slice(1, -1);
		const regex = new RegExp(trimmedStr);
		return regex;
	} else {
		// 如果字符串没有被引号包围，则直接返回原始字符串的正则表达式
		// str = str.replace(/\\\\/g,"\\");
		str = str.replace(/\//g, "");
		return new RegExp(str);
	}
}

export async function replaceText(replaceFilePath: string) {
    var editor = vscode.window.activeTextEditor;
    if (!editor) { return; }
	vscode.window.showInformationMessage('launch window');
    var text = editor.document.getText(editor.selection);
    if (text.length <= 0) { return; }

    try {
        // 读取并解析 JSON 文件
        var jsonData = JSON.parse(fs.readFileSync(replaceFilePath, 'utf8'));
        var replaces = Object.assign(jsonData, <{ [key: string]: IReplaceEntry }>{});

        // 遍历替换规则
        for (var key in replaces) {
            // 尝试将替换规则的 key 转换成正则表达式
            let regex: RegExp;

			let regex1:RegExp;
			regex1 = /(\w+) (\w+)/;
			var val = replaces[key].toString();
            if (key.startsWith("/")) {
                // 如果 key 是有效的正则表达式字符串，创建正则对象
                regex = stringToRegex(key);
				
				text = text.replace(regex, val);
            }
            else
            {
                var temp = text.split(key);
				text = temp.join(val);
            }
            
			
        }

        // 更新编辑器中的选中文本
        editor.edit(builder => builder.replace(editor.selection, text));

    } catch (err) {
        //vscode.window.showInformationMessage(`Error: ${err.message}`);
		vscode.window.showInformationMessage('Error:${err.message.toString()}');
    }
}
