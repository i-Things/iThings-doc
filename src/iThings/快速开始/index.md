## 环境初始化

### iThings安装

在iThings中依赖tdEngine,mysql,redis,etcd,nats,emqx

* 首先 `git clone https://github.com/i4de/ithings.git` 获取最新的iThings
* `cd ithings` 进入文件夹
* 在初始目录中提供了init.sh脚本,注意需要root权限,目前支持ubuntu,直接执行`./init.sh`即可初始化运行环境

### 后台安装

后台服务同样依赖于iThings,所以也需要先安装好iThings

* `git clone https://github.com/i4de/ithings-admin.git`
* 按照 `https://www.gin-vue-admin.com/` 的说明安装服务,注意其中npm需要换成yarn
