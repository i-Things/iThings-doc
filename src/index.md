---
home: true
heroImage: /assets/img/logo/Group.png
heroText: 'iThings'
tagline: 'iThings是一个基于golang开发的轻量级云原生微服务物联网平台.'
# notice 是网站首页的通知
# notice: IThings V0.0.1发布啦, 完成新版第三方组件切换.
action:
- text: 快速上手 →
  link: /iThings/iThings简介/iThings简介.html


features:
- title: 易部署 
  desc: 一键安装所有依赖,一键运行iThings
- title: 云原生易拓展
  desc: 一套代码同时支持k8s,docker,微服务及单体模式部署,便于业务从单体到微服务的切换,可以通过http,grpc,甚至直接将iThings作为包集成进自己系统
- title: 高性能
  desc: 使用golang编写,选用高性能组件(emqx,nats,tdengine),基于gozero微服务框架高性能的同时保证服务的稳定性

footerWrap:
- title: 交流社区
  item:
  - text: 加微信拉群：godLei6
- title: 联系邮箱
  item:
  - text: 603785348@qq.com
---

<img src="/assets/img/things/iThings架构图.png" style="box-shadow: 20px 20px 50px grey;border-radius: 10px;"></img>

## 更新日志
### V0.0.1(2022-04-27)
1. 完成最新版本切换
### V0.1.0(2022-10-24)
1. 拥有独立的管理后台
2. 支持单体模式
3. 接口规范化
### V0.2.0(2022-11-24)
1. 新增网关子设备
2. 新增产品远程配置
3. 物模型前端完善
4. bug修复
### V0.3.0(2023-02-06)
1. 新增首页大屏统计
2. 前端升级到最新版本umi:4.x react:18.x ant:5.0 
3. 新增设备地图
4. 产品支持tag
5.  <a style="color:black;" href="/iThings/高级/消息推送.html">支持开放接口,支持basic auth,及实时消息推送</a>
6. <a style="color:black;" href="https://github.com/i4de/iThings-demo">新增二开案例</a> 

### V0.3.0(2023-03-02)
1. 新增操作日志,登录日志及接口记录 by @oliver-xie666  @lbs0019873800lbs 
2. 前端界面优化 by @Huhui-coder @oliver-xie666 
3. [支持emqx5.0](https://github.com/i4de/ithings/pull/167) by@cooclsee
4. [新增docker-compose一键部署](https://ithings.pages.dev/iThings/%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B/%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B.html)by @suixinio
5. 修复若干bug 

## 贡献者
感谢所有已经做出贡献的人!
### 后端
<a href="https://github.com/i4de/iThings/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=i4de/iThings" />
</a>

### 前端
<a href="https://github.com/i4de/iThings-admin-react/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=i4de/iThings-admin-react" />
</a>

## 社区
- 微信(加我拉微信群): `godLei6` (需备注“来自github”)
- QQ群(需备注“来自github”): <a href="https://jq.qq.com/?_wv=1027&k=1J4ZL7mn">776725046</a>
- 时刻招募相信分布式办公的你
- 微信二维码:
- <img src="/assets/img/things/微信二维码2.jpg">

## 收藏
<img src="https://starchart.cc/i4de/ithings.svg">

::: info
如需关注最新版本变化，请移步：https://github.com/i4de/ithings
:::
