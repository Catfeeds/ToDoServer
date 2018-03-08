var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './bin/uploads/headImg')
    },
    //给上传文件重命名，获取添加后缀名
    //filename: function (req, file, cb) {
    //    var fileFormat = (file.originalname).split(".");
    //    cb(null, file.filename + "." + fileFormat[fileFormat.length - 1]);
    //}
});

//if (req.files && req.files[0] != null) {
//
//    fs.rename(req.files[0].path,newName,function(err){
//        if(err){
//            res.send(err);
//        }
//    });
//    return req.files[0].originalname;
//}else {
//    //默认的头像
//    return "public.png";
//}


//添加配置文件到muler对象。
var upload = multer({
    storage: storage
});

//如需其他设置，请参考multer的limits,使用方法如下。
//var uploads = multer({
//    storage: storage,
//    limits:{}
// });

//导出对象
module.exports = upload;