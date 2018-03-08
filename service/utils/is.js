//判断的工具类
//验证手机格式
function isnum(str) {
    var reg = /^1\d{10}$/;
    if (!reg.test(str)) {
        return false;
    } else {
        return true;
    }
}
//验证邮件格式
function ismail(str) {
    var reg = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/;
    if (!reg.test(str)) {
        return false;
    } else {
        return true;
    }
}
//判断是手机还是邮箱
function isEmail_Phone(str) {
    if (isnum(str)) {
        return 'phone';
    } else if (ismail(str)) {
        return 'email';
    } else {
        return false;
    }
}

//判断时间格式是否为20YY-MM-DD
function isDate(str) {
  var reg = /^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  if (!reg.test(str)){
    return false;
  }else {
    return true;
  }
}

module.exports = {
    isEmail_Phone: isEmail_Phone,
  isDate: isDate
}
