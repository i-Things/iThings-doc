---
title: 手动编译
---
# 项目构建
假设你已经安装好了本地系统的 go 编译器，我们直接进行源码编译阶段，如果你的 shell 提示你找不到命令 `go`，此时就需要去安装 go 编译器了。
## RULEX
1. Linux
```
git clone https://github.com/i4de/rulex
cd rulex
make xx
```
2. Windows
```
git clone https://github.com/i4de/rulex
cd rulex
go build
```

或者直接 `go build` 构建.

## 前端
前端是NPM项目, clone代码以后执行：
```sh
git clone https://github.com/i4de/rulex-dashboard
cd rulex-dashboard
npm install
npm build:prod
```