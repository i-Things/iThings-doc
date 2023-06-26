# NTP时间同步



## 设备NTP时间同步上行请求


**设备NTP时间同步上行请求Topic: $ext/up/ntp/{ProductID}/{DeviceName}**

```json
{
  "clientToken":"xxxxx",
  "method": "getNtp",
  "timestamp": 1571724098000

}
```


## 云端NTP时间同步下行响应

**云端NTP时间同步下行响应Topic: $ext/down/ntp/{ProductID}/{DeviceName}**

```json
{
	"method": "getNtpReply",
	"clientToken": "xxxxx",
	"timestamp": 1687764280156,
	"code": 200,
	"status": "成功",
	"data": {
		"deviceSendTime": 1571724098000,
		"serverRecvTime": 1687764280142
	}
}
```
