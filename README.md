# custom-replace-text README

"custom-replace-text" is a replace text tool.

## Features

"custom-replace-text" is a replace text tool which allows you use json file when replace selection text.

**Demo**: Assume that the configuration file is as follows:

```json
{
    "(": "%28",
    ")": "%29",
    "before": "after"
}
```

It becomes like this：

```txt
(before text)
```
↓
```txt
%28after text%29
```

## Shortcuts

```
1. replace text key : ctrl + Alt + R
2. open json file Key : Shift + Alt + O
```

## Known Issues

Please post and view issues on [GitHub][issues]

[issues]: https://github.com/sh1ch/vscode-custom-replace-text/issues "Post issues"
