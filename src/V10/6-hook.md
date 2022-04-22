---
title: 6-钩子设计
---
## 钩子概述
钩子在 RULEX 里面扮演的角色是扩展功能，前面说了我们的业务逻辑是 LUA 脚本实现的，但是当你觉得LUA性能太拉跨的时候，可以自己用 Golang 写钩子来替代 LUA，提升运行效率。**不过这个特性一般是二次开发或者扩展的时候采用，绝大部分情况下，LUA 脚本都足矣应付你们的常见业务**。

## 编程接口
钩子的编程接口应该是最简单的，只有3个函数：
```go
type XHook interface {
	Work(data string) error
	Error(error)
	Name() string
}
```
### 函数说明
- Work: 钩子处理任务的函数，一般这里你用来实现你的工作负载
- Error: 出错以后执行该回调
- Name: 钩子的名称

## 案例展示
下面是个打印数据的简单Hook：
```go
package test

import "log"

type demoHook struct {
}

func (demo *demoHook) Work(data string) error {
	log.Println(data)
	return nil
}

func (demo *demoHook) Error(err error) {
	log.Println(err.Error())
}

func (demo *demoHook) Name() string {
	return "Demo Hook"
}

```