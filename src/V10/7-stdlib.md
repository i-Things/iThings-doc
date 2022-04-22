---
title: 7-扩展库
---
## 扩展库概述
RULEX 扩展库其实就是用 golang 实现的一系列函数，最后注入到 LUA 虚拟机沙箱里面给脚本调用的函数。本质上是 Golang 特殊函数。这些函数都在 `rulexlib` 包下面。
<img src="/assets/rulestr.png" style="width:100%;box-shadow: 10px 10px 10px grey;border-radius: 10px;"></img>

## 标准库接口
标准库其实就是个特殊函数，比如我们增加一个扩展库 LibA :
```go
func LibA(rx typex.RuleX) func(*lua.LState) int {
    return 0
}
```
## 案例展示
下面展示一个格式化时间的简单库：
```go
/*
*
* Unix 时间戳
*
 */
func TsUnix(rx typex.RuleX) func(l *lua.LState) int {
	return func(l *lua.LState) int {
		l.Push(lua.LString(fmt.Sprintf("%v", time.Now().Unix())))
		return 1
	}
}

```
加载库到 LUA 虚拟机中：
```go
rule.AddLib(e, "TsUnix", rulexlib.TsUnix(e))
```
最后在 LUA 中使用：
```lua
function(data)
	print("[rulexlib:TsUnix()] ==>", rulexlib:TsUnix())
	return true, data
end
```