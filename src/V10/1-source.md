---
title: 1-数据资源
---
## 源概念
在 RULEX 框架内，将所有的入口数据抽象为“源”，也就是Source。

## 编程接口
自定义源只需要实现 `XSource` 接口即可：
```go

//
// XSource: 终端资源, 比如实际上的 MQTT 客户端
//
type XSource interface {
	//
	// 测试资源是否可用
	//
	Test(inEndId string) bool
	//
	// 用来初始化传递资源配置
	//
	Init(inEndId string, cfg map[string]interface{}) error
	//
	// 启动资源
	//
	Start(CCTX) error
	//
	// 资源是否被启用
	//
	Enabled() bool
	//
	// 数据模型, 用来描述该资源支持的数据, 对应的是云平台的物模型
	//
	DataModels() []XDataModel
	//
	// 获取前端表单定义
	//
	Configs() *XConfig
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
	Details() *InEnd
	//
	// 不经过规则引擎处理的直达数据接口, 此处建议处理一些直接控制源相关的业务，比如状态同步，控制底层硬件驱动等
	//
	OnStreamApproached(data string) error
	//
	// 驱动接口, 通常用来和硬件交互
	//
	Driver() XExternalDriver
	//
	// 拓扑结构
	//
	Topology() []TopologyPoint
	//
	// 停止资源, 用来释放资源
	//
	Stop()
}

```

## 案例
下面我们看一个最简单的源 HTTP Server：
```go
package source

import (
	"context"
	"fmt"
	"net/http"
	"rulex/core"
	"rulex/typex"
	"rulex/utils"

	"github.com/gin-gonic/gin"
	"github.com/ngaut/log"
)

//
type httpConfig struct {
	Port       uint16             `json:"port" validate:"required" title:"端口" info:""`
	DataModels []typex.XDataModel `json:"dataModels" title:"数据模型" info:""`
}

//
type httpInEndSource struct {
	typex.XStatus
	engine *gin.Engine
}

func NewHttpInEndSource(inEndId string, e typex.RuleX) typex.XSource {
	h := httpInEndSource{}
	h.PointId = inEndId
	gin.SetMode(gin.ReleaseMode)
	h.engine = gin.New()
	h.RuleEngine = e
	return &h
}
func (*httpInEndSource) Configs() *typex.XConfig {
	return core.GenInConfig(typex.HTTP, "HTTP", httpConfig{})
}

//
func (hh *httpInEndSource) Start(cctx typex.CCTX) error {
	hh.Ctx = cctx.Ctx
	hh.CancelCTX = cctx.CancelCTX

	config := hh.RuleEngine.GetInEnd(hh.PointId).Config
	var mainConfig httpConfig
	if err := utils.BindSourceConfig(config, &mainConfig); err != nil {
		return err
	}
	hh.engine.POST("/in", func(c *gin.Context) {
		type Form struct {
			Data string
		}
		var inForm Form
		err := c.BindJSON(&inForm)
		if err != nil {
			c.JSON(500, gin.H{
				"message": err.Error(),
			})
		} else {
			hh.RuleEngine.Work(hh.RuleEngine.GetInEnd(hh.PointId), inForm.Data)
			c.JSON(200, gin.H{
				"message": "ok",
				"data":    inForm,
			})
		}
	})

	go func(ctx context.Context) {
		err := http.ListenAndServe(fmt.Sprintf(":%v", mainConfig.Port), hh.engine)
		if err != nil {
			log.Error(err)
			return
		}
	}(hh.Ctx)
	log.Info("HTTP source started on" + " [0.0.0.0]:" + fmt.Sprintf("%v", mainConfig.Port))

	return nil
}

//
func (mm *httpInEndSource) DataModels() []typex.XDataModel {
	return []typex.XDataModel{}
}

//
func (hh *httpInEndSource) Stop() {
	hh.CancelCTX()

}
func (hh *httpInEndSource) Reload() {

}
func (hh *httpInEndSource) Pause() {

}
func (hh *httpInEndSource) Status() typex.SourceState {
	return typex.UP
}

func (hh *httpInEndSource) Init(inEndId string, cfg map[string]interface{}) error {
	hh.PointId = inEndId
	return nil
}
func (hh *httpInEndSource) Test(inEndId string) bool {
	return true
}

func (hh *httpInEndSource) Enabled() bool {
	return hh.Enable
}
func (hh *httpInEndSource) Details() *typex.InEnd {
	return hh.RuleEngine.GetInEnd(hh.PointId)
}
func (m *httpInEndSource) OnStreamApproached(data string) error {
	return nil
}
func (*httpInEndSource) Driver() typex.XExternalDriver {
	return nil
}

//
// 拓扑
//
func (*httpInEndSource) Topology() []typex.TopologyPoint {
	return []typex.TopologyPoint{}
}

```
上面是一个简单的HTTP接口提供服务。