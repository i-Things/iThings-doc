# 设备基于mqtt协议接入

## MQTT 接入
MQTT 协议支持通过设备证书和密钥签名两种方式接入物联网通信平台，您可根据自己的场景选择一种方式接入即可。接入参数如下所示：

| 接入认证方式 | Connect 报文参数                                                                                                                                                                                                                                                                       |
|:------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|  证书认证  | KeepAlive：保持连接的时间，取值范围为0 - 900s。若超过1.5倍 KeepAlive 时长物联网平台仍没收到客户端的数据，则平台将断开与客户端的连接。<br />ClientId：${productID}${deviceName}，产品 ID 和设备名的组合字符串。<br />UserName：${productID}${deviceName};${sdkappid};${connid};${expiry}，详情见下文中基于 MQTT 的签名认证接入指引 username 部分；<br />PassWord：密码（可赋任意值）。 |
|  密钥认证  | KeepAlive：保持连接的时间，取值范围为0-900s；<br />ClientId：${productID}${deviceName}；<br />UserName：${productID}${deviceName};${sdkappid};${connid};${expiry}，详情见下文中基于 MQTT 的签名认证接入指引 username 部分；<br />PassWord：密码，详情见下文中基于 MQTT 的签名认证接入指引 password 部分。                                         |

**说明：**<br />采用证书认证的设备接入时不会对填写的 PassWord 部分进行验证，证书认证时 PassWord 部分可填写任意值。
### 证书认证设备接入指引
物联网平台采用 TLS 加密方式来保障设备传输数据时的安全性。证书设备接入时，获取到证书设备的证书、密钥与 CA 证书文件之后，设置好 KeepAlive，ClientId，UserName，PassWord 等内容（采用腾讯云设备端 SDK 方式接入的设备无需设置，SDK 可根据设备信息自动生成）。设备向证书认证对应的 URL（连接域名及端口）上传认证文件，通过之后发送 MqttConnect 消息即可完成证书设备基于 TCP 的 MQTT 接入。
### 密钥认证设备接入指引
物联网平台支持 HMAC-SHA256，HMAC-SHA1 等方式基于设备密钥生成摘要签名。通过签名方式接入物联云平台的流程如下：<br />1. 登录iThings后台。您可在控制台创建产品、添加设备、并获取设备密钥。<br />2. 按照物联网通信约束生成 username 字段，username 字段格式如下：

```
username 字段的格式为：
${productID}${deviceName};${sdkappid};${connid};${expiry}
注意：${} 表示变量，并非特定的拼接符号。
```

其中各字段含义如下：<br />productID：产品 ID。<br />deviceName： 设备名称。<br />sdkappid：固定填12010126。<br />connid ：一个随机字符串。<br />expiry ：表示签名的有效期， 从1970年01月01日00:00:00 UTC 时间至今秒数的 UTF8 字符串。<br />3. 用 base64 对设备密钥进行解码得到原始密钥 raw_key。<br />4. 用第3步生成的 raw_key，通过 HMAC-SHA1 或者 HMAC-SHA256 算法对 username 生成一串摘要，简称 Token。<br />5. 按照物联网通信约束生成 password 字段，password 字段格式为：

```
password 字段格式为： 
${token};hmac 签名方法
其中 hmac 签名方法字段填写第三步用到的摘要算法，可选的值有 hmacsha256 和 hmacsha1。
```

作为对照，用户生成签名的 Python、Java、Nodejs、JavaScript 和 C 代码示例如下： Python 代码为：

