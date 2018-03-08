const userService = require('../service/userService');
const selectUser = require('../service/userService');
const fs = require('fs');
const json = "./service/conf/ServiceConfig.json";
const Sql = JSON.parse(fs.readFileSync(json));
const token = require("../service/utils/token-jwt");
const is = require("../service/utils/is");
const vcode = require('../service/utils/vcodeUtils');
/*
 *登录model
 */
function loginModel(req, res) {
    // 获取前台页面传过来的参数
    if (req.method == 'POST') {
        var param = req.body;
    } else {
        var param = req.query || req.params;
    }
    if (is.isEmail_Phone(param.email_phone) == 'phone') {
        var sql = Sql.SQLCommands.sql_loginP;
        var sqlu = Sql.SQLCommands.sql_selectP;
    } else if (is.isEmail_Phone(param.email_phone) == 'email') {
        var sql = Sql.SQLCommands.sql_loginE;
        var sqlu = Sql.SQLCommands.sql_selectE;
    } else {
        res.send({errcode: -1, errmsg: "手机号或邮箱格式不正确！"});
        return;
    }
    selectUser.selectUserService(sqlu, param.email_phone, function (err, result) {
        if (result[0] == null) {
            result = {
                errcode: 0,
                errmsg: '用户未注册'
            };
            res.send(result);
        } else {
            userService.loginService(sql, param, function (err, result) {
                if (err) {
                    result = {
                        errcode: 500,
                        msg: 'Database error:' + err
                    };
                } else if (result == '') {
                    result = {
                        errcode: 0,
                        errmsg: '用户名或密码错误',
                    };
                    res.send(result);
                    return;
                }
                if (token) {
                    var strToken = token.Token_Jwt(result[0]);
                    result = {
                        errcode: 1,
                        errmsg: true,
                        token: strToken
                    };
                } else {
                    console.log("创建token失败！")
                    result = {
                        errcode: -1,
                        errmsg: err + '服务器错误'
                    };
                }
                // 把操作结果返回给前台页面
                res.send(result);
            });
        }
    });


}
/*
 *注册验证码model
 */
function regist_validateModel(req, res) {
    // 获取前台页面传过来的参数
    if (req.method == 'POST') {
        var param = req.body;
    } else {
        //res.redirect(req._parsedOriginalUrl.pathname);
        var param = req.query || req.params;
    }
    if (is.isEmail_Phone(param.email_phone) == 'phone') {
        var sql = Sql.SQLCommands.sql_selectP;
    } else if (is.isEmail_Phone(param.email_phone) == 'email') {
        var sql = Sql.SQLCommands.sql_selectE;
    } else {
        res.send({errcode: -1, errmsg: "手机号或邮箱格式不正确！"});
        return;
    }
    selectUser.selectUserService(sql, param.email_phone, function (err, result) {
        if (result[0] == null) {
            if (sql == Sql.SQLCommands.sql_selectP) {
                var Phone = param.email_phone;
                var code = MathRand();
                req.session['code'] = code;
                req.session['email_phone'] = Phone;
                vcode.sendPhone(req, res, Phone, code, "10分钟");
            } else if (sql == Sql.SQLCommands.sql_selectE) {
                var Email = param.email_phone;
                var code = MathRand();
                req.session['code'] = code;
                req.session['email_phone'] = Email;
                vcode.sendMail(req, res, Email, '贵州贝思特', '您的验证码是： ' + code);
            }
        } else {
            result = {
                errcode: 0,
                errmsg: '用户已注册'
            };
            res.send(result);
        }

    });
}
/*
 *注册model
 */
