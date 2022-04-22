---
title: 2-数据目标
---
## 目标概念
当数据从某个源进来经过我们处理以后，需要流出到某个目的地，这个目的地我们称之为“目标”，即Target。

## 编程接口
自定义源只需要实现 XTarget 接口即可：
```go

//
// Stream from source and to target
//
type XTarget interface {
	//
	// 测试资源是否可用
	//
	Test(outEndId string) bool
	//
	// 用来初始化传递资源配置
	//
	Init(outEndId string, cfg map[string]interface{}) error
	//
	// 启动资源
	//
	Start(CCTX) error
	//
	// 资源是否被启用
	//
	Enabled() bool
	//
	// 重载: 比如可以在重启的时候把某些数据保存起来
	//
	Reload()
	//
	// 挂起资源, 用来做暂停资源使用
	//
	Pause()
	//
	// 获取资源状态
	//
	Status() SourceState
	//
	// 获取资源绑定的的详情
	//
	Details() *OutEnd
	//
	//
	//
	Configs() *XConfig
	//
	// 数据出口
	//
	To(data interface{}) (interface{}, error)
	//
	// 不经过规则引擎处理的直达数据
	//
	OnStreamApproached(data string) error
	//
	// 停止资源, 用来释放资源
	//
	Stop()
}

```
## 案例
下面以一个 HTTP Post 中转源作为案例：
```go
package target

import (
	"net/http"
	"rulex/core"
	"rulex/typex"
	"rulex/utils"

	"github.com/ngaut/log"
)

type httpConfig struct {
	Url     string            `json:"url"`
	Headers map[string]string `json:"headers"`
}
type HTTPTarget struct {
	typex.XStatus
	url     string
	headers map[string]string
	client  http.Client
}

func NewHTTPTarget(e typex.RuleX) typex.XTarget {
	ht := new(HTTPTarget)
	ht.RuleEngine = e
	return ht
}
func (ht *HTTPTarget) Register(outEndId string) error {
	ht.PointId = outEndId
	return nil

}
func (ht *HTTPTarget) Init(outEndId string, cfg map[string]interface{}) error {
	ht.PointId = outEndId
	return nil

}
func (ht *HTTPTarget) Start(cctx typex.CCTX) error {
	ht.Ctx = cctx.Ctx
	ht.CancelCTX = cctx.CancelCTX
	config := ht.RuleEngine.GetOutEnd(ht.PointId).Config
	var mainConfig httpConfig
	if err := utils.BindSourceConfig(config, &mainConfig); err != nil {
		return err
	}
	ht.url = mainConfig.Url
	ht.headers = mainConfig.Headers
	ht.client = http.Client{}
	log.Info("HTTPTarget started")
	return nil
}
func (ht *HTTPTarget) OnStreamApproached(data string) error {
	_, err := utils.Post(ht.client, data, ht.url, ht.headers)
	return err
}
func (ht *HTTPTarget) Test(outEndId string) bool {
	return true
}
func (ht *HTTPTarget) Enabled() bool {
	return ht.Enable
}
func (ht *HTTPTarget) Reload() {

}
func (ht *HTTPTarget) Pause() {

}
func (ht *HTTPTarget) Status() typex.SourceState {
	return typex.UP

}
func (ht *HTTPTarget) To(data interface{}) (interface{}, error) {
	r, err := utils.Post(ht.client, data, ht.url, ht.headers)
	return r, err
}

//
func (ht *HTTPTarget) Stop() {
	ht.CancelCTX()
}
func (ht *HTTPTarget) Details() *typex.OutEnd {
	return ht.RuleEngine.GetOutEnd(ht.PointId)
}

/*
*
* 配置
*
 */
func (*HTTPTarget) Configs() *typex.XConfig {
	return core.GenOutConfig(typex.HTTP_TARGET, "HTTP_TARGET", httpConfig{})
}

```