```python
#!/usr/bin/python
# -*- coding: UTF-8 -*-
import base64
import hashlib
import hmac
import random
import string
import time
import sys
# 生成指定长度的随机字符串
def RandomConnid(length):
    return  ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(length))
# 生成接入物联网通信平台需要的各参数
def IotHmac(productID, devicename, devicePsk):
    # 1. 生成 connid 为一个随机字符串，方便后台定位问题
    connid   = RandomConnid(5)
    # 2. 生成过期时间，表示签名的过期时间,从纪元1970年1月1日 00:00:00 UTC 时间至今秒数的 UTF8 字符串
    expiry   = int(time.time()) + 60 * 60
    # 3. 生成 MQTT 的 clientid 部分, 格式为 ${productID}${devicename}
    clientid = "{}{}".format(productID, devicename)
    # 4. 生成 MQTT 的 username 部分, 格式为 ${clientid};${sdkappid};${connid};${expiry}
    username = "{};12010126;{};{}".format(clientid, connid, expiry)
    # 5. 对 username 进行签名，生成token
    secret_key = devicePsk.encode('utf-8')  # convert to bytes
    data_to_sign = username.encode('utf-8')  # convert to bytes
    secret_key = base64.b64decode(secret_key)  # this is still bytes
    token = hmac.new(secret_key, data_to_sign, digestmod=hashlib.sha256).hexdigest()
    # 6. 根据物联网通信平台规则生成 password 字段
    password = "{};{}".format(token, "hmacsha256")
    return {
        "clientid" : clientid,
        "username" : username,
        "password" : password
    }
if __name__ == '__main__':
    print(IotHmac(sys.argv[1], sys.argv[2], sys.argv[3]))
```

将上述代码保存到 IotHmac.py，执行下面的命令即可。这里 "YOUR_productID"、 "YOUR_DEVICENAME" 和"YOUR_PSK" 是填写您实际创建设备的产品 ID、设备名称和设备密钥。

```
python3 IotHmac.py "YOUR_productID" "YOUR_DEVICENAME" "YOUR_PSK"
```

Java 代码为：

```java
package com.tencent.iot.hub.device.java.core.sign;

import org.junit.Test;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.*;

import static junit.framework.TestCase.fail;
import static org.junit.Assert.assertTrue;

public class SignForMqttTest {

    @Test
    public void testMqttSign() {
        try {
            System.out.println(SignForMqttTest("YourproductID","YourDeviceName","YourPsk"));
            assertTrue(true);
        } catch (Exception e) {
            e.printStackTrace();
            fail();
        }
    }

    public static Map<String, String> SignForMqttTest(String productID, String devicename, String
                                                      devicePsk) throws Exception {
        final Base64.Decoder decoder = Base64.getDecoder();
        //1. 生成 connid 为一个随机字符串，方便后台定位问题
        String connid = HMACSHA256.getConnectId(5);
        //2. 生成过期时间，表示签名的过期时间,从纪元1970年1月1日 00:00:00 UTC 时间至今秒数的 UTF8 字符串
        Long expiry = Calendar.getInstance().getTimeInMillis()/1000 + 600;
        //3. 生成 MQTT 的 clientid 部分, 格式为 ${productID}${devicename}
        String clientid = productID+devicename;
        //4. 生成 MQTT 的 username 部分, 格式为 ${clientid};${sdkappid};${connid};${expiry}
        String username = clientid+";"+"12010126;"+connid+";"+expiry;
        //5.  对 username 进行签名，生成token、根据物联网通信平台规则生成 password 字段
        String password = HMACSHA256.getSignature(username.getBytes(), decoder.decode(devicePsk)) + ";hmacsha256";
        Map<String,String> map = new HashMap<>();
        map.put("clientid",clientid);
        map.put("username",username);
        map.put("password",password);
        return map;
    }
    public static class HMACSHA256 {
        private static final String HMAC_SHA256 = "HmacSHA256";
        /**
         * 生成签名数据
         *
         * @param data 待加密的数据
         * @param key  加密使用的key
         * @return 生成16进制编码的字符串
         */
        public static String getSignature(byte[] data, byte[] key)  {
            try {
                SecretKeySpec signingKey = new SecretKeySpec(key, HMAC_SHA256);
                Mac mac = Mac.getInstance(HMAC_SHA256);
                mac.init(signingKey);
                byte[] rawHmac = mac.doFinal(data);
                return bytesToHexString(rawHmac);
            }catch (Exception e) {
                e.printStackTrace();
            }
            return null;
        }
        /**
         * byte[]数组转换为16进制的字符串
         *
         * @param bytes 要转换的字节数组
         * @return 转换后的结果
         */
        private static String bytesToHexString(byte[] bytes) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < bytes.length; i++) {
                String hex = Integer.toHexString(0xFF & bytes[i]);
                if (hex.length() == 1) {
                    sb.append('0');
                }
                sb.append(hex);
            }
            return sb.toString();
        }


        /**
         * 获取连接ID（长度为5的数字字母随机字符串）
         */
        public static String getConnectId(int length) {
        StringBuffer connectId = new StringBuffer();
        for (int i = 0; i < length; i++) {
        int flag = (int) (Math.random() * Integer.MAX_VALUE) % 3;
        int randNum = (int) (Math.random() * Integer.MAX_VALUE);
        switch (flag) {
        case 0:
        connectId.append((char) (randNum % 26 + 'a'));
        break;
        case 1:
        connectId.append((char) (randNum % 26 + 'A'));
        break;
        case 2:
        connectId.append((char) (randNum % 10 + '0'));
        break;
        }
        }

        return connectId.toString();
        }
        }

        }
```