function registModel(req, res) {
    var phone = null, email = null;
    // 获取前台页面传过来的参数
    if (req.method == 'POST') {
        var param = req.body;
    } else {
        //res.redirect(req._parsedOriginalUrl.pathname);
        var param = req.query || req.params;
    }
    if (is.isEmail_Phone(param.email_phone) == 'phone') {
        phone = param.email_phone;
    } else if (is.isEmail_Phone(param.email_phone) == 'email') {
        email = param.email_phone;
    }
    if (req.session['code']) {
        if (param.validate === req.session['code'] && param.email_phone === req.session['email_phone']) {
            userService.registService(Sql.SQLCommands.sql_regist, param, email, phone, function (err, result) {
                if (!err) {
                    result = {
                        errcode: 1,
                        errmsg: '注册成功'
                    };
                    //删除session中的验证码
                    delete req.session['code'];
                    delete req.session['email_phone'];
                    email = null;
                    phone = null;
                } else if (result == '') {
                    console.log('服务器错误！' + err);
                    result = {
                        errcode: -1,
                        errmsg: err + '服务器错误'
                    };
                }
                // 把操作结果返回给前台页面
                res.send(result);
            });

        } else {
            res.send({errcode: -1, errmsg: "验证码错误或该账户未获取验证码！"});
        }
    } else {
        res.send({errcode: -1, errmsg: "您没有获取验证码！或验证码已失效！"});
    }

}
/*
 *忘记密码验证码model
 */
function forgetModel(req, res) {
    // 获取前台页面传过来的参数
    if (req.method == 'POST') {
        var param = req.body;
    } else {
        //res.redirect(req._parsedOriginalUrl.pathname);
        var param = req.query || req.params;
    }
    if (is.isEmail_Phone(param.email_phone) == 'phone') {
        var sql = Sql.SQLCommands.sql_selectP;
    } else if (is.isEmail_Phone(param.email_phone) == 'email') {
        var sql = Sql.SQLCommands.sql_selectE;
    } else {
        res.send({errcode: -1, errmsg: "手机号或邮箱格式不正确！"});
        return;
    }
    selectUser.selectUserService(sql, param.email_phone, function (err, result) {
        if (result[0] != null) {
            if (sql == Sql.SQLCommands.sql_selectP) {
                var Phone = param.email_phone;
                var code = MathRand();
                req.session['code'] = code;
                req.session['email_phone'] = Phone;
                vcode.sendPhone(req, res, Phone, code, "10分钟");
            } else if (sql == Sql.SQLCommands.sql_selectE) {
                var Email = param.email_phone;
                var code = MathRand();
                req.session['code'] = code;
                req.session['email_phone'] = Email;
                vcode.sendMail(req, res, Email, '贵州贝思特', '您的验证码是： ' + code);
            }
        } else {
            result = {
                errcode: 0,
                errmsg: '用户未注册！'
            };
            res.send(result);
        }

    });
}
function resetModel(req, res) {
    var username = null;
    var sql_update = null;
    //express().use(bodyParser.urlencoded);
    if (req.method == 'POST') {
        var param = req.body;
    } else {
        var param = req.query || req.params;
    }
    if (is.isEmail_Phone(param.email_phone) == 'phone') {
        sql_update = Sql.SQLCommands.sql_updateP;
    } else if (is.isEmail_Phone(param.email_phone) == 'email') {
        sql_update = Sql.SQLCommands.sql_updateE;
    } else {
        res.send({errcode: -1, errmsg: "手机号或邮箱格式不正确！"});
        return;
    }
    if (param.password) {
        userService.resetService(sql_update, param, function (err, result) {
            if (!err) {
                result = {
                    errcode: 1,
                    errmsg: '重置密码成功'
                };
                delete req.session['code'];
                delete req.session['email_phone'];
            } else if (result == '') {
                result = {
                    errcode: -1,
                    errmsg: err + '服务器错误'
                };
            }
            res.send(result);
        });
    } else {
        if (req.session['code']) {
            if (param.validate === req.session['code'] && param.email_phone === req.session['email_phone']) {
                var result = {
                    errcode: 1,
                    errmsg: "验证码正确！"
                };
                res.send(result);
            } else {
                var result = {
                    errcode: 0,
                    errmsg: "验证码错误或该账户未获取验证码！"
                };
                res.send(result);
            }
        } else {
            var result = {errcode: -1, errmsg: "您没有获取验证码！或验证码已失效！"}
            res.send(result);
        }
    }


}
function MathRand() {
    var randomnumber = Math.random() * 1000000;
    randomnumber = (Array(6).join('0') + parseInt(randomnumber)).slice(-6);
    return randomnumber;
}
// exports
module.exports = {
    loginModel: loginModel,
    regist_validateModel: regist_validateModel,
    registModel: registModel,
    forgetModel: forgetModel,
    resetModel: resetModel
};






