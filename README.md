# urp-replace-text README

"urp-replace-text" is a replace text tool.

## Features

"urp-replace-text" is a text replacement tool for Unity's built-in shaders. It allows you to use regular expressions to replace text within selected URP shader code.

**Demo**: Assume that the configuration file is as follows:

```json
{
    "/sampler2D (\\w+)/" : "TEXTURE2D($1); SAMPLER(sampler$1)",
}
```

It becomes like this：

```txt
fixed3 Mask = tex2D( _Control, i.uv[3].xy );
```
↓
```txt
half3 Mask = SAMPLE_TEXTURE2D( _Control, sampler _Control, i.uv[3].xy );
```

## Shortcuts

```
1. replace text key : ctrl + Alt + R
2. open json file Key : Shift + Alt + O
```

## Known Issues

Please post and view issues on [GitHub][issues]

[issues]: https://github.com/wuxingogo/urp-custom-replace-text/issues "Post issues"
