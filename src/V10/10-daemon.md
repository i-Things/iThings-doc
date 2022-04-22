---
title: 10-守护进程
---
## 章节概述
这里介绍一下如何把基于 RULEX 框架实现的网关程序作为守护进程来运行，目前守护进程工具有很多种，比如 python 实现的 supervisor，还有 Linux 自己的 Systemd 等。在这里我简单给出使用 Systemd 来作为守护进程的 Demo。
## 创建脚本
首先在这个路径下新建一个服务脚本:
```bash
/usr/lib/systemd/system/rulex.service
```
## 脚本内容
```ini
[Unit]
Description=RULEX Engine
[Service]
User=root
WorkingDirectory=/usr/local/rulex/
TimeoutStartSec=5
ExecStart=/usr/local/rulex/rulex run -config=/usr/local/rulex/rulex.ini
ExecStop=echo "RULEX stop."
[Install]
WantedBy=multi-user.target
```
## Service管理
- 启动
    ```bash
    sudo systemctl start rulex
    ```
- 停止
    ```bash
    sudo systemctl stop rulex
    ```
- 查看
    ```bash
    sudo systemctl status rulex
    ```
##  扩展
其实有很多方法可实现进程监督者，这里就不一一列举了，有兴趣的朋友可以自己试试其他的，完善一下这里的文档。

## 参考文档
- https://wizardforcel.gitbooks.io/vbird-linux-basic-4e/content/150.html
- http://supervisord.org