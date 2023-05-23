# 设备密码生成

<div class="content">
    <h3>请输入设备信息：</h3>
    <div>
      <span for="">从设备详情json导入:</span>
      <input type="text" id="deviceJson" name="设备一键复制json" v-model="deviceJson"></input>
      <button type="text" v-on:click="onImportJson()">导入设备信息</button>
    </div>
    <div>
        <span for="">产品ID:</span>
        <input type="text" id="productid" name="productid" v-model="productid"></input>
    </div>
    <div>
        <span for="">设备名:</span>
        <input type="text" id="devicename" name="devicename" v-model="devicename"></input>
    </div>
    <div>
        <span for="">设备秘钥:</span>
        <input type="text" id="devicesecret" name="devicesecret" v-model="devicesecret"></input>
    </div>
    <div>
        <span for="">Hmac签名算法:</span>
        <select id="signmethod" name="signmethod" v-model="signmethod">
            <option value="HMAC-SHA1">HMAC-SHA1</option>
            <option value="HMAC-SHA256" selected>HMAC-SHA256</option>
        </select>
    </div>
    <button id="submit" name="submit" v-on:click="onSign()">生成</button>
    <br />
    <h3>结果：</h3>
    <div>
        <span for="">客户端id:</span>
        <input type="text" id="calculatedclientid" name="calculatedclientid" v-model="calculatedclientid"/>
    </div>
    <div>
        <span for="">账号:</span>
        <input type="text" id="calculatedusername" name="calculatedusername" v-model="calculatedusername"/>
    </div>
    <div>
        <span for="">密码:</span>
        <input type="text" id="calculatedpassword" name="calculatedpassword" v-model="calculatedpassword"/>
    </div>
</div>
  
<script type="module">
import CryptoJS from "../../.vuepress/public/assets/js/crypto-js.min.js";
export default {
    data() {
        return {
            deviceJson: "",
            productid: "",
            devicename: "",
            devicesecret: "",
            signmethod: "HMAC-SHA256",
            calculatedusername: "",
            calculatedpassword: "",
            calculatedclientid:"",
        }
    },
    mounted () {
    },
    methods:  {
        onImportJson(){
          if (this.deviceJson == undefined || this.deviceJson.length == 0) {
            return
          }
          let ret = JSON.parse(this.deviceJson);
          this.productid = ret['产品ID'];
          this.devicename = ret['设备名称'];
          this.devicesecret = ret['密钥'];
        },
        onSign(){
            if (this.productid === '' || this.devicename === '' || this.devicesecret === '' || this.signmethod === '') {
                alert("必填项不能为空");
                return;
            }
            let connid = this.randomString(5);
            let expiry = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 127;
            let clientid = this.productid + this.devicename;
            let username = clientid + ';' + '12010126' + ';' + connid + ';' + expiry;
            let token = '';
            let password = '';
            if (this.signmethod === 'HMAC-SHA1') {
                token = CryptoJS.HmacSHA1(username, CryptoJS.enc.Base64.parse(this.devicesecret));
                password = token + ';' + 'hmacsha1'
            } else {
                token = CryptoJS.HmacSHA256(username, CryptoJS.enc.Base64.parse(this.devicesecret));
                password = token + ';' + 'hmacsha256'
            }
            this.calculatedusername = username;
            this.calculatedpassword = password;
            this.calculatedclientid = clientid;
        },
        randomString(len, charSet) {
            charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let randomString = '';
            let randomPoz = '';
            for (var i = 0; i < len; i++) {
                randomPoz = Math.floor(Math.random() * charSet.length);
                randomString += charSet.substring(randomPoz, randomPoz + 1);
            }
            return randomString;
        }
    }

}
</script>

<style scoped>
.content {
    margin: 30px 0 0 0px;
}
.content div {
    margin: 20px 0;
}
h3 {
    margin-bottom: 30px;
}
span {
    width: 150px;
    text-align: right;
    display: inline-block;
    margin-right: 10px;
}
input,
select {
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 12px;
    border: 1px solid #ddd;
    border-radius: 0;
    color: #444;
    transition: .2s ease-in-out;
    transition-property: color, background-color, border;
    width: 420px;
}
option {
    background: #A6E1EC;
}
input:hover,
input:focus,
select:hover,
select:focus {
    border: #006eff 1px solid;
    outline: none;
}
button {
    margin-left: 225px;
    height: 36px;
    padding: 0 58px;
    background-color: #006eff;
    color: #fff;
    border: 1px solid #006eff;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    outline: 0 none;
    box-sizing: border-box;
    text-decoration: none;
    font-size: 12px;
    vertical-align: middle;
    white-space: nowrap;
}
</style>
