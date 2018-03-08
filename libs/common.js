const crypto = require("crypto");
//使用MD5进行加密
module.exports = {
    MD5_SUFFIX:'SEFASSD&$%^^*sdf#',
    md5:function (str) {
        var obj = crypto.createHash('md5');
        obj.update(str);
        return obj.digest('hex');
    }
}