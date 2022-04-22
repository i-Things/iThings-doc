---
title: 11-调试工具
---
## 概述
在开发过程中，大家可能需要打断点调试，每个人都有不同的工具，本人使用的是Vscode，因此分享一下Vscode的断点调试功能。

## 配置
<img src="/assets/debug/1.png" style="width:100%;height:50%;box-shadow: 20px 20px 50px grey;border-radius: 10px;"></img>

在项目根目录下新建`.vscode`目录，然后新建 `launch.json`,内容如下：
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug Rulex",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${workspaceFolder}/main.go",
            "args": [
                "run","-config=conf/rulex.ini"
            ]
        }
    ]
}
```
## 调试
选择菜单栏里面的调试按钮即可：

<img src="/assets/debug/2.png" style="width:100%;height:50%;box-shadow: 20px 20px 50px grey;border-radius: 10px;"></img>
