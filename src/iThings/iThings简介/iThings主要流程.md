# iThings主要流程
## 设备及ddsvr登录流程
  <img src="/assets/img/things/设备登录流程.png">

* 权限认证参考[emq官网](https://docs.emqx.com/zh/enterprise/v4.4/modules/http_authentication.html#superuser-请求)

## 设备消息上送流程
  <img src="/assets/img/things/设备消息上报流程.png">

* 共享订阅参考[emq官网](https://docs.emqx.com/zh/enterprise/v4.4/advanced/shared-subscriptions.html#带群组的共享订阅)
* 登录登出订阅参考[emq官网](https://docs.emqx.com/zh/enterprise/v4.4/advanced/system-topic.html#客户端上下线事件)