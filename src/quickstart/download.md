---
title: 安装包下载
---
## 下载包
下载地址为：https://github.com/i4de/rulex/releases, 如果你是Windows，直接点击对应版本即可，如果是Linux，用wget；
```bash
wget https://github.com/i4de/rulex/releases/download/V0.1.0/rulex-x64linux-V0.1.0.zip
```
## 运行
将压缩包解压，然后找到对应的二进制文件:

- Linux:
    ```bash
    rulex run -db=main.db -config=conf/rulex.ini
    ```

- Windows:
    ```bash
    rulex run -db main.db -config conf/rulex.ini
    ```

::: danger
注意：Windows下路径不要加 `=`，不然会识别失败。
:::

## 参数说明
- db：RULEX的配置数据保存路径，本质上是个Sqlite3的数据库文件;
- config：RULEX主配置，参考 `conf/rulex.ini`.