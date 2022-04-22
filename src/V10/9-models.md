---
title: 9-数据模型
---
# 数据模型

## 简介
数据模型在Rulex里其实就是单个资源能呈现的基础状态，本质上是个MAP，用户可以通过LUA脚本来读写这个MAP，从而实现感兴趣的数据及时被更新。比如新建了一个COAP资源，会不断采集客户端的数据上来，这些数据处理完以后可能会统计出某个指标，用户可以直接来更新这些值。其实就是对该资源能提供的数据的一个规范约束。例如我新建的这个 MODBUS 数据源，能给我提供 电压、电流等数据，则我的数据模型则为电压和电流这两个量的描述。可以理解为数据的元数据，类似SQL来表述表的过程。

## 编程接口
在 XSource 接口里面有这么一个函数，就是用来生成数据模型的：
```go
func DataModels() []typex.XDataModel {
	return nil
}
```
其中 XDataModel 结构如下：
```go
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

type XDataModel struct {
	Name      string      `json:"name"`      // 字段名
	Tag       string      `json:"tag"`       // 标签
	ValueType ModelType   `json:"valueType"` // 值类型
	Value     interface{} `json:"value"`     // 具体的值
}

```
## 案例展示
例如某个Modbus电表可以支持读取电流/C 和电压/V参数:
```json
[
    {
        "name":"current",
        "tag":"current",
        "valueType":"float",
        "value":5.0
    },
    {
        "name":"voltage",
        "tag":"voltage",
        "valueType":"float",
        "value":220.0
    }
]

```
对应到我们的资源回调则是:
```go
func DataModels() []typex.XDataModel {
	return []typex.XDataModel{
                {
                    Name:"voltage",
                    Tag:"voltage",
                    ValueType:"float",
                    Value:220.0
                },
                {
                    Name:"current",
                    Tag:"current",
                    ValueType:"float",
                    Value:5.0
                },
    }
}
```


## 案例
1. 简介
假设我们采集到的数据含有`a,b`两个值, 此时需要在模型里面体现出来, 下面的案例讲述了如何实现这个功能。
2. 规则
新建规则，然后在规则脚本里面可以通过调用读写模型的 `rulexlib:UpdateModel` API 来实现更新。
```lua
-- Success
function Success()
end
-- Failed
function Failed(error)
    print("Error:", error)
end

-- Actions
Actions =
    {
    function(data)
        local json = require("json")
        local tb = rulexlib:MB("<a:16 b:16", data, false)
        rulexlib:UpdateModel("a",rulexlib:B2I64(1, rulexlib:BS2B(tb["a"])))
        rulexlib:UpdateModel("b",rulexlib:B2I64(1, rulexlib:BS2B(tb["a"])))
        return true, data
    end
}

```