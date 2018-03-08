var express = require('express');
var bodyParser = require('body-parser');
var db = require('./../../mysqlDB/DBServise');
const jwt = require('jsonwebtoken');
const token = require("../utils/token-jwt");
var multiparty = require('multiparty');
var data;

/**
 * 查询用户
 */
function select(req, res){

    //获取前台页面传过来的参数
    express().use(bodyParser.urlencoded);
    if (req.method == 'POST') {
        var param = req.body;
    } else {
        var param = req.query || req.params;
    }

    if (param.token) {
        try {
            var decoded = jwt.verify(param.token, 'shhhhh');
            var sql = 'SELECT * FROM day_plans WHERE uid =?';
            //执行Query
            db.queryArgs(sql, decoded.uid, function (err, result) {
                if (err) {
                    result = {
                        code: 500,
                        msg: 'Database error:' + err
                    };
                } else if (result == '') {
                    result = {
                        code: -1,
                        msg: '不存在此用户！'
                    };
                } else {
                    //刷新token时间
                    var string = JSON.stringify(result[0]);
                    var Token = token.Token_Jwt(result[0]);
                    result = JSON.parse(string);
                    result.token = Token;
                    // 把操作结果返回给前台页面
                }
                res.send(result);
            });

        } catch (err) {
            res.send({errcode: -1, errmsg: err.message});
            console.log("err:" + err);
        }
    } else {
        res.send("不存在token");
    }
}


// exports
module.exports = {
    select: select
};