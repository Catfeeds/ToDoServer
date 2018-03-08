//发送验证码的工具类
/*
 * //---------------------------------sendMail------------------
 * */
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('./../../mysqlDB/database');

smtpTransport = nodemailer.createTransport(smtpTransport({
    service: config.email.service,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
}));
//---------------------------------sendPhone------------------
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
/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
module.exports = {

    /**
     * 发送邮箱验证码
     * @param {String} recipient 收件人
     * @param {String} subject 发送的主题
     * @param {String} html 发送的html内容
     */
    sendMail: function (req, res, recipient, subject, html) {
        smtpTransport.sendMail({
            from: config.email.user,
            to: recipient,
            subject: subject,
            html: html

        }, function (error, response) {
            if (error) {
                res.send({
                    errcode: -1,
                    errmsg: '邮箱不存在或网络错误！'
                })
            } else {
                res.send({
                    errcode: 1,
                    errmsg: 'success'
                });
            }

        });
    },
    /**
     * 发送手机验证码
     * @param {String} phone 收件人号码
     * @param {String} code 验证码
     * @param {String} time 过期时间
     */
    sendPhone: function (request, response, phone, code, time) {

        var postData = JSON.stringify({
            "to": phone,
            "appId": $appid,
            "templateId": templateId,
            "datas": [code, time]
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
                if (JSON.parse(chunk).statusCode == '000000') {
                    console.log(chunk);
                    response.send({
                        errcode: 1,
                        errmsg: 'success'
                    });
                } else {
                    console.log(chunk);
                    response.send({
                        errcode: 0,
                        errmsg: JSON.parse(chunk).statusMsg
                    });
                }

            });
        });
        req.on('error', function (err) {
            response.send({
                errcode: -1,
                errmsg: err
            });
        });
        req.write(postData);
        req.end();
    }
}