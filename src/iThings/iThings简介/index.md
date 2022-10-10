# 物联网云平台ithings
## 介绍
iThings是一个基于golang开发的轻量级云原生微服务物联网平台.
## 架构
下图是 iThings 平台的整体架构:
<img src="/assets/img/things/iThings架构图.png">
## 目录
- doc:该项目的文档都放在这里
- shared:所有该项目及其他项目所公用的代码都放在这里
- src:存放了所有服务的源码

## 安装
### 依赖安装
在ithings中依赖tdengine,mysql,redis,etcd,nats,emqx
* sudo ./init.sh即会安装docker及docker-compose及第三方依赖及初始化数据库脚本(一定是root权限,不然可能会有问题)
* 然后 ./run.sh 即可运行iThings所有服务
### 服务运行
1. 进入src目录进入对应的服务
2. 修改etc目录下的配置文件将对应的依赖改为本地的ip地址
3. 直接go build即可享受

## 文档

- 开发文档: https://ithings.pages.dev/
- 用户文档: https://ithings.pages.dev/


## 贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

## 社区
- 微信: `godLei6` (需备注“来自github”)
- 官网:[https://ithings.pages.dev](https://ithings.pages.dev)

## Star
<img src="https://starchart.cc/i4de/ithings.svg">