Nodejs 和 JavaScript 代码为：

```javascript
// 下面为node引入方式，浏览器的话，使用对应的方式引入crypto-js库
const crypto = require('crypto-js')

// 产生随机数的函数
const randomString = (len) => {
  len = len || 32;
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var maxPos = chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
// 需要产品id，设备名和设备密钥
const productID = 'YOUR_productID';
const deviceName = 'YOUR_DEVICENAME';
const devicePsk = 'YOUR_PSK';

// 1. 生成 connid 为一个随机字符串，方便后台定位问题
const connid =  randomString(5);
// 2. 生成过期时间，表示签名的过期时间,从纪元1970年1月1日 00:00:00 UTC 时间至今秒数的 UTF8 字符串
const expiry = Math.round(new Date().getTime() / 1000) + 3600 * 24;
// 3. 生成 MQTT 的 clientid 部分, 格式为 ${productID}${devicename}
const clientId = productID + deviceName;
// 4. 生成 MQTT 的 username 部分, 格式为 ${clientid};${sdkappid};${connid};${expiry}
const userName = `${clientId};12010126;${connid};${expiry}`;
//5.  对 username 进行签名，生成token、根据物联网通信平台规则生成 password 字段
const rawKey = crypto.enc.Base64.parse(devicePsk);   	// 对设备密钥进行base64解码
const token =  crypto.HmacSHA256(userName, rawKey);
const password = token.toString(crypto.enc.Hex) + ";hmacsha256";
console.log(`userName:${userName}\npassword:${password}`);
```

