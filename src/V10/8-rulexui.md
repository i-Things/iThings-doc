---
title: 8-UI渲染
---
## UI概述
我们每个资源都有一些配置，比如MQTT，会有用户名密码，主机IP和端口等，而我们创建这些资源需要在前端界面填一些字段表单，最简单的做法就是每个资源做一个界面。但是随之而来的问题是资源很多，但是貌似只有配置不一样，我们何不用一个渲染规则来生成界面，而不是每个资源都让前端来实现？于是就有了这个设计。
<img src="/assets/rulexui.png" style="width:100%;height:50%;box-shadow: 20px 20px 50px grey;border-radius: 10px;"></img>

实际上技术很简单，就是个很普通的表单生成器，但是解决了前端重复造轮子的问题，还是挺好玩的。

## 编程接口
如果你认真看了之前的文档就会发现在第一节关于资源的那里，有个 XSource 接口，接口里面好像有这么个函数：
```go
Configs() *XConfig
```
这个函数就是用来描述资源 UI 界面的回调函数。我们来看看 XConfig 是什么结构的：
```go
package typex

//
// Rule type is for property store,
// XSource implements struct type is actually worker
//
type ModelType int

// 'T' means Type
const (
	T_INT32  ModelType = iota // int32
	T_FLOAT                   // float
	T_DOUBLE                  // double
	T_TEXT                    // pure text
	T_BOOL                    // boolean
	T_JSON                    // json
	T_BIN                     // byte
)

/*
* 数据模型, 例如某个Modbus电表可以支持读取电流/C 和电压/V参数:
*[
*    {
*        "name":"volgate",
*        "tag":"volgate",
*        "valueType":"float",
*        "value":220
*    }
*]
*
 */
type XDataModel struct {
	Name      string      `json:"name"`      // 字段名
	Tag       string      `json:"tag"`       // 标签
	ValueType ModelType   `json:"valueType"` // 值类型
	Value     interface{} `json:"value"`     // 具体的值
}

//
//
// 创建资源的时候需要一个通用配置类
// XConfig 可认为是接收参数的Form
// 前端可以拿来渲染界面(from v0.0.2)
//
//

type XConfig struct {
	Type    string        `json:"type"`    // 类型
	HelpTip string        `json:"helpTip"` // 关于这个配置的简介和帮助信息
	Views   []interface{} `json:"view"`    // 枚举，一般用来实现Select
}

```
XConfig 实际上就是我们的UI描述。上面这一堆代码看起来很费劲，我们直接来继续上个Demo。

## 案例
这个案例展示如何渲染一个前端界面，我们用一个 HTTP Server 来演示：
首先我们自定义我们的配置，在我们演示的 HTTP Server 里面，仅仅有 Port 一个参数：
```go
type httpConfig struct {
	Port       uint16  `json:"port" validate:"required" title:"端口" info:"端口"`
}

```

也许你发现结构体 Tag 列表有一大堆东西，没错，它们就是关键，最后其实是用反射原理，把 Tag 里面的东西拿出来渲染成 UI 界面的描述 JSON。
其中这些 Tag 被解析出来后的结构体如下：
```go
type view struct {
	Order       int         `json:"order"`       // 界面顺序
	Type        viewType    `json:"type"`        // 组件类型
	Name        string      `json:"name"`        // 表单字段名
	Info        string      `json:"info"`        // 表单提示
	Label       string      `json:"label"`       // 界面显示标签
	Value       interface{} `json:"value"`       // 字段的值
	Required    bool        `json:"required"`    // 是否必填
	Hidden      bool        `json:"hidden"`      // 是否隐藏
	Placeholder string      `json:"placeholder"` // 占位文本
}
```

再次列一下这些 Tag 的字段含义
- Order：         界面顺序
- Type：          组件类型
- Name：          表单字段名
- Info：          表单提示
- Label：         界面显示标签
- Value：         字段的值
- Required：      是否必填
- Hidden：        是否隐藏
- Placeholder：   占位文本