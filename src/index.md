---
home: true
heroImage: /assets/img/logo.png
heroText: 'RULEX'
tagline: 'RULEX是一个轻量级物联网边缘网关开发框架'
# notice 是网站首页的通知
# notice: RULEX V0.1.1发布啦, 新增RCP编解码支持，欢迎体验.
action:
- text: 快速上手 →
  link: /quickstart/index.html


features:
- title: 轻量级
  desc: 整套框架全部使用 Golang 开发，不依赖其他静态或者动态库，直接运行原生应用

- title: 多平台
  desc: 支持 Windows、X64Linux、ARM-Linux、MacOS、安卓等常见平台

- title: 多协议
  desc: 支持 MQTT，CoAP、HTTP、StepS7、Modbus等常见物联网以及工业协议

footerWrap:
- title: 交流社区
  item:
  - text: QQ群：608382561

- title: 技术博客
  item:
  - text: 来躺平新青年
    link: https://wwhai.github.io

- title: 联系邮箱
  item:
  - text: cnwwhai@gmail.com
---

<img src="/assets/home1.png" style="box-shadow: 20px 20px 50px grey;border-radius: 10px;"></img>

## 更新日志
### V0.1.0(2022-03-03)
1. 新增RPC编解码器
2. 新增测试用例
3. 修复内部不规范代码
4. 优化资源状态调度机制

::: info
如需关注最新版本变化，请移步：https://github.com/i4de/rulex
:::