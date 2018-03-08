//const jwt = require('jsonwebtoken');
//
//
//function Token_Jwt(str) {
//    var token = jwt.sign(str, 'shhhhh', {expiresIn: 60 * 60 * 24 * 7});
//    console.log(token);
//}
//function Token_read(str) {
//    var decoded = jwt.verify(str, 'shhhhh');
//    console.log(decoded);
//}
////Token_Jwt(str[0]);
//console.log(str[0]);

const userService = require('../service/userService');
email = null;
phone = 13000000949;
var param = {
    email_phone: 13000000949,
    password: 123456
}
for (var i = 0; i < 100000; i++) {
    phone++;
    param.email_phone++;
    demo(param, email, phone);
}
function demo(param, email, phone) {
    var sql = "INSERT INTO user_table (username, password,email,phone,img_src) VALUES(?,?,?,?,?)";
    userService.registService(sql, param, email, phone, function (err, result) {
        if (!err) {
            result = {
                errcode: 1,
                errmsg: '注册成功'
            };
        } else if (result == '') {
            console.log('服务器错误！' + err);
            result = {
                errcode: -1,
                errmsg: err + '服务器错误'
            };
        }
        console.log(result);
    });
}
