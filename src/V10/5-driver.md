---
title: 5-驱动设计 
---
## 驱动概述
在 RULEX 里面，驱动指的是桥接外部设备的组件，比如串口，或者USB口等。

## 编程接口
```go

//
// 外挂驱动, 比如串口, PLC等, 驱动可以挂在输入或者输出资源上。
// 典型案例:
// 1. MODBUS TCP模式 ,数据输入后转JSON输出到串口屏幕上
// 2. MODBUS TCP模式外挂了很多继电器,来自云端的 PLC 控制指令先到网关, 然后网关决定推送到哪个外挂
//
type DriverDetail struct {
	Name        string `json:"name" binding:"required"`
	Type        string `json:"type" binding:"required"`
	Description string `json:"description" binding:"required"`
}
type XExternalDriver interface {
	Test() error
	Init() error
	Work() error
	State() DriverState
	SetState(DriverState)
	Read([]byte) (int, error)
	Write([]byte) (int, error)
	DriverDetail() *DriverDetail
	Stop() error
}

```

## 案例展示
下面展示一个 MODBUS RTU 模式下的串口驱动：
```go
package driver

import (
	"rulex/typex"

	"github.com/goburrow/modbus"
)

/*
*
* Modbus RTU 驱动直接用了库，所以这个驱动仅仅是为了符合模式，其实没有实际作用，或者留着以后扩展用
*
 */
type modBusRtuDriver struct {
	state      typex.DriverState
	client     modbus.Client
	In         *typex.InEnd
	RuleEngine typex.RuleX
}

func NewModBusRtuDriver(
	in *typex.InEnd,
	e typex.RuleX,
	client modbus.Client) typex.XExternalDriver {
	return &modBusRtuDriver{
		state:      typex.RUNNING,
		In:         in,
		RuleEngine: e,
		client:     client,
	}

}
func (d *modBusRtuDriver) Test() error {
	return nil
}

func (d *modBusRtuDriver) Init() error {
	return nil
}

func (d *modBusRtuDriver) Work() error {
	return nil
}

func (d *modBusRtuDriver) State() typex.DriverState {
	return d.state
}

func (d *modBusRtuDriver) SetState(s typex.DriverState) {
	d.state = s
}

func (d *modBusRtuDriver) Read(_ []byte) (int, error) {
	return 0, nil

}

func (d *modBusRtuDriver) Write(_ []byte) (int, error) {
	return 0, nil
}

func (d *modBusRtuDriver) DriverDetail() *typex.DriverDetail {
	return &typex.DriverDetail{
		Name:        "ModBus RTU Driver",
		Type:        "UART",
		Description: "ModBus RTU Driver",
	}
}

func (d *modBusRtuDriver) Stop() error {
	return nil
}

```
