const jwt = require('jsonwebtoken');
module.exports = {
    Token_Jwt:function (str) {
        //var propertys = Object.getOwnPropertyNames(str[0]);
        //console.log(new String(result[0].字段名));
        var string = JSON.stringify(str);
        //console.log(string);
        //将json字符串转化成json数组
        var json = JSON.parse(string);
        var token = jwt.sign(json, 'shhhhh', {expiresIn: 60 * 60 * 24 * 7});
        return token;
    },
    Token_read:function (str) {
        var decoded = jwt.verify(str, 'shhhhh');
        return decoded;
    }
}