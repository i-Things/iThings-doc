# OTA升级说明  
## 创建升级包
时序图
> <img src="/assets/云端开发/ota/创建升级包.png"> 
productID: 26wrGK4KbrW

接口：/api/v1/system/common/upload-url/create```json
{
    "business": "productManage",
    "scene": "ota",
    "filePath": "26wrGK4KbrW/xx.zip",
    "rename": true
}
```
返回 filePath和uploadUri```json
{
    "code": 200,
    "msg": "success",
    "data": {
        "filePath": "productManage/ota/43be16c4-7c8c-849c-d608-1e613d4e7193.zip",
        "uploadUri": "/api/v1/oss/ithings-temporary/productManage/ota/43be16c4-7c8c-849c-d608-1e613d4e7193.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20230616%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230616T072114Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=e6da451fa96079613e3b128107669ecf9d7bbac644f8e13ffe0cd299af0f60ee"
    }
}
```
使用PUT方式上传附件到uploadUri

测试以上步骤生成两个filePath:
  productManage/ota/9fe1161e-27cb-9f08-78ff-f9706572d066.zip
  productManage/ota/43be16c4-7c8c-849c-d608-1e613d4e7193.zip
```json
{
    "name": "ota测试",
    "productID": "26wrGK4KbrW",
    "version": "1.0.0",
    "isDiff": 1,  //是否差分包,1:整包,2:差分 当前只实现了整包
    "signMethod": "md5", //固定为md5
    "desc": "ota测试",
    "extData": "",
    "files": [
        {
            "filePath": "productManage/ota/9fe1161e-27cb-9f08-78ff-f9706572d066.zip",
            "name": "xx2.zip"
        },
        {
            "filePath": "productManage/ota/43be16c4-7c8c-849c-d608-1e613d4e7193.zip",
            "name": "xx.zip"
        }
    ]
}
```
创建升级包完成


## 创建升级任务
/api/v1/things/ota/task/create
```json
{
    "firmwareID": 1,
    "type": 1, //1全部设备2定向升级
    "upgradeType": 1, //1静态升级2动态升级
    "deviceList": "",
    "versionList": ""
}
```

## 设备端升级
正常流程
> <img src="/assets/云端开发/ota/设备端升级.png"> 
后台提供主动重试升级功能
重试升级接口 /api/v1/things/ota/task/device-retry```json
{
    "id": 1 //上一次失败的记录的id
}
```
重试接口会主动触发 下行topic :$ota/down/upgrade/${productID}/${deviceName}，下发消息如下：
```json
{
    "method": "reportInfoReply",
    "clientToken": "PPXLSKBUPZ-444",
    "timestamp": 1687315938340,
    "code": 200,
    "status": "成功",
    "data": {
        "files": [
            {
                "name": "xx.zip",
                "signature": "a111bb893cbd81d5b2b08e0c079c6be1",
                "size": 16600,
                "url": "/api/v1/oss/ithings-private/productManage/ota/26wrGK4KbrW.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20230621%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230621T025209Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=67fa96c8dbae69af038923c2710cf928c371e938fb9548264e86fe148555c809"
            },
            {
                "name": "xx2.zip",
                "signature": "a111bb893cbd81d5b2b08e0c079c6be1",
                "size": 16600,
                "url": "/api/v1/oss/ithings-private/productManage/ota/26wrGK4KbrW.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=root%2F20230621%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230621T025217Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=07e7e72e39a1f3e208ef113e577b1ecbb9ede261debd20f46620ce175748f00c"
            }
        ],
        "id": 1,
        "isDiff": 1,
        "signMethod": "md5",
        "version": "1.0.0"
    }
}
```
