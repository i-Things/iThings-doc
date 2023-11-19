# NTP时间同步

## 简介

在物联网领域中,NTP时间同步的主要目的是确保物联网系统中的各个设备具有高度准确和一致的时间。它旨在解决分布式系统中的时间同步问题，因为不同设备的时钟可能会由于内部时钟误差、网络延迟、时钟漂移等原因而产生差异。NTP通过提供精确的时间参考源，使得网络中的设备可以校准自己的时钟，以保持统一的时间标准。



## 时钟校准及纠正

NTP使用算法来估算网络延迟和时钟漂移，并调整设备的时钟以与参考时间源同步。它通过测量网络延迟和时钟漂移来计算校正因子，然后应用这些因子来调整本地时钟。

### 校准时间公式推导

deviceSendTime标记为t1，t2、t3、t4类似,如下:


deviceSendTime(t1) ->  serverRecvTime(t2)


deviceRecvTime(t4) <-  serverSendTime (t3)


消息链路上的延迟 delay = [（t4-t1）- (t3-t2)] / 2 


设备端使用如下公式校准时间：

```
设备校准后时间 = t4 + offset
              = t3 + delay
              = (t4 + t3 + t2 - t1)/2 
              = (deviceRecvTime + serverSendTime + serverRecvTime - deviceSendTime)/2
```





## 消息格式

**设备NTP时间同步上行请求Topic: $ext/up/ntp/{ProductID}/{DeviceName}**

```json
{
  "msgToken":"xxxxx",
  "method": "getNtp",
  "timestamp": 1571724098000

}
```


## 云端NTP时间同步下行响应

**云端NTP时间同步下行响应Topic: $ext/down/ntp/{ProductID}/{DeviceName}**

```json
{
	"method": "getNtpReply",
	"msgToken": "xxxxx",
	"timestamp": 1687764280156,
	"code": 200,
	"msg": "成功",
	"data": {
		"deviceSendTime": 1571724098000,
		"serverRecvTime": 1687764280142
	}
}
```