C 语言代码如下：<br />**说明：**<br />如果您想要了解更多关于 C 语言代码内容，详情请参见 [工程下载](https://github.com/tencentyun/qcloud_iot_mqtt_sign)。

```c
#include "limits.h"
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

#include "HAL_Platform.h"
#include "utils_base64.h"
#include "utils_hmac.h"

/* Max size of base64 encoded PSK = 64, after decode: 64/4*3 = 48*/
#define DECODE_PSK_LENGTH 48

/* MAX valid time when connect to MQTT server. 0: always valid */
/* Use this only if the device has accurate UTC time. Otherwise, set to 0 */
#define MAX_ACCESS_EXPIRE_TIMEOUT (0)

/* Max size of conn Id  */
#define MAX_CONN_ID_LEN (6)

/* IoT C-SDK APPID */
#define QCLOUD_IOT_DEVICE_SDK_APPID     "21****06"
#define QCLOUD_IOT_DEVICE_SDK_APPID_LEN (sizeof(QCLOUD_IOT_DEVICE_SDK_APPID) - 1)

static void HexDump(char *pData, uint16_t len)
{
    int i;

    for (i = 0; i < len; i++) {
        HAL_Printf("0x%02.2x ", (unsigned char)pData[i]);
    }
    HAL_Printf("\n");
}

static void get_next_conn_id(char *conn_id)
{
    int i;
    srand((unsigned)HAL_GetTimeMs());
    for (i = 0; i < MAX_CONN_ID_LEN - 1; i++) {
        int flag = rand() % 3;
        switch (flag) {
            case 0:
                conn_id[i] = (rand() % 26) + 'a';
                break;
            case 1:
                conn_id[i] = (rand() % 26) + 'A';
                break;
            case 2:
                conn_id[i] = (rand() % 10) + '0';
                break;
        }
    }

    conn_id[MAX_CONN_ID_LEN - 1] = '\0';
}

int main(int argc, char **argv)
{
    char *product_id    = NULL;
    char *device_name   = NULL;
    char *device_secret = NULL;

    char *username     = NULL;
    int   username_len = 0;
    char  conn_id[MAX_CONN_ID_LEN];

    char password[51]      = {0};
    char username_sign[41] = {0};

    char   psk_base64decode[DECODE_PSK_LENGTH];
    size_t psk_base64decode_len = 0;

    long cur_timestamp = 0;

    if (argc != 4) {
        HAL_Printf("please ./qcloud-mqtt-sign product_id device_name device_secret\r\n");
        return -1;
    }

    product_id    = argv[1];
    device_name   = argv[2];
    device_secret = argv[3];

    /* first device_secret base64 decode */
    qcloud_iot_utils_base64decode((unsigned char *)psk_base64decode, DECODE_PSK_LENGTH, &psk_base64decode_len,
                                  (unsigned char *)device_secret, strlen(device_secret));
    HAL_Printf("device_secret base64 decode:");
    HexDump(psk_base64decode, psk_base64decode_len);

    /* second create mqtt username
     * [productdevicename;appid;randomconnid;timestamp] */
    cur_timestamp = HAL_Timer_current_sec() + MAX_ACCESS_EXPIRE_TIMEOUT / 1000;
    if (cur_timestamp <= 0 || MAX_ACCESS_EXPIRE_TIMEOUT <= 0) {
        cur_timestamp = LONG_MAX;
    }

    // 20 for timestampe length & delimiter
    username_len = strlen(product_id) + strlen(device_name) + QCLOUD_IOT_DEVICE_SDK_APPID_LEN + MAX_CONN_ID_LEN + 20;
    username     = (char *)HAL_Malloc(username_len);
    if (username == NULL) {
        HAL_Printf("malloc username failed!\r\n");
        return -1;
    }

    get_next_conn_id(conn_id);
    HAL_Snprintf(username, username_len, "%s%s;%s;%s;%ld", product_id, device_name, QCLOUD_IOT_DEVICE_SDK_APPID,
                 conn_id, cur_timestamp);

    /* third use psk_base64decode hamc_sha1 calc mqtt username sign crate mqtt
     * password */
    utils_hmac_sha1(username, strlen(username), username_sign, psk_base64decode, psk_base64decode_len);
    HAL_Printf("username sign: %s\r\n", username_sign);
    HAL_Snprintf(password, 51, "%s;hmacsha1", username_sign);

    HAL_Printf("Client ID: %s%s\r\n", product_id, device_name);
    HAL_Printf("username : %s\r\n", username);
    HAL_Printf("password : %s\r\n", password);

    HAL_Free(username);

    return 0;
}
```

6. 最终将上面生成的参数填入对应的 MQTT connect 报文中。<br />7. 将 clientid 填入到 MQTT 协议的 clientid 字段。<br />8. 将 username 填入到 MQTT 的 username 字段。<br />9. 将 password 填入到 MQTT 的 password 字段，向密钥认证的域名与端口处发送 MqttConnect 信息即可接入到iThings上。
