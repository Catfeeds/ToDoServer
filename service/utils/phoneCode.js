var querystring = require('querystring');
//发送 http Post 请求
const http = require('https');
const common = require("../../libs/common");
const sd = require("silly-datetime");
const $sid = '8a48b5514c2fd22f014c418a95750b4a';
const $auth_token = 'c0ac74ce45b74965a7ce32a8f00aa219';
const $appid = '8a216da858f629740158f6a52d9f007d';
const $app_token = '70e07ba75c3eec7f2941a3e345efd1ff';
const templateId = '159345';
const $timestamp = sd.format(new Date(), 'YYYYMMDDHHmmss');
var $sig = common.md5($sid + $auth_token + $timestamp).toUpperCase();
const $url = "https://app.cloopen.com:8883/2013-12-26/Accounts/" + $sid + "/SMS/TemplateSMS?sig=" + $sig;
var postData = JSON.stringify({
    "to": "15121733132",
    "appId": $appid,
    "templateId": templateId,
    "datas": ["123456", "10分钟"]
});
var options = {
    hostname: 'app.cloopen.com',
    port: 8883,
    path: '/2013-12-26/Accounts/' + $sid + '/SMS/TemplateSMS?sig=' + $sig,
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': new Buffer($sid + ':' + $timestamp).toString('base64')
    }
}
var req = http.request(options, function (res) {
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});
req.on('error', function (err) {
    console.error(err);
});
req.write(postData);
req.end();