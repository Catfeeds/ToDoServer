var db = require('../mysqlDB/DBServise');
const common = require("../libs/common");
/**
 * 登录
 */
function loginService(sql, param, callback) {
    // 执行Query
    db.queryArgs(sql, [param.email_phone, common.md5(param.password + common.MD5_SUFFIX)], function (err, result) {
        callback(err, result);
    });
}

/**
 * 注册用户
 */
function registService(sql, param, email, phone, callback) {
    db.queryArgs(sql, [param.email_phone, common.md5(param.password + common.MD5_SUFFIX), email, phone, 'public.png'],
        function (err, result) {
            callback(err, result);
        }
    );
}
/**
 * 查询用户
 */
function selectUserService(sql, param, callback) {
    db.queryArgs(sql, [param], function (err, result) {
        callback(err, result);
    });
}
/**
 * 忘记密码重置密码
 */
function resetService(sql, param, callback) {
    db.queryArgs(sql, [common.md5(param.password + common.MD5_SUFFIX), param.email_phone],
        function (err, result) {
            callback(err, result);
        }
    );
}

// exports
module.exports = {
    loginService: loginService,
    registService: registService,
    resetService: resetService,
    selectUserService: selectUserService
};


