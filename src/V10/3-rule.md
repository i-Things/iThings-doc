---
title: 3-数据规则
---
## 规则概述
规则是 RULEX 的一个核心功能，即自定义数据处理逻辑和过程，在RULEX 里面我们使用 LUA 编程语言来描述规则。

## 编程接口
规则的编程接口为 `typex.Rule`：
```go
//
// 规则描述
//
type Rule struct {
	Id          string      `json:"id"`
	UUID        string      `json:"uuid"`
	Status      RuleStatus  `json:"status"`
	Name        string      `json:"name"`
	From        []string    `json:"from"`
	Actions     string      `json:"actions"`
	Success     string      `json:"success"`
	Failed      string      `json:"failed"`
	Description string      `json:"description"`
	VM          *lua.LState `json:"-"`
}

```
## 字段说明
- Id：
  Sqlite 使用的ID
- UUID
  ：用户接口ID
- Status
  ：状态
- Name
  ：名称
- From
  ：数据来源，也就是关联的资源
- Actions
  ：规则处理关键逻辑，是LUA程序
- Success
  ：执行成功后的回调
- Failed
  ：执行失败后的回调
- Description
  ：文本描述
- VM
  ：LUA沙箱虚拟机

## 案例
下面展示一个解析PLC数据的简单规则定义:
```go
NewRule(engine,
	"uuid",
	"Just a test",
	"Just a test",
	[]string{grpcInend.UUID},
	`function Success() print("[LUA Success Callback]=> OK") end`,
	`
	Actions = {
		function(data)
			local V0 = rulexlib:MB(">a:16 b:16 c:16 d:16 e:16", data, false)
			local a = rulexlib:T2J(V0['a'])
			local b = rulexlib:T2J(V0['b'])
			local c = rulexlib:T2J(V0['c'])
			local d = rulexlib:T2J(V0['d'])
			local e = rulexlib:T2J(V0['e'])
			print('a ==> ', a, ' ->', rulexlib:BS2B(a), '==> ', rulexlib:B2I64('>', rulexlib:BS2B(a)))
			print('b ==> ', b, ' ->', rulexlib:BS2B(a), '==> ', rulexlib:B2I64('>', rulexlib:BS2B(b)))
			print('c ==> ', c, ' ->', rulexlib:BS2B(a), '==> ', rulexlib:B2I64('>', rulexlib:BS2B(c)))
			print('d ==> ', d, ' ->', rulexlib:BS2B(a), '==> ', rulexlib:B2I64('>', rulexlib:BS2B(d)))
			print('e ==> ', e, ' ->', rulexlib:BS2B(a), '==> ', rulexlib:B2I64('>', rulexlib:BS2B(e)))
			return true, data
		end
	}`,
	`function Failed(error) print("[LUA Failed Callback]", error) end`)
```
