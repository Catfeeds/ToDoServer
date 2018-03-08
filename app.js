var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var users = require('./routes/users');
var todo = require('./routes/todo');
const multer = require("multer");
var cookieParser = require('cookie-parser');
var session = require('express-session');
//上传文件添加中间件
var app = express();

//app.use(objMulter.any('avatar'));//文件上传
//session，秘钥，防止session劫持
app.use(cookieSession({
    keys: ['aaa', 'bbb', 'ccc'],
    //验证码时效10分钟
    maxAge:10*60*1000
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/favicon.ico', function (req, res) {
    res.sendStatus(204);
});
app.use('/', users);
app.use('/todo', todo);
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;