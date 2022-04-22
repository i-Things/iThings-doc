---
title: 4-插件设计
---
## 插件概述
插件是用来扩展RULEX本身不具备的功能的，比如你可以外挂一个MQTT服务器，此时RULEX框架本来没有MQTT功能，但是经过插件加持，就可以支持MQTT设备接入。
## 编程接口
```go
type XPlugin interface {
	Init(*ini.Section) error
	Start() error
	Stop() error
	PluginMetaInfo() XPluginMetaInfo
}

type XPluginMetaInfo struct {
	Name     string `json:"name"` // 插件名称
	Version  string `json:"version"` // 插件版本
	Homepage string `json:"homepage"` // 插件主页
	HelpLink string `json:"helpLink"` // 插件帮助文档
	Author   string `json:"author"` // 插件作者
	Email    string `json:"email"` // 插件Email
	License  string `json:"license"` // 插件协议
}

```
其中 `XPluginMetaInfo` 是插件的元数据。
## 案例展示
下面这个插件是个非常简单的 `MQTT Broker`：
```go
package mqttserver

import (
	"fmt"
	"gopkg.in/ini.v1"
	"rulex/utils"

	mqttServer "github.com/mochi-co/mqtt/server"
	"github.com/mochi-co/mqtt/server/events"
	"github.com/mochi-co/mqtt/server/listeners"
	"github.com/ngaut/log"
	"rulex/typex"
)

const (
	defaultTransport string = "tcp"
)

type _serverConfig struct {
	Enable bool   `ini:"enable"`
	Host   string `ini:"host"`
	Port   int    `ini:"port"`
}
type MqttServer struct {
	Enable     bool
	Host       string
	Port       int
	mqttServer *mqttServer.Server
	clients    map[string]*events.Client
}

func NewMqttServer() typex.XPlugin {
	return &MqttServer{
		clients: map[string]*events.Client{},
	}
}

func (s *MqttServer) Init(config *ini.Section) error {
	var mainConfig _serverConfig
	if err := utils.InIMapToStruct(config, &mainConfig); err != nil {
		return err
	}
	s.Host = mainConfig.Host
	s.Port = mainConfig.Port
	return nil
}

func (s *MqttServer) Start() error {
	server := mqttServer.New()
	tcpPort := listeners.NewTCP(defaultTransport, fmt.Sprintf(":%v", s.Port))

	if err := server.AddListener(tcpPort, &listeners.Config{}); err != nil {
		return err
	}
	if err := server.Serve(); err != nil {
		return err
	}

	s.mqttServer = server
	s.mqttServer.Events.OnConnect = func(client events.Client, packet events.Packet) {
		s.clients[client.ID] = &client
		log.Infof("Client connected:%s", client.ID)
	}
	s.mqttServer.Events.OnDisconnect = func(client events.Client, err error) {
		if s.clients[client.ID] != nil {
			delete(s.clients, client.ID)
			log.Warnf("Client disconnected:%s", client.ID)
		}
	}
	log.Infof("MqttServer start at [0.0.0.0:%v] successfully", s.Port)
	return nil
}

func (s *MqttServer) Stop() error {
	if s.mqttServer != nil {
		return s.mqttServer.Close()
	} else {
		return nil
	}

}

func (s *MqttServer) PluginMetaInfo() typex.XPluginMetaInfo {
	return typex.XPluginMetaInfo{
		Name:     "Light Weight MqttServer",
		Version:  "0.0.1",
		Homepage: "www.ezlinker.cn",
		HelpLink: "www.ezlinker.cn",
		Author:   "wwhai",
		Email:    "cnwwhai@gmail.com",
		License:  "MIT",
	}
}